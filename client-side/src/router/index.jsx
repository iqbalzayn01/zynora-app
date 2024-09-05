import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

import ProtectedRoute from './protectedRoute';
import Onboarding from '../pages/Onboarding';
import Threads from '../pages/Threads';
import SearchPage from '../pages/Search';
import MyProfile from '../pages/MyProfile';
// import NewThread from '../pages/NewThread';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login/*" element={<Onboarding />} />
      <Route path="/*" element={<Threads />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/search/*" element={<SearchPage />} />
        <Route path="/my-profile/*" element={<MyProfile />} />
      </Route>
      {/* <Route path="/new-thread-post/*" element={<NewThread />} /> */}
    </>
  )
);

export default router;
