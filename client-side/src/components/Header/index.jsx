import { Link } from 'react-router-dom';

import CNavLinks from '../CNavLinks';

export default function Header() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 px-5 py-[30px]">
      <div className="flex items-center justify-start">
        <Link to="/">
          <img
            src="/design/logo-zynora-main.svg"
            alt="Logo Zynora"
            className="w-12 h-12 object-cover"
          />
        </Link>
      </div>
      <div className="hidden md:flex items-center justify-center">
        <CNavLinks />
      </div>
      <div className="flex items-center justify-end">
        <Link
          to="/login"
          className="flex items-center justify-center w-[84px] bg-primary-gradient text-white px-5 py-2 rounded-lg"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
