import { authenticated } from "../utils/auth";

export default async function Home() {
	const isAuth = await authenticated();
	// if (!isAuth) {
	// 	redirect("/login");
	// }

	return <h1>Dashboard</h1>;
}
