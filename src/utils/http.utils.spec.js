import { vi } from 'vitest';
import { request } from './http.utils';

describe('http.utils', () => {
  let fetchMock;
  const okRes = (data) => ({
    ok: true,
    json: () => Promise.resolve(data),
  });

  beforeEach(() => {
    fetchMock = vi.fn();
    global.fetch = fetchMock;
  });

  afterEach(() => {
    delete global.fetch;
  });

  it('should call fetch with url and default GET method', async () => {
    const data = { hello: 'world' };
    fetchMock.mockResolvedValue(okRes(data));
    const result = await request('https://example.com/api');
    expect(fetchMock).toHaveBeenCalledWith('https://example.com/api', {
      method: 'GET',
    });
    expect(result).toEqual(data);
  });

  it('should pass the provided method to fetch', async () => {
    const data = { ok: true };
    fetchMock.mockResolvedValue(okRes(data));
    await request('https://example.com/api', 'POST');
    expect(fetchMock).toHaveBeenCalledWith('https://example.com/api', {
      method: 'POST',
    });
  });

  it('should reject when fetch rejects', async () => {
    const err = new Error('network');
    fetchMock.mockRejectedValue(err);
    await expect(request('https://example.com/api')).rejects.toThrow('network');
  });

  it('should return parsed json even when response is non-ok (no ok check in source)', async () => {
    const data = { error: 'failed' };
    fetchMock.mockResolvedValue({
      ok: false,
      status: 500,
      json: () => Promise.resolve(data),
    });
    const result = await request('https://example.com/api');
    expect(result).toEqual(data);
  });
});
