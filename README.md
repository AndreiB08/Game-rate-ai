Aplicație web pentru descoperirea jocurilor video și generarea review-urilor 

Buzagiu Andrei
Grupa 1145 - SIMPRE
Linkuri:
Link video: https://youtu.be/aYTJ1vI0M10
Link aplicație: https://game-rate-ai.vercel.app/
Link GitHub: https://github.com/AndreiB08/Game-rate-ai.git

Introducere

În contextul dezvoltării accelerate a industriei gaming-ului și al numărului foarte mare de jocuri disponibile online, utilizatorii întâmpină deseori dificultăți în alegerea unui joc potrivit. Platformele moderne oferă mii de titluri, însă multe dintre acestea sunt prezentate într-un mod generic, fără personalizare sau interacțiune inteligentă.

GameRate AI este o aplicație web dezvoltată pentru a simplifica procesul de descoperire a jocurilor video și pentru a adăuga o componentă inteligentă bazată pe inteligență artificială. Aplicația permite utilizatorilor să își creeze cont, să caute jocuri video și să genereze automat review-uri folosind OpenAI.

Aplicația utilizează servicii cloud moderne și tehnologii actuale pentru a oferi o experiență interactivă și performantă. Frontend-ul este realizat folosind React și Vite, oferind o interfață rapidă și responsivă. Pentru autentificare este utilizat Firebase Authentication, serviciu cloud oferit de Google, care permite gestionarea utilizatorilor și persistența autentificării după refresh.

Backend-ul aplicației este realizat cu Node.js și Express.js și acționează ca intermediar între frontend și serviciile externe. Aplicația folosește OpenAI API pentru generarea review-urilor automate și FreeToGame API pentru obținerea informațiilor despre jocuri video.

Aplicația este publicată folosind servicii cloud moderne:

Frontend-ul este găzduit pe Vercel
Backend-ul este găzduit pe Render

Această combinație de tehnologii permite dezvoltarea unei aplicații cloud complete, scalabile și moderne, care îmbină funcționalități reale cu servicii AI și autentificare cloud. 

Descrierea problemei

Alegerea unui joc video potrivit poate deveni dificilă pentru utilizatori din cauza numărului mare de titluri disponibile pe diferite platforme online. Majoritatea site-urilor de gaming oferă doar liste simple de jocuri sau recomandări generale bazate pe popularitate.

GameRate AI încearcă să rezolve această problemă prin integrarea unui sistem inteligent care combină date externe despre jocuri cu generarea automată de review-uri folosind inteligență artificială.

Aplicația permite utilizatorului să:

se autentifice într-un mod securizat,
vizualizeze jocuri video obținute dintr-un API extern,
caute jocuri după nume,
genereze review-uri automate pentru jocurile selectate.

Prin utilizarea OpenAI API, aplicația poate genera instant review-uri pentru orice joc afișat, oferind o experiență mai interactivă și mai dinamică față de aplicațiile clasice de gaming.

În plus, persistența autentificării prin Firebase îmbunătățește experiența utilizatorului, permițând păstrarea sesiunii active chiar și după refresh-ul paginii.	

Descrierea tehnologiilor și API-urilor utilizate

React

React este o bibliotecă JavaScript utilizată pentru dezvoltarea interfețelor interactive. Aplicația folosește React pentru gestionarea componentelor, a stărilor aplicației și a interacțiunii dintre utilizator și interfața grafică.

Prin utilizarea React Hooks, precum useState și useEffect, aplicația poate actualiza dinamic conținutul afișat și poate gestiona datele primite din API-uri externe.

Vite

Vite este un tool modern pentru dezvoltarea aplicațiilor frontend. Acesta oferă pornire foarte rapidă a proiectului, hot reload eficient și build optimizat pentru producție.

Vite este utilizat pentru configurarea și rularea aplicației React.

Firebase Authentication

