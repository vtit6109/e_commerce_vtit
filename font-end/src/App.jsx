// import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';

import './App.css';

import Header from './components/Layouts/HeaderComponent';
import Footer from './components/Layouts/FooterComponent';
import BreadcrumbComponent from '../src/components/Layouts/BreadCrumbComponent';

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
              <BreadcrumbComponent />
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
