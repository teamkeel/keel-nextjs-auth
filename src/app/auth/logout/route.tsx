import { clearAuthToken } from "@/api";
import { redirect } from "next/navigation";

export function GET() {
  clearAuthToken();
  redirect("/");
}
