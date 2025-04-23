import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { fetchUserProfile } from "../clients/api";

export type User = {
  id: string;
  name: string;
  email: string;
  image: string;
};

export function useUserProfile(initialProfile: User | undefined = undefined) {
  const [profile, setProfile] = useState<User | undefined>(initialProfile);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      fetchUserProfile().then((profile) => setProfile(profile || undefined));
    }

    if (status === "unauthenticated") {
      setProfile(undefined);
    }
  }, [session, status]);

  return profile;
}

export default useUserProfile;
