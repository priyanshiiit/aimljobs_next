"use client";

export const PackDetails = () => {
  return (
    <section id="pricing" className="bg-gradient-to-t from-gray-50 to-gray-100">
      <div className="lg:max-w-5xl lg:mx-auto px-4 sm:px-6 xl:px-0 py-20 md:py-32">
        <h2 className="text-3xl md:text-5xl lg:text-6xl text-gray-900 font-extrabold text-center tracking-tight">
          Simple & Transparent Pricing
        </h2>
        <h3 className="text-lg md:text-2xl text-gray-700 text-center mt-3 mb-20">
          Includes every feature we offer all-in-one, fixed price.
        </h3>
        <div className="md:flex mt-4 md:mt-8 justify-center items-center">
          <div className="w-full md:w-5/12 mt-16 md:mt-0">
            <div className="bg-white p-8 md:px-8 md:py-16 rounded-md text-center shadow-md">
              <div className="flex items-center justify-center">
                <span className="text-4xl md:text-6xl text-gray-900 font-extrabold tracking-tight px-3">
                  $169
                </span>
                <span className="text-xl md:text-3xl text-gray-500 font-semibold tracking-wide -mt-3">
                  USD
                </span>
              </div>
              <p className="md:text-lg text-gray-600 leading-relaxed md:leading-relaxed mt-8 md:mt-10">
                Hiring is the most important thing you do. With 100,000+ monthly
                AI job seekers, let us help you find your next great hire.
              </p>
              <a
                className="inline-block w-full md:text-lg font-semibold text-white bg-purple border border-transparent mt-8 px-5 py-2.5 rounded-md hover:bg-gray-900 transition-colors"
                href="#form"
              >
                Get started
              </a>
            </div>
          </div>

          <div className="ml-10 md:ml-20 w-full md:w-5/12 mt-16 md:mt-0">
            <p className="text-lg md:text-2xl text-gray-800 font-bold">
              What's included
            </p>
            <ul className="text-gray-600">
              <li className="flex items-start md:items-center text-base md:text-lg leading-snug md:leading-snug py-1 md:py-1.5">
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 mr-3 text-green-darkest"
                    fill="none"
                    stroke="currentcolor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
                <h4>Job post is live for 30 days</h4>
              </li>
              <li className="flex items-start md:items-center text-base md:text-lg leading-snug md:leading-snug py-1 md:py-1.5">
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 mr-3 text-green-darkest"
                    fill="none"
                    stroke="currentcolor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
                <h4>Top placement on the front page</h4>
              </li>
              {/* <li className="flex items-start md:items-center text-base md:text-lg leading-snug md:leading-snug py-1 md:py-1.5">
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 mr-3 text-green-darkest"
                    fill="none"
                    stroke="currentcolor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
                <h4>Top placement on filtered search results</h4>
              </li> */}
              <li className="flex items-start md:items-center text-base md:text-lg leading-snug md:leading-snug py-1 md:py-1.5">
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 mr-3 text-green-darkest"
                    fill="none"
                    stroke="currentcolor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
                <h4>Highlighted to stand out</h4>
              </li>
              <li className="flex items-start md:items-center text-base md:text-lg leading-snug md:leading-snug py-1 md:py-1.5">
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 mr-3 text-green-darkest"
                    fill="none"
                    stroke="currentcolor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
                <h4>Branded with your company logo</h4>
              </li>
              {/* <li className="flex items-start md:items-center text-base md:text-lg leading-snug md:leading-snug py-1 md:py-1.5">
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 mr-3 text-green-darkest"
                    fill="none"
                    stroke="currentcolor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
                <h4>Featured in our newsletter</h4>
              </li> */}
              <li className="flex items-start md:items-center text-base md:text-lg leading-snug md:leading-snug py-1 md:py-1.5">
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 mr-3 text-green-darkest"
                    fill="none"
                    stroke="currentcolor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
                <h4>Multiple social media posts</h4>
              </li>
              {/* <li className="flex items-start md:items-center text-base md:text-lg leading-snug md:leading-snug py-1 md:py-1.5">
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 mr-3 text-green-darkest"
                    fill="none"
                    stroke="currentcolor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
                <h4>Volume discounts: up to 20% off</h4>
              </li> */}
              <li className="flex items-start md:items-center text-base md:text-lg leading-snug md:leading-snug py-1 md:py-1.5">
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 mr-3 text-green-darkest"
                    fill="none"
                    stroke="currentcolor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
                <h4>No account or sign-up required</h4>
              </li>
              {/* <li className="flex items-start md:items-center text-base md:text-lg leading-snug md:leading-snug py-1 md:py-1.5">
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 mr-3 text-green-darkest"
                    fill="none"
                    stroke="currentcolor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
                <h4>Crypto payment accepted</h4>
              </li> */}
              <li className="flex items-start md:items-center text-base md:text-lg leading-snug md:leading-snug py-1 md:py-1.5">
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 mr-3 text-green-darkest"
                    fill="none"
                    stroke="currentcolor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
                <h4>Dedicated support</h4>
              </li>
              <li className="flex items-start md:items-center text-base md:text-lg leading-snug md:leading-snug py-1 md:py-1.5">
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 mr-3 text-green-darkest"
                    fill="none"
                    stroke="currentcolor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
                <h4>Best hires</h4>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
