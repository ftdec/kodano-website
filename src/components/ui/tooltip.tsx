"use client";

import * as React from "react";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal,
  FloatingArrow,
} from "@floating-ui/react";

interface TooltipProps {
  children: React.ReactElement;
  content: React.ReactNode;
  placement?: "top" | "right" | "bottom" | "left";
  delayShow?: number;
  delayHide?: number;
  className?: string;
}

export function Tooltip({
  children,
  content,
  placement = "top",
  delayShow = 200,
  delayHide = 0,
  className = "",
}: TooltipProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const arrowRef = React.useRef<SVGSVGElement>(null);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(8),
      flip({
        fallbackAxisSideDirection: "start",
      }),
      shift({ padding: 5 }),
    ],
  });

  const hover = useHover(context, {
    move: false,
    delay: { open: delayShow, close: delayHide },
  });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "tooltip" });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);

  const floatingProps = getFloatingProps();

  return (
    <>
      {React.cloneElement(
        children,
        getReferenceProps({
          /* eslint-disable react-hooks/rules-of-hooks */
          // Floating UI requires using ref setters during render - this is safe and intended
          ref: refs.setReference,
          /* eslint-enable react-hooks/rules-of-hooks */
          ...(children.props || {}),
        })
      )}
      <FloatingPortal>
        {isOpen && (
          <div
            /* eslint-disable react-hooks/rules-of-hooks */
            // Floating UI requires using ref setters during render - this is safe and intended
            ref={refs.setFloating}
            /* eslint-enable react-hooks/rules-of-hooks */
            style={floatingStyles}
            {...floatingProps}
            className={`z-50 px-3 py-2 text-sm text-white bg-gray-900 dark:bg-gray-800 rounded-lg shadow-lg animate-in fade-in zoom-in-95 duration-200 ${className}`}
          >
            <FloatingArrow
              ref={arrowRef}
              context={context}
              className="fill-gray-900 dark:fill-gray-800"
            />
            {content}
          </div>
        )}
      </FloatingPortal>
    </>
  );
}

// Simple inline tooltip variant
interface SimpleTooltipProps {
  text: string;
  children: React.ReactNode;
}

export function SimpleTooltip({ text, children }: SimpleTooltipProps) {
  return (
    <Tooltip content={text}>
      <span className="inline-flex cursor-help">{children}</span>
    </Tooltip>
  );
}
