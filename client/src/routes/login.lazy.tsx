import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div
        className="backdrop-blur-lg rounded-lg shadow-lg p-10"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)', 
          border: '2px solid rgba(255, 255, 255, 0.5)', 
          width: '450px', 
          height: '400px', /
        }}
      >
        <h1 className="text-center text-3xl font-bold mb-8 whitespace-nowrap">
          Welcome to Mafqood!
        </h1>

        <form className="space-y-4">
          <div className="flex flex-col">
            <label className="text-left text-gray-700 mb-1">Enter Email</label>
            <Input type="email" placeholder="Enter your KFUPM email" />
          </div>

          <div className="flex flex-col">
            <label className="text-left text-gray-700 mb-1">Enter Password</label>
            <Input type="password" placeholder="Enter your password" />
          </div>

          <Button type="submit" className="w-full">Log in!</Button>
        </form>
      </div>
    </div>
  );
}

// mahmoud i was forced to do it lil bro :(
document.body.style.backgroundImage = "url('/src/assets/kfupm.png')";
document.body.style.backgroundSize = "cover";
document.body.style.backgroundPosition = "center";
document.body.style.width = "100vw";
document.body.style.height = "100vh";

export default LoginPage;
