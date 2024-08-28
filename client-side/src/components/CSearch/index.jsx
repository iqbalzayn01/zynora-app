import PropTypes from 'prop-types';

import CInput from '../CInput';

export default function CSearch({
  className,
  placeholder = 'Search...',
  // updateSearch
}) {
  return (
    <div
      className={`flex items-center gap-2 w-full max-w-[500px] bg-[rgba(255,255,255,0.04)] backdrop-blur-3xl md:p-5 rounded-lg ${className}`}
    >
      <img
        src="/design/icon-search.svg"
        alt="Icon Search"
        className="opacity-30 object-cover w-6 h-6"
      />
      <CInput
        type="text"
        name="search"
        // value={}
        // onChange={}
        placeholder={placeholder}
        className="w-full bg-transparent text-black dark:text-white border-0 outline-none"
      />
    </div>
  );
}

CSearch.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  //   updateSearch: PropTypes.func,
};
