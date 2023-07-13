import type { NextPage } from "next";
import React, { useRef } from "react";
import { useRouter } from "next/router";
import { register } from "@/models/auth";

const Register: NextPage = () => {
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const unameRef = useRef<HTMLInputElement>(null);
  const onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (!emailRef.current || !passRef.current || !unameRef.current) return;
    const email = emailRef.current.value;
    const password = passRef.current.value;
    const uname = unameRef.current.value;
    register(email, password, {uname: uname});
    router.push('/');
  };
  return (
    <div>
        <h1>hi</h1>
        im lazy reg pls
        <form method="POST" onSubmit={onSubmit}>
          <label htmlFor="uname">Username:</label>
          <input type="text" id="uname" name="uname" ref={unameRef}/>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" ref={emailRef}/>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" ref={passRef}/>
          <button type="submit">Register </button>
        </form>
    </div>
  );
};

export default Register;