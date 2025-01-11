import React, { createContext, useContext, useState, ReactNode } from "react";

interface CursorContextType {
  cursorHover: boolean;
  setCursorHover: React.Dispatch<React.SetStateAction<boolean>>;
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export const CursorProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cursorHover, setCursorHover] = useState<boolean>(false);

  return (
    <CursorContext.Provider value={{ cursorHover, setCursorHover }}>
      {children}
    </CursorContext.Provider>
  );
};

export const useCursorContext = (): CursorContextType => {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error("useCursorContext must be used within a CursorProvider");
  }
  return context;
};
