"use server";

import { useClient } from "@/api";
import { Action } from "@/components/CreateProfileForm";
import { redirect } from "next/navigation";

export const createProfile: Action = async (state, formData) => {
  const data = Object.fromEntries(formData.entries());

  let client = useClient({ requireAuth: true });

  const response = await client.api.mutations.createProfile({
    name: data.name.toString(),
    username: data.username.toString(),
  });

  if (response.error) {
    return {
      ...state,
      error: response.error.message,
    };
  }

  redirect("/profile");
};
