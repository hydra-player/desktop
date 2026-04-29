import React from 'react';

type LogoProps = {
  className?: string;
  style?: React.CSSProperties;
  title?: string;
};

export function HydraMark({ className, style, title = 'Hydra' }: LogoProps) {
  const generatedTitleId = React.useId();
  const titleId = title ? `hydra-mark-title-${generatedTitleId.replace(/:/g, '')}` : undefined;
  const gradId = `hydraMarkPrism-${generatedTitleId.replace(/:/g, '')}`;

  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 64 64"
      role={title ? 'img' : undefined}
      aria-labelledby={titleId}
      aria-hidden={title ? undefined : true}
      xmlns="http://www.w3.org/2000/svg"
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <defs>
        <linearGradient id={gradId} x1="12" y1="8" x2="56" y2="58" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="var(--logo-color-start, #f5f5f5)" />
          <stop offset="0.54" stopColor="var(--accent, #9b5cff)" />
          <stop offset="1" stopColor="var(--logo-color-end, #00c8ff)" />
        </linearGradient>
      </defs>

      <g fill="none" stroke={`url(#${gradId})`} strokeWidth="5.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15.5 32.5C8.5 31.5 6.3 25.2 9.5 20.9c2.9-3.8 8.1-3.7 10.8-.7" />
        <path d="M48.5 32.5c7-1 9.2-7.3 6-11.6-2.9-3.8-8.1-3.7-10.8-.7" />
        <path d="M17.2 41.6c-6.2 1.4-9.1 6.5-6.4 10.6 2.8 4.2 8.9 3.6 10.2-.9" />
        <path d="M46.8 41.6c6.2 1.4 9.1 6.5 6.4 10.6-2.8 4.2-8.9 3.6-10.2-.9" />
        <path d="M26.2 49.2c-4.1 3.9-2.4 9.5 2.8 9.9 4.4.3 6.4-3.8 3-7.4" />
        <path d="M37.8 49.2c4.1 3.9 2.4 9.5-2.8 9.9-4.4.3-6.4-3.8-3-7.4" />
      </g>

      <path
        d="M22.4 17.8c.3-4.6-2.4-7.8-5.4-10.1 4.8.5 8.8 2.9 10.5 6.2h9c1.7-3.3 5.7-5.7 10.5-6.2-3 2.3-5.7 5.5-5.4 10.1 3.1 2.2 5.1 5.9 5.1 10.2v10.2c0 7.2-5.6 13-12.5 13h-4.4c-6.9 0-12.5-5.8-12.5-13V28c0-4.3 2-8 5.1-10.2Z"
        fill={`url(#${gradId})`}
      />
      <path
        d="M25.7 28.2c1.3-1 2.7-1.5 4.2-1.5M38.3 28.2c-1.3-1-2.7-1.5-4.2-1.5"
        fill="none"
        stroke="var(--bg-sidebar, #111)"
        strokeWidth="2.4"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}

export default function HydraLogo({ className, style, title = 'Hydra' }: LogoProps) {
  return (
    <span className={`hydra-wordmark${className ? ` ${className}` : ''}`} style={style} role="img" aria-label={title}>
      <HydraMark className="hydra-wordmark-mark" title="" />
      <span className="hydra-wordmark-text">hydra</span>
    </span>
  );
}
