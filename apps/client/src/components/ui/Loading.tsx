import { Icons } from "./Icons";

const Loading = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
    </div>
  );
};

export default Loading;
