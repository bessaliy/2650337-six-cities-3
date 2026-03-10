import {ReactElement, useState} from 'react';
import {SortingType} from '../../../const.ts';

type PlacesSortingProps = {
  currentSorting: SortingType;
  onSortingChange: (sorting: SortingType) => void;
};

const sortingOptions = [
  SortingType.Popular,
  SortingType.PriceLowToHigh,
  SortingType.PriceHighToLow,
  SortingType.TopRatedFirst,
];

function PlacesSorting({ currentSorting, onSortingChange }: PlacesSortingProps): ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <form className='places__sorting' action='#' method='get'>
      <span className='places__sorting-caption'>Sort by</span>

      <span
        className='places__sorting-type'
        tabIndex={0}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {currentSorting}
        <svg className='places__sorting-arrow' width='7' height='4'>
          <use xlinkHref='#icon-arrow-select'></use>
        </svg>
      </span>

      <ul className={`places__options places__options--custom${isOpen ? ' places__options--opened' : ''}`}>
        {sortingOptions.map((option) => (
          <li
            key={option}
            className={`places__option${option === currentSorting ? ' places__option--active' : ''}`}
            tabIndex={0}
            onClick={() => {
              onSortingChange(option);
              setIsOpen(false);
            }}
          >
            {option}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default PlacesSorting;
