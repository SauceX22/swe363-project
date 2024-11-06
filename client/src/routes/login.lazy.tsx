import { Button } from "@/components/ui/button";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  return (
    <main
      className="flex h-screen w-screen items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/src/assets/login.png')" }}
    >
      <div
        className="flex flex-col items-center justify-center rounded-[70px] border-2 border-white/50 bg-[#64748B] shadow-lg"
        style={{ width: "736px", height: "756px" }}
      >
        <h1 className="mb-8 text-center text-5xl font-bold text-white">
          Welcome to Mafqood!
        </h1>

        <img
          src="/src/assets/loginIcon.png"
          alt="Login Icon"
          className="h-[382px] w-[500px]"
        />

        <Button
          type="button"
          className="mt-8 h-[64px] w-[369px] rounded-[57px] bg-[#F9F9F9] text-lg font-medium text-[#64748B]"
        >
          Login with KFUPM Email
        </Button>
      </div>
    </main>
  );
}

export default LoginPage;
