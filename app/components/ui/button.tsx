import * as React from "react"

import { cn } from "../../lib/utils"

export type ButtonVariant = "primary" | "secondary" | "destructive" | "ghost" | "link"
export type ButtonSize = "xs" | "sm" | "md" | "lg"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
}

export function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    "btn",
    `btn--${variant}`,
    `btn--${size}`,
    fullWidth && "btn--fullWidth",
    className
  )

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
