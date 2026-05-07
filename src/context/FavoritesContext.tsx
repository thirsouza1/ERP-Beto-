import React, { createContext, useContext, useState, useEffect } from 'react';

export type ModuleInfo = {
  id: string;
  label: string;
  icon: string; // Lucide icon name
};

interface FavoritesContextType {
  favorites: ModuleInfo[];
  toggleFavorite: (module: ModuleInfo) => void;
  isFavorite: (id: string) => boolean;
  showReplaceModal: boolean;
  moduleToReplace: ModuleInfo | null;
  replaceFavorite: (oldId: string, newModule: ModuleInfo) => void;
  cancelReplace: () => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<ModuleInfo[]>(() => {
    const saved = localStorage.getItem('app_favorites');
    return saved ? JSON.parse(saved) : [
      { id: 'orders', label: 'Pedidos', icon: 'ShoppingCart' },
      { id: 'clients', label: 'Clientes', icon: 'Users' },
    ];
  });

  const [showReplaceModal, setShowReplaceModal] = useState(false);
  const [moduleToReplace, setModuleToReplace] = useState<ModuleInfo | null>(null);

  useEffect(() => {
    localStorage.setItem('app_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (module: ModuleInfo) => {
    const exists = favorites.find(f => f.id === module.id);
    if (exists) {
      setFavorites(favorites.filter(f => f.id !== module.id));
    } else {
      if (favorites.length >= 5) {
        setModuleToReplace(module);
        setShowReplaceModal(true);
      } else {
        setFavorites([...favorites, module]);
      }
    }
  };

  const replaceFavorite = (oldId: string, newModule: ModuleInfo) => {
    setFavorites(favorites.map(f => f.id === oldId ? newModule : f));
    setShowReplaceModal(false);
    setModuleToReplace(null);
  };

  const cancelReplace = () => {
    setShowReplaceModal(false);
    setModuleToReplace(null);
  };

  const isFavorite = (id: string) => favorites.some(f => f.id === id);

  return (
    <FavoritesContext.Provider value={{ 
      favorites, 
      toggleFavorite, 
      isFavorite, 
      showReplaceModal, 
      moduleToReplace, 
      replaceFavorite, 
      cancelReplace 
    }}>
      {children}
      {showReplaceModal && moduleToReplace && (
        <div className="fixed inset-0 bg-navy-dark/80 backdrop-blur-md z-[1000] flex items-center justify-center p-6">
          <div className="bg-white rounded-[40px] p-10 max-w-lg w-full shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-leather-tan to-leather-dark"></div>
            <h2 className="text-2xl font-black text-navy-dark mb-4">Limite de Atalhos Atingido</h2>
            <p className="text-slate-500 mb-8 font-medium">
              Você já possui 5 atalhos favoritos. Escolha qual deseja substituir para adicionar <span className="text-leather-dark font-bold">"{moduleToReplace.label}"</span>.
            </p>
            
            <div className="space-y-3">
              {favorites.map(fav => (
                <button
                  key={fav.id}
                  onClick={() => replaceFavorite(fav.id, moduleToReplace)}
                  className="w-full p-4 bg-slate-50 hover:bg-leather-light rounded-2xl border border-slate-100 transition-all flex items-center justify-between group"
                >
                  <span className="font-bold text-navy-dark">{fav.label}</span>
                  <span className="text-[10px] font-black text-leather-tan uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Substituir</span>
                </button>
              ))}
            </div>

            <button 
              onClick={cancelReplace}
              className="mt-8 w-full py-4 text-slate-400 font-bold hover:text-navy-dark transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error('useFavorites must be used within FavoritesProvider');
  return context;
};
