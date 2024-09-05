import Header from '../../components/Header';
import CNewThreadPost from '../../components/CNewThreadPost';

export default function NewThread() {
  return (
    <main className="relative">
      <Header className="fixed top-0 z-50 w-full bg-[rgba(16,16,16,0.6)] backdrop-blur-3xl" />
      <div className="relative container md:max-w-[1032px] mx-auto gap-[30px] px-5 mt-[122px]">
        <CNewThreadPost />
      </div>
    </main>
  );
}
