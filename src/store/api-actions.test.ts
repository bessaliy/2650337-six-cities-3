import {configureMockStore} from '@jedmao/redux-mock-store';
import {vi} from 'vitest';
import thunk from 'redux-thunk';
import {MockData, MockDetailedOffer} from '../mock/mock-data.ts';
import {
  checkAuth,
  fetchDetailedOffer,
  fetchFavorites,
  fetchNearbyOffers,
  fetchOffers,
  fetchReviews, login, logout,
  postReview, toggleFavorites
} from './api-actions.ts';
import {MockReviews, MockReviewToPush} from '../mock/mock-reviews.ts';
import type { AnyAction } from 'redux';
import {setAuthorizationStatus, setLoginError, setUserEmail} from './user/user-slice.ts';
import {AuthStatus} from '../const.ts';
import {AxiosInstance} from 'axios';

const mockAPI = {
  get: vi.fn(),
  post: vi.fn(),
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

describe('postReview thunk', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('should dispatch postReview fulfilled when API call is successful', async() => {
    mockAPI.post.mockResolvedValue({
      data: MockReviewToPush,
    });

    const store = mockStore();

    await store.dispatch(postReview({
      id: MockReviewToPush.id,
      comment: MockReviewToPush.comment,
      rating: MockReviewToPush.rating
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }) as any);
    const actions = store.getActions();

    expect(actions.length).toBe(2);
    expectPendingAndFulfilled(actions, postReview);
    expect(actions[1].payload).toEqual(MockReviewToPush);
    expect(mockAPI.post).toHaveBeenCalledTimes(1);
    expect(mockAPI.post).toHaveBeenCalledWith(
      `/comments/${MockReviewToPush.id}`,
      {
        comment: MockReviewToPush.comment,
        rating: MockReviewToPush.rating
      });
  });
  it('should dispatch postReview rejected when API call fails', async() => {
    mockAPI.post.mockRejectedValue(new Error('API Error'));
    const store = mockStore();

    await store.dispatch(postReview({
      id: MockReviewToPush.id,
      comment: MockReviewToPush.comment,
      rating: MockReviewToPush.rating
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }) as any);
    const actions = store.getActions();
    const error = actions[1].error as { message: string };

    expect(actions.length).toBe(2);
    expectPendingAndRejected(actions, postReview);
    expect(error.message).toBe('API Error');
    expect(mockAPI.post).toHaveBeenCalledTimes(1);
    expect(mockAPI.post).toHaveBeenCalledWith(
      `/comments/${MockReviewToPush.id}`,
      {
        comment: MockReviewToPush.comment,
        rating: MockReviewToPush.rating
      });
  });
});

describe('login thunk', () => {
  it('should dispatch login actions when API call is successful', async () => {
    const mockAuthData = {
      email: 'test@mail.com',
      token: '123pass',
    };

    mockAPI.post.mockResolvedValue({
      data: mockAuthData,
    });

    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

    const store = mockStore();

    await store.dispatch(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      login({ email: 'test@mail.com', password: '123pass' }) as any
    );

    const actions = store.getActions();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    expect(actions.map((a) => a.type)).toEqual([
      login.pending.type,
      setAuthorizationStatus.type,
      setUserEmail.type,
      setLoginError.type,
      login.fulfilled.type,
    ]);

    expect(setItemSpy).toHaveBeenCalledWith('token', '123pass');

    expect(actions[1].payload).toBe(AuthStatus.Auth);
    expect(actions[2].payload).toBe('test@mail.com');
    expect(actions[3].payload).toBe(null);

    expect(mockAPI.post).toHaveBeenCalledWith('/login', {
      email: 'test@mail.com',
      password: '123pass',
    });
  });
});

