export const cryptocurrencies = [
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 43256.78,
    marketCap: 845678901234,
    volume24h: 23456789012,
    change24h: 2.34,
    change7d: -1.23,
    circulatingSupply: 19567890,
    maxSupply: 21000000,
    description: 'Bitcoin is the first decentralized cryptocurrency, created in 2009 by Satoshi Nakamoto.',
    icon: '₿',
    rank: 1,
    categories: ['Cryptocurrency', 'Store of Value', 'DeFi'],
    sparkline: [42000, 42500, 43000, 43500, 43256, 43800, 43256]
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    price: 2289.45,
    marketCap: 274567890123,
    volume24h: 12345678901,
    change24h: 3.45,
    change7d: 4.67,
    circulatingSupply: 120000000,
    maxSupply: null,
    description: 'Ethereum is a decentralized platform that runs smart contracts.',
    icon: 'Ξ',
    rank: 2,
    categories: ['Cryptocurrency', 'Smart Contracts', 'DeFi', 'NFTs'],
    sparkline: [2200, 2250, 2300, 2289, 2350, 2289, 2400]
  },
  {
    id: 'binance-coin',
    name: 'Binance Coin',
    symbol: 'BNB',
    price: 312.89,
    marketCap: 48234567890,
    volume24h: 1234567890,
    change24h: -1.23,
    change7d: 2.34,
    circulatingSupply: 154000000,
    maxSupply: 200000000,
    description: 'Binance Coin is the cryptocurrency of the Binance exchange.',
    icon: 'B',
    rank: 3,
    categories: ['Cryptocurrency', 'Exchange Token'],
    sparkline: [310, 315, 320, 312, 318, 312, 325]
  },
  {
    id: 'cardano',
    name: 'Cardano',
    symbol: 'ADA',
    price: 0.58,
    marketCap: 20345678901,
    volume24h: 456789012,
    change24h: 5.67,
    change7d: 8.90,
    circulatingSupply: 35000000000,
    maxSupply: 45000000000,
    description: 'Cardano is a proof-of-stake blockchain platform.',
    icon: 'A',
    rank: 4,
    categories: ['Cryptocurrency', 'Smart Contracts', 'PoS'],
    sparkline: [0.55, 0.56, 0.57, 0.58, 0.59, 0.58, 0.60]
  },
  {
    id: 'solana',
    name: 'Solana',
    symbol: 'SOL',
    price: 98.76,
    marketCap: 42345678901,
    volume24h: 2345678901,
    change24h: 4.56,
    change7d: 12.34,
    circulatingSupply: 429000000,
    maxSupply: null,
    description: 'Solana is a high-performance blockchain supporting builders around the world.',
    icon: 'S',
    rank: 5,
    categories: ['Cryptocurrency', 'Smart Contracts', 'DeFi', 'NFTs'],
    sparkline: [95, 96, 97, 98, 99, 98, 100]
  },
  {
    id: 'polkadot',
    name: 'Polkadot',
    symbol: 'DOT',
    price: 7.89,
    marketCap: 9876543210,
    volume24h: 234567890,
    change24h: -2.34,
    change7d: 3.45,
    circulatingSupply: 1250000000,
    maxSupply: null,
    description: 'Polkadot is a multi-chain interchange and translation architecture.',
    icon: 'D',
    rank: 6,
    categories: ['Cryptocurrency', 'Interoperability', 'Smart Contracts'],
    sparkline: [7.5, 7.6, 7.7, 7.8, 7.9, 7.89, 8.0]
  },
  {
    id: 'avalanche',
    name: 'Avalanche',
    symbol: 'AVAX',
    price: 36.78,
    marketCap: 13456789012,
    volume24h: 567890123,
    change24h: 6.78,
    change7d: -3.45,
    circulatingSupply: 366000000,
    maxSupply: 720000000,
    description: 'Avalanche is a platform of highly scalable interoperable blockchains.',
    icon: 'A',
    rank: 7,
    categories: ['Cryptocurrency', 'Smart Contracts', 'DeFi'],
    sparkline: [35, 35.5, 36, 36.5, 37, 36.78, 37.5]
  },
  {
    id: 'chainlink',
    name: 'Chainlink',
    symbol: 'LINK',
    price: 14.56,
    marketCap: 8567890123,
    volume24h: 345678901,
    change24h: 1.23,
    change7d: 5.67,
    circulatingSupply: 588000000,
    maxSupply: 1000000000,
    description: 'Chainlink is a decentralized oracle network.',
    icon: 'L',
    rank: 8,
    categories: ['Cryptocurrency', 'Oracle', 'DeFi'],
    sparkline: [14, 14.2, 14.4, 14.5, 14.6, 14.56, 14.8]
  }
];

export const trendingCryptos = [
  { id: 'pepe', name: 'Pepe', symbol: 'PEPE', change24h: 45.67, price: 0.00001234 },
  { id: 'bonk', name: 'Bonk', symbol: 'BONK', change24h: 23.45, price: 0.00002345 },
  { id: 'dogwifhat', name: 'dogwifhat', symbol: 'WIF', change24h: 18.90, price: 2.34 },
  { id: 'shiba-inu', name: 'Shiba Inu', symbol: 'SHIB', change24h: 12.34, price: 0.00003456 }
];

export const categories = [
  'All',
  'Cryptocurrency',
  'DeFi',
  'NFTs',
  'Gaming',
  'Metaverse',
  'Exchange Token',
  'Smart Contracts',
  'Store of Value',
  'PoS',
  'Oracle',
  'Interoperability'
];

export const timeRanges = [
  { label: '24H', value: '24h' },
  { label: '7D', value: '7d' },
  { label: '1M', value: '1m' },
  { label: '3M', value: '3m' },
  { label: '1Y', value: '1y' },
  { label: 'ALL', value: 'all' }
];

export const navigationItems = [
  { name: 'Prices', href: '/explore', active: false },
  { name: 'Learn', href: '/learn', active: false },
  { name: 'Create', href: '/create', active: false },
  { name: 'Get Started', href: '/signup', active: false, primary: true }
];

export const footerLinks = {
  company: [
    { name: 'About', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Affiliates', href: '/affiliates' },
    { name: 'Blog', href: '/blog' }
  ],
  learn: [
    { name: 'Browse crypto prices', href: '/explore' },
    { name: 'Crypto basics', href: '/learn/crypto-basics' },
    { name: 'Tips & tutorials', href: '/learn/tips' },
    { name: 'Market updates', href: '/learn/updates' }
  ],
  products: [
    { name: 'Exchange', href: '/exchange' },
    { name: 'Wallet', href: '/wallet' },
    { name: 'Card', href: '/card' },
    { name: 'Prime', href: '/prime' }
  ],
  services: [
    { name: 'Institutional', href: '/institutional' },
    { name: 'Commerce', href: '/commerce' },
    { name: 'Asset Hub', href: '/asset-hub' },
    { name: 'Prime', href: '/prime' }
  ],
  support: [
    { name: 'Help center', href: '/help' },
    { name: 'Contact us', href: '/contact' },
    { name: 'System status', href: '/status' },
    { name: 'Fees', href: '/fees' }
  ]
};
