interface ProductGalleryProps {
  mainImage: string;
  name: string;
  productId: string;
}

export const ProductGallery = ({
  mainImage,
  name,
  productId,
}: ProductGalleryProps) => {
  return (
    <div className="space-y-6">
      <div className="aspect-[3/4] overflow-hidden bg-gray-50">
        <img
          src={mainImage}
          alt={name}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="aspect-[3/4] overflow-hidden bg-gray-50">
          <img
            src={`https://picsum.photos/seed/${productId}-alt1/800/1200`}
            alt={`${name} detail`}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="aspect-[3/4] overflow-hidden bg-gray-50">
          <img
            src={`https://picsum.photos/seed/${productId}-alt2/800/1200`}
            alt={`${name} detail`}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </div>
  );
};
