import { User } from "src/repos/user/models";
import { isBrowser } from "../utils/environment";

function apiUrl(apiPath: string): string {
  if (!isBrowser()) {
    return `${process.env.NEXTAUTH_URL}${apiPath}`;
  }
  return apiPath;
}

export async function fetchToken(): Promise<string | undefined> {
  const res = await fetch(apiUrl("/api/basta/token"));
  const data = await res.json();
  return data.token || undefined;
}

export async function fetchUserProfile(): Promise<User | undefined> {
  const res = await fetch(apiUrl("/api/auth/profile"));
  const data = await res.json();
  return data || undefined;
}

export async function resendVerificationEmail(): Promise<
  { message: string } | undefined
> {
  const res = await fetch(apiUrl("/api/email/resend"), {
    method: "POST",
  });
  const data = await res.json();
  return data || undefined;
}
