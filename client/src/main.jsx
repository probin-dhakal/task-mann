import { StrictMode, useState, createContext } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "../src/index.css"

// Create Context for managing global state
export const Context = createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  user: {},
  setUser: () => {},
  tasks: [],
  setTasks: () => {},
});

const AppWrapper = () => {
  // States to manage user data and tasks
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [tasks, setTasks] = useState([]); // Store tasks (could be an array of task objects)

  return (
    <Context.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        tasks,
        setTasks,
      }}
    >
      <App />
    </Context.Provider>
  );
};

// Rendering the AppWrapper inside StrictMode
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>
);
