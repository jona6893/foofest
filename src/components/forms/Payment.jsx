import Basket from "./Basket";
import CreditCardInfo from "./CreditCardInfo";
import OrderComplete from "./OrderComplete";
import { useEffect, useRef, useState } from "react";

function Payment({ ticket, addToTicket, emptyField, payComplet, step, steps }) {
  const sectionEl = useRef(null);
  const [cghClass, setCghClass] = useState("nextSlide");
  function finishedAdding() {
    event.preventDefault();

    //console.log(sectionEl.current);
    const creditCard = [];
    // 1. find alle .ticketInfo.queryselectorALL()
    const formsElements = sectionEl.current.querySelectorAll(".creditcard-info");
    //console.log(formsElements);

    // 2. find alle formfelter og lave et object af hver formfield (object fullname: "", email:"", birthday: "")

    formsElements.forEach((e) => {
      const form = {
        number: Number(e.querySelector(".card-number").value),
        day: Number(e.querySelector(".expire-day").value),
        month: Number(e.querySelector(".expire-month").value),
        cvc: Number(e.querySelector(".cvc-number").value),
        cardholder: e.querySelector(".card-holder").value,
      };
      creditCard.push(form);
    });
    // 3. addToTicket("info", "voresNyeArray" )
    addToTicket("payment", creditCard);
  }

  useEffect(() => {
    switch (step) {
      case 4:
        setCghClass("nextSlide");
        break;
      case 5:
        setCghClass("");
        break;
    }
  }, [step]);

  return (
    <div className={`paymentComp ${cghClass}`}>
      {/*   <Basket ticket={ticket} /> */}
      {payComplet ? (
        <>
          <OrderComplete />
          {/* <Basket ticket={ticket} /> */}
        </>
      ) : (
        <section ref={sectionEl}>
          <Basket ticket={ticket} />
          <CreditCardInfo
            finishedAdding={finishedAdding}
            emptyField={emptyField}
            ticket={ticket}
          />
          {!payComplet && (
          <div className="formBtns">
            <span className="prevBtn" onClick={(e) => steps(e)}>
              Previous
            </span>
            <span className="nextBtn" onClick={(e) => steps(e)}>
              Next
            </span>
          </div>
        )}
        </section>
        
      )}
    </div>
  );
}

export default Payment;
