import { cookies } from "next/headers";

export const authenticated = async () =>
	(await cookies()).get("token") !== undefined;

export const setAuth = (username: string) => {
	(async () => {
		(await cookies()).set("token", username);
	})();
};
