import { Link } from "react-router-dom";
import "./Welcome.css";

import woofLogoNav from "../assets/wooflogo_nobackground.png";
import heroMascot from "../assets/wooflogo_3d.png";
import badgeGoldendoodle from "../assets/badges/badge_1_8_goldendoodle.png";
import badgePoodle from "../assets/badges/badge_2_7_poodle.png";
import gameplayMath from "../assets/gameplay_large.png";
import gameplayReading from "../assets/gameplay-reading.png";
import badge_1_1 from "../assets/badges/badge_1_1_bernese.png";
import badge_1_2 from "../assets/badges/badge_1_2_chihuahua.png";
import badge_1_3 from "../assets/badges/badge_1_3_waterdog.png";
import badge_1_4 from "../assets/badges/badge_1_4_boxer.png";
import badge_1_5 from "../assets/badges/badge_1_5_husky.png";
import badge_1_6 from "../assets/badges/badge_1_6_golden.png";
import badge_1_7 from "../assets/badges/badge_1_7_cat.png";
import badge_1_8 from "../assets/badges/badge_1_8_goldendoodle.png";
import badge_2_1 from "../assets/badges/badge_2_1_borderCollie.png";
import badge_2_2 from "../assets/badges/badge_2_2_terrier.png";
import badge_2_3 from "../assets/badges/badge_2_3_australianShepherd.png";
import badge_2_4 from "../assets/badges/badge_2_4_shibaInu.png";
import badge_2_5 from "../assets/badges/badge_2_5_cat.png";
import badge_2_6 from "../assets/badges/badge_2_6_bernese.png";
import badge_2_7 from "../assets/badges/badge_2_7_poodle.png";
import badge_2_8 from "../assets/badges/badge_2_8_golden.png";
import ctaDog from "../assets/welcome_dog_large.png";

