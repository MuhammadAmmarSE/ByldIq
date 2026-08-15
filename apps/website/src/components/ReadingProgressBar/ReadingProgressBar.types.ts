export interface ReadingProgressBarProps {
  /** Called once, the first time scroll progress reaches 100% — e.g. for a "reading completed" analytics event. */
  onComplete?: () => void;
  className?: string;
}
