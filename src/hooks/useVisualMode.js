import { useState } from "react";

export const useVisualMode = (initial) => {
  const [history, setHistory] = useState([initial]);


  const transition = (mode, replace = false) => {
    setHistory(prev => replace ? [...prev.slice(0, prev.length - 1), mode] : [...prev, mode])
  };

  function back() {
    if (history.length < 2) {
      return
    } else {
      setHistory(prev => [...prev.slice(0, history.length - 1)])
    }
  };

  return {
    mode: history[history.length -1],
    transition,
    back
  };
};