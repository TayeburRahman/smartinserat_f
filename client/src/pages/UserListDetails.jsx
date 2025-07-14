import React, { useState } from "react";
  import { useTranslation } from "react-i18next";
  import { Submit } from "../components/Forms/stepForm/Submit";
  
  const UserListDetails = ({ formData, handledeleteList, isOpen, onToggle }) => {
    const { t } = useTranslation();
    const [selectedListData, setSelectedListData] = useState(null);
    const [showAllFields, setShowAllFields] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
    const germanFieldLabels = {
      // email: "E-Mail",
      // schema_name: "Schema-Name",
      // entityId: "Entitäts-ID",
      // portalIds: "Portal-IDs", 
      // subscriptionPause: "Abonnement pausiert",
      // activeUntil: "Aktiv bis",
      // subscriptionUpdatedAt: "Letzte Aktualisierung",
      // subscriptionExpire: "Abonnement läuft ab",
      // subscriptionExpired: "Abonnement abgelaufen",
      // pending: "Ausstehend",
      // deleted: "Gelöscht",
      listNumber: "Listennummer",
      listingTitle: "Listenname",
      listingType: "Immobilientyp",
      buildingType: "Gebäudetyp",
      specificBuildingType: "Spezifischer Gebäudetyp",
      newBuilding: "Neubau",
      monumentProtection: "Denkmalschutz",
      numberOfFloors: "Anzahl der Etagen",
      numberOfRooms: "Anzahl der Zimmer",
      numberOfBedrooms: "Anzahl der Schlafzimmer",
      numberOfBathrooms: "Anzahl der Badezimmer",
      livingArea: "Wohnfläche (m²)",
      usableArea: "Nutzfläche (m²)",
      plotArea: "Grundstücksfläche (m²)",
      numberOfGarages: "Anzahl der Garagen",
      typeOfParkingSpace: "Art des Parkplatzes",
      numberOfParkingSpaces: "Anzahl der Parkplätze",
      flatType: "Wohnungstyp",
      pass_valid_till: "Pass gültig bis",
      floor: "Etage",
      monthlyHousepayment: "Monatliche Hauskosten",
      parkingSpacePrice: "Preis für Stellplatz",
      landArea: "Grundstücksgröße",
      stateOfDevelopment: "Entwicklungsstand",  
      listingPrice: "Kaufpreis (€)",
      rentPrice: "Mietpreis (€)",
      nickName: "Spitzname",
      address: "Adresse",
      city: "Stadt",
      state: "Bundesland",
      zip: "PLZ",
      contactName: "Vorname Kontaktperson",
      lastName: "Nachname Kontaktperson",
      flowfactContactId: "FlowFact Kontakt-ID",
      phone: "Telefonnummer",
      formEmail: "Formular-E-Mail",
      nameHide: "Name verbergen",
      phoneNumberHide: "Telefonnummer verbergen",
      emailHide: "E-Mail verbergen",
      additionalCost: "Nebenkosten",
      secuirityCost: "Kaution",
      heatingCostinDetails: "Heizkosten im Detail",
      energySource: "Energiequelle",
      energy: "Energiepass vorhanden",
      energyPass: "Energieausweis",
      energyPassCreationDate: "Erstellungsdatum Energieausweis",
      typeOfHeating: "Heizungsart",
      typeOfEnergyPass: "Art des Energieausweises",
      yearOfBuilding: "Baujahr", 
      planCollection: "Grundrisse",
      hideAddress: "Adresse verbergen",
      status: "Status",
      contactType: "Kontaktart",
      // commission: "Provision",
      buildingphase: "Bauphase",
      energyEfficiencyClass: "Energieeffizienzklasse",
      leasablearea: "Vermietbare Fläche",
      totalarea: "Gesamtfläche",
      paymentIsSepa: "SEPA-Zahlung aktiviert",
      estatetype: "Immobilientyp (Detail)",
      // paymentIntentId: "Zahlungs-Intent-ID",
      paymentStatus: "Zahlungsstatus",
      description: "Beschreibung",
      additionalDescription: "Zusätzliche Beschreibung",
      features: "Merkmale",
      location: "Lage", 
      // imgCollection: "Bildergalerie",
    };
  
    const renderField = (key, value) => {
      if (Array.isArray(value)) {
        value = value.length > 0 ? value.join(", ") : "Keine Angaben";
      } else if (typeof value === "boolean") {
        value = value ? "Ja" : "Nein";
      } else if (value === null || value === undefined || value === "") {
        value = "N/A";
      } else if (typeof value === "object") {
        value = JSON.stringify(value);
      }
  
      return (
        <div key={key} style={{ overflowWrap: "break-word", wordBreak: "break-word" }}>
          <strong>{germanFieldLabels[key] || key}:</strong>
          <div
            style={{
              marginTop: "4px",
              whiteSpace: "pre-wrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {value}
          </div>
        </div>
      );
    };
  
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
          }}
        >
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            <span>{formData?.listingTitle || "Untitled Listing"}</span>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.95rem", flexWrap: "wrap" }}>
              <span
                style={{
                  backgroundColor: formData.status === "inactive" ? "#FFF3CD" : "#D4EDDA",
                  color: formData.status === "inactive" ? "#856404" : "#155724",
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
                  {new Date(formData.subscriptionUpdatedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              )}
              {formData?.subscriptionUpdatedAt && formData.activeUntil && <span style={{ color: "#666" }}> bis </span>}
              {formData?.activeUntil && (
                <span style={{ color: "#666", fontSize: "0.9rem" }}>
                  {new Date(formData.activeUntil).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              )}
            </div>
          </div>
          <span style={{ fontSize: "1.5rem", color: "#888" }}>{isOpen ? "−" : "+"}</span>
        </div>
  
        {isOpen && (
          <div style={{ padding: "20px", color: "#333" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "16px",
              }}
            >
              {Object.entries(formData)
                .filter(([key]) => germanFieldLabels[key])
                .slice(0, showAllFields ? undefined : 4)
                .map(([key, value]) => renderField(key, value))}
  
              {Array.isArray(formData.imgCollection) && formData.imgCollection.length > 0 && (
                <div style={{ width: "100%" }}>
                  <h3 style={{ marginBottom: "12px", fontWeight: "bold" }}>
                    {germanFieldLabels.imgCollection || "Images"}:
                  </h3>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
                      gap: "10px",
                    }}
                  >
                    {formData.imgCollection.map((img, index) => (
                      <div key={index} style={{ overflow: "hidden", borderRadius: "6px", border: "1px solid #ccc" }}>
                        <img
                          src={img}
                          alt={`Image ${index + 1}`}
                          style={{
                            width: "100%",
                            height: "100%",
                            maxHeight: "120px",
                            objectFit: "cover",
                            display: "block",
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
  
            <div style={{ marginTop: "16px", textAlign: "right" }}>
              <button
                onClick={() => setShowAllFields(!showAllFields)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#007bff",
                  cursor: "pointer",
                  fontSize: "0.95rem",
                }}
              >
                {showAllFields ? "Weniger anzeigen" : "Mehr anzeigen"}
              </button>
            </div>
  
            <div
              style={{
                marginTop: "24px",
                display: "flex",
                flexWrap: "wrap",
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
                  Jetzt bezahlen
                </button>
              )}
              <button
                onClick={() => setShowDeleteConfirm(true)}
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
                Anzeige löschen
              </button>
            </div>
  
            {selectedListData?._id === formData._id && (
              <div className="mt-8">
                <Submit listData={selectedListData} setListData={setSelectedListData} pages={[]} />
              </div>
            )}
  
            {/* Confirm Delete Modal */}
            {showDeleteConfirm && (
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0,0,0,0.5)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 1000,
                }}
              >
                <div
                  style={{
                    background: "#fff",
                    padding: "24px",
                    borderRadius: "8px",
                    maxWidth: "400px",
                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  <h3 style={{ marginBottom: "16px" }}>Möchten Sie dieses Inserat wirklich löschen?</h3>
                  <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                    <button
                      onClick={() => {
                        handledeleteList(formData._id);
                        setShowDeleteConfirm(false);
                      }}
                      style={{
                        padding: "8px 16px",
                        backgroundColor: "#e74c3c",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontWeight: "500",
                      }}
                    >
                      Ja, löschen
                    </button>
                    <button
                      onClick={() => setShowDeleteConfirm(false)}
                      style={{
                        padding: "8px 16px",
                        backgroundColor: "#ccc",
                        color: "#000",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontWeight: "500",
                      }}
                    >
                      Abbrechen
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };
  
  export default UserListDetails;
  