import React, { useState, useEffect, useRef } from "react";
import { SEARCH_CRYPTO, SEARCH_STOCKS, SEARCH_PREDICTIONS, SEARCH_PERPETUALS, SEARCH_FUTURES, TABS } from "./constants";

const ALL_DATA = {
    Crypto: SEARCH_CRYPTO,
    Stocks: SEARCH_STOCKS,
    Predictions: SEARCH_PREDICTIONS,
    Perpetuals: SEARCH_PERPETUALS,
    Futures: SEARCH_FUTURES,
};

function SearchResultRow({ item, showRank }) {
    return (
        <div className="sr-row">
            <div className="sr-row-left">
                <div className="sr-coin-icon" style={{ background: item.iconBg }}>
                    <i className={`bi ${item.icon}`} />
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
                </div>
            </div>
        </div>
    );
}

function getTopResults() {
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
        </div>
    );
}

export default SearchOverlay;
