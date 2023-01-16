import React, { useEffect, useState } from 'react'

function StepTracker({step}) {

const [cghClass, setCghClass] = useState("");
const [cghClass2, setCghClass2] = useState("");
const [cghClass3, setCghClass3] = useState("");
const [cghClass4, setCghClass4] = useState("");
const [cghClass5, setCghClass5] = useState("");




useEffect(() => {
  switch (step) {

    case 1:
      setCghClass("currentStep");
      setCghClass2("")
      setCghClass3("")
      setCghClass4("")
      setCghClass5("")
      break;
    case 2:
      setCghClass("lastStep");
      setCghClass2("currentStep")
      setCghClass3("");
      setCghClass4("");
      setCghClass5("");
      break;
    case 3:
      setCghClass2("lastStep");
      setCghClass3("currentStep");
      setCghClass4("");
      setCghClass5("");
      break;
    case 4:
      setCghClass3("lastStep");
      setCghClass4("currentStep");
      setCghClass5("");
      break;
    case 5:
      setCghClass3("lastStep");
      setCghClass4("lastStep");
      setCghClass5("currentStep");
      break;
  }
}, [step]);



  return (
    <div className="steptracks">
      <div className={` ${cghClass}`}>1</div>
      <div className={` ${cghClass2}`}>2</div>
      <div className={` ${cghClass3}`}>3</div>
      <div className={` ${cghClass4}`}>4</div>
      <div className={` ${cghClass5}`}>5</div>
    </div>
  );
}

export default StepTracker