import { useState, useEffect, useRef } from "react";

const PROVIDERS = {
  spotify: {
    id: "spotify", name: "Spotify", color: "#1DB954", bg: "#121212", textColor: "#000",
    loginBg: "#121212", loginAccent: "#1DB954",
    fields: [{ key: "email", label: "Email or username", type: "email" }, { key: "password", label: "Password", type: "password" }],
    icon: <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>,
  },
  apple: {
    id: "apple", name: "Apple Music", color: "#fc3c44", bg: "#1c1c1e", textColor: "#fff",
    loginBg: "#1c1c1e", loginAccent: "#fc3c44",
    fields: [{ key: "email", label: "Apple ID", type: "email" }, { key: "password", label: "Password", type: "password" }],
    icon: <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701z"/></svg>,
  },
  youtube: {
    id: "youtube", name: "YouTube Music", color: "#FF0000", bg: "#0f0f0f", textColor: "#fff",
    loginBg: "#202124", loginAccent: "#FF0000",
    fields: [{ key: "email", label: "Email or phone", type: "email" }, { key: "password", label: "Password", type: "password" }],
    icon: <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg>,
  },
  tidal: {
    id: "tidal", name: "Tidal", color: "#00FFFF", bg: "#000", textColor: "#000",
    loginBg: "#000", loginAccent: "#00FFFF",
    fields: [{ key: "email", label: "Email address", type: "email" }, { key: "password", label: "Password", type: "password" }],
    icon: <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M12.012 3.992L8.008 7.996 4.004 3.992 0 7.996l4.004 4.004 4.004-4.004 4.004 4.004 4.004-4.004zm4.004 4.004l-4.004 4.004 4.004 4.004L20.016 12zm-8.008 0l-4.004 4.004 4.004 4.004L12.012 12zM8.008 16.004L4.004 20.008 0 16.004l4.004-4.004zm8.008 0l-4.004 4.004-4.004-4.004 4.004-4.004z"/></svg>,
  },
};

const MOCK_PLAYLISTS = {
  spotify: [
    { id: "sp1", name: "Chill Vibes 🌊", tracks: 42, duration: "2h 34m", cover: "https://picsum.photos/seed/sp1/80/80" },
    { id: "sp2", name: "Morning Run ☀️", tracks: 28, duration: "1h 48m", cover: "https://picsum.photos/seed/sp2/80/80" },
    { id: "sp3", name: "Late Night Study", tracks: 67, duration: "4h 12m", cover: "https://picsum.photos/seed/sp3/80/80" },
    { id: "sp4", name: "Road Trip Anthems 🚗", tracks: 55, duration: "3h 20m", cover: "https://picsum.photos/seed/sp4/80/80" },
    { id: "sp5", name: "90s Throwback", tracks: 89, duration: "5h 01m", cover: "https://picsum.photos/seed/sp5/80/80" },
  ],
  apple: [
    { id: "ap1", name: "Workout Mix 💪", tracks: 33, duration: "2h 05m", cover: "https://picsum.photos/seed/ap1/80/80" },
    { id: "ap2", name: "Jazz Essentials", tracks: 48, duration: "3h 15m", cover: "https://picsum.photos/seed/ap2/80/80" },
    { id: "ap3", name: "Indie Discoveries", tracks: 61, duration: "3h 48m", cover: "https://picsum.photos/seed/ap3/80/80" },
    { id: "ap4", name: "Classical Focus", tracks: 22, duration: "1h 30m", cover: "https://picsum.photos/seed/ap4/80/80" },
  ],
  youtube: [
    { id: "yt1", name: "Lo-fi Hip Hop 🎧", tracks: 120, duration: "8h 00m", cover: "https://picsum.photos/seed/yt1/80/80" },
    { id: "yt2", name: "Electronic Beats", tracks: 44, duration: "2h 48m", cover: "https://picsum.photos/seed/yt2/80/80" },
    { id: "yt3", name: "Acoustic Sessions", tracks: 31, duration: "1h 55m", cover: "https://picsum.photos/seed/yt3/80/80" },
  ],
  tidal: [
    { id: "td1", name: "HiFi Audiophile 🎵", tracks: 50, duration: "3h 20m", cover: "https://picsum.photos/seed/td1/80/80" },
    { id: "td2", name: "Exclusive Drops", tracks: 18, duration: "1h 10m", cover: "https://picsum.photos/seed/td2/80/80" },
  ],
};

