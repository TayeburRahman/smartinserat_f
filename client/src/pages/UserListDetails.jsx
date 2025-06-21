import React from "react";
import { useTranslation } from "react-i18next";

const UserListDetails = ({ formData, handledeleteList, isOpen, onToggle }) => {
  const { t } = useTranslation();

  const formatKey = (key) =>
    key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        marginBottom: "16px",
        background: "#fff",
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
        overflow: "hidden",
        color: "#000",
      }}
    >
      {/* Header */}
      <div
        onClick={onToggle}
        style={{
          backgroundColor: "#f5f5f5",
          padding: "16px 20px",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontWeight: "600",
          fontSize: "1.1rem",
          borderBottom: isOpen ? "1px solid #ddd" : "none",
        }}
      >
        <span>{formData?.listingTitle || "Untitled Listing"}</span>
        <span style={{ fontSize: "1.5rem" }}>{isOpen ? "−" : "+"}</span>
      </div>

      {/* Details */}
      {isOpen && (
        <div style={{ padding: "20px", color: "#333" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: "16px",
            }}
          >
            {Object.entries(formData).map(([key, value]) => {
              if (["_id", "__v"].includes(key)) return null;

              if (Array.isArray(value)) {
                value = value.length > 0 ? value.join(", ") : "None";
              } else if (typeof value === "boolean") {
                value = value ? "Yes" : "No";
              } else if (typeof value === "object" && value !== null) {
                try {
                  value = JSON.stringify(value);
                } catch (err) {
                  value = "Unsupported data";
                }
              }

              if (value === null || value === undefined || value === "") {
                value = "N/A";
              }

              return (
                <div key={key} style={{ fontSize: "0.95rem" }}>
                  <strong>{formatKey(key)}:</strong>
                  <div style={{ marginTop: "4px" }}>{value}</div>
                </div>
              );
            })}
          </div>

          {/* Delete Button */}
          <div style={{ marginTop: "24px", textAlign: "right" }}>
            <button
              onClick={() => handledeleteList(formData._id)}
              style={{
                padding: "10px 20px",
                backgroundColor: "#e74c3c",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "500",
              }}
            >
              Delete Listing
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserListDetails;
