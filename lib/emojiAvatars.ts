import crypto from 'crypto';

// A curated list of emoji suitable for user avatars. Feel free to add/remove.
export const EMOJI_AVATARS = [
  '😀','😃','😄','😁','😆','😊','🙂','🙃','😉','😌',
  '😍','🥰','😎','🤩','🤓','😺','😸','😻','🐶','🐱',
  '🦊','🐼','🐨','🐯','🦁','🐵','🦄','🐝','🐞','🐢',
  '🌞','🌝','⭐','🌟','🔥','⚡','🌈','🍀','🍎','🍉',
  '🍩','☕','🍕','🍔','🍣','🎧','🎮','🚀','✈️','🛸',
  '🎨','🎲','🧩','📚','🔬','🧪','💡','🕹️','📷','🎬'
];

// Deterministically pick an emoji from the list for a given key (email, user id, etc.)
export function pickEmojiForKey(key: string) {
  if (!key) return EMOJI_AVATARS[0];
  const h = crypto.createHash('sha256').update(key).digest();
  const idx = h[0] % EMOJI_AVATARS.length;
  return EMOJI_AVATARS[idx];
}
