import React from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import '../assets/css/threed.css'
const ThreeDResultsPage = () => {
    const threeDListsArray=[
        {id:1,date:'16.11.2023',threeD:'970'},
        {id:2,date:'1.11.2023 ',threeD:'970'},
        {id:3,date:'16.10.2023 ',threeD:'970'},
        {id:4,date:'1.10.2023 ',threeD:'970'},
        {id:5,date:'16.9.2023 ',threeD:'970'},
        {id:6,date:'1.09.2023 ',threeD:'970'},
        {id:7,date:'16.08.2023 ',threeD:'970'},
        {id:8,date:'16.08.2023 ',threeD:'970'},
    ]
  return (
    <div className='twoDBetHistory mx-2 px-2 mx-sm-0 pb-5 mb-5'>
    <h5 className=" my-3 fw-bold text-center text-white" >3D ထွက်ဂဏာန်းများ
</h5>
   
      {threeDListsArray.map((item)=>{
        return <div className="rounded-4 p-2 p-sm-3 mb-3 " style={{background:'#2C355D'}}>
          <h5>{item.time}</h5>
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <h6 className='fw-bold'>Date</h6>
              <h6>{item.date}</h6>
            </div>
            <div>
              <h6 className='fw-bold'>3D</h6>
              <h6>{item.threeD}</h6>
            </div>
            
          </div>
        </div>
      })}
      
      
     </div>
  )
}

export default ThreeDResultsPage
