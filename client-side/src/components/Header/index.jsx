import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from 'firebase/auth';
import PropTypes from 'prop-types';

import { auth } from '../../config';
import { clearToken } from '../../redux/auth/action';
import CNavLinks from '../CNavLinks';
import CButton from '../CButton';

export default function Header({ className, handle }) {
  const { idToken } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      dispatch(clearToken());
      navigate('/login');
    } catch (error) {
      console.error('Error logout:', error);
    }
  };

  return (
    <div
      className={`grid grid-cols-2 md:grid-cols-3 px-5 py-[10px] ${className}`}
    >
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
        <CNavLinks onNewThreadPostClick={handle} />
      </div>
      <div className="flex items-center justify-end">
        {idToken ? (
          <CButton
            type="button"
            onClick={handleSignOut}
            className="hover:bg-thirdcolor text-thirdcolor hover:text-white opacity-50 hover:opacity-75 border-2 border-thirdcolor p-1 rounded-lg"
          >
            Sign out
          </CButton>
        ) : (
          <Link
            to="/login"
            className="bg-primary-gradient text-white px-5 py-2 rounded-lg"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
}

Header.propTypes = {
  className: PropTypes.string,
  handle: PropTypes.func,
};
