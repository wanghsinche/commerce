import { Carousel } from 'components/carousel';
import { HomePicks } from 'components/grid/home-picks';
import { ThreeItemGrid } from 'components/grid/three-items';
import Footer from 'components/layout/footer';
export const runtime = "edge";
export const metadata = {
  title: {
    default: 'Lady Lines Store | Brands & Latest Collections',
    template: '%s'
  },
  description: 'Shop premium fashion brands like Calvin Klein, Lululemon, Jelly Cat and more. Find the latest collections, exclusive deals.',
  keywords: ['fashion', 'Calvin Klein', 'Lululemon', 'Jelly Cat', 'premium clothing', 'premium bags','fashion store'],
  openGraph: {
    type: 'website',
    title: 'Lady Lines Store | Brands & Latest Collections',
    description: 'Discover luxury fashion brands and latest designer collections',
  }
};

export default function HomePage() {
  return (
    <>
      <ThreeItemGrid />
      <Carousel />
      <HomePicks />
      <Footer />
    </>
  );
}
