import { useState, useEffect } from "react";

export const Notification = ({ feedback }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (feedback.msg === null) {
      setVisible(false);
      return;
    }
    setVisible(true);
    const t = setTimeout(() => setVisible(false), 3000);
    return () => clearTimeout(t); //cancel redunded setTimeout
  }, [feedback]);

  return (
    <div
      className={`notification ${feedback.isError ? "error" : ""} ${visible ? "visible" : ""}`}
    >
      {feedback.msg}
    </div>
  );
};

export default Notification;
