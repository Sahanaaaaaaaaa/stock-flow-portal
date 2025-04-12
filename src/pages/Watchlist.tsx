
import { useState, useEffect } from "react";
import { getWatchlist, toggleWatchlist, Stock } from "@/utils/mockData";
import StockCard from "@/components/StockCard";
import { Link } from "react-router-dom";
import { Star, Search, ListPlus } from "lucide-react";

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API loading delay
    const timer = setTimeout(() => {
      setWatchlist(getWatchlist());
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleToggleWatchlist = (id: string) => {
    toggleWatchlist(id);
    setWatchlist(getWatchlist());
  };
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <div className="flex items-center">
            <Star className="h-6 w-6 text-amber-500 mr-2 fill-amber-500" />
            <h2 className="text-2xl font-bold text-stock-blue">Your Watchlist</h2>
          </div>
          <p className="text-gray-500 mt-1">Track and monitor your favorite stocks</p>
        </div>
      </div>
      
      {loading ? (
        <div className="flex flex-col items-center justify-center p-12">
          <div className="animate-pulse-subtle">
            <Star className="h-16 w-16 text-amber-300" />
          </div>
          <p className="mt-4 text-gray-500">Loading your watchlist...</p>
        </div>
      ) : watchlist.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <Star className="h-16 w-16 text-gray-300 mx-auto" />
          <h3 className="mt-4 text-xl font-medium text-gray-700">Your watchlist is empty</h3>
          <p className="mt-2 text-gray-500">Start adding stocks to your watchlist</p>
          <Link 
            to="/" 
            className="mt-6 inline-flex items-center bg-stock-blue hover:bg-stock-skyblue text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Search className="h-4 w-4 mr-2" />
            Browse Stocks
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {watchlist.map((stock) => (
              <StockCard 
                key={stock.id} 
                stock={stock} 
                onToggleWatchlist={handleToggleWatchlist} 
              />
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <Link 
              to="/" 
              className="inline-flex items-center text-stock-skyblue hover:text-stock-blue"
            >
              <ListPlus className="h-4 w-4 mr-2" />
              Add more stocks to your watchlist
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Watchlist;
