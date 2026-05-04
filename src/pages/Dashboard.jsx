import { useState, useRef, useEffect } from "react";
import { Logo } from '../components/common';
import { getCryptoData, startPricePolling, formatPrice, testApiConnection } from '../services/cryptoApi';
import { getCachedCardData } from '../services/coinbaseScraper';
import { getCachedExploreCardData } from '../services/coinbaseExploreApi';
import { CryptoIcon } from '../services/cryptoIconService.jsx';
import usdcPromoImg from "../assets/usdc_promo_premium_1773011518645.png";
import bankReplaceImg from "../assets/bank_replace_premium_1773011552535.png";
import investTimingImg from "../assets/invest_timing_premium_1773011567380.png";

const seed = (s) => { let x = s; return () => { x = (x * 16807) % 2147483647; return (x - 1) / 2147483646; }; };

const generateVolatileChart = (base, points = 80, s = 42) => {
  const r = seed(s);
  const data = [];
  let val = base;
  for (let i = 0; i < points; i++) {
    val += (r() - 0.48) * base * 0.03;
    data.push(Math.max(val, base * 0.5));
  }
  return data;
};

const TIME_LABELS = {
  "1H": ["5:24 PM", "6:10 PM", "6:55 PM", "7:40 PM", "8:24 PM", "9:10 PM"],
  "1D": ["5:24 PM", "9:33 PM", "1:42 AM", "5:52 AM", "10:01 AM", "2:10 PM"],
  "1W": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  "1M": ["Dec 1", "Dec 8", "Dec 15", "Dec 22", "Dec 29", "Jan 5"],
  "1Y": ["Jan", "Mar", "May", "Jul", "Sep", "Nov"],
  "ALL": ["2019", "2020", "2021", "2022", "2023", "2024"],
};

const USD_TO_GHS_RATE = 15.80;

const ASSETS = [
  { name: "Ghanaian Cedi", symbol: "GHS", sub: "", color: "#2563EB", bg: "#EFF6FF", balance: "GH₵12,450.00" },
  { name: "USD Coin", symbol: "USDC", sub: "Earns 5.00% APY", color: "#2563EB", bg: "#EFF6FF", balance: "GH₵71,100.00", apy: "5.00" },
];

