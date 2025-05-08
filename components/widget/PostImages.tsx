import Image from "next/image";

type ImagesProps = {
  images: string[];
};

const PostImages = ({ images }: ImagesProps) => {
  if (!images || images.length === 0) return null;

  const renderGridClass = () => {
    switch (images.length) {
      case 1:
        return "grid-cols-1";
      case 2:
        return "grid-cols-2";
      case 3:
        return "grid-cols-3";
      case 4:
        return "grid-cols-4";
      default:
        return "grid-cols-3";
    }
  };
  return (
    <div>
      {images.slice(0, 5).map((src, i) => (
        <div
          className="relative aspect-square overflow-hidden rounded-md"
          key={i}
        >
          <Image src={src} alt={`image${i}`} fill className="object-cover" />
          {i === 4 && images.length > 5 && (
            <div className="absolute inset-0 bg-black/60 text-white flex items-center justify-center text-lg font-bold">
              +{images.length - 5}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
export default PostImages;
