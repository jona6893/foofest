import { useEffect, useRef, useState } from "react";

function TicketType({ addToTicket, emptyField, step, steps }) {
  const [regularTickets, setRegularTickets] = useState("");
  const [vipTickets, setVipTickets] = useState("");
  const [cghClass, setCghClass] = useState("")
  const ref = useRef();

  function handleInput(type, evt) {
    const value = evt.target.value;
    const regex = /^[\d]+$/g;
    

    switch (type) {
      case "regular":
        if (!value || regex.test(value)) {
          setRegularTickets(value);
          addToTicket("r", Number(value));
        }
        break;

      case "vip":
        if (!value || regex.test(value)) {
          setVipTickets(value);
          addToTicket("v", Number(value));
        }
        break;
    }
  }

useEffect(() => {
  switch (step) {
    case 1:
      setCghClass("");
      ref.current?.scrollIntoView({ behavior: "smooth" });
      break;
    case 2:
      setCghClass("sendToback1");
      break;
    case 3:
      setCghClass("sendToback2");
      break;
    case 4:
      setCghClass("sendToback3");
      break;
    case 5:
      setCghClass("sendToback4");
      break;
  }
}, [step]);

  return (
    <>
      <div ref={ref} className={`type-container ticketTypeComp ${cghClass}`}>
        <div className="container">
          <h3>TICKET TYPE</h3>
          {emptyField ? (
            <p style={{ color: "red" }}>Please select a ticket type</p>
          ) : (
            ""
          )}
          <fieldset id="ticket-type">
            <label htmlFor="regular" className="regular-label">
              <span>REGULAR </span>
              <span>
                {" "}
                <b>799,-</b>
              </span>
            </label>
            <input
              onInput={(evt) => handleInput("regular", evt)}
              type="text"
              name="regular"
              id="regluar-amount"
              pattern="[0-9]"
              inputMode="numeric"
              placeholder="0"
              value={regularTickets}
            />
            <label htmlFor="vip" className="vip-label">
              <span>VIP</span>
              <span>
                {" "}
                <b> 1299,-</b>
              </span>
            </label>
            <input
              onInput={(evt) => handleInput("vip", evt)}
              type="text"
              name="vip"
              id="vip-amount"
              pattern="[0-9]"
              inputMode="numeric"
              placeholder="0"
              value={vipTickets}
            /><div className="formBtns">
            <span className="prevBtn" onClick={(e) => steps(e)}>
              Previous
            </span>
            <span className="nextBtn" onClick={(e) => steps(e)}>
              Next
            </span>
          </div>
          </fieldset>
        </div>
        
          
    
      </div>
    </>
  );
}

export default TicketType;