function LoginModal({ providerId, onSuccess, onClose }) {
  const p = PROVIDERS[providerId];
  const [fields, setFields] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPw, setShowPw] = useState(false);

  const submit = () => {
    if (!fields.email || !fields.password) { setError("Please fill in all fields."); return; }
    if (!fields.email.includes("@")) { setError("Enter a valid email address."); return; }
    if (fields.password.length < 4) { setError("Password must be at least 4 characters."); return; }
    setError(""); setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess({ providerId, email: fields.email, avatar: `https://i.pravatar.cc/40?u=${fields.email}${providerId}` });
    }, 1800);
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(0,0,0,0.88)", backdropFilter: "blur(10px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        width: "100%", maxWidth: 360,
        background: p.loginBg, border: `1px solid ${p.color}25`,
        borderRadius: 22, overflow: "hidden",
        boxShadow: `0 40px 80px rgba(0,0,0,0.85), 0 0 0 1px ${p.color}15`,
        animation: "slideUp 0.22s ease",
      }}>
        <div style={{ padding: "26px 26px 18px", borderBottom: `1px solid ${p.color}12`, textAlign: "center" }}>
          <div style={{ width: 50, height: 50, borderRadius: 14, margin: "0 auto 12px", background: `${p.color}20`, border: `1.5px solid ${p.color}45`, display: "flex", alignItems: "center", justifyContent: "center", color: p.color }}>
            <span style={{ transform: "scale(1.4)", display: "flex" }}>{p.icon}</span>
          </div>
          <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: "#fff", fontFamily: "'DM Sans', sans-serif" }}>Sign in to {p.name}</h2>
          <p style={{ margin: "4px 0 0", color: "#444", fontSize: 11, fontFamily: "'DM Sans', sans-serif" }}>Your credentials are never stored</p>
        </div>
        <div style={{ padding: "18px 26px 24px" }}>
          {p.fields.map(f => (
            <div key={f.key} style={{ marginBottom: 12 }}>
              <label style={{ display: "block", color: "#666", fontSize: 10, fontFamily: "'DM Sans', sans-serif", marginBottom: 5, letterSpacing: "0.06em", textTransform: "uppercase" }}>{f.label}</label>
              <div style={{ position: "relative" }}>
                <input
                  type={f.type === "password" && showPw ? "text" : f.type}
                  value={fields[f.key]}
                  onChange={e => setFields(prev => ({ ...prev, [f.key]: e.target.value }))}
                  onKeyDown={e => e.key === "Enter" && submit()}
                  placeholder={f.type === "email" ? "you@example.com" : "••••••••"}
                  style={{
                    width: "100%", boxSizing: "border-box",
                    padding: f.type === "password" ? "11px 40px 11px 13px" : "11px 13px",
                    background: "#ffffff08", border: `1px solid #ffffff10`,
                    borderRadius: 10, color: "#fff", fontSize: 14,
                    fontFamily: "'DM Sans', sans-serif", outline: "none",
                  }}
                  onFocus={e => e.target.style.borderColor = p.color + "55"}
                  onBlur={e => e.target.style.borderColor = "#ffffff10"}
                />
                {f.type === "password" && (
                  <button onClick={() => setShowPw(v => !v)} style={{ position: "absolute", right: 11, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#555", cursor: "pointer", fontSize: 13, padding: 0 }}>
                    {showPw ? "🙈" : "👁"}
                  </button>
                )}
              </div>
            </div>
          ))}
          {error && <div style={{ color: "#ff7070", fontSize: 12, marginBottom: 10, fontFamily: "'DM Sans', sans-serif", background: "#ff444412", padding: "7px 10px", borderRadius: 8 }}>{error}</div>}
          <button onClick={submit} disabled={loading} style={{
            width: "100%", padding: "12px 0", marginTop: 6,
            background: loading ? `${p.color}55` : p.color, border: "none", borderRadius: 11,
            color: ["spotify", "tidal"].includes(p.id) ? "#000" : "#fff",
            fontSize: 14, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer",
            fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          }}>
            {loading ? <><span style={{ width: 13, height: 13, border: "2px solid #00000040", borderTopColor: "#000", borderRadius: "50%", animation: "spin 0.7s linear infinite", display: "inline-block" }} /> Signing in...</> : "Continue"}
          </button>
          <button onClick={onClose} style={{ width: "100%", padding: "9px 0", marginTop: 6, background: "none", border: "none", color: "#3a3a3a", fontSize: 12, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>Cancel</button>
        </div>
      </div>
      <style>{`@keyframes slideUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

function AccountBadge({ account, selected, onSelect, onRemove, color }) {
  return (
    <div onClick={onSelect} style={{
      display: "flex", alignItems: "center", gap: 10, padding: "10px 13px",
      background: selected ? `${color}14` : "#161616",
      border: `1.5px solid ${selected ? color : "#252525"}`,
      borderRadius: 12, cursor: "pointer", transition: "all 0.15s", marginBottom: 8,
    }}>
      <img src={account.avatar} alt="" style={{ width: 32, height: 32, borderRadius: "50%", border: `2px solid ${selected ? color : "#333"}`, flexShrink: 0 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ color: "#fff", fontSize: 13, fontWeight: 500, fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{account.email}</div>
        <div style={{ color: "#555", fontSize: 11, fontFamily: "'DM Mono', monospace" }}>{PROVIDERS[account.providerId].name}</div>
      </div>
      {selected && <span style={{ color, fontSize: 14, flexShrink: 0 }}>✓</span>}
      <button onClick={e => { e.stopPropagation(); onRemove(); }} style={{ background: "none", border: "none", color: "#383838", cursor: "pointer", fontSize: 18, padding: "0 0 0 4px", flexShrink: 0, lineHeight: 1, fontWeight: 300 }}>×</button>
    </div>
  );
}

function ProviderRow({ providerId, accounts, onConnect }) {
  const p = PROVIDERS[providerId];
  const connected = accounts.filter(a => a.providerId === providerId);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 14px", background: "#161616", border: "1px solid #1e1e1e", borderRadius: 13, marginBottom: 8 }}>
      <div style={{ width: 36, height: 36, borderRadius: 10, background: `${p.color}15`, border: `1.5px solid ${p.color}35`, display: "flex", alignItems: "center", justifyContent: "center", color: p.color, flexShrink: 0 }}>{p.icon}</div>
      <div style={{ flex: 1 }}>
        <div style={{ color: "#fff", fontSize: 13, fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>{p.name}</div>
        <div style={{ color: connected.length ? p.color + "aa" : "#444", fontSize: 11, fontFamily: "'DM Mono', monospace" }}>
          {connected.length ? `${connected.length} account${connected.length > 1 ? "s" : ""} connected` : "Not connected"}
        </div>
      </div>
      <button onClick={() => onConnect(providerId)} style={{
        padding: "6px 12px", background: connected.length ? "#1a1a1a" : `${p.color}18`,
        border: `1px solid ${connected.length ? "#2a2a2a" : p.color + "55"}`,
        borderRadius: 8, color: connected.length ? "#555" : p.color,
        fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap",
      }}>+ Add</button>
    </div>
  );
}

function PlaylistItem({ playlist, selected, onClick, color }) {
  return (
    <button onClick={onClick} style={{
      background: selected ? `${color}10` : "#161616", border: `1.5px solid ${selected ? color : "#252525"}`,
      borderRadius: 11, padding: "10px 13px", cursor: "pointer",
      display: "flex", alignItems: "center", gap: 11, transition: "all 0.15s",
      width: "100%", textAlign: "left", marginBottom: 7,
    }}>
      <img src={playlist.cover} alt="" style={{ width: 40, height: 40, borderRadius: 7, flexShrink: 0, objectFit: "cover" }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ color: "#fff", fontSize: 13, fontWeight: 500, fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{playlist.name}</div>
        <div style={{ color: "#555", fontSize: 11, fontFamily: "'DM Mono', monospace", marginTop: 1 }}>{playlist.tracks} tracks · {playlist.duration}</div>
      </div>
      <div style={{ width: 17, height: 17, borderRadius: "50%", flexShrink: 0, border: `2px solid ${selected ? color : "#3a3a3a"}`, background: selected ? color : "transparent", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s" }}>
        {selected && <span style={{ color: "#000", fontSize: 9, fontWeight: 800 }}>✓</span>}
      </div>
    </button>
  );
}

function TransferAnimation({ sourceAccount, destAccount, playlists, onDone }) {
  const [progress, setProgress] = useState(0);
  const [current, setCurrent] = useState(0);
  const [status, setStatus] = useState("Authenticating...");
  const ref = useRef();

  useEffect(() => {
    const statuses = ["Authenticating...", "Fetching track data...", "Matching songs...", "Creating playlists...", "Transferring tracks...", "Finalizing..."];
    let p = 0;
    ref.current = setInterval(() => {
      p += Math.random() * 3.2 + 1.2;
      if (p > 100) p = 100;
      setProgress(Math.floor(p));
      setStatus(statuses[Math.min(Math.floor((p / 100) * statuses.length), statuses.length - 1)]);
      setCurrent(Math.floor((p / 100) * playlists.length));
      if (p >= 100) { clearInterval(ref.current); setTimeout(onDone, 700); }
    }, 80);
    return () => clearInterval(ref.current);
  }, []);

  const src = PROVIDERS[sourceAccount.providerId];
  const dst = PROVIDERS[destAccount.providerId];

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 22, marginBottom: 30 }}>
        {[sourceAccount, destAccount].map((acc, i) => {
          const pv = PROVIDERS[acc.providerId];
          return (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ position: "relative", display: "inline-block" }}>
                <img src={acc.avatar} alt="" style={{ width: 50, height: 50, borderRadius: "50%", border: `2.5px solid ${pv.color}`, display: "block" }} />
                <div style={{ position: "absolute", bottom: -3, right: -3, background: pv.color, borderRadius: "50%", width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center", color: "#000", border: "2px solid #111" }}>
                  <span style={{ fontSize: 8, display: "flex" }}>{pv.icon}</span>
                </div>
              </div>
              <div style={{ color: "#555", fontSize: 10, fontFamily: "'DM Mono', monospace", marginTop: 7, maxWidth: 75, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{acc.email.split("@")[0]}</div>
            </div>
          );
        }).reduce((acc, el, i) => i === 0 ? [el] : [...acc, (
          <div key="dots" style={{ display: "flex", gap: 5 }}>
            {[0,1,2].map(j => <div key={j} style={{ width: 7, height: 7, borderRadius: "50%", background: `linear-gradient(90deg,${src.color},${dst.color})`, animation: `dot 1.2s ease ${j*0.2}s infinite` }} />)}
          </div>
        ), el], [])}
      </div>

      <div style={{ background: "#1a1a1a", borderRadius: 100, height: 5, marginBottom: 9, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${progress}%`, borderRadius: 100, background: `linear-gradient(90deg,${src.color},${dst.color})`, transition: "width 0.1s ease", boxShadow: `0 0 8px ${dst.color}70` }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
        <span style={{ color: "#555", fontSize: 11, fontFamily: "'DM Mono', monospace" }}>{status}</span>
        <span style={{ color: "#fff", fontSize: 11, fontFamily: "'DM Mono', monospace", fontWeight: 600 }}>{progress}%</span>
      </div>

      <div style={{ maxHeight: 210, overflowY: "auto" }}>
        {playlists.map((pl, i) => (
          <div key={pl.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0", opacity: i <= current ? 1 : 0.18, transition: "opacity 0.3s" }}>
            <div style={{ width: 15, height: 15, borderRadius: "50%", flexShrink: 0, background: i < current ? dst.color : i === current ? `${dst.color}35` : "#222", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, color: "#000", fontWeight: 700, transition: "all 0.3s" }}>
              {i < current ? "✓" : ""}
            </div>
            <span style={{ color: i <= current ? "#ccc" : "#333", fontSize: 12, fontFamily: "'DM Sans', sans-serif", flex: 1 }}>{pl.name}</span>
            {i === current && <span style={{ color: dst.color, fontSize: 10, fontFamily: "'DM Mono', monospace" }}>transferring…</span>}
            {i < current && <span style={{ color: "#2a2a2a", fontSize: 10, fontFamily: "'DM Mono', monospace" }}>done</span>}
          </div>
        ))}
      </div>
      <style>{`@keyframes dot{0%,100%{opacity:.2;transform:scale(.65)}50%{opacity:1;transform:scale(1.2)}}`}</style>
    </div>
  );
}

const STEPS = ["accounts", "source-select", "playlists", "dest-select", "transfer", "done"];

export default function App() {
  const [step, setStep] = useState("accounts");
  const [accounts, setAccounts] = useState([]);
  const [loginModal, setLoginModal] = useState(null);
  const [sourceAccount, setSourceAccount] = useState(null);
  const [destAccount, setDestAccount] = useState(null);
  const [selectedPlaylists, setSelectedPlaylists] = useState([]);

  const stepIdx = STEPS.indexOf(step);

  const addAccount = (account) => {
    setAccounts(prev => [...prev.filter(a => !(a.providerId === account.providerId && a.email === account.email)), account]);
    setLoginModal(null);
  };
  const removeAccount = (email, providerId) => {
    setAccounts(prev => prev.filter(a => !(a.email === email && a.providerId === providerId)));
    if (sourceAccount?.email === email && sourceAccount?.providerId === providerId) setSourceAccount(null);
    if (destAccount?.email === email && destAccount?.providerId === providerId) setDestAccount(null);
  };
  const togglePlaylist = (pl) =>
    setSelectedPlaylists(prev => prev.find(p => p.id === pl.id) ? prev.filter(p => p.id !== pl.id) : [...prev, pl]);

  const srcColor = sourceAccount ? PROVIDERS[sourceAccount.providerId].color : "#666";
  const dstColor = destAccount ? PROVIDERS[destAccount.providerId].color : "#666";

  const canProceed = {
    accounts: accounts.length >= 2,
    "source-select": !!sourceAccount,
    playlists: selectedPlaylists.length > 0,
    "dest-select": !!destAccount,
    transfer: true, done: false,
  }[step];

  const goNext = () => setStep(STEPS[stepIdx + 1]);
  const goBack = () => {
    const prev = STEPS[stepIdx - 1];
    if (prev === "accounts") { setSourceAccount(null); setDestAccount(null); setSelectedPlaylists([]); }
    setStep(prev);
  };

  const stepLabels = { accounts: "Accounts", "source-select": "Source", playlists: "Playlists", "dest-select": "Destination", transfer: "Transfer", done: "Done" };

  return (
    <div style={{ minHeight: "100vh", background: "#080808", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
      {loginModal && <LoginModal providerId={loginModal} onSuccess={addAccount} onClose={() => setLoginModal(null)} />}

      <div style={{ width: "100%", maxWidth: 450 }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "#111", border: "1px solid #1e1e1e", borderRadius: 100, padding: "5px 13px", marginBottom: 10 }}>
            <span style={{ fontSize: 14 }}>🎵</span>
            <span style={{ fontSize: 12, color: "#666", fontWeight: 500, fontFamily: "'DM Sans', sans-serif" }}>Playlist Transfer</span>
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0, background: "linear-gradient(135deg,#fff 30%,#3a3a3a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "-0.4px" }}>Move Your Music</h1>
        </div>

        {/* Step pills */}
        {step !== "done" && (
          <div style={{ display: "flex", gap: 4, justifyContent: "center", marginBottom: 20 }}>
            {STEPS.filter(s => s !== "done").map((s, i) => (
              <div key={s} style={{
                height: 3, borderRadius: 100,
                width: stepIdx >= i ? 26 : 12,
                background: stepIdx > i ? "#2a2a2a" : stepIdx === i ? `linear-gradient(90deg,${srcColor},${dstColor})` : "#161616",
                transition: "all 0.3s",
              }} />
            ))}
          </div>
        )}

        {/* Card */}
        <div style={{ background: "#0f0f0f", border: "1px solid #1a1a1a", borderRadius: 20, padding: "24px 20px", boxShadow: "0 20px 60px rgba(0,0,0,0.7)" }}>

          {/* ACCOUNTS */}
          {step === "accounts" && (
            <div>
              <h2 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 3px", fontFamily: "'DM Sans', sans-serif" }}>Connect Accounts</h2>
              <p style={{ color: "#484848", fontSize: 12, margin: "0 0 18px", fontFamily: "'DM Sans', sans-serif" }}>Sign in to at least 2 accounts to transfer between them</p>
              {Object.keys(PROVIDERS).map(id => <ProviderRow key={id} providerId={id} accounts={accounts} onConnect={() => setLoginModal(id)} />)}
              {accounts.length > 0 && (
                <div style={{ marginTop: 18 }}>
                  <div style={{ color: "#333", fontSize: 10, fontFamily: "'DM Mono', monospace", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>Connected ({accounts.length})</div>
                  {accounts.map(acc => <AccountBadge key={acc.email+acc.providerId} account={acc} selected={false} onSelect={() => {}} onRemove={() => removeAccount(acc.email, acc.providerId)} color={PROVIDERS[acc.providerId].color} />)}
                </div>
              )}
              {accounts.length < 2 && (
                <div style={{ marginTop: 14, padding: "10px 14px", background: "#111", border: "1px dashed #1e1e1e", borderRadius: 10, color: "#333", fontSize: 12, fontFamily: "'DM Sans', sans-serif", textAlign: "center" }}>
                  {accounts.length === 0 ? "Add 2 accounts to get started" : "Add 1 more account to continue"}
                </div>
              )}
            </div>
          )}

          {/* SOURCE SELECT */}
          {step === "source-select" && (
            <div>
              <h2 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 3px", fontFamily: "'DM Sans', sans-serif" }}>Transfer From</h2>
              <p style={{ color: "#484848", fontSize: 12, margin: "0 0 16px", fontFamily: "'DM Sans', sans-serif" }}>Which account has the playlists you want to move?</p>
              {accounts.map(acc => (
                <AccountBadge key={acc.email+acc.providerId} account={acc}
                  selected={sourceAccount?.email === acc.email && sourceAccount?.providerId === acc.providerId}
                  onSelect={() => { setSourceAccount(acc); if (destAccount?.email === acc.email && destAccount?.providerId === acc.providerId) setDestAccount(null); }}
                  onRemove={() => removeAccount(acc.email, acc.providerId)}
                  color={PROVIDERS[acc.providerId].color} />
              ))}
            </div>
          )}

          {/* PLAYLISTS */}
          {step === "playlists" && (
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                <span style={{ color: srcColor, display: "flex" }}>{PROVIDERS[sourceAccount.providerId].icon}</span>
                <h2 style={{ fontSize: 16, fontWeight: 700, margin: 0, fontFamily: "'DM Sans', sans-serif" }}>Choose Playlists</h2>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <p style={{ color: "#484848", fontSize: 12, margin: 0, fontFamily: "'DM Sans', sans-serif" }}>{selectedPlaylists.length} selected</p>
                <button onClick={() => { const all = MOCK_PLAYLISTS[sourceAccount.providerId]; setSelectedPlaylists(selectedPlaylists.length === all.length ? [] : all); }}
                  style={{ background: "none", border: "none", color: srcColor, fontSize: 12, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
                  {selectedPlaylists.length === MOCK_PLAYLISTS[sourceAccount.providerId].length ? "Deselect all" : "Select all"}
                </button>
              </div>
              <div style={{ maxHeight: 290, overflowY: "auto" }}>
                {MOCK_PLAYLISTS[sourceAccount.providerId].map(pl => <PlaylistItem key={pl.id} playlist={pl} selected={!!selectedPlaylists.find(p => p.id === pl.id)} onClick={() => togglePlaylist(pl)} color={srcColor} />)}
              </div>
            </div>
          )}

          {/* DEST SELECT */}
          {step === "dest-select" && (
            <div>
              <h2 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 3px", fontFamily: "'DM Sans', sans-serif" }}>Transfer To</h2>
              <p style={{ color: "#484848", fontSize: 12, margin: "0 0 16px", fontFamily: "'DM Sans', sans-serif" }}>Select the destination account</p>
              {accounts.filter(acc => !(acc.email === sourceAccount.email && acc.providerId === sourceAccount.providerId)).map(acc => (
                <AccountBadge key={acc.email+acc.providerId} account={acc}
                  selected={destAccount?.email === acc.email && destAccount?.providerId === acc.providerId}
                  onSelect={() => setDestAccount(acc)}
                  onRemove={() => removeAccount(acc.email, acc.providerId)}
                  color={PROVIDERS[acc.providerId].color} />
              ))}
              {destAccount && (
                <div style={{ marginTop: 16, padding: 13, background: "#0a0a0a", borderRadius: 11, border: "1px solid #1a1a1a" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 7 }}>
                    <img src={sourceAccount.avatar} style={{ width: 20, height: 20, borderRadius: "50%" }} />
                    <span style={{ color: "#333", fontSize: 11 }}>→</span>
                    <img src={destAccount.avatar} style={{ width: 20, height: 20, borderRadius: "50%" }} />
                    <span style={{ color: "#ccc", fontSize: 12, fontWeight: 500, fontFamily: "'DM Sans', sans-serif" }}>{selectedPlaylists.length} playlist{selectedPlaylists.length !== 1 ? "s" : ""}</span>
                  </div>
                  {selectedPlaylists.slice(0, 3).map(pl => <div key={pl.id} style={{ color: "#3a3a3a", fontSize: 11, paddingLeft: 3, marginBottom: 2, fontFamily: "'DM Sans', sans-serif" }}>· {pl.name}</div>)}
                  {selectedPlaylists.length > 3 && <div style={{ color: "#2a2a2a", fontSize: 11, paddingLeft: 3 }}>+ {selectedPlaylists.length - 3} more</div>}
                </div>
              )}
            </div>
          )}

          {/* TRANSFER */}
          {step === "transfer" && <TransferAnimation sourceAccount={sourceAccount} destAccount={destAccount} playlists={selectedPlaylists} onDone={() => setStep("done")} />}

          {/* DONE */}
          {step === "done" && (
            <div style={{ textAlign: "center" }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", margin: "0 auto 16px", background: `linear-gradient(135deg,${srcColor}20,${dstColor}20)`, border: `2px solid ${dstColor}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, boxShadow: `0 0 26px ${dstColor}35` }}>✓</div>
              <h2 style={{ fontSize: 19, fontWeight: 700, margin: "0 0 5px", fontFamily: "'DM Sans', sans-serif" }}>Transfer Complete!</h2>
              <p style={{ color: "#555", fontSize: 13, margin: "0 0 18px", fontFamily: "'DM Sans', sans-serif" }}>
                {selectedPlaylists.length} playlist{selectedPlaylists.length !== 1 ? "s" : ""} moved to <span style={{ color: dstColor }}>{destAccount.email.split("@")[0]}</span>
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 6, maxHeight: 240, overflowY: "auto" }}>
                {selectedPlaylists.map(pl => (
                  <div key={pl.id} style={{ display: "flex", alignItems: "center", gap: 9, padding: "8px 11px", background: "#0a0a0a", borderRadius: 9, border: "1px solid #161616", textAlign: "left" }}>
                    <img src={pl.cover} style={{ width: 32, height: 32, borderRadius: 6, objectFit: "cover" }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ color: "#fff", fontSize: 12, fontWeight: 500, fontFamily: "'DM Sans', sans-serif" }}>{pl.name}</div>
                      <div style={{ color: "#3a3a3a", fontSize: 10, fontFamily: "'DM Mono', monospace" }}>{pl.tracks} tracks</div>
                    </div>
                    <span style={{ color: dstColor, fontSize: 13 }}>✓</span>
                  </div>
                ))}
              </div>
              <button onClick={() => { setStep("accounts"); setSourceAccount(null); setDestAccount(null); setSelectedPlaylists([]); }} style={{
                marginTop: 18, width: "100%", padding: "12px 0",
                background: `linear-gradient(135deg,${srcColor}15,${dstColor}15)`,
                border: `1px solid ${dstColor}35`, borderRadius: 11, color: "#fff",
                fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
              }}>Transfer More</button>
            </div>
          )}
        </div>

        {/* Nav */}
        {step !== "transfer" && step !== "done" && (
          <div style={{ display: "flex", gap: 9, marginTop: 12 }}>
            {stepIdx > 0 && (
              <button onClick={goBack} style={{ flex: 1, padding: "12px 0", background: "#0f0f0f", border: "1px solid #1a1a1a", borderRadius: 11, color: "#555", fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>← Back</button>
            )}
            <button onClick={goNext} disabled={!canProceed} style={{
              flex: 2, padding: "12px 0",
              background: canProceed ? `linear-gradient(135deg,${srcColor},${step === "dest-select" ? dstColor : srcColor})` : "#141414",
              border: "none", borderRadius: 11,
              color: canProceed ? "#000" : "#2a2a2a",
              fontSize: 13, fontWeight: 700, cursor: canProceed ? "pointer" : "not-allowed",
              fontFamily: "'DM Sans', sans-serif",
              boxShadow: canProceed ? `0 4px 16px ${srcColor}30` : "none",
              transition: "all 0.2s",
            }}>
              {step === "dest-select" ? "Start Transfer →" : "Continue →"}
            </button>
          </div>
        )}

        <p style={{ textAlign: "center", color: "#1a1a1a", fontSize: 10, marginTop: 16, fontFamily: "'DM Mono', monospace" }}>
          Demo · credentials are not stored or transmitted
        </p>
      </div>
    </div>
  );
}
