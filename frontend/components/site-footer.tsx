export function SiteFooter() {
    return (
      <footer className="bg-muted text-muted-foreground py-8">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-2">XChainPools</h3>
            <p className="text-sm">Empowering DeFi through cross-chain liquidity and yield optimization.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Quick Links</h4>
            <ul className="text-sm space-y-1">
              <li><a href="#" className="hover:text-primary">About Us</a></li>
              <li><a href="#" className="hover:text-primary">How It Works</a></li>
              <li><a href="#" className="hover:text-primary">FAQs</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Legal</h4>
            <ul className="text-sm space-y-1">
              <li><a href="#" className="hover:text-primary">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary">Risk Disclosure</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Connect</h4>
            <ul className="text-sm space-y-1">
              <li><a href="#" className="hover:text-primary">Twitter</a></li>
              <li><a href="#" className="hover:text-primary">Discord</a></li>
              <li><a href="#" className="hover:text-primary">GitHub</a></li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto mt-8 pt-8 border-t border-muted-foreground/20 text-center text-sm">
          &copy; 2024 XChainPools. All rights reserved.
        </div>
      </footer>
    )
  }