const INITIAL_CRYPTO = [
  { name: "Bitcoin", symbol: "BTC", color: "#F7931A", bg: "#FFF7ED", balance: "GH₵421,339.00", change: "+2.41%", allocation: "40.0%", holdings: "6.25 BTC", avgBuyPrice: "GH₵67,414" },
  { name: "Ethereum", symbol: "ETH", color: "#627EEA", bg: "#EEF2FF", balance: "GH₵210,668.00", change: "-1.04%", allocation: "20.0%", holdings: "69.5 ETH", avgBuyPrice: "GH₵3,032" },
  { name: "Solana", symbol: "SOL", color: "#9945FF", bg: "#F5F0FF", balance: "GH₵105,334.00", change: "+5.7%", allocation: "10.0%", holdings: "756.2 SOL", avgBuyPrice: "GH₵139" },
  { name: "Cardano", symbol: "ADA", color: "#0033AD", bg: "#E6F2FF", balance: "GH₵52,667.00", change: "+3.2%", allocation: "5.0%", holdings: "109,722 ADA", avgBuyPrice: "GH₵0.48" },
  { name: "Avalanche", symbol: "AVAX", color: "#E84142", bg: "#FFEBEE", balance: "GH₵52,667.00", change: "-0.88%", allocation: "5.0%", holdings: "1,370 AVAX", avgBuyPrice: "GH₵38" },
  { name: "Polkadot", symbol: "DOT", color: "#E6007A", bg: "#FDF2F8", balance: "GH₵42,134.00", change: "+1.8%", allocation: "4.0%", holdings: "5,340 DOT", avgBuyPrice: "GH₵7.89" },
  { name: "Chainlink", symbol: "LINK", color: "#2A5ADA", bg: "#EFF6FF", balance: "GH₵31,600.00", change: "+2.3%", allocation: "3.0%", holdings: "2,220 LINK", avgBuyPrice: "GH₵14.23" },
  { name: "Polygon", symbol: "MATIC", color: "#8247E5", bg: "#F3E8FF", balance: "GH₽31,600.00", change: "-0.5%", allocation: "3.0%", holdings: "28,000 MATIC", avgBuyPrice: "GH₵1.13" },
  { name: "Ripple", symbol: "XRP", color: "#23292F", bg: "#F8FAFB", balance: "GH₵26,333.00", change: "+1.2%", allocation: "2.5%", holdings: "13,640 XRP", avgBuyPrice: "GH₵1.93" },
  { name: "Dogecoin", symbol: "DOGE", color: "#C2A633", bg: "#FFFBEB", balance: "GH₵21,007.00", change: "+4.1%", allocation: "2.0%", holdings: "133,000 DOGE", avgBuyPrice: "GH₵0.158" },
  { name: "Litecoin", symbol: "LTC", color: "#345D9D", bg: "#EFF6FF", balance: "GH₵21,007.00", change: "-2.3%", allocation: "2.0%", holdings: "125 LTC", avgBuyPrice: "GH₵168" },
  { name: "Stellar", symbol: "XLM", color: "#000000", bg: "#F5F5F5", balance: "GH₵15,800.00", change: "+0.8%", allocation: "1.5%", holdings: "31,600 XLM", avgBuyPrice: "GH₵0.50" },
  { name: "Uniswap", symbol: "UNI", color: "#FF007A", bg: "#FFF0F5", balance: "GH₵15,800.00", change: "-1.5%", allocation: "1.5%", holdings: "263 UNI", avgBuyPrice: "GH₵60" },
  { name: "Cosmos", symbol: "ATOM", color: "#2E3148", bg: "#F8F9FA", balance: "GH₵10,533.00", change: "+3.4%", allocation: "1.0%", holdings: "133 ATOM", avgBuyPrice: "GH₵79" },
  { name: "Monero", symbol: "XMR", color: "#FF6600", bg: "#FFF5F5", balance: "GH₵10,533.00", change: "-0.9%", allocation: "1.0%", holdings: "66 XMR", avgBuyPrice: "GH₵159" },
];

