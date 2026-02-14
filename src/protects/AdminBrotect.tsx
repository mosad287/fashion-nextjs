"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

function AdminBrotect({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
      router.push("/login");
      return;
    }

    if (role !== "admin") {
      router.push("/");
      return;
    }

    setLoading(false);
  }, []);

  if (loading) return null;

  return children;
}

export default AdminBrotect;
