import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import "./theme.scss";
import { useState, useEffect } from "react";
import BackgroundContext from "./contexts/backgroundContext";

function App() {
  const [backgroundColor, setBackgroundColor] = useState("white"); // Arkaplan rengini state ile tut

  useEffect(() => {
    document.body.style.backgroundColor = backgroundColor; // Arkaplan rengini güncelle
  }, [backgroundColor]);
  return (
    <main
      className={
        backgroundColor === "white" ? "white-background" : "black-background"
      }
    >
      <BrowserRouter>
        <BackgroundContext.Provider
          value={{ backgroundColor, setBackgroundColor }}
        >
          <AppRoutes />
        </BackgroundContext.Provider>
      </BrowserRouter>
    </main>
  );
}

export default App;
