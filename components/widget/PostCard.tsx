import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { X } from "lucide-react";
import { IoIosCloseCircle } from "react-icons/io";
import { useRef, useState, ChangeEvent } from "react";
import { Images } from "lucide-react";
import { CircleX } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { convertBlobUrlToFile } from "@/utils/convertBlobUrlFile";
import { Button } from "../ui/button";
type PostCardProps = {
  closePopup?: () => void;
  setInsertPhoto?: React.Dispatch<React.SetStateAction<boolean>>;
  previewUrls?: [];
  setPreviewUrls?: React.Dispatch<React.SetStateAction<string[]>>;
};

export const PostCard = ({
  closePopup: onClick,
  setInsertPhoto,
}: PostCardProps) => {
  const [uploadPhoto, setUploadPhoto] = useState(false);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmitImageWithPost = async () => {
    setLoading(true);
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      console.error("No user found.");
      return;
    }
    if (!previewUrls || previewUrls.length === 0) {
      console.warn("No images to upload.");
      return;
    }

    for (const imageUrl of previewUrls) {
      try {
        const file = await convertBlobUrlToFile(imageUrl);
        const filePath = `${user.id}/${file.name}`;
        const { data, error } = await supabase.storage
          .from("image")
          .upload(filePath, file);
        if (error) {
          console.error("Upload error:", error.message);
        } else {
          console.log("File uploaded successfully:", data);
        }
      } catch (error) {
        console.error("Error processing image:", error);
      }
    }
    setLoading(false);
  };

  const handleRemoveImage = (urlToRemove: string) => {
    if (setInsertPhoto) setInsertPhoto((prev) => !prev);

    URL.revokeObjectURL(urlToRemove);
    if (setPreviewUrls) {
      setPreviewUrls((prev) => prev.filter((url) => url !== urlToRemove));
    }
  };
  return (
    <Card className="absolute z-10 w-[38rem] max-md:w-80 flex left-1/2   -translate-x-1/2   -translate-y-1/2 max-md:-translate-x-1/2  ">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>สร้างโพสต์</CardTitle>
          <X onClick={onClick} />
        </div>
      </CardHeader>
      <CardContent className="">
        <textarea
          placeholder="แชร์เรื่องราวของคุณ"
          className=" w-full outline-1 rounded py-2"
          onChange={() => {}}
        />
        {previewUrls && (
          <div className="flex gap-2">
            {previewUrls.map((url, index) => (
              <div key={index} className="relative flex">
                <Image
                  src={url}
                  alt={""}
                  key={index}
                  width={80}
                  height={80}
                  className="object-contain "
                />

                <IoIosCloseCircle
                  className="absolute left-15"
                  size={30}
                  onClick={() => handleRemoveImage(url)}
                />
              </div>
            ))}
          </div>
        )}
      </CardContent>

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
      <CardFooter className=" flex justify-between  ">
        <span>เพิ่มลงโพสต์</span>
        <IconElement setInsertPhoto={setUploadPhoto} />
      </CardFooter>
      <button
        onClick={handleSubmitImageWithPost}
        disabled={loading}
        className="bg-primary rounded-sm mx-2"
      >
        เพิ่มโพส
      </button>
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

      const urls = fileArray.map((file) => URL.createObjectURL(file));

      if (setPreviewUrls) setPreviewUrls((prev) => [...prev, ...urls]);
    }

    e.target.value = "";
  };

  const handleX = () => {
    if (setInsertPhoto) {
      setInsertPhoto((prev) => !prev);
    }
  };

  /* 
  input 
    image input -pass
    click submit to db with content

  process
    < input  ref={ref} hidden /> -pass
    image upload in store supabase
    content insert to db 


  output
    preview -pass
    after submit popup gone 
    show new content  on dash board 

  */
  return (
    <>
      <div className="flex gap-2 justify-center">
        <Images className="text-gray-500  " />
        <input
          ref={ref}
          type="file"
          multiple
          hidden
          onChange={handleFileChange}
        />
        <span onClick={handleInput}>อัพโหลดรูป</span>

        <div className="absolute -translate-full left-[75%]">
          <CircleX onClick={handleX} />
        </div>
      </div>
    </>
  );
};
