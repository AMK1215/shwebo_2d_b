import React, { useContext, useEffect } from 'react'
import { MdPassword } from 'react-icons/md'
import { TbPasswordMobilePhone } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom';

const ChangePasswordPage = () => {

  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!auth) {
      navigate('/login');
    }
  }, [auth, navigate]);

  return (
    <div>
       <h5 className="fw-semibold text-center mt-4 mb-3">Change Password</h5>
       <form className='px-3' >
           <div className="mb-3 ">
            <label htmlFor="password" className="form-label text-white mb-2">
               <TbPasswordMobilePhone size={22} />  <small className='fw-semibold'>Old Password</small> </label>
            <div className=''>
              <input type='password' 
              className='form-control  py-2' 
               />
             </div>
           </div>
           <div className="mb-3 ">
            <label htmlFor="password" className="form-label text-white mb-2">
               <MdPassword  size={22}  />  <small className='fw-semibold'>New Password</small> </label>
            <div className=''>
              <input type='password' 
              className='form-control  py-2' 
               />
             </div>
           </div>
           <div className="mb-3 ">
            <label htmlFor="password" className="form-label text-white mb-2">
               <MdPassword  size={22}  />  <small className='fw-semibold'>Confirm Password</small> </label>
            <div className=''>
              <input type='password' 
              className='form-control  py-2' 
               />
             </div>
           </div>
           <div className="mb-3 mt-4">
            <button  className="btn btn-outline-light  w-100 rounded-3 py-2" type="submit">
                   Submit
            </button>
          </div>
         
        </form>
    </div>
  )
}

export default ChangePasswordPage
