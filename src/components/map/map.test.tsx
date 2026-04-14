import { render } from '@testing-library/react';
import { vi } from 'vitest';
import Map from './map';
import {City} from '../../types/city.ts';
import {Offer} from '../../types/offer.ts';

const mockSetView = vi.fn();
const mockAddTo = vi.fn();
const mockRemove = vi.fn();
const mockClearLayers = vi.fn();

vi.mock('leaflet', () => ({
  default: {
    map: vi.fn(() => ({
      setView: mockSetView,
      remove: mockRemove,
    })),
    tileLayer: vi.fn(() => ({
      addTo: mockAddTo,
    })),
    layerGroup: vi.fn(() => ({
      addTo: () => ({
        clearLayers: mockClearLayers,
      }),
    })),
    marker: vi.fn(() => ({
      addTo: mockAddTo,
    })),
    icon: vi.fn(),
  },
  map: vi.fn(() => ({
    setView: mockSetView,
    remove: mockRemove,
  })),
  tileLayer: vi.fn(() => ({
    addTo: mockAddTo,
  })),
  layerGroup: vi.fn(() => ({
    addTo: () => ({
      clearLayers: mockClearLayers,
    }),
  })),
  marker: vi.fn(() => ({
    addTo: mockAddTo,
  })),
  icon: vi.fn(),
}));

describe('Component: Map', () => {
  const city = {
    location: {
      latitude: 10,
      longitude: 20,
      zoom: 5,
    },
  } as City;

  const offers = [
    {
      id: '1',
      location: { latitude: 10, longitude: 20 },
    },
    {
      id: '2',
      location: { latitude: 30, longitude: 40 },
    },
  ] as Offer[];

  it('should render map and add markers', () => {
    render(
      <Map
        offers={offers}
        selectedOfferId={null}
        mapName="cities"
        city={city}
      />
    );

    expect(mockAddTo).toHaveBeenCalled();
  });
});
