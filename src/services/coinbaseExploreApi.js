const EXPLORE_API_BASE = 'https://www.coinbase.com/explore';

const cache = new Map();
const CACHE_DURATION = 300000;

function getCachedData(key) {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  return null;
}

function setCachedData(key, data) {
  cache.set(key, {
    data,
    timestamp: Date.now()
  });
}

export async function fetchCoinbaseExploreCards() {
  const cacheKey = 'coinbase_explore_cards';
  const cached = getCachedData(cacheKey);
  if (cached) return cached;

  try {
    console.log('Fetching Coinbase explore cards...');
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockData = {
      cards: [
        {
          title: "Bitcoin",
          image: "https://dynamic-assets.coinbase.com/e785e0181f1a23a30d9476038d9be91e9f6c63959b538eabbc51a1abc8898940383291eede695c3b8dfaa1829a9b57f5a2d0a16b0523580346c6b8fab67af14b/asset_icons/b57ac673f06a4b0338a596817eb0a50ce16e2059f327dc117744449a47915cb2.png",
          href: "https://www.coinbase.com/price/bitcoin"
        },
        {
          title: "Ethereum", 
          image: "https://dynamic-assets.coinbase.com/dbb4b4983bde81309ddab83eb598358eb44375b930b94687ebe38bc22e52c3b2125258ffb8477a5ef22e33d6bd72e32a506c391caa13af64c00e46613c3e5806/asset_icons/4113b082d21cc5fab17fc8f2d19fb996165bcce635e6900f7fc2d57c4ef33ae9.png",
          href: "https://www.coinbase.com/price/ethereum"
        },
        {
          title: "Solana",
          image: "https://assets.coingecko.com/coins/images/4128/large/solana.png?1696504756", 
          href: "https://www.coinbase.com/price/solana"
        },
        {
          title: "Cardano",
          image: "https://assets.coingecko.com/coins/images/975/large/cardano.png?1696502090",
          href: "https://www.coinbase.com/price/cardano"
        },
        {
          title: "Avalanche",
          image: "https://asset-metadata-service-production.s3.amazonaws.com/asset_icons/c347b6d1a7624e24c4e90089a69dfc8fb75523daf8eeb88007372a0c3a30d428.png",
          href: "https://www.coinbase.com/price/avalanche"
        },
        {
          title: "Polkadot",
          image: "https://dynamic-assets.coinbase.com/e81509d2307f706f3a6f8999968874b50b628634abf5154fc91a7e5f7685d496a33acb4cde02265ed6f54b0a08fa54912208516e956bc5f0ffd1c9c2634099ae/asset_icons/3af4b33bde3012fd29dd1366b0ad737660f24acc91750ee30a034a0679256d0b.png",
          href: "https://www.coinbase.com/price/polkadot"
        },
        {
          title: "Chainlink",
          image: "https://assets.coingecko.com/coins/images/877/large/chainlink-new-logo.png?1696517200",
          href: "https://www.coinbase.com/price/chainlink"
        },
        {
          title: "USD Coin",
          image: "https://dynamic-assets.coinbase.com/3c15df5e2ac7d4abbe9499ed9335041f00c620f28e8de2f93474a9f432058742cdf4674bd43f309e69778a26969372310135be97eb183d91c492154176d455b8/asset_icons/9d67b728b6c8f457717154b3a35f9ddc702eae7e76c4684ee39302c4d7fd0bb8.png",
          href: "https://www.coinbase.com/price/usdc"
        },
        {
          title: "Learn & Earn",
          image: "https://images.ctfassets.net/o10es7wu5gm1/7IRLnEVVAZdnfhzq2Q1V61/5e13a5d282289bfc4ae6bb79632a4884/earn_and_learn.webp",
          href: "https://www.coinbase.com/learn"
        },
        {
          title: "Stake",
          image: "https://images.ctfassets.net/o10es7wu5gm1/4CyfFj8M0X8tKnzh8AgdxT/f0fa52750499d9b1691f62880906ff3e/zero_fees_us.png",
          href: "https://www.coinbase.com/stake"
        },
        {
          title: "Coinbase Card",
          image: "https://images.ctfassets.net/o10es7wu5gm1/23gHfTZx8aN8SS1AbYxueV/c74a642deea5d9430aa103adf1210eae/Stocks__1_.png",
          href: "https://www.coinbase.com/card"
        },
        {
          title: "Coinbase One",
          image: "https://images.ctfassets.net/o10es7wu5gm1/4CyfFj8M0X8tKnzh8AgdxT/f0fa52750499d9b1691f62880906ff3e/zero_fees_us.png",
          href: "https://www.coinbase.com/coinbase-one"
        },
        {
          title: "Advanced Trade",
          image: "https://images.ctfassets.net/o10es7wu5gm1/3FwiGvu5fYVsludi8jgOY7/14e7039558786f182123e658c6940151/Advanced.png",
          href: "https://www.coinbase.com/pro"
        },
        {
          title: "Prime",
          image: "https://images.ctfassets.net/o10es7wu5gm1/2Ez0RRXHQLxFltCdXCLOY9/b4f9a86d7eab6cb74bf52883cd547f5b/image.png",
          href: "https://www.coinbase.com/prime"
        },
        {
          title: "Commerce",
          image: "https://images.ctfassets.net/o10es7wu5gm1/6zUsAxrSHcsKobRybPQsgW/d18c0469bc394f2b6af01b0bea61c67c/Prediction_Markets.png",
          href: "https://www.coinbase.com/commerce"
        },
        {
          title: "NFT",
          image: "https://images.ctfassets.net/o10es7wu5gm1/5bELGzAuqD4Kh1UhKOOuut/c1f4c17cc78ce3505ec04b0eb0522895/CB_LOLP__1_.png",
          href: "https://www.coinbase.com/nft"
        },
        {
          title: "Wallet",
          image: "https://images.ctfassets.net/o10es7wu5gm1/1i5oeGUlUsp4XBuybcg4ra/f8dd0d698eaa34c982b0323a2b85e754/image.png",
          href: "https://www.coinbase.com/wallet"
        }
      ]
    };
    
    setCachedData(cacheKey, mockData);
    return mockData;
  } catch (error) {
    console.error('Error fetching Coinbase explore cards:', error);
    return { cards: [] };
  }
}

