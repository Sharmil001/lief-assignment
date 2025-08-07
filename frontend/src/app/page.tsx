import Button from "../_components/Button";
import NoteInput from "../_components/NoteInput";
import NoteList from "../_components/NoteList";

export default function Home() {
	return (
		<div className="flex flex-col items-center h-screen">
			<div className="container mx-auto px-4 md:px-8 py-3">
				{/* take note input */}
				<div className="flex justify-center items-center mt-4">
					<NoteInput />
				</div>
				{/* show list of notes */}
				<NoteList />
			</div>
		</div>
	);
}
