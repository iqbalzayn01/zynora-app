import CButton from '../CButton';
import CInput from '../CInput';

export default function CLogin() {
  return (
    <div className="min-w-[340px] md:w-[520px] bg-thirdcolor p-[30px] md:p-[60px] rounded-xl">
      <div className="flex flex-col items-center gap-10">
        <div className="flex flex-col gap-5">
          {/* Image */}
          <p className="font-medium text-base text-center text-white">
            Log in with your <span>Zynora</span> account
          </p>
        </div>
        <div className="flex flex-col gap-5">
          <CInput
            type="text"
            name="name"
            // value=""
            // onChange={''}
            placeholder="Email"
            className="min-w-[300px] md:w-[400px] bg-fifthcolor p-5 rounded-lg"
          />
          <CInput
            type="password"
            name="password"
            // value=""
            // onChange={''}
            placeholder="Password"
            className="min-w-[300px] md:w-[400px] bg-fifthcolor p-5 rounded-lg"
          />
          <CButton className="w-full bg-white p-5 rounded-lg">Log in</CButton>
        </div>
      </div>
    </div>
  );
}
