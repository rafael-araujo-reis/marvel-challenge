import { act } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import api from '../../src/services/api';
import { mockHeroData } from '../../__mocks__/fileMock';

const apiMock = new MockAdapter(api);

describe('api', () => {

  test('should request api sucess', async () => {
    act(() => {
      apiMock.onGet('/characters')
        .reply(200, [{ ...mockHeroData }]);
    });
  });

  test('should request api erro', async () => {
    act(() => {
      apiMock.onGet('/characters')
        .reply(500, []);
    });
  });

  test('should request api erro network', async () => {
    act(() => {
      apiMock.onGet('/characters')
        .networkError();
    });
  });
});