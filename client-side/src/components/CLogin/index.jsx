import { Link } from 'react-router-dom';

import CButton from '../CButton';
import CInput from '../CInput';

export default function CLogin() {
  return (
    <div className="min-w-[340px] md:w-[520px] bg-[rgba(255,255,255,0.01)] backdrop-blur-3xl p-[30px] md:p-[60px] rounded-2xl">
      <div className="flex flex-col items-center gap-10">
        <div className="flex flex-col items-center gap-5">
          <Link to="/">
            <img
              src="/design/logo-zynora-main.svg"
              alt="Logo Zynora"
              className="w-20 h-full object-cover"
            />
          </Link>
          <p className="font-medium text-base text-center text-white">
            Log in with your{' '}
            <span className="bg-primary-gradient bg-clip-text text-transparent">
              Zynora
            </span>{' '}
            account
          </p>
        </div>
        <div className="flex flex-col gap-5">
          <CInput
            type="text"
            name="text"
            // value=""
            // onChange={''}
            placeholder="Username, phone or email"
            className="min-w-[300px] md:w-[400px] bg-fifthcolor text-sm text-white p-5 rounded-lg"
          />
          <CInput
            type="password"
            name="password"
            // value=""
            // onChange={''}
            placeholder="Password"
            className="min-w-[300px] md:w-[400px] bg-fifthcolor text-sm text-white p-5 rounded-lg"
          />
          <CButton className="w-full bg-white hover:bg-primary-gradient font-medium hover:text-white p-5 rounded-lg transition-all duration-150 ease-in-out">
            Log in
          </CButton>
          <CButton
            disable={true}
            className="font-light text-base text-center text-thirdcolor"
          >
            Forgot password?
          </CButton>
        </div>
      </div>
    </div>
  );
}
