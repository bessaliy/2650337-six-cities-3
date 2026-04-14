import { rootReducer } from './root-reducer';

describe('rootReducer', () => {

  it('should return initial state', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(state).toHaveProperty('offers');
    expect(state).toHaveProperty('offerDetails');
    expect(state).toHaveProperty('reviews');
    expect(state).toHaveProperty('user');
    expect(state).toHaveProperty('favorites');
  });

});
