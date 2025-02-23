import React from 'react'

const ThreeDHolidaysPage = () => {
    const holidays=[
        {data:'05-12-2023',text:"H.M. King Bhumibol Adulyadej The Great's Birthday/ National Day / Father's Day"},
        {data:'11-12-2023',text:"Substitution for Constitution Day (Sunday 10 December 2023)"}
    ]
  return (
    <div className='p-2 p-sm-3'>
      <h5 className="text-center mt-3 mb-3 fw-bold">3D ပိတ်ရက်</h5>
      {holidays.map((item,index)=>{
        return <div key={index} className=" rounded-4  mb-3 py-2 px-3" style={{background:'#2C355D'}}>
            <h6 className="fw-bold text-center">{item.data}</h6>
            <small>{item.text}</small>
        </div>
      })}
    </div>
  )
}

export default ThreeDHolidaysPage
