import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Submit } from "../components/Forms/stepForm/Submit";

const UserListDetails = ({ formData, handledeleteList, isOpen, onToggle }) => {
  const { t } = useTranslation();
  const [selectedListData, setSelectedListData] = useState(null);

  const formatKey = (key) =>
    key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());

  const handlePayNow = () => {
    setSelectedListData(formData); 
  };

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
          backgroundColor: "#ffffff",
          padding: "16px 20px",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontWeight: 600,
          fontSize: "1.1rem",
          borderBottom: isOpen ? "1px solid #e0e0e0" : "none",
          transition: "background-color 0.2s ease",
        }}
      >
        <div style={{ display: "flex", gap: "6px" }}>
          <span>{formData?.listingTitle || "Untitled Listing"}</span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "0.95rem",
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                backgroundColor:
                  formData.status === "pending" ? "#FFF3CD" : "#D4EDDA",
                color: formData.status === "pending" ? "#856404" : "#155724",
                padding: "4px 10px",
                borderRadius: "12px",
                fontWeight: 500,
                minWidth: "80px",
                textAlign: "center",
              }}
            >
              {formData.status}
            </span>

            {formData?.subscriptionUpdatedAt && (
              <span style={{ color: "#666", fontSize: "0.9rem" }}>
                {new Date(formData.subscriptionUpdatedAt).toLocaleString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            )}

            {formData?.subscriptionUpdatedAt && formData.activeUntil && (
              <span style={{ color: "#666", fontSize: "0.9rem" }}> to </span>
            )}

            {formData?.activeUntil && (
              <span style={{ color: "#666", fontSize: "0.9rem" }}>
                {new Date(formData.activeUntil).toLocaleString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            )}
          </div>
        </div>

        {/* Right Icon */}
        <span style={{ fontSize: "1.5rem", color: "#888" }}>
          {isOpen ? "−" : "+"}
        </span>
      </div>

      {/* Collapsible Details Section */}
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
                } catch {
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

          {/* Pay Now + Delete */}
          <div
            style={{
              marginTop: "24px",
              display: "flex",
              justifyContent: "flex-end",
              gap: "10px",
            }}
          >
            {formData?.paymentStatus !== "completed" && (
              <button
                onClick={handlePayNow}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#3498db",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "500",
                }}
              >
                Pay Now
              </button>
            )}

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
 
          {selectedListData?._id === formData._id && (
            <div className="mt-8">
              <Submit
                listData={selectedListData}
                setListData={setSelectedListData}
                pages={[]}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserListDetails;
