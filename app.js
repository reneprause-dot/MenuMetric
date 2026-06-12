function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// ─── MenuMetric PWA ── Großküchen-Warenwirtschaft ────────────────────────────
const {
  useState,
  useEffect,
  useCallback
} = React;
const C = {
  bg: '#F4F6F9',
  bgBlue: '#EFF6FF',
  border: '#E2E8F0',
  borderMid: '#CBD5E1',
  blue: '#2563EB',
  blueDark: '#1D4ED8',
  blueLight: '#DBEAFE',
  bluePale: '#EFF6FF',
  green: '#16A34A',
  greenLight: '#DCFCE7',
  red: '#DC2626',
  redLight: '#FEE2E2',
  orange: '#EA580C',
  orangeLight: '#FFEDD5',
  yellow: '#D97706',
  yellowLight: '#FEF3C7',
  purple: '#7C3AED',
  purpleLight: '#EDE9FE',
  text: '#0F172A',
  textMid: '#475569',
  textLight: '#94A3B8'
};
const css = `
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  html,body{min-height:100%;background:${C.bg};}
  #root{min-height:100vh;}
  body{font-family:'Nunito',sans-serif;color:${C.text};font-size:clamp(13px,1.5vw,16px);-webkit-tap-highlight-color:transparent;}
  ::-webkit-scrollbar{width:6px;height:6px;}::-webkit-scrollbar-track{background:${C.bg};}::-webkit-scrollbar-thumb{background:${C.borderMid};border-radius:3px;}
  .app{display:flex;flex-direction:column;min-height:100vh;}
  .topbar{background:${C.blue};color:white;padding:0 20px;height:60px;display:flex;align-items:center;gap:14px;flex-shrink:0;box-shadow:0 2px 12px #2563EB33;position:sticky;top:0;z-index:50;}
  .topbar-logo{font-size:19px;font-weight:900;letter-spacing:-0.3px;flex:1;}
  .topbar-logo .sub{font-size:13px;font-weight:600;opacity:0.75;margin-left:4px;}
  .topbar-badges{display:flex;gap:8px;}
  .topbar-badge{display:flex;align-items:center;gap:5px;padding:6px 11px;border-radius:20px;font-size:12px;font-weight:800;}
  .topbar-badge.red{background:rgba(220,38,38,0.2);color:#FCA5A5;border:1px solid rgba(220,38,38,0.3);}
  .topbar-badge.yellow{background:rgba(217,119,6,0.2);color:#FDE68A;border:1px solid rgba(217,119,6,0.3);}
  .topbar-time{font-size:13px;font-weight:700;opacity:0.8;white-space:nowrap;}
  .page-bar{background:${C.bgBlue};border-bottom:1.5px solid ${C.border};padding:10px 16px;flex-shrink:0;position:sticky;top:60px;z-index:40;}
  .page-bar-inner{font-size:13px;font-weight:800;color:${C.blue};}
  .bottom-nav{position:fixed;bottom:0;left:0;right:0;z-index:20;background:white;border-top:1.5px solid ${C.border};display:flex;padding-bottom:env(safe-area-inset-bottom,0px);box-shadow:0 -4px 20px rgba(0,0,0,0.06);}
  .bn-item{flex:1;display:flex;flex-direction:column;align-items:center;padding:10px 4px 8px;cursor:pointer;transition:color 0.15s;position:relative;color:${C.textLight};font-size:10px;font-weight:700;gap:3px;border:none;background:none;font-family:'Nunito',sans-serif;}
  .bn-item.active{color:${C.blue};}
  .bn-icon{font-size:20px;line-height:1;}
  .bn-item.active::after{content:'';position:absolute;top:0;left:20%;right:20%;height:3px;background:${C.blue};border-radius:0 0 3px 3px;}
  .bn-badge{position:absolute;top:6px;right:calc(50% - 20px);background:${C.red};color:white;font-size:9px;font-weight:900;min-width:16px;height:16px;border-radius:8px;display:flex;align-items:center;justify-content:center;padding:0 3px;border:2px solid white;}
  .content{flex:1;padding:16px;padding-bottom:calc(80px + env(safe-area-inset-bottom,0px));}
  .sec-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;gap:10px;}
  .sec-title{font-size:20px;font-weight:900;color:${C.text};}
  .sec-sub{font-size:13px;color:${C.textMid};font-weight:600;margin-top:2px;}
  .kpi-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-bottom:16px;}
  .kpi-card{background:white;border-radius:16px;padding:16px;border:1.5px solid ${C.border};position:relative;overflow:hidden;}
  .kpi-card::before{content:'';position:absolute;top:0;left:0;right:0;height:4px;border-radius:4px 4px 0 0;}
  .kpi-card.blue::before{background:${C.blue};}.kpi-card.green::before{background:${C.green};}
  .kpi-card.red::before{background:${C.red};}.kpi-card.yellow::before{background:${C.yellow};}
  .kpi-icon{font-size:24px;margin-bottom:8px;}
  .kpi-val{font-family:'JetBrains Mono',monospace;font-size:24px;font-weight:700;line-height:1;color:${C.text};}
  .kpi-lbl{font-size:11px;font-weight:800;color:${C.textMid};margin-top:5px;text-transform:uppercase;letter-spacing:0.5px;}
  .kpi-sub{font-size:12px;color:${C.textLight};margin-top:4px;font-weight:600;}
  .alert{display:flex;align-items:center;gap:12px;padding:13px 16px;border-radius:14px;margin-bottom:12px;font-size:14px;font-weight:700;}
  .alert.danger{background:${C.redLight};color:${C.red};border:1.5px solid #FECACA;}
  .alert.warn{background:${C.orangeLight};color:${C.orange};border:1.5px solid #FED7AA;}
  .alert.info{background:${C.blueLight};color:${C.blue};border:1.5px solid #BFDBFE;}
  .alert.success{background:${C.greenLight};color:${C.green};border:1.5px solid #BBF7D0;}
  .alert-icon{font-size:20px;flex-shrink:0;}.alert-text{flex:1;line-height:1.35;}
  .card{background:white;border-radius:16px;border:1.5px solid ${C.border};overflow:hidden;margin-bottom:14px;}
  .card-head{display:flex;align-items:center;justify-content:space-between;padding:14px 16px;border-bottom:1.5px solid ${C.border};background:${C.bg};}
  .card-title{font-size:15px;font-weight:800;color:${C.text};}
  .tbl-scroll{overflow-x:auto;-webkit-overflow-scrolling:touch;}
  .action-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-bottom:16px;}
  .action-tile{background:white;border-radius:20px;padding:20px 16px;display:flex;flex-direction:column;align-items:flex-start;gap:10px;cursor:pointer;transition:all 0.15s;text-align:left;font-family:'Nunito',sans-serif;min-height:100px;border:none;}
  .action-tile.blue{background:${C.bluePale};border:1.5px solid #BFDBFE;}
  .action-tile.green{background:${C.greenLight};border:1.5px solid #BBF7D0;}
  .action-tile.orange{background:${C.orangeLight};border:1.5px solid #FED7AA;}
  .action-tile.purple{background:${C.purpleLight};border:1.5px solid #C4B5FD;}
  .action-tile:active{transform:scale(0.97);}
  .tile-icon{font-size:30px;}.tile-label{font-size:14px;font-weight:900;color:${C.text};line-height:1.2;}.tile-sub{font-size:12px;font-weight:600;color:${C.textMid};}
  .tbl{width:100%;border-collapse:collapse;min-width:500px;}
  .tbl th{text-align:left;padding:10px 14px;font-size:11px;text-transform:uppercase;letter-spacing:0.8px;color:${C.textMid};font-weight:800;background:${C.bg};border-bottom:1.5px solid ${C.border};}
  .tbl td{padding:13px 14px;border-bottom:1px solid ${C.border};font-size:14px;font-weight:600;vertical-align:middle;}
  .tbl tr:last-child td{border-bottom:none;}
  .tbl tr:hover td{background:${C.bgBlue};}
  .mono{font-family:'JetBrains Mono',monospace;font-weight:700;}
  .badge{display:inline-flex;align-items:center;gap:4px;padding:4px 10px;border-radius:20px;font-size:12px;font-weight:800;white-space:nowrap;}
  .badge-green{background:${C.greenLight};color:${C.green};}.badge-red{background:${C.redLight};color:${C.red};}
  .badge-yellow{background:${C.yellowLight};color:${C.yellow};}.badge-blue{background:${C.blueLight};color:${C.blue};}
  .badge-gray{background:${C.bg};color:${C.textMid};border:1px solid ${C.border};}
  .badge-orange{background:${C.orangeLight};color:${C.orange};}
  .btn{display:inline-flex;align-items:center;justify-content:center;gap:7px;border-radius:12px;font-size:14px;font-weight:800;cursor:pointer;border:none;transition:all 0.15s;font-family:'Nunito',sans-serif;white-space:nowrap;min-height:44px;padding:0 18px;}
  .btn:active{transform:scale(0.97);}
  .btn-primary{background:${C.blue};color:white;box-shadow:0 2px 8px rgba(37,99,235,0.3);}
  .btn-primary:hover{background:${C.blueDark};}.btn-primary:disabled{opacity:0.4;cursor:not-allowed;transform:none;}
  .btn-ghost{background:${C.bg};color:${C.textMid};border:1.5px solid ${C.border};}
  .btn-ghost:hover{border-color:${C.blue};color:${C.blue};}
  .btn-success{background:${C.greenLight};color:${C.green};border:1.5px solid #BBF7D0;}
  .btn-danger{background:${C.redLight};color:${C.red};border:1.5px solid #FECACA;}
  .btn-xl{min-height:56px;font-size:16px;padding:0 24px;border-radius:14px;width:100%;}
  .btn-lg{min-height:52px;font-size:15px;padding:0 22px;border-radius:14px;}
  .btn-sm{min-height:34px;font-size:12px;padding:0 12px;border-radius:8px;}
  .form-group{display:flex;flex-direction:column;gap:6px;}
  .form-label{font-size:12px;font-weight:800;color:${C.textMid};text-transform:uppercase;letter-spacing:0.5px;}
  .form-label.req::after{content:' *';color:${C.red};}
  input,select,textarea{background:${C.bg};border:2px solid ${C.border};border-radius:12px;color:${C.text};padding:13px 15px;font-size:15px;font-family:'Nunito',sans-serif;font-weight:600;outline:none;transition:border-color 0.15s;width:100%;min-height:50px;-webkit-appearance:none;appearance:none;}
  input:focus,select:focus{border-color:${C.blue};background:white;}
  input.err{border-color:${C.red};}
  select{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%2394A3B8' stroke-width='2' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 14px center;padding-right:40px;}
  .form-row{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
  .qty-picker{display:flex;align-items:center;border:2px solid ${C.border};border-radius:14px;overflow:hidden;background:white;}
  .qty-btn{width:56px;height:56px;background:${C.bg};border:none;font-size:24px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;color:${C.blue};transition:background 0.1s;flex-shrink:0;font-family:'Nunito',sans-serif;}
  .qty-btn:active{background:${C.blueLight};}
  .qty-input{flex:1;text-align:center;font-size:18px;font-weight:900;font-family:'JetBrains Mono',monospace;background:white;height:56px;border:none;border-left:1px solid ${C.border};border-right:1px solid ${C.border};outline:none;width:100%;min-width:0;padding:0;min-height:unset;border-radius:0;}
  .stock-level{display:flex;align-items:center;gap:10px;}
  .stock-bar-wrap{flex:1;height:8px;background:${C.bg};border-radius:4px;overflow:hidden;border:1px solid ${C.border};}
  .stock-bar-fill{height:100%;border-radius:4px;transition:width 0.4s;}
  .stock-val{font-family:'JetBrains Mono',monospace;font-size:13px;font-weight:700;white-space:nowrap;min-width:70px;text-align:right;}
  .bar-chart{display:flex;align-items:flex-end;gap:6px;height:72px;padding:0 4px;}
  .bar-col{flex:1;display:flex;flex-direction:column;align-items:center;}
  .bar-fill{width:100%;border-radius:4px 4px 0 0;min-height:3px;}
  .search-wrap{position:relative;flex:1;}
  .search-icon{position:absolute;left:14px;top:50%;transform:translateY(-50%);font-size:16px;pointer-events:none;}
  .search-wrap input{padding-left:44px;}
  .tabs{display:flex;gap:6px;margin-bottom:16px;overflow-x:auto;padding-bottom:2px;-webkit-overflow-scrolling:touch;}
  .tabs::-webkit-scrollbar{display:none;}
  .tab-btn{padding:9px 18px;border-radius:22px;font-size:13px;font-weight:800;cursor:pointer;font-family:'Nunito',sans-serif;border:2px solid ${C.border};background:white;color:${C.textMid};white-space:nowrap;transition:all 0.15s;min-height:40px;}
  .tab-btn.active{background:${C.blue};color:white;border-color:${C.blue};}
  .modal-overlay{position:fixed;inset:0;background:rgba(15,23,42,0.55);z-index:100;display:flex;align-items:flex-end;justify-content:center;animation:fadeIn 0.2s ease;}
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
  .modal{background:white;border-radius:24px 24px 0 0;width:100%;max-width:640px;max-height:92vh;overflow-y:auto;animation:slideUp 0.3s ease;padding-bottom:env(safe-area-inset-bottom,0px);}
  @keyframes slideUp{from{transform:translateY(60px);opacity:0}to{transform:translateY(0);opacity:1}}
  .modal-handle{width:40px;height:4px;background:${C.border};border-radius:2px;margin:12px auto 0;}
  .modal-head{display:flex;align-items:center;justify-content:space-between;padding:16px 20px 14px;}
  .modal-title{font-size:19px;font-weight:900;}
  .modal-body{padding:0 20px;display:flex;flex-direction:column;gap:14px;}
  .modal-foot{padding:16px 20px 20px;display:flex;flex-direction:column;gap:10px;border-top:1.5px solid ${C.border};margin-top:16px;}
  .steps{display:flex;gap:4px;margin-bottom:16px;}
  .step{flex:1;height:4px;border-radius:2px;background:${C.border};}
  .step.done{background:${C.blue};}
  .pos-list{display:flex;flex-direction:column;gap:8px;}
  .pos-item{background:${C.bg};border-radius:12px;padding:12px 14px;display:flex;align-items:center;gap:10px;border:1.5px solid ${C.border};}
  .pos-item-name{flex:1;font-size:14px;font-weight:700;}
  .pos-item-detail{font-size:12px;color:${C.textMid};font-weight:600;}
  .pos-remove{background:${C.redLight};border:none;color:${C.red};width:34px;height:34px;border-radius:8px;cursor:pointer;font-size:16px;display:flex;align-items:center;justify-content:center;}
  .rez-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:12px;margin-bottom:16px;}
  .rez-card{background:white;border:1.5px solid ${C.border};border-radius:18px;padding:16px;cursor:pointer;transition:all 0.15s;}
  .rez-card:hover{border-color:${C.blue};box-shadow:0 4px 16px rgba(37,99,235,0.1);}
  .rez-card.selected{border-color:${C.blue};background:${C.bgBlue};}
  .rez-stats{display:flex;gap:12px;margin-top:12px;padding-top:12px;border-top:1px solid ${C.border};}
  .rez-stat{flex:1;}
  .rez-stat-lbl{font-size:10px;font-weight:800;color:${C.textLight};text-transform:uppercase;letter-spacing:0.5px;}
  .rez-stat-val{font-size:15px;font-weight:900;font-family:'JetBrains Mono',monospace;margin-top:2px;}
  .inv-row{display:flex;align-items:center;gap:10px;padding:13px 14px;border-bottom:1px solid ${C.border};background:white;}
  .inv-row:last-child{border-bottom:none;}
  .inv-name{flex:1;font-size:14px;font-weight:700;}
  .inv-soll{font-family:'JetBrains Mono',monospace;font-size:13px;color:${C.textMid};font-weight:700;min-width:80px;text-align:right;}
  .toast-wrap{position:fixed;top:70px;right:16px;z-index:1000;display:flex;flex-direction:column;gap:8px;pointer-events:none;}
  .toast{color:white;padding:12px 16px;border-radius:14px;font-size:14px;font-weight:700;max-width:320px;box-shadow:0 4px 20px rgba(0,0,0,0.2);animation:toastIn 0.3s ease;display:flex;align-items:center;gap:10px;}
  .toast.success{background:${C.green};}.toast.error{background:${C.red};}
  .toast.warn{background:${C.orange};}.toast.info{background:${C.blue};}
  @keyframes toastIn{from{opacity:0;transform:translateX(40px)}to{opacity:1;transform:translateX(0)}}
  .empty{text-align:center;padding:48px 20px;}
  .empty-icon{font-size:48px;margin-bottom:12px;}
  .empty-title{font-size:17px;font-weight:800;color:${C.text};margin-bottom:6px;}
  .divider{height:1px;background:${C.border};margin:14px 0;}
  .pcm-logo-bar{display:flex;align-items:center;gap:14px;margin-bottom:24px;padding:18px;background:white;border-radius:16px;border:1.5px solid ${C.border};}
  .pcm-status{display:flex;align-items:center;gap:8px;padding:10px 14px;border-radius:10px;font-size:13px;font-weight:700;margin-bottom:14px;}
  .pcm-status.connected{background:${C.greenLight};color:${C.green};border:1.5px solid #BBF7D0;}
  .pcm-status.disconnected{background:${C.redLight};color:${C.red};border:1.5px solid #FECACA;}
  .ampel-dot{width:14px;height:14px;border-radius:50%;flex-shrink:0;}
  .ampel-dot.green{background:${C.green};box-shadow:0 0 6px ${C.green}66;}
  .ampel-dot.yellow{background:${C.yellow};box-shadow:0 0 6px ${C.yellow}66;}
  .ampel-dot.red{background:${C.red};box-shadow:0 0 6px ${C.red}66;}
  .ampel-dot.gray{background:${C.borderMid};}
  .pv-card{background:white;border:1.5px solid ${C.border};border-radius:16px;overflow:hidden;margin-bottom:14px;}
  .pv-header{padding:16px;background:${C.bg};border-bottom:1.5px solid ${C.border};}
  .pv-lief-row{display:flex;align-items:stretch;border-bottom:1px solid ${C.border};}
  .pv-lief-row:last-child{border-bottom:none;}
  .pv-lief-row.red-row{background:#FFF5F5;opacity:0.8;}
  .pv-lief-row.green-row{background:#F0FDF4;}
  .pv-lief-row.yellow-row{background:#FFFBEB;}
  .pv-lief-info{padding:14px 16px;flex:1;min-width:0;}
  .pv-lief-name{font-size:14px;font-weight:800;display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:8px;}
  .pv-gebinde-list{display:flex;flex-direction:column;gap:6px;}
  .pv-gebinde-item{display:flex;align-items:center;gap:8px;padding:8px 12px;border-radius:10px;background:${C.bg};border:1.5px solid ${C.border};transition:all 0.12s;}
  .pv-gebinde-item:hover:not(.disabled){border-color:${C.blue};background:${C.bgBlue};}
  .pv-gebinde-item.disabled{opacity:0.45;cursor:not-allowed;}
  .pv-ampel-col{width:52px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;padding:14px 8px;border-left:1px solid ${C.border};flex-shrink:0;}
  .ampel-tower{display:flex;flex-direction:column;gap:4px;align-items:center;}
  .ampel-light{width:16px;height:16px;border-radius:50%;border:1.5px solid rgba(0,0,0,0.08);}
  .ampel-light.on-red{background:${C.red};box-shadow:0 0 8px ${C.red}88;}
  .ampel-light.on-yellow{background:${C.yellow};box-shadow:0 0 8px ${C.yellow}88;}
  .ampel-light.on-green{background:${C.green};box-shadow:0 0 8px ${C.green}88;}
  .ampel-light.off{background:#E5E7EB;}
  .wk-fab{position:fixed;bottom:90px;right:20px;z-index:30;background:${C.blue};color:white;border:none;border-radius:50%;width:56px;height:56px;font-size:24px;cursor:pointer;box-shadow:0 4px 20px ${C.blue}55;display:flex;align-items:center;justify-content:center;transition:transform 0.15s;}
  .wk-fab:active{transform:scale(0.92);}
  .wk-count{position:absolute;top:-4px;right:-4px;background:${C.red};color:white;font-size:10px;font-weight:900;min-width:18px;height:18px;border-radius:9px;display:flex;align-items:center;justify-content:center;border:2px solid white;padding:0 3px;}
  .legend{display:flex;gap:16px;flex-wrap:wrap;margin-bottom:16px;}
  .legend-item{display:flex;align-items:center;gap:6px;font-size:12px;font-weight:700;color:${C.textMid};}
  @keyframes spin{to{transform:rotate(360deg)}}
  .spin{animation:spin 1s linear infinite;display:inline-block;}
  @media(min-width:640px){
    .kpi-grid{grid-template-columns:repeat(4,1fr);}
    .action-grid{grid-template-columns:repeat(4,1fr);}
    .content{padding:20px 24px;padding-bottom:calc(80px + env(safe-area-inset-bottom,0px));}
    .modal{border-radius:24px;margin:auto;margin-bottom:20px;}
    .modal-overlay{align-items:center;}
  }
  @media(min-width:900px){
    .rez-grid{grid-template-columns:repeat(3,1fr);}
    .content{padding:24px 32px;padding-bottom:calc(80px + env(safe-area-inset-bottom,0px));}
  }
  @media(min-width:1200px){
    .content{padding:28px 40px;padding-bottom:calc(80px + env(safe-area-inset-bottom,0px));}
    .kpi-val{font-size:28px;}
  }
`;
// ── DATA ──────────────────────────────────────────────────────────────────────
const INIT = {
  lieferanten: [{
    id: 1,
    name: "Frischmarkt GmbH",
    kuerzel: "FM",
    kontakt: "Hans Müller",
    telefon: "0211-4455",
    email: "info@frischmarkt.de",
    zahlungsziel: 14
  }, {
    id: 2,
    name: "Weinhaus Becker",
    kuerzel: "WB",
    kontakt: "Lisa Becker",
    telefon: "0221-8899",
    email: "order@weinhaus-becker.de",
    zahlungsziel: 30
  }, {
    id: 3,
    name: "Großmarkt Nord",
    kuerzel: "GN",
    kontakt: "Stefan Koch",
    telefon: "040-1122",
    email: "einkauf@gm-nord.de",
    zahlungsziel: 7
  }],
  artikel: [{
    id: 1,
    name: "Rinderhüfte",
    einheit: "kg",
    kategorie: "Fleisch",
    lieferantId: 1,
    mindestbestand: 10,
    ek: 14.50,
    mwst: 7
  }, {
    id: 2,
    name: "Lachs (frisch)",
    einheit: "kg",
    kategorie: "Fisch",
    lieferantId: 1,
    mindestbestand: 5,
    ek: 18.90,
    mwst: 7
  }, {
    id: 3,
    name: "Tomaten (Kiste)",
    einheit: "Kiste",
    kategorie: "Gemüse",
    lieferantId: 3,
    mindestbestand: 3,
    ek: 22.00,
    mwst: 7
  }, {
    id: 4,
    name: "Chianti DOC",
    einheit: "Fl",
    kategorie: "Wein",
    lieferantId: 2,
    mindestbestand: 12,
    ek: 8.50,
    mwst: 19
  }, {
    id: 5,
    name: "Butter 250g",
    einheit: "Pkg",
    kategorie: "Molkerei",
    lieferantId: 3,
    mindestbestand: 20,
    ek: 1.85,
    mwst: 7
  }, {
    id: 6,
    name: "Mehl Type 550",
    einheit: "kg",
    kategorie: "Trocken",
    lieferantId: 3,
    mindestbestand: 15,
    ek: 0.95,
    mwst: 7
  }, {
    id: 7,
    name: "Prosecco DOC",
    einheit: "Fl",
    kategorie: "Wein",
    lieferantId: 2,
    mindestbestand: 24,
    ek: 5.20,
    mwst: 19
  }, {
    id: 8,
    name: "Kartoffeln",
    einheit: "kg",
    kategorie: "Gemüse",
    lieferantId: 3,
    mindestbestand: 20,
    ek: 0.70,
    mwst: 7
  }],
  lager: [{
    id: 1,
    artikelId: 1,
    menge: 22.5,
    mhd: "2025-07-15",
    charge: "CH-001",
    lagerort: "Kühlraum A",
    ek: 14.50,
    eingang: "2025-06-08"
  }, {
    id: 2,
    artikelId: 2,
    menge: 4.0,
    mhd: "2025-06-14",
    charge: "CH-002",
    lagerort: "Kühlraum B",
    ek: 18.90,
    eingang: "2025-06-10"
  }, {
    id: 3,
    artikelId: 3,
    menge: 2,
    mhd: "2025-06-18",
    charge: "CH-003",
    lagerort: "Kühlraum A",
    ek: 22.00,
    eingang: "2025-06-09"
  }, {
    id: 4,
    artikelId: 4,
    menge: 36,
    mhd: "2027-12-31",
    charge: "CH-004",
    lagerort: "Weinkeller",
    ek: 8.50,
    eingang: "2025-05-20"
  }, {
    id: 5,
    artikelId: 5,
    menge: 48,
    mhd: "2025-08-01",
    charge: "CH-005",
    lagerort: "Kühlraum A",
    ek: 1.85,
    eingang: "2025-06-05"
  }, {
    id: 6,
    artikelId: 6,
    menge: 30,
    mhd: "2026-06-01",
    charge: "CH-006",
    lagerort: "Trockenlager",
    ek: 0.95,
    eingang: "2025-05-28"
  }, {
    id: 7,
    artikelId: 7,
    menge: 18,
    mhd: "2026-09-30",
    charge: "CH-007",
    lagerort: "Weinkeller",
    ek: 5.20,
    eingang: "2025-06-01"
  }, {
    id: 8,
    artikelId: 8,
    menge: 35,
    mhd: "2025-06-25",
    charge: "CH-008",
    lagerort: "Kühlraum A",
    ek: 0.70,
    eingang: "2025-06-09"
  }],
  wareneingaenge: [{
    id: 1,
    lieferantId: 1,
    datum: "2025-06-10",
    status: "Gebucht",
    belegnr: "WE-2025-041",
    bestellungId: null,
    positionen: [{
      artikelId: 1,
      menge: 10,
      ek: 14.50,
      mhd: "2025-07-15"
    }, {
      artikelId: 2,
      menge: 5,
      ek: 18.90,
      mhd: "2025-06-14"
    }]
  }],
  rezepturen: [{
    id: 1,
    name: "Rinderfilet auf Rotweinsoße",
    kategorie: "Hauptgericht",
    vkPreis: 28.50,
    zutaten: [{
      artikelId: 1,
      menge: 0.22,
      einheit: "kg"
    }, {
      artikelId: 4,
      menge: 0.15,
      einheit: "Fl"
    }]
  }, {
    id: 2,
    name: "Pasta al Salmone",
    kategorie: "Hauptgericht",
    vkPreis: 22.00,
    zutaten: [{
      artikelId: 2,
      menge: 0.12,
      einheit: "kg"
    }, {
      artikelId: 6,
      menge: 0.08,
      einheit: "kg"
    }, {
      artikelId: 5,
      menge: 0.02,
      einheit: "Pkg"
    }]
  }, {
    id: 3,
    name: "Tomatensalat",
    kategorie: "Vorspeise",
    vkPreis: 9.50,
    zutaten: [{
      artikelId: 3,
      menge: 0.15,
      einheit: "Kiste"
    }]
  }, {
    id: 4,
    name: "Bratkartoffeln",
    kategorie: "Beilage",
    vkPreis: 5.50,
    zutaten: [{
      artikelId: 8,
      menge: 0.25,
      einheit: "kg"
    }, {
      artikelId: 5,
      menge: 0.01,
      einheit: "Pkg"
    }]
  }],
  verbrauch: [{
    id: 1,
    datum: "2025-06-10",
    artikelId: 1,
    menge: 2.2,
    grund: "Produktion: Rinderfilet"
  }, {
    id: 2,
    datum: "2025-06-10",
    artikelId: 2,
    menge: 1.44,
    grund: "Produktion: Pasta al Salmone"
  }],
  bestellungen: [],
  // Archiv: abgeschlossene Wareneingänge und Bestellungen
  archivWE: [],
  archivBest: []
};

