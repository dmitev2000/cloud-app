import React, { useContext } from "react";
import { FileUploader } from "react-drag-drop-files";
import FileContext from "../context/FileContext";

const fileTypes = ["txt"];

function DragDrop() {
  const fileCtx = useContext(FileContext);
  const handleChange = (file) => {
    fileCtx.updateFile(file);
  };
  return (
    <>
      <FileUploader
        handleChange={handleChange}
        name="file"
        multiple={false}
        types={fileTypes}
        classes="drop_area"
      />
      {fileCtx.file ? (
        <span>&#9989; {fileCtx.file.name}</span>
      ) : (
        <span>&#9940; No file uploaded yet.</span>
      )}
    </>
  );
}

export default DragDrop;
