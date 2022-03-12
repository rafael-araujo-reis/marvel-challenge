import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import api from "../services/api";

interface HeroesProviderProps {
  children: ReactNode;
}

interface Heroes {
  id: number;
  name: string;
  modified: string,
  favorite?: boolean,
  thumbnail: {
    path: string,
    extension: string;
  };
}

interface HeroesContextData {
  heroes: Heroes[];
  handleMoreHeroes: () => void;
  updateDataHeroes: () => void;
  handleSearchHeroes: (props: any) => void;
  handleFavoriteHero: (props: any) => void;
}

const HeroesContext = createContext<HeroesContextData>({} as HeroesContextData);

export function HeroesProvider({ children }: HeroesProviderProps): JSX.Element {

  const [heroes, setHeroes] = useState<Heroes[]>([]);

  useEffect(() => {
    const storageHeroes = localStorage.getItem('@HeroesMarvel');

    if (storageHeroes && storageHeroes.length !== 2) {
      setHeroes(JSON.parse(storageHeroes));
      return JSON.parse(storageHeroes);
    }

    api.get('/characters')
      .then((res) => {
        const resultHeroes = res.data.data.results;
        setHeroes(resultHeroes);
        updateLocalStorage(resultHeroes);
      })
      .catch(err =>
        console.log(`error: ${err.message}`)
      );
  }, []);

  const handleMoreHeroes = useCallback(async () => {
    try {
      const offset = heroes.length;

      const response = await api.get('/characters', {
        params: {
          offset
        }
      });

      const resultHeroes = response.data.data.results;

      setHeroes([...heroes, ...resultHeroes]);
      updateLocalStorage([...heroes, ...resultHeroes]);

    } catch (error) {
      console.log(`error: ${error.message}`);
    }
  }, [heroes]);

  const handleSearchHeroes = async (valueSearch: string) => {
    try {
      const nameStartsWith = valueSearch;
      if (nameStartsWith) {

        const response = await api.get('/characters', {
          params: {
            nameStartsWith
          }
        });

        const resultHeroes = response.data.data.results;

        setHeroes(resultHeroes);
      }
    } catch (error) {
      console.log(`error: ${error.message}`);
    }
  };

  const handleFavoriteHero = useCallback(async (hero: Heroes) => {
    try {

      const heroesUpdate = heroes.map(heroUpdate =>
        heroUpdate.id === hero.id ? {
          ...heroUpdate, favorite: !heroUpdate.favorite
        } : heroUpdate
      );

      setHeroes(heroesUpdate);

      const localHeroes = getLocalStorage();

      if (heroesUpdate.length === localHeroes.length) {
        updateLocalStorage(heroesUpdate);
      } else {
        const localHeroesUpdate = localHeroes.map(heroUpdate =>
          heroUpdate.id === hero.id ? {
            ...heroUpdate, favorite: !heroUpdate.favorite
          } : heroUpdate
        );

        updateLocalStorage(localHeroesUpdate);
      }

    } catch (error) {
      console.log(`error: ${error.message}`);
    }
  }, [heroes]);

  function updateLocalStorage(heroes) {
    localStorage.setItem('@HeroesMarvel', JSON.stringify(heroes));
  }

  function getLocalStorage(): Heroes[] {
    const storageHeroes = localStorage.getItem('@HeroesMarvel');
    return JSON.parse(storageHeroes);
  }

  const updateDataHeroes = useCallback(async () => {
    setHeroes(heroes);
    updateLocalStorage(heroes);
  }, [heroes]);

  return <HeroesContext.Provider
    value={{ heroes, handleMoreHeroes, updateDataHeroes, handleSearchHeroes, handleFavoriteHero }}
  >
    {children}
  </HeroesContext.Provider>;
}

export const useHeroes = () => {
  return useContext(HeroesContext);
};