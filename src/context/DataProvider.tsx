import {
  ReactElement,
  createContext,
  useContext,
  useState,
  useRef,
} from "react";

type DataContextProps = {
  constant: number;
  setConstant: React.Dispatch<React.SetStateAction<number>>;
  orbitControlRef: React.RefObject<any>;
  modelRef: React.RefObject<any>;
  debugEnable: boolean;
  setDebugEnable: React.Dispatch<React.SetStateAction<boolean>>;
};

const DataContext = createContext<DataContextProps | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactElement }) => {
  const [constant, setConstant] = useState(0.4);
  const [debugEnable, setDebugEnable] = useState(false); //TODO

  const orbitControlRef = useRef(null);
  const modelRef = useRef(null);

  return (
    <DataContext.Provider
      value={{
        constant,
        setConstant,
        orbitControlRef,
        modelRef,
        debugEnable,
        setDebugEnable,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("no DataProvider found");
  }
  return context;
};