// ── PCM KATALOG ───────────────────────────────────────────────────────────────
const PCM_KATALOG = [{
  artikelId: 1,
  lieferantId: 1,
  lieferantName: "Frischmarkt GmbH",
  pcmArtNr: "FM-1042",
  gebinde: [{
    label: "1 kg (Stück)",
    menge: 1,
    einheit: "kg",
    ek: 14.50
  }, {
    label: "5 kg Vakuum",
    menge: 5,
    einheit: "kg",
    ek: 68.00
  }, {
    label: "10 kg Karton",
    menge: 10,
    einheit: "kg",
    ek: 132.00
  }]
}, {
  artikelId: 1,
  lieferantId: 3,
  lieferantName: "Großmarkt Nord",
  pcmArtNr: "GN-R081",
  gebinde: [{
    label: "1 kg (Stück)",
    menge: 1,
    einheit: "kg",
    ek: 13.20
  }, {
    label: "8 kg Karton",
    menge: 8,
    einheit: "kg",
    ek: 100.80
  }, {
    label: "16 kg Palette",
    menge: 16,
    einheit: "kg",
    ek: 195.20
  }]
}, {
  artikelId: 1,
  lieferantId: 2,
  lieferantName: "Weinhaus Becker",
  pcmArtNr: null,
  gebinde: [{
    label: "1 kg (Stück)",
    menge: 1,
    einheit: "kg",
    ek: 16.90
  }]
}, {
  artikelId: 2,
  lieferantId: 1,
  lieferantName: "Frischmarkt GmbH",
  pcmArtNr: "FM-2201",
  gebinde: [{
    label: "1 kg (Stück)",
    menge: 1,
    einheit: "kg",
    ek: 18.90
  }, {
    label: "5 kg Kiste",
    menge: 5,
    einheit: "kg",
    ek: 90.00
  }, {
    label: "10 kg Kiste",
    menge: 10,
    einheit: "kg",
    ek: 174.00
  }]
}, {
  artikelId: 2,
  lieferantId: 3,
  lieferantName: "Großmarkt Nord",
  pcmArtNr: "GN-F204",
  gebinde: [{
    label: "1 kg (Stück)",
    menge: 1,
    einheit: "kg",
    ek: 17.40
  }, {
    label: "6 kg Kiste",
    menge: 6,
    einheit: "kg",
    ek: 98.40
  }]
}, {
  artikelId: 3,
  lieferantId: 3,
  lieferantName: "Großmarkt Nord",
  pcmArtNr: "GN-G055",
  gebinde: [{
    label: "1 Kiste (6 kg)",
    menge: 1,
    einheit: "Kiste",
    ek: 22.00
  }, {
    label: "3 Kisten",
    menge: 3,
    einheit: "Kiste",
    ek: 63.00
  }, {
    label: "6 Kisten",
    menge: 6,
    einheit: "Kiste",
    ek: 120.00
  }]
}, {
  artikelId: 3,
  lieferantId: 1,
  lieferantName: "Frischmarkt GmbH",
  pcmArtNr: "FM-3310",
  gebinde: [{
    label: "1 Kiste (6 kg)",
    menge: 1,
    einheit: "Kiste",
    ek: 24.50
  }, {
    label: "4 Kisten",
    menge: 4,
    einheit: "Kiste",
    ek: 94.00
  }]
}, {
  artikelId: 4,
  lieferantId: 2,
  lieferantName: "Weinhaus Becker",
  pcmArtNr: "WB-W441",
  gebinde: [{
    label: "1 Flasche",
    menge: 1,
    einheit: "Fl",
    ek: 8.50
  }, {
    label: "6er Karton",
    menge: 6,
    einheit: "Fl",
    ek: 48.00
  }, {
    label: "12er Karton",
    menge: 12,
    einheit: "Fl",
    ek: 91.20
  }]
}, {
  artikelId: 4,
  lieferantId: 3,
  lieferantName: "Großmarkt Nord",
  pcmArtNr: "GN-W210",
  gebinde: [{
    label: "1 Flasche",
    menge: 1,
    einheit: "Fl",
    ek: 9.80
  }, {
    label: "6er Karton",
    menge: 6,
    einheit: "Fl",
    ek: 56.40
  }]
}, {
  artikelId: 5,
  lieferantId: 3,
  lieferantName: "Großmarkt Nord",
  pcmArtNr: "GN-M012",
  gebinde: [{
    label: "1 Pkg 250g",
    menge: 1,
    einheit: "Pkg",
    ek: 1.85
  }, {
    label: "10er Pack",
    menge: 10,
    einheit: "Pkg",
    ek: 17.50
  }, {
    label: "20er Karton",
    menge: 20,
    einheit: "Pkg",
    ek: 33.00
  }]
}, {
  artikelId: 5,
  lieferantId: 1,
  lieferantName: "Frischmarkt GmbH",
  pcmArtNr: "FM-M099",
  gebinde: [{
    label: "1 Pkg 250g",
    menge: 1,
    einheit: "Pkg",
    ek: 1.99
  }, {
    label: "10er Pack",
    menge: 10,
    einheit: "Pkg",
    ek: 18.90
  }]
}, {
  artikelId: 6,
  lieferantId: 3,
  lieferantName: "Großmarkt Nord",
  pcmArtNr: "GN-T003",
  gebinde: [{
    label: "1 kg",
    menge: 1,
    einheit: "kg",
    ek: 0.95
  }, {
    label: "10 kg Sack",
    menge: 10,
    einheit: "kg",
    ek: 8.80
  }, {
    label: "25 kg Sack",
    menge: 25,
    einheit: "kg",
    ek: 20.00
  }, {
    label: "50 kg Palette",
    menge: 50,
    einheit: "kg",
    ek: 37.50
  }]
}, {
  artikelId: 6,
  lieferantId: 1,
  lieferantName: "Frischmarkt GmbH",
  pcmArtNr: "FM-T041",
  gebinde: [{
    label: "1 kg",
    menge: 1,
    einheit: "kg",
    ek: 1.10
  }, {
    label: "10 kg Sack",
    menge: 10,
    einheit: "kg",
    ek: 10.20
  }]
}, {
  artikelId: 7,
  lieferantId: 2,
  lieferantName: "Weinhaus Becker",
  pcmArtNr: "WB-W220",
  gebinde: [{
    label: "1 Flasche",
    menge: 1,
    einheit: "Fl",
    ek: 5.20
  }, {
    label: "6er Karton",
    menge: 6,
    einheit: "Fl",
    ek: 29.40
  }, {
    label: "12er Karton",
    menge: 12,
    einheit: "Fl",
    ek: 56.40
  }]
}, {
  artikelId: 7,
  lieferantId: 3,
  lieferantName: "Großmarkt Nord",
  pcmArtNr: "GN-W310",
  gebinde: [{
    label: "1 Flasche",
    menge: 1,
    einheit: "Fl",
    ek: 5.80
  }, {
    label: "6er Karton",
    menge: 6,
    einheit: "Fl",
    ek: 33.60
  }]
}, {
  artikelId: 8,
  lieferantId: 3,
  lieferantName: "Großmarkt Nord",
  pcmArtNr: "GN-G120",
  gebinde: [{
    label: "1 kg",
    menge: 1,
    einheit: "kg",
    ek: 0.70
  }, {
    label: "10 kg Netz",
    menge: 10,
    einheit: "kg",
    ek: 6.50
  }, {
    label: "25 kg Sack",
    menge: 25,
    einheit: "kg",
    ek: 15.00
  }]
}, {
  artikelId: 8,
  lieferantId: 1,
  lieferantName: "Frischmarkt GmbH",
  pcmArtNr: "FM-G205",
  gebinde: [{
    label: "1 kg",
    menge: 1,
    einheit: "kg",
    ek: 0.85
  }, {
    label: "10 kg Netz",
    menge: 10,
    einheit: "kg",
    ek: 8.00
  }]
}];

// ── HELPERS ───────────────────────────────────────────────────────────────────
const fmt = (n, d = 2) => Number(n || 0).toFixed(d).replace('.', ',');
const fmtE = n => `${fmt(n)} €`;
const todayStr = () => new Date().toISOString().slice(0, 10);
const daysDiff = ds => Math.ceil((new Date(ds) - new Date()) / 86400000);
const getLB = (lager, aId) => lager.filter(l => l.artikelId === aId).reduce((s, l) => s + l.menge, 0);
const getA = (artikel, id) => artikel.find(a => a.id === id);
const getL = (lieferanten, id) => lieferanten.find(l => l.id === id);
const mhdBadge = days => days < 0 ? 'red' : days <= 3 ? 'red' : days <= 7 ? 'yellow' : 'green';
const mhdLabel = days => days < 0 ? 'Abgelaufen' : days <= 3 ? `${days}d ⚠` : days <= 7 ? `${days} Tage` : 'OK';

