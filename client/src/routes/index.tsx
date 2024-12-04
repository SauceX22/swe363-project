import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { MarketItemCard } from "@/components/market-item-card";
import { FoundItemCard } from "@/components/found-item-card";
import { getMarketItems } from "@/routers/market";
import { NotFoundComponent } from "@/components/not-found";

// routing for the page
export const Route = createFileRoute("/")({
  component: MainPage,
  // not found component boundary
  notFoundComponent: NotFoundComponent,
  loader: async () => {
    const { items } = await getMarketItems();
    return { items };
  },
});

function MainPage() {
  // get the items from the market to display
  const { items: initialItems } = Route.useLoaderData();

  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-200">
      <div className="relative w-full">
        <div className="h-[600px] w-full overflow-hidden sm:h-[700px] lg:h-[800px]">
          <img
            className="h-full w-full bg-black object-cover opacity-60"
            src="/src/assets/kfupm.jpg"
            alt="KFUPM campus"
          />
        </div>
        <div className="absolute left-0 top-0 h-full w-full bg-slate-600 opacity-40"></div>
        <div className="absolute left-0 top-1/2 flex w-full -translate-y-1/2 flex-col items-center justify-center p-4 text-center text-white">
          <h1 className="text-5xl font-bold sm:text-7xl lg:text-9xl">
            Mafqood
          </h1>
          <p className="mb-6 mt-4 text-xl sm:mt-6 sm:text-2xl lg:mt-10 lg:text-3xl">
            Whether you lost it or need it!
          </p>
          <Link to="/found" className="w-fit">
            <Button className="h-10 w-40 sm:h-12 sm:w-48">Find it Now</Button>
          </Link>
        </div>
      </div>

      <div className="mb-10 mt-10 w-full px-4 sm:mb-14 sm:mt-14 sm:px-10">
        <div className="mb-6 flex items-center justify-between sm:mb-8">
          <h2 className="text-2xl font-bold text-[#64748B] sm:text-[1.75rem]">
            Recently Found
          </h2>
          <Link to="/found" className="w-fit">
            <p className="text-[#64748B]">Show all</p>
          </Link>
        </div>
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {initialItems.map((item: any) => (
            <FoundItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      <div className="flex w-full flex-col bg-[#64748B] lg:h-[600px] lg:flex-row lg:justify-evenly">
        <img
          className="mx-auto h-auto max-w-full object-contain p-8 lg:w-1/2"
          src="/src/assets/worried-bro.svg"
          alt="Worried person illustration"
        />
        <div className="flex flex-col justify-center p-8 text-white lg:w-1/2 lg:p-20">
          <h2 className="mb-2 text-2xl font-semibold">About Mafqood</h2>
          <p className="mb-4 text-sm sm:text-base">
            Mafqood is a platform dedicated to helping you find items lost
            within KFUPM. Whether you've misplaced something or found an item on
            campus, Mafqood connects you directly with others to reunite items
            with their owners. Simply browse through posted items or add your
            own find, making it easy to recover what’s lost.
          </p>
          <Link to="/found" className="w-fit">
            <Button className="w-24 bg-white text-[#64748B] hover:bg-white hover:text-[#64748B] hover:shadow-xl">
              Find it Now
            </Button>
          </Link>
        </div>
      </div>

      <div className="mb-10 mt-10 w-full px-4 sm:mb-14 sm:mt-14 sm:px-10">
        <div className="mb-6 flex items-center justify-between sm:mb-8">
          <h2 className="text-2xl font-bold text-[#64748B] sm:text-[1.75rem]">
            Recently Added
          </h2>
          <Link to="/market" className="w-fit">
            <p className="text-[#64748B]">Show all</p>
          </Link>
        </div>
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {initialItems.map((item: any) => (
            <MarketItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      <div className="flex w-full flex-col items-center justify-between bg-[#64748B] p-8 sm:flex-row sm:p-14">
        <h2 className="mb-4 text-2xl text-white sm:mb-0 sm:text-3xl">
          Need Help?
        </h2>
        <Link to="/contact-us" className="w-fit">
          <Button className="w-full bg-white text-[#64748B] hover:bg-white hover:text-[#64748B] hover:shadow-xl sm:w-60">
            Contact Us
          </Button>
        </Link>
      </div>

      <footer className="flex w-full flex-col items-center bg-[#475569] p-8 sm:p-14">
        <p className="text-lg text-white">Mafqood</p>
        <hr className="my-4 w-full border-t border-white sm:my-6" />
        <p className="text-sm text-white">© Mafqood, Inc. 2024</p>
      </footer>
    </main>
  );
}
