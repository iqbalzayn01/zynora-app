import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

import Onboarding from '../pages/Onboarding';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/*" element={<Onboarding />} />
    </>
  )
);

export default router;
