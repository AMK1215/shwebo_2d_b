import React from 'react'
import girl from '../assets/img/girl.png'
import '../assets/css/message.css'
const MessagePage = () => {
    const user1=[
        'Lorem ipsum dolor sit amet, consectetur','Lorem ipsum dolor sit amet, consectetur'
    ]
    const user2=[
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    ]
  return (
    <div className='pb-5 mb-5'>
      <div className="p-2 pt-0 bg-pink d-flex align-items-center gap-2">
        <img src={girl} style={{width:'40px',height:'40px',borderRadius:'20px'}}  />
        <div>
        <p className="fw-bold">ShweBo 2D</p>
        <small>Active</small>
        </div>
      </div>
      <div  style={{width:'max-content'}} className="my-3 bg-white fw-bold text-black rounded py-1 px-3 text-center mx-auto">
        Today
      </div>
      <div className="px-2 px-sm-3">
        <div className="admin  ">
            {user1.map((item,index)=>{
                return  <div key={index} className='rounded-3 mb-2 bg-pink text-white p-2 rounded-lg'>
                    {item}
                </div>
            })}
        </div>
        <div className="user mt-4 ">
           <div className="d-flex gap-2">
           <img src={girl} style={{width:'40px',height:'40px',borderRadius:'20px'}}  />

           <div>
           {user2.map((item,index)=>{
                return  <div key={index} className='rounded-3 mb-2 bg-white text-black p-2 rounded-lg'>
                    {item}
                </div>
            })}
           </div>
           </div>
        </div>
      </div>

    </div>
  )
}

export default MessagePage