// FIX-2: günstigsten PCM-Stückpreis holen
function getBestEkFromPCM(artikelId) {
  const rows = PCM_KATALOG.filter(k => k.artikelId === artikelId);
  if (!rows.length) return null;
  let best = Infinity;
  rows.forEach(a => a.gebinde.forEach(g => {
    const sp = g.ek / g.menge;
    if (sp < best) best = sp;
  }));
  return best === Infinity ? null : best;
}
function getRezKosten(rez, artikel, lager) {
  return rez.zutaten.reduce((s, z) => {
    const ch = lager.filter(l => l.artikelId === z.artikelId).sort((a, b) => new Date(a.mhd) - new Date(b.mhd))[0];
    return s + z.menge * (ch?.ek || getA(artikel, z.artikelId)?.ek || 0);
  }, 0);
}

// FIX-5: Ampel-Logik
function getAmpelMap(artikelId) {
  const rows = PCM_KATALOG.filter(k => k.artikelId === artikelId);
  if (!rows.length) return {};
  const preise = rows.map(a => {
    const best = a.gebinde.reduce((b, g) => g.ek / g.menge < b.ek / b.menge ? g : b, a.gebinde[0]);
    return {
      lieferantId: a.lieferantId,
      sp: best.ek / best.menge
    };
  });
  const sorted = [...preise].sort((a, b) => a.sp - b.sp);
  const minSP = sorted[0].sp,
    maxSP = sorted[sorted.length - 1].sp;
  const result = {};
  preise.forEach(p => {
    if (sorted.length === 1) {
      result[p.lieferantId] = 'green';
      return;
    }
    if (p.sp === minSP) result[p.lieferantId] = 'green';else if (p.sp === maxSP) result[p.lieferantId] = 'red';else result[p.lieferantId] = 'yellow';
  });
  return result;
}

// FIX-5: günstigsten Lieferant aus Ampel für Bestellvorschlag
function getBestLieferantId(artikelId, fallback) {
  const ampel = getAmpelMap(artikelId);
  const green = Object.entries(ampel).find(([, v]) => v === 'green');
  return green ? Number(green[0]) : fallback;
}

// ── TOAST ─────────────────────────────────────────────────────────────────────
function useToast() {
  const [toasts, setToasts] = useState([]);
  const add = useCallback((msg, type = 'success') => {
    const id = Date.now();
    setToasts(t => [...t, {
      id,
      msg,
      type
    }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3500);
  }, []);
  return {
    toasts,
    add
  };
}
function ToastContainer({
  toasts
}) {
  const icons = {
    success: '✅',
    error: '❌',
    warn: '⚠️',
    info: 'ℹ️'
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "toast-wrap"
  }, toasts.map(t => /*#__PURE__*/React.createElement("div", {
    key: t.id,
    className: `toast ${t.type}`
  }, icons[t.type], " ", t.msg)));
}
function Clock() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString('de-DE', {
      hour: '2-digit',
      minute: '2-digit'
    }));
    tick();
    const t = setInterval(tick, 10000);
    return () => clearInterval(t);
  }, []);
  return /*#__PURE__*/React.createElement("span", null, time);
}
function Badge({
  type,
  children
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: `badge badge-${type}`
  }, children);
}
function Modal({
  title,
  onClose,
  children,
  footer
}) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    className: "modal-overlay",
    onClick: e => e.target === e.currentTarget && onClose()
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal"
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-handle"
  }), /*#__PURE__*/React.createElement("div", {
    className: "modal-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "modal-title"
  }, title), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost btn-sm",
    onClick: onClose,
    style: {
      minHeight: 36,
      padding: '0 12px',
      fontSize: 16
    }
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "modal-body"
  }, children), footer && /*#__PURE__*/React.createElement("div", {
    className: "modal-foot"
  }, footer)));
}
function QtyPicker({
  value,
  onChange,
  step = 1,
  min = 0
}) {
  const v = Number(value) || 0;
  const dec = step < 1 ? 3 : 0;
  return /*#__PURE__*/React.createElement("div", {
    className: "qty-picker"
  }, /*#__PURE__*/React.createElement("button", {
    className: "qty-btn",
    onClick: () => onChange(Math.max(min, parseFloat((v - step).toFixed(dec))))
  }, "\u2212"), /*#__PURE__*/React.createElement("input", {
    className: "qty-input",
    type: "number",
    value: v,
    min: min,
    step: step,
    onChange: e => onChange(parseFloat(e.target.value) || min)
  }), /*#__PURE__*/React.createElement("button", {
    className: "qty-btn",
    onClick: () => onChange(parseFloat((v + step).toFixed(dec)))
  }, "+"));
}
function StockBar({
  current,
  max,
  unit
}) {
  const pct = max > 0 ? Math.min(current / max * 100, 100) : 0;
  const col = pct < 25 ? C.red : pct < 50 ? C.yellow : C.green;
  return /*#__PURE__*/React.createElement("div", {
    className: "stock-level"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stock-bar-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stock-bar-fill",
    style: {
      width: `${pct}%`,
      background: col
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "stock-val",
    style: {
      color: col
    }
  }, fmt(current, 1), " ", unit));
}
// ── DASHBOARD ─────────────────────────────────────────────────────────────────
function Dashboard({
  data,
  setData,
  toast,
  setPage
}) {
  const {
    artikel,
    lager,
    verbrauch,
    bestellungen
  } = data;
  const totalWert = lager.reduce((s, l) => s + l.menge * l.ek, 0);
  const unterMindest = artikel.filter(a => getLB(lager, a.id) < a.mindestbestand).length;
  const mhdAlarm = lager.filter(l => daysDiff(l.mhd) <= 3 && daysDiff(l.mhd) >= 0).length;
  const heuteVb = verbrauch.filter(v => v.datum === todayStr()).reduce((s, v) => s + v.menge * (getA(artikel, v.artikelId)?.ek || 0), 0);
  const offeneBest = bestellungen.filter(b => b.status === 'Offen' || b.status === 'Bestellt').length;
  // Echte Wochendaten aus Verbrauch
  const today = new Date();
  const dow = today.getDay();
  const mondayOff = dow === 0 ? -6 : 1 - dow;
  const weekBars = Array.from({
    length: 7
  }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + mondayOff + i);
    const ds = d.toISOString().slice(0, 10);
    return verbrauch.filter(v => v.datum === ds).reduce((s, v) => s + v.menge * (getA(artikel, v.artikelId)?.ek || 0), 0);
  });
  const maxB = Math.max(...weekBars, 1);
  const todayIdx = dow === 0 ? 6 : dow - 1;
  const mhdWarn = lager.filter(l => daysDiff(l.mhd) >= 0 && daysDiff(l.mhd) <= 7);
  const wochentage = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
  return /*#__PURE__*/React.createElement("div", null, mhdAlarm > 0 && /*#__PURE__*/React.createElement("div", {
    className: "alert danger"
  }, /*#__PURE__*/React.createElement("span", {
    className: "alert-icon"
  }, "\uD83D\uDEA8"), /*#__PURE__*/React.createElement("div", {
    className: "alert-text"
  }, mhdAlarm, " Artikel laufen in \u22643 Tagen ab \u2013 sofort pr\xFCfen!")), unterMindest > 0 && /*#__PURE__*/React.createElement("div", {
    className: "alert warn"
  }, /*#__PURE__*/React.createElement("span", {
    className: "alert-icon"
  }, "\uD83D\uDCE6"), /*#__PURE__*/React.createElement("div", {
    className: "alert-text"
  }, unterMindest, " Artikel unter Mindestbestand"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost btn-sm",
    onClick: () => setPage('bestellungen')
  }, "Anzeigen")), offeneBest > 0 && /*#__PURE__*/React.createElement("div", {
    className: "alert info"
  }, /*#__PURE__*/React.createElement("span", {
    className: "alert-icon"
  }, "\uD83D\uDCCB"), /*#__PURE__*/React.createElement("div", {
    className: "alert-text"
  }, offeneBest, " offene Bestellung", offeneBest !== 1 ? 'en' : '', " \u2013 auf Wareneingang warten"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost btn-sm",
    onClick: () => setPage('wareneingang')
  }, "Einbuchen")), /*#__PURE__*/React.createElement("div", {
    className: "kpi-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kpi-card blue"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kpi-icon"
  }, "\uD83D\uDCB0"), /*#__PURE__*/React.createElement("div", {
    className: "kpi-val"
  }, fmtE(totalWert)), /*#__PURE__*/React.createElement("div", {
    className: "kpi-lbl"
  }, "Lagerwert"), /*#__PURE__*/React.createElement("div", {
    className: "kpi-sub"
  }, lager.length, " Positionen")), /*#__PURE__*/React.createElement("div", {
    className: "kpi-card red"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kpi-icon"
  }, "\u23F0"), /*#__PURE__*/React.createElement("div", {
    className: "kpi-val"
  }, mhdAlarm), /*#__PURE__*/React.createElement("div", {
    className: "kpi-lbl"
  }, "MHD-Alarm"), /*#__PURE__*/React.createElement("div", {
    className: "kpi-sub"
  }, "\u22643 Tage Restlaufzeit")), /*#__PURE__*/React.createElement("div", {
    className: "kpi-card yellow"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kpi-icon"
  }, "\uD83D\uDCC9"), /*#__PURE__*/React.createElement("div", {
    className: "kpi-val"
  }, unterMindest), /*#__PURE__*/React.createElement("div", {
    className: "kpi-lbl"
  }, "Unterbestand"), /*#__PURE__*/React.createElement("div", {
    className: "kpi-sub"
  }, "von ", artikel.length, " Artikeln")), /*#__PURE__*/React.createElement("div", {
    className: "kpi-card green"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kpi-icon"
  }, "\uD83C\uDF7D"), /*#__PURE__*/React.createElement("div", {
    className: "kpi-val"
  }, fmtE(heuteVb)), /*#__PURE__*/React.createElement("div", {
    className: "kpi-lbl"
  }, "Verbrauch heute"), /*#__PURE__*/React.createElement("div", {
    className: "kpi-sub"
  }, "Wareneinsatz"))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "sec-title",
    style: {
      fontSize: 16
    }
  }, "Schnellzugriff")), /*#__PURE__*/React.createElement("div", {
    className: "action-grid"
  }, /*#__PURE__*/React.createElement("button", {
    className: "action-tile blue",
    onClick: () => setPage('wareneingang')
  }, /*#__PURE__*/React.createElement("div", {
    className: "tile-icon"
  }, "\uD83D\uDE9A"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "tile-label"
  }, "Ware einbuchen"), /*#__PURE__*/React.createElement("div", {
    className: "tile-sub"
  }, "Wareneingang erfassen"))), /*#__PURE__*/React.createElement("button", {
    className: "action-tile green",
    onClick: () => setPage('rezepturen')
  }, /*#__PURE__*/React.createElement("div", {
    className: "tile-icon"
  }, "\uD83D\uDC68\u200D\uD83C\uDF73"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "tile-label"
  }, "Produktion starten"), /*#__PURE__*/React.createElement("div", {
    className: "tile-sub"
  }, "Rezeptur abbuchen"))), /*#__PURE__*/React.createElement("button", {
    className: "action-tile orange",
    onClick: () => setPage('inventur')
  }, /*#__PURE__*/React.createElement("div", {
    className: "tile-icon"
  }, "\uD83D\uDD22"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "tile-label"
  }, "Inventur"), /*#__PURE__*/React.createElement("div", {
    className: "tile-sub"
  }, "Best\xE4nde z\xE4hlen"))), /*#__PURE__*/React.createElement("button", {
    className: "action-tile purple",
    onClick: () => setPage('pcm')
  }, /*#__PURE__*/React.createElement("div", {
    className: "tile-icon"
  }, "\uD83D\uDD17"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "tile-label"
  }, "PCM Preise"), /*#__PURE__*/React.createElement("div", {
    className: "tile-sub"
  }, "Ampel & Bestellung")))), /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "card-title"
  }, "\uD83D\uDCCA Wochenverbrauch (Wareneinsatz \u20AC)")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px 16px 12px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "bar-chart"
  }, weekBars.map((v, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "bar-col"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bar-fill",
    style: {
      height: `${v / maxB * 100}%`,
      background: i === todayIdx ? C.blue : C.blueLight,
      border: `1.5px solid ${i === todayIdx ? C.blue : C.border}`,
      minHeight: v > 0 ? '6px' : '3px'
    }
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      marginTop: 4
    }
  }, wochentage.map((d, i) => /*#__PURE__*/React.createElement("div", {
    key: d,
    style: {
      flex: 1,
      textAlign: 'center',
      fontSize: 9,
      fontWeight: 800,
      color: i === todayIdx ? C.blue : C.textLight
    }
  }, d))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 24,
      marginTop: 12,
      paddingTop: 10,
      borderTop: `1px solid ${C.border}`
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.textLight,
      fontWeight: 700,
      textTransform: 'uppercase'
    }
  }, "Heute"), /*#__PURE__*/React.createElement("div", {
    className: "mono",
    style: {
      fontSize: 16,
      fontWeight: 700,
      color: C.blue
    }
  }, fmtE(heuteVb))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.textLight,
      fontWeight: 700,
      textTransform: 'uppercase'
    }
  }, "Woche"), /*#__PURE__*/React.createElement("div", {
    className: "mono",
    style: {
      fontSize: 16,
      fontWeight: 700
    }
  }, fmtE(weekBars.reduce((a, b) => a + b, 0))))))), mhdWarn.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "card-title"
  }, "\u23F0 MHD l\xE4uft bald ab")), /*#__PURE__*/React.createElement("div", {
    className: "tbl-scroll"
  }, /*#__PURE__*/React.createElement("table", {
    className: "tbl"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Artikel"), /*#__PURE__*/React.createElement("th", null, "Lagerort"), /*#__PURE__*/React.createElement("th", null, "Menge"), /*#__PURE__*/React.createElement("th", null, "MHD"))), /*#__PURE__*/React.createElement("tbody", null, mhdWarn.sort((a, b) => new Date(a.mhd) - new Date(b.mhd)).map(l => {
    const art = getA(artikel, l.artikelId);
    const days = daysDiff(l.mhd);
    return /*#__PURE__*/React.createElement("tr", {
      key: l.id
    }, /*#__PURE__*/React.createElement("td", {
      style: {
        fontWeight: 800
      }
    }, art?.name), /*#__PURE__*/React.createElement("td", {
      style: {
        color: C.textMid
      }
    }, l.lagerort), /*#__PURE__*/React.createElement("td", {
      className: "mono"
    }, fmt(l.menge, 1), " ", art?.einheit), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(Badge, {
      type: mhdBadge(days)
    }, mhdLabel(days))));
  }))))));
}

