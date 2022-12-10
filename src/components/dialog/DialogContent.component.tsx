import React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import styles from "./DialogContent.module.css";

export const DialogContent = React.forwardRef<HTMLDivElement>(
    ({ children, ...props }, forwardedRef) => (
        <DialogPrimitive.Portal>
            <DialogPrimitive.Overlay className="DialogOverlay" />
            <DialogPrimitive.Content
                {...props}
                ref={forwardedRef}
                className="DialogContent"
            >
                {children}
                <DialogPrimitive.Close aria-label="Close">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </DialogPrimitive.Close>
            </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
    ),
);

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
