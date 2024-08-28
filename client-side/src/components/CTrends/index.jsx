import PropTypes from 'prop-types';

import CButton from '../CButton';

export default function CTrends({ className }) {
  return (
    <div
      className={`flex flex-col gap-5 min-w-[325px] h-fit bg-transparent border-2 border-thirdcolor p-5 rounded-xl ${className}`}
    >
      <p className="font-medium text-base text-white">Trends for you</p>
      <ul className="flex flex-wrap gap-[10px]">
        <li>
          <CButton
            type="button"
            className="bg-transparent font-normal text-sm text-thirdcolor border-2 border-thirdcolor px-2 py-[6px] rounded-xl"
          >
            #react
          </CButton>
        </li>
      </ul>
    </div>
  );
}

CTrends.propTypes = {
  className: PropTypes.string,
};
