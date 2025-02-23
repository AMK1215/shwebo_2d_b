import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function DepositModal({amount, handleConfirm, channels}) {
  const [show, setShow] = useState(false);

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

  
//   console.log(channels);


  return (
    <>
      <Button className="btn btn-danger rounded-4 w-100" variant="primary" onClick={handleShow}>
        ဆက်လုပ်မည်
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <small style={{ fontSize: "16px" }}>
                ငွေဖြည့်မည့်အကောင့်တစ်ခုကိုရွေးပါ။
            </small>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {channels && channels.map((channel, index) => (
                <Link key={index} onClick={() => handleConfirm(channel.id)}>
                    <div className="d-flex gap-3 pb-3">
                        <div>
                            <img src={channel.payment_type.img_url} className='rounded-2' width="50px" alt={channel.payment_type.image} />
                        </div>
                        <div>
                            <span className='d-block'>{channel.account_name}</span>
                            <span>{channel.account_no}</span>
                        </div>
                    </div>
                </Link>
            ))}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DepositModal;