export const AVATAR_SIZES = ["sm", "md", "lg", "xl"] as const;

export type AvatarSize = (typeof AVATAR_SIZES)[number];

export interface AvatarProps {
  src?: string;
  /** Required even when `src` is unset — describes who the avatar represents. */
  alt: string;
  /** Initials shown while the image loads, on load failure, or when `src` is omitted. */
  fallback: string;
  size?: AvatarSize;
  className?: string;
}
