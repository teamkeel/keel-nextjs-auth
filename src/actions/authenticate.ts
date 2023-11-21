"use server";

import { setAuthToken, useClient } from "@/api";
import { Action } from "@/components/AuthForm";
import { redirect } from "next/navigation";

export const authenticate: Action = async (state, formData) => {
  const data = Object.fromEntries(formData.entries());

  let client = useClient();

  // In signup mode password and password confirmation must match
  if (state.mode == "signup") {
    if (data.password !== data.passwordConfirm) {
      return {
        ...state,
        error: "Passwords do not match",
      };
    }
  }

  const authRes = await client.api.mutations.authenticate({
    emailPassword: {
      email: data.email.toString(),
      password: data.password.toString(),
    },
    // If in signup mode we want to create a new Identity if one doesn't exist
    // Otherwise if the Identity doesn't exist we want to get an error back
    createIfNotExists: state.mode == "signup",
  });

  if (authRes.error) {
    return {
      ...state,
      error: authRes.error.message,
    };
  }

  setAuthToken(authRes.data.token);
  redirect("/profile");
};
