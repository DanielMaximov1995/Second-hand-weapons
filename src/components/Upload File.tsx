'use client'
import { useState } from 'react';
import {FileState, MultiFileDropzone} from "@/components/Multi File Dropzone";
import {useEdgeStore} from "@/utils/edgeStore";

const MultiFileDropzoneUsage = () => {
    const [fileStates, setFileStates] = useState<FileState[]>([]);
    const { edgestore } = useEdgeStore();

    function updateFileProgress(key: string, progress: FileState['progress']) {
        setFileStates((fileStates) => {
            const newFileStates = structuredClone(fileStates);
            const fileState = newFileStates.find(
                (fileState) => fileState.key === key,
            );
            if (fileState) {
                fileState.progress = progress;
            }
            return newFileStates;
        });
    }

    const handleDeleteFile = async (url : number) => {
        // await edgestore.publicFiles.delete({
        //     url,
        // });
        console.log(fileStates)
    }

    const handleAddUrl = (url : string , key : string) => {
        const updateData = fileStates.find(i => i.key === key)
        console.log(fileStates)
        console.log(key)
        console.log(url)
        if (updateData) {
        updateData.url = url
            return updateData
        }
    }

    return (
        <>
            <MultiFileDropzone
                value={fileStates}
                onChange={(files) => {
                    setFileStates(files);
                }}
                dropzoneOptions={{
                    maxSize : 1024 * 1024 * 2.5
                }}
                onFileDeleted={handleDeleteFile}
                onFilesAdded={async (addedFiles) => {
                    setFileStates([...fileStates, ...addedFiles]);
                    await Promise.all(
                        addedFiles.map(async (addedFileState ) => {
                            try {
                                let res = await edgestore.publicFiles.upload({
                                    file: addedFileState.file,
                                    options : {
                                        temporary : true
                                    },
                                    onProgressChange: async (progress) => {
                                        updateFileProgress(addedFileState.key, progress);
                                        if (progress === 100) {
                                            await new Promise((resolve) => setTimeout(resolve, 1000));
                                            updateFileProgress(addedFileState.key, 'COMPLETE');
                                        }
                                    },
                                });
                                addedFileState.url = res.url

                                return addedFileState
                            } catch (err) {
                                updateFileProgress(addedFileState.key, 'ERROR');
                            }
                        }),
                    );
                }}
            />
        </>
    );
}

export default MultiFileDropzoneUsage