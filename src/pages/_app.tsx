import { AppProps } from 'next/app';
import { HeroesProvider } from '../hooks/useHeroes';
import '../styles/global.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <HeroesProvider>
      <Component {...pageProps} />
    </HeroesProvider>
  );
}

export default MyApp;
