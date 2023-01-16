import { useState, useEffect } from "react";
import { Button, message, Steps } from "antd";
import TicketType from "../components/forms/TicketType";
import "../styles/Tickets.scss";
import "../styles/ticketFlowAni.scss";
import CampingArea from "../components/forms/CampingArea";
import Optionals from "../components/forms/Optionals";
import Payment from "../components/forms/Payment";
import TicketInfoList from "../components/forms/TicketInfoList";
import CD, { zeroPad } from "react-countdown";
import { insertOrder, reserve, postData } from "../components/forms/db.js";
import StepTracker from "../components/forms/StepTracker";

function Tickets() {
  // Arrray of availabel spots at the festival
  const [spots, setSpots] = useState([]);
  // Checkout total, keeps track of the filled in ticket infomation
  const [ticket, setTicket] = useState({
    r: 0,
    v: 0,
    info: [],
    campingArea: "",
    greenCamping: 0,
    tentAmount: 0,
  });
  // The current step to which the Ant Design Step counter is on
  // Validate, if a field is not filled in. It will display a red error message
  const [emptyField, setEmptyField] = useState(false);
  // check if the payment has been forfilled, if so display thank you note
  const [payComplet, setPayComplet] = useState(false);
  // get the reservation ID
  const [reserveID, setReserveID] = useState("");
  // post data to Supabase
  const [supaData, setSupaData] = useState("");
  // Request Full Reservation
  const [resComplet, setResComplet] = useState("");
  // Check if timer needs to start
  const [Timer, setTimer] = useState(false);
  //refresh page
  const [counterTime, setCounterTime] = useState(null);
  // step counter
  const [step, setStep] = useState(1);
  //const [TILClass, setTILClass] = useState("nextSlide");
  const [stepTracker, setStepTracker] = useState("")

  /* 
    URL:
    "http://localhost:8080/available-spots"
    "https://vjr-foofest.fly.dev/available-spots"
  */
  const url = "https://vjr-foofest.fly.dev/";

  // API
  useEffect(() => {
    async function getSpots() {
      const response = await fetch(url + "available-spots");
      const data = await response.json();
      setSpots(data);
      //console.log(data);
    }
    getSpots();
  }, [ticket]);

  // hvor mange billetter er valgt
  function addToTicket(property, value) {
    setTicket((old) => {
      const copy = { ...old };

      copy[property] = value;

      return copy;
    });
  }

  //RESERVESPOT
  async function reserveSpot() {
    //console.log("the reserveFunction has stareted");
    const payload = {
      area: ticket.campingArea,
      amount: ticket.r + ticket.v,
    };
    const response = await reserve(payload);
    setReserveID(response);
    setCounterTime(Date.now() + 300000);
    setTimer(true);
    //console.log(response);
  }
  // FULL RESERVATION
  async function fullReservation() {
    const response = await insertOrder({ id: reserveID });
    setResComplet(response);
    //console.log(response);
  }
  // POST TO SUPABASE
  async function postToSupabase() {
    const payload = {
      regular: ticket.r,
      vip: ticket.v,
      campingArea: ticket.campingArea,
      greenCamping: ticket.greenCamping,
      tentAmount: ticket.tentAmount,
      ticketInfo: ticket.info,
    };
    const response = await postData(payload);
    setSupaData(response);
    //console.log(response);
  }

  const renderer = ({ minutes, seconds }) => {
    return (
      <span className="ticket-timer">
        {zeroPad(minutes)}:{zeroPad(seconds)}
      </span>
    );
  };

  const steps = (e) => {
    const btn = e.target.className;
    if (btn == "prevBtn") {
      if (step >= 2 && step <= 5) {
        setStep((old) => old -1)
      }
    } else if (btn == "nextBtn") {
      /* if (step >=1  && step <= 4) {
        
      } */
      console.log(step)
      if(step == 1) {
        setPayComplet(false);
        if (ticket.r === 0 && ticket.v === 0) {
          setEmptyField(true);
        } else {
          setEmptyField(false);
          setStep((old) => old + 1);
        }
      } else if(step === 2) {
        console.log(ticket.info);
        if (
          ticket.info.length <= 0 ||
          ticket.info[0].birthday == "" ||
          ticket.info[0].email == "" ||
          ticket.info[0].fullname == ""
        ) {
          console.log("pdofigs");
          setEmptyField(true);
        } else {
          setEmptyField(false);
          setStep((old) => old + 1);
        }
      } else if(step === 3){
        if (ticket.campingArea === "" || ticket.campingArea === "none") {
          setStep((old) => old + 2);
        } else {
            reserveSpot();
            setStep((old) => old + 1);
        }
      } else if(step === 4){
        setStep((old) => old + 1);
      } else{
        if (ticket.payment === undefined) {
          setEmptyField(true);
          //console.log("credit info not there");
        } else if (ticket.payment[0].number.toString().length < 16) {
          setEmptyField(true);
          //console.log("please fill out the creditnumber");
        } else if (ticket.payment[0].day.toString().length < 2) {
          setEmptyField(true);
          //console.log("month");
        } else if (ticket.payment[0].month.toString().length < 2) {
          setEmptyField(true);
          //console.log("year");
        } else if (ticket.payment[0].cvc.toString().length < 3) {
          setEmptyField(true);
          //console.log("cvc");
        } else {
          setEmptyField(false);
          setPayComplet(true);
          fullReservation();
          postToSupabase();
          setTimer(false);
          message.success("Processing complete!");
        }
      }
    }
  };

  return (
    <section id="ticket-section">
      <form action="" id="tickets">
        <div className="stepNtime"> 
        {Timer ? (
          <CD
          onComplete={() => {
            if (Timer === true) {
              window.location.reload(false);
            }
          }}
          date={counterTime}
          renderer={renderer}
          />
          ) : (
            ""
            )}
            <StepTracker step={step}/></div>
        <div className="steps-content">
          
          <TicketType
            addToTicket={addToTicket}
            emptyField={emptyField}
            step={step}
            steps={steps}
          />
          <TicketInfoList
            step={step}
            ticket={ticket}
            addToTicket={addToTicket}
            emptyField={emptyField}
            steps={steps}
          />
          <CampingArea
            spots={spots}
            addToTicket={addToTicket}
            ticket={ticket}
            emptyField={emptyField}
            step={step}
            steps={steps}
          />
          <Optionals
            addToTicket={addToTicket}
            ticket={ticket}
            step={step}
            steps={steps}
          />
          <Payment
            payComplet={payComplet}
            ticket={ticket}
            addToTicket={addToTicket}
            emptyField={emptyField}
            step={step}
            steps={steps}
          />
        </div>
      </form>
      <div className="concert-img-wrapper">
        <div className="concert-img"></div>
      </div>
    </section>
  );
}

