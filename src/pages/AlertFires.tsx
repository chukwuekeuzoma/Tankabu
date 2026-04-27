import { useEffect, useState, useRef } from 'react';

const HEADLINE = 'DIVERSION DETECTED';
const HASH_FULL = '0xd8e2c4951a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8';

export function AlertFires() {
  const [showIcon, setShowIcon] = useState(false);
  const [headlineText, setHeadlineText] = useState('');
  const [showSub, setShowSub] = useState(false);
  const [showLoc, setShowLoc] = useState(false);
  const [showBadge, setShowBadge] = useState(false);
  const [showContract, setShowContract] = useState(false);
  const [codeLines, setCodeLines] = useState<string[]>(['', '', '']);
  const [showOnchain, setShowOnchain] = useState(false);
  const [hashText, setHashText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const startAnimation = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    setShowIcon(false);
    setHeadlineText('');
    setShowSub(false);
    setShowLoc(false);
    setShowBadge(false);
    setShowContract(false);
    setCodeLines(['', '', '']);
    setShowOnchain(false);
    setHashText('');
    setShowCursor(true);

    timersRef.current.push(setTimeout(() => setShowIcon(true), 300));
    
    timersRef.current.push(setTimeout(() => {
      let i = 0;
      const iv = setInterval(() => {
        if (i >= HEADLINE.length) {
          clearInterval(iv);
          setTimeout(() => setShowCursor(false), 500);
          return;
        }
        i++;
        setHeadlineText(HEADLINE.slice(0, i));
      }, 55);
      timersRef.current.push(iv as any);
    }, 900));

    timersRef.current.push(setTimeout(() => setShowSub(true), 2400));
    timersRef.current.push(setTimeout(() => setShowLoc(true), 2900));
    timersRef.current.push(setTimeout(() => setShowBadge(true), 3300));
    timersRef.current.push(setTimeout(() => setShowContract(true), 3800));

    const lines = [
      `<span class="kw">&gt;</span> <span class="fn">compareVolume</span>(expected=<span class="num">30938</span>, actual=<span class="num">28091</span>)`,
      `<span class="kw">&gt;</span> loss=<span class="num">2847</span> exceeds threshold=<span class="num">1856</span> (<span class="num">6%</span>)`,
      `<span class="kw">&gt;</span> <span class="em">emit</span> DiversionAlert(shipmentId, checkpoint, loss)`
    ];
    lines.forEach((html, i) => {
      timersRef.current.push(setTimeout(() => {
        setCodeLines(prev => {
          const newLines = [...prev];
          newLines[i] = html;
          return newLines;
        });
      }, 4100 + i * 500));
    });

    timersRef.current.push(setTimeout(() => setShowOnchain(true), 5700));
    
    timersRef.current.push(setTimeout(() => {
      let i = 0;
      const iv = setInterval(() => {
        if (i >= HASH_FULL.length) {
          clearInterval(iv);
          return;
        }
        i++;
        setHashText(HASH_FULL.slice(0, i));
      }, 18);
      timersRef.current.push(iv as any);
    }, 6100));
  };

  useEffect(() => {
    startAnimation();
    return () => timersRef.current.forEach(clearTimeout);
  }, []);

  return (
    <div className="alert-fires-wrap">
      <div className="af-glow"></div>
      <div className="af-center">
        <button className="af-replay" onClick={startAnimation}>↺ Replay</button>
        <div className={`af-icon ${showIcon ? 'show' : ''}`}>
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <path d="M4 30L18 6L32 30H4Z" stroke="#EF4444" strokeWidth="2.5" strokeLinejoin="round" />
            <line x1="18" y1="16" x2="18" y2="23" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="18" cy="27" r="1.2" fill="#EF4444" />
          </svg>
        </div>
        <div className="af-headline">
          {headlineText}
          {showCursor && <span className="cursor"></span>}
        </div>
        <div className={`af-sub ${showSub ? 'show' : ''}`}>2,847 litres unaccounted for</div>
        <div className={`af-loc ${showLoc ? 'show' : ''}`}>Benin City Gate, Edo State · 13:41 today</div>
        <div className={`af-pct-badge ${showBadge ? 'show' : ''}`}>8.6% volume loss — threshold: 6%</div>
        
        <div className={`af-contract ${showContract ? 'show' : ''}`}>
          <div className="af-contract-lbl">Kwala Smart Contract — Auto-Triggered</div>
          <div className="af-code-line" dangerouslySetInnerHTML={{ __html: codeLines[0] }}></div>
          <div className="af-code-line" dangerouslySetInnerHTML={{ __html: codeLines[1] }}></div>
          <div className="af-code-line" dangerouslySetInnerHTML={{ __html: codeLines[2] }}></div>
        </div>

        <div className={`af-onchain ${showOnchain ? 'show' : ''}`}>
          <div className="af-oc-lbl">On-Chain Record Created</div>
          <div className="af-oc-hash">{hashText}</div>
          <div className="af-oc-meta">Block #4,729,183 · Kwala Mainnet · immutable</div>
        </div>
      </div>
    </div>
  );
}
