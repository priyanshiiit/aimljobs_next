import Image from 'next/image';

export const SocialIcons = () => {
  const socialLinks = [
    {
      name: 'Twitter',
      url: 'https://twitter.com/aimljobs',
      icon: '/assets/images/twitter.svg'
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/company/ai-ml-data-jobs',
      icon: '/assets/images/linkedin.svg'
    }
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