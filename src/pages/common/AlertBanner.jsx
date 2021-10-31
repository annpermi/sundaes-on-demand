import React from "react";
import Alert from "react-bootstrap/Alert";

function AlertBanner({ message, variant }) {
  const alertMsg =
    message || "An unexpected error occur. Please try again later.";
  const alertVariant = variant || "danger";
  return (
    <Alert variant={alertVariant} style={{ backgroundColor: "red" }}>
      {alertMsg}
    </Alert>
  );
}

export default AlertBanner;
