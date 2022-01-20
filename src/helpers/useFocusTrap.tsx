/* eslint-disable no-param-reassign */
import React, { useEffect } from "react";

const useFocusTrap = (
  outerTabRef: React.MutableRefObject<HTMLDivElement | null>,
  topTabRef: React.MutableRefObject<HTMLElement | null>,
  bottomTabRef: React.MutableRefObject<HTMLElement | null>,
  closeFunc: () => void,
  formValid?: boolean
): ((e: React.KeyboardEvent) => void) => {
  useEffect(() => {
    if (typeof formValid === "undefined") {
      const focusableElements = Array.from<HTMLElement>(outerTabRef.current?.querySelectorAll("[type]") ?? []);
      const topTab = focusableElements[0];
      topTabRef.current = topTab;
      setTimeout(() => focusableElements[1]?.focus());
      const bottomTab = focusableElements[focusableElements.length - 1];
      bottomTabRef.current = bottomTab;
    } else {
      const focusableElements = Array.from<HTMLElement>(outerTabRef.current?.querySelectorAll("[type]") ?? []);
      const topTab = focusableElements[0];
      topTabRef.current = topTab;
      setTimeout(() => focusableElements[1]?.focus());
    }
  }, []);

  useEffect(() => {
    const focusableElements = Array.from<HTMLElement>(outerTabRef.current?.querySelectorAll("[type]") ?? []);
    if (formValid === true && typeof formValid !== "undefined") {
      const bottomTab = focusableElements[focusableElements.length - 1];
      bottomTabRef.current = bottomTab;
    } else if (formValid === false && typeof formValid !== "undefined") {
      const bottomTab = focusableElements[focusableElements.length - 2];
      bottomTabRef.current = bottomTab;
    }
    bottomTabRef.current?.focus();
  }, [formValid]);

  const onKeyDownFunc = (e: React.KeyboardEvent) => {
    if (document.activeElement === bottomTabRef.current && e.key === "Tab" && !e.shiftKey) {
      e.preventDefault();
      topTabRef.current?.focus();
    }
    if (document.activeElement === topTabRef.current && e.key === "Tab" && e.shiftKey) {
      e.preventDefault();
      bottomTabRef.current?.focus();
    }
    if (e.key === "Escape") {
      closeFunc();
    }
  };
  return onKeyDownFunc;
};

export default useFocusTrap;
