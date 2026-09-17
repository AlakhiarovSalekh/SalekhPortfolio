type VisualKind =
  | "pos" | "sticky" | "reader" | "rooms" | "portfolio" | "notes"
  | "food" | "hotel" | "calculator" | "c-code" | "structures" | "banking"
  | "expense" | "bluetooth" | "habits" | "weather" | "inventory" | "atm"
  | "marks" | "parking" | "todos" | "web50" | "dice" | "code";

function kindFor(title: string, slug: string, category: string): VisualKind {
  const v = `${title} ${slug} ${category}`.toLowerCase();
  if (v.includes("salekhpos") || v.includes("point of sale")) return "pos";
  if (v.includes("sticky")) return "sticky";
  if (v.includes("lector") || v.includes("document reader")) return "reader";
  if (v.includes("room booking")) return "rooms";
  if (v.includes("portfolio")) return "portfolio";
  if (v.includes("notes app")) return "notes";
  if (v.includes("food ordering")) return "food";
  if (v.includes("hotel")) return "hotel";
  if (v.includes("calculator")) return "calculator";
  if (v.includes("c programming")) return "c-code";
  if (v.includes("data structures") || v.includes("c++ projects")) return "structures";
  if (v.includes("expense")) return "expense";
  if (v.includes("bluetooth")) return "bluetooth";
  if (v.includes("habit")) return "habits";
  if (v.includes("weather")) return "weather";
  if (v.includes("inventory")) return "inventory";
  if (v.includes("atm")) return "atm";
  if (v.includes("marks")) return "marks";
  if (v.includes("parking")) return "parking";
  if (v.includes("todo")) return "todos";
  if (v.includes("50 html") || v.includes("50-project")) return "web50";
  if (v.includes("dice")) return "dice";
  if (v.includes("banking") || v.includes("bank")) return "banking";
  return "code";
}

const accentByKind: Record<VisualKind, string> = {
  pos:"#38bdf8", sticky:"#f4c95d", reader:"#60a5fa", rooms:"#5eead4",
  portfolio:"#73b4ff", notes:"#a78bfa", food:"#fb923c", hotel:"#2dd4bf",
  calculator:"#3b82f6", "c-code":"#22d3ee", structures:"#818cf8", banking:"#34d399",
  expense:"#f59e0b", bluetooth:"#60a5fa", habits:"#4ade80", weather:"#67e8f9",
  inventory:"#22d3ee", atm:"#3b82f6", marks:"#c084fc", parking:"#2dd4bf",
  todos:"#60a5fa", web50:"#f472b6", dice:"#8b5cf6", code:"#60a5fa"
};

function Window({ accent, children }: { accent: string; children: React.ReactNode }) {
  return <g>
    <rect x="105" y="78" width="590" height="316" rx="28" fill="#071521" stroke={`${accent}66`} strokeWidth="2"/>
    <rect x="129" y="102" width="542" height="36" rx="11" fill="#0d2234"/>
    <circle cx="151" cy="120" r="5" fill="#ff6b67"/><circle cx="169" cy="120" r="5" fill="#ffca55"/><circle cx="187" cy="120" r="5" fill="#5cda74"/>
    {children}
  </g>;
}

