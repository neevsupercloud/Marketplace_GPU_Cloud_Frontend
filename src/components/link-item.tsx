import { IconType } from "react-icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

export type LinkItemProps = {
  name: string;
  link: string;
  icon?: IconType; // Make icon optional
  customIcon?: string; // Add customIcon prop for SVG/PNG icons
  label: string;
  subLinks?: LinkItemProps[];
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>, link: string) => void;
  isActive?: boolean;
};

export default function LinkItem({ link, icon, customIcon, label, subLinks, className, onClick, isActive }: LinkItemProps) {
  const noChildren = !subLinks || subLinks.length === 0;
  const [showChildren, setShowChildren] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(event, link);
    }
    setShowChildren(false);
  };

  const linkClassNames = `flex gap-x-2 items-center ${
    isActive ? "bg-purple-600 text-white" : "text-[#000000]"
  } rounded-lg py-2 px-4 w-full ${className}`;

  const iconStyles = isActive ? { filter: "invert(1)" } : { filter: "invert(0)" }; // Change icon color using CSS filter

  if (noChildren) {
    return (
      <Link
        to={link || "/"}
        className={linkClassNames}
        onClick={handleClick}
      >
        <p className="text-lg">
          {customIcon ? (
            <img src={customIcon} alt={`${label} icon`} style={{ width: "20px", height: "20px", ...iconStyles }} />
          ) : (
            icon && icon({ size: 20, color: isActive ? "white" : "#000000" }) // Apply icon color for react-icons
          )}
        </p>
        <p className="font-semibold text-sm">{label}</p>
      </Link>
    );
  }

  return (
    <div className={showChildren ? `bg-black/[.01] rounded-lg` : ''}>
      <button
        onClick={() => setShowChildren(prev => !prev)}
        className={`flex mb-1 items-center justify-between gap-x-2 px-4 py-2 rounded-lg w-full text-black hover:text-red-600 ${className}`}
      >
        <div className="flex items-center gap-x-2">
          <p className="text-lg">
            {customIcon ? (
              <img src={customIcon} alt={`${label} icon`} style={{ width: "20px", height: "20px", ...iconStyles }} />
            ) : (
              icon && icon({ size: 20, color: isActive ? "white" : "#000000" }) // Apply icon color for react-icons
            )}
          </p>
          <p className="font-semibold text-sm">{label}</p>
        </div>
        <p className="text-2xl">
          {showChildren ? <BiChevronUp color={isActive ? "white" : "#000000"} /> : <BiChevronDown color={isActive ? "white" : "#000000"} />}
        </p>
      </button>
      {showChildren && subLinks && (
        <div className="pl-4 flex flex-col gap-y-2">
          {subLinks.map(subLink => (
            <LinkItem key={subLink.link} {...subLink} onClick={onClick} isActive={isActive} />
          ))}
        </div>
      )}
    </div>
  );
}
