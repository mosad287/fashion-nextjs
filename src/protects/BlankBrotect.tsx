"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

function BlankBrotect({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) return null;

  return children;
}

export default BlankBrotect;
