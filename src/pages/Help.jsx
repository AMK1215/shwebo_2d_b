import React, { useContext, useEffect } from 'react'
import tele from '../assets/img/tele.png';
import viber from '../assets/img/viber.png';
import AccountInfo from '../components/AccountInfo';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const HelpPage = () => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) {
      navigate('/login');
    }
  }, [auth, navigate]);

  return (
    <div >
      <AccountInfo/>
      <div className="py-4 px-2 px-sm-3">
      <p className='mb-2 text-center' style={{color:'#ABB1CC'}}>ကျွန်ုပ်တို့ကို ဆက်သွယ်ရန်</p>
      <p className=' ' style={{color:'#ABB1CC'}}>အောက်ပါတို့သည် ShweBo2D တရားဝင်ဖုန်းနံပါတ် များဖြစ်ပါသည်။</p>
      <div className="mt-4">
        {[1,2,3].map((item,index)=>{
          return <div key={index} className='cursor-pointer p-2 d-flex align-items-center justify-content-between rounded-3 bg-white text-black border mb-2'>
            <p className='fw-bold' style={{color:'#253490'}}>ငွေဖြည့် /ငွေထုတ်</p>
            <div>
              <img src={tele} className='me-2' style={{width:'30px',height:'30px'}} />
              <img src={viber} style={{width:'30px',height:'30px'}}  />
            </div>
          </div>
        })}
      </div>
      </div>
    </div>
  )
}

export default HelpPage
