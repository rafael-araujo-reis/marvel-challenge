import { waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { HeroesProvider, useHeroes } from '../../src/hooks/useHeroes';

describe('Heroes hook tests', () => {
  test('should items from localStorage', async () => {

    const { result } = renderHook(() => useHeroes(), {
      wrapper: HeroesProvider
    });

    const cardItemHero = {
      id: 1017100,
      name: "A-Bomb (HAS)",
      description: "Rick Jones has been Hulk's best bud since day one, but now he's more than a friend...he's a teammate! Transformed by a Gamma energy explosion, A-Bomb's thick, armored skin is just as strong and powerful as it is blue. And when he curls into action, he uses it like a giant bowling ball of destruction! ",
      modified: "2013-09-18T15:54:04-0400",
      thumbnail: {
        path: "http://i.annihil.us/u/prod/marvel/i/mg/3/20/5232158de5b16",
        extension: "jpg"
      },
      resourceURI: "http://gateway.marvel.com/v1/public/characters/1017100"
    };

    jest.spyOn(Storage.prototype, 'getItem')
      .mockImplementation(key => {
        switch (key) {
          case '@HeroesMarvel':
            return JSON.stringify([cardItemHero]);
          default:
            return null;
        }
      });

    await waitFor(() => {
      expect(result.current.heroes[0].id)
        .toEqual(1017100);
    });
  });
});


