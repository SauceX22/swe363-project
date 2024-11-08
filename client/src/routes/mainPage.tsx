import { createFileRoute, Link } from '@tanstack/react-router'
import kfupmImg from '../assets/kfupm.jpg'
import worried from '../assets/worried-bro.svg'
import { Button } from '@/components/ui/button'
import { MarketItemCard } from '@/components/market/market-item-card'
import { FoundItemCard } from '@/components/found/found-item-card'
import { getFoundItems } from '@/routers/found'

export const Route = createFileRoute('/mainPage')({
  component: MainPage,
  loader: async () => {
    const { items } = await getFoundItems()
    return { items }
  },
})

function MainPage() {
  const { items: initialItems } = Route.useLoaderData()

  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-200">
      <div className="relative">
        <div className="h-[800px] w-screen overflow-hidden max-lg:h-[600px]">
          <img
            className="w-screen bg-black object-cover opacity-60"
            src={kfupmImg}
            alt="img"
          />
        </div>
        <div className="absolute left-0 top-0 h-full w-full bg-slate-600 opacity-40">
          {' '}
        </div>
        <div className="absolute top-60 flex w-full flex-col items-center justify-center p-6 text-center text-white">
          <h1 className="text-9xl font-bold">Mafqood</h1>
          <p className="mb-6 mt-10 text-3xl">Wither you lost it or need it!</p>
          <Link to={`/found`} className="w-fit">
            <Button className="h-12 w-48"> Find it Now </Button>
          </Link>
        </div>
      </div>

      <div className="mb-14 mt-14 w-full rounded-[35px] pb-10 pl-10">
        <div className="mb-8 flex items-center justify-between pr-10">
          <h2 className="text-[1.75rem] font-bold text-[#64748B]">
            Recently Added
          </h2>
          <Link to={`/found`} className="w-fit">
            <p className="text-[#64748B]">Show all</p>
          </Link>
        </div>
        <div className="flex space-x-4 overflow-x-auto">
          {initialItems.map((item: any) => (
            <FoundItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      <div className="flex-row flex h-[600px] w-screen justify-evenly bg-[#64748B]  ">
        <img className='size-auto' src={worried} alt="img" />
        <div className="flex h-full flex-col justify-center text-white p-20">
          <h2 className="mb-2 text-2xl font-semibold">About Mafqood</h2>
          <p className="text-md mb-4">
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
            fugit, sed quia consequuntur magni dolores eos qui ratione
            voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem.
          </p>
          <Link to={`/found`} className="w-fit">
            <Button className="w-24 bg-white text-[#64748B] hover:bg-white hover:text-[#64748B] hover:shadow-xl">
            
              Find it Now
            </Button>
          </Link>
        </div>
      </div>

      <div className="mb-14 mt-14 w-full rounded-[35px] pb-10 pl-10">
        <div className="mb-8 flex items-center justify-between pr-10">
          <h2 className="text-[1.75rem] font-bold text-[#64748B]">
            Recently Added
          </h2>
          <Link to={`/market`} className="w-fit">
            <p className="text-[#64748B]">Show all</p>
          </Link>
        </div>
        <div className="flex space-x-4 overflow-x-auto">
          {initialItems.map((item: any) => (
            <MarketItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      <div className="col-span-2 flex h-fit w-screen justify-between p-14 bg-[#64748B]">
        <h2 className="text-white text-3xl">Need Help?</h2>
        <Link to={`/contact-us`} className="w-fit">
          <Button className=" w-60 bg-white text-[#64748B] hover:bg-white hover:text-[#64748B] hover:shadow-xl">
            Contact Us
          </Button>
        </Link>
      </div>

      <footer className="flex-col flex w-screen p-14 bg-[#475569] items-center">
        <p className="text-white text-lg">Mafqood</p>
        <hr className="w-screen my-6 bg-white border-1" />
        <p className="text-white text-sm">© Mafqood, Inc. 2024</p>
      </footer>
    </main>
  )
}

export default MainPage
