import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import DemandeRdv from "./pages/DemandeRdv";

function App() {
  return (
    <div className="container">
      <h1>Patient</h1>

      <div className="icon">
        <Link to="/demande_rdv">
          <img src="/img/calendar.png" alt="calendar" className="btn" />
          <h3>Prendre un rendez-vous</h3>
        </Link>
      </div>

      <div className="icon">
        <Link to="/info">
          <img src="/img/information.png" alt="info" className="btn" />
          <h3>Informations</h3>
        </Link>
      </div>
    </div>
  );
}

export default App;