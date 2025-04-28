import { debounce } from "moderndash";
import { useCallback, useEffect, useRef, type ReactNode } from "react";

interface SplitPanelProps {
  rightPanel: ReactNode;
  leftPanel: ReactNode;
}

const medianWidth = 10;
export function SplitPanel({ rightPanel, leftPanel }: SplitPanelProps) {
  const splitPanelRef = useRef<HTMLDivElement | null>(null);
  const splitPanelRec = useRef<DOMRect | null>(null);
  const medianRef = useRef<HTMLDivElement>(null);

  const resizing = useRef(false);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      event.stopPropagation();
      resizing.current = true;
      splitPanelRef.current?.setAttribute("data-resizing", "true");
    };
    medianRef.current?.addEventListener("pointerdown", handlePointerDown);

    return () => {
      medianRef.current?.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  useEffect(() => {
    const handlePointerUp = (event: PointerEvent) => {
      event.stopPropagation();
      resizing.current = false;
      splitPanelRef.current?.setAttribute("data-resizing", "false");
    };
    medianRef.current?.addEventListener("pointerup", handlePointerUp);

    return () => {
      medianRef.current?.removeEventListener("pointerup", handlePointerUp);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (resizing.current && splitPanelRef.current) {
        if (splitPanelRec.current && splitPanelRec.current.width > 700) {
          const newMedianLeft = event.clientX - splitPanelRec.current.left;
          splitPanelRef.current.style.gridTemplateColumns = `calc(${newMedianLeft}px - ${medianWidth / 2}px) ${medianWidth}px 1fr`;
        }
        if (splitPanelRec.current && splitPanelRec.current.width < 700) {
          const newMedianTop = event.clientY - splitPanelRec.current.top;
          splitPanelRef.current.style.gridTemplateRows = `calc(${newMedianTop}px - ${medianWidth / 2}px) ${medianWidth}px 1fr`;
        }
      }
    };
    splitPanelRef.current?.addEventListener("mousemove", handleMouseMove);

    return () => {
      splitPanelRef.current?.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleInit = useCallback((element: HTMLDivElement | null) => {
    if (!element) return;

    const rect = element.getBoundingClientRect();
    splitPanelRef.current = element;
    splitPanelRec.current = rect;

    if (rect.width > 700) {
      element.setAttribute("data-direction", "col");
    } else {
      element.setAttribute("data-direction", "row");
    }
  }, []);

  useEffect(() => {
    if (splitPanelRef.current === null) return;

    const handleResize = debounce(() => {
      if (splitPanelRef.current) {
        const rect = splitPanelRef.current.getBoundingClientRect();
        splitPanelRec.current = rect;

        if (rect.width > 700) {
          splitPanelRef.current.setAttribute("data-direction", "col");
          splitPanelRef.current.style.removeProperty("grid-template-rows");
          splitPanelRef.current.style.removeProperty("grid-template-columns");
        } else {
          splitPanelRef.current.setAttribute("data-direction", "row");
          splitPanelRef.current.style.removeProperty("grid-template-rows");
          splitPanelRef.current.style.removeProperty("grid-template-columns");
        }
      }
    }, 100);

    const resizer = new ResizeObserver(handleResize);
    resizer.observe(splitPanelRef.current);

    return () => {
      resizer.disconnect();
    };
  }, []);

  return (
    <>
      <style>
        {`
        #mapka-split-panel[data-direction=col] { 
          display: grid;
          grid-template-columns: 1fr 10px 1fr;
          grid-template-rows: 1fr;
          min-height: 100%;
          max-height: 100%;
          min-width: 100%;
          max-width: 100%;
        }
        #mapka-split-panel([data-resizing=true][data-direction=col]){ cursor: col-resize; }
        #mapka-split-panel[data-direction=row] { 
          display: grid;
          grid-template-columns: 1fr;
          grid-template-rows: 1fr 10px 1fr;
          min-height: 100%;
          max-height: 100%;
          min-width: 100%;
          max-width: 100%;
        }
        #mapka-split-panel([data-resizing=true][data-direction=row]){ cursor: row-resize; }
        
        #mapka-split-panel([resizing]){ 
          user-select: none; 
        }
        #mapka-split-panel[data-direction=col] #median {
          inline-size: 10px;
          grid-column: 2 / 3; 
          background: grey;
        }
        #mapka-split-panel[data-direction=row] #median {
          block-size: 10px;
          grid-row: 2 / 3; 
          background: grey;
        }
        #mapka-split-panel[data-direction=col] #median:hover { 
          cursor: col-resize; 
        }
        #mapka-split-panel[data-direction=row] #median:hover { 
          cursor: row-resize; 
        }
        #mapka-split-panel[data-direction=col] #left-panel { 
          grid-column: 1 / 2; 
          grid-row: 1 / 1;
        }
        #mapka-split-panel[data-direction=row] #left-panel { 
          grid-column: 1 / 1; 
          grid-row: 1 / 2;
        }
        #mapka-split-panel[data-direction=col] #right-panel { 
          grid-column: 3 / 4; 
          grid-row: 1 / 1; 
        }
        #mapka-split-panel[data-direction=row] #right-panel { 
          grid-column: 1 / 1; 
          grid-row: 3 / 4; 
        }
        `}
      </style>
      <div id="mapka-split-panel" data-direction="col" ref={handleInit}>
        <div id="left-panel">{leftPanel}</div>
        <div id="median" ref={medianRef} />
        <div id="right-panel">{rightPanel}</div>
      </div>
    </>
  );
}
