
import { Activity, BellRing, Search } from 'lucide-react';
import { UrlForm } from './components/UrlForm';
import { ProductCard } from './components/ProductCard';
import { usePriceData } from './hooks/usePriceData';

function App() {
  const { products, isLoading, error, addUrl } = usePriceData();

  return (
    <div className="min-h-screen p-4 md:p-8 lg:p-12 max-w-6xl mx-auto">
      {/* Header */}
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6 animate-in slide-in-from-top-4 duration-700 fade-in">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-emerald-500 flex items-center justify-center shadow-lg shadow-primary/20">
            <Activity className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              PriceTracker Pro
            </h1>
            <p className="text-sm text-slate-400">Never miss a price drop again.</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-grow md:flex-grow-0 hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="bg-slate-900/50 border border-slate-700 rounded-full pl-10 pr-4 py-2 text-sm outline-none focus:border-primary w-full md:w-64 transition-all"
            />
          </div>
          <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
            <BellRing size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full animate-pulse"></span>
          </button>
          <div className="w-10 h-10 rounded-full border-2 border-primary/30 overflow-hidden">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {error && (
          <div className="bg-danger/10 border border-danger/20 text-danger px-4 py-3 rounded-xl mb-8 flex items-center gap-2">
            <span className="font-semibold">Error:</span> {error}
          </div>
        )}

        {/* Form Section */}
        <UrlForm onSubmit={addUrl} isLoading={isLoading} />

        {/* Dashboard Grid */}
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            Your Tracked Items
            <span className="bg-primary/20 text-primary text-xs px-2 py-0.5 rounded-full font-bold">
              {products.length}
            </span>
          </h2>
          
          <select className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-primary text-slate-300">
            <option>Sort by: Latest</option>
            <option>Sort by: Price Drop</option>
            <option>Sort by: Price (Low to High)</option>
          </select>
        </div>

        {isLoading && products.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="glass-card h-40 animate-pulse bg-slate-800/50"></div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="glass-card p-12 text-center text-slate-400 flex flex-col items-center justify-center">
            <Activity size={48} className="mb-4 text-slate-600" />
            <h3 className="text-lg font-medium text-slate-300 mb-1">No products tracked yet</h3>
            <p>Add a URL above to start monitoring prices.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 stagger-1">
            {products.map((product, idx) => (
              <div key={product.id} className="animate-in slide-in-from-bottom-4 fade-in" style={{ animationDelay: `${idx * 150}ms`, animationFillMode: 'both' }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
