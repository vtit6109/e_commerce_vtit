import { Outlet } from 'react-router-dom';

import './App.css';

import Header from './components/Layouts/Header/Header';
import Footer from './components/Layouts/Footer/Footer';
import Breadcrumb from './components/Layouts/BreadCrumb/BreadCrumb';

const App = () => {
  return (
    <>
      <div className="mx-auto">
        <div className="max-w-[1440px] mx-auto py-2">
          <Header />
        </div>
        <div className="bg-slate-100 min-h-[66vh] py-4">
          <div className="max-w-[1440px] mx-auto">
            <div className="mx-[20px] mb-2">
              <Breadcrumb />
            </div>
            <div className="">
              <Outlet />
            </div>
          </div>
        </div>
        <div className="">
          <div className="max-w-[1440px] mx-auto p-4">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};
export default App;
