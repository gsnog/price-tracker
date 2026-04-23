import { useState } from 'react';
import { ExternalLink, TrendingDown, Clock, Tag } from 'lucide-react';
import type { Product } from '../hooks/usePriceData';
import { HistoryChart } from './HistoryChart';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [showHistory, setShowHistory] = useState(false);

  return (
    <div className="glass-card overflow-hidden group hover:-translate-y-1 transition-all duration-300">
      <div className="p-6 relative">
        {product.ultimoPreco != null && (
          <div className="absolute top-4 right-4 bg-success/20 text-success border border-success/30 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 backdrop-blur-md z-10 animate-pulse">
            <TrendingDown size={14} />
            TRACKING
          </div>
        )}
        
        <div className="flex gap-5">
          <div className="w-24 h-24 rounded-xl overflow-hidden bg-white/10 shrink-0 relative">
            <img 
              src={'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400'} 
              alt="Produto" 
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold truncate mb-1 pr-24" title={product.urlProduto}>
              Produto Monitorado
            </h3>
            
            <div className="flex items-end gap-3 mb-3">
              <span className="text-3xl font-bold text-white tracking-tight">
                {product.ultimoPreco ? `$${product.ultimoPreco.toFixed(2)}` : 'Lendo...'}
              </span>
            </div>
            
            <div className="flex flex-wrap gap-2 text-xs">
              <a 
                href={product.urlProduto} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-primary hover:text-primary-hover transition-colors"
              >
                <ExternalLink size={14} />
                View Store
              </a>
              <span className="text-slate-500">•</span>
              <button 
                onClick={() => setShowHistory(!showHistory)}
                className="inline-flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
              >
                <Clock size={14} />
                {showHistory ? 'Hide History' : 'View History'}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Expanded History View */}
      <div className={`px-6 overflow-hidden transition-all duration-500 ease-in-out ${showHistory ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="border-t border-card-border pt-4 mt-2">
          <div className="flex items-center gap-2 mb-2">
            <Tag size={16} className="text-primary" />
            <h4 className="font-medium text-sm text-slate-200">Price History</h4>
          </div>
          {product.history && product.history.length > 0 ? (
            <HistoryChart data={product.history} />
          ) : (
            <p className="text-sm text-slate-400">Aguardando mais dados...</p>
          )}
        </div>
      </div>
    </div>
  );
}
