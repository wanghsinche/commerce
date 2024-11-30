'use client';

import React from 'react';
import clsx from 'clsx';
import { ChatBubbleBottomCenterIcon } from '@heroicons/react/24/outline';

export const WhatsAppButton = ({ message = "Hello!", phoneNumber = "", disabled = false }) => {
    const buttonClasses = "relative flex items-center justify-center px-4 py-2 rounded-lg font-medium text-white bg-green-500 hover:bg-green-600 transition-colors w-full sm:w-auto";
    const disabledClasses = "opacity-50 cursor-not-allowed hover:bg-green-500";

    const handleClick = () => {
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    return (
        <button
            aria-label="Open WhatsApp"
            disabled={disabled}
            onClick={handleClick}
            className={clsx(buttonClasses, disabled && disabledClasses)}
        >
            <div className=" pr-2">
                <ChatBubbleBottomCenterIcon className="h-5" />
            </div>
             WhatsApp
        </button>
    );
};


