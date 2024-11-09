import { Outlet } from 'react-router-dom';
import Navbar from '../Header/Navbar';

const Main = () => {
    return (
        <div className='max-w-5xl mx-auto my-6'>
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;