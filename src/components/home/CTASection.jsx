import React, { useState } from "react";

function CTASection() {
    const [email, setEmail] = useState("");
    return (
        <section style={{ padding: "100px 0" }}>
            <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 80px", textAlign: "center" }}>
                <h2 style={{ fontSize: 52, fontWeight: 700, letterSpacing: -2, marginBottom: 16 }}>Ready to start your<br />crypto journey?</h2>
                <p style={{ fontSize: 18, color: "var(--gray-500)", marginBottom: 40 }}>Join over 100 million people and institutions who trust Coinbase.</p>
                <div style={{ display: "flex", gap: 8, maxWidth: 480, margin: "0 auto" }}>
                    <input
                        type="email"
                        placeholder="satoshi@nakamoto.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ flex: 1, padding: "14px 18px", fontSize: 15, border: "1.5px solid var(--gray-200)", borderRadius: 100, outline: "none" }}
                    />
                    <button className="cb-hero-form-btn">Sign up</button>
                </div>
            </div>
        </section>
    );
}

export default CTASection;
