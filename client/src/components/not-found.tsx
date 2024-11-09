import notFoundCat from "../assets/not-found-cat.svg";

// 404 page component to display when the user tries to access a page that doesn't exist
export function NotFoundComponent() {
  return (
    <div className="mx-auto mt-auto w-1/2 p-10">
      <img src={notFoundCat} alt="img" />
    </div>
  );
}
