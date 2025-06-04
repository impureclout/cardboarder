export interface HistoricalEvent {
  id: string;
  date: string; // YYYY-MM-DD format for easy matching
  title: string;
  description: string;
  tcgsInvolved: string[]; // e.g., ["Magic: The Gathering", "Pokémon"]
}

export const mockHistoryData: HistoricalEvent[] = [
  {
    id: "hist1",
    date: "1993-08-05",
    title: "Magic: The Gathering Alpha Set Released",
    description: "Wizards of the Coast releases the Alpha set of Magic: The Gathering, marking the birth of the modern trading card game genre.",
    tcgsInvolved: ["Magic: The Gathering"],
  },
  {
    id: "hist2",
    date: "1996-10-20",
    title: "Pokémon Trading Card Game Released in Japan",
    description: "The Pokémon Trading Card Game is first released in Japan by Media Factory, quickly becoming a global phenomenon.",
    tcgsInvolved: ["Pokémon"],
  },
  {
    id: "hist3",
    date: "1999-01-09",
    title: "Pokémon TCG Launches in North America",
    description: "Wizards of the Coast brings the Pokémon TCG to North America, sparking immense popularity.",
    tcgsInvolved: ["Pokémon"],
  },
  {
    id: "hist4",
    date: "1999-03-04",
    title: "Yu-Gi-Oh! Official Card Game Released in Japan",
    description: "Konami launches the Yu-Gi-Oh! Official Card Game (OCG) in Japan, based on the manga series.",
    tcgsInvolved: ["Yu-Gi-Oh!"],
  },
  {
    id: "hist5",
    date: "2002-03-08",
    title: "Yu-Gi-Oh! TCG Released in North America",
    description: "Upper Deck Entertainment introduces the Yu-Gi-Oh! Trading Card Game to North America.",
    tcgsInvolved: ["Yu-Gi-Oh!"],
  },
  {
    id: "hist6",
    date: "2019-08-31",
    title: "Flesh and Blood Welcome to Rathe Alpha Released",
    description: "Legend Story Studios releases the first set, Welcome to Rathe (Alpha), for their new TCG, Flesh and Blood.",
    tcgsInvolved: ["Flesh and Blood"],
  },
  {
    id: "hist7",
    date: "2023-08-18",
    title: "Disney Lorcana: The First Chapter Released",
    description: "Ravensburger launches Disney Lorcana: The First Chapter, a highly anticipated TCG featuring Disney characters.",
    tcgsInvolved: ["Lorcana"],
  },
  // Add a few more fictional or less significant events for variety
  {
    id: "hist8",
    date: "2005-07-15",
    title: "Major MTG Pro Tour Event Concludes",
    description: "A landmark Pro Tour event for Magic: The Gathering concludes, remembered for its innovative deck archetypes and high-level play.",
    tcgsInvolved: ["Magic: The Gathering"],
  },
  {
    id: "hist9",
    date: "2012-04-01", // Example of a date with no specific major event in mock data initially
    title: "Quiet Day in TCG History",
    description: "No major TCG releases or landmark events are noted for this day in our records. Perhaps a good day for a local tournament!",
    tcgsInvolved: ["Other TCGs"],
  },
    {
    id: "hist10",
    date: "2024-01-20",
    title: "Cardboarder Website Beta Launch!",
    description: "The Cardboarder news aggregation website launched its beta version, aiming to become a central hub for TCG enthusiasts.",
    tcgsInvolved: ["Other TCGs"], // Meta!
  },
]; 