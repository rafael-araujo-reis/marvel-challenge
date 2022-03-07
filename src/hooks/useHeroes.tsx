import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import api from "../services/api";

interface HeroesProviderProps {
  children: ReactNode;
}

interface Hero {
  id: number;
  name: string;
  modified: string,
  thumbnail: {
    path: string,
    extension: string;
  };
}

interface Heroes {
  hero: Hero;
}

interface HeroesContextData {
  heroes: Heroes[];
  handleMoreHeroes: () => void;
}

const HeroesContext = createContext<HeroesContextData>({} as HeroesContextData);

export function HeroesProvider({ children }: HeroesProviderProps): JSX.Element {

  const [heroes, setHeroes] = useState<Heroes[]>([]);

  useEffect(() => {
    const storageHeroes = localStorage.getItem('@HeroesMarvel');

    if (storageHeroes) {
      console.log('to caindo aqui');
      return JSON.parse(storageHeroes);
    }

    api.get('/characters')
      .then((res) => {
        const resultHeroes = res.data.data.results;
        setHeroes(resultHeroes);
        localStorage.setItem('@HeroesMarvel', JSON.stringify(resultHeroes));
      })
      .catch(err => console.log(err.message));
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
      localStorage.setItem('@HeroesMarvel', JSON.stringify([...heroes, ...resultHeroes]));
    } catch (error) {
      console.log(`error: ${error.message}`);
    }
  }, [heroes]);

  return <HeroesContext.Provider
    value={{ heroes, handleMoreHeroes }}
  >
    {children}
  </HeroesContext.Provider>;
}

export const useHeroes = () => {
  return useContext(HeroesContext);
};