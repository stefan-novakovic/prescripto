import Banner from '../components/Banner';
import Header from '../components/Header';
import SpecialityMenu from '../components/SpecialityMenu';
import TopDoctors from '../components/TopDoctors';

const Home = () => {
   return (
      <div className="flex flex-1 flex-col">
         <Header />
         <SpecialityMenu />
         <TopDoctors />
         <Banner />
      </div>
   );
};
export default Home;
