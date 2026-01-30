<h1>Progetto re-styling sito grafica pasquali</h1>

come progetto per l'esame ho voluto rifare il sito della tipografia di mio papà ovviamente siccome ho fatto il front-end ma anche il backend e il database non ci sono tutte le funzionalita piu disparate di un e-commerce e alucni link per certe pagine non portano a nulla ma sono comunque riuscito a fare una struttura base. Lo scopo era comunque quello di avere dal punto di vista grafico e di backend un sito base per fare degli ordini

<h2>Istruzioni Installazione</h2>

fare npm i sulle cartelle backend e esame per scaricare le dipendenze

poi aggiungere sotto la cartella backend un file .emv con questi dati

DATABASE_URL="file:./dev.db"
FRONTEND_URL=http://localhost:5173
JWT_SECRET="ax273456u9"
GOOGLE_CLIENT_ID=530349984082-i9dc7gul41fhcgkvj29imgfd71r8bciu.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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

infine digitare su /backend il comando npx prisma generate per generare i modelli ts che usara il backend per comunicare con il db


e poi fare npm run dev sulla cartella /backend per avviare il server 
e poi fare npm run dev sulla cartella /esame per avviare il front-end


<h2>Descrizione api</h2>

le api che ho utilizzato sono api auto-costruite nel back end utilizzando node +ts +express 
per il db ho usato sqlite con prisma

<h2>Struttura Progetto</h2>

il progetto è strutturato in 2 cartelle principali quella chiamata esame contiene il front end, quella chiamata backend contiene il backend e il db che è contenuto nella sotto cartella intitolata prisma nella cartella src c'è il backend vero e proprio

esame
  src
    assets - cartella con gli asset
    components - cartella componenti
    ComponentStyle - cartella moduli css dei componenti
    hooks - hook per chiamate api e altre cose
    interfaces -interfacce ts che ho usato per i componenti
    pages - pagine tsx del sito
    PagesStyle - stile pagine sito




<h2>tra le funzionalità sono presenti</h2>

possibilità di aggiungere recensioni con controllo preventivo se l'utente si è registrato o meno
possibilita di vedere il carrello se l'utente si è registrato o meno
possibilita di vedere la pagina profilo se l'utente si è registrato o meno

per vedere come appaiono nella pagina profilo gli ordini passati e recenti basta fare il login con questo account

email: dennis.pasquali@mat.tn.it
pwd: 12345
oAuth + token JWT
