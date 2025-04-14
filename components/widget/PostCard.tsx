import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { X } from "lucide-react";
import { useRef, useState } from "react";
import { Images } from "lucide-react";
import { CircleX } from "lucide-react";
type PostCardProps = {
  closePopup?: () => void;
  setInsertPhoto?: React.Dispatch<React.SetStateAction<boolean>>;
  setCloseWidgetPhoto?: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PostCard = ({ closePopup: onClick }: PostCardProps) => {
  const [uploadPhoto, setUploadPhoto] = useState(false);

  return (
    <Card className="absolute z-10 w-[38rem] max-md:w-80 flex left-1/2   -translate-x-1/2   -translate-y-1/2 max-md:-translate-x-1/2  ">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>สร้างโพสต์</CardTitle>
          <X onClick={onClick} />
        </div>
      </CardHeader>
      <CardContent className="">
        {/*   todo add to db */}
        <textarea
          placeholder="แชร์เรื่องราวของคุณ"
          className=" w-full outline-1 rounded py-2"
          onChange={() => {}}
        />
      </CardContent>
      {uploadPhoto && (
        <CardContent className="bg-secondary opacity-55 py-10">
          <div>
            <InsertPhotoWidget setCloseWidgetPhoto={setUploadPhoto} />
          </div>
        </CardContent>
      )}
      <CardFooter className=" flex justify-between  ">
        <span>เพิ่มลงโพสต์</span>
        <IconElement setInsertPhoto={setUploadPhoto} />
      </CardFooter>
      <button className="bg-primary rounded-sm mx-2">เพิ่มโพส</button>
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

const InsertPhotoWidget = ({ setCloseWidgetPhoto }: PostCardProps) => {
  const handleSubmit = () => {
    if (setCloseWidgetPhoto) setCloseWidgetPhoto((prev) => !prev);
  };
  const inputPhoto = () => {
    if (input.current) {
      input.current.click();
    }
  };
  const input = useRef<HTMLInputElement>(null);

  return (
    <>
      <div className="flex gap-2 justify-center">
        <Images className="text-gray-500" />
        <span onClick={inputPhoto}>อัพโหลดรูป</span>
        <input type="file" ref={input} hidden />

        <div className="absolute -translate-full left-[65%]">
          <CircleX onClick={handleSubmit} />
        </div>
      </div>
    </>
  );
};
