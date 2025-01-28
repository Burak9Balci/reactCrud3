import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <main>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </main>
  );
}

export default App;
