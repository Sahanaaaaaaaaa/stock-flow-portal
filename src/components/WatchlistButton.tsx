
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
          ? "bg-amber-900/30 text-amber-500 hover:bg-amber-900/50"
          : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-muted-foreground/80"
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
