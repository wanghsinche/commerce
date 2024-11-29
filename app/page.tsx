import { Carousel } from 'components/carousel';
import { HomePicks } from 'components/grid/home-picks';
import { ThreeItemGrid } from 'components/grid/three-items';
import Footer from 'components/layout/footer';
export const runtime = "edge";
export const metadata = {
  description: 'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
  openGraph: {
    type: 'website'
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
