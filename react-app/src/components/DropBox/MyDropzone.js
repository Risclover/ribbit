import React, { DragEvent, useState } from "react";

export function MyDropzone() {
  const [isOver, setIsOver] = useState(false);
  const [files, setFiles] = useState([]);
  const [preview, setPreview] = useState("");

  // Define the event handlers
  const handleDragOver = (e) => {
    e.preventDefault();

    setIsOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsOver(false);

    // Fetch the files
    const droppedFiles = Array.from(event.dataTransfer.files);
    setFiles(droppedFiles);

    // Use FileReader to read file content
    droppedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreview(reader.result);
      };

      reader.onerror = () => {
        console.error("There was an issue reading the file.");
      };

      reader.readAsDataURL(file);

      return reader;
    });
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50px",
        width: "300px",
        border: "1px dotted",
        backgroundColor: isOver ? "lightgray" : "white",
        background: `url(${preview}) no-repeat center / cover`,
      }}
    >
      Drag and drop some files here
    </div>
  );
}
