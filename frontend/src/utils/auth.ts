import { cookies } from "next/headers";

export const authenticated = async () =>
	(await cookies()).get("token") !== undefined;
