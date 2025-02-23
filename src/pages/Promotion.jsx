import React from 'react'
import AccountInfo from '../components/AccountInfo'
import p1 from '../assets/img/p1.png'
import p2 from '../assets/img/p2.png'
import p3 from '../assets/img/p3.png'
 import p4 from '../assets/img/p4.png'
import { Link } from 'react-router-dom'

const PromotionPage = () => {
    const imgs=[p1,p2,p3,p4,p1];
  return (
    <div>
      <AccountInfo/>
      <div className="py-3 px-2 px-sm-3 pb-5 mb-5">
        {imgs.map((item,index)=>{
            return <Link key={index} to={'/promotion/'+index}>
            <div style={{background:'#2b3576'}}  className='d-flex align-items-center gap-3 p-2 rounded-4 mb-3 cursor-pointer'>
                <img src={item} style={{width:'70px',height:'70px'}} />
                <div>
                    <p className="fw-bold">Title goes here</p>
                    <small>Lorem ipsum dolor sit amet consectetur adipisicing elit...</small>
                </div>
            </div>
            </Link>
        })}
      </div>
    </div>
  )
}

export default PromotionPage
