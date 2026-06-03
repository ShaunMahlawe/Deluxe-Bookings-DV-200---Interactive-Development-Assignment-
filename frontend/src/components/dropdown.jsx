import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import './dropdown.css';

const menuItems = [
  { label: 'My account' },
  { label: 'Bookings' },
  { label: 'Wallet' },
  { label: 'Reviews' },
  { label: 'Saved' },
  { label: 'Sign out' },
];

const DropdownMenu = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="dropdown">
      <button className="dropdown-toggle" onClick={() => setOpen((o) => !o)}>
        <Menu size={20} aria-label="menu" />
      </button>
      {open && (
        <ul className="dropdown-menu">
          {menuItems.map((item) => (
            <li key={item.label} className="dropdown-item">{item.label}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownMenu;
