#!/bin/bash
# The public front door for the house Minecraft server.
#
# The htpc sits behind Starlink's CGNAT and cannot be reached from outside. This
# turns a small rented Linux box into its public address: WireGuard between the
# two (the htpc dials out, which CGNAT allows), and the box forwards its public
# port 25565 across the tunnel to the htpc. Players connect to the box; the game
# never leaves the htpc.
#
# Run once, as root, on a fresh Debian/Ubuntu VPS:
#   HTPC_PUBKEY=<key> bash bootstrap-vps.sh
# It prints the peer block to paste into the htpc's /etc/wireguard/wg0.conf.
set -euo pipefail

: "${HTPC_PUBKEY:?set HTPC_PUBKEY to the WireGuard public key of the htpc}"
VPN_NET=10.77.0
VPS_VPN_IP=$VPN_NET.1
HTPC_VPN_IP=$VPN_NET.2
WG_PORT=51820
GAME_PORT=25565

export DEBIAN_FRONTEND=noninteractive
apt-get update -qq
apt-get install -y -qq wireguard wireguard-tools iptables-persistent >/dev/null

umask 077
mkdir -p /etc/wireguard
[ -f /etc/wireguard/vps.key ] || wg genkey > /etc/wireguard/vps.key
VPS_PUBKEY=$(wg pubkey < /etc/wireguard/vps.key)
WAN_IF=$(ip -4 route get 1.1.1.1 | awk '{for(i=1;i<=NF;i++) if($i=="dev") print $(i+1)}' | head -1)
PUBLIC_IP=$(curl -4 -s https://ifconfig.co || true)

cat > /etc/wireguard/wg0.conf <<CONF
[Interface]
Address = $VPS_VPN_IP/24
ListenPort = $WG_PORT
PrivateKey = $(cat /etc/wireguard/vps.key)

# Forward the public game port across the tunnel to the htpc, and send the replies
# back out looking like they came from here. The htpc sees every player as this
# box; that is the price of the tunnel and the reason to whitelist by name.
PostUp   = sysctl -w net.ipv4.ip_forward=1
PostUp   = iptables -t nat -A PREROUTING -i $WAN_IF -p tcp --dport $GAME_PORT -j DNAT --to-destination $HTPC_VPN_IP:$GAME_PORT
PostUp   = iptables -t nat -A POSTROUTING -o wg0 -p tcp --dport $GAME_PORT -j MASQUERADE
PostUp   = iptables -A FORWARD -i $WAN_IF -o wg0 -p tcp --dport $GAME_PORT -j ACCEPT
PostUp   = iptables -A FORWARD -i wg0 -o $WAN_IF -m state --state ESTABLISHED,RELATED -j ACCEPT
PostDown = iptables -t nat -D PREROUTING -i $WAN_IF -p tcp --dport $GAME_PORT -j DNAT --to-destination $HTPC_VPN_IP:$GAME_PORT
PostDown = iptables -t nat -D POSTROUTING -o wg0 -p tcp --dport $GAME_PORT -j MASQUERADE
PostDown = iptables -D FORWARD -i $WAN_IF -o wg0 -p tcp --dport $GAME_PORT -j ACCEPT
PostDown = iptables -D FORWARD -i wg0 -o $WAN_IF -m state --state ESTABLISHED,RELATED -j ACCEPT

[Peer]
# htpc
PublicKey = $HTPC_PUBKEY
AllowedIPs = $HTPC_VPN_IP/32
CONF

systemctl enable --now wg-quick@wg0
# Only the tunnel and the game are open to the world; ssh stays whatever the provider set.
if command -v ufw >/dev/null; then
	ufw allow $WG_PORT/udp >/dev/null
	ufw allow $GAME_PORT/tcp >/dev/null
fi

cat <<OUT

VPS is up. Paste this into the htpc's /etc/wireguard/wg0.conf:

[Peer]
# vps front door
PublicKey = $VPS_PUBKEY
Endpoint = ${PUBLIC_IP:-<vps public ip>}:$WG_PORT
AllowedIPs = $VPS_VPN_IP/32
PersistentKeepalive = 25

Players connect to: ${PUBLIC_IP:-<vps public ip>}:$GAME_PORT
OUT
