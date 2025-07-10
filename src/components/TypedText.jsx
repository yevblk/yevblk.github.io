import React, { useEffect, useState } from "react";

const texts = ["Web Developer", "Python Developer", "Automation Engineer"];
const TYPING_SPEED = 100; // ms per character
const DELETING_SPEED = 50; // ms per character
const DELAY_AFTER_TYPED = 400; // ms to wait after full text
const DELAY_AFTER_DELETED = 400; // ms to wait after deletion

export default function TypedText({ className = "" }) {
  const [textIndex, setTextIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((v) => !v);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    let timeout;
    const fullText = texts[textIndex];

    if (!isDeleting && displayed.length < fullText.length) {
      timeout = setTimeout(() => {
        setDisplayed(fullText.slice(0, displayed.length + 1));
      }, TYPING_SPEED);
    } else if (!isDeleting && displayed.length === fullText.length) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, DELAY_AFTER_TYPED);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => {
        setDisplayed(fullText.slice(0, displayed.length - 1));
      }, DELETING_SPEED);
    } else if (isDeleting && displayed.length === 0) {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % texts.length);
      }, DELAY_AFTER_DELETED);
    }
    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, textIndex]);

  return (
    <span
      className={className}
      style={{ fontFamily: "inherit", whiteSpace: "pre", position: "relative", display: "inline-block" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {displayed}
      <span style={{ opacity: showCursor ? 1 : 0 }}>|</span>
      {isHovered && (
        <>
          {/* Tooltip box */}
          <span
            style={{
              position: "absolute",
              top: "120%",
              left: "50%",
              transform: "translateX(-50%)",
              background: "linear-gradient(135deg, rgba(36,45,74,0.98) 60%, rgba(44,62,100,0.98) 100%)",
              color: "#e6eaf3",
              padding: "16px 28px 14px 28px",
              borderRadius: "14px",
              marginTop: "10px",
              fontSize: "1.05em",
              zIndex: 20,
              boxShadow: "0 8px 32px 0 rgba(0,0,0,0.25)",
              whiteSpace: "nowrap",
              backdropFilter: "blur(8px)",
              border: "1.5px solid #2a375a",
              opacity: 1,
              transition: "opacity 0.22s cubic-bezier(.4,2,.6,1), box-shadow 0.22s cubic-bezier(.4,2,.6,1)",
              pointerEvents: "auto"
            }}
          >
            {texts.filter((_, i) => i !== textIndex).map((t, i, arr) => (
              <div
                key={i}
                style={{
                  padding: "7px 0 7px 0",
                  borderBottom: i < arr.length - 1 ? "1px solid #2a375a" : "none",
                  letterSpacing: "0.2px",
                  fontWeight: 500,
                  fontFamily: "inherit",
                  borderRadius: "8px",
                  transition: "background 0.18s, color 0.18s",
                  cursor: "default"
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#23305a'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                {t}
              </div>
            ))}
            {/* Arrow */}
            <span
              style={{
                position: "absolute",
                top: "-13px",
                left: "50%",
                transform: "translateX(-50%)",
                width: 0,
                height: 0,
                borderLeft: "10px solid transparent",
                borderRight: "10px solid transparent",
                borderBottom: "13px solid rgba(36,45,74,0.98)",
                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.13))"
              }}
            />
          </span>
        </>
      )}
    </span>
  );
} 