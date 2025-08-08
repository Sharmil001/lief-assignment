"use client";
import Button from "frontend/src/_components/Button";
import { redirect } from "next/navigation";
import { useState } from "react";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");

		if (!email.trim() || !password) {
			setError("Please enter both email and password.");
			return;
		}

		// TODO: Add your authentication logic here
		// Example: call API to login

		if (email === "sharmil@gmail.com" && password === "123456") {
			redirect("/notes");
		}

		// console.log("Logging in with:", { email, password });

		// On success, redirect or set auth state accordingly
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-white px-4">
			<form
				onSubmit={handleSubmit}
				className="max-w-md w-full bg-white p-8 rounded z-10 relative border-2 border-black hover:shadow-[8px_8px_0px_rgba(0,0,0,0.1)] duration-300"
			>
				<div className="mb-6 text-4xl font-bold tracking-tighter mt-1 bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-red-500 text-center">
					Note4Doc
				</div>

				{error && (
					<div className="mb-4 text-sm text-red-600 bg-red-100 p-2 rounded">
						{error}
					</div>
				)}

				<label htmlFor="email" className="block mb-1 font-semibold">
					Email
				</label>
				<input
					id="email"
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="w-full p-3 mb-4 rounded border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] focus-within:shadow-none focus-within:outline-none focus-visible:outline-none duration-300"
					placeholder="your.email@example.com"
					required
				/>

				<label htmlFor="password" className="block mb-1 font-semibold">
					Password
				</label>
				<input
					id="password"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className="w-full p-3 mb-4 rounded border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] focus-within:shadow-none focus-within:outline-none focus-visible:outline-none duration-300"
					placeholder="••••••••••"
					required
				/>

				<Button name="Login" type="primary" className="w-full py-2 mt-2" />
			</form>
		</div>
	);
};

export default Login;
