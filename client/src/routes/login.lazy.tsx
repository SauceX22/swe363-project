import { NotFoundComponent } from "@/components/not-found";
import { Button } from "@/components/ui/button";
import { setCookie } from "@/lib/utils";
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";

// routing for the page
export const Route = createLazyFileRoute("/login")({
  component: LoginPage,
  // not found component boundary
  notFoundComponent: NotFoundComponent,
});

function LoginPage() {
  const navigate = useNavigate();

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
          variant="secondary"
          size="lg"
          className="mt-8 w-full max-w-sm py-8 text-lg"
          onClick={() => {
            setCookie("isLoggedIn", "true");

            navigate({
              to: "/",
            });
          }}
        >
          Login with KFUPM Email
        </Button>
      </div>
    </main>
  );
}

export default LoginPage;
