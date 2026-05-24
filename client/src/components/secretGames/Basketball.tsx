// @ts-nocheck
import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";

// ─── Math question generation ──────────────────────────────────────────────

function getOps(diff) {
  if (diff === 1) return ["+", "+", "-", "-"];
  if (diff === 2) return ["+", "+", "-", "-"];
  if (diff === 3) return ["+", "-", "*"];
  if (diff === 4) return ["+", "-", "*", "*", "/"];
  return ["+", "-", "*", "/", "/"];
}

function makeQuestion(diff) {
  const ops = getOps(diff);
  const op = ops[Math.floor(Math.random() * ops.length)];
  if (op === "+") {
    const max = diff <= 2 ? 20 : diff <= 3 ? 50 : 99;
    const a = Math.floor(Math.random() * max) + 1;
    const b = Math.floor(Math.random() * max) + 1;
    return { q: `${a} + ${b}`, a: a + b };
  }
  if (op === "-") {
    const max = diff <= 2 ? 20 : diff <= 3 ? 50 : 99;
    const a = Math.floor(Math.random() * (max - 1)) + 2;
    const b = Math.floor(Math.random() * (a - 1)) + 1;
    return { q: `${a} − ${b}`, a: a - b };
  }
  if (op === "*") {
    const tableMax = diff <= 3 ? 5 : 10;
    const a = Math.floor(Math.random() * tableMax) + 1;
    const b = Math.floor(Math.random() * tableMax) + 1;
    return { q: `${a} × ${b}`, a: a * b };
  }
  const divisor = Math.floor(Math.random() * 8) + 2;
  const quotient = Math.floor(Math.random() * 9) + 1;
  return { q: `${divisor * quotient} ÷ ${divisor}`, a: quotient };
}

// ─── Constants ─────────────────────────────────────────────────────────────

const CW = 600;
const CH = 420;
const BALL_X = CW / 2;   // 300
const BALL_Y = 372;
const BALL_R = 22;
const HOOP_Y = 148;
const HOOP_RX = 30;
const HOOP_RY = 9;
const NET_H = 32;
const BOARD_W = 88;
const BOARD_H = 52;
const BOARD_CY = 106;
const CLEAN_TOL = 17;       // ball clears rim cleanly: HOOP_RX(30) - ball_r_at_hoop(~13)
const RIM_OUTER = 44;       // outer rim clip: HOOP_RX(30) + ball_r_at_hoop(~13) + 1
const BACKBOARD_PWR = 0.82;
const ATTEMPTS_PER_PLAYER = 5;  // questions each player faces per round

// Hoop movement grows with shots taken in the current round
function hoopConfig(shotCount) {
  const c = Math.min(shotCount, 6);
  const amp = c * 16;
  const period = Math.max(4.2 - c * 0.38, 1.8);
  return { amp, omega: c > 0 ? (2 * Math.PI) / period : 0 };
}

function diffLabel(d) {
  return ["", "Easy", "Medium-Easy", "Medium", "Medium-Hard", "Hard"][d];
}
function diffDesc(d) {
  return [
    "",
    "Addition & subtraction — small numbers",
    "Addition & subtraction — larger numbers",
    "Addition, subtraction & multiplication",
    "All operations including division",
    "Challenging mix of all operations",
  ][d];
}
function shotResultLabel(made, type) {
  if (made) {
    if (type === "backboard") return "🏀 OFF THE GLASS!";
    if (type === "rim") return "🏀 RATTLES IN!";
    return "🏀 SWISH!";
  }
  if (type === "backboard") return "😬 OFF THE BOARD!";
  if (type === "rim") return "😬 RATTLES OUT!";
  return "😬 MISSED!";
}

// ─── Canvas drawing ─────────────────────────────────────────────────────────

function drawBall(ctx, x, y, r) {
  ctx.save();
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = "#e05c00";
  ctx.fill();
  ctx.strokeStyle = "#1a1a1a";
  ctx.lineWidth = Math.max(1, r * 0.055);
  ctx.stroke();
  ctx.beginPath();
  ctx.ellipse(x, y, r * 0.97, r * 0.37, 0, 0, Math.PI * 2);
  ctx.strokeStyle = "#1a1a1a";
  ctx.lineWidth = Math.max(0.7, r * 0.048);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x, y - r);
  ctx.lineTo(x, y + r);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(x - r * 0.32, y, r * 0.61, -Math.PI * 0.5, Math.PI * 0.5);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(x + r * 0.32, y, r * 0.61, Math.PI * 0.5, -Math.PI * 0.5);
  ctx.stroke();
  ctx.restore();
}

