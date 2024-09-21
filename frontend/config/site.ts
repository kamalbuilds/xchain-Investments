export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "XChainPools",
  description:
    "XChainPools empowers pools through decentralized funding, anonymous voting, and community governance. Join a collective, invest in impactful pools, and be part of a revolution in transparent and democratic funding.",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Pools",
      href: "/pools",
    },
    {
      title: "Create Pool",
      href: "/create-pool",
    },
    {
      title: "Dashboard",
      href: "/dashboard",
    },
    {
      title: "Groups",
      href: "/groups",
    },
    {
      title: "Bidding",
      href: "/bidding",
    },
  ],
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    docs: "https://ui.shadcn.com",
  },
}
