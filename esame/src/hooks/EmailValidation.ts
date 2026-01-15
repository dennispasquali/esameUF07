import { useState } from "react";
import type { IEmailValidation } from "../Interfaces/EmailValidation";






export const EmailValidation = () :IEmailValidation => {

        const [email,setEmail]=useState<string>("");
        const [invalidEmailMessage,setInvalidEmailMessage]=useState<string>("");
        const onChange = (email: string) : void => {
        let nrAt=0;
        let nrPoint=0;
        //nr @
        let indexAt=0;
        let indexPoint=0;
        for (let i = 0; i < email.length; i++) {
            if(email.charAt(i)==='@') {
                nrAt++;
                indexAt=i;
            } else if(email.charAt(i)=='.') {
                nrPoint++;
                indexPoint=i;

            }
            
        }
        setEmail(email);
        if(nrAt===1 && nrPoint===1 && indexAt>0 && indexPoint-indexAt>1 && email.length-indexPoint>1 && email.substring(indexAt+1,indexPoint).trim()!="") {
            setInvalidEmailMessage("");
        } else {
            setInvalidEmailMessage("email non valida");
        }
        }

        return {email,invalidEmailMessage,onChange}

       
  };