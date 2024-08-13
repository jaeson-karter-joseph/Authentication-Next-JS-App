"use server";

import { createAuthSession } from "@/lib/auth";
import { hashUserPassword } from "@/lib/hash";
import { createUser } from "@/lib/user";
import { redirect } from "next/navigation";

export async function signup(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  let errors = {};

  if (!email || !email.includes("@")) {
    errors.email = "Please enter a valid email address.";
  }

  if (!password || password.length < 8) {
    errors.password = "Password must be at least 8 characters long.";
  }

  if (Object.keys(errors).length) {
    return { errors };
  }

  //store it in db

  const hashedPassword = hashUserPassword(password);

  try {
    const id = createUser(email, hashedPassword);
    await createAuthSession(id);
    redirect("/training");
  } catch (error) {
    if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
      errors.email = "Email already in use";
      return { errors };
    }

    throw error;
  }
}
