export type { Product, ProductVariant, Image, Menu } from 'lib/shopify/types'


export interface IGoogleDBSchemaProduct {
    ID: number;
    Name: string;
    Description: string;
    Price: number;
    Stock: number;
    ImageURL: string;
    Category: string;
    Size: string;
    SizeImageURL: string;
}

export interface IGoogleDBSchemaCollection{
    Handle:string;
    Products:string;
}