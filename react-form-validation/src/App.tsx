import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Form, { checkLoginAndPassword, minMaxLength, requireField } from "./components/Form";

function App() {
  const validators = [
    requireField('email'),
    minMaxLength('email', 6, 16),
    requireField('username'),
    minMaxLength('password', 0, 30),
    checkLoginAndPassword()
  ];

  return (
    <Form method="get" validators={validators}>
      <input name="email" type="text" placeholder="Email" />
      <input name="username" type="text" placeholder="Username" />
      <input name="password" type="text" placeholder="Search" />
    </Form>
  );
}

export default App;
