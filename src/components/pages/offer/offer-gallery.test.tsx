import { render, screen } from '@testing-library/react';
import OfferGallery from './offer-gallery';
import { GalleryLimits } from '../../../const';

const images = [
  'img1.jpg',
  'img2.jpg',
  'img3.jpg',
  'img4.jpg',
  'img5.jpg',
  'img6.jpg',
  'img7.jpg',
];

describe('Component: OfferGallery', () => {
  it('should render limited number of images', () => {
    render(<OfferGallery images={images} />);

    const renderedImages = screen.getAllByRole('img');
    expect(renderedImages).toHaveLength(GalleryLimits.Max);
  });
});
