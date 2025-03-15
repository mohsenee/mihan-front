'use client';

import { useState } from 'react';
import { useDropzone, Accept } from 'react-dropzone';
import { UploadCloud, X } from 'lucide-react';

interface FileUploadProps {
  onFilesUploaded: (files: File[]) => void;
}

export default function FileUpload({ onFilesUploaded }: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const fileTypes: Accept = {
    'image/*': [],
    'application/pdf': [],
    'application/msword': [],
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [],
    'application/vnd.ms-excel': [],
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [],
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: fileTypes,
    multiple: true,
    maxSize: 5 * 1024 * 1024, // 5MB limit
    onDrop: (acceptedFiles: File[]) => {
      setFiles((prevFiles: File[]) => {
        const newFiles = [...prevFiles, ...acceptedFiles];
        onFilesUploaded(newFiles); // Notify parent with the new files
        return newFiles;
      });
    },
  });

  const removeFile = (name: string) => {
    const newFiles = files.filter(file => file.name !== name);
    setFiles(newFiles);
    onFilesUploaded(newFiles); // Notify parent with the updated files
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <div
        {...getRootProps()}
        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition"
      >
        <input {...getInputProps()} />
        <UploadCloud className="mx-auto text-gray-400" size={40} />
        <p className="mt-2 text-gray-600">Drag & drop files here, or click to select</p>
      </div>

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file, index) => (
            <div key={index} className="flex items-center justify-between p-2 border rounded-lg shadow-sm">
              {file.type.startsWith('image/') && (
                <img src={URL.createObjectURL(file)} alt={file.name} className="w-10 h-10 object-cover rounded" />
              )}
              <p className="text-sm text-gray-700 truncate w-3/4">{file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)</p>
              <button onClick={() => removeFile(file.name)} className="text-red-500 hover:text-red-700">
                <X size={20} />
              </button>
            </div>
          ))}
          
        </div>
      )}
    </div>
  );
}
