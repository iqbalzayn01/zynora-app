import PropTypes from 'prop-types';

export default function CButton({
  children,
  onClick,
  className,
  disable,
  type,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`button ${className}`}
      disabled={disable}
    >
      {children}
    </button>
  );
}

CButton.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  disable: PropTypes.bool,
  children: PropTypes.node.isRequired,
};
