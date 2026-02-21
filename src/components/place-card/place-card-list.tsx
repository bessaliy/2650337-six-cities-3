import {ReactElement, useMemo} from 'react';
import { Offer } from '../../types/offer.ts';
import PlaceCard from './place-card.tsx';
import {getRandomCards} from '../../utils.ts';
import {ViewMode} from '../../const.ts';

type PlaceCardListProps = {
  cardsAmount: number;
  offers: Offer[];
  onCardHover: (id: string) => void;
  onCardLeave: () => void;
  viewMode: keyof typeof ViewMode;
}

function PlaceCardList({ offers, cardsAmount, onCardHover, onCardLeave, viewMode }: PlaceCardListProps): ReactElement {
  const cards = useMemo(() => getRandomCards(offers, cardsAmount), [offers, cardsAmount]);
  return (
    <div className='cities__places-list places__list tabs__content'>
      {cards.map((card) => (
        <PlaceCard
          key={card.id}
          data={card}
          onHover={onCardHover}
          onLeave={onCardLeave}
          viewMode={viewMode}
        />
      ))}
    </div>
  );
}

export default PlaceCardList;
