'use client'
import { useProduct } from "components/product/product-context";
import { Product, ProductVariant } from "lib/googlesheet/types";
import { WhatsAppButton } from "./whatsapp";
import TelegramButton from "./telegram";

const useData = ({ product }: { product: Product }) => {
    const { state } = useProduct();

    const variants = product.variants;

    const variant = variants.find((variant: ProductVariant) =>
        variant.selectedOptions.every((option) => option.value === state[option.name.toLowerCase()])
    );

    const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
    const selectedVariantId = variant?.id || defaultVariantId;

    const selectedVariant = variants.find((variant) => variant.id === selectedVariantId);

    const selectedOptions = selectedVariant?.selectedOptions;

    const message = selectedVariant && selectedOptions ?
        `Hi, I'm interested in ${selectedVariant.title} ${selectedOptions.map((option) => option.value).join(', ')}  [${product.id}]` :
        `Hi, I'm interested in ${product.title} [${product.id}]`;

    return {
        message, selectedVariantId
    }
}

export const SendViaWhatsApp = ({ product }: { product: Product }) => {
    const { message, selectedVariantId } = useData({ product });
    const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '';
    return <WhatsAppButton message={message} phoneNumber={phoneNumber} disabled={!selectedVariantId} />
}

export const SendViaTelegram = ({ product }: { product: Product }) => {
    const { message, selectedVariantId } = useData({ product });
    const username = process.env.NEXT_PUBLIC_TELEGRAM_USERNAME || '';
    return <TelegramButton message={message} username={username} disabled={!selectedVariantId} />
}
