export type SystemVariant = {
  platform: string;
  title: string;
  year: number;
  variant: string;
  description: string;
  publisher: string;
};

export const SYSTEM_VARIANTS: SystemVariant[] = [
  { platform: "nes", title: "Nintendo Entertainment System (NES-001)", year: 1985, variant: "front-loader", publisher: "Nintendo", description: "Front-loader Control Deck. The toaster. 10NES lockout, composite via the AV Famicom trick or aftermarket." },
  { platform: "nes", title: "Nintendo Entertainment System Top Loader (NES-101)", year: 1993, variant: "top-loader", publisher: "Nintendo", description: "Top-loader. No RF switch box look, no composite out stock. Dogbone controller." },
  { platform: "snes", title: "Super Nintendo (SNS-001)", year: 1991, variant: "original", publisher: "Nintendo", description: "Stacked gray, two-tone. RGB-capable. The one collectors want for picture." },
  { platform: "snes", title: "Super Nintendo Jr. (SNS-101)", year: 1997, variant: "jr", publisher: "Nintendo", description: "One-chip later revisions exist. No S-Video. Smaller shell." },
  { platform: "genesis", title: "Sega Genesis Model 1", year: 1989, variant: "model-1", publisher: "Sega", description: "Headphones jack, louder sound on early VA boards. The long shape." },
  { platform: "genesis", title: "Sega Genesis Model 2", year: 1993, variant: "model-2", publisher: "Sega", description: "Shorter. Sound varies wildly by VA revision. Power LED as a tell." },
  { platform: "genesis", title: "Sega Genesis Model 3", year: 1998, variant: "model-3", publisher: "Sega", description: "No headphone, no expansion. Does not play Sega CD or 32X." },
  { platform: "n64", title: "Nintendo 64 Control Deck", year: 1996, variant: "original", publisher: "Nintendo", description: "Charcoal. Jumper Pak in the top door from the factory. Expansion Pak is extra." },
  { platform: "n64", title: "Nintendo 64 Funtastic Ice Blue", year: 1999, variant: "ice-blue", publisher: "Nintendo", description: "Translucent Funtastic series. Same guts, different shell. Other colors exist." },
  { platform: "ps1", title: "PlayStation (SCPH-1001)", year: 1995, variant: "launch", publisher: "Sony", description: "Early US fat. Parallel I/O. The original gray brick." },
  { platform: "ps1", title: "PS one", year: 2000, variant: "psone", publisher: "Sony", description: "Smaller. Optional LCD screen is a separate SKU." },
  { platform: "ps2", title: "PlayStation 2 Fat (SCPH-30001)", year: 2000, variant: "fat", publisher: "Sony", description: "Expansion bay. HDD for HDD-OSD and a few games. Network adapter extra." },
  { platform: "ps2", title: "PlayStation 2 Slim (SCPH-70000)", year: 2004, variant: "slim", publisher: "Sony", description: "Built-in Ethernet. Different multitap. Laser quality varies." },
  { platform: "gamecube", title: "Nintendo GameCube Indigo", year: 2001, variant: "indigo", publisher: "Nintendo", description: "Launch indigo. Handle. Digital AV out on DOL-001." },
  { platform: "gamecube", title: "Nintendo GameCube Platinum", year: 2002, variant: "platinum", publisher: "Nintendo", description: "Silver. Same DOL-001 family as indigo for digital out." },
  { platform: "xbox", title: "Xbox Crystal", year: 2003, variant: "crystal", publisher: "Microsoft", description: "Translucent special edition. Same 1.0–1.6 board lottery as others." },
  { platform: "wii", title: "Wii (RVL-001)", year: 2006, variant: "original", publisher: "Nintendo", description: "GameCube ports. The one you want for Melee plus Wii." },
  { platform: "wii", title: "Wii Family Edition (RVL-101)", year: 2011, variant: "family", publisher: "Nintendo", description: "No GameCube ports. Stands horizontally. Check the model if you want GCN." },
  { platform: "switch", title: "Nintendo Switch (HAC-001)", year: 2017, variant: "original", publisher: "Nintendo", description: "V1 vs V2 is a serial/board thing. Dock, Joy-Con grip, and both straps for complete." },
  { platform: "switch", title: "Nintendo Switch OLED", year: 2021, variant: "oled", publisher: "Nintendo", description: "Bigger screen, wired LAN in the dock, a kickstand that works." },
  { platform: "switch", title: "Nintendo Switch Lite", year: 2019, variant: "lite", publisher: "Nintendo", description: "Handheld only. No detachable Joy-Con. Different SKU entirely." },
  { platform: "game-boy", title: "Game Boy Pocket", year: 1996, variant: "pocket", publisher: "Nintendo", description: "Thinner, AAA battery, better screen. Link cable is a different plug." },
  { platform: "game-boy", title: "Game Boy Light", year: 1998, variant: "light", publisher: "Nintendo", description: "Japan-only backlit Pocket. Gold and silver." },
  { platform: "gba", title: "Game Boy Advance SP (AGS-001)", year: 2003, variant: "sp-001", publisher: "Nintendo", description: "Front-lit clamshell. The one with a dim but working light." },
  { platform: "gba", title: "Game Boy Advance SP (AGS-101)", year: 2005, variant: "sp-101", publisher: "Nintendo", description: "Backlit SP. The one people pay extra for." },
  { platform: "gba", title: "Game Boy Micro", year: 2005, variant: "micro", publisher: "Nintendo", description: "Tiny. Faceplates. No GBC backward compatibility." },
  { platform: "nds", title: "Nintendo DS Lite", year: 2006, variant: "lite", publisher: "Nintendo", description: "Brighter, slimmer. The DS people actually kept." },
  { platform: "nds", title: "Nintendo DSi", year: 2008, variant: "dsi", publisher: "Nintendo", description: "Cameras, no GBA slot. Different digital store." },
  { platform: "3ds", title: "Nintendo 3DS XL", year: 2012, variant: "xl", publisher: "Nintendo", description: "Bigger screens. Same 3D. Special editions multiply." },
  { platform: "3ds", title: "New Nintendo 3DS XL", year: 2015, variant: "new-xl", publisher: "Nintendo", description: "C-stick, extra buttons, exclusive titles. The one to own." },
  { platform: "psp", title: "PSP-1000", year: 2004, variant: "1000", publisher: "Sony", description: "Fat. UMD, Wi-Fi, the original analog nub." },
  { platform: "psp", title: "PSP-3000", year: 2008, variant: "3000", publisher: "Sony", description: "Brighter screen, microphone. Scanlines some people hate." },
  { platform: "psp", title: "PSP Go", year: 2009, variant: "go", publisher: "Sony", description: "No UMD. Slide-out. Digital only." },
  { platform: "vita", title: "PlayStation Vita OLED (PCH-1000)", year: 2012, variant: "oled", publisher: "Sony", description: "The screen. 3G SKUs exist. Rear touch." },
  { platform: "vita", title: "PlayStation Vita Slim (PCH-2000)", year: 2013, variant: "slim", publisher: "Sony", description: "LCD, micro USB, a little lighter." },
  { platform: "atari-2600", title: "Atari 2600 Woody", year: 1977, variant: "woody", publisher: "Atari", description: "Six-switch and four-switch woodgrain. Heavy. The look." },
  { platform: "atari-2600", title: "Atari 2600 Jr.", year: 1986, variant: "jr", publisher: "Atari", description: "Smaller black shell. Same carts. Late-era 2600." },
  { platform: "dreamcast", title: "Sega Dreamcast (VA1)", year: 1999, variant: "va1", publisher: "Sega", description: "The common US unit. GD-ROM, modem, VMU in the pad." },
];
