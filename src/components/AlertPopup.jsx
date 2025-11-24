import React from "react";

const AlertPopup = ({
  onNext,
  scaleX = 1,
  scaleY = 1,
  title = "All Set !",
  message = "Now let's move on to importing this data into Tally",
  buttonText = "Click to Continue",
}) => {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 100,
      }}
    >
      {/* Alert Box Container */}
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: `${30 * scaleY}px ${40 * scaleX}px`,
          borderRadius: `${14 * scaleX}px`,
          boxShadow: "0 12px 40px rgba(0, 0, 0, 0.12)",
          textAlign: "center",
          minWidth: `${320 * scaleX}px`,
          border: `1px solid rgba(102, 126, 234, 0.1)`,
          animation: "alertFadeIn 0.4s ease-out",
        }}
      >
        {/* Icon - Checkmark */}
        <div
          style={{
            fontSize: `${40 * scaleX}px`,
            color: "#667eea",
            marginBottom: `${15 * scaleY}px`,
            animation: "iconScale 0.5s ease-out",
          }}
        >
          ✓
        </div>

        {/* First line - "All Set !" */}
        <h2
          style={{
            fontSize: `${28 * scaleX}px`,
            fontWeight: "700",
            color: "#2c3e50",
            margin: `0 0 ${10 * scaleY}px 0`,
            letterSpacing: "-0.3px",
            fontFamily: "Arial, sans-serif",
          }}
        >
          {title}
        </h2>

        {/* Second line - "Now let's move on to importing this data into Tally" */}
        <p
          style={{
            fontSize: `${14 * scaleX}px`,
            fontWeight: "500",
            color: "#666666",
            margin: `0 0 ${25 * scaleY}px 0`,
            lineHeight: "1.5",
            letterSpacing: "0.2px",
            fontFamily: "Arial, sans-serif",
          }}
        >
          {message}
        </p>

        {/* Button - "Click to Continue" */}
        <button
          onClick={onNext}
          style={{
            backgroundColor: "#667eea",
            color: "#ffffff",
            border: "none",
            padding: `${11 * scaleY}px ${30 * scaleX}px`,
            borderRadius: `${8 * scaleX}px`,
            fontSize: `${14 * scaleX}px`,
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.3s ease",
            boxShadow: "0 6px 18px rgba(102, 126, 234, 0.3)",
            letterSpacing: "0.3px",
            fontFamily: "Arial, sans-serif",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#5568d3";
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow =
              "0 8px 25px rgba(102, 126, 234, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#667eea";
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow =
              "0 6px 18px rgba(102, 126, 234, 0.3)";
          }}
        >
          {buttonText}
        </button>
      </div>

      <style>{`
        @keyframes alertFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes iconScale {
          from {
            opacity: 0;
            transform: scale(0.5);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default AlertPopup;
