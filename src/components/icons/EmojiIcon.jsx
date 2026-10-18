import { getEmoji } from '../../constants/emojis';

export default function EmojiIcon({ name, size = 24, className = '', fallback }) {
  return (
    <span
      className={`emoji-icon ${className}`}
      style={{ fontSize: size * 0.9, width: size, height: size }}
      aria-hidden="true"
    >
      {getEmoji(name, fallback)}
    </span>
  );
}
