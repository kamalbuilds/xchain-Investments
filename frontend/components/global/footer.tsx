export default function Footer() {
    return (
      <footer className="bg-muted text-muted-foreground p-4 mt-8">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold mb-2">About FundDAO</h3>
            <p className="text-sm">Empowering projects through decentralized funding and governance.</p>
          </div>
          <div>
            <h3 className="font-bold mb-2">Quick Links</h3>
            <ul className="text-sm space-y-1">
              <li><a href="#" className="hover:underline">Terms of Service</a></li>
              <li><a href="#" className="hover:underline">Privacy Policy</a></li>
              <li><a href="#" className="hover:underline">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">Connect</h3>
            <ul className="text-sm space-y-1">
              <li><a href="#" className="hover:underline">Twitter</a></li>
              <li><a href="#" className="hover:underline">Discord</a></li>
              <li><a href="#" className="hover:underline">GitHub</a></li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-8 text-sm">
          &copy; 2023 FundDAO. All rights reserved.
        </div>
      </footer>
    )
  }
