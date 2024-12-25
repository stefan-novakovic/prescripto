import Banner from '../components/Banner';
import Header from '../components/Header';
import SpecialityMenu from '../components/SpecialityMenu';
import TopDoctors from '../components/TopDoctors';

const Home = () => {
   return (
      <div className="flex flex-1 flex-col w-full 2xl:max-w-[1550px] 2xl:mx-auto mb-24 md:mb-32">
         <Header />
         <SpecialityMenu />
         <TopDoctors />
         <Banner />
      </div>
   );
};
export default Home;
