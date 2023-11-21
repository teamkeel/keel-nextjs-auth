import { redirect } from "next/navigation";
import { APIClient } from "./keelClient";
import { cookies } from "next/headers";

const cookieName = "keelauthtoken";

// By setting the cookie to httpOnly it won't be accessible in the client.
// This is good for security but does mean you can't make Keel API calls
// from the client/browser.
// If you want to be able to make API calls from the browser then set this to false.
const httpOnly = true;

export type Options = {
  requireAuth: boolean;
};

export function useClient(options?: Options) {
  const url = process.env.KEEL_API_URL;
  if (!url) {
    throw new Error("KEEL_API_URL env var not set");
  }

  const client = new APIClient({
    baseUrl: url,
  });

  const token = cookies().get(cookieName);

  // If an authenticated client is required but we have
  // no token redirect to the login page
  if (options && options.requireAuth && !token) {
    redirect("/auth/login");
  }

  if (token) {
    client.client.setToken(token.value);
  }

  return client;
}

export function setAuthToken(token: string) {
  cookies().set(cookieName, token, {
    httpOnly,
    path: "/",
  });

  return useClient();
}

export function clearAuthToken() {
  cookies().delete({
    name: cookieName,
    httpOnly,
    path: "/",
  });
}
