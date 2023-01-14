import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import TicketInfo from "./TicketInfo";

function TicketInfoList({ ticket, addToTicket, emptyField, step }) {
  const sectionEl = useRef(null);
  const [cghClass, setCghClass] = useState("nextSlide")

  function finishedAdding() {
    event.preventDefault();

    //console.log(sectionEl.current);
    const tickets = [];
    // 1. find alle .ticketInfo.queryselectorALL()
    const formsElements = sectionEl.current.querySelectorAll(".ticketInfo");
    //console.log(formsElements);

    // 2. find alle formfelter og lave et object af hver formfield (object fullname: "", email:"", birthday: "")

    formsElements.forEach((e) => {
      const formInfo = {
        fullname: e.querySelector(".fullname").value,
        email: e.querySelector(".email").value,
        birthday: e.querySelector(".ant-picker-input > input").value,
        type: e.querySelector(".type").textContent,
      };
      tickets.push(formInfo);
    });
    // 3. addToTicket("info", "voresNyeArray" )
    addToTicket("info", tickets);
  }

useEffect(() => {

  switch (step) {
    case 1: setCghClass("nextSlide");
      break;
    case 2:  setCghClass("");
      break;
    case 3:  setCghClass("sendToback1");
      break;
    case 4:  setCghClass("sendToback2");
      break;
    case 5:  setCghClass("sendToback3");
      break;
  }
},[step])



  return (
    <section ref={sectionEl} className={`ticketInfoListComp ${cghClass}`}>
      <div className="container">
      <h3>TICKET INFO</h3>
      {emptyField ? (
        <p style={{ color: "red" }}>Please fill in all of the fields</p>
      ) : (
        ""
      )}
      {[...Array(ticket.r).keys()].map((info, index) => (
        <TicketInfo
          ticket={ticket}
          type={"REGULAR"}
          key={index}
          finishedAdding={finishedAdding}
        />
      ))}
      {[...Array(ticket.v).keys()].map((info, index) => (
        <TicketInfo
          ticket={ticket}
          type={"VIP"}
          key={index}
          finishedAdding={finishedAdding}
        />
      ))}
      </div>
    </section>
  );
}

export default TicketInfoList;
