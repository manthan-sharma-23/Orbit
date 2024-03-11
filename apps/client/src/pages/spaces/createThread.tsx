import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createThread } from "@/features/funcs/threads/createThread";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Plus } from "lucide-react";
import { Icons } from "@/components/ui/Icons";
import { useNavigate } from "react-router-dom";

const CreateThread = ({ teamId }: { teamId: string }) => {
  const [threadName, setThreadName] = useState<string | null>(null);
  const [typeOfChat, setTypeOfChat] = useState<string>("chat");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const createThreadOnClick = async () => {
    setLoading(true);
    console.log(typeOfChat, threadName);
    if (threadName === null) {
      setLoading(false);
      return;
    }
    createThread({
      teamId,
      name: threadName,
      type: typeOfChat,
    })
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        alert("Gone wrong");
      });
  };

  return (
    <>
      <AlertDialogTrigger>
        <Plus className="h-5 text-white/70 hover:text-white" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="w-full h-auto flex justify-center items-center">
            Create a New Thread in Team
          </AlertDialogTitle>
          <AlertDialogDescription className="w-full h-auto flex flex-col justify-center items-center">
            <div className="h-auto w-full flex flex-col  justify-center  items-center gap-3 text-black">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="email">Name</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Enter the name of the thread"
                  className="w-full"
                  onChange={(e) => setThreadName(e.target.value)}
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="email">Team Id</Label>
                <Input
                  type="email"
                  id="email"
                  disabled
                  value={teamId}
                  placeholder="Enter the team Id "
                  className="w-full bg-yellow-100 text-black/80 font-semibold"
                />
              </div>
              <Select onValueChange={(v) => setTypeOfChat(v)}>
                <SelectTrigger className="w-[83%] mt-2">
                  <SelectValue placeholder="Select the type of Thread" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="chat">Chat</SelectItem>
                  <SelectItem value="announcement">Announcement</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="w-full flex justify-center gap-3 items-center px-9">
          <AlertDialogCancel className="w-1/2">Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="w-1/2 p-0"
            onClick={() => {
              console.log("hey at");
              createThreadOnClick();
            }}
          >
            {loading ? (
              <p className="h-full w-full bg-white/10 rounded-md flex justify-center items-center">
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              </p>
            ) : (
              "Create"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </>
  );
};

export default CreateThread;
