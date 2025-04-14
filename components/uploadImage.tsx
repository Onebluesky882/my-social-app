import { useRef } from "react";
import { Button } from "./ui/button";

const UploadImage = () => {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const handleUpload = () => {};
  return (
    <div>
      <input
        type="file"
        hidden
        multiple
        onChange={handleUpload}
        ref={imageInputRef}
      />
      <Button
        onClick={() => {
          imageInputRef.current?.click();
        }}
        className="text-foreground"
        variant={"outline"}
      >
        photo
      </Button>
    </div>
  );
};
export default UploadImage;
