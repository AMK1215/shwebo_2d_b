import React, { useState } from 'react'
import calendar from '../assets/img/calendar.png'
import "../pages/twod.css";



const TwoDResultsPage = () => {

  const [session,setSession]=useState('morning');

  return (
    <div className='pt-4 pb-5 container'>
      <h5 className="text-center fw-bold mb-4">2D ထွက်ဂဏန်းများ</h5>
      <div  className="d-flex align-items-center justify-content-center gap-3">
        <div onClick={()=>setSession('morning')} className={`text-center rounded-4 py-3 px-1 w-100 ${session == "morning" ? 'activeBtn' : ''}`} style={{background: 'linear-gradient(104.11deg, #212D77 8.54%, #0788FF 92.1%)', cursor: "pointer"
        }}> 
        <img src={calendar} style={{width:'20px',height:'20px'}} /> 
        <p>Morning</p>
        <small>2D ထီပေါက်စဉ်</small>
        </div>
        <div onClick={()=>setSession('evening')}  className={`text-center rounded-4 py-3 px-1 w-100 ${session == "evening" ? 'activeBtn' : ''}`} style={{background: 'linear-gradient(104.11deg, #212D77 8.54%, #0788FF 92.1%)', cursor: "pointer"
        }}> 
        <img src={calendar} style={{width:'20px',height:'20px'}} /> 
        <p>Evening</p>
        <small>2D ထီပေါက်စဉ်</small>
        </div>
      </div>
      <div className="my-4 px-2">
        {session==='morning' ? <div>
          {[1,2,3].map((item)=>{
            return <div  key={item} className='py-2 px-2 rounded-3 mb-3' style={{background:'#2C315D'}} >
            <div className="d-flex align-items-center justify-content-between">
              <p className="fw-bold">Session</p>
              <p className="fw-bold">Date</p>
              <p className="fw-bold">2D</p>
             </div>
             <div className="d-flex align-items-center justify-content-between">
              <p >Morning</p>
              <p  >10-11-2023 Friday 04:07 PM</p>
              <p  className='fw-bold' style={{color:'#FF1267'}}>83</p>
             </div>
            </div>
          })}
        </div>  : <div>
        {[1,2,3].map((item)=>{
            return <div  key={item} className='py-2 px-2 rounded-3 mb-3' style={{background:'#2C315D'}} >
            <div className="d-flex align-items-center justify-content-between">
              <p className="fw-bold">Session</p>
              <p className="fw-bold">Date</p>
              <p className="fw-bold">2D</p>
             </div>
             <div className="d-flex align-items-center justify-content-between">
              <p >Evening</p>
              <p  >10-11-2023 Friday 04:07 PM</p>
              <p  className='fw-bold' style={{color:'#FF1267'}}>83</p>
             </div>
            </div>
          })}
        </div> }
      </div>
    </div>
  )
}

export default TwoDResultsPage
