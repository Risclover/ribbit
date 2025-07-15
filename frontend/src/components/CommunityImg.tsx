import {
  CSSProperties,
  MouseEventHandler,
  SyntheticEvent,
  useCallback,
  memo,
} from "react";

interface CommunityImgProps {
  imgSrc: string;
  /** fallback shown when `imgSrc` fails – defaults to Ribbit frog */
  fallbackSrc?: string;
  imgClass?: string;
  imgAlt?: string;
  imgStyle?: CSSProperties;
  imgClick?: MouseEventHandler<HTMLImageElement>;
  width?: number | string;
  height?: number | string;
}

const FALLBACK_ICON = "https://i.imgur.com/9CI9hiO.png";

/** Re-usable image component with graceful fallback & lazy loading */
function CommunityImgBase({
  imgSrc,
  fallbackSrc = FALLBACK_ICON,
  imgClass,
  imgAlt = "Community icon",
  imgStyle,
  imgClick,
  width,
  height,
}: CommunityImgProps) {
  /* stable error handler to avoid new fn on every render */
  const handleError = useCallback(
    (e: SyntheticEvent<HTMLImageElement>) => {
      const img = e.currentTarget;
      img.onerror = null; // stop recursive loop
      img.src = fallbackSrc;
    },
    [fallbackSrc]
  );

  return (
    <img
      src={imgSrc}
      onError={handleError}
      className={imgClass}
      alt={imgAlt}
      style={imgStyle}
      onClick={imgClick}
      width={width}
      height={height}
      loading="lazy"
    />
  );
}

/* memoised to avoid unnecessary paints */
export const CommunityImg = memo(CommunityImgBase);
