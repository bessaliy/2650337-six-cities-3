import axios from 'axios';
import { createAPI } from './api';
import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('createAPI', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should create axios instance with correct config', () => {
    const createSpy = vi.spyOn(axios, 'create');

    createAPI();

    expect(createSpy).toHaveBeenCalledWith({
      baseURL: 'https://15.design.htmlacademy.pro/six-cities',
      timeout: 5000,
    });
  });

  it('should add token to headers if exists', () => {
    let savedInterceptor: ((config: { headers?: Record<string, string> }) => typeof config) | undefined;

    vi.spyOn(axios, 'create').mockReturnValue({
      interceptors: {
        request: {
          use: (fn: (config: { headers?: Record<string, string> }) => { headers?: Record<string, string> }) => {
            savedInterceptor = fn;
          },
        },
      },
    } as unknown as ReturnType<typeof axios.create>);

    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue('test-token');

    createAPI();

    const result = savedInterceptor?.({ headers: {} });

    expect(result?.headers?.['x-token']).toBe('test-token');
  });

  it('should not add token if it does not exist', () => {
    let savedInterceptor: ((config: { headers?: Record<string, string> }) => typeof config) | undefined;

    vi.spyOn(axios, 'create').mockReturnValue({
      interceptors: {
        request: {
          use: (fn: (config: { headers?: Record<string, string> }) => { headers?: Record<string, string> }) => {
            savedInterceptor = fn;
          },
        },
      },
    } as unknown as ReturnType<typeof axios.create>);

    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);

    createAPI();

    const result = savedInterceptor?.({ headers: {} });

    expect(result?.headers?.['x-token']).toBeUndefined();
  });
});
