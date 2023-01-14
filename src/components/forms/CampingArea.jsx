import { useEffect, useState } from "react";

export default function CampingArea({ spots, addToTicket, ticket, emptyField, step, steps }) {
  //console.log(spots);
const [cghClass, setCghClass] = useState("nextSlide");

useEffect(() => {
  switch (step) {
    case 2:
      setCghClass("nextSlide");
      break;
    case 3:
      setCghClass("");
      break;
    case 4:
      setCghClass("sendToback2");
      break;
    case 5:
      setCghClass("sendToback3");
      break;
  }
}, [step]);


  return (
    <div className={`campingAreaComp ${cghClass}`}>
      <h3>CAMPING AREA</h3>
      {emptyField ? (
        <p style={{ color: "red" }}>Please pick one of the option below</p>
      ) : (
        ""
      )}
      <fieldset id="camping-area" className="scene-names">
        <div className="campContainer">
          <label htmlFor="no-camping">No camping</label>
          <input
            onChange={(evt) => addToTicket("campingArea", evt.target.value)}
            type="radio"
            name="area"
            id="no-camping"
            pattern="[0-9]"
            inputMode="numeric"
            value="none"
            defaultChecked
          />
        </div>

        {spots.map((area, index) => (
          <div className="campContainer" key={index}>
            <label htmlFor={area.area}>{area.area}</label>
            <div className="avail-box">
              <p>{area.available + " left"}</p>
            </div>
            <input
              disabled={ticket.r + ticket.v > area.available}
              onChange={(evt) => addToTicket("campingArea", evt.target.value)}
              type="radio"
              name="area"
              id={area.area}
              pattern="[0-9]"
              inputMode="numeric"
              value={area.area}
            />
          </div>
        ))}
        <div className="formBtns">
          <span className="prevBtn" onClick={(e) => steps(e)}>
            Previous
          </span>
          <span className="nextBtn" onClick={(e) => steps(e)}>
            Next
          </span>
        </div>
      </fieldset>

      {/*       <div className="button-container">
        <button>BACK</button>
        <button>NEXT</button>
      </div> */}
    </div>
  );
}
