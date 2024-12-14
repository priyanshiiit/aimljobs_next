import Link from "next/link";
import Image from "next/image";

export const SocialIcons = () => {
  const socialLinks = [
    {
      name: "Twitter",
      url: "https://twitter.com/aimljobs",
      icon: "/assets/images/twitter.svg",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/company/ai-ml-data-jobs",
      icon: "/assets/images/linkedin.svg",
    },
  ];

  return (
    <div className="w-full mt-10 justify-center flex space-x-4">
      {socialLinks.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-purple transition-colors"
        >
          <Image
            src={social.icon}
            alt={`${social.name} icon`}
            width={32}
            height={32}
            className="w-8 h-8"
          />
        </a>
      ))}
    </div>
  );
};

export const Footer = () => {
  return (
    <footer className="w-full text-gray-10 mt-2">
      <SocialIcons />
      <div className="container mx-auto py-8 px-4">
        <div className="text-center">
          <div className="flex justify-center space-x-4 mb-4">
            <Link
              href="/terms"
              className="text-purple hover:text-purple-dark transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/privacy"
              className="text-purple hover:text-purple-dark transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/refund"
              className="text-purple hover:text-purple-dark transition-colors"
            >
              Refund Policy
            </Link>
          </div>
          <a
            href="https://forms.gle/gxybCdQTxZSdhCRS7"
            className="text-purple font-bold"
            target="_blank"
            rel="noopener noreferrer"
          >
            Feedback Form
          </a>
          <h1 className="font-medium mt-2">Support: aimljobhub@gmail.com</h1>
          <p className="mt-2">&copy; 2024 aimljobs.fyi All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
