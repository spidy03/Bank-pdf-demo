import React, { useEffect, useState } from "react";
import demoSteps from "../data/demoSteps";
import HighlightBox from "./HighlightBox";
import BorderHighlight from "./BorderHighlight";
import Tooltip from "./Tooltip";
import AlertPopup from "./AlertPopup";
import CompletionBanner from "./CompletionBanner";
import NavigationBar from "./NavigationBar";

const DemoEngine = () => {
  const [currentStep, setCurrentStep] = useState(demoSteps[0]);
  const [showBubble, setShowBubble] = useState(false);
  const [inactivityTimeout, setInactivityTimeout] = useState(null);
  const [containerRef, setContainerRef] = useState(null);
  const [imageWidth, setImageWidth] = useState(0);
  const [imageHeight, setImageHeight] = useState(0);
  const [showTooltip1, setShowTooltip1] = useState(false);
  const [showTooltip2, setShowTooltip2] = useState(false);
  const [showTooltip3, setShowTooltip3] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);

  // Initialize history state on mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const stepId = urlParams.get("step");

    if (stepId) {
      const step = demoSteps.find((s) => s.id === Number(stepId));
      if (step) {
        setCurrentStep(step);
        // Replace current history state with correct step
        window.history.replaceState(
          { stepId: step.id },
          "",
          `?step=${step.id}`
        );
      }
    } else {
      // Set initial history state for first step
      window.history.replaceState({ stepId: 1 }, "", "?step=1");
    }
  }, []);

  useEffect(() => {
    // reset bubble then show after configured delay
    setShowBubble(false);
    setShowTooltip1(false);
    setShowTooltip2(false);
    setShowTooltip3(false);
    const t = setTimeout(() => setShowBubble(true), currentStep.delay);
    return () => clearTimeout(t);
  }, [currentStep]);

  // Step 17 tooltip timing
  useEffect(() => {
    if (currentStep.id !== 17 || !showBubble) return;

    // Show tooltip 1 immediately
    setShowTooltip1(true);

    // Show tooltip 2 after 2.5 seconds
    const t2 = setTimeout(() => {
      setShowTooltip2(true);
    }, 2500);

    // Show tooltip 3 after 5 seconds
    const t3 = setTimeout(() => {
      setShowTooltip3(true);
    }, 5000);

    return () => {
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [currentStep, showBubble]);

  // Step 19 tooltip timing
  useEffect(() => {
    if (currentStep.id !== 19 || !showBubble) return;

    // Show tooltip 1 immediately
    setShowTooltip1(true);

    // Show tooltip 2 after 3 seconds
    const t2 = setTimeout(() => {
      setShowTooltip2(true);
    }, 3000);

    return () => {
      clearTimeout(t2);
    };
  }, [currentStep, showBubble]);

  // Step 20 tooltip timing
  useEffect(() => {
    if (currentStep.id !== 20 || !showBubble) return;

    // Show tooltip 1 immediately
    setShowTooltip1(true);

    // Show tooltip 2 after 2 seconds
    const t2 = setTimeout(() => {
      setShowTooltip2(true);
    }, 2000);

    return () => {
      clearTimeout(t2);
    };
  }, [currentStep, showBubble]);

  // Auto-advance after 10 seconds of inactivity
  useEffect(() => {
    if (!showBubble) {
      // Clear timeout if bubble is hidden
      if (inactivityTimeout) {
        clearTimeout(inactivityTimeout);
        setInactivityTimeout(null);
      }
      return;
    }

    // Set 10-second timeout to auto-advance
    const timeout = setTimeout(() => {
      goNext();
    }, 1000000);

    setInactivityTimeout(timeout);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showBubble, currentStep]);

  const goNext = () => {
    // Clear inactivity timeout when user clicks
    if (inactivityTimeout) {
      clearTimeout(inactivityTimeout);
      setInactivityTimeout(null);
    }

    const currentStepIndex = demoSteps.findIndex(
      (step) => step.id === currentStep.id
    );
    if (currentStepIndex < demoSteps.length - 1) {
      const next = demoSteps[currentStepIndex + 1];
      // hide current UI, navigate, push history so Back/Forward work
      setShowBubble(false);
      setCurrentStep(next);
      try {
        window.history.pushState({ stepId: next.id }, "", `?step=${next.id}`);
      } catch (e) {
        /* ignore */
      }
    } else {
      // Show completion banner when demo is finished
      setShowCompletion(true);
    }
  };

  const goPrevious = () => {
    // Clear inactivity timeout when user clicks
    if (inactivityTimeout) {
      clearTimeout(inactivityTimeout);
      setInactivityTimeout(null);
    }

    const currentStepIndex = demoSteps.findIndex(
      (step) => step.id === currentStep.id
    );
    if (currentStepIndex > 0) {
      const previous = demoSteps[currentStepIndex - 1];
      // hide current UI, navigate, push history so Back/Forward work
      setShowBubble(false);
      setCurrentStep(previous);
      try {
        window.history.pushState(
          { stepId: previous.id },
          "",
          `?step=${previous.id}`
        );
      } catch (e) {
        /* ignore */
      }
    }
  };

  // Handle Back/Forward browser navigation
  useEffect(() => {
    const handlePopState = (ev) => {
      // Get stepId from history state first, then from URL
      let stepId = ev.state?.stepId;

      if (!stepId) {
        const urlParams = new URLSearchParams(window.location.search);
        stepId = urlParams.get("step");
        if (stepId) stepId = Number(stepId);
      }

      if (stepId) {
        const step = demoSteps.find((d) => d.id === stepId);
        if (step) {
          setShowBubble(false);
          setCurrentStep(step);
          // Ensure history state is correct
          window.history.replaceState(
            { stepId: step.id },
            "",
            `?step=${step.id}`
          );
        }
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Keyboard navigation - Left/Right arrow keys
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrevious();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentStep]);

  // small horizontal adjustment to shift highlight/notification slightly left
  const H = currentStep.highlight || { x: 0, y: 0, width: 0, height: 0 };
  const SHIFT_LEFT = 0; // No shift needed with new positioning

  // Calculate scaled positions based on original image dimensions
  const originalWidth = currentStep.imageWidth || 1280;
  const originalHeight = currentStep.imageHeight || 720;

  // Use imageWidth/imageHeight state which gets updated on load
  const scaleX = imageWidth > 0 ? imageWidth / originalWidth : 1;
  const scaleY = imageHeight > 0 ? imageHeight / originalHeight : 1;

  const adjHighlight = {
    x: Math.max(0, H.x * scaleX - SHIFT_LEFT),
    y: H.y * scaleY,
    width: H.width * scaleX,
    height: H.height * scaleY,
  };

  // For step 2, handle expiration date highlight
  const expHighlight = currentStep.expirationHighlight || null;
  const adjExpHighlight = expHighlight
    ? {
        x: Math.max(0, expHighlight.x * scaleX),
        y: expHighlight.y * scaleY,
        width: expHighlight.width * scaleX,
        height: expHighlight.height * scaleY,
      }
    : null;

  // For step 17, handle dual highlights (left and right)
  const highlightLeft = currentStep.highlightLeft || null;
  const adjHighlightLeft = highlightLeft
    ? {
        x: Math.max(0, highlightLeft.x * scaleX),
        y: highlightLeft.y * scaleY,
        width: highlightLeft.width * scaleX,
        height: highlightLeft.height * scaleY,
      }
    : null;

  const highlightRight = currentStep.highlightRight || null;
  const adjHighlightRight = highlightRight
    ? {
        x: Math.max(0, highlightRight.x * scaleX),
        y: highlightRight.y * scaleY,
        width: highlightRight.width * scaleX,
        height: highlightRight.height * scaleY,
      }
    : null;

  // Calculate actual image dimensions when image loads
  const handleImageLoad = (event) => {
    const img = event.target;
    if (img) {
      // Get the actual rendered dimensions (not natural)
      setImageWidth(img.offsetWidth);
      setImageHeight(img.offsetHeight);
    }
  };

  // Update dimensions on window resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef) {
        const img = containerRef.querySelector("img");
        if (img) {
          setImageWidth(img.offsetWidth);
          setImageHeight(img.offsetHeight);
        }
      }
    };

    window.addEventListener("resize", handleResize);
    // Also trigger on orientation change
    window.addEventListener("orientationchange", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, [containerRef]);

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0f0f0f",
        overflow: "hidden",
      }}
    >
      {/* Border Container */}
      <div
        style={{
          position: "relative",
          padding: "20px",
          borderRadius: "12px",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          boxShadow:
            "0 20px 60px rgba(102, 126, 234, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Image Container */}
        <div
          ref={setContainerRef}
          style={{
            position: "relative",
            maxWidth: "90vw",
            maxHeight: "90vh",
            borderRadius: "8px",
            overflow: "visible",
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3)",
          }}
        >
          {/* Full Screen Image */}
          <img
            onLoad={handleImageLoad}
            src={`${currentStep.image}?v=${currentStep.id}`}
            alt="Demo Screen"
            style={{
              width: "auto",
              height: "auto",
              maxWidth: "88vw",
              maxHeight: "88vh",
              display: "block",
              backgroundColor: "#1a1a1a",
            }}
          />

          {/* Highlight (shifted left slightly) */}
          {showBubble && currentStep.highlightType === "border" && (
            <BorderHighlight
              x={adjHighlight.x}
              y={adjHighlight.y}
              width={adjHighlight.width}
              height={adjHighlight.height}
              borderColor="#FFD700"
              borderWidth={3}
            />
          )}

          {/* Highlight (bubble animation) */}
          {showBubble &&
            (!currentStep.highlightType ||
              (currentStep.highlightType !== "border" &&
                currentStep.highlightType !== "none")) && (
              <HighlightBox
                x={adjHighlight.x}
                y={adjHighlight.y}
                width={adjHighlight.width}
                height={adjHighlight.height}
              />
            )}

          {/* Tooltip for Step 1 only */}
          {showBubble && currentStep.id === 1 && (
            <Tooltip
              x={adjHighlight.x}
              y={adjHighlight.y}
              width={adjHighlight.width}
              height={adjHighlight.height}
              text="Click Here to open Settings"
              stepId={1}
              scaleX={scaleX}
              scaleY={scaleY}
              onNext={goNext}
            />
          )}

          {/* Tooltip for Step 2 - Excel Sheet Icon (top position) */}
          {showBubble && currentStep.id === 2 && (
            <Tooltip
              x={adjHighlight.x}
              y={adjHighlight.y}
              width={adjHighlight.width}
              height={adjHighlight.height}
              text="Click here to open Excel-Sheet"
              position="top"
              stepId={2}
              scaleX={scaleX}
              scaleY={scaleY}
              onNext={goNext}
            />
          )}

          {/* Tooltip for Expiration Date on Step 2 (left position) */}
          {showBubble && currentStep.id === 2 && adjExpHighlight && (
            <Tooltip
              x={adjExpHighlight.x}
              y={adjExpHighlight.y}
              width={adjExpHighlight.width}
              height={adjExpHighlight.height}
              text="Check Your Software Expiration Date"
              position="left"
              scaleX={scaleX}
              scaleY={scaleY}
            />
          )}

          {/* Tooltip for Step 3 - Open PDF Converter (below position) */}
          {showBubble && currentStep.id === 3 && (
            <Tooltip
              x={adjHighlight.x}
              y={adjHighlight.y}
              width={adjHighlight.width}
              height={adjHighlight.height}
              text="Click Here to Open Converter"
              position="below"
              stepId={3}
              scaleX={scaleX}
              scaleY={scaleY}
              onNext={goNext}
            />
          )}

          {/* Tooltip for Step 4 - Browse Button (left position) */}
          {showBubble && currentStep.id === 4 && (
            <Tooltip
              x={adjHighlight.x}
              y={adjHighlight.y}
              width={adjHighlight.width}
              height={adjHighlight.height}
              text="Click here to select file"
              position="left"
              stepId={4}
              scaleX={scaleX}
              scaleY={scaleY}
              onNext={goNext}
            />
          )}

          {/* Tooltip for Step 5 - File Selection Border (right position, instruction style) */}
          {showBubble && currentStep.id === 5 && (
            <Tooltip
              x={adjHighlight.x}
              y={adjHighlight.y}
              width={adjHighlight.width}
              height={adjHighlight.height}
              text="Select File"
              position="right"
              stepId={5}
              scaleX={scaleX}
              scaleY={scaleY}
              onNext={goNext}
            />
          )}

          {/* Tooltip for Step 6 - Open Button (below position) */}
          {showBubble && currentStep.id === 6 && (
            <Tooltip
              x={adjHighlight.x}
              y={adjHighlight.y}
              width={adjHighlight.width}
              height={adjHighlight.height}
              text="Click to Open PDF"
              position="below"
              stepId={6}
              scaleX={scaleX}
              scaleY={scaleY}
              onNext={goNext}
            />
          )}

          {/* Tooltip for Step 7 - Import Button (right position) */}
          {showBubble && currentStep.id === 7 && (
            <Tooltip
              x={adjHighlight.x}
              y={adjHighlight.y}
              width={adjHighlight.width}
              height={adjHighlight.height}
              text="Click to Import PDF"
              position="right"
              stepId={7}
              scaleX={scaleX}
              scaleY={scaleY}
              onNext={goNext}
            />
          )}

          {/* Tooltip for Step 8 - Autodetect Tables Button (below position) */}
          {showBubble && currentStep.id === 8 && (
            <Tooltip
              x={adjHighlight.x}
              y={adjHighlight.y}
              width={adjHighlight.width}
              height={adjHighlight.height}
              text="Click to Autodetect Tables"
              position="below"
              stepId={8}
              scaleX={scaleX}
              scaleY={scaleY}
              onNext={goNext}
            />
          )}

          {/* Tooltip for Step 9 - Select Bank Format (left position) */}
          {showBubble && currentStep.id === 9 && (
            <Tooltip
              x={adjHighlight.x}
              y={adjHighlight.y}
              width={adjHighlight.width}
              height={adjHighlight.height}
              text="Select Bank Format"
              position="left"
              stepId={9}
              scaleX={scaleX}
              scaleY={scaleY}
              onNext={goNext}
            />
          )}

          {/* Tooltip for Step 10 - Transaction Row Selection (left position) */}
          {showBubble && currentStep.id === 10 && (
            <Tooltip
              x={adjHighlight.x}
              y={adjHighlight.y}
              width={adjHighlight.width}
              height={adjHighlight.height}
              text="Select this bank format"
              position="left"
              stepId={10}
              scaleX={scaleX}
              scaleY={scaleY}
              onNext={goNext}
            />
          )}

          {/* Tooltip for Step 11 - Preview Pdf Button (top position) */}
          {showBubble && currentStep.id === 11 && (
            <Tooltip
              x={adjHighlight.x}
              y={adjHighlight.y}
              width={adjHighlight.width}
              height={adjHighlight.height}
              text="Click to view data"
              position="top"
              stepId={11}
              scaleX={scaleX}
              scaleY={scaleY}
              onNext={goNext}
            />
          )}

          {/* Tooltip for Step 12 - Send to Template Button (right position) */}
          {showBubble && currentStep.id === 12 && (
            <Tooltip
              x={adjHighlight.x}
              y={adjHighlight.y}
              width={adjHighlight.width}
              height={adjHighlight.height}
              text="Click to Send data"
              position="right"
              stepId={12}
              scaleX={scaleX}
              scaleY={scaleY}
              onNext={goNext}
            />
          )}

          {/* Tooltip for Step 13 - Close Button (left position) */}
          {showBubble && currentStep.id === 13 && (
            <Tooltip
              x={adjHighlight.x}
              y={adjHighlight.y}
              width={adjHighlight.width}
              height={adjHighlight.height}
              text="Close to continue"
              position="left"
              stepId={13}
              scaleX={scaleX}
              scaleY={scaleY}
              onNext={goNext}
            />
          )}

          {/* Tooltip for Step 14 - Open Excel Sheet Button (top position) */}
          {showBubble && currentStep.id === 14 && (
            <Tooltip
              x={adjHighlight.x}
              y={adjHighlight.y}
              width={adjHighlight.width}
              height={adjHighlight.height}
              text="Open Excel Sheet"
              position="top"
              stepId={14}
              scaleX={scaleX}
              scaleY={scaleY}
              onNext={goNext}
            />
          )}

          {/* Tooltip for Step 15 - Import PDF Bank data Button (top position) */}
          {showBubble && currentStep.id === 15 && (
            <Tooltip
              x={adjHighlight.x}
              y={adjHighlight.y}
              width={adjHighlight.width}
              height={adjHighlight.height}
              text="Click to import data"
              position="top"
              stepId={15}
              scaleX={scaleX}
              scaleY={scaleY}
              onNext={goNext}
            />
          )}

          {/* Tooltip for Step 16 - OK Button (left position) */}
          {showBubble && currentStep.id === 16 && (
            <Tooltip
              x={adjHighlight.x}
              y={adjHighlight.y}
              width={adjHighlight.width}
              height={adjHighlight.height}
              text="Click OK to continue"
              position="left"
              stepId={16}
              scaleX={scaleX}
              scaleY={scaleY}
              onNext={goNext}
            />
          )}

          {/* Tooltip 1 for Step 17 - Description column (right position) */}
          {showBubble &&
            currentStep.id === 17 &&
            showTooltip1 &&
            adjHighlightLeft && (
              <Tooltip
                x={adjHighlightLeft.x}
                y={adjHighlightLeft.y}
                width={adjHighlightLeft.width}
                height={adjHighlightLeft.height}
                text="Check Description Here"
                position="right"
                stepId="17-1"
                scaleX={scaleX}
                scaleY={scaleY}
              />
            )}

          {/* Tooltip 2 for Step 17 - Ledger Name column (left position) */}
          {showBubble &&
            currentStep.id === 17 &&
            showTooltip2 &&
            adjHighlightRight && (
              <Tooltip
                x={adjHighlightRight.x}
                y={adjHighlightRight.y}
                width={adjHighlightRight.width}
                height={adjHighlightRight.height}
                text="We have Successfully extracted party names based on description"
                position="left"
                stepId="17-2"
                scaleX={scaleX}
                scaleY={scaleY}
              />
            )}

          {/* Tooltip 3 for Step 17 - Ledger Name column (left position, clickable) */}
          {showBubble &&
            currentStep.id === 17 &&
            showTooltip3 &&
            adjHighlightRight && (
              <Tooltip
                x={adjHighlightRight.x}
                y={adjHighlightRight.y}
                width={adjHighlightRight.width}
                height={adjHighlightRight.height}
                text="Click here to Verify and Continue"
                position="left"
                stepId="17-3"
                scaleX={scaleX}
                scaleY={scaleY}
                onNext={goNext}
              />
            )}

          {/* Tooltip for Step 18 - Create Receipt /Payment Vouchers Button (left position with right arrow) */}
          {showBubble && currentStep.id === 18 && (
            <Tooltip
              x={adjHighlight.x}
              y={adjHighlight.y}
              width={adjHighlight.width}
              height={adjHighlight.height}
              text="Click to create voucher"
              position="left"
              stepId={18}
              scaleX={scaleX}
              scaleY={scaleY}
              onNext={goNext}
            />
          )}

          {/* Tooltip 1 for Step 19 - Voucher Created Confirmation (left position, warning style) */}
          {showBubble && currentStep.id === 19 && (
            <Tooltip
              x={adjHighlight.x}
              y={adjHighlight.y}
              width={adjHighlight.width}
              height={adjHighlight.height}
              text="We have successfully Create Payment/Receipt Voucher"
              position="left"
              stepId="19-1"
              scaleX={scaleX}
              scaleY={scaleY}
            />
          )}

          {/* Tooltip 2 for Step 19 - Voucher Created Confirmation (right position, instruction style) */}
          {showBubble && currentStep.id === 19 && showTooltip2 && (
            <Tooltip
              x={adjHighlight.x}
              y={adjHighlight.y}
              width={adjHighlight.width}
              height={adjHighlight.height}
              text="Continue Create Contra Voucher"
              position="right"
              stepId="19-2"
              scaleX={scaleX}
              scaleY={scaleY}
              onNext={goNext}
            />
          )}

          {/* Tooltip 1 for Step 20 - Cash/Bank Ledger Column (left position, warning style) */}
          {showBubble && currentStep.id === 20 && (
            <Tooltip
              x={adjHighlight.x}
              y={adjHighlight.y}
              width={adjHighlight.width}
              height={adjHighlight.height}
              text="Mentioned Created Cash and Bank Ledger in this column"
              position="left"
              stepId="20-1"
              scaleX={scaleX}
              scaleY={scaleY}
            />
          )}

          {/* Tooltip 2 for Step 20 - Create Contra Voucher Button (above position, instruction style, 2 sec delay) */}
          {showBubble && currentStep.id === 20 && showTooltip2 && (
            <Tooltip
              x={adjHighlight.x + adjHighlight.width / 2}
              y={adjHighlight.y + adjHighlight.height + 120}
              width={220}
              height={40}
              text="Click to Create Contra Voucher"
              position="top"
              stepId="20-2"
              scaleX={scaleX}
              scaleY={scaleY}
              onNext={goNext}
            />
          )}

          {/* Tooltip 1 for Step 21 - Contra Voucher Created (right position, warning style) */}
          {showBubble && currentStep.id === 21 && (
            <Tooltip
              x={adjHighlight.x}
              y={adjHighlight.y}
              width={adjHighlight.width}
              height={adjHighlight.height}
              text="We have successfully created contra voucher"
              position="right"
              stepId="21-1"
              scaleX={scaleX}
              scaleY={scaleY}
            />
          )}

          {/* Tooltip 2 for Step 21 - Contra Voucher Created (left position, instruction style) */}
          {showBubble && currentStep.id === 21 && (
            <Tooltip
              x={adjHighlight.x}
              y={adjHighlight.y}
              width={adjHighlight.width}
              height={adjHighlight.height}
              text="Click to Continue"
              position="left"
              stepId="21-2"
              scaleX={scaleX}
              scaleY={scaleY}
              onNext={goNext}
            />
          )}

          {/* Alert Popup for Step 22 - All Set Message */}
          {showBubble && currentStep.id === 22 && (
            <AlertPopup scaleX={scaleX} scaleY={scaleY} onNext={goNext} />
          )}

          {/* Tooltip for Step 23 - Bank Statement Selection (top position, instruction style) */}
          {showBubble && currentStep.id === 23 && (
            <Tooltip
              x={adjHighlight.x}
              y={adjHighlight.y}
              width={adjHighlight.width}
              height={adjHighlight.height}
              text="Select this Option"
              position="top"
              stepId="23-1"
              scaleX={scaleX}
              scaleY={scaleY}
              onNext={goNext}
            />
          )}

          {/* Tooltip for Step 24 - Open Button (below position, instruction style) */}
          {showBubble && currentStep.id === 24 && (
            <Tooltip
              x={adjHighlight.x}
              y={adjHighlight.y}
              width={adjHighlight.width}
              height={adjHighlight.height}
              text="Click on Open"
              position="below"
              stepId="24-1"
              scaleX={scaleX}
              scaleY={scaleY}
              onNext={goNext}
            />
          )}

          {/* Tooltip for Step 25 - Yes Button (below position, instruction style) */}
          {showBubble && currentStep.id === 25 && (
            <Tooltip
              x={adjHighlight.x}
              y={adjHighlight.y}
              width={adjHighlight.width}
              height={adjHighlight.height}
              text="Click to continue"
              position="below"
              stepId="25-1"
              scaleX={scaleX}
              scaleY={scaleY}
              onNext={goNext}
            />
          )}

          {/* Alert Popup for Step 26 - Success Message */}
          {showBubble && currentStep.id === 26 && (
            <AlertPopup
              scaleX={scaleX}
              scaleY={scaleY}
              onNext={goNext}
              title="Success !"
              message="Let's move to Tally to check this entries"
              buttonText="Click to Continue"
            />
          )}

          {/* Tooltip for Step 27 - Tally Prime Total Box (right position, instruction style) */}
          {showBubble && currentStep.id === 27 && (
            <Tooltip
              x={adjHighlight.x}
              y={adjHighlight.y}
              width={adjHighlight.width}
              height={adjHighlight.height}
              text="Click to Continue"
              position="right"
              stepId="27-1"
              scaleX={scaleX}
              scaleY={scaleY}
              onNext={goNext}
            />
          )}

          {/* Comment box at bottom-center */}
          {/* {showBubble && (
            <CommentBox
              x={adjHighlight.x}
              y={adjHighlight.y}
              width={adjHighlight.width}
              height={adjHighlight.height}
              text={currentStep.text}
            />
          )} */}

          {/* Clickable overlay on highlighted area (replaces Next button). */}
          {showBubble && adjHighlight && (
            <div
              onClick={goNext}
              style={{
                position: "absolute",
                top: adjHighlight.y,
                left: adjHighlight.x,
                width: adjHighlight.width,
                height: adjHighlight.height,
                cursor: "pointer",
                background: "transparent",
                borderRadius: "8px",
                zIndex: 40,
              }}
            />
          )}
        </div>
      </div>

      {/* Navigation Bar - Positioned at bottom with spread buttons */}
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          left: "0",
          right: "0",
          width: "100%",
          zIndex: 100,
        }}
      >
        <NavigationBar
          currentStep={currentStep.id}
          totalSteps={demoSteps.length}
          onNext={goNext}
          onPrevious={goPrevious}
        />
      </div>

      {/* Completion Banner - shown when demo is finished */}
      {showCompletion && <CompletionBanner scaleX={scaleX} scaleY={scaleY} />}
    </div>
  );
};

export default DemoEngine;
