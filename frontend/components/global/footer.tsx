export default function Footer() {
  return (
    <footer className="mt-8 bg-muted p-4 text-muted-foreground">
      <div className="container mx-auto grid grid-cols-1 gap-8 md:grid-cols-3">
        <div>
          <h3 className="mb-2 font-bold">About FundDAO</h3>
          <p className="text-sm">
            Empowering dreams through decentralized funding and governance.
          </p>
        </div>
        <div>
          <h3 className="mb-2 font-bold">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li>
              <a href="#" className="hover:underline">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                FAQ
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-2 font-bold">Connect</h3>
          <ul className="space-y-1 text-sm">
            <li>
              <a href="#" className="hover:underline">
                Twitter
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Discord
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-8 text-center text-sm">
        &copy; 2023 FundDAO. All rights reserved.
      </div>
    </footer>
  )
}
