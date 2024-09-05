import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

export default function CNavLinks({ onNewThreadPostClick }) {
  const { idToken } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  const links = [
    {
      name: 'Home',
      to: '/',
      src: '/design/icon-home.svg',
      linkActive: '/design/icon-home-fill.svg',
    },
    {
      name: 'Search',
      to: '/search',
      src: '/design/icon-search.svg',
      linkActive: '/design/icon-search-fill.svg',
    },
    {
      name: 'New Thread Post',
      to: '/new-thread-post',
      src: '/design/icon-write.svg',
      linkActive: '/design/icon-write-fill.svg',
    },
    {
      name: 'Like',
      to: '/like',
      src: '/design/icon-like.svg',
      linkActive: '/design/icon-like-fill.svg',
    },
    {
      name: 'My Profile',
      to: '/my-profile',
      src: '/design/icon-person.svg',
      linkActive: '/design/icon-person-fill.svg',
    },
  ];

  return (
    <div className="flex gap-4 md:gap-1">
      {links.map((link) => {
        const isActive = location.pathname === link.to;
        const handleClick = (e) => {
          if (!idToken) {
            navigate('/login');
          }

          if (link.name === 'New Thread Post') {
            e.preventDefault();
            onNewThreadPostClick();
          }
        };

        return (
          <Link
            key={link.name}
            to={link.to}
            onClick={handleClick}
            className={`flex items-center justify-center hover:bg-[rgba(255,255,255,0.04)] hover:backdrop-blur-3xl w-16 md:w-20 h-16 md:h-20 rounded-lg ${
              isActive ? 'font-bold' : ''
            }`}
          >
            <img
              src={isActive && link.linkActive ? link.linkActive : link.src}
              alt={link.name}
              className={`object-cover w-8 h-8 ${
                isActive ? 'opacity-100' : 'opacity-30'
              }`}
            />
          </Link>
        );
      })}
    </div>
  );
}

CNavLinks.propTypes = {
  onNewThreadPostClick: PropTypes.func,
};
