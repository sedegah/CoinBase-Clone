import React from "react";

export const SEARCH_CRYPTO = [
    { id: 1, name: "Bitcoin", ticker: "BTC", rank: 1, iconBg: "#F7931A", icon: "bi-currency-bitcoin", vol: "GHS 46B vol", mcap: "GHS 1.3T mcap", price: "GHS 67,440.47", chg: -2.13, up: false },
    { id: 2, name: "Ethereum", ticker: "ETH", rank: 2, iconBg: "#627EEA", icon: "bi-lightning-charge-fill", vol: "GHS 25.6B vol", mcap: "GHS 245.4B mcap", price: "GHS 2,031.29", chg: -3.41, up: false },
    { id: 3, name: "Tether", ticker: "USDT", rank: 3, iconBg: "#26A17B", icon: "bi-cash-coin", vol: "GHS 93B vol", mcap: "GHS 183.5B mcap", price: "GHS 1.00", chg: -0.03, up: false },
    { id: 4, name: "XRP", ticker: "XRP", rank: 4, iconBg: "#346AA9", icon: "bi-x", vol: "GHS 8.2B vol", mcap: "GHS 112.1B mcap", price: "GHS 1.93", chg: -1.87, up: false },
    { id: 5, name: "Solana", ticker: "SOL", rank: 5, iconBg: "#9945FF", icon: "bi-sun", vol: "GHS 5.1B vol", mcap: "GHS 66.3B mcap", price: "GHS 139.42", chg: 1.24, up: true },
    { id: 6, name: "BNB", ticker: "BNB", rank: 6, iconBg: "#F3BA2F", icon: "bi-diamond-fill", vol: "GHS 3.0B vol", mcap: "GHS 84.4B mcap", price: "GHS 629.19", chg: -0.88, up: false },
    { id: 7, name: "USDC", ticker: "USDC", rank: 7, iconBg: "#2775CA", icon: "bi-currency-dollar", vol: "GHS 13.8B vol", mcap: "GHS 76.2B mcap", price: "GHS 1.00", chg: 0.00, up: true },
    { id: 8, name: "Dogecoin", ticker: "DOGE", rank: 8, iconBg: "#C2A633", icon: "bi-coin", vol: "GHS 1.4B vol", mcap: "GHS 23.4B mcap", price: "GHS 0.158", chg: -4.22, up: false },
    { id: 9, name: "Cardano", ticker: "ADA", rank: 9, iconBg: "#0033AD", icon: "bi-circle", vol: "GHS 0.9B vol", mcap: "GHS 17.1B mcap", price: "GHS 0.48", chg: -2.91, up: false },
];

export const SEARCH_STOCKS = [
    { id: 101, name: "NVIDIA", ticker: "NVDA", iconBg: "#76b900", icon: "bi-cpu-fill", vol: "GHS 360.1M vol", mcap: "GHS 4.5T mcap", price: "GHS 185.39", chg: -5.05, up: false },
    { id: 102, name: "Apple", ticker: "AAPL", iconBg: "#555", icon: "bi-apple", vol: "GHS 32.2M vol", mcap: "GHS 4T mcap", price: "GHS 273.03", chg: -0.44, up: false },
    { id: 103, name: "Alphabet Inc. Class C", ticker: "GOOG", iconBg: "#4285F4", icon: "bi-google", vol: "GHS 22.2M vol", mcap: "GHS 3.7T mcap", price: "GHS 306.18", chg: -2.19, up: false },
    { id: 104, name: "Microsoft", ticker: "MSFT", iconBg: "#00A4EF", icon: "bi-windows", vol: "GHS 18.5M vol", mcap: "GHS 3.2T mcap", price: "GHS 422.81", chg: 0.74, up: true },
    { id: 105, name: "Amazon", ticker: "AMZN", iconBg: "#FF9900", icon: "bi-box", vol: "GHS 27.1M vol", mcap: "GHS 2.1T mcap", price: "GHS 198.56", chg: -1.33, up: false },
    { id: 106, name: "Tesla", ticker: "TSLA", iconBg: "#CC0000", icon: "bi-car-front", vol: "GHS 45.2M vol", mcap: "GHS 820B mcap", price: "GHS 259.40", chg: 2.87, up: true },
];

