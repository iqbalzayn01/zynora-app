import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

import Onboarding from '../pages/Onboarding';
import Threads from '../pages/Threads';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login/*" element={<Onboarding />} />
      <Route path="/*" element={<Threads />} />
    </>
  )
);

export default router;