function Welcome() {
  return (
    <div className="wl-page">

      {/* NAV */}
      <nav className="nav">
        <Link className="nav-logo" to="/">
          <img src={woofLogoNav} alt="Woof Learning" />
          <span className="nav-logo-text">Woof Learning</span>
        </Link>
        <div className="nav-spacer"></div>
        <Link className="nav-link" to="/about" style={{ marginRight: "8px" }}>About</Link>
        <div className="nav-actions">
          <Link to="/login" className="btn-ghost-sm">Log in</Link>
        </div>
      </nav>

      {/* HERO */}
      <div className="hero">
        <div className="hero-inner">
        <div>
          <div className="hero-eyebrow">
            <i className="ti ti-sparkles" style={{ fontSize: "13px" }}></i>
            Math &middot; Reading &middot; Games for kids
          </div>
          <h1 className="hero-h1">
            Building skills<br />is a journey.<br />
            <em>Make it an adventure.</em>
          </h1>
          <p className="hero-sub">
            Practice math and reading, earn dog badges, track progress, and
            play games with friends and family &mdash; all in one place
            designed for kids.
          </p>
          <div className="hero-btns">
            <Link to="/register" className="btn-hero-primary">Sign up free</Link>
          </div>
          <div className="hero-stats">
            <div>
              <div className="hero-stat-num">32</div>
              <div className="hero-stat-label">dog badges to collect</div>
            </div>
            <div>
              <div className="hero-stat-num">90+</div>
              <div className="hero-stat-label">curated reading topics</div>
            </div>
            <div>
              <div className="hero-stat-num">K&ndash;5+</div>
              <div className="hero-stat-label">reading levels</div>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <img className="hero-mascot" src={heroMascot} alt="Woof Learning mascot" />
          <div className="hero-float points">
            <img src={badgeGoldendoodle} alt="" />
            3,039 pts
          </div>
          <div className="hero-float streak">
            <img src={badgePoodle} alt="" />
            5-day streak!
          </div>
        </div>
        </div>{/* hero-inner */}
      </div>

      {/* FEATURE STRIP */}
      <div className="feature-strip">
        <div className="feature-strip-item">
          <div className="strip-icon math"><i className="ti ti-calculator"></i></div>
          <div>
            <div className="strip-title">Woof Math</div>
            <div className="strip-desc">5 levels &middot; timed challenges &middot; 16 badges</div>
          </div>
        </div>
        <div className="feature-strip-item">
          <div className="strip-icon reading"><i className="ti ti-books"></i></div>
          <div>
            <div className="strip-title">Woof Reading</div>
            <div className="strip-desc">90+ topics &middot; K&ndash;5th+ &middot; AI feedback</div>
          </div>
        </div>
        <div className="feature-strip-item">
          <div className="strip-icon games"><i className="ti ti-cards"></i></div>
          <div>
            <div className="strip-title">Catsino Royale</div>
            <div className="strip-desc">4 games &middot; strategy, memory, vocab, math</div>
          </div>
        </div>
        <div className="feature-strip-item">
          <div className="strip-icon progress"><i className="ti ti-chart-line"></i></div>
          <div>
            <div className="strip-title">Progress Dashboard</div>
            <div className="strip-desc">charts &middot; AI insights &middot; badge tracking</div>
          </div>
        </div>
      </div>

      {/* MATH SECTION */}
      <section className="section s-math">
        <div className="section-inner">
          <div>
            <div className="eyebrow"><i className="ti ti-calculator" style={{ fontSize: "12px" }}></i> Woof Math</div>
            <h2 className="section-h2">Build math skills<br /><em>that actually stick.</em></h2>
            <p className="section-p">
              Practice all four operations at your own pace, or try the 60-second Timed Challenge for an extra rush. Five difficulty levels keep things fresh whether you're just starting out or already a math whiz.
            </p>
            <div className="pill-row">
              <span className="pill">Add</span>
              <span className="pill">Subtract</span>
              <span className="pill">Multiply</span>
              <span className="pill">Divide</span>
            </div>
            <ul className="feature-list">
              <li>
                <div className="fi-icon"><i className="ti ti-layers-intersect"></i></div>
                <div><strong>5 difficulty levels</strong> &mdash; from easier to expert</div>
              </li>
              <li>
                <div className="fi-icon"><i className="ti ti-clock-hour-4"></i></div>
                <div><strong>Timed challenge mode</strong> &mdash; race the 60-second clock</div>
              </li>
              <li>
                <div className="fi-icon"><i className="ti ti-award"></i></div>
                <div><strong>16 badges to collect</strong> across two mastery levels</div>
              </li>
            </ul>
            <Link to="/register" className="section-cta">Try Woof Math <i className="ti ti-arrow-right" style={{ fontSize: "14px" }}></i></Link>
          </div>
          <div className="math-visual">
            <img className="screenshot" src={gameplayMath} alt="Woof Math gameplay" />
          </div>
        </div>
      </section>

      {/* READING SECTION */}
      <section className="section s-reading">
        <div className="section-inner">
          <div>
            <img className="screenshot" src={gameplayReading} alt="Woof Reading interface" />
          </div>
          <div>
            <div className="eyebrow"><i className="ti ti-books" style={{ fontSize: "12px" }}></i> Woof Reading</div>
            <h2 className="section-h2">A new story every time,<br /><em>built around what you love.</em></h2>
            <p className="section-p">
              Pick a topic from 90+ kid-safe ideas &mdash; outer space, sneaky cats, magical wizards &mdash; and choose a story, poem, or ballad. Read it, answer questions, and get feedback that coaches, not just scores.
            </p>
            <div className="pill-row">
              <span className="pill">Story</span>
              <span className="pill">Poem</span>
              <span className="pill">Ballad</span>
            </div>
            <ul className="feature-list">
              <li>
                <div className="fi-icon"><i className="ti ti-list"></i></div>
                <div><strong>90+ curated topics</strong>, all kid-safe and age-appropriate</div>
              </li>
              <li>
                <div className="fi-icon"><i className="ti ti-school"></i></div>
                <div><strong>Reading levels K&ndash;5th+</strong>, adjustable any time</div>
              </li>
              <li>
                <div className="fi-icon"><i className="ti ti-sparkles"></i></div>
                <div><strong>AI-powered feedback</strong> that coaches, not just scores</div>
              </li>
            </ul>
            <Link to="/register" className="section-cta">Try Woof Reading <i className="ti ti-arrow-right" style={{ fontSize: "14px" }}></i></Link>
          </div>
        </div>
      </section>

      {/* CATSINO SECTION */}
      <section className="section s-catsino">
        <div className="section-inner">
          <div>
            <div className="eyebrow"><i className="ti ti-cards" style={{ fontSize: "12px" }}></i> Catsino Royale</div>
            <h2 className="section-h2">Fun games.<br /><em>Sneaky learning.</em></h2>
            <p className="section-p">
              Four quick games designed to be played together &mdash; in the car, at the table, anywhere kids need a fun break. They feel like pure play, but every game sharpens a real skill underneath.
            </p>
            <div className="game-cards">
              <div className="game-card">
                <div className="game-card-head"><i className="ti ti-grid-dots" style={{ color: "#c084fc", fontSize: "15px" }}></i><span className="game-card-name">Connect</span></div>
                <div className="game-card-tag">Strategy</div>
                <div className="game-card-desc">A Connect 4-style game that builds planning and forward-thinking.</div>
              </div>
              <div className="game-card">
                <div className="game-card-head"><i className="ti ti-cards" style={{ color: "#c084fc", fontSize: "15px" }}></i><span className="game-card-name">Card Match</span></div>
                <div className="game-card-tag">Memory</div>
                <div className="game-card-desc">Flip and match &mdash; strengthens short-term memory and focus.</div>
              </div>
              <div className="game-card">
                <div className="game-card-head"><i className="ti ti-letter-w" style={{ color: "#c084fc", fontSize: "15px" }}></i><span className="game-card-name">Word Scramble</span></div>
                <div className="game-card-tag">Vocabulary</div>
                <div className="game-card-desc">Unscramble letters to build spelling and word recognition.</div>
              </div>
              <div className="game-card">
                <div className="game-card-head"><i className="ti ti-basketball" style={{ color: "#c084fc", fontSize: "15px" }}></i><span className="game-card-name">Math-sketball</span></div>
                <div className="game-card-tag">Math Fluency</div>
                <div className="game-card-desc">Sink shots by solving problems &mdash; practice while keeping score.</div>
              </div>
            </div>
          </div>
          <div>
            <div className="catsino-mock">
              <div className="cm-title">🐱 Catsino Royale</div>
              <div className="cm-sub">Choose your game</div>
              <div className="cm-btn"><span className="cm-btn-name">Connect</span><span className="cm-btn-tag">Strategy</span></div>
              <div className="cm-btn"><span className="cm-btn-name">Card Match</span><span className="cm-btn-tag">Memory</span></div>
              <div className="cm-btn"><span className="cm-btn-name">Word Scramble</span><span className="cm-btn-tag">Vocabulary</span></div>
              <div className="cm-btn"><span className="cm-btn-name">Math-sketball</span><span className="cm-btn-tag">Math Fluency</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* BADGES SECTION */}
      <section className="s-badges">
        <div className="eyebrow" style={{ marginBottom: "18px" }}><i className="ti ti-award" style={{ fontSize: "12px" }}></i> Dog Badge Collection</div>
        <h2 className="badges-h2">Earn badges as you <em>level up.</em></h2>
        <p className="badges-sub">
          Practice math and reading to unlock 32 unique dog badges across two mastery levels. Every badge you earn is a real achievement &mdash; can you collect them all?
        </p>
        <div className="badges-level-label">Level 1 Badges</div>
        <div className="badges-row">
          <img className="badge-item" src={badge_1_1} alt="Bernese" />
          <img className="badge-item" src={badge_1_2} alt="Chihuahua" />
          <img className="badge-item" src={badge_1_3} alt="Waterdog" />
          <img className="badge-item" src={badge_1_4} alt="Boxer" />
          <img className="badge-item" src={badge_1_5} alt="Husky" />
          <img className="badge-item" src={badge_1_6} alt="Golden" />
          <img className="badge-item" src={badge_1_7} alt="Cat" />
          <img className="badge-item" src={badge_1_8} alt="Goldendoodle" />
        </div>
        <div className="badges-divider"></div>
        <div className="badges-level-label">Level 2 Badges</div>
        <div className="badges-row">
          <img className="badge-item" src={badge_2_1} alt="Border Collie" />
          <img className="badge-item" src={badge_2_2} alt="Terrier" />
          <img className="badge-item" src={badge_2_3} alt="Australian Shepherd" />
          <img className="badge-item" src={badge_2_4} alt="Shiba Inu" />
          <img className="badge-item" src={badge_2_5} alt="Cat" />
          <img className="badge-item" src={badge_2_6} alt="Bernese" />
          <img className="badge-item" src={badge_2_7} alt="Poodle" />
          <img className="badge-item" src={badge_2_8} alt="Golden" />
        </div>
      </section>

      {/* PROGRESS SECTION */}
      <section className="section s-progress">
        <div className="section-inner">
          <div>
            <div className="progress-panel">
              <div className="pp-header">
                <span className="pp-header-title">📊 Your Progress</span>
                <span className="pp-level">Level 1</span>
              </div>
              <div className="pp-stats">
                <div className="pp-stat">
                  <div className="pp-stat-num">40</div>
                  <div className="pp-stat-label">Challenges</div>
                </div>
                <div className="pp-stat">
                  <div className="pp-stat-num">95%</div>
                  <div className="pp-stat-label">Correct</div>
                </div>
                <div className="pp-stat">
                  <div className="pp-stat-num">2,145</div>
                  <div className="pp-stat-label">Points</div>
                </div>
              </div>
              <div className="pp-feedback">
                <div className="pp-feedback-label">✨ Feedback from your last 10 challenges</div>
                <div className="pp-feedback-text">
                  Fantastic score! You're doing great, but a few multiplication questions
                  (especially 7, 9, 11, and 12) need a little extra practice. Keep it up!
                </div>
              </div>
              <div className="pp-chart">
                <div className="pp-chart-label">Score over time</div>
                <div className="pp-bars">
                  <div className="pp-bar" style={{ height: "28%" }}></div>
                  <div className="pp-bar" style={{ height: "42%" }}></div>
                  <div className="pp-bar" style={{ height: "36%" }}></div>
                  <div className="pp-bar" style={{ height: "58%" }}></div>
                  <div className="pp-bar" style={{ height: "50%" }}></div>
                  <div className="pp-bar" style={{ height: "68%" }}></div>
                  <div className="pp-bar" style={{ height: "63%" }}></div>
                  <div className="pp-bar" style={{ height: "82%" }}></div>
                  <div className="pp-bar" style={{ height: "76%" }}></div>
                  <div className="pp-bar" style={{ height: "96%" }}></div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="eyebrow"><i className="ti ti-chart-line" style={{ fontSize: "12px" }}></i> Progress Dashboard</div>
            <h2 className="section-h2">See how far<br /><em>you've come.</em></h2>
            <p className="section-p">
              Every challenge, every story, every badge &mdash; tracked in one place. Smart feedback points out where to focus next, and charts show exactly how skills are growing over time.
            </p>
            <ul className="feature-list">
              <li>
                <div className="fi-icon"><i className="ti ti-sparkles"></i></div>
                <div><strong>AI-powered feedback</strong> on your last 10 challenges</div>
              </li>
              <li>
                <div className="fi-icon"><i className="ti ti-chart-bar"></i></div>
                <div><strong>Progress charts</strong> for each operation and level</div>
              </li>
              <li>
                <div className="fi-icon"><i className="ti ti-medal"></i></div>
                <div><strong>Badge tracker</strong> across both math and reading</div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* TRUST SECTION */}
      <section className="s-trust">
        <h2 className="trust-h2">Real learning. Real fun. Zero worries.</h2>
        <p className="trust-sub">No ads. No data sharing with third parties. Just learning and fun.</p>
        <div className="trust-grid">
          <div className="trust-card">
            <div className="trust-icon"><i className="ti ti-lock"></i></div>
            <div className="trust-title">Safe by design</div>
            <div className="trust-desc">Curated topics only. No free-text prompts, no ads, and no data sharing with third parties.</div>
          </div>
          <div className="trust-card">
            <div className="trust-icon"><i className="ti ti-adjustments"></i></div>
            <div className="trust-title">Adjustable levels</div>
            <div className="trust-desc">Reading and math difficulty scales from grades K&ndash;5+. Every kid works at their own pace.</div>
          </div>
          <div className="trust-card">
            <div className="trust-icon"><i className="ti ti-award"></i></div>
            <div className="trust-title">Rewarding progress</div>
            <div className="trust-desc">32 dog badges to collect across math and reading. Real achievements, real motivation.</div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <div className="s-cta">
        <div className="cta-content">
          <h2 className="cta-h2">Ready to start the adventure?</h2>
          <p className="cta-sub">Join kids building real math and reading skills through stories, challenges, and games.</p>
          <Link to="/register" className="btn-cta">Sign up free &mdash; it&rsquo;s quick!</Link>
        </div>
        <img className="cta-dog" src={ctaDog} alt="Dog mascot at chalkboard" />
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-logo">
          <img src={woofLogoNav} alt="" />
          <span className="footer-logo-text">Woof Learning</span>
        </div>
        <span className="footer-copy">&copy; 2025 Woof Learning &middot; Built in Illinois</span>
        <div className="footer-links">
          <Link className="footer-link" to="/about">About</Link>
          <a className="footer-link" href="#">Privacy</a>
          <a className="footer-link" href="#">Contact</a>
        </div>
      </footer>

    </div>
  );
}

export default Welcome;
