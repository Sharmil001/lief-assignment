import { Patient } from "@b/drizzle/schema/schema";
import {
	DialogHeader,
	DialogTitle,
	Dialog,
	DialogContent,
} from "@f/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Label } from "@f/components/ui/label";
import { Input } from "@f/components/ui/input";
import { Button } from "@f/components/ui/button";
import { ChevronDown, Loader2 } from "lucide-react";
import { LoadingState } from "@f/app/patients/page";

const genderEnum = z.enum(["male", "female"]);

const patientSchema = z.object({
	firstName: z
		.string()
		.min(1, "First name is required")
		.max(100, "First name must be ≤ 100 characters"),
	lastName: z
		.string()
		.min(1, "Last name is required")
		.max(100, "Last name must be ≤ 100 characters"),
	dob: z
		.string()
		.refine((d) => !isNaN(Date.parse(d)), "Date of birth must be a valid date"),
	gender: genderEnum,
});

export type PatientSchemaType = z.infer<typeof patientSchema>;

interface PatientFormDialogProps {
	open: boolean;
	mode: "edit" | "create";
	patient?: Patient;
	onSubmit: (p: any) => void;
	onCancel: () => void;
	OpenChange: () => void;
	loading: LoadingState;
}

const PatientFormDialog: React.FC<PatientFormDialogProps> = ({
	mode,
	patient,
	onSubmit,
	onCancel,
	loading,
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<PatientSchemaType>({
		resolver: zodResolver(patientSchema),
		defaultValues: patient
			? {
					firstName: patient.firstName || "",
					lastName: patient.lastName || "",
					dob: patient.dob || "",
					gender: patient.gender as "male" | "female",
				}
			: {
					firstName: "",
					lastName: "",
					dob: "",
					gender: "male",
				},
	});

	return (
		<Dialog open>
			<DialogContent>
				<div className="space-y-4">
					<DialogHeader>
						<DialogTitle>
							{mode === "edit" ? "Edit Patient" : "New Patient"}
						</DialogTitle>
					</DialogHeader>
					<form
						onSubmit={handleSubmit((data) => onSubmit(data))}
						className="space-y-4"
					>
						<div className="space-y-2">
							<Label htmlFor="firstName">First Name</Label>
							<div>
								<Input
									variant="default"
									{...register("firstName")}
									placeholder="First name"
								/>
								{errors.firstName && (
									<span className="text-red-600 text-xs">
										{errors.firstName.message}
									</span>
								)}
							</div>
						</div>

						<div className="space-y-2">
							<Label htmlFor="lastName">Last Name</Label>
							<div>
								<Input
									variant="default"
									{...register("lastName")}
									placeholder="Last name"
								/>
								{errors.lastName && (
									<span className="text-red-600 text-xs">
										{errors.lastName.message}
									</span>
								)}
							</div>
						</div>

						<div className="space-y-2">
							<Label htmlFor="dob">Date of Birth</Label>
							<div>
								<Input
									type="date"
									variant="default"
									{...register("dob")}
									placeholder="Date of birth"
								/>
								{errors.dob && (
									<span className="text-red-600 text-xs">
										{errors.dob.message}
									</span>
								)}
							</div>
						</div>

						<div className="space-y-2">
							<Label htmlFor="dateOfBirth">Gender</Label>
							<div>
								<div className="w-full flex gap-1 border-1 rounded-lg p-2">
									<select
										className="w-full appearance-none px-2 text-sm focus:outline-none text-gray-700"
										{...register("gender")}
									>
										<option value="male">Male</option>
										<option value="female">Female</option>
									</select>
									<div className="flex items-center px-2 text-gray-700">
										<ChevronDown width={18} height={18} />
									</div>
								</div>
								{errors.gender && (
									<span className="text-red-600 text-xs">
										{errors.gender.message}
									</span>
								)}
							</div>
						</div>
						<div className="flex justify-end gap-2">
							<Button variant="secondary" onClick={onCancel}>
								Cancel
							</Button>
							<Button
								type="submit"
								variant="primary"
								disabled={loading === "save"}
							>
								{loading === "save" ? (
									<Loader2 className="w-4 h-4 animate-spin text-black" />
								) : (
									<span>{mode === "edit" ? "Update" : "Save"}</span>
								)}
							</Button>
						</div>
					</form>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default PatientFormDialog;
