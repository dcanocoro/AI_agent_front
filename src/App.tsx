import React from "react";
import Dashboard from "./components/Dashboard";
import Chat from "./components/Chat";

const App: React.FC = () => {
  return (
    <div className="app-container">
      <Chat />
    </div>
  );
};

export default App;