function Scene({ kind, accent }: { kind: VisualKind; accent: string }) {
  const soft = `${accent}24`;
  const line = `${accent}72`;
  const bar = (x:number,y:number,w:number,active=false)=><rect x={x} y={y} width={w} height="12" rx="6" fill={active?accent:"#8ea5bb"} opacity={active?.78:.42}/>;

  switch (kind) {
    case "pos": return <Window accent={accent}>
      <rect x="153" y="164" width="136" height="194" rx="15" fill="#0b2032"/>
      {[0,1,2,3].map(n=><rect key={n} x="172" y={185+n*39} width="98" height="24" rx="7" fill={n===0?soft:"#15324b"}/>)}
      <rect x="316" y="164" width="325" height="86" rx="15" fill="#0b2032"/>
      {bar(340,194,168,true)}{bar(340,220,246)}
      <rect x="316" y="270" width="151" height="88" rx="15" fill="#0b2032"/><rect x="490" y="270" width="151" height="88" rx="15" fill="#0b2032"/>
      <circle cx="391" cy="314" r="26" fill={soft} stroke={line}/><path d="M514 333l27-32 23 18 39-45" fill="none" stroke={accent} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"/>
    </Window>;
    case "sticky": return <Window accent={accent}>
      <g transform="rotate(-4 270 250)"><rect x="185" y="168" width="174" height="154" rx="12" fill="#d8b74d"/><path d="M212 205h118M212 232h90M212 259h106" stroke="#6c591f" strokeWidth="8" strokeLinecap="round" opacity=".55"/></g>
      <g transform="rotate(5 480 250)"><rect x="389" y="164" width="166" height="148" rx="12" fill="#76a9ea"/><path d="M416 201h111M416 228h88M416 255h104" stroke="#315f97" strokeWidth="8" strokeLinecap="round" opacity=".55"/></g>
      <rect x="503" y="278" width="112" height="72" rx="11" fill="#d879a2" transform="rotate(-7 559 314)"/>
    </Window>;
    case "reader": return <g>
      <rect x="226" y="58" width="222" height="350" rx="34" fill="#071521" stroke={line} strokeWidth="2"/>
      <rect x="244" y="88" width="186" height="281" rx="18" fill="#0b1b2b"/>
      {[0,1,2,3,4,5].map(n=>bar(273,139+n*37,n%2?105:126,n===3))}
      <rect x="505" y="115" width="112" height="212" rx="13" fill="#0b1b2b" stroke={line}/>
      {[0,1,2,3].map(n=>bar(526,154+n*39,n%2?61:70,false))}
    </g>;
    case "rooms": return <Window accent={accent}>
      <rect x="151" y="165" width="170" height="191" rx="15" fill="#0b2032"/>
      {[0,1,2].map(r=>[0,1,2].map(c=><rect key={`${r}-${c}`} x={171+c*45} y={199+r*45} width="31" height="29" rx="7" fill={(r+c)%3===0?accent:"#173751"} opacity={(r+c)%3===0?.78:1}/>))}
      {[0,1].map(r=>[0,1].map(c=><rect key={`${r}-${c}`} x={352+c*145} y={165+r*96} width="121" height="72" rx="14" fill={r===1&&c===0?soft:"#0b2032"} stroke={r===1&&c===0?line:"transparent"}/>))}
    </Window>;
    case "portfolio": return <Window accent={accent}>
      <circle cx="270" cy="251" r="76" fill={soft} stroke={line}/>
      <circle cx="270" cy="224" r="25" fill={accent} opacity=".8"/><path d="M225 294c20-50 70-50 90 0" fill="none" stroke={accent} strokeWidth="13" strokeLinecap="round"/>
      {bar(396,196,203)}{bar(396,226,156)}{bar(396,282,98,true)}{bar(509,282,87,true)}
    </Window>;
    case "notes": return <Window accent={accent}>
      <rect x="151" y="163" width="132" height="196" rx="15" fill="#0b2032"/>
      {[0,1,2,3].map(n=>bar(173,190+n*39,n===0?82:67,n===0))}
      <rect x="310" y="163" width="331" height="196" rx="15" fill="#0a1b2b"/>
      {[0,1,2,3,4].map(n=>bar(341,190+n*32,n%2?203:245,n===2))}
    </Window>;
    case "food": return <Window accent={accent}>
      {[0,1,2].map(n=><g key={n}><rect x={151+n*163} y="169" width="142" height="167" rx="16" fill="#0b2032"/><circle cx={222+n*163} cy="217" r="31" fill={n===0?"#f3a23b":n===1?"#e65d51":"#62b26d"} opacity=".88"/>{bar(174+n*163,273,94)}{bar(181+n*163,298,80)}</g>)}
      <rect x="592" y="169" width="48" height="167" rx="15" fill={soft}/>
    </Window>;
    case "hotel": return <Window accent={accent}>
      <rect x="151" y="164" width="230" height="188" rx="15" fill="#0b2032"/><rect x="166" y="179" width="200" height="78" rx="11" fill={soft}/>
      {bar(172,289,165)}{bar(172,315,108)}
      <rect x="410" y="164" width="231" height="73" rx="15" fill="#0b2032"/>{bar(435,191,83)}{bar(435,214,158)}
      <rect x="410" y="258" width="231" height="94" rx="15" fill="#0b2032"/>
      {[0,1,2,3].map(n=><rect key={n} x={433+n*47} y="283" width="33" height="28" rx="7" fill={n===2?accent:"#183752"} opacity={n===2?.8:1}/>)}
    </Window>;
    case "calculator": return <g>
      <rect x="258" y="57" width="284" height="358" rx="34" fill="#071521" stroke={line}/>
      <rect x="285" y="88" width="230" height="78" rx="15" fill="#0b2032"/><text x="493" y="140" textAnchor="end" fill="#eef6ff" fontSize="34" fontWeight="700">4,050</text>
      {[0,1,2,3,4].map(r=>[0,1,2,3].map(c=><rect key={`${r}-${c}`} x={285+c*57} y={186+r*40} width="48" height="31" rx="9" fill={c===3?accent:"#102a40"} opacity={c===3?.82:1}/>))}
    </g>;
    case "c-code": return <Window accent={accent}>
      <text x="164" y="190" fill={accent} fontSize="22" fontFamily="monospace">#include &lt;stdio.h&gt;</text>
      <text x="164" y="232" fill="#9db2c6" fontSize="21" fontFamily="monospace">int main(void) {'{'}</text>
      <text x="194" y="274" fill="#9db2c6" fontSize="21" fontFamily="monospace">printf("Hello");</text>
      <text x="164" y="316" fill="#9db2c6" fontSize="21" fontFamily="monospace">{'}'}</text>
    </Window>;
    case "structures": return <Window accent={accent}>
      <path d="M400 178L260 258M400 178l140 80M260 258l-72 68M260 258l76 68M540 258l-76 68M540 258l72 68" stroke={line} strokeWidth="5"/>
      {[[400,178],[260,258],[540,258],[188,326],[336,326],[464,326],[612,326]].map(([x,y],i)=><g key={i}><circle cx={x} cy={y} r={i===0?31:25} fill={i===0?accent:"#0f2b43"} stroke={line}/><text x={x} y={y+6} textAnchor="middle" fill="#eff7ff" fontSize="17" fontWeight="700">{i+1}</text></g>)}
    </Window>;
    case "banking": return <Window accent={accent}>
      <rect x="151" y="164" width="238" height="88" rx="17" fill={soft} stroke={line}/><text x="175" y="194" fill="#96acc0" fontSize="14">BALANCE</text><text x="175" y="231" fill="#f5faff" fontSize="31" fontWeight="700">$24,680</text>
      <rect x="414" y="164" width="227" height="88" rx="17" fill="#0b2032"/><path d="M438 229l31-24 29 9 35-34 34 19 48-42" fill="none" stroke={accent} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"/>
      {[0,1].map(n=><g key={n}>{bar(175,292+n*38,214)}{bar(506,292+n*38,95,n===0)}</g>)}
    </Window>;
    case "expense": return <Window accent={accent}>
      <circle cx="282" cy="255" r="82" fill="none" stroke="#18344d" strokeWidth="27"/><path d="M282 173a82 82 0 0 1 70 124" fill="none" stroke={accent} strokeWidth="27" strokeLinecap="round"/>
      <text x="282" y="252" textAnchor="middle" fill="#91a8bd" fontSize="14">SPENT</text><text x="282" y="281" textAnchor="middle" fill="#fff" fontSize="26" fontWeight="700">$1,284</text>
      {[0,1,2,3].map(n=><rect key={n} x={439+n*49} y={319-n*29} width="30" height={34+n*29} rx="8" fill={n===3?accent:"#173650"}/>)}
    </Window>;
    case "bluetooth": return <g>
      <rect x="178" y="66" width="190" height="342" rx="32" fill="#071521" stroke={line}/><rect x="432" y="66" width="190" height="342" rx="32" fill="#071521" stroke={line}/>
      <path d="M273 131v98l55-47-55-47v98l55-47-55-55" fill="none" stroke={accent} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
      {[0,1,2].map(n=>bar(468,161+n*54,n%2?83:117,n===1))}<path d="M387 190c26-22 52-22 78 0M387 240c26 22 52 22 78 0" fill="none" stroke={accent} strokeWidth="5" strokeDasharray="8 10"/>
    </g>;
    case "habits": return <Window accent={accent}>
      {[0,1,2].map((n)=><g key={n}><circle cx={260+n*140} cy="223" r="43" fill="none" stroke="#18344d" strokeWidth="12"/><path d={`M${260+n*140} 180a43 43 0 1 1-31 72`} fill="none" stroke={[accent,"#7c78ff","#4ade80"][n]} strokeWidth="12" strokeLinecap="round"/></g>)}
      {[0,1,2,3,4,5,6].map(n=><circle key={n} cx={202+n*64} cy="321" r="14" fill={n<5?accent:"#18344d"} opacity={n<5?.72:1}/>)}
    </Window>;
    case "weather": return <Window accent={accent}>
      <circle cx="282" cy="218" r="51" fill="#ffd268"/><circle cx="324" cy="240" r="43" fill="#deefff"/><circle cx="267" cy="251" r="35" fill="#deefff"/><rect x="263" y="245" width="114" height="43" rx="21" fill="#deefff"/>
      <text x="438" y="194" fill="#91a8bd" fontSize="17">TBILISI</text><text x="438" y="241" fill="#f6fbff" fontSize="42" fontWeight="700">24°</text><text x="438" y="273" fill={accent} fontSize="16">Partly cloudy</text>
    </Window>;
    case "inventory": return <Window accent={accent}>
      <rect x="151" y="164" width="132" height="194" rx="15" fill="#0b2032"/>{[0,1,2,3].map(n=>bar(173,190+n*39,83,n===1))}
      {[0,1,2].map(r=>[0,1,2].map(c=><rect key={`${r}-${c}`} x={315+c*104} y={168+r*61} width="83" height="47" rx="10" fill={r===1&&c===2?soft:"#0b2032"} stroke={r===1&&c===2?line:"transparent"}/>))}
    </Window>;
    case "atm": return <g>
      <rect x="250" y="52" width="300" height="370" rx="31" fill="#071521" stroke={line}/><rect x="281" y="90" width="238" height="139" rx="15" fill="#0b2032"/>
      <text x="400" y="134" textAnchor="middle" fill="#8fa7bd" fontSize="15">WELCOME</text><text x="400" y="177" textAnchor="middle" fill="#f3f8ff" fontSize="23" fontWeight="700">Select transaction</text>
      <rect x="302" y="278" width="196" height="18" rx="9" fill="#102e48"/><rect x="329" y="326" width="142" height="46" rx="12" fill={soft} stroke={line}/>
    </g>;
    case "marks": return <Window accent={accent}>
      <rect x="151" y="165" width="490" height="40" rx="11" fill="#0b2032"/>
      {[0,1,2,3].map(r=><g key={r}><rect x="151" y={220+r*34} width="490" height="26" rx="8" fill={r===1?soft:"#0a1b2b"}/>{bar(174,227+r*34,172,r===1)}{bar(456,227+r*34,54)}{bar(566,227+r*34,49,r===1)}</g>)}
    </Window>;
    case "parking": return <Window accent={accent}>
      {[0,1,2].map(r=>[0,1,2,3,4].map(c=><rect key={`${r}-${c}`} x={158+c*97} y={162+r*58} width="70" height="44" rx="9" fill={r===1&&c===2?soft:"#0b2032"} stroke={r===1&&c===2?line:"transparent"}/>))}
      <path d="M361 242h42l18 14h18v22h-96v-22h18z" fill={accent} opacity=".85"/><circle cx="363" cy="280" r="8" fill="#071521"/><circle cx="418" cy="280" r="8" fill="#071521"/>
    </Window>;
    case "todos": return <Window accent={accent}>
      {[0,1,2,3,4].map(n=><g key={n}><rect x="190" y={170+n*37} width="22" height="22" rx="6" fill={n<2?accent:"#0f2a42"} stroke={line}/>{n<2&&<path d={`M196 ${181+n*37}l6 6 11-13`} fill="none" stroke="white" strokeWidth="3"/>}{bar(237,175+n*37,n%2?277:326,n<2)}</g>)}
    </Window>;
    case "web50": return <Window accent={accent}>
      {[0,1,2].map(r=>[0,1,2,3].map(c=><rect key={`${r}-${c}`} x={151+c*122} y={169+r*54} width="104" height="41" rx="11" fill={(r+c)%4===0?soft:"#0b2032"} stroke={(r+c)%4===0?line:"transparent"}/>))}
    </Window>;
    case "dice": return <Window accent={accent}>
      <g transform="rotate(-10 312 250)"><rect x="225" y="167" width="174" height="174" rx="31" fill="#0b2032" stroke={line}/>{[[265,207],[359,207],[312,254],[265,301],[359,301]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="13" fill={accent}/>)}</g>
      <g transform="rotate(10 515 258)"><rect x="431" y="177" width="168" height="168" rx="30" fill={soft} stroke={line}/>{[[471,217],[559,217],[471,305],[559,305]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="13" fill="#edf7ff"/>)}</g>
    </Window>;
    default: return <Window accent={accent}>
      <path d="M245 207l-53 43 53 43M555 207l53 43-53 43" fill="none" stroke={accent} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M458 187L342 313" stroke="#8b7cff" strokeWidth="10" strokeLinecap="round"/>{bar(276,345,248)}
    </Window>;
  }
}

