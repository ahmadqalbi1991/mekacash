"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { AuthApis } from "../apis/auth";

type CsrfContextType = {
  ready: boolean;
};

const CsrfContext = createContext<CsrfContextType>({
  ready: false,
});

export function CsrfTokenProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ready, setReady] = useState(false);

  const { mutate: generateCsrf, isPending } = AuthApis.useGenerateCsrf();

useEffect(() => {
  generateCsrf();
}, []);

  return (
    <CsrfContext.Provider value={{ ready }}>
      {children}
    </CsrfContext.Provider>
  );
}

export const useCsrf = () => useContext(CsrfContext);
