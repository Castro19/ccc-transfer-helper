import { useState } from "react";

const PDFInputField = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file && file.type === "application/pdf") {
      setFile(file);
    } else {
      alert("Please upload a PDF file.");
      setFile(null);
    }
  };

  return (
    <div className="mt-4 mb-4 flex flex-col items-center">
      <input
        type="file"
        onChange={handleFileChange}
        className="form-input px-4 py-2 border rounded-lg text-sm"
        accept="application/pdf"
      />
      {file && <p className="text-sm text-gray-600 mt-2">File: {file.name}</p>}
    </div>
  );
};

export default PDFInputField;
