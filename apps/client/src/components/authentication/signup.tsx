import * as React from "react";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/ui/Icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type INPUT_LOGIN_FORM } from "typings";
import { registerUser } from "@/features/funcs/auth/useRegisterUser";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const formInit: INPUT_LOGIN_FORM = {
  name: "",
  email: "",
  password: "",
};

export function SignUp({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [formDetails, setFormDetails] =
    React.useState<INPUT_LOGIN_FORM>(formInit);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    if (formDetails.email && formDetails.password) {
      registerUser({
        setLoading: setIsLoading,
        name: formDetails.name,
        email: formDetails.email,
        password: formDetails.password,
      });
    } else {
      alert("Enter correct credentials");
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Name
            </Label>
            <Input
              id="name"
              placeholder="tony stark maybe..."
              type="name"
              autoCapitalize="none"
              autoComplete="name"
              value={formDetails.name}
              autoCorrect="off"
              disabled={isLoading}
              onChange={(e) =>
                setFormDetails((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              value={formDetails.email}
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              onChange={(e) =>
                setFormDetails((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Password
            </Label>
            <Input
              value={formDetails.password}
              id="password"
              placeholder="xyzwhateverisyourpassword"
              type="password"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              onChange={(e) =>
                setFormDetails((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Email
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{" "}
        GitHub
      </Button>
    </div>
  );
}
