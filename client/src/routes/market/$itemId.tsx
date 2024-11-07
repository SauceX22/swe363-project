import { getMarketItemDetailsSample } from "@/routers/market";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/market/$itemId")({
  component: ItemDetails,
  loader: async ({ params }) => {
    const { itemId } = params;
    const { item, similarItems } = await getMarketItemDetailsSample({
      itemId,
    });
    // if the id isn't there or something
    if (!item) {
      throw redirect({
        to: "/market",
      });
    }
    return { item, similarItems };
  },
});

function ItemDetails() {
  const { item: itemDetails, similarItems } = Route.useLoaderData();

  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-200 p-4 md:p-8">
      <div className="mb-10 flex flex-col rounded-3xl bg-white p-6 shadow-lg md:flex-row md:p-10 lg:w-11/12 xl:w-10/12">
        <img
          src={itemDetails.image}
          alt={itemDetails.name}
          className="h-64 w-full rounded-2xl object-cover md:h-[600px] md:w-1/2 lg:w-[650px]"
        />

        <div className="mt-6 flex flex-col justify-between md:ml-10 md:mt-0 md:w-1/2">
          <div>
            <h2 className="text-3xl font-bold md:text-4xl">
              {itemDetails.name}
            </h2>
            <span className="mt-2 inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
              {itemDetails.tag}
            </span>
            <h3 className="mt-4 text-2xl font-bold md:text-3xl">
              ${itemDetails.price}
            </h3>
            <p className="mt-2 text-base text-gray-600 md:text-lg">
              {itemDetails.description}
            </p>
          </div>

          <button className="mt-8 w-full rounded-full bg-slate-500 py-3 text-lg font-medium text-white transition-colors hover:bg-slate-600 md:w-1/2">
            Get In Contact
          </button>
        </div>
      </div>

      <div className="rounded-3xl bg-white p-5 shadow-lg lg:w-11/12 xl:w-10/12">
        <h3 className="mb-4 text-2xl font-semibold md:text-[1.75rem]">
          Similar Items
        </h3>
        <div className="relative">
          <div className="scrollbar-hide flex space-x-4 overflow-x-auto pb-4">
            {similarItems.map((item) => (
              <div
                key={item.id}
                className="flex min-w-[210px] flex-col rounded-2xl bg-slate-500 p-3 text-white"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-44 w-full rounded-2xl object-cover"
                />
                <p className="mt-2 text-left text-lg font-medium">
                  {item.name}
                </p>
                <p className="text-left text-lg font-medium">${item.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default ItemDetails;
