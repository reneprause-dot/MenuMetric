// ─── MenuMetric PWA – Großküchen-Warenwirtschaft ──────────────────────────────

const { useState, useEffect, useCallback } = React;

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const C = {
  bg:         '#F4F6F9',
  bgBlue:     '#EFF6FF',
  surface:    '#FFFFFF',
  border:     '#E2E8F0',
  borderMid:  '#CBD5E1',
  blue:       '#2563EB',
  blueDark:   '#1D4ED8',
  blueLight:  '#DBEAFE',
  bluePale:   '#EFF6FF',
  green:      '#16A34A',
  greenLight: '#DCFCE7',
  red:        '#DC2626',
  redLight:   '#FEE2E2',
  orange:     '#EA580C',
  orangeLight:'#FFEDD5',
  yellow:     '#D97706',
  yellowLight:'#FEF3C7',
  purple:     '#7C3AED',
  purpleLight:'#EDE9FE',
  text:       '#0F172A',
  textMid:    '#475569',
  textLight:  '#94A3B8',
};

// ─── CSS ──────────────────────────────────────────────────────────────────────
const css = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body, #root { height: 100%; background: ${C.bg}; }
  body { font-family: 'Nunito', sans-serif; color: ${C.text}; font-size: 15px; -webkit-tap-highlight-color: transparent; }
  ::-webkit-scrollbar { width: 6px; height: 6px; }
  ::-webkit-scrollbar-track { background: ${C.bg}; }
  ::-webkit-scrollbar-thumb { background: ${C.borderMid}; border-radius: 3px; }

  .app { display: flex; flex-direction: column; height: 100%; overflow: hidden; }

  /* TOP BAR */
  .topbar { background: ${C.blue}; color: white; padding: 0 20px; height: 60px;
    display: flex; align-items: center; gap: 14px; flex-shrink: 0;
    box-shadow: 0 2px 12px #2563EB33; position: relative; z-index: 10; }
  .topbar-logo { font-size: 19px; font-weight: 900; letter-spacing: -0.3px; flex: 1; }
  .topbar-logo .sub { font-size: 13px; font-weight: 600; opacity: 0.75; margin-left: 4px; }
  .topbar-badges { display: flex; gap: 8px; }
  .topbar-badge { display: flex; align-items: center; gap: 5px; padding: 6px 11px; border-radius: 20px;
    font-size: 12px; font-weight: 800; }
  .topbar-badge.red { background: rgba(220,38,38,0.2); color: #FCA5A5; border: 1px solid rgba(220,38,38,0.3); }
  .topbar-badge.yellow { background: rgba(217,119,6,0.2); color: #FDE68A; border: 1px solid rgba(217,119,6,0.3); }
  .topbar-time { font-size: 13px; font-weight: 700; opacity: 0.8; white-space: nowrap; }

  /* PAGE BREADCRUMB */
  .page-bar { background: ${C.bgBlue}; border-bottom: 1.5px solid ${C.border};
    padding: 10px 16px; flex-shrink: 0; }
  .page-bar-inner { font-size: 13px; font-weight: 800; color: ${C.blue}; }

  /* BOTTOM NAV */
  .bottom-nav { position: fixed; bottom: 0; left: 0; right: 0; z-index: 20; background: white;
    border-top: 1.5px solid ${C.border}; display: flex;
    padding-bottom: env(safe-area-inset-bottom, 0px); box-shadow: 0 -4px 20px rgba(0,0,0,0.06); }
  .bn-item { flex: 1; display: flex; flex-direction: column; align-items: center;
    padding: 10px 4px 8px; cursor: pointer; transition: color 0.15s; position: relative;
    color: ${C.textLight}; font-size: 10px; font-weight: 700; gap: 3px;
    border: none; background: none; font-family: 'Nunito', sans-serif; }
  .bn-item.active { color: ${C.blue}; }
  .bn-icon { font-size: 20px; line-height: 1; }
  .bn-item.active::after { content: ''; position: absolute; top: 0; left: 20%; right: 20%;
    height: 3px; background: ${C.blue}; border-radius: 0 0 3px 3px; }
  .bn-badge { position: absolute; top: 6px; right: calc(50% - 20px); background: ${C.red};
    color: white; font-size: 9px; font-weight: 900; min-width: 16px; height: 16px;
    border-radius: 8px; display: flex; align-items: center; justify-content: center;
    padding: 0 3px; border: 2px solid white; }

  /* CONTENT */
  .content { flex: 1; overflow-y: auto; padding: 16px;
    padding-bottom: calc(72px + env(safe-area-inset-bottom, 0px)); }

  /* SECTION HEADER */
  .sec-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; gap: 10px; }
  .sec-title { font-size: 20px; font-weight: 900; color: ${C.text}; }
  .sec-sub { font-size: 13px; color: ${C.textMid}; font-weight: 600; margin-top: 2px; }

  /* KPI GRID */
  .kpi-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom: 16px; }
  .kpi-card { background: white; border-radius: 16px; padding: 16px;
    border: 1.5px solid ${C.border}; position: relative; overflow: hidden; }
  .kpi-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0;
    height: 4px; border-radius: 4px 4px 0 0; }
  .kpi-card.blue::before { background: ${C.blue}; }
  .kpi-card.green::before { background: ${C.green}; }
  .kpi-card.red::before { background: ${C.red}; }
  .kpi-card.yellow::before { background: ${C.yellow}; }
  .kpi-icon { font-size: 24px; margin-bottom: 8px; }
  .kpi-val { font-family: 'JetBrains Mono', monospace; font-size: 24px; font-weight: 700; line-height: 1; color: ${C.text}; }
  .kpi-lbl { font-size: 11px; font-weight: 800; color: ${C.textMid}; margin-top: 5px;
    text-transform: uppercase; letter-spacing: 0.5px; }
  .kpi-sub { font-size: 12px; color: ${C.textLight}; margin-top: 4px; font-weight: 600; }

  /* ALERTS */
  .alert { display: flex; align-items: center; gap: 12px; padding: 13px 16px;
    border-radius: 14px; margin-bottom: 12px; font-size: 14px; font-weight: 700; }
  .alert.danger { background: ${C.redLight}; color: ${C.red}; border: 1.5px solid #FECACA; }
  .alert.warn { background: ${C.orangeLight}; color: ${C.orange}; border: 1.5px solid #FED7AA; }
  .alert.info { background: ${C.blueLight}; color: ${C.blue}; border: 1.5px solid #BFDBFE; }
  .alert.success { background: ${C.greenLight}; color: ${C.green}; border: 1.5px solid #BBF7D0; }
  .alert-icon { font-size: 20px; flex-shrink: 0; }
  .alert-text { flex: 1; line-height: 1.35; }

  /* CARDS */
  .card { background: white; border-radius: 16px; border: 1.5px solid ${C.border}; overflow: hidden; margin-bottom: 14px; }
  .card-head { display: flex; align-items: center; justify-content: space-between;
    padding: 14px 16px; border-bottom: 1.5px solid ${C.border}; background: ${C.bg}; }
  .card-title { font-size: 15px; font-weight: 800; color: ${C.text}; }

  /* ACTION TILES */
  .action-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom: 16px; }
  .action-tile { background: white; border: 1.5px solid ${C.border}; border-radius: 20px;
    padding: 20px 16px; display: flex; flex-direction: column; align-items: flex-start; gap: 10px;
    cursor: pointer; transition: all 0.15s; text-align: left; font-family: 'Nunito', sans-serif;
    min-height: 100px; border: none; }
  .action-tile.blue { background: ${C.bluePale}; border: 1.5px solid #BFDBFE; }
  .action-tile.green { background: ${C.greenLight}; border: 1.5px solid #BBF7D0; }
  .action-tile.orange { background: ${C.orangeLight}; border: 1.5px solid #FED7AA; }
  .action-tile.purple { background: ${C.purpleLight}; border: 1.5px solid #C4B5FD; }
  .action-tile:active { transform: scale(0.97); }
  .tile-icon { font-size: 30px; }
  .tile-label { font-size: 14px; font-weight: 900; color: ${C.text}; line-height: 1.2; }
  .tile-sub { font-size: 12px; font-weight: 600; color: ${C.textMid}; }

  /* TABLE */
  .tbl { width: 100%; border-collapse: collapse; }
  .tbl th { text-align: left; padding: 10px 14px; font-size: 11px; text-transform: uppercase;
    letter-spacing: 0.8px; color: ${C.textMid}; font-weight: 800; background: ${C.bg};
    border-bottom: 1.5px solid ${C.border}; }
  .tbl td { padding: 13px 14px; border-bottom: 1px solid ${C.border}; font-size: 14px;
    font-weight: 600; vertical-align: middle; }
  .tbl tr:last-child td { border-bottom: none; }
  .tbl tr:hover td { background: ${C.bgBlue}; }
  .mono { font-family: 'JetBrains Mono', monospace; font-weight: 700; }

  /* BADGES */
  .badge { display: inline-flex; align-items: center; gap: 4px; padding: 4px 10px;
    border-radius: 20px; font-size: 12px; font-weight: 800; white-space: nowrap; }
  .badge-green { background: ${C.greenLight}; color: ${C.green}; }
  .badge-red { background: ${C.redLight}; color: ${C.red}; }
  .badge-yellow { background: ${C.yellowLight}; color: ${C.yellow}; }
  .badge-blue { background: ${C.blueLight}; color: ${C.blue}; }
  .badge-gray { background: ${C.bg}; color: ${C.textMid}; border: 1px solid ${C.border}; }
  .badge-orange { background: ${C.orangeLight}; color: ${C.orange}; }

  /* BUTTONS */
  .btn { display: inline-flex; align-items: center; justify-content: center; gap: 7px;
    border-radius: 12px; font-size: 14px; font-weight: 800; cursor: pointer;
    border: none; transition: all 0.15s; font-family: 'Nunito', sans-serif;
    white-space: nowrap; min-height: 44px; padding: 0 18px; }
  .btn:active { transform: scale(0.97); }
  .btn-primary { background: ${C.blue}; color: white; box-shadow: 0 2px 8px rgba(37,99,235,0.3); }
  .btn-primary:hover { background: ${C.blueDark}; }
  .btn-primary:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }
  .btn-ghost { background: ${C.bg}; color: ${C.textMid}; border: 1.5px solid ${C.border}; }
  .btn-ghost:hover { border-color: ${C.blue}; color: ${C.blue}; }
  .btn-xl { min-height: 56px; font-size: 16px; padding: 0 24px; border-radius: 14px; width: 100%; }
  .btn-lg { min-height: 52px; font-size: 15px; padding: 0 22px; border-radius: 14px; }
  .btn-sm { min-height: 34px; font-size: 12px; padding: 0 12px; border-radius: 8px; }

  /* FORMS */
  .form-group { display: flex; flex-direction: column; gap: 6px; }
  .form-label { font-size: 12px; font-weight: 800; color: ${C.textMid};
    text-transform: uppercase; letter-spacing: 0.5px; }
  input, select, textarea { background: ${C.bg}; border: 2px solid ${C.border}; border-radius: 12px;
    color: ${C.text}; padding: 13px 15px; font-size: 15px; font-family: 'Nunito', sans-serif;
    font-weight: 600; outline: none; transition: border-color 0.15s; width: 100%;
    min-height: 50px; -webkit-appearance: none; appearance: none; }
  input:focus, select:focus { border-color: ${C.blue}; background: white; }
  select { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%2394A3B8' stroke-width='2' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat; background-position: right 14px center; padding-right: 40px; }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

  /* QUANTITY PICKER */
  .qty-picker { display: flex; align-items: center; border: 2px solid ${C.border}; border-radius: 14px; overflow: hidden; background: white; }
  .qty-btn { width: 56px; height: 56px; background: ${C.bg}; border: none; font-size: 24px;
    font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center;
    color: ${C.blue}; transition: background 0.1s; flex-shrink: 0; font-family: 'Nunito', sans-serif; }
  .qty-btn:active { background: ${C.blueLight}; }
  .qty-input { flex: 1; text-align: center; font-size: 18px; font-weight: 900;
    font-family: 'JetBrains Mono', monospace; background: white; height: 56px;
    border: none; border-left: 1px solid ${C.border}; border-right: 1px solid ${C.border};
    outline: none; width: 100%; min-width: 0; padding: 0; min-height: unset; border-radius: 0; }

  /* STOCK BAR */
  .stock-level { display: flex; align-items: center; gap: 10px; }
  .stock-bar-wrap { flex: 1; height: 8px; background: ${C.bg}; border-radius: 4px;
    overflow: hidden; border: 1px solid ${C.border}; }
  .stock-bar-fill { height: 100%; border-radius: 4px; transition: width 0.4s; }
  .stock-val { font-family: 'JetBrains Mono', monospace; font-size: 13px; font-weight: 700;
    white-space: nowrap; min-width: 70px; text-align: right; }

  /* BAR CHART */
  .bar-chart { display: flex; align-items: flex-end; gap: 6px; height: 72px; padding: 0 4px; }
  .bar-col { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px; }
  .bar-fill { width: 100%; border-radius: 4px 4px 0 0; transition: height 0.3s; min-height: 3px; }

  /* SEARCH */
  .search-wrap { position: relative; flex: 1; }
  .search-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); font-size: 16px; pointer-events: none; }
  .search-wrap input { padding-left: 44px; }

  /* TABS */
  .tabs { display: flex; gap: 6px; margin-bottom: 16px; overflow-x: auto; padding-bottom: 2px; -webkit-overflow-scrolling: touch; }
  .tabs::-webkit-scrollbar { display: none; }
  .tab-btn { padding: 9px 18px; border-radius: 22px; font-size: 13px; font-weight: 800;
    cursor: pointer; font-family: 'Nunito', sans-serif; border: 2px solid ${C.border};
    background: white; color: ${C.textMid}; white-space: nowrap; transition: all 0.15s; min-height: 40px; }
  .tab-btn.active { background: ${C.blue}; color: white; border-color: ${C.blue}; }

  /* MODAL */
  .modal-overlay { position: fixed; inset: 0; background: rgba(15,23,42,0.55); z-index: 100;
    display: flex; align-items: flex-end; justify-content: center; animation: fadeIn 0.2s ease; }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  .modal { background: white; border-radius: 24px 24px 0 0; width: 100%; max-width: 640px;
    max-height: 92vh; overflow-y: auto; animation: slideUp 0.3s ease;
    padding-bottom: env(safe-area-inset-bottom, 0px); }
  @keyframes slideUp { from { transform: translateY(60px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
  .modal-handle { width: 40px; height: 4px; background: ${C.border}; border-radius: 2px; margin: 12px auto 0; }
  .modal-head { display: flex; align-items: center; justify-content: space-between; padding: 16px 20px 14px; }
  .modal-title { font-size: 19px; font-weight: 900; }
  .modal-body { padding: 0 20px; display: flex; flex-direction: column; gap: 14px; }
  .modal-foot { padding: 16px 20px 20px; display: flex; flex-direction: column; gap: 10px;
    border-top: 1.5px solid ${C.border}; margin-top: 16px; }

  /* STEP INDICATOR */
  .steps { display: flex; gap: 4px; margin-bottom: 16px; }
  .step { flex: 1; height: 4px; border-radius: 2px; background: ${C.border}; }
  .step.done { background: ${C.blue}; }

  /* POSITION LIST */
  .pos-list { display: flex; flex-direction: column; gap: 8px; }
  .pos-item { background: ${C.bg}; border-radius: 12px; padding: 12px 14px;
    display: flex; align-items: center; gap: 10px; border: 1.5px solid ${C.border}; }
  .pos-item-name { flex: 1; font-size: 14px; font-weight: 700; }
  .pos-item-detail { font-size: 12px; color: ${C.textMid}; font-weight: 600; }
  .pos-remove { background: ${C.redLight}; border: none; color: ${C.red}; width: 34px; height: 34px;
    border-radius: 8px; cursor: pointer; font-size: 16px; display: flex; align-items: center; justify-content: center; }

  /* REZEPTUR CARDS */
  .rez-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 12px; margin-bottom: 16px; }
  .rez-card { background: white; border: 1.5px solid ${C.border}; border-radius: 18px;
    padding: 16px; cursor: pointer; transition: all 0.15s; }
  .rez-card:hover { border-color: ${C.blue}; box-shadow: 0 4px 16px rgba(37,99,235,0.1); }
  .rez-card.selected { border-color: ${C.blue}; background: ${C.bgBlue}; }
  .rez-stats { display: flex; gap: 12px; margin-top: 12px; padding-top: 12px; border-top: 1px solid ${C.border}; }
  .rez-stat { flex: 1; }
  .rez-stat-lbl { font-size: 10px; font-weight: 800; color: ${C.textLight}; text-transform: uppercase; letter-spacing: 0.5px; }
  .rez-stat-val { font-size: 15px; font-weight: 900; font-family: 'JetBrains Mono', monospace; margin-top: 2px; }

  /* INVENTUR */
  .inv-row { display: flex; align-items: center; gap: 10px; padding: 13px 14px;
    border-bottom: 1px solid ${C.border}; background: white; }
  .inv-row:last-child { border-bottom: none; }
  .inv-name { flex: 1; font-size: 14px; font-weight: 700; }
  .inv-soll { font-family: 'JetBrains Mono', monospace; font-size: 13px; color: ${C.textMid};
    font-weight: 700; min-width: 80px; text-align: right; }

  /* TOAST */
  .toast-wrap { position: fixed; top: 70px; right: 16px; z-index: 1000;
    display: flex; flex-direction: column; gap: 8px; pointer-events: none; }
  .toast { color: white; padding: 12px 16px; border-radius: 14px; font-size: 14px; font-weight: 700;
    max-width: 320px; box-shadow: 0 4px 20px rgba(0,0,0,0.2); animation: toastIn 0.3s ease;
    display: flex; align-items: center; gap: 10px; }
  .toast.success { background: ${C.green}; }
  .toast.error { background: ${C.red}; }
  .toast.warn { background: ${C.orange}; }
  .toast.info { background: ${C.blue}; }
  @keyframes toastIn { from { opacity: 0; transform: translateX(40px); } to { opacity: 1; transform: translateX(0); } }

  /* EMPTY STATE */
  .empty { text-align: center; padding: 48px 20px; }
  .empty-icon { font-size: 48px; margin-bottom: 12px; }
  .empty-title { font-size: 17px; font-weight: 800; color: ${C.text}; margin-bottom: 6px; }
  .empty-sub { font-size: 14px; color: ${C.textMid}; font-weight: 600; }

  @media (min-width: 640px) {
    .kpi-grid { grid-template-columns: repeat(4, 1fr); }
    .action-grid { grid-template-columns: repeat(4, 1fr); }
    .content { padding: 20px 24px; padding-bottom: calc(72px + env(safe-area-inset-bottom, 0px)); }
    .modal { border-radius: 24px; margin: auto; margin-bottom: 20px; }
    .modal-overlay { align-items: center; }
  }
`;

// ─── DATA ─────────────────────────────────────────────────────────────────────
const INIT = {
  lieferanten: [
    { id: 1, name: "Frischmarkt GmbH", kuerzel: "FM", kontakt: "Hans Müller", telefon: "0211-4455", email: "info@frischmarkt.de", zahlungsziel: 14 },
    { id: 2, name: "Weinhaus Becker", kuerzel: "WB", kontakt: "Lisa Becker", telefon: "0221-8899", email: "order@weinhaus-becker.de", zahlungsziel: 30 },
    { id: 3, name: "Großmarkt Nord", kuerzel: "GN", kontakt: "Stefan Koch", telefon: "040-1122", email: "einkauf@gm-nord.de", zahlungsziel: 7 },
  ],
  artikel: [
    { id: 1, name: "Rinderhüfte", einheit: "kg", kategorie: "Fleisch", lieferantId: 1, mindestbestand: 10, ek: 14.50, mwst: 7 },
    { id: 2, name: "Lachs (frisch)", einheit: "kg", kategorie: "Fisch", lieferantId: 1, mindestbestand: 5, ek: 18.90, mwst: 7 },
    { id: 3, name: "Tomaten (Kiste)", einheit: "Kiste", kategorie: "Gemüse", lieferantId: 3, mindestbestand: 3, ek: 22.00, mwst: 7 },
    { id: 4, name: "Chianti DOC", einheit: "Fl", kategorie: "Wein", lieferantId: 2, mindestbestand: 12, ek: 8.50, mwst: 19 },
    { id: 5, name: "Butter 250g", einheit: "Pkg", kategorie: "Molkerei", lieferantId: 3, mindestbestand: 20, ek: 1.85, mwst: 7 },
    { id: 6, name: "Mehl Type 550", einheit: "kg", kategorie: "Trocken", lieferantId: 3, mindestbestand: 15, ek: 0.95, mwst: 7 },
    { id: 7, name: "Prosecco DOC", einheit: "Fl", kategorie: "Wein", lieferantId: 2, mindestbestand: 24, ek: 5.20, mwst: 19 },
    { id: 8, name: "Kartoffeln", einheit: "kg", kategorie: "Gemüse", lieferantId: 3, mindestbestand: 20, ek: 0.70, mwst: 7 },
  ],
  lager: [
    { id: 1, artikelId: 1, menge: 22.5, mhd: "2025-07-15", charge: "CH-001", lagerort: "Kühlraum A", ek: 14.50, eingang: "2025-06-08" },
    { id: 2, artikelId: 2, menge: 4.0,  mhd: "2025-06-14", charge: "CH-002", lagerort: "Kühlraum B", ek: 18.90, eingang: "2025-06-10" },
    { id: 3, artikelId: 3, menge: 2,    mhd: "2025-06-18", charge: "CH-003", lagerort: "Kühlraum A", ek: 22.00, eingang: "2025-06-09" },
    { id: 4, artikelId: 4, menge: 36,   mhd: "2027-12-31", charge: "CH-004", lagerort: "Weinkeller", ek: 8.50,  eingang: "2025-05-20" },
    { id: 5, artikelId: 5, menge: 48,   mhd: "2025-08-01", charge: "CH-005", lagerort: "Kühlraum A", ek: 1.85,  eingang: "2025-06-05" },
    { id: 6, artikelId: 6, menge: 30,   mhd: "2026-06-01", charge: "CH-006", lagerort: "Trockenlager", ek: 0.95, eingang: "2025-05-28" },
    { id: 7, artikelId: 7, menge: 18,   mhd: "2026-09-30", charge: "CH-007", lagerort: "Weinkeller", ek: 5.20,  eingang: "2025-06-01" },
    { id: 8, artikelId: 8, menge: 35,   mhd: "2025-06-25", charge: "CH-008", lagerort: "Kühlraum A", ek: 0.70,  eingang: "2025-06-09" },
  ],
  wareneingaenge: [
    { id: 1, lieferantId: 1, datum: "2025-06-10", status: "Gebucht", belegnr: "WE-2025-041",
      positionen: [{ artikelId: 1, menge: 10, ek: 14.50, mhd: "2025-07-15" }, { artikelId: 2, menge: 5, ek: 18.90, mhd: "2025-06-14" }] },
  ],
  rezepturen: [
    { id: 1, name: "Rinderfilet auf Rotweinsoße", kategorie: "Hauptgericht", vkPreis: 28.50,
      zutaten: [{ artikelId: 1, menge: 0.22, einheit: "kg" }, { artikelId: 4, menge: 0.15, einheit: "Fl" }] },
    { id: 2, name: "Pasta al Salmone", kategorie: "Hauptgericht", vkPreis: 22.00,
      zutaten: [{ artikelId: 2, menge: 0.12, einheit: "kg" }, { artikelId: 6, menge: 0.08, einheit: "kg" }, { artikelId: 5, menge: 0.02, einheit: "Pkg" }] },
    { id: 3, name: "Tomatensalat", kategorie: "Vorspeise", vkPreis: 9.50,
      zutaten: [{ artikelId: 3, menge: 0.15, einheit: "Kiste" }] },
    { id: 4, name: "Bratkartoffeln", kategorie: "Beilage", vkPreis: 5.50,
      zutaten: [{ artikelId: 8, menge: 0.25, einheit: "kg" }, { artikelId: 5, menge: 0.01, einheit: "Pkg" }] },
  ],
  verbrauch: [
    { id: 1, datum: "2025-06-10", artikelId: 1, menge: 2.2, grund: "Produktion: Rinderfilet" },
    { id: 2, datum: "2025-06-10", artikelId: 2, menge: 1.44, grund: "Produktion: Pasta al Salmone" },
    { id: 3, datum: "2025-06-09", artikelId: 4, menge: 3, grund: "Barverkauf" },
  ],
  bestellungen: [],
};

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const fmt = (n, d = 2) => Number(n || 0).toFixed(d).replace('.', ',');
const fmtE = n => `${fmt(n)} €`;
const todayStr = () => new Date().toISOString().slice(0, 10);
const daysDiff = ds => Math.ceil((new Date(ds) - new Date()) / 86400000);
const getLB = (lager, aId) => lager.filter(l => l.artikelId === aId).reduce((s, l) => s + l.menge, 0);
const getA = (artikel, id) => artikel.find(a => a.id === id);
const getL = (lieferanten, id) => lieferanten.find(l => l.id === id);
const mhdBadge = days => days < 0 ? 'red' : days <= 3 ? 'red' : days <= 7 ? 'yellow' : 'green';
const mhdLabel = days => days < 0 ? 'Abgelaufen' : days <= 3 ? `${days}d ⚠` : days <= 7 ? `${days} Tage` : 'OK';

function getRezKosten(rez, artikel, lager) {
  return rez.zutaten.reduce((s, z) => {
    const ch = lager.filter(l => l.artikelId === z.artikelId).sort((a, b) => new Date(a.mhd) - new Date(b.mhd))[0];
    return s + z.menge * (ch?.ek || getA(artikel, z.artikelId)?.ek || 0);
  }, 0);
}

// ─── TOAST ────────────────────────────────────────────────────────────────────
function useToast() {
  const [toasts, setToasts] = useState([]);
  const add = useCallback((msg, type = 'success') => {
    const id = Date.now();
    setToasts(t => [...t, { id, msg, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3000);
  }, []);
  return { toasts, add };
}

function ToastContainer({ toasts }) {
  const icons = { success: '✅', error: '❌', warn: '⚠️', info: 'ℹ️' };
  return (
    <div className="toast-wrap">
      {toasts.map(t => (
        <div key={t.id} className={`toast ${t.type}`}>{icons[t.type]} {t.msg}</div>
      ))}
    </div>
  );
}

// ─── CLOCK ────────────────────────────────────────────────────────────────────
function Clock() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }));
    tick();
    const t = setInterval(tick, 10000);
    return () => clearInterval(t);
  }, []);
  return <span>{time}</span>;
}

// ─── BADGE ────────────────────────────────────────────────────────────────────
function Badge({ type, children }) {
  return <span className={`badge badge-${type}`}>{children}</span>;
}

// ─── MODAL ────────────────────────────────────────────────────────────────────
function Modal({ title, onClose, children, footer }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);
  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-handle" />
        <div className="modal-head">
          <span className="modal-title">{title}</span>
          <button className="btn btn-ghost btn-sm" onClick={onClose}
            style={{ minHeight: 36, padding: '0 12px', fontSize: 16 }}>✕</button>
        </div>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-foot">{footer}</div>}
      </div>
    </div>
  );
}

// ─── QUANTITY PICKER ──────────────────────────────────────────────────────────
function QtyPicker({ value, onChange, step = 1, min = 0 }) {
  const v = Number(value) || 0;
  const dec = step < 1 ? 3 : 0;
  return (
    <div className="qty-picker">
      <button className="qty-btn" onClick={() => onChange(Math.max(min, parseFloat((v - step).toFixed(dec))))}>−</button>
      <input className="qty-input" type="number" value={v} min={min} step={step}
        onChange={e => onChange(parseFloat(e.target.value) || min)} />
      <button className="qty-btn" onClick={() => onChange(parseFloat((v + step).toFixed(dec)))}>+</button>
    </div>
  );
}

// ─── STOCK BAR ────────────────────────────────────────────────────────────────
function StockBar({ current, max, unit }) {
  const pct = max > 0 ? Math.min((current / max) * 100, 100) : 0;
  const col = pct < 25 ? C.red : pct < 50 ? C.yellow : C.green;
  return (
    <div className="stock-level">
      <div className="stock-bar-wrap">
        <div className="stock-bar-fill" style={{ width: `${pct}%`, background: col }} />
      </div>
      <div className="stock-val" style={{ color: col }}>{fmt(current, 1)} {unit}</div>
    </div>
  );
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
function Dashboard({ data, setData, toast, setPage }) {
  const { artikel, lager, verbrauch } = data;
  const totalWert = lager.reduce((s, l) => s + l.menge * l.ek, 0);
  const unterMindest = artikel.filter(a => getLB(lager, a.id) < a.mindestbestand).length;
  const mhdAlarm = lager.filter(l => daysDiff(l.mhd) <= 3 && daysDiff(l.mhd) >= 0).length;
  const heuteVb = verbrauch
    .filter(v => v.datum === todayStr())
    .reduce((s, v) => s + v.menge * (getA(artikel, v.artikelId)?.ek || 0), 0);

  const wochentage = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
  const mockBars = [840, 1120, 980, 1350, 1620, 1890, 730];
  const maxB = Math.max(...mockBars);
  const mhdWarn = lager.filter(l => daysDiff(l.mhd) >= 0 && daysDiff(l.mhd) <= 7);

  return (
    <div>
      {mhdAlarm > 0 && (
        <div className="alert danger">
          <span className="alert-icon">🚨</span>
          <div className="alert-text">{mhdAlarm} Artikel laufen in ≤3 Tagen ab – sofort prüfen!</div>
        </div>
      )}
      {unterMindest > 0 && (
        <div className="alert warn">
          <span className="alert-icon">📦</span>
          <div className="alert-text">{unterMindest} Artikel unter Mindestbestand – Bestellung empfohlen</div>
          <button className="btn btn-ghost btn-sm" onClick={() => setPage('bestellungen')}>Anzeigen</button>
        </div>
      )}

      <div className="kpi-grid">
        <div className="kpi-card blue">
          <div className="kpi-icon">💰</div>
          <div className="kpi-val">{fmtE(totalWert)}</div>
          <div className="kpi-lbl">Lagerwert</div>
          <div className="kpi-sub">{lager.length} Positionen</div>
        </div>
        <div className="kpi-card red">
          <div className="kpi-icon">⏰</div>
          <div className="kpi-val">{mhdAlarm}</div>
          <div className="kpi-lbl">MHD-Alarm</div>
          <div className="kpi-sub">≤3 Tage Restlaufzeit</div>
        </div>
        <div className="kpi-card yellow">
          <div className="kpi-icon">📉</div>
          <div className="kpi-val">{unterMindest}</div>
          <div className="kpi-lbl">Unterbestand</div>
          <div className="kpi-sub">von {artikel.length} Artikeln</div>
        </div>
        <div className="kpi-card green">
          <div className="kpi-icon">🍽</div>
          <div className="kpi-val">{fmtE(heuteVb)}</div>
          <div className="kpi-lbl">Verbrauch heute</div>
          <div className="kpi-sub">Wareneinsatz</div>
        </div>
      </div>

      <div style={{ marginBottom: 8 }}>
        <span className="sec-title" style={{ fontSize: 16 }}>Schnellzugriff</span>
      </div>
      <div className="action-grid">
        <button className="action-tile blue" onClick={() => setPage('wareneingang')}>
          <div className="tile-icon">🚚</div>
          <div><div className="tile-label">Ware einbuchen</div><div className="tile-sub">Wareneingang erfassen</div></div>
        </button>
        <button className="action-tile green" onClick={() => setPage('rezepturen')}>
          <div className="tile-icon">👨‍🍳</div>
          <div><div className="tile-label">Produktion starten</div><div className="tile-sub">Rezeptur abbuchen</div></div>
        </button>
        <button className="action-tile orange" onClick={() => setPage('inventur')}>
          <div className="tile-icon">🔢</div>
          <div><div className="tile-label">Inventur</div><div className="tile-sub">Bestände zählen</div></div>
        </button>
        <button className="action-tile purple" onClick={() => setPage('lager')}>
          <div className="tile-icon">📦</div>
          <div><div className="tile-label">Lager prüfen</div><div className="tile-sub">Bestände &amp; MHD</div></div>
        </button>
      </div>

      <div className="card">
        <div className="card-head"><span className="card-title">📊 Wochenverbrauch (Wareneinsatz €)</span></div>
        <div style={{ padding: '16px 16px 12px' }}>
          <div className="bar-chart">
            {mockBars.map((v, i) => (
              <div key={i} className="bar-col">
                <div className="bar-fill" style={{
                  height: `${(v / maxB) * 100}%`,
                  background: i === 4 ? C.blue : C.blueLight,
                  border: `1.5px solid ${i === 4 ? C.blue : C.border}`
                }} />
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
            {wochentage.map(d => (
              <div key={d} style={{ flex: 1, textAlign: 'center', fontSize: 9, fontWeight: 800, color: C.textLight }}>{d}</div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 24, marginTop: 12, paddingTop: 10, borderTop: `1px solid ${C.border}` }}>
            <div>
              <div style={{ fontSize: 11, color: C.textLight, fontWeight: 700, textTransform: 'uppercase' }}>Ø / Tag</div>
              <div className="mono" style={{ fontSize: 16, fontWeight: 700, color: C.blue }}>{fmtE(mockBars.reduce((a, b) => a + b, 0) / 7)}</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: C.textLight, fontWeight: 700, textTransform: 'uppercase' }}>Woche gesamt</div>
              <div className="mono" style={{ fontSize: 16, fontWeight: 700 }}>{fmtE(mockBars.reduce((a, b) => a + b, 0))}</div>
            </div>
          </div>
        </div>
      </div>

      {mhdWarn.length > 0 && (
        <div className="card">
          <div className="card-head"><span className="card-title">⏰ MHD läuft bald ab</span></div>
          <table className="tbl">
            <thead><tr><th>Artikel</th><th>Lagerort</th><th>Menge</th><th>MHD</th></tr></thead>
            <tbody>
              {mhdWarn.sort((a, b) => new Date(a.mhd) - new Date(b.mhd)).map(l => {
                const art = getA(artikel, l.artikelId);
                const days = daysDiff(l.mhd);
                return (
                  <tr key={l.id}>
                    <td style={{ fontWeight: 800 }}>{art?.name}</td>
                    <td style={{ color: C.textMid }}>{l.lagerort}</td>
                    <td className="mono">{fmt(l.menge, 1)} {art?.einheit}</td>
                    <td><Badge type={mhdBadge(days)}>{mhdLabel(days)}</Badge></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ─── LAGER ────────────────────────────────────────────────────────────────────
function Lager({ data, setData, toast }) {
  const { artikel, lager } = data;
  const [search, setSearch] = useState('');
  const [kat, setKat] = useState('Alle');
  const [abgangModal, setAbgangModal] = useState(null);
  const [abgangMenge, setAbgangMenge] = useState(1);

  const kategorien = [...new Set(artikel.map(a => a.kategorie))].sort();

  const rows = artikel.map(a => ({
    ...a,
    bestand: getLB(lager, a.id),
    positionen: lager.filter(l => l.artikelId === a.id).sort((x, y) => new Date(x.mhd) - new Date(y.mhd)),
  })).filter(a => {
    const q = search.toLowerCase();
    return (!q || a.name.toLowerCase().includes(q) || a.kategorie.toLowerCase().includes(q))
      && (kat === 'Alle' || a.kategorie === kat);
  });

  function buchAbgang() {
    if (!abgangModal) return;
    const { lagerPos, art } = abgangModal;
    const menge = Math.min(abgangMenge, lagerPos.menge);
    setData(d => ({
      ...d,
      lager: d.lager.map(l => l.id === lagerPos.id ? { ...l, menge: l.menge - menge } : l).filter(l => l.menge > 0),
      verbrauch: [...d.verbrauch, { id: Date.now(), datum: todayStr(), artikelId: art.id, menge, grund: 'Manuelle Entnahme' }],
    }));
    toast(`${fmt(menge, 2)} ${art.einheit} ${art.name} entnommen`, 'success');
    setAbgangModal(null);
  }

  return (
    <div>
      <div style={{ display: 'flex', gap: 10, marginBottom: 14, flexWrap: 'wrap' }}>
        <div className="search-wrap" style={{ minWidth: 200, flex: 1 }}>
          <span className="search-icon">🔍</span>
          <input placeholder="Artikel suchen…" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select value={kat} onChange={e => setKat(e.target.value)} style={{ width: 150, flex: 'none' }}>
          <option>Alle</option>
          {kategorien.map(k => <option key={k}>{k}</option>)}
        </select>
      </div>

      <div className="card">
        <table className="tbl">
          <thead>
            <tr><th>Artikel</th><th>Kategorie</th><th>Bestand / Mindest</th><th>MHD (nächste)</th><th>Lagerwert</th><th>Aktion</th></tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr><td colSpan={6}>
                <div className="empty"><div className="empty-icon">📦</div><div className="empty-title">Nichts gefunden</div></div>
              </td></tr>
            )}
            {rows.map(a => {
              const np = a.positionen[0];
              const days = np ? daysDiff(np.mhd) : null;
              const wert = a.bestand * (np?.ek || a.ek);
              return (
                <tr key={a.id}>
                  <td>
                    <div style={{ fontWeight: 800 }}>{a.name}</div>
                    {a.bestand < a.mindestbestand && <div style={{ fontSize: 11, color: C.red, fontWeight: 700 }}>⚠ Unterbestand</div>}
                  </td>
                  <td><Badge type="gray">{a.kategorie}</Badge></td>
                  <td style={{ minWidth: 160 }}>
                    <StockBar current={a.bestand} max={a.mindestbestand * 3} unit={a.einheit} />
                    <div style={{ fontSize: 11, color: C.textLight, marginTop: 3, fontWeight: 700 }}>Min: {fmt(a.mindestbestand, 0)} {a.einheit}</div>
                  </td>
                  <td>
                    {np
                      ? <Badge type={mhdBadge(days)}>{np.mhd} ({mhdLabel(days)})</Badge>
                      : <span style={{ color: C.textLight }}>—</span>}
                  </td>
                  <td className="mono" style={{ color: C.blue, fontWeight: 800 }}>{fmtE(wert)}</td>
                  <td>
                    {np && (
                      <button className="btn btn-ghost btn-sm" onClick={() => { setAbgangModal({ lagerPos: np, art: a }); setAbgangMenge(1); }}>
                        Entnahme
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="card">
        <div className="card-head"><span className="card-title">🏷 Alle Chargen (FIFO-Reihenfolge)</span></div>
        <table className="tbl">
          <thead><tr><th>Artikel</th><th>Charge</th><th>Menge</th><th>EK</th><th>MHD</th><th>Lagerort</th></tr></thead>
          <tbody>
            {[...lager].sort((a, b) => new Date(a.mhd) - new Date(b.mhd)).map(l => {
              const art = getA(artikel, l.artikelId);
              const days = daysDiff(l.mhd);
              return (
                <tr key={l.id}>
                  <td style={{ fontWeight: 700 }}>{art?.name}</td>
                  <td style={{ color: C.textMid }}>{l.charge}</td>
                  <td className="mono">{fmt(l.menge, 2)} {art?.einheit}</td>
                  <td className="mono">{fmtE(l.ek)}</td>
                  <td><Badge type={mhdBadge(days)}>{l.mhd}</Badge></td>
                  <td style={{ color: C.textMid }}>{l.lagerort}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {abgangModal && (
        <Modal title={`Entnahme: ${abgangModal.art.name}`} onClose={() => setAbgangModal(null)}
          footer={<>
            <button className="btn btn-primary btn-xl" onClick={buchAbgang}>
              ✅ {fmt(abgangMenge, 2)} {abgangModal.art.einheit} entnehmen
            </button>
            <button className="btn btn-ghost" style={{ width: '100%' }} onClick={() => setAbgangModal(null)}>Abbrechen</button>
          </>}>
          <div className="alert info">
            <span className="alert-icon">📦</span>
            <div className="alert-text">
              Charge: {abgangModal.lagerPos.charge} · MHD: {abgangModal.lagerPos.mhd}<br />
              Verfügbar: {fmt(abgangModal.lagerPos.menge, 2)} {abgangModal.art.einheit}
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Menge ({abgangModal.art.einheit})</label>
            <QtyPicker value={abgangMenge} onChange={setAbgangMenge} step={0.1} min={0.1} />
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─── WARENEINGANG ─────────────────────────────────────────────────────────────
function Wareneingang({ data, setData, toast }) {
  const { lieferanten, artikel, wareneingaenge } = data;
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ lieferantId: '', datum: todayStr(), belegnr: '', positionen: [] });
  const [pos, setPos] = useState({ artikelId: '', menge: 1, ek: '', mhd: '', lagerort: 'Kühlraum A' });
  const lagerorte = ['Kühlraum A', 'Kühlraum B', 'Weinkeller', 'Trockenlager', 'Tiefkühl'];

  function resetForm() {
    setStep(0);
    setForm({ lieferantId: '', datum: todayStr(), belegnr: '', positionen: [] });
    setPos({ artikelId: '', menge: 1, ek: '', mhd: '', lagerort: 'Kühlraum A' });
  }

  function addPos() {
    if (!pos.artikelId || !pos.menge) return;
    const art = getA(artikel, Number(pos.artikelId));
    setForm(f => ({
      ...f,
      positionen: [...f.positionen, { ...pos, id: Date.now(), artName: art?.name, artEinheit: art?.einheit }]
    }));
    setPos({ artikelId: '', menge: 1, ek: '', mhd: '', lagerort: 'Kühlraum A' });
    toast(`${art?.name} hinzugefügt`, 'info');
  }

  function buchen() {
    if (!form.lieferantId || !form.positionen.length) return;
    const belegnr = form.belegnr || `WE-${Date.now().toString().slice(-5)}`;
    const we = {
      id: Date.now(), lieferantId: Number(form.lieferantId),
      datum: form.datum, status: 'Gebucht', belegnr,
      positionen: form.positionen.map(p => ({
        artikelId: Number(p.artikelId), menge: Number(p.menge),
        ek: Number(p.ek), mhd: p.mhd,
      })),
    };
    const newLager = form.positionen.map(p => {
      const art = getA(artikel, Number(p.artikelId));
      return {
        id: Date.now() + Math.random(), artikelId: Number(p.artikelId),
        menge: Number(p.menge), ek: Number(p.ek) || art?.ek || 0,
        mhd: p.mhd || '2026-12-31', lagerort: p.lagerort,
        charge: `CH-${Date.now().toString().slice(-4)}`, eingang: todayStr(),
      };
    });
    setData(d => ({ ...d, wareneingaenge: [we, ...d.wareneingaenge], lager: [...d.lager, ...newLager] }));
    toast(`Wareneingang ${belegnr} gebucht (${we.positionen.length} Pos.)`, 'success');
    resetForm();
  }

  // STEP 0 – Liste
  if (step === 0) {
    return (
      <div>
        <button className="btn btn-primary btn-lg" style={{ width: '100%', marginBottom: 16 }} onClick={() => setStep(1)}>
          + Wareneingang erfassen
        </button>
        <div className="card">
          <div className="card-head"><span className="card-title">Letzte Wareneingänge</span></div>
          {wareneingaenge.length === 0
            ? <div className="empty"><div className="empty-icon">🚚</div><div className="empty-title">Noch keine Eingänge</div></div>
            : (
              <table className="tbl">
                <thead><tr><th>Beleg-Nr.</th><th>Datum</th><th>Lieferant</th><th>Pos.</th><th>Wert</th><th>Status</th></tr></thead>
                <tbody>
                  {wareneingaenge.map(we => {
                    const lief = getL(lieferanten, we.lieferantId);
                    const wert = we.positionen.reduce((s, p) => s + p.menge * p.ek, 0);
                    return (
                      <tr key={we.id}>
                        <td style={{ fontWeight: 800, color: C.blue }}>{we.belegnr}</td>
                        <td>{we.datum}</td>
                        <td>{lief?.name}</td>
                        <td className="mono">{we.positionen.length}</td>
                        <td className="mono">{fmtE(wert)}</td>
                        <td><Badge type="green">{we.status}</Badge></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
        </div>
      </div>
    );
  }

  // STEP 1 – Kopfdaten
  if (step === 1) {
    return (
      <div>
        <div className="steps"><div className="step done" /><div className="step" /></div>
        <div className="sec-head">
          <div><div className="sec-title">1. Lieferant &amp; Datum</div>
            <div className="sec-sub">Lieferant und Lieferdatum wählen</div></div>
        </div>
        <div className="card" style={{ padding: 20 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div className="form-group">
              <label className="form-label">Lieferant *</label>
              <select value={form.lieferantId} onChange={e => setForm(f => ({ ...f, lieferantId: e.target.value }))}>
                <option value="">— Lieferant wählen —</option>
                {lieferanten.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
              </select>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Lieferdatum</label>
                <input type="date" value={form.datum} onChange={e => setForm(f => ({ ...f, datum: e.target.value }))} />
              </div>
              <div className="form-group">
                <label className="form-label">Lieferschein-Nr.</label>
                <input placeholder="Automatisch" value={form.belegnr} onChange={e => setForm(f => ({ ...f, belegnr: e.target.value }))} />
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
          <button className="btn btn-ghost" style={{ flex: 1 }} onClick={resetForm}>Abbrechen</button>
          <button className="btn btn-primary" style={{ flex: 2 }} disabled={!form.lieferantId} onClick={() => setStep(2)}>
            Weiter → Positionen
          </button>
        </div>
      </div>
    );
  }

  // STEP 2 – Positionen
  return (
    <div>
      <div className="steps"><div className="step done" /><div className="step done" /></div>
      <div className="sec-head">
        <div>
          <div className="sec-title">2. Positionen erfassen</div>
          <div className="sec-sub">{getL(lieferanten, Number(form.lieferantId))?.name} · {form.datum}</div>
        </div>
      </div>

      {form.positionen.length > 0 && (
        <div className="pos-list" style={{ marginBottom: 14 }}>
          {form.positionen.map((p, i) => (
            <div key={p.id} className="pos-item">
              <div style={{ flex: 1 }}>
                <div className="pos-item-name">{p.artName}</div>
                <div className="pos-item-detail">{fmt(p.menge, 2)} {p.artEinheit} · {fmtE(p.ek)}/Stk · MHD: {p.mhd || '—'} · {p.lagerort}</div>
              </div>
              <button className="pos-remove" onClick={() => setForm(f => ({ ...f, positionen: f.positionen.filter((_, j) => j !== i) }))}>✕</button>
            </div>
          ))}
        </div>
      )}

      <div className="card" style={{ padding: 16 }}>
        <div style={{ fontSize: 12, fontWeight: 800, color: C.textMid, textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: 12 }}>
          Position hinzufügen
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div className="form-group">
            <label className="form-label">Artikel *</label>
            <select value={pos.artikelId} onChange={e => {
              const art = getA(artikel, Number(e.target.value));
              setPos(p => ({ ...p, artikelId: e.target.value, ek: art?.ek || '' }));
            }}>
              <option value="">— Artikel wählen —</option>
              {artikel.map(a => <option key={a.id} value={a.id}>{a.name} ({a.einheit})</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Menge</label>
            <QtyPicker value={pos.menge} onChange={v => setPos(p => ({ ...p, menge: v }))} step={0.5} min={0.1} />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">EK-Preis (€)</label>
              <input type="number" min="0" step="0.01" value={pos.ek} onChange={e => setPos(p => ({ ...p, ek: e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="form-label">MHD</label>
              <input type="date" value={pos.mhd} onChange={e => setPos(p => ({ ...p, mhd: e.target.value }))} />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Lagerort</label>
            <select value={pos.lagerort} onChange={e => setPos(p => ({ ...p, lagerort: e.target.value }))}>
              {lagerorte.map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
          <button className="btn btn-primary" onClick={addPos} disabled={!pos.artikelId}>
            + Position hinzufügen
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
        <button className="btn btn-ghost" style={{ flex: 1 }} onClick={() => setStep(1)}>← Zurück</button>
        <button className="btn btn-primary" style={{ flex: 2 }} disabled={!form.positionen.length} onClick={buchen}>
          ✅ {form.positionen.length} Position{form.positionen.length !== 1 ? 'en' : ''} buchen
        </button>
      </div>
    </div>
  );
}

// ─── REZEPTUREN ───────────────────────────────────────────────────────────────
function Rezepturen({ data, setData, toast }) {
  const { rezepturen, artikel, lager } = data;
  const [selected, setSelected] = useState(null);
  const [portionen, setPortionen] = useState(1);

  function produzieren() {
    if (!selected) return;
    const changes = {};
    for (const z of selected.zutaten) {
      let needed = z.menge * portionen;
      const chargen = lager
        .filter(l => l.artikelId === z.artikelId)
        .sort((a, b) => new Date(a.mhd) - new Date(b.mhd));
      for (const ch of chargen) {
        if (needed <= 0) break;
        const take = Math.min(ch.menge, needed);
        changes[ch.id] = (changes[ch.id] !== undefined ? changes[ch.id] : ch.menge) - take;
        needed -= take;
      }
    }
    const newVerbrauch = selected.zutaten.map(z => ({
      id: Date.now() + Math.random(), datum: todayStr(), artikelId: z.artikelId,
      menge: z.menge * portionen, grund: `Produktion: ${selected.name} (${portionen} Port.)`,
    }));
    setData(d => ({
      ...d,
      lager: d.lager.map(l => changes[l.id] !== undefined ? { ...l, menge: changes[l.id] } : l).filter(l => l.menge > 0),
      verbrauch: [...d.verbrauch, ...newVerbrauch],
    }));
    toast(`${portionen} Port. "${selected.name}" produziert – Lager aktualisiert (FIFO)`, 'success');
    setSelected(null);
    setPortionen(1);
  }

  return (
    <div>
      <div className="rez-grid">
        {rezepturen.map(rez => {
          const kosten = getRezKosten(rez, artikel, lager);
          const marge = rez.vkPreis - kosten;
          const margeP = (marge / rez.vkPreis) * 100;
          const machbar = rez.zutaten.every(z => getLB(lager, z.artikelId) >= z.menge);
          return (
            <div key={rez.id} className={`rez-card${selected?.id === rez.id ? ' selected' : ''}`}
              onClick={() => { setSelected(rez); setPortionen(1); }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 900, color: C.text, marginBottom: 4 }}>{rez.name}</div>
                  <Badge type="gray">{rez.kategorie}</Badge>
                </div>
                <Badge type={machbar ? 'green' : 'red'}>{machbar ? '✓ Produzierbar' : '✗ Fehlend'}</Badge>
              </div>
              <div style={{ marginTop: 10 }}>
                {rez.zutaten.map((z, i) => {
                  const art = getA(artikel, z.artikelId);
                  const bestand = getLB(lager, z.artikelId);
                  const ok = bestand >= z.menge;
                  return (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: `1px solid ${C.border}`, fontSize: 13, fontWeight: 600 }}>
                      <span style={{ color: ok ? C.text : C.red }}>{art?.name}</span>
                      <span style={{ color: C.textMid }}>{fmt(z.menge, 3)} {z.einheit}</span>
                    </div>
                  );
                })}
              </div>
              <div className="rez-stats">
                <div className="rez-stat">
                  <div className="rez-stat-lbl">Wareneinsatz</div>
                  <div className="rez-stat-val" style={{ color: C.red }}>{fmtE(kosten)}</div>
                </div>
                <div className="rez-stat">
                  <div className="rez-stat-lbl">VK-Preis</div>
                  <div className="rez-stat-val" style={{ color: C.blue }}>{fmtE(rez.vkPreis)}</div>
                </div>
                <div className="rez-stat">
                  <div className="rez-stat-lbl">Marge</div>
                  <div className="rez-stat-val" style={{ color: margeP > 60 ? C.green : margeP > 40 ? C.yellow : C.red }}>
                    {fmt(margeP, 1)}%
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {selected && (
        <Modal title={`Produktion: ${selected.name}`} onClose={() => { setSelected(null); setPortionen(1); }}
          footer={<>
            <button className="btn btn-primary btn-xl" onClick={produzieren}>
              👨‍🍳 {portionen} Portion{portionen !== 1 ? 'en' : ''} produzieren
            </button>
            <button className="btn btn-ghost" style={{ width: '100%' }} onClick={() => { setSelected(null); setPortionen(1); }}>
              Abbrechen
            </button>
          </>}>
          <div className="form-group">
            <label className="form-label">Anzahl Portionen</label>
            <QtyPicker value={portionen} onChange={setPortionen} step={1} min={1} />
          </div>
          <div style={{ background: C.bg, borderRadius: 14, padding: 14, border: `1.5px solid ${C.border}` }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: C.textMid, textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: 10 }}>
              Abbuchung (FIFO)
            </div>
            {selected.zutaten.map((z, i) => {
              const art = getA(artikel, z.artikelId);
              const benoetigt = z.menge * portionen;
              const bestand = getLB(lager, z.artikelId);
              const ok = bestand >= benoetigt;
              return (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: i < selected.zutaten.length - 1 ? `1px solid ${C.border}` : 'none', fontSize: 13, fontWeight: 700 }}>
                  <span style={{ color: ok ? C.text : C.red }}>{art?.name}</span>
                  <span style={{ color: ok ? C.textMid : C.red }}>
                    {fmt(benoetigt, 3)} {z.einheit}
                    {!ok && ` ⚠ (nur ${fmt(bestand, 2)} da)`}
                  </span>
                </div>
              );
            })}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, paddingTop: 10, borderTop: `1.5px solid ${C.border}` }}>
              <span style={{ fontWeight: 800, color: C.textMid }}>Wareneinsatz gesamt</span>
              <span className="mono" style={{ fontWeight: 800, color: C.blue, fontSize: 16 }}>
                {fmtE(getRezKosten(selected, artikel, lager) * portionen)}
              </span>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─── INVENTUR ────────────────────────────────────────────────────────────────
function Inventur({ data, setData, toast }) {
  const { artikel, lager } = data;
  const [counts, setCounts] = useState({});
  const [gebucht, setGebucht] = useState(false);

  const rows = artikel.map(a => {
    const soll = getLB(lager, a.id);
    const ist = counts[a.id] !== undefined ? Number(counts[a.id]) : soll;
    return { ...a, soll, ist, diff: parseFloat((ist - soll).toFixed(3)) };
  });

  const diffWert = rows.reduce((s, a) => s + (counts[a.id] !== undefined ? a.diff * a.ek : 0), 0);
  const changedCount = rows.filter(a => counts[a.id] !== undefined && a.diff !== 0).length;

  function buchen() {
    setData(d => {
      let newLager = [...d.lager];
      const newVerbrauch = [];
      rows.forEach(a => {
        if (counts[a.id] === undefined || a.diff === 0) return;
        if (a.diff < 0) {
          let needed = Math.abs(a.diff);
          newLager = newLager.map(l => {
            if (l.artikelId !== a.id || needed <= 0) return l;
            const take = Math.min(l.menge, needed);
            needed -= take;
            return { ...l, menge: l.menge - take };
          }).filter(l => l.menge > 0);
          newVerbrauch.push({ id: Date.now() + Math.random(), datum: todayStr(), artikelId: a.id, menge: Math.abs(a.diff), grund: 'Inventurkorrektur (Schwund)' });
        } else {
          newLager.push({ id: Date.now() + Math.random(), artikelId: a.id, menge: a.diff, ek: a.ek, mhd: '2026-12-31', lagerort: 'Unbekannt', charge: `INV-${todayStr()}`, eingang: todayStr() });
        }
      });
      return { ...d, lager: newLager, verbrauch: [...d.verbrauch, ...newVerbrauch] };
    });
    toast('Inventur gebucht – Lagerbestände aktualisiert', 'success');
    setGebucht(true);
    setCounts({});
  }

  return (
    <div>
      {gebucht && (
        <div className="alert success" style={{ marginBottom: 14 }}>
          <span className="alert-icon">✅</span>
          <div className="alert-text">Inventur erfolgreich gebucht! Bestände wurden korrigiert.</div>
        </div>
      )}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, gap: 10, flexWrap: 'wrap' }}>
        <div>
          <div className="sec-title">Inventurerfassung</div>
          <div className="sec-sub">{todayStr()} · {changedCount} Artikel geändert</div>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {diffWert !== 0 && (
            <div style={{ fontSize: 13, fontWeight: 800, color: diffWert < 0 ? C.red : C.green }}>
              Differenz: {diffWert > 0 ? '+' : ''}{fmtE(diffWert)}
            </div>
          )}
          <button className="btn btn-primary" onClick={buchen} disabled={changedCount === 0}>
            Inventur buchen ({changedCount})
          </button>
        </div>
      </div>
      <div className="card">
        {rows.map(a => (
          <div key={a.id} className="inv-row">
            <div className="inv-name">
              {a.name}
              <div style={{ fontSize: 11, color: C.textMid, fontWeight: 600 }}>{a.einheit} · {a.kategorie}</div>
            </div>
            <div className="inv-soll">Soll: {fmt(a.soll, 2)}</div>
            <div style={{ width: 120, flexShrink: 0 }}>
              <input type="number" min="0" step="0.01" style={{ textAlign: 'right', minHeight: 44 }}
                value={counts[a.id] !== undefined ? counts[a.id] : fmt(a.soll, 2)}
                onChange={e => setCounts(c => ({ ...c, [a.id]: e.target.value }))}
              />
            </div>
            {counts[a.id] !== undefined && a.diff !== 0 && (
              <div style={{ width: 70, textAlign: 'right', fontWeight: 800, fontSize: 13, color: a.diff < 0 ? C.red : C.green, flexShrink: 0 }}>
                {a.diff > 0 ? '+' : ''}{fmt(a.diff, 2)}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── BESTELLUNGEN ─────────────────────────────────────────────────────────────
function Bestellungen({ data, setData, toast }) {
  const { artikel, lager, lieferanten, bestellungen } = data;

  const vorschlaege = artikel
    .filter(a => getLB(lager, a.id) < a.mindestbestand)
    .map(a => ({ ...a, bestand: getLB(lager, a.id), fehlmenge: a.mindestbestand - getLB(lager, a.id) }));

  function bestellenAlle() {
    const byLief = {};
    vorschlaege.forEach(a => {
      if (!byLief[a.lieferantId]) byLief[a.lieferantId] = [];
      byLief[a.lieferantId].push({ artikelId: a.id, menge: a.fehlmenge * 2, ek: a.ek });
    });
    const newBest = Object.entries(byLief).map(([lid, pos]) => ({
      id: Date.now() + Math.random(), lieferantId: Number(lid),
      datum: todayStr(), status: 'Offen',
      belegnr: `BE-${Date.now().toString().slice(-5)}`, positionen: pos,
    }));
    setData(d => ({ ...d, bestellungen: [...newBest, ...d.bestellungen] }));
    toast(`${newBest.length} Bestellung(en) angelegt`, 'success');
  }

  function bestaetigen(id) {
    setData(d => ({ ...d, bestellungen: d.bestellungen.map(b => b.id === id ? { ...b, status: 'Bestellt' } : b) }));
    toast('Bestellung als bestellt markiert', 'info');
  }

  return (
    <div>
      {vorschlaege.length > 0 && (
        <>
          <div className="alert warn">
            <span className="alert-icon">📋</span>
            <div className="alert-text">{vorschlaege.length} Artikel unter Mindestbestand</div>
            <button className="btn btn-primary btn-sm" onClick={bestellenAlle}>Alle bestellen</button>
          </div>
          <div className="card">
            <div className="card-head"><span className="card-title">📋 Bestellvorschlag</span></div>
            <table className="tbl">
              <thead><tr><th>Artikel</th><th>Lieferant</th><th>Bestand</th><th>Mindest</th><th>Vorschlag</th><th>EK-Wert</th></tr></thead>
              <tbody>
                {vorschlaege.map(a => {
                  const lief = getL(lieferanten, a.lieferantId);
                  const menge = a.fehlmenge * 2;
                  return (
                    <tr key={a.id}>
                      <td style={{ fontWeight: 800 }}>{a.name}</td>
                      <td style={{ color: C.textMid }}>{lief?.name || '—'}</td>
                      <td className="mono" style={{ color: C.red }}>{fmt(a.bestand, 1)} {a.einheit}</td>
                      <td className="mono">{fmt(a.mindestbestand, 0)} {a.einheit}</td>
                      <td className="mono" style={{ color: C.blue, fontWeight: 800 }}>{fmt(menge, 0)} {a.einheit}</td>
                      <td className="mono">{fmtE(menge * a.ek)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}

      <div className="card">
        <div className="card-head"><span className="card-title">Bestellungen</span></div>
        {bestellungen.length === 0
          ? <div className="empty"><div className="empty-icon">📋</div><div className="empty-title">Keine Bestellungen vorhanden</div></div>
          : (
            <table className="tbl">
              <thead><tr><th>Beleg-Nr.</th><th>Datum</th><th>Lieferant</th><th>Pos.</th><th>Wert</th><th>Status</th><th></th></tr></thead>
              <tbody>
                {bestellungen.map(b => {
                  const lief = getL(lieferanten, b.lieferantId);
                  const wert = b.positionen.reduce((s, p) => s + p.menge * p.ek, 0);
                  return (
                    <tr key={b.id}>
                      <td style={{ fontWeight: 800, color: C.blue }}>{b.belegnr}</td>
                      <td>{b.datum}</td>
                      <td>{lief?.name}</td>
                      <td className="mono">{b.positionen.length}</td>
                      <td className="mono">{fmtE(wert)}</td>
                      <td><Badge type={b.status === 'Offen' ? 'yellow' : 'green'}>{b.status}</Badge></td>
                      <td>
                        {b.status === 'Offen' && (
                          <button className="btn btn-ghost btn-sm" onClick={() => bestaetigen(b.id)}>Bestätigen</button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
      </div>
    </div>
  );
}

// ─── STAMMDATEN ───────────────────────────────────────────────────────────────
function Stammdaten({ data, setData, toast }) {
  const [tab, setTab] = useState('artikel');
  const { artikel, lieferanten } = data;
  const [artModal, setArtModal] = useState(false);
  const [liefModal, setLiefModal] = useState(false);
  const [artForm, setArtForm] = useState({ name: '', einheit: 'kg', kategorie: 'Fleisch', lieferantId: '', mindestbestand: 5, ek: '', mwst: 7 });
  const [liefForm, setLiefForm] = useState({ name: '', kuerzel: '', kontakt: '', telefon: '', email: '', zahlungsziel: 14 });
  const kategorien = ['Fleisch', 'Fisch', 'Gemüse', 'Obst', 'Molkerei', 'Wein', 'Getränke', 'Trocken', 'Gewürze', 'Sonstiges'];

  function saveArt() {
    if (!artForm.name) return;
    setData(d => ({
      ...d,
      artikel: [...d.artikel, {
        ...artForm, id: Date.now(),
        lieferantId: Number(artForm.lieferantId),
        mindestbestand: Number(artForm.mindestbestand),
        ek: Number(artForm.ek),
        mwst: Number(artForm.mwst),
      }],
    }));
    toast(`${artForm.name} angelegt`, 'success');
    setArtModal(false);
    setArtForm({ name: '', einheit: 'kg', kategorie: 'Fleisch', lieferantId: '', mindestbestand: 5, ek: '', mwst: 7 });
  }

  function saveLief() {
    if (!liefForm.name) return;
    setData(d => ({
      ...d,
      lieferanten: [...d.lieferanten, { ...liefForm, id: Date.now(), zahlungsziel: Number(liefForm.zahlungsziel) }],
    }));
    toast(`${liefForm.name} angelegt`, 'success');
    setLiefModal(false);
    setLiefForm({ name: '', kuerzel: '', kontakt: '', telefon: '', email: '', zahlungsziel: 14 });
  }

  return (
    <div>
      <div className="tabs">
        <button className={`tab-btn${tab === 'artikel' ? ' active' : ''}`} onClick={() => setTab('artikel')}>🏷 Artikel ({artikel.length})</button>
        <button className={`tab-btn${tab === 'lieferanten' ? ' active' : ''}`} onClick={() => setTab('lieferanten')}>🏢 Lieferanten ({lieferanten.length})</button>
      </div>

      {tab === 'artikel' && (
        <>
          <button className="btn btn-primary btn-lg" style={{ marginBottom: 14, width: '100%' }} onClick={() => setArtModal(true)}>
            + Artikel anlegen
          </button>
          <div className="card">
            <table className="tbl">
              <thead><tr><th>Artikel</th><th>Kategorie</th><th>Einheit</th><th>EK</th><th>MwSt.</th><th>Mindestbestand</th></tr></thead>
              <tbody>
                {artikel.map(a => (
                  <tr key={a.id}>
                    <td style={{ fontWeight: 800 }}>{a.name}</td>
                    <td><Badge type="gray">{a.kategorie}</Badge></td>
                    <td style={{ color: C.textMid }}>{a.einheit}</td>
                    <td className="mono">{fmtE(a.ek)}</td>
                    <td style={{ color: C.textMid }}>{a.mwst}%</td>
                    <td className="mono">{a.mindestbestand} {a.einheit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {tab === 'lieferanten' && (
        <>
          <button className="btn btn-primary btn-lg" style={{ marginBottom: 14, width: '100%' }} onClick={() => setLiefModal(true)}>
            + Lieferant anlegen
          </button>
          <div className="card">
            <table className="tbl">
              <thead><tr><th>Name</th><th>Kürzel</th><th>Kontakt</th><th>E-Mail</th><th>Zahlungsziel</th></tr></thead>
              <tbody>
                {lieferanten.map(l => (
                  <tr key={l.id}>
                    <td style={{ fontWeight: 800 }}>{l.name}</td>
                    <td><Badge type="blue">{l.kuerzel}</Badge></td>
                    <td style={{ color: C.textMid }}>{l.kontakt}</td>
                    <td style={{ color: C.textMid }}>{l.email}</td>
                    <td className="mono">{l.zahlungsziel} Tage</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {artModal && (
        <Modal title="Artikel anlegen" onClose={() => setArtModal(false)}
          footer={<>
            <button className="btn btn-primary btn-xl" onClick={saveArt}>Artikel speichern</button>
            <button className="btn btn-ghost" style={{ width: '100%' }} onClick={() => setArtModal(false)}>Abbrechen</button>
          </>}>
          <div className="form-group">
            <label className="form-label">Bezeichnung *</label>
            <input value={artForm.name} placeholder="z.B. Rinderfilet" onChange={e => setArtForm(f => ({ ...f, name: e.target.value }))} />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Einheit</label>
              <select value={artForm.einheit} onChange={e => setArtForm(f => ({ ...f, einheit: e.target.value }))}>
                {['kg', 'g', 'l', 'ml', 'Stk', 'Pkg', 'Fl', 'Kiste'].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Kategorie</label>
              <select value={artForm.kategorie} onChange={e => setArtForm(f => ({ ...f, kategorie: e.target.value }))}>
                {kategorien.map(k => <option key={k}>{k}</option>)}
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">EK-Preis (€)</label>
              <input type="number" min="0" step="0.01" value={artForm.ek} onChange={e => setArtForm(f => ({ ...f, ek: e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="form-label">MwSt. (%)</label>
              <select value={artForm.mwst} onChange={e => setArtForm(f => ({ ...f, mwst: e.target.value }))}>
                <option value={7}>7%</option>
                <option value={19}>19%</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Lieferant</label>
              <select value={artForm.lieferantId} onChange={e => setArtForm(f => ({ ...f, lieferantId: e.target.value }))}>
                <option value="">— wählen —</option>
                {lieferanten.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Mindestbestand</label>
              <input type="number" min="0" step="0.5" value={artForm.mindestbestand} onChange={e => setArtForm(f => ({ ...f, mindestbestand: e.target.value }))} />
            </div>
          </div>
        </Modal>
      )}

      {liefModal && (
        <Modal title="Lieferant anlegen" onClose={() => setLiefModal(false)}
          footer={<>
            <button className="btn btn-primary btn-xl" onClick={saveLief}>Lieferant speichern</button>
            <button className="btn btn-ghost" style={{ width: '100%' }} onClick={() => setLiefModal(false)}>Abbrechen</button>
          </>}>
          <div className="form-group">
            <label className="form-label">Firmenname *</label>
            <input value={liefForm.name} onChange={e => setLiefForm(f => ({ ...f, name: e.target.value }))} />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Kürzel</label>
              <input value={liefForm.kuerzel} onChange={e => setLiefForm(f => ({ ...f, kuerzel: e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="form-label">Zahlungsziel (Tage)</label>
              <input type="number" value={liefForm.zahlungsziel} onChange={e => setLiefForm(f => ({ ...f, zahlungsziel: e.target.value }))} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Kontaktperson</label>
              <input value={liefForm.kontakt} onChange={e => setLiefForm(f => ({ ...f, kontakt: e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="form-label">Telefon</label>
              <input value={liefForm.telefon} onChange={e => setLiefForm(f => ({ ...f, telefon: e.target.value }))} />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">E-Mail</label>
            <input type="email" value={liefForm.email} onChange={e => setLiefForm(f => ({ ...f, email: e.target.value }))} />
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─── NAV ─────────────────────────────────────────────────────────────────────
const PAGES = [
  { id: 'dashboard',    label: 'Übersicht',  icon: '🏠' },
  { id: 'lager',        label: 'Lager',       icon: '📦' },
  { id: 'wareneingang', label: 'Eingang',     icon: '🚚' },
  { id: 'rezepturen',   label: 'Produktion',  icon: '👨‍🍳' },
  { id: 'bestellungen', label: 'Bestellen',   icon: '📋' },
  { id: 'inventur',     label: 'Inventur',    icon: '🔢' },
  { id: 'stammdaten',   label: 'Stammdaten',  icon: '⚙️' },
];

// ─── APP ──────────────────────────────────────────────────────────────────────
function App() {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem('menumetric-v1');
      return saved ? JSON.parse(saved) : INIT;
    } catch { return INIT; }
  });
  const [page, setPage] = useState('dashboard');
  const { toasts, add: addToast } = useToast();

  useEffect(() => {
    try { localStorage.setItem('menumetric-v1', JSON.stringify(data)); } catch {}
  }, [data]);

  const unterMindest = data.artikel.filter(a => getLB(data.lager, a.id) < a.mindestbestand).length;
  const mhdAlarm = data.lager.filter(l => daysDiff(l.mhd) <= 3 && daysDiff(l.mhd) >= 0).length;
  const currentPage = PAGES.find(p => p.id === page);
  const sharedProps = { data, setData, toast: addToast, setPage };

  return (
    <>
      <style>{css}</style>
      <ToastContainer toasts={toasts} />
      <div className="app">

        {/* TOP BAR */}
        <div className="topbar">
          <div className="topbar-logo">
            📊 MenuMetric<span className="sub">Großküche</span>
          </div>
          <div className="topbar-badges">
            {mhdAlarm > 0 && <div className="topbar-badge red">🚨 {mhdAlarm} MHD</div>}
            {unterMindest > 0 && <div className="topbar-badge yellow">📦 {unterMindest}</div>}
          </div>
          <div className="topbar-time"><Clock /></div>
        </div>

        {/* PAGE BAR */}
        <div className="page-bar">
          <div className="page-bar-inner">{currentPage?.icon} {currentPage?.label}</div>
        </div>

        {/* CONTENT */}
        <div className="content">
          {page === 'dashboard'    && <Dashboard    {...sharedProps} />}
          {page === 'lager'        && <Lager        {...sharedProps} />}
          {page === 'wareneingang' && <Wareneingang {...sharedProps} />}
          {page === 'rezepturen'   && <Rezepturen   {...sharedProps} />}
          {page === 'bestellungen' && <Bestellungen {...sharedProps} />}
          {page === 'inventur'     && <Inventur     {...sharedProps} />}
          {page === 'stammdaten'   && <Stammdaten   {...sharedProps} />}
        </div>

        {/* BOTTOM NAV */}
        <nav className="bottom-nav">
          {PAGES.map(p => (
            <button key={p.id} className={`bn-item${page === p.id ? ' active' : ''}`} onClick={() => setPage(p.id)}>
              {p.id === 'lager' && mhdAlarm > 0 && <span className="bn-badge">{mhdAlarm}</span>}
              {p.id === 'bestellungen' && unterMindest > 0 && <span className="bn-badge" style={{ background: C.orange }}>{unterMindest}</span>}
              <span className="bn-icon">{p.icon}</span>
              {p.label}
            </button>
          ))}
        </nav>

      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));
