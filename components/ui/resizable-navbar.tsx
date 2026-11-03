"use client";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";

import React, { useRef, useState } from "react";

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemsProps {
  items: {
    name: string;
    link: string;
  }[];
  className?: string;
  onItemClick?: (link: string) => void;
  activeLink?: string;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState<boolean>(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 40) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  return (
    <motion.div
      ref={ref}
      className={cn(
        "sticky inset-x-0 top-3 sm:top-4 z-50 w-full pt-2 sm:pt-3 px-3 sm:px-6 pointer-events-none",
        className,
      )}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
            child as React.ReactElement<{ visible?: boolean }>,
            { visible },
          )
          : child,
      )}
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(14px)" : "blur(8px)",
        boxShadow: visible
          ? "0 12px 36px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.15), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
          : "0 6px 24px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)",
        width: visible ? "68%" : "100%",
        y: visible ? 8 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      style={{
        minWidth: "720px",
      }}
      className={cn(
        "pointer-events-auto relative z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-full bg-[#080C2B]/85 px-4 py-2 lg:flex border border-white/10",
        visible && "bg-[#080C2B]/95 border-white/20",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const NavItems = ({
  items,
  className,
  onItemClick,
  activeLink,
}: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-1 text-sm font-medium text-neutral-300 transition duration-200 lg:flex",
        className,
      )}
    >
      {items.map((item, idx) => {
        const isActive = activeLink === item.link;
        return (
          <a
            onMouseEnter={() => setHovered(idx)}
            onClick={() => onItemClick?.(item.link)}
            className={cn(
              "relative px-3.5 py-1.5 transition-colors text-sm font-medium",
              isActive ? "text-white font-semibold" : "text-neutral-300 hover:text-white"
            )}
            key={`link-${idx}`}
            href={item.link}
          >
            {hovered === idx && (
              <motion.div
                layoutId="hovered"
                className="absolute inset-0 h-full w-full rounded-full bg-white/10"
              />
            )}
            <span className="relative z-20 inline-block">
              {item.name}
              {isActive && (
                <motion.span
                  layoutId="active-nav-underline"
                  className="absolute -bottom-1 left-0 right-0 h-[2.5px] rounded-full bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 shadow-[0_0_8px_rgba(56,189,248,0.85)]"
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 30,
                  }}
                />
              )}
            </span>
          </a>
        );
      })}
    </motion.div>
  );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(14px)" : "blur(8px)",
        boxShadow: visible
          ? "0 10px 30px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.12)"
          : "none",
        width: visible ? "95%" : "100%",
        paddingRight: visible ? "12px" : "8px",
        paddingLeft: visible ? "12px" : "8px",
        borderRadius: visible ? "1rem" : "2rem",
        y: visible ? 4 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      className={cn(
        "pointer-events-auto relative z-50 mx-auto flex w-full max-w-[calc(100vw-1.5rem)] flex-col items-center justify-between rounded-full bg-[#080C2B]/90 border border-white/10 px-3 py-2 lg:hidden",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
  onClose,
}: MobileNavMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-3 rounded-2xl bg-[#080C2B]/95 backdrop-blur-xl border border-white/15 px-5 py-6 shadow-2xl",
            className,
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      className="p-1.5 rounded-lg text-white hover:bg-white/10 transition-colors"
    >
      {isOpen ? <IconX size={22} /> : <IconMenu2 size={22} />}
    </button>
  );
};

export const NavbarLogo = ({
  href = "/",
  logoSrc = "/images/csi-final-logo.jpeg",
  title = "CSI·PVG",
  subtitle = "CHAPTER",
  className,
}: {
  href?: string;
  logoSrc?: string;
  title?: string;
  subtitle?: string;
  className?: string;
}) => {
  return (
    <a
      href={href}
      className={cn(
        "relative z-20 mr-3 flex items-center gap-2.5 px-2 py-1 text-sm font-normal text-white",
        className,
      )}
    >
      {logoSrc ? (
        <span className="w-8 h-8 rounded-lg overflow-hidden border border-white/20 flex items-center justify-center bg-white shadow-sm shrink-0">
          <img
            src={logoSrc}
            alt={title}
            width={32}
            height={32}
            className="w-full h-full object-contain p-0.5"
          />
        </span>
      ) : null}
      <span className="flex flex-col leading-tight">
        <strong className="font-bold text-white text-sm tracking-tight">{title}</strong>
        {subtitle && (
          <small className="text-[8px] font-mono tracking-widest text-[#9299ad] uppercase">
            {subtitle}
          </small>
        )}
      </span>
    </a>
  );
};

export const NavbarButton = ({
  href,
  as: Tag = "a",
  children,
  className,
  variant = "primary",
  ...props
}: {
  href?: string;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient";
} & (
    | React.ComponentPropsWithoutRef<"a">
    | React.ComponentPropsWithoutRef<"button">
  )) => {
  const baseStyles =
    "px-3.5 py-1.5 rounded-full text-xs font-semibold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center";

  const variantStyles = {
    primary:
      "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:bg-neutral-100",
    secondary: "bg-transparent text-white border border-white/20 hover:bg-white/10",
    dark: "bg-black text-white border border-white/10 hover:bg-neutral-900",
    gradient:
      "bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 text-white shadow-[0_0_20px_rgba(99,102,241,0.35)] hover:shadow-[0_0_25px_rgba(99,102,241,0.55)]",
  };

  return (
    <Tag
      href={href || undefined}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Tag>
  );
};
