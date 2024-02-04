import { useParams } from "react-router-dom";
import Input from "../components/interface/Input";
import Button from "../components/interface/Button";

const Chat = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <div className="h-full w-full flex flex-col justify-center p-2 items-center border-[1px] border-black bg-white rounded-2xl shadow">
      <div className="w-full h-[94%]"></div>
      <div className="w-full h-[6%] rounded-2xl flex justify-center items-center">
        <div className="w-[90%] h-full flex items-center justify-center ">
          <Input backgroundColor="#dbdbdbec" borderColor="black" />
        </div>
        <div className="w-[10%] h-full flex justify-center items-center px-2">
          <Button text="Send" />
        </div>
      </div>
    </div>
  );
};

export default Chat;
