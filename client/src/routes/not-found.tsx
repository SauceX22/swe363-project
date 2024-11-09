import { createFileRoute, Link } from '@tanstack/react-router'
import notFoundCat from '../assets/not-found-cat.svg'

export const Route = createFileRoute('/not-found')({
  component: notFound,
})

function notFound() {

  return (
   <div className='w-1/2 mx-auto p-10 mt-auto'>
    <img  src={notFoundCat} alt="img" />
   </div>
  )
}

export default notFound