// Format explore cards for dashboard
export function formatExploreCardsForDashboard(cards) {
  return cards.map(card => ({
    title: card.title,
    image: card.image,
    href: card.href,
    price: getCardPrice(card.title),
    change: getCardChange(card.title),
    color: getCardColor(card.title),
    bg: getCardBackground(card.title),
    icon: getCardIcon(card.title)
  }));
}

// Get card price based on title (mock prices for demonstration)
function getCardPrice(title) {
  const prices = {
    'Bitcoin': '$67,843.21',
    'Ethereum': '$3,456.78',
    'Solana': '$178.92',
    'Cardano': '$0.678',
    'Avalanche': '$38.45',
    'Polkadot': '$7.89',
    'Chainlink': '$14.23',
    'USD Coin': '$1.00',
    'Learn & Earn': 'Earn up to $50',
    'Stake': 'Up to 5.00% APY',
    'Coinbase Card': 'No annual fee',
    'Coinbase One': 'Secure storage',
    'Advanced Trade': 'Advanced tools',
    'Prime': 'Exclusive benefits',
    'Commerce': 'Business solutions',
    'NFT': 'Digital collectibles',
    'Wallet': 'Secure wallet'
  };
  return prices[title] || 'Price not available';
}

// Get card change based on title (mock data)
function getCardChange(title) {
  const changes = {
    'Bitcoin': '+2.4%',
    'Ethereum': '-1.1%',
    'Solana': '+5.7%',
    'Cardano': '+3.2%',
    'Avalanche': '+4.1%',
    'Polkadot': '-2.3%',
    'Chainlink': '+1.8%',
    'USD Coin': '0.0%',
    'Learn & Earn': 'New',
    'Stake': '5.00%',
    'Coinbase Card': 'New',
    'Coinbase One': 'New',
    'Advanced Trade': 'Premium',
    'Prime': 'Premium',
    'Commerce': 'Business',
    'NFT': 'Trending',
    'Wallet': 'Secure'
  };
  return changes[title] || '0.0%';
}

// Get card color based on title
function getCardColor(title) {
  const colors = {
    'Bitcoin': '#F7931A',
    'Ethereum': '#627EEA',
    'Solana': '#9945FF',
    'Cardano': '#0033AD',
    'Avalanche': '#E84142',
    'Polkadot': '#E6007A',
    'Chainlink': '#2A5ADA',
    'USD Coin': '#2775CA',
    'Learn & Earn': '#22C55E',
    'Stake': '#8B5CF6',
    'Coinbase Card': '#0EA5E9',
    'Coinbase One': '#1E40AF',
    'Advanced Trade': '#6366F1',
    'Prime': '#7C3AED',
    'Commerce': '#F59E0B',
    'NFT': '#8B5CF6',
    'Wallet': '#64748B'
  };
  return colors[title] || '#6B7280';
}

