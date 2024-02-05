import Input from "../components/interface/Input";
import Button from "../components/interface/Button";

const Chat = () => {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center rounded-xl shadow">
      <div className="w-full h-[94%] bg-white rounded-xl border-[1px] border-black my-2 shadow-lg"></div>
      <div className="w-full h-[6%] rounded-2xl flex justify-center items-center bg-transparent">
        <div className="w-[90%] h-full flex items-center justify-center shadow-md">
          <Input
            backgroundColor="#dbdbdbec"
            borderColor="black"
            onChange={(e) => {
              console.log(e.target.value);
            }}
          />
        </div>
        <div className="w-[10%] h-full flex justify-center items-center px-2">
          <Button text="Send" />
        </div>
      </div>
    </div>
  );
};

export default Chat;
