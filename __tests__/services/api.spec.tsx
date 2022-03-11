import { act } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { mockHeroData } from '__mocks__/fileMock';
import api from '../../src/services/api';

const apiMock = new MockAdapter(api);

describe('api', () => {
  test('should request api', async () => {
    act(() => {
      apiMock.onGet('/characters')
        .reply(200, [{ ...mockHeroData }]);
    });
  });
});