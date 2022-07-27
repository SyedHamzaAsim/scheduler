import { useState } from "react";

export const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);


  const transition = (newMode, replace = false) => {
    if (replace) {
      const newHistory = history.pop();
      setMode(newMode);
      setHistory([...newHistory, newMode]);
    } else {
      setMode(newMode);
      setHistory([...history, newMode]);
    }
  };

  function back() {
    if (history.length > 1) {
      const newHistory = history.pop();
      setMode(newHistory[newHistory.length - 1]);
    }
  };

  return {
    mode,
    transition,
    back
  };
};