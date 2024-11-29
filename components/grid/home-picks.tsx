import { getCollectionProducts } from 'lib/googlesheet'
import Grid from '.';
import ProductGridItems from 'components/layout/product-grid-items';
import Link from 'next/link';

export const runtime = "edge";

export async function HomePicks() {
    const products = await getCollectionProducts({ collection: 'home-picks' })

    if (!products) {
        return null
    }

    return     <div>
        <Grid className="grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            <ProductGridItems products={products} />
        </Grid>
        <div className="h-32 flex items-center justify-center">
            <Link
                href="/search"
                className="text-center rounded-full bg-slate-600 p-2 text-white"
            >
                More Products
            </Link>
        </div>
    </div>

}