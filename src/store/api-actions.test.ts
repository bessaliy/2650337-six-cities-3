import {configureMockStore} from '@jedmao/redux-mock-store';
import {vi} from 'vitest';
import thunk from 'redux-thunk';
import {MockData, MockDetailedOffer} from '../mock/mock-data.ts';
import {fetchDetailedOffer, fetchFavorites, fetchNearbyOffers, fetchOffers, fetchReviews} from './api-actions.ts';
import {MockReviews} from '../mock/mock-reviews.ts';
import type { AnyAction } from 'redux';

const mockAPI = {
  get: vi.fn(),
};

const mockStore = configureMockStore([
  thunk.withExtraArgument(mockAPI),
]);

type AsyncThunk = {
  pending: { type: string };
  fulfilled: { type: string };
  rejected: { type: string };
};

function expectPendingAndFulfilled(actions: AnyAction[], asyncThunk: AsyncThunk) {
  expect(actions[0].type).toBe(asyncThunk.pending.type);
  expect(actions[1].type).toBe(asyncThunk.fulfilled.type);
}

function expectPendingAndRejected(actions: AnyAction[], asyncThunk: AsyncThunk) {
  expect(actions[0].type).toBe(asyncThunk.pending.type);
  expect(actions[1].type).toBe(asyncThunk.rejected.type);
}

describe('fetchOffers thunk', () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should dispatch fetchOffers fulfilled when API call is successful', async() => {
    mockAPI.get.mockResolvedValue({
      data: MockData,
    });
    const store = mockStore();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await store.dispatch(fetchOffers() as any);
    const actions = store.getActions();

    expect(actions.length).toBe(2);
    expectPendingAndFulfilled(actions, fetchOffers);
    expect(actions[1].payload).toEqual(MockData);
    expect(mockAPI.get).toHaveBeenCalledTimes(1);
    expect(mockAPI.get).toHaveBeenCalledWith('/offers');
  });
  it('should dispatch fetchOffers rejected when API call fails', async() => {
    mockAPI.get.mockRejectedValue(new Error('API Error'));
    const store = mockStore();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await store.dispatch(fetchOffers() as any);
    const actions = store.getActions();
    const error = actions[1].error as { message: string };

    expect(actions.length).toBe(2);
    expectPendingAndRejected(actions, fetchOffers);
    expect(error.message).toBe('API Error');
    expect(mockAPI.get).toHaveBeenCalledTimes(1);
    expect(mockAPI.get).toHaveBeenCalledWith('/offers');
  });
});

describe('fetchFavorites thunk', () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should dispatch fetchFavorites fulfilled when API call is successful', async() =>{
    mockAPI.get.mockResolvedValue({
      data: MockData,
    });
    const store = mockStore();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await store.dispatch(fetchFavorites() as any);
    const actions = store.getActions();

    expect(actions.length).toBe(2);
    expectPendingAndFulfilled(actions, fetchFavorites);
    expect(actions[1].payload).toEqual(MockData);
    expect(mockAPI.get).toHaveBeenCalledTimes(1);
    expect(mockAPI.get).toHaveBeenCalledWith('/favorite');
  });
  it('should dispatch fetchFavorites rejected when API call fails', async() => {
    mockAPI.get.mockRejectedValue(new Error('API Error'));
    const store = mockStore();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await store.dispatch(fetchFavorites() as any);
    const actions = store.getActions();
    const error = actions[1].error as { message: string };

    expect(actions.length).toBe(2);
    expectPendingAndRejected(actions, fetchFavorites);
    expect(error.message).toBe('API Error');
    expect(mockAPI.get).toHaveBeenCalledTimes(1);
    expect(mockAPI.get).toHaveBeenCalledWith('/favorite');
  });
});

describe('fetchReviews thunk', () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should dispatch fetchReviews fulfilled when API call is successful', async () => {
    mockAPI.get.mockResolvedValue({
      data: MockReviews,
    });
    const store = mockStore();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await store.dispatch(fetchReviews('1') as any);
    const actions = store.getActions();

    expect(actions.length).toBe(2);
    expectPendingAndFulfilled(actions, fetchReviews);
    expect(actions[1].payload).toEqual(MockReviews);
    expect(mockAPI.get).toHaveBeenCalledTimes(1);
    expect(mockAPI.get).toHaveBeenCalledWith('/comments/1');
  });
  it('should dispatch fetchReviews rejected when API call fails', async() => {
    mockAPI.get.mockRejectedValue(new Error('API Error'));
    const store = mockStore();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await store.dispatch(fetchReviews('1') as any);
    const actions = store.getActions();
    const error = actions[1].error as { message: string };

    expect(actions.length).toBe(2);
    expectPendingAndRejected(actions, fetchReviews);
    expect(error.message).toBe('API Error');
    expect(mockAPI.get).toHaveBeenCalledTimes(1);
    expect(mockAPI.get).toHaveBeenCalledWith('/comments/1');
  });
});

describe('fetchDetailedOffer thunk', () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should dispatch fetchDetailedOffer fulfilled when API call is successful', async () => {
    mockAPI.get.mockResolvedValue({
      data: MockDetailedOffer,
    });
    const store = mockStore();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await store.dispatch(fetchDetailedOffer('1') as any);
    const actions = store.getActions();

    expect(actions.length).toBe(2);
    expectPendingAndFulfilled(actions, fetchDetailedOffer);
    expect(actions[1].payload).toEqual(MockDetailedOffer);
    expect(mockAPI.get).toHaveBeenCalledTimes(1);
    expect(mockAPI.get).toHaveBeenCalledWith('/offers/1');
  });
  it('should dispatch fetchDetailedOffer rejected when API call fails', async() => {
    mockAPI.get.mockRejectedValue(new Error('API Error'));
    const store = mockStore();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await store.dispatch(fetchDetailedOffer('1') as any);
    const actions = store.getActions();
    const error = actions[1].error as { message: string };

    expect(actions.length).toBe(2);
    expectPendingAndRejected(actions, fetchDetailedOffer);
    expect(error.message).toBe('API Error');
    expect(mockAPI.get).toHaveBeenCalledTimes(1);
    expect(mockAPI.get).toHaveBeenCalledWith('/offers/1');
  });
});

describe('fetchNearbyOffers thunk', () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should dispatch fetchNearbyOffers fulfilled when API call is successful', async () => {
    mockAPI.get.mockResolvedValue({
      data: MockData,
    });
    const store = mockStore();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await store.dispatch(fetchNearbyOffers('1') as any);
    const actions = store.getActions();

    expect(actions.length).toBe(2);
    expectPendingAndFulfilled(actions, fetchNearbyOffers);
    expect(actions[1].payload).toEqual(MockData);
    expect(mockAPI.get).toHaveBeenCalledTimes(1);
    expect(mockAPI.get).toHaveBeenCalledWith('/offers/1/nearby');
  });
  it('should dispatch fetchNearbyOffers rejected when API call fails', async() => {
    mockAPI.get.mockRejectedValue(new Error('API Error'));
    const store = mockStore();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await store.dispatch(fetchNearbyOffers('1') as any);
    const actions = store.getActions();
    const error = actions[1].error as { message: string };

    expect(actions.length).toBe(2);
    expectPendingAndRejected(actions, fetchNearbyOffers);
    expect(error.message).toBe('API Error');
    expect(mockAPI.get).toHaveBeenCalledTimes(1);
    expect(mockAPI.get).toHaveBeenCalledWith('/offers/1/nearby');
  });
});

