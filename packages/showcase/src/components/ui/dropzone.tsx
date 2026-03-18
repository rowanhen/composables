// Showcase imports from _internal/ to demonstrate primitive components.
// In your app, always import from @/components/ui-opinionated/ instead.
import { FileIcon, UploadIcon, XIcon } from "lucide-react";
import * as React from "react";
import {
	type Accept,
	type DropzoneOptions,
	type FileRejection,
	useDropzone,
} from "react-dropzone";

import { Button } from "@/components/_internal/button";
import { cn } from "@/lib/utils";

const DEFAULT_MAX_SIZE = 10 * 1024 * 1024; // 10MB
const DEFAULT_ACCEPT: Accept = { "application/pdf": [".pdf"] };

/**
 * Common file type presets for the `accept` prop.
 *
 * The `accept` prop uses MIME types as keys and file extensions as values.
 * This follows the HTML input accept attribute format used by react-dropzone.
 *
 * @example
 * // Single file type
 * accept={ACCEPT_PRESETS.PDF}
 *
 * @example
 * // Multiple file types (spread and merge)
 * accept={{ ...ACCEPT_PRESETS.IMAGES, ...ACCEPT_PRESETS.PDF }}
 *
 * @example
 * // Custom accept format: { [MIME_TYPE]: ['.extension', ...] }
 * accept={{
 *   'image/png': ['.png'],
 *   'image/jpeg': ['.jpg', '.jpeg'],
 *   'application/pdf': ['.pdf'],
 *   'text/csv': ['.csv'],
 *   'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
 * }}
 */
const ACCEPT_PRESETS = {
	/** PDF documents */
	PDF: { "application/pdf": [".pdf"] },
	/** Common image formats (PNG, JPEG, GIF, WebP) */
	IMAGES: {
		"image/png": [".png"],
		"image/jpeg": [".jpg", ".jpeg"],
		"image/gif": [".gif"],
		"image/webp": [".webp"],
	},
	/** CSV files */
	CSV: { "text/csv": [".csv"] },
	/** Excel files (xlsx, xls) */
	EXCEL: {
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
			".xlsx",
		],
		"application/vnd.ms-excel": [".xls"],
	},
	/** Word documents (docx, doc) */
	WORD: {
		"application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
			".docx",
		],
		"application/msword": [".doc"],
	},
	/** Common document types (PDF, Word, Excel) */
	DOCUMENTS: {
		"application/pdf": [".pdf"],
		"application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
			".docx",
		],
		"application/msword": [".doc"],
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
			".xlsx",
		],
		"application/vnd.ms-excel": [".xls"],
	},
} as const satisfies Record<string, Accept>;

