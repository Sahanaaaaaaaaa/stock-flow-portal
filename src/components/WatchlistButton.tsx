
import { Star } from "lucide-react";

interface WatchlistButtonProps {
  isInWatchlist: boolean;
  onClick: () => void;
}

const WatchlistButton = ({ isInWatchlist, onClick }: WatchlistButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`p-1.5 rounded-full transition-all ${
        isInWatchlist
          ? "bg-amber-100 text-amber-500 hover:bg-amber-200"
          : "bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-500"
      }`}
      title={isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
    >
      <Star
        className={`h-5 w-5 ${isInWatchlist ? "fill-amber-500" : ""}`}
      />
    </button>
  );
};

export default WatchlistButton;
