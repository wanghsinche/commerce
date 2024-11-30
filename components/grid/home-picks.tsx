import { getProducts } from 'lib/googlesheet'
import Grid from '.';
import ProductGridItems from 'components/layout/product-grid-items';
import Link from 'next/link';

export const runtime = "edge";

export async function HomePicks() {
    const products = await getProducts({ reverse: true, sortKey: 'BEST_SELLING', query: '' })

    if (!products) {
        return null
    }

    const top10 = products.splice(0, 10)
    
    return     <div>
        <Grid className="grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            <ProductGridItems products={top10} />
        </Grid>
        <div className="h-32 flex items-center justify-center">
            <Link
                href="/search"
                className="text-center rounded-full bg-slate-600 p-2 text-white"
            >
                View More
            </Link>
        </div>
    </div>

}