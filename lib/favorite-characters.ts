import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

class EventBus {
  listeners: Function[];

  constructor() {
    this.listeners = [];
  }

  addListener(callback: Function) {
    this.listeners.push(callback);
  }

  removeListener(callback: Function) {
    this.listeners = this.listeners.filter((listener) => listener !== callback);
  }

  notifyAll() {
    this.listeners.forEach((listener) => listener());
  }
}

const eventBus = new EventBus();

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
  eventBus.notifyAll();
  return newFavorites;
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  useEffect(() => {
    getFavorites().then((data) => {
      setFavorites(data);
    });
  }, []);


  // Hook into global event bus to listen for
  // favorite events form other pages. Without
  // this the favorites would not updated on the home
  // page when a character is favorited on the detail page.
  useEffect(() => {
    const listener = () => {
      getFavorites().then((data) => {
        setFavorites(data);
      });
    }

    eventBus.addListener(listener);

    return () => {
      eventBus.removeListener(listener);
    }
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

