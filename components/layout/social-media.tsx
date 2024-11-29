import { PaperAirplaneIcon, PhoneIcon, CameraIcon, MapPinIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';



export function SocialMedia() {
    const containerClasses = "flex justify-end gap-2";
    const textClasses = "text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300";

    return <nav className={clsx(containerClasses)}>
       
        <Link href='https://www.carousell.sg/u/ladylines/' target='_blank'>
            <span className={clsx(textClasses, 'flex items-center p-2 rounded-full')}>
                <MapPinIcon className="h-6 w-6 text-[#E1306C]" />
                SG
            </span>
        </Link>
        
        {/* <Link target='_blank' href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`} className="flex items-center p-2 rounded-full hover:bg-gray-100">
            <PhoneIcon className="h-6 w-6 text-[#25D366]" />
        </Link> */}
        {/* <Link target='_blank' href={`https://t.me/${process.env.NEXT_PUBLIC_TELEGRAM_USERNAME}`} className="flex items-center p-2 rounded-full hover:bg-gray-100">
            <PaperAirplaneIcon className="h-6 w-6 text-[#0088CC]" />
        </Link> */}
        {/* <Link target='_blank' href={`https://instagram.com/${process.env.NEXT_PUBLIC_INSTAGRAM_USERNAME}`} className="flex items-center p-2 rounded-full hover:bg-gray-100">
            <CameraIcon className="h-6 w-6 text-[#E1306C]" />
        </Link> */}
    </nav>
}
