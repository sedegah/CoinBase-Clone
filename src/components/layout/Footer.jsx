import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-16 px-8 lg:px-20 border-t border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-[160px_1fr_1fr_1fr_1fr] gap-6">
          {/* Logo */}
          <div className="footer-logo">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <svg viewBox="0 0 32 32" fill="none" className="w-5.5 h-5.5">
                <path d="M16 3C9.37 3 4 8.37 4 15C4 21.63 9.37 27 16 27C20.77 27 24.93 24.39 27.18 20.5H22.18C20.64 22.59 18.47 24 16 24C11.03 24 7 19.97 7 15C7 10.03 11.03 6 16 6C18.47 6 20.64 7.41 22.18 9.5H27.18C24.93 5.61 20.77 3 16 3Z" fill="white"/>
              </svg>
            </div>
          </div>
          
          {/* Company & Learn */}
          <div className="footer-col">
            <h4 className="text-sm font-bold text-gray-900 mb-3.5">Company</h4>
            <ul className="list-none flex flex-col gap-2.5">
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors leading-tight">About</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors leading-tight">Careers</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors leading-tight">Affiliates</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors leading-tight">Blog</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors leading-tight">Press</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors leading-tight">Security</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors leading-tight">Investors</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors leading-tight">Vendors</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors leading-tight">Legal & privacy</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors leading-tight">Cookie policy</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors leading-tight">Cookie preferences</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors leading-tight">Do Not Sell or Share My Personal Information</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors leading-tight">Digital Asset Disclosures</a></li>
            </ul>
            <br/>
            <h4 className="text-sm font-bold text-gray-900 mb-3.5">Learn</h4>
            <ul className="list-none flex flex-col gap-2.5">
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors leading-tight">Explore</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors leading-tight">Market statistics</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors leading-tight">Coinbase Bytes newsletter</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors leading-tight">Crypto basics</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors leading-tight">Tips & tutorials</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors leading-tight">Crypto glossary</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors leading-tight">Market updates</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors leading-tight">What is Bitcoin?</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors leading-tight">What is crypto?</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors leading-tight">What is a blockchain?</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors leading-tight">How to set up a crypto wallet?</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors leading-tight">How to send crypto?</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors leading-tight">Taxes</a></li>
            </ul>
          </div>
          
          {/* Individuals, Businesses, Institutions */}
          <div className="footer-col">
            <h4 className="text-sm font-bold text-gray-900 mb-3.5">Individuals</h4>
            <ul className="list-none flex flex-col gap-2.5">
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors leading-tight">Buy & sell</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors leading-tight">Earn free crypto</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors leading-tight">Base App</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors leading-tight">Coinbase One</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors leading-tight">Debit Card</a></li>
            </ul>
            <br/>
            <h4 className="text-sm font-bold text-gray-900 mb-3.5">Businesses</h4>
            <ul className="list-none flex flex-col gap-2.5">
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors leading-tight">Asset Listings</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors leading-tight">Coinbase Business</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors leading-tight">Payments</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors leading-tight">Commerce</a></li>
            </ul>
            <br/>
            <h4 className="text-sm font-bold text-gray-900 mb-3.5">Institutions</h4>
            <ul className="list-none flex flex-col gap-2.5">
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors leading-tight">Prime</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors leading-tight">Staking</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors leading-tight">Exchange</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors leading-tight">International Exchange</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors leading-tight">Derivatives Exchange</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors leading-tight">Verified Pools</a></li>
            </ul>
          </div>
          
          {/* Developers */}
          <div className="footer-col">
            <h4 className="text-sm font-bold text-gray-900 mb-3.5">Developers</h4>
            <ul className="list-none flex flex-col gap-2.5">
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors leading-tight">Developer Platform</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors leading-tight">Base</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors leading-tight">Server Wallets</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors leading-tight">Embedded Wallets</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors leading-tight">Base Accounts (Smart Wallets)</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors leading-tight">Onramp & Offramp</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors leading-tight">x402</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors leading-tight">Trade API</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors leading-tight">Paymaster</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors leading-tight">OnchainKit</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors leading-tight">Data API</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors leading-tight">Verifications</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors leading-tight">Node</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors leading-tight">AgentKit</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors leading-tight">Staking</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors leading-tight">Faucet</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors leading-tight">Exchange API</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors leading-tight">International Exchange API</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors leading-tight">Prime API</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors leading-tight">Derivatives API</a></li>
            </ul>
          </div>
          
          {/* Support & Asset Prices */}
          <div className="footer-col">
            <h4 className="text-sm font-bold text-gray-900 mb-3.5">Support</h4>
            <ul className="list-none flex flex-col gap-2.5">
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors leading-tight">Help center</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors leading-tight">Contact us</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors leading-tight">Create account</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors leading-tight">ID verification</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors leading-tight">Account information</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors leading-tight">Payment methods</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors leading-tight">Account access</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors leading-tight">Supported crypto</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors leading-tight">Status</a></li>
            </ul>
            <br/>
            <h4 className="text-sm font-bold text-gray-900 mb-3.5">Asset prices</h4>
            <ul className="list-none flex flex-col gap-2.5">
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors leading-tight">Bitcoin price</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors leading-tight">Ethereum price</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors leading-tight">Solana price</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors leading-tight">XRP price</a></li>
            </ul>
            <br/>
            <h4 className="text-sm font-bold text-gray-900 mb-3.5">Stock prices</h4>
            <ul className="list-none flex flex-col gap-2.5">
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors leading-tight">NVIDIA price</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors leading-tight">Apple price</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors leading-tight">Microsoft price</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors leading-tight">Amazon price</a></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="flex items-center justify-between pt-7 mt-12 border-t border-gray-200 flex-wrap gap-4">
          <div className="text-sm text-gray-500">
            © 2026 Coinbase
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Privacy</a>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
