import React from "react";
import { ARTICLES } from "./constants";

function LearnSection() {
    return (
        <section style={{ backgroundColor: "#F2F2F2", padding: "80px 0" }}>
            <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 80px" }}>
                <h2 style={{ fontSize: 44, fontWeight: 500, letterSpacing: -1.5, marginBottom: 40 }}>Crypto basics and news</h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
                    {ARTICLES.map((art, i) => (
                        <div key={i} style={{ background: "white", borderRadius: 24, overflow: "hidden", display: "flex", flexDirection: "column", height: "100%" }}>
                            <div style={{ height: 200, background: art.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                {art.thumb}
                            </div>
                            <div style={{ padding: 32, flex: 1, display: "flex", flexDirection: "column" }}>
                                <h3 style={{ fontSize: 24, fontWeight: 500, marginBottom: 16, lineHeight: 1.3 }}>{art.title}</h3>
                                <p style={{ fontSize: 16, color: "var(--gray-500)", lineHeight: 1.5, marginBottom: 24 }}>{art.excerpt}</p>
                                <div style={{ marginTop: "auto" }}>
                                    <a href="#" style={{ color: "var(--blue)", fontWeight: 500, textDecoration: "none" }}>Read more</a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default LearnSection;
