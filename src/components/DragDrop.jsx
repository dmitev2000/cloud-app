/* eslint-disable no-unused-vars */
import React, { useState, useContext } from "react";
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
      />
      {fileCtx.file ? <span>{fileCtx.file.name}</span> : <span>No file uploaded yet.</span>}
    </>
  );
}

export default DragDrop;
