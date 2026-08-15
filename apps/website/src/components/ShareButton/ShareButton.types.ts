export interface ShareButtonProps {
  /** The page's title, passed to the Web Share API when available. */
  title: string;
  /** The absolute URL to share. */
  url: string;
  /** Called after a successful share or copy — e.g. for analytics. */
  onShare?: () => void;
  className?: string;
}
