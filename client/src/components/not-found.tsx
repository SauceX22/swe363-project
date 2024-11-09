import notFoundCat from "../assets/not-found-cat.svg";

export function NotFoundComponent() {
  return (
    <div className="mx-auto mt-auto w-1/2 p-10">
      <img src={notFoundCat} alt="img" />
    </div>
  );
}
