import React, { forwardRef, useCallback, useState } from "react";
import { cn } from "../../lib/cn";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export interface IndustryItem {
  icon: React.ElementType;
  label: string;
}

export interface IndustryCardBaseProps {
  icon: React.ElementType;
  title: string;
  description: string;
  industries: IndustryItem[];
  linkLabel: string;
  linkTo: string;
  accentColor: string;
  accentLight: string;
  iconBgOverlay: string;
  industryIconColor: string;
  industryIconBg: string;
  scheme?: "plain" | "accented";
  style?: React.CSSProperties;
  className?: string;
}

export const IndustryCardBody = forwardRef<HTMLDivElement, IndustryCardBaseProps>(
  (
    {
      icon: Icon,
      title,
      description,
      industries,
      linkLabel,
      linkTo,
      accentColor,
      accentLight,
      iconBgOverlay,
      industryIconColor,
      industryIconBg,
      scheme = "plain",
      style,
      className,
    },
    ref
  ) => {
    const isAccented = scheme === "accented";

    return (
      <div
        ref={ref}
        style={style}
        className={cn(
          "flex flex-col rounded-3xl h-full",
          isAccented ? "text-white" : "bg-white text-gray-900",
          className
        )}
      >
        <div
          className="px-8 pt-8 pb-10 rounded-t-3xl"
          style={{ backgroundColor: isAccented ? accentColor : accentColor }}
        >
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
            style={{ backgroundColor: isAccented ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.2)" }}
          >
            <Icon className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold mb-2 leading-snug text-white">{title}</h3>
          <p className="text-sm leading-relaxed" style={{ color: accentLight }}>
            {description}
          </p>
        </div>

        <div
          className={cn(
            "px-8 pt-7 pb-8 flex flex-col flex-1 rounded-b-3xl",
            isAccented ? "bg-[#111827]" : "bg-white"
          )}
        >
          <p
            className="text-[11px] font-bold uppercase tracking-widest mb-5"
            style={{ color: isAccented ? "#6B7280" : "#9CA3AF" }}
          >
            Industries we work with
          </p>
          <div className="grid grid-cols-2 gap-x-6 gap-y-4 flex-1">
            {industries.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: isAccented ? industryIconBg : `${accentColor}15` }}
                >
                  <item.icon
                    className="w-[15px] h-[15px]"
                    style={{ color: isAccented ? industryIconColor : accentColor }}
                  />
                </div>
                <span
                  className="text-[13px] font-medium"
                  style={{ color: isAccented ? "#D1D5DB" : "#374151" }}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
          <Link
            to={linkTo}
            className="mt-7 inline-flex items-center gap-1.5 font-semibold text-sm hover:gap-2.5 transition-all duration-200"
            style={{ color: isAccented ? industryIconColor : accentColor }}
          >
            {linkLabel} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }
);
IndustryCardBody.displayName = "IndustryCardBody";

export interface RevealIndustryCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  industries: IndustryItem[];
  linkLabel: string;
  linkTo: string;
  accentColor: string;
  accentLight: string;
  iconBgOverlay: string;
  industryIconColor: string;
  industryIconBg: string;
  className?: string;
}

export const RevealIndustryCard = forwardRef<HTMLDivElement, RevealIndustryCardProps>(
  (props, ref) => {
    const {
      accentColor,
      className,
      ...cardProps
    } = props;

    const [hovered, setHovered] = useState(false);

    const assignRef = useCallback(
      (el: HTMLDivElement | null) => {
        if (typeof ref === "function") ref(el);
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
      },
      [ref]
    );

    const startClip = "circle(50px at 56px 56px)";
    const expandClip = "circle(160% at 56px 56px)";

    return (
      <div
        ref={assignRef}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ borderColor: accentColor }}
        className={cn(
          "relative overflow-hidden rounded-3xl border-2 h-full cursor-pointer",
          className
        )}
      >
        <div className="h-full">
          <IndustryCardBody
            {...cardProps}
            accentColor={accentColor}
            scheme="plain"
          />
        </div>
        <div
          className="absolute inset-0 h-full w-full"
          style={{
            clipPath: hovered ? expandClip : startClip,
            transition: hovered
              ? "clip-path 0.75s cubic-bezier(0.16, 1, 0.3, 1)"
              : "clip-path 0.9s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <IndustryCardBody
            {...cardProps}
            accentColor={accentColor}
            scheme="accented"
          />
        </div>
      </div>
    );
  }
);
RevealIndustryCard.displayName = "RevealIndustryCard";
