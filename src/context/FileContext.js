import { createContext, useState } from "react";

const FileContext = createContext({
  file: null,
  updateFile: () => {}
});

export function FileContextProvider(props) {
  const [file, setFile] = useState(null);

  function updateFileHanler(f) {
    setFile(() => f);
  }

  const context = {
    file: file,
    updateFile: updateFileHanler
  };

  return (
    <FileContext.Provider value={context}>
      {props.children}
    </FileContext.Provider>
  );
}

export default FileContext;