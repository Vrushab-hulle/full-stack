// FunctionalErrorBoundary.js
import React from "react";
import { ErrorBoundary } from "react-error-boundary";

// Fallback component to show UI when error occurs
function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div
      role="alert"
      style={{
        padding: "2rem",
        background: "#ffe0e0",
        color: "#b00020",
        borderRadius: "8px",
        textAlign: "center",
      }}
    >
      <h2>Something went wrong.</h2>
      <pre style={{ whiteSpace: "pre-wrap" }}>{error.message}</pre>
      <button
        onClick={resetErrorBoundary}
        style={{
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          backgroundColor: "#b00020",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Try again
      </button>
    </div>
  );
}

// Wrapper component to be reused
export default function FunctionalErrorBoundary({ children }) {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, info) => {
        // Log error to monitoring service like Sentry or your backend
        console.error("Logged Error:", error);
        console.error("Component Stack:", info.componentStack);
      }}
      onReset={() => {
        // Optional: Reset logic (e.g. refetch data, reset state)
        console.log("Error boundary reset");
      }}
    >
      {children}
    </ErrorBoundary>
  );
}
