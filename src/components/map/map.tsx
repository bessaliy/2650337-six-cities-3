import { ReactElement, useEffect, useRef } from 'react';
import leaflet, {Map as LeafletMap, LayerGroup} from 'leaflet';
import {Offer} from '../../types/offer.ts';
import pin from '../../assets/img/pin.svg';
import pinActive from '../../assets/img/pin-active.svg';
import {City} from '../../types/city.ts';

type MapProps = {
  offers: Offer[];
  selectedOfferId: string | null;
  mapName: string;
  city: City;
};

const defaultIcon = leaflet.icon({
  iconUrl: pin,
  iconSize: [27, 39],
  iconAnchor: [13, 39],
});

const activeIcon = leaflet.icon({
  iconUrl: pinActive,
  iconSize: [27, 39],
  iconAnchor: [13, 39],
});

function Map({ offers, selectedOfferId, mapName, city }: MapProps): ReactElement {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const leafletMapRef = useRef<LeafletMap | null>(null);
  const markersLayerRef = useRef<LayerGroup | null>(null);

  useEffect(() => {
    const map = leafletMapRef.current;

    if (!map) {
      return;
    }

    map.setView(
      [city.location.latitude, city.location.longitude],
      city.location.zoom
    );
  }, [city]);

  useEffect(() => {
    if (!mapRef.current || leafletMapRef.current) {
      return;
    }

    const map = leaflet.map(mapRef.current, {
      center: [city.location.latitude, city.location.longitude],
      zoom: city.location.zoom,
    });

    markersLayerRef.current = leaflet.layerGroup().addTo(map);

    leaflet
      .tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      })
      .addTo(map);

    leafletMapRef.current = map;

    return () => {
      map.remove();
      leafletMapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const layer = markersLayerRef.current;
    if (!layer) {
      return;
    }

    layer.clearLayers();

    offers.forEach((offer) => {
      leaflet
        .marker(
          [offer.location.latitude, offer.location.longitude],
          {
            icon: offer.id === selectedOfferId ? activeIcon : defaultIcon,
          }
        )
        .addTo(layer);
    });
  }, [offers, selectedOfferId]);

  return (
    <section className={`${mapName}__map map`} data-active-offer-id={selectedOfferId ?? ''}>
      <div ref={mapRef} style={{ height: '100%', minHeight: 500 }} />
    </section>
  );
}

export default Map;
