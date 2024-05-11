import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className='h-screen flex flex-col justify-center gap-2 items-center'>
      <h1 className='text-xl'>404: Page Not Found</h1>
      <Link className='underline' to="/">Go to Home</Link>
    </div>
  )
}

export default NotFoundPage