import { CircleUser, LogOut } from "lucide-react";
// import Button from "./Button";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Button } from "../components/ui/button";

const Header = () => {
	const logOut = () => {
		// console.log("logout");
		redirect("/login");
	};

	return (
		<div className="sticky top-0 w-full bg-white/70 z-40 border-b-2 backdrop-blur-2xl">
			<div className="container mx-auto px-4 md:px-8 py-3">
				<div className="flex justify-between items-center">
					<div className="flex items-center gap-4">
						<div className="text-2xl font-bold tracking-tighter mr-2">
							<a href="/">
								<Image src="/logo.png" alt="logo" width={70} height={70} />
							</a>
						</div>
						<div className="flex gap-4">
							<div className="flex gap-2">
								<a
									href="/patients"
									className="font-semibold hover:text-amber-600"
								>
									Patients
								</a>
							</div>
							<div className="flex gap-2">
								<a href="/notes" className="font-semibold hover:text-amber-600">
									Notes
								</a>
							</div>
						</div>
					</div>
					<div className="flex gap-2 items-center">
						<div className="flex gap-1">
							<CircleUser />
							<div className="font-semibold">Hi, Sharmil!</div>
						</div>
						<Button name="Logout" variant="primary">
							<LogOut width={18} height={18} />
							<span>Logout</span>
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Header;
