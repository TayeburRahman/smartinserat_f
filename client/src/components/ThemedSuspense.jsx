import React from "react";

function ThemedSuspense() {
  return (
    <div
      className="flex justify-center items-center"
      style={{ height: "calc(100vh - 110px)" }}
    >
      <div className="loader"></div>
    </div>
  );
}

export default ThemedSuspense;
