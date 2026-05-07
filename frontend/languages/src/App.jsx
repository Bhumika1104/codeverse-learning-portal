import React, { useState } from "react";
import Registration from "./Registration";
import Login from "./Login";
import Welcome from "./Welcome";
import ForgotPassword from "./ForgotPassword";

function App() {
  // Load all users from localStorage
  const [users, setUsers] = useState(() => {
    try {
      const saved = localStorage.getItem("users");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [loggedInUser, setLoggedInUser] = useState(null);

  const [currentPage, setCurrentPage] = useState("register");

  // Add new user (updated registration)
  const addUser = (newUser) => {
    const updatedList = [...users, newUser];
    setUsers(updatedList);
    localStorage.setItem("users", JSON.stringify(updatedList));
    setCurrentPage("login");
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    setCurrentPage("login");
  };

  return (
    <div>
      {currentPage === "register" && (
        <Registration
          addUser={addUser}
          users={users}
          goToLogin={() => setCurrentPage("login")}
        />
      )}

      {currentPage === "login" && (
        <Login
          users={users}
          setLoggedInUser={(u) => {
            setLoggedInUser(u);
            setCurrentPage("welcome");
          }}
          goToRegister={() => setCurrentPage("register")}
          goToForgot={() => setCurrentPage("forgot")}
        />
      )}

      {currentPage === "forgot" && (
        <ForgotPassword goToLogin={() => setCurrentPage("login")} users={users} />
      )}

      {currentPage === "welcome" && loggedInUser && (
        <Welcome user={loggedInUser} handleLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
