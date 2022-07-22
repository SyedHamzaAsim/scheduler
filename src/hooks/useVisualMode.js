import { useState } from "react";

export const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);


  const transition = (newMode, replace = false) => {
    if (replace) {
      history.pop()
      setHistory([...history, newMode]);
      setMode(newMode);
      setHistory([...history, newMode]);
    } else {
      setMode(newMode);
      setHistory([...history, newMode]);
    }
  };

  function back() {
    if (history.length > 1) {
      history.pop();
      setMode(history[history.length - 1]);
    }
  };

  return {
    mode,
    transition,
    back
  };
};