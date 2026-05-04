import React from "react";
import { CANDLE_DATA, ORDER_BOOK_ASKS, ORDER_BOOK_BIDS } from "./constants";

function CandlestickChart() {
    return (
        <div className="cb-candles-row">
            {CANDLE_DATA.map((c, i) => {
                const up = c.c >= c.o;
                const bh = Math.max(2, Math.abs(c.c - c.o)) * 0.65;
                const tw = Math.abs(c.h - Math.max(c.o, c.c)) * 0.65;
                const bw = Math.abs(Math.min(c.o, c.c) - c.l) * 0.65;
                const col = up ? "#05B169" : "#CF304A";
                return (
                    <div key={i} className="cb-candle">
                        <div className="cb-c-wick" style={{ height: tw, background: col }} />
                        <div className={`cb-c-body ${up ? "up" : "dn"}`} style={{ height: bh }} />
                        <div className="cb-c-wick" style={{ height: bw, background: col }} />
                    </div>
                );
            })}
        </div>
    );
}

function TradeSection() {
    return (
        <section>
            <div className="cb-trade-section">
                <div className="cb-trade-visual">
                    <div className="cb-chart-wrap">
                        <div className="cb-chart-hdr">
                            <span className="cb-chart-hdr-ticker">BTC-USD</span>
                            <span className="cb-chart-hdr-price">$43,281</span>
                            <span className="cb-chart-hdr-chg">+2.14%</span>
                        </div>
                        <CandlestickChart />
                        <div style={{ marginTop: 8, borderTop: "1px solid #222", paddingTop: 6 }}>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", fontSize: 9, color: "#444", paddingBottom: 4 }}>
                                <span>Symbol</span>
                                <span style={{ textAlign: "center" }}>Price</span>
                                <span style={{ textAlign: "right" }}>Chg</span>
                            </div>
                            {[
                                { sym: "ETH", price: "$2,287", chg: "+1.8%", up: true },
                                { sym: "SOL", price: "$98.4", chg: "+3.2%", up: true },
                                { sym: "DOGE", price: "$0.073", chg: "-0.5%", up: false },
                            ].map((r) => (
                                <div key={r.sym} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", fontSize: 9, padding: "3px 0" }}>
                                    <span style={{ color: "#666" }}>{r.sym}</span>
                                    <span style={{ textAlign: "center", color: "white" }}>{r.price}</span>
                                    <span style={{ textAlign: "right", color: r.up ? "#05B169" : "#CF304A" }}>{r.chg}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="cb-ob-panel">
                        <div className="cb-ob-lbl">Order Book</div>
                        {ORDER_BOOK_ASKS.map((r) => (
                            <div key={r.price} className="cb-ob-r ask"><span>{r.price}</span><span>{r.qty}</span></div>
                        ))}
                        <div className="cb-ob-r mid"><span>43,281</span></div>
                        {ORDER_BOOK_BIDS.map((r) => (
                            <div key={r.price} className="cb-ob-r bid"><span>{r.price}</span><span>{r.qty}</span></div>
                        ))}
                    </div>
                </div>
                <div className="cb-trade-content">
                    <h2>Powerful tools, designed for the advanced trader.</h2>
                    <p>Powerful analytical tools with the safety and security of Coinbase deliver the ultimate trading experience.</p>
                    <a href="#" className="cb-btn-dark">Start trading</a>
                </div>
            </div>
        </section>
    );
}

export default TradeSection;
