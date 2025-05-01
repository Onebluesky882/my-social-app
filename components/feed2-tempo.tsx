"use client";

import { Post } from "@/types/post-type";
import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const Feeds = ({ props }: { props: Post }) => {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: 1,
      spacing: 10,
    },
    loop: true,
  });

  return (
    <div className="py-3 px-4 bg-card rounded-lg shadow-sm space-y-3">
      {/* User Info */}
      <div className="flex justify-between items-center">
        <span className="font-medium text-secondary">
          {props.profiles.email}
        </span>
        <span className="text-2xl text-accent font-bold cursor-pointer">
          ...
        </span>
      </div>

      {/* Carousel Images */}
      {props.image_urls.length > 0 && (
        <div ref={sliderRef} className="keen-slider rounded-md overflow-hidden">
          {props.image_urls.map((url, idx) => (
            <div key={idx} className="keen-slider__slide">
              <Image
                src={url}
                alt={`Image ${idx}`}
                width={600}
                height={400}
                className="w-full h-96 object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {/* Post Content */}
      {props.content && (
        <p className="text-secondary whitespace-pre-line">{props.content}</p>
      )}

      {/* Footer */}
      <FooterPost />
    </div>
  );
};

const FooterPost = () => {
  return (
    <div className="px-6 py-2 flex items-center justify-between bg-accent rounded text-sm text-muted-foreground">
      <div className="flex gap-6">
        <div className="flex items-center gap-2">
          <Image src="/like.png" alt="like" width={16} height={16} />
          <span>20 Likes</span>
        </div>
        <div className="flex items-center gap-2">
          <Image src="/comment.png" alt="comment" width={16} height={16} />
          <span>20 Comments</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Image src="/share.png" alt="share" width={16} height={16} />
        <span>20 Shares</span>
      </div>
    </div>
  );
};

export default Feeds;
