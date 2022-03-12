import { waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';
import { HeroesProvider, useHeroes } from '../../src/hooks/useHeroes';
import { mockHeroData } from '../../__mocks__/fileMock';

describe('Heroes hook tests', () => {

  test('should items from localStorage', async () => {

    jest.spyOn(Storage.prototype, 'getItem')
      .mockImplementation(key => {
        switch (key) {
          case '@HeroesMarvel':
            return JSON.stringify([mockHeroData]);
          default:
            return null;
        }
      });

    const { result } = renderHook(() => useHeroes(), {
      wrapper: HeroesProvider
    });

    await waitFor(() => {
      expect(result.current.heroes[0].id).toEqual(1017100);
    });
  });

  test('should set localStorage', async () => {
    jest.spyOn(Storage.prototype, 'setItem')
      .mockImplementation(key => {
        switch (key) {
          case "@HeroesMarvel":
            return JSON.stringify([mockHeroData]);
          default:
            return [];
        }
      });

    const { result } = renderHook(() => useHeroes(), {
      wrapper: HeroesProvider
    });

    await waitFor(() => {
      expect(result.current.heroes[0].name).toEqual('A-Bomb (HAS)');
    });
  });

  test('should favorite hero', async () => {
    const { result } = renderHook(() => useHeroes(), {
      wrapper: HeroesProvider
    });

    act(() => {
      result.current.handleFavoriteHero(mockHeroData);
    });

    await waitFor(() => {
      expect(result.current.heroes[0].favorite).toEqual(true);
    });
  });

  test('should more heroes', async () => {
    const { result } = renderHook(() => useHeroes(), {
      wrapper: HeroesProvider
    });

    act(() => {
      result.current.handleMoreHeroes();
    });

    await waitFor(() => {
      expect(result.current.heroes).toEqual([mockHeroData]);
    });
  });

});


