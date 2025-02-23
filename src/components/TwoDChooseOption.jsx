import React, { useState } from "react";
import maze from "../assets/img/maze.png";
import flash from "../assets/img/flash.png";
import repeat from "../assets/img/repeat.png";
import dream from "../assets/img/dream.png";
import { Button, Modal, Offcanvas } from "react-bootstrap";
import "../assets/css/chooseNumber.css";

const TwoDChooseOption = ({pathee, frontNumber, backNumber, powerNumber, twentyNumbers, permunated, breakGroup, singleDouble}) => {
  const [isOp1Show, setIsOp1Show] = useState(false);
  const [isOp2Show, setIsOp2Show] = useState(false);
  const [isOp3Show, setIsOp3Show] = useState(false);
  const [isOp4Show, setIsOp4Show] = useState(false);

  const breakNums = [
    {"id" : 1, "group" : "0/10"},
    {"id" : 2, "group" : "1/11"},
    {"id" : 3, "group" : "2/12"},
    {"id" : 4, "group" : "3/13"},
    {"id" : 5, "group" : "4/14"},
    {"id" : 6, "group" : "5/15"},
    {"id" : 7, "group" : "6/16"},
    {"id" : 8, "group" : "7/17"},
    {"id" : 9, "group" : "8/18"},
    {"id" : 10, "group" : "9/19"},
  ];
  const sizes = [
    {"id" : 1, "group" : "ညီအစ်ကို"},
    {"id" : 2, "group" : "ကြီး"},
    {"id" : 3, "group" : "ငယ်"},
    {"id" : 4, "group" : "မ"},
    {"id" : 5, "group" : "စုံ"},
    {"id" : 6, "group" : "စုံစုံ"},
    {"id" : 7, "group" : "စုံမ"},
    {"id" : 8, "group" : "မစုံ"},
    {"id" : 9, "group" : "မမ"},
    {"id" : 10, "group" : "အပူး"},
  ];

  const pate = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const htate = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const naut = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const natkhat = [
    {id: 1, group: "မြန်မာနက္ခတ် 07, 18, 24, 35, 69"},
    {id: 2, group: "မြန်မာနက္ခတ် R 07, 18, 24, 35, 69"},
    {id: 3, group: "ပါဝါ 05, 16, 27, 38, 49"},
    {id: 4, group: "ပါဝါ R 50, 61, 72, 83, 94"},
    {id: 5, group: "ထိုင်းနက္ခတ် 07, 19, 23, 48, 56"},
    {id: 6, group: "ထိုင်းနက္ခတ် R 70, 91, 32, 84, 65"},
    {id: 7, group: "ထိုင်းပါဝါ 09, 13, 26, 47, 58"},
    {id: 8, group: "ထိုင်းပါဝါ R 90, 31, 62, 74, 85"},
  ];
  const kwat20 = ["00-19", "20-39", "40-59", "60-79", "80-99"];

  return (
    <div className="px-3 py-3 d-flex align-items-center justify-content-around mb-3">
      {/* <div className="text-center" onClick={() => setIsOp1Show(!isOp1Show)}>
        <img
          src={maze}
          style={{ width: "30px", height: "30px" }}
          className="mb-2"
        />
        <div>
          <small style={{ fontSize: "12px" }}>အခွေ</small>
        </div>
      </div> */}
      <div className="text-center" onClick={() => setIsOp2Show(!isOp2Show)}>
        <img
          src={flash}
          style={{ width: "30px", height: "30px" }}
          className="mb-2"
        />
        <div>
          <small style={{ fontSize: "12px" }}>အမြန်ရွေး</small>
        </div>
      </div>

      <div className={`text-center cursorPointer`} onClick={() => permunated()}>
        <img
          src={repeat}
          style={{ width: "30px", height: "30px" }}
          className="mb-2"
        />
        <div>
          <small style={{ fontSize: "12px" }}>ပတ်လည်</small>
        </div>
      </div>
      {/* <div className="text-center" onClick={() => setIsOp4Show(!isOp4Show)}>
        <img
          src={dream}
          style={{ width: "30px", height: "30px" }}
          className="mb-2"
        />
        <div>
          <small style={{ fontSize: "12px" }}>အိပ်မက်</small>
        </div>
      </div> */}
      {/* အခွေ */}
      <Modal
        className="lottoModal"
        show={isOp1Show}
        onHide={() => setIsOp1Show(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <small className="fw-semibold">ခွေမည့်ဂဏန်းများ ရိုက်ထည့်ပါ</small>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <small className="text-center fw-bold">
            တူညီသော ဂဏန်း(၂)လုံး ခွင့်မပြုပါ။ (ဥပမာ - 020, 131,...)
          </small>
          <div className="my-3 d-flex align-items-center justify-content-start flex-wrap gap-3">
            <input
              style={{ width: "100%" }}
              placeholder="ဂဏန်း ၂လုံးမှ ၁၀လုံးအထိ"
              className="border-2 rounded-2"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="chooseNumDelBtn text-white border-0"
            onClick={() => setIsOp1Show(false)}
          >
            ဖျက်မည်
          </Button>
          <Button
            className="bg-pink text-black border-0"
            onClick={() => setIsOp1Show(false)}
          >
            အိုကေ
          </Button>
        </Modal.Footer>
      </Modal>
      
      <Offcanvas
        className="amyanChooseModal"
        placement="top"
        show={isOp2Show}
        onHide={() => setIsOp2Show(false)}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>အမြန်ရွေး</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="mb-2">
            <p className="text-black fw-bold mb-2">ဘရိတ်</p>
            <div className="mb-4 d-flex gap-2 justify-content-start flex-wrap align-items-center">
              {breakNums.map((num, index) => {
                return (
                  <button
                    key={index}
                    className="text-white amyanChooseNumber bg-pink"
                    onClick={() => [breakGroup(num.id), setIsOp2Show(!isOp2Show)]}
                  >
                    {num.group}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="mb-2">
            <p className="text-dark fw-bold mb-2">Single & Double Size</p>
            <div className="mb-4 row">
              {sizes.map((size, index) => {
                return (
                  <button
                    key={index}
                    style={{ fontSize: "14px" }}
                    className="bg-pink text-white amyanChooseNumber col-md-1 col-3 m-1 p-0"
                    onClick={() => [singleDouble(size.id), setIsOp2Show(!isOp2Show)]}
                  >
                    {size.group}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="mb-2">
            <p className="text-dark fw-bold mb-2">ပတ်သီး</p>
            <div className="mb-4 d-flex gap-3 justify-content-start flex-wrap align-items-center">
              {pate.map((n) => {
                return (
                  <button
                    key={n}
                    className="bg-pink text-white amyanChooseNumber"
                    onClick={() => [pathee(n), setIsOp2Show(!isOp2Show)]}
                  >
                    {n}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="mb-2">
            <p className="text-dark fw-bold">ထိပ်</p>
            <div className="mb-4 d-flex gap-3 justify-content-start flex-wrap align-items-center">
              {htate.map((n) => {
                return (
                  <button
                    key={n}
                    className="bg-pink text-white amyanChooseNumber"
                    onClick={() => [frontNumber(n), setIsOp2Show(!isOp2Show)]}
                  >
                    {n}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="mb-2">
            <p className="text-dark fw-bold">နောက်</p>
            <div className="mb-4 d-flex gap-3 justify-content-start flex-wrap align-items-center">
              {naut.map((n) => {
                return (
                  <button
                    key={n}
                    className="bg-pink text-white amyanChooseNumber"
                    onClick={() => [backNumber(n), setIsOp2Show(!isOp2Show)]}
                  >
                    {n}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="mb-2">
            <p className="text-dark fw-bold mb-2">နက္ခတ် ပါဝါ</p>
            <div className="mb-4 d-flex flex-column gap-2 ">
              {natkhat.map((n, index) => {
                return (
                  <button
                    key={index}
                    className="bg-pink text-white natkhatChooseNumber"
                    onClick={() => [powerNumber(n.id), setIsOp2Show(!isOp2Show)]}
                  >
                    {n.group}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="mb-2">
            <p className="text-dark fw-bold mb-2">အကွက် ၂၀ရွေး</p>
            <div className="mb-4 row">
              {kwat20.map((n, index) => {
                return (
                  <button
                    key={index}
                    className="bg-pink text-white amyanChooseNumber col-3 m-1"
                    onClick={() => [twentyNumbers(index), setIsOp2Show(!isOp2Show)]}
                  >
                    {n}
                  </button>
                );
              })}
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default TwoDChooseOption;
