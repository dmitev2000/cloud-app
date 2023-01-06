import React, { useContext, useState } from "react";
import DragDrop from "./components/DragDrop";
import FileContext from "./context/FileContext";
import axios from "axios";
import "./App.css";
import Loader from "./components/Loader";

function App() {
  const fileCtx = useContext(FileContext);
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const calculateHandler = async (e) => {
    e.preventDefault();
    const form = document.getElementById("form");
    const formData = new FormData(form);
    setProcessing(true);
    setStartTime(new Date());
    await axios
      .post("http://localhost:5000/api/calc", formData, {
        headers: {
          "Content-Type": "multiport/form-data",
        },
      })
      .then((res) => {
        const blob = new Blob(res.data, { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = "output.txt";
        link.href = url;
        link.click();
        setProcessing(false);
        setDone(true);
        setEndTime(new Date());
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="app">
      <h1>Upload your file</h1>
      <form id="form" onSubmit={calculateHandler} encType="multipart/form-data">
        <DragDrop />
        <button type="submit" disabled={fileCtx.file === null || processing} className="btn">
          Calculate
        </button>
      </form>
      {processing && (
        <div className="loading">
          <span>Processing, please wait ...</span>
          <Loader />
        </div>
      )}
      {(done && !processing) && (
        <span>Completed! &#128338; Time elapsed {Math.abs(endTime - startTime)} ms</span>
      )}
    </div>
  );
}

export default App;
