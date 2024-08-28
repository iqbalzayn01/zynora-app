import Header from '../../components/Header';
import CNavLinks from '../../components/CNavLinks';
import MainContent from './threads';

export default function Threads() {
  return (
    <main className="relative">
      <Header />
      <div className="relative container md:max-w-[1032px] mx-auto grid grid-cols-2 gap-[30px] px-5">
        <MainContent />
        <p className="text-white">Col 2</p>
      </div>
      <div className="fixed bottom-0 left-0 right-0 md:hidden flex items-center justify-center bg-[rgba(255,255,255,0.01)] backdrop-blur-3xl p-[30px] py-[30px]">
        <CNavLinks />
      </div>
    </main>
  );
}
