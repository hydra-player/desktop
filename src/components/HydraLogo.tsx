import React from 'react';

type LogoProps = {
  className?: string;
  style?: React.CSSProperties;
  title?: string;
  gradientIdSuffix?: string;
};

// Import SVG from assets folder using Vite's ?raw suffix
import HYDRA_INAPP_LOGO_SVG from '../assets/hydra-logo.svg?raw';

export function HydraMark({ className, style, title = 'Hydra', gradientIdSuffix }: LogoProps) {
  const titleId = title ? 'hydra-logo-title' : undefined;
  const gradientId = gradientIdSuffix ? `hydra-theme-gradient-${gradientIdSuffix}` : 'hydra-theme-gradient';

  // Process the SVG to add dynamic themed gradient
  const processedSvg = React.useMemo(() => {
    let svg = HYDRA_INAPP_LOGO_SVG;
    
    // Remove fixed width/height so SVG can scale to its container
    svg = svg.replace(/\swidth="[^"]*"/g, ' ').replace(/\sheight="[^"]*"/g, ' ');
    
    // Ensure viewBox is present for proper scaling
    if (!svg.includes('viewBox')) {
      svg = svg.replace('<svg', '<svg viewBox="0 0 512 512"');
    }
    
    // Add gradient definition using CSS variable
    const gradientDef = `
      <defs>
        <linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="var(--accent, #9b5cff)" stop-opacity="0.7" />
          <stop offset="54%" stop-color="var(--accent, #9b5cff)" />
          <stop offset="100%" stop-color="var(--accent, #9b5cff)" stop-opacity="0.9" />
        </linearGradient>
      </defs>
    `;
    
    // Insert gradient defs after opening svg tag
    svg = svg.replace(/(<svg[^>]*>)/, (match) => match + gradientDef);
    
    // Replace fills with gradient reference
    svg = svg.replace(/fill="[^"]*"/g, `fill="url(#${gradientId})"`);
    
    return svg;
  }, [gradientId]);

  return (
    <div
      className={className}
      style={style}
      role={title ? 'img' : undefined}
      aria-labelledby={titleId}
      aria-hidden={title ? undefined : true}
      dangerouslySetInnerHTML={{ __html: processedSvg }}
    />
  );
}

export default function HydraLogo({ className, style, title = 'Hydra' }: LogoProps) {
  return (
    <span 
      className={`hydra-wordmark${className ? ` ${className}` : ''}`} 
      style={style} 
      role="img" 
      aria-label={title}
    >
      <HydraMark className="hydra-wordmark-mark" title="" />
      <span 
        className="hydra-wordmark-text" 
        style={{
          background: 'linear-gradient(135deg, var(--accent, #9b5cff), color-mix(in srgb, var(--accent, #9b5cff) 85%, white))',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          display: 'inline-block',
          textTransform: 'none'
        }}
      >
        Hydra
      </span>
    </span>
  );
}
