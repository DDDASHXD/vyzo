import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ApplicationContext } from "@/providers/ApplicationProvider";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const Index = () => {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    error: false,
  });
  const { register, userLoading } = React.useContext(ApplicationContext);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setFormData({ ...formData, error: true });
      return;
    }

    setFormData({ ...formData, error: false });
    register(formData.name, formData.email, formData.password);
  };

  return (
    <div className="flex flex-col p-10">
      <Card className="m-auto w-80">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Register a new Vyzo account</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="flex flex-col gap-4 mb-2"
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Name</Label>
              <Input
                name="name"
                type="name"
                placeholder="Enter your name"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                value={formData.name}
                minLength={2}
                maxLength={20}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                type="email"
                placeholder="Enter your email"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                value={formData.email}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="password"
                className={cn("", {
                  "text-destructive": formData.error,
                })}
              >
                Password
              </Label>
              <Input
                name="password"
                type="password"
                placeholder="••••••••"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
                value={formData.password}
                minLength={8}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="confirmPassword"
                className={cn("", {
                  "text-destructive": formData.error,
                })}
              >
                Confirm Password
              </Label>
              <Input
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                required
                className={cn("", {
                  "mb-0": formData.error,
                })}
                value={formData.confirmPassword}
              />
              {formData.error && (
                <p className="text-sm text-destructive">
                  Please make sure your passwords match
                </p>
              )}
            </div>
            <Button type="submit" disabled={userLoading}>
              {userLoading ? <Loader2 className="animate-spin" /> : "Register"}
            </Button>
          </form>
          <p className="text-sm text-muted-foreground">
            Alredy have an account?{" "}
            <Link href="/login" className="text-foreground underline">
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
