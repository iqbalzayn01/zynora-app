import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { userLogged } from '../../redux/auth/action';
import CButton from '../CButton';

export default function CNewThreadPost({ onClose }) {
  const { idToken, user } = useSelector((state) => state.auth);
  const [threadContent, setThreadContent] = useState('');
  const [postedThreads, setPostedThreads] = useState([]);

  const dispatch = useDispatch();
  const editableDivRef = useRef(null);

  useEffect(() => {
    if (idToken) {
      dispatch(userLogged());
    }
  }, [dispatch, idToken]);

  useEffect(() => {
    if (editableDivRef.current) {
      editableDivRef.current.focus();
    }
  }, []);

  const handlePostClick = () => {
    if (threadContent.trim() !== '') {
      setPostedThreads([...postedThreads, threadContent]);
      setThreadContent('');
      if (editableDivRef.current) {
        editableDivRef.current.innerHTML = '';
      }
    }
  };

  const handleInput = (event) => {
    setThreadContent(event.target.innerHTML);
  };
  // const handleInput = () => {
  //   if (editableDivRef.current) {
  //     setThreadContent(editableDivRef.current.innerHTML);
  //   }
  // };

  return (
    <div className="flex justify-center w-full">
      <div className="relative flex flex-col gap-5 w-full max-w-[500px] bg-[rgba(255,255,255,0.04)] backdrop-blur-3xl p-5 rounded-xl shadow-md">
        <h3 className="font-medium text-base text-white text-center">
          Create a thread
        </h3>
        <div className="flex w-full gap-3">
          <div className="flex-shrink-0">
            <img
              src={user?.userLogged?.avatar}
              alt="User Testing"
              className="object-cover w-10 h-10 rounded-full"
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <span className="username font-bold text-xs text-white">
              {user?.userLogged?.name}
              {console.log(user)}
            </span>
            <div
              ref={editableDivRef}
              className="w-full font-normal text-sm text-white rounded-lg mb-2 focus:outline-none content-editable-div"
              contentEditable
              onInput={handleInput}
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-1 space-x-2">
            <CButton
              onClick={handlePostClick}
              className="flex gap-1 items-center opacity-30 hover:opacity-100"
            >
              <img src="/design/icon-media.svg" alt="Add Media" />
              <span className="font-light text-xs text-white">
                Upload media
              </span>
            </CButton>
            <CButton
              onClick={handlePostClick}
              className="flex gap-1 items-center opacity-30 hover:opacity-100"
            >
              <img src="/design/icon-hashtag.svg" alt="Add Hashtag" />
              <span className="font-light text-xs text-white">Hashtag</span>
            </CButton>
          </div>

          <CButton
            onClick={handlePostClick}
            className="w-fit self-end bg-transparent hover:bg-white font-medium text-thirdcolor hover:text-secondarycolor border-[0.4px] border-thirdcolor px-4 py-2 rounded-lg transition-all duration-150 ease-in-out"
          >
            Post
          </CButton>
        </div>
        <CButton
          onClick={onClose}
          className="absolute right-3 top-3 hover:bg-thirdcolor opacity-30 border-2 border-thirdcolor p-1 rounded-full"
        >
          <img src="/design/icon-close.svg" alt="Icon Close" />
        </CButton>
      </div>

      {/* Display posted threads */}
      <ul className="mt-4">
        {postedThreads.map((thread, index) => (
          <li
            key={index}
            className="bg-gray-100 p-2 rounded-lg mb-2"
            dangerouslySetInnerHTML={{ __html: thread }}
          />
        ))}
      </ul>
    </div>
  );
}

CNewThreadPost.propTypes = {
  onClose: PropTypes.func,
};
