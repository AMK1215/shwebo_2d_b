import React from 'react'
import '../assets/css/profile.css'
import { BiPhone, BiUser } from 'react-icons/bi';
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const UserProfilePage = () => {
  return (
    <div>
      {/* <AccountInfo/> */}
      <h5 className="fw-semibold text-center mt-4 mb-2">ကိုယ်ရေးအကျဉ်း</h5>
       <div className='myProfileImg mt-3 mx-auto border d-flex align-items-center justify-content-center' >
        <FaUser size={20} color='#2A346D' />
       </div>
      <form className='px-3' >
           <div className="mb-3 ">
            <label htmlFor="password" className="form-label text-white mb-2">
               <BiUser/>  <small className='fw-semibold'>Username</small> </label>
            <div className=''>
              <input type='text' 
              className='form-control  py-2' 
               />
             </div>
           </div>
           <div className="mb-3 ">
            <label htmlFor="password" className="form-label text-white mb-2">
                <BiPhone/> <small className='fw-semibold'>Phone No</small> </label>
            <div className=''>
              <input type='text' 
              className='form-control  py-2' 
               />
             </div>
           </div>

          <div className="mb-3 mt-4">
            <button  className="btn btn-outline-light  w-100 rounded-3 py-2" type="submit">
                    Update Profile
            </button>
          </div>
          <div className="mb-4 ">
           <Link to={'/change-password'}>
           <button className="btn  w-100 text-white rounded-3 py-2" style={{background:'#FF1267'}} type="submit">
                    Change Password
            </button>
           </Link>
          </div>
        </form>
    </div>
  )
}

export default UserProfilePage
