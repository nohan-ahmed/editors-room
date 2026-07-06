import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  [
    // ── Base layout & typography ──────────────────────────────────────────
    "group/button relative inline-flex shrink-0 items-center justify-center",
    "rounded-lg border border-transparent bg-clip-padding",
    "text-sm font-medium whitespace-nowrap",
    "select-none outline-none",
    // ── Smooth transitions (transform + shadow + colors) ─────────────────
    "transition-all duration-300 ease-out",
    // ── Hover lift + press sink ───────────────────────────────────────────
    "hover:scale-[1.03] hover:-translate-y-px",
    "active:scale-[0.97] active:translate-y-0",
    "active:not-aria-[haspopup]:translate-y-px",
    // ── Shimmer sweep pseudo-element ──────────────────────────────────────
    "overflow-hidden",
    "before:absolute before:inset-0 before:-translate-x-full",
    "before:bg-[linear-gradient(105deg,transparent_40%,rgba(255,255,255,0.18)_50%,transparent_60%)]",
    "before:transition-transform before:duration-500 before:ease-out",
    "hover:before:translate-x-full",
    // ── Focus ring ────────────────────────────────────────────────────────
    "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
    // ── Disabled & invalid states ─────────────────────────────────────────
    "disabled:pointer-events-none disabled:opacity-50",
    "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
    "dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
    // ── SVG children ──────────────────────────────────────────────────────
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-primary text-primary-foreground",
          // Resting glow
          "shadow-[0_0_0_0_transparent]",
          // Hover: lift shadow + primary glow
          "hover:shadow-[0_4px_20px_-2px_color-mix(in_oklch,var(--color-primary)_55%,transparent),0_0_0_1px_color-mix(in_oklch,var(--color-primary)_30%,transparent)]",
          // Active: compress glow
          "active:shadow-[0_2px_8px_-1px_color-mix(in_oklch,var(--color-primary)_40%,transparent)]",
          "[a]:hover:bg-primary/80",
        ],
        outline: [
          "border-border bg-background hover:bg-muted hover:text-foreground",
          "aria-expanded:bg-muted aria-expanded:text-foreground",
          "dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
          // Hover: soft border glow
          "hover:shadow-[0_0_14px_-2px_color-mix(in_oklch,var(--color-primary)_35%,transparent),0_0_0_1px_color-mix(in_oklch,var(--color-primary)_20%,transparent)]",
          "hover:border-primary/40",
        ],
        secondary: [
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
          "aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
          "hover:shadow-[0_4px_16px_-2px_color-mix(in_oklch,var(--color-foreground)_12%,transparent)]",
        ],
        ghost: [
          "hover:bg-muted hover:text-foreground",
          "aria-expanded:bg-muted aria-expanded:text-foreground",
          "dark:hover:bg-muted/50",
          // Very subtle glow so ghost stays lightweight
          "hover:shadow-[0_2px_12px_-2px_color-mix(in_oklch,var(--color-foreground)_10%,transparent)]",
          // Ghost shimmer is even more subtle
          "before:bg-[linear-gradient(105deg,transparent_40%,rgba(255,255,255,0.08)_50%,transparent_60%)]",
        ],
        destructive: [
          "bg-destructive/10 text-destructive",
          "hover:bg-destructive/20",
          "focus-visible:border-destructive/40 focus-visible:ring-destructive/20",
          "dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
          // Red glow
          "hover:shadow-[0_4px_20px_-2px_color-mix(in_oklch,var(--color-destructive)_45%,transparent),0_0_0_1px_color-mix(in_oklch,var(--color-destructive)_25%,transparent)]",
          "active:shadow-[0_2px_8px_-1px_color-mix(in_oklch,var(--color-destructive)_35%,transparent)]",
        ],
        link: [
          "text-primary underline-offset-4 hover:underline",
          // No glow or scale for link variant — it's inline text
          "hover:scale-100 hover:translate-y-0 before:hidden",
        ],
        neon: [
          // Dark translucent fill so the rotating border shows behind it
          "bg-background/80 dark:bg-background/60 backdrop-blur-sm",
          "text-primary font-semibold",
          // Static 1px border as fallback (hidden behind the pseudo when active)
          "border border-primary/30",
          // Outer glow that intensifies on hover
          "shadow-[0_0_10px_-3px_color-mix(in_oklch,var(--color-primary)_30%,transparent)]",
          "hover:shadow-[0_0_22px_-3px_color-mix(in_oklch,var(--color-primary)_70%,transparent),0_0_40px_-8px_color-mix(in_oklch,var(--color-primary)_40%,transparent)]",
          "active:shadow-[0_0_12px_-3px_color-mix(in_oklch,var(--color-primary)_50%,transparent)]",
          // Text glow on hover
          "hover:[text-shadow:0_0_12px_color-mix(in_oklch,var(--color-primary)_80%,transparent)]",
          // Wire up the CSS class that owns the ::before/::after pseudo rules
          "btn-neon-border",
          // Pass the two neon colors as CSS vars (primary → purple sweep)
          "[--neon-a:color-mix(in_oklch,var(--color-primary)_90%,transparent)]",
          "[--neon-b:oklch(0.72_0.25_300)]",
          // Shimmer override — neon has its own border animation, tone down the sweep
          "before:bg-[linear-gradient(105deg,transparent_40%,rgba(255,255,255,0.10)_50%,transparent_60%)]",
        ],
      },
      size: {
        default:
          "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        icon: "size-8",
        "icon-xs":
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  asChild,
  className,
  variant = "default",
  size = "default",
  children,
  nativeButton,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants> & { asChild?: boolean; nativeButton?: boolean }) {
  if (asChild) {
    return (
      <ButtonPrimitive
        data-slot="button"
        className={cn(buttonVariants({ variant, size, className }))}
        render={children}
        {...props}
      />
    )
  }
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </ButtonPrimitive>
  )
}

export { Button, buttonVariants }
