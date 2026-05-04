import React from "react";

export const SearchIcon = () => <i className="bi bi-search" />;
export const GlobeIcon = () => <i className="bi bi-globe2" />;
export const ChevronDownIcon = ({ open }) => (
    <i className="bi bi-chevron-down" style={{ transition: "transform .2s", transform: open ? "rotate(180deg)" : "none" }} />
);
export const CheckIcon = () => <i className="bi bi-check2" style={{ fontSize: 24, lineHeight: 1, color: "white" }} />;
export const CoinbaseLogo = ({ size = 22 }) => <i className="bi bi-hexagon-fill" style={{ fontSize: size, lineHeight: 1, color: "white" }} />;
