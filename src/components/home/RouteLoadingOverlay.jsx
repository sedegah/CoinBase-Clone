import React from "react";

function RouteLoadingOverlay({ active }) {
    if (!active) return null;
    return (
        <div className="cb-route-loader">
            <div className="cb-route-loader-bar" />
        </div>
    );
}

export default RouteLoadingOverlay;
