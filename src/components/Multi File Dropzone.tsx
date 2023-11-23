"use client"
import { useDropzone, type DropzoneOptions } from 'react-dropzone';
import { twMerge } from 'tailwind-merge';
import {forwardRef, useMemo, useState} from "react";
import {CheckCircleIcon, FileIcon, FileWarningIcon, TrashIcon, UploadIcon} from "@/components/Icons";

const variants = {
    base: 'relative rounded-md p-4 max-w-[calc(100vw-1rem)] flex justify-center items-center flex-col cursor-pointer border border-dashed border-gray-400 dark:border-gray-300 transition-colors duration-200 ease-in-out',
    active: 'border-2',
    disabled:
        'bg-gray-200 border-gray-300 cursor-default pointer-events-none bg-opacity-30 dark:bg-gray-700 dark:border-gray-600',
    accept: 'border border-blue-500 bg-blue-500 bg-opacity-10',
    reject: 'border border-red-700 bg-red-700 bg-opacity-10',
};
export type FileState = {
    file: File;
    key: string; // used to identify the file in the progress callback
    progress: 'PENDING' | 'COMPLETE' | 'ERROR' | number;
    url ?: string
};
type InputProps = {
    className?: string;
    value?: FileState[];
    onChange?: (files: FileState[]) => void | Promise<void>;
    onFilesAdded?: (addedFiles: FileState[]) => void | Promise<void>;
    onFileDeleted ?: (url : number) => void;
    disabled?: boolean;
    dropzoneOptions?: Omit<DropzoneOptions, 'disabled'>;
};
const ERROR_MESSAGES = {
    fileTooLarge(maxSize: number) {
        return `הקובץ גדול מדי. גודל מקסימלי הוא ${formatFileSize(maxSize)}.`;
    },
    fileInvalidType() {
        return 'סוג קובץ לא תקין.';
    },
    tooManyFiles(maxFiles: number) {
        return `אפשר להוסיף רק ${maxFiles} קבצים.`;
    },
    fileNotSupported() {
        return 'הקובץ אינו נתמך.';
    },
};
const MultiFileDropzone = forwardRef<HTMLInputElement, InputProps>(
    (
        { dropzoneOptions, value, className, disabled, onFilesAdded , onFileDeleted, onChange },
        ref,
    ) => {
        const [customError, setCustomError] = useState<string>();
        if (dropzoneOptions?.maxFiles && value?.length) {
            disabled = disabled ?? value.length >= dropzoneOptions.maxFiles;
        }
        // dropzone configuration
        const {
            getRootProps,
            getInputProps,
            fileRejections,
            isFocused,
            isDragAccept,
            isDragReject,
        } = useDropzone({
            disabled,
            onDrop: (acceptedFiles) => {
                const files = acceptedFiles;
                setCustomError(undefined);
                if (
                    dropzoneOptions?.maxFiles &&
                    (value?.length ?? 0) + files.length > dropzoneOptions.maxFiles
                ) {
                    setCustomError(ERROR_MESSAGES.tooManyFiles(dropzoneOptions.maxFiles));
                    return;
                }
                if (files) {
                    const addedFiles = files.map<FileState>((file) => ({
                        file,
                        key: Math.random().toString(36).slice(2),
                        progress: 'PENDING',
                        url : ""
                    }));
                    void onFilesAdded?.(addedFiles);
                    void onChange?.([...(value ?? []), ...addedFiles]);
                }
            },
            ...dropzoneOptions,
        });

        // styling
        const dropZoneClassName = useMemo(
            () =>
                twMerge(
                    variants.base,
                    isFocused && variants.active,
                    disabled && variants.disabled,
                    (isDragReject ?? fileRejections[0]) && variants.reject,
                    isDragAccept && variants.accept,
                    className,
                ).trim(),
            [
                isFocused,
                fileRejections,
                isDragAccept,
                isDragReject,
                disabled,
                className,
            ],
        );

        // error validation messages
        const errorMessage = useMemo(() => {
            if (fileRejections[0]) {
                const { errors } = fileRejections[0];
                if (errors[0]?.code === 'file-too-large') {
                    return ERROR_MESSAGES.fileTooLarge(dropzoneOptions?.maxSize ?? 0);
                } else if (errors[0]?.code === 'file-invalid-type') {
                    return ERROR_MESSAGES.fileInvalidType();
                } else if (errors[0]?.code === 'too-many-files') {
                    return ERROR_MESSAGES.tooManyFiles(dropzoneOptions?.maxFiles ?? 0);
                } else {
                    return ERROR_MESSAGES.fileNotSupported();
                }
            }
            return undefined;
        }, [fileRejections, dropzoneOptions]);
        return (
            <div>
                <div className="flex flex-col gap-2">
                    <div>
                        <div
                            {...getRootProps({
                                className: dropZoneClassName,
                            })}
                        >
                            <input ref={ref} {...getInputProps()} />
                            <div className="flex flex-col items-center justify-center text-xs text-gray-400">
                                <UploadIcon fontSize={40}/>
                                <div className="text-gray-400">
                                    גרור ושחרר או לחץ כדי להעלות
                                </div>
                            </div>
                        </div>
                        <div className="mt-1 text-xs text-red-500">
                            {customError ?? errorMessage}
                        </div>
                    </div>

                    {value?.map(({ file, progress }, i) => (
                        <div
                            key={i}
                            className="flex h-16 max-w-[100vw] flex-col justify-center rounded border border-gray-300 px-4 py-2"
                        >
                            <div className="flex items-center gap-2 text-gray-500 dark:text-white">
                                <FileIcon color={"primary"} fontSize={22}/>
                                <div className="min-w-0 text-sm">
                                    <div className="overflow-hidden overflow-ellipsis whitespace-nowrap text-primary">
                                        {file.name}
                                    </div>
                                    <div className="text-xs text-secondary">
                                        {formatFileSize(file.size)}
                                    </div>
                                </div>
                                <div className="grow" />
                                <div className="flex w-12 items-center justify-end text-xs">
                                    {progress === 'PENDING' ? (
                                        <button
                                            className="rounded-md p-1 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                            onClick={() => {
                                                void onChange?.(
                                                    value.filter((_, index) => index !== i),
                                                );
                                            }}
                                        >
                                            <TrashIcon color={'error'} fontSize={22}/>
                                        </button>
                                    ) : progress === 'ERROR' ? (
                                        <FileWarningIcon color={'warning'} fontSize={22}/>
                                    ) : progress !== 'COMPLETE' ? (
                                        <div>{Math.round(progress)}%</div>
                                    ) : (
                                        <>
                                        <CheckCircleIcon color={'success'} fontSize={22}/>
                                            <button
                                                className="rounded-md p-1 duration-200"
                                                onClick={() => {
                                                    if (onFileDeleted) {
                                                        console.log(file)
                                                        onFileDeleted(i)
                                                    }
                                                }}
                                            >
                                                <TrashIcon color={'error'} fontSize={22}/>
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>

                            {typeof progress === 'number' && (
                                <div className="relative h-0">
                                    <div className="absolute top-1 h-1 w-full overflow-clip rounded-full bg-gray-200">
                                        <div
                                            className="h-full bg-gray-400 transition-all duration-300 ease-in-out"
                                            style={{
                                                width: progress ? `${progress}%` : '0%',
                                            }}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    },
);
MultiFileDropzone.displayName = 'MultiFileDropzone';
function formatFileSize(bytes?: number) {
    if (!bytes) {
        return '0 Bytes';
    }
    bytes = Number(bytes);
    if (bytes === 0) {
        return '0 Bytes';
    }
    const k = 1024;
    const dm = 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}
export { MultiFileDropzone };