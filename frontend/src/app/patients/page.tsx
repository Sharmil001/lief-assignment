// PatientsTable.tsx
"use client";

import * as React from "react";
import {
	ColumnDef,
	ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable,
	VisibilityState,
} from "@tanstack/react-table";
import {
	ArrowUpDown,
	ChevronLeft,
	ChevronRight,
	MoreHorizontal,
} from "lucide-react";
import {
	Table,
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
} from "frontend/src/components/ui/table";
import { Button } from "frontend/src/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "frontend/src/components/ui/dropdown-menu";
import { Input } from "frontend/src/components/ui/input";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "frontend/src/components/ui/dialog";
import { Label } from "frontend/src/components/ui/label";
import { redirect } from "next/navigation";

export type Patient = {
	id: string;
	name: string;
	dob: string;
	nhsNo: string;
};

const defaultPatients: Patient[] = [
	{
		id: "100001",
		name: "Alice Johnson",
		dob: "1980-06-12",
		nhsNo: "9999999991",
	},
	{
		id: "100002",
		name: "Rahul Patel",
		dob: "1974-05-02",
		nhsNo: "9999999992",
	},
	{
		id: "100003",
		name: "Sara Thompson",
		dob: "1985-01-10",
		nhsNo: "9999999993",
	},
	{
		id: "100004",
		name: "David Lee",
		dob: "1978-09-21",
		nhsNo: "9999999994",
	},
	{
		id: "100005",
		name: "Maria Garcia",
		dob: "1990-07-15",
		nhsNo: "9999999995",
	},
	{
		id: "100006",
		name: "Liam Smith",
		dob: "1992-11-30",
		nhsNo: "9999999996",
	},
	{
		id: "100007",
		name: "Chloe Brown",
		dob: "1983-03-18",
		nhsNo: "9999999997",
	},
];

