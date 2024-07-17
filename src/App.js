import React from "react";
import Dashboard from "./components/Dashboard";
import "./App.css"
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Dashboard />
      </main>
      <Footer />
    </div>
  );
}

export default App;
