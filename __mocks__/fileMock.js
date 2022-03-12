export const cardMockValues = {
  title: 'Card test',
  image: 'https://cdn.pixabay.com/photo/2020/03/09/17/51/narcis-4916584_960_720.jpg'
};

export const buttonMockValues = {
  textButton: 'Button test',
  colorText: '#FFFFFF',
  bgColor: '#07A44A',
  type: 'button',
  onClick: testComponent
};

function testComponent() {
  console.log('test function component');
}

export const mockHeroData = {
  id: 1017100,
  name: "A-Bomb (HAS)",
  description: "Rick Jones has been Hulk's best bud since day one, but now he's more than a friend...he's a teammate! Transformed by a Gamma energy explosion, A-Bomb's thick, armored skin is just as strong and powerful as it is blue. And when he curls into action, he uses it like a giant bowling ball of destruction! ",
  modified: "2013-09-18T15:54:04-0400",
  favorite: true,
  thumbnail: {
    path: "http://i.annihil.us/u/prod/marvel/i/mg/3/20/5232158de5b16",
    extension: "jpg"
  },
  resourceURI: "http://gateway.marvel.com/v1/public/characters/1017100"
};

export const mockHeroDetailData = {
  id: 1017100,
  name: "A-Bomb (HAS)",
  description: "Rick Jones has been Hulk's best bud since day one, but now he's more than a friend...he's a teammate! Transformed by a Gamma energy explosion, A-Bomb's thick, armored skin is just as strong and powerful as it is blue. And when he curls into action, he uses it like a giant bowling ball of destruction! ",
  modified: "2013-09-18T15:54:04-0400",
  thumbnail: {
    path: "http://i.annihil.us/u/prod/marvel/i/mg/3/20/5232158de5b16",
    extension: "jpg"
  },
  resourceURI: 'http://',
  comics: {
    available: 10,
    collectionURI: 'http://',
    items: [],
    returned: 0
  },
  series: {
    available: 10,
    collectionURI: 'http://',
    items: [],
    returned: 0
  },
  stories: {
    available: 10,
    collectionURI: 'http://',
    items: [],
    returned: 0
  },
  events: {
    available: 10,
    collectionURI: 'http://',
    items: [],
    returned: 0
  },
  urls: [
    {
      type: 'type',
      url: 'http://'
    }
  ]
};