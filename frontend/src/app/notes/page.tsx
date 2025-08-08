import NoteInput from "frontend/src/_components/NoteInput";
import NoteList from "frontend/src/_components/NoteList";

const Notes = () => {
	return (
		<div className="flex flex-col items-center h-screen">
			<div className="container mx-auto px-4 md:px-8 py-3">
				{/* take note input */}
				<div className="flex justify-center items-center mt-4">
					<NoteInput />
				</div>
				{/* show list of notes */}
				<NoteList notes={[]} />
			</div>
		</div>
	);
};

export default Notes;
