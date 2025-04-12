
import { Search } from "lucide-react";
import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };
  
  return (
    <form 
      onSubmit={handleSearch} 
      className="relative flex items-center w-full max-w-md"
    >
      <input
        type="text"
        placeholder="Search stocks..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-stock-teal focus:ring-1 focus:ring-stock-teal transition-colors"
      />
      <button 
        type="submit"
        className="absolute left-3 text-gray-400 hover:text-stock-blue"
      >
        <Search className="h-5 w-5" />
      </button>
    </form>
  );
};

export default SearchBar;
