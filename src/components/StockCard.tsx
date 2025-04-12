
import { formatLargeNumber, Stock } from "@/utils/mockData";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";
import WatchlistButton from "./WatchlistButton";

interface StockCardProps {
  stock: Stock;
  onToggleWatchlist: (id: string) => void;
}

const StockCard = ({ stock, onToggleWatchlist }: StockCardProps) => {
  const {
    id,
    symbol,
    name,
    price,
    change,
    changePercent,
    industry,
    marketCap,
    isInWatchlist
  } = stock;
  
  const isPositive = change >= 0;
  
  return (
    <div className="bg-white rounded-lg p-4 stock-card-shadow animate-fade-in">
      <div className="flex justify-between items-start mb-3">
        <Link to={`/stock/${id}`} className="flex-1">
          <h3 className="text-lg font-bold text-stock-blue hover:text-stock-skyblue transition-colors">{symbol}</h3>
          <p className="text-sm text-gray-500 truncate" title={name}>{name}</p>
        </Link>
        <WatchlistButton 
          isInWatchlist={!!isInWatchlist} 
          onClick={() => onToggleWatchlist(id)} 
        />
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <p className="text-2xl font-bold">${price.toFixed(2)}</p>
          <div className={`flex items-center mt-1 ${
            isPositive ? 'text-stock-positive' : 'text-stock-negative'
          }`}>
            {isPositive ? (
              <ArrowUp className="h-4 w-4 mr-1" />
            ) : (
              <ArrowDown className="h-4 w-4 mr-1" />
            )}
            <span className="text-sm font-medium">
              {isPositive ? '+' : ''}{change.toFixed(2)} ({isPositive ? '+' : ''}{changePercent.toFixed(2)}%)
            </span>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-xs text-gray-500 mb-1">Market Cap</div>
          <div className="text-sm font-medium">{formatLargeNumber(marketCap)}</div>
        </div>
      </div>
      
      <div className="mt-3 flex justify-between items-center">
        <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">{industry}</span>
        <Link to={`/stock/${id}`} className="text-sm text-stock-skyblue hover:text-stock-blue transition-colors">
          View Details →
        </Link>
      </div>
    </div>
  );
};

export default StockCard;
