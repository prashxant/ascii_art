import Image from 'next/image';
import React, { useState } from 'react'

export const Card = () => {
   const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleImageUpload = (e : React.ChangeEvent<HTMLInputElement>) => {

    const file = e.target.files?.[0];
    if(!file) return

     const url = URL.createObjectURL(file);
    setImageUrl(url);
  };


  return (
    <div>
       <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="mb-4"
      />
        {imageUrl && (
        <Image
          width={300}
          height={300}
          src={imageUrl}
          alt="Uploaded"
          className="max-w-md rounded-lg shadow-md"
        />
      )}
    </div>
  )
}