describe('logout thunk', () => {
  it('should dispatch logout actions and clear token', () => {
    const dispatch = vi.fn();

    const removeItemSpy = vi.spyOn(Storage.prototype, 'removeItem');

    logout()(dispatch, () => ({}), {} as AxiosInstance);

    expect(removeItemSpy).toHaveBeenCalledWith('token');

    expect(dispatch).toHaveBeenCalledWith(
      setAuthorizationStatus(AuthStatus.NoAuth)
    );

    expect(dispatch).toHaveBeenCalledWith(
      setUserEmail(null)
    );
  });
  it('should dispatch error when API call fails', async () => {
    mockAPI.post.mockRejectedValue(new Error('401'));

    const store = mockStore();

    await store.dispatch(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      login({ email: 'test@mail.com', password: '123pass' }) as any
    );

    const actions = store.getActions();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    expect(actions.map((a) => a.type)).toEqual([
      login.pending.type,
      setLoginError.type,
      login.fulfilled.type,
    ]);

    expect(actions[1].payload).toBe('Неверный email или пароль');
  });
});

describe('checkAuth thunk', () => {
  it('should dispatch auth actions when API call is successful', async () => {
    const mockAuthData = {
      email: 'test@mail.com',
      token: '123',
    };

    mockAPI.get.mockResolvedValue({
      data: mockAuthData,
    });

    const store = mockStore();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await store.dispatch(checkAuth() as any);

    const actions = store.getActions();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    expect(actions.map((a) => a.type)).toEqual([
      checkAuth.pending.type,
      setAuthorizationStatus.type,
      setUserEmail.type,
      checkAuth.fulfilled.type,
    ]);

    expect(actions[1].payload).toBe(AuthStatus.Auth);
    expect(actions[2].payload).toBe('test@mail.com');

    expect(mockAPI.get).toHaveBeenCalledWith('/login');
  });
  it('should dispatch NoAuth when API call fails', async () => {
    mockAPI.get.mockRejectedValue(new Error('401'));

    const store = mockStore();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await store.dispatch(checkAuth() as any);

    const actions = store.getActions();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    expect(actions.map((a) => a.type)).toEqual([
      checkAuth.pending.type,
      setAuthorizationStatus.type,
      checkAuth.fulfilled.type,
    ]);

    expect(actions[1].payload).toBe(AuthStatus.NoAuth);

    expect(mockAPI.get).toHaveBeenCalledWith('/login');
  });
});

describe('toggleFavorites thunk', () => {
  it('should dispatch fulfilled and call API with status 0 when offer is favorite', async () => {
    const mockOffer = MockData[0]; // или любой mock Offer

    mockAPI.post.mockResolvedValue({
      data: mockOffer,
    });

    const store = mockStore();

    await store.dispatch(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      toggleFavorites({ id: '1', isFavorite: true }) as any
    );

    const actions = store.getActions();

    expect(actions.length).toBe(2);
    expectPendingAndFulfilled(actions, toggleFavorites);

    expect(actions[1].payload).toEqual(mockOffer);

    expect(mockAPI.post).toHaveBeenCalledWith('/favorite/1/0');
  });
  it('should dispatch fulfilled and call API with status 1 when offer is not favorite', async () => {
    const mockOffer = MockData[0];

    mockAPI.post.mockResolvedValue({
      data: mockOffer,
    });

    const store = mockStore();

    await store.dispatch(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      toggleFavorites({ id: '1', isFavorite: false }) as any
    );

    const actions = store.getActions();

    expect(actions.length).toBe(2);
    expectPendingAndFulfilled(actions, toggleFavorites);

    expect(actions[1].payload).toEqual(mockOffer);

    expect(mockAPI.post).toHaveBeenCalledWith('/favorite/1/1');
  });
  it('should dispatch rejected when API call fails', async () => {
    mockAPI.post.mockRejectedValue(new Error('API Error'));

    const store = mockStore();

    await store.dispatch(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      toggleFavorites({ id: '1', isFavorite: false }) as any
    );

    const actions = store.getActions();
    const error = actions[1].error as { message: string };

    expect(actions.length).toBe(2);
    expectPendingAndRejected(actions, toggleFavorites);

    expect(error.message).toBe('API Error');
  });
});

