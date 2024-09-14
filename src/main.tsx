import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import DiagramProvider from "./store/store.tsx";

createRoot(document.getElementById("root")!).render(
  <DiagramProvider>
    <App />
  </DiagramProvider>
);
