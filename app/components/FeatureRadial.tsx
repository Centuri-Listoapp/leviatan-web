"use client";

import { useLayoutEffect, useRef, useState } from "react";

type Props = {
  items: string[];
};

const FeatureRadial = ({ items }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const numRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [box, setBox] = useState({ width: 0, height: 0 });
  const [paths, setPaths] = useState<string[]>([]);

  useLayoutEffect(() => {
    function measure() {
      const container = containerRef.current;
      const circle = circleRef.current;
      if (!container || !circle) return;

      const containerRect = container.getBoundingClientRect();
      const circleRect = circle.getBoundingClientRect();
      const focalX = circleRect.right - containerRect.left;
      const focalY = circleRect.top + circleRect.height / 2 - containerRect.top;

      const newPaths = numRefs.current.map((el) => {
        if (!el) return "";
        const r = el.getBoundingClientRect();
        const tx = r.left - containerRect.left;
        const ty = r.top + r.height / 2 - containerRect.top;
        const cx = focalX + (tx - focalX) * 0.55;
        const cy = focalY + (ty - focalY) * 0.22;
        return `M${focalX},${focalY} Q${cx},${cy} ${tx},${ty}`;
      });

      setPaths(newPaths);
      setBox({ width: containerRect.width, height: containerRect.height });
    }

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [items]);

  return (
    <div className="lv-features-grid" ref={containerRef}>
      <svg
        className="lv-radial-connectors"
        width={box.width}
        height={box.height}
        viewBox={`0 0 ${box.width} ${box.height}`}
      >
        {paths.map((d, i) => d && <path key={i} d={d} />)}
      </svg>

      <div className="lv-radial" ref={circleRef}>
        <div className="lv-radial-ring lv-r1" />
        <div className="lv-radial-ring lv-r2" />
        <div className="lv-radial-ring lv-r3" />
      </div>

      <div className="lv-feature-list">
        {items.map((item, i) => (
          <div key={i} className="lv-feature-item">
            <span
              className="lv-feature-num"
              ref={(el) => {
                numRefs.current[i] = el;
              }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <p>{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureRadial;
