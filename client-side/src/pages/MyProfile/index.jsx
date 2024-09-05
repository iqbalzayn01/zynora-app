import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { userLogged } from '../../redux/auth/action';

export default function MyProfile() {
  const { idToken, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (idToken) {
      dispatch(userLogged());
    }
  }, [dispatch, idToken]);
  return (
    <div>
      <h1 className="text-white">MyProfile</h1>
      <p className="text-white">{user?.userLogged?.name}</p>
    </div>
  );
}
