import Image from "next/image";

const AIPH_Banner = () => {
  return (
    <div className="flex flex-col w-full mt-20 justify-center items-center space-x-4">
      <a href="https://aiproducthive.com/" target="_blank" rel="noopener noreferrer">
        <Image
          src="https://i.ibb.co/jy796DL/ai-product-hive-planorama-community-logo-1-horizontal-light-blue-yellow-14.png"
          alt="AI Product Hive"
          width={150}
          height={50}
        />
      </a>
      <h2 className="text-md md:text-xl mb-4">
        Join friends at AI Product Hive to explore and discuss cutting-edge AI
        products
      </h2>
      <div className="mt-5 mb-10">
        <a
          className="inline-block w-full sm:w-auto text-white font-semibold text-center bg-purple border border-transparent px-5 py-2.5 rounded-md hover:bg-gray-900 transition-colors"
          href="https://aiproducthive.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Join Now
        </a>
      </div>
    </div>
  );
};

export default AIPH_Banner; 