export const SEARCH_PREDICTIONS = [
    { id: 201, name: "Will BTC hit $100k in 2025?", ticker: "BTC100K", iconBg: "#0052FF", icon: "bi-question-circle", vol: "GHS 12.4M vol", mcap: "GHS 48.3M mcap", price: "GHS 0.62", chg: 5.12, up: true },
    { id: 202, name: "S&P 500 above 6000 by Q2?", ticker: "SPX6K", iconBg: "#222", icon: "bi-graph-up-arrow", vol: "GHS 8.1M vol", mcap: "GHS 31.2M mcap", price: "GHS 0.71", chg: -2.44, up: false },
];

export const SEARCH_PERPETUALS = [
    { id: 301, name: "Bitcoin Perpetual", ticker: "BTC-PERP", iconBg: "#F7931A", icon: "bi-currency-bitcoin", vol: "GHS 4.2B vol", mcap: "—", price: "GHS 67,312.00", chg: -2.08, up: false },
    { id: 302, name: "Ethereum Perpetual", ticker: "ETH-PERP", iconBg: "#627EEA", icon: "bi-lightning-charge-fill", vol: "GHS 1.8B vol", mcap: "—", price: "GHS 2,028.50", chg: -3.37, up: false },
    { id: 303, name: "Solana Perpetual", ticker: "SOL-PERP", iconBg: "#9945FF", icon: "bi-sun", vol: "GHS 622M vol", mcap: "—", price: "GHS 139.10", chg: 1.19, up: true },
];

export const SEARCH_FUTURES = [
    { id: 401, name: "Bitcoin Futures Mar 25", ticker: "BTCZ25", iconBg: "#F7931A", icon: "bi-currency-bitcoin", vol: "GHS 980M vol", mcap: "—", price: "GHS 67,890.00", chg: -1.94, up: false },
    { id: 402, name: "Ethereum Futures Mar 25", ticker: "ETHZ25", iconBg: "#627EEA", icon: "bi-lightning-charge-fill", vol: "GHS 420M vol", mcap: "—", price: "GHS 2,044.00", chg: -3.11, up: false },
];

export const TABS = ["Top", "Crypto", "Stocks", "Predictions", "Perpetuals", "Futures"];

export const INITIAL_ASSETS = [
    { name: "Bitcoin", icon: "bi-currency-bitcoin", bg: "#F7931A", price: 712609.77, chg: -1.47, newOn: false },
    { name: "Ethereum", icon: "bi-lightning-charge-fill", bg: "#627EEA", price: 21259.36, chg: -1.65, newOn: false },
    { name: "Tether", icon: "bi-cash-coin", bg: "#26A17B", price: 10.65, chg: -0.01, newOn: false },
    { name: "XRP", icon: "bi-x", bg: "#346AA9", price: 14.92, chg: -2.79, newOn: false },
    { name: "BNB", icon: "bi-diamond-fill", bg: "#F3BA2F", price: 6587.52, chg: -0.72, newOn: false },
    { name: "USDC", icon: "bi-currency-dollar", bg: "#2775CA", price: 10.65, chg: 0.0, newOn: true },
];

export const ASSET_TABS = ["Tradable", "Top gainers", "New on Coinbase"];

