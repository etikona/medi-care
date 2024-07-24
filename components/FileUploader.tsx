"use client";
import { convertFileToUrl } from "@/lib/utils";
import Image from "next/image";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import upload from "@/public/assets/icons/upload.svg";
type FileUploaderProps = {
  files: File[] | undefined;
  onChange: (files: File[]) => void;
};

const FileUploader = ({ files, onChange }: FileUploaderProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Do something with the files
    onChange(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="file-upload">
      <input {...getInputProps()} />
      {files && files?.length > 0 ? (
        <Image
          src={convertFileToUrl(files[0])}
          alt="file upload"
          height={1000}
          width={1000}
          className="max-h-[400px] overflow-hidden object-cover"
        />
      ) : (
        <>
          <Image src={upload} alt="upload icon" width={40} height={40} />
          <div className="file-upload_label">
            <p className="text-14-regular">
              <span className="text-blue-500">Click to upload</span> or drag and
              drop
            </p>
            <p>SVG, JPG, PNG or Gif (max 800 x 400)</p>
          </div>
        </>
      )}
    </div>
  );
};

export default FileUploader;
