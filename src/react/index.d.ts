import type * as React from "react";

/** AxonCore logo as inline SVG. Wordmark (and the icon in mono) use currentColor, so it follows the theme. */
export interface LogoProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** "horizontal" (default): isotype left of the one-line wordmark (isotype 1.6X, gap 0.75X). "vertical": isotype above the one-line wordmark. "isotype": the mark alone. */
  lockup?: "horizontal" | "vertical" | "isotype";
  /** "color": isotype in the signal gradient. "mono": everything in currentColor. */
  tone?: "color" | "mono";
  /** Rendered height in px. Width follows the lockup ratio. */
  height?: number;
  title?: string;
}
export declare function Logo(props: LogoProps): React.ReactElement;

/** Actions. One primary per view; signal for the AI/accent moment; secondary and ghost for everything else. */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "signal" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
  /** Children is the icon; pass aria-label. */
  iconOnly?: boolean;
  block?: boolean;
  /** Renders an <a> with the same styling. */
  href?: string;
}
export declare function Button(props: ButtonProps): React.ReactElement;

/** Labelled text input or textarea with hint and error. */
export interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  /** Replaces the hint and sets aria-invalid. */
  error?: React.ReactNode;
  multiline?: boolean;
}
export declare function TextField(props: TextFieldProps): React.ReactElement;

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
}
export declare function Checkbox(props: CheckboxProps): React.ReactElement;

/** Binary setting that applies immediately. Controlled (checked + onChange) or uncontrolled (defaultChecked). */
export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: React.ReactNode;
  "aria-label"?: string;
  className?: string;
}
export declare function Switch(props: SwitchProps): React.ReactElement;

/** Short status or category label. */
export interface BadgeProps {
  tone?: "neutral" | "signal" | "pulse" | "synapse" | "success" | "warning" | "danger";
  dot?: boolean;
  /** Animated dot for real-time states. */
  live?: boolean;
  className?: string;
  children?: React.ReactNode;
}
export declare function Badge(props: BadgeProps): React.ReactElement;

/** Container for one idea. */
export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "default" | "glass" | "signal";
  eyebrow?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  interactive?: boolean;
  href?: string;
  as?: keyof JSX.IntrinsicElements;
}
export declare function Card(props: CardProps): React.ReactElement;

export interface TabItem { value: string; label: React.ReactNode }
/** Switches between views of the same object. Arrow keys move selection. */
export interface TabsProps {
  items: TabItem[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
  "aria-label"?: string;
}
export declare function Tabs(props: TabsProps): React.ReactElement;

/** Inline message about a state of the system. */
export interface AlertProps {
  tone?: "info" | "success" | "warning" | "danger" | "ai";
  title?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}
export declare function Alert(props: AlertProps): React.ReactElement;

/** One KPI: label, figure, optional delta. */
export interface StatProps {
  label: React.ReactNode;
  value: React.ReactNode;
  delta?: string;
  trend?: "up" | "down" | "flat";
  caption?: React.ReactNode;
  size?: "md" | "lg";
  className?: string;
}
export declare function Stat(props: StatProps): React.ReactElement;

export interface TableColumn<R = any> { key: string; label: React.ReactNode; numeric?: boolean; render?: (row: R) => React.ReactNode }
/** Data table with mono headers and tabular numerals. */
export interface TableProps<R = any> {
  columns: TableColumn<R>[];
  rows: R[];
  caption?: string;
  className?: string;
}
export declare function Table<R = any>(props: TableProps<R>): React.ReactElement;

/** The brand's signature hairline in the Axon spectrum. */
export interface SignalLineProps { weight?: 1 | 2; live?: boolean; className?: string }
export declare function SignalLine(props: SignalLineProps): React.ReactElement;

declare global {
  interface Window {
    AxonCore: {
      Logo: typeof Logo; Button: typeof Button; TextField: typeof TextField; Checkbox: typeof Checkbox;
      Switch: typeof Switch; Badge: typeof Badge; Card: typeof Card; Tabs: typeof Tabs; Alert: typeof Alert;
      Stat: typeof Stat; Table: typeof Table; SignalLine: typeof SignalLine;
    };
  }
}
