import {ReactElement} from 'react';
// import {Offer} from '../../types/offer.ts';

type MapProps = {
  // offers: Offer[];
  activeOfferId: string | null;
  mapName: string;
}
function Map({activeOfferId, mapName}: MapProps): ReactElement {
  return (
    <section className={`${mapName}__map map`} data-active-offer-id={activeOfferId ?? ''} />
  );
}

export default Map;
