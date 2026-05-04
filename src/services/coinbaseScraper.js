const API_BASE_URL = 'https://www.coinbase.com';

const MOCK_COINBASE_DATA = {
  title: "Coinbase: Buy Bitcoin & Ethereum",
  description: "Coinbase is a secure online platform for buying, selling, transferring, and storing digital currency.",
  cards: [
    {
      title: "Bitcoin",
      description: "Trade the world's most popular crypto",
      image: "https://assets.coinbase.com/stake-asset/4d9c2d6a-4621-4f94-9c4b-8a3d5a3a7e6e/asset.png",
      href: "https://www.coinbase.com/price/bitcoin",
      price: "$67,843.21",
      change: "+2.4%"
    },
    {
      title: "Ethereum",
      description: "The world's second-largest cryptocurrency",
      image: "https://assets.coinbase.com/stake-asset/2b9c2d6a-4621-4f94-9c4b-8a3d5a3a7e6f/asset.png",
      href: "https://www.coinbase.com/price/ethereum",
      price: "$3,456.78",
      change: "-1.1%"
    },
    {
      title: "Solana",
      description: "High-performance blockchain supporting builders",
      image: "https://assets.coinbase.com/stake-asset/3d9c2d6a-4621-4f94-9c4b-8a3d5a3a7e70/asset.png",
      href: "https://www.coinbase.com/price/solana",
      price: "$178.92",
      change: "+5.7%"
    },
    {
      title: "USD Coin",
      description: "Digital dollar with the stability of the US dollar",
      image: "https://assets.coinbase.com/stake-asset/1b9c2d6a-4621-4f94-9c4b-8a3d5a3a7e6e/asset.png",
      href: "https://www.coinbase.com/price/usdc",
      price: "$1.00",
      change: "0.0%"
    },
    {
      title: "Cardano",
      description: "Proof-of-stake blockchain platform",
      image: "https://assets.coinbase.com/stake-asset/5d9c2d6a-4621-4f94-9c4b-8a3d5a3a7e71/asset.png",
      href: "https://www.coinbase.com/price/cardano",
      price: "$0.678",
      change: "+3.2%"
    },
    {
      title: "Learn & Earn",
      description: "Earn crypto while learning about blockchain",
      image: "https://assets.coinbase.com/learn-earn/learn-earn-banner.png",
      href: "https://www.coinbase.com/learn",
      price: "Earn up to $50",
      change: "New"
    }
  ]
};

// Fetch Coinbase card data (mock implementation for browser)
export async function fetchCoinbaseCards() {
  try {
    // In a real implementation, this would call a backend service
    // that runs the Playwright scraper
    console.log('Fetching Coinbase cards...');
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return MOCK_COINBASE_DATA;
  } catch (error) {
    console.error('Error fetching Coinbase cards:', error);
    return MOCK_COINBASE_DATA; // Fallback to mock data
  }
}

// Format card data for dashboard
export function formatCardsForDashboard(cards) {
  return cards.map(card => ({
    title: card.title,
    description: card.description,
    image: card.image,
    href: card.href,
    price: card.price,
    change: card.change,
    color: getCardColor(card.title),
    bg: getCardBackground(card.title)
  }));
}

// Get card color based on title
function getCardColor(title) {
  const colors = {
    'Bitcoin': '#F7931A',
    'Ethereum': '#627EEA',
    'Solana': '#9945FF',
    'USD Coin': '#2563EB',
    'Cardano': '#0033AD',
    'Learn & Earn': '#22C55E'
  };
  return colors[title] || '#6B7280';
}

// Get card background based on title
function getCardBackground(title) {
  const backgrounds = {
    'Bitcoin': '#FFF7ED',
    'Ethereum': '#EEF2FF',
    'Solana': '#F5F0FF',
    'USD Coin': '#EFF6FF',
    'Cardano': '#F0F9FF',
    'Learn & Earn': '#F0FDF4'
  };
  return backgrounds[title] || '#F9FAFB';
}

// Get card icon name based on title
function getCardIcon(title) {
  const icons = {
    'Bitcoin': 'bitcoin',
    'Ethereum': 'ethereum',
    'Solana': 'solana',
    'USD Coin': 'usdc',
    'Cardano': 'cardano',
    'Learn & Earn': 'learning'
  };
  return icons[title] || 'assets';
}

// Cache for card data
let cardCache = null;
let lastFetchTime = 0;
const CACHE_DURATION = 300000; // 5 minutes

// Get cached card data or fetch new
export async function getCachedCardData() {
  const now = Date.now();
  
  if (cardCache && (now - lastFetchTime) < CACHE_DURATION) {
    return cardCache;
  }
  
  try {
    const data = await fetchCoinbaseCards();
    cardCache = formatCardsForDashboard(data.cards);
    lastFetchTime = now;
    return cardCache;
  } catch (error) {
    console.error('Error getting cached card data:', error);
    return cardCache || formatCardsForDashboard(MOCK_COINBASE_DATA.cards);
  }
}

// Server-side scraper function (for Node.js backend)
export function createScraperScript() {
  return `
const { chromium } = require("playwright");

async function scrapeCoinbaseCards() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto("https://www.coinbase.com", {
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

    // Look for card elements
    const cardElements = document.querySelectorAll("a[href*='/price/'], .card, .asset-card");
    
    cardElements.forEach(card => {
      const title = card.querySelector("h2, h3, h4, .title")?.innerText || 
                   card.getAttribute('data-title') ||
                   card.innerText.split('\\n')[0];
      
      const image = card.querySelector("img")?.src;
      const description = card.querySelector("p, .description")?.innerText;
      const link = card.href;
      const price = card.querySelector(".price, .value")?.innerText;
      const change = card.querySelector(".change, .percent")?.innerText;

      if (title && link && image) {
        cards.push({
          title: title.trim(),
          description: description?.trim() || "",
          image,
          href: link,
          price: price?.trim() || "",
          change: change?.trim() || ""
        });
      }
    });

    return {
      title: document.title,
      description: document.querySelector("meta[name='description']")?.content || "",
      cards
    };
  });

  await browser.close();
  return data;
}

module.exports = { scrapeCoinbaseCards };
`;
}
