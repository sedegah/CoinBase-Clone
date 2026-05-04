import React, { useState } from "react";

function HeroSection() {
    const [email, setEmail] = useState("");

    return (
        <section>
            <div className="cb-hero">
                <div className="cb-hero-visual">
                    <div className="cb-hero-image">
                        <img 
                            src="/assets/images/Hero_4.avif" 
                            alt="Hero" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <p className="cb-hero-disclaimer">Stocks and prediction markets not available in your jurisdiction.</p>
                </div>
                <div>
                    <h1 className="cb-hero-title">
                        The future of
                        <br />
                        finance is here.
                    </h1>
                    <p className="cb-hero-subtitle">Trade crypto and more on a platform you can trust.</p>
                    <div className="cb-hero-form">
                        <input type="email" placeholder="satoshi@nakamoto.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <button className="cb-hero-form-btn">Sign up</button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HeroSection;
