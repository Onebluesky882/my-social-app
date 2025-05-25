import Image from "next/image";

type ImagesProps = {
  images: string[];
};

const PostGridImages = ({ images }: ImagesProps) => {
  if (!images || images.length === 0) return null;

  const renderGridClass = () => {
    if (images.length === 1) return "grid-cols-1";
    if (images.length === 2) return "grid-cols-2";
    if (images.length <= 4) return "grid-cols-2";
    return "grid-cols-3";
  };
  const MAX_VISIBLE = 9;
  const remaining = images.length - MAX_VISIBLE;
  return (
    <div className={`grid gap-2  ${renderGridClass()}`}>
      {images.slice(0, MAX_VISIBLE).map((src, i) => (
        <div
          className="relative flex  overflow-hidden rounded-md justify-center"
          key={i}
        >
          <Image
            src={src}
            alt={`image${i}`}
            width={640}
            height={200}
            className="object-contain rounded-sm "
          />
          {i === MAX_VISIBLE - 1 && remaining > 0 && (
            <div className=" absolute inset-0 bg-black/60 text-white flex items-center justify-center text-lg font-bold">
              +{remaining}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
export default PostGridImages;
