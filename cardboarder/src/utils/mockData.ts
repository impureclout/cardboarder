export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  fullContent?: string; // Optional: for the article detail page
  imageUrl: string;
  source: string; // e.g., "IGN", "Polygon", "TCGPlayer"
  date: string; // ISO 8601 format (e.g., "2024-05-15T10:00:00Z")
  tcg: string[]; // Array of TCGs this article relates to
}

export const TCG_CATEGORIES = [
  "Magic: The Gathering",
  "Pokémon",
  "Yu-Gi-Oh!",
  "Flesh and Blood",
  "Lorcana",
  "Other TCGs",
];

export const mockNewsData: NewsArticle[] = [
  {
    id: "1",
    title: "New Magic: The Gathering Set 'Bloomburrow' First Look",
    summary: "Wizards of the Coast gives a sneak peek at the upcoming animal-focused set, Bloomburrow, revealing new mechanics and stunning artwork.",
    fullContent: "Detailed content about Bloomburrow... new mechanics explained, key cards shown, lore details, etc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imageUrl: "https://via.placeholder.com/400x200.png?text=Bloomburrow+Art",
    source: "Wizards of the Coast",
    date: "2024-07-20T10:00:00Z",
    tcg: [TCG_CATEGORIES[0]],
  },
  {
    id: "2",
    title: "Pokémon TCG: 'Scarlet & Violet – Shrouded Fable' Announced",
    summary: "The next Pokémon TCG expansion, Shrouded Fable, will introduce new Paradox Pokémon and powerful ACE SPEC cards.",
    fullContent: "Full details on Shrouded Fable, including release date, new Pokémon ex, Trainer cards, and implications for the meta. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    imageUrl: "https://via.placeholder.com/400x200.png?text=Shrouded+Fable",
    source: "Pokémon Company",
    date: "2024-07-18T14:30:00Z",
    tcg: [TCG_CATEGORIES[1]],
  },
  {
    id: "3",
    title: "Yu-Gi-Oh! Master Duel: Major Update and New Banlist",
    summary: "Konami releases a significant update for Master Duel, featuring new cards, a new story mode, and a highly anticipated banlist update.",
    fullContent: "Comprehensive breakdown of the Master Duel update, new archetypes, story content, and the full banlist with analysis. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    imageUrl: "https://via.placeholder.com/400x200.png?text=Master+Duel+Update",
    source: "Konami Official",
    date: "2024-07-15T09:00:00Z",
    tcg: [TCG_CATEGORIES[2]],
  },
  {
    id: "4",
    title: "Flesh and Blood: 'Part the Mistveil' Championship Results",
    summary: "The latest FaB championship concludes with a surprising new hero taking the crown. Full metagame breakdown and top decklists.",
    fullContent: "In-depth coverage of the Part the Mistveil championship, interviews with top players, deck analysis, and future meta predictions. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    imageUrl: "https://via.placeholder.com/400x200.png?text=FaB+Championship",
    source: "Legend Story Studios",
    date: "2024-07-12T18:00:00Z",
    tcg: [TCG_CATEGORIES[3]],
  },
  {
    id: "5",
    title: "Lorcana's 'Ursula's Return' Impacting the Market",
    summary: "The newest Lorcana set, Ursula's Return, is making waves in the secondary market, with several cards seeing significant price spikes.",
    fullContent: "Market analysis of Ursula's Return, discussion of chase cards, and tips for collectors and players. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imageUrl: "https://via.placeholder.com/400x200.png?text=Ursula\'s+Return",
    source: "TCGPlayer Infinite",
    date: "2024-07-10T11:00:00Z",
    tcg: [TCG_CATEGORIES[4]],
  },
  {
    id: "6",
    title: "The Rise of Indie TCGs in 2024",
    summary: "A look at several promising independent trading card games gaining traction this year, offering unique mechanics and art styles.",
    fullContent: "Spotlight on new indie TCGs, their design philosophies, and how they are carving out a niche in the market. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    imageUrl: "https://via.placeholder.com/400x200.png?text=Indie+TCGs",
    source: "Cardboard Republic",
    date: "2024-07-08T15:00:00Z",
    tcg: [TCG_CATEGORIES[5], TCG_CATEGORIES[0], TCG_CATEGORIES[3]], // Example of multiple TCGs
  },
  // Add more articles as needed to simulate a larger dataset
  {
    id: "7",
    title: "Pokémon World Championships 2024: Dates and Venue Announced",
    summary: "The Pokémon Company has officially announced the dates and location for the 2024 Pokémon World Championships. Get ready for Honolulu!",
    fullContent: "All the details about the upcoming Pokémon World Championships in Honolulu, Hawaii, including dates, venue information, and how to qualify or attend as a spectator. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    imageUrl: "https://via.placeholder.com/400x200.png?text=Pokemon+Worlds+2024",
    source: "Pokemon.com",
    date: "2024-06-25T12:00:00Z",
    tcg: [TCG_CATEGORIES[1]],
  },
  {
    id: "8",
    title: "Magic: The Gathering Arena - New Alchemy Horizons Set Drops",
    summary: "A new digital-only set has arrived on MTG Arena, bringing unique cards and mechanics to the Alchemy format.",
    fullContent: "Explore the new cards and mechanics introduced in the latest Alchemy Horizons set on MTG Arena. This article covers key cards, new strategies, and the potential impact on the digital meta. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    imageUrl: "https://via.placeholder.com/400x200.png?text=MTGA+Alchemy+Horizons",
    source: "Hipsters of the Coast",
    date: "2024-06-20T09:30:00Z",
    tcg: [TCG_CATEGORIES[0]],
  },
]; 