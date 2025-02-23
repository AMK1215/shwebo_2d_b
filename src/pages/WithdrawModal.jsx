import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import SmallSpinner from '../components/Loader/SmallSpinner';

function WithdrawModal({amount, handleWithdraw, handlePassword, loading}) {
  const [show, setShow] = useState(false);
  const [eye, setEye] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    if(amount < 1000 || amount < 0){
        toast.error("အနည်းဆုံး ငွေ၁၀၀၀ကျပ် မှစ၍ ထည့်ပေးပါ။", {
            position: "top-right",
            autoClose: 2000,
            theme: 'dark',
            hideProgressBar: false,
            closeOnClick: true
        })
    }else{
        setShow(true);
    }
  }


  return (
    <>
      <Button className="btn btn-danger rounded-4 w-100 mt-5" variant="primary" onClick={handleShow}>
        ဆက်လုပ်မည်
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <div className="d-flex justify-content-end">
              <i className="fas fa-xmark" onClick={handleClose}></i>
          </div>

            <div className="text-center">
              <h5 className="text-primary mb-3">
              ငွေထုတ်ရန်
              </h5>
              <small>
                လျို့ဝှက်နံပါတ်လိုအပ်ပါသည်။
              </small>
            </div>
          
          <div className='mt-5'>
            <label htmlFor="" className="form-label">လျို့ဝှက်နံပါတ်</label>
            <div className='password'>
              <input type={`${eye ? 'text' : 'password'}`} 
              className='form-control border-0 bg-transparent border-bottom border-dark' 
              placeholder="xxxxxxxx"
              onChange={e =>handlePassword(e.target.value)}
              
              />
              <i className={`fa-regular fa-${eye ? 'eye-slash' : 'eye'} text-color`} onClick={()=>setEye(!eye)}></i>
            </div>
          </div>
          <button className="btn btn-danger w-100 rounded-4 py-2 mt-5 mb-3" type="button" onClick={handleWithdraw}>
            {loading && <SmallSpinner />}
            ဆက်လုပ်မည်
          </button>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default WithdrawModal;