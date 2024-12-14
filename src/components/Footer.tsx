import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="w-full text-gray-10 mt-2">
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