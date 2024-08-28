import Header from '../../components/Header';
import CSearch from '../../components/CSearch';
import CNavLinks from '../../components/CNavLinks';

export default function SearchPage() {
  return (
    <main className="relative flex justify-center px-5">
      <Header className="fixed top-0 z-50 w-full bg-[rgba(16,16,16,0.6)] backdrop-blur-3xl" />
      <div className="flex justify-center w-full mt-[112px]">
        <CSearch className="p-3 transition-base" />
      </div>
      <div className="fixed bottom-0 left-0 right-0 md:hidden flex items-center justify-center bg-[rgba(16,16,16,0.6)] backdrop-blur-3xl p-[30px] py-[30px]">
        <CNavLinks />
      </div>
    </main>
  );
}
