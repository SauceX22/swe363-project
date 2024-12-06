import { NotFoundComponent } from "@/components/not-found";
import { Button } from "@/components/ui/button";
import { setCookie } from "@/lib/utils";
import { SignInButton } from "@clerk/clerk-react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useSignIn } from "@clerk/clerk-react";

// routing for the page
export const Route = createFileRoute("/login")({
  component: LoginPage,
  // not found component boundary
  notFoundComponent: NotFoundComponent,
});

function LoginPage() {
  const navigate = useNavigate();
  const { signIn } = useSignIn();

  const handleLogin = async () => {
    try {
      // Trigger OAuth sign-in for the specific provider
      await signIn?.authenticateWithRedirect({
        strategy: "oauth_microsoft", // Replace with your specific provider's strategy
        redirectUrl: "/market",
        redirectUrlComplete: "/market",
      });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <main
      className="flex h-screen w-screen items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/login.png')" }}
    >
      <div
        className="flex flex-col items-center justify-center rounded-[70px] border-2 border-white/50 bg-[#64748B] shadow-lg"
        style={{ width: "736px", height: "756px" }}
      >
        <h1 className="mb-8 text-center text-5xl font-bold text-white">
          Welcome to Mafqood!
        </h1>

        <img
          src="/assets/loginIcon.png"
          alt="Login Icon"
          className="h-[382px] w-[500px]"
        />
        {/* <SignInButton forceRedirectUrl="/market" mode="modal"> */}
        <Button
          type="button"
          variant="secondary"
          size="lg"
          className="mt-8 w-full max-w-sm py-8 text-lg"
          onClick={handleLogin}
        >
          Login with KFUPM Email
        </Button>
        {/* </SignInButton> */}
      </div>
    </main>
  );
}

export default LoginPage;
