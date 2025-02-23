import React from 'react'
import { HiMiniShoppingBag } from "react-icons/hi2";
import '../assets/css/userWallet.css'
import { TbPlus } from "react-icons/tb";
import bag from '../assets/img/moneyBag.png'
import shoppingBag from '../assets/img/shoppingBag.png'
import { Link, useLocation } from 'react-router-dom';

const UserWallet = ({user}) => {

  const location=useLocation();
  const except=['/2d/bet','/3d/bet'];

  
  return (
   <div className="userWalletContainer py-2 px-2  ">
     <div className='text-white mb-2' style={{background:' #2B3576'}}>
      <div className="d-flex align-items-center justify-content-between">
        <div className='d-flex align-items-center gap-1'>
            <img src={shoppingBag} className='moneyBag' />
            <small>ကျွန်ုပ်ပိုက်ဆံအိတ်</small>
        </div>
       <div className="d-flex align-items-center gap-2">
       <h5  style={{fontSize:'18px'}} className='fw-bold mt-2'>{user?.main_balance && Number(user?.main_balance).toLocaleString()} Ks</h5>
        <Link to={'/wallet/internal-transfer'} className="plusSign">
            <TbPlus size={18} />
        </Link>
       </div>
      </div>
    </div>
   {!except.includes(location.pathname) &&  <div className='text-white' style={{background:' #2B3576'}}>
    <div className="d-flex align-items-center justify-content-between">
      <div className='d-flex align-items-center gap-1'>
          <img src={bag} className='moneyBag' />
          <small>ဂိမ်းပိုက်ဆံအိတ်</small>
      </div>
     <div className="d-flex align-items-center gap-2">
     <h5 style={{fontSize:'18px'}} className='fw-bold'>{user?.game_balance && Number(user?.game_balance).toLocaleString()} Ks</h5>
      <Link to={'/wallet/internal-transfer'} className="plusSign">
          <TbPlus size={18} />
      </Link>
     </div>
    </div>
  </div> }
   </div>
  )
}

export default UserWallet
