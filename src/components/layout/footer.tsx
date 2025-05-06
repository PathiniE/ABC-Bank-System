export function Footer() {
    return (
      <footer className="border-t bg-background">
        <div className="container flex flex-col gap-4 py-10 md:flex-row md:gap-8 md:py-12">
          <div className="flex-1 space-y-4">
            <div className="text-lg font-medium">Bank App</div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Modern banking for modern life.</p>
          </div>
          <div className="grid flex-1 grid-cols-2 gap-8 sm:grid-cols-4">
            <div className="space-y-3">
              <div className="text-sm font-medium">Products</div>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-gray-500 hover:text-primary dark:text-gray-400">
                    Accounts
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-500 hover:text-primary dark:text-gray-400">
                    Loans
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-500 hover:text-primary dark:text-gray-400">
                    Credit Cards
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <div className="text-sm font-medium">Company</div>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-gray-500 hover:text-primary dark:text-gray-400">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-500 hover:text-primary dark:text-gray-400">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-500 hover:text-primary dark:text-gray-400">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <div className="text-sm font-medium">Resources</div>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-gray-500 hover:text-primary dark:text-gray-400">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-500 hover:text-primary dark:text-gray-400">
                    Support
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-500 hover:text-primary dark:text-gray-400">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <div className="text-sm font-medium">Legal</div>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-gray-500 hover:text-primary dark:text-gray-400">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-500 hover:text-primary dark:text-gray-400">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-500 hover:text-primary dark:text-gray-400">
                    Cookies
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t py-6">
          <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} Bank App. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-500 hover:text-primary dark:text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-primary dark:text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-primary dark:text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    )
  }
  