Firebase Authentication este un serviciu cloud oferit de Google pentru gestionarea autentificării utilizatorilor.

În cadrul proiectului, Firebase este utilizat pentru:

creare cont utilizator,
autentificare utilizator,
logout,
persistența sesiunii după refresh.

Persistența autentificării este realizată folosind funcția onAuthStateChanged(), care permite verificarea automată a utilizatorului autentificat.

Node.js și Express.js

Backend-ul aplicației este realizat folosind Node.js și Express.js.

Express.js este utilizat pentru:

definirea endpoint-urilor backend,
comunicarea cu OpenAI API,
comunicarea cu FreeToGame API,
rezolvarea problemelor de tip CORS.

Serverul Express acționează ca intermediar între frontend și serviciile externe.

OpenAI API

OpenAI API reprezintă unul dintre serviciile cloud principale utilizate în proiect.

Aplicația folosește modelul gpt-4o-mini pentru generarea automată de review-uri pentru jocuri video.

Când utilizatorul apasă butonul de generare review, frontend-ul trimite un request către backend, iar backend-ul comunică cu OpenAI API pentru obținerea răspunsului generat.

FreeToGame API

FreeToGame API este un API REST utilizat pentru obținerea listei de jocuri video.

API-ul furnizează:

titlul jocului,
imaginea jocului,
descrierea jocului,
categoria și platforma.

Datele sunt obținute de backend și trimise ulterior către frontend.

Vercel

Frontend-ul aplicației este publicat pe Vercel.

Vercel oferă:

deploy automat din GitHub,
hosting pentru aplicații frontend,
build automat pentru proiecte React/Vite,
integrare simplă cu servicii cloud.

Render

Backend-ul aplicației este publicat pe Render.

Render este utilizat pentru:

rularea serverului Express,
găzduirea endpoint-urilor backend,
gestionarea variabilelor de mediu,
comunicarea securizată cu OpenAI API.	

Flux de date și comunicare între componente

Flux autentificare

Firebase Authentication gestionează procesul de login și persistența utilizatorului.

Aplicația utilizează funcția:
onAuthStateChanged(auth, (currentUser) => {
  setUser(currentUser);
});

Această funcție verifică automat dacă există un utilizator autentificat și păstrează sesiunea activă după refresh.

Flux obținere jocuri

Frontend-ul trimite un request către backend:

GET /games

Backend-ul interoghează FreeToGame API:

https://www.freetogame.com/api/games

Datele obținute sunt transformate și trimise către frontend pentru afișare.

Flux generare review AI

Când utilizatorul apasă butonul "Cere Review AI", frontend-ul trimite un request POST către backend:

POST /review

Exemplu request:

{
  "gameName": "Overwatch"
}

Backend-ul transmite request-ul către OpenAI API:

const response = await client.chat.completions.create({
  model: "gpt-4o-mini",
  messages: [
    {
      role: "user",
      content: `Scrie un review scurt și entuziast pentru jocul ${gameName}.`,
    },
  ],
});
Răspunsul generat este trimis înapoi frontend-ului și afișat utilizatorului.

Flux căutare jocuri

Aplicația permite căutarea jocurilor folosind filtrare locală.

Utilizatorul introduce numele jocului în bara de căutare, iar aplicația filtrează lista de jocuri disponibile folosind funcția filter().

Capturi de ecran aplicație

Pagina de autentificare

Pagina principală cu jocuri

Review AI generat

Referințe

Materiale seminar și laborator Cloud Computing – SIMPRE, 2026
Documentație oficială React – https://react.dev
Documentație Vite – https://vitejs.dev
Documentație Firebase Authentication – https://firebase.google.com/docs/auth
Documentație OpenAI API – https://platform.openai.com/docs
Documentație Express.js – https://expressjs.com
Documentație Render – https://render.com/docs
Documentație Vercel – https://vercel.com/docs
Documentație FreeToGame API – https://www.freetogame.com/api-doc