"use client";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "../ui/card";
import { useState, ChangeEvent, Suspense, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { convertBlobUrlToFile } from "@/utils/convertBlobUrlFile";

import imageCompression from "browser-image-compression";
import Spinner from "../iconSVG/spinner";
import { IoIosCloseCircle } from "react-icons/io";
import { PreviewImage } from "./insertPhotoWidget";
import InsertPhotoWidget from "./insertPhotoWidget";

export type PostCardProps = {
  closePopup?: () => void;
  setInsertPhoto?: React.Dispatch<React.SetStateAction<boolean>>;
  previewUrls?: string[];
  setPreviewUrls?: React.Dispatch<React.SetStateAction<string[]>>;
  removeImage?: (urlToRemove: string) => void;
};

export const PostCard = ({
  closePopup: onClick,
  setInsertPhoto,
}: PostCardProps) => {
  const [uploadPhoto, setUploadPhoto] = useState(false);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const supabase = createClient();

  const handleSubmitContentWithImage = async () => {
    setLoading(true);

    await handleSubmitContent();

    setLoading(false);
  };

  const handleSubmitContent = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return;
    }

    /* image upload */

    let uploadedImageUrls: string[] = [];
    if (previewUrls.length > 0) {
      const options = {
        maxSizeMB: 0.5, // Target maximum size in MB
        useWebWorker: true, // Use Web Worker for better performance
        maxWidthOrHeight: 1024,
      };
      const uploadPromises = previewUrls.map(async (imageUrl) => {
        const file = await convertBlobUrlToFile(imageUrl);
        const compressImage = await imageCompression(file, options);
        const filePath = `${user.id}/${file.name}`;
        const { error } = await supabase.storage
          .from("images")
          .upload(filePath, compressImage);
        if (error) {
          console.error("❌ Upload failed for", file.name, error);
          return null;
        }
        const { data } = supabase.storage.from("images").getPublicUrl(filePath);

        return data.publicUrl;
      });
      const results = await Promise.all(uploadPromises);
      uploadedImageUrls = results.filter((url): url is string => url !== null);
    }

    /* ---------------- */

    const postData = {
      author_id: user.id,
      content: content,
      image_urls: uploadedImageUrls,
    };

    if (content) {
      await supabase.from("posts").insert(postData).select();

      if (onClick) onClick();
    }

    setContent("");
  };

  const handleRemoveUrl = (urlToRemove: string) => {
    if (setInsertPhoto) setInsertPhoto((prev) => !prev);

    URL.revokeObjectURL(urlToRemove);
    if (setPreviewUrls) {
      setPreviewUrls((prev) => prev.filter((url) => url !== urlToRemove));
    }
  };

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value.replace(/^\s+/, ""));
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim() === "") {
      alert("Please enter content before submitting.");
      return;
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === " " && content.length === 0) {
      e.preventDefault();
    }
  };

  return (
    <Card className="   w-75 inset-0 z-40 flex items-center justify-center border-none">
      <Suspense>
        <div className=" relative">
          <span className="">
            <IoIosCloseCircle className="absolute left-20" onClick={onClick} />
          </span>
          <span className=" "> สร้างโพสต์</span>
        </div>
      </Suspense>
      <Suspense>
        <CardContent className=" flex flex-col">
          <form onSubmit={handleSubmitForm} className=" w-60">
            <textarea
              placeholder="แชร์เรื่องราวของคุณ"
              className=" w-full outline-1 rounded py-2 placeholder:font-light  placeholder:text-[10px] placeholder:px-1 placeholder:pt-1 font-light text-sm "
              value={content}
              onChange={handleContentChange}
              onKeyDown={handleKeyDown}
            />
          </form>
          {previewUrls && (
            <PreviewImage
              previewUrls={previewUrls}
              removeImage={handleRemoveUrl}
            />
          )}
        </CardContent>
      </Suspense>

      <Suspense>
        {uploadPhoto && (
          <CardContent className="bg-secondary opacity-55 py-10  border-dotted border-1 border-gray-500 rounded-sm ">
            <div>
              <InsertPhotoWidget
                setInsertPhoto={setUploadPhoto}
                setPreviewUrls={setPreviewUrls}
              />
            </div>
          </CardContent>
        )}
      </Suspense>
      <Suspense>
        <CardFooter className=" flex flex-col justify-between  ">
          <IconElement setInsertPhoto={setUploadPhoto} />
        </CardFooter>
      </Suspense>
      {/*  */}

      <button
        onClick={handleSubmitContentWithImage}
        disabled={loading}
        className="bg-primary rounded-sm mx-2 flex items-center justify-center px-4 py-2 text-white disabled:bg-blue-400 "
      >
        {" "}
        {loading ? (
          <Spinner />
        ) : (
          <span className="text-foreground font-light text-sm">เพิ่มโพส</span>
        )}
      </button>
      {/*  */}
    </Card>
  );
};

const IconElement = ({ setInsertPhoto }: PostCardProps) => {
  const handleSubmit = () => {
    if (setInsertPhoto) {
      setInsertPhoto((prev) => !prev);
    }
  };

  return (
    <div className="flex gap-3 ">
      <Image
        src={"/photo.png"}
        width={20}
        height={20}
        className="object-contain"
        alt="icon"
        onClick={handleSubmit}
      />
      <Image
        src={"/tag.png"}
        width={20}
        height={20}
        alt="icon"
        className="object-contain"
      />{" "}
      <Image
        src={"/emoji.png"}
        width={20}
        height={20}
        alt="icon"
        className="object-contain"
      />{" "}
      <Image
        src={"/pin.png"}
        width={20}
        height={20}
        alt="icon"
        className="object-contain"
      />{" "}
      <Image
        src={"/gif.png"}
        width={20}
        height={20}
        alt="icon"
        className="object-contain"
      />
    </div>
  );
};
