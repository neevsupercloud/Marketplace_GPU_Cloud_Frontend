import React, { useState, useEffect } from 'react';
import { sidenav } from '../data.ts'; // Adjust the path to your actual data file
import { Link, useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import LinkItem from './link-item.tsx';
import '../components/navbar/Navbar.css';

interface SidebarProps {
  onToggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onToggleSidebar }) => {
  const [activeLink, setActiveLink] = useState<string>("");
  const navigate = useNavigate();

  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>, link: string) => {
    if (link === '/support') {
      event.preventDefault();
      window.open('https://neevcloud-org.myfreshworks.com/login/auth/neevcloud?client_id=451980303908285122&redirect_uri=https%3A%2F%2Fneevcloud.freshdesk.com%2Ffreshid%2Fcustomer_authorize_callback%3Fhd%3Dneevcloud.freshdesk.com', '_blank');
      setActiveLink(link);
      return;
    }

    if (link === '/contact') {
      event.preventDefault();
      window.open('https://www.neevcloud.com/contact-us.php', '_blank');
      setActiveLink(link);
      return;
    }

    if (link === '/docs') {
      event.preventDefault();
      window.open('http://103.140.73.76:3000/docs/category/tutorial---basics', '_blank');
      setActiveLink(link);
      return;
    }

    setActiveLink(link);
    onToggleSidebar();
    navigate(link);
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.keyCode === 114 || (e.ctrlKey && e.keyCode === 75)) {
        if (document.getElementById('search') !== document.activeElement) {
          e.preventDefault();
          document?.getElementById('search')?.focus();
        }
      }
    }

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <div className="w-full h-full p-4 flex flex-col items-start justify-start gap-y-8 text-[#000000]" style={{ background: "#f1f5f9" }}>
      {/* Logo */}
      <Link to="/">
        <img
          src="https://www.neevcloud.com/images/logo-dark.svg"
          alt="neevcloud"
          className="hidden-logo w-24 h-auto sm:w-32 sm:h-auto md:w-40 md:h-auto lg:w-48 lg:h-auto"
        />
      </Link>
      {/* Toggle button */}
      <div className="toggle-button-container">
        <button className="toggle-button" onClick={onToggleSidebar} style={{ marginTop: "14px" }}>
          <FaBars size={20} style={{ color: '#673ab7',marginTop:"-32px" }} />
        </button>
      </div>
      {/* Main navigation */}
      <div className="w-full flex flex-col gap-y-1" style={{ marginLeft: "12px", marginBottom: "-9px", marginTop: "15px" }}>
        {sidenav.main.map(n => (
          <LinkItem
            key={n.link}
            {...n}
            customIcon={typeof n.icon === 'string' ? n.icon : undefined}
            icon={typeof n.icon !== 'string' ? n.icon : undefined}
            onClick={handleLinkClick}
            isActive={activeLink === n.link}
          />
        ))}
      </div>
      {/* Manage section */}
      <div className="w-full">
        <p className="font-[500] text-sm mb-2 font-bold" style={{ marginLeft: "12px" }}>MANAGE</p>
        <div className="w-full flex flex-col gap-y-1" style={{ marginLeft: "12px" }}>
          {sidenav.manage.map(n => (
            <LinkItem
              key={n.link}
              {...n}
              customIcon={typeof n.icon === 'string' ? n.icon : undefined}
              icon={typeof n.icon !== 'string' ? n.icon : undefined}
              className={`${activeLink === n.link ? " text-white hover:text-white" : ""}`}
              onClick={handleLinkClick}
              isActive={activeLink === n.link}
            />
          ))}
        </div>
      </div>
      {/* Help section */}
      <div className="w-full">
        <p className="font-[500] text-sm mb-2 font-bold" style={{ marginLeft: "12px" }}>HELP</p>
        <div className="w-full flex flex-col gap-y-1" style={{ marginLeft: "12px" }}>
          {sidenav.help.map(n => (
            <LinkItem
              key={n.link}
              {...n}
              customIcon={typeof n.icon === 'string' ? n.icon : undefined}
              icon={typeof n.icon !== 'string' ? n.icon : undefined}
              onClick={handleLinkClick}
              isActive={activeLink === n.link}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
