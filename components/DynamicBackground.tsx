import React, { useState, useEffect } from 'react';

// A curated list of high-quality, thematic background images.
const backgroundImages = [
  'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=1974&auto=format&fit=crop', // Library
  'https://images.unsplash.com/photo-1555663397-6a41e57b3a4a?q=80&w=2070&auto=format&fit=crop', // Greek statue
  'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=80&w=2070&auto=format&fit=crop', // Starry night
  'https://images.unsplash.com/photo-1529149959144-176239a7dd78?q=80&w=1974&auto=format&fit=crop', // Parthenon
  'https://images.unsplash.com/photo-1589002482328-80a1dc7826c7?q=80&w=2070&auto=format&fit=crop', // Books and skull
];


const DynamicBackground: React.FC = () => {
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * backgroundImages.length);
        setImageUrl(backgroundImages[randomIndex]);
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full h-full -z-10">
             <style>
                {`
                @keyframes zoom-in {
                    from { transform: scale(1); }
                    to { transform: scale(1.1); }
                }
                .zoom-animation {
                    animation: zoom-in 40s ease-in-out infinite alternate;
                }
                `}
            </style>
            {imageUrl && (
                <img
                    src={imageUrl}
                    alt="Fondo temático"
                    className="w-full h-full object-cover zoom-animation"
                />
            )}
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-60"></div>
        </div>
    );
};

export default DynamicBackground;