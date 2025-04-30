"use client";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { X } from "lucide-react";
import { useState, ChangeEvent, Suspense } from "react";
import { createClient } from "@/utils/supabase/client";
import { convertBlobUrlToFile } from "@/utils/convertBlobUrlFile";

import imageCompression from "browser-image-compression";
import InsertPhotoWidget, { PreviewImage } from "./insertPhotoWidget";
import Spinner from "../iconSVG/spinner";

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
    await setLoading(true);
    await handleSubmitContent();
    await setLoading(false);
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
    const options = {
      maxSizeMB: 0.5, // Target maximum size in MB
      useWebWorker: true, // Use Web Worker for better performance
    };
    if (previewUrls.length > 0) {
      for (const imageUrl of previewUrls) {
        const file = await convertBlobUrlToFile(imageUrl);
        const compressImage = await imageCompression(file, options);

        const filePath = `${user.id}/${file.name}`;
        const { error: UploadError } = await supabase.storage
          .from("images")
          .upload(filePath, compressImage);
        if (UploadError) {
          alert("unsuccessful");
        }
        const publicUrl = supabase.storage.from("images").getPublicUrl(filePath)
          .data.publicUrl;
        uploadedImageUrls.push(publicUrl);
      }
    }

    const postData = {
      user_id: user.id,
      content: content,
      image_urls: uploadedImageUrls,
    };

    if (content) {
      const { data, error } = await supabase
        .from("posts")
        .insert(postData)
        .select();

      if (onClick) onClick();
    } else {
      alert("please write before submit");
    }

    setContent("");
    setPreviewUrls([]);
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
    <Card className="  h-75 w-75 inset-0 z-40 flex items-center justify-center border-none">
      <Suspense>
        <div className="flex ">
          <span className=" "> สร้างโพสต์</span>
          <X onClick={onClick} />
        </div>
      </Suspense>
      <Suspense>
        <CardContent className="">
          <form onSubmit={handleSubmitForm}>
            <textarea
              placeholder="แชร์เรื่องราวของคุณ"
              className=" w-full outline-1 rounded py-2"
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
          <CardContent className="bg-secondary opacity-55 py-10">
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
        <CardFooter className=" flex justify-between  ">
          <span>เพิ่มลงโพสต์</span>
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
          <span className="text-foreground">เพิ่มโพส</span>
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
