# GameRate AI

GameRate AI este o aplicatie web full-stack care permite utilizatorilor sa descopere jocuri video si sa genereze review-uri automate folosind OpenAI.

## Aplicatie Live

https://game-rate-ai.vercel.app

---

# Functionalitati

- Autentificare utilizator cu Firebase
- Persistenta sesiunii dupa refresh
- Afisare jocuri video dintr-un API extern
- Cautare jocuri
- Generare review AI pentru jocuri folosind OpenAI

---

# Servicii Cloud Utilizate

## Firebase Authentication
Folosit pentru:
- Login/Register
- Gestionarea utilizatorilor
- Persistenta autentificarii

## OpenAI API
Folosit pentru:
- Generarea automata a review-urilor pentru jocuri

---

# Tehnologii Folosite

## Frontend
- React
- Vite
- CSS

## Backend
- Node.js
- Express.js

## Alte tehnologii si servicii
- Firebase
- OpenAI API
- Render
- Vercel

---

# API-uri Utilizate

## FreeToGame API
Folosit pentru obtinerea listei de jocuri video.

https://www.freetogame.com/api-doc

---

# Workflow-ul Aplicatiei

1. Utilizatorul isi creeaza cont sau se autentifica.
2. Aplicatia afiseaza jocuri video folosind FreeToGame API.
3. Utilizatorul poate cauta jocuri.
4. Utilizatorul poate genera un review AI pentru un joc.
5. Backend-ul trimite un request catre OpenAI API.
6. Review-ul generat este afisat in aplicatie.

---

# Instalare Locala

## 1. Clonarea repository-ului

```bash
git clone https://github.com/USERNAME/game-rate-ai.git