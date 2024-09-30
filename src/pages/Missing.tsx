import { Link } from 'react-router-dom';

const Missing = () => {
   return (
      <div className="flex flex-1 flex-col">
         <h1 className="text-3xl font-bold my-6">Page Not Found</h1>
         <p className="mb-2">Sorry, the page you are looking for does not exist.</p>
         <Link to="/" className="w-fit text-primary hover:underline">
            Go to Home
         </Link>
      </div>
   );
};
export default Missing;
