export function SiteFooter() {
  return (
    <footer className="bg-muted py-8 text-muted-foreground">
      <div className="container mx-auto grid grid-cols-1 gap-8 md:grid-cols-4">
        <div>
          <h3 className="mb-2 font-bold">XChainPools</h3>
          <p className="text-sm">
            Empowering DeFi through cross-chain liquidity and yield
            optimization.
          </p>
        </div>
        <div>
          <h4 className="mb-2 font-semibold">Quick Links</h4>
          <ul className="space-y-1 text-sm">
            <li>
              <a href="#" className="hover:text-primary">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary">
                How It Works
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary">
                FAQs
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="mb-2 font-semibold">Legal</h4>
          <ul className="space-y-1 text-sm">
            <li>
              <a href="#" className="hover:text-primary">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary">
                Risk Disclosure
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="mb-2 font-semibold">Connect</h4>
          <ul className="space-y-1 text-sm">
            <li>
              <a href="#" className="hover:text-primary">
                Twitter
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary">
                Discord
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary">
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto mt-8 border-t border-muted-foreground/20 pt-8 text-center text-sm">
        &copy; 2024 XChainPools. All rights reserved.
      </div>
    </footer>
  )
}
