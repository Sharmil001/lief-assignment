const Header = () => {
	return (
		<div className="sticky top-0 w-full bg-white/70 z-1 border-b-2 backdrop-blur-2xl">
			<div className="container mx-auto px-4 md:px-8 py-3">
				<div className="flex justify-between">
					<div className="text-2xl sm:text-3xl font-bold tracking-tighter sm:block font-space-mono hover:text-amber-600 transition-colors">
						Note4Doc
					</div>
				</div>
			</div>
		</div>
	);
};

export default Header;
