import { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./css/login.module.css";

const url = import.meta.env.VITE_BASE_URL;

export default function Login() {
  const [isSigningIn, setIsSigningIn] = useState(false);
  const navigate = useNavigate();

  async function onSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username")?.toString();
    const password = formData.get("password")?.toString();

    if (!username || !password)
      throw Error("username and passwords are mandatory fields");

    setIsSigningIn(true);
    await loginAction(username, password);
  }

  async function loginAction(username: string, password: string) {
    const request = new Request(`${url}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
      credentials: "include",
    });

    const res = await fetch(request);
    const data = await res.json();
    setIsSigningIn(false);

    if (data.status === true) {
      return navigate("/snakes");
    }

    alert(data.message);
  }

  return (
    <form className={styles.loginForm} onSubmit={onSubmit}>
      <label htmlFor="username">Username</label>
      <input type="text" name="username" placeholder="username" />
      <label htmlFor="password">Password</label>
      <input type="password" name="password" placeholder="password" />
      <button type="submit">{isSigningIn ? "Signing in..." : "Sign in"}</button>
    </form>
  );
}
