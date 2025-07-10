import React, { useEffect, useState } from "react";

const texts = ["Front End Developer", "Python Developer"];
const TYPING_SPEED = 100; // ms per character
const DELETING_SPEED = 50; // ms per character
const DELAY_AFTER_TYPED = 1200; // ms to wait after full text
const DELAY_AFTER_DELETED = 400; // ms to wait after deletion

export default function TypedText({ className = "" }) {
  const [textIndex, setTextIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

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
    <span className={className} style={{ fontFamily: "monospace", whiteSpace: "pre" }}>
      {displayed}
      <span style={{ opacity: showCursor ? 1 : 0 }}>|</span>
    </span>
  );
} 