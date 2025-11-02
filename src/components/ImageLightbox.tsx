import { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface ImageLightboxProps {
  src: string;
  alt: string;
  thumbnailClassName?: string;
}

const ImageLightbox = ({ src, alt, thumbnailClassName = '' }: ImageLightboxProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div 
        className={`relative group cursor-pointer overflow-hidden rounded-lg ${thumbnailClassName}`}
        onClick={() => setIsOpen(true)}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-48 object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <ZoomIn className="w-8 h-8 text-white" />
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-5xl p-0 bg-transparent border-none">
          <div className="relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute -top-12 right-0 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors z-50"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={src}
              alt={alt}
              className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImageLightbox;
