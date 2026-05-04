import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../common";
import { SearchIcon, GlobeIcon, CoinbaseLogo } from "./Icons";
import SearchOverlay from "./SearchOverlay";

const NAV_MENUS = {
    Cryptocurrencies: {
        promo: { title: "Explore crypto", desc: "Markets, prices, and insights all in one place.", link: "Go to markets", linkHref: "#", cardBg: "#0052FF", cardContent: "bi-graph-up" },
        cols: [
            { items: [{ icon: "bi-currency-bitcoin", title: "Prices", desc: "Real-time crypto prices" }, { icon: "bi-graph-up", title: "Market stats", desc: "Market cap, volume and more" }, { icon: "bi-fire", title: "Top movers", desc: "Biggest 24hr gainers & losers" }] },
            { items: [{ icon: "bi-star", title: "Watchlist", desc: "Track assets you care about" }, { icon: "bi-plus-circle", title: "New on Coinbase", desc: "Recently listed assets" }, { icon: "bi-search", title: "Asset search", desc: "Search all tradable assets" }] },
        ],
    },
    Individuals: {
        promo: { title: "System Update 2025", desc: "The next chapter of Coinbase. Live on X 12/17.", link: "Learn more", cardBg: "#0052FF", cardContent: "bi-c-circle-fill" },
        cols: [
            { items: [{ icon: "bi-arrow-left-right", title: "Buy and sell", desc: "Buy, sell, and use crypto" }, { icon: "bi-app", title: "Base App", desc: "Post, earn, trade, and chat, all in one place" }, { icon: "bi-shield-check", title: "Coinbase One", desc: "Get zero trading fees and more" }, { icon: "bi-gem", title: "Private Client", desc: "For trusts, family offices, UHNWIs" }, { icon: "bi-link-45deg", title: "Onchain", desc: "Dive into the world of onchain apps" }, { icon: "bi-journal", title: "Learn", desc: "Crypto tips and guides" }] },
            { items: [{ icon: "bi-graph-up", title: "Advanced", desc: "Professional-grade trading tools" }, { icon: "bi-percent", title: "Earn", desc: "Stake your crypto and earn rewards" }, { icon: "bi-briefcase", title: "Coinbase Wealth", desc: "Institutional-grade services for UHNW" }, { icon: "bi-credit-card", title: "Credit Card", desc: "Earn up to 4% bitcoin back" }, { icon: "bi-credit-card-2-back", title: "Debit Card", desc: "Spend crypto, get crypto back" }] },
        ],
    },
    Businesses: {
        promo: { title: "Commerce Payments Protocol", desc: "A new standard for onchain payments.", link: "Go to Payments", cardBg: "#0052FF", cardContent: "bi-cart" },
        cols: [
            { items: [{ icon: "bi-buildings", title: "Business", desc: "Crypto trading and payments for startups and SMBs" }, { icon: "bi-cart", title: "Commerce", desc: "Start accepting crypto payments" }] },
            { items: [{ icon: "bi-credit-card", title: "Payments", desc: "The stablecoin payments stack for commerce platforms" }, { icon: "bi-card-list", title: "Asset Listings", desc: "List your asset on Coinbase" }] },
        ],
    },
    Institutions: {
        promo: { title: "Our clients", desc: "Trusted by institutions and government.", link: "Learn more", cardBg: "#0052FF", cardContent: "bi-globe2" },
        cols: [
            { sectionTitle: "Prime →", items: [{ icon: "bi-clock", title: "Trading and Financing", desc: "Professional prime brokerage services" }, { icon: "bi-shield-lock", title: "Custody", desc: "Securely store all your digital assets" }, { icon: "bi-percent", title: "Staking", desc: "Explore staking across our products" }, { icon: "bi-wallet2", title: "Onchain Wallet", desc: "Institutional-grade wallet to get onchain" }] },
            { sectionTitle: "Markets", items: [{ icon: "bi-arrow-left-right", title: "Exchange", desc: "Spot markets for high-frequency trading" }, { icon: "bi-globe2", title: "International Exchange", desc: "Access perpetual futures markets" }, { icon: "bi-box-seam", title: "Derivatives Exchange", desc: "Trade an accessible futures market" }, { icon: "bi-gear", title: "Verified Pools", desc: "Transparent, verified liquidity pools" }] },
        ],
    },
    Developers: {
        promo: { title: "World class crypto infrastructure.", desc: "Discover Coinbase's complete crypto-as-a-service platform.", link: "Learn more", cardBg: "#f0f0f0", cardContent: "bi-graph-down" },
        cols: [
            { sectionTitle: "Coinbase Developer Platform →", items: [{ icon: "bi-cash-coin", title: "Payments", desc: "Fast and global stablecoin payments with a single integration" }, { icon: "bi-arrow-left-right", title: "Trading", desc: "Launch crypto trading and custody for your users" }, { icon: "bi-wallet2", title: "Wallets", desc: "Deploy customizable and scalable wallets for your business" }, { icon: "bi-coin", title: "Stablecoins", desc: "Access USDC and Coinbase Custom Stablecoins" }] },
            { sectionTitle: "Solutions for any company", items: [{ icon: "bi-bank", title: "Banks & Brokerages", desc: "Secure, regulated offerings for retail, private banking, & institutional clients" }, { icon: "bi-credit-card", title: "Payment Firms", desc: "Near-instant, low-cost, global payment rails for modern providers" }, { icon: "bi-rocket-takeoff", title: "Startups", desc: "Launch your business with the world's leader in crypto" }] },
        ],
    },
    Company: {
        promo: { title: "Learn all about Coinbase:", desc: "We're building the open financial system.", link: "Create your account", cardBg: "#0052FF", cardContent: "bi-megaphone" },
        cols: [
            { items: [{ icon: "bi-info-circle", title: "About", desc: "Powering the crypto economy" }, { icon: "bi-people", title: "Affiliates", desc: "Help introduce the world to crypto" }, { icon: "bi-journal-text", title: "Blog", desc: "Read the latest from Coinbase" }] },
            { items: [{ icon: "bi-briefcase", title: "Careers", desc: "Work with us" }, { icon: "bi-chat-dots", title: "Support", desc: "Find answers to your questions" }, { icon: "bi-shield-lock", title: "Security", desc: "The most trusted & secure" }] },
        ],
    },
};

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
                        <i className={`bi ${data.promo.cardContent}`} style={{ fontSize: 48, lineHeight: 1, color: data.promo.cardBg === "#f0f0f0" ? "#111" : "white" }} />
                    </div>
                    <div className="cb2-mega-promo-content">
                        <div className="cb2-mega-promo-title">{data.promo.title}</div>
                        <div className="cb2-mega-promo-desc">{data.promo.desc}</div>
                        <a href="#" className="cb2-mega-promo-link"> {data.promo.link} </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Nav({ onNavigateHome, onAuthView }) {
    const [openMenu, setOpenMenu] = useState(null);
    const [searchOpen, setSearchOpen] = useState(false);
    const navRef = useRef(null);

    const handleNavClick = useCallback((name) => {
        if (name === "Cryptocurrencies") { setOpenMenu(null); return; }
        setOpenMenu((prev) => (prev === name ? null : name));
    }, []);

    useEffect(() => {
        const handler = (e) => { if (navRef.current && !navRef.current.contains(e.target)) setOpenMenu(null); };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <>
            <nav className="cb2-nav" ref={navRef}>
                <div className="cb2-nav-inner">
                    <a href="#" className="cb2-logo" onClick={(e) => { e.preventDefault(); onNavigateHome(); }} style={{ display: 'flex', alignItems: 'center' }}>
                        <Logo size={18} />
                    </a>

                    <ul className="cb2-nav-links">
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
                        <button className="cb2-icon-btn" onClick={() => setSearchOpen(true)}> <SearchIcon /> </button>
                        <button className="cb2-icon-btn"> <GlobeIcon /> </button>
                        <button className="cb2-btn-signin" onClick={() => onAuthView('signin')}> Sign in </button>
                        <button className="cb2-btn-signup" onClick={() => onAuthView('signup')}> Sign up </button>
                    </div>
                </div>
            </nav>
            <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
        </>
    );
}

export default Nav;
