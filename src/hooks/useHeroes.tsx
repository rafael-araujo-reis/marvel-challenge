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
      .catch(err => console.log(`error: ${err.message}`));
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

      heroes.find(element => {
        if (element.id === hero.id) {
          'favorite' in hero ? hero.favorite = !hero.favorite : hero.favorite = true;
        }
      });

      setHeroes(heroes);
      updateLocalStorage(heroes);
    } catch (error) {
      console.log(`error: ${error.message}`);
    }
  }, [heroes]);

  function updateLocalStorage(heroes) {
    localStorage.setItem('@HeroesMarvel', JSON.stringify(heroes));
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