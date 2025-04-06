import { useCryptoSocket } from '@/hooks/useCryptoSocket';
import CryptoCard from '@/components/CryptoCard';

export default function CryptoSocketUpdater({ coin, onPriceUpdate }) {
  useCryptoSocket(coin.symbol, onPriceUpdate);

  return (
    <CryptoCard
      id={coin.id}
      name={coin.name}
      symbol={coin.symbol}
      price={`$${coin.price.toLocaleString()}`}
      change={coin.change}
      marketCap={coin.marketCap}
    />
  );
}