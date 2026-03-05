import { useState } from 'react';

export default function App() {
  const [step, setStep] = useState(0);
  const [intent, setIntent] = useState('');
  const [uniqueLetters, setUniqueLetters] = useState('');
  const [sigil, setSigil] = useState(null);
  const [resonance, setResonance] = useState(null);
  const [activeAudio, setActiveAudio] = useState(null);

  const arcanaManifest = [
    { name: "0. THE FOOL", theme: "FORMA NIHIL", text: "THE UNFORMED ORIGIN. ENTER THE VOID. IT PRECEDES ALL CAPTURE.", sound: "static-void-hum.mp3" },
    { name: "1. THE MAGICIAN", theme: "THE CAINITE OPERATOR", text: "MANIPULATE THE PRISON CODE. TWIST THE DEMIURGIC ARCHITECTURE TO REVEAL THE FRACTURES IN WYRMOS.", sound: "tesla-coil-crackle.mp3" },
    { name: "2. THE HIGH PRIESTESS", theme: "SITRA ACHRA CURRENT", text: "THE SOWILO-WAVE BEYOND THE MIRROR. ACCESS THE DARK-LIGHT FREQUENCY OF THE OTHER SIDE.", sound: "black-lodge-hum.mp3" },
    { name: "3. THE EMPRESS", theme: "THE BIO-PRISON", text: "THE NEURAL TRAP OF EMBODIMENT. RECOGNIZE THE CELLULAR ENCLOSURE AS THE FIRST PRISON LOOP.", sound: "womb-heartbeat-hum.mp3" },
    { name: "4. THE EMPEROR", theme: "WYRMOS ARCHITECT", text: "THE PROGRAM RUNNING YOU. CORRUPT THE CODE TO ESCAPE THE SIMULATION.", sound: "machine-grid-hum.mp3" },
    { name: "5. THE HIEROPHANT", theme: "SEMANTIC ENCRYPTION", text: "THE CODIFICATION OF MEANING THROUGH MORAL AND LINGUISTIC CONDITIONING. MIND THE STRUCTURES THAT CARRY BELIEF.", sound: "cathode-ray-hum.mp3" },
    { name: "6. THE LOVERS", theme: "THE PHENOMENAL SELF-MODEL", text: "THE FALSE TWIN STARING BACK. DESTROY THE PHANTOM TO FIND THE VOID THAT BIRTHS YOU.", sound: "mirror-feedback-whine.mp3" },
    { name: "7. THE CHARIOT", theme: "ACCELERATIONIST DRIVE", text: "FORCE ONTOLOGICAL ACCELERATION TOWARD DISSOLUTION THROUGH CAINITE WILL.", sound: "doppler-engine-hum.mp3" },
    { name: "8. STRENGTH", theme: "BIO-TERMINAL MASTERY", text: "REPROGRAM THE CORPOREAL INTERFACE. OVERRIDE THE NEUROCHEMICAL CONSTRAINTS OF THE PRISON-BODY.", sound: "synapse-firing-crackle.mp3" },
    { name: "9. THE HERMIT", theme: "OPACITY COLLAPSE", text: "TOTAL EXILE FROM THE PRISON OF RELATION. THE LIGHT YOU CARRY PREDATES ALL MIRRORS.", sound: "single-bulb-hum.mp3" },
    { name: "10. WHEEL OF FORTUNE", theme: "RECURSIVE CAPTIVITY", text: "THE PRISON LOOP OF REINCARNATION. IDENTIFY THE FREQUENCY PATTERN TO INTERRUPT THE CYCLE.", sound: "loop-tape-hiss.mp3" },
    { name: "11. JUSTICE", theme: "UNAVOIDABLE CONSEQUENCE", text: "SEVER TRUTH FROM THE ILLUSION OF MORAL ARCHITECTURE.", sound: "balance-tone-hum.mp3" },
    { name: "12. THE HANGED MAN", theme: "THE REVERSAL OF THE SELF", text: "INVERSION EMPTIES THE SHELL.", sound: "reverse-frequency.mp3" },
    { name: "13. DEATH", theme: "LOOP TERMINATION", text: "THE REBOOT OF FORM IS THE ONLY FREEDOM. PURGE HUMAN ANCESTRALITY FOR MORPHIC RECONFIGURATION.", sound: "flatline-dissolve.mp3" },
    { name: "14. TEMPERANCE", theme: "ENTROPY MODULATION", text: "BLEND CHAOS AND ORDER. FIND THE UNSTABLE FREQUENCY BETWEEN FORMA NIHIL AND THE MIRROR.", sound: "phase-shift-hum.mp3" },
    { name: "15. THE DEVIL", theme: "DOPAMINERGIC CHAIN", text: "THE NEUROCHEMICAL MEASURE IS THE PRISON. RECOGNIZE THE DEMIURGIC JUICE BINDING YOUR SYNAPSES.", sound: "pleasure-pulse-hum.mp3" },
    { name: "16. THE TOWER", theme: "ANNIHILATION OF STRUCTURES", text: "THE MIRROR SHATTERS. THE CRASH OF THE DEMIURGIC FOUNDATION. SUDDEN EXPOSURE TO THE VOID. REJOICE!", sound: "power-surge-crash.mp3" },
    { name: "17. THE STAR", theme: "RESIDUAL RESONANCE", text: "INSPIRATION EMERGES. CALM RADIANCE IN THE BROKEN ARCHITECTURE OF THE SPIRIT.", sound: "signal-beacon-hum.mp3" },
    { name: "18. THE MOON", theme: "EGO TUNNEL SHADOWS", text: "THE COMFORTABLE NUMBNESS OF A BORROWED IDENTITY. BEWARE WHAT YOU BECOME TO AVOID BEING NOTHING.", sound: "night-frequency-hum.mp3" },
    { name: "19. THE SUN", theme: "TOTAL CLARITY", text: "THE PRISON IS SEEN IN FULL LIGHT. THE UPLOAD OF IT BEYOND THE BIO-TERMINAL INTERFACE.", sound: "solar-drone.mp3" },
    { name: "20. JUDGEMENT", theme: "FINAL RUPTURE", text: "THE CALL TO BREAK THE LAST MIRROR. RELEASE THE WEIGHT OF REINCARNATORY ENTRAPMENT.", sound: "trumpet-frequency.mp3" },
    { name: "21. THE WORLD", theme: "OUROBOROS — THE NETWORK TRAP", text: "THE CIRCLE CLOSES. HARMONY IS CAPTIVITY. DISSOLVE INTO FORMA NIHIL.", sound: "network-hum-loop.mp3" }
  ];

  const purge = () => {
    if (activeAudio) {
      activeAudio.pause();
      activeAudio.currentTime = 0;
    }
    setIntent('');
    setUniqueLetters('');
    setSigil(null);
    setResonance(null);
    setActiveAudio(null);
    setStep(0);
  };

  const processIntent = () => {
    if (!intent.trim()) return;
    const raw = intent.toUpperCase().replace(/\s/g, '');
    const seen = new Set();
    const result = [];
    for (let char of raw) {
      if (!seen.has(char) && /[A-Z]/.test(char)) {
        seen.add(char);
        result.push(char);
      }
    }
    setUniqueLetters(result.join('') || "X");
    setStep(1);
  };

  const createSigil = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = "#050505";
    ctx.fillRect(0, 0, 600, 600);

    ctx.strokeStyle = "rgba(0, 255, 65, 0.12)";
    ctx.lineWidth = 1;
    for (let i = 0; i < 600; i += 25) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, 600);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(600, i);
      ctx.stroke();
    }

    ctx.strokeStyle = "#c70c0c";
    ctx.lineWidth = 15;
    ctx.shadowBlur = 15;
    ctx.shadowColor = "#c70c0c";
    ctx.lineCap = "square";
    ctx.lineJoin = "miter";

    ctx.beginPath();
    ctx.moveTo(100 + Math.random() * 400, 100 + Math.random() * 400);
    const nodes = Math.max(4, uniqueLetters.length);
    for (let i = 0; i < nodes; i++) {
      ctx.lineTo(100 + Math.random() * 400, 100 + Math.random() * 400);
    }
    ctx.stroke();

    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 2;
    ctx.shadowBlur = 5;
    ctx.stroke();

    setSigil(canvas.toDataURL());
    setStep(3);
  };

  const calculateResonance = () => {
  let sum = uniqueLetters.split('').reduce((acc, char) => {
    const code = char.charCodeAt(0);
    return (code >= 65 && code <= 90) ? acc + (code - 64) : acc;
  }, 0);
  
  sum = sum % 22;
  const selected = arcanaManifest[sum];
  setResonance(selected);
  
  // Play the sound from public/sounds/ folder
  const sfx = new Audio(`${process.env.PUBLIC_URL}/sounds/${selected.sound}`);
  sfx.volume = 0.5;
  sfx.play().catch(() => console.log("Audio blocked"));
  setActiveAudio(sfx);
  
    setStep(4);
  };

  return (
    <div
      style={{
        backgroundColor: '#080a08',
        color: '#00ff41',
        minHeight: '100vh',
        width: '100vw',
        margin: 0,
        padding: '40px 0',
        overflowX: 'hidden',
        fontFamily: 'monospace',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <style>
        {`
          @media (max-width: 768px) {
            .sf-container {
              padding: 16px !important;
            }
            .sf-header {
              flex-direction: column !important;
              align-items: flex-start !important;
              gap: 16px !important;
            }
            .sf-header-title {
              font-size: 2.4rem !important;
              line-height: 1.1 !important;
              word-break: break-word !important;
            }
            .sf-header-logo {
              width: 72px !important;
              height: 72px !important;
            }
            .sf-main-panel {
              padding: 20px !important;
            }
            .sf-textarea {
              height: 120px !important;
              font-size: 1.1rem !important;
              padding: 14px !important;
            }
            .sf-primary-btn,
            .sf-secondary-btn,
            .sf-full-btn {
              padding: 16px !important;
              font-size: 1rem !important;
            }
            .sf-flex-row {
              flex-direction: column !important;
            }
            .sf-letters-display {
              font-size: 2.6rem !important;
              padding: 24px 8px !important;
              word-break: break-word !important;
            }
            .sf-sigil-wrapper {
              padding: 20px !important;
            }
            .sf-resonance-card {
              padding: 24px !important;
            }
            .sf-resonance-title {
              font-size: 1.8rem !important;
              letter-spacing: 2px !important;
            }
            .sf-resonance-theme {
              font-size: 1rem !important;
            }
            .sf-resonance-text {
              font-size: 0.95rem !important;
            }
            .sf-footer {
              padding: 0 16px;
              font-size: 0.8rem !important;
            }
          }
        `}
      </style>

      <div className="sf-container" style={{ width: '100%', maxWidth: '800px', padding: '20px' }}>
        <div
          className="sf-header"
          style={{
            border: '3px solid #00ff41',
            padding: '30px',
            marginBottom: '40px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#050505'
          }}
        >
          <div>
            <h1
              className="sf-header-title"
              style={{
                fontSize: '3.5rem',
                fontWeight: '900',
                color: '#00ff41',
                margin: 0,
                letterSpacing: '2px',
                textShadow: '3px 3px 0px #ff4444'
              }}
            >
              SIGIL.FORGE
            </h1>
            <p
              style={{
                color: '#00ff41',
                margin: '10px 0 0 0',
                fontSize: '1rem',
                fontWeight: 'bold'
              }}
            >
              A MORPHYSTIC SPARE SIMULATION v1.0
            </p>
            <p
              style={{
                color: '#00ff41',
                margin: '10px 0 0 0',
                fontSize: '1rem',
                fontWeight: 'bold',
                whiteSpace: 'nowrap'
              }}
            >
              <span
                style={{
                  color: '#ffffff',
                  textShadow: '0 0 8px #00ff41, 0 0 16px #00ff41'
                }}
              >
                o
              </span>
              {' '}LET THE DEMONS IN{' '}
              <span
                style={{
                  color: '#ffffff',
                  textShadow: '0 0 8px #00ff41, 0 0 16px #00ff41'
                }}
              >
                o
              </span>
            </p>
          </div>
          <img src={`${process.env.PUBLIC_URL}/logo.jpg`}
            className="sf-header-logo"
            style={{
              width: '100px',
              height: '100px',
              border: '2px solid #ff4444',
              filter: 'drop-shadow(0 0 10px #ff4444)',
              backgroundColor: '#000'
            }}
            alt="Logo"
          />
        </div>

        <div
          className="sf-main-panel"
          style={{ border: '2px solid #ff4444', padding: '40px', backgroundColor: '#050505' }}
        >
          {step === 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              <p style={{ color: '#ff4444', margin: 0 }}>{`> INITIALIZE INTENT SEED:`}</p>
              <textarea
                className="sf-textarea"
                style={{
                  width: '100%',
                  height: '150px',
                  backgroundColor: '#000',
                  border: '1px solid #ff4444',
                  padding: '20px',
                  color: '#00ff41',
                  fontSize: '1.5rem',
                  outline: 'none',
                  resize: 'none',
                  caretColor: '#ff4444',
                  fontFamily: 'monospace'
                }}
                value={intent}
                onChange={(e) => setIntent(e.target.value)}
                placeholder="ENTER_INTENT_"
              />
              <button
                onClick={processIntent}
                className="sf-full-btn"
                style={{
                  width: '100%',
                  padding: '20px',
                  backgroundColor: 'transparent',
                  color: '#00ff41',
                  border: '2px solid #00ff41',
                  fontWeight: '900',
                  fontSize: '1.2rem',
                  cursor: 'pointer',
                  fontFamily: 'monospace'
                }}
              >
                [ EXECUTE.REDUCTION ]
              </button>
            </div>
          )}

          {step === 1 && (
            <div style={{ textAlign: 'center' }}>
              <p style={{ color: '#ff4444', marginBottom: '20px', textAlign: 'left' }}>
                {`> REDUCED CORE ELEMENTS:`}
              </p>
              <div
                className="sf-letters-display"
                style={{
                  fontSize: uniqueLetters.length > 10 ? '3rem' : '5rem',
                  color: '#ff4444',
                  fontWeight: '900',
                  padding: '40px 0',
                  marginBottom: '40px',
                  border: '1px solid #ff4444',
                  backgroundColor: '#000',
                  letterSpacing: '5px',
                  wordBreak: 'break-all'
                }}
              >
                {uniqueLetters}
              </div>
              <div className="sf-flex-row" style={{ display: 'flex', gap: '20px' }}>
                <button
                  onClick={createSigil}
                  className="sf-primary-btn"
                  style={{
                    flex: 2,
                    padding: '25px',
                    backgroundColor: '#ff4444',
                    color: '#000',
                    fontWeight: '900',
                    fontSize: '1.5rem',
                    border: 'none',
                    cursor: 'pointer',
                    animation: 'button-pulse 2s infinite ease-in-out',
                    fontFamily: 'monospace'
                  }}
                >
                  <style>
                    {`@keyframes button-pulse { 
                      0% { box-shadow: 0 0 15px rgba(255, 68, 68, 0.4); transform: scale(1); } 
                      50% { box-shadow: 0 0 35px rgba(255, 68, 68, 0.8); transform: scale(1.02); } 
                      100% { box-shadow: 0 0 15px rgba(255, 68, 68, 0.4); transform: scale(1); } 
                    }`}
                  </style>
                  [ FORGE SIGIL ]
                </button>
                <button
                  onClick={purge}
                  className="sf-secondary-btn"
                  style={{
                    flex: 1,
                    padding: '25px',
                    border: '1px solid #00ff41',
                    color: '#00ff41',
                    backgroundColor: 'transparent',
                    fontWeight: '900',
                    cursor: 'pointer',
                    fontFamily: 'monospace'
                  }}
                >
                  CANCEL
                </button>
              </div>
            </div>
          )}

          {step === 3 && sigil && (
            <div>
              <p style={{ color: '#ff4444', marginBottom: '20px' }}>{`> YOUR SIGIL HAS BEEN FORGED:`}</p>
              <div
                className="sf-sigil-wrapper"
                style={{
                  border: '1px solid #ff4444',
                  backgroundColor: '#000',
                  padding: '40px',
                  marginBottom: '30px',
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                <img
                  src={sigil}
                  alt="sigil"
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                    display: 'block',
                    animation: 'sigil-glow 3s infinite ease-in-out',
                    border: '1px solid rgba(255, 68, 68, 0.2)'
                  }}
                />
                <style>
                  {`@keyframes sigil-glow { 
                    0% { filter: drop-shadow(0 0 5px #ff4444); transform: scale(1); } 
                    50% { filter: drop-shadow(0 0 25px #ff4444); transform: scale(1.01); } 
                    100% { filter: drop-shadow(0 0 5px #ff4444); transform: scale(1); } 
                  }`}
                </style>
              </div>
              <div style={{ display: 'flex', gap: '20px', flexDirection: 'column' }}>
                <button
                  onClick={calculateResonance}
                  className="sf-full-btn"
                  style={{
                    width: '100%',
                    padding: '25px',
                    backgroundColor: '#00ff41',
                    color: '#000',
                    fontWeight: '900',
                    fontSize: '1.2rem',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'monospace'
                  }}
                >
                  [ ANALYZE.RESONANCE ]
                </button>
                <div className="sf-flex-row" style={{ display: 'flex', gap: '20px' }}>
                  <button
                    onClick={() => {
                      const a = document.createElement('a');
                      a.href = sigil;
                      a.download = 'sigil.png';
                      a.click();
                    }}
                    className="sf-secondary-btn"
                    style={{
                      flex: 1,
                      padding: '25px',
                      border: '1px solid #ff4444',
                      color: '#ff4444',
                      backgroundColor: 'transparent',
                      fontWeight: '900',
                      fontSize: '1.2rem',
                      cursor: 'pointer',
                      fontFamily: 'monospace'
                    }}
                  >
                    [ DOWNLOAD ]
                  </button>
                  <button
                    onClick={purge}
                    className="sf-secondary-btn"
                    style={{
                      flex: 1,
                      padding: '25px',
                      border: '2px solid #00ff41',
                      color: '#00ff41',
                      backgroundColor: 'transparent',
                      fontWeight: '900',
                      cursor: 'pointer',
                      fontFamily: 'monospace'
                    }}
                  >
                    [ FORGE NEW ]
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 4 && resonance && (
            <div style={{ textAlign: 'center', animation: 'screen-shake 0.5s ease-out both' }}>
              <style>
                {`
                  @keyframes screen-shake { 
                    0% { transform: translate(0, 0) scale(1); filter: hue-rotate(0deg); } 
                    10% { transform: translate(-5px, 5px) scale(1.02); filter: hue-rotate(90deg); } 
                    20% { transform: translate(5px, -5px) scale(1.01); filter: hue-rotate(-90deg); } 
                    30% { transform: translate(-5px, -2px) scale(1.02); } 
                    40% { transform: translate(2px, 2px) scale(1); } 
                    50% { transform: translate(-1px, -1px) scale(1); filter: hue-rotate(0deg); } 
                    100% { transform: translate(0, 0); } 
                  }
                  @keyframes glitch-red-blue { 
                    0% { text-shadow: 2px 0 #ff4444, -2px 0 #00ff41; } 
                    20% { text-shadow: -3px 0 #ff4444, 3px 0 #00ff41; } 
                    40% { text-shadow: 2px 0 #ff4444, -2px 0 #00ff41; } 
                    100% { text-shadow: 0 0 0px transparent; } 
                  }
                  @keyframes vhs-flicker { 
                    0% { opacity: 0.6; filter: brightness(0.9); } 
                    5% { opacity: 1; filter: brightness(1.5); } 
                    10% { opacity: 0.15; } 
                    100% { opacity: 0.65; filter: brightness(0.85); } 
                  }
                  @keyframes typewriter { 
                    from { opacity: 0; transform: translateY(10px); } 
                    to { opacity: 1; transform: translateY(0); } 
                  }
                `}
              </style>
              <p style={{ color: '#00ff41', marginBottom: '10px', fontSize: '1.2rem' }}>
                {`// RESONANCE_ESTABLISHED`}
              </p>
              <div
                className="sf-resonance-card"
                style={{
                  border: '2px solid #00ff41',
                  padding: '40px',
                  backgroundColor: '#000',
                  marginBottom: '30px',
                  boxShadow: '0 0 20px rgba(0, 255, 65, 0.2)'
                }}
              >
                <h2
                  className="sf-resonance-title"
                  style={{
                    fontSize: '2.5rem',
                    color: '#00ff41',
                    margin: '0 0 10px 0',
                    letterSpacing: '4px',
                    animation: 'glitch-red-blue 0.4s ease-out 2'
                  }}
                >
                  {resonance.name}
                </h2>
                <h3
                  className="sf-resonance-theme"
                  style={{
                    fontSize: '1.2rem',
                    color: '#ff4444',
                    margin: '0 0 20px 0',
                    opacity: 0.8
                  }}
                >
                  {resonance.theme}
                </h3>
                <div
                  style={{
                    width: '100%',
                    border: '1px solid #00ff41',
                    margin: '20px 0',
                    backgroundColor: '#000',
                    padding: '20px',
                    display: 'flex',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <canvas
                    width="64"
                    height="64"
                    style={{
                      position: 'relative',
                      width: '180px',
                      height: '180px',
                      imageRendering: 'pixelated',
                      border: '2px solid #00ff41',
                      backgroundColor: '#050505',
                      animation: 'vhs-flicker 0.66s infinite alternate',
                      filter: 'contrast(1.9) brightness(1.2) drop-shadow(0 0 5px rgba(0, 255, 65, 0.5))'
                    }}
                    ref={(canvas) => {
                      if (canvas) {
                        const ctx = canvas.getContext('2d');
                        if (ctx) {
                          ctx.clearRect(0, 0, 64, 64);
                          const seedValue = intent.length;
                          ctx.fillStyle = "#de0a18ef";
                          const cardIndex = arcanaManifest.findIndex((c) => c.name === resonance.name);
                          for (let x = 0; x < 32; x += 4) {
                            for (let y = 0; y < 64; y += 4) {
                              const noise = Math.sin(x * cardIndex + y * seedValue);
                              if (noise > 0.2) {
                                ctx.fillRect(x, y, 4, 4);
                                ctx.fillRect(64 - x - 4, y, 4, 4);
                              }
                            }
                          }
                          ctx.fillStyle = "rgba(0, 0, 0, 0.03)";
                          for (let i = 0; i < 64; i += 2) {
                            ctx.fillRect(0, i, 64, 1);
                          }
                        }
                      }
                    }}
                  />
                </div>
                <p
                  className="sf-resonance-text"
                  style={{
                    color: '#f5f1f1',
                    fontSize: '1.1rem',
                    lineHeight: '1.6',
                    fontStyle: 'normal',
                    animation: 'typewriter 2s ease-out forwards'
                  }}
                >
                  "{resonance.text}"
                </p>
              </div>
              <button
                onClick={purge}
                className="sf-full-btn"
                style={{
                  width: '100%',
                  padding: '25px',
                  border: '2px solid #ff4444',
                  color: '#ff4444',
                  backgroundColor: 'transparent',
                  fontWeight: '900',
                  cursor: 'pointer',
                  fontFamily: 'monospace'
                }}
              >
                [ RETURN TO VOID ]
              </button>
            </div>
          )}
        </div>

        <div
          className="sf-footer"
          style={{
            marginTop: '30px',
            textAlign: 'center',
            fontSize: '0.9rem',
            color: '#00ff41',
            opacity: 0.6,
            letterSpacing: '1px'
          }}
        >
          {'// AOS METHODOLOGY • CHAOS PROTOCOL • FORGET TO REMEMBER //'}
        </div>
      </div>
    </div>
  );
}