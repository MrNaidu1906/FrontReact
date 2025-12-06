import React, { useState, useEffect } from "react";

function Timer() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <span style={{ color: "yellow", fontWeight: "bold", marginLeft: "20px" }}>
      ⏰{time.toLocaleTimeString()}
    </span>
  );
}

export default Timer;