// Utilities
function formatFileSize(bytes: number): string {
	if (bytes < 1024) return `${bytes} B`;
	if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
	return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function getAcceptDescription(accept: Accept): string {
	const extensions = Object.values(accept).flat();
	if (extensions.length === 0) return "any file";

	// Map common extensions to readable names
	const extensionNames: Record<string, string> = {
		".pdf": "PDF",
		".png": "PNG",
		".jpg": "JPG",
		".jpeg": "JPEG",
		".gif": "GIF",
		".webp": "WebP",
		".csv": "CSV",
		".xlsx": "Excel",
		".xls": "Excel",
		".docx": "Word",
		".doc": "Word",
	};

	const uniqueNames = [
		...new Set(
			extensions.map(
				(ext) => extensionNames[ext] || ext.replace(".", "").toUpperCase(),
			),
		),
	];
	return uniqueNames.join(", ");
}

/**
 * Get a human-readable rejection message for a file rejection error code.
 * Error codes come from react-dropzone's validation.
 *
 * @param code - Error code from react-dropzone (file-too-large, file-invalid-type, file-too-small, too-many-files)
 * @param maxSizeBytes - Max file size for error message
 * @param accept - Accept config for error message
 * @param maxFiles - Max files for error message (optional)
 */
function getRejectionMessage(
	code: string,
	maxSizeBytes: number,
	accept: Accept,
	maxFiles?: number,
): string {
	switch (code) {
		case "file-too-large":
			return `File is too large. Maximum size is ${formatFileSize(maxSizeBytes)}.`;
		case "file-too-small":
			return "File is too small.";
		case "file-invalid-type":
			return `Invalid file type. Please upload a ${getAcceptDescription(accept)} file.`;
		case "too-many-files":
			return maxFiles
				? `Too many files. Maximum is ${maxFiles} file${maxFiles === 1 ? "" : "s"}.`
				: "Too many files selected.";
		default:
			return "File could not be accepted.";
	}
}

// Context
interface DropZoneContextValue {
	getRootProps: ReturnType<typeof useDropzone>["getRootProps"];
	getInputProps: ReturnType<typeof useDropzone>["getInputProps"];
	/** File is being dragged over the dropzone */
	isDragActive: boolean;
	/** File being dragged matches accept criteria */
	isDragAccept: boolean;
	/** File being dragged does NOT match accept criteria */
	isDragReject: boolean;
	/** Dropzone is focused (keyboard navigation) */
	isFocused: boolean;
	/** File dialog is currently open */
	isFileDialogActive: boolean;
	/** Programmatically open the file dialog */
	open: () => void;
	disabled: boolean;
	hasError: boolean;
	hasFiles: boolean;
	accept: Accept;
	maxSizeBytes: number;
}

const DropZoneContext = React.createContext<DropZoneContextValue | null>(null);

function useDropZoneContext() {
	const context = React.useContext(DropZoneContext);
	if (!context) {
		throw new Error("DropZone components must be used within a DropZone");
	}
	return context;
}

/**
 * Root component props for the DropZone.
 *
 * Most options are passed directly to react-dropzone's useDropzone hook.
 * @see https://react-dropzone.js.org/#src for full documentation
 */
interface DropZoneProps {
	/**
	 * Callback when files are dropped or selected.
	 * Receives both accepted and rejected files.
	 */
	onDrop: DropzoneOptions["onDrop"];
	/**
	 * Callback fired only when files are accepted.
	 * Use this when you only care about valid files.
	 */
	onDropAccepted?: DropzoneOptions["onDropAccepted"];
	/**
	 * Callback fired only when files are rejected.
	 * Use this for custom rejection handling.
	 */
	onDropRejected?: DropzoneOptions["onDropRejected"];
	/**
	 * Accepted file types. Uses MIME types as keys and extensions as values.
	 *
	 * @example
	 * // Accept only PDFs
	 * accept={{ 'application/pdf': ['.pdf'] }}
	 *
	 * @example
	 * // Accept images
	 * accept={{
	 *   'image/png': ['.png'],
	 *   'image/jpeg': ['.jpg', '.jpeg'],
	 * }}
	 *
	 * @example
	 * // Use presets
	 * accept={ACCEPT_PRESETS.IMAGES}
	 *
	 * @default { 'application/pdf': ['.pdf'] }
	 */
	accept?: Accept;
	/** Maximum file size in bytes. @default 10MB */
	maxSizeBytes?: number;
	/** Minimum file size in bytes. @default 0 */
	minSizeBytes?: number;
	/** Maximum number of files (only relevant when multiple=true) */
	maxFiles?: number;
	/** Allow multiple file selection. @default false */
	multiple?: boolean;
	/** Disable the dropzone. @default false */
	disabled?: boolean;
	/** Disable click to open file dialog. @default false */
	noClick?: boolean;
	/** Disable keyboard navigation. @default false */
	noKeyboard?: boolean;
	/** Disable drag and drop. @default false */
	noDrag?: boolean;
	/**
	 * Custom validator function for additional file validation.
	 * Return null if valid, or FileError/FileError[] if invalid.
	 */
	validator?: DropzoneOptions["validator"];
	/** Called when file dialog is opened */
	onFileDialogOpen?: DropzoneOptions["onFileDialogOpen"];
	/** Called when file dialog is cancelled */
	onFileDialogCancel?: DropzoneOptions["onFileDialogCancel"];
	/** Visual state: show error styling */
	hasError?: boolean;
	/** Visual state: files are present */
	hasFiles?: boolean;
	children: React.ReactNode;
	className?: string;
}

function DropZone({
	onDrop,
	onDropAccepted,
	onDropRejected,
	accept = DEFAULT_ACCEPT,
	maxSizeBytes = DEFAULT_MAX_SIZE,
	minSizeBytes,
	maxFiles,
	multiple = false,
	disabled = false,
	noClick = false,
	noKeyboard = false,
	noDrag = false,
	validator,
	onFileDialogOpen,
	onFileDialogCancel,
	hasError = false,
	hasFiles = false,
	children,
	className,
}: DropZoneProps) {
	const {
		getRootProps,
		getInputProps,
		isDragActive,
		isDragAccept,
		isDragReject,
		isFocused,
		isFileDialogActive,
		open,
	} = useDropzone({
		onDrop,
		onDropAccepted,
		onDropRejected,
		accept,
		maxSize: maxSizeBytes,
		minSize: minSizeBytes,
		maxFiles,
		multiple,
		disabled,
		noClick,
		noKeyboard,
		noDrag,
		validator,
		onFileDialogOpen,
		onFileDialogCancel,
	});

	const contextValue = React.useMemo(
		() => ({
			getRootProps,
			getInputProps,
			isDragActive,
			isDragAccept,
			isDragReject,
			isFocused,
			isFileDialogActive,
			open,
			disabled,
			hasError,
			hasFiles,
			accept,
			maxSizeBytes,
		}),
		[
			getRootProps,
			getInputProps,
			isDragActive,
			isDragAccept,
			isDragReject,
			isFocused,
			isFileDialogActive,
			open,
			disabled,
			hasError,
			hasFiles,
			accept,
			maxSizeBytes,
		],
	);

	return (
		<DropZoneContext.Provider value={contextValue}>
			<div className={className}>{children}</div>
		</DropZoneContext.Provider>
	);
}

// Drop area
interface DropZoneAreaProps {
	children: React.ReactNode;
	className?: string;
}

function DropZoneArea({ children, className }: DropZoneAreaProps) {
	const {
		getRootProps,
		isDragActive,
		isDragAccept,
		isDragReject,
		disabled,
		hasError,
		hasFiles,
	} = useDropZoneContext();

	return (
		<div
			{...getRootProps()}
			data-slot="dropzone-area"
			data-drag-active={isDragActive || undefined}
			data-drag-accept={isDragAccept || undefined}
			data-drag-reject={isDragReject || undefined}
			className={cn(
				"rounded-[var(--radius-xl)] border p-8 transition-[opacity,box-shadow]",
				disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
				isDragActive && "border-primary bg-accent",
				isDragReject && "border-stroke-critical bg-destructive/10",
				hasError && "border-stroke-critical",
				hasFiles && "p-4",
				className,
			)}
		>
			{children}
		</div>
	);
}

// Hidden input
function DropZoneInput({ className }: { className?: string }) {
	const { getInputProps } = useDropZoneContext();
	return <input {...getInputProps()} className={className} />;
}

// Empty state content
interface DropZoneContentProps {
	title?: string;
	description?: string;
	className?: string;
}

function DropZoneContent({
	title = "Upload files",
	description,
	className,
}: DropZoneContentProps) {
	const { isDragActive, isDragAccept, isDragReject, accept, maxSizeBytes } =
		useDropZoneContext();

	const defaultDescription = `Accepts ${getAcceptDescription(accept)}, max ${formatFileSize(maxSizeBytes)}.`;

	const getDragMessage = () => {
		if (isDragReject) return "File type not accepted";
		if (isDragAccept) return "Drop your file here";
		if (isDragActive) return "Drop your file here";
		return "Drag and drop or click to upload";
	};

	return (
		<div
			className={cn("flex flex-col items-center gap-1 text-center", className)}
		>
			<div
				className={cn(
					"text-muted-foreground mb-3 flex size-10 items-center justify-center rounded-[var(--radius)] border transition-[opacity,box-shadow]",
					isDragAccept && "border-primary text-primary",
					isDragReject && "border-stroke-critical text-destructive",
				)}
			>
				<UploadIcon className="size-5" />
			</div>
			<span className="text-sm font-medium">{title}</span>
			<span
				className={cn(
					"text-muted-foreground text-xs",
					isDragReject && "text-destructive",
				)}
			>
				{getDragMessage()}
			</span>
			<span className="text-muted-foreground mt-0.5 text-xs">
				{description || defaultDescription}
			</span>
		</div>
	);
}

// File display
interface DropZoneFileProps {
	file: File;
	onRemove: () => void;
	disabled?: boolean;
	className?: string;
}

function DropZoneFile({
	file,
	onRemove,
	disabled = false,
	className,
}: DropZoneFileProps) {
	const handleRemove = (e: React.MouseEvent) => {
		e.stopPropagation();
		onRemove();
	};

	return (
		<div className={cn("flex items-center gap-3", className)}>
			<div className="text-muted-foreground flex size-10 shrink-0 items-center justify-center rounded-[var(--radius)] border">
				<FileIcon className="size-5" />
			</div>
			<div className="flex min-w-0 flex-1 flex-col gap-0.5">
				<span className="truncate text-sm font-medium">{file.name}</span>
				<span className="text-muted-foreground text-xs">
					{formatFileSize(file.size)}
				</span>
			</div>
			<Button
				variant="destructive"
				size="icon-sm"
				onClick={handleRemove}
				disabled={disabled}
				aria-label="Remove file"
			>
				<XIcon className="size-3.5" />
			</Button>
		</div>
	);
}

// File list for multiple files
interface DropZoneFileListProps {
	files: File[];
	onRemove: (index: number) => void;
	disabled?: boolean;
	className?: string;
}

function DropZoneFileList({
	files,
	onRemove,
	disabled = false,
	className,
}: DropZoneFileListProps) {
	return (
		<div className={cn("flex flex-col gap-2", className)}>
			{files.map((file, index) => (
				<DropZoneFile
					key={`${file.name}-${file.lastModified}`}
					file={file}
					onRemove={() => onRemove(index)}
					disabled={disabled}
				/>
			))}
		</div>
	);
}

export {
	DropZone,
	DropZoneArea,
	DropZoneInput,
	DropZoneContent,
	DropZoneFile,
	DropZoneFileList,
	useDropZoneContext,
	formatFileSize,
	getAcceptDescription,
	getRejectionMessage,
	DEFAULT_MAX_SIZE,
	DEFAULT_ACCEPT,
	ACCEPT_PRESETS,
};
export type { DropZoneProps, DropZoneFileProps, Accept, FileRejection };
