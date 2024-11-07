import { getMarketItemDetailsSample } from '@/lib/sample-api'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/market/$itemId')({
  component: ItemDetails,
})

function ItemDetails() {
  const { itemId } = Route.useParams()

  const itemDetails = getMarketItemDetailsSample({
    itemId,
  })

  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-200 p-8">
      <div
        className="mb-10 flex rounded-[35px] bg-white p-10 shadow-lg"
        style={{ width: '1500px', height: '700px' }}
      >
        <img
          src="/src/assets/placeholder.png"
          alt="Item Image"
          className="h-[600px] w-[650px] rounded-[16px] object-cover"
        />

        <div className="ml-10 flex flex-col justify-between">
          <div>
            <h2 className="text-4xl font-bold">Lamp</h2>
            <span className="mt-2 inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
              Tag
            </span>
            <h3 className="mt-4 text-3xl font-bold">$50</h3>
            <p className="mt-2 text-lg text-gray-600">
              Very good lamp, bright light, easy on the eyes
            </p>
          </div>

          <button className="mt-8 w-1/2 rounded-[57px] bg-[#64748B] py-3 text-lg font-medium text-white">
            Get In Contact
          </button>
        </div>
      </div>

      <div
        className="rounded-[35px] bg-white p-5 shadow-lg"
        style={{ width: '1500px', height: '350px' }}
      >
        <h3 className="mb-4 text-[1.75rem] font-semibold">Similar Items</h3>
        <div className="flex space-x-4 overflow-x-auto">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="flex flex-col rounded-[16px] bg-[#64748B] p-3 text-white"
              style={{ width: '210px', height: '250px' }}
            >
              <img
                src="/src/assets/placeholder.png"
                alt="Similar Item"
                className="h-[177px] w-[188px] rounded-[16px] object-cover"
              />
              <p className="mt-2 text-left text-lg font-medium">
                Name of the item
              </p>
              <p className="text-left text-lg font-medium">Price</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

export default ItemDetails
