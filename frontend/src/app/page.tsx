import { authenticated } from "@f/utils/auth";
import { redirect } from "next/navigation";

export default function Home() {
	const token = authenticated();
	console.log(token, "Log: Root Token");

	if (!token) {
		redirect("/auth");
	}

	redirect("/n4d/patients");
}
