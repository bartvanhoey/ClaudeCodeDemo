"use client";
import Image from "next/image";
import { useState } from "react";

const Hero = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <section className="relative overflow-hidden bg-noris-dark-green-900 pb-20 pt-35 text-white md:pt-40 xl:pb-25 xl:pt-46">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <div className="flex lg:items-center lg:gap-8 xl:gap-32.5">
            <div className=" md:w-1/2">
              <div className="mb-4.5 flex flex-wrap gap-2.5">
                <span className="rounded-full bg-noris-green-500 px-4 py-1 text-sm font-medium text-white">
                  Transport technology
                </span>
                <span className="rounded-full bg-noris-green-700 px-4 py-1 text-sm font-medium text-white">
                  Shipbuilding
                </span>
              </div>
              <h1 className="mb-5 pr-16 text-3xl font-bold text-white xl:text-hero ">
                The people who make {"   "}
                <span className="relative inline-block text-noris-green-50">
                  Noris
                </span>{" "}
                reliable
              </h1>
              <p className="text-noris-dark-green-tint-700">
                Technology that our customers and partners can rely on. Solutions
                that work under extreme conditions for many years. Our employees
                ensure this with their expertise and passion for technology, day
                after day.
              </p>

              <div className="mt-10">
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-wrap gap-5">
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="text"
                      placeholder="Enter your email address"
                      className="rounded-full border border-noris-dark-green-300 bg-transparent px-6 py-2.5 text-white placeholder:text-noris-dark-green-tint-500 shadow-solid-2 focus:border-noris-green-50 focus:outline-hidden dark:shadow-none"
                    />
                    <button
                      aria-label="get started button"
                      className="flex rounded-full bg-noris-green-50 px-7.5 py-2.5 font-medium text-noris-dark-green-900 duration-300 ease-in-out hover:bg-noris-green-tint-200"
                    >
                      Get Started
                    </button>
                  </div>
                </form>

                <p className="mt-5 text-noris-dark-green-tint-700">
                  Try for free no credit card required.
                </p>
              </div>
            </div>

            <div className="animate_right hidden md:w-1/2 lg:block">
              <div className="relative 2xl:-mr-7.5">
                <Image
                  src="/images/shape/shape-01.png"
                  alt="shape"
                  width={46}
                  height={246}
                  className="absolute -left-11.5 top-0"
                />
                <Image
                  src="/images/shape/shape-02.svg"
                  alt="shape"
                  width={36.9}
                  height={36.7}
                  className="absolute bottom-0 right-0 z-10"
                />
                <Image
                  src="/images/shape/shape-03.svg"
                  alt="shape"
                  width={21.64}
                  height={21.66}
                  className="absolute -right-6.5 bottom-0 z-1"
                />
                <div className=" relative aspect-700/444 w-full">
                  <Image
                    className="shadow-solid-l dark:hidden"
                    src="/images/hero/hero-light.svg"
                    alt="Hero"
                    fill
                  />
                  <Image
                    className="hidden shadow-solid-l dark:block"
                    src="/images/hero/hero-dark.svg"
                    alt="Hero"
                    fill
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
