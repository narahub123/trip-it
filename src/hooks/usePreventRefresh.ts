import React, { useEffect } from "react";

const usePreventRefresh = () => {
  const preventClose = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = "";
    localStorage.setItem("redirect", "true");
  };

  useEffect(() => {
    (() => {
      window.addEventListener("beforeunload", preventClose);
    })();

    return () => {
      window.removeEventListener("beforeunload", preventClose);
    };
  }, []);
};

export default usePreventRefresh;
