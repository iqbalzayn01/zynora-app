import { Link, useLocation } from 'react-router-dom';

export default function CNavLinks() {
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
      name: 'Write',
      to: '/write',
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
        return (
          <Link
            key={link.name}
            to={link.to}
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
