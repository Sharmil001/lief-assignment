import { authenticated } from "@f/utils/auth";
import { redirect } from "next/navigation";

export default async function Home() {
	const token = authenticated();

	if (!token) {
		redirect("/auth");
	} else {
		redirect("/n4d/patients");
	}

	return null;
}