// aimTarget: { x: number (absolute, fixed), power: number, hoopX: number (live) }
// hitFlash:  { type: 'rim'|'board', alpha: 0..1 } | null
function drawScene(ctx, hoopOffset, bx, by, br, aimTarget, hitFlash) {
  ctx.clearRect(0, 0, CW, CH);

  // ── Arena ──
  ctx.fillStyle = "#1a1a2e";
  ctx.fillRect(0, 0, CW, CH);
  ctx.fillStyle = "#111122";
  ctx.beginPath();
  ctx.moveTo(0, 0); ctx.lineTo(0, CH); ctx.lineTo(148, 195); ctx.lineTo(148, 0);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(CW, 0); ctx.lineTo(CW, CH); ctx.lineTo(452, 195); ctx.lineTo(452, 0);
  ctx.fill();

  // ── Court floor ──
  ctx.beginPath();
  ctx.moveTo(0, CH); ctx.lineTo(CW, CH); ctx.lineTo(452, 195); ctx.lineTo(148, 195);
  ctx.closePath();
  ctx.fillStyle = "#c8954a";
  ctx.fill();
  ctx.strokeStyle = "rgba(0,0,0,0.12)"; ctx.lineWidth = 1;
  for (let i = 1; i < 7; i++) {
    const t = i / 7;
    const y = 195 + (CH - 195) * t;
    ctx.beginPath();
    ctx.moveTo(148 + (0 - 148) * t, y);
    ctx.lineTo(452 + (CW - 452) * t, y);
    ctx.stroke();
  }
  ctx.strokeStyle = "rgba(0,0,0,0.07)";
  for (let i = 1; i < 5; i++) {
    ctx.beginPath(); ctx.moveTo(300, 195); ctx.lineTo((CW * i) / 5, CH); ctx.stroke();
  }
  ctx.beginPath();
  ctx.moveTo(210, CH); ctx.lineTo(390, CH); ctx.lineTo(335, 195); ctx.lineTo(265, 195);
  ctx.closePath(); ctx.fillStyle = "#a06030"; ctx.fill();
  ctx.strokeStyle = "#fff"; ctx.lineWidth = 2; ctx.stroke();
  ctx.beginPath(); ctx.moveTo(148, 195); ctx.lineTo(0, CH); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(452, 195); ctx.lineTo(CW, CH); ctx.stroke();
  ctx.beginPath();
  ctx.ellipse(300, 195, 55, 10, 0, Math.PI, 0, true);
  ctx.strokeStyle = "rgba(255,255,255,0.4)"; ctx.lineWidth = 1.5;
  ctx.setLineDash([4, 4]); ctx.stroke(); ctx.setLineDash([]);

  // ── Backboard ──
  const boardX = CW / 2 + hoopOffset;
  const hoopX = boardX;
  ctx.fillStyle = "#555";
  ctx.fillRect(boardX - 3, BOARD_CY + BOARD_H / 2, 6, 22);
  const boardAlpha = hitFlash?.type === "board" ? hitFlash.alpha : 0;
  ctx.fillStyle = boardAlpha > 0
    ? `rgb(${Math.round(235 + 20 * boardAlpha)},${Math.round(235 - 60 * boardAlpha)},${Math.round(235 - 130 * boardAlpha)})`
    : "#ebebeb";
  ctx.fillRect(boardX - BOARD_W / 2, BOARD_CY - BOARD_H / 2, BOARD_W, BOARD_H);
  ctx.strokeStyle = "#222"; ctx.lineWidth = 2;
  ctx.strokeRect(boardX - BOARD_W / 2, BOARD_CY - BOARD_H / 2, BOARD_W, BOARD_H);
  ctx.strokeStyle = "#e03030"; ctx.lineWidth = 1.5;
  ctx.strokeRect(boardX - 18, BOARD_CY + BOARD_H / 2 - 25, 36, 20);

  // ── Hoop & net ──
  const rimAlpha = hitFlash?.type === "rim" ? hitFlash.alpha : 0;
  const backRimColor = rimAlpha > 0
    ? `rgba(255,${Math.round(80 + 120 * rimAlpha)},0,1)` : "#b84000";
  const frontRimColor = rimAlpha > 0
    ? `rgba(255,${Math.round(130 + 125 * rimAlpha)},${Math.round(60 * rimAlpha)},1)` : "#ff6800";

  ctx.beginPath();
  ctx.ellipse(hoopX, HOOP_Y, HOOP_RX, HOOP_RY, 0, Math.PI, 0, false);
  ctx.strokeStyle = backRimColor; ctx.lineWidth = 4; ctx.stroke();

  const netBotSpread = HOOP_RX * 0.35;
  ctx.strokeStyle = "rgba(255,255,255,0.55)"; ctx.lineWidth = 1;
  for (let i = 0; i <= 8; i++) {
    const angle = (i / 8) * Math.PI;
    const tx = hoopX + Math.cos(Math.PI - angle) * HOOP_RX;
    const ty = HOOP_Y + Math.sin(Math.PI - angle) * HOOP_RY;
    const nbx = hoopX + ((i / 8) * 2 - 1) * netBotSpread;
    ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(nbx, HOOP_Y + NET_H); ctx.stroke();
  }
  for (let row = 1; row <= 3; row++) {
    const t = row / 4;
    ctx.beginPath();
    for (let i = 0; i <= 8; i++) {
      const angle = (i / 8) * Math.PI;
      const tx = hoopX + Math.cos(Math.PI - angle) * HOOP_RX;
      const ty = HOOP_Y + Math.sin(Math.PI - angle) * HOOP_RY;
      const nbx = hoopX + ((i / 8) * 2 - 1) * netBotSpread;
      const px = tx + (nbx - tx) * t;
      const py = ty + (HOOP_Y + NET_H - ty) * t;
      if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.stroke();
  }
  ctx.beginPath();
  ctx.ellipse(hoopX, HOOP_Y, HOOP_RX, HOOP_RY, 0, 0, Math.PI, false);
  ctx.strokeStyle = frontRimColor; ctx.lineWidth = 4; ctx.stroke();

  // ── Aim preview arc ──
  // aimTarget.x is the FIXED absolute target (where the user dragged to)
  // aimTarget.hoopX is the LIVE hoop position — used only for the alignment dot color
  if (aimTarget && aimTarget.power > 0.12) {
    const arcH = aimTarget.power * 220;
    ctx.setLineDash([4, 5]);
    ctx.strokeStyle = "rgba(255,230,80,0.55)"; ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i <= 28; i++) {
      const t = i / 28;
      const px = BALL_X + (aimTarget.x - BALL_X) * t;
      const py = BALL_Y + (HOOP_Y - BALL_Y) * t - arcH * Math.sin(Math.PI * t);
      if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.stroke(); ctx.setLineDash([]);
    // Dot at hoop height on the fixed aim line — green when aligned with moving hoop
    const aligned = Math.abs(aimTarget.x - aimTarget.hoopX) < CLEAN_TOL;
    ctx.beginPath();
    ctx.arc(aimTarget.x, HOOP_Y, 6, 0, Math.PI * 2);
    ctx.fillStyle = aligned ? "rgba(80,255,80,0.8)" : "rgba(255,80,80,0.75)";
    ctx.fill();
  }

  // ── Ball ──
  drawBall(ctx, bx, by, br);
}

// ─── Scoreboard component (defined outside to avoid recreation on re-render) ──

function Scoreboard({ names, roundPoints, playerAttempts, roundWins, totalRound, currentPlayer }) {
  return (
    <div className="bball-scoreboard">
      <div className={`bball-sb-team ${currentPlayer === 0 ? "active-team" : ""}`}>
        <div className="bball-sb-name">{names[0].toUpperCase()}</div>
        <div className="bball-sb-digit-box">
          <span className="bball-sb-digit">{roundPoints[0]}</span>
        </div>
        <div className="bball-sb-attempts">{playerAttempts[0]}/{ATTEMPTS_PER_PLAYER}</div>
        <div className="bball-sb-wins">{roundWins[0]} {roundWins[0] === 1 ? "Win" : "Wins"}</div>
      </div>
      <div className="bball-sb-center">
        <div className="bball-sb-rd">RD {totalRound}</div>
        <div className="bball-sb-to5">5 SHOTS</div>
      </div>
      <div className={`bball-sb-team ${currentPlayer === 1 ? "active-team" : ""}`}>
        <div className="bball-sb-name">{names[1].toUpperCase()}</div>
        <div className="bball-sb-digit-box">
          <span className="bball-sb-digit">{roundPoints[1]}</span>
        </div>
        <div className="bball-sb-attempts">{playerAttempts[1]}/{ATTEMPTS_PER_PLAYER}</div>
        <div className="bball-sb-wins">{roundWins[1]} {roundWins[1] === 1 ? "Win" : "Wins"}</div>
      </div>
    </div>
  );
}

// ─── Main component ─────────────────────────────────────────────────────────

export default function Basketball() {
  const [difficulty, setDifficulty] = useState(3);
  const [names, setNames] = useState(["Player 1", "Player 2"]);
  const [phase, setPhase] = useState("setup");
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [roundPoints, setRoundPoints] = useState([0, 0]);   // baskets made this round
  const [playerAttempts, setPlayerAttempts] = useState([0, 0]); // questions faced this round
  const [roundWins, setRoundWins] = useState([0, 0]);
  const [totalRound, setTotalRound] = useState(1);
  const [roundWinner, setRoundWinner] = useState(0);
  const [currentQ, setCurrentQ] = useState({ q: "", a: 0 });
  const [userAnswer, setUserAnswer] = useState("");
  const [answeredCorrect, setAnsweredCorrect] = useState(null);
  const [shotMade, setShotMade] = useState(null);
  const [shotType, setShotType] = useState("clean");

  // Canvas refs
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const hoopOffsetRef = useRef(0);
  const hoopTimeRef = useRef(0);
  const dragRef = useRef({ active: false, mx: BALL_X, my: BALL_Y });
  const hitFlashRef = useRef(null);
  // Multi-phase shot: { active, phase(1|2), t, p1, p2, made, type }
  // Each phase: { fromX, fromY, toX, toY, arcH, fromR, toR, speed }
  const shotRef = useRef(null);

  // Mutable refs for synchronous reads in advanceTurn (avoid stale closures)
  const roundPointsRef = useRef([0, 0]);
  const playerAttemptsRef = useRef([0, 0]);
  const roundShotCountRef = useRef(0); // drives hoop movement within round

  // Stable refs
  const phaseRef = useRef(phase);
  phaseRef.current = phase;
  const difficultyRef = useRef(difficulty);
  difficultyRef.current = difficulty;
  const currentPlayerRef = useRef(currentPlayer);
  currentPlayerRef.current = currentPlayer;

  // ── Animation loop ──────────────────────────────────────────────────────

  const startLoop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let last = performance.now();

    function loop(now) {
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;

      // Hoop oscillation — grows with each shot attempt this round
      const { amp, omega } = hoopConfig(roundShotCountRef.current);
      if (omega > 0) {
        hoopTimeRef.current += dt;
        hoopOffsetRef.current = amp * Math.sin(hoopTimeRef.current * omega);
      } else {
        hoopOffsetRef.current = 0;
      }

      // Fade hit flash
      if (hitFlashRef.current) {
        hitFlashRef.current.alpha -= dt * 3.5;
        if (hitFlashRef.current.alpha <= 0) hitFlashRef.current = null;
      }

      // Advance shot animation
      const shot = shotRef.current;
      if (shot?.active) {
        const curPhase = shot.phase === 1 ? shot.p1 : shot.p2;
        shot.t += dt * curPhase.speed;
        if (shot.t >= 1) {
          shot.t = 1;
          if (shot.phase === 1 && shot.p2) {
            // Transition to bounce phase
            shot.phase = 2;
            shot.t = 0;
            hitFlashRef.current = {
              type: shot.type === "backboard" ? "board" : "rim",
              alpha: 1.0,
            };
          } else {
            // Shot complete
            shot.active = false;
            setShotMade(shot.made);
            setShotType(shot.type);
            setPhase("shotResult");
          }
        }
      }

      // Ball position
      let bx = BALL_X, by = BALL_Y, br = BALL_R;
      if (shot && (shot.active || shot.t > 0)) {
        const p = shot.phase === 1 ? shot.p1 : (shot.p2 ?? shot.p1);
        const t = shot.t;
        bx = p.fromX + (p.toX - p.fromX) * t;
        by = p.fromY + (p.toY - p.fromY) * t - p.arcH * Math.sin(Math.PI * t);
        br = p.fromR + (p.toR - p.fromR) * t;
      }

      // Aim preview — x is FIXED to where the user dragged (independent of hoop movement)
      // hoopX is live and only used to color the alignment dot
      let aimTarget = null;
      if (dragRef.current.active && phaseRef.current === "shooting" && !shot?.active) {
        const dy = BALL_Y - dragRef.current.my;
        const dx = dragRef.current.mx - BALL_X;
        const power = Math.max(0, Math.min(1, dy / 175));
        const fixedTargetX = BALL_X + dx * 0.85;  // absolute — does not move with hoop
        const liveHoopX = CW / 2 + hoopOffsetRef.current;
        aimTarget = { x: fixedTargetX, power, hoopX: liveHoopX };
      }

      drawScene(ctx, hoopOffsetRef.current, bx, by, br, aimTarget, hitFlashRef.current);
      rafRef.current = requestAnimationFrame(loop);
    }

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  useEffect(() => {
    if (phase === "shooting" || phase === "shotResult") {
      return startLoop();
    }
    cancelAnimationFrame(rafRef.current);
  }, [phase, startLoop]);

  // ── Mouse / touch ───────────────────────────────────────────────────────

  function canvasCoords(e) {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const sx = CW / rect.width, sy = CH / rect.height;
    if ("touches" in e && e.touches.length > 0) {
      return {
        x: (e.touches[0].clientX - rect.left) * sx,
        y: (e.touches[0].clientY - rect.top) * sy,
      };
    }
    return { x: (e.clientX - rect.left) * sx, y: (e.clientY - rect.top) * sy };
  }

  function tryRelease(mx, my) {
    dragRef.current.active = false;
    const dy = BALL_Y - my;
    const dx = mx - BALL_X;
    const power = Math.max(0, Math.min(1, dy / 175));
    if (power < 0.15) return;

    // Fixed absolute target — where the user aimed (does NOT move with the hoop)
    const targetX = BALL_X + dx * 0.85;
    const arcH = power * 220;

    // Hoop position captured at the moment of release — scoring is fair to where
    // the hoop actually IS right now, not where it was when the drag started
    const hoopX = CW / 2 + hoopOffsetRef.current;
    const absAim = Math.abs(targetX - hoopX);
    const aimDir = targetX >= hoopX ? 1 : -1;

    let shot;

    if (power > BACKBOARD_PWR && absAim <= RIM_OUTER) {
      // ── Backboard bank ──────────────────────────────────────────────────
      const impactX = hoopX + (targetX - hoopX) * 0.35;
      // Chance decays linearly from 70% (dead center) to 20% (outer rim)
      const chanceIn = Math.max(0.20, 0.70 - 0.50 * (absAim / RIM_OUTER));
      const made = Math.random() < chanceIn;
      const finalX = made ? hoopX : hoopX + aimDir * 68;
      const finalY = made ? HOOP_Y + 10 : HOOP_Y + 88;
      shot = {
        active: true, phase: 1, t: 0, type: "backboard", made,
        p1: { fromX: BALL_X, fromY: BALL_Y, toX: impactX, toY: BOARD_CY,
              arcH: arcH * 0.52, fromR: BALL_R, toR: 11, speed: 0.70 },
        p2: { fromX: impactX, fromY: BOARD_CY, toX: finalX, toY: finalY,
              arcH: made ? 20 : 30, fromR: 11, toR: made ? 13 : 18, speed: 1.1 },
      };
    } else if (absAim < CLEAN_TOL && power >= 0.30 && power <= BACKBOARD_PWR) {
      // ── Clean make ─────────────────────────────────────────────────────
      shot = {
        active: true, phase: 1, t: 0, type: "clean", made: true, p2: null,
        p1: { fromX: BALL_X, fromY: BALL_Y, toX: hoopX, toY: HOOP_Y,
              arcH, fromR: BALL_R, toR: 12, speed: 0.85 },
      };
    } else if (absAim >= CLEAN_TOL && absAim <= RIM_OUTER && power >= 0.26 && power <= BACKBOARD_PWR) {
      // ── Rim bounce ─────────────────────────────────────────────────────
      const rimEdgeX = hoopX + aimDir * HOOP_RX * 0.88;
      // Chance decays linearly from 45% (just inside rim) to 5% (outer edge)
      const chanceIn = Math.max(0.05, 0.45 - 0.40 * (absAim - CLEAN_TOL) / (RIM_OUTER - CLEAN_TOL));
      const made = Math.random() < chanceIn;
      const finalX = made ? hoopX : hoopX + aimDir * 74;
      const finalY = made ? HOOP_Y + 12 : HOOP_Y + 88;
      shot = {
        active: true, phase: 1, t: 0, type: "rim", made,
        p1: { fromX: BALL_X, fromY: BALL_Y, toX: rimEdgeX, toY: HOOP_Y,
              arcH, fromR: BALL_R, toR: 13, speed: 0.85 },
        p2: { fromX: rimEdgeX, fromY: HOOP_Y, toX: finalX, toY: finalY,
              arcH: made ? 14 : 34, fromR: 13, toR: made ? 13 : 18, speed: 1.3 },
      };
    } else {
      // ── Clean miss ─────────────────────────────────────────────────────
      const missY = power < 0.28
        ? BALL_Y - Math.max(dy * 1.3, 60)   // falls short in court
        : HOOP_Y + 45;                       // sails wide of hoop
      shot = {
        active: true, phase: 1, t: 0, type: "clean", made: false, p2: null,
        p1: { fromX: BALL_X, fromY: BALL_Y, toX: targetX, toY: missY,
              arcH: power * 155, fromR: BALL_R, toR: 15, speed: 0.85 },
      };
    }

    shotRef.current = shot;
  }

  const onMouseDown = (e) => {
    if (phase !== "shooting" || shotRef.current?.active) return;
    const { x, y } = canvasCoords(e.nativeEvent);
    if (Math.hypot(x - BALL_X, y - BALL_Y) < BALL_R * 3) {
      dragRef.current = { active: true, mx: x, my: y };
    }
  };
  const onMouseMove = (e) => {
    if (!dragRef.current.active) return;
    const { x, y } = canvasCoords(e.nativeEvent);
    dragRef.current.mx = x; dragRef.current.my = y;
  };
  const onMouseUp = (e) => {
    if (!dragRef.current.active || phase !== "shooting") return;
    const { x, y } = canvasCoords(e.nativeEvent);
    tryRelease(x, y);
  };
  const onTouchStart = (e) => {
    if (phase !== "shooting" || shotRef.current?.active) return;
    const { x, y } = canvasCoords(e.nativeEvent);
    if (Math.hypot(x - BALL_X, y - BALL_Y) < BALL_R * 3.5) {
      dragRef.current = { active: true, mx: x, my: y };
    }
  };
  const onTouchMove = (e) => {
    if (!dragRef.current.active) return;
    e.preventDefault();
    const { x, y } = canvasCoords(e.nativeEvent);
    dragRef.current.mx = x; dragRef.current.my = y;
  };
  const onTouchEnd = () => {
    if (!dragRef.current.active || phase !== "shooting") return;
    tryRelease(dragRef.current.mx, dragRef.current.my);
  };

  // ── Shot result → advance turn ──────────────────────────────────────────

  useEffect(() => {
    if (phase !== "shotResult" || shotMade === null) return;
    const player = currentPlayerRef.current;
    const made = shotMade;
    const timer = setTimeout(() => {
      advanceTurn(player, made, true);
      setShotMade(null);
    }, 1600);
    return () => clearTimeout(timer);
  }, [phase, shotMade]);

  // ── Game logic ──────────────────────────────────────────────────────────

  // wasShot: true when the player took a shot (drives hoop speed; wrong answers don't count)
  function advanceTurn(player, scored, wasShot = false) {
    if (wasShot) roundShotCountRef.current += 1;

    // Synchronous mutation of refs for immediate reads in this call
    if (scored) roundPointsRef.current[player]++;
    playerAttemptsRef.current[player]++;

    const pts = [roundPointsRef.current[0], roundPointsRef.current[1]];
    const atts = [playerAttemptsRef.current[0], playerAttemptsRef.current[1]];

    setRoundPoints([...pts]);
    setPlayerAttempts([...atts]);

    const bothDone = atts[0] >= ATTEMPTS_PER_PLAYER && atts[1] >= ATTEMPTS_PER_PLAYER;

    if (bothDone) {
      if (pts[0] !== pts[1]) {
        // Clear winner
        const winner = pts[0] > pts[1] ? 0 : 1;
        setRoundWins((w) => { const nw = [w[0], w[1]]; nw[winner]++; return nw; });
        setTotalRound((r) => r + 1);
        roundShotCountRef.current = 0;
        setRoundWinner(winner);
        setCurrentPlayer(winner);
        setPhase("roundOver");
      } else {
        // Tie → sudden death: each gets one more question
        playerAttemptsRef.current[0] = ATTEMPTS_PER_PLAYER - 1;
        playerAttemptsRef.current[1] = ATTEMPTS_PER_PLAYER - 1;
        setPlayerAttempts([ATTEMPTS_PER_PLAYER - 1, ATTEMPTS_PER_PLAYER - 1]);
        const nextPlayer = player === 0 ? 1 : 0;
        setCurrentPlayer(nextPlayer);
        setCurrentQ(makeQuestion(difficultyRef.current));
        setUserAnswer("");
        setAnsweredCorrect(null);
        setPhase("question");
      }
    } else {
      // Alternate, but skip a player who has used all their attempts
      const other = player === 0 ? 1 : 0;
      const nextPlayer = atts[other] < ATTEMPTS_PER_PLAYER ? other : player;
      setCurrentPlayer(nextPlayer);
      setCurrentQ(makeQuestion(difficultyRef.current));
      setUserAnswer("");
      setAnsweredCorrect(null);
      setPhase("question");
    }
  }

  function startGame() {
    roundPointsRef.current = [0, 0];
    playerAttemptsRef.current = [0, 0];
    roundShotCountRef.current = 0;
    hoopTimeRef.current = 0;
    setPhase("question");
    setCurrentPlayer(0);
    setRoundPoints([0, 0]);
    setPlayerAttempts([0, 0]);
    setRoundWins([0, 0]);
    setTotalRound(1);
    setRoundWinner(0);
    setCurrentQ(makeQuestion(difficulty));
    setUserAnswer("");
    setAnsweredCorrect(null);
  }

  function handleAnswer(e) {
    e?.preventDefault();
    const num = parseInt(userAnswer, 10);
    if (isNaN(num)) return;
    if (num === currentQ.a) {
      setAnsweredCorrect(true);
      setTimeout(() => {
        shotRef.current = null;
        dragRef.current = { active: false, mx: BALL_X, my: BALL_Y };
        setPhase("shooting");
      }, 700);
    } else {
      setAnsweredCorrect(false);
      setTimeout(() => {
        advanceTurn(currentPlayer, false, false); // wrong answer — no shot taken
      }, 1400);
    }
  }

  function startNextRound() {
    roundPointsRef.current = [0, 0];
    playerAttemptsRef.current = [0, 0];
    roundShotCountRef.current = 0;
    hoopTimeRef.current = 0;
    const nextPlayer = roundWinner === 0 ? 1 : 0;
    setRoundPoints([0, 0]);
    setPlayerAttempts([0, 0]);
    setCurrentPlayer(nextPlayer);
    setCurrentQ(makeQuestion(difficulty));
    setUserAnswer("");
    setAnsweredCorrect(null);
    setPhase("question");
  }

  // ── Shared scoreboard props ─────────────────────────────────────────────

  const sbProps = { names, roundPoints, playerAttempts, roundWins, totalRound, currentPlayer };

  // ── Render ──────────────────────────────────────────────────────────────

  if (phase === "setup") {
    return (
      <div className="bball-page">
        <div className="bball-setup-card">
          <div className="bball-logo">🏀</div>
          <h1 className="bball-title">Math Basketball</h1>
          <p className="bball-subtitle">Each player gets 5 shots — most baskets wins!</p>
          <div className="bball-field">
            <label className="bball-label">Player 1</label>
            <input className="bball-input" value={names[0]}
              onChange={(e) => setNames([e.target.value, names[1]])} placeholder="Player 1" />
          </div>
          <div className="bball-field">
            <label className="bball-label">Player 2</label>
            <input className="bball-input" value={names[1]}
              onChange={(e) => setNames([names[0], e.target.value])} placeholder="Player 2" />
          </div>
          <div className="bball-field">
            <label className="bball-label">
              Difficulty — <span className="bball-diff-name">{diffLabel(difficulty)}</span>
            </label>
            <div className="bball-diff-row">
              {[1, 2, 3, 4, 5].map((d) => (
                <button key={d}
                  className={`bball-diff-btn ${difficulty === d ? "active" : ""}`}
                  onClick={() => setDifficulty(d)}>{d}</button>
              ))}
            </div>
            <p className="bball-diff-desc">{diffDesc(difficulty)}</p>
          </div>
          <button className="bball-primary-btn" onClick={startGame}>Start Game</button>
          <Link to="/secretGames" className="bball-back-link">← Back to games</Link>
        </div>
      </div>
    );
  }

  if (phase === "roundOver") {
    return (
      <div className="bball-page">
        <div className="bball-round-card">
          <div className="bball-trophy">🏆</div>
          <h2 className="bball-round-title">{names[roundWinner]} wins the round!</h2>
          <div className="bball-scores">
            <div className={`bball-score-box ${roundWinner === 0 ? "winner" : ""}`}>
              <span className="bball-score-name">{names[0]}</span>
              <span className="bball-score-val">
                {roundWins[0]} round{roundWins[0] !== 1 ? "s" : ""}
              </span>
            </div>
            <div className="bball-score-vs">vs</div>
            <div className={`bball-score-box ${roundWinner === 1 ? "winner" : ""}`}>
              <span className="bball-score-name">{names[1]}</span>
              <span className="bball-score-val">
                {roundWins[1]} round{roundWins[1] !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
          <p className="bball-round-note">Round {totalRound} — hoop starts fresh</p>
          <button className="bball-primary-btn" onClick={startNextRound}>Play Next Round</button>
          <Link to="/secretGames" className="bball-end-game">End Game</Link>
        </div>
      </div>
    );
  }

  if (phase === "question") {
    return (
      <div className="bball-page">
        <Scoreboard {...sbProps} />
        <div className="bball-question-card">
          <p className="bball-whose-turn">{names[currentPlayer]}'s turn</p>
          <p className="bball-cta">Answer correctly to earn your shot!</p>
          <div className="bball-question-display">{currentQ.q} = ?</div>
          {answeredCorrect === null && (
            <form className="bball-answer-form" onSubmit={handleAnswer}>
              <input className="bball-answer-input" type="number" value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)} autoFocus placeholder="?" />
              <button className="bball-submit-btn" type="submit">Submit</button>
            </form>
          )}
          {answeredCorrect === true && (
            <p className="bball-feedback correct">✓ Correct! Get ready to shoot...</p>
          )}
          {answeredCorrect === false && (
            <p className="bball-feedback wrong">✗ Nope — the answer was {currentQ.a}</p>
          )}
        </div>
        <Link to="/secretGames" className="bball-end-game">End Game</Link>
      </div>
    );
  }

  // shooting | shotResult
  return (
    <div className="bball-page shooting-page">
      <Scoreboard {...sbProps} />
      <p className="bball-shoot-label">{names[currentPlayer]} — take your shot!</p>
      <div className="bball-canvas-wrap">
        <canvas ref={canvasRef} width={CW} height={CH} className="bball-canvas"
          onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp}
          onMouseLeave={() => { dragRef.current.active = false; }}
          onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}
        />
        {phase === "shooting" && (
          <p className="bball-hint">Drag the ball upward to shoot · aim left/right for the hoop</p>
        )}
        {phase === "shotResult" && shotMade !== null && (
          <div className={`bball-result-overlay ${shotMade ? "made" : "missed"}`}>
            {shotResultLabel(shotMade, shotType)}
          </div>
        )}
      </div>
      <Link to="/secretGames" className="bball-end-game">End Game</Link>
    </div>
  );
}
