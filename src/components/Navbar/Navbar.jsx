import React from 'react'
import { IoMdRefresh } from "react-icons/io";
import { IoArrowBack } from "react-icons/io5";
import { Link, useLocation } from 'react-router-dom';
import moneyBag from '../../assets/img/moneyBag.png';
import user2 from '../../assets/img/user2.png';
import '../../assets/css/slot.css'

 export default function Navbar() {
  
  const location=useLocation();
  return (
    <div  style={{background:'#FF1267'}} className='pt-3 pb-2 px-3'>
      <div className='d-flex align-items-center justify-content-between  '>
        <IoArrowBack onClick={()=>history.back()} size={28} />

        <h4 className='text-white shweboTitle'>
          <Link to={'/'}>
          {location.pathname.includes('/2d') ? 'ShweBo 2D' : location.pathname.includes('/3d') ? 'ShweBo 3D' : 'ShweBo Slots'  }
          </Link>
        </h4>
        <IoMdRefresh size={28} className='cursorPointer' onClick={() => {
          window.location.reload();
        }} />
      </div>
    </div>
  )
}
