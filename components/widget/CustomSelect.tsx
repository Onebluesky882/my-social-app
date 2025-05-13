type CustomSelectProps = {
  options: string[];
  handleOption: (value: string) => void;
};

export const CustomSelect = ({ handleOption, options }: CustomSelectProps) => {
  return (
    <div className="relative " onClick={(e) => e.stopPropagation()}>
      <div className=" w-25 absolute  p-2 py-3 mx-2 -translate-x-25 z-0 bg-[#252728]   border-1 border-white/10 shadow rounded-sm ">
        <div className="flex  flex-col justify-center gap-y-2">
          {options.map((option, index) => (
            <p
              key={index}
              className=" hover:bg-red-400 hover:outline-none rounded-sm flex hover:bg-red text-sm  outline-1 outline-white/10 justify-center text-[10px] font-extralight py-1"
              onClick={() => {
                handleOption(option);
              }}
            >
              {option}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};