// ── LAGER ─────────────────────────────────────────────────────────────────────
function Lager({
  data,
  setData,
  toast
}) {
  const {
    artikel,
    lager
  } = data;
  const [search, setSearch] = useState('');
  const [kat, setKat] = useState('Alle');
  const [abgangModal, setAbgangModal] = useState(null);
  const [abgangMenge, setAbgangMenge] = useState(1);
  const kategorien = [...new Set(artikel.map(a => a.kategorie))].sort();
  const rows = artikel.map(a => ({
    ...a,
    bestand: getLB(lager, a.id),
    positionen: lager.filter(l => l.artikelId === a.id).sort((x, y) => new Date(x.mhd) - new Date(y.mhd))
  })).filter(a => {
    const q = search.toLowerCase();
    return (!q || a.name.toLowerCase().includes(q) || a.kategorie.toLowerCase().includes(q)) && (kat === 'Alle' || a.kategorie === kat);
  });
  function buchAbgang() {
    if (!abgangModal) return;
    const {
      lagerPos,
      art
    } = abgangModal;
    const menge = Math.min(abgangMenge, lagerPos.menge);
    setData(d => ({
      ...d,
      lager: d.lager.map(l => l.id === lagerPos.id ? {
        ...l,
        menge: l.menge - menge
      } : l).filter(l => l.menge > 0),
      verbrauch: [...d.verbrauch, {
        id: Date.now(),
        datum: todayStr(),
        artikelId: art.id,
        menge,
        grund: 'Manuelle Entnahme'
      }]
    }));
    toast(`${fmt(menge, 2)} ${art.einheit} ${art.name} entnommen`, 'success');
    setAbgangModal(null);
  }
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      marginBottom: 14,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "search-wrap",
    style: {
      minWidth: 200,
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "search-icon"
  }, "\uD83D\uDD0D"), /*#__PURE__*/React.createElement("input", {
    placeholder: "Artikel suchen\u2026",
    value: search,
    onChange: e => setSearch(e.target.value)
  })), /*#__PURE__*/React.createElement("select", {
    value: kat,
    onChange: e => setKat(e.target.value),
    style: {
      width: 150,
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement("option", null, "Alle"), kategorien.map(k => /*#__PURE__*/React.createElement("option", {
    key: k
  }, k)))), /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tbl-scroll"
  }, /*#__PURE__*/React.createElement("table", {
    className: "tbl"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Artikel"), /*#__PURE__*/React.createElement("th", null, "Kategorie"), /*#__PURE__*/React.createElement("th", null, "Bestand / Mindest"), /*#__PURE__*/React.createElement("th", null, "MHD (n\xE4chste)"), /*#__PURE__*/React.createElement("th", null, "Lagerwert"), /*#__PURE__*/React.createElement("th", null, "Aktion"))), /*#__PURE__*/React.createElement("tbody", null, rows.length === 0 && /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: 6
  }, /*#__PURE__*/React.createElement("div", {
    className: "empty"
  }, /*#__PURE__*/React.createElement("div", {
    className: "empty-icon"
  }, "\uD83D\uDCE6"), /*#__PURE__*/React.createElement("div", {
    className: "empty-title"
  }, "Nichts gefunden")))), rows.map(a => {
    const np = a.positionen[0];
    const days = np ? daysDiff(np.mhd) : null;
    const wert = a.bestand * (np?.ek || a.ek);
    return /*#__PURE__*/React.createElement("tr", {
      key: a.id
    }, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 800
      }
    }, a.name), a.bestand < a.mindestbestand && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: C.red,
        fontWeight: 700
      }
    }, "\u26A0 Unterbestand")), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(Badge, {
      type: "gray"
    }, a.kategorie)), /*#__PURE__*/React.createElement("td", {
      style: {
        minWidth: 160
      }
    }, /*#__PURE__*/React.createElement(StockBar, {
      current: a.bestand,
      max: a.mindestbestand * 3,
      unit: a.einheit
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: C.textLight,
        marginTop: 3,
        fontWeight: 700
      }
    }, "Min: ", fmt(a.mindestbestand, 0), " ", a.einheit)), /*#__PURE__*/React.createElement("td", null, np ? /*#__PURE__*/React.createElement(Badge, {
      type: mhdBadge(days)
    }, np.mhd, " (", mhdLabel(days), ")") : /*#__PURE__*/React.createElement("span", {
      style: {
        color: C.textLight
      }
    }, "\u2014")), /*#__PURE__*/React.createElement("td", {
      className: "mono",
      style: {
        color: C.blue,
        fontWeight: 800
      }
    }, fmtE(wert)), /*#__PURE__*/React.createElement("td", null, np && /*#__PURE__*/React.createElement("button", {
      className: "btn btn-ghost btn-sm",
      onClick: () => {
        setAbgangModal({
          lagerPos: np,
          art: a
        });
        setAbgangMenge(1);
      }
    }, "Entnahme")));
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "card-title"
  }, "\uD83C\uDFF7 Alle Chargen (FIFO)")), /*#__PURE__*/React.createElement("div", {
    className: "tbl-scroll"
  }, /*#__PURE__*/React.createElement("table", {
    className: "tbl"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Artikel"), /*#__PURE__*/React.createElement("th", null, "Charge"), /*#__PURE__*/React.createElement("th", null, "Menge"), /*#__PURE__*/React.createElement("th", null, "EK"), /*#__PURE__*/React.createElement("th", null, "MHD"), /*#__PURE__*/React.createElement("th", null, "Lagerort"))), /*#__PURE__*/React.createElement("tbody", null, [...lager].sort((a, b) => new Date(a.mhd) - new Date(b.mhd)).map(l => {
    const art = getA(artikel, l.artikelId);
    const days = daysDiff(l.mhd);
    return /*#__PURE__*/React.createElement("tr", {
      key: l.id
    }, /*#__PURE__*/React.createElement("td", {
      style: {
        fontWeight: 700
      }
    }, art?.name), /*#__PURE__*/React.createElement("td", {
      style: {
        color: C.textMid
      }
    }, l.charge), /*#__PURE__*/React.createElement("td", {
      className: "mono"
    }, fmt(l.menge, 2), " ", art?.einheit), /*#__PURE__*/React.createElement("td", {
      className: "mono"
    }, fmtE(l.ek)), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(Badge, {
      type: mhdBadge(days)
    }, l.mhd)), /*#__PURE__*/React.createElement("td", {
      style: {
        color: C.textMid
      }
    }, l.lagerort));
  }))))), abgangModal && /*#__PURE__*/React.createElement(Modal, {
    title: `Entnahme: ${abgangModal.art.name}`,
    onClose: () => setAbgangModal(null),
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
      className: "btn btn-primary btn-xl",
      onClick: buchAbgang
    }, "\u2705 ", fmt(abgangMenge, 2), " ", abgangModal.art.einheit, " entnehmen"), /*#__PURE__*/React.createElement("button", {
      className: "btn btn-ghost",
      style: {
        width: '100%'
      },
      onClick: () => setAbgangModal(null)
    }, "Abbrechen"))
  }, /*#__PURE__*/React.createElement("div", {
    className: "alert info"
  }, /*#__PURE__*/React.createElement("span", {
    className: "alert-icon"
  }, "\uD83D\uDCE6"), /*#__PURE__*/React.createElement("div", {
    className: "alert-text"
  }, "Charge: ", abgangModal.lagerPos.charge, " \xB7 MHD: ", abgangModal.lagerPos.mhd, /*#__PURE__*/React.createElement("br", null), "Verf\xFCgbar: ", fmt(abgangModal.lagerPos.menge, 2), " ", abgangModal.art.einheit)), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Menge (", abgangModal.art.einheit, ")"), /*#__PURE__*/React.createElement(QtyPicker, {
    value: abgangMenge,
    onChange: setAbgangMenge,
    step: 0.1,
    min: 0.1
  }))));
}
// ── WARENEINGANG ── FIX-1 FIX-2 FIX-4 FIX-7 ─────────────────────────────────
function Wareneingang({
  data,
  setData,
  toast,
  setPage
}) {
  const {
    lieferanten,
    artikel,
    wareneingaenge,
    bestellungen,
    archivWE = [],
    archivBest = []
  } = data;
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    lieferantId: '',
    datum: todayStr(),
    belegnr: '',
    positionen: [],
    bestellungId: null
  });
  const [pos, setPos] = useState({
    artikelId: '',
    menge: 1,
    ek: '',
    mhd: '',
    lagerort: 'Kühlraum A'
  });
  const [mhdErr, setMhdErr] = useState(false);
  const lagerorte = ['Kühlraum A', 'Kühlraum B', 'Weinkeller', 'Trockenlager', 'Tiefkühl'];
  const offeneBest = bestellungen.filter(b => b.status === 'Bestellt');

  // Beim Öffnen: pendingWE aus sessionStorage laden (von Bestellungen-Einbuchen-Button)
  useEffect(() => {
    try {
      const pending = sessionStorage.getItem('menumetric-pendingWE');
      if (pending) {
        sessionStorage.removeItem('menumetric-pendingWE');
        const best = JSON.parse(pending);
        uebernehmeBest(best);
      }
    } catch {}
  }, []);
  function resetForm() {
    setStep(0);
    setForm({
      lieferantId: '',
      datum: todayStr(),
      belegnr: '',
      positionen: [],
      bestellungId: null
    });
    setPos({
      artikelId: '',
      menge: 1,
      ek: '',
      mhd: '',
      lagerort: 'Kühlraum A'
    });
    setMhdErr(false);
  }

  // FIX-1: Bestellung als Vorlage übernehmen (unterstützt Standard- und PCM-Bestellungen)
  function uebernehmeBest(best) {
    const positionen = best.positionen.map(p => {
      const art = getA(artikel, p.artikelId);
      return {
        artikelId: String(p.artikelId),
        menge: p.menge,
        ek: p.ek || '',
        mhd: '',
        lagerort: 'Kühlraum A',
        id: Date.now() + Math.random(),
        artName: p.artikelName || art?.name || '',
        artEinheit: p.einheit || art?.einheit || '',
        pcmArtNr: p.pcmArtNr || null,
        gebindeLabel: p.gebindeLabel || null
      };
    });
    // PCM-Bestellungen haben lieferantName direkt gespeichert
    const liefName = best.lieferantName || getL(lieferanten, best.lieferantId)?.name || '';
    setForm({
      lieferantId: String(best.lieferantId),
      datum: todayStr(),
      belegnr: `WE-${best.belegnr}`,
      positionen,
      bestellungId: best.id,
      lieferantInfo: {
        name: liefName,
        email: best.lieferantEmail || '',
        telefon: best.lieferantTelefon || ''
      }
    });
    setStep(2);
    toast(`${best.quelle === 'PCM' ? 'PCM-' : ''}Bestellung ${best.belegnr} übernommen – bitte MHD ergänzen`, 'info');
  }
  function addPos() {
    if (!pos.artikelId || !pos.menge) return;
    if (!pos.mhd) {
      setMhdErr(true);
      toast('MHD-Datum ist Pflicht!', 'warn');
      return;
    }
    setMhdErr(false);
    const art = getA(artikel, Number(pos.artikelId));
    setForm(f => ({
      ...f,
      positionen: [...f.positionen, {
        ...pos,
        id: Date.now(),
        artName: art?.name,
        artEinheit: art?.einheit
      }]
    }));
    setPos({
      artikelId: '',
      menge: 1,
      ek: '',
      mhd: '',
      lagerort: 'Kühlraum A'
    });
    toast(`${art?.name} hinzugefügt`, 'info');
  }
  function buchen() {
    if (!form.lieferantId || !form.positionen.length) {
      toast('Lieferant und mind. 1 Position erforderlich', 'warn');
      return;
    }
    // MHD-Pflichtprüfung
    const missingMhd = form.positionen.filter(p => !p.mhd);
    if (missingMhd.length > 0) {
      toast(missingMhd.length + ' Position(en) ohne MHD – bitte eintragen', 'warn');
      return;
    }
    // EK-Warnung (kein harter Block, nur Hinweis – PCM-Positionen können 0 haben)
    const missingEk = form.positionen.filter(p => !p.ek || Number(p.ek) <= 0);
    if (missingEk.length > 0) {
      // Weiche Warnung: User kann trotzdem buchen nach Bestätigung
      const ok = window.confirm(missingEk.length + ' Position(en) ohne EK-Preis. Trotzdem buchen?');
      if (!ok) return;
    }
    const belegnr = form.belegnr || 'WE-' + Math.random().toString(36).slice(2, 7).toUpperCase();
    const gebuchtePositionen = form.positionen.map(p => ({
      artikelId: Number(p.artikelId),
      artikelName: p.artName || '',
      menge: Number(p.menge),
      ek: Number(p.ek) || 0,
      mhd: p.mhd,
      lagerort: p.lagerort || 'Kühlraum A'
    }));
    const we = {
      id: Date.now(),
      lieferantId: Number(form.lieferantId),
      lieferantName: form.lieferantInfo?.name || getL(lieferanten, Number(form.lieferantId))?.name || '',
      datum: form.datum,
      gebuchtAm: todayStr(),
      status: 'Gebucht',
      belegnr,
      bestellungId: form.bestellungId || null,
      positionen: gebuchtePositionen,
      gesamtwert: gebuchtePositionen.reduce((s, p) => s + p.menge * p.ek, 0)
    };
    const newLager = form.positionen.map(p => {
      const art = getA(artikel, Number(p.artikelId));
      return {
        id: Date.now() + Math.random(),
        artikelId: Number(p.artikelId),
        menge: Number(p.menge),
        ek: Number(p.ek) || art?.ek || 0,
        mhd: p.mhd,
        lagerort: p.lagerort || 'Kühlraum A',
        charge: 'CH-' + Math.random().toString(36).slice(2, 7).toUpperCase(),
        eingang: todayStr()
      };
    });
    setData(d => {
      // Bestellung auf Geliefert setzen + ins Archiv verschieben
      let newBest = [...d.bestellungen];
      let newArchivBest = [...(d.archivBest || [])];
      if (form.bestellungId) {
        const geliefert = d.bestellungen.find(b => b.id === form.bestellungId);
        if (geliefert) {
          const archiviert = {
            ...geliefert,
            status: 'Geliefert',
            lieferdatum: todayStr(),
            weNr: belegnr
          };
          newArchivBest = [archiviert, ...newArchivBest];
          newBest = d.bestellungen.filter(b => b.id !== form.bestellungId);
        }
      }
      // Artikel-EK aktualisieren
      const newArtikel = d.artikel.map(a => {
        const p = form.positionen.find(p => Number(p.artikelId) === a.id);
        return p && Number(p.ek) > 0 ? {
          ...a,
          ek: Number(p.ek)
        } : a;
      });
      // WE ins Archiv
      const newArchivWE = [we, ...(d.archivWE || [])];
      return {
        ...d,
        wareneingaenge: [we, ...d.wareneingaenge],
        lager: [...d.lager, ...newLager],
        bestellungen: newBest,
        archivBest: newArchivBest,
        archivWE: newArchivWE,
        artikel: newArtikel
      };
    });
    toast(belegnr + ' gebucht – Lager & Archiv aktualisiert', 'success');
    resetForm();
  }
  if (step === 0) return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-lg",
    style: {
      width: '100%',
      marginBottom: 16
    },
    onClick: () => setStep(1)
  }, "+ Neuer Wareneingang"), offeneBest.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "card-title"
  }, "\uD83D\uDCCB Warten auf Eingang"), /*#__PURE__*/React.createElement(Badge, {
    type: "blue"
  }, offeneBest.length)), /*#__PURE__*/React.createElement("div", {
    className: "tbl-scroll"
  }, /*#__PURE__*/React.createElement("table", {
    className: "tbl"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Beleg-Nr."), /*#__PURE__*/React.createElement("th", null, "Lieferant"), /*#__PURE__*/React.createElement("th", null, "Datum"), /*#__PURE__*/React.createElement("th", null, "Pos."), /*#__PURE__*/React.createElement("th", null))), /*#__PURE__*/React.createElement("tbody", null, offeneBest.map(b => {
    const lief = getL(lieferanten, b.lieferantId);
    const liefName = b.lieferantName || lief?.name || '—';
    return /*#__PURE__*/React.createElement("tr", {
      key: b.id
    }, /*#__PURE__*/React.createElement("td", {
      style: {
        fontWeight: 800,
        color: C.blue
      }
    }, b.belegnr, b.quelle === 'PCM' && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        background: C.blueLight,
        color: C.blue,
        padding: '1px 6px',
        borderRadius: 10,
        marginLeft: 6,
        fontWeight: 800
      }
    }, "PCM")), /*#__PURE__*/React.createElement("td", null, liefName), /*#__PURE__*/React.createElement("td", null, b.datum), /*#__PURE__*/React.createElement("td", {
      className: "mono"
    }, b.positionen.length), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("button", {
      className: "btn btn-success btn-sm",
      onClick: () => uebernehmeBest(b)
    }, "\uD83D\uDCE5 Einbuchen")));
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "card-title"
  }, "\uD83D\uDE9A Wareneing\xE4nge"), /*#__PURE__*/React.createElement(Badge, {
    type: "green"
  }, wareneingaenge.length)), wareneingaenge.length === 0 ? /*#__PURE__*/React.createElement("div", {
    className: "empty"
  }, /*#__PURE__*/React.createElement("div", {
    className: "empty-icon"
  }, "\uD83D\uDE9A"), /*#__PURE__*/React.createElement("div", {
    className: "empty-title"
  }, "Noch keine Eing\xE4nge")) : /*#__PURE__*/React.createElement("div", {
    className: "tbl-scroll"
  }, /*#__PURE__*/React.createElement("table", {
    className: "tbl"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Beleg-Nr."), /*#__PURE__*/React.createElement("th", null, "Datum"), /*#__PURE__*/React.createElement("th", null, "Lieferant"), /*#__PURE__*/React.createElement("th", null, "Pos."), /*#__PURE__*/React.createElement("th", null, "Wert"), /*#__PURE__*/React.createElement("th", null, "Status"), /*#__PURE__*/React.createElement("th", null))), /*#__PURE__*/React.createElement("tbody", null, wareneingaenge.map(we => {
    const lief = getL(lieferanten, we.lieferantId);
    const wert = we.gesamtwert || we.positionen.reduce((s, p) => s + p.menge * p.ek, 0);
    return /*#__PURE__*/React.createElement("tr", {
      key: we.id
    }, /*#__PURE__*/React.createElement("td", {
      style: {
        fontWeight: 800,
        color: C.blue
      }
    }, we.belegnr), /*#__PURE__*/React.createElement("td", null, we.datum), /*#__PURE__*/React.createElement("td", null, we.lieferantName || lief?.name || '—'), /*#__PURE__*/React.createElement("td", {
      className: "mono"
    }, we.positionen.length), /*#__PURE__*/React.createElement("td", {
      className: "mono"
    }, fmtE(wert)), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(Badge, {
      type: "green"
    }, we.status)), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("button", {
      className: "btn btn-ghost btn-sm",
      style: {
        minHeight: 28,
        padding: '0 8px'
      },
      onClick: () => {
        if (!window.confirm('Wareneingang ' + we.belegnr + ' löschen? (Lagerbestände werden NICHT rückgebucht)')) return;
        setData(d => ({
          ...d,
          wareneingaenge: d.wareneingaenge.filter(x => x.id !== we.id)
        }));
        toast('Wareneingang gelöscht', 'warn');
      }
    }, "\uD83D\uDDD1")));
  }))))), (data.archivWE || []).length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "card-title"
  }, "\uD83D\uDDC2 Archiv Wareneing\xE4nge"), /*#__PURE__*/React.createElement(Badge, {
    type: "gray"
  }, (data.archivWE || []).length)), /*#__PURE__*/React.createElement("div", {
    className: "tbl-scroll"
  }, /*#__PURE__*/React.createElement("table", {
    className: "tbl"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Beleg-Nr."), /*#__PURE__*/React.createElement("th", null, "Datum"), /*#__PURE__*/React.createElement("th", null, "Lieferant"), /*#__PURE__*/React.createElement("th", null, "Pos."), /*#__PURE__*/React.createElement("th", null, "Wert"), /*#__PURE__*/React.createElement("th", null))), /*#__PURE__*/React.createElement("tbody", null, (data.archivWE || []).slice(0, 20).map(we => {
    const wert = we.gesamtwert || we.positionen.reduce((s, p) => s + p.menge * p.ek, 0);
    return /*#__PURE__*/React.createElement("tr", {
      key: we.id,
      style: {
        opacity: 0.7
      }
    }, /*#__PURE__*/React.createElement("td", {
      style: {
        fontWeight: 700,
        color: C.textMid
      }
    }, we.belegnr), /*#__PURE__*/React.createElement("td", {
      style: {
        color: C.textMid
      }
    }, we.datum), /*#__PURE__*/React.createElement("td", {
      style: {
        color: C.textMid
      }
    }, we.lieferantName || '—'), /*#__PURE__*/React.createElement("td", {
      className: "mono"
    }, we.positionen.length), /*#__PURE__*/React.createElement("td", {
      className: "mono"
    }, fmtE(wert)), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("button", {
      className: "btn btn-ghost btn-sm",
      style: {
        minHeight: 28,
        padding: '0 8px',
        opacity: 0.6
      },
      onClick: () => {
        if (!window.confirm('Archiveintrag löschen?')) return;
        setData(d => ({
          ...d,
          archivWE: (d.archivWE || []).filter(x => x.id !== we.id)
        }));
        toast('Archiveintrag gelöscht', 'warn');
      }
    }, "\uD83D\uDDD1")));
  }))))));
  if (step === 1) return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "steps"
  }, /*#__PURE__*/React.createElement("div", {
    className: "step done"
  }), /*#__PURE__*/React.createElement("div", {
    className: "step"
  })), /*#__PURE__*/React.createElement("div", {
    className: "sec-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "sec-title"
  }, "1. Lieferant & Datum"), /*#__PURE__*/React.createElement("div", {
    className: "sec-sub"
  }, "Lieferant und Lieferdatum w\xE4hlen"))), /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      padding: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label req"
  }, "Lieferant"), /*#__PURE__*/React.createElement("select", {
    value: form.lieferantId,
    onChange: e => setForm(f => ({
      ...f,
      lieferantId: e.target.value
    }))
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "\u2014 w\xE4hlen \u2014"), lieferanten.map(l => /*#__PURE__*/React.createElement("option", {
    key: l.id,
    value: l.id
  }, l.name)))), /*#__PURE__*/React.createElement("div", {
    className: "form-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Lieferdatum"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: form.datum,
    onChange: e => setForm(f => ({
      ...f,
      datum: e.target.value
    }))
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Lieferschein-Nr."), /*#__PURE__*/React.createElement("input", {
    placeholder: "Automatisch",
    value: form.belegnr,
    onChange: e => setForm(f => ({
      ...f,
      belegnr: e.target.value
    }))
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost",
    style: {
      flex: 1
    },
    onClick: resetForm
  }, "Abbrechen"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    style: {
      flex: 2
    },
    disabled: !form.lieferantId,
    onClick: () => setStep(2)
  }, "Weiter \u2192 Positionen")));
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "steps"
  }, /*#__PURE__*/React.createElement("div", {
    className: "step done"
  }), /*#__PURE__*/React.createElement("div", {
    className: "step done"
  })), /*#__PURE__*/React.createElement("div", {
    className: "sec-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "sec-title"
  }, "2. Positionen"), /*#__PURE__*/React.createElement("div", {
    className: "sec-sub"
  }, getL(lieferanten, Number(form.lieferantId))?.name, " \xB7 ", form.datum, form.bestellungId ? ' · aus Bestellung' : ''))), form.positionen.some(p => !p.mhd) && /*#__PURE__*/React.createElement("div", {
    className: "alert warn"
  }, /*#__PURE__*/React.createElement("span", {
    className: "alert-icon"
  }, "\u26A0"), /*#__PURE__*/React.createElement("div", {
    className: "alert-text"
  }, "Positionen ohne MHD \u2013 bitte vor dem Buchen erg\xE4nzen.")), form.positionen.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "pos-list",
    style: {
      marginBottom: 14
    }
  }, form.positionen.map((p, i) => /*#__PURE__*/React.createElement("div", {
    key: p.id,
    style: {
      background: C.bg,
      borderRadius: 12,
      padding: '10px 12px',
      border: !p.mhd ? `1.5px solid ${C.red}` : `1.5px solid ${C.border}`,
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 800,
      fontSize: 14
    }
  }, p.artName), /*#__PURE__*/React.createElement("button", {
    className: "pos-remove",
    onClick: () => setForm(f => ({
      ...f,
      positionen: f.positionen.filter((_, j) => j !== i)
    }))
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.textMid,
      marginBottom: 8
    }
  }, fmt(p.menge, 2), " ", p.artEinheit, p.gebindeLabel && /*#__PURE__*/React.createElement("span", null, " \xB7 ", p.gebindeLabel), p.pcmArtNr && /*#__PURE__*/React.createElement("span", null, " \xB7 PCM: ", p.pcmArtNr)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 800,
      color: !p.mhd ? C.red : C.textMid,
      textTransform: 'uppercase',
      marginBottom: 3
    }
  }, "MHD ", !p.mhd && '⚠ Pflicht'), /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: p.mhd || '',
    style: {
      minHeight: 40,
      fontSize: 13,
      borderColor: !p.mhd ? C.red : C.border
    },
    onChange: e => {
      const val = e.target.value;
      setForm(f => ({
        ...f,
        positionen: f.positionen.map((x, j) => j === i ? {
          ...x,
          mhd: val
        } : x)
      }));
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 800,
      color: C.textMid,
      textTransform: 'uppercase',
      marginBottom: 3
    }
  }, "EK-Preis (\u20AC)"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    min: "0",
    step: "0.01",
    value: p.ek || '',
    placeholder: "0,00",
    style: {
      minHeight: 40,
      fontSize: 13
    },
    onChange: e => setForm(f => ({
      ...f,
      positionen: f.positionen.map((x, j) => j === i ? {
        ...x,
        ek: e.target.value
      } : x)
    }))
  })))))), /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 800,
      color: C.textMid,
      textTransform: 'uppercase',
      letterSpacing: '.5px',
      marginBottom: 12
    }
  }, "Position hinzuf\xFCgen"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label req"
  }, "Artikel"), /*#__PURE__*/React.createElement("select", {
    value: pos.artikelId,
    onChange: e => {
      const art = getA(artikel, Number(e.target.value));
      const pcmEk = getBestEkFromPCM(Number(e.target.value));
      setPos(p => ({
        ...p,
        artikelId: e.target.value,
        ek: pcmEk ? pcmEk.toFixed(2) : art?.ek || ''
      }));
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "\u2014 w\xE4hlen \u2014"), artikel.map(a => /*#__PURE__*/React.createElement("option", {
    key: a.id,
    value: a.id
  }, a.name, " (", a.einheit, ")")))), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Menge"), /*#__PURE__*/React.createElement(QtyPicker, {
    value: pos.menge,
    onChange: v => setPos(p => ({
      ...p,
      menge: v
    })),
    step: 0.5,
    min: 0.1
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "EK-Preis (\u20AC)"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    min: "0",
    step: "0.01",
    value: pos.ek,
    onChange: e => setPos(p => ({
      ...p,
      ek: e.target.value
    }))
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label req"
  }, "MHD (Pflicht)"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: pos.mhd,
    className: mhdErr && !pos.mhd ? 'err' : '',
    onChange: e => {
      setPos(p => ({
        ...p,
        mhd: e.target.value
      }));
      setMhdErr(false);
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Lagerort"), /*#__PURE__*/React.createElement("select", {
    value: pos.lagerort,
    onChange: e => setPos(p => ({
      ...p,
      lagerort: e.target.value
    }))
  }, lagerorte.map(o => /*#__PURE__*/React.createElement("option", {
    key: o
  }, o)))), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: addPos,
    disabled: !pos.artikelId
  }, "+ Position hinzuf\xFCgen"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost",
    style: {
      flex: 1
    },
    onClick: () => form.bestellungId ? resetForm() : setStep(1)
  }, "\u2190 Zur\xFCck"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    style: {
      flex: 2
    },
    disabled: !form.positionen.length,
    onClick: buchen
  }, "\u2705 ", form.positionen.length, " Position", form.positionen.length !== 1 ? 'en' : '', " buchen")));
}
// ── REZEPTUREN ── FIX-3 ───────────────────────────────────────────────────────
function Rezepturen({
  data,
  setData,
  toast
}) {
  const {
    rezepturen,
    artikel,
    lager
  } = data;
  const [selected, setSelected] = useState(null);
  const [portionen, setPortionen] = useState(1);
  const [showNeu, setShowNeu] = useState(false);
  const [editId, setEditId] = useState(null);
  const [neuForm, setNeuForm] = useState({
    name: '',
    kategorie: 'Hauptgericht',
    vkPreis: '',
    zutaten: []
  });
  const [neuZutat, setNeuZutat] = useState({
    artikelId: '',
    menge: 0.1
  });
  const kategorien = ['Vorspeise', 'Hauptgericht', 'Beilage', 'Dessert', 'Getränk', 'Buffet'];
  function produzieren() {
    if (!selected) return;
    // Prüfe ob alle Zutaten verfügbar sind
    const fehlend = selected.zutaten.filter(z => getLB(lager, z.artikelId) < z.menge * portionen);
    if (fehlend.length > 0) {
      const namen = fehlend.map(z => getA(artikel, z.artikelId)?.name || '?').join(', ');
      toast('Nicht genug Bestand: ' + namen, 'error');
      return;
    }
    const changes = {};
    for (const z of selected.zutaten) {
      let needed = z.menge * portionen;
      const chargen = lager.filter(l => l.artikelId === z.artikelId).sort((a, b) => new Date(a.mhd) - new Date(b.mhd));
      for (const ch of chargen) {
        if (needed <= 0) break;
        const take = Math.min(ch.menge, needed);
        changes[ch.id] = (changes[ch.id] !== undefined ? changes[ch.id] : ch.menge) - take;
        needed -= take;
      }
    }
    const newVerbrauch = selected.zutaten.map(z => ({
      id: Date.now() + Math.random(),
      datum: todayStr(),
      artikelId: z.artikelId,
      menge: z.menge * portionen,
      grund: `Produktion: ${selected.name} (${portionen} Port.)`
    }));
    setData(d => ({
      ...d,
      lager: d.lager.map(l => changes[l.id] !== undefined ? {
        ...l,
        menge: changes[l.id]
      } : l).filter(l => l.menge > 0),
      verbrauch: [...d.verbrauch, ...newVerbrauch]
    }));
    toast(`${portionen} Port. "${selected.name}" produziert`, 'success');
    setSelected(null);
    setPortionen(1);
  }
  function openNeu(existing = null) {
    if (existing) {
      setNeuForm({
        name: existing.name,
        kategorie: existing.kategorie,
        vkPreis: existing.vkPreis,
        zutaten: [...existing.zutaten]
      });
      setEditId(existing.id);
    } else {
      setNeuForm({
        name: '',
        kategorie: 'Hauptgericht',
        vkPreis: '',
        zutaten: []
      });
      setEditId(null);
    }
    setNeuZutat({
      artikelId: '',
      menge: 0.1
    });
    setShowNeu(true);
  }
  function addZutat() {
    if (!neuZutat.artikelId || !neuZutat.menge) return;
    const art = getA(artikel, Number(neuZutat.artikelId));
    if (!art) return;
    setNeuForm(f => ({
      ...f,
      zutaten: [...f.zutaten, {
        artikelId: Number(neuZutat.artikelId),
        menge: Number(neuZutat.menge),
        einheit: art.einheit
      }]
    }));
    setNeuZutat({
      artikelId: '',
      menge: 0.1
    });
  }
  function saveRez() {
    if (!neuForm.name || !neuForm.vkPreis || !neuForm.zutaten.length) {
      toast('Name, VK-Preis und mind. 1 Zutat erforderlich', 'warn');
      return;
    }
    const rez = {
      id: editId || Date.now(),
      name: neuForm.name,
      kategorie: neuForm.kategorie,
      vkPreis: Number(neuForm.vkPreis),
      zutaten: neuForm.zutaten
    };
    setData(d => ({
      ...d,
      rezepturen: editId ? d.rezepturen.map(r => r.id === editId ? rez : r) : [...d.rezepturen, rez]
    }));
    toast(`"${rez.name}" ${editId ? 'aktualisiert' : 'angelegt'}`, 'success');
    setShowNeu(false);
  }
  function deleteRez(id, name) {
    if (!confirm(`"${name}" löschen?`)) return;
    setData(d => ({
      ...d,
      rezepturen: d.rezepturen.filter(r => r.id !== id)
    }));
    toast('Rezeptur gelöscht', 'warn');
  }
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-lg",
    style: {
      width: '100%',
      marginBottom: 16
    },
    onClick: () => openNeu()
  }, "+ Neue Rezeptur"), /*#__PURE__*/React.createElement("div", {
    className: "rez-grid"
  }, rezepturen.map(rez => {
    const kosten = getRezKosten(rez, artikel, lager);
    const marge = rez.vkPreis - kosten;
    const margeP = rez.vkPreis > 0 ? marge / rez.vkPreis * 100 : 0;
    const machbar = rez.zutaten.every(z => getLB(lager, z.artikelId) >= z.menge);
    return /*#__PURE__*/React.createElement("div", {
      key: rez.id,
      className: `rez-card${selected?.id === rez.id ? ' selected' : ''}`,
      onClick: () => {
        setSelected(rez);
        setPortionen(1);
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 8
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 16,
        fontWeight: 900,
        color: C.text,
        marginBottom: 4
      }
    }, rez.name), /*#__PURE__*/React.createElement(Badge, {
      type: "gray"
    }, rez.kategorie)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        alignItems: 'flex-end'
      }
    }, /*#__PURE__*/React.createElement(Badge, {
      type: machbar ? 'green' : 'red'
    }, machbar ? '✓ OK' : '✗ Fehlend'), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 4
      }
    }, /*#__PURE__*/React.createElement("button", {
      className: "btn btn-ghost btn-sm",
      style: {
        minHeight: 28,
        padding: '0 8px'
      },
      onClick: e => {
        e.stopPropagation();
        openNeu(rez);
      }
    }, "\u270F\uFE0F"), /*#__PURE__*/React.createElement("button", {
      className: "btn btn-danger btn-sm",
      style: {
        minHeight: 28,
        padding: '0 8px'
      },
      onClick: e => {
        e.stopPropagation();
        deleteRez(rez.id, rez.name);
      }
    }, "\uD83D\uDDD1")))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 10
      }
    }, rez.zutaten.map((z, i) => {
      const art = getA(artikel, z.artikelId);
      const ok = getLB(lager, z.artikelId) >= z.menge;
      return /*#__PURE__*/React.createElement("div", {
        key: i,
        style: {
          display: 'flex',
          justifyContent: 'space-between',
          padding: '5px 0',
          borderBottom: `1px solid ${C.border}`,
          fontSize: 13,
          fontWeight: 600
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          color: ok ? C.text : C.red
        }
      }, art?.name || '?'), /*#__PURE__*/React.createElement("span", {
        style: {
          color: C.textMid
        }
      }, fmt(z.menge, 3), " ", z.einheit));
    })), /*#__PURE__*/React.createElement("div", {
      className: "rez-stats"
    }, /*#__PURE__*/React.createElement("div", {
      className: "rez-stat"
    }, /*#__PURE__*/React.createElement("div", {
      className: "rez-stat-lbl"
    }, "Wareneinsatz"), /*#__PURE__*/React.createElement("div", {
      className: "rez-stat-val",
      style: {
        color: C.red
      }
    }, fmtE(kosten))), /*#__PURE__*/React.createElement("div", {
      className: "rez-stat"
    }, /*#__PURE__*/React.createElement("div", {
      className: "rez-stat-lbl"
    }, "VK-Preis"), /*#__PURE__*/React.createElement("div", {
      className: "rez-stat-val",
      style: {
        color: C.blue
      }
    }, fmtE(rez.vkPreis))), /*#__PURE__*/React.createElement("div", {
      className: "rez-stat"
    }, /*#__PURE__*/React.createElement("div", {
      className: "rez-stat-lbl"
    }, "Marge"), /*#__PURE__*/React.createElement("div", {
      className: "rez-stat-val",
      style: {
        color: margeP > 60 ? C.green : margeP > 40 ? C.yellow : C.red
      }
    }, fmt(margeP, 1), "%"))));
  })), selected && !showNeu && /*#__PURE__*/React.createElement(Modal, {
    title: `Produktion: ${selected.name}`,
    onClose: () => {
      setSelected(null);
      setPortionen(1);
    },
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
      className: "btn btn-primary btn-xl",
      onClick: produzieren
    }, "\uD83D\uDC68\u200D\uD83C\uDF73 ", portionen, " Portion", portionen !== 1 ? 'en' : '', " produzieren"), /*#__PURE__*/React.createElement("button", {
      className: "btn btn-ghost",
      style: {
        width: '100%'
      },
      onClick: () => {
        setSelected(null);
        setPortionen(1);
      }
    }, "Abbrechen"))
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Anzahl Portionen"), /*#__PURE__*/React.createElement(QtyPicker, {
    value: portionen,
    onChange: setPortionen,
    step: 1,
    min: 1
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      background: C.bg,
      borderRadius: 14,
      padding: 14,
      border: `1.5px solid ${C.border}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 800,
      color: C.textMid,
      textTransform: 'uppercase',
      marginBottom: 10
    }
  }, "Abbuchung (FIFO)"), selected.zutaten.map((z, i) => {
    const art = getA(artikel, z.artikelId);
    const ben = z.menge * portionen;
    const best = getLB(lager, z.artikelId);
    const ok = best >= ben;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '6px 0',
        borderBottom: i < selected.zutaten.length - 1 ? `1px solid ${C.border}` : 'none',
        fontSize: 13,
        fontWeight: 700
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: ok ? C.text : C.red
      }
    }, art?.name), /*#__PURE__*/React.createElement("span", {
      style: {
        color: ok ? C.textMid : C.red
      }
    }, fmt(ben, 3), " ", z.einheit, !ok && ` ⚠ (${fmt(best, 2)} da)`));
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: 12,
      paddingTop: 10,
      borderTop: `1.5px solid ${C.border}`
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 800,
      color: C.textMid
    }
  }, "Wareneinsatz gesamt"), /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      fontWeight: 800,
      color: C.blue,
      fontSize: 16
    }
  }, fmtE(getRezKosten(selected, artikel, lager) * portionen))))), showNeu && /*#__PURE__*/React.createElement(Modal, {
    title: editId ? 'Rezeptur bearbeiten' : 'Neue Rezeptur',
    onClose: () => setShowNeu(false),
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
      className: "btn btn-primary btn-xl",
      onClick: saveRez
    }, editId ? 'Speichern' : 'Anlegen'), /*#__PURE__*/React.createElement("button", {
      className: "btn btn-ghost",
      style: {
        width: '100%'
      },
      onClick: () => setShowNeu(false)
    }, "Abbrechen"))
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label req"
  }, "Name"), /*#__PURE__*/React.createElement("input", {
    value: neuForm.name,
    placeholder: "z.B. Wiener Schnitzel",
    onChange: e => setNeuForm(f => ({
      ...f,
      name: e.target.value
    }))
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Kategorie"), /*#__PURE__*/React.createElement("select", {
    value: neuForm.kategorie,
    onChange: e => setNeuForm(f => ({
      ...f,
      kategorie: e.target.value
    }))
  }, kategorien.map(k => /*#__PURE__*/React.createElement("option", {
    key: k
  }, k)))), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label req"
  }, "VK-Preis (\u20AC)"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    min: "0",
    step: "0.10",
    value: neuForm.vkPreis,
    onChange: e => setNeuForm(f => ({
      ...f,
      vkPreis: e.target.value
    }))
  }))), /*#__PURE__*/React.createElement("div", {
    className: "divider"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 800,
      fontSize: 13,
      color: C.textMid,
      marginBottom: 8
    }
  }, "ZUTATEN (", neuForm.zutaten.length, ")"), neuForm.zutaten.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      marginBottom: 10
    }
  }, neuForm.zutaten.map((z, i) => {
    const art = getA(artikel, z.artikelId);
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '8px 12px',
        background: C.bg,
        borderRadius: 10,
        border: `1px solid ${C.border}`
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        fontSize: 13,
        fontWeight: 700
      }
    }, art?.name), /*#__PURE__*/React.createElement("span", {
      style: {
        color: C.textMid,
        fontSize: 12,
        fontFamily: 'JetBrains Mono'
      }
    }, fmt(z.menge, 3), " ", z.einheit), /*#__PURE__*/React.createElement("button", {
      className: "pos-remove",
      onClick: () => setNeuForm(f => ({
        ...f,
        zutaten: f.zutaten.filter((_, j) => j !== i)
      }))
    }, "\u2715"));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      background: C.bgBlue,
      borderRadius: 12,
      padding: 12,
      border: `1.5px solid ${C.blueLight}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 800,
      color: C.blue,
      textTransform: 'uppercase',
      marginBottom: 8
    }
  }, "Zutat hinzuf\xFCgen"), /*#__PURE__*/React.createElement("div", {
    className: "form-group",
    style: {
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Artikel"), /*#__PURE__*/React.createElement("select", {
    value: neuZutat.artikelId,
    onChange: e => setNeuZutat(z => ({
      ...z,
      artikelId: e.target.value
    }))
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "\u2014 w\xE4hlen \u2014"), artikel.map(a => /*#__PURE__*/React.createElement("option", {
    key: a.id,
    value: a.id
  }, a.name, " (", a.einheit, ")")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      alignItems: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-group",
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Menge / Portion"), /*#__PURE__*/React.createElement(QtyPicker, {
    value: neuZutat.menge,
    onChange: v => setNeuZutat(z => ({
      ...z,
      menge: v
    })),
    step: 0.01,
    min: 0.001
  })), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-sm",
    style: {
      flexShrink: 0,
      marginBottom: 2
    },
    onClick: addZutat,
    disabled: !neuZutat.artikelId
  }, "+ Hinzuf\xFCgen")))));
}

