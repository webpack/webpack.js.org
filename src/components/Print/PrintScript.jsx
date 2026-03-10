import { useEffect } from "react";

export default function PrintScript() {
  useEffect(() => {
    const mediaQuery = window.matchMedia("print");
    const listener = (mql) => {
      if (!mql.matches) {
        window.close();
      }
    };
    mediaQuery.addListener(listener);
    window.print();

    return () => mediaQuery.removeListener(listener);
  }, []);
  return null;
}
