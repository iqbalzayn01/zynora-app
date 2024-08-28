import Header from '../../components/Header';
import CNavLinks from '../../components/CNavLinks';
import CTrends from '../../components/CTrends';
import MainContent from './content';

export default function Threads() {
  return (
    <main className="relative">
      <Header className="fixed top-0 z-50 w-full bg-[rgba(16,16,16,0.6)] backdrop-blur-3xl" />
      <div className="relative container md:max-w-[1032px] mx-auto grid grid-cols-3 gap-[30px] px-5 mt-[122px]">
        <MainContent className="col-span-3 md:col-span-2" />
        <div className="col-span-1 relative">
          <CTrends className="hidden md:flex fixed" />
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 md:hidden flex items-center justify-center bg-[rgba(16,16,16,0.6)] backdrop-blur-3xl p-[30px] py-[30px]">
        <CNavLinks />
      </div>
    </main>
  );
}
