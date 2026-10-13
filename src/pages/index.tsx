import type { NextPage } from "next";
import PrimaryButton from "../components/elements/PrimaryButton";
import SecondaryButton from "../components/elements/SecondaryButton";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>DEKT - Back 4 Blood Deck Builder</title>
        <meta name="description" content="Build Back 4 Blood decks, review card stat totals, and browse saved builds." />
      </Head>
      <main className="min-h-full bg-gradient-to-br from-white via-gray-50 to-primary/5 dark:from-dark-secondary dark:via-dark dark:to-primary/10 transition-colors">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent dark:from-primary/20"></div>
          <div className="relative px-6 py-16 sm:py-24 lg:py-32">
            <div className="mx-auto max-w-4xl text-center">
              <div className="flex items-center justify-center mb-8 animate-fade-in">
                <Image
                  alt="DEKT Logo"
                  src="/images/logo-plain.png"
                  width={160}
                  height={160}
                  className="drop-shadow-lg"
                />
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6 animate-slide-up">
                Master the Art of
                <span className="text-primary"> Zombie Slaying</span>
              </h2>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed animate-slide-up">
                Build Back 4 Blood decks, arrange your cards, and see their combined stats and effects.
                Save a build to revisit it later.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-slide-up">
                <Link href="/builder" className="w-full sm:w-auto">
                  <PrimaryButton>
                    <span className="flex items-center gap-2 px-4 py-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                      </svg>
                      Start Building
                    </span>
                  </PrimaryButton>
                </Link>
                <Link href="/browse" className="w-full sm:w-auto">
                  <SecondaryButton>
                    <span className="flex items-center gap-2 px-4 py-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      Explore Decks
                    </span>
                  </SecondaryButton>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-16 px-6">
          <div className="mx-auto max-w-6xl">
            <h3 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
              Why Choose DEKT?
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 rounded-xl bg-white dark:bg-dark-secondary shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Drag-and-Drop Building
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Arrange cards with a drag-and-drop deck builder.
                </p>
              </div>
              
              <div className="text-center p-6 rounded-xl bg-white dark:bg-dark-secondary shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Browse Saved Decks
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Explore saved builds by name, description, or creator.
                </p>
              </div>
              
              <div className="text-center p-6 rounded-xl bg-white dark:bg-dark-secondary shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Card Stat Totals
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  See combined card stats, effects, and deck composition while you build.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-16 px-6 bg-gradient-to-r from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20">
          <div className="mx-auto max-w-4xl text-center">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Dominate the Apocalypse?
            </h3>
            <Link href="/builder">
              <PrimaryButton>
                <span className="flex items-center gap-2 px-6 py-3 text-lg">
                  Get Started Now
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </PrimaryButton>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
