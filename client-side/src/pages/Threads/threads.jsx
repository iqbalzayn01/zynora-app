import PropTypes from 'prop-types';

export default function MainContent({ className }) {
  // const dataContent = [

  // ]
  return (
    <div className={`flex flex-col gap-5 ${className}`}>
      <div className="flex justify-between">
        <div className="flex items-center gap-[10px]">
          <img
            src="/content/user-testing.png"
            alt="User"
            className="object-cover w-9 h-9 bg-primarycolor rounded-full"
          />
          <span className="username font-medium text-base text-white">
            Maren Dias
          </span>
        </div>
        <p className="create-at text-thirdcolor">3 hours ago</p>
      </div>
    </div>
  );
}

MainContent.propTypes = {
  className: PropTypes.string,
};
