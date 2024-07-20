import React from 'react';
import { IoIosSearch } from 'react-icons/io';
import { FaBars } from 'react-icons/fa';
// import SelectRegion from './select-region';
import ProfileMenu from './profile-menu';
import ProjectMenu from './project-menu';
import './Navbar.css';
// import AddButton from './AddButton';


interface NavbarProps {
  onToggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  React.useEffect(() => {
    function handleKeyPress(e: KeyboardEvent) {
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
    <div className="custom-container-navbar" style={{ display: "flex", justifyContent: "space-between" }}>
      <div className="toggle-button-container">
        <button className="toggle-button" onClick={onToggleSidebar}>
          <FaBars size={20} style={{ color: '#673ab7' }} />
        </button>
      </div>
      <div className="custom-box" style={{ marginLeft: "-16px",height:"40px",marginTop:"-10px" }}>
        <span className="mx-3"><IoIosSearch color='black' size={20} /></span>
        <input
          type="search"
          id="search"
          className="h-full w-full bg-[#EFEFEF] font-[500] text-[15px] font-Inter outline-none"
          placeholder="Search by resource name or public IP"
        />
        <div className="bg-[#DEDEDE] p-1 px-2 rounded-[6px]">
          <span className='font-[600] text-[13px]'> CMD+K </span>
        </div>
      </div>
      <div className="flex-container-navbar-rightsection" style={{ marginLeft: "-16px",height:"40px",marginTop:"-10px" }}>
        {/* <SelectRegion /> */}
        <ProjectMenu />
        <ProfileMenu />
        {/* <AddButton/>        */}
      </div>
    </div>
  );
}

export default Navbar;
