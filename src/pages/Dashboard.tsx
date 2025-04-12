
import { useState, useEffect } from "react";
import SearchBar from "@/components/SearchBar";
import FilterDropdown from "@/components/FilterDropdown";
import StockCard from "@/components/StockCard";
import { Stock, Industry, searchStocks, toggleWatchlist } from "@/utils/mockData";
import { LineChart, PieChart } from "lucide-react";

const Dashboard = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [filteredStocks, setFilteredStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState<Industry | "">("");
  
  useEffect(() => {
    // Simulate API loading delay
    const timer = setTimeout(() => {
      const data = searchStocks();
      setStocks(data);
      setFilteredStocks(data);
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setFilteredStocks(searchStocks(query, selectedIndustry));
  };
  
  const handleFilter = (industry: Industry | "") => {
    setSelectedIndustry(industry);
    setFilteredStocks(searchStocks(searchQuery, industry));
  };
  
  const handleToggleWatchlist = (id: string) => {
    const updatedStocks = toggleWatchlist(id);
    setStocks(updatedStocks);
    setFilteredStocks(searchStocks(searchQuery, selectedIndustry));
  };
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-stock-blue">Stock Dashboard</h2>
          <p className="text-gray-500 mt-1">Browse, search and track your favorite stocks</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <SearchBar onSearch={handleSearch} />
          <FilterDropdown onFilter={handleFilter} selectedIndustry={selectedIndustry} />
        </div>
      </div>
      
      {loading ? (
        <div className="flex flex-col items-center justify-center p-12">
          <div className="animate-pulse-subtle">
            <LineChart className="h-16 w-16 text-stock-skyblue opacity-50" />
          </div>
          <p className="mt-4 text-gray-500">Loading stocks...</p>
        </div>
      ) : filteredStocks.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <PieChart className="h-16 w-16 text-gray-300 mx-auto" />
          <h3 className="mt-4 text-xl font-medium text-gray-700">No stocks found</h3>
          <p className="mt-2 text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredStocks.map((stock) => (
            <StockCard 
              key={stock.id} 
              stock={stock} 
              onToggleWatchlist={handleToggleWatchlist} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
