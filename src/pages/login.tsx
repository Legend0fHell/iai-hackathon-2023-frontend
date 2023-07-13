import type { NextPage } from "next";
import React, { useRef } from "react";
import { useRouter } from "next/router";
import { login } from "@/models/auth";

const Login: NextPage = () => {
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const onSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (!emailRef.current || !passRef.current) return;
    const email = emailRef.current.value;
    const password = passRef.current.value;
    await login(email, password);
    router.push('/');
  };
  return (
    <div>
        <h1>hi</h1>
        im lazy login pls
        <form method="POST" onSubmit={onSubmit}>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" ref={emailRef}/>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" ref={passRef}/>
            <button type="submit">Sign In </button>
        </form>
    </div>
  );
};

export default Login;