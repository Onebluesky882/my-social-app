"use client";

import { convertBlobUrlToFile } from "@/utils/convertBlobUrlFile";
import { createClient } from "@/utils/supabase/client";
import imageCompression from "browser-image-compression";
import Image from "next/image";
import {
  ChangeEvent,
  startTransition,
  useRef,
  useState,
  useTransition,
} from "react";

const AttachImage = () => {
  const refer = useRef<HTMLInputElement>(null);
  const supabase = createClient();
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isSelectImage, setIsSelectImage] = useState(false);
  const [, startTransition] = useTransition();

  const handleSelectImage = () => {
    refer.current?.click();
    setTimeout(() => {
      setIsSelectImage(true);
    }, 1000);
  };

  // Function to handle file selection and preview
  const handlePreview = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      const previewUrls = fileArray.map((file) => URL.createObjectURL(file));
      setImageUrls([...imageUrls, ...previewUrls]);
    }
  };

  // Function to upload a single image file to Supabase storage

  const uploadImageFile = async (file: File) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      try {
        const filePath = `${user.id}/${file.name}`;
        const { data, error } = await supabase.storage
          .from("test")
          .upload(filePath, file);
        if (error) {
          console.error("Upload error:", error.message);
        } else {
          console.log("File uploaded successfully:", data);
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    }
  };

  // Function to handle the 'Upload Images' button click

  const handleUploadImage = () => {
    startTransition(async () => {
      for (const url of imageUrls) {
        try {
          const imageFile = await convertBlobUrlToFile(url);
          const options = {
            maxSizeMB: 0.5, // Target maximum size in MB
            maxWidthOrHeight: 1024, // Maximum width or height in pixels
            useWebWorker: true, // Use Web Worker for better performance
          };
          const compressImage = await imageCompression(imageFile, options);
          await uploadImageFile(compressImage);
        } catch (error) {
          console.error("Upload failed:", error); // Debug log
        }
      }
      if (refer.current) {
        refer.current.value = "";
      }

      setImageUrls([]);

      setIsSelectImage(false);
    });
  };

  return (
    <>
      {" "}
      <div className="flex ">
        {imageUrls.map((url) => (
          <Image src={url} key={url} width={100} height={100} alt={url} />
        ))}
      </div>
      <div className=" flex flex-col justify-center">
        <input
          type="file"
          ref={refer}
          hidden
          multiple
          onChange={handlePreview}
        />
        {!isSelectImage ? (
          <button
            className="border-2  p-2 rounded-2xl hover:bg-amber-300"
            onClick={handleSelectImage}
          >
            select image
          </button>
        ) : (
          <button
            className="border-2  p-2 rounded-2xl hover:bg-amber-300"
            onClick={handleUploadImage}
          >
            uploadImage
          </button>
        )}
      </div>
    </>
  );
};

export default AttachImage;
