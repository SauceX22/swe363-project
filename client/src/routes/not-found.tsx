import { createFileRoute } from "@tanstack/react-router";
import notFoundCat from "../assets/not-found-cat.svg";

export const Route = createFileRoute("/not-found")({
  component: notFound,
});

function notFound() {
  return (
    <div className="mx-auto mt-auto w-1/2 p-10">
      <img src={notFoundCat} alt="img" />
    </div>
  );
}

export default notFound;
