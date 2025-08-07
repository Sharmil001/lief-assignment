interface ButtonProps {
	type: string;
	name: string;
	onClick?: () => void;
}

const Button = (props: ButtonProps) => {
	return (
		<button
			className="bg-[#F9C79A] text-black font-bold px-6 py-1 border-2 
      border-black rounded-lg hover:bg-amber-400 transition-colors 
      shadow-[3px_3px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 
      whitespace-nowrap"
			onClick={props.onClick}
		>
			{props.name}
		</button>
	);
};

export default Button;
