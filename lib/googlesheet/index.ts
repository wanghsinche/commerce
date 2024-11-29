import { getRawCollectionData, getRawPageData, getRawProductData, getRawRecommendData, reshapeCollectionData, reshapePageData, reshapeProductData } from "./googleDB";
import { Collection, IGoogleDBSchemaProduct, Menu, Page, Product } from "./types";
import { SortFilterItem } from 'lib/constants';

function sortProducts(filteredData: IGoogleDBSchemaProduct[], sortKey: string, reverse?: boolean) {
    if ((sortKey as SortFilterItem['sortKey']) === 'CREATED_AT') {
        const res = filteredData.sort((a, b) => {
            return Number(a.ID) > Number(b.ID) ? 1 : -1
        })
        return reverse ? res.reverse() : res
    }

    if ((sortKey as SortFilterItem['sortKey']) === 'PRICE') {
        const res = filteredData.sort((a, b) => {
            return a.Price > b.Price ? 1 : -1
        })
        return reverse ? res.reverse() : res
    }

    if ((sortKey as SortFilterItem['sortKey']) === 'BEST_SELLING') {
        const res = filteredData.sort((a, b) => {
            return a.Stock > b.Stock ? 1 : -1
        })
        return reverse ? res.reverse() : res
    }
    return filteredData
}

/**
 * Get all products in the Google sheet.
 * @returns a Promise that resolves to an array of Products.
 */
export async function getProducts({
    query,
    reverse,
    sortKey
  }: {
    query?: string;
    reverse?: boolean;
    sortKey?: string;
  }): Promise<Product[]> {
    const data = await getRawProductData()
    let filteredData = data
    if (query) {
        filteredData = data.filter((item) => item.Name.toLowerCase().includes(query?.toLowerCase() || ''))
    }
    if (sortKey) {
        filteredData = sortProducts(filteredData, sortKey, reverse)
    }
    return reshapeProductData(filteredData)
    
}


/**
 * Get a product by its handle.
 * @param handle the handle of the product to look up
 * @returns a Promise that resolves to the matching Product, or undefined if
 *          no product matches the handle.
 */
export async function getProduct(handle: string): Promise<Product | undefined> {
    const products = await getProducts({})
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
    const data = await getRawProductData()
    const collectionsData = await getRawCollectionData()
    const target = collectionsData.find((item) => item.Handle === collection)
    const pickedHandle = target?.Products.split(',').map((item) => item.trim())
    if (!pickedHandle?.length) {
        return []
    }
    let filteredData = data.filter((product) => pickedHandle?.includes(product.Name)); 
    if (sortKey) {
        filteredData = sortProducts(filteredData, sortKey, reverse)
    }
    return reshapeProductData(filteredData)
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
            title: 'All',
            path: '/search'
        },
        {
            title: 'Carousell',
            path: 'https://www.carousell.sg/u/ladylines/',
            external: true
        }
    ]

    return mockMenu
}

export async function getPage(handle: string): Promise<Page|undefined> {
    const rawPages = await getRawPageData()
    const target = rawPages.find((item) => item.Handle === handle)    
    if (!target) {
        return 
    }

    return reshapePageData(target)
}
  

export async function getProductRecommendations(product: string): Promise<Product[]> {
    const recommends = await getRawRecommendData()
    const target = recommends.find((item) => item.Handle === product)

    if (!target) {
        return []
    }
    const pickedHandle = target.Products.split(',').map((item) => item.trim())
    if (!pickedHandle?.length) {
        return []
    }

    const products = await getProducts({})
    return products.filter((product) => pickedHandle.includes(product.handle))
}


export async function getCollections(): Promise<Collection[]>{
    const collections = await getRawCollectionData()
    return collections.filter(i=>!i.Handle.startsWith('hidden')).map(i=>reshapeCollectionData(i))
}

export async function getCollection(handle: string): Promise<Collection | undefined> {
    const collections = await getCollections()
    return collections.find((collection) => collection.handle === handle)
}

export async function getPages(): Promise<Page[]>{
    const pages = await getRawPageData()
    return pages.map(i=>reshapePageData(i))
}