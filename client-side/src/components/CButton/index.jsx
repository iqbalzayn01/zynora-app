import PropTypes from 'prop-types';

export default function CButton({ children, onClick, className, disable }) {
  return (
    <button
      className={`button ${className}`}
      onClick={onClick}
      disabled={disable}
    >
      {children}
    </button>
  );
}

CButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  disable: PropTypes.bool,
};