export const CANDLE_DATA = [
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

export const ORDER_BOOK_ASKS = [
    { price: "43,420", qty: "0.12" },
    { price: "43,380", qty: "0.34" },
    { price: "43,350", qty: "0.87" },
];
export const ORDER_BOOK_BIDS = [
    { price: "43,270", qty: "0.56" },
    { price: "43,240", qty: "1.23" },
    { price: "43,210", qty: "0.94" },
    { price: "43,190", qty: "2.01" },
];

export const PHONE_ROWS = [
    { icon: "bi-currency-bitcoin", iconBg: "#EBF0FF", iconColor: "#0052FF", name: "Crypto", val: "$14,186.12", up: false },
    { icon: "bi-graph-up", iconBg: "#f5f5f5", iconColor: "#333", name: "Stocks", val: "$8,133.98", up: false },
    { icon: "bi-arrow-left-right", iconBg: "#f5f5f5", iconColor: "#333", name: "Derivatives", val: "↗ $148.84", up: true },
    { icon: "bi-magic", iconBg: "#f5f5f5", iconColor: "#333", name: "Predictions", val: "↗ $42.69", up: true },
    { icon: "bi-cash", iconBg: "#f5f5f5", iconColor: "#555", name: "Cash", val: "$10,124.22", up: false },
];

export const ARTICLES = [
    {
        bg: "radial-gradient(circle at 50% 60%,#0052FF 0%,#001266 55%,#000 100%)",
        thumb: (
            <div style={{ width: 68, height: 68, borderRadius: "50%", background: "var(--blue)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <i className="bi bi-currency-dollar" style={{ fontSize: 40, color: "white" }} />
            </div>
        ),
        title: "USDC: The digital dollar for the global crypto economy",
        excerpt: "Coinbase believes crypto will be part of the solution for creating an open financial system that is both more efficient and more...",
    },
    {
        bg: "linear-gradient(135deg,#0052FF,#2775FF)",
        thumb: <i className="bi bi-bank" style={{ fontSize: 60, color: "white" }} />,
        title: "Can crypto really replace your bank account?",
        excerpt: "If you're a big enough fan of crypto, you've probably heard the phrase \"be your own bank\" or the term \"bankless\" — the idea being that...",
    },
    {
        bg: "#8FAAA4",
        thumb: <i className="bi bi-currency-bitcoin" style={{ fontSize: 60, color: "#111" }} />,
        title: "When is the best time to invest in crypto?",
        excerpt: "Cryptocurrencies like Bitcoin can experience daily (or even hourly) price volatility. As with any kind of investment, volatility may cause...",
    },
];

export const FOOTER_COLS = {
    Company: ["About", "Careers", "Affiliates", "Blog", "Press", "Security", "Investors", "Vendors", "Legal & privacy", "Cookie policy", "Cookie preferences", "Do Not Sell or Share My Personal Information", "Digital Asset Disclosures"],
    Learn: ["Explore", "Market statistics", "Coinbase Bytes newsletter", "Crypto basics", "Tips & tutorials", "Crypto glossary", "Market updates", "What is Bitcoin?", "What is crypto?", "What is a blockchain?", "How to set up a crypto wallet?", "How to send crypto?", "Taxes"],
    Individuals: ["Buy & sell", "Earn free crypto", "Base App", "Coinbase One", "Debit Card"],
    Businesses: ["Asset Listings", "Coinbase Business", "Payments", "Commerce"],
    Institutions: ["Prime", "Staking", "Exchange", "International Exchange", "Derivatives Exchange", "Verified Pools"],
    Developers: ["Developer Platform", "Base", "Server Wallets", "Embedded Wallets", "Base Accounts (Smart Wallets)", "Onramp & Offramp", "x402", "Trade API", "Paymaster", "OnchainKit", "Data API", "Verifications", "Node", "AgentKit", "Staking", "Faucet", "Exchange API", "International Exchange API", "Prime API", "Derivatives API"],
    Support: ["Help center", "Contact us", "Create account", "ID verification", "Account information", "Payment methods", "Account access", "Supported crypto", "Status"],
    "Asset prices": ["Bitcoin price", "Ethereum price", "Solana price", "XRP price"],
    "Stock prices": ["NVIDIA price", "Apple price", "Microsoft price", "Amazon price"],
};

export const LANGUAGE_REGION_OPTIONS = [
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
