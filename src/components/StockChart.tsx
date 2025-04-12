
import { StockHistorical } from "@/utils/mockData";
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface StockChartProps {
  data: StockHistorical[];
  stockSymbol: string;
}

type TimeRange = "7D" | "1M" | "3M" | "ALL";

const StockChart = ({ data, stockSymbol }: StockChartProps) => {
  const [timeRange, setTimeRange] = useState<TimeRange>("ALL");
  
  const filterDataByTimeRange = (data: StockHistorical[], range: TimeRange): StockHistorical[] => {
    if (range === "ALL") return data;
    
    const now = new Date();
    let pastDate = new Date();
    
    switch (range) {
      case "7D":
        pastDate.setDate(now.getDate() - 7);
        break;
      case "1M":
        pastDate.setMonth(now.getMonth() - 1);
        break;
      case "3M":
        pastDate.setMonth(now.getMonth() - 3);
        break;
    }
    
    return data.filter(item => {
      const itemDate = new Date(item.date);
      return itemDate >= pastDate;
    });
  };
  
  const filteredData = filterDataByTimeRange(data, timeRange);
  
  // Find min and max for custom domain
  const minPrice = Math.min(...filteredData.map(d => d.price)) * 0.995;
  const maxPrice = Math.max(...filteredData.map(d => d.price)) * 1.005;
  
  // Determine if overall trend is positive or negative
  const isPositive = filteredData.length > 1 && 
    filteredData[filteredData.length - 1].price >= filteredData[0].price;
  
  const chartColor = isPositive ? "#16C784" : "#EA3943";
  
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-md shadow-lg">
          <p className="font-medium">{label}</p>
          <p className="text-sm">
            Price: <span className="font-semibold">${payload[0].value.toFixed(2)}</span>
          </p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-700">Price Chart ({stockSymbol})</h3>
        <div className="flex space-x-2">
          {(["7D", "1M", "3M", "ALL"] as TimeRange[]).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 text-sm rounded ${
                timeRange === range
                  ? "bg-stock-blue text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>
      
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={filteredData}
            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12 }} 
              tickMargin={10}
              tickFormatter={(value) => {
                const date = new Date(value);
                return `${date.getMonth() + 1}/${date.getDate()}`;
              }}
            />
            <YAxis 
              domain={[minPrice, maxPrice]} 
              tick={{ fontSize: 12 }}
              tickMargin={10}
              tickFormatter={(value) => `$${value.toFixed(0)}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="price"
              stroke={chartColor}
              activeDot={{ r: 6 }}
              strokeWidth={2}
              dot={false}
              name="Price"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StockChart;
