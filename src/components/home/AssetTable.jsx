import React, { useState, useEffect } from "react";
import { INITIAL_ASSETS, ASSET_TABS } from "./constants";

function fmtPrice(p) {
    if (p >= 1000) return "GHS " + p.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    if (p >= 1) return "GHS " + p.toFixed(2);
    return "GHS " + p.toFixed(4);
}

function AssetTable() {
    const [activeTab, setActiveTab] = useState("Tradable");
    const [assets, setAssets] = useState(INITIAL_ASSETS);

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
        if (activeTab === "Top gainers") return [...assets].sort((a, b) => b.chg - a.chg);
        if (activeTab === "New on Coinbase") return assets.filter((a) => a.newOn);
        return assets;
    })();

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
                            <i className={`bi ${a.icon}`} />
                        </div>
                        <span className="cb-coin-name">{a.name}</span>
                    </div>
                    <div className="cb-asset-row-right">
                        <div className="cb-coin-price">{fmtPrice(a.price)}</div>
                        <div className={`cb-coin-chg ${a.chg === 0 ? "" : a.chg > 0 ? "up" : "dn"}`}>
                            {a.chg === 0 ? "--" : <><i className={`bi ${a.chg > 0 ? "bi-arrow-up-right" : "bi-arrow-down-right"}`} /> {Math.abs(a.chg).toFixed(2)}%</>}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default AssetTable;
export { fmtPrice };
