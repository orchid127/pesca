import Link from "next/link";

export default function Home() {
  return (
    <main className="grid grid-col-1 place-items-center">
      <div className="bg-[url(../public/butterfly-1.jpg)] bg-no-repeat object-center border-3 rounded-2xl w-full h-full relative">
        <div className=" flex justify-end text-[2rem] text-white px-5">
          <Link href="/stats" className="m-2">stats</Link>
          <Link href="/settings" className="m-2">settings</Link>
        </div>

        <div className="flex flex-col items-center py-10 mx-50 mt-40 mb-50 bg-[#5D6E22]/48 border-3 border-black rounded-2xl text-white">
          <p className="text-[2rem]">good luck ✧˖°</p>
          <p className="text-[10rem] -mt-10">25:00</p>
          <div className=" flex gap-40 text-[2rem] absolute bottom-45">
            <button type="button" className="bg-black px-10 py-2 rounded-full">start</button>
            <button type="button" className="bg-black px-10 py-2 rounded-full">reset</button>
          </div>
        </div>

      </div>
    </main>
  );
}
