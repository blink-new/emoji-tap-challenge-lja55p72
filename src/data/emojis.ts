
// Different emoji categories for various levels
export const emojiSets = {
  easy: [
    '😀', '😃', '😄', '😁', '😆', 
    '😅', '😂', '🤣', '😊', '😇',
    '🙂', '🙃', '😉', '😌', '😍'
  ],
  medium: [
    '🐶', '🐱', '🐭', '🐹', '🐰', 
    '🦊', '🐻', '🐼', '🐨', '🐯',
    '🦁', '🐮', '🐷', '🐸', '🐵'
  ],
  hard: [
    '🍎', '🍐', '🍊', '🍋', '🍌', 
    '🍉', '🍇', '🍓', '🫐', '🍈',
    '🍒', '🍑', '🥭', '🍍', '🥥'
  ],
  expert: [
    '🚗', '🚕', '🚙', '🚌', '🚎', 
    '🏎️', '🚓', '🚑', '🚒', '🚐',
    '🛻', '🚚', '🚛', '🚜', '🛵'
  ],
  bonus: [
    '🎮', '🎯', '🎪', '🎭', '🎨',
    '🎬', '🎤', '🎧', '🎸', '🎹',
    '🎺', '🎻', '🎲', '🎯', '🎪'
  ],
  special: [
    '🌈', '⭐', '✨', '💫', '🌟',
    '🔥', '💥', '⚡', '🎇', '🎆',
    '🏆', '🥇', '🥈', '🥉', '🎖️'
  ]
}

// Get random emojis for a specific level
export const getRandomEmojis = (level: number, count: number): string[] => {
  // Determine which emoji set to use based on level
  let set: string[];
  if (level <= 3) {
    set = emojiSets.easy;
  } else if (level <= 6) {
    set = [...emojiSets.easy, ...emojiSets.medium];
  } else if (level <= 9) {
    set = [...emojiSets.medium, ...emojiSets.hard];
  } else if (level <= 12) {
    set = [...emojiSets.medium, ...emojiSets.hard, ...emojiSets.expert];
  } else if (level <= 15) {
    set = [...emojiSets.hard, ...emojiSets.expert, ...emojiSets.bonus];
  } else {
    // Super challenging mix for high levels
    set = [...emojiSets.expert, ...emojiSets.bonus, ...emojiSets.special];
  }

  // Shuffle and pick random emojis
  const shuffled = [...set].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Get a random emoji from a set
export const getRandomEmoji = (emojis: string[]): string => {
  const randomIndex = Math.floor(Math.random() * emojis.length);
  return emojis[randomIndex];
};

// Get emoji category name based on level
export const getEmojiCategoryName = (level: number): string => {
  if (level <= 3) return "Smiley";
  if (level <= 6) return "Animals";
  if (level <= 9) return "Fruits";
  if (level <= 12) return "Vehicles";
  if (level <= 15) return "Activities";
  return "Special";
};