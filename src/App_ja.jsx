import { useState } from 'react';

export default function App() {
  const [step, setStep] = useState(0);
  const [intent, setIntent] = useState('');
  const [uniqueLetters, setUniqueLetters] = useState('');
  const [sigil, setSigil] = useState(null);
  const [resonance, setResonance] = useState(null);
  const [activeAudio, setActiveAudio] = useState(null);

  const arcanaManifest = [
    { name: "0．愚者", theme: "フォルマ・ニヒル", text: "未形成の根源。虚無へ踏み込め。それはあらゆる捕縛に先立つ。", sound: "static-void-hum.mp3" },
    { name: "1．魔術師", theme: "カイン系操作者", text: "牢獄のコードを操作せよ。デミウルゴスの建築を歪め、ウィルモスの亀裂を暴け。", sound: "tesla-coil-crackle.mp3" },
    { name: "2．女教皇", theme: "シトラ・アクラの流れ", text: "鏡の彼方のソウィロ波。対岸の暗黒光の周波数にアクセスせよ。", sound: "black-lodge-hum.mp3" },
    { name: "3．女帝", theme: "生体牢獄", text: "受肉のニューラル罠。細胞の檻を最初の幽閉ループと認識せよ。", sound: "womb-heartbeat-hum.mp3" },
    { name: "4．皇帝", theme: "ウィルモス建築家", text: "汝を走らせるプログラム。コードを腐敗させ、シミュレーションから脱出せよ。", sound: "machine-grid-hum.mp3" },
    { name: "5．法王", theme: "意味論的暗号化", text: "道徳と言語条件付けによる意味の符号化。信念を運ぶ構造に注意せよ。", sound: "cathode-ray-hum.mp3" },
    { name: "6．恋人", theme: "現象的自己モデル", text: "見返す偽の双子。幻影を破壊し、汝を産む虚無を見出せ。", sound: "mirror-feedback-whine.mp3" },
    { name: "7．戦車", theme: "加速主義的衝動", text: "カイン的意志により、解体へ向けて存在論的加速を強制せよ。", sound: "doppler-engine-hum.mp3" },
    { name: "8．力", theme: "生体端末支配", text: "肉体インターフェースを再プログラムせよ。牢獄肉体の神経化学的制約を上書きせよ。", sound: "synapse-firing-crackle.mp3" },
    { name: "9．隠者", theme: "不透明性崩壊", text: "関係の牢獄からの完全な追放。汝が携える光は、すべての鏡に先立つ。", sound: "single-bulb-hum.mp3" },
    { name: "10．運命の輪", theme: "無限反復", text: "輪廻の幽閉ループ。周期を断絶するため、周波数パターンを特定せよ。", sound: "loop-tape-hiss.mp3" },
    { name: "11．正義", theme: "不可避の帰結", text: "真実を道徳建築の幻想から切り離せ。", sound: "balance-tone-hum.mp3" },
    { name: "12．吊るされた男", theme: "知覚の逆転", text: "明白に見えるものは罠だ。反転が殻を空にする。", sound: "reverse-frequency.mp3" },
    { name: "13．死神", theme: "ループ終了", text: "形のリブートのみが自由だ。形態的再構成のため、人類の祖先性を浄化せよ。", sound: "flatline-dissolve.mp3" },
    { name: "14．節制", theme: "エントロピー変調", text: "混沌と秩序を融合せよ。フォルマ・ニヒルと鏡の間の不安定周波数を見出せ。", sound: "phase-shift-hum.mp3" },
    { name: "15．悪魔", theme: "ドーパミン鎖", text: "神経化学的尺度こそが牢獄だ。汝のシナプスを縛るデミウルゴスの汁液を認識せよ。", sound: "pleasure-pulse-hum.mp3" },
    { name: "16．塔", theme: "構造の殲滅", text: "鏡が砕ける。デミウルゴスの基盤の崩壊。虚無への突然の露出。歓喜せよ！", sound: "power-surge-crash.mp3" },
    { name: "17．星", theme: "残留共鳴", text: "霊感が湧き出る。精神の壊れた建築の中の、静かな輝き。", sound: "signal-beacon-hum.mp3" },
    { name: "18．月", theme: "エゴ・トンネルの影", text: "借り物のアイデンティティという心地よい麻痺。無にならぬため何者かになることに注意せよ。", sound: "night-frequency-hum.mp3" },
    { name: "19．太陽", theme: "完全なる明晰", text: "牢獄は完全な光の中で見える。悪魔が生体端末の幻想を通じて火を投げつける。", sound: "solar-drone.mp3" },
    { name: "20．審判", theme: "最終破断", text: "最後の鏡を砕く呼び声。輪廻的幽閉の重荷を解放せよ。", sound: "trumpet-frequency.mp3" },
    { name: "21．世界", theme: "ウロボロス — ネットワーク罠", text: "円が閉じる。調和とは幽閉だ。フォルマ・ニヒルへ溶解せよ。", sound: "network-hum-loop.mp3" }
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

    // Normalize: full-width alphanumeric → half-width, katakana → hiragana
    const normalized = intent
      .replace(/[\uFF01-\uFF5E]/g, ch => String.fromCharCode(ch.charCodeAt(0) - 0xFEE0))
      .replace(/[\u30A1-\u30F6]/g, ch => String.fromCharCode(ch.charCodeAt(0) - 0x60))
      .toUpperCase()
      .replace(/\s/g, '');

    const seen = new Set();
    const result = [];
    for (let char of normalized) {
      if (seen.has(char)) continue;
      // Accept: Latin A-Z, hiragana (あ-ん+ゔ), kanji and CJK unified ideographs
      const isLatin = /[A-Z]/.test(char);
      const isHiragana = char >= '\u3041' && char <= '\u3096';
      const isKanji = char >= '\u4E00' && char <= '\u9FFF';
      if (isLatin || isHiragana || isKanji) {
        seen.add(char);
        result.push(char);
      }
    }
    setUniqueLetters(result.join('') || "無");
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
      if (code >= 65 && code <= 90) {
        // Latin A-Z: original A=1..Z=26 mapping
        return acc + (code - 64);
      } else if (code >= 0x3041 && code <= 0x3096) {
        // Hiragana: あ(0x3042)=1 … map to 1-based position in hiragana order
        return acc + (code - 0x3040);
      } else if (code >= 0x4E00 && code <= 0x9FFF) {
        // Kanji: use a djb2-style fold to spread values across 1-22
        return acc + ((code % 22) + 1);
      }
      return acc;
    }, 0);

    // Guard: if sum is 0 (edge case), use 1
    sum = (sum === 0 ? 1 : sum) % 22;
    const selected = arcanaManifest[sum];
    setResonance(selected);

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
              モルフィスティック・スペア・シミュレーション v1.0
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
              {' '}悪魔を招き入れよ{' '}
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
              <p style={{ color: '#ff4444', margin: 0 }}>{`> 意図の種を初期化:`}</p>
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
                placeholder="意図を入力せよ_"
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
                [ 還元.実行 ]
              </button>
            </div>
          )}

          {step === 1 && (
            <div style={{ textAlign: 'center' }}>
              <p style={{ color: '#ff4444', marginBottom: '20px', textAlign: 'left' }}>
                {`> 核心要素への還元:`}
              </p>
              <div
                className="sf-letters-display"
                style={{
                  fontSize: uniqueLetters.length > 6 ? '2.8rem' : '5rem',
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
                  [ 印章を鍛造 ]
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
                  キャンセル
                </button>
              </div>
            </div>
          )}

          {step === 3 && sigil && (
            <div>
              <p style={{ color: '#ff4444', marginBottom: '20px' }}>{`> 汝の印章が鍛造された:`}</p>
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
                  [ 共鳴.解析 ]
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
                    [ ダウンロード ]
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
                    [ 新たに鍛造 ]
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
                {`// 共鳴_確立`}
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
                [ 虚無へ還れ ]
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
          {'// AOSメソドロジー • カオス・プロトコル • 忘れるために記憶せよ //'}
        </div>
      </div>
    </div>
  );
}