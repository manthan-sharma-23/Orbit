const Input = ({
  width = "full",
  height = "full",
  showLabel = false,
  label = "Can be Edited via `label='' `",
  showbottomText = false,
  bottomText = "Can be Edited via `bottomText='' ` ",
  placeholder = "Enter your name " as string,
  showPlaceholder = true,
  type = "text",
  borderColor = "black/30",
  onChange,
  backgroundColor = "transparent",
}: {
  width?: string;
  height?: string;
  showLabel?: boolean;
  label?: string;
  showbottomText?: boolean;
  bottomText?: string;
  placeholder?: string;
  showPlaceholder?: boolean;
  type?: "text" | "email" | "password";
  borderColor?: string;
  backgroundColor?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className={`w-${width} h-${height}`}>
      {showLabel && (
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {label}
        </label>
      )}
      <input
        className={`flex h-${height} w-full rounded-md border-[1.7px] border-${borderColor} bg-${backgroundColor} px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50`}
        type={type}
        placeholder={showPlaceholder ? placeholder : ""}
        onChange={onChange}
      />
      {showbottomText && (
        <p className="mt-1 text-xs text-gray-500">{bottomText}</p>
      )}
    </div>
  );
};

export default Input;
