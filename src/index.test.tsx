import ReactDOM from 'react-dom/client';
import { vi, describe, it, expect } from 'vitest';

vi.mock('react-dom/client', () => ({
  default: {
    createRoot: vi.fn(),
  },
  createRoot: vi.fn(),
}));

describe('index.tsx', () => {
  it('should render app without crashing', async () => {
    const renderMock = vi.fn();

    vi.spyOn(ReactDOM, 'createRoot').mockReturnValue({
      render: renderMock,
    } as unknown as ReturnType<typeof ReactDOM.createRoot>);

    const div = document.createElement('div');
    div.id = 'root';
    document.body.appendChild(div);

    await import('./index');

    expect(ReactDOM.createRoot).toHaveBeenCalled();
    expect(renderMock).toHaveBeenCalled();
  });
});
