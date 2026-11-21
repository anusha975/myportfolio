import React, { useEffect, useRef, useState } from 'react';
import { LOADER } from '../data/portfolioData';

interface GlitchLoaderProps {
  onComplete: () => void;
}

const STATEMENT = LOADER.statement;
const WORDS = STATEMENT.split(' ');
const RED_WORDS = new Set(LOADER.redWords);

export const GlitchLoader: React.FC<GlitchLoaderProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'loading' | 'reveal'>('loading');
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    // Fast, responsive entry: flash statement briefly (280ms) then smoothly reveal (200ms)
    const revealTimer = window.setTimeout(() => {
      setPhase('reveal');
    }, 280);

    const completeTimer = window.setTimeout(() => {
      document.body.style.overflow = '';
      onCompleteRef.current();
    }, 480);

    // Instant unlock on any click, tap, or key press
    const handleInstantSkip = () => {
      document.body.style.overflow = '';
      onCompleteRef.current();
    };

    window.addEventListener('click', handleInstantSkip, { once: true });
    window.addEventListener('keydown', handleInstantSkip, { once: true });
    window.addEventListener('touchstart', handleInstantSkip, { once: true });

    return () => {
      window.clearTimeout(revealTimer);
      window.clearTimeout(completeTimer);
      window.removeEventListener('click', handleInstantSkip);
      window.removeEventListener('keydown', handleInstantSkip);
      window.removeEventListener('touchstart', handleInstantSkip);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div
      className={`glitch-loader ${phase === 'reveal' ? 'is-revealing' : ''}`}
      role="progressbar"
      aria-label={STATEMENT}
    >
      <div className="glitch-loader__veil" />

      {/* Statement displayed cleanly without any numbers or counting digits */}
      <div className="glitch-loader__center">
        <p className="glitch-loader__statement" aria-hidden="true">
          {WORDS.map((w, idx) => (
            <span
              key={idx}
              className={`glitch-loader__word${RED_WORDS.has(w) ? ' glitch-loader__word--red' : ''}`}
            >
              {w}{' '}
            </span>
          ))}
        </p>

        {[0, 1, 2, 3, 4].map((idx) => (
          <p key={idx} className={`glitch-loader__frag glitch-loader__frag--${idx}`} aria-hidden="true">
            {STATEMENT}
          </p>
        ))}
      </div>
    </div>
  );
};
