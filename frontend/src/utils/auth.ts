import { cookies } from "next/headers";

export const authenticated = async () =>
	(await cookies()).get("username") !== undefined;

export const setAuth = (username: string) => {
	(async () => {
		(await cookies()).set("username", username);
	})();
};
