export const LIBRETRO_SYSTEMS: Record<string, string> = {
  "atari-2600": "Atari - 2600",
  "atari-5200": "Atari - 5200",
  "atari-7800": "Atari - 7800",
  jaguar: "Atari - Jaguar",
  lynx: "Atari - Lynx",
  "channel-f": "Fairchild - Channel F",
  vectrex: "GCE - Vectrex",
  colecovision: "Coleco - ColecoVision",
  intellivision: "Mattel - Intellivision",
  "odyssey-2": "Magnavox - Odyssey2",
  nes: "Nintendo - Nintendo Entertainment System",
  famicom: "Nintendo - Nintendo Entertainment System",
  snes: "Nintendo - Super Nintendo Entertainment System",
  n64: "Nintendo - Nintendo 64",
  gamecube: "Nintendo - GameCube",
  wii: "Nintendo - Wii",
  "wii-u": "Nintendo - Wii U",
  "game-boy": "Nintendo - Game Boy",
  gbc: "Nintendo - Game Boy Color",
  gba: "Nintendo - Game Boy Advance",
  nds: "Nintendo - Nintendo DS",
  "3ds": "Nintendo - Nintendo 3DS",
  "virtual-boy": "Nintendo - Virtual Boy",
  genesis: "Sega - Mega Drive - Genesis",
  "master-system": "Sega - Master System - Mark III",
  "game-gear": "Sega - Game Gear",
  saturn: "Sega - Saturn",
  dreamcast: "Sega - Dreamcast",
  "32x": "Sega - 32X",
  "sega-cd": "Sega - Mega-CD - Sega CD",
  ps1: "Sony - PlayStation",
  ps2: "Sony - PlayStation 2",
  ps3: "Sony - PlayStation 3",
  ps4: "Sony - PlayStation 4",
  psp: "Sony - PlayStation Portable",
  vita: "Sony - PlayStation Vita",
  xbox: "Microsoft - Xbox",
  "xbox-360": "Microsoft - Xbox 360",
  tg16: "NEC - PC Engine - TurboGrafx 16",
  "neo-geo-aes": "SNK - Neo Geo",
  ngpc: "SNK - Neo Geo Pocket Color",
  c64: "Commodore - 64",
  amiga: "Commodore - Amiga",
  dos: "DOS",
  arcade: "MAME",
  "zx-spectrum": "Sinclair - ZX Spectrum",
  msx: "Microsoft - MSX",
  "apple-ii": "Apple II",
  wonderswan: "Bandai - WonderSwan",
  "cd-i": "Philips - CD-i",
  "3do": "The 3DO Company - 3DO",
  turboexpress: "NEC - PC Engine - TurboGrafx 16",
};

export function libretroFileName(title: string) {
  return title.replace(/[&*/:`<>?\\|]/g, "_");
}

export function libretroCandidates(title: string) {
  const base = libretroFileName(title);
  const suffixes = ["", " (USA)", " (World)", " (USA, Europe)"];
  return suffixes.map((suffix) => `${base}${suffix}.png`);
}

export function libretroUrl(systemFolder: string, kind: "Named_Boxarts" | "Named_Snaps", fileName: string) {
  return `https://thumbnails.libretro.com/${encodeURIComponent(systemFolder)}/${kind}/${encodeURIComponent(fileName)}`;
}
