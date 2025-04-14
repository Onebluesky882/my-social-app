import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type PostCardProps = {
  onClick: () => void;
};

const PostCard = ({ onClick }: PostCardProps) => {
  const postCard = useRef<HTMLDivElement | null>(null);
  const [toggle, setToggle] = useState(false);

  return (
    <Card className="absolute z-10 w-[38rem] max-md:w-80 flex    left-1/2   -translate-x-1/2   -translate-y-1/2 max-md:-translate-x-1/2  ">
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
          className="flex-1 w-full "
          onChange={() => {}}
        />
      </CardContent>
      <CardFooter className=" flex    justify-between">
        <div className="flex">
          <span>เพิ่มลงโพสต์</span>
          <picture>
            <source
              srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f601/512.webp"
              type="image/webp"
            />
            <img
              src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f601/512.gif"
              alt="😁"
              width={32}
              height={32}
            />
          </picture>
        </div>
        <div className="flex gap-3 ">
          <Image
            src={"/photo.png"}
            width={20}
            height={20}
            className="object-contain"
            alt="icon"
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
      </CardFooter>
      <button className="bg-primary rounded-sm mx-2">เพิ่มโพส</button>
    </Card>
  );
};
export default PostCard;
