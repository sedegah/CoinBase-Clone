import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getCachedExploreCardData } from '../services/coinbaseExploreApi';
import {
  getHomepageData,
  getTradableCrypto,
  getFeatures,
  getMemberships,
  getHeroData,
  getLearnSections,
  useHomepageData,
  useTradableCrypto
} from '../services/coinbaseHomepageApi';

import { Logo } from "../components/common";
import heroImg from "../assets/Hero__4_.avif";
import circularImg from "../assets/circular.avif";
import businessImg from "../assets/business.png";
import companyImg from "../assets/company_upsell.png";
import developersImg from "../assets/developers_upsell_cdxv2_2.jpg";
import individualImg from "../assets/individual.png";
import institutionsImg from "../assets/institutions_upsell.png";
import { CryptoIcon } from "../services/cryptoIconService.jsx";

/* ─── SVG ICONS ─── */
const CoinbaseLogo = ({ size = 22 }) => <i className="bi bi-c-circle-fill" style={{ fontSize: size, lineHeight: 1, color: "white" }} />;

const SearchIcon = () => <i className="bi bi-search" />;

const GlobeIcon = () => <i className="bi bi-globe2" />;

const ChevronDownIcon = ({ open }) => (
  <i className="bi bi-chevron-down" style={{ transition: "transform .2s", transform: open ? "rotate(180deg)" : "none" }} />
);

const CheckIcon = () => <i className="bi bi-check2" style={{ fontSize: 24, lineHeight: 1, color: "white" }} />;

/* ─── SEARCH DATA (Real Coinbase Data) ─── */
const SEARCH_CRYPTO = [
  { id: 1, name: "Bitcoin", ticker: "BTC", rank: 1, iconBg: "#F7931A", icon: "bi-currency-bitcoin", vol: "$46B vol", mcap: "$1.3T mcap", price: "$67,440.47", chg: -2.13, up: false },
  { id: 2, name: "Ethereum", ticker: "ETH", rank: 2, iconBg: "#627EEA", icon: "bi-lightning-charge-fill", vol: "$25.6B vol", mcap: "$245.4B mcap", price: "$3,031.29", chg: -3.41, up: false },
  { id: 3, name: "Tether", ticker: "USDT", rank: 3, iconBg: "#26A17B", icon: "bi-cash-coin", vol: "$93B vol", mcap: "$183.5B mcap", price: "$1.00", chg: -0.03, up: false },
  { id: 4, name: "XRP", ticker: "XRP", rank: 4, iconBg: "#346AA9", icon: "bi-x", vol: "$8.2B vol", mcap: "$112.1B mcap", price: "$1.93", chg: -1.87, up: false },
  { id: 5, name: "Solana", ticker: "SOL", rank: 5, iconBg: "#9945FF", icon: "bi-sun", vol: "$5.1B vol", mcap: "$66.3B mcap", price: "$139.42", chg: 1.24, up: true },
  { id: 6, name: "BNB", ticker: "BNB", rank: 6, iconBg: "#F3BA2F", icon: "bi-diamond-fill", vol: "$3.0B vol", mcap: "$84.4B mcap", price: "$629.19", chg: -0.88, up: false },
  { id: 7, name: "USDC", ticker: "USDC", rank: 7, iconBg: "#2775CA", icon: "bi-currency-dollar", vol: "$13.8B vol", mcap: "$76.2B mcap", price: "$1.00", chg: 0.00, up: true },
  { id: 8, name: "Dogecoin", ticker: "DOGE", rank: 8, iconBg: "#C2A633", icon: "bi-coin", vol: "$1.4B vol", mcap: "$23.4B mcap", price: "$0.158", chg: -4.22, up: false },
  { id: 9, name: "Cardano", ticker: "ADA", rank: 9, iconBg: "#0033AD", icon: "bi-circle", vol: "$0.9B vol", mcap: "$17.1B mcap", price: "$0.48", chg: -2.91, up: false },
  { id: 10, name: "Avalanche", ticker: "AVAX", rank: 10, iconBg: "#E84142", icon: "bi-diamond-fill", vol: "$0.8B vol", mcap: "$12.5B mcap", price: "$38.45", chg: 4.1, up: true },
  { id: 11, name: "Polkadot", ticker: "DOT", rank: 11, iconBg: "#E6007A", icon: "bi-x", vol: "$0.7B vol", mcap: "$8.2B mcap", price: "$7.89", chg: -2.3, up: false },
  { id: 12, name: "Chainlink", ticker: "LINK", rank: 12, iconBg: "#2A5ADA", icon: "bi-link-45deg", vol: "$0.6B vol", mcap: "$4.5B mcap", price: "$14.23", chg: 1.8, up: true },
];

const SEARCH_STOCKS = [
  { id: 101, name: "NVIDIA", ticker: "NVDA", iconBg: "#76b900", icon: "bi-cpu-fill", vol: "GHS 360.1M vol", mcap: "GHS 4.5T mcap", price: "GHS 185.39", chg: -5.05, up: false },
  { id: 102, name: "Apple", ticker: "AAPL", iconBg: "#555", icon: "bi-apple", vol: "GHS 32.2M vol", mcap: "GHS 4T mcap", price: "GHS 273.03", chg: -0.44, up: false },
  { id: 103, name: "Alphabet Inc. Class C", ticker: "GOOG", iconBg: "#4285F4", icon: "bi-google", vol: "GHS 22.2M vol", mcap: "GHS 3.7T mcap", price: "GHS 306.18", chg: -2.19, up: false },
  { id: 104, name: "Microsoft", ticker: "MSFT", iconBg: "#00A4EF", icon: "bi-windows", vol: "GHS 18.5M vol", mcap: "GHS 3.2T mcap", price: "GHS 422.81", chg: 0.74, up: true },
  { id: 105, name: "Amazon", ticker: "AMZN", iconBg: "#FF9900", icon: "bi-box", vol: "GHS 27.1M vol", mcap: "GHS 2.1T mcap", price: "GHS 198.56", chg: -1.33, up: false },
  { id: 106, name: "Tesla", ticker: "TSLA", iconBg: "#CC0000", icon: "bi-car-front", vol: "GHS 45.2M vol", mcap: "GHS 820B mcap", price: "GHS 259.40", chg: 2.87, up: true },
];

const SEARCH_PREDICTIONS = [
  { id: 201, name: "Will BTC hit $100k in 2025?", ticker: "BTC100K", iconBg: "#0052FF", icon: "bi-question-circle", vol: "GHS 12.4M vol", mcap: "GHS 48.3M mcap", price: "GHS 0.62", chg: 5.12, up: true },
  { id: 202, name: "S&P 500 above 6000 by Q2?", ticker: "SPX6K", iconBg: "#222", icon: "bi-graph-up-arrow", vol: "GHS 8.1M vol", mcap: "GHS 31.2M mcap", price: "GHS 0.71", chg: -2.44, up: false },
];

const SEARCH_PERPETUALS = [
  { id: 301, name: "Bitcoin Perpetual", ticker: "BTC-PERP", iconBg: "#F7931A", icon: "bi-currency-bitcoin", vol: "GHS 4.2B vol", mcap: "—", price: "GHS 67,312.00", chg: -2.08, up: false },
  { id: 302, name: "Ethereum Perpetual", ticker: "ETH-PERP", iconBg: "#627EEA", icon: "bi-lightning-charge-fill", vol: "GHS 1.8B vol", mcap: "—", price: "GHS 2,028.50", chg: -3.37, up: false },
  { id: 303, name: "Solana Perpetual", ticker: "SOL-PERP", iconBg: "#9945FF", icon: "bi-sun", vol: "GHS 622M vol", mcap: "—", price: "GHS 139.10", chg: 1.19, up: true },
];

const SEARCH_FUTURES = [
  { id: 401, name: "Bitcoin Futures Mar 25", ticker: "BTCZ25", iconBg: "#F7931A", icon: "bi-currency-bitcoin", vol: "GHS 980M vol", mcap: "—", price: "GHS 67,890.00", chg: -1.94, up: false },
  { id: 402, name: "Ethereum Futures Mar 25", ticker: "ETHZ25", iconBg: "#627EEA", icon: "bi-lightning-charge-fill", vol: "GHS 420M vol", mcap: "—", price: "GHS 2,044.00", chg: -3.11, up: false },
];

const ALL_DATA = {
  Crypto: SEARCH_CRYPTO.map(i => ({ ...i, isCrypto: true })),
  Stocks: SEARCH_STOCKS,
  Predictions: SEARCH_PREDICTIONS,
  Perpetuals: SEARCH_PERPETUALS.map(i => ({ ...i, isCrypto: true })),
  Futures: SEARCH_FUTURES.map(i => ({ ...i, isCrypto: true })),
};

const TABS = ["Top", "Crypto", "Stocks", "Predictions", "Perpetuals", "Futures"];

function SearchResultRow({ item, showRank }) {
  return (
    <div className="sr-row">
      <div className="sr-row-left">
        <div className="sr-coin-icon" style={{ background: item.iconBg }}>
          {item.isCrypto ? (
            <CryptoIcon symbol={item.ticker.split('-')[0].replace('Z25', '')} size={32} />
          ) : (
            <i className={`bi ${item.icon}`} />
          )}
        </div>
        <div className="sr-row-info">
          <div className="sr-row-name">
            {item.name}
            {showRank && item.rank && (
              <span className="sr-rank-badge">#{item.rank}</span>
            )}
          </div>
          <div className="sr-row-ticker">{item.ticker}</div>
        </div>
      </div>
      <div className="sr-row-mid">
        <div className="sr-row-vol">{item.vol}</div>
        <div className="sr-row-mcap">{item.mcap}</div>
      </div>
      <div className="sr-row-right">
        <div className="sr-row-price">{item.price}</div>
        <div className={`sr-row-chg ${item.up ? "up" : "dn"}`}>
          {item.chg === 0 ? "0.00%" : `↘ ${Math.abs(item.chg).toFixed(2)}%`}
          {item.up && item.chg !== 0 ? <span style={{ display: "none" }} /> : null}
        </div>
      </div>
    </div>
  );
}

