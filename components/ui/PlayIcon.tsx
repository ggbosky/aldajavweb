/**
 * A drawn play triangle. The ▶ character renders as a colour emoji on phones,
 * which is why it read as a sticker on the button; this one takes the text colour.
 */
export default function PlayIcon({ size = 10 }: { size?: number }): React.JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" fill="currentColor" aria-hidden="true">
      <path d="M1.5 0.8 9.2 5 1.5 9.2z" />
    </svg>
  );
}
