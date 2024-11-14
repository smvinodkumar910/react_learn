import VisNetwork from '@/app/linearview/dynamicNetwork';

export default function Home() {
  /*
  return (
    <><div id='mynetwork'
      className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]" >
        <VisNetwork/>
        </div>
      </>
  );
  */

  return (
    <><div id='mynetwork'
      className="h-screen w-screen">
        <VisNetwork/>
        </div>
      </>
  );
  
}
