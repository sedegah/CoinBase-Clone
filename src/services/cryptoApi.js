const API_BASE_URL = 'https://api.coingecko.com/api/v3';

const cache = new Map();
const CACHE_DURATION = 60000;

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

export async function fetchCryptoPrices() {
  const cacheKey = 'crypto_prices';
  const cached = getCachedData(cacheKey);
  if (cached) return cached;

  try {
    const response = await fetch(
      `${API_BASE_URL}/simple/price?ids=bitcoin,ethereum,solana&vs=usd&include_24hr_change=true`,
      {
        headers: {
          'accept': 'application/json',
        },
        mode: 'cors'
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    setCachedData(cacheKey, data);
    return data;
  } catch (error) {
    console.error('Error fetching crypto prices:', error);
    return null;
  }
}

// Convert USD to GHS
function convertUSDtoGHS(usdAmount) {
  const USD_TO_GHS_RATE = 15.80; // Approximate rate
  return usdAmount * USD_TO_GHS_RATE;
}

// Format price for display (GHS as default)
export function formatPrice(price, currency = 'GHS') {
  if (currency === 'GHS') {
    const ghsPrice = convertUSDtoGHS(price);
    return `GH₵${ghsPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
  return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// Get formatted crypto data for dashboard
export async function getCryptoData() {
  try {
    const prices = await fetchCryptoPrices();

    return {
      bitcoin: {
        name: 'Bitcoin',
        symbol: 'BTC',
        price: prices.bitcoin.usd,
        change24h: prices.bitcoin.usd_24h_change,
        color: '#F7931A',
        bg: '#FFF7ED',
        icon: 'bitcoin'
      },
      ethereum: {
        name: 'Ethereum',
        symbol: 'ETH',
        price: prices.ethereum.usd,
        change24h: prices.ethereum.usd_24h_change,
        color: '#627EEA',
        bg: '#EEF2FF',
        icon: 'ethereum'
      },
      solana: {
        name: 'Solana',
        symbol: 'SOL',
        price: prices.solana.usd,
        change24h: prices.solana.usd_24h_change,
        color: '#9945FF',
        bg: '#F5F0FF',
        icon: 'solana'
      }
    };
  } catch (error) {
    console.error('Error getting crypto data:', error);
    return null;
  }
}

// Test function to check API connectivity
export async function testApiConnection() {
  try {
    console.log('Testing API connection...');
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs=usd', {
      mode: 'cors'
    });
    console.log('Response status:', response.status);
    const data = await response.json();
    console.log('Test data:', data);
    return data;
  } catch (error) {
    console.error('API test failed:', error);
    return null;
  }
}

// Polling function for real-time updates
export function startPricePolling(callback, interval = 60000) {
  // Initial fetch
  callback();

  // Set up polling
  const pollInterval = setInterval(async () => {
    try {
      const data = await getCryptoData();
      if (data) callback(data);
    } catch (error) {
      console.error('Error in price polling:', error);
    }
  }, interval);

  // Return cleanup function
  return () => clearInterval(pollInterval);
}