function getTopResults() {
  // Top 3 crypto + 3 stocks
  return {
    CRYPTO: SEARCH_CRYPTO.slice(0, 3),
    STOCKS: SEARCH_STOCKS.slice(0, 3),
  };
}

function filterAll(query) {
  const q = query.toLowerCase();
  const results = {};
  for (const [cat, items] of Object.entries(ALL_DATA)) {
    const filtered = items.filter(
      (i) =>
        i.name.toLowerCase().includes(q) ||
        i.ticker.toLowerCase().includes(q)
    );
    if (filtered.length) results[cat] = filtered;
  }
  return results;
}

function SearchOverlay({ open, onClose }) {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("Top");
  const overlayRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveTab("Top");
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  if (!open) return null;

  // Determine what to show
  let sections = null;
  const hasQuery = query.trim().length > 0;

  if (hasQuery) {
    const results = filterAll(query.trim());
    sections = Object.entries(results).map(([cat, items]) => ({ label: cat, items, showRank: cat === "Crypto" }));
  } else if (activeTab === "Top") {
    const top = getTopResults();
    sections = [
      { label: "CRYPTO", items: top.CRYPTO, showRank: true },
      { label: "STOCKS", items: top.STOCKS, showRank: false },
    ];
  } else {
    const items = ALL_DATA[activeTab] || [];
    sections = [{ label: activeTab.toUpperCase(), items, showRank: activeTab === "Crypto" }];
  }

  return (
    <div className="sr-backdrop" ref={overlayRef} onClick={handleBackdropClick}>
      <div className="sr-modal" role="dialog" aria-label="Search">
        {/* Search input */}
        <div className="sr-input-wrap">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="sr-search-icon">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
          </svg>
          <input
            ref={inputRef}
            className="sr-input"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button className="sr-clear-btn" onClick={() => setQuery("")} aria-label="Clear">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
              </svg>
            </button>
          )}
        </div>

        {/* Tabs */}
        {!hasQuery && (
          <div className="sr-tabs">
            {TABS.map((tab) => (
              <button
                key={tab}
                className={`sr-tab${activeTab === tab ? " active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        )}

        {/* Results */}
        <div className="sr-results">
          {sections && sections.length > 0 ? (
            sections.map((sec) => (
              <div key={sec.label} className="sr-section">
                <div className="sr-section-label">{sec.label}</div>
                {sec.items.map((item) => (
                  <SearchResultRow key={item.id} item={item} showRank={sec.showRank} />
                ))}
              </div>
            ))
          ) : (
            <div className="sr-empty">No results found</div>
          )}
        </div>
      </div>

      <style>{`
        .sr-backdrop {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: rgba(0,0,0,0.45);
          display: flex;
          justify-content: center;
          padding-top: 80px;
          animation: srFadeIn 0.15s ease;
        }

        @keyframes srFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .sr-modal {
          background: #fff;
          border-radius: 16px;
          width: 560px;
          max-width: calc(100vw - 32px);
          max-height: 70vh;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: 0 24px 60px rgba(0,0,0,0.18);
          animation: srSlideDown 0.18s cubic-bezier(0.34,1.56,0.64,1);
        }

        @keyframes srSlideDown {
          from { transform: translateY(-12px) scale(0.98); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }

        /* Input */
        .sr-input-wrap {
          display: flex;
          align-items: center;
          padding: 14px 16px;
          gap: 10px;
          border-bottom: 1px solid #f0f0f0;
        }

        .sr-search-icon {
          color: #888;
          flex-shrink: 0;
        }

        .sr-input {
          flex: 1;
          border: none;
          outline: none;
          font-size: 15px;
          font-family: inherit;
          color: #111;
          background: transparent;
        }

        .sr-input::placeholder {
          color: #aaa;
        }

        .sr-clear-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 2px;
          color: #aaa;
          display: flex;
          align-items: center;
          border-radius: 50%;
          transition: color 0.15s;
        }

        .sr-clear-btn:hover {
          color: #333;
        }

        /* Tabs */
        .sr-tabs {
          display: flex;
          gap: 6px;
          padding: 12px 16px 8px;
          border-bottom: 1px solid #f0f0f0;
          overflow-x: auto;
          scrollbar-width: none;
        }

        .sr-tabs::-webkit-scrollbar { display: none; }

        .sr-tab {
          padding: 7px 16px;
          border-radius: 999px;
          border: 1.5px solid #e8e8e8;
          background: #fff;
          font-size: 13.5px;
          font-weight: 500;
          color: #333;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.15s;
          font-family: inherit;
        }

        .sr-tab:hover {
          border-color: #ccc;
          background: #f8f8f8;
        }

        .sr-tab.active {
          background: #111;
          color: #fff;
          border-color: #111;
        }

        /* Results */
        .sr-results {
          overflow-y: auto;
          flex: 1;
          padding: 4px 0 8px;
        }

        .sr-section {
          padding-top: 4px;
        }

        .sr-section-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: #999;
          padding: 8px 20px 4px;
          text-transform: uppercase;
        }

        /* Row */
        .sr-row {
          display: flex;
          align-items: center;
          padding: 10px 20px;
          gap: 12px;
          cursor: pointer;
          transition: background 0.12s;
        }

        .sr-row:hover {
          background: #f7f8fa;
        }

        .sr-row-left {
          display: flex;
          align-items: center;
          gap: 12px;
          flex: 1;
          min-width: 0;
        }

        .sr-coin-icon {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          font-weight: 700;
          color: white;
          flex-shrink: 0;
        }

        .sr-row-info {
          min-width: 0;
        }

        .sr-row-name {
          font-size: 14px;
          font-weight: 600;
          color: #111;
          display: flex;
          align-items: center;
          gap: 6px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .sr-rank-badge {
          display: inline-flex;
          align-items: center;
          background: #f0f0f0;
          color: #555;
          font-size: 11px;
          font-weight: 600;
          padding: 1px 6px;
          border-radius: 5px;
        }

        .sr-row-ticker {
          font-size: 12px;
          color: #999;
          margin-top: 1px;
        }

        .sr-row-mid {
          text-align: right;
          flex-shrink: 0;
        }

        .sr-row-vol {
          font-size: 12px;
          color: #555;
        }

        .sr-row-mcap {
          font-size: 12px;
          color: #999;
          margin-top: 1px;
        }

        .sr-row-right {
          text-align: right;
          flex-shrink: 0;
          min-width: 100px;
        }

        .sr-row-price {
          font-size: 14px;
          font-weight: 600;
          color: #111;
        }

        .sr-row-chg {
          font-size: 12.5px;
          font-weight: 500;
          margin-top: 1px;
        }

        .sr-row-chg.dn {
          color: #cf304a;
        }

        .sr-row-chg.up {
          color: #05b169;
        }

        .sr-empty {
          text-align: center;
          color: #aaa;
          font-size: 14px;
          padding: 40px 20px;
        }
      `}</style>
    </div>
  );
}

/* ─── EXPLORE PAGE (cb2-*) ─── */
const Cb2Logo = ({ size = 22 }) => <i className="bi bi-c-circle-fill" style={{ fontSize: size, lineHeight: 1, color: "white" }} />;

const NAV_MENUS = {
  Individuals: {
    promo: { title: "System Update 2025", desc: "The next chapter of Coinbase. Live on X 12/17.", link: "Learn more", cardBg: "#FFFFFF", cardContent: individualImg },
    cols: [
      {
        items: [
          { icon: "bi-c-circle", title: "Buy and sell", desc: "Buy, sell, and use crypto" },
          { icon: "bi-square-fill", title: "Base App", desc: "Post, earn, trade, and chat, all in one place" },
          { icon: "bi-record-circle", title: "Coinbase One", desc: "Get zero trading fees and more" },
          { icon: "bi-gem", title: "Private Client", desc: "For trusts, family offices, UHNWIs" },
          { icon: "bi-link-45deg", title: "Onchain", desc: "Dive into the world of onchain apps" },
          { icon: "bi-lightbulb", title: "Learn", desc: "Crypto tips and guides" },
        ],
      },
      {
        items: [
          { icon: "bi-sliders2-vertical", title: "Advanced", desc: "Professional-grade trading tools" },
          { icon: "bi-percent", title: "Earn", desc: "Stake your crypto and earn rewards" },
          { icon: "bi-shield-check", title: "Coinbase Wealth", desc: "Institutional-grade services for UHNW" },
          { icon: "bi-credit-card-2-front", title: "Credit Card", desc: "Earn up to 4% bitcoin back" },
          { icon: "bi-credit-card", title: "Debit Card", desc: "Spend crypto, get crypto back" },
        ],
      },
    ],
  },
  Businesses: {
    promo: { title: "Businesses", desc: "Solutions for institutional clients.", link: "Learn more", cardBg: "#FFFFFF", cardContent: businessImg },
    cols: [
      { items: [{ icon: "bi-shop", title: "Business", desc: "Crypto trading and payments for startups and SMBs" }, { icon: "bi-coin", title: "Asset Listings", desc: "List your asset on Coinbase" }] },
      { items: [{ icon: "bi-cash-stack", title: "Payments", desc: "The stablecoin payments stack for commerce platforms" }, { icon: "bi-arrow-repeat", title: "Token Manager", desc: "The platform for token distributions, vesting, and lockups" }] },
    ],
  },
  Institutions: {
    promo: { title: "Institutions", desc: "Built for institutional traders.", link: "Learn more", cardBg: "#FFFFFF", cardContent: institutionsImg },
    cols: [
      {
        sectionTitle: "Prime",
        items: [
          { icon: "bi-graph-up", title: "Trading and Financing", desc: "Professional prime brokerage services" },
          { icon: "bi-shield-check", title: "Custody", desc: "Securely store all your digital assets" },
          { icon: "bi-stars", title: "Staking", desc: "Explore staking across our products" },
          { icon: "bi-wallet-fill", title: "Onchain Wallet", desc: "Institutional-grade wallet to get onchain" },
        ],
      },
      {
        sectionTitle: "Markets",
        items: [
          { icon: "bi-diagram-3-fill", title: "Exchange", desc: "Spot markets for high-frequency trading" },
          { icon: "bi-globe-americas", title: "International Exchange", desc: "Access perpetual futures markets" },
          { icon: "bi-lightning-charge", title: "Derivatives Exchange", desc: "Trade an accessible futures market" },
        ],
      },
    ],
  },
  Developers: {
    promo: { title: "Developers", desc: "Build on the world's leading crypto infrastructure.", link: "Learn more", cardBg: "#FFFFFF", cardContent: developersImg },
    cols: [
      {
        sectionTitle: "Coinbase Developer Platform",
        items: [
          { icon: "bi-plus-circle", title: "App Wallet", desc: "Integrate a non-custodial wallet into your app" },
          { icon: "bi-wallet2", title: "Smart Wallet", desc: "The easy, secure way to bring your users onchain" },
          { icon: "bi-lightning", title: "Base", desc: "The L2 that makes it easy to build onchain" },
          { icon: "bi-shield-check", title: "Onramps", desc: "The best way to buy crypto with fiat" },
        ],
      },
      {
        sectionTitle: "Solutions for any company",
        items: [
          { icon: "bi-bank", title: "Banks & Brokerages", desc: "Secure, regulated offerings for retail, private banking, & institutional clients" },
          { icon: "bi-credit-card", title: "Payment Firms", desc: "Near-instant, low-cost, global payment rails for modern providers" },
          { icon: "bi-rocket-takeoff", title: "Startups", desc: "Launch your business with the world's leader in crypto" },
        ],
      },
    ],
  },
  Company: {
    promo: { title: "Company", desc: "Our mission is to increase economic freedom in the world.", link: "Learn more", cardBg: "#FFFFFF", cardContent: companyImg },
    cols: [
      { items: [{ icon: "bi-info-circle", title: "About", desc: "Powering the crypto economy" }, { icon: "bi-briefcase", title: "Careers", desc: "Work with us" }, { icon: "bi-people", title: "Affiliates", desc: "Help introduce the world to crypto" }] },
      { items: [{ icon: "bi-journal-text", title: "Blog", desc: "Read the latest from Coinbase" }, { icon: "bi-chat-dots", title: "Support", desc: "Find answers to your questions" }, { icon: "bi-shield-lock", title: "Security", desc: "The most trusted & secure" }] },
    ],
  },
};

const USD_TO_GHS_RATE = 15.80;

const CB2_CRYPTO_DATA = [
  { id: 1, name: "Bitcoin", ticker: "BTC", icon: "bitcoin", iconBg: "#F7931A", price: 62440.47 * USD_TO_GHS_RATE, change: 2.41, mktCap: "$1.4T", volume: "$46B", sparkColor: "#F7931A", hasTrade: true },
  { id: 2, name: "Ethereum", ticker: "ETH", icon: "ethereum", iconBg: "#627EEA", price: 2190.29 * USD_TO_GHS_RATE, change: -1.04, mktCap: "$363B", volume: "$25B", sparkColor: "#627EEA", hasTrade: true },
  { id: 3, name: "Tether", ticker: "USDT", icon: "tether", iconBg: "#26A17B", price: 1.00, change: 0.0, mktCap: "$138B", volume: "$45B", sparkColor: "#26A17B", hasTrade: true },
  { id: 4, name: "XRP", ticker: "XRP", icon: "xrp", iconBg: "#346AA9", price: 1.93, change: -1.85, mktCap: "$108B", volume: "$3.9B", sparkColor: "#346AA9", hasTrade: true },
  { id: 5, name: "BNB", ticker: "BNB", icon: "bnb", iconBg: "#F3BA2F", price: 39.83 * USD_TO_GHS_RATE, change: -0.83, mktCap: "$95B", volume: "$1.7B", sparkColor: "#F3BA2F", hasTrade: true },
  { id: 6, name: "USDC", ticker: "USDC", icon: "usdc", iconBg: "#2775CA", price: 1.00, change: 0.0, mktCap: "$52B", volume: "$5.4B", sparkColor: "#2775CA", badge: "Earns 5.00% APY", hasTrade: true },
  { id: 7, name: "Solana", ticker: "SOL", icon: "solana", iconBg: "#9945FF", price: 139.42 * USD_TO_GHS_RATE, change: -2.97, mktCap: "$64B", volume: "$2.8B", sparkColor: "#9945FF", hasTrade: true },
  { id: 8, name: "TRON", ticker: "TRX", icon: "bi-hexagon-fill", iconBg: "#E60012", price: 0.15 * USD_TO_GHS_RATE, change: -0.05, mktCap: "$22B", volume: "$0.4B", sparkColor: "#E60012", hasTrade: false },
  { id: 9, name: "Dogecoin", ticker: "DOGE", icon: "dogecoin", iconBg: "#C2A633", price: 0.16 * USD_TO_GHS_RATE, change: -6.39, mktCap: "$52B", volume: "$0.8B", sparkColor: "#C2A633", hasTrade: true },
  { id: 10, name: "Cardano", ticker: "ADA", icon: "cardano", iconBg: "#0033AD", price: 0.48 * USD_TO_GHS_RATE, change: -7.22, mktCap: "$17B", volume: "$0.5B", sparkColor: "#0033AD", hasTrade: true },
  { id: 11, name: "Avalanche", ticker: "AVAX", icon: "bi-diamond-fill", iconBg: "#E84142", price: 38.45 * USD_TO_GHS_RATE, change: 4.1, mktCap: "$14B", volume: "$0.6B", sparkColor: "#E84142", hasTrade: true },
  { id: 12, name: "Polkadot", ticker: "DOT", icon: "bi-x", iconBg: "#E6007A", price: 7.89 * USD_TO_GHS_RATE, change: -2.3, mktCap: "$11B", volume: "$0.3B", sparkColor: "#E6007A", hasTrade: true },
  { id: 13, name: "Chainlink", ticker: "LINK", icon: "bi-link-45deg", iconBg: "#2A5ADA", price: 14.23 * USD_TO_GHS_RATE, change: 1.8, mktCap: "$8B", volume: "$0.4B", sparkColor: "#2A5ADA", hasTrade: true },
];

const CB2_MARKET_STATS = [
  { label: "Total market cap", val: "GHS 24.12T", chgPct: "-1.84%", up: false, sparkUp: false },
  { label: "Trade volume", val: "GHS 2.33T", chgPct: "+6.71%", up: true, sparkUp: true },
  { label: "Buy-sell ratio", val: "GHS 0.78", chgPct: "-15.30%", up: false, sparkUp: false },
  { label: "BTC dominance", val: "59.84%", chgPct: "-0.17%", up: false, sparkUp: false },
];

const CB2_TOP_MOVERS = [
  { ticker: "CFG", chg: "+64.61%", price: "GHS 1.66", icon: "bi-wind", up: true },
  { ticker: "RAVE", chg: "+34.05%", price: "GHS 4.10", icon: "bi-music-note", up: true },
];

const CB2_NEW_ON_CB = [
  { ticker: "HYPE", name: "Hyperliquid", added: "Added Feb 5", icon: "bi-droplet" },
  { ticker: "JUPITER", name: "Jupiter", added: "Added Dec 9", icon: "bi-globe" },
];

function CB2Sparkline({ color, up, width = 70, height = 36 }) {
  const pts = 12;
  let y = height / 2;
  const points = [];
  for (let i = 0; i < pts; i++) {
    y += (Math.random() - (up ? 0.4 : 0.6)) * 6;
    y = Math.max(4, Math.min(height - 4, y));
    points.push([((i / (pts - 1)) * width).toFixed(1), y.toFixed(1)]);
  }
  const d = points.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(" ");
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none">
      <path d={d} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CB2StatSparkline({ up }) {
  const color = up ? "#05B169" : "#CF304A";
  const pts = 20;
  let y = 30;
  const points = [];
  for (let i = 0; i < pts; i++) {
    y += (Math.random() - (up ? 0.45 : 0.55)) * 6;
    y = Math.max(4, Math.min(44, y));
    points.push([((i / (pts - 1)) * 200).toFixed(1), y.toFixed(1)]);
  }
  const d = points.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(" ");
  const fillPts = [...points, ["200", "52"], ["0", "52"]];
  const fd = fillPts
    .map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`))
    .join(" ")
    .concat("Z");
  return (
    <svg width="100%" height="52" viewBox="0 0 200 52" fill="none" preserveAspectRatio="none">
      <path d={fd} fill={color} fillOpacity="0.08" />
      <path d={d} stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CB2MegaMenu({ data, onClose }) {
  return (
    <div className="cb2-mega" onMouseLeave={onClose}>
      <div className="cb2-mega-col">
        {data.cols[0]?.sectionTitle && (
          <a href="#" className="cb2-mega-section-link">
            {data.cols[0].sectionTitle}
            <i className="bi bi-chevron-right" />
          </a>
        )}
        {data.cols[0]?.items.map((item) => (
          <a key={item.title} href="#" className="cb2-mega-item">
            <div className="cb2-mega-icon">
              <i className={`bi ${item.icon}`} />
            </div>
            <div className="cb2-mega-text">
              <div className="cb2-mega-title">{item.title}</div>
              <div className="cb2-mega-desc">{item.desc}</div>
            </div>
          </a>
        ))}
      </div>

      <div className="cb2-mega-col">
        {data.cols[1]?.sectionTitle && <div className="cb2-mega-section-title">{data.cols[1].sectionTitle}</div>}
        {data.cols[1]?.items.map((item) => (
          <a key={item.title} href="#" className="cb2-mega-item">
            <div className="cb2-mega-icon">
              <i className={`bi ${item.icon}`} />
            </div>
            <div className="cb2-mega-text">
              <div className="cb2-mega-title">{item.title}</div>
              <div className="cb2-mega-desc">{item.desc}</div>
            </div>
          </a>
        ))}
      </div>

      <div className="cb2-mega-col cb2-mega-promo">
        <div className="cb2-mega-promo-inner">
          <div className="cb2-mega-promo-card" style={{ background: data.promo.cardBg }}>
            {data.promo.cardContent.includes('.') ? (
              <img src={data.promo.cardContent} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <i className={`bi ${data.promo.cardContent}`} style={{ fontSize: 48, lineHeight: 1, color: data.promo.cardBg === "#f0f0f0" ? "#111" : "white" }} />
            )}
          </div>
          <div className="cb2-mega-promo-content">
            <div className="cb2-mega-promo-title">{data.promo.title}</div>
            <div className="cb2-mega-promo-desc">{data.promo.desc}</div>
            <a href="#" className="cb2-mega-promo-link">
              {data.promo.link}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function CB2Nav({ onNavigateHome }) {
  const [openMenu, setOpenMenu] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const navRef = useRef(null);

  const handleNavClick = useCallback(
    (name) => {
      if (name === "Cryptocurrencies") {
        setOpenMenu(null);
        // We handle navigation via onClick in the button or capture listener
        return;
      }
      setOpenMenu((prev) => (prev === name ? null : name));
    },
    [setOpenMenu]
  );

  useEffect(() => {
    const handler = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setOpenMenu(null);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <>
      <div className={`cb-blur-overlay${openMenu ? " active" : ""}`} onClick={() => setOpenMenu(null)} />
      <nav className="cb2-nav" ref={navRef}>
        <div className="cb2-nav-inner">
          <a
            href="#"
            className="cb2-logo"
            onClick={(e) => {
              e.preventDefault();
              onNavigateHome();
            }}
          >
            <Logo size={18} />
          </a>

          <ul className="cb2-nav-links">
            <li className="cb2-nav-item">
              <button className="cb2-nav-btn" onClick={() => handleNavClick("Cryptocurrencies")}>
                Cryptocurrencies
              </button>
            </li>
            {Object.keys(NAV_MENUS).map((name) => (
              <li key={name} className="cb2-nav-item">
                <button
                  className={`cb2-nav-btn${openMenu === name ? " open" : ""}`}
                  onClick={() => handleNavClick(name)}
                  onMouseEnter={() => setOpenMenu(name)}
                >
                  {name}
                </button>
                {openMenu === name && NAV_MENUS[name] && <CB2MegaMenu data={NAV_MENUS[name]} onClose={() => setOpenMenu(null)} />}
              </li>
            ))}
          </ul>

          <div className="cb2-nav-actions">
            <button className="cb2-icon-btn" onClick={() => setSearchOpen(true)}>
              <SearchIcon />
            </button>
            <button className="cb2-icon-btn">
              <GlobeIcon />
            </button>
            <a href="#" className="cb2-btn-signin">
              Sign in
            </a>
            <a href="#" className="cb2-btn-signup">
              Sign up
            </a>
          </div>
        </div>
      </nav>
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

function ExplorePage({ onNavigateHome }) {
  const [search, setSearch] = useState("");
  const [sortCol, setSortCol] = useState("mktCap");
  const [sortDir, setSortDir] = useState("desc");
  const [starred, setStarred] = useState(new Set());
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All assets");
  const [visibleCount, setVisibleCount] = useState(10);

  // Fetch real Coinbase explore data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const exploreCards = await getCachedExploreCardData();
        console.log('Explore cards fetched:', exploreCards);

        // Transform explore cards to crypto data format
        const cryptoData = exploreCards
          .filter(card => card.price && (card.price.includes('$') || card.price.includes('GHS')))
          .map((card, index) => ({
            id: index + 1,
            name: card.title,
            ticker: card.title === 'Bitcoin' ? 'BTC' :
              card.title === 'Ethereum' ? 'ETH' :
                card.title === 'Solana' ? 'SOL' :
                  card.title === 'Cardano' ? 'ADA' :
                    card.title === 'Avalanche' ? 'AVAX' :
                      card.title === 'Polkadot' ? 'DOT' :
                        card.title === 'Chainlink' ? 'LINK' :
                          card.title === 'USD Coin' ? 'USDC' :
                            card.title === 'Tether' ? 'USDT' :
                              card.title === 'XRP' ? 'XRP' :
                                card.title === 'BNB' ? 'BNB' :
                                  card.title === 'Dogecoin' ? 'DOGE' : card.title.substring(0, 4).toUpperCase(),
            icon: getCardIcon(card.title),
            iconBg: card.color,
            price: parseFloat(card.price.replace(/[^0-9.]/g, '')) || 0,
            change: parseFloat(card.change?.replace(/[^0-9.-]/g, '')) || 0,
            mktCap: card.title === 'Bitcoin' ? '$1.3T' :
              card.title === 'Ethereum' ? '$245.4B' :
                card.title === 'Solana' ? '$66.3B' :
                  card.title === 'Cardano' ? '$17.1B' :
                    card.title === 'Avalanche' ? '$12.5B' :
                      card.title === 'Polkadot' ? '$8.2B' :
                        card.title === 'Chainlink' ? '$4.5B' :
                          card.title === 'USD Coin' ? '$76.2B' :
                            card.title === 'Tether' ? '$183.5B' : '$1B',
            volume: card.title === 'Bitcoin' ? '$46B' :
              card.title === 'Ethereum' ? '$25.6B' :
                card.title === 'Solana' ? '$5.1B' :
                  card.title === 'Cardano' ? '$0.9B' :
                    card.title === 'Avalanche' ? '$0.8B' :
                      card.title === 'Polkadot' ? '$0.7B' :
                        card.title === 'Chainlink' ? '$0.6B' :
                          card.title === 'USD Coin' ? '$13.8B' : '$1B',
            sparkColor: card.color,
            hasTrade: true
          }));

        setData(cryptoData);
        console.log('Transformed crypto data:', cryptoData);
      } catch (error) {
        console.error('Error fetching explore data:', error);
        // Fallback to mock data
        setData(CB2_CRYPTO_DATA);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Helper function to get icon name
  function getCardIcon(title) {
    const icons = {
      'Bitcoin': 'bi-currency-bitcoin',
      'Ethereum': 'bi-lightning-charge-fill',
      'Solana': 'bi-sun',
      'Cardano': 'bi-circle',
      'Avalanche': 'bi-diamond-fill',
      'Polkadot': 'bi-x',
      'Chainlink': 'bi-link-45deg',
      'USD Coin': 'bi-currency-dollar',
      'Tether': 'bi-cash-coin',
      'XRP': 'bi-x',
      'BNB': 'bi-diamond-fill',
      'Dogecoin': 'bi-coin'
    };
    return icons[title] || 'bi-circle';
  }

  useEffect(() => {
    const t = setInterval(() => {
      setData((prev) =>
        prev.map((a) => {
          if (a.ticker === "USDC" || a.ticker === "USDT") return a;
          return { ...a, price: +(a.price * (1 + (Math.random() - 0.5) * 0.001)).toFixed(2) };
        })
      );
    }, 2000);
    return () => clearInterval(t);
  }, []);

  const toggleStar = (id, e) => {
    e.stopPropagation();
    setStarred((prev) => {
      const s = new Set(prev);
      s.has(id) ? s.delete(id) : s.add(id);
      return s;
    });
  };

  const handleSort = (col) => {
    if (sortCol === col) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortCol(col);
      setSortDir("desc");
    }
  };

  const filtered = data
    .filter((a) => {
      const matchSearch = a.name.toLowerCase().includes(search.toLowerCase()) || a.ticker.toLowerCase().includes(search.toLowerCase());
      if (activeFilter === "All assets") return matchSearch;
      if (activeFilter === "Tradable") return matchSearch && a.hasTrade;
      if (activeFilter === "Gainers") return matchSearch && a.change > 0;
      if (activeFilter === "Losers") return matchSearch && a.change < 0;
      return matchSearch;
    })
    .sort((a, b) => {
      let va = a[sortCol];
      let vb = b[sortCol];
      if (sortCol === "mktCap") {
        va = parseFloat(a.mktCap.replace(/[^0-9.]/g, "")) || 0;
        vb = parseFloat(b.mktCap.replace(/[^0-9.]/g, "")) || 0;
        if (a.mktCap.includes('T')) va *= 1000;
        if (b.mktCap.includes('T')) vb *= 1000;
      }
      if (sortCol === "volume") {
        va = parseFloat(a.volume.replace(/[^0-9.]/g, "")) || 0;
        vb = parseFloat(b.volume.replace(/[^0-9.]/g, "")) || 0;
        if (a.volume.includes('B')) va *= 1000;
        if (b.volume.includes('B')) vb *= 1000;
      }
      return sortDir === "asc" ? va - vb : vb - va;
    });

  const SortIcon = ({ col }) => {
    if (sortCol !== col) return <span className="sort-icon">⇅</span>;
    return <span className="sort-icon">{sortDir === "asc" ? "↑" : "↓"}</span>;
  };

  return (
    <div className="cb2-root">
      <CB2Nav onNavigateHome={onNavigateHome} />
      <div className="cb2-page">
        <main className="cb2-main">
          <div className="cb2-explore-header">
            <h1 style={{ fontSize: 42, marginBottom: 8 }}>Explore crypto</h1>
            <div className="cb2-index-bar" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#050F19' }}>Coinbase 50 Index is down</span>
              <span className="dn" style={{ fontSize: 13, fontWeight: 600 }}>↘ 2.56% (24hrs)</span>
            </div>
            <div className="cb2-search-bar" style={{ maxWidth: 640 }}>
              <i className="bi bi-search" style={{ fontSize: 16, lineHeight: 1, color: "#aaa" }} />
              <input placeholder="Search for an asset" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
          </div>

          <div className="cb2-section">
            <div className="cb2-section-header">
              <h2>Market stats</h2>
              <div className="cb2-section-nav">
                <button>←</button>
                <button>→</button>
              </div>
            </div>
            <p className="cb2-section-desc">
              The overall crypto market is growing this week. As of today, the total crypto market capitalization is 24.12 trillion, representing a 1.54% increase from last week.
            </p>
            <div className="cb2-read-more">Read more</div>
            <div className="cb2-stats-grid">
              {CB2_MARKET_STATS.map((s) => (
                <div key={s.label} className="cb2-stat-card">
                  <div className="cb2-stat-label">{s.label}</div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                    <div className="cb2-stat-value">{s.val}</div>
                    <div className={`cb2-stat-chg ${s.up ? "up" : "dn"}`}>{s.up ? "↗" : "↘"} {s.chgPct}</div>
                  </div>
                  <div className="cb2-stat-sparkline">
                    <CB2StatSparkline up={s.sparkUp} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="cb2-section">
            <div className="cb2-table-header">
              <h2>
                Crypto market prices <span className="cb2-asset-count">18,873 assets</span>
              </h2>
              <p className="cb2-section-desc" style={{ marginTop: 8 }}>
                The overall crypto market is growing this week. As of today, the total crypto market capitalization is 24.12 trillion, representing a 1.54% increase from last week.
              </p>
              <div className="cb2-read-more" style={{ marginTop: 4 }}>
                Read more
              </div>
            </div>

            <div className="cb2-filters">
              <div className="cb2-filters" style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
                {["All assets", "Tradable", "Gainers", "Losers"].map(f => (
                  <button
                    key={f}
                    className={`cb2-filter-btn${activeFilter === f ? " active" : ""}`}
                    onClick={() => setActiveFilter(f)}
                    style={{
                      padding: '8px 16px',
                      borderRadius: 100,
                      border: '1px solid #ECEFF1',
                      background: activeFilter === f ? '#0052FF' : 'white',
                      color: activeFilter === f ? 'white' : '#050F19',
                      fontSize: 14,
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="cb2-table-wrap">
              <table className="cb2-table">
                <thead>
                  <tr>
                    <th style={{ width: 20 }}></th>
                    <th>Asset</th>
                    <th className="sortable right" onClick={() => handleSort("price")}>
                      Market price <SortIcon col="price" />
                    </th>
                    <th className="center">Chart</th>
                    <th className="sortable right" onClick={() => handleSort("change")}>
                      Change <SortIcon col="change" />
                    </th>
                    <th className={`sortable right${sortCol === "mktCap" ? " active" : ""}`} onClick={() => handleSort("mktCap")}>
                      Mkt cap <SortIcon col="mktCap" />
                    </th>
                    <th className="sortable right" onClick={() => handleSort("volume")}>
                      Volume <SortIcon col="volume" />
                    </th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.slice(0, visibleCount).map((row) => (
                    <tr key={row.id}>
                      <td>
                        <span className={`cb2-star${starred.has(row.id) ? " active" : ""}`} onClick={(e) => toggleStar(row.id, e)}>
                          <i className={`bi ${starred.has(row.id) ? "bi-star-fill" : "bi-star"}`} />
                        </span>
                      </td>
                      <td>
                        <div className="cb2-asset-cell">
                          <div className="cb2-asset-coin-icon" style={{ background: row.iconBg }}>
                            <CryptoIcon symbol={row.ticker} size={32} />
                          </div>
                          <div>
                            <div className="cb2-asset-name">
                              {row.name}
                              {row.badge && <span className="cb2-asset-badge">{row.badge}</span>}
                            </div>
                            <div className="cb2-asset-ticker">{row.ticker}</div>
                          </div>
                        </div>
                      </td>
                      <td className="right">
                        <span className="cb2-price">
                          GHS {row.price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                      </td>
                      <td className="center cb2-sparkline-cell">
                        <CB2Sparkline color={row.sparkColor} up={row.change >= 0} />
                      </td>
                      <td className="right">
                        <span className={`cb2-change ${row.change > 0 ? "up" : row.change < 0 ? "dn" : ""}`}>
                          {row.change === 0 ? "0.00%" : (row.change > 0 ? "↗ " : "↘ ") + Math.abs(row.change).toFixed(2) + "%"}
                        </span>
                      </td>
                      <td className="right">
                        <span className="cb2-mktcap">{row.mktCap}</span>
                      </td>
                      <td className="right">
                        <span className="cb2-volume">{row.volume}</span>
                      </td>
                      <td>{row.hasTrade && <button className="cb2-trade-btn">Trade</button>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {visibleCount < filtered.length && (
              <div style={{ textAlign: 'center', marginTop: 32 }}>
                <button
                  onClick={() => setVisibleCount(prev => prev + 10)}
                  style={{
                    padding: '12px 24px',
                    borderRadius: 100,
                    border: '1px solid #ECEFF1',
                    background: 'white',
                    color: '#0052FF',
                    fontSize: 15,
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Load more
                </button>
              </div>
            )}
          </div>
        </main>

        <aside className="cb2-sidebar">
          <div className="cb2-sidebar-card">
            <div className="cb2-sidebar-deco">🌟</div>
            <h3>Get started</h3>
            <p>Create your account today</p>
            <button className="cb2-signup-btn">Sign up</button>
          </div>

          <div className="cb2-movers-card">
            <div className="cb2-movers-header">
              <h3>Top movers</h3>
              <div className="cb2-movers-nav">
                <button>←</button>
                <button>→</button>
              </div>
            </div>
            <div className="cb2-24hr">24hr change</div>
            <div className="cb2-mover-grid">
              {CB2_TOP_MOVERS.map((m) => (
                <div key={m.ticker} className="cb2-mover-tile">
                  <div className="cb2-mover-icon">
                    <i className={`bi ${m.icon}`} />
                  </div>
                  <div className="cb2-mover-ticker">{m.ticker}</div>
                  <div className={`cb2-mover-chg ${m.up ? "up" : "dn"}`}>{m.chg}</div>
                  <div className="cb2-mover-price">{m.price}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="cb2-newon-card">
            <div className="cb2-newon-header">
              <h3>New on Coinbase</h3>
              <div className="cb2-movers-nav">
                <button>←</button>
                <button>→</button>
              </div>
            </div>
            <div className="cb2-newon-grid">
              {CB2_NEW_ON_CB.map((n) => (
                <div key={n.ticker} className="cb2-newon-tile">
                  <div className="cb2-newon-icon">
                    <i className={`bi ${n.icon}`} />
                  </div>
                  <div className="cb2-newon-ticker">{n.ticker}</div>
                  <div className="cb2-newon-name">{n.name}</div>
                  <div className="cb2-newon-added">{n.added}</div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

/* ─── DATA ─── */
const CANDLE_DATA = [
  { o: 60, c: 72, h: 76, l: 54 },
  { o: 72, c: 66, h: 74, l: 62 },
  { o: 66, c: 82, h: 86, l: 64 },
  { o: 82, c: 76, h: 84, l: 72 },
  { o: 76, c: 90, h: 93, l: 74 },
  { o: 90, c: 84, h: 92, l: 80 },
  { o: 84, c: 96, h: 100, l: 82 },
  { o: 96, c: 91, h: 98, l: 88 },
  { o: 91, c: 106, h: 110, l: 90 },
  { o: 106, c: 100, h: 112, l: 97 },
  { o: 100, c: 114, h: 117, l: 98 },
  { o: 114, c: 109, h: 118, l: 106 },
  { o: 109, c: 122, h: 126, l: 108 },
  { o: 122, c: 117, h: 124, l: 113 },
  { o: 117, c: 130, h: 134, l: 115 },
];

const INITIAL_ASSETS = [
  { name: "Bitcoin", icon: "bi-currency-bitcoin", bg: "#F7931A", price: 712609.77, chg: -1.47, newOn: false },
  { name: "Ethereum", icon: "bi-lightning-charge-fill", bg: "#627EEA", price: 21259.36, chg: -1.65, newOn: false },
  { name: "Tether", icon: "bi-cash-coin", bg: "#26A17B", price: 10.65, chg: -0.01, newOn: false },
  { name: "XRP", icon: "bi-x", bg: "#346AA9", price: 14.92, chg: -2.79, newOn: false },
  { name: "BNB", icon: "bi-diamond-fill", bg: "#F3BA2F", price: 6587.52, chg: -0.72, newOn: false },
  { name: "USDC", icon: "bi-currency-dollar", bg: "#2775CA", price: 10.65, chg: 0.0, newOn: true },
];

const NAV_LINKS = ["Cryptocurrencies", "Individuals", "Businesses", "Institutions", "Developers", "Company"];
const ASSET_TABS = ["Tradable", "Top gainers", "New on Coinbase"];

const ORDER_BOOK_ASKS = [
  { price: "43,420", qty: "0.12" },
  { price: "43,380", qty: "0.34" },
  { price: "43,350", qty: "0.87" },
];
const ORDER_BOOK_BIDS = [
  { price: "43,270", qty: "0.56" },
  { price: "43,240", qty: "1.23" },
  { price: "43,210", qty: "0.94" },
  { price: "43,190", qty: "2.01" },
];

const PHONE_ROWS = [
  { icon: "bi-currency-bitcoin", iconBg: "#EBF0FF", iconColor: "#0052FF", name: "Crypto", val: "$14,186.12", up: false },
  { icon: "bi-graph-up", iconBg: "#f5f5f5", iconColor: "#333", name: "Stocks", val: "$8,133.98", up: false },
  { icon: "bi-arrow-left-right", iconBg: "#f5f5f5", iconColor: "#333", name: "Derivatives", val: "↗ $148.84", up: true },
  { icon: "bi-magic", iconBg: "#f5f5f5", iconColor: "#333", name: "Predictions", val: "↗ $42.69", up: true },
  { icon: "bi-cash", iconBg: "#f5f5f5", iconColor: "#555", name: "Cash", val: "$10,124.22", up: false },
];

const ARTICLES = [
  {
    bg: "radial-gradient(circle at 50% 60%,#0052FF 0%,#001266 55%,#000 100%)",
    thumb: (
      <div
        style={{
          width: 68,
          height: 68,
          borderRadius: "50%",
          background: "var(--blue)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <i className="bi bi-currency-dollar" style={{ fontSize: 40, color: "white" }} />
      </div>
    ),
    title: "USDC: The digital dollar for the global crypto economy",
    excerpt:
      "Coinbase believes crypto will be part of the solution for creating an open financial system that is both more efficient and more...",
  },
  {
    bg: "linear-gradient(135deg,#0052FF,#2775FF)",
    thumb: <i className="bi bi-bank" style={{ fontSize: 60, color: "white" }} />,
    title: "Can crypto really replace your bank account?",
    excerpt:
      "If you're a big enough fan of crypto, you've probably heard the phrase \"be your own bank\" or the term \"bankless\" — the idea being that...",
  },
  {
    bg: "#8FAAA4",
    thumb: <i className="bi bi-currency-bitcoin" style={{ fontSize: 60, color: "#111" }} />,
    title: "When is the best time to invest in crypto?",
    excerpt:
      "Cryptocurrencies like Bitcoin can experience daily (or even hourly) price volatility. As with any kind of investment, volatility may cause...",
  },
];

const FOOTER_COLS = {
  Company: [
    "About",
    "Careers",
    "Affiliates",
    "Blog",
    "Press",
    "Security",
    "Investors",
    "Vendors",
    "Legal & privacy",
    "Cookie policy",
    "Cookie preferences",
    "Do Not Sell or Share My Personal Information",
    "Digital Asset Disclosures",
  ],
  Learn: [
    "Explore",
    "Market statistics",
    "Coinbase Bytes newsletter",
    "Crypto basics",
    "Tips & tutorials",
    "Crypto glossary",
    "Market updates",
    "What is Bitcoin?",
    "What is crypto?",
    "What is a blockchain?",
    "How to set up a crypto wallet?",
    "How to send crypto?",
    "Taxes",
  ],
  Individuals: ["Buy & sell", "Earn free crypto", "Base App", "Coinbase One", "Debit Card"],
  Businesses: ["Asset Listings", "Coinbase Business", "Payments", "Commerce"],
  Institutions: [
    "Prime",
    "Staking",
    "Exchange",
    "International Exchange",
    "Derivatives Exchange",
    "Verified Pools",
  ],
  Developers: [
    "Developer Platform",
    "Base",
    "Server Wallets",
    "Embedded Wallets",
    "Base Accounts (Smart Wallets)",
    "Onramp & Offramp",
    "x402",
    "Trade API",
    "Paymaster",
    "OnchainKit",
    "Data API",
    "Verifications",
    "Node",
    "AgentKit",
    "Staking",
    "Faucet",
    "Exchange API",
    "International Exchange API",
    "Prime API",
    "Derivatives API",
  ],
  Support: [
    "Help center",
    "Contact us",
    "Create account",
    "ID verification",
    "Account information",
    "Payment methods",
    "Account access",
    "Supported crypto",
    "Status",
  ],
  "Asset prices": ["Bitcoin price", "Ethereum price", "Solana price", "XRP price"],
  "Stock prices": ["NVIDIA price", "Apple price", "Microsoft price", "Amazon price"],
};

function fmtPrice(p) {
  if (p >= 1000) return "GHS " + p.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  if (p >= 1) return "GHS " + p.toFixed(2);
  return "GHS " + p.toFixed(4);
}

const LANGUAGE_REGION_OPTIONS = [
  { id: "en-global", language: "English", region: "Global" },
  { id: "es-us", language: "Español", region: "United States" },
  { id: "en-us", language: "English", region: "United States" },
  { id: "de-de", language: "Deutsch", region: "Deutschland" },
  { id: "fr-fr", language: "Français", region: "France" },
  { id: "it-it", language: "Italiano", region: "Italia" },
  { id: "pt-br", language: "Português", region: "Brasil" },
  { id: "nl-nl", language: "Nederlands", region: "Nederland" },
  { id: "sv-se", language: "Svenska", region: "Sverige" },
  { id: "da-dk", language: "Dansk", region: "Danmark" },
  { id: "no-no", language: "Norsk", region: "Norge" },
  { id: "fi-fi", language: "Suomi", region: "Suomi" },
  { id: "pl-pl", language: "Polski", region: "Polska" },
  { id: "tr-tr", language: "Türkçe", region: "Türkiye" },
  { id: "ar-sa", language: "العربية", region: "Saudi Arabia" },
  { id: "ja-jp", language: "日本語", region: "日本" },
  { id: "ko-kr", language: "한국어", region: "대한민국" },
  { id: "zh-cn", language: "中文", region: "中国" },
];

function LanguageRegionPopover({ open, anchorRef, onClose }) {
  const popoverRef = useRef(null);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState("en-global");

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    const onPointerDown = (e) => {
      const pop = popoverRef.current;
      const anchor = anchorRef.current;
      const t = e.target;
      if (!(t instanceof Node)) return;
      if (pop && pop.contains(t)) return;
      if (anchor && anchor.contains(t)) return;
      onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open, onClose, anchorRef]);

  useEffect(() => {
    if (!open) return;
    setQuery("");
  }, [open]);

  if (!open) return null;

  const q = query.trim().toLowerCase();
  const filtered = q
    ? LANGUAGE_REGION_OPTIONS.filter((o) => `${o.language} ${o.region}`.toLowerCase().includes(q))
    : LANGUAGE_REGION_OPTIONS;

  return (
    <div ref={popoverRef} className="cb-lang-popover" role="dialog" aria-label="Language and region">
      <div className="cb-lang-title">Language and region</div>
      <div className="cb-lang-search">
        <i className="bi bi-search" />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search" />
      </div>
      <div className="cb-lang-list" role="listbox" aria-label="Language options">
        {filtered.map((o) => {
          const selected = o.id === selectedId;
          return (
            <button
              key={o.id}
              type="button"
              className={`cb-lang-item${selected ? " selected" : ""}`}
              onClick={() => setSelectedId(o.id)}
              role="option"
              aria-selected={selected}
            >
              <div className="cb-lang-item-text">
                <div className="cb-lang-item-lang">{o.language}</div>
                <div className="cb-lang-item-region">{o.region}</div>
              </div>
              {selected ? (
                <span className="cb-lang-check" aria-hidden="true">
                  <i className="bi bi-check-lg" />
                </span>
              ) : null}
            </button>
          );
        })}
        {filtered.length === 0 ? <div className="cb-lang-empty">No results</div> : null}
      </div>
    </div>
  );
}

function RouteLoadingOverlay() {
  return (
    <div className="cb-route-loader" role="status" aria-live="polite" aria-label="Loading">
      <div className="cb-route-loader-center" aria-hidden="true">
        <Logo size={48} />
      </div>
    </div>
  );
}

function Nav() {
  const [langOpen, setLangOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const navRef = useRef(null);
  const globeBtnRef = useRef(null);
  const navigate = useNavigate();
  const [routeLoading, setRouteLoading] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setOpenMenu(null);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleNavClick = useCallback(
    (name) => {
      if (name === "Cryptocurrencies") {
        setOpenMenu(null);
        // This is handled by the capture listner in CoinbaseHomepage
        return;
      }
      setOpenMenu((prev) => (prev === name ? null : name));
    },
    [setOpenMenu]
  );

  const startRouteLoading = (path) => {
    if (routeLoading) return;
    setRouteLoading(true);
    timeoutRef.current = window.setTimeout(() => {
      navigate(path);
    }, 1000);
  };

  return (
    <>
      {routeLoading ? <RouteLoadingOverlay /> : null}
      <div className={`cb-blur-overlay${openMenu ? " active" : ""}`} onClick={() => setOpenMenu(null)} />
      <nav className="cb2-nav" ref={navRef}>
        <div className="cb2-nav-inner">
          <a href="#" className="cb2-logo">
            <Logo size={18} />
          </a>

          <ul className="cb2-nav-links">
            <li className="cb2-nav-item">
              <button className="cb2-nav-btn" onClick={() => handleNavClick("Cryptocurrencies")}>
                Cryptocurrencies
              </button>
            </li>
            {Object.keys(NAV_MENUS).map((name) => (
              <li key={name} className="cb2-nav-item">
                <button
                  className={`cb2-nav-btn${openMenu === name ? " open" : ""}`}
                  onClick={() => handleNavClick(name)}
                  onMouseEnter={() => setOpenMenu(name)}
                >
                  {name}
                </button>
                {openMenu === name && NAV_MENUS[name] && <CB2MegaMenu data={NAV_MENUS[name]} onClose={() => setOpenMenu(null)} />}
              </li>
            ))}
          </ul>
          <div className="cb2-nav-actions">
            <button className="cb2-icon-btn" onClick={() => setSearchOpen(true)}>
              <SearchIcon />
            </button>
            <span className="cb-nav-lang-wrap">
              <button
                ref={globeBtnRef}
                type="button"
                className="cb2-icon-btn"
                aria-haspopup="dialog"
                aria-expanded={langOpen}
                onClick={() => setLangOpen((v) => !v)}
              >
                <GlobeIcon />
              </button>
              <LanguageRegionPopover open={langOpen} anchorRef={globeBtnRef} onClose={() => setLangOpen(false)} />
            </span>
            <button type="button" className="cb2-btn-signin" onClick={() => startRouteLoading("/signin")}>
              Sign in
            </button>
            <button type="button" className="cb2-btn-signup" onClick={() => startRouteLoading("/signup")}>
              Sign up
            </button>
          </div>
        </div>
      </nav>
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

function PhoneMockup({ activeTab, onTabClick }) {
  return (
    <div className="cb-phone-mockup">
      <div className="cb-phone-top-bar">
        <div className="cb-phone-top-search">
          <i className="bi bi-search" style={{ fontSize: 10, lineHeight: 1, color: "#aaa" }} />
          <span>Search</span>
        </div>
        <div className="cb-phone-top-icons">
          <span>
            <i className="bi bi-arrow-repeat" />
          </span>
          <span>
            <i className="bi bi-grid" />
          </span>
          <span>
            <i className="bi bi-bell" />
          </span>
        </div>
      </div>
      <div className="cb-phone-body">
        <div className="cb-balance-amount">$33,683.80</div>
        <div className="cb-balance-change">↗ $131.36 (1.38%) 1D ›</div>
        <div className="cb-phone-chart-wrap">
          <svg viewBox="0 0 220 80" fill="none" preserveAspectRatio="none">
            <defs>
              <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0052FF" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#0052FF" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0,68 C15,65 25,70 45,62 C65,54 75,58 95,48 C115,38 125,42 145,30 C165,18 180,22 200,12 L220,6 L220,80 L0,80Z" fill="url(#g1)" />
            <path d="M0,68 C15,65 25,70 45,62 C65,54 75,58 95,48 C115,38 125,42 145,30 C165,18 180,22 200,12 L220,6" stroke="#0052FF" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            <circle cx="220" cy="6" r="3.5" fill="#0052FF" />
          </svg>
        </div>
        <div className="cb-phone-tabs">
          {["1H", "1D", "1W", "1M", "1Y", "All"].map((t) => (
            <button key={t} className={`cb-phone-tab${activeTab === t ? " active" : ""}`} onClick={() => onTabClick(t)}>
              {t}
            </button>
          ))}
        </div>
        {PHONE_ROWS.map((r) => (
          <div key={r.name} className="cb-phone-row">
            <div className="cb-phone-row-left">
              <div className="cb-phone-row-icon" style={{ background: r.iconBg, color: r.iconColor }}>
                <i className={`bi ${r.icon}`} />
              </div>
              <span className="cb-phone-row-name">{r.name}</span>
            </div>
            <span className={`cb-phone-row-val${r.up ? " up" : ""}`}>{r.val}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function HeroSection() {
  const [activeTab, setActiveTab] = useState("1D");
  const [email, setEmail] = useState("");
  const heroData = getHeroData();

  return (
    <section>
      <div className="cb-hero">
        <div className="cb-hero-visual">
          <div className="cb-phone-bg" style={{ background: 'none', border: 'none', boxShadow: 'none' }}>
            <img src={heroImg} alt="Coinbase Hero" style={{ width: '100%', height: 'auto', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} />
          </div>
        </div>
        <div>
          <h1 className="cb-hero-title">
            {heroData.title}
          </h1>
          <p className="cb-hero-subtitle">{heroData.subtitle}</p>
          <div className="cb-hero-form">
            <input type="email" placeholder="satoshi@nakamoto.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            <button className="cb-hero-form-btn">{heroData.cta}</button>
          </div>
        </div>
      </div>
    </section>
  );
}

function AssetTable() {
  const [activeTab, setActiveTab] = useState("Tradable");
  const [assets, setAssets] = useState([]);
  const { crypto: tradableCrypto, loading: cryptoLoading } = useTradableCrypto();

  useEffect(() => {
    if (!cryptoLoading && tradableCrypto.length > 0) {
      // Transform the tradable crypto data to the expected format
      const transformedAssets = tradableCrypto.map(crypto => ({
        name: crypto.name,
        symbol: crypto.symbol,
        price: parseFloat(crypto.price.replace('$', '').replace(',', '')),
        chg: parseFloat(crypto.change.replace('%', '').replace('+', '')),
        bg: crypto.symbol === 'BTC' ? '#F7931A' :
          crypto.symbol === 'ETH' ? '#627EEA' :
            crypto.symbol === 'USDT' ? '#26A17B' :
              crypto.symbol === 'BNB' ? '#F3BA2F' :
                crypto.symbol === 'XRP' ? '#346AA9' :
                  crypto.symbol === 'USDC' ? '#2775CA' : '#6B7280',
        icon: crypto.symbol === 'BTC' ? 'bi-currency-bitcoin' :
          crypto.symbol === 'ETH' ? 'bi-lightning-charge-fill' :
            crypto.symbol === 'USDT' ? 'bi-cash-coin' :
              crypto.symbol === 'BNB' ? 'bi-diamond-fill' :
                crypto.symbol === 'XRP' ? 'bi-x' :
                  crypto.symbol === 'USDC' ? 'bi-currency-dollar' : 'bi-circle',
        image: crypto.image,
        newOn: false
      }));
      setAssets(transformedAssets);
    }
  }, [tradableCrypto, cryptoLoading]);

  useEffect(() => {
    const interval = setInterval(() => {
      setAssets((prev) =>
        prev.map((a) => {
          if (a.name === "USDC" || a.name === "Tether") return a;
          return {
            ...a,
            price: a.price * (1 + (Math.random() - 0.5) * 0.0008),
            chg: a.chg + (Math.random() - 0.5) * 0.06,
          };
        })
      );
    }, 2200);

    return () => clearInterval(interval);
  }, []);

  const visibleAssets = (() => {
    if (activeTab === "Top gainers") {
      return [...assets].sort((a, b) => b.chg - a.chg);
    }
    if (activeTab === "New on Coinbase") {
      const onlyNew = assets.filter((a) => a.newOn);
      return onlyNew.length ? onlyNew : assets;
    }
    return assets;
  })();

  if (cryptoLoading) {
    return (
      <div className="cb-asset-table">
        <div className="cb-asset-table-tabs">
          {ASSET_TABS.map((t) => (
            <button key={t} className={`cb-asset-tab-btn${activeTab === t ? " active" : ""}`} onClick={() => setActiveTab(t)}>
              {t}
            </button>
          ))}
        </div>
        <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
          Loading cryptocurrency data...
        </div>
      </div>
    );
  }

  return (
    <div className="cb-asset-table">
      <div className="cb-asset-table-tabs">
        {ASSET_TABS.map((t) => (
          <button key={t} className={`cb-asset-tab-btn${activeTab === t ? " active" : ""}`} onClick={() => setActiveTab(t)}>
            {t}
          </button>
        ))}
      </div>
      {visibleAssets.map((a) => (
        <div key={a.name} className="cb-asset-row">
          <div className="cb-asset-row-left">
            <div className="cb-coin-icon" style={{ background: a.bg }}>
              <CryptoIcon symbol={a.symbol} size={32} />
            </div>
            <span className="cb-coin-name">{a.name}</span>
          </div>
          <div className="cb-asset-row-right">
            <div className="cb-coin-price">{fmtPrice(a.price)}</div>
            <div className={`cb-coin-chg ${a.chg === 0 ? "" : a.chg > 0 ? "up" : "dn"}`}>
              {a.chg === 0 ? (
                "--"
              ) : (
                <>
                  <i className={`bi ${a.chg > 0 ? "bi-arrow-up-right" : "bi-arrow-down-right"}`} /> {Math.abs(a.chg).toFixed(2)}%
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ExploreSection() {
  return (
    <section className="cb-explore-section">
      <div className="cb-explore-inner">
        <div className="cb-explore-content">
          <h2>Explore crypto like Bitcoin, Ethereum, and Dogecoin.</h2>
          <p>Simply and securely buy, sell, and manage hundreds of cryptocurrencies.</p>
          <a href="#" className="cb-btn-dark">
            See more assets
          </a>
        </div>
        <AssetTable />
      </div>
    </section>
  );
}

function CandlestickChart() {
  return (
    <div className="cb-candles-row">
      {CANDLE_DATA.map((c, i) => {
        const up = c.c >= c.o;
        const bh = Math.max(2, Math.abs(c.c - c.o)) * 0.65;
        const tw = Math.abs(c.h - Math.max(c.o, c.c)) * 0.65;
        const bw = Math.abs(Math.min(c.o, c.c) - c.l) * 0.65;
        const col = up ? "#05B169" : "#CF304A";

        return (
          <div key={i} className="cb-candle">
            <div className="cb-c-wick" style={{ height: tw, background: col }} />
            <div className={`cb-c-body ${up ? "up" : "dn"}`} style={{ height: bh }} />
            <div className="cb-c-wick" style={{ height: bw, background: col }} />
          </div>
        );
      })}
    </div>
  );
}

function TradeSection() {
  return (
    <section>
      <div className="cb-trade-section">
        <div className="cb-trade-visual">
          <div className="cb-chart-wrap">
            <div className="cb-chart-hdr">
              <span className="cb-chart-hdr-ticker">BTC-USD</span>
              <span className="cb-chart-hdr-price">$43,281</span>
              <span className="cb-chart-hdr-chg">+2.14%</span>
            </div>
            <CandlestickChart />
            <div style={{ marginTop: 8, borderTop: "1px solid #222", paddingTop: 6 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", fontSize: 9, color: "#444", paddingBottom: 4 }}>
                <span>Symbol</span>
                <span style={{ textAlign: "center" }}>Price</span>
                <span style={{ textAlign: "right" }}>Chg</span>
              </div>
              {[
                { sym: "ETH", price: "$2,287", chg: "+1.8%", up: true },
                { sym: "SOL", price: "$98.4", chg: "+3.2%", up: true },
                { sym: "DOGE", price: "$0.073", chg: "-0.5%", up: false },
              ].map((r) => (
                <div key={r.sym} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", fontSize: 9, padding: "3px 0" }}>
                  <span style={{ color: "#666" }}>{r.sym}</span>
                  <span style={{ textAlign: "center", color: "white" }}>{r.price}</span>
                  <span style={{ textAlign: "right", color: r.up ? "#05B169" : "#CF304A" }}>{r.chg}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="cb-ob-panel">
            <div className="cb-ob-lbl">Order Book</div>
            {ORDER_BOOK_ASKS.map((r) => (
              <div key={r.price} className="cb-ob-r ask">
                <span>{r.price}</span>
                <span>{r.qty}</span>
              </div>
            ))}
            <div className="cb-ob-r mid">
              <span>43,281</span>
            </div>
            {ORDER_BOOK_BIDS.map((r) => (
              <div key={r.price} className="cb-ob-r bid">
                <span>{r.price}</span>
                <span>{r.qty}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="cb-trade-content">
          <h2>Powerful tools, designed for the advanced trader.</h2>
          <p>
            Powerful analytical tools with the safety and security of Coinbase deliver the ultimate trading experience. Tap into sophisticated charting capabilities, real-time order books, and deep liquidity across hundreds of markets.
          </p>
          <a href="#" className="cb-btn-dark">
            Start trading
          </a>
        </div>
      </div>
    </section>
  );
}

function BadgePill({ label }) {
  return (
    <div className="cb-one-badge-pill">
      <div className="cb-one-dot">
        <CoinbaseLogo size={10} />
      </div>
      {label}
    </div>
  );
}

function CoinbaseOneSection() {
  return (
    <section>
      <div className="cb-one-section">
        <div className="cb-one-content">
          <BadgePill label="COINBASE ONE" />
          <h2>
            Zero trading fees,
            <br />
            more rewards.
          </h2>
          <p>Get more out of crypto with one membership: zero trading fees, boosted rewards, priority support, and more.</p>
          <a href="#" className="cb-btn-dark">
            Claim free trial
          </a>
        </div>
        <div className="cb-one-visual">
          <div className="cb-one-phone">
            <div className="cb-one-status">
              <span>3:57</span>
              <span style={{ letterSpacing: 1 }}>▪▪ ☁ 🔋</span>
            </div>
            <div style={{ display: "flex", justifyContent: "center", margin: "8px 0" }}>
              <div className="cb-one-success-icon">
                <CheckIcon />
                <div className="cb-one-success-star">★</div>
              </div>
            </div>
            <div className="cb-one-success-title">Trade successful!</div>
            <div className="cb-one-success-sub">You got 0.012423 BTC</div>
            <div className="cb-one-fee-row">
              <span className="cb-one-fee-amt">$14.68</span>
              <div className="cb-one-fee-tag">
                <div style={{ width: 16, height: 16, background: "var(--blue)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <CoinbaseLogo size={8} />
                </div>
                No trading fees with Coinbase One
              </div>
            </div>
            <div className="cb-one-member-box">
              <div className="cb-one-avatar">🤿</div>
              <div className="cb-one-member-title">Exclusive member benefits</div>
              <div className="cb-one-member-sub">
                Coinbase One members get
                <br />
                boosted staking rewards.
              </div>
              <a href="#" className="cb-one-member-link">
                Learn more
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BaseAppSection() {
  return (
    <section>
      <div className="cb-base-section">
        <div className="cb-base-visual">
          <div className="cb-base-phone">
            <div className="cb-base-phone-header">
              <span className="cb-base-tab-active">Trade</span>
              <span className="cb-base-tab-off">Talk</span>
              <span style={{ marginLeft: "auto", fontSize: 14, color: "#ccc", paddingBottom: 10 }}>
                <i className="bi bi-envelope" />
              </span>
            </div>
            <div className="cb-base-body">
              <div className="cb-base-post">
                <div className="cb-base-post-user">
                  <div className="cb-base-avatar"></div>
                  <span className="cb-base-uname">jasmine</span>
                  <span style={{ fontSize: 9, color: "#aaa", marginLeft: "auto" }}>1s ···</span>
                </div>
                <div className="cb-base-desc">Detail on my new painting</div>
                <div className="cb-base-art">
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(45deg,#ff6b6b80,#ffd93d60,#6bcb7780,#4d96ff80)" }}></div>
                  <div className="cb-base-price-tag" style={{ position: "relative", zIndex: 1 }}>
                    <div className="cb-base-cb-dot"></div>
                    <span>$1.00</span>
                  </div>
                </div>
                <div className="cb-base-likes">
                  <i className="bi bi-hand-thumbs-up" /> 1.5k &nbsp;&nbsp; <i className="bi bi-graph-up" /> $21K
                </div>
              </div>
              <div className="cb-base-activity-line">lilfox bought $10 of $VIRTUAL · 15m</div>
              <div className="cb-base-token-row">
                <div className="cb-base-token-left">
                  <div className="cb-base-token-icon"></div>
                  <div>
                    <div className="cb-base-token-name">Virtual Protocol</div>
                    <div className="cb-base-token-ticker">VIRTUAL</div>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div className="cb-base-token-cap">$742M</div>
                  <div style={{ fontSize: 9, color: "#aaa" }}>Market Cap</div>
                </div>
              </div>
              <div style={{ padding: "4px 12px" }}>
                <svg viewBox="0 0 160 28" fill="none" style={{ width: "100%" }}>
                  <path d="M0,22 C20,20 40,24 60,16 C80,8 100,12 120,6 C140,1 155,4 160,2" stroke="#05B169" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                </svg>
              </div>
            </div>
            <div className="cb-base-phone-nav">
              <span className="active">
                <i className="bi bi-house" />
              </span>
              <span>
                <i className="bi bi-search" />
              </span>
              <span>
                <i className="bi bi-arrow-left-right" />
              </span>
              <span>
                <i className="bi bi-bell" />
              </span>
              <span>
                <i className="bi bi-person" />
              </span>
            </div>
          </div>
        </div>
        <div className="cb-base-content">
          <BadgePill label="BASE APP" />
          <h2>Countless ways to earn crypto with the Base App.</h2>
          <p>An everything app to trade, create, discover, and chat, all in one place.</p>
          <a href="#" className="cb-btn-dark">
            Learn more
          </a>
        </div>
      </div>
    </section>
  );
}

function LearnSection() {
  return (
    <section className="cb-learn-section">
      <div className="cb-learn-inner">
        <div className="cb-learn-header">
          <h2>
            New to crypto?
            <br />
            Learn some
            <br />
            crypto basics
          </h2>
          <div className="cb-learn-header-right">
            <p>Beginner guides, practical tips, and market updates for first-timers, experienced investors, and everyone in between</p>
            <div>
              <a href="#" className="cb-btn-dark">
                Read More
              </a>
            </div>
          </div>
        </div>
        <div className="cb-articles-grid">
          {ARTICLES.map((a, i) => (
            <a key={i} href="#" className="cb-article-card">
              <div className="cb-article-img" style={{ background: a.bg }}>
                {a.thumb}
              </div>
              <div className="cb-article-body">
                <h3>{a.title}</h3>
                <p>{a.excerpt}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  const [email, setEmail] = useState("");
  const circles = [
    { w: 115, bg: "var(--blue)", left: 100, top: 130, content: <CoinbaseLogo size={52} /> },
    { w: 88, bg: "#1B2744", left: 178, top: 30, content: <span style={{ color: "white", fontSize: 28, fontWeight: 900 }}>Λ</span> },
    { w: 88, bg: "#FFD700", left: 258, top: 110, content: <span style={{ fontSize: 28 }}>→</span> },
    { w: 115, bg: "#F7931A", left: 170, top: 165, content: <span style={{ color: "white", fontSize: 38, fontWeight: 900 }}>₿</span> },
    { w: 88, bg: "#C2A633", left: 82, top: 252, content: <span style={{ color: "white", fontSize: 26, fontWeight: 900 }}>Ð</span> },
    { w: 88, bg: "#1A3980", left: 248, top: 235, content: <span style={{ color: "white", fontSize: 18, letterSpacing: -1 }}>✦✦</span> },
    { w: 78, bg: "#8EA9D7", left: 172, top: 285, content: <span style={{ color: "white", fontSize: 26 }}>Ξ</span> },
  ];

  return (
    <section>
      <div className="cb-cta-section">
        <div className="cb-cta-content">
          <h2>
            Take control
            <br />
            of your money
          </h2>
          <p>Start your portfolio today and discover crypto</p>
          <div className="cb-cta-form">
            <input type="email" placeholder="satoshi@nakamoto.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            <button className="cb-cta-form-btn">Sign up</button>
          </div>
        </div>
        <div className="cb-circles-wrap">
          <img src={circularImg} alt="" style={{ width: '100%', height: 'auto', maxWidth: '460px' }} />
        </div>
      </div>
      <div className="cb-cta-disclaimer">DEX trading is offered by Coinbase Bermuda Technologies Ltd.</div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="cb-footer">
      <div className="cb-footer-inner">
        <div className="cb-footer-grid">
          <div>
            <div className="cb-logo-icon" style={{ width: 40, height: 40 }}>
              <Logo size={22} />
            </div>
          </div>
          <div className="cb-footer-col">
            <h4>Company</h4>
            <ul>
              {FOOTER_COLS.Company.map((l) => (
                <li key={l}>
                  <a href="#">{l}</a>
                </li>
              ))}
            </ul>
            <br />
            <h4>Learn</h4>
            <ul>
              {FOOTER_COLS.Learn.map((l) => (
                <li key={l}>
                  <a href="#">{l}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="cb-footer-col">
            <h4>Individuals</h4>
            <ul>
              {FOOTER_COLS.Individuals.map((l) => (
                <li key={l}>
                  <a href="#">{l}</a>
                </li>
              ))}
            </ul>
            <br />
            <h4>Businesses</h4>
            <ul>
              {FOOTER_COLS.Businesses.map((l) => (
                <li key={l}>
                  <a href="#">{l}</a>
                </li>
              ))}
            </ul>
            <br />
            <h4>Institutions</h4>
            <ul>
              {FOOTER_COLS.Institutions.map((l) => (
                <li key={l}>
                  <a href="#">{l}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="cb-footer-col">
            <h4>Developers</h4>
            <ul>
              {FOOTER_COLS.Developers.map((l) => (
                <li key={l}>
                  <a href="#">{l}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="cb-footer-col">
            <h4>Support</h4>
            <ul>
              {FOOTER_COLS.Support.map((l) => (
                <li key={l}>
                  <a href="#">{l}</a>
                </li>
              ))}
            </ul>
            <br />
            <h4>Asset prices</h4>
            <ul>
              {FOOTER_COLS["Asset prices"].map((l) => (
                <li key={l}>
                  <a href="#">{l}</a>
                </li>
              ))}
            </ul>
            <br />
            <h4>Stock prices</h4>
            <ul>
              {FOOTER_COLS["Stock prices"].map((l) => (
                <li key={l}>
                  <a href="#">{l}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="cb-footer-bottom">
          <div className="cb-footer-bottom-left">© 2026 Coinbase</div>
          <div className="cb-footer-bottom-links">
            <a href="#">Privacy</a>
            <a href="#">Terms &amp; Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function HomeLanding() {
  const didMount = useRef(false);
  useEffect(() => {
    if (didMount.current) return;
    didMount.current = true;
  }, []);

  return (
    <div className="cb-root">
      <Nav />
      <HeroSection />
      <ExploreSection />
      <TradeSection />
      <CoinbaseOneSection />
      <BaseAppSection />
      <LearnSection />
      <CTASection />
      <Footer />
    </div>
  );
}

export default function CoinbaseHomepage() {
  const [activePage, setActivePage] = useState("home");

  return activePage === "explore" ? (
    <ExplorePage onNavigateHome={() => setActivePage("home")} />
  ) : (
    <div onClickCapture={(e) => {
      const el = e.target;
      if (!(el instanceof HTMLElement)) return;
      const target = el.closest("a, button");
      if (!target) return;
      if (target.textContent?.trim() === "Cryptocurrencies") {
        e.preventDefault();
        setActivePage("explore");
      }
    }}>
      <HomeLanding />
    </div>
  );
}
