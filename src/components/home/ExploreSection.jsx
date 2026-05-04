import React from "react";
import AssetTable from "./AssetTable";

function ExploreSection() {
    return (
        <section className="cb-explore-section">
            <div className="cb-explore-inner">
                <div className="cb-explore-content">
                    <h2>Explore crypto like Bitcoin, Ethereum, and Dogecoin.</h2>
                    <p>Simply and securely buy, sell, and manage hundreds of cryptocurrencies.</p>
                    <a href="#" className="cb-btn-dark">See more assets</a>
                </div>
                <AssetTable />
            </div>
        </section>
    );
}

export default ExploreSection;
