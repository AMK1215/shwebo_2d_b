import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { AuthContextProvider } from './context/AuthContext';

function App() {
  return (
    <>
      <Navbar />
      <div className='p-0 m-0 ' style={{ overflowX:'hidden'}}>
      <Outlet/>
      </div>
      <Footer/>
    </>
  );
}

export default App;