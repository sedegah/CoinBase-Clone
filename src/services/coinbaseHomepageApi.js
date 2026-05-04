import { useState, useEffect } from 'react';

const COINBASE_HOMEPAGE_DATA = {
  hero: {
    title: "The future of finance is here.",
    subtitle: "Trade crypto, stocks, and more on a platform you can trust.",
    cta: "Sign up",
    image: "https://images.ctfassets.net/o10es7wu5gm1/4lbSrfvF333XkPz7WycixQ/afbeefb68eab9405594b2e9bfbb9a152/Hero__4_.png"
  },
  features: [
    {
      title: "Trade stocks around the clock",
      subtitle: "Get 24/5 access to thousands of stocks and pay zero commission. Now available to all U.S. traders.",
      image: "https://images.ctfassets.net/o10es7wu5gm1/23gHfTZx8aN8SS1AbYxueV/c74a642deea5d9430aa103adf1210eae/Stocks__1_.png",
      cta: "Start trading",
      link: "https://www.coinbase.com/stocks"
    },
    {
      title: "Trade more with less",
      subtitle: "Unlock leverage with futures and perpetuals trading.",
      image: "https://images.ctfassets.net/o10es7wu5gm1/7kCZtH4AIjrrjDgrwBWQbm/623f3ef8facc44fac88637a6c7ceac5c/Derivatives.png",
      cta: "Trade now",
      link: "https://www.coinbase.com/derivatives-trading/us-derivatives"
    },
    {
      title: "Turn your insights into trades.",
      subtitle: "Trade your predictions on thousands of real world events across sports, politics, crypto, culture and more.",
      image: "https://images.ctfassets.net/o10es7wu5gm1/6zUsAxrSHcsKobRybPQsgW/d18c0469bc394f2b6af01b0bea61c67c/Prediction_Markets.png",
      cta: "Learn more",
      link: "https://www.coinbase.com/prediction-markets"
    },
    {
      title: "Powerful tools, designed for the advanced trader.",
      subtitle: "Powerful analytical tools with the safety and security of Coinbase deliver the ultimate trading experience.",
      image: "https://images.ctfassets.net/o10es7wu5gm1/3FwiGvu5fYVsludi8jgOY7/14e7039558786f182123e658c6940151/Advanced.png",
      cta: "Start trading",
      link: "https://www.coinbase.com/advanced-trade"
    }
  ],
  memberships: [
    {
      title: "COINBASE ONE",
      subtitle: "Zero trading fees, more rewards.",
      description: "Get more out of crypto with one membership: zero trading fees, boosted rewards, priority support, and more.",
      image: "https://images.ctfassets.net/o10es7wu5gm1/4CyfFj8M0X8tKnzh8AgdxT/f0fa52750499d9b1691f62880906ff3e/zero_fees_us.png",
      cta: "Claim free trial",
      link: "https://coinbase.com/one?referrer=logged_out"
    },
    {
      title: "BASE APP",
      subtitle: "Countless ways to earn crypto with the Base App.",
      description: "An everything app to trade, create, discover, and chat, all in one place.",
      image: "https://images.ctfassets.net/o10es7wu5gm1/5bELGzAuqD4Kh1UhKOOuut/c1f4c17cc78ce3505ec04b0eb0522895/CB_LOLP__1_.png",
      cta: "Learn more",
      link: "https://join.base.app/"
    },
    {
      title: "PRIME",
      subtitle: "The financial institution for a digital asset future.",
      description: "Coinbase Prime is the first choice for sophisticated investors and institutions that want to invest in digital assets.",
      image: "https://images.ctfassets.net/o10es7wu5gm1/2Ez0RRXHQLxFltCdXCLOY9/b4f9a86d7eab6cb74bf52883cd547f5b/image.png",
      cta: "Learn more",
      link: "https://www.coinbase.com/institutional"
    }
  ],
  exploreSection: {
    title: "Explore millions of tokens and stocks, all in one place.",
    subtitle: "One trusted account for trading everything—from stocks to Bitcoin.",
    cta: "Get started",
    link: "https://www.coinbase.com/explore"
  },
  tradable: {
    title: "Tradable",
    subtitle: "Top gainers",
    crypto: [
      {
        name: "Bitcoin",
        symbol: "BTC",
        price: "$98,765.43",
        change: "+2.4%",
        image: "https://dynamic-assets.coinbase.com/e785e0181f1a23a30d9476038d9be91e9f6c63959b538eabbc51a1abc8898940383291eede695c3b8dfaa1829a9b57f5a2d0a16b0523580346c6b8fab67af14b/asset_icons/b57ac673f06a4b0338a596817eb0a50ce16e2059f327dc117744449a47915cb2.png",
        link: "https://www.coinbase.com/price/bitcoin"
      },
      {
        name: "Ethereum",
        symbol: "ETH",
        price: "$3,456.78",
        change: "-1.1%",
        image: "https://dynamic-assets.coinbase.com/dbb4b4983bde81309ddab83eb598358eb44375b930b94687ebe38bc22e52c3b2125258ffb8477a5ef22e33d6bd72e32a506c391caa13af64c00e46613c3e5806/asset_icons/4113b082d21cc5fab17fc8f2d19fb996165bcce635e6900f7fc2d57c4ef33ae9.png",
        link: "https://www.coinbase.com/price/ethereum"
      },
      {
        name: "Tether",
        symbol: "USDT",
        price: "$1.00",
        change: "0.0%",
        image: "https://dynamic-assets.coinbase.com/41f6a93a3a222078c939115fc304a67c384886b7a9e6c15dcbfa6519dc45f6bb4a586e9c48535d099efa596dbf8a9dd72b05815bcd32ac650c50abb5391a5bd0/asset_icons/1f8489bb280fb0a0fd643c1161312ba49655040e9aaaced5f9ad3eeaf868eadc.png",
        link: "https://www.coinbase.com/price/tether"
      },
      {
        name: "BNB",
        symbol: "BNB",
        price: "$629.19",
        change: "-0.88%",
        image: "https://asset-metadata-service-production.s3.amazonaws.com/asset_icons/c347b6d1a7624e24c4e90089a69dfc8fb75523daf8eeb88007372a0c3a30d428.png",
        link: "https://www.coinbase.com/price/bnb"
      },
      {
        name: "XRP",
        symbol: "XRP",
        price: "$1.93",
        change: "-1.87%",
        image: "https://dynamic-assets.coinbase.com/e81509d2307f706f3a6f8999968874b50b628634abf5154fc91a7e5f7685d496a33acb4cde02265ed6f54b0a08fa54912208516e956bc5f0ffd1c9c2634099ae/asset_icons/3af4b33bde3012fd29dd1366b0ad737660f24acc91750ee30a034a0679256d0b.png",
        link: "https://www.coinbase.com/price/xrp"
      },
      {
        name: "USDC",
        symbol: "USDC",
        price: "$1.00",
        change: "0.0%",
        image: "https://dynamic-assets.coinbase.com/3c15df5e2ac7d4abbe9499ed9335041f00c620f28e8de2f93474a9f432058742cdf4674bd43f309e69778a26969372310135be97eb183d91c492154176d455b8/asset_icons/9d67b728b6c8f457717154b3a35f9ddc702eae7e76c4684ee39302c4d7fd0bb8.png",
        link: "https://www.coinbase.com/price/usdc"
      }
    ]
  },
  learnSections: [
    {
      title: "Explore more crypto",
      subtitle: "Browse real-time prices, charts, and daily movers for thousands of cryptocurrencies, all in one place.",
      image: "https://images.ctfassets.net/o10es7wu5gm1/7IRLnEVVAZdnfhzq2Q1V61/5e13a5d282289bfc4ae6bb79632a4884/earn_and_learn.webp",
      cta: "Explore more crypto",
      link: "https://www.coinbase.com/explore"
    },
    {
      title: "Learn the basics",
      subtitle: "Explore beginner guides, practical tutorials, and market updates on Bitcoin, Ethereum and more.",
      image: "https://images.ctfassets.net/o10es7wu5gm1/1i5oeGUlUsp4XBuybcg4ra/f8dd0d698eaa34c982b0323a2b85e754/image.png",
      cta: "Learn the basics",
      link: "https://www.coinbase.com/learn"
    }
  ],
  footer: {
    title: "Take control of your money.",
    subtitle: "Start your portfolio today.",
    cta: "Sign up",
    image: "https://images.ctfassets.net/o10es7wu5gm1/3Ib1lnukt8MvV4bDjH2jm7/00bd55a880ce264f3b77253b837760b2/image.png"
  }
};

// Get homepage data
export function getHomepageData() {
  return COINBASE_HOMEPAGE_DATA;
}

// Get tradable crypto data
export function getTradableCrypto() {
  return COINBASE_HOMEPAGE_DATA.tradable.crypto;
}

// Get features data
export function getFeatures() {
  return COINBASE_HOMEPAGE_DATA.features;
}

// Get memberships data
export function getMemberships() {
  return COINBASE_HOMEPAGE_DATA.memberships;
}

// Get hero data
export function getHeroData() {
  return COINBASE_HOMEPAGE_DATA.hero;
}

// Get learn sections
export function getLearnSections() {
  return COINBASE_HOMEPAGE_DATA.learnSections;
}

// Hook for using homepage data
export function useHomepageData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setData(COINBASE_HOMEPAGE_DATA);
      setLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return { data, loading };
}

// Hook for tradable crypto
export function useTradableCrypto() {
  const [crypto, setCrypto] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setCrypto(COINBASE_HOMEPAGE_DATA.tradable.crypto);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return { crypto, loading };
}
