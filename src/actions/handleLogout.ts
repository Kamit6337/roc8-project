"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const handleLogout = async () => {
  cookies().delete("_use");
  redirect("/login");
};

export default handleLogout;