// ── INVENTUR ── FIX-6 ─────────────────────────────────────────────────────────
function Inventur({
  data,
  setData,
  toast
}) {
  const {
    artikel,
    lager
  } = data;
  const [counts, setCounts] = useState({});
  const [successMsg, setSuccessMsg] = useState(false); // FIX-6: lokaler State, kein persistent flag
  const rows = artikel.map(a => {
    const soll = getLB(lager, a.id);
    const ist = counts[a.id] !== undefined ? Number(counts[a.id]) : soll;
    return {
      ...a,
      soll,
      ist,
      diff: parseFloat((ist - soll).toFixed(3))
    };
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
            return {
              ...l,
              menge: l.menge - take
            };
          }).filter(l => l.menge > 0);
          newVerbrauch.push({
            id: Date.now() + Math.random(),
            datum: todayStr(),
            artikelId: a.id,
            menge: Math.abs(a.diff),
            grund: 'Inventurkorrektur'
          });
        } else {
          newLager.push({
            id: Date.now() + Math.random(),
            artikelId: a.id,
            menge: a.diff,
            ek: a.ek,
            mhd: '2026-12-31',
            lagerort: 'Inventurzugang',
            charge: `INV-${Math.random().toString(36).slice(2, 7).toUpperCase()}`,
            eingang: todayStr()
          });
        }
      });
      return {
        ...d,
        lager: newLager,
        verbrauch: [...d.verbrauch, ...newVerbrauch]
      };
    });
    toast('Inventur gebucht', 'success');
    setCounts({});
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 4000); // FIX-6
  }
  return /*#__PURE__*/React.createElement("div", null, successMsg && /*#__PURE__*/React.createElement("div", {
    className: "alert success",
    style: {
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "alert-icon"
  }, "\u2705"), /*#__PURE__*/React.createElement("div", {
    className: "alert-text"
  }, "Inventur erfolgreich gebucht!")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 14,
      gap: 10,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "sec-title"
  }, "Inventurerfassung"), /*#__PURE__*/React.createElement("div", {
    className: "sec-sub"
  }, todayStr(), " \xB7 ", changedCount, " Artikel ge\xE4ndert")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      alignItems: 'center'
    }
  }, diffWert !== 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 800,
      color: diffWert < 0 ? C.red : C.green
    }
  }, diffWert > 0 ? '+' : '', fmtE(diffWert)), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: buchen,
    disabled: changedCount === 0
  }, "Buchen (", changedCount, ")"))), /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, rows.map(a => /*#__PURE__*/React.createElement("div", {
    key: a.id,
    className: "inv-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inv-name"
  }, a.name, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.textMid,
      fontWeight: 600
    }
  }, a.einheit, " \xB7 ", a.kategorie)), /*#__PURE__*/React.createElement("div", {
    className: "inv-soll"
  }, "Soll: ", fmt(a.soll, 2)), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 120,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    min: "0",
    step: "0.01",
    style: {
      textAlign: 'right',
      minHeight: 44
    },
    value: counts[a.id] !== undefined ? counts[a.id] : fmt(a.soll, 2),
    onChange: e => setCounts(c => ({
      ...c,
      [a.id]: e.target.value
    }))
  })), counts[a.id] !== undefined && a.diff !== 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 70,
      textAlign: 'right',
      fontWeight: 800,
      fontSize: 13,
      color: a.diff < 0 ? C.red : C.green,
      flexShrink: 0
    }
  }, a.diff > 0 ? '+' : '', fmt(a.diff, 2))))));
}
// ── BESTELLUNGEN ── FIX-4 FIX-5 ──────────────────────────────────────────────
function Bestellungen({
  data,
  setData,
  toast,
  setPage
}) {
  const {
    artikel,
    lager,
    lieferanten,
    bestellungen,
    archivBest = []
  } = data;
  const vorschlaege = artikel.filter(a => getLB(lager, a.id) < a.mindestbestand).map(a => ({
    ...a,
    bestand: getLB(lager, a.id),
    fehlmenge: a.mindestbestand - getLB(lager, a.id),
    bestLieferantId: getBestLieferantId(a.id, a.lieferantId) // FIX-5
  }));
  function bestellenAlle() {
    // Nur Artikel bestellen die noch KEINE offene/bestellte Bestellung haben
    const bereitsBestelltIds = new Set(bestellungen.flatMap(b => b.positionen.map(p => p.artikelId)));
    const zuBestellen = vorschlaege.filter(a => !bereitsBestelltIds.has(a.id));
    if (zuBestellen.length === 0) {
      toast('Für alle Artikel existiert bereits eine Bestellung', 'info');
      return;
    }
    const byLief = {};
    zuBestellen.forEach(a => {
      const lid = a.bestLieferantId;
      const lief = getL(lieferanten, lid);
      if (!byLief[lid]) byLief[lid] = {
        lieferantId: lid,
        lieferantName: lief?.name || '',
        positionen: []
      };
      const kat = PCM_KATALOG.find(k => k.artikelId === a.id && k.lieferantId === lid);
      let menge = a.fehlmenge * 1.5;
      if (kat) {
        const bg = kat.gebinde.reduce((b, g) => g.ek / g.menge < b.ek / b.menge ? g : b, kat.gebinde[0]);
        menge = Math.ceil(a.fehlmenge / bg.menge) * bg.menge;
      }
      byLief[lid].positionen.push({
        artikelId: a.id,
        artikelName: a.name,
        menge,
        ek: a.ek,
        einheit: a.einheit
      });
    });
    const newBest = Object.values(byLief).map(lief => ({
      id: Date.now() + Math.random(),
      lieferantId: lief.lieferantId,
      lieferantName: lief.lieferantName,
      datum: todayStr(),
      status: 'Offen',
      belegnr: 'BE-' + Math.random().toString(36).slice(2, 7).toUpperCase(),
      positionen: lief.positionen
    }));
    setData(d => ({
      ...d,
      bestellungen: [...newBest, ...d.bestellungen]
    }));
    toast(newBest.length + ' Bestellung(en) angelegt', 'success');
  }
  function setStatus(id, status) {
    if (status === 'Geliefert') {
      // Manuell auf Geliefert: ins Archiv verschieben
      setData(d => {
        const b = d.bestellungen.find(x => x.id === id);
        if (!b) return d;
        const archiviert = {
          ...b,
          status: 'Geliefert',
          lieferdatum: todayStr()
        };
        return {
          ...d,
          bestellungen: d.bestellungen.filter(x => x.id !== id),
          archivBest: [archiviert, ...(d.archivBest || [])]
        };
      });
      toast('Bestellung als geliefert archiviert', 'success');
    } else {
      setData(d => ({
        ...d,
        bestellungen: d.bestellungen.map(b => b.id === id ? {
          ...b,
          status
        } : b)
      }));
      if (status === 'Bestellt') toast('Als bestellt markiert – erscheint im Wareneingang', 'info');
    }
  }
  const offen = bestellungen.filter(b => b.status === 'Offen');
  const bestellt = bestellungen.filter(b => b.status === 'Bestellt');
  const geliefert = bestellungen.filter(b => b.status === 'Geliefert');
  return /*#__PURE__*/React.createElement("div", null, vorschlaege.length > 0 && /*#__PURE__*/React.createElement(React.Fragment, null, (() => {
    // Zeige "Alle bestellen" nur wenn noch keine offene Bestellung für diese Artikel existiert
    const bereitsBestelltIds = new Set(bestellungen.flatMap(b => b.positionen.map(p => p.artikelId)));
    const nochNichtBestellt = vorschlaege.filter(a => !bereitsBestelltIds.has(a.id));
    if (nochNichtBestellt.length === 0) return /*#__PURE__*/React.createElement("div", {
      className: "alert info"
    }, /*#__PURE__*/React.createElement("span", {
      className: "alert-icon"
    }, "\u2705"), /*#__PURE__*/React.createElement("div", {
      className: "alert-text"
    }, "F\xFCr alle Unterbestand-Artikel wurde bereits eine Bestellung angelegt."));
    return /*#__PURE__*/React.createElement("div", {
      className: "alert warn"
    }, /*#__PURE__*/React.createElement("span", {
      className: "alert-icon"
    }, "\uD83D\uDCCB"), /*#__PURE__*/React.createElement("div", {
      className: "alert-text"
    }, nochNichtBestellt.length, " Artikel unter Mindestbestand ohne laufende Bestellung"), /*#__PURE__*/React.createElement("button", {
      className: "btn btn-primary btn-sm",
      onClick: bestellenAlle
    }, "Alle bestellen"));
  })(), /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "card-title"
  }, "\uD83D\uDCCB Bestellvorschlag (Ampel-optimiert)")), /*#__PURE__*/React.createElement("div", {
    className: "tbl-scroll"
  }, /*#__PURE__*/React.createElement("table", {
    className: "tbl"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Artikel"), /*#__PURE__*/React.createElement("th", null, "Lieferant (Ampel)"), /*#__PURE__*/React.createElement("th", null, "Bestand"), /*#__PURE__*/React.createElement("th", null, "Mindest"), /*#__PURE__*/React.createElement("th", null, "Bestellmenge"), /*#__PURE__*/React.createElement("th", null, "Wert"))), /*#__PURE__*/React.createElement("tbody", null, vorschlaege.map(a => {
    const lief = getL(lieferanten, a.bestLieferantId);
    const ampel = getAmpelMap(a.id);
    const ampelStatus = ampel[a.bestLieferantId] || 'gray';
    const kat = PCM_KATALOG.find(k => k.artikelId === a.id && k.lieferantId === a.bestLieferantId);
    let menge = a.fehlmenge * 1.5;
    if (kat) {
      const bg = kat.gebinde.reduce((b, g) => g.ek / g.menge < b.ek / b.menge ? g : b, kat.gebinde[0]);
      menge = Math.ceil(a.fehlmenge / bg.menge) * bg.menge;
    }
    return /*#__PURE__*/React.createElement("tr", {
      key: a.id
    }, /*#__PURE__*/React.createElement("td", {
      style: {
        fontWeight: 800
      }
    }, a.name), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 6
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: `ampel-dot ${ampelStatus}`
    }), lief?.name || '—')), /*#__PURE__*/React.createElement("td", {
      className: "mono",
      style: {
        color: C.red
      }
    }, fmt(a.bestand, 1), " ", a.einheit), /*#__PURE__*/React.createElement("td", {
      className: "mono"
    }, fmt(a.mindestbestand, 0), " ", a.einheit), /*#__PURE__*/React.createElement("td", {
      className: "mono",
      style: {
        color: C.blue,
        fontWeight: 800
      }
    }, fmt(menge, 1), " ", a.einheit), /*#__PURE__*/React.createElement("td", {
      className: "mono"
    }, fmtE(menge * a.ek)));
  })))))), [['Offen', offen, 'yellow', '📤'], ['Bestellt', bestellt, 'blue', '🚚'], ['Geliefert', geliefert, 'green', '✅']].map(([label, list, color, icon]) => list.length > 0 && /*#__PURE__*/React.createElement("div", {
    key: label,
    className: "card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "card-title"
  }, icon, " ", label, " (", list.length, ")")), /*#__PURE__*/React.createElement("div", {
    className: "tbl-scroll"
  }, /*#__PURE__*/React.createElement("table", {
    className: "tbl"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Beleg-Nr."), /*#__PURE__*/React.createElement("th", null, "Datum"), /*#__PURE__*/React.createElement("th", null, "Lieferant"), /*#__PURE__*/React.createElement("th", null, "Pos."), /*#__PURE__*/React.createElement("th", null, "Wert"), /*#__PURE__*/React.createElement("th", null, "Status"), /*#__PURE__*/React.createElement("th", null, "Aktion"))), /*#__PURE__*/React.createElement("tbody", null, list.map(b => {
    const lief = getL(lieferanten, b.lieferantId);
    const wert = b.positionen.reduce((s, p) => s + p.menge * p.ek, 0);
    return /*#__PURE__*/React.createElement("tr", {
      key: b.id
    }, /*#__PURE__*/React.createElement("td", {
      style: {
        fontWeight: 800,
        color: C.blue
      }
    }, b.belegnr), /*#__PURE__*/React.createElement("td", null, b.datum), /*#__PURE__*/React.createElement("td", null, lief?.name), /*#__PURE__*/React.createElement("td", {
      className: "mono"
    }, b.positionen.length), /*#__PURE__*/React.createElement("td", {
      className: "mono"
    }, fmtE(wert)), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(Badge, {
      type: b.status === 'Offen' ? 'yellow' : b.status === 'Bestellt' ? 'blue' : 'green'
    }, b.status)), /*#__PURE__*/React.createElement("td", {
      style: {
        display: 'flex',
        gap: 4,
        flexWrap: 'wrap'
      }
    }, b.status === 'Offen' && /*#__PURE__*/React.createElement("button", {
      className: "btn btn-ghost btn-sm",
      onClick: () => setStatus(b.id, 'Bestellt')
    }, "Best\xE4tigen"), b.status === 'Bestellt' && /*#__PURE__*/React.createElement("button", {
      className: "btn btn-success btn-sm",
      onClick: () => {
        try {
          sessionStorage.setItem('menumetric-pendingWE', JSON.stringify(b));
        } catch {}
        setPage('wareneingang');
      }
    }, "\uD83D\uDCE5 Einbuchen"), /*#__PURE__*/React.createElement("button", {
      className: "btn btn-danger btn-sm",
      onClick: () => {
        if (!window.confirm('Bestellung ' + b.belegnr + ' löschen?')) return;
        setData(d => ({
          ...d,
          bestellungen: d.bestellungen.filter(x => x.id !== b.id)
        }));
        toast('Bestellung gelöscht', 'warn');
      }
    }, "\uD83D\uDDD1")));
  })))))), bestellungen.length === 0 && vorschlaege.length === 0 && /*#__PURE__*/React.createElement("div", {
    className: "empty"
  }, /*#__PURE__*/React.createElement("div", {
    className: "empty-icon"
  }, "\uD83D\uDCCB"), /*#__PURE__*/React.createElement("div", {
    className: "empty-title"
  }, "Keine Bestellungen vorhanden"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: C.textMid,
      marginTop: 6
    }
  }, "Bei Unterbestand erscheint hier ein Bestellvorschlag")), archivBest.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "card-title"
  }, "\uD83D\uDDC2 Archiv Bestellungen"), /*#__PURE__*/React.createElement(Badge, {
    type: "gray"
  }, archivBest.length)), /*#__PURE__*/React.createElement("div", {
    className: "tbl-scroll"
  }, /*#__PURE__*/React.createElement("table", {
    className: "tbl"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Beleg-Nr."), /*#__PURE__*/React.createElement("th", null, "Datum"), /*#__PURE__*/React.createElement("th", null, "Lieferant"), /*#__PURE__*/React.createElement("th", null, "Geliefert am"), /*#__PURE__*/React.createElement("th", null, "Pos."), /*#__PURE__*/React.createElement("th", null, "Wert"), /*#__PURE__*/React.createElement("th", null))), /*#__PURE__*/React.createElement("tbody", null, archivBest.slice(0, 20).map(b => {
    const lief = getL(lieferanten, b.lieferantId);
    const wert = b.positionen.reduce((s, p) => s + p.menge * p.ek, 0);
    return /*#__PURE__*/React.createElement("tr", {
      key: b.id,
      style: {
        opacity: 0.7
      }
    }, /*#__PURE__*/React.createElement("td", {
      style: {
        fontWeight: 700,
        color: C.textMid
      }
    }, b.belegnr), /*#__PURE__*/React.createElement("td", {
      style: {
        color: C.textMid
      }
    }, b.datum), /*#__PURE__*/React.createElement("td", {
      style: {
        color: C.textMid
      }
    }, b.lieferantName || lief?.name || '—'), /*#__PURE__*/React.createElement("td", {
      style: {
        color: C.green,
        fontWeight: 700
      }
    }, b.lieferdatum || '—'), /*#__PURE__*/React.createElement("td", {
      className: "mono"
    }, b.positionen.length), /*#__PURE__*/React.createElement("td", {
      className: "mono"
    }, fmtE(wert)), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("button", {
      className: "btn btn-ghost btn-sm",
      style: {
        minHeight: 28,
        padding: '0 8px',
        opacity: 0.6
      },
      onClick: () => {
        if (!window.confirm('Archiveintrag löschen?')) return;
        setData(d => ({
          ...d,
          archivBest: (d.archivBest || []).filter(x => x.id !== b.id)
        }));
        toast('Archiveintrag gelöscht', 'warn');
      }
    }, "\uD83D\uDDD1")));
  }))))));
}

