import React, { useState } from 'react';
import { Activity, BellRing, LogIn, LogOut, Send } from 'lucide-react';
import { UrlForm } from './components/UrlForm';
import { ProductCard } from './components/ProductCard';
import { usePriceData } from './hooks/usePriceData';

function App() {
  const { user, products, isLoading, error, addUrl, updateTelegram, loginWithGoogle } = usePriceData();
  const [telegramId, setTelegramId] = useState('');
  const [showTelegramPanel, setShowTelegramPanel] = useState(false);

  const handleUpdateTelegram = async (e: React.FormEvent) => {
    e.preventDefault();
    if (telegramId) {
      await updateTelegram(telegramId);
      setShowTelegramPanel(false);
    }
  };

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
          {user ? (
            <>
              <div className="text-right hidden md:block mr-2">
                <p className="text-sm font-semibold text-white">{user.nome}</p>
                <p className="text-xs text-slate-400">{user.email}</p>
              </div>
              <button 
                onClick={() => setShowTelegramPanel(!showTelegramPanel)}
                className={`relative p-2 transition-colors ${user.telegramChatId ? 'text-primary' : 'text-slate-400 hover:text-white'}`}
                title="Configurar Notificações"
              >
                <BellRing size={20} />
                {!user.telegramChatId && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full animate-pulse"></span>
                )}
              </button>
              <div className="w-10 h-10 rounded-full border-2 border-primary/30 bg-primary/10 flex items-center justify-center text-primary font-bold overflow-hidden">
                {user.nome.charAt(0).toUpperCase()}
              </div>
            </>
          ) : (
            <button 
              onClick={loginWithGoogle}
              className="btn-primary text-sm px-4 py-2 flex items-center gap-2"
            >
              <LogIn size={16} /> Login com Google
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main>
        {error && (
          <div className="bg-danger/10 border border-danger/20 text-danger px-4 py-3 rounded-xl mb-8 flex items-center gap-2">
            <span className="font-semibold">Error:</span> {error}
          </div>
        )}

        {showTelegramPanel && user && (
          <div className="glass-card p-6 mb-8 animate-in fade-in slide-in-from-top-2 border-primary/30">
            <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
              <Send size={18} className="text-primary"/> Notificações via Telegram
            </h3>
            <p className="text-sm text-slate-400 mb-4">
              Para receber alertas quando os preços caírem, precisamos do seu Chat ID do Telegram. 
              Você pode descobrir o seu ID mandando mensagem para bots como o <code>@userinfobot</code>.
            </p>
            <form onSubmit={handleUpdateTelegram} className="flex gap-3">
              <input 
                type="text" 
                placeholder={user.telegramChatId || "Seu Chat ID (ex: 123456789)"}
                value={telegramId}
                onChange={(e) => setTelegramId(e.target.value)}
                className="glass-input max-w-xs"
                required
              />
              <button type="submit" className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-xl transition-colors">
                Salvar
              </button>
            </form>
          </div>
        )}

        {user ? (
          <>
            <UrlForm onSubmit={addUrl} isLoading={isLoading} />

            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                Seus Produtos
                <span className="bg-primary/20 text-primary text-xs px-2 py-0.5 rounded-full font-bold">
                  {products.length}
                </span>
              </h2>
            </div>

            {isLoading && products.length === 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2].map(i => (
                  <div key={i} className="glass-card h-40 animate-pulse bg-slate-800/50"></div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="glass-card p-12 text-center text-slate-400 flex flex-col items-center justify-center">
                <Activity size={48} className="mb-4 text-slate-600" />
                <h3 className="text-lg font-medium text-slate-300 mb-1">Nenhum produto rastreado</h3>
                <p>Cole o link de um produto acima para começar.</p>
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
          </>
        ) : (
          <div className="glass-card p-12 text-center flex flex-col items-center justify-center min-h-[40vh]">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <LogOut size={32} className="text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Faça login para continuar</h2>
            <p className="text-slate-400 max-w-md mb-8">
              Autentique-se com o Google para cadastrar produtos e ser notificado no seu Telegram pessoal quando os preços caírem.
            </p>
            <button 
              onClick={loginWithGoogle}
              className="btn-primary flex items-center gap-2 text-lg px-8 py-4"
            >
              <LogIn size={20} /> Entrar com Google
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
