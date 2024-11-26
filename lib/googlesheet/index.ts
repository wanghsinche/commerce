import { getRawProductData, reshapeProductData } from "./googleDB";
import { Menu, Product } from "./types";


/**
 * Get all products in the Google sheet.
 * @returns a Promise that resolves to an array of Products.
 */
export async function getProducts(): Promise<Product[]> {
    const data = await getRawProductData()
    return reshapeProductData(data)
}


/**
 * Get a product by its handle.
 * @param handle the handle of the product to look up
 * @returns a Promise that resolves to the matching Product, or undefined if
 *          no product matches the handle.
 */
export async function getProduct(handle: string): Promise<Product | undefined> {
    const products = await getProducts()
    return products.find((product) => product.handle === handle)
}

/**
 * Get products in a collection.
 * @param collection the collection to look up
 * @param reverse whether to reverse the sort order
 * @param sortKey the key to sort by
 * @returns a Promise that resolves to an array of Products in the collection
 */
export async function getCollectionProducts({
    collection,
    reverse,
    sortKey
}: {
    collection: string;
    reverse?: boolean;
    sortKey?: string;
}): Promise<Product[]> {
    const products = await getProducts()
    return products.filter((product) => product.description.includes(collection))
}



/**
 * Get a menu by its handle.
 * Currently returns a mock menu with predefined items.
 * @param handle - The handle of the menu to look up.
 * @returns A Promise that resolves to an array of Menu items.
 */
export async function getMenu(handle: string): Promise<Menu[]> {
    const mockMenu = [
        {
            title: 'Home',
            path: '/'
        },
        {
            title: 'About',
            path: '/about'
        },
        {
            title: 'Contact',
            path: '/contact'
        }
    ]

    return mockMenu
}