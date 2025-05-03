import Image from "next/image";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="bg-gray-900 py-5">
      <div className="lg:max-w-6xl mx-auto px-4 xl:px-0">
        <div className="flex justify-between items-center">
          <Link href="/" aria-label="Homepage" className="flex items-center">
            <Image
              className="h-10 w-10"
              src="/assets/images/ai-logo.png"
              alt="AI/ML Jobs"
              width={40}
              height={40}
            />
          </Link>
          <div className="flex items-center space-x-3 md:space-x-6">
            <nav className="sm:flex items-center text-lg">
              <Link
                className="text-white font-medium hover:opacity-75 transition-opacity"
                href="/"
              >
                Jobs
              </Link>
            </nav>
            <nav className="sm:flex items-center text-lg">
              <Link
                className="text-white font-medium hover:opacity-75 transition-opacity"
                href="https://aimljobs-news.beehiiv.com/"
                target="_blank"
              >
                Newsletter
              </Link>
            </nav>
            <div className="block text-center">
              <Link
                className="block items-center text-md text-base text-white font-medium bg-white bg-opacity-20 hover:bg-opacity-30 border border-transparent pb-1.5 pl-2 pr-2 pt-1 rounded-md transition-colors"
                href="/job/new"
                target="_blank"
              >
                Post job
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
