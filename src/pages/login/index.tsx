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
import axios from "axios";
import { ApplicationContext } from "@/providers/ApplicationProvider";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/router";

const Index = () => {
  const router = useRouter();
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
    remember: false,
  });
  const { login, userLoading, user, getUser } =
    React.useContext(ApplicationContext);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    login(formData.email.toLowerCase(), formData.password, formData.remember);
  };

  React.useEffect(() => {
    getUser();
    if (user) {
      router.push("/app");
      console.log(user);
    }
  }, [user]);

  return (
    <div className="flex flex-col p-10">
      <Card className="w-max m-auto">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Login to your Vyzo account</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="flex flex-col gap-4 mb-2"
            onSubmit={(e) => handleSubmit(e)}
          >
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
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                name="password"
                type="password"
                placeholder="••••••••"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
            </div>
            <div className="flex gap-2">
              <Checkbox
                name="remember"
                checked={formData.remember}
                onClick={() =>
                  setFormData({ ...formData, remember: !formData.remember })
                }
              />
              <Label htmlFor="remember">Remember me</Label>
            </div>
            <Button type="submit" disabled={userLoading}>
              {userLoading ? <Loader2 className="animate-spin" /> : "Login"}
            </Button>
          </form>
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/register" className="text-foreground underline">
              Register now
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
