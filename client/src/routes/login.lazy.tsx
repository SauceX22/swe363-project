import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  return (
    <main
      className="flex h-screen w-screen items-center justify-center"
      style={{
        backgroundImage: "url('/src/assets/login.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <div
        className="rounded-lg p-10 shadow-lg backdrop-blur-lg"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          border: "2px solid rgba(255, 255, 255, 0.5)",
          width: "450px",
          height: "400px",
        }}
      >
        <h1 className="mb-8 whitespace-nowrap text-center text-3xl font-bold">
          Welcome to Mafqood!
        </h1>

        <form className="space-y-4">
          <div className="flex flex-col">
            <label className="mb-1 text-left text-gray-700">Enter Email</label>
            <Input type="email" placeholder="Enter your KFUPM email" />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-left text-gray-700">
              Enter Password
            </label>
            <Input type="password" placeholder="Enter your password" />
          </div>

          <Button type="submit" className="w-full">
            Log in!
          </Button>
        </form>
      </div>
    </main>
  );
}

export default LoginPage;
