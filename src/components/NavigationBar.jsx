import React from "react";

const NavigationBar = ({
  currentStep,
  totalSteps = 23,
  onNext,
  onPrevious,
}) => {
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  const handlePrevious = () => {
    if (!isFirstStep) {
      onPrevious();
    }
  };

  const handleNext = () => {
    if (!isLastStep) {
      onNext();
    }
  };

  // Base button styles - SMALLER SIZE
  const baseButtonStyle = {
    padding: "8px 18px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    fontSize: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    transition: "0.25s",
    fontWeight: "600",
    fontFamily: "Inter, Arial",
    whiteSpace: "nowrap",
  };

  // Light Blue enabled state
  const enabledButtonStyle = {
    ...baseButtonStyle,
    background: "linear-gradient(90deg, #87ceeb, #add8e6)",
    color: "#0a0a0a",
    boxShadow: "0 0 35px rgba(135, 206, 235, 0.6)",
    border: "1px solid rgba(135, 206, 235, 0.8)",
  };

  // Disabled state (dimmed)
  const disabledButtonStyle = {
    ...baseButtonStyle,
    background: "linear-gradient(90deg, #666666, #888888)",
    color: "#999999",
    boxShadow: "0 0 15px rgba(100, 100, 100, 0.3)",
    border: "1px solid rgba(100, 100, 100, 0.3)",
    cursor: "not-allowed",
    opacity: 0.5,
  };

  const previousButtonStyle = isFirstStep
    ? disabledButtonStyle
    : enabledButtonStyle;
  const nextButtonStyle = isLastStep ? disabledButtonStyle : enabledButtonStyle;

  // Arrow styling
  const arrowStyle = {
    fontWeight: "900",
    fontSize: "13px",
  };

  // Container styles for desktop - buttons on left and right
  const desktopContainerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "20px",
    padding: "12px 20px",
  };

  // Container styles for mobile (vertical - centered at bottom)
  const mobileContainerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center",
    gap: "10px",
    padding: "12px",
  };

  // Mobile button styles (full width)
  const mobileButtonStyle = {
    ...baseButtonStyle,
    width: "100%",
    justifyContent: "center",
    padding: "8px 14px",
    fontSize: "11px",
  };

  const mobilePreviousButtonStyle = isFirstStep
    ? { ...mobileButtonStyle, ...disabledButtonStyle }
    : { ...mobileButtonStyle, ...enabledButtonStyle };

  const mobileNextButtonStyle = isLastStep
    ? { ...mobileButtonStyle, ...disabledButtonStyle }
    : { ...mobileButtonStyle, ...enabledButtonStyle };

  return (
    <>
      {/* Desktop Layout - BUTTONS CENTERED */}
      <div
        style={{
          ...desktopContainerStyle,
          display: "none",
          "@media (min-width: 600px)": {
            display: "flex",
          },
        }}
        className="nav-desktop"
      >
        <button
          onClick={handlePrevious}
          disabled={isFirstStep}
          style={previousButtonStyle}
          onMouseEnter={(e) => {
            if (!isFirstStep) {
              e.currentTarget.style.filter = "brightness(1.2)";
              e.currentTarget.style.boxShadow =
                "0 0 55px rgba(135, 206, 235, 0.9)";
            }
          }}
          onMouseLeave={(e) => {
            if (!isFirstStep) {
              e.currentTarget.style.filter = "brightness(1)";
              e.currentTarget.style.boxShadow =
                "0 0 35px rgba(135, 206, 235, 0.6)";
            }
          }}
          title="Previous Step"
        >
          <span style={arrowStyle}>←</span> Previous
        </button>

        <button
          onClick={handleNext}
          disabled={isLastStep}
          style={nextButtonStyle}
          onMouseEnter={(e) => {
            if (!isLastStep) {
              e.currentTarget.style.filter = "brightness(1.2)";
              e.currentTarget.style.boxShadow =
                "0 0 55px rgba(135, 206, 235, 0.9)";
            }
          }}
          onMouseLeave={(e) => {
            if (!isLastStep) {
              e.currentTarget.style.filter = "brightness(1)";
              e.currentTarget.style.boxShadow =
                "0 0 35px rgba(135, 206, 235, 0.6)";
            }
          }}
          title="Next Step"
        >
          Next <span style={arrowStyle}>→</span>
        </button>
      </div>

      {/* Mobile Layout - BUTTONS ONLY */}
      <div style={mobileContainerStyle} className="nav-mobile">
        <button
          onClick={handlePrevious}
          disabled={isFirstStep}
          style={mobilePreviousButtonStyle}
          onMouseEnter={(e) => {
            if (!isFirstStep) {
              e.currentTarget.style.filter = "brightness(1.2)";
              e.currentTarget.style.boxShadow =
                "0 0 55px rgba(135, 206, 235, 0.9)";
            }
          }}
          onMouseLeave={(e) => {
            if (!isFirstStep) {
              e.currentTarget.style.filter = "brightness(1)";
              e.currentTarget.style.boxShadow =
                "0 0 35px rgba(135, 206, 235, 0.6)";
            }
          }}
          title="Previous Step"
        >
          <span style={arrowStyle}>←</span> Previous
        </button>

        <button
          onClick={handleNext}
          disabled={isLastStep}
          style={mobileNextButtonStyle}
          onMouseEnter={(e) => {
            if (!isLastStep) {
              e.currentTarget.style.filter = "brightness(1.2)";
              e.currentTarget.style.boxShadow =
                "0 0 55px rgba(135, 206, 235, 0.9)";
            }
          }}
          onMouseLeave={(e) => {
            if (!isLastStep) {
              e.currentTarget.style.filter = "brightness(1)";
              e.currentTarget.style.boxShadow =
                "0 0 35px rgba(135, 206, 235, 0.6)";
            }
          }}
          title="Next Step"
        >
          Next <span style={arrowStyle}>→</span>
        </button>
      </div>

      {/* Media Query Styles */}
      <style>{`
        @media (min-width: 600px) {
          .nav-desktop {
            display: flex !important;
          }
          .nav-mobile {
            display: none !important;
          }
        }

        @media (max-width: 599px) {
          .nav-desktop {
            display: none !important;
          }
          .nav-mobile {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
};

export default NavigationBar;