// Get card background based on title
function getCardBackground(title) {
  const backgrounds = {
    'Bitcoin': '#FFF7ED',
    'Ethereum': '#EEF2FF',
    'Solana': '#F5F0FF',
    'Cardano': '#F0F9FF',
    'Avalanche': '#FEF3F2',
    'Polkadot': '#F3E8FF',
    'Chainlink': '#F0F9FF',
    'USD Coin': '#EFF6FF',
    'Learn & Earn': '#F0FDF4',
    'Stake': '#EFF6FF',
    'Coinbase Card': '#F0F9FF',
    'Coinbase One': '#EFF6FF',
    'Advanced Trade': '#F8FAFC',
    'Prime': '#F8FAFC',
    'Commerce': '#FEF3C7',
    'NFT': '#F0FDF4',
    'Wallet': '#F9FAFB'
  };
  return backgrounds[title] || '#F9FAFB';
}

// Get card icon name based on title
function getCardIcon(title) {
  const icons = {
    'Bitcoin': 'bitcoin',
    'Ethereum': 'ethereum',
    'Solana': 'solana',
    'Cardano': 'cardano',
    'Avalanche': 'bitcoin', // Using bitcoin as fallback
    'Polkadot': 'ethereum', // Using ethereum as fallback
    'Chainlink': 'bitcoin', // Using bitcoin as fallback
    'USD Coin': 'usdc',
    'Learn & Earn': 'learning',
    'Stake': 'earn',
    'Coinbase Card': 'grid',
    'Coinbase One': 'home',
    'Advanced Trade': 'trade',
    'Prime': 'assets',
    'Commerce': 'trade',
    'NFT': 'grid',
    'Wallet': 'assets'
  };
  return icons[title] || 'assets';
}

// Cache for card data
let exploreCardCache = null;
let lastFetchTime = 0;
const EXPLORE_CACHE_DURATION = 300000; // 5 minutes

// Get cached explore card data or fetch new
export async function getCachedExploreCardData() {
  const now = Date.now();
  
  if (exploreCardCache && (now - lastFetchTime) < EXPLORE_CACHE_DURATION) {
    return exploreCardCache;
  }
  
  try {
    const data = await fetchCoinbaseExploreCards();
    exploreCardCache = formatExploreCardsForDashboard(data.cards);
    lastFetchTime = now;
    return exploreCardCache;
  } catch (error) {
    console.error('Error getting cached explore card data:', error);
    return exploreCardCache || [];
  }
}

// Server-side MCP scraper function (for Node.js backend)
export function createExploreScraperScript() {
  return `
const { chromium } = require("playwright");

async function scrapeCoinbaseExplore() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto("https://www.coinbase.com/explore", {
    waitUntil: "networkidle"
  });

  // Wait for cards to load
  await page.waitForSelector("img");

  // Scroll to trigger lazy loading
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let total = 0;
      const distance = 500;

      const timer = setInterval(() => {
        window.scrollBy(0, distance);
        total += distance;

        if (total >= document.body.scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 200);
    });
  });

  const data = await page.evaluate(() => {
    const cards = [];

    // Look for card elements in the main content
    const cardElements = document.querySelectorAll('a[href*="/price/"], .card, .asset-card, [data-testid*="card"]');
    
    cardElements.forEach(card => {
      const title = card.querySelector("h1, h2, h3, h4, .title")?.innerText || 
                   card.getAttribute('data-title') ||
                   card.getAttribute('aria-label') ||
                   card.innerText.split('\\n')[0];
      
      const image = card.querySelector("img")?.src;
      const link = card.href;

      // Skip navigation and non-card elements
      if (!title || !link || !image) return;
      
      // Skip if it looks like navigation
      if (link.includes('/explore') || link.includes('/learn') || link.includes('/stake')) return;

      cards.push({
        title: title.trim(),
        image,
        href: link
      });
    });

    return { cards };
  });

  await browser.close();
  return data;
}

module.exports = { scrapeCoinbaseExplore };
`;
}
