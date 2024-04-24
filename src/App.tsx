import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import FriendCard from "./components/card";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

function App() {
  const [friendsList, setFriendsList] = useState([]);

  useEffect(() => {
    // Fetch friends list data
    const fetchFriendsList = async () => {
      try {
        const response = await fetch(
          "https://randomuser.me/api/?seed=lll&page=1&results=25"
        );
        const data = await response.json();
        setFriendsList(data.results);
      } catch (error) {
        console.error("Error fetching friends list:", error);
      }
    };

    fetchFriendsList();
  }, []);

  return (
    <MantineProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/card"
            element={<FriendCard friendsList={friendsList} />}
          />
        </Routes>
      </Router>
    </MantineProvider>
  );
}

export default App;
