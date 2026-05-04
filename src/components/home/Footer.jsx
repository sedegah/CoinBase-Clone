import React, { useState, useRef, useEffect } from "react";
import { FOOTER_COLS, LANGUAGE_REGION_OPTIONS } from "./constants";
import { Logo } from "../common";
import { GlobeIcon, ChevronDownIcon } from "./Icons";

function LanguageRegionPopover({ open, onClose, currentId }) {
    const popoverRef = useRef(null);

    useEffect(() => {
        const handler = (e) => {
            if (popoverRef.current && !popoverRef.current.contains(e.target)) onClose();
        };
        if (open) document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div className="cb-lang-popover" ref={popoverRef}>
            {LANGUAGE_REGION_OPTIONS.map((opt) => (
                <button key={opt.id} className={`cb-lang-opt${currentId === opt.id ? " active" : ""}`}>
                    <span className="cb-lang-name">{opt.language}</span>
                    <span className="cb-lang-region">{opt.region}</span>
                </button>
            ))}
        </div>
    );
}

function Footer() {
    const [langOpen, setLangOpen] = useState(false);
    return (
        <footer style={{ borderTop: "1px solid var(--gray-100)", padding: "80px 0 60px" }}>
            <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 80px" }}>
                <div style={{ display: "flex", gap: 40, marginBottom: 80 }}>
                    <div style={{ flex: "0 0 240px" }}>
                        <Logo size={24} className="mb-6" />
                        <div style={{ position: "relative", marginBottom: 24 }}>
                            <button className={`cb-lang-btn${langOpen ? " active" : ""}`} onClick={() => setLangOpen(!langOpen)}>
                                <GlobeIcon />
                                <span>English (Global)</span>
                                <ChevronDownIcon open={langOpen} />
                            </button>
                            <LanguageRegionPopover open={langOpen} onClose={() => setLangOpen(false)} currentId="en-global" />
                        </div>
                        <p style={{ fontSize: 13, color: "var(--gray-500)", marginBottom: 12 }}>© 2025 Coinbase</p>
                        <div style={{ display: "flex", gap: 16 }}>
                            <a href="#" style={{ color: "var(--text)", fontSize: 18 }}><i className="bi bi-twitter-x" /></a>
                            <a href="#" style={{ color: "var(--text)", fontSize: 18 }}><i className="bi bi-facebook" /></a>
                            <a href="#" style={{ color: "var(--text)", fontSize: 18 }}><i className="bi bi-linkedin" /></a>
                            <a href="#" style={{ color: "var(--text)", fontSize: 18 }}><i className="bi bi-instagram" /></a>
                        </div>
                    </div>
                    <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 40 }}>
                        {Object.entries(FOOTER_COLS).map(([title, items]) => (
                            <div key={title}>
                                <h4 style={{ fontSize: 15, fontWeight: 500, marginBottom: 20 }}>{title}</h4>
                                <ul style={{ listStyle: "none", padding: 0 }}>
                                    {items.map(it => (
                                        <li key={it} style={{ marginBottom: 12 }}>
                                            <a href="#" style={{ color: "var(--gray-500)", fontSize: 13, textDecoration: "none" }}>{it}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
