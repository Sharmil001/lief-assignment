"use client";
import { redirect } from "next/navigation";

export default function Home() {
	const token = localStorage.getItem("token");
	console.log(token, "Log: RootToken");

	if (!token) {
		redirect("/login");
	}

	redirect("/n4d/patients");
}
