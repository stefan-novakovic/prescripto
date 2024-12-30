import { Link } from 'react-router-dom';

type MissingProps = {
   pod: 'page' | 'doctor'; // pod meaning page or doctor
};

const Missing = ({ pod }: MissingProps) => {
   return (
      <section className="flex flex-1 flex-col min-h-[calc(100vh-77px-16px)]">
         <h1 className="text-3xl font-bold my-6">{pod === 'page' ? 'Page' : 'Doctor'} Not Found</h1>
         <p className="mb-2">
            {pod === 'page'
               ? "Sorry, the page you're looking for doesn't exist."
               : 'Sorry, a doctor with this ID does not exist.'}
         </p>
         <Link to={pod === 'page' ? '/' : '/doctors'} className="w-fit text-primary hover:underline">
            {pod === 'page' ? 'Go to Home page' : 'Go to All Doctors page'}
         </Link>
      </section>
   );
};
export default Missing;
