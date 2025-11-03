import Image from "next/image"; 
export default function Home() {
  return ( 
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black overflow-hidden">
              <Image
          src="/images/Vector 2.png"
          className="sltr"
          alt="Hello"
          width={500}
          height={500}
          style={{
            position: "absolute",
            top: "1px",
            right: "0",  // 👈 added this line
            zIndex: 1, 
          }}
        />
        <Image
          src="/images/Rectangle 2.png"
          alt="Hello"

        className="slr"
          width={500}
          height={500}
          style={{
            position: "absolute",
            bottom: "-60px",
            right: "0",  // 👈 added this line
            zIndex: 1,
            overflow:"hidden"
          }}
        />
        <Image
        className="sll"
          src="/images/Rectangle 3.png"
          alt="Hello"
          width={500}
          height={500}
          style={{
            position: "absolute",
            bottom: "-60px",
            left: "0",  // 👈 added this line

            zIndex: 1,
            overflow:"hidden"
          }}
        />
        <Image
        className="sll"
          src="/images/icon.png"
          alt="Hello"
          width={500}
          height={500}
          style={{
            position: "absolute",
            bottom: "-60px",
            right: "-10px",
            zIndex: 1,
            overflow:"hidden"
          }}
        />

      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center  overflow-hidden justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
   <h1 className="max-w-xs text-9xl " >BSChat</h1>
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50  backdrop-blur-3xl">
            One and only secure chat
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Start chatting in  one and only most secure app
           
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Login
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Sign Up
          </a>
          
        </div>
      </main>
    </div>
     
  );
}
