import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { fetchToken } from "../clients/api";

export function useToken(initialToken: string | null) {
  const [token, setToken] = useState<string | null>(initialToken);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      fetchToken().then((maybeToken) => setToken(maybeToken || null));
    }

    if (status === "unauthenticated") {
      setToken(null);
    }
  }, [session, status]);

  return token;
}

export default useToken;
