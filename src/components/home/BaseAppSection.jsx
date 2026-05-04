import React from "react";

function BaseAppSection() {
    return (
        <section className="cb-base-section">
            <div className="cb-base-visual">
                <div className="cb-base-phone">
                    <div className="cb-base-phone-header">
                        <div className="cb-base-tab-active">Discover</div>
                        <div style={{ fontSize: 13, color: "var(--gray-500)", paddingBottom: 10 }}>Tokens</div>
                        <div style={{ fontSize: 13, color: "var(--gray-500)", paddingBottom: 10 }}>Groups</div>
                    </div>
                    <div style={{ padding: 14 }}>
                        <div style={{ fontSize: 18, fontWeight: 500, marginBottom: 12 }}>Trending now</div>
                        {[
                            { name: "Based Peep", ticker: "@peep", price: "2.4 ETH", chg: "+14.2%", up: true },
                            { name: "Higher", ticker: "@higher", price: "0.85 ETH", chg: "+8.5%", up: true },
                            { name: "Boys Club", ticker: "@boys", price: "1.2 ETH", chg: "-2.1%", up: false },
                        ].map((item, idx) => (
                            <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #f9f9f9" }}>
                                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                                    <div style={{ width: 36, height: 36, borderRadius: 8, background: "#f0f0f0" }} />
                                    <div>
                                        <div style={{ fontSize: 13, fontWeight: 500 }}>{item.name}</div>
                                        <div style={{ fontSize: 11, color: "#888" }}>{item.ticker}</div>
                                    </div>
                                </div>
                                <div style={{ textAlign: "right" }}>
                                    <div style={{ fontSize: 13, fontWeight: 500 }}>{item.price}</div>
                                    <div style={{ fontSize: 11, color: item.up ? "#05B169" : "#CF304A" }}>{item.chg}</div>
                                </div>
                            </div>
                        ))}
                        <div style={{ marginTop: 20, padding: 14, background: "#F2F2F2", borderRadius: 16 }}>
                            <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 4 }}>New on Base</div>
                            <div style={{ fontSize: 12, color: "#666" }}>Discover the latest tokens and apps on the world's fastest L2.</div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h2 style={{ fontSize: "clamp(30px, 3.5vw, 52px)", fontWeight: 500, letterSpacing: -1.5, lineHeight: 1.1, marginBottom: 16 }}>Post, earn, trade, and chat, all in one place.</h2>
                <p style={{ fontSize: 16, color: "var(--gray-500)", lineHeight: 1.7, marginBottom: 32 }}>Onchain is the next online. Base App is the easiest way to explore and use the onchain world.</p>
                <a href="#" className="cb-btn-dark">Learn more</a>
            </div>
        </section>
    );
}

export default BaseAppSection;
