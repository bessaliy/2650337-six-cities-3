import {ReactElement} from 'react';
import { Offer } from '../../types/offer.ts';
import PlaceCard from './place-card.tsx';
import {CardView} from '../../const.ts';

type PlaceCardListProps = {
  offers: Offer[];
  onHoverToggle: (id: string | null) => void;
}

function PlaceCardList({ offers, onHoverToggle }: PlaceCardListProps): ReactElement {

  return (
    <div className='cities__places-list places__list tabs__content'>
      {offers.map((card) => (
        <PlaceCard
          key={card.id}
          data={card}
          onHoverToggle={onHoverToggle}
          viewMode={CardView.Cities}
        />
      ))}
    </div>
  );
}
export default PlaceCardList;
