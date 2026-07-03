"use client";

import { useEffect, useState } from "react";

/**
 * Reads the `data-low-power` flag that the pre-paint script in layout.tsx sets
 * on <html> for weak devices (few CPU cores / low RAM / touch devices).
 * Used to skip the most expensive JS-driven effects (mouse follower, 3D tilt).
 * Pure CSS effects are handled via the html[data-low-power] rules in globals.css.
 */
export function useLowPower() {
  const [lowPower, setLowPower] = useState(false);

  useEffect(() => {
    if (document.documentElement.hasAttribute("data-low-power")) {
      setLowPower(true);
    }
  }, []);

  return lowPower;
}
