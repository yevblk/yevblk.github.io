/**
 * MotionHeadline — Framer/Linear-style animated headline with spring slide, fade, blur, and gradient text.
 * When selected, headline text becomes accent color for readability.
 * Always renders each phrase in two lines (split by first space).
 * @param {Object} props
 * @param {string[]} [props.words] - Array of words/phrases to cycle through.
 * @param {number} [props.displayDuration] - Seconds each word is shown (default: 2.2).
 * @param {number} [props.animationDuration] - Seconds for transition (default: 0.7).
 * @param {string} [props.direction] - 'vertical' or 'horizontal' slide (default: 'vertical').
 * @param {number} [props.blur] - Max blur in px (default: 8).
 * @param {string} [props.className] - Additional className for styling.
 * @param {string} [props.gradient] - CSS gradient for text (default: accent/blue from project palette).
 */
import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";

const DEFAULT_WORDS = ["Web Developer", "Python Developer", "Automation Engineer"];
const DEFAULT_ANIMATION_DURATION = 0.7;
const DEFAULT_DISPLAY_DURATION = 2.2;
const DEFAULT_DIRECTION = "vertical";
const DEFAULT_BLUR = 8;
const DEFAULT_GRADIENT =
  "linear-gradient(90deg, #60a5fa 0%, #3b82f6 60%, #1d4ed8 100%)";

/**
 * Splits a phrase into two lines by the first space.
 * @param {string} phrase
 * @returns {[string, string]}
 */
const splitTwoLines = (phrase) => {
  const idx = phrase.indexOf(" ");
  return idx === -1 ? [phrase, ""] : [phrase.slice(0, idx), phrase.slice(idx + 1)];
};

export default function MotionHeadline({
  words = DEFAULT_WORDS,
  displayDuration = DEFAULT_DISPLAY_DURATION,
  animationDuration = DEFAULT_ANIMATION_DURATION,
  direction = DEFAULT_DIRECTION,
  blur = DEFAULT_BLUR,
  className = "",
  gradient = DEFAULT_GRADIENT,
}) {
  const [index, setIndex] = useState(0);
  const [isSelected, setIsSelected] = useState(false);
  const rootRef = useRef(null);

  // Memoize split lines for all words for layout stability
  const longestLines = useMemo(() => {
    let longestFirst = "", longestSecond = "";
    for (const w of words) {
      const [a, b] = splitTwoLines(w);
      if (a.length > longestFirst.length) longestFirst = a;
      if (b.length > longestSecond.length) longestSecond = b;
    }
    return { longestFirst, longestSecond };
  }, [words]);

  // Memoize current lines
  const [line1, line2] = useMemo(() => splitTwoLines(words[index]), [words, index]);

  // Memoize animation variants
  const axis = direction === "horizontal" ? "x" : "y";
  const offset = 24;
  const variants = useMemo(() => ({
    initial: {
      opacity: 0,
      [axis]: offset,
      filter: `blur(${blur}px)`
    },
    animate: {
      opacity: 1,
      [axis]: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 18,
        mass: 0.7,
        duration: animationDuration,
      },
    },
    exit: {
      opacity: 0,
      [axis]: -offset,
      filter: `blur(${blur}px)`,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 18,
        mass: 0.7,
        duration: animationDuration,
      },
    },
  }), [axis, blur, animationDuration]);

  // Memoize gradient text style
  const gradientTextStyle = useMemo(() => (
    isSelected
      ? { color: "#3b82f6", background: "none", WebkitBackgroundClip: "initial", WebkitTextFillColor: "initial" }
      : {
          background: gradient,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          color: "transparent",
          display: "inline-block",
          transition: "background 0.4s cubic-bezier(.4,2,.6,1)",
        }
  ), [isSelected, gradient]);

  // Selection detection handler
  const checkSelection = useCallback(() => {
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed) {
      setIsSelected(false);
      return;
    }
    if (rootRef.current && sel.rangeCount > 0) {
      const range = sel.getRangeAt(0);
      if (rootRef.current.contains(range.startContainer) || rootRef.current.contains(range.endContainer)) {
        setIsSelected(true);
        return;
      }
    }
    setIsSelected(false);
  }, []);

  // Detect selection inside the headline
  useEffect(() => {
    document.addEventListener("selectionchange", checkSelection);
    return () => document.removeEventListener("selectionchange", checkSelection);
  }, [checkSelection]);

  // Animate headline
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIndex((i) => (i + 1) % words.length);
    }, displayDuration * 1000);
    return () => clearTimeout(timeout);
  }, [index, words.length, displayDuration]);

  return (
    <span
      ref={rootRef}
      className={`motion-headline ${className}`}
      aria-live="polite"
      style={{
        display: "inline-block",
        minWidth: 180,
        fontFamily: 'Inter, Segoe UI, Arial, sans-serif',
        fontWeight: 700,
        fontSize: "1.15em",
        letterSpacing: 0.2,
        color: "inherit",
        position: "relative",
        textShadow: "0 2px 12px rgba(0,0,0,0.18)",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={variants}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            display: "inline-block",
            width: "100%",
            textAlign: "center",
            willChange: "opacity, transform, filter",
          }}
        >
          <span style={{ ...gradientTextStyle, display: "block", lineHeight: 1.1 }}>{line1}</span>
          <span style={{ ...gradientTextStyle, display: "block", lineHeight: 1.1 }}>{line2}</span>
        </motion.span>
      </AnimatePresence>
      {/* For layout stability: invisible two lines */}
      <span style={{ opacity: 0, visibility: "hidden", display: "block" }}>
        <span style={{ display: "block", lineHeight: 1.1 }}>{longestLines.longestFirst}</span>
        <span style={{ display: "block", lineHeight: 1.1 }}>{longestLines.longestSecond}</span>
      </span>
    </span>
  );
}