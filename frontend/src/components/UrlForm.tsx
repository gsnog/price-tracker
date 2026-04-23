import React, { useState } from 'react';
import { Plus, Link2, Loader2 } from 'lucide-react';

interface UrlFormProps {
  onSubmit: (url: string) => Promise<void>;
  isLoading: boolean;
}

export function UrlForm({ onSubmit, isLoading }: UrlFormProps) {
  const [url, setUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    
    await onSubmit(url);
    setUrl('');
  };

  return (
    <div className="glass-card p-6 md:p-8 mb-8 animate-in slide-in-from-bottom-4 duration-500 fade-in">
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Track New Product</h2>
        <p className="text-slate-400 text-sm">Paste the URL of the product you want to track to receive price drop alerts.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 relative">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
            <Link2 size={18} />
          </div>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/product..."
            className="glass-input pl-11"
            required
            disabled={isLoading}
          />
        </div>
        <button 
          type="submit" 
          disabled={isLoading || !url}
          className="btn-primary flex items-center justify-center gap-2 md:w-auto w-full group whitespace-nowrap"
        >
          {isLoading ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <>
              <Plus size={18} className="transition-transform group-hover:rotate-90 duration-300" />
              <span>Add to Tracker</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
