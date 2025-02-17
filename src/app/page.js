'use client'
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function Default() {
const router = useRouter();
  return (
    <div className="relative overflow-hidden bg-white">
    {/* header!! */}
    <Navbar></Navbar>
    <svg
        className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="0787a7c5-978c-4f66-83c7-11c213f99cb7"
            width={200}
            height={200}
            x="50%"
            y={-1}
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          strokeWidth={0}
          fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)"
        />
      </svg>
      
    <div className="container mx-auto max-w-7xl px-6 pb-24 md:pt-8 sm:pb-32 lg:flex lg:px-8 lg:pt-24">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
         
          <h1 className="mt-24 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Because your news feed shouldn&apos;t feed negativity.
          </h1>
          <p className="mt-6 text-lg text-gray-600">
            Experience the joy of reading with our customly filtered solutions. 
          </p>
          <div className="mt-10 flex items-center gap-x-3">
            <button
              onClick={async () => {
                router.push("/home");
              }}
              className=" rounded-full border border-black px-4 py-2 hover:bg-black transition-colors text-black  hover:text-white duration-300"
            >
              Get started
            </button>
            
          </div>
        </div>
        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
          <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
            <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
              <Image
                src="/global-filtered.png"
                alt="App screenshot"
                width={2432}
                height={1442}
                className="w-[76rem] rounded-md shadow-2xl ring-1 ring-gray-900/10"
              />
            </div>
          </div>
          </div>
          </div>
          </div>
  );
}