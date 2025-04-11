import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./context/ThemeProvider";
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/userContext";
import { PostProvider } from "./context/postContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
      <AuthProvider>
        <UserProvider>
          <PostProvider>
            <App />
          </PostProvider>
        </UserProvider>
      </AuthProvider>
  </StrictMode>
);
