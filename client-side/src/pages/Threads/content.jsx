import PropTypes from 'prop-types';

import CButton from '../../components/CButton';

export default function MainContent({ className }) {
  // const dataContent = [

  // ]
  return (
    <div className={`flex flex-col gap-5 ${className}`}>
      {/* thread */}
      <div className="flex flex-col gap-10 border-b-2 border-thirdcolor pb-5">
        {/* row 1 */}
        <div className="flex justify-between">
          <div className="user flex items-center gap-[10px]">
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
        {/* row 2 */}
        <div className="thread flex flex-col gap-[10px]">
          <div className="group-text flex flex-col gap-[10px]">
            <p className="font-normal text-sm text-white">
              Unleashing the Power of Component-Based Development.
            </p>
            <p className="font-normal text-sm text-white">
              What are the key advantages of using React for front-end
              development compared to other frameworks/libraries? Share your
              experiences with React and how it has impacted your projects.
            </p>
          </div>
          <div className="group-image flex items-center overflow-x-auto gap-[10px]">
            <img
              src="/content/img-content-test1.png"
              alt="Img Content"
              className="object-cover w-[256px] h-[300px] rounded-xl"
            />
            <img
              src="/content/img-content-test2.png"
              alt="Img Content"
              className="object-cover w-[256px] h-[300px] rounded-xl"
            />
          </div>
        </div>
        {/* row 3 */}
        <div className="flex flex-col gap-5">
          <div className="hashtag flex flex-wrap items-center gap-[10px]">
            <span className="bg-transparent font-normal text-sm text-thirdcolor border border-thirdcolor px-2 py-[6px] rounded-xl">
              #react
            </span>
            <span className="bg-transparent font-normal text-sm text-thirdcolor border border-thirdcolor px-2 py-[6px] rounded-xl">
              #redux
            </span>
            <span className="bg-transparent font-normal text-sm text-thirdcolor border border-thirdcolor px-2 py-[6px] rounded-xl">
              #javascript
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <CButton className="flex items-center gap-1">
                <img src="/design/icon-like.svg" alt="Icon love" />
                <span className="font-normal text-sm text-thirdcolor">256</span>
              </CButton>
              <CButton className="flex items-center gap-1">
                <img src="/design/icon-comment.svg" alt="Icon Comment" />
                <span className="font-normal text-sm text-thirdcolor">25</span>
              </CButton>
            </div>
            <div className="flex items-center gap-5">
              <CButton className="flex items-center gap-1">
                <img src="/design/icon-bookmark.svg" alt="Icon Bookmark" />
              </CButton>
              <CButton className="flex items-center gap-1">
                <img src="/design/icon-share.svg" alt="Icon Share" />
              </CButton>
              <CButton className="flex items-center gap-1">
                <img src="/design/icon-more.svg" alt="Icon More" />
              </CButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

MainContent.propTypes = {
  className: PropTypes.string,
};