export default function PatientsTable() {
	const [patients, setPatients] = React.useState<Patient[]>(defaultPatients);
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[],
	);
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = React.useState({});

	const [editingPatient, setEditingPatient] = React.useState<Patient | null>(
		null,
	);
	const [newPatientDialog, setNewPatientDialog] = React.useState(false);
	const [pagination, setPagination] = React.useState({
		pageIndex: 0,
		pageSize: 5,
	});

	const handleDelete = (id: string) => {
		// TODO: API call to delete
		setPatients((prev) => prev.filter((p) => p.id !== id));
	};

	const handleSave = (updated: Patient) => {
		// TODO: API call to update
		setPatients((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
		setEditingPatient(null);
	};

	const handleCreate = (newPatient: Patient) => {
		// TODO: API call to create
		setPatients((prev) => [
			...prev,
			{ ...newPatient, id: Date.now().toString() },
		]);
		setNewPatientDialog(false);
	};

	const columns: ColumnDef<Patient>[] = [
		{
			accessorKey: "name",
			header: ({ column }) => (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Name <ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			),
			cell: ({ row }) => (
				<div className="capitalize">{row.getValue("name")}</div>
			),
		},
		{
			accessorKey: "dob",
			header: "DOB",
			cell: ({ row }) => <div>{row.getValue("dob")}</div>,
		},
		{
			accessorKey: "nhsNo",
			header: "NHS Number",
			cell: ({ row }) => <div>{row.getValue("nhsNo")}</div>,
		},
		{
			id: "actions",
			enableHiding: false,
			cell: ({ row }) => {
				const patient = row.original;
				return (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" className="h-8 w-8 p-0">
								<MoreHorizontal className="h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem
								className="cursor-pointer"
								onClick={() => setEditingPatient(patient)}
							>
								Edit
							</DropdownMenuItem>
							<DropdownMenuItem
								className="cursor-pointer"
								onClick={() => handleDelete(patient.id)}
							>
								Delete
							</DropdownMenuItem>
							<DropdownMenuItem
								className="cursor-pointer"
								onClick={() => redirect(`/notes?patient=${patient.id}`)}
							>
								Add Notes
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				);
			},
		},
	];

	const table = useReactTable({
		data: patients,
		columns,
		getRowId: (row) => row.id,
		onSortingChange: setSorting,
		onPaginationChange: setPagination,
		onColumnFiltersChange: setColumnFilters,
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
			pagination,
		},
	});

	return (
		<div className="w-full">
			<div className="container mx-auto px-4 md:px-8 py-3">
				<div className="flex items-center justify-between py-4">
					<h1 className="text-2xl font-bold">Patients</h1>
					<div className="flex gap-4">
						<Input
							variant="default"
							placeholder="Filter patients by name..."
							value={
								(table.getColumn("name")?.getFilterValue() as string) ?? ""
							}
							onChange={(event) =>
								table.getColumn("name")?.setFilterValue(event.target.value)
							}
							className="max-w-sm"
						/>
						<Dialog open={newPatientDialog} onOpenChange={setNewPatientDialog}>
							<DialogTrigger asChild>
								<Button variant="secondary" className="border-2">
									Add Patient
								</Button>
							</DialogTrigger>
							<DialogContent>
								<PatientForm
									mode="create"
									onSubmit={handleCreate}
									onCancel={() => setNewPatientDialog(false)}
								/>
							</DialogContent>
						</Dialog>
					</div>
				</div>

				<div className="overflow-hidden rounded-md border">
					<Table className="relative bg-white">
						<TableHeader>
							{table.getHeaderGroups().map((headerGroup) => (
								<TableRow key={headerGroup.id}>
									{headerGroup.headers.map((header) => (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
													)}
										</TableHead>
									))}
								</TableRow>
							))}
						</TableHeader>
						<TableBody>
							{table.getPaginationRowModel().rows.length ? (
								table.getPaginationRowModel().rows.map((row) => (
									<TableRow key={row.id}>
										{row.getVisibleCells().map((cell) => (
											<TableCell key={cell.id}>
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext(),
												)}
											</TableCell>
										))}
									</TableRow>
								))
							) : (
								<TableRow>
									<TableCell
										colSpan={columns.length}
										className="h-24 text-center"
									>
										No results.
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</div>

				<div className="flex items-center justify-end space-x-2 py-4">
					<div className="text-muted-foreground flex-1 text-sm">
						{pagination.pageIndex + 1} of{" "}
						{(pagination.pageIndex + 1) * pagination.pageSize} row(s) selected.
					</div>

					<Button
						variant="outline"
						size="sm"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						<ChevronLeft className="h-4 w-4" />
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						<ChevronRight className="h-4 w-4" />
					</Button>
				</div>
			</div>

			{editingPatient && (
				<Dialog open onOpenChange={() => setEditingPatient(null)}>
					<DialogContent>
						<PatientForm
							mode="edit"
							patient={editingPatient}
							onSubmit={handleSave}
							onCancel={() => setEditingPatient(null)}
						/>
					</DialogContent>
				</Dialog>
			)}
		</div>
	);
}

function PatientForm({
	mode,
	patient,
	onSubmit,
	onCancel,
}: {
	mode: "edit" | "create";
	patient?: Patient;
	onSubmit: (p: Patient) => void;
	onCancel: () => void;
}) {
	const [form, setForm] = React.useState<Patient>(
		patient || { id: "", name: "", dob: "", nhsNo: "" },
	);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	return (
		<div className="space-y-4">
			<DialogHeader>
				<DialogTitle>
					{mode === "edit" ? "Edit Patient" : "New Patient"}
				</DialogTitle>
			</DialogHeader>
			<div className="grid gap-4 py-2">
				<div className="space-y-2">
					<Label htmlFor="name">Name</Label>
					<Input
						variant="default"
						name="name"
						value={form.name}
						onChange={handleChange}
						placeholder="Full Name"
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="dob">Date of Birth</Label>
					<Input
						variant="default"
						name="dob"
						type="date"
						value={form.dob}
						onChange={handleChange}
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="nhsNo">NHS Number</Label>
					<Input
						variant="default"
						name="nhsNo"
						value={form.nhsNo}
						onChange={handleChange}
						placeholder="9999999999"
					/>
				</div>
			</div>
			<div className="flex justify-end gap-2">
				<Button variant="secondary" onClick={onCancel}>
					Cancel
				</Button>
				<Button
					variant="primary"
					onClick={() =>
						onSubmit(
							mode === "edit" ? form : { ...form, id: Date.now().toString() },
						)
					}
				>
					Save
				</Button>
			</div>
		</div>
	);
}
