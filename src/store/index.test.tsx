import {store} from './index.ts';

describe('Store', () => {

  it('should be created', () => {
    expect(store).toBeDefined();
  });

  it('should have correct initial state', () => {
    const state = store.getState();

    expect(state).toBeDefined();
  });

});
