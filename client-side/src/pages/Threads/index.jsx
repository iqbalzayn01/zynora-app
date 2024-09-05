import { useState } from 'react';

import Header from '../../components/Header';
import CNavLinks from '../../components/CNavLinks';
import CTrends from '../../components/CTrends';
import CNewThreadPost from '../../components/CNewThreadPost';
import MainContent from './content';

export default function Threads() {
  const [isNewThreadPostPopupOpen, setIsNewThreadPostPopupOpen] =
    useState(false);

  const handleNewThreadOpen = () => {
    setIsNewThreadPostPopupOpen(true);
  };

  return (
    <main className="relative">
      <Header
        handle={handleNewThreadOpen}
        className="fixed top-0 z-50 w-full bg-[rgba(16,16,16,0.6)] backdrop-blur-3xl"
      />
      <div className="relative container md:max-w-[1032px] mx-auto grid grid-cols-3 gap-[30px] px-5 mt-[122px]">
        <MainContent className="col-span-3 md:col-span-2" />
        <div className="col-span-1 relative">
          <CTrends className="hidden md:flex fixed" />
        </div>
      </div>
      {/* Popup New Thread Post */}
      {isNewThreadPostPopupOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-55">
          {/* Sesuaikan lebar maksimum sesuai kebutuhan */}
          <div className="w-full px-5">
            <CNewThreadPost
              onClose={() => setIsNewThreadPostPopupOpen(false)}
            />
          </div>
        </div>
      )}
      <div className="fixed bottom-0 left-0 right-0 md:hidden flex items-center justify-center bg-[rgba(16,16,16,0.6)] backdrop-blur-3xl px-5 py-[10px]">
        <CNavLinks onNewThreadPostClick={handleNewThreadOpen} />
      </div>
    </main>
  );
}
