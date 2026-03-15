import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
}) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative">
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer text-[#374151] hover:text-[#1D4ED8] text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
      >
        {item}
      </motion.p>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className="absolute top-[calc(100%_+_0.5rem)] left-1/2 transform -translate-x-1/2 pt-2 z-50">
              <motion.div
                transition={transition}
                layoutId="active"
                className="bg-white backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-200 shadow-2xl"
              >
                <motion.div layout className="w-max h-full p-4">
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className="relative rounded-full border border-gray-200 bg-white shadow-[0_2px_20px_rgba(0,0,0,0.08)] flex items-center justify-center space-x-1 px-4 py-2"
    >
      {children}
    </nav>
  );
};

export const HoveredLink = ({
  children,
  to,
  ...rest
}: {
  children: React.ReactNode;
  to: string;
  [key: string]: unknown;
}) => {
  return (
    <Link
      to={to}
      {...rest}
      className="text-[#374151] hover:text-[#1D4ED8] text-sm transition-colors"
    >
      {children}
    </Link>
  );
};
