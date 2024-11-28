import PublicGoogleSheetsParser from 'public-google-sheets-parser'
import { Product, IGoogleDBSchemaProduct } from './types'
const spreadsheetId = process.env.GOOGLE_SHEET_ID
let parser: PublicGoogleSheetsParser
let updateTime: number = 0
let dataCache: IGoogleDBSchemaProduct[]

const ttl = 1000 * 60 * 5 // 5 minutes

export const getRawProductData = async (): Promise<IGoogleDBSchemaProduct[]> => {
    if (!parser) {
        parser = new PublicGoogleSheetsParser(spreadsheetId!)
        updateTime = Date.now()
        dataCache = await parser.parse()
    } else {
        const now = Date.now()
        if (now - updateTime > ttl) {
            dataCache = await parser.parse()
            updateTime = now
        }   
    }
    return dataCache
}

/**
 * Reshapes the raw data from the Google Sheets into a format
 * that is usable by the Shopify API.
 * 
 * @param data - The raw data from the Google Sheets.
 */
export function reshapeProductData(data?: IGoogleDBSchemaProduct[]): Product[] {
    if (!data) return [];
    console.log(data)
    const productNames = new Set<string>()
    data.forEach(product => {
        productNames.add(product.Name)
    })

    const products: Product[] = []

    productNames.forEach(name => {
        const filteredData = data.filter(product => product.Name === name)
        if (!filteredData.length) return
        const sample = filteredData[0] as IGoogleDBSchemaProduct
        const availableForSale = filteredData.some(product => product.Stock > 0)
        const maxVariantPrice = filteredData.reduce((max, product) => {
            return Math.max(max, product.Price)
        }, 0)
        const minVariantPrice = filteredData.reduce((min, product) => {
            return Math.min(min, product.Price)
            }, Infinity)
        
        const product: Product = {
            /**
             * The ID of the product.
             */
            id: String(sample.ID),
            /**
             * The handle of the product.
             */
            handle: sample.Name,
            /**
             * Whether the product is available for sale.
             */
            availableForSale: availableForSale,
            /**
             * The title of the product.
             */
            title: sample.Name,
            /**
             * The description of the product.
             */
            description: sample.Description,
            /**
             * The HTML description of the product.
             */
            descriptionHtml: sample.Description,
            /**
             * The options of the product.
             */
            options: [],
            /**
             * The price range of the product.
             */
            priceRange: {
              /**
               * The maximum price of the product.
               */
              maxVariantPrice: {
                amount: String(maxVariantPrice),
                currencyCode: 'SGD',
              },
              /**
               * The minimum price of the product.
               */
              minVariantPrice: {
                amount: String(minVariantPrice),
                currencyCode: 'SGD',
              }
            },
            /**
             * The featured image of the product.
             */
            featuredImage: {
                url: sample.ImageURL,
                altText: sample.Name,
                width: 800,
                height: 600
            },
            /**
             * The SEO information of the product.
             */
            seo: {
                title: sample.Name,
                description: sample.Description
            },
            /**
             * The tags of the product.
             */
            tags: [],    
            /**
             * The last updated date of the product.
             */
            updatedAt: new Date(updateTime).toDateString(),
            /**
             * The images of the product.
             */
            images: filteredData.map(product => ({
                url: product.ImageURL,
                altText: product.Name,
                width: 800,
                height: 600
            })),
            /**
             * The variants of the product.
             */
            variants: filteredData.map(product => {
                return {
                    name: product.Size,
                    price: {
                        amount: String(product.Price),
                        currencyCode: 'SGD',
                    },
                    stock: product.Stock,
                    image: product.SizeImageURL,
                    id: String(product.ID),
                    title: product.Name,
                    availableForSale: product.Stock > 0,
                    selectedOptions: [
                        {
                            name: 'Size',
                            value: product.Size
                        }
                    ]
                }
            })
        }

        products.push(product)
    })


    return products
    
}
