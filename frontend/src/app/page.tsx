"use client";
import { redirect } from "next/navigation";

export default function Home() {
	const token = localStorage.getItem("token");
	console.log(token, "Log: Root Token");

	if (!token) {
		redirect("/auth");
	}

	redirect("/n4d/patients");
}
