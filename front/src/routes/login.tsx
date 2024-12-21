import { SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./css/login.module.css";

export default function Login() {
  const navigate = useNavigate();

  async function onSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username")?.toString();
    const password = formData.get("password")?.toString();

    if (!username || !password)
      throw Error("username and passwords are mandatory fields");

    const request = new Request("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const res = await fetch(request);
    const data = await res.json();

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
      <button type="submit">Login</button>
    </form>
  );
}