export default Tickets;

// Progress tracker from Ant Design
/* const steps = [
    {
      title: "",
      content: <TicketType addToTicket={addToTicket} emptyField={emptyField} />,
    },
    {
      title: "",
      content: <TicketInfoList ticket={ticket} addToTicket={addToTicket} emptyField={emptyField} />,
    },
    {
      title: "",
      content: <CampingArea spots={spots} addToTicket={addToTicket} ticket={ticket} emptyField={emptyField} />,
    },
    {
      title: "",
      content: <Optionals addToTicket={addToTicket} ticket={ticket} />,
    },
    {
      title: "",
      content: <Payment payComplet={payComplet} ticket={ticket} addToTicket={addToTicket} emptyField={emptyField} />,
    },
  ];

  //const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  //skip the optionals tab if no camping is selected
  const skipOptions = () => {
    setCurrent(current + 2);
  
  }; */

/*  {Timer ? (
            <CD 
            onComplete={()=> {  if (Timer === true) {
              window.location.reload(false);
            }} }
            date = {counterTime}
            renderer={renderer}
        
            />
          ) : ("")}
        </div>
        <div className={!payComplet ? (current > 0 ? "steps-action two-button" : "steps-action one-button") : "hidden"}>
          {current > 0 && (
            <Button className="btn" onClick={() => prev()}>
              PREVIOUS
            </Button>
          )}
          {current === 0 && (
            //ticket Type
            <Button
              className="btn"
              type="primary"
              onClick={() => {
                setPayComplet(false);
                if (ticket.r === 0 && ticket.v === 0) {
                  setEmptyField(true);
                } else {
                  setEmptyField(false);
                  next();
                }
              }}
            >
              NEXT
            </Button>
          )}
          {current === 2 && (
            //Camping Area
            <Button
              className="btn"
              type="primary"
              onClick={() => {
                if (ticket.campingArea === undefined) {
                  setEmptyField(true);
                } else {
                  if (ticket.campingArea === "none") {
                    setEmptyField(false);
                    //reserveSpot();
                    skipOptions();
                  } else {
                    setEmptyField(false);
                    reserveSpot();
                    next();
                  }
                }
              }}
            >
              NEXT
            </Button>
          )}
          {current === 3 && (
            // optionals
            <Button className="btn" type="primary" onClick={() => next()}>
              NEXT
            </Button>
          )}
          {current === 1 && (
            //ticket Info
            <Button
              className="btn"
              type="primary"
              onClick={() => {
                if (ticket.info === undefined) {
                  //console.log("pick an area");
                  setEmptyField(true);
                } else {
                  setEmptyField(true);
                  let counter = ticket.r + ticket.v;
                  ticket.info.forEach((element) => {
                    if (element.fullname == "" || element.email == "" || element.birthday == "") {
                      //console.log("not all fields are filled in");
                    } else if (element.fullname != "" && /\S+@\S+\.\S+/.test(element.email) && element.birthday != "") {
                      counter -= 1;
                      //console.log("All fields are now filled in");
                      if (counter > 0) {
                        //console.log("there is still " + counter + "fields left");
                      } else if (counter === 0) {
                        setEmptyField(false);
                        next();
                      }
                    }
                  });
                }
              }}
            >
              NEXT
            </Button>
          )}
          {current === steps.length - 1 && (
            //payment
            <Button
              className="btn"
              type="primary"
              onClick={
                () => {
                  if (ticket.payment === undefined) {
                    setEmptyField(true);
                    //console.log("credit info not there");
                  } else if (ticket.payment[0].number.toString().length < 16) {
                    setEmptyField(true);
                    //console.log("please fill out the creditnumber");
                  } else if (ticket.payment[0].day.toString().length < 2) {
                    setEmptyField(true);
                    //console.log("month");
                  } else if (ticket.payment[0].month.toString().length < 2) {
                    setEmptyField(true);
                    //console.log("year");
                  } else if (ticket.payment[0].cvc.toString().length < 3) {
                    setEmptyField(true);
                    //console.log("cvc");
                  } else {
                    setEmptyField(false);
                    setPayComplet(true);
                    fullReservation();
                    postToSupabase();
                    setTimer(false);
                    message.success("Processing complete!");
                  }
                }
              }
            >
              DONE
            </Button>
          )} */
