import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState, createContext, useContext } from 'react';

const Context = createContext<{
  isFavorite?: (id: string | number) => boolean;
  toggleFavorite?: (id: string | number) => void;
}>({})

// class EventBus {
//   listeners: Function[];

//   constructor() {
//     this.listeners = [];
//   }

//   addListener(callback: Function) {
//     this.listeners.push(callback);
//   }

//   removeListener(callback: Function) {
//     this.listeners = this.listeners.filter((listener) => listener !== callback);
//   }

//   notifyAll() {
//     this.listeners.forEach((listener) => listener());
//   }
// }

// const eventBus = new EventBus();

function getFavorites() {
  return AsyncStorage.getItem('favorites').then((data) => {
    if (data) {
      return JSON.parse(data);
    }
    return {};
  });
}

async function _toggleFavorite(id: string) {
  const favorites = await getFavorites();
  const newFavorites = { ...favorites, [id]: !favorites[id] };
  await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
  // eventBus.notifyAll();
  return newFavorites;
}

export function _useFavorites() {
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  useEffect(() => {
    getFavorites().then((data) => {
      setFavorites(data);
    });
  }, []);

  const toggleFavorite = (id: string | number) => {
    _toggleFavorite(String(id)).then((data) => {
      setFavorites(data);
    });
  }

  const isFavorite = (id: string | number) => {
    return Boolean(favorites[String(id)]);
  }

  return { toggleFavorite, isFavorite };
}

export function Provider({ children }: { children: React.ReactNode }) {
  const favorites = _useFavorites();
  return (
    <Context.Provider value={favorites}>
      {children}
    </Context.Provider>
  )
}

export function useFavorites() {
  const ctx = useContext(Context);
  return {
    isFavorite: ctx.isFavorite!,
    toggleFavorite: ctx.toggleFavorite!,
  } 
}
