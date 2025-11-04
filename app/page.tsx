"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function Home() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Bottom fade effect that becomes visible on scroll
  const fadeOpacity = useTransform(scrollYProgress, [0.8, 1], [0, 1]);

  return (
    <>
      {/* === HERO SECTION === */}
      <div className="hero relative flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black overflow-hidden  bg-linear-to-b from-zinc-50 to-zinc-100 ">
        {/* Decorative Images */}
        <div className="absolute top-0 opacity-[0.1] left-0 w-[2px] h-[2px] rounded-full 
  shadow-[0_0_105px_190px_rgba(173,92,21,0.9)] 
  pointer-events-none">
</div>
        <Image
          src="/images/Vector 2.png"
          alt="Vector background"
          width={500}
          height={500}
          className="absolute top-0 right-0 w-48 md:w-72 lg:w-96 object-contain opacity-80 z-0"
        />
        <Image
          src="/images/Rectangle 2.png"
          alt="Bottom-right shape"
          width={500}
          height={500}
          className="absolute bottom-[-40px] right-0 w-60 md:w-96 object-contain opacity-80 z-0"
        />
        <Image
          src="/images/Rectangle 3.png"
          alt="Bottom-left shape"
          width={500}
          height={500}
          className="absolute bottom-[-40px] left-0 w-60 md:w-96 object-contain opacity-80 z-0"
        />
        <Image
          src="/images/icon.png"
          alt="App icon"
          width={120}
          height={120}
          className="absolute md:w-28 object-contain z-10"
        />

        {/* Main Content */}
        <main className="relative z-20 w-full max-w-3xl flex flex-col items-center justify-between py-24 px-6 text-center md:py-32">
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight text-black dark:text-white">
            BSChat
          </h1>

          <div className="mt-8 flex flex-col items-center gap-4">
            <h2 className="text-2xl md:text-3xl font-semibold text-zinc-900 dark:text-zinc-100">
              One and only secure chat
            </h2>
            <p className="max-w-lg text-lg text-zinc-600 dark:text-zinc-400">
              Start chatting on the most secure, privacy-first communication app
              — built for trust, speed, and simplicity.
            </p>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <a
              href="#"
              className="flex h-12 w-full sm:w-40 items-center justify-center rounded-full bg-black text-white dark:bg-white dark:text-black font-medium transition hover:opacity-80"
            >
              Login
            </a>
            <a
              href="#"
              className="flex h-12 w-full sm:w-40 items-center justify-center rounded-full border border-black/10 dark:border-white/20 text-black dark:text-white font-medium transition hover:bg-black/5 dark:hover:bg-white/10"
            >
              Sign Up
            </a>
          </div>
        </main>

        {/* Bottom Fade (Framer Motion) */}
        <motion.div
          style={{ opacity: fadeOpacity }}
          className="absolute bottom-0 left-0 w-full h-36 bg-gradient-to-t from-black to-transparent pointer-events-none z-50"
        />
      </div>

      {/* === INFO SECTION === */}
      <section
        ref={sectionRef}
        className="relative min-h-screen   bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-black dark:to-zinc-900 flex flex-col items-center justify-center text-center px-6 py-24 md:py-40"
      >
<div className="absolute top-0 right-0 w-[2px] h-[2px] rounded-full 
  shadow-[0_0_105px_190px_rgba(123,0,184,0.9)] 
  pointer-events-none">
</div>
  <section className="grid justify-center grid-3 text-7xl mb-20">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true }}
            className={"circle-text"}
          >
            PRIVATE. SECURE. YOURS.
          </motion.div>
          <br />
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true }}
          >
            END-TO-END ENCRYPTED CHAT
          </motion.div>
          <br/>
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true }} 
          >
            CONNECT WITHOUT COMPROMISE
          </motion.div>
          <br/>
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true }}
          >
            BUILT FOR PRIVACY +
          </motion.div>
        </section>

        <div className="max-w-3xl space-y-12 text-lg md:text-xl text-zinc-700 dark:text-zinc-300">
         <div className="max-w-3xl space-y-12 text-lg md:text-xl text-zinc-700 dark:text-zinc-300">
        <motion.p
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <strong>Your conversations deserve privacy.</strong> In an age where
          data is currency, your personal messages shouldn’t be. Every chat,
          call, and file you share is protected with end-to-end encryption —
          readable only by you and your contacts.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <strong>No ads. No tracking. No compromises.</strong> Privacy is a
          right, not a premium feature. Your messages aren’t stored, analyzed,
          or sold — ever.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <strong>Built for trust, designed for simplicity.</strong> Clean
          design, fast performance, and real security — everything you need to
          communicate freely without worrying who’s listening.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <strong>Start chatting securely today.</strong> Create a free account
          and experience messaging that puts privacy first.
        </motion.p>
      </div>

        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <a
            href="#"
            className="inline-block rounded-full bg-black text-white dark:bg-white dark:text-black py-3 px-8 font-semibold text-lg hover:opacity-80 transition"
          >
            Get Started →
          </a>
        </motion.div>
      </section>
    </>
  );
}
