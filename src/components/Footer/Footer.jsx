import React from 'react'
import '../../assets/css/footer.css'
import home from '../../assets/img/homeIcon.png'
import promotion from '../../assets/img/promotion.png'
import user from '../../assets/img/user.png'
import moneyBag from '../../assets/img/moneyBag.png'
import phone from '../../assets/img/phone.png'
import { Link, NavLink, useLocation } from 'react-router-dom'

export default function Footer() {
  const location=useLocation();
  const footer1=[
    {img:moneyBag,title:'ပိုက်ဆံံအိတ်',link:'/wallet'},
    {img:promotion,title:'ပရိုမိုရှင်း',link:'/promotion'},
    // {img:home,title:'ပင်မ',link:'/'},
    ]
    const footer2=[ {img:phone,title:'ဝန်ဆောင်မှုဖုန်း',link:'/help'},
    {img:user,title:'ကျွန်ုပ်',link:'/account'},]
    if(location.pathname.includes('/2d') ||location.pathname.includes('/3d')) return null;
  return (
    <footer className='pt-1 px-2 pb-2 text-white gap-0 d-flex justify-content-between  '>
      {footer1.map((item,index)=>{
        return <NavLink className={'text-center'} to={item.link} key={index}>
          <img src={item.img} className='mx-auto' width={25} />
          <p className='footerText mt-1'>{item.title}</p>
        </NavLink>
      })}
      <NavLink className={'  text-center'} to={'/'}  >
          <img src={home} className='mx-auto footerHomeImg' />
          <p className='footerText'>ပင်မ</p>
        </NavLink>
      {footer2.map((item,index)=>{
        return <NavLink className={'text-center'} to={item.link} key={index}>
          <img src={item.img} className='mx-auto' width={20} />
          <p className='footerText'>{item.title}</p>
        </NavLink>
      })}
    </footer>
  )
}
