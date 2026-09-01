export type GameSeed = {
  title: string;
  platform: string;
  year: number;
  publisher: string;
  developer: string;
  genre: string;
  players: string;
  description: string;
  archiveId?: string;
  hasManual?: boolean;
};

function parse(raw: string): GameSeed[] {
  return raw
    .trim()
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"))
    .map((line) => {
      const [title, platform, year, publisher, developer, genre, players, description, archiveId] =
        line.split("|");
      return {
        title,
        platform,
        year: Number(year),
        publisher,
        developer,
        genre,
        players,
        description,
        archiveId: archiveId || undefined,
        hasManual: true,
      };
    });
}

// title|platform|year|publisher|developer|genre|players|description|archiveId?
const RAW = `
# Odyssey (1972)
Table Tennis|odyssey|1972|Magnavox|Sanders Associates|Sports|1-2|The analog tennis game that started home video games. Plastic overlay on the TV.
Ski|odyssey|1972|Magnavox|Sanders Associates|Sports|1|Slalom overlay and a spot of light for the skier.
Simon Says|odyssey|1972|Magnavox|Sanders Associates|Party|1-4|Color matching with the Odyssey's analog spots.
Cat and Mouse|odyssey|1972|Magnavox|Sanders Associates|Action|1-2|Chase game using the Odyssey overlay.
Football|odyssey|1972|Magnavox|Sanders Associates|Sports|2|American football overlay. Cards and plastic men included in some lots.
Haunted House|odyssey|1972|Magnavox|Sanders Associates|Adventure|1|Spooky overlay hunt. One of the first 'atmosphere' home games.
Submarine|odyssey|1972|Magnavox|Sanders Associates|Action|1-2|Torpedoes as spots of light. Overlay does the heavy lifting.
Roulette|odyssey|1972|Magnavox|Sanders Associates|Casino|1-4|Gambling overlay. The console is just a spinner.

# Channel F
Video Whizball|channel-f|1978|Fairchild|Fairchild|Action|1-2|Competitive ball game on the first cartridge console.
Alien Invasion|channel-f|1980|Fairchild|Fairchild|Shooter|1|Space Invaders-style cart for Channel F System II.
Hangman|channel-f|1977|Fairchild|Fairchild|Puzzle|1-2|Word game on Videocart.
Drag Race|channel-f|1977|Fairchild|Fairchild|Racing|1-2|Two-player drag strip.

# Atari 2600
Combat|atari-2600|1977|Atari|Atari|Shooter|1-2|Pack-in tanks and planes. The first game a lot of households owned.
Adventure|atari-2600|1980|Atari|Atari|Adventure|1|Graphically a square, spiritually the first action-adventure. Hidden Easter egg.
Pitfall!|atari-2600|1982|Activision|Activision|Platform|1|Jungle runner that showed what a third-party cart could be.
Space Invaders|atari-2600|1980|Atari|Atari|Shooter|1-2|The licensed port that sold 2600s in piles.
Asteroids|atari-2600|1981|Atari|Atari|Shooter|1-2|Vector arcade, raster living room. Still a weekend game.
Missile Command|atari-2600|1981|Atari|Atari|Shooter|1-2|Defend the cities. Best with a trak-ball, fine with a stick.
Yars' Revenge|atari-2600|1982|Atari|Atari|Shooter|1|Original 2600 game, not a port. Neutral zone and a Qotile.
River Raid|atari-2600|1982|Activision|Activision|Shooter|1-2|Vertical river, fuel, bridges. Carol Shaw.
Kaboom!|atari-2600|1981|Activision|Activision|Action|1-2|Paddles required. Catch the bombs.
Demon Attack|atari-2600|1982|Imagic|Imagic|Shooter|1-2|Imagic's calling card. Waves of demons.
Frogger|atari-2600|1982|Parker Brothers|Parker Brothers|Action|1|Log and traffic. Parker Brothers arcade license.
Pac-Man|atari-2600|1982|Atari|Atari|Maze|1-2|Infamous port. Historically important, play Ms. Pac-Man instead.
Ms. Pac-Man|atari-2600|1982|Atari|Atari|Maze|1-2|The 2600 maze game people actually replay.
E.T. the Extra-Terrestrial|atari-2600|1982|Atari|Atari|Adventure|1|The crash's mascot. Not the worst 2600 game, just the most famous failure.
H.E.R.O.|atari-2600|1984|Activision|Activision|Action|1|Helicopter rescue in caves. Late-era 2600 quality.
Enduro|atari-2600|1983|Activision|Activision|Racing|1|Day-to-night racing. Paddles not required.
Solaris|atari-2600|1986|Atari|Atari|Shooter|1|Late 2600 space game that looks like a different machine.
Warlords|atari-2600|1981|Atari|Atari|Action|1-4|Four paddles, one screen, ruined friendships.
Berzerk|atari-2600|1982|Atari|Atari|Shooter|1|'The humanoid must not escape.'
Haunted House|atari-2600|1982|Atari|Atari|Adventure|1|First-person-ish horror on the 2600.
Jungle Hunt|atari-2600|1983|Atari|Taito|Action|1|Vine swing, crocodile river, and a rescue.
Pole Position|atari-2600|1983|Atari|Namco|Racing|1|F1 from above. Mount Fuji in your head.
Centipede|atari-2600|1982|Atari|Atari|Shooter|1-2|Mushroom field, better on a trak-ball.
Defender|atari-2600|1981|Atari|Williams|Shooter|1-2|Ambitious port of a brutal arcade game.
Donkey Kong|atari-2600|1982|Coleco|Nintendo|Platform|1|Coleco port. Two of four arcade stages.
Superman|atari-2600|1979|Atari|Atari|Adventure|1|Phone booth, bridge, and kryptonite. Same engine family as Adventure.

# Intellivision
Major League Baseball|intellivision|1980|Mattel|Mattel|Sports|1-2|The sports sim that sold Intellivisions.
Astrosmash|intellivision|1981|Mattel|Mattel|Shooter|1|Asteroids-like pack-in for later systems.
Advanced Dungeons & Dragons|intellivision|1982|Mattel|Mattel|Adventure|1|Cloudy Mountain. First AD&D console game.
BurgerTime|intellivision|1982|Mattel|Data East|Action|1-2|Walk over ingredients. Watch the pickles.
B-17 Bomber|intellivision|1982|Mattel|Mattel|Sim|1|Intellivoice game. Bombardier chatter.
Pitfall!|intellivision|1982|Activision|Activision|Platform|1|Better looking than the 2600 version, still Pitfall Harry.
Night Stalker|intellivision|1982|Mattel|Mattel|Shooter|1|Maze shooter with a regenerating gun.
Utopia|intellivision|1981|Mattel|Mattel|Strategy|1-2|Often cited as an early sim/god game.
Shark! Shark!|intellivision|1982|Mattel|Mattel|Action|1-2|Eat fish, avoid the shark. Simple and mean.
Microsurgeon|intellivision|1982|Imagic|Imagic|Sim|1-2|Fly a robot through a human body.
Beauty & the Beast|intellivision|1982|Imagic|Imagic|Platform|1|Climb the building, dodge objects.
Lock 'n' Chase|intellivision|1982|Mattel|Data East|Maze|1-2|Pac-adjacent maze with doors you close.

# ColecoVision
Donkey Kong|colecovision|1982|Coleco|Nintendo|Platform|1-2|Pack-in that made the ColecoVision an arcade machine at home.
Zaxxon|colecovision|1982|Coleco|Sega|Shooter|1|Isometric arcade port that actually looked like Zaxxon.
Lady Bug|colecovision|1982|Coleco|Universal|Maze|1-2|Maze game with gates. A Coleco highlight.
Venture|colecovision|1982|Coleco|Exidy|Adventure|1|Dungeon rooms, a bow, and a hall monster.
Turbo|colecovision|1982|Coleco|Sega|Racing|1|Needs Expansion Module #2 for the wheel.
Smurf: Rescue in Gargamel's Castle|colecovision|1982|Coleco|Coleco|Platform|1|Licensed platformer, surprisingly solid.
Pepper II|colecovision|1983|Coleco|Exidy|Maze|1-2|Zipper maze. Underrated.
Carnival|colecovision|1982|Coleco|Sega|Shooter|1|Shooting gallery with a bonus wheel.
Mouse Trap|colecovision|1982|Coleco|Exidy|Maze|1-2|Color-coded doors and a hawk.
Cabbage Patch Kids: Adventures in the Park|colecovision|1984|Coleco|Coleco|Platform|1|Late licensed platformer.

# Vectrex
Mine Storm|vectrex|1982|GCE|GCE|Shooter|1|Pack-in Asteroids-style game on a vector screen.
Star Trek: The Motion Picture|vectrex|1982|GCE|GCE|Sim|1|Vector bridge crew. Overlay included.
Scramble|vectrex|1982|GCE|Konami|Shooter|1|Arcade port that looks native.
Bedlam|vectrex|1983|GCE|GCE|Shooter|1|Inside-out shooter. Overlay does a lot.
Fortress of Narzod|vectrex|1982|GCE|GCE|Shooter|1|Vertical vector corridors.
Dark Tower|vectrex|1982|GCE|GCE|Adventure|1|Unreleased prototype that collectors still talk about.
Polar Rescue|vectrex|1983|GCE|GCE|Sim|1|Submarine vector game.
Spike|vectrex|1983|GCE|GCE|Platform|1|'Eek, Spike!' Digital speech on the Vectrex.

# Odyssey 2
K.C. Munchkin!|odyssey-2|1981|Magnavox|Magnavox|Maze|1|The maze game that got Magnavox sued by Atari.
The Quest for the Rings|odyssey-2|1981|Magnavox|Magnavox|Adventure|1-2|Board game plus overlay plus cartridge. Complete copies are the hunt.
Killer Bees!|odyssey-2|1983|Magnavox|Magnavox|Action|1|Swarm combat. Late Odyssey 2 quality.
Pick Axe Pete!|odyssey-2|1982|Magnavox|Magnavox|Platform|1|Mine ladders and keys.
Attack of the Timelord!|odyssey-2|1982|Magnavox|Magnavox|Shooter|1|Voice-enhanced flying saucers.
Speedway / Spin-Out / Crypto-Logic|odyssey-2|1978|Magnavox|Magnavox|Compilation|1-2|Early pack-in trio.

# NES
Super Mario Bros.|nes|1985|Nintendo|Nintendo|Platform|1-2|The side-scroller that sold the NES in the West.
Super Mario Bros. 2|nes|1988|Nintendo|Nintendo|Platform|1-2|US SMB2 is Doki Doki Panic underneath. Pick up vegetables.
Super Mario Bros. 3|nes|1990|Nintendo|Nintendo|Platform|1-2|Racoon suit, world map, still a CIB prize.
The Legend of Zelda|nes|1987|Nintendo|Nintendo|Adventure|1|Gold cart, save battery, 'IT'S DANGEROUS TO GO ALONE.'
Zelda II: The Adventure of Link|nes|1988|Nintendo|Nintendo|Action RPG|1|Side-scrolling Zelda. Polarizing, important.
Metroid|nes|1987|Nintendo|Nintendo|Action|1|Black cart. Morph ball, bombs, and a twist ending.
Mega Man 2|nes|1989|Capcom|Capcom|Platform|1|The Mega Man template. Robot masters and a password.
Mega Man 3|nes|1990|Capcom|Capcom|Platform|1|Rush, sliding, and more masters.
Castlevania|nes|1987|Konami|Konami|Platform|1|Stairs, medusa heads, and a whip.
Castlevania III: Dracula's Curse|nes|1990|Konami|Konami|Platform|1|Branching paths and extra heroes. A peak 8-bit Konami cart.
Contra|nes|1988|Konami|Konami|Run-and-gun|1-2|30 lives code. Jungle, base, and a friend on controller 2.
Ninja Gaiden|nes|1989|Tecmo|Tecmo|Platform|1|Cutscenes, birds, and a hard last boss.
Punch-Out!!|nes|1987|Nintendo|Nintendo|Sports|1|Glass Joe through Mike Tyson (later Mr. Dream).
Tecmo Bowl|nes|1989|Tecmo|Tecmo|Sports|1-2|The NES football game. Bo Jackson goes the distance.
Final Fantasy|nes|1990|Nintendo|Square|RPG|1|Four Warriors of Light. US NES localization.
Dragon Warrior|nes|1989|Nintendo|Chunsoft|RPG|1|The first Dragon Quest in the US. Nintendo Power giveaway copies exist.
Kirby's Adventure|nes|1993|Nintendo|HAL|Platform|1|Late NES. Copy abilities, still looks new.
Battletoads|nes|1991|Tradewest|Rare|Beat 'em up|1-2|Turbo Tunnel. Friendship tester.
River City Ransom|nes|1990|Technos|Technos|Beat 'em up|1-2|RPG brawler. Buy shoes, punch a mall.
Startropics|nes|1990|Nintendo|Nintendo|Adventure|1|Letter with a paper dip code. Keep the letter.
Duck Hunt|nes|1985|Nintendo|Nintendo|Light gun|1-2|Pack-in with the Zapper. The dog is the boss.
Excitebike|nes|1985|Nintendo|Nintendo|Racing|1|Track editor. Excitebike is still the feel of the NES D-pad.
Mike Tyson's Punch-Out!!|nes|1987|Nintendo|Nintendo|Sports|1|The Tyson version. Later reprints became Mr. Dream.
Bionic Commando|nes|1988|Capcom|Capcom|Platform|1|No jump. Swing. A design lesson.
Blaster Master|nes|1988|Sunsoft|Sunsoft|Action|1-2|Tank plus on-foot. Soundtrack still slaps.
Crystalis|nes|1990|SNK|SNK|Action RPG|1|SNK's Zelda-like. Underrated gold.
Faxanadu|nes|1989|Nintendo|Hudson|Action RPG|1|Ezzet and Dwarves. Password town.
Gimmick!|nes|1992|Sunsoft|Sunsoft|Platform|1|Japan/Scandinavia. The NES soundtrack people cite.
Little Nemo: The Dream Master|nes|1990|Capcom|Capcom|Platform|1|Ride animals in slumberland.
Shadowgate|nes|1989|Kemco|ICOM|Adventure|1|First-person puzzle deathtrap.
Maniac Mansion|nes|1990|Jaleco|Lucasfilm|Adventure|1|Point-and-click with a Nintendo haircut.
Metal Gear|nes|1988|Ultra|Konami|Stealth|1|Not the MSX original, still the NES stealth cart.
RC Pro-Am|nes|1988|Nintendo|Rare|Racing|1-4|Isometric RC. Four Score later.
Tetris|nes|1989|Nintendo|Nintendo|Puzzle|1-2|Tengen version is a different SKU. Official Nintendo cart is the common one.
Dr. Mario|nes|1990|Nintendo|Nintendo|Puzzle|1-2|Vitamins vs viruses.
Double Dragon II: The Revenge|nes|1990|Technos|Technos|Beat 'em up|1-2|The NES Double Dragon people mean.
TMNT II: The Arcade Game|nes|1990|Konami|Konami|Beat 'em up|1-2|Four turtles, arcade script.
Kid Icarus|nes|1987|Nintendo|Nintendo|Platform|1|Vertical then horizontal. Angel Land.
Ice Hockey|nes|1988|Nintendo|Nintendo|Sports|1-2|Fat, skinny, average. Body checks.
Bubble Bobble|nes|1988|Taito|Taito|Platform|1-2|Bub and Bob. Super and EXTEND.
Solstice|nes|1990|Sony|Software Creations|Puzzle|1|Isometric castle. Soundtrack by Tim Follin.
Vice: Project Doom|nes|1991|American Sammy|Aicom|Action|1|Car, gun, and platformer in one cart.
Mega Man 4|nes|1992|Capcom|Capcom|Platform|1|New Mega Buster charge. Late NES.
Mega Man 6|nes|1994|Capcom|Capcom|Platform|1|Last NES Mega Man. Adapter Robot.

# Famicom extras
Super Mario Bros. 2 (Japan)|famicom|1986|Nintendo|Nintendo|Platform|1-2|The lost levels. Later released as The Lost Levels.
Donkey Kong|famicom|1983|Nintendo|Nintendo|Platform|1|The 1983 Famicom launch cart. Jumpman, barrels, Pauline.
Balloon Fight|famicom|1985|Nintendo|Nintendo|Action|1-2|Helium and spinning tiles. Also on NES.
Clu Clu Land|famicom|1984|Nintendo|Nintendo|Puzzle|1-2|Black hole maze. Early Famicom.
Wrecking Crew|famicom|1985|Nintendo|Nintendo|Puzzle|1-2|Mario with a hammer. Level editor on Famicom.

# Master System
Alex Kidd in Miracle World|master-system|1986|Sega|Sega|Platform|1|Built into later Master Systems. Paper, scissors, rock bosses.
Phantasy Star|master-system|1988|Sega|Sega|RPG|1|First-person dungeons, 3D towns, Alisa. A landmark 8-bit RPG.
Wonder Boy III: The Dragon's Trap|master-system|1989|Sega|Westone|Action|1|Form-changing Metroidvania before the word.
Sonic the Hedgehog|master-system|1991|Sega|Ancient|Platform|1|8-bit Sonic. Different game from Genesis, still good.
Shinobi|master-system|1988|Sega|Sega|Action|1|Arcade ninja, home ninja.
R-Type|master-system|1988|Sega|Irem|Shooter|1|Ambitious port of a mean shooter.
Out Run|master-system|1987|Sega|Sega|Racing|1|Ferrari and forks in the road.
Land of Illusion|master-system|1992|Sega|Sega|Platform|1|Mickey at peak 8-bit Sega.
Power Strike|master-system|1988|Sega|Compile|Shooter|1|Aleste in Japan. Compile shmup.
Fantasy Zone|master-system|1986|Sega|Sega|Shooter|1|Cute 'em up. Opa-Opa.
Golvellius|master-system|1988|Sega|Compile|Adventure|1|Zelda-like Compile adventure.
California Games|master-system|1989|Sega|Epyx|Sports|1-8|Half pipe and flying disc.

# Genesis
Sonic the Hedgehog|genesis|1991|Sega|Sonic Team|Platform|1-2|The mascot that defined the 16-bit war.
Sonic the Hedgehog 2|genesis|1992|Sega|Sonic Team|Platform|1-2|Tails, Spin Dash, Chemical Plant.
Sonic the Hedgehog 3|genesis|1994|Sega|Sonic Team|Platform|1-2|Save files and a two-cart saga with Knuckles.
Gunstar Heroes|genesis|1993|Sega|Treasure|Run-and-gun|1-2|Treasure's calling card. Dice Palace.
Streets of Rage 2|genesis|1992|Sega|Sega|Beat 'em up|1-2|Yuzo Koshiro. The 16-bit brawler.
Phantasy Star IV|genesis|1993|Sega|Sega|RPG|1|Best of the classic PS series on a cart.
Shining Force II|genesis|1993|Sega|Camelot|Strategy RPG|1|The gateway SRPG for a lot of US players.
Beyond Oasis|genesis|1994|Sega|Ancient|Action RPG|1|Gold silver armlet. Also The Story of Thor.
Earthworm Jim|genesis|1994|Playmates|Shiny|Platform|1|Gross, funny, and a lot of animation.
Altered Beast|genesis|1989|Sega|Sega|Beat 'em up|1-2|Pack-in for many US launches. Rise from your grave.
Road Rash II|genesis|1992|Electronic Arts|EA|Racing|1-2|Kick the other bikes. EA on carts.
Madden NFL '94|genesis|1993|Electronic Arts|EA|Sports|1-4|John Madden on 16-bit. The yearly grind starts here.
NBA Jam|genesis|1994|Acclaim|Midway|Sports|1-4|He's on fire. Four-player with a Team Player.
Mortal Kombat II|genesis|1994|Acclaim|Midway|Fighting|1-2|Blood switch. The arcade at home argument.
Street Fighter II': Special Champion Edition|genesis|1993|Capcom|Capcom|Fighting|1-2|The six-button reason.
Castlevania: Bloodlines|genesis|1994|Konami|Konami|Platform|1|The Genesis Castlevania. Eric and John.
Thunder Force IV|genesis|1992|Sega|Technosoft|Shooter|1|Lightening Force in the US. 16-bit shmup peak.
Ranger X|genesis|1993|Sega|Gau|Action|1|Mech and a motorcycle. Looks expensive.
Comix Zone|genesis|1995|Sega|Sega|Beat 'em up|1|Panel-to-panel brawler. Late Genesis flex.
Ecco the Dolphin|genesis|1992|Sega|Novotrade|Adventure|1|A dolphin, time travel, and a lot of drowning.
Flashback|genesis|1993|U.S. Gold|Delphine|Action|1|Rotoscoped cinematic platformer.
Toejam & Earl|genesis|1991|Sega|Johnson Voorsanger|Adventure|1-2|Funk on a random Earth.
Vectorman|genesis|1995|Sega|BlueSky|Platform|1|Late Genesis, still looks like a tech demo.
Golden Axe|genesis|1989|Sega|Sega|Beat 'em up|1-2|Magic, chickens, Death Adder.
Shinobi III|genesis|1993|Sega|Sega|Action|1|The best classic Shinobi.
Phantasy Star II|genesis|1989|Sega|Sega|RPG|1|Kill a friend, save a planet. Heavy for 1989.
Streets of Rage|genesis|1991|Sega|Sega|Beat 'em up|1-2|The first. Bare Knuckle in Japan.
Mega Bomberman|genesis|1994|Sega|Hudson|Action|1-4|Bombs and a Team Player.

# SNES
Super Mario World|snes|1991|Nintendo|Nintendo|Platform|1-2|Pack-in. Yoshi, Star Road, and 96 exits.
The Legend of Zelda: A Link to the Past|snes|1992|Nintendo|Nintendo|Adventure|1|Light World, Dark World. The 2D Zelda template.
Super Metroid|snes|1994|Nintendo|Nintendo|Action|1|The Metroidvania people mean when they say the word.
Chrono Trigger|snes|1995|Square|Square|RPG|1|Time travel, New Game +, multiple endings.
Final Fantasy III (US)|snes|1994|Square|Square|RPG|1|FF6 everywhere else. Opera, Magitek, and Kefka.
Super Mario Kart|snes|1992|Nintendo|Nintendo|Racing|1-2|Battle Mode. Rainbow Road. The kart genre starts here.
Donkey Kong Country|snes|1994|Nintendo|Rare|Platform|1-2|Pre-rendered look that sold a late SNES.
Street Fighter II Turbo|snes|1993|Capcom|Capcom|Fighting|1-2|The living-room fighter of the 90s.
Super Castlevania IV|snes|1991|Konami|Konami|Platform|1|Mode 7 whip. First-stage stairs done right.
Secret of Mana|snes|1993|Square|Square|Action RPG|1-3|Three players, one SNES, a lot of extra controllers.
EarthBound|snes|1995|Nintendo|HAL / Ape|RPG|1|The box with the players guide. Complete copies are a market.
Super Punch-Out!!|snes|1994|Nintendo|Nintendo|Sports|1|TV in the corner, Bald Bull, and a lot of ducking.
F-Zero|snes|1991|Nintendo|Nintendo|Racing|1|Launch title. Mute City. Mode 7 at 100cc.
Star Fox|snes|1993|Nintendo|Nintendo / Argonaut|Shooter|1|Super FX chip. Do a barrel roll.
Yoshi's Island|snes|1995|Nintendo|Nintendo|Platform|1|Super FX2. Baby Mario, and a crayon look.
Mega Man X|snes|1993|Capcom|Capcom|Platform|1|Dash, wall kick, and Zero.
Final Fantasy II (US)|snes|1991|Square|Square|RPG|1|FF4. Cecil and a lot of twists.
Super Ghouls 'n Ghosts|snes|1991|Capcom|Capcom|Platform|1|Armor twice. Hard once.
ActRaiser|snes|1991|Enix|Quintet|Action|1|Sim plus side-scroller. Unique mix.
Turtles in Time|snes|1992|Konami|Konami|Beat 'em up|1-2|The TMNT arcade at home, better.
NBA Jam Tournament Edition|snes|1995|Acclaim|Midway|Sports|1-4|More dunks, more secrets.
Kirby Super Star|snes|1996|Nintendo|HAL|Platform|1-2|Helper and a game collection on one cart.
Harvest Moon|snes|1997|Natsume|Pack-In-Video|Sim|1|The farm game that started a genre in the West.
Illusion of Gaia|snes|1994|Enix|Quintet|Action RPG|1|World tour, flute, and a heavy story.
Terranigma|snes|1995|Nintendo|Quintet|Action RPG|1|PAL/Japan. US collectors import it.
Panel de Pon / Tetris Attack|snes|1996|Nintendo|Intelligent Systems|Puzzle|1-2|Yoshi-skinned puzzle masterpiece.
Super Street Fighter II|snes|1994|Capcom|Capcom|Fighting|1-2|Four new challengers.
Contra III|snes|1992|Konami|Konami|Run-and-gun|1-2|Mode 7 missile ride.
Pilotwings|snes|1991|Nintendo|Nintendo|Sim|1|Launch title. Sky diving and a hang glider.
SimCity|snes|1991|Nintendo|Nintendo / Maxis|Sim|1|Dr. Wright. Bowser as a disaster.
Zombies Ate My Neighbors|snes|1993|Konami|LucasArts|Run-and-gun|1-2|Chainsaws, tourists, and 50+ levels.
UN Squadron|snes|1991|Capcom|Capcom|Shooter|1-2|Capcom shmup with weapon shops.
Breath of Fire II|snes|1995|Capcom|Capcom|RPG|1|The frog, the town, the dragon.
E.V.O.: Search for Eden|snes|1993|Enix|Almanic|Action RPG|1|Eat, evolve, become.
Mortal Kombat II|snes|1994|Acclaim|Midway|Fighting|1-2|Blood on the SNES this time.

# TG-16
Bonk's Adventure|tg16|1990|NEC|Red|Platform|1|The American mascot NEC tried.
Military Madness|tg16|1989|NEC|Hudson|Strategy|1-2|Nectaris. Hex war on a HuCard.
Gate of Thunder|tg16|1992|TTi|Red|Shooter|1|CD shooter that shows off the add-on.
Y's Book I & II|tg16|1990|NEC|Nihon Falcom|RPG|1|CD soundtrack in the living room.
Air Zonk|tg16|1992|TTi|Red|Shooter|1|Bonk with a gun, sort of.
Dungeon Explorer|tg16|1989|NEC|Hudson|Action RPG|1-5|Gauntlet-like with a fifth player.
Blazing Lazers|tg16|1989|NEC|Compile|Shooter|1|Gunhed. Compile on HuCard.
R-Type|tg16|1988|NEC|Irem|Shooter|1|One of the better 8/16-bit R-Types.
Lords of Thunder|tg16|1993|TTi|Red|Shooter|1|CD metal soundtrack.
Castlevania: Rondo of Blood|tg16|1993|Konami|Konami|Platform|1|PC Engine CD. Japan. The Castlevania people import.

# Neo Geo AES
Metal Slug|neo-geo-aes|1996|SNK|Nazca|Run-and-gun|1-2|Cartoons and grenades. AES cart is a mortgage.
Fatal Fury Special|neo-geo-aes|1993|SNK|SNK|Fighting|1-2|The SNK fighter a lot of cabinets had.
Samurai Shodown II|neo-geo-aes|1994|SNK|SNK|Fighting|1-2|Weapons, slack, and a lot of dust.
King of Fighters '98|neo-geo-aes|1998|SNK|SNK|Fighting|1-2|Dream Match. The KOF people mean.
Puzzle Bobble|neo-geo-aes|1994|SNK|Taito|Puzzle|1-2|Bust-a-Move. Same cart energy, friendlier price than Metal Slug.
Last Resort|neo-geo-aes|1992|SNK|SNK|Shooter|1-2|R-Type cousin. Gorgeous and mean.
Magician Lord|neo-geo-aes|1990|SNK|ADK|Platform|1|Launch title. Transformations.
Shock Troopers|neo-geo-aes|1997|SNK|Saurus|Run-and-gun|1-2|Top-down commando.
Windjammers|neo-geo-aes|1994|SNK|Data East|Sports|1-2|Flying disc. Tournament game.
Baseball Stars 2|neo-geo-aes|1992|SNK|SNK|Sports|1-2|Create-a-team. Deep for a sports cart.

# Jaguar
Tempest 2000|jaguar|1994|Atari|Llamasoft|Shooter|1|The Jaguar game. Tunnel, soundtrack, still electric.
Alien vs Predator|jaguar|1994|Atari|Rebellion|Action|1|Three campaigns. The other Jaguar must-own.
Iron Soldier|jaguar|1994|Atari|Eclipse|Sim|1|Mech, buildings, missiles.
Wolfenstein 3D|jaguar|1994|Atari|id|Shooter|1|Port with extra episodes.
Doom|jaguar|1994|Atari|id|Shooter|1|Missing some maps, still a 64-bit talking point.
Trevor McFur in the Crescent Galaxy|jaguar|1993|Atari|Atari|Shooter|1|Launch title. Not why you buy a Jaguar.
Kasumi Ninja|jaguar|1994|Atari|Hand Made|Fighting|1-2|Infamous fighter. Collectors own it anyway.
Super Burnout|jaguar|1995|Atari|Shen|Racing|1|Motorcycle racer that feels finished.

# Saturn
NiGHTS into Dreams|saturn|1996|Sega|Sonic Team|Action|1|Dual stick analog. Christmas Nights is a different SKU.
Panzer Dragoon Saga|saturn|1998|Sega|Team Andromeda|RPG|1|Four discs. The Saturn white whale.
Guardian Heroes|saturn|1996|Sega|Treasure|Beat 'em up|1-2|Branching brawler. Treasure again.
Fighters Megamix|saturn|1996|Sega|AM2|Fighting|1-2|Virtua Fighter plus Fighting Vipers in a blender.
Virtua Fighter 2|saturn|1995|Sega|AM2|Fighting|1-2|The 2D look of 3D fighting, somehow.
Saturn Bomberman|saturn|1996|Sega|Hudson|Action|1-10|Ten players. The party reason to own a Saturn.
Shining Force III|saturn|1997|Sega|Camelot|Strategy RPG|1|Scenario 1 in the US. 2 and 3 are import.
Dragon Force|saturn|1996|Working Designs|Sega|Strategy|1|Real-time armies. Working Designs box.
Albert Odyssey: Legend of Eldean|saturn|1997|Working Designs|Sunsoft|RPG|1|Working Designs localization quirks included.
Street Fighter Alpha 3|saturn|1998|Capcom|Capcom|Fighting|1-2|One of the best home versions.
Radiant Silvergun|saturn|1998|ESP|Treasure|Shooter|1-2|Japan. The shmup. Import prices follow.
Burning Rangers|saturn|1998|Sega|Sonic Team|Action|1|Firefighters, voice, and a lot of polygons.

# PS1
Final Fantasy VII|ps1|1997|Sony|Square|RPG|1|Three discs. Cloud, a flower girl, and a market that never cooled.
Metal Gear Solid|ps1|1998|Konami|Konami|Stealth|1|Codec, cardboard box, and a codec frequency on the box spine.
Castlevania: Symphony of the Night|ps1|1997|Konami|Konami|Action|1|Inverted castle. The Metroidvania that paid the bills.
Resident Evil 2|ps1|1998|Capcom|Capcom|Survival|1|Two discs, two scenarios. Leon and Claire.
Tekken 3|ps1|1998|Namco|Namco|Fighting|1-2|The PS1 fighter. Force 10.
Crash Bandicoot 2|ps1|1997|Sony|Naughty Dog|Platform|1|Warp Room. The one that feels good.
Spyro the Dragon|ps1|1998|Sony|Insomniac|Platform|1|Collect orbs, roast sheep, fly.
Gran Turismo|ps1|1998|Sony|Polyphony|Racing|1-2|The Real Driving Simulator. Used-car lot included.
Tony Hawk's Pro Skater 2|ps1|2000|Activision|Neversoft|Sports|1-2|Create-a-park. The sports game that is also a platformer.
Silent Hill|ps1|1999|Konami|Konami|Survival|1|Fog as a draw-distance trick and a mood.
Final Fantasy Tactics|ps1|1998|Sony|Square|Strategy RPG|1|Ivalice. Job system. Ramza.
Parasite Eve|ps1|1998|Square|Square|RPG|1|NYPD, opera, and a turn-based shooter hybrid.
Xenogears|ps1|1998|Square|Square|RPG|1|Two discs. Disc 2 is a conversation.
Suikoden II|ps1|1999|Konami|Konami|RPG|1|108 Stars. The one collectors pay for.
Legacy of Kain: Soul Reaver|ps1|1999|Eidos|Crystal Dynamics|Action|1|Shift planes. Raziel.
PaRappa the Rapper|ps1|1997|Sony|NanaOn-Sha|Rhythm|1|Kick, punch, block, that's the way we do it.
Twisted Metal 2|ps1|1996|Sony|SingleTrac|Action|1-2|Paris. The ice cream truck.
Ridge Racer|ps1|1995|Namco|Namco|Racing|1|Launch title. 30 seconds of Rage Racer memories.
Tomb Raider|ps1|1996|Eidos|Core|Action|1|Lara, wolves, and a lot of save crystals.
Chrono Cross|ps1|2000|Square|Square|RPG|1|Not Trigger. Still a giant, weird RPG.
Vagrant Story|ps1|2000|Square|Square|Action RPG|1|Riskbreakers. Menu combat that goes deep.
Driver|ps1|1999|GT Interactive|Reflections|Action|1|The film-school driving test.
Syphon Filter|ps1|1999|989 Studios|SCE WWS|Action|1|Taser. Washington D.C. subway.
Breath of Fire IV|ps1|2000|Capcom|Capcom|RPG|1|The handsome one. Late PS1 Capcom RPG.
Dino Crisis|ps1|1999|Capcom|Capcom|Survival|1|Resident Evil with dinosaurs.
Front Mission 3|ps1|2000|Square|Square|Strategy|1|Wanzers. Two starting paths.
Wipeout XL|ps1|1996|Psygnosis|Psygnosis|Racing|1-2|The Designers Republic. Future races.
Ape Escape|ps1|1999|Sony|SCE Japan|Platform|1|DualShock required. First game that meant it.
Tony Hawk's Pro Skater|ps1|1999|Activision|Neversoft|Sports|1-2|The first. Warehouse.
Final Fantasy VIII|ps1|1999|Square|Square|RPG|1|Draw system. SeeD. Four discs.
Final Fantasy IX|ps1|2000|Square|Square|RPG|1|A return to the theatrical. Four discs.

# N64
Super Mario 64|n64|1996|Nintendo|Nintendo|Platform|1|Analog stick, 120 stars, the 3D platformer template.
The Legend of Zelda: Ocarina of Time|n64|1998|Nintendo|Nintendo|Adventure|1|Gold cart. Time travel, a horse, and a market that never rests.
The Legend of Zelda: Majora's Mask|n64|2000|Nintendo|Nintendo|Adventure|1|Three days. Expansion Pak. A darker sequel.
GoldenEye 007|n64|1997|Nintendo|Rare|Shooter|1-4|Four controllers, one TV, Facility.
Mario Kart 64|n64|1997|Nintendo|Nintendo|Racing|1-4|Blue shell. Rainbow Road. Four-player living rooms.
Super Smash Bros.|n64|1999|Nintendo|HAL|Fighting|1-4|The first Smash. No items is a house rule.
Perfect Dark|n64|2000|Nintendo|Rare|Shooter|1-4|Expansion Pak required. Rare's follow-up to GoldenEye.
Banjo-Kazooie|n64|1998|Nintendo|Rare|Platform|1|Jiggy. Grunty. Collectathon peak.
Donkey Kong 64|n64|1999|Nintendo|Rare|Platform|1|Expansion Pak in the box (US). Five Kongs.
Star Fox 64|n64|1997|Nintendo|Nintendo|Shooter|1-4|Rumble Pak pack-in. Do a barrel roll, with voice.
Paper Mario|n64|2000|Nintendo|Intelligent Systems|RPG|1|The first paper. Still the writing people quote.
F-Zero X|n64|1998|Nintendo|Nintendo|Racing|1-4|30 racers at once. Mute City at 60.
Wave Race 64|n64|1996|Nintendo|Nintendo|Racing|1-2|Water physics flex. Launch window.
Conker's Bad Fur Day|n64|2001|Rare|Rare|Platform|1-4|Mature Rare. Late, expensive, quoted.
Diddy Kong Racing|n64|1997|Nintendo|Rare|Racing|1-4|Kart plus hover plus plane. Adventure mode.
Mario Party|n64|1998|Nintendo|Hudson|Party|1-4|Analog stick injuries. The first board.
Resident Evil 2|n64|1999|Capcom|Capcom|Survival|1|The cart that should not have fit. It did.
Sin and Punishment|n64|2000|Nintendo|Treasure|Shooter|1|Japan. Treasure on a stick. Import staple.
Harvest Moon 64|n64|1999|Natsume|Victor|Sim|1|Rival farmers, a horse, a long winter.
Jet Force Gemini|n64|1999|Rare|Rare|Shooter|1-4|Bugs, guns, and a lot of collectibles.
Mystical Ninja Starring Goemon|n64|1998|Konami|Konami|Action|1|Giant Impact. A weird, great 3D game.
Turok 2: Seeds of Evil|n64|1998|Acclaim|Iguana|Shooter|1-4|High-res Expansion Pak mode. Mean campaign.
Yoshi's Story|n64|1997|Nintendo|Nintendo|Platform|1|Short, pretty, polarizing.
1080° Snowboarding|n64|1998|Nintendo|Nintendo|Sports|1-2|The trick stick game.
Excitebike 64|n64|2000|Nintendo|Left Field|Racing|1-4|Track editor. Big air.
Ogre Battle 64|n64|2000|Atlus|Quest|Strategy|1|Marching armies on a cart.

# Dreamcast
Soulcalibur|dreamcast|1999|Namco|Namco|Fighting|1-2|The port that made people buy a Dreamcast.
Shenmue|dreamcast|2000|Sega|Sega AM2|Adventure|1|Ryo, forklifts, and a city that kept going.
Jet Set Radio|dreamcast|2000|Sega|Smilebit|Action|1|Cel-shaded skating. Tokyo-to.
Crazy Taxi|dreamcast|2000|Sega|Hitmaker|Racing|1|The arrow. The combo. The soundtrack licenses.
Phantasy Star Online|dreamcast|2000|Sega|Sonic Team|RPG|1-4|Online at home, keyboard in the pad.
Resident Evil: Code Veronica|dreamcast|2000|Capcom|Capcom|Survival|1|Claire and Chris. Dreamcast original.
Skies of Arcadia|dreamcast|2000|Sega|Overworks|RPG|1|Airships. Discover the map.
Marvel vs. Capcom 2|dreamcast|2000|Capcom|Capcom|Fighting|1-2|Three-on-three. Assist forever.
NFL 2K1|dreamcast|2000|Sega|Visual Concepts|Sports|1-4|Online football. The 2K that started it.
ChuChu Rocket!|dreamcast|1999|Sega|Sonic Team|Puzzle|1-4|Mice, cats, arrows. Sega's online puzzle.
Grandia II|dreamcast|2000|Ubisoft|Game Arts|RPG|1|IPD. Ryudo. A combat system people still cite.
Power Stone 2|dreamcast|2000|Capcom|Capcom|Fighting|1-4|Arenas full of stuff. Four VMUs blinking.
Dead or Alive 2|dreamcast|2000|Tecmo|Team Ninja|Fighting|1-4|Counter. The one before the Xbox fame.
Seaman|dreamcast|2000|Sega|Vivarium|Sim|1|Microphone. A fish that insults you.
Rez|dreamcast|2001|Sega|United Game Artists|Shooter|1|Synesthesia on GD-ROM. Japan/PAL first.

# PS2
Grand Theft Auto: San Andreas|ps2|2004|Rockstar|Rockstar|Action|1|The big map. The gym. The radio.
Shadow of the Colossus|ps2|2005|Sony|Team Ico|Action|1|Sixteen colossi. A horse named Agro.
God of War|ps2|2005|Sony|Santa Monica|Action|1|Blades of Chaos. The camera that meant it.
Final Fantasy X|ps2|2001|Square|Square|RPG|1|Sphere Grid. Blitzball. A laugh.
Kingdom Hearts|ps2|2002|Square|Square|Action RPG|1|Disney plus Final Fantasy. Keyblade.
Metal Gear Solid 2|ps2|2001|Konami|Konami|Stealth|1|Plant chapter. A lot of codec. A lot of talk.
Metal Gear Solid 3|ps2|2004|Konami|Konami|Stealth|1|A forest, a face-cam, a boss that is a ladder.
Persona 4|ps2|2008|Atlus|Atlus|RPG|1|TV world. Deduce the killer. Social links.
Okami|ps2|2006|Capcom|Clover|Action|1|Brush god. A wolf. One of the prettiest PS2 games.
Ico|ps2|2001|Sony|Team Ico|Adventure|1|Hold Yorda's hand. Minimal, heavy.
Gran Turismo 4|ps2|2004|Sony|Polyphony|Racing|1-2|The used-car lot, again, bigger.
Burnout 3: Takedown|ps2|2004|EA|Criterion|Racing|1-2|Crash mode. Aftertouch.
Devil May Cry 3|ps2|2005|Capcom|Capcom|Action|1|Stylish action peak on PS2.
Katamari Damacy|ps2|2004|Namco|Namco|Action|1|Roll the world. The soundtrack.
We Love Katamari|ps2|2005|Namco|Namco|Action|1|More cousins, more rolling.
SSX 3|ps2|2003|EA|EA Canada|Sports|1-2|One mountain. Peak soundtrack.
Kingdom Hearts II|ps2|2005|Square Enix|Square Enix|Action RPG|1|Drive forms. A bigger Disney tour.
Resident Evil 4|ps2|2005|Capcom|Capcom|Survival|1|Over-the-shoulder. The village.
Tekken 5|ps2|2005|Namco|Namco|Fighting|1-4|The PS2 Tekken people still play.
Sly 2: Band of Thieves|ps2|2004|Sony|Sucker Punch|Platform|1|Heist structure. Cooper gang.
Ratchet & Clank: Up Your Arsenal|ps2|2004|Sony|Insomniac|Platform|1-4|Weapons that get silly. Online maps.
Jak II|ps2|2003|Sony|Naughty Dog|Action|1|Darker Haven City. Gun plus platforming.
Silent Hill 2|ps2|2001|Konami|Konami|Survival|1|A letter from Mary. Pyramid Head.
Guitar Hero II|ps2|2006|RedOctane|Harmonix|Rhythm|1-2|The plastic guitar years start in earnest.
MGS3: Subsistence|ps2|2006|Konami|Konami|Stealth|1|The camera people wanted. Extra discs.

# GameCube
The Legend of Zelda: The Wind Waker|gamecube|2003|Nintendo|Nintendo|Adventure|1|Cel-shaded sea. A baton. A talking boat.
The Legend of Zelda: Twilight Princess|gamecube|2006|Nintendo|Nintendo|Adventure|1|The last first-party GameCube giant. Also on Wii.
Super Mario Sunshine|gamecube|2002|Nintendo|Nintendo|Platform|1|FLUDD. Delfino. Shine sprites.
Metroid Prime|gamecube|2002|Nintendo|Retro|Action|1|First-person Metroid that is still a Metroid.
Resident Evil 4|gamecube|2005|Nintendo|Capcom|Survival|1|GameCube exclusive first. Village, lake, castle.
Super Smash Bros. Melee|gamecube|2001|Nintendo|HAL|Fighting|1-4|The tournament GameCube game. WaveBird recommended.
Paper Mario: The Thousand-Year Door|gamecube|2004|Nintendo|Intelligent Systems|RPG|1|Audience, chapter structure, still the series peak for a lot of people.
Animal Crossing|gamecube|2002|Nintendo|Nintendo|Sim|1-4|Memory card towns. e-Reader support.
Luigi's Mansion|gamecube|2001|Nintendo|Nintendo|Action|1|Launch vacuum. Portraits.
F-Zero GX|gamecube|2003|Nintendo|Sega AM2|Racing|1-4|Mute City at a frightening speed.
Pikmin 2|gamecube|2004|Nintendo|Nintendo|Strategy|1-2|Caves, treasure, two players.
Skies of Arcadia Legends|gamecube|2003|Sega|Overworks|RPG|1|The Dreamcast game plus extras.
Soulcalibur II|gamecube|2003|Namco|Namco|Fighting|1-2|Link as a guest. The GameCube reason.
Eternal Darkness|gamecube|2002|Nintendo|Silicon Knights|Survival|1|Sanity effects. A long curse.
Tales of Symphonia|gamecube|2003|Namco|Namco Tales|RPG|1-4|The Tales game that broke the US.
Kirby Air Ride|gamecube|2003|Nintendo|HAL|Racing|1-4|City Trial. The menu is the game.
Viewtiful Joe|gamecube|2003|Capcom|Clover|Action|1|VFX brawler. Mach Speed.
Phantasy Star Online Episode I & II|gamecube|2002|Sega|Sonic Team|RPG|1-4|Broadband Adapter recommended.

# Xbox
Halo: Combat Evolved|xbox|2001|Microsoft|Bungie|Shooter|1-4|Launch title. Two weapons, a Warthog, split-screen.
Halo 2|xbox|2004|Microsoft|Bungie|Shooter|1-4|Xbox Live in every living room. The Midship years.
Ninja Gaiden|xbox|2004|Tecmo|Team Ninja|Action|1|Hard. Camera optional. Ryu.
Star Wars: Knights of the Old Republic|xbox|2003|LucasArts|BioWare|RPG|1|A twist. A lightsaber. BioWare on Xbox.
Fable|xbox|2004|Microsoft|Lionhead|RPG|1|Moral choices, a family, a lot of promises.
Project Gotham Racing 2|xbox|2003|Microsoft|Bizarre|Racing|1-8|Kudos. Cities. Night driving.
Steel Battalion|xbox|2002|Capcom|Capcom|Sim|1|The giant controller is the product.
Jade Empire|xbox|2005|Microsoft|BioWare|RPG|1|Martial arts BioWare. Two styles at once.
Oddworld: Munch's Oddysee|xbox|2001|Microsoft|Oddworld Inhabitants|Platform|1|Launch window. Abe plus Munch.
Crimson Skies: High Road to Revenge|xbox|2003|Microsoft|FASA|Action|1-8|Planes, pirates, Live.
Panzer Dragoon Orta|xbox|2003|Sega|Smilebit|Shooter|1|The dragon series on Xbox.
Otogi: Myth of Demons|xbox|2003|Sega|FromSoftware|Action|1|FromSoftware before the fame, sort of.

# Game Boy
Tetris|game-boy|1989|Nintendo|Nintendo|Puzzle|1-2|The pack-in. The reason the brick sold.
Pokémon Red|game-boy|1998|Nintendo|Game Freak|RPG|1-2|151. Link cable. A living-room trade economy.
Pokémon Blue|game-boy|1998|Nintendo|Game Freak|RPG|1-2|The other half of Red. Same box energy, different version exclusives.
The Legend of Zelda: Link's Awakening|game-boy|1993|Nintendo|Nintendo|Adventure|1|An island, a dream, a chain chomp as a buddy.
Super Mario Land 2|game-boy|1992|Nintendo|Nintendo|Platform|1|Wario arrives. Six zones.
Kirby's Dream Land|game-boy|1992|Nintendo|HAL|Platform|1|Short, sweet, HAL's mascot launch.
Metroid II|game-boy|1991|Nintendo|Nintendo|Action|1|SR388. The metroids, one by one.
Wario Land: Super Mario Land 3|game-boy|1994|Nintendo|Nintendo|Platform|1|Wario as lead. Coins as the point.
Final Fantasy Legend|game-boy|1989|Square|Square|RPG|1|SaGa in Japan. Party of mutants.
Final Fantasy Adventure|game-boy|1991|Square|Square|Action RPG|1|Mana series origin. Sword of Mana later.
Donkey Kong|game-boy|1994|Nintendo|Nintendo|Puzzle|1|100 puzzles. Super Game Boy border later.
Mole Mania|game-boy|1996|Nintendo|Nintendo|Puzzle|1|Miyamoto. Dig.
Kid Icarus: Of Myths and Monsters|game-boy|1991|Nintendo|Nintendo|Platform|1|Angel Land in your pocket.
Operation C|game-boy|1991|Konami|Konami|Run-and-gun|1|Contra on Game Boy.
TMNT: Fall of the Foot Clan|game-boy|1990|Konami|Konami|Action|1|Early Konami handheld.
Pokemon Yellow|game-boy|1999|Nintendo|Game Freak|RPG|1-2|Pikachu follows. Surfing Pikachu.
Dr. Mario|game-boy|1990|Nintendo|Nintendo|Puzzle|1-2|Vitamins on the go.
Golf|game-boy|1989|Nintendo|Nintendo|Sports|1-2|Launch window sports.
Tetris DX|gbc|1998|Nintendo|Nintendo|Puzzle|1-2|Color Tetris. 40-line.
Pokémon Gold|gbc|2000|Nintendo|Game Freak|RPG|1-2|Johto. Time of day. A second region.
Pokémon Silver|gbc|2000|Nintendo|Game Freak|RPG|1-2|The other Johto version. Lugia.
Pokémon Crystal|gbc|2001|Nintendo|Game Freak|RPG|1-2|Animated sprites. Battle Tower. Suicune.
The Legend of Zelda: Oracle of Seasons|gbc|2001|Nintendo|Capcom|Adventure|1|Seasons. Linked to Ages.
The Legend of Zelda: Oracle of Ages|gbc|2001|Nintendo|Capcom|Adventure|1|Time. Linked to Seasons.
Wario Land 3|gbc|2000|Nintendo|Nintendo|Platform|1|Golf, keys, no death. Peak Wario Land.
Shantae|gbc|2002|Capcom|WayForward|Platform|1|Late GBC. Dances and transformations.
Dragon Warrior III|gbc|2001|Enix|Enix|RPG|1|The job-system DW on a color screen.

# GBA
The Legend of Zelda: The Minish Cap|gba|2005|Nintendo|Capcom|Adventure|1|Ezlo. Shrink. A peak 2D Zelda.
Metroid Fusion|gba|2002|Nintendo|Nintendo|Action|1|SA-X. A linear, tense Metroid.
Metroid: Zero Mission|gba|2004|Nintendo|Nintendo|Action|1|Remake of NES Metroid with a new second half.
Pokémon Emerald|gba|2005|Nintendo|Game Freak|RPG|1-2|Battle Frontier. Rayquaza. The Hoenn version people keep.
Pokémon FireRed|gba|2004|Nintendo|Game Freak|RPG|1-2|Kanto remake. Wireless adapter optional.
Advance Wars|gba|2001|Nintendo|Intelligent Systems|Strategy|1-2|Orange Star. The campaign that teaches.
Fire Emblem|gba|2003|Nintendo|Intelligent Systems|Strategy|1|The first FE in the US. Permadeath as a teacher.
Mario & Luigi: Superstar Saga|gba|2003|Nintendo|AlphaDream|RPG|1|Bros. moves. Beanbean Kingdom.
Golden Sun|gba|2001|Nintendo|Camelot|RPG|1|Psynergy. A cliffhanger into The Lost Age.
Golden Sun: The Lost Age|gba|2003|Nintendo|Camelot|RPG|1|Transfer data from the first. Djinn.
Final Fantasy Tactics Advance|gba|2003|Nintendo|Square|Strategy RPG|1|Laws. Ivalice as a different place.
WarioWare, Inc.|gba|2003|Nintendo|Nintendo|Party|1|Microgames. The GBA as a toy.
F-Zero: Maximum Velocity|gba|2001|Nintendo|Nintendo|Racing|1|Launch racer. Mute City again.
Super Mario Advance 4|gba|2003|Nintendo|Nintendo|Platform|1|SMB3 plus e-Reader levels.
Final Fantasy V Advance|gba|2006|Nintendo|Square Enix|RPG|1|Jobs. The one that missed the US the first time.
Final Fantasy VI Advance|gba|2007|Nintendo|Square Enix|RPG|1|Kefka in your pocket. Extra dungeons.
Castlevania: Aria of Sorrow|gba|2003|Konami|Konami|Action|1|Souls. Julius. A SotN grandchild.
Castlevania: Harmony of Dissonance|gba|2002|Konami|Konami|Action|1|Juste. Two castles again.
Drill Dozer|gba|2005|Nintendo|Game Freak|Platform|1|Rumble cart. Game Freak without Pokémon.

# N64 already done, DS
New Super Mario Bros.|nds|2006|Nintendo|Nintendo|Platform|1-4|The 2D Mario that relaunched 2D Mario.
The Legend of Zelda: Phantom Hourglass|nds|2007|Nintendo|Nintendo|Adventure|1|Stylus sailing. Temple of the Ocean King.
The Legend of Zelda: Spirit Tracks|nds|2009|Nintendo|Nintendo|Adventure|1|A train. A phantom companion.
Mario Kart DS|nds|2005|Nintendo|Nintendo|Racing|1-8|Online Mario Kart. Mission mode.
Pokémon Diamond|nds|2007|Nintendo|Game Freak|RPG|1-4|Sinnoh. The underground. Dual-screen Pokétch.
Pokémon Platinum|nds|2009|Nintendo|Game Freak|RPG|1-4|Distortion World. The Sinnoh version people keep.
The World Ends with You|nds|2008|Square Enix|Square Enix / Jupiter|RPG|1|Shibuya. Pins. Dual-screen combat.
Chrono Trigger DS|nds|2008|Square Enix|Square|RPG|1|The SNES game plus extras. Dual screen.
Advance Wars: Dual Strike|nds|2005|Nintendo|Intelligent Systems|Strategy|1-2|Two screens, two COs.
Animal Crossing: Wild World|nds|2005|Nintendo|Nintendo|Sim|1-4|Online visits. The DS town.
Professor Layton and the Curious Village|nds|2008|Nintendo|Level-5|Puzzle|1|Puzzles in a top hat.
Castlevania: Dawn of Sorrow|nds|2005|Konami|Konami|Action|1|Souls plus a magic seal you draw.
Mario 64 DS|nds|2004|Nintendo|Nintendo|Platform|1-4|Launch title. Extra characters, extra stars.
Phoenix Wright: Ace Attorney|nds|2005|Capcom|Capcom|Adventure|1|Objection. The DS port of GBA Japan games.
Nintendogs|nds|2005|Nintendo|Nintendo|Sim|1|Bark. The unexpected DS seller.

# PSP
Grand Theft Auto: Vice City Stories|psp|2006|Rockstar|Rockstar Leeds|Action|1|Vice City from another angle.
Persona 3 Portable|psp|2010|Atlus|Atlus|RPG|1|FeMC option. The portable P3.
Crisis Core: Final Fantasy VII|psp|2008|Square Enix|Square Enix|Action RPG|1|Zack. A prequel that matters.
Monster Hunter Freedom Unite|psp|2009|Capcom|Capcom|Action|1-4|The PSP ad-hoc park phenomenon.
Metal Gear Solid: Peace Walker|psp|2010|Konami|Konami|Stealth|1-4|Mother Base on a handheld.
Lumines|psp|2005|Ubisoft|Q Entertainment|Puzzle|1-2|Launch puzzle. The soundtrack is the game.
Patapon|psp|2008|Sony|Pyramid / Japan Studio|Rhythm|1|Pata pata pata pon.
Tekken: Dark Resurrection|psp|2006|Namco|Namco|Fighting|1-2|Tekken 5 on a handheld, complete.
Wipeout Pure|psp|2005|Sony|Studio Liverpool|Racing|1|Launch racer. Future again.
Tactics Ogre: Let Us Cling Together|psp|2011|Square Enix|Square Enix|Strategy RPG|1|Wheel of Fate. The PSP remake.
God of War: Chains of Olympus|psp|2008|Sony|Ready at Dawn|Action|1|Kratos on the bus.
Final Fantasy Tactics: The War of the Lions|psp|2007|Square Enix|Square Enix|Strategy RPG|1|The Ivalice job system, plus cutscenes.

# Xbox 360
Halo 3|xbox-360|2007|Microsoft|Bungie|Shooter|1-4|The finish the fight year. Forge. Theater.
Gears of War|xbox-360|2006|Microsoft|Epic|Shooter|1-2|Cover as a genre. Chainsaw.
BioShock|xbox-360|2007|2K|Irrational|Shooter|1|A city under the sea. A would-you-kindly.
Red Dead Redemption|xbox-360|2010|Rockstar|Rockstar San Diego|Action|1|A horse, a mountain, Mexico.
Mass Effect 2|xbox-360|2010|EA|BioWare|RPG|1|Suicide mission. Loyalty. The trilogy peak for many.
Batman: Arkham City|xbox-360|2011|WB|Rocksteady|Action|1|The city as a gym.
Forza Motorsport 4|xbox-360|2011|Microsoft|Turn 10|Racing|1-8|Autovista. The 360 Forza.
Dark Souls|xbox-360|2011|Namco Bandai|FromSoftware|Action RPG|1|Prepare to die. The community.
Left 4 Dead 2|xbox-360|2009|EA|Valve|Shooter|1-4|Campaigns as a verb.
Street Fighter IV|xbox-360|2009|Capcom|Capcom|Fighting|1-2|The revival. Focus attack.
The Elder Scrolls V: Skyrim|xbox-360|2011|Bethesda|Bethesda|RPG|1|A mountain. A shout. Mods later on PC.
Portal 2|xbox-360|2011|EA|Valve|Puzzle|1-2|Co-op. Cores. The sequel.
Fable II|xbox-360|2008|Microsoft|Lionhead|RPG|1|A dog. A family. A gun.
Call of Duty 4: Modern Warfare|xbox-360|2007|Activision|Infinity Ward|Shooter|1-4|The modern military template.
Geometry Wars: Retro Evolved 2|xbox-360|2008|Microsoft|Bizarre|Shooter|1-4|XBLA. The twin-stick score chase.

# PS3
The Last of Us|ps3|2013|Sony|Naughty Dog|Action|1|A winter. A joke. A hospital.
Uncharted 2|ps3|2009|Sony|Naughty Dog|Action|1|A train. A Tibetan village. Set-piece peak.
God of War III|ps3|2010|Sony|Santa Monica|Action|1|Climbing a Titan. End of the Greek arc.
Demon's Souls|ps3|2009|Sony|FromSoftware|Action RPG|1|World tendency. The one that started the souls boom in the West.
Metal Gear Solid 4|ps3|2008|Konami|Konami|Stealth|1|An old snake. Act 4 on a rail with a purpose.
Persona 5|ps3|2017|Atlus|Atlus|RPG|1|Late PS3. The style. The thieves.
Journey|ps3|2012|Sony|thatgamecompany|Adventure|1-2|A scarf. A mountain. Strangers.
Heavy Rain|ps3|2010|Sony|Quantic Dream|Adventure|1|Four protagonists. Origami.
LittleBigPlanet|ps3|2008|Sony|Media Molecule|Platform|1-4|Sackboy. Create. Share.
Gran Turismo 5|ps3|2010|Sony|Polyphony|Racing|1-2|A thousand cars, eventually.
Ni No Kuni|ps3|2013|Namco Bandai|Level-5|RPG|1|Studio Ghibli. A familiar.
Infamous 2|ps3|2011|Sony|Sucker Punch|Action|1|Good and evil as a light show.
Resistance 2|ps3|2008|Sony|Insomniac|Shooter|1-8|Chimeran war. 60-player at the time.
Vanquish|ps3|2010|Sega|Platinum|Shooter|1|Slide. Shinji Mikami plus Platinum.
Dark Souls|ps3|2011|Namco Bandai|FromSoftware|Action RPG|1|The other 360/PS3 souls SKU. Same curse.

# Wii
Wii Sports|wii|2006|Nintendo|Nintendo|Sports|1-4|Pack-in. Bowling in every living room.
Super Mario Galaxy|wii|2007|Nintendo|Nintendo|Platform|1-2|Planetoids. A lullaby. 2D in 3D space.
The Legend of Zelda: Skyward Sword|wii|2011|Nintendo|Nintendo|Adventure|1|MotionPlus required. A loftwing.
Metroid Prime 3: Corruption|wii|2007|Nintendo|Retro|Action|1|Pointer lock-on. The trilogy closer.
Super Smash Bros. Brawl|wii|2008|Nintendo|Sora|Fighting|1-4|The Subspace Emissary. Online, sort of.
Mario Kart Wii|wii|2008|Nintendo|Nintendo|Racing|1-12|Bikes. The Wheel. Online.
Xenoblade Chronicles|wii|2010|Nintendo|Monolith|RPG|1|A giant's shoulder. Late Wii miracle.
Punch-Out!!|wii|2009|Nintendo|Next Level|Sports|1|Motion or Classic Controller. Doc Louis.
Donkey Kong Country Returns|wii|2010|Nintendo|Retro|Platform|1-2|Clap. Retro on 2D Kong.
Resident Evil 4: Wii Edition|wii|2007|Capcom|Capcom|Survival|1|Pointer aiming. A great version.
Monster Hunter Tri|wii|2009|Capcom|Capcom|Action|1-4|Underwater. Online with a LAN adapter.
New Super Mario Bros. Wii|wii|2009|Nintendo|Nintendo|Platform|1-4|Bubble. Four-player chaos.
No More Heroes|wii|2007|Ubisoft|Grasshopper|Action|1|A beam katana. Assassinations as a job.
Red Steel 2|wii|2010|Ubisoft|Ubisoft Paris|Action|1|MotionPlus swordplay that finally worked.
The Legend of Zelda: Twilight Princess|wii|2006|Nintendo|Nintendo|Adventure|1|Launch window. Mirrored world in the Wii version.

# 3DS
The Legend of Zelda: Ocarina of Time 3D|3ds|2011|Nintendo|GREZZO|Adventure|1|The N64 game, rebuilt. Still the template.
The Legend of Zelda: A Link Between Worlds|3ds|2013|Nintendo|Nintendo|Adventure|1|Wall merge. Rental items. A new 2D Zelda.
Fire Emblem: Awakening|3ds|2013|Nintendo|Intelligent Systems|Strategy|1|Pair up. The FE that made FE a US series again.
Pokémon X|3ds|2013|Nintendo|Game Freak|RPG|1-4|Kalos. Mega Evolution. First 3D mainline.
Monster Hunter 4 Ultimate|3ds|2015|Capcom|Capcom|Action|1-4|Mounting. The 3DS MH.
Animal Crossing: New Leaf|3ds|2013|Nintendo|Nintendo|Sim|1-4|Mayor. Public works. A town that is yours.
Super Mario 3D Land|3ds|2011|Nintendo|Nintendo|Platform|1|A tanooki 3D that plays like 2D.
Kid Icarus: Uprising|3ds|2012|Nintendo|Project Sora|Shooter|1|Stand. Hands hurt. Game is great.
Persona Q|3ds|2014|Atlus|Atlus / P-Studio|RPG|1|P3 plus P4 in a maze.
Shovel Knight|3ds|2015|Yacht Club|Yacht Club|Platform|1|Physical cart exists. Modern retro done right.

# Vita
Persona 4 Golden|vita|2012|Atlus|Atlus|RPG|1|The Vita reason. Snow, TV, extra socials.
Gravity Rush|vita|2012|Sony|Japan Studio|Action|1|Shift gravity. A cat. A city on a column.
Uncharted: Golden Abyss|vita|2012|Sony|Bend|Action|1|Launch Uncharted. Stylus optional.
Tearaway|vita|2013|Sony|Media Molecule|Platform|1|The Vita as a thing you decorate.
Killzone: Mercenary|vita|2013|Sony|Guerilla Cambridge|Shooter|1|A shooter that uses the hardware.
Soul Sacrifice|vita|2013|Sony|Marvelous / Japan Studio|Action|1|Save or sacrifice. Dark cooperative.
Danganronpa: Trigger Happy Havoc|vita|2014|NIS America|Spike Chunsoft|Adventure|1|Class trials. A spike of hope.
Muramasa Rebirth|vita|2013|Marvelous|Vanillaware|Action|1|Vanillaware blades. Extra content.

# Wii U
Super Mario 3D World|wii-u|2013|Nintendo|Nintendo|Platform|1-4|Cat suit. Four-player 3D that works.
The Legend of Zelda: Breath of the Wild|wii-u|2017|Nintendo|Nintendo|Adventure|1|Also on Switch. The last Wii U giant.
Mario Kart 8|wii-u|2014|Nintendo|Nintendo|Racing|1-12|Anti-grav. The version before Deluxe.
Super Smash Bros. for Wii U|wii-u|2014|Nintendo|Sora|Fighting|1-8|Sm4sh. GamePad as a second screen.
Splatoon|wii-u|2015|Nintendo|Nintendo|Shooter|1-8|Turf War. The surprising shooter.
Bayonetta 2|wii-u|2014|Nintendo|Platinum|Action|1|The sequel that needed Nintendo.
Donkey Kong Country: Tropical Freeze|wii-u|2014|Nintendo|Retro|Platform|1-2|Hard, pretty, Dixie.
Xenoblade Chronicles X|wii-u|2015|Nintendo|Monolith|RPG|1|A planet. A Skell. A map that is the point.

# PS4
The Last of Us Part II|ps4|2020|Sony|Naughty Dog|Action|1|Seattle. A guitar. A cycle.
God of War|ps4|2018|Sony|Santa Monica|Action|1|A boy. An axe. A boat.
Bloodborne|ps4|2015|Sony|FromSoftware|Action RPG|1|A city that is a hunt. Chalice dungeons.
Horizon Zero Dawn|ps4|2017|Sony|Guerrilla|Action|1|Machines as animals. A focus.
Uncharted 4|ps4|2016|Sony|Naughty Dog|Action|1|A brother. Madagascar. The last Drake.
Persona 5 Royal|ps4|2020|Atlus|Atlus|RPG|1|The complete thieves. Third semester.
Spider-Man|ps4|2018|Sony|Insomniac|Action|1|Swing. A city that feels like a gym.
Shadow of the Colossus|ps4|2018|Sony|Bluepoint|Action|1|Remake. Sixteen again, clearer.
Death Stranding|ps4|2019|Sony|Kojima Productions|Action|1|Walk. Build. Like.
Final Fantasy VII Remake|ps4|2020|Square Enix|Square Enix|RPG|1|Midgar as a full game.
Sekiro: Shadows Die Twice|ps4|2019|Activision|FromSoftware|Action|1|Deflect. A prosthetic. A mortal blade.
Ghost of Tsushima|ps4|2020|Sony|Sucker Punch|Action|1|Wind as a compass. A fox.

# Xbox One
Forza Horizon 4|xbox-one|2018|Microsoft|Playground|Racing|1-12|Britain. Seasons. Festival.
Gears 5|xbox-one|2019|Microsoft|The Coalition|Shooter|1-3|Campaign plus Escape.
Sea of Thieves|xbox-one|2018|Microsoft|Rare|Adventure|1-4|A sloop. A shanty. Other crews.
Cuphead|xbox-one|2017|Microsoft|Studio MDHR|Action|1-2|1930s cartoons as a boss rush.
Ori and the Will of the Wisps|xbox-one|2020|Microsoft|Moon|Action|1|A Metroidvania that looks like a painting.
Halo: The Master Chief Collection|xbox-one|2014|Microsoft|343|Shooter|1-4|The library in one box, eventually.
Sunset Overdrive|xbox-one|2014|Microsoft|Insomniac|Action|1|Grind a city. Launch energy.
State of Decay 2|xbox-one|2018|Microsoft|Undead Labs|Action|1-4|Community survival. Base as the save.
Quantum Break|xbox-one|2016|Microsoft|Remedy|Action|1|Live-action episodes. Time stutter.
Rare Replay|xbox-one|2015|Microsoft|Rare|Compilation|1-4|30 games. A museum in a disc.

# Switch
The Legend of Zelda: Breath of the Wild|switch|2017|Nintendo|Nintendo|Adventure|1|Launch. Climb. Cook. A world that is the puzzle.
Super Mario Odyssey|switch|2017|Nintendo|Nintendo|Platform|1-2|A hat. A moon. Kingdoms.
Super Smash Bros. Ultimate|switch|2018|Nintendo|Sora|Fighting|1-8|Everyone is here. The roster as a museum.
Animal Crossing: New Horizons|switch|2020|Nintendo|Nintendo|Sim|1-8|An island. A tent. A year of 2020.
Mario Kart 8 Deluxe|switch|2017|Nintendo|Nintendo|Racing|1-8|The kart game that became the default.
Splatoon 2|switch|2017|Nintendo|Nintendo|Shooter|1-8|Turf. Salmon Run. A square.
Fire Emblem: Three Houses|switch|2019|Nintendo|Intelligent Systems|Strategy|1|A monastery. Three routes. Tea.
Xenoblade Chronicles 2|switch|2017|Nintendo|Monolith|RPG|1|Blades. A sea of clouds.
Celeste|switch|2018|Matt Makes Games|Matt Makes Games|Platform|1|A mountain. Assist mode. A lot of deaths.
Hades|switch|2020|Supergiant|Supergiant|Action|1|Escape the house. Again. Boons.
The Legend of Zelda: Tears of the Kingdom|switch|2023|Nintendo|Nintendo|Adventure|1|Ultrahand. A sky. A depth.
Metroid Dread|switch|2021|Nintendo|MercurySteam|Action|1|E.M.M.I. Samus returns to 2D properly.
Pokémon Legends: Arceus|switch|2022|Nintendo|Game Freak|Action RPG|1|Hisui. Catch by throwing. A different Pokémon.
Bayonetta 3|switch|2022|Nintendo|Platinum|Action|1|Demon mash. A third witch.
Luigi's Mansion 3|switch|2019|Nintendo|Next Level|Action|1-8|A hotel. Gooigi. Co-op.
Astral Chain|switch|2019|Nintendo|Platinum|Action|1|A legion on a leash.
Octopath Traveler|switch|2018|Nintendo|Square Enix / Acquire|RPG|1|HD-2D. Eight travelers.
Pikmin 4|switch|2023|Nintendo|Nintendo|Strategy|1-2|Rescue. Dandori. A dog.

# PS5
Astro Bot|ps5|2024|Sony|Team Asobi|Platform|1|DualSense as a joke and a mechanic. A platformer peak.
Returnal|ps5|2021|Sony|Housemarque|Action|1|Die. Loop. A planet that remembers.
Demon's Souls|ps5|2020|Sony|Bluepoint|Action RPG|1|Launch remake. World tendency in 4K.
Ratchet & Clank: Rift Apart|ps5|2021|Sony|Insomniac|Platform|1|A dimension dash that shows the SSD.
Spider-Man 2|ps5|2023|Sony|Insomniac|Action|1|Two spiders. A city that is still a gym.
Final Fantasy XVI|ps5|2023|Square Enix|Square Enix|Action|1|Eikons. A darker Valisthea.
Baldur's Gate 3|ps5|2023|Larian|Larian|RPG|1-4|A dice roll. A camp. A lot of talking.
Astro's Playroom|ps5|2020|Sony|Team Asobi|Platform|1|Pack-in. DualSense tutorial as a love letter.

# Xbox Series
Forza Horizon 5|xbox-series|2021|Microsoft|Playground|Racing|1-12|Mexico. The festival, bigger.
Halo Infinite|xbox-series|2021|Microsoft|343|Shooter|1-4|Open world Halo. Forge later.
Starfield|xbox-series|2023|Bethesda|Bethesda|RPG|1|A thousand planets. A ship builder.
Hi-Fi Rush|xbox-series|2023|Bethesda|Tango|Action|1|Beat-timed brawler. A surprise drop.
Senua's Saga: Hellblade II|xbox-series|2024|Microsoft|Ninja Theory|Action|1|A face. A voice. A photogrammetry island.
Sea of Thieves|xbox-series|2020|Microsoft|Rare|Adventure|1-4|The same sea, better frame rate.
Pentiment|xbox-series|2022|Xbox Game Studios|Obsidian|Adventure|1|A 16th-century manuscript as a game.
Microsoft Flight Simulator|xbox-series|2021|Xbox Game Studios|Asobo|Sim|1|The world as a map. A lot of RAM.

# Switch 2
Mario Kart World|switch-2|2025|Nintendo|Nintendo|Racing|1-24|Launch racer for Switch 2. Open roads, still a kart.
The Legend of Zelda: Breath of the Wild (Switch 2 Edition)|switch-2|2025|Nintendo|Nintendo|Adventure|1|The 2017 game with Switch 2 extras.
Metroid Prime 4: Beyond|switch-2|2025|Nintendo|Retro|Action|1|Samus back with Retro. Also on Switch.
Donkey Kong Bananza|switch-2|2025|Nintendo|Nintendo|Platform|1|Launch window Kong on the new hardware.

# Game & Watch
Ball|game-watch|1980|Nintendo|Nintendo|Action|1|Silver series. Juggle.
Donkey Kong (Game & Watch)|game-watch|1982|Nintendo|Nintendo|Platform|1|Multi Screen. The clamshell that became Game Boy's shape.
Oil Panic|game-watch|1982|Nintendo|Nintendo|Action|1|Multi Screen. Pour down, don't overflow.
Parachute|game-watch|1981|Nintendo|Nintendo|Action|1|Widescreen. Sharks.
Octopus|game-watch|1981|Nintendo|Nintendo|Action|1|Widescreen. Tentacles and treasure.
Mario Bros. (Game & Watch)|game-watch|1983|Nintendo|Nintendo|Action|1-2|Tabletop / Panorama / Multi Screen variants exist.
Zelda (Game & Watch)|game-watch|1989|Nintendo|Nintendo|Adventure|1|Multi Screen. A tiny Zelda.

# Lynx
California Games|lynx|1989|Atari|Epyx|Sports|1-4|Pack-in on some bundles. Color handheld sports.
Chip's Challenge|lynx|1989|Atari|Epyx|Puzzle|1|The puzzle game that outlived the Lynx.
Todd's Adventures in Slime World|lynx|1990|Atari|Epyx|Action|1-4|Comical goo. Comlink multiplayer.
Blue Lightning|lynx|1989|Atari|Epyx|Shooter|1|Afterburner-ish. Launch title.
Warbirds|lynx|1991|Atari|Atari|Sim|1-4|Dogfights. Comlink.
Klax|lynx|1990|Atari|Atari|Puzzle|1|Tiles. The arcade in your hands.

# Game Gear
Shinobi|game-gear|1991|Sega|Sega|Action|1|Ninja on a backlit screen.
Sonic the Hedgehog|game-gear|1991|Sega|Ancient|Platform|1|8-bit Sonic, shared with Master System.
Columns|game-gear|1991|Sega|Sega|Puzzle|1-2|Jewels. The Game Gear puzzle.
The GG Shinobi|game-gear|1991|Sega|Sega|Action|1|Original handheld Shinobi, not just a port.
Shining Force: The Sword of Hajya|game-gear|1994|Sega|Camelot|Strategy RPG|1|Gaiden story. SRPG on the go.
Tails Adventure|game-gear|1995|Sega|Nextech|Platform|1|Tails as lead. Metroid-ish.
Land of Illusion|game-gear|1993|Sega|Sega|Platform|1|Mickey. Same family as Master System.
Mortal Kombat|game-gear|1993|Arena|Probe|Fighting|1-2|Blood via code, tiny screen.

# Virtual Boy
Wario Land|virtual-boy|1995|Nintendo|Nintendo|Platform|1|The Virtual Boy game. 3D layers that work.
Mario's Tennis|virtual-boy|1995|Nintendo|Nintendo|Sports|1-2|Pack-in. Red 3D tennis.
Red Alarm|virtual-boy|1995|Nintendo|T&E Soft|Shooter|1|Vector-ish tunnels.
Vertical Force|virtual-boy|1995|Nintendo|Hudson|Shooter|1|Two planes of depth. Hudson shmup.
Jack Bros.|virtual-boy|1995|Atlus|Atlus|Action|1|Megami Tensei side game. Atlus on VB.
Galactic Pinball|virtual-boy|1995|Nintendo|Intelligent Systems|Pinball|1|Tables in red.

# NGPC
SNK vs. Capcom: The Match of the Millennium|ngpc|1999|SNK|SNK|Fighting|1-2|The handheld fighter. Dream match on a clicky pad.
Metal Slug: 1st Mission|ngpc|1999|SNK|SNK|Run-and-gun|1|Original Metal Slug, not a port.
Sonic the Hedgehog Pocket Adventure|ngpc|1999|SNK|SNK|Platform|1|The Sonic that should have been on Game Gear.
Card Fighters' Clash|ngpc|1999|SNK|SNK|Card|1-2|SNK vs Capcom as cards. Link battles.
Bust-A-Move Pocket|ngpc|1999|SNK|Taito|Puzzle|1-2|Puzzles on a great D-pad.
Faselei!|ngpc|2000|SNK|Sacnoth|Strategy|1|Mech tactics. Quiet cult.

# WonderSwan
Final Fantasy|wonderswan|2000|Squaresoft|Squaresoft|RPG|1|WS Color remake of FFI. Japan.
Riviera: The Promised Land|wonderswan|2002|Sting|Sting|RPG|1|Color / Crystal. Later ported.
Guncraft|wonderswan|2000|Bandai|Bandai|Shooter|1|One of many Japan-only action carts.
Makaimura for WonderSwan|wonderswan|1999|Capcom|Capcom|Platform|1|Ghouls 'n Ghosts on Yokoi's last hardware.

# N-Gage
Tony Hawk's Pro Skater|n-gage|2003|Nokia|Nokia|Sports|1|Launch window. The taco as a skateboard, theoretically.
Tomb Raider|n-gage|2003|Nokia|Ideaworks|Action|1|Lara on a phone. Side-talking included.
Pathways|n-gage|2004|Nokia|Nokia|Puzzle|1|Better than the hardware's reputation.

# Pippin
Super Marathon|pippin|1996|Bandai|Bungie|Shooter|1|Marathon trilogy on Pippin. A curiosity.
L-Zone|pippin|1996|Bandai|Synergy|Adventure|1|Pre-rendered exploration. Multimedia era.

# Apple II
Oregon Trail|apple-ii|1985|MECC|MECC|Sim|1|Dysentery. The school-lab game.
Karateka|apple-ii|1984|Broderbund|Jordan Mechner|Action|1|Rotoscope before Prince. Don't punch the princess.
Prince of Persia|apple-ii|1989|Broderbund|Jordan Mechner|Platform|1|60 minutes. A mirror. Rotoscope peak.
Choplifter|apple-ii|1982|Broderbund|Dan Gorlin|Action|1|Rescue hostages. Later an arcade game.
Lode Runner|apple-ii|1983|Broderbund|Douglas Smith|Puzzle|1|Level editor. Dig.
Ultima IV|apple-ii|1985|Origin|Origin|RPG|1|Virtues. No 'win by killing the wizard.'
Wizardry: Proving Grounds of the Mad Overlord|apple-ii|1981|Sir-Tech|Sir-Tech|RPG|1|First-person dungeon. Party wipe included.
Castle Wolfenstein|apple-ii|1981|Muse|Muse|Stealth|1|Uniforms, discrete combat, a castle.

# C64
Elite|c64|1985|Firebird|Acornsoft|Sim|1|Wireframe trading. A galaxy.
Impossible Mission|c64|1984|Epyx|Epyx|Action|1|'Stay a while. Stay forever.'
Wizball|c64|1987|Ocean|Sensible|Action|1|Paint the world. Sensible Software.
Ultima V|c64|1988|Origin|Origin|RPG|1|A world that keeps going at night.
Boulder Dash|c64|1984|First Star|First Star|Puzzle|1|Diamonds, dirt, and a lot of death.
The Last Ninja|c64|1987|System 3|System 3|Action|1|Isometric ninja. A UK classic.
International Karate +|c64|1987|System 3|System 3|Fighting|1-2|Two opponents. Beach. SID.
Turrican|c64|1990|Rainbow Arts|Manfred Trenz|Run-and-gun|1|A huge map on 64K.
Summer Games|c64|1984|Epyx|Epyx|Sports|1-8|Opening ceremony. Epyx sports template.
Paradroid|c64|1985|Hewson|Graftgold|Action|1|Take over robots. Graftgold.
M.U.L.E.|c64|1983|EA|Ozark|Strategy|1-4|The economic party game.
Ghostbusters|c64|1984|Activision|Activision|Action|1|The licensed theme, SID version.
Maniac Mansion|c64|1987|Lucasfilm|Lucasfilm|Adventure|1|SCUMM. Cut the power, don't microwave the hamster.
Zak McKracken|c64|1988|Lucasfilm|Lucasfilm|Adventure|1|Fish. Nose. The yellow van.
The Bard's Tale|c64|1985|EA|Interplay|RPG|1|Skara Brae. Six characters.

# ZX Spectrum
Jet Set Willy|zx-spectrum|1984|Software Projects|Matthew Smith|Platform|1|A mansion. A hangover. Attribute clash.
Manic Miner|zx-spectrum|1983|Bug-Byte|Matthew Smith|Platform|1|The mine. The first Willy.
Knight Lore|zx-spectrum|1984|Ultimate|Ultimate|Adventure|1|Filmation isometric. Werewolf at night.
Elite|zx-spectrum|1985|Firebird|Acornsoft|Sim|1|The Spectrum version. Still a galaxy.
Head over Heels|zx-spectrum|1987|Ocean|Jon Ritman|Adventure|1|Two characters, one isometric world.
Chase H.Q.|zx-spectrum|1989|Ocean|Ocean|Racing|1|Arrest the criminal. Ocean arcade port.

# MSX
Metal Gear|msx|1987|Konami|Konami|Stealth|1|The original. Not the NES one.
Metal Gear 2: Solid Snake|msx|1990|Konami|Konami|Stealth|1|The real sequel. MSX2.
Vampire Killer|msx|1986|Konami|Konami|Platform|1|Family Computer / MSX Castlevania cousin.
Puyo Puyo|msx|1991|Compile|Compile|Puzzle|1-2|Compile's puzzle, before the Mega Drive fame.
Penguin Adventure|msx|1986|Konami|Konami|Action|1|Pengo-adjacent. A Konami cart.
Gradius|msx|1986|Konami|Konami|Shooter|1|Vic Viper on a standard.

# Amiga
Lemmings|amiga|1991|Psygnosis|DMA Design|Puzzle|1|Assign jobs. Don't let them walk off.
Shadow of the Beast|amiga|1989|Psygnosis|Reflections|Action|1|The box, the soundtrack, the parallax.
Sensibile Soccer|amiga|1992|Renegade|Sensible|Sports|1-2|Tiny players, huge game.
Another World|amiga|1991|Delphine|Delphine|Action|1|Cinematic polygons. A friend's death in one screen.
The Secret of Monkey Island|amiga|1991|Lucasfilm|Lucasfilm|Adventure|1|Insult sword fighting. Three disks.
Speedball 2|amiga|1990|Image Works|Bitmap Brothers|Sports|1-2|Brutal futuristic sports.
Turrican II|amiga|1991|Rainbow Arts|Factor 5|Run-and-gun|1|The Amiga Turrican. Soundtrack by Chris Huelsbeck.
Worms|amiga|1995|Team17|Team17|Strategy|1-4|Turn-based explosions. The Amiga years.
Pinball Dreams|amiga|1992|21st Century|Digital Illusions|Pinball|1|Tables that feel like tables.
Cannon Fodder|amiga|1993|Virgin|Sensible|Action|1|'War has never been so much fun.'

# DOS
Doom|dos|1993|id|id|Shooter|1-4|Shareware episode. WAD culture. A shotgun.
Wolfenstein 3D|dos|1992|Apogee|id|Shooter|1|The corridor before Doom.
Commander Keen Complete|dos|1991|Apogee|id|Platform|1|Pogo. Invincibility. Shareware episodes.
X-COM: UFO Defense|dos|1994|MicroProse|Mythos|Strategy|1|Ironman. A farm at night.
Warcraft II|dos|1995|Blizzard|Blizzard|Strategy|1-8|The RTS that taught a generation.
Duke Nukem 3D|dos|1996|3D Realms|3D Realms|Shooter|1-8|Build engine. Shrink ray.
The Secret of Monkey Island|dos|1990|Lucasfilm|Lucasfilm|Adventure|1|VGA later. SCUMM.
System Shock|dos|1994|Origin|Looking Glass|Action|1|A station. SHODAN. Looking Glass.
Quake|dos|1996|id|id|Shooter|1-16|3D for real. Rocket jump.
SimCity 2000|dos|1993|Maxis|Maxis|Sim|1|The isometric city. Arcologies.
Diablo|dos|1997|Blizzard|Blizzard North|Action RPG|1-4|Click. A cathedral. Cow level later.
Fallout|dos|1997|Interplay|Black Isle|RPG|1|A vault. A timed geiger counter.

# Windows (select boxed / landmark)
Half-Life 2|windows|2004|Valve|Valve|Shooter|1|A crowbar. A citadel. Source.
StarCraft|windows|1998|Blizzard|Blizzard|Strategy|1-8|Three races. Brood War is a different SKU.
World of Warcraft|windows|2004|Blizzard|Blizzard|RPG|1|A box that launched a subscription. Vanilla.
The Sims|windows|2000|EA|Maxis|Sim|1|A house. A pool ladder. Expansion boxes.
Portal|windows|2007|Valve|Valve|Puzzle|1|A cake. Companion Cube. The Orange Box also exists.
Minecraft|windows|2011|Mojang|Mojang|Sandbox|1|A sandbox that ate a decade. Physical collections exist as merch.
Disco Elysium|windows|2019|ZA/UM|ZA/UM|RPG|1|A cop. A skill that is a voice. Inland Empire.
Hades|windows|2020|Supergiant|Supergiant|Action|1|The PC original. Escape again.

# Arcade
Pong|arcade|1972|Atari|Atari|Sports|1-2|The arcade that started the industry in public.
Space Invaders|arcade|1978|Taito|Taito|Shooter|1-2|The cabinet that caused a 100-yen shortage.
Pac-Man|arcade|1980|Namco|Namco|Maze|1-2|The character as a product.
Donkey Kong|arcade|1981|Nintendo|Nintendo|Platform|1-2|Jumpman. Barrels. Nintendo's arcade arrival.
Street Fighter II|arcade|1991|Capcom|Capcom|Fighting|1-2|The cabinet that defined the 90s arcade.
Mortal Kombat|arcade|1992|Midway|Midway|Fighting|1-2|Digitized. Fatalities. A ratings system later.
NBA Jam|arcade|1993|Midway|Midway|Sports|1-4|He's on fire. Two-on-two.
Daytona USA|arcade|1994|Sega|Sega AM2|Racing|1-8|Sit-down. The rumble. Networked cabinets.
Dance Dance Revolution|arcade|1998|Konami|Konami|Rhythm|1-2|A metal pad. A public performance.
Time Crisis|arcade|1995|Namco|Namco|Light gun|1|Pedal. Cover. GunCon at home later.
Galaga|arcade|1981|Namco|Namco|Shooter|1-2|Challenging stage. Dual fighters.
Defender|arcade|1981|Williams|Williams|Shooter|1-2|A brutal stick-and-buttons layout.
Robotron: 2084|arcade|1982|Williams|Vid Kidz|Shooter|1-2|Twin stick. Save the last human family.
Tempest|arcade|1981|Atari|Atari|Shooter|1|Vector tunnel. Spinner.
Ms. Pac-Man|arcade|1982|Midway|GCC / Namco|Maze|1-2|The better maze. Four mazes.

# 3DO
Gex|3do|1995|Crystal Dynamics|Crystal Dynamics|Platform|1|A TV-obsessed gecko. Crystal Dynamics.
Road Rash|3do|1994|EA|EA|Racing|1-2|CD soundtrack. Kick the biker.
The Need for Speed|3do|1994|EA|EA Canada|Racing|1|The first NFS. Exotic cars, cops.
Super Street Fighter II Turbo|3do|1994|Capcom|Capcom|Fighting|1-2|A strong home version.
Alone in the Dark|3do|1994|I-Motion|Infogrames|Survival|1|3D horror on a 3DO.
Return Fire|3do|1995|Prolific|Silent Software|Action|1-2|Split-screen vehicles. Capture the flag.

# CD-i
Link: The Faces of Evil|cd-i|1993|Philips|Animation Magic|Action|1|The CD-i Zelda. Infamous cutscenes, still a collectible.
Zelda: The Wand of Gamelon|cd-i|1993|Philips|Animation Magic|Action|1|Zelda as the lead. Same studio energy.
Hotel Mario|cd-i|1994|Philips|Fantasy Factory|Puzzle|1|'Nice of the Princess to invite us over.'
Burn:Cycle|cd-i|1994|Philips|Trip Media|Adventure|1|Cyberpunk FMV. A CD-i highlight.

# 32X
Knuckles' Chaotix|32x|1995|Sega|Sega|Platform|1-2|The 32X Sonic-adjacent game. Tether physics.
Virtua Racing Deluxe|32x|1994|Sega|Sega|Racing|1-2|More tracks than the Genesis cart.
Star Wars Arcade|32x|1994|Sega|Sega|Shooter|1|The 32X pack-in in some bundles.
Tempo|32x|1995|Sega|Sega|Platform|1|Japan. A mascot that didn't take.
Doom|32x|1994|Sega|id / Sega|Shooter|1|A 32X Doom. Missing pieces, still a talking point.

# Sega CD
Sonic CD|sega-cd|1993|Sega|Sonic Team|Platform|1|Time travel. A metallic future. A better past.
Lunar: Eternal Blue|sega-cd|1994|Working Designs|Game Arts|RPG|1|Working Designs box. A long RPG.
Night Trap|sega-cd|1992|Digital Pictures|Digital Pictures|FMV|1|The Senate hearing game. FMV horror-ish.
Snatcher|sega-cd|1994|Konami|Konami|Adventure|1|Kojima. Blade Runner as a graphic adventure. Sega CD is the English one.
Popful Mail|sega-cd|1994|Working Designs|Nihon Falcom|Action|1|Working Designs jokes. Falcom action.
Eternal Champions: Challenge from the Dark Side|sega-cd|1995|Sega|Sega|Fighting|1-2|Overkill fatalities. CD extra.

# 5200 / 7800
Pac-Man|atari-5200|1982|Atari|Atari|Maze|1-2|A better Pac-Man than the 2600's.
Centipede|atari-5200|1982|Atari|Atari|Shooter|1-2|Analog stick. Mushrooms.
Rescue on Fractalus!|atari-5200|1984|Atari|Lucasfilm|Sim|1|Jaggies as mountains. Lucasfilm Games.
Missile Command|atari-5200|1982|Atari|Atari|Shooter|1-2|Trackball optional. Cities again.
Food Fight|atari-7800|1987|Atari|Atari|Action|1-2|Throw food. A 7800 highlight.
Alien Brigade|atari-7800|1990|Atari|Atari|Shooter|1|Late 7800. Operation Wolf-ish.
Galaga|atari-7800|1987|Atari|Namco|Shooter|1-2|A strong 7800 port.
Pole Position II|atari-7800|1987|Atari|Namco|Racing|1|Pack-in on some 7800s.
`;

export const GAMES: GameSeed[] = parse(RAW).map((game) => {
  if (game.platform === "odyssey" || game.platform === "pong" || game.platform === "game-watch") {
    return { ...game, hasManual: game.platform !== "pong" };
  }
  if (game.platform === "windows" && game.year >= 2010) {
    return { ...game, hasManual: false };
  }
  return game;
});
