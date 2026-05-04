import React from "react";
import { CheckIcon, CoinbaseLogo } from "./Icons";

function BadgePill({ label }) {
    return (
        <div className="cb-one-badge-pill">
            <div className="cb-one-dot"><CoinbaseLogo size={10} /></div>
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
                    <h2>Zero trading fees,<br />more rewards.</h2>
                    <p>Get more out of crypto with one membership: zero trading fees, boosted rewards, priority support, and more.</p>
                    <a href="#" className="cb-btn-dark">Claim free trial</a>
                </div>
                <div className="cb-one-visual">
                    <div className="cb-one-phone">
                        <div className="cb-one-status"><span>3:57</span><span style={{ letterSpacing: 1 }}>▪▪ ☁ 🔋</span></div>
                        <div style={{ display: "flex", justifyContent: "center", margin: "8px 0" }}>
                            <div className="cb-one-success-icon"><CheckIcon /><div className="cb-one-success-star">★</div></div>
                        </div>
                        <div className="cb-one-success-title">Trade successful!</div>
                        <div className="cb-one-success-sub">You got 0.012423 BTC</div>
                        <div className="cb-one-fee-row">
                            <span className="cb-one-fee-amt">$14.68</span>
                            <div className="cb-one-fee-tag">
                                <div style={{ width: 16, height: 16, background: "var(--blue)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}><CoinbaseLogo size={8} /></div>
                                No trading fees with Coinbase One
                            </div>
                        </div>
                        <div className="cb-one-member-box">
                            <div className="cb-one-avatar">🤿</div>
                            <div className="cb-one-member-title">Exclusive member benefits</div>
                            <div className="cb-one-member-sub">Coinbase One members get<br />boosted staking rewards.</div>
                            <a href="#" className="cb-one-member-link">Learn more</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CoinbaseOneSection;
