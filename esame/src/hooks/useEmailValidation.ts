import { useState } from "react";
import type { IEmailValidation } from "../Interfaces/EmailValidation";

//HOOK PER LA VALIDAZIONE DELLA MAIL
export const useEmailValidation = (): IEmailValidation => {
  //USE STATE CHE CONTIENE LA MAIL SCRITTA DALL'UTENTE
  const [email, setEmail] = useState<string>("");
  //USE STATE CHE CONTIENE IL MESSAGGIO CHE COMUNICA SE LA MAIL è VALIDA O MENO
  const [invalidEmailMessage, setInvalidEmailMessage] = useState<string>("");

  /**
   * FUNZIONE CHE SI OCCUPA DI VERIFICARE SE LA MAIL è VALIDA NON APPENA LO USE STATE EMAIL CAMBIA
   * * @param email string - EMAIL SCRITTA DAL'UTENTE
   * @returns void (aggiorna gli useState)
   */
  const onChange = (email: string): void => {
    let nrAt = 0;
    let nrPoint = 0;
    //nr @
    let indexAt = 0;
    let indexPoint = 0;
    for (let i = 0; i < email.length; i++) {
      if (email.charAt(i) === "@") {
        nrAt++;
        indexAt = i;
      } else if (email.charAt(i) == ".") {
        nrPoint++;
        indexPoint = i;
      }
    }
    setEmail(email);
    if (
      nrAt === 1 &&
      nrPoint >= 1 &&
      indexAt > 0 &&
      indexPoint - indexAt > 1 &&
      email.length - indexPoint > 1 &&
      email.substring(indexAt + 1, indexPoint).trim() != ""
    ) {
      setInvalidEmailMessage("");
    } else {
      setInvalidEmailMessage("email non valida");
    }
  };

  //VIENE PASSATA L'EMAIL E IL MESSAGGIO NON VALIDO E IL METODO ON CHANGE A CHI USA LA HOOK
  return { email, invalidEmailMessage, onChange };
};
