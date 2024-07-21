"use client";
import { useRouter } from "next/router";
import { useEffect } from "react";

const HomeError = () => {
  const router = useRouter();

  useEffect(() => {
    void router.push("/login");
  }, [router]);

  return null;
};

export default HomeError;
