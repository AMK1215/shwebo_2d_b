import React from 'react'
import '../assets/css/live.css'
const ThreeDLivePage = () => {
  return (
    <div className='py-4'>
      <div className="mx-auto liveResult" >990</div>
      <p className="text-center liveText mt-2">2023-11-16 (Thursday)</p>
      <div className="my-4 px-2">
        {[1,2,3,4,5].map((item)=>{
            return <div key={item} style={{background:'#2C315D'}} className=" cursor-pointer d-flex align-items-center justify-content-between mb-3 rounded-3 px-2  py-3">
                <p >2023-11-16 </p>
                <p className="fw-bold">990</p>
            </div>
        })}
      </div>
      </div>
  )
}

export default ThreeDLivePage
