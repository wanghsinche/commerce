'use client';

import React from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

const TelegramButton = ({ message = "Hello!", username = "", disabled = false }) => {
  const buttonClasses = "relative flex items-center justify-center px-4 py-2 rounded-lg font-medium text-white bg-blue-500 hover:bg-blue-600 transition-colors";
  const disabledClasses = "opacity-50 cursor-not-allowed hover:bg-blue-500";

  const handleClick = () => {
    const url = `https://t.me/${username}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <button
      aria-label="Open Telegram"
      disabled={disabled}
      onClick={handleClick}
      className={clsx(buttonClasses, disabled && disabledClasses)}
    >
      <div className="pr-2">
        <PaperAirplaneIcon className="h-5" />
      </div>
       Telegram
    </button>
  );
};

export default TelegramButton;