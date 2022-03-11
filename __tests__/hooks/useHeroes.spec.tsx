import { waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { HeroesProvider, useHeroes } from '../../src/hooks/useHeroes';
import { mockHeroData } from '../../__mocks__/fileMock';

describe('Heroes hook tests', () => {
  test('should items from localStorage', async () => {

    const { result } = renderHook(() => useHeroes(), {
      wrapper: HeroesProvider
    });



    jest.spyOn(Storage.prototype, 'getItem')
      .mockImplementation(key => {
        switch (key) {
          case '@HeroesMarvel':
            return JSON.stringify([mockHeroData]);
          default:
            return null;
        }
      });

    await waitFor(() => {
      expect(result.current.heroes[0])
        .toEqual(1017100);
    });
  });
});


