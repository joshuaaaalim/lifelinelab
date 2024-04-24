import React, { useState, useEffect } from "react";
import CryptoJS from "crypto-js";
import { useNavigate } from "react-router-dom";
import {
  Paper,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Title,
  Text,
  Anchor,
  Card,
  Avatar,
} from "@mantine/core";
import classes from "./login.module.css";

interface Friend {
  picture: {
    thumbnail: string;
  };
  name: {
    first: string;
    last: string;
  };
  email: string;
  phone: string;
}

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [friendsList, setFriendsList] = useState<Friend[]>([]);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Fetch user data from API
      const response = await fetch(
        `https://randomuser.me/api/?seed=lll&username=${username}`
      );
      const userData = await response.json();

      console.log("userData:", userData);

      // Extract hashed password from user data
      const hashedPasswordFromAPI = userData.results[0].login.password; // Extracting sha256 password hash

      console.log("hashedPasswordFromAPI:", hashedPasswordFromAPI);

      // Hash the hashed password from API response
      const hashedPasswordFromAPIHashed = CryptoJS.SHA256(
        hashedPasswordFromAPI
      ).toString();

      console.log("hashedPasswordFromAPIHashed:", hashedPasswordFromAPIHashed);

      // Hash the user input password
      const hashedPasswordInput = CryptoJS.SHA256(password).toString();

      console.log("hashedPasswordInput:", hashedPasswordInput);

      // Compare hashes
      if (hashedPasswordFromAPIHashed === hashedPasswordInput) {
        console.log("Login successful!");

        // Fetch user's friends list
        const friendsResponse = await fetch(
          `https://randomuser.me/api/?seed=lll&page=1&results=25`
        );
        const friendsData = await friendsResponse.json();

        console.log("Friends list:", friendsData);

        setFriendsList(friendsData.results); // Save friends list data to state

        // Redirect to FriendCard component
        navigate("/card");
      } else {
        console.log("Invalid username or password");
        setError("Invalid username or password");
      }
    } catch (error) {
      console.error("Error occurred:", error);
      setError("An error occurred while processing your request");
    }
  };

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          Welcome back to LifeLineLab
        </Title>

        <form onSubmit={handleSubmit}>
          <TextInput
            label="Username"
            placeholder="Enter your username"
            size="md"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            mt="md"
            size="md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Checkbox label="Keep me logged in" mt="xl" size="md" />
          <Button type="submit" fullWidth mt="xl" size="md">
            Login
          </Button>
        </form>

        {error && (
          <Text ta="center" mt="md" color="red">
            {error}
          </Text>
        )}

        <Text ta="center" mt="lg">
          Don&apos;t have an account?{" "}
          <Anchor<"a">
            href="#"
            fw={700}
            onClick={(event) => event.preventDefault()}
          >
            Register
          </Anchor>
        </Text>
      </Paper>
    </div>
  );
}

export default Login;
