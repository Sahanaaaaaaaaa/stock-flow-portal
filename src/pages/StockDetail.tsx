
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  ArrowLeft, 
  ArrowDown, 
  ArrowUp, 
  Building, 
  BarChart2, 
  DollarSign,
  TrendingUp,
  Activity
} from "lucide-react";
import { 
  Stock, 
  StockHistorical, 
  getHistoricalData, 
  getStockById, 
  formatLargeNumber,
  toggleWatchlist
} from "@/utils/mockData";
import StockChart from "@/components/StockChart";
import WatchlistButton from "@/components/WatchlistButton";

const StockDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [stock, setStock] = useState<Stock | null>(null);
  const [historicalData, setHistoricalData] = useState<StockHistorical[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (!id) return;
    
    // Simulate API loading delay
    const timer = setTimeout(() => {
      const stockData = getStockById(id);
      if (stockData) {
        setStock(stockData);
        setHistoricalData(getHistoricalData(id));
      }
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [id]);
  
  const handleToggleWatchlist = () => {
    if (!stock) return;
    
    toggleWatchlist(stock.id);
    setStock({
      ...stock,
      isInWatchlist: !stock.isInWatchlist
    });
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-center">
          <div className="animate-pulse-subtle">
            <BarChart2 className="h-16 w-16 text-stock-skyblue opacity-50" />
          </div>
          <p className="mt-4 text-gray-500">Loading stock details...</p>
        </div>
      </div>
    );
  }
  
  if (!stock) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <BarChart2 className="h-16 w-16 text-gray-300 mx-auto" />
          <h3 className="mt-4 text-xl font-medium text-gray-700">Stock not found</h3>
          <p className="mt-2 text-gray-500">The stock you're looking for doesn't exist</p>
          <Link 
            to="/" 
            className="mt-6 inline-flex items-center text-stock-skyblue hover:text-stock-blue"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }
  
  const isPositive = stock.change >= 0;
  
  return (
    <div className="container mx-auto px-4 py-6">
      <Link 
        to="/" 
        className="inline-flex items-center text-gray-600 hover:text-stock-blue mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Dashboard
      </Link>
      
      <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-stock-blue">{stock.symbol}</h1>
              <WatchlistButton 
                isInWatchlist={!!stock.isInWatchlist} 
                onClick={handleToggleWatchlist} 
              />
            </div>
            <p className="text-lg text-gray-600 mt-1">{stock.name}</p>
            <div className="flex items-center mt-3">
              <span className="px-3 py-1 bg-gray-100 rounded-full text-gray-600 text-sm flex items-center">
                <Building className="h-4 w-4 mr-1" />
                {stock.industry}
              </span>
            </div>
          </div>
          
          <div className="bg-gradient-subtle p-4 rounded-lg">
            <div className="text-3xl font-bold">${stock.price.toFixed(2)}</div>
            <div className={`flex items-center mt-1 ${
              isPositive ? 'text-stock-positive' : 'text-stock-negative'
            }`}>
              {isPositive ? (
                <ArrowUp className="h-5 w-5 mr-1" />
              ) : (
                <ArrowDown className="h-5 w-5 mr-1" />
              )}
              <span className="text-lg font-medium">
                {isPositive ? '+' : ''}{stock.change.toFixed(2)} ({isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%)
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <StockChart data={historicalData} stockSymbol={stock.symbol} />
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold text-gray-700 mb-4">Stock Information</h3>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-gray-100 p-2 rounded-lg mr-3">
                  <DollarSign className="h-5 w-5 text-stock-blue" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Market Cap</p>
                  <p className="font-medium">{formatLargeNumber(stock.marketCap)}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-gray-100 p-2 rounded-lg mr-3">
                  <TrendingUp className="h-5 w-5 text-stock-blue" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Volume</p>
                  <p className="font-medium">{stock.volume.toLocaleString()}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-gray-100 p-2 rounded-lg mr-3">
                  <Activity className="h-5 w-5 text-stock-blue" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Performance</p>
                  <p className={`font-medium ${
                    isPositive ? 'text-stock-positive' : 'text-stock-negative'
                  }`}>
                    {isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}% today
                  </p>
                </div>
              </div>
            </div>
            
            {/* Simple insights box */}
            <div className="mt-6 p-4 bg-gradient-primary rounded-lg text-white">
              <h4 className="font-medium mb-2">Insights</h4>
              <p className="text-sm opacity-90">
                {isPositive 
                  ? `${stock.symbol} has been showing a positive trend. Consider watching for continued momentum.`
                  : `${stock.symbol} has been showing a negative trend. Monitor for potential reversal points.`
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockDetail;
