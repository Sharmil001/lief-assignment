export function bytesToMB(bytes: number) {
	if (!bytes) return "0 MB";
	return (bytes / (1024 * 1024)).toFixed(2) + " MB";
}
