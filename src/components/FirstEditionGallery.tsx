import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { PREMIERE_EDITION_PHOTOS } from '../data/premiereEdition';

const FirstEditionGallery: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activePhoto = activeIndex !== null ? PREMIERE_EDITION_PHOTOS[activeIndex] : null;

  useEffect(() => {
    if (activeIndex === null) return undefined;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveIndex(null);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activeIndex]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {PREMIERE_EDITION_PHOTOS.map((photo, index) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="group text-left bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow border border-gray-100"
          >
            <div className="aspect-[4/3] overflow-hidden bg-blue-dark">
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <p className="p-4 text-sm font-medium text-blue-dark">{photo.caption}</p>
          </button>
        ))}
      </div>

      {activePhoto && (
        <div
          className="fixed inset-0 z-[80] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setActiveIndex(null)}
          role="dialog"
          aria-modal="true"
          aria-label={activePhoto.alt}
        >
          <button
            type="button"
            className="absolute top-4 right-4 text-white hover:text-gold"
            onClick={() => setActiveIndex(null)}
            aria-label="Fermer"
          >
            <X className="w-8 h-8" />
          </button>
          <figure
            className="max-w-5xl w-full"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={activePhoto.src}
              alt={activePhoto.alt}
              className="w-full max-h-[80vh] object-contain rounded-lg"
            />
            <figcaption className="text-center text-white mt-4">
              {activePhoto.caption}
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
};

export default FirstEditionGallery;