// ── STAMMDATEN ────────────────────────────────────────────────────────────────
function Stammdaten({
  data,
  setData,
  toast
}) {
  const [tab, setTab] = useState('artikel');
  const {
    artikel,
    lieferanten
  } = data;
  const [artModal, setArtModal] = useState(false);
  const [liefModal, setLiefModal] = useState(false);
  const [artForm, setArtForm] = useState({
    name: '',
    einheit: 'kg',
    kategorie: 'Fleisch',
    lieferantId: '',
    mindestbestand: 5,
    ek: '',
    mwst: 7
  });
  const [liefForm, setLiefForm] = useState({
    name: '',
    kuerzel: '',
    kontakt: '',
    telefon: '',
    email: '',
    zahlungsziel: 14
  });
  const kategorien = ['Fleisch', 'Fisch', 'Gemüse', 'Obst', 'Molkerei', 'Wein', 'Getränke', 'Trocken', 'Gewürze', 'Sonstiges'];
  function saveArt() {
    if (!artForm.name.trim()) {
      toast('Bitte Artikelbezeichnung eingeben', 'warn');
      return;
    }
    if (!artForm.ek || Number(artForm.ek) <= 0) {
      toast('Bitte EK-Preis eingeben', 'warn');
      return;
    }
    const newArtikel = {
      id: Date.now(),
      name: artForm.name.trim(),
      einheit: artForm.einheit,
      kategorie: artForm.kategorie,
      lieferantId: artForm.lieferantId ? Number(artForm.lieferantId) : null,
      mindestbestand: Number(artForm.mindestbestand) || 0,
      ek: Number(artForm.ek),
      mwst: Number(artForm.mwst)
    };
    setData(d => ({
      ...d,
      artikel: [...d.artikel, newArtikel]
    }));
    setArtModal(false);
    setArtForm({
      name: '',
      einheit: 'kg',
      kategorie: 'Fleisch',
      lieferantId: '',
      mindestbestand: 5,
      ek: '',
      mwst: 7
    });
    toast(newArtikel.name + ' angelegt', 'success');
  }
  function saveLief() {
    if (!liefForm.name) return;
    setData(d => ({
      ...d,
      lieferanten: [...d.lieferanten, {
        ...liefForm,
        id: Date.now(),
        zahlungsziel: Number(liefForm.zahlungsziel)
      }]
    }));
    toast(`${liefForm.name} angelegt`, 'success');
    setLiefModal(false);
    setLiefForm({
      name: '',
      kuerzel: '',
      kontakt: '',
      telefon: '',
      email: '',
      zahlungsziel: 14
    });
  }
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "tabs"
  }, /*#__PURE__*/React.createElement("button", {
    className: `tab-btn${tab === 'artikel' ? ' active' : ''}`,
    onClick: () => setTab('artikel')
  }, "\uD83C\uDFF7 Artikel (", artikel.length, ")"), /*#__PURE__*/React.createElement("button", {
    className: `tab-btn${tab === 'lieferanten' ? ' active' : ''}`,
    onClick: () => setTab('lieferanten')
  }, "\uD83C\uDFE2 Lieferanten (", lieferanten.length, ")")), tab === 'artikel' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-lg",
    style: {
      marginBottom: 14,
      width: '100%'
    },
    onClick: () => setArtModal(true)
  }, "+ Artikel anlegen"), /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tbl-scroll"
  }, /*#__PURE__*/React.createElement("table", {
    className: "tbl"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Artikel"), /*#__PURE__*/React.createElement("th", null, "Kategorie"), /*#__PURE__*/React.createElement("th", null, "Einheit"), /*#__PURE__*/React.createElement("th", null, "EK"), /*#__PURE__*/React.createElement("th", null, "MwSt."), /*#__PURE__*/React.createElement("th", null, "Mindestbestand"), /*#__PURE__*/React.createElement("th", null))), /*#__PURE__*/React.createElement("tbody", null, artikel.map(a => /*#__PURE__*/React.createElement("tr", {
    key: a.id
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      fontWeight: 800
    }
  }, a.name), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(Badge, {
    type: "gray"
  }, a.kategorie)), /*#__PURE__*/React.createElement("td", {
    style: {
      color: C.textMid
    }
  }, a.einheit), /*#__PURE__*/React.createElement("td", {
    className: "mono"
  }, fmtE(a.ek)), /*#__PURE__*/React.createElement("td", {
    style: {
      color: C.textMid
    }
  }, a.mwst, "%"), /*#__PURE__*/React.createElement("td", {
    className: "mono"
  }, a.mindestbestand, " ", a.einheit), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-danger btn-sm",
    onClick: () => {
      if (window.confirm(`"${a.name}" löschen?`)) {
        setData(d => ({
          ...d,
          artikel: d.artikel.filter(x => x.id !== a.id)
        }));
        toast(a.name + ' gelöscht', 'warn');
      }
    }
  }, "\uD83D\uDDD1"))))))))), tab === 'lieferanten' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-lg",
    style: {
      marginBottom: 14,
      width: '100%'
    },
    onClick: () => setLiefModal(true)
  }, "+ Lieferant anlegen"), /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tbl-scroll"
  }, /*#__PURE__*/React.createElement("table", {
    className: "tbl"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Name"), /*#__PURE__*/React.createElement("th", null, "K\xFCrzel"), /*#__PURE__*/React.createElement("th", null, "Kontakt"), /*#__PURE__*/React.createElement("th", null, "E-Mail"), /*#__PURE__*/React.createElement("th", null, "Zahlungsziel"))), /*#__PURE__*/React.createElement("tbody", null, lieferanten.map(l => /*#__PURE__*/React.createElement("tr", {
    key: l.id
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      fontWeight: 800
    }
  }, l.name), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(Badge, {
    type: "blue"
  }, l.kuerzel)), /*#__PURE__*/React.createElement("td", {
    style: {
      color: C.textMid
    }
  }, l.kontakt), /*#__PURE__*/React.createElement("td", {
    style: {
      color: C.textMid
    }
  }, l.email), /*#__PURE__*/React.createElement("td", {
    className: "mono"
  }, l.zahlungsziel, " Tage")))))))), artModal && /*#__PURE__*/React.createElement(Modal, {
    title: "Artikel anlegen",
    onClose: () => setArtModal(false),
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
      className: "btn btn-primary btn-xl",
      onClick: saveArt
    }, "Speichern"), /*#__PURE__*/React.createElement("button", {
      className: "btn btn-ghost",
      style: {
        width: '100%'
      },
      onClick: () => setArtModal(false)
    }, "Abbrechen"))
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label req"
  }, "Bezeichnung"), /*#__PURE__*/React.createElement("input", {
    value: artForm.name,
    placeholder: "z.B. Rinderfilet",
    onChange: e => setArtForm(f => ({
      ...f,
      name: e.target.value
    }))
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Einheit"), /*#__PURE__*/React.createElement("select", {
    value: artForm.einheit,
    onChange: e => setArtForm(f => ({
      ...f,
      einheit: e.target.value
    }))
  }, ['kg', 'g', 'l', 'ml', 'Stk', 'Pkg', 'Fl', 'Kiste'].map(o => /*#__PURE__*/React.createElement("option", {
    key: o
  }, o)))), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Kategorie"), /*#__PURE__*/React.createElement("select", {
    value: artForm.kategorie,
    onChange: e => setArtForm(f => ({
      ...f,
      kategorie: e.target.value
    }))
  }, kategorien.map(k => /*#__PURE__*/React.createElement("option", {
    key: k
  }, k))))), /*#__PURE__*/React.createElement("div", {
    className: "form-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "EK-Preis (\u20AC)"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    min: "0",
    step: "0.01",
    value: artForm.ek,
    onChange: e => setArtForm(f => ({
      ...f,
      ek: e.target.value
    }))
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "MwSt."), /*#__PURE__*/React.createElement("select", {
    value: artForm.mwst,
    onChange: e => setArtForm(f => ({
      ...f,
      mwst: e.target.value
    }))
  }, /*#__PURE__*/React.createElement("option", {
    value: 7
  }, "7%"), /*#__PURE__*/React.createElement("option", {
    value: 19
  }, "19%")))), /*#__PURE__*/React.createElement("div", {
    className: "form-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Lieferant"), /*#__PURE__*/React.createElement("select", {
    value: artForm.lieferantId,
    onChange: e => setArtForm(f => ({
      ...f,
      lieferantId: e.target.value
    }))
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "\u2014 w\xE4hlen \u2014"), lieferanten.map(l => /*#__PURE__*/React.createElement("option", {
    key: l.id,
    value: l.id
  }, l.name)))), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Mindestbestand"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    min: "0",
    step: "0.5",
    value: artForm.mindestbestand,
    onChange: e => setArtForm(f => ({
      ...f,
      mindestbestand: e.target.value
    }))
  })))), liefModal && /*#__PURE__*/React.createElement(Modal, {
    title: "Lieferant anlegen",
    onClose: () => setLiefModal(false),
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
      className: "btn btn-primary btn-xl",
      onClick: saveLief
    }, "Speichern"), /*#__PURE__*/React.createElement("button", {
      className: "btn btn-ghost",
      style: {
        width: '100%'
      },
      onClick: () => setLiefModal(false)
    }, "Abbrechen"))
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label req"
  }, "Firmenname"), /*#__PURE__*/React.createElement("input", {
    value: liefForm.name,
    onChange: e => setLiefForm(f => ({
      ...f,
      name: e.target.value
    }))
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "K\xFCrzel"), /*#__PURE__*/React.createElement("input", {
    value: liefForm.kuerzel,
    onChange: e => setLiefForm(f => ({
      ...f,
      kuerzel: e.target.value
    }))
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Zahlungsziel (Tage)"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: liefForm.zahlungsziel,
    onChange: e => setLiefForm(f => ({
      ...f,
      zahlungsziel: e.target.value
    }))
  }))), /*#__PURE__*/React.createElement("div", {
    className: "form-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Kontakt"), /*#__PURE__*/React.createElement("input", {
    value: liefForm.kontakt,
    onChange: e => setLiefForm(f => ({
      ...f,
      kontakt: e.target.value
    }))
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Telefon"), /*#__PURE__*/React.createElement("input", {
    value: liefForm.telefon,
    onChange: e => setLiefForm(f => ({
      ...f,
      telefon: e.target.value
    }))
  }))), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "E-Mail"), /*#__PURE__*/React.createElement("input", {
    type: "email",
    value: liefForm.email,
    onChange: e => setLiefForm(f => ({
      ...f,
      email: e.target.value
    }))
  }))));
}
// ── PCM MODULE ────────────────────────────────────────────────────────────────
function usePCM() {
  const [pcmState, setPcmState] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('menumetric-pcm') || 'null');
    } catch {
      return null;
    }
  });
  const [syncing, setSyncing] = useState(false);
  const [lastSync, setLastSync] = useState(null);
  function connect(mandant, user) {
    setSyncing(true);
    return new Promise(res => {
      setTimeout(() => {
        const s = {
          mandant,
          user,
          connected: true,
          connectedAt: new Date().toISOString()
        };
        setPcmState(s);
        localStorage.setItem('menumetric-pcm', JSON.stringify(s));
        setLastSync(new Date());
        setSyncing(false);
        res(true);
      }, 2200);
    });
  }
  function disconnect() {
    setPcmState(null);
    localStorage.removeItem('menumetric-pcm');
  }
  function sync() {
    setSyncing(true);
    return new Promise(res => {
      setTimeout(() => {
        setSyncing(false);
        setLastSync(new Date());
        res();
      }, 1800);
    });
  }
  return {
    pcmState,
    syncing,
    lastSync,
    connect,
    disconnect,
    sync
  };
}
function AmpelTurm({
  status
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "ampel-tower"
  }, /*#__PURE__*/React.createElement("div", {
    className: `ampel-light ${status === 'red' ? 'on-red' : 'off'}`
  }), /*#__PURE__*/React.createElement("div", {
    className: `ampel-light ${status === 'yellow' ? 'on-yellow' : 'off'}`
  }), /*#__PURE__*/React.createElement("div", {
    className: `ampel-light ${status === 'green' ? 'on-green' : 'off'}`
  }));
}
function PCMLogin({
  pcmState,
  syncing,
  lastSync,
  connect,
  disconnect,
  sync,
  toast
}) {
  const [mandant, setMandant] = useState('');
  const [user, setUser] = useState('');
  const [pw, setPw] = useState('');
  const [loading, setLoading] = useState(false);
  async function handleLogin() {
    if (!mandant || !user || !pw) return;
    setLoading(true);
    await connect(mandant, user);
    setLoading(false);
    toast('PCM verbunden – Preislisten synchronisiert', 'success');
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 480,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "pcm-logo-bar"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 36
    }
  }, "\uD83D\uDD17"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 20,
      fontWeight: 900,
      color: '#B91C1C'
    }
  }, "PCM Procareline"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.textMid,
      fontWeight: 600
    }
  }, "eCare Einkaufsportal"))), pcmState?.connected ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "pcm-status connected"
  }, "\u2705 Verbunden \xB7 Mandant: ", pcmState.mandant, " \xB7 Benutzer: ", pcmState.user), lastSync && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.textMid,
      fontWeight: 600,
      marginBottom: 14
    }
  }, "Letzte Synchronisation: ", lastSync.toLocaleTimeString('de-DE')), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    style: {
      flex: 2
    },
    onClick: async () => {
      await sync();
      toast('Preislisten aktualisiert', 'success');
    },
    disabled: syncing
  }, syncing ? /*#__PURE__*/React.createElement("span", {
    className: "spin"
  }, "\u27F3") : '⟳', " Synchronisieren"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost",
    style: {
      flex: 1
    },
    onClick: () => {
      disconnect();
      toast('PCM getrennt', 'warn');
    }
  }, "Trennen")), /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "card-title"
  }, "\uD83D\uDCCA Sync-\xDCbersicht")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 16,
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: C.greenLight,
      borderRadius: 12,
      padding: 14,
      border: '1.5px solid #BBF7D0',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 24,
      fontWeight: 900,
      color: C.green,
      fontFamily: 'JetBrains Mono'
    }
  }, PCM_KATALOG.length), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 800,
      color: C.textMid,
      textTransform: 'uppercase',
      marginTop: 4
    }
  }, "Preispositionen")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: C.bgBlue,
      borderRadius: 12,
      padding: 14,
      border: `1.5px solid ${C.blueLight}`,
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 24,
      fontWeight: 900,
      color: C.blue,
      fontFamily: 'JetBrains Mono'
    }
  }, [...new Set(PCM_KATALOG.map(k => k.artikelId))].length), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 800,
      color: C.textMid,
      textTransform: 'uppercase',
      marginTop: 4
    }
  }, "Artikel")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: C.yellowLight,
      borderRadius: 12,
      padding: 14,
      border: '1.5px solid #FDE68A',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 24,
      fontWeight: 900,
      color: C.yellow,
      fontFamily: 'JetBrains Mono'
    }
  }, [...new Set(PCM_KATALOG.map(k => k.lieferantId))].length), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 800,
      color: C.textMid,
      textTransform: 'uppercase',
      marginTop: 4
    }
  }, "Lieferanten")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: C.bg,
      borderRadius: 12,
      padding: 14,
      border: `1.5px solid ${C.border}`,
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 24,
      fontWeight: 900,
      color: C.text,
      fontFamily: 'JetBrains Mono'
    }
  }, PCM_KATALOG.reduce((s, k) => s + k.gebinde.length, 0)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 800,
      color: C.textMid,
      textTransform: 'uppercase',
      marginTop: 4
    }
  }, "Gebinde"))))) : /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      padding: 20
    }
  }, loading || syncing ? /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      padding: '32px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "spin",
    style: {
      fontSize: 36,
      marginBottom: 16
    }
  }, "\u27F3"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 800,
      fontSize: 16,
      color: C.blue
    }
  }, "Verbindung wird hergestellt\u2026")) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "pcm-status disconnected"
  }, "\u26A0 Nicht verbunden"), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label req"
  }, "Mandant"), /*#__PURE__*/React.createElement("input", {
    placeholder: "z.B. 10042",
    value: mandant,
    onChange: e => setMandant(e.target.value)
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label req"
  }, "Benutzername"), /*#__PURE__*/React.createElement("input", {
    value: user,
    onChange: e => setUser(e.target.value)
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label req"
  }, "Passwort"), /*#__PURE__*/React.createElement("input", {
    type: "password",
    placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
    value: pw,
    onChange: e => setPw(e.target.value)
  })), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-xl",
    onClick: handleLogin,
    disabled: !mandant || !user || !pw
  }, "Mit PCM verbinden"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.textLight,
      textAlign: 'center'
    }
  }, "Verbindet mit procareline.com/eCare"))));
}
function Preisvergleich({
  data,
  setData,
  pcmState,
  toast
}) {
  const {
    artikel,
    lager,
    lieferanten
  } = data;
  const [warenkorb, setWarenkorb] = useState([]);
  const [showWK, setShowWK] = useState(false);
  const [search, setSearch] = useState('');
  const [filterAmpel, setFilterAmpel] = useState('alle');
  // Mengen-State: key = `${artikelId}-${lieferantId}-${gIdx}` -> Anzahl
  const [mengen, setMengen] = useState({});
  const katalogArtikel = [...new Set(PCM_KATALOG.map(k => k.artikelId))].map(aId => getA(artikel, aId)).filter(Boolean).filter(a => !search || a.name.toLowerCase().includes(search.toLowerCase()));
  function getMenge(aId, lId, gIdx) {
    return mengen[`${aId}-${lId}-${gIdx}`] || 1;
  }
  function setMenge(aId, lId, gIdx, val) {
    setMengen(m => ({
      ...m,
      [`${aId}-${lId}-${gIdx}`]: Math.max(1, Math.round(val))
    }));
  }
  function addToWarenkorb(artikelId, lieferantId, gebinde, anzahl) {
    const art = getA(artikel, artikelId);
    const k = PCM_KATALOG.find(x => x.artikelId === artikelId && x.lieferantId === lieferantId);
    const lief = getL(lieferanten, lieferantId);
    const key = `${artikelId}-${lieferantId}-${gebinde.label}`;
    const gesamtMenge = gebinde.menge * anzahl;
    const gesamtWert = gebinde.ek * anzahl;
    setWarenkorb(wk => {
      const ex = wk.findIndex(w => w.key === key);
      if (ex >= 0) {
        return wk.map((w, i) => i === ex ? {
          ...w,
          anzahl: w.anzahl + anzahl,
          gesamtMenge: w.gesamtMenge + gesamtMenge,
          gesamtWert: w.gesamtWert + gesamtWert
        } : w);
      }
      return [...wk, {
        key,
        artikelId,
        lieferantId,
        artikelName: art.name,
        artikelEinheit: art.einheit,
        lieferantName: k?.lieferantName || lief?.name || '',
        lieferantEmail: lief?.email || '',
        lieferantTelefon: lief?.telefon || '',
        pcmArtNr: k?.pcmArtNr || null,
        gebinde,
        anzahl,
        gesamtMenge,
        // Gebinde-Anzahl × Gebinde-Menge = effektive Menge
        gesamtWert,
        // Gebinde-Anzahl × Gebinde-EK
        stueckpreis: gebinde.ek / gebinde.menge
      }];
    });
    toast(`${anzahl}× ${art.name} (${gebinde.label}) in Warenkorb`, 'success');
  }

  // FIX: Bestellung mit vollständigen Lieferantendaten + Positionsdetails
  // so dass WE automatisch vorbefüllt werden kann
  function bestellungAbschicken() {
    const byLief = {};
    warenkorb.forEach(w => {
      const lid = w.lieferantId;
      if (!byLief[lid]) byLief[lid] = {
        lieferantId: lid,
        lieferantName: w.lieferantName,
        lieferantEmail: w.lieferantEmail,
        lieferantTelefon: w.lieferantTelefon,
        positionen: []
      };
      byLief[lid].positionen.push({
        artikelId: w.artikelId,
        artikelName: w.artikelName,
        gebindeLabel: w.gebinde.label,
        gebindeMenge: w.gebinde.menge,
        anzahlGebinde: w.anzahl,
        menge: w.gesamtMenge,
        // effektive Gesamtmenge
        ek: w.stueckpreis,
        // normierter Stückpreis für WE
        pcmArtNr: w.pcmArtNr,
        einheit: w.artikelEinheit
      });
    });
    const newBest = Object.values(byLief).map(lief => ({
      id: Date.now() + Math.random(),
      lieferantId: lief.lieferantId,
      lieferantName: lief.lieferantName,
      // direkt gespeichert
      lieferantEmail: lief.lieferantEmail,
      lieferantTelefon: lief.lieferantTelefon,
      datum: todayStr(),
      status: 'Offen',
      quelle: 'PCM',
      belegnr: `PCM-${Math.random().toString(36).slice(2, 7).toUpperCase()}`,
      positionen: lief.positionen
    }));
    setData(d => ({
      ...d,
      bestellungen: [...newBest, ...d.bestellungen]
    }));
    setWarenkorb([]);
    setShowWK(false);
    toast(`${newBest.length} PCM-Bestellung(en) angelegt – WE kann direkt eingebucht werden`, 'success');
  }
  function updateWKAnzahl(key, delta) {
    setWarenkorb(wk => wk.map(w => {
      if (w.key !== key) return w;
      const newAnz = Math.max(1, w.anzahl + delta);
      return {
        ...w,
        anzahl: newAnz,
        gesamtMenge: w.gebinde.menge * newAnz,
        gesamtWert: w.gebinde.ek * newAnz
      };
    }));
  }
  const wkGesamt = warenkorb.reduce((s, w) => s + w.gesamtWert, 0);
  const wkPositionen = warenkorb.reduce((s, w) => s + w.gesamtMenge, 0);
  return /*#__PURE__*/React.createElement("div", null, !pcmState?.connected && /*#__PURE__*/React.createElement("div", {
    className: "alert warn"
  }, /*#__PURE__*/React.createElement("span", {
    className: "alert-icon"
  }, "\u26A0"), /*#__PURE__*/React.createElement("div", {
    className: "alert-text"
  }, "PCM nicht verbunden \u2013 Demo-Preise aktiv.")), /*#__PURE__*/React.createElement("div", {
    className: "legend"
  }, /*#__PURE__*/React.createElement("div", {
    className: "legend-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ampel-dot green"
  }), "G\xFCnstigster \u2013 bevorzugt"), /*#__PURE__*/React.createElement("div", {
    className: "legend-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ampel-dot yellow"
  }), "Mittlerer \u2013 bestellbar"), /*#__PURE__*/React.createElement("div", {
    className: "legend-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ampel-dot red"
  }), "Teuerster \u2013 gesperrt")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      marginBottom: 16,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "search-wrap",
    style: {
      flex: 1,
      minWidth: 180
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "search-icon"
  }, "\uD83D\uDD0D"), /*#__PURE__*/React.createElement("input", {
    placeholder: "Artikel suchen\u2026",
    value: search,
    onChange: e => setSearch(e.target.value)
  })), /*#__PURE__*/React.createElement("div", {
    className: "tabs",
    style: {
      margin: 0
    }
  }, [['alle', 'Alle'], ['green', '🟢'], ['yellow', '🟡'], ['red', '🔴']].map(([v, l]) => /*#__PURE__*/React.createElement("button", {
    key: v,
    className: `tab-btn${filterAmpel === v ? ' active' : ''}`,
    onClick: () => setFilterAmpel(v)
  }, l)))), katalogArtikel.map(art => {
    const ampelMap = getAmpelMap(art.id);
    const anbieter = PCM_KATALOG.filter(k => k.artikelId === art.id);
    const filtered = filterAmpel === 'alle' ? anbieter : anbieter.filter(a => ampelMap[a.lieferantId] === filterAmpel);
    if (filtered.length === 0) return null;
    const bestand = getLB(lager, art.id);
    return /*#__PURE__*/React.createElement("div", {
      key: art.id,
      className: "pv-card"
    }, /*#__PURE__*/React.createElement("div", {
      className: "pv-header"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 16,
        fontWeight: 900
      }
    }, art.name), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 12,
        marginTop: 4,
        flexWrap: 'wrap',
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: C.textMid,
        fontWeight: 600
      }
    }, "Einheit: ", art.einheit, " \xB7 Bestand: ", fmt(bestand, 1), " \xB7 Mindest: ", art.mindestbestand), bestand < art.mindestbestand && /*#__PURE__*/React.createElement(Badge, {
      type: "red"
    }, "\u26A0 Unterbestand")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 8,
        marginTop: 8,
        flexWrap: 'wrap'
      }
    }, anbieter.map(a => /*#__PURE__*/React.createElement("div", {
      key: a.lieferantId,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 5
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: `ampel-dot ${ampelMap[a.lieferantId] || 'gray'}`
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        fontWeight: 700,
        color: C.textMid
      }
    }, a.lieferantName))))), filtered.map(a => {
      const status = ampelMap[a.lieferantId] || 'gray';
      const isLocked = status === 'red';
      return /*#__PURE__*/React.createElement("div", {
        key: a.lieferantId,
        className: `pv-lief-row ${status}-row`
      }, /*#__PURE__*/React.createElement("div", {
        className: "pv-lief-info"
      }, /*#__PURE__*/React.createElement("div", {
        className: "pv-lief-name"
      }, /*#__PURE__*/React.createElement(AmpelTurm, {
        status: status
      }), a.lieferantName, a.pcmArtNr && /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 11,
          color: C.textLight
        }
      }, "Art-Nr: ", a.pcmArtNr), status === 'green' && /*#__PURE__*/React.createElement(Badge, {
        type: "green"
      }, "BEST PREIS"), isLocked && /*#__PURE__*/React.createElement(Badge, {
        type: "red"
      }, "\uD83D\uDD12 GESPERRT")), /*#__PURE__*/React.createElement("div", {
        className: "pv-gebinde-list"
      }, a.gebinde.map((g, gIdx) => {
        const mkey = `${art.id}-${a.lieferantId}-${gIdx}`;
        const anzahl = getMenge(art.id, a.lieferantId, gIdx);
        const gesamtpreis = g.ek * anzahl;
        return /*#__PURE__*/React.createElement("div", {
          key: gIdx,
          className: `pv-gebinde-item${isLocked ? ' disabled' : ''}`,
          style: {
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 8
          }
        }, /*#__PURE__*/React.createElement("div", {
          style: {
            fontSize: 14,
            flexShrink: 0
          }
        }, isLocked ? '🔒' : '📦'), /*#__PURE__*/React.createElement("div", {
          style: {
            flex: '1 1 120px',
            minWidth: 0
          }
        }, /*#__PURE__*/React.createElement("div", {
          style: {
            fontSize: 13,
            fontWeight: 700
          }
        }, g.label), /*#__PURE__*/React.createElement("div", {
          style: {
            fontSize: 11,
            color: C.textLight
          }
        }, fmtE(g.ek / g.menge), "/", g.einheit)), /*#__PURE__*/React.createElement("div", {
          style: {
            fontFamily: 'JetBrains Mono',
            fontSize: 13,
            fontWeight: 700,
            color: C.blue,
            textAlign: 'right',
            flexShrink: 0
          }
        }, fmtE(g.ek), anzahl > 1 && /*#__PURE__*/React.createElement("div", {
          style: {
            fontSize: 11,
            color: C.textMid
          }
        }, "\xD7 ", anzahl, " = ", fmtE(gesamtpreis))), !isLocked && /*#__PURE__*/React.createElement("div", {
          style: {
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            flexShrink: 0
          }
        }, /*#__PURE__*/React.createElement("button", {
          style: {
            width: 32,
            height: 32,
            background: C.bg,
            border: `1.5px solid ${C.border}`,
            borderRadius: 8,
            fontSize: 18,
            fontWeight: 700,
            cursor: 'pointer',
            color: C.blue,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          },
          onClick: () => setMenge(art.id, a.lieferantId, gIdx, anzahl - 1)
        }, "\u2212"), /*#__PURE__*/React.createElement("div", {
          style: {
            minWidth: 32,
            textAlign: 'center',
            fontFamily: 'JetBrains Mono',
            fontSize: 14,
            fontWeight: 800
          }
        }, anzahl), /*#__PURE__*/React.createElement("button", {
          style: {
            width: 32,
            height: 32,
            background: C.bg,
            border: `1.5px solid ${C.border}`,
            borderRadius: 8,
            fontSize: 18,
            fontWeight: 700,
            cursor: 'pointer',
            color: C.blue,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          },
          onClick: () => setMenge(art.id, a.lieferantId, gIdx, anzahl + 1)
        }, "+"), /*#__PURE__*/React.createElement("button", {
          className: "btn btn-primary btn-sm",
          style: {
            minHeight: 32,
            padding: '0 10px',
            fontSize: 12,
            marginLeft: 4
          },
          onClick: () => addToWarenkorb(art.id, a.lieferantId, g, anzahl)
        }, "In Warenkorb")));
      }))), /*#__PURE__*/React.createElement("div", {
        className: "pv-ampel-col"
      }, /*#__PURE__*/React.createElement(AmpelTurm, {
        status: status
      }), isLocked && /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 9,
          fontWeight: 800,
          color: C.red,
          textAlign: 'center'
        }
      }, "GESPERRT"), status === 'green' && /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 9,
          fontWeight: 800,
          color: C.green,
          textAlign: 'center'
        }
      }, "BEST")));
    }));
  }), warenkorb.length > 0 && /*#__PURE__*/React.createElement("button", {
    className: "wk-fab",
    onClick: () => setShowWK(true)
  }, "\uD83D\uDED2", /*#__PURE__*/React.createElement("span", {
    className: "wk-count"
  }, warenkorb.length)), showWK && /*#__PURE__*/React.createElement(Modal, {
    title: `🛒 Warenkorb (${warenkorb.length} Pos.)`,
    onClose: () => setShowWK(false),
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      style: {
        background: C.bg,
        borderRadius: 12,
        padding: '12px 14px',
        marginBottom: 8
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        fontWeight: 800,
        fontSize: 15,
        marginBottom: 4
      }
    }, /*#__PURE__*/React.createElement("span", null, "Gesamtwert:"), /*#__PURE__*/React.createElement("span", {
      style: {
        color: C.blue,
        fontFamily: 'JetBrains Mono'
      }
    }, fmtE(wkGesamt))), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: C.textMid,
        fontWeight: 600
      }
    }, [...new Set(warenkorb.map(w => w.lieferantName))].length, " Lieferant(en) \xB7 Wird direkt als Bestellung angelegt")), /*#__PURE__*/React.createElement("button", {
      className: "btn btn-primary btn-xl",
      onClick: bestellungAbschicken
    }, "\uD83D\uDCCB Bestellung", [...new Set(warenkorb.map(w => w.lieferantId))].length > 1 ? 'en' : '+', " anlegen & WE vorbereiten"), /*#__PURE__*/React.createElement("button", {
      className: "btn btn-ghost",
      style: {
        width: '100%'
      },
      onClick: () => setShowWK(false)
    }, "Weiter einkaufen"))
  }, warenkorb.map(w => /*#__PURE__*/React.createElement("div", {
    key: w.key,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '12px 0',
      borderBottom: `1px solid ${C.border}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 800,
      fontSize: 14
    }
  }, w.artikelName), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.textMid,
      fontWeight: 600
    }
  }, w.lieferantName, " \xB7 ", w.gebinde.label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.textMid
    }
  }, "Effektiv: ", fmt(w.gesamtMenge, 2), " ", w.artikelEinheit, " \xB7 ", fmtE(w.stueckpreis), "/", w.artikelEinheit)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("button", {
    style: {
      width: 28,
      height: 28,
      background: C.bg,
      border: `1.5px solid ${C.border}`,
      borderRadius: 6,
      fontSize: 16,
      fontWeight: 700,
      cursor: 'pointer',
      color: C.blue,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    onClick: () => updateWKAnzahl(w.key, -1)
  }, "\u2212"), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 28,
      textAlign: 'center',
      fontFamily: 'JetBrains Mono',
      fontSize: 14,
      fontWeight: 800
    }
  }, w.anzahl), /*#__PURE__*/React.createElement("button", {
    style: {
      width: 28,
      height: 28,
      background: C.bg,
      border: `1.5px solid ${C.border}`,
      borderRadius: 6,
      fontSize: 16,
      fontWeight: 700,
      cursor: 'pointer',
      color: C.blue,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    onClick: () => updateWKAnzahl(w.key, 1)
  }, "+")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'JetBrains Mono',
      fontWeight: 800,
      color: C.blue,
      fontSize: 14,
      minWidth: 70,
      textAlign: 'right'
    }
  }, fmtE(w.gesamtWert)), /*#__PURE__*/React.createElement("button", {
    className: "pos-remove",
    onClick: () => setWarenkorb(wk => wk.filter(x => x.key !== w.key))
  }, "\u2715")))));
}
function PCMModule({
  data,
  setData,
  toast
}) {
  const pcm = usePCM();
  const [tab, setTab] = useState('preise');
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "tabs"
  }, /*#__PURE__*/React.createElement("button", {
    className: `tab-btn${tab === 'preise' ? ' active' : ''}`,
    onClick: () => setTab('preise')
  }, "\uD83D\uDCB9 Preisvergleich & Ampel"), /*#__PURE__*/React.createElement("button", {
    className: `tab-btn${tab === 'verbindung' ? ' active' : ''}`,
    onClick: () => setTab('verbindung')
  }, "\uD83D\uDD17 PCM ", pcm.pcmState?.connected ? '🟢' : '🔴')), tab === 'verbindung' && /*#__PURE__*/React.createElement(PCMLogin, _extends({}, pcm, {
    toast: toast
  })), tab === 'preise' && /*#__PURE__*/React.createElement(Preisvergleich, {
    data: data,
    setData: setData,
    pcmState: pcm.pcmState,
    toast: toast
  }));
}

// ── NAV + APP ─────────────────────────────────────────────────────────────────
const PAGES = [{
  id: 'dashboard',
  label: 'Übersicht',
  icon: '🏠'
}, {
  id: 'lager',
  label: 'Lager',
  icon: '📦'
}, {
  id: 'wareneingang',
  label: 'Eingang',
  icon: '🚚'
}, {
  id: 'rezepturen',
  label: 'Produktion',
  icon: '👨‍🍳'
}, {
  id: 'bestellungen',
  label: 'Bestellen',
  icon: '📋'
}, {
  id: 'inventur',
  label: 'Inventur',
  icon: '🔢'
}, {
  id: 'stammdaten',
  label: 'Stammdaten',
  icon: '🗂'
}, {
  id: 'pcm',
  label: 'PCM',
  icon: '🔗'
}];
function App() {
  const [data, setData] = useState(() => {
    try {
      const s = localStorage.getItem('menumetric-v1');
      if (s) {
        const parsed = JSON.parse(s);
        // Archiv-Felder nachrüsten falls alte Datenbasis
        return {
          ...INIT,
          ...parsed,
          archivWE: parsed.archivWE || [],
          archivBest: parsed.archivBest || []
        };
      }
      return INIT;
    } catch {
      return INIT;
    }
  });
  const [page, setPage] = useState('dashboard');
  const {
    toasts,
    add: addToast
  } = useToast();
  useEffect(() => {
    try {
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - 90);
      const cutoffStr = cutoff.toISOString().slice(0, 10);
      const trimmedData = {
        ...data,
        verbrauch: data.verbrauch.filter(v => v.datum >= cutoffStr),
        archivWE: (data.archivWE || []).slice(0, 200),
        archivBest: (data.archivBest || []).slice(0, 200)
      };
      localStorage.setItem('menumetric-v1', JSON.stringify(trimmedData));
    } catch {}
  }, [data]);
  const unterMindest = data.artikel.filter(a => getLB(data.lager, a.id) < a.mindestbestand).length;
  const mhdAlarm = data.lager.filter(l => daysDiff(l.mhd) <= 3 && daysDiff(l.mhd) >= 0).length;
  const offeneBest = data.bestellungen.filter(b => b.status === 'Offen' || b.status === 'Bestellt').length;
  const currentPage = PAGES.find(p => p.id === page);
  const sp = {
    data,
    setData,
    toast: addToast,
    setPage
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, css), /*#__PURE__*/React.createElement(ToastContainer, {
    toasts: toasts
  }), /*#__PURE__*/React.createElement("div", {
    className: "app"
  }, /*#__PURE__*/React.createElement("div", {
    className: "topbar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "topbar-logo"
  }, "\uD83D\uDCCA MenuMetric", /*#__PURE__*/React.createElement("span", {
    className: "sub"
  }, "Gro\xDFk\xFCche")), /*#__PURE__*/React.createElement("div", {
    className: "topbar-badges"
  }, mhdAlarm > 0 && /*#__PURE__*/React.createElement("div", {
    className: "topbar-badge red"
  }, "\uD83D\uDEA8 ", mhdAlarm), unterMindest > 0 && /*#__PURE__*/React.createElement("div", {
    className: "topbar-badge yellow"
  }, "\uD83D\uDCE6 ", unterMindest)), /*#__PURE__*/React.createElement("div", {
    className: "topbar-time"
  }, /*#__PURE__*/React.createElement(Clock, null))), /*#__PURE__*/React.createElement("div", {
    className: "page-bar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-bar-inner"
  }, currentPage?.icon, " ", currentPage?.label)), /*#__PURE__*/React.createElement("div", {
    className: "content"
  }, page === 'dashboard' && /*#__PURE__*/React.createElement(Dashboard, sp), page === 'lager' && /*#__PURE__*/React.createElement(Lager, sp), page === 'wareneingang' && /*#__PURE__*/React.createElement(Wareneingang, sp), page === 'rezepturen' && /*#__PURE__*/React.createElement(Rezepturen, sp), page === 'bestellungen' && /*#__PURE__*/React.createElement(Bestellungen, sp), page === 'inventur' && /*#__PURE__*/React.createElement(Inventur, sp), page === 'stammdaten' && /*#__PURE__*/React.createElement(Stammdaten, sp), page === 'pcm' && /*#__PURE__*/React.createElement(PCMModule, {
    data: data,
    setData: setData,
    toast: addToast
  })), /*#__PURE__*/React.createElement("nav", {
    className: "bottom-nav"
  }, PAGES.map(p => /*#__PURE__*/React.createElement("button", {
    key: p.id,
    className: `bn-item${page === p.id ? ' active' : ''}`,
    onClick: () => setPage(p.id)
  }, p.id === 'lager' && mhdAlarm > 0 && /*#__PURE__*/React.createElement("span", {
    className: "bn-badge"
  }, mhdAlarm), p.id === 'bestellungen' && (unterMindest > 0 || offeneBest > 0) && /*#__PURE__*/React.createElement("span", {
    className: "bn-badge",
    style: {
      background: offeneBest > 0 ? C.blue : C.orange
    }
  }, offeneBest || unterMindest), /*#__PURE__*/React.createElement("span", {
    className: "bn-icon"
  }, p.icon), p.label)))));
}
ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));