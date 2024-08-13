"use client";

import { auth } from "@/actions/auth-actions";
import Link from "next/link";
import { useState } from "react";
import { useFormState } from "react-dom";

export default function AuthForm({ mode }) {
  const [formState, formAction] = useFormState(auth.bind(null, mode), {});

  return (
    <form id="auth-form" action={formAction}>
      <div>
        <img src="/images/auth-icon.jpg" alt="A lock icon" />
      </div>
      <p>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
      </p>
      {formState.errors && formState.errors.email && (
        <p id="form-errors">{formState.errors.email}</p>
      )}
      <p>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
      </p>
      {formState.errors && formState.errors.password && (
        <p id="form-errors">{formState.errors.password}</p>
      )}
      <p>
        <button type="submit">
          {mode === "login" ? "login" : "create account"}
        </button>
      </p>
      <p>
        {mode === "login" && (
          <Link href="/?mode=signup">Create an Account</Link>
        )}
        {mode === "signup" && (
          <Link href="/?mode=login">Login with existing account.</Link>
        )}
      </p>
    </form>
  );
}
