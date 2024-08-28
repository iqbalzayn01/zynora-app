import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

import Onboarding from '../pages/Onboarding';
import Threads from '../pages/Threads';
import SearchPage from '../pages/Search';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login/*" element={<Onboarding />} />
      <Route path="/*" element={<Threads />} />
      <Route path="/search/*" element={<SearchPage />} />
    </>
  )
);

export default router;
