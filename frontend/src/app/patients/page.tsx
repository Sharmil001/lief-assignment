"use client";

import { Patient } from "@b/drizzle/schema/schema";
import PatientFormDialog, {
	PatientSchemaType,
} from "@f/_components/PatientForm";
import PatientTabel from "@f/_components/PatientTabel";
import {
	addPatient,
	updatePatient,
	deletePatient,
	fetchPatientsWithPagination,
} from "@f/lib/patient-apis";
import { useEffect, useState } from "react";

export type LoadingState = null | "fetch" | "save";

export default function PatientsTable() {
	const [patients, setPatients] = useState<Patient[]>([]);
	const [row, setRow] = useState<Patient | null>(null);
	const [showDialog, setShowDialog] = useState(false);
	const [loading, setLoading] = useState<LoadingState>(null);
	const [pagination, setPagination] = useState({
		page: 1,
		limit: 10,
		total: 0,
	});

	useEffect(() => {
		async function loadPatients() {
			setLoading("fetch");
			try {
				const { data, total } = await fetchPatientsWithPagination(
					pagination.page,
					pagination.limit,
				);
				setPatients(data);
				setPagination((p) => ({ ...p, total }));
			} catch (err) {
				console.error(err);
			} finally {
				setLoading(null);
			}
		}

		loadPatients();
	}, [pagination.page, pagination.limit]);

	const handleSave = async (updated: PatientSchemaType & { id?: string }) => {
		setLoading("save");
		try {
			if (updated.id) {
				const [data] = await updatePatient(updated.id, updated);
				setPatients((prev) =>
					prev.map((p) => (p.id === updated.id ? data : p)),
				);
			} else {
				const [data] = await addPatient(updated);
				setPatients((prev) => [...prev, data]);
			}
			setShowDialog(false);
			setRow(null);
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(null);
		}
	};

	const handleDelete = async (id: string) => {
		setLoading("save");
		try {
			await deletePatient(id);
			setPatients((prev) => prev.filter((p) => p.id !== id));
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(null);
		}
	};

	const prevPage = () => {
		setPagination((p) => ({ ...p, page: Math.max(1, p.page - 1) }));
	};
	const nextPage = () => {
		setPagination((p) => ({
			...p,
			page: p.page * p.limit < p.total ? p.page + 1 : p.page,
		}));
	};

	return (
		<div className="w-full">
			<div className="container mx-auto px-4 md:px-8 py-3">
				<PatientTabel
					patients={patients}
					showEditDialog={(p) => {
						setRow(p);
						setShowDialog(true);
					}}
					deletePatient={handleDelete}
					showDialog={() => setShowDialog(true)}
					pagination={pagination}
					onPrevPage={prevPage}
					onNextPage={nextPage}
					loading={loading}
				/>
			</div>

			{showDialog && (
				<PatientFormDialog
					open
					mode={row ? "edit" : "create"}
					patient={row ?? undefined}
					onSubmit={(data) => handleSave({ ...data, id: row?.id })}
					onCancel={() => {
						setShowDialog(false);
						setRow(null);
					}}
					OpenChange={() => {
						setShowDialog(false);
						setRow(null);
					}}
					loading={loading}
				/>
			)}
		</div>
	);
}
