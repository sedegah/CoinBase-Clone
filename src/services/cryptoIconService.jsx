import { useState } from "react";

/*
CoinGecko image IDs
These IDs are stable and return high-quality PNGs
*/
const COINGECKO_IDS = {
  btc: "bitcoin",
  eth: "ethereum",
  sol: "solana",
  ada: "cardano",
  avax: "avalanche-2",
  dot: "polkadot",
  link: "chainlink",
  usdc: "usd-coin",
  usdt: "tether",
  xrp: "ripple",
  bnb: "binancecoin",
  doge: "dogecoin",
  trx: "tron",
  shib: "shiba-inu",
  ltc: "litecoin",
  matic: "matic-network",
  xlm: "stellar",
  uni: "uniswap",
  atom: "cosmos",
  xmr: "monero"
};

function normalize(symbol) {
  return symbol?.toLowerCase()?.trim();
}

/*
CoinGecko HD icons
*/
function coinGeckoIcon(symbol) {
  const id = COINGECKO_IDS[symbol];
  if (!id) return null;

  return `https://assets.coingecko.com/coins/images/${id}/large.png`;
}

/*
Fallback icon source
*/
function jsdelivrIcon(symbol) {
  return `https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons@master/128/color/${symbol}.png`;
}

/*
Letter fallback
*/
function Fallback({ symbol, size }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: "#e2e8f0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 700,
        fontSize: size * 0.45,
        color: "#475569"
      }}
    >
      {symbol?.[0]?.toUpperCase()}
    </div>
  );
}

/*
Main icon component
*/
export function CryptoIcon({ symbol, size = 24, className = "", style = {} }) {

  const sym = normalize(symbol);

  const sources = [
    coinGeckoIcon(sym),
    jsdelivrIcon(sym)
  ].filter(Boolean);

  const [index, setIndex] = useState(0);

  if (!sym) return <Fallback symbol="?" size={size} />;

  if (index >= sources.length) {
    return <Fallback symbol={sym} size={size} />;
  }

  return (
    <img
      src={sources[index]}
      width={size}
      height={size}
      alt={sym}
      className={className}
      style={{
        objectFit: "contain",
        borderRadius: "50%",
        ...style
      }}
      onError={() => setIndex((i) => i + 1)}
    />
  );
}