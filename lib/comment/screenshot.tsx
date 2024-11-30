"use server";
import {} from 'react';
import { Product } from 'lib/googlesheet/types';
import { getComments } from './googleDB';
import ImageList from 'components/image-list';

export async function ScreenshotComment({product}: {product:Product}) {
    const handle = product.handle;
    const rawComments = await getComments(handle)
    if (!rawComments.length) {
        return null
    }
    return <ImageList images={rawComments.map((item) => item.Screenshot).slice(0, 3)} />
}

