import express from "express";
import cors from "cors";
import patientRoutes from "./api/patient/patient.routers";
import noteRoutes from "./api/note/note.routers";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/patients", patientRoutes);
app.use("/api/notes", noteRoutes);

app.get("/", (_, res) => {
	res.json({
		message: "Backend is running",
		success: true,
	});
});

export default app;