const Icon = ({ name, size = 18, color = "#6B7280", strokeWidth = 1.8 }) => {
  console.log('Icon component called with name:', name, 'size:', size, 'color:', color);
  const s = { display: "block" };
  const p = { fill: "none", stroke: color, strokeWidth, strokeLinecap: "round", strokeLinejoin: "round" };
  const paths = {
    home: <svg width={size} height={size} viewBox="0 0 24 24" style={s}><path {...p} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline {...p} points="9 22 9 12 15 12 15 22" /></svg>,
    assets: <svg width={size} height={size} viewBox="0 0 24 24" style={s}><circle cx="12" cy="12" r="10" {...p} /><path d="M16 8h-8v8h8V8z" fill={color} /></svg>,
    trade: <svg width={size} height={size} viewBox="0 0 24 24" style={s}><path d="M11 17l-5-5m0 0l5-5m-5 5h12m-1-1a2 2 0 11-4 0 2 2 0 014 0zm-6-8a2 2 0 11-4 0 2 2 0 014 0z" {...p} /><path d="M20 12v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6" {...p} /></svg>,
    earn: <svg width={size} height={size} viewBox="0 0 24 24" style={s}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill={color} /></svg>,
    learning: <svg width={size} height={size} viewBox="0 0 24 24" style={s}><path d="M12 14l9-5-9-5-9 5 9 5z" {...p} /><path d="M12 14v7" {...p} /><path d="M8 8v8m8-8v8" {...p} /></svg>,
    web3: <svg width={size} height={size} viewBox="0 0 24 24" style={s}><circle cx="12" cy="12" r="10" {...p} /><circle cx="12" cy="12" r="3" fill={color} /><path d="M12 2v20M2 12h20" {...p} /></svg>,
    more: <svg width={size} height={size} viewBox="0 0 24 24" style={s}><circle cx="12" cy="12" r="1" fill={color} /><circle cx="12" cy="5" r="1" fill={color} /><circle cx="12" cy="19" r="1" fill={color} /></svg>,
    search: <svg width={size} height={size} viewBox="0 0 24 24" style={s}><circle cx="11" cy="11" r="8" {...p} /><path d="m21 21-4.35-4.35" {...p} /></svg>,
    bell: <svg width={size} height={size} viewBox="0 0 24 24" style={s}><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9z" {...p} /><path d="M13.73 21a2 2 0 01-3.46 0" {...p} /></svg>,
    grid: <svg width={size} height={size} viewBox="0 0 24 24" style={s}><rect x="3" y="3" width="7" height="7" rx="1" {...p} /><rect x="14" y="3" width="7" height="7" rx="1" {...p} /><rect x="14" y="14" width="7" height="7" rx="1" {...p} /><rect x="3" y="14" width="7" height="7" rx="1" {...p} /></svg>,
    chevronRight: <svg width={size} height={size} viewBox="0 0 24 24" style={s}><polyline points="9 18 15 12 9 6" {...p} /></svg>,
    dotsV: <svg width={size} height={size} viewBox="0 0 24 24" style={s}><circle cx="12" cy="5" r="1" fill={color} /><circle cx="12" cy="12" r="1" fill={color} /><circle cx="12" cy="19" r="1" fill={color} /></svg>,
    info: <svg width={size} height={size} viewBox="0 0 24 24" style={s}><circle cx="12" cy="12" r="10" {...p} /><line x1="12" y1="12" x2="12.01" y2="12" {...p} /><line x1="12" y1="16" x2="12.01" y2="16" {...p} /></svg>,
    repeat: <svg width={size} height={size} viewBox="0 0 24 24" style={s}><polyline points="17 1 21 5 17 9" {...p} /><path d="M3 11V9a4 4 0 014-4h14" {...p} /><polyline points="7 23 3 19 7 15" {...p} /><path d="M21 13v2a4 4 0 01-4 4H3" {...p} /></svg>,
    send: <svg width={size} height={size} viewBox="0 0 24 24" style={s}><path d="M22 2L11 13" {...p} /><path d="M22 2l-7 20-4-9-9 5 20-2z" fill={color} opacity="0.2" /></svg>,

  };
  return paths[name] || null;
};

function SparkLine({ data, color = "#2563EB", width = 700, height = 220 }) {
  const svgRef = useRef(null);
  const [tip, setTip] = useState(null);
  const PL = 0, PR = 0, PT = 10, PB = 30;
  const iw = width - PL - PR, ih = height - PT - PB;
  const minV = Math.min(...data), maxV = Math.max(...data);
  const xs = (i) => PL + (i / (data.length - 1)) * iw;
  const ys = (v) => PT + ih - ((v - minV) / (maxV - minV)) * ih;
  const pathD = data.map((v, i) => `${i === 0 ? "M" : "L"}${xs(i).toFixed(1)},${ys(v).toFixed(1)}`).join(" ");

  const onMove = (e) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const rawX = (e.clientX - rect.left) * (width / rect.width);
    const idx = Math.round((rawX / iw) * (data.length - 1));
    if (idx >= 0 && idx < data.length) setTip({ x: xs(idx), y: ys(data[idx]), v: data[idx], idx });
  };

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <svg ref={svgRef} viewBox={`0 0 ${width} ${height}`}
        style={{ width: "100%", height, display: "block", cursor: "crosshair" }}
        onMouseMove={onMove} onMouseLeave={() => setTip(null)}>
        <path d={pathD} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        {tip && <>
          <line x1={tip.x} y1={PT} x2={tip.x} y2={height - PB} stroke="#CBD5E1" strokeWidth="1" strokeDasharray="3,3" />
          <circle cx={tip.x} cy={tip.y} r="4" fill={color} stroke="white" strokeWidth="2" />
        </>}
      </svg>
      {tip && (
        <div style={{
          position: "absolute", top: 4, left: Math.min((tip.x / width) * 100, 70) + "%",
          background: "white", border: "1px solid #E2E8F0", borderRadius: 8,
          padding: "5px 10px", fontSize: 12, fontWeight: 600, color: "#1e293b",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)", pointerEvents: "none", whiteSpace: "nowrap"
        }}>GH₵{tip.v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
      )}
    </div>
  );
}

