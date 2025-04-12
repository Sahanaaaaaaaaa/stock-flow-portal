
import { useState } from "react";
import { Industry } from "@/utils/mockData";
import { Check, Filter } from "lucide-react";

interface FilterDropdownProps {
  onFilter: (industry: Industry | "") => void;
  selectedIndustry: Industry | "";
}

const FilterDropdown = ({ onFilter, selectedIndustry }: FilterDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleDropdown = () => setIsOpen(!isOpen);
  
  const handleSelect = (industry: Industry | "") => {
    onFilter(industry);
    setIsOpen(false);
  };
  
  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-1 px-3 py-2 rounded-lg border border-gray-200 text-gray-700 hover:border-stock-teal transition-colors"
      >
        <Filter className="h-4 w-4" />
        <span>{selectedIndustry || "All Industries"}</span>
      </button>
      
      {isOpen && (
        <div className="absolute z-10 mt-1 py-1 w-48 bg-white rounded-md shadow-lg border border-gray-100 stock-card-shadow">
          <ul className="py-1">
            <li 
              className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center justify-between"
              onClick={() => handleSelect("")}
            >
              All Industries
              {selectedIndustry === "" && <Check className="h-4 w-4 text-stock-teal" />}
            </li>
            
            {Object.values(Industry).map((industry) => (
              <li 
                key={industry}
                className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center justify-between"
                onClick={() => handleSelect(industry)}
              >
                {industry}
                {selectedIndustry === industry && <Check className="h-4 w-4 text-stock-teal" />}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
