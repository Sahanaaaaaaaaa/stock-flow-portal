
export interface Stock {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  industry: Industry;
  volume: number;
  marketCap: number;
  isInWatchlist?: boolean;
}

export interface StockHistorical {
  date: string;
  price: number;
}

export enum Industry {
  TECHNOLOGY = "Technology",
  FINANCE = "Finance",
  HEALTHCARE = "Healthcare",
  ENERGY = "Energy",
  CONSUMER = "Consumer",
  INDUSTRIAL = "Industrial",
  TELECOMMUNICATIONS = "Telecommunications",
}

export const mockStocks: Stock[] = [
  {
    id: "1",
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 172.40,
    change: 2.35,
    changePercent: 1.38,
    industry: Industry.TECHNOLOGY,
    volume: 67532400,
    marketCap: 2730000000000,
    isInWatchlist: true,
  },
  {
    id: "2",
    symbol: "MSFT",
    name: "Microsoft Corporation",
    price: 338.72,
    change: 3.15,
    changePercent: 0.94,
    industry: Industry.TECHNOLOGY,
    volume: 23183900,
    marketCap: 2520000000000,
    isInWatchlist: false,
  },
  {
    id: "3",
    symbol: "AMZN",
    name: "Amazon.com Inc.",
    price: 129.97,
    change: -0.53,
    changePercent: -0.41,
    industry: Industry.CONSUMER,
    volume: 41555000,
    marketCap: 1340000000000,
    isInWatchlist: false,
  },
  {
    id: "4",
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    price: 124.67,
    change: 1.28,
    changePercent: 1.04,
    industry: Industry.TECHNOLOGY,
    volume: 28352600,
    marketCap: 1580000000000,
    isInWatchlist: true,
  },
  {
    id: "5",
    symbol: "JPM",
    name: "JPMorgan Chase & Co.",
    price: 187.50,
    change: 2.15,
    changePercent: 1.16,
    industry: Industry.FINANCE,
    volume: 10255700,
    marketCap: 542000000000,
    isInWatchlist: false,
  },
  {
    id: "6",
    symbol: "JNJ",
    name: "Johnson & Johnson",
    price: 148.18,
    change: -0.92,
    changePercent: -0.62,
    industry: Industry.HEALTHCARE,
    volume: 6522300,
    marketCap: 385000000000,
    isInWatchlist: false,
  },
  {
    id: "7",
    symbol: "XOM",
    name: "Exxon Mobil Corporation",
    price: 115.96,
    change: 1.78,
    changePercent: 1.56,
    industry: Industry.ENERGY,
    volume: 17840500,
    marketCap: 468000000000,
    isInWatchlist: false,
  },
  {
    id: "8",
    symbol: "PFE",
    name: "Pfizer Inc.",
    price: 27.31,
    change: -0.46,
    changePercent: -1.66,
    industry: Industry.HEALTHCARE,
    volume: 41628600,
    marketCap: 154000000000,
    isInWatchlist: false,
  },
  {
    id: "9",
    symbol: "V",
    name: "Visa Inc.",
    price: 276.33,
    change: 1.71,
    changePercent: 0.62,
    industry: Industry.FINANCE,
    volume: 7240000,
    marketCap: 569000000000,
  },
  {
    id: "10",
    symbol: "T",
    name: "AT&T Inc.",
    price: 17.15,
    change: 0.05,
    changePercent: 0.29,
    industry: Industry.TELECOMMUNICATIONS,
    volume: 38912500,
    marketCap: 122900000000,
  },
  {
    id: "11",
    symbol: "VZ",
    name: "Verizon Communications",
    price: 40.52,
    change: -0.18,
    changePercent: -0.44,
    industry: Industry.TELECOMMUNICATIONS,
    volume: 15764200,
    marketCap: 170500000000,
  },
  {
    id: "12",
    symbol: "NKE",
    name: "Nike Inc.",
    price: 79.37,
    change: 0.84,
    changePercent: 1.07,
    industry: Industry.CONSUMER,
    volume: 9532100,
    marketCap: 120800000000,
  },
];

export const getHistoricalData = (stockId: string): StockHistorical[] => {
  // Generate random historical data for the last 30 days
  const data: StockHistorical[] = [];
  const stock = mockStocks.find(s => s.id === stockId);
  
  if (!stock) return [];
  
  const today = new Date();
  let basePrice = stock.price * 0.7; // Start at 70% of current price
  
  for (let i = 30; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Add some randomness to the price
    const randomChange = (Math.random() * 6) - 3; // Between -3% and +3%
    basePrice = basePrice * (1 + (randomChange / 100));
    
    // If we're getting close to the current price, adjust the trend
    const remainingDays = i;
    if (remainingDays < 5) {
      basePrice = basePrice + ((stock.price - basePrice) / remainingDays);
    }
    
    data.push({
      date: date.toISOString().split('T')[0],
      price: parseFloat(basePrice.toFixed(2)),
    });
  }
  
  return data;
};

export const getIndustryDistribution = (): Record<Industry, number> => {
  const distribution: Record<Industry, number> = {
    [Industry.TECHNOLOGY]: 0,
    [Industry.FINANCE]: 0,
    [Industry.HEALTHCARE]: 0,
    [Industry.ENERGY]: 0,
    [Industry.CONSUMER]: 0,
    [Industry.INDUSTRIAL]: 0,
    [Industry.TELECOMMUNICATIONS]: 0,
  };
  
  mockStocks.forEach(stock => {
    distribution[stock.industry]++;
  });
  
  return distribution;
};

// Simulates getting watchlist from API or local storage
export const getWatchlist = (): Stock[] => {
  return mockStocks.filter(stock => stock.isInWatchlist);
};

// Search and filter functionality
export const searchStocks = (query: string = "", industry: Industry | "" = ""): Stock[] => {
  return mockStocks.filter(stock => {
    const matchesQuery = query.length === 0 || 
      stock.symbol.toLowerCase().includes(query.toLowerCase()) || 
      stock.name.toLowerCase().includes(query.toLowerCase());
    
    const matchesIndustry = industry === "" || stock.industry === industry;
    
    return matchesQuery && matchesIndustry;
  });
};

// Get a specific stock by ID
export const getStockById = (id: string): Stock | undefined => {
  return mockStocks.find(stock => stock.id === id);
};

// Toggle watchlist status
export const toggleWatchlist = (id: string): Stock[] => {
  const updatedStocks = [...mockStocks];
  const stockIndex = updatedStocks.findIndex(stock => stock.id === id);
  
  if (stockIndex !== -1) {
    updatedStocks[stockIndex] = {
      ...updatedStocks[stockIndex],
      isInWatchlist: !updatedStocks[stockIndex].isInWatchlist
    };
  }
  
  return updatedStocks;
};

// Format large numbers (e.g., market cap)
export const formatLargeNumber = (num: number): string => {
  if (num >= 1000000000000) {
    return `$${(num / 1000000000000).toFixed(2)}T`;
  } else if (num >= 1000000000) {
    return `$${(num / 1000000000).toFixed(2)}B`;
  } else if (num >= 1000000) {
    return `$${(num / 1000000).toFixed(2)}M`;
  } else if (num >= 1000) {
    return `$${(num / 1000).toFixed(2)}K`;
  } else {
    return `$${num.toFixed(2)}`;
  }
};
