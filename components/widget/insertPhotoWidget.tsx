"use client";
import { CircleX, Images } from "lucide-react";
import { ChangeEvent, useRef } from "react";
import { PostCardProps } from "./PostCard";
import { IoIosCloseCircle } from "react-icons/io";
import Image from "next/image";
const InsertPhotoWidget = ({
  setInsertPhoto,
  setPreviewUrls,
  previewUrls,
}: PostCardProps) => {
  const ref = useRef<HTMLInputElement>(null);

  const handleInput = () => {
    ref.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);

      const urls = fileArray
        .map((file) => URL.createObjectURL(file))
        .filter((url) => !previewUrls?.includes(url));

      if (setPreviewUrls) setPreviewUrls((prev) => [...prev, ...urls]);
    }
    e.target.value = "";
  };

  const handleCloseX = () => {
    if (setInsertPhoto) {
      setInsertPhoto((prev) => !prev);
    }
  };

  return (
    <>
      <div className="flex gap-2 justify-center  ">
        <Images className="text-gray-500 " />
        <input
          ref={ref}
          type="file"
          multiple
          hidden
          onChange={handleFileChange}
        />
        <span onClick={handleInput} className="font-light text-[12px] ">
          อัพโหลดรูป
        </span>

        <div className="absolute -translate-full left-[75%]">
          <CircleX onClick={handleCloseX} />
        </div>
      </div>
    </>
  );
};

export const PreviewImage = ({
  previewUrls,
  removeImage,
}: {
  previewUrls: string[];
  removeImage: (url: string) => void;
}) => {
  return (
    <div className="flex gap-2  ">
      {previewUrls.map((url, index) => (
        <div key={index} className="relative flex">
          <Image
            src={url}
            alt={""}
            key={index}
            width={80}
            height={80}
            className="object-contain rounded-sm "
          />

          <IoIosCloseCircle
            className="absolute left-15"
            size={30}
            onClick={() => removeImage(url)}
          />
        </div>
      ))}
    </div>
  );
};

export default InsertPhotoWidget;
