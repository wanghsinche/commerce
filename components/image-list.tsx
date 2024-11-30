"use client"
import Image from 'next/image'

interface ImageListProps {
    images: string[]
}

export default function ImageList({ images }: ImageListProps) {
  return (
    <div className="flex space-x-4  p-4">
      {images.map((src, index) => (
        <div key={index} className="relative">
          <Image
            className="cursor-pointer rounded shadow-md transition-transform duration-200 hover:scale-105"
            src={src}
            alt={`Image ${index + 1}`}
            width={50}
            height={50}
          />
        </div>
      ))}
    </div>
  );
}
