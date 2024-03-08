import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { TypographyH1 } from "@/components/ui/typography/h1";
import { TypographyH2 } from "@/components/ui/typography/h2";
import { TypographyP } from "@/components/ui/typography/paragraph";
import { userAtom } from "@/features/store/atoms/user.atom";
import _ from "lodash";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";

const Inbox = () => {
  const { path } = useParams();
  const user = useRecoilValue(userAtom);
  return (
    <>
      <div className="h-full w-full ">
        <div className="h-[8vh] w-full">
          <TypographyH2
            text={_.upperFirst(path)}
            className="h-full w-full flex justify-start items-center px-4 text-4xl tracking-wide py-0"
          />
        </div>
        <Separator />
        <div className="h-[92vh] w-full"></div>
      </div>
      <div className="h-full w-full flex flex-col p-2 px-4 gap-2">
        <div className="h-[15vh] w-full flex justify-start items-center ">
          <div className="w-[40%] h-full p-3 flex flex-col justify-center items-start">
            <TypographyH1
              text={`Good Morning ${user.user?.name?.split(" ")[0]}`}
            />
            <TypographyP text="New guy here alright!" />
          </div>
          <div className="w-[60%] h-full"> Hey</div>
        </div>
        <div className="h-[85vh] w-full ">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Inbox;
