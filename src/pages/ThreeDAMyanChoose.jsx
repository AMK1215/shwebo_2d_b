import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const ThreeDAMyanChoosePage = ({quickSelect, addNumber, digits}) => {
  const [nums, setNums] = useState(digits);
  const [kwat, setKwat] = useState([]);
  const apu = ["111", "222", "333", "444", "555", "666", "777", "888", "999"];
  const kwat100 = [
    "000-099",
    "100-199",
    "200-299",
    "300-399",
    "400-499",
    "500-599",
    "600-699",
    "700-799",
    "800-899",
    "900-999",
  ];

  // const checkKwat = () => {
  //   if(index === 0){
  //     for (let i = 0; i < 100; i++) {
  //         let formattedNumber = i.toString().padStart(3, '0');
  //         num.push(formattedNumber);
  //         setNums([...num, num]);
  //     }
  //   }
  // }

  // const choose100 = (index) => {
  //   let num = [];
  //   if(index === 0){
  //     for (let i = 0; i < 100; i++) {
  //         let formattedNumber = i.toString().padStart(3, '0');
  //         num.push(formattedNumber);
  //     }
  //     setNums([...num, num]);
  //   }
  //   if(index === 1){
  //     for (let i = 100; i < 200; i++) {
  //         let formattedNumber = i.toString().padStart(3, '0');
  //         num.push(formattedNumber);
          
  //     }
  //     setNums([...num, num]);
  //   }
  //   if(index === 2){
  //     for (let i = 200; i < 300; i++) {
  //         let formattedNumber = i.toString().padStart(3, '0');
  //         num.push(formattedNumber);
          
  //     }
  //   }
  //   if(index === 3){
  //     for (let i = 300; i < 400; i++) {
  //         let formattedNumber = i.toString().padStart(3, '0');
  //         num.push(formattedNumber);
          
  //     }
  //   }
  //   if(index === 4){
  //     for (let i = 400; i < 500; i++) {
  //         let formattedNumber = i.toString().padStart(3, '0');
  //         num.push(formattedNumber);
          
  //     }
  //   }
  //   if(index === 5){
  //     for (let i = 500; i < 600; i++) {
  //         let formattedNumber = i.toString().padStart(3, '0');
  //         num.push(formattedNumber);
          
  //     }
  //   }
  //   if(index === 6){
  //     for (let i = 600; i < 700; i++) {
  //         let formattedNumber = i.toString().padStart(3, '0');
  //         num.push(formattedNumber);
          
  //     }
  //   }
  //   if(index === 7){
  //     for (let i = 700; i < 800; i++) {
  //         let formattedNumber = i.toString().padStart(3, '0');
  //         num.push(formattedNumber);
          
  //     }
  //   }
  //   if(index === 8){
  //     for (let i = 800; i < 900; i++) {
  //         let formattedNumber = i.toString().padStart(3, '0');
  //         num.push(formattedNumber);
          
  //     }
  //   }
  //   if(index === 9){
  //     for (let i = 900; i < 1000; i++) {
  //         let formattedNumber = i.toString().padStart(3, '0');
  //         num.push(formattedNumber);
          
  //     }
  //   }
  // };
  // console.log(nums);

  return (
    <>
      <div className="">
        <button className="btn btn-sm btn-outline-light" onClick={quickSelect}>
          <i className="fas fa-arrow-left"></i>
        </button>
        <div className="my-3">
          <p className="mb-2 text-center">(3)လုံးပူး ဂဏန်းများ</p>
          <div className="border rounded-3 p-3 d-flex align-items-center gap-3 flex-wrap">
            {apu.map((number, index) => {
              return (
                <div
                  key={index}
                  className={`rounded-3 tonelonepuNumber cursor-pointer ${
                    digits.includes(number) && "bg-pink text-white "
                  }`}
                  onClick={() => addNumber(number)}
                >
                  {number}
                </div>
              );
            })}
          </div>
        </div>
        <div className="my-3 container">
          <p className="mb-2 text-center">အကွက် ၁၀၀</p>
          <div className="border rounded-3 p-3 row justify-content-center">
            {kwat100.map((number, index) => {
              return (
                <div
                  key={index}
                  className={`rounded-3 kwat100Number col-4 me-2 text-center mb-2 p-2 ${
                    kwat.includes(index) ? "bg-pink text-white " : ""
                  }`}
                  onClick={() => [
                    choose100(index),
                    setKwat([...kwat, index]),
                  ]}
                >
                  {number}
                </div>
              );
            })}
          </div>
        </div>
        <div className="d-flex">
          <p className="me-2">
            ဂဏန်းအရေအတွက်: 
          </p>
          <h5 className="fw-bold d-inline">303</h5>
        </div>
        <Form className="mt-4 pb-5">
          <small className="fw-semibold">လောင်းကြေးထည့်ပါ။</small>
          <Form.Group
            className="mb-3 mt-1"
            controlId="exampleForm.ControlInput1"
          >
            <Form.Control type="number" placeholder="အနည်းဆုံး ၁၀၀ကျပ်" />
          </Form.Group>
        </Form>
      </div>
      {/* <div className="py-2 twoDBetBtns mx-auto d-flex gap-2 justify-content-center">
        <button className=" chooseNumDelBtn  py-2 px-4 rounded-3">
          ဖျက်မည်
        </button>
        <button className=" bg-pink text-white py-2 px-4 rounded-3">
          <Link to={"/3d/confirm"}>
            {" "}
            <small>ထိုးမည်</small>
          </Link>
        </button>
      </div> */}
    </>
  );
};

export default ThreeDAMyanChoosePage;
