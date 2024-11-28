export type { Image, Menu, Page, Product, ProductVariant, SEO } from 'lib/shopify/types';


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

export interface IGoogleDBSchemaPage{
    ID: string;
    Title: string;
    Handle: string;
    Body: string;
    BodySummary: string;
    SeoTitle: string;
    SeoDescription: string;
    CreatedAt?: string;
    UpdatedAt?: string;
}

export interface IGoogleRecommendSchemaPage{
    Handle: string;
    Products: string;
}