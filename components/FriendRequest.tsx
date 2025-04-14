import Image from "next/image";
import Link from "next/link";

const FriendRequest = () => {
  return (
    <div className="p-4 m-2 bg-secondary rounded-xl">
      {/* top */}
      <div>
        <span>friend request</span>
        <Link href={""}></Link>
      </div>
      {/* bottom */}
      <div className="flex justify-between    ">
        <div className="flex items-center gap-2  ">
          <Image
            src={
              "https://images.pexels.com/photos/31520412/pexels-photo-31520412/free-photo-of-elegant-woman-sitting-outdoors-in-natural-light.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            }
            alt=""
            width={40}
            height={40}
            className="rounded-full object-cover h-10 w-10 m-2"
          />
          <span> fatima binte </span>
        </div>
        <div className="flex items-center gap-2  ">
          <Image
            src={"/accept.png"}
            alt=""
            width={20}
            height={20}
            className="rounded-full object-cover"
          />{" "}
          <Image
            src={"/reject.png"}
            alt=""
            width={20}
            height={20}
            className="rounded-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};
export default FriendRequest;