export function ProjectVisual({ title, slug, category }: { title: string; slug: string; category: string }) {
  const kind = kindFor(title, slug, category);
  const accent = accentByKind[kind];
  const safe = (slug || kind).replace(/[^a-z0-9-]/gi, "");

  return <svg className="project-art" viewBox="0 0 800 470" preserveAspectRatio="xMidYMid slice" role="img" aria-label={`${title} visual preview`}>
    <defs>
      <radialGradient id={`${safe}-glow`} cx="76%" cy="10%" r="78%"><stop offset="0%" stopColor={accent} stopOpacity=".3"/><stop offset="62%" stopColor={accent} stopOpacity=".04"/><stop offset="100%" stopColor="#02060d" stopOpacity="0"/></radialGradient>
      <linearGradient id={`${safe}-bg`} x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#071523"/><stop offset="58%" stopColor="#091728"/><stop offset="100%" stopColor="#0b102e"/></linearGradient>
    </defs>
    <rect width="800" height="470" fill={`url(#${safe}-bg)`}/><rect width="800" height="470" fill={`url(#${safe}-glow)`}/>
    <circle cx="712" cy="58" r="155" fill={accent} opacity=".035"/><circle cx="82" cy="432" r="190" fill="#7568ff" opacity=".035"/>
    <path d="M0 405C170 340 270 443 430 378s255-41 370-108" fill="none" stroke={accent} strokeWidth="1.5" opacity=".16"/>
    <Scene kind={kind} accent={accent}/>
    <circle cx="52" cy="49" r="5" fill={accent}/><path d="M70 49h103" stroke="#a9bfd4" strokeWidth="4" strokeLinecap="round" opacity=".42"/>
    <text x="52" y="434" fill="#d5e6f5" fontSize="17" fontWeight="650" letterSpacing="2">{category.replaceAll("-", " ").toUpperCase()}</text>
  </svg>;
}
