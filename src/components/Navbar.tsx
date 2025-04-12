
import { Link, useLocation } from "react-router-dom";
import { BarChart2, Home, Star } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <nav className="w-full bg-gradient-primary text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BarChart2 className="h-6 w-6 text-stock-teal" />
            <h1 className="text-xl font-bold">Stock Flow Portal</h1>
          </div>
          
          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors ${
                isActive("/") 
                ? "bg-white/10 text-white" 
                : "text-white/80 hover:text-white hover:bg-white/5"
              }`}
            >
              <Home className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
            
            <Link
              to="/watchlist"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors ${
                isActive("/watchlist") 
                ? "bg-white/10 text-white" 
                : "text-white/80 hover:text-white hover:bg-white/5"
              }`}
            >
              <Star className="h-5 w-5" />
              <span>Watchlist</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
