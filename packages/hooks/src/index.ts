"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@repo/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged, type User } from "firebase/auth";
import type { UserProfile } from "@repo/shared";

export function useAuthUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser);
      setLoading(false);
    });
  }, []);

  return { user, loading };
}

export function useRoleGate(allowedRoles: UserProfile["role"][]) {
  const { user, loading } = useAuthUser();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (!user) {
      setProfile(null);
      return;
    }

    return onSnapshot(doc(db, "users", user.uid), (snapshot) => {
      const data = snapshot.data() as UserProfile | undefined;
      setProfile(data ?? null);
    });
  }, [user]);

  const isAllowed = Boolean(profile && allowedRoles.includes(profile.role));
  return { loading, isAllowed, profile };
}

export function useBarangayTrend(barangayId: string) {
  const [values, setValues] = useState<number[]>([]);

  useEffect(() => {
    if (!barangayId) {
      setValues([]);
      return;
    }

    return onSnapshot(doc(db, "risk_trends", barangayId), (snapshot) => {
      const data = snapshot.data() as { values?: number[] } | undefined;
      setValues(data?.values ?? []);
    });
  }, [barangayId]);

  return values;
}