function DonutRing({ pct = 40, size = 64, color = "#2563EB" }) {
  const r = 26, cx = 32, cy = 32;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <svg width={size} height={size} viewBox="0 0 64 64">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#E2E8F0" strokeWidth="6" />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth="6"
        strokeDasharray={`${dash} ${circ - dash}`} strokeDashoffset={circ * 0.25}
        strokeLinecap="round" style={{ transition: "stroke-dasharray 0.6s" }} />
      <text x={cx} y={cy + 5} textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e293b">{pct}%</text>
    </svg>
  );
}

const NAV = [
  { icon: "home", label: "Home" },
  { icon: "assets", label: "My assets", active: true },
  { icon: "trade", label: "Trade" },
  { icon: "earn", label: "Earn" },
  { icon: "learning", label: "Learning rewards" },
  { icon: "web3", label: "Web3" },
  { icon: "more", label: "More" },
];

export default function Dashboard() {
  const [activeTime, setActiveTime] = useState("1D");
  const [activeNav, setActiveNav] = useState(1);
  const [searchVal, setSearchVal] = useState("");
  const [mounted, setMounted] = useState(false);
  const [cryptoData, setCryptoData] = useState(null);
  const [loading, setLoading] = useState(true);

  const popularCryptos = cryptoData
    ? Object.values(cryptoData).map((coin) => ({
        name: coin.name,
        symbol: coin.symbol,
        change: `${coin.change24h >= 0 ? '+' : ''}${coin.change24h.toFixed(2)}%`,
        balance: formatPrice(coin.price),
        bg: coin.bg,
        color: coin.color
      }))
    : [];

  const exploreCards = [
    {
      title: "USDC: The digital dollar for the global crypto economy",
      description: "Coinbase believes crypto will be part of the solution for creating an open financial system that is both more efficient and more...",
      image: usdcPromoImg,
      price: "1.00 USDC",
      change: "+0.00%",
      bg: "#0052FF"
    },
    {
      title: "Can crypto really replace your bank account?",
      description: "If you're a big enough fan of crypto, you've probably heard the phrase \"be your own bank\" or the term \"bankless\" — the idea being that...",
      image: bankReplaceImg,
      price: "Bank-less",
      change: "New",
      bg: "#0052FF"
    },
    {
      title: "When is the best time to invest in crypto?",
      description: "Cryptocurrencies like Bitcoin can experience daily (or even hourly) price volatility. As with any kind of investment, volatility may cause...",
      image: investTimingImg,
      price: "Timing",
      change: "Guide",
      bg: "#A5B4B4"
    }
  ];
  const chartData = generateVolatileChart(71955 * USD_TO_GHS_RATE, 80, 7);

  // Fetch initial crypto data
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        console.log('Testing API connection...');
        await testApiConnection();
        console.log('Fetching crypto data...');
        const data = await getCryptoData();
        console.log('Crypto data received:', data);
        console.log('Crypto data keys:', data ? Object.keys(data) : 'null');
        if (data) {
          Object.keys(data).forEach(key => {
            console.log(`${key} data:`, data[key]);
          });
          setCryptoData(data);
        }

        console.log('Fetching Coinbase cards...');
        const cards = await getCachedCardData();
        console.log('Coinbase cards received:', cards);
        setCoinbaseCards(cards);

        console.log('Fetching Coinbase explore cards...');
        const exploreCards = await getCachedExploreCardData();
        console.log('Coinbase explore cards received:', exploreCards);
        setExploreCards(exploreCards);
      } catch (error) {
        console.error('Failed to fetch initial data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // Set up polling for real-time updates
  useEffect(() => {
    if (!mounted) return;

    const cleanup = startPricePolling((data) => {
      if (data) {
        setCryptoData(data);
      }
    });

    return cleanup;
  }, [mounted]);

  useEffect(() => { setTimeout(() => setMounted(true), 80); }, []);

  return (
    <div style={{
      display: "flex", height: "100vh", background: "#F8FAFC",
      fontFamily: "'Inter', system-ui, sans-serif",
      overflow: "hidden", fontSize: 14
    }}>
      {/* Sidebar */}
      <div style={{
        width: 220, background: "white", borderRight: "1px solid #E2E8F0",
        display: "flex", flexDirection: "column", flexShrink: 0, paddingTop: 0
      }}>
        {/* Logo */}
        <div style={{ padding: "20px 20px 16px", borderBottom: "1px solid #F1F5F9" }}>
          <Logo size={22} />
        </div>

        {/* Nav */}
        <nav style={{ padding: "12px 10px", flex: 1 }}>
          {NAV.map((item, i) => (
            <div key={i} onClick={() => setActiveNav(i)} style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "9px 12px", borderRadius: 10, cursor: "pointer", marginBottom: 2,
              background: activeNav === i ? "#EFF6FF" : "transparent",
              color: activeNav === i ? "#2563EB" : "#374151",
              fontWeight: activeNav === i ? 600 : 400,
              transition: "all 0.15s",
            }}
              onMouseEnter={e => { if (activeNav !== i) { e.currentTarget.style.background = "#F8FAFC"; } }}
              onMouseLeave={e => { if (activeNav !== i) { e.currentTarget.style.background = "transparent"; } }}>
              <Icon name={item.icon} size={17} color={activeNav === i ? "#2563EB" : "#6B7280"} />
              <span style={{ fontSize: 14 }}>{item.label}</span>
            </div>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Topbar */}
        <div style={{
          height: 56, background: "white", borderBottom: "1px solid #E2E8F0",
          display: "flex", alignItems: "center", padding: "0 24px", gap: 16,
          flexShrink: 0
        }}>
          <h1 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "#0F172A", flex: "0 0 auto" }}>My assets</h1>
          <div style={{ flex: 1, maxWidth: 340 }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 8, background: "#F1F5F9",
              borderRadius: 24, padding: "7px 16px", border: "1px solid transparent",
              transition: "border 0.15s"
            }}>
              <Icon name="search" size={15} color="#94A3B8" />
              <input value={searchVal} onChange={e => setSearchVal(e.target.value)}
                placeholder="Search for an asset"
                style={{
                  border: "none", background: "transparent", outline: "none",
                  fontSize: 13.5, color: "#374151", width: "100%", fontFamily: "inherit"
                }} />
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, marginLeft: "auto" }}>
            <button style={{
              background: "#2563EB", color: "white", border: "none", borderRadius: 24,
              padding: "8px 20px", fontWeight: 600, fontSize: 13.5, cursor: "pointer",
              fontFamily: "inherit", transition: "background 0.15s"
            }}
              onMouseEnter={e => e.currentTarget.style.background = "#1D4ED8"}
              onMouseLeave={e => e.currentTarget.style.background = "#2563EB"}>
              Buy &amp; Sell
            </button>
            <button style={{
              background: "white", color: "#1e293b", border: "1.5px solid #E2E8F0",
              borderRadius: 24, padding: "8px 18px", fontWeight: 600, fontSize: 13.5,
              cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s"
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "#F8FAFC"; e.currentTarget.style.borderColor = "#CBD5E1"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "white"; e.currentTarget.style.borderColor = "#E2E8F0"; }}>
              <span style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <Icon name="send" size={13} color="#374151" strokeWidth={2} />
                Send &amp; Receive
              </span>
            </button>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ position: "relative", cursor: "pointer", padding: 4 }}>
              <Icon name="bell" size={19} color="#6B7280" />
              <div style={{
                position: "absolute", top: 3, right: 3, width: 6, height: 6,
                background: "#EF4444", borderRadius: "50%", border: "1.5px solid white"
              }} />
            </div>
            <div style={{ cursor: "pointer", padding: 4 }}>
              <Icon name="grid" size={19} color="#6B7280" />
            </div>
            <div style={{
              width: 32, height: 32, borderRadius: "50%", background: "#CBD5E1",
              overflow: "hidden", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 14, fontWeight: 700, color: "#475569"
            }}>D</div>
          </div>
        </div>

        {/* Two-column layout */}
        <div style={{ flex: 1, overflowY: "auto", display: "flex", gap: 0 }}>

          {/* Left/main column */}
          <div style={{ flex: 1, padding: "24px 20px 24px 24px", overflowY: "auto" }}>

            {/* Balance + Chart card */}
            <div style={{
              background: "white", border: "1px solid #E2E8F0", borderRadius: 16,
              marginBottom: 16, overflow: "hidden",
              opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(10px)",
              transition: "opacity 0.35s, transform 0.35s"
            }}>
              <div style={{ padding: "20px 24px 0" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div style={{ fontSize: 12, color: "#64748B", fontWeight: 500, marginBottom: 4 }}>Total portfolio value</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 28, fontWeight: 700, color: "#0F172A", letterSpacing: "-0.5px" }}>GH₵1,136,889.00</span>
                      <div style={{ cursor: "pointer", color: "#64748B" }}>
                        <Icon name="chevronRight" size={16} color="#94A3B8" strokeWidth={2.5} />
                      </div>
                    </div>
                  </div>
                  {/* Timeframe pills */}
                  <div style={{ display: "flex", gap: 2 }}>
                    {Object.keys(TIME_LABELS).map(t => (
                      <button key={t} onClick={() => setActiveTime(t)} style={{
                        background: "none", border: "none", cursor: "pointer",
                        padding: "4px 8px", borderRadius: 6, fontSize: 12, fontWeight: 600,
                        color: activeTime === t ? "#2563EB" : "#94A3B8",
                        borderBottom: activeTime === t ? "2px solid #2563EB" : "2px solid transparent",
                        fontFamily: "inherit", transition: "all 0.15s"
                      }}>{t}</button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Chart */}
              <div style={{ padding: "8px 0 0" }}>
                <SparkLine data={chartData} color="#2563EB" width={700} height={220} />
                <div style={{
                  display: "flex", justifyContent: "space-between",
                  padding: "0 12px 16px", marginTop: -20
                }}>
                  {TIME_LABELS[activeTime].map((l, i) => (
                    <span key={i} style={{ fontSize: 11, color: "#94A3B8" }}>{l}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* My cash card */}
            <div style={{
              background: "white", border: "1px solid #E2E8F0", borderRadius: 16,
              marginBottom: 16, overflow: "hidden",
              opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(10px)",
              transition: "opacity 0.4s 0.05s, transform 0.4s 0.05s"
            }}>
              <div style={{ padding: "18px 24px 14px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                  <span style={{ fontSize: 13, color: "#374151", fontWeight: 500 }}>My cash</span>
                  <Icon name="info" size={14} color="#94A3B8" />
                </div>
                <div style={{ fontSize: 20, fontWeight: 700, color: "#0F172A" }}>GH₵83,550.00</div>
              </div>

              {/* Table header */}
              <div style={{
                display: "grid", gridTemplateColumns: "1fr 1fr auto",
                padding: "8px 24px", borderTop: "1px solid #F1F5F9", borderBottom: "1px solid #F1F5F9",
                background: "#FAFAFA"
              }}>
                <span style={{ fontSize: 12, color: "#64748B", fontWeight: 600 }}>Name</span>
                <span style={{ fontSize: 12, color: "#64748B", fontWeight: 600 }}>Total balance</span>
                <span />
              </div>

              {ASSETS.map((a, i) => (
                <div key={i} style={{
                  display: "grid", gridTemplateColumns: "1fr 1fr auto",
                  alignItems: "center", padding: "14px 24px",
                  borderBottom: i < ASSETS.length - 1 ? "1px solid #F1F5F9" : "none",
                  cursor: "pointer", transition: "background 0.12s"
                }}
                  onMouseEnter={e => e.currentTarget.style.background = "#FAFAFA"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: "50%", background: a.bg,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0, border: `1.5px solid ${a.color}30`
                    }}>
                      <CryptoIcon symbol={a.symbol} size={20} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, color: "#0F172A", fontSize: 13.5 }}>{a.name}</div>
                      {a.sub && <div style={{ fontSize: 11, color: "#22C55E", fontWeight: 600 }}>{a.sub}</div>}
                    </div>
                  </div>
                  <span style={{ fontWeight: 600, color: "#0F172A", fontSize: 13.5 }}>{a.balance}</span>
                  <div style={{ cursor: "pointer", padding: 4 }}>
                    <Icon name="dotsV" size={16} color="#94A3B8" />
                  </div>
                </div>
              ))}
            </div>

            {/* My crypto card */}
            <div style={{
              background: "white", border: "1px solid #E2E8F0", borderRadius: 16, overflow: "hidden",
              opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(10px)",
              transition: "opacity 0.45s 0.1s, transform 0.45s 0.1s"
            }}>
              <div style={{ padding: "18px 24px 14px" }}>
                <div style={{ fontSize: 13, color: "#374151", fontWeight: 500, marginBottom: 2 }}>My crypto</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: "#0F172A" }}>
                  GH₵1,053,339.00
                </div>
              </div>
              <div style={{
                display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr auto",
                alignItems: "center", padding: "12px 24px", fontSize: 12, color: "#64748B", fontWeight: 600, borderBottom: "1px solid #E2E8F0"
              }}>
                <span>Asset</span>
                <span style={{ textAlign: "center" }}>Allocation</span>
                <span style={{ textAlign: "center" }}>Holdings</span>
                <span style={{ textAlign: "right" }}>Value</span>
                <span style={{ textAlign: "right" }}>Avg Buy Price</span>
                <span style={{ textAlign: "center" }}>24h change</span>
                <span />
              </div>
              {cryptoData ? Object.values(cryptoData).map((c, i) => (
                <div key={i} style={{
                  display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr auto",
                  alignItems: "center", padding: "14px 24px",
                  borderBottom: i < Object.keys(cryptoData).length - 1 ? "1px solid #F1F5F9" : "none",
                  cursor: "pointer", transition: "background 0.12s"
                }}
                  onMouseEnter={e => e.currentTarget.style.background = "#FAFAFA"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: "50%", background: c.bg,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0, border: `1.5px solid ${c.color}30`
                    }}>
                      <CryptoIcon symbol={c.symbol} size={18} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, color: "#0F172A", fontSize: 13.5 }}>{c.name}</div>
                      <div style={{ fontSize: 11, color: "#94A3B8" }}>{c.symbol}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontWeight: 600, color: "#0F172A", fontSize: 13.5 }}>{c.allocation}</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontWeight: 600, color: "#0F172A", fontSize: 12.5 }}>{c.holdings}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontWeight: 600, color: "#0F172A", fontSize: 13.5 }}>{c.balance}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontWeight: 500, color: "#64748B", fontSize: 12 }}>{c.avgBuyPrice}</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <span style={{
                      fontWeight: 600, fontSize: 13,
                      color: c.change >= 0 ? "#22C55E" : "#EF4444"
                    }}>
                      {c.change}
                    </span>
                  </div>
                  <div style={{ cursor: "pointer", padding: 4 }}>
                    <Icon name="dotsV" size={16} color="#94A3B8" />
                  </div>
                </div>
              )) : (
                <div style={{ textAlign: "center", padding: "40px 20px" }}>
                  <div style={{ fontSize: 14, color: "#6b7280", marginBottom: 8 }}>
                    {loading ? "Loading prices..." : "Unable to load prices"}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right sidebar */}
          <div style={{ width: 300, flexShrink: 0, padding: "24px 24px 24px 4px", display: "flex", flexDirection: "column", gap: 14 }}>

            {/* Popular Cryptocurrencies sidebar cards */}
            <div style={{ fontSize: 13, color: "#374151", fontWeight: 600, marginBottom: 8, marginTop: 10 }}>Popular cryptocurrencies</div>
            {popularCryptos.length > 0 ? popularCryptos.slice(0, 4).map((c, i) => (
              <div key={i} style={{
                background: "white", border: "1px solid #E2E8F0", borderRadius: 16, padding: "16px",
                opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(10px)",
                transition: `opacity 0.4s ${0.15 + i * 0.05}s, transform 0.4s ${0.15 + i * 0.05}s`,
                cursor: "pointer", marginBottom: 12
              }}
                onMouseEnter={e => e.currentTarget.style.background = "#F8FAFC"}
                onMouseLeave={e => e.currentTarget.style.background = "white"}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: "50%", background: c.bg,
                    display: "flex", alignItems: "center", justifyContent: "center"
                  }}>
                    <CryptoIcon symbol={c.symbol} size={20} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: "#0F172A" }}>{c.name}</div>
                    <div style={{ fontSize: 12, color: "#64748B" }}>Popular cryptocurrency</div>
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 16, color: "#0F172A" }}>{c.balance}</div>
                    <div style={{ fontSize: 13, color: c.change.startsWith('+') ? "#22C55E" : "#EF4444", fontWeight: 600 }}>{c.change}</div>
                  </div>
                  <Icon name="chevronRight" size={16} color="#94A3B8" />
                </div>
              </div>
            )) : (
              <div style={{ textAlign: 'center', padding: '20px', color: '#64748B' }}>
                {loading ? 'Loading popular cryptocurrencies...' : 'Unable to load popular cryptocurrencies.'}
              </div>
            )}


            {/* Learning rewards card */}
            <div style={{
              background: "white", border: "1px solid #E2E8F0", borderRadius: 16, padding: "20px",
              opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(10px)",
              transition: "opacity 0.4s 0.25s, transform 0.4s 0.25s"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 15, color: "#0F172A", marginBottom: 6 }}>Learning rewards</div>
                  <div style={{ fontSize: 12.5, color: "#64748B", lineHeight: 1.5, marginBottom: 12 }}>
                    Earn $8.208 more by learning about new assets
                  </div>
                  <button style={{
                    background: "none", border: "none", cursor: "pointer", padding: 0,
                    color: "#2563EB", fontWeight: 600, fontSize: 13, fontFamily: "inherit"
                  }}>Earn $8.21 more</button>
                </div>
                <DonutRing pct={40} size={64} color="#2563EB" />
              </div>
            </div>

            {/* Recurring buys card */}
            <div style={{
              background: "white", border: "1px solid #E2E8F0", borderRadius: 16, padding: "20px",
              opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(10px)",
              transition: "opacity 0.4s 0.3s, transform 0.4s 0.3s"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <span style={{ fontWeight: 700, fontSize: 15, color: "#0F172A" }}>Recurring buys</span>
                <button style={{
                  background: "none", border: "none", cursor: "pointer",
                  color: "#2563EB", fontWeight: 600, fontSize: 13, fontFamily: "inherit", padding: 0
                }}>
                  Add new
                </button>
              </div>
              <div style={{
                display: "flex", alignItems: "center", gap: 12, padding: "12px",
                border: "1px solid #E2E8F0", borderRadius: 12, cursor: "pointer",
                transition: "background 0.15s"
              }}
                onMouseEnter={e => e.currentTarget.style.background = "#F8FAFC"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                <div style={{
                  width: 40, height: 40, borderRadius: "50%",
                  background: "linear-gradient(135deg,#BFDBFE,#93C5FD)",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                }}>
                  <Icon name="repeat" size={18} color="#2563EB" strokeWidth={2} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: 13, color: "#0F172A" }}>Learn about recurring buys</div>
                  <div style={{
                    fontSize: 11.5, color: "#94A3B8", marginTop: 2,
                    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"
                  }}>
                    Invest daily, weekly, or monthly...
                  </div>
                </div>
                <Icon name="chevronRight" size={15} color="#94A3B8" strokeWidth={2.5} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
