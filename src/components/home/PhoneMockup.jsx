import React from "react";
import { PHONE_ROWS } from "./constants";

function PhoneMockup({ activeTab, onTabClick }) {
    return (
        <div className="cb-phone-mockup">
            <div className="cb-phone-top-bar">
                <div className="cb-phone-top-search">
                    <i className="bi bi-search" style={{ fontSize: 10, lineHeight: 1, color: "#aaa" }} />
                    <span>Search</span>
                </div>
                <div className="cb-phone-top-icons">
                    <span><i className="bi bi-arrow-repeat" /></span>
                    <span><i className="bi bi-grid" /></span>
                    <span><i className="bi bi-bell" /></span>
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

export default PhoneMockup;
