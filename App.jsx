import { useState, useEffect } from "react";

const C = {
  bg: "#0b0b0e", surface: "#13131a", surfaceHi: "#1a1a24",
  border: "#22222e", borderHi: "#2e2e3e",
  text: "#d4cfca", muted: "#62627a", dim: "#383848",
  amber: "#e8903c", amberBg: "#2a1c0c",
  blue: "#5a9bd5", blueBg: "#0e1e2e",
  green: "#52bf82", greenBg: "#0e2218",
  red: "#e05555", redBg: "#220e0e",
};

const CLASS_TAG = {
  "SSRI":          { bg:"#0f1e2e", color:"#5a9bd5", border:"#1a2e42" },
  "SNRI":          { bg:"#0e2230", color:"#4bbfe8", border:"#1a3248" },
  "Antidepressant":{ bg:"#0e1e12", color:"#52bf82", border:"#183228" },
  "Anxiolytic":    { bg:"#1c1028", color:"#c27ee0", border:"#2c1a3c" },
  "SARI":          { bg:"#22160a", color:"#e8903c", border:"#382010" },
  "Pain":          { bg:"#1e0e0e", color:"#e05555", border:"#301414" },
  "Benzo":         { bg:"#1c1a0a", color:"#d4b832", border:"#2e2c10" },
};

const MEDS = [
  {
    id:"prozac", brandName:"Prozac", genericName:"fluoxetine",
    otherForms:"Prozac Weekly, Sarafem (for PMDD), oral solution",
    classes:["Antidepressant","SSRI"],
    approvedUses:["Major Depression (adults)","Obsessive-Compulsive Disorder","Panic Disorder","Bulimia Nervosa","Premenstrual Dysphoric Disorder (as Sarafem)"],
    offLabelUses:["Fibromyalgia","Arthritis","Chronic Fatigue","Multiple Sclerosis","Bipolar Depression","Lupus","Headaches","Irritable Bowel Syndrome (IBS)","Premature Ejaculation"],
    pros:"Prozac's long half-life makes med compliance less of a big deal — hence the approval for depressed teenagers — and SSRI discontinuation syndrome is rarely a problem, if it happens at all.",
    cons:"The sexual side effects and weight gain, if it happens, can be pretty bad.",
    sideEffectsTypical:"The usual SSRI lineup: headache, nausea, dry mouth, sweating, sleepiness or insomnia, diarrhea or constipation, weight gain, loss of libido. Most will go away after a week or two, but weight gain and loss of libido might stick around. Or become permanent. Weight gain is a coin toss.",
    sideEffectsUncommon:"Rash, flu-like symptoms, anger/rage.",
    sideEffectsRare:"Bleeding gums, amnesia, anti-social reaction, excessive hair growth, engorged breasts, involuntary tongue protrusion — per the PI sheet, one 77-year-old woman stopped sticking her tongue out at everyone after they stopped giving her Prozac.",
    interestingStuff:"Prozac isn't such a hot idea for anyone with diabetes — not because of potential weight gain, but because it messes with glycemic control.",
    onset:"Anywhere from a couple days to over a month. Because of the long time to reach steady state, you might want to give Prozac a full two months.",
    dosage:"Depression: 20mg in the morning, increasing by 20mg after at least a week, max 80mg/day. OCD & Bulimia: same start, max 60mg/day. Panic: start at 10mg, work up to 20mg. Going above 20mg rarely helps more. Crazymeds recommends starting at half the suggested dose.",
    howToStop:"Reduce by 10–20mg every 3–4 days, or more slowly. SSRI discontinuation syndrome is so rare with Prozac that it's used to wean people off SNRIs and other SSRIs.",
    halfLife:"9.3 days (active metabolite norfluoxetine). Fluoxetine itself: 1–4 days. Takes approximately 45 days to fully clear your system.",
    steadyState:"Three to five weeks.",
    shelfLife:"Tablets: 3 years. Oral solution: 2 years.",
  },
  {
    id:"celexa", brandName:"Celexa", genericName:"citalopram",
    classes:["Antidepressant","SSRI"],
    approvedUses:["Major depressive disorder (MDD)"],
    overseasUses:"Approved in the UK, India, Russia, Ukraine, and most of Europe for depression, relapse prevention, and Panic Disorder. Also OCD in Argentina, Brazil, Estonia, Israel, and South Africa. Depression and anxiety in Taiwan.",
    offLabelUses:["Panic disorders with phobias","Combat PTSD","Social anxiety disorder","OCD","Bipolar depression","Augmenting antipsychotics for psychotic depression","Severe hot flashes (post-menopausal women, breast cancer patients)","PMDD","Chronic fatigue (mixed results)","Eating disorders (anorexia, binge eating, bulimia)","Irritable Bowel Syndrome (mixed to poor results)","Premature ejaculation"],
    onset:"Like all SSRIs, a couple days to over a month. Literal 50% coin-toss for a positive response within four weeks. Two-in-three chance your depression stays away. Overall 60–70% chance it works — except Lexapro edges it out slightly.",
    dosage:"Start at 20mg/day, give it at least a week. Go up to 40mg if needed. 60mg probably won't work better, but you can try if no history of heart problems. Crazymeds suggests starting at 10mg and increasing by 10mg increments. If you feel like whaleshit on the bottom of the ocean, start at 20mg.",
    howToStop:"Reduce by 10–20mg every 6–8 days (or every week). The 35-hour half-life makes severe discontinuation syndrome less likely than most other SSRIs.",
    halfLife:"35 hours.",
  },
  {
    id:"lexapro", brandName:"Lexapro", genericName:"escitalopram",
    classes:["Antidepressant","SSRI","Anxiolytic"],
    approvedUses:["Major depressive disorder (MDD) in adults & adolescents","Generalized anxiety disorder (GAD) in adults"],
    overseasUses:"Approved everywhere else for Social Anxiety Disorder and Panic Disorder with or without Agoraphobia. Also approved for OCD in Australia, Canada, Argentina, Chile, Denmark, Sweden, Spain, New Zealand, and the UK.",
    offLabelUses:["Social anxiety disorder","OCD","PTSD","Panic disorder","Bipolar depression"],
    onset:"Can start working within one week, though give it at least three weeks. About a 60–75% chance of response and 50–70% chance of remission for MDD. Lexapro and Celexa both beat other SSRIs for MDD effectiveness.",
    dosage:"Manufacturer recommends 10mg once a day. Crazymeds suggests starting at 5mg, increasing by 2.5–5mg after at least a week, and only if needed.",
    howToStop:"Decrease by 5mg every week. On 10mg? Take 5mg for a week, then stop. Try 2.5mg/day if needed. For severe discontinuation syndrome, ask about fluoxetine or the oral solution.",
    halfLife:"27–32 hours.",
  },
  {
    id:"zoloft", brandName:"Zoloft", genericName:"sertraline",
    classes:["Antidepressant","SSRI","Anxiolytic"],
    approvedUses:["Major Depressive Disorder (MDD) — approved December 30, 1991","Obsessive-Compulsive Disorder (OCD) in adults and children","Panic Disorder","Post-Traumatic Stress Disorder (PTSD)","Premenstrual Dysphoric Disorder (PMDD)","Social Anxiety Disorder"],
    offLabelUses:["Generalized Anxiety Disorder (mixed results)","Depression with cardiovascular conditions","Eating disorders (binge eating, bulimia, anorexia, sleep eating)","Menopause/hot flashes (equal chance of helping, worsening, or nothing)"],
    onset:"Anywhere from a couple days to over a month. You should feel more awake and energetic within two to four days. Better for anxiety spectrum than depression spectrum. Works well for depression defined by sleeping too much, eating too much, and withdrawing from the world.",
    dosage:"Pfizer recommends 50mg once a day for MDD and OCD. 25mg to start for PTSD, panic, and social anxiety, increasing to 50mg after a week. Crazymeds: start at 12.5–25mg and wait at least two weeks before increasing.",
    howToStop:"Reduce by 12.5–25mg each week. If discontinuation syndrome is harsh, get a prescription for the oral solution or bridge to 20mg fluoxetine for two weeks, then 10mg for two more.",
    halfLife:"26 hours.",
  },
  {
    id:"paxil", brandName:"Paxil", genericName:"paroxetine",
    classes:["Antidepressant","SSRI","Anxiolytic"],
    approvedUses:["Major Depressive Disorder (MDD) — IR and CR","Panic Disorder — IR and CR","Social Anxiety Disorder — IR and CR","Obsessive-Compulsive Disorder (OCD) — IR only","Generalized Anxiety Disorder (GAD) — IR only","Posttraumatic Stress Disorder (PTSD) — IR only","Premenstrual Dysphoric Disorder (PMDD) — CR only"],
    offLabelUses:["Paxil CR for OCD, GAD, and PTSD","Hoarding","Social anxiety with alcohol abuse","Headaches","Irritable Bowel Syndrome","Tourette Syndrome","Premature ejaculation","Hot flashes in men (androgen ablation therapy for prostate cancer)","Taijin kyofusho","Lewy Body Dementia","Hypochondriasis"],
    onset:"Two to four weeks, sometimes six. Not a great antidepressant, but a pretty decent med for the anxiety alphabet soup. Especially good for GAD, Social Anxiety Disorder (though Zoloft beats it there), PMDD, and panic disorders without agoraphobia.",
    dosage:"IR: start 10mg (Panic) or 20mg (everything else). Increase 10mg/week to target: 40mg for OCD/Panic, 30mg average for MDD, 50mg max. CR: start 25mg for MDD, 12.5mg for everything else. Crazymeds: start at 5–10mg IR or 12.5mg CR. Try taking it at night first.",
    howToStop:"Very, very slowly and very, very carefully. 5–10mg/week for IR, 12.5mg/week for CR. Ask your doctor for 5 & 10mg IR tablets even if you take CR, and a week's worth of Prozac as a safety net.",
    halfLife:"21 hours.",
  },
  {
    id:"cymbalta", brandName:"Cymbalta", genericName:"duloxetine",
    classes:["Antidepressant","SNRI","Anxiolytic","Pain"],
    approvedUses:["Major Depressive Disorder (MDD)","Generalized Anxiety Disorder (GAD)","Fibromyalgia","Diabetic Peripheral Neuropathic Pain (DPNP)","Chronic Musculoskeletal Pain (CMSP)"],
    overseasUses:"Stress urinary incontinence in women in the EU (trade name Yentreve).",
    offLabelUses:["Stress urinary incontinence in women (and possibly men)","ADD/ADHD","Smoking cessation","Migraines and other headaches"],
    onset:"Psychiatric: 3 days to a month, average about two weeks. Pain (DPNP & CMSP): a few days to 2–3 weeks. Fibromyalgia: meds poop out a lot and even opioids are placebos for many. Pretty good odds for depression and anxiety — far less likely to poop out than SSRIs.",
    dosage:"MDD: start 40–60mg/day in 1–2 doses, target 60mg, max 120mg. GAD: start 60mg once a day, max 120mg. Crazymeds suggests starting at 20mg and increasing by 20mg as needed, and taking it twice daily due to the short half-life.",
    howToStop:"The manufacturer says to taper 'gradually' and leaves it at that. Helpful. Crazymeds says: 10–20mg/week reduction. Once at 20mg, stop after 1–2 weeks at that dose. If discontinuation symptoms don't go away, ask for a Prozac prescription.",
    halfLife:"12 hours.",
  },
  {
    id:"trazodone", brandName:"Desyrel", genericName:"trazodone",
    otherForms:"Orange-flavored solution",
    classes:["Antidepressant","SARI"],
    approvedUses:["Major depressive disorder, with or without anxiety."],
    offLabelUses:["Insomnia / sleep disorders","Panic/Anxiety","Bipolar Depression","Chronic Fatigue","Fibromyalgia","SSRI-induced sexual dysfunction (mixed results)","Arthritis","Lupus","Irritable Bowel Syndrome","Eating Disorders"],
    pros:"The antidepressant you need if you have the combination of insomnia with mild depression and/or anxiety.",
    cons:"You might just sleep a little too well.",
    sideEffectsTypical:"Sleepiness. Headache. Sleepiness. Dizziness. Sleepiness. Nausea. Sleepiness. Dry mouth. Sleepiness. Blurry vision. Sleepiness. Did I mention you'll be tired? Most everything but the sleepiness and dizziness will go away within a week or two.",
    sideEffectsUncommon:"Low blood pressure, weight gain. General cardiac weirdness — don't use without cardiologist clearance if you have heart history. Vivid or unusual dreams. Sometimes a nasty hangover the first few days.",
    sideEffectsRare:"Priapism so bad that surgical intervention was required to get rid of the unending hard-on. Women too, as it can cause clitoral priapism. And persistent genital arousal disorder and spontaneous orgasms in an elderly postmenopausal woman. There is a paper describing the corrective surgery. It has pictures.",
    interestingStuff:"Best taken with food — take it after dinner or dessert. The major metabolite of trazodone is mCPP, one of the drugs sold as 'ecstasy' in the 90s — a hallucinogen that gives you a migraine. Why anyone thought that was a party drug is beyond comprehension.",
    onset:"Two weeks for depression. One to two nights for sleep.",
    dosage:"Start at just 50mg if you want to wake up the next morning. If no response after a week, go to 100mg. Work up to 150mg after two weeks, then wait a month before further increases. After that, 50mg every four days divided, max 400mg/day.",
    howToStop:"Reduce by 50–100mg every 3–5 days.",
    halfLife:"5–9 hours.",
    shelfLife:"5 years.",
    comments:"Trazodone is the official antidepressant of Sleepy-bye Land. Rarely prescribed as monotherapy for depression anymore — mostly an add-on for insomnia combined with depression and/or anxiety. If you're on an SSRI and not sleeping or are agitated, trazodone might be a good addition to the cocktail. Do not combine with Seroquel if you want to see daylight anytime this week.",
  },
];

const BENZOS = [
  {brand:"Ativan",generic:"lorazepam",cls:"Intermediate",hl:"8–24",aed:true,anxiety:true,sleep:false,dts:false,potency:"High"},
  {brand:"Dalmane",generic:"flurazepam",cls:"Long-acting",hl:"50–160",aed:false,anxiety:false,sleep:true,dts:false,potency:"Medium"},
  {brand:"Doral",generic:"quazepam",cls:"Long-acting",hl:"40–120",aed:false,anxiety:false,sleep:true,dts:false,potency:"Medium"},
  {brand:"Halcion",generic:"triazolam",cls:"Short-acting",hl:"1.5–5",aed:false,anxiety:false,sleep:true,dts:false,potency:"High"},
  {brand:"Klonopin",generic:"clonazepam",cls:"Long-acting",hl:"19–60",aed:true,anxiety:true,sleep:false,dts:false,potency:"High"},
  {brand:"Librium",generic:"chlordiazepoxide",cls:"Long-acting",hl:"30–100",aed:false,anxiety:true,sleep:false,dts:true,potency:"Low"},
  {brand:"Onfi",generic:"clobazam",cls:"Long-acting",hl:"10–30",aed:true,anxiety:false,sleep:false,dts:false,potency:"High"},
  {brand:"Prosom",generic:"estazolam",cls:"Intermediate",hl:"10–24",aed:false,anxiety:false,sleep:true,dts:false,potency:"?"},
  {brand:"Restoril",generic:"temazepam",cls:"Intermediate",hl:"8–20",aed:false,anxiety:false,sleep:true,dts:false,potency:"Low"},
  {brand:"Serax",generic:"oxazepam",cls:"Intermediate",hl:"3–25",aed:false,anxiety:false,sleep:true,dts:false,potency:"Low"},
  {brand:"Tranxene",generic:"clorazepate",cls:"Long-acting",hl:"40–50",aed:true,anxiety:true,sleep:false,dts:true,potency:"Medium"},
  {brand:"Valium",generic:"diazepam",cls:"Long-acting",hl:"30–100",aed:true,anxiety:true,sleep:false,dts:true,potency:"Medium"},
  {brand:"Versed",generic:"midazolam",cls:"Short-acting",hl:"1.5–7",aed:true,anxiety:false,sleep:false,dts:false,potency:"High"},
  {brand:"Xanax",generic:"alprazolam",cls:"Intermediate",hl:"6–27",aed:false,anxiety:true,sleep:false,dts:false,potency:"High"},
];

const s = {
  page: { fontFamily:"'DM Sans', system-ui, sans-serif", background:C.bg, color:C.text, minHeight:"100vh" },
  nav: { background:C.surface, borderBottom:`1px solid ${C.border}`, padding:"0 2rem", display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, zIndex:100 },
  navLogo: { fontFamily:"'Cormorant Garamond', Georgia, serif", fontWeight:700, fontSize:"1.5rem", color:C.amber, cursor:"pointer", letterSpacing:"-0.02em", padding:"1rem 0", textDecoration:"none" },
  navLinks: { display:"flex", gap:"0.25rem" },
  navLink: { color:C.muted, fontSize:"0.875rem", padding:"0.5rem 0.875rem", cursor:"pointer", borderRadius:6, border:"none", background:"transparent", transition:"color 0.15s, background 0.15s" },
  hero: { padding:"5rem 2rem 4rem", maxWidth:900, margin:"0 auto", textAlign:"center" },
  heroEyebrow: { color:C.amber, fontSize:"0.75rem", fontWeight:600, letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:"1rem" },
  heroTitle: { fontFamily:"'Cormorant Garamond', Georgia, serif", fontWeight:700, fontSize:"clamp(2.5rem, 6vw, 4rem)", lineHeight:1.1, color:"#e8e4dc", marginBottom:"1.25rem" },
  heroSub: { fontSize:"1.1rem", color:C.muted, maxWidth:580, margin:"0 auto 2.5rem", lineHeight:1.7 },
  searchWrap: { position:"relative", maxWidth:520, margin:"0 auto" },
  searchInput: { width:"100%", padding:"0.875rem 1.25rem 0.875rem 3rem", background:C.surface, border:`1px solid ${C.border}`, borderRadius:10, color:C.text, fontSize:"1rem", outline:"none", boxSizing:"border-box" },
  searchIcon: { position:"absolute", left:"1rem", top:"50%", transform:"translateY(-50%)", color:C.muted, pointerEvents:"none" },
  section: { maxWidth:1100, margin:"0 auto", padding:"3rem 2rem" },
  sectionTitle: { fontFamily:"'Cormorant Garamond', Georgia, serif", fontSize:"1.5rem", fontWeight:600, color:"#e8e4dc", marginBottom:"0.5rem" },
  sectionSub: { color:C.muted, fontSize:"0.9rem", marginBottom:"2rem" },
  grid: { display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(280px, 1fr))", gap:"1rem" },
  card: { background:C.surface, border:`1px solid ${C.border}`, borderRadius:10, padding:"1.25rem 1.5rem", cursor:"pointer", transition:"border-color 0.15s, background 0.15s" },
  cardBrand: { fontFamily:"'Cormorant Garamond', Georgia, serif", fontSize:"1.4rem", fontWeight:600, color:"#e8e4dc", marginBottom:"0.2rem" },
  cardGeneric: { color:C.muted, fontSize:"0.8rem", fontFamily:"'DM Mono', monospace", marginBottom:"0.75rem" },
  tags: { display:"flex", flexWrap:"wrap", gap:"0.4rem" },
  tag: (cls) => { const t = CLASS_TAG[cls] || CLASS_TAG["Antidepressant"]; return { background:t.bg, color:t.color, border:`1px solid ${t.border}`, borderRadius:20, padding:"0.25rem 0.75rem", fontSize:"0.7rem", fontWeight:500 }; },
  detailWrap: { display:"grid", gridTemplateColumns:"220px 1fr", gap:"2rem", maxWidth:1100, margin:"0 auto", padding:"2.5rem 2rem", alignItems:"start" },
  toc: { position:"sticky", top:72, background:C.surface, border:`1px solid ${C.border}`, borderRadius:10, padding:"1.25rem" },
  tocTitle: { color:C.muted, fontSize:"0.7rem", fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:"0.875rem" },
  tocLink: { display:"block", color:C.muted, fontSize:"0.825rem", padding:"0.3rem 0.5rem", borderRadius:4, cursor:"pointer", border:"none", background:"transparent", textAlign:"left", width:"100%", transition:"color 0.15s, background 0.15s" },
  detailMain: { minWidth:0 },
  detailHeader: { marginBottom:"2rem", paddingBottom:"2rem", borderBottom:`1px solid ${C.border}` },
  detailBrand: { fontFamily:"'Cormorant Garamond', Georgia, serif", fontSize:"clamp(2rem, 4vw, 3rem)", fontWeight:700, color:"#e8e4dc", lineHeight:1.1, marginBottom:"0.3rem" },
  detailGeneric: { color:C.muted, fontFamily:"'DM Mono', monospace", fontSize:"0.9rem", marginBottom:"0.25rem" },
  detailOther: { color:C.dim, fontSize:"0.8rem", fontStyle:"italic", marginBottom:"1rem" },
  block: { marginBottom:"2rem" },
  blockTitle: { fontSize:"0.7rem", fontWeight:600, color:C.amber, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:"0.75rem" },
  blockContent: { color:C.text, fontSize:"0.95rem", lineHeight:1.75 },
  ul: { paddingLeft:"1.25rem", margin:0 },
  li: { marginBottom:"0.4rem", fontSize:"0.9rem", color:C.text, lineHeight:1.6 },
  prosCons: { display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem", marginBottom:"2rem" },
  prosBox: { background:C.greenBg, border:`1px solid ${C.border}`, borderRadius:8, padding:"1rem 1.25rem" },
  consBox: { background:C.redBg, border:`1px solid ${C.border}`, borderRadius:8, padding:"1rem 1.25rem" },
  prosTitle: { color:C.green, fontSize:"0.7rem", fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:"0.5rem" },
  consTitle: { color:C.red, fontSize:"0.7rem", fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:"0.5rem" },
  seBox: { background:C.surfaceHi, border:`1px solid ${C.border}`, borderRadius:8, padding:"1rem 1.25rem", marginBottom:"0.75rem" },
  seTitle: { fontSize:"0.75rem", fontWeight:500, color:C.muted, marginBottom:"0.5rem" },
  quickStats: { display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(160px, 1fr))", gap:"0.75rem", marginBottom:"2rem" },
  stat: { background:C.surfaceHi, border:`1px solid ${C.border}`, borderRadius:8, padding:"0.875rem 1rem" },
  statLabel: { color:C.muted, fontSize:"0.7rem", fontWeight:500, letterSpacing:"0.06em", textTransform:"uppercase", marginBottom:"0.3rem" },
  statVal: { color:"#e8e4dc", fontSize:"0.95rem", fontWeight:500 },
  benzoWrap: { maxWidth:1100, margin:"0 auto", padding:"2.5rem 2rem" },
  benzoTable: { width:"100%", borderCollapse:"collapse", fontSize:"0.875rem" },
  benzoTh: { textAlign:"left", padding:"0.6rem 0.875rem", borderBottom:`2px solid ${C.border}`, color:C.muted, fontSize:"0.7rem", fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase" },
  benzoTd: { padding:"0.75rem 0.875rem", borderBottom:`1px solid ${C.border}`, verticalAlign:"middle" },
  dot: (yes) => ({ display:"inline-block", width:8, height:8, borderRadius:"50%", background: yes ? C.green : C.dim }),
  potencyPill: (p) => ({ display:"inline-block", padding:"0.2rem 0.6rem", borderRadius:20, fontSize:"0.7rem", fontWeight:500, background: p==="High" ? "#1e0a0a" : p==="Medium" ? "#1a1a0a" : "#0a1a14", color: p==="High" ? C.red : p==="Medium" ? "#d4b832" : C.green }),
  filterBar: { display:"flex", gap:"0.5rem", flexWrap:"wrap", marginBottom:"2rem" },
  filterBtn: (active) => ({ padding:"0.4rem 1rem", borderRadius:20, fontSize:"0.8rem", cursor:"pointer", border:`1px solid ${active ? C.amber : C.border}`, background: active ? C.amberBg : "transparent", color: active ? C.amber : C.muted, transition:"all 0.15s" }),
  backBtn: { background:"transparent", border:`1px solid ${C.border}`, color:C.muted, padding:"0.5rem 1rem", borderRadius:6, cursor:"pointer", fontSize:"0.85rem", marginBottom:"1.5rem", display:"flex", alignItems:"center", gap:"0.5rem" },
  footer: { background:C.surface, borderTop:`1px solid ${C.border}`, padding:"2rem", textAlign:"center", color:C.muted, fontSize:"0.825rem", lineHeight:1.8 },
  disclaimer: { maxWidth:900, margin:"0 auto", padding:"1.5rem 2rem", background:C.surfaceHi, borderRadius:10, border:`1px solid ${C.border}`, borderLeft:`3px solid ${C.amber}`, marginBottom:"2rem" },
  disclaimerText: { color:C.muted, fontSize:"0.8rem", lineHeight:1.7 },
};

function Tag({ cls }) {
  return <span style={s.tag(cls)}>{cls}</span>;
}

function NavLink({ children, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{ ...s.navLink, color: active ? C.amber : C.muted, background: active ? C.amberBg : "transparent" }}
    >
      {children}
    </button>
  );
}

function Nav({ page, setPage }) {
  return (
    <nav style={s.nav}>
      <span style={s.navLogo} onClick={() => setPage({view:"home"})}>CrazyMeds</span>
      <div style={s.navLinks}>
        <NavLink active={page.view==="home"} onClick={() => setPage({view:"home"})}>Home</NavLink>
        <NavLink active={page.view==="meds"||page.view==="med"} onClick={() => setPage({view:"meds"})}>Medications</NavLink>
        <NavLink active={page.view==="benzos"} onClick={() => setPage({view:"benzos"})}>Benzodiazepines</NavLink>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer style={s.footer}>
      <p style={{margin:"0 0 0.5rem", color:"#e8e4dc", fontFamily:"'Cormorant Garamond', Georgia, serif", fontSize:"1.1rem", fontWeight:600}}>CrazyMeds</p>
      <p style={{margin:"0 0 0.5rem"}}>Written and maintained by Jerod Poore</p>
      <p style={{margin:0}}>
        Content licensed under{" "}
        <a href="https://creativecommons.org/licenses/by-nc-sa/3.0/" style={{color:C.amber}}>CC BY-NC-SA 3.0</a>
        {" "}· Not a substitute for professional medical advice
      </p>
    </footer>
  );
}

function Disclaimer() {
  return (
    <div style={s.disclaimer}>
      <p style={s.disclaimerText}>
        <strong style={{color:C.amber}}>Medical disclaimer:</strong>{" "}
        This information is for educational purposes only. It is not medical advice. Always consult a qualified healthcare provider before starting, stopping, or changing any medication. Do not make decisions based solely on this content.
      </p>
    </div>
  );
}

function HomePage({ setPage }) {
  const [q, setQ] = useState("");
  const results = q.length > 1
    ? MEDS.filter(m =>
        m.brandName.toLowerCase().includes(q.toLowerCase()) ||
        m.genericName.toLowerCase().includes(q.toLowerCase()) ||
        m.classes.some(c => c.toLowerCase().includes(q.toLowerCase()))
      )
    : [];

  return (
    <div>
      <div style={s.hero}>
        <p style={s.heroEyebrow}>The Educated Consumer's Guide</p>
        <h1 style={s.heroTitle}>What your doctor probably<br />won't tell you</h1>
        <p style={s.heroSub}>
          Practical, plain-language information about psychiatric medications — side effects, dosing, discontinuation, and everything in between.
        </p>
        <div style={s.searchWrap}>
          <span style={s.searchIcon}>⌕</span>
          <input
            style={s.searchInput}
            placeholder="Search by brand name, generic, or drug class…"
            value={q}
            onChange={e => setQ(e.target.value)}
          />
        </div>
        {results.length > 0 && (
          <div style={{ marginTop:"1rem", background:C.surface, border:`1px solid ${C.border}`, borderRadius:8, overflow:"hidden", maxWidth:520, margin:"1rem auto 0" }}>
            {results.map(m => (
              <div key={m.id}
                onClick={() => setPage({view:"med", id:m.id})}
                style={{ padding:"0.875rem 1.25rem", cursor:"pointer", borderBottom:`1px solid ${C.border}`, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                <div>
                  <span style={{ fontWeight:500, color:"#e8e4dc" }}>{m.brandName}</span>
                  <span style={{ color:C.muted, fontSize:"0.8rem", marginLeft:"0.5rem", fontFamily:"'DM Mono', monospace" }}>{m.genericName}</span>
                </div>
                <div style={s.tags}>
                  {m.classes.slice(0,2).map(c => <Tag key={c} cls={c} />)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ ...s.section, paddingTop:0 }}>
        <Disclaimer />

        <div style={{ display:"flex", alignItems:"baseline", justifyContent:"space-between", marginBottom:"1.5rem" }}>
          <div>
            <h2 style={s.sectionTitle}>Medications</h2>
            <p style={s.sectionSub}>Currently featuring {MEDS.length} of 49 medications. More being added.</p>
          </div>
          <button onClick={() => setPage({view:"meds"})} style={{ background:"transparent", border:`1px solid ${C.border}`, color:C.amber, padding:"0.5rem 1rem", borderRadius:6, cursor:"pointer", fontSize:"0.85rem" }}>
            Browse all →
          </button>
        </div>
        <div style={s.grid}>
          {MEDS.map(m => (
            <MedCard key={m.id} med={m} onClick={() => setPage({view:"med", id:m.id})} />
          ))}
        </div>
      </div>

      <div style={{ background:C.surfaceHi, borderTop:`1px solid ${C.border}`, borderBottom:`1px solid ${C.border}` }}>
        <div style={{ ...s.section, display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))", gap:"2rem" }}>
          {[
            { icon:"💊", title:"Plain language dosing", desc:"Manufacturer recommendations plus Crazymeds' own field-tested suggestions." },
            { icon:"⚠️", title:"Real side effects", desc:"Typical, uncommon, and the genuinely freaky rare — without sanitizing the weird ones." },
            { icon:"🛑", title:"How to stop safely", desc:"Discontinuation schedules based on half-life, not vague 'taper gradually' advice." },
            { icon:"🔬", title:"Off-label uses", desc:"What it's actually being prescribed for, with links to the research backing it up." },
          ].map(f => (
            <div key={f.title} style={{ paddingTop:"0.5rem" }}>
              <div style={{ fontSize:"1.5rem", marginBottom:"0.75rem" }}>{f.icon}</div>
              <h3 style={{ color:"#e8e4dc", fontSize:"1rem", fontWeight:500, marginBottom:"0.5rem" }}>{f.title}</h3>
              <p style={{ color:C.muted, fontSize:"0.875rem", lineHeight:1.7, margin:0 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MedCard({ med, onClick }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      style={{ ...s.card, borderColor: hover ? C.amber : C.border, background: hover ? C.surfaceHi : C.surface }}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div style={s.cardBrand}>{med.brandName}</div>
      <div style={s.cardGeneric}>{med.genericName}</div>
      <div style={s.tags}>
        {med.classes.map(c => <Tag key={c} cls={c} />)}
      </div>
      {med.halfLife && (
        <div style={{ marginTop:"0.875rem", color:C.muted, fontSize:"0.78rem" }}>
          Half-life: <span style={{ color:C.text }}>{med.halfLife}</span>
        </div>
      )}
    </div>
  );
}

function MedIndexPage({ setPage }) {
  const [filter, setFilter] = useState("all");
  const [q, setQ] = useState("");

  const allClasses = [...new Set(MEDS.flatMap(m => m.classes))].sort();
  const shown = MEDS.filter(m => {
    const matchClass = filter === "all" || m.classes.includes(filter);
    const matchQ = !q || m.brandName.toLowerCase().includes(q.toLowerCase()) || m.genericName.toLowerCase().includes(q.toLowerCase());
    return matchClass && matchQ;
  });

  return (
    <div style={s.section}>
      <h1 style={{ ...s.sectionTitle, fontSize:"2rem", marginBottom:"0.5rem" }}>Medications</h1>
      <p style={{ ...s.sectionSub, marginBottom:"1.5rem" }}>
        Currently featuring {MEDS.length} of 49 medications. More being added regularly.
      </p>

      <div style={{ display:"flex", gap:"1rem", marginBottom:"1.5rem", flexWrap:"wrap", alignItems:"center" }}>
        <input
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder="Search…"
          style={{ ...s.searchInput, maxWidth:280, padding:"0.6rem 1rem" }}
        />
      </div>

      <div style={s.filterBar}>
        <button style={s.filterBtn(filter==="all")} onClick={() => setFilter("all")}>All</button>
        {allClasses.map(c => (
          <button key={c} style={s.filterBtn(filter===c)} onClick={() => setFilter(c)}>{c}</button>
        ))}
      </div>

      {shown.length === 0 && (
        <p style={{ color:C.muted }}>No medications match that filter.</p>
      )}

      <div style={s.grid}>
        {shown.map(m => (
          <MedCard key={m.id} med={m} onClick={() => setPage({view:"med", id:m.id})} />
        ))}
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={s.block}>
      <div style={s.blockTitle}>{title}</div>
      <div style={s.blockContent}>{children}</div>
    </div>
  );
}

function MedDetailPage({ id, setPage }) {
  const med = MEDS.find(m => m.id === id);
  if (!med) return <div style={{ padding:"2rem", color:C.muted }}>Medication not found.</div>;

  const tocItems = [
    { key:"approved", label:"Approved uses" },
    med.overseasUses && { key:"overseas", label:"Approved overseas" },
    { key:"offlabel", label:"Off-label uses" },
    { key:"onset", label:"Onset & likelihood" },
    (med.pros || med.cons) && { key:"proscons", label:"Pros & cons" },
    med.sideEffectsTypical && { key:"se", label:"Side effects" },
    med.interestingStuff && { key:"interesting", label:"Interesting stuff" },
    { key:"dosage", label:"Dosage" },
    { key:"stop", label:"How to stop" },
    med.halfLife && { key:"halflife", label:"Half-life & clearance" },
    med.comments && { key:"comments", label:"Comments" },
  ].filter(Boolean);

  return (
    <div style={s.detailWrap}>
      <div>
        <button style={s.backBtn} onClick={() => setPage({view:"meds"})}>← All meds</button>
        <div style={s.toc}>
          <div style={s.tocTitle}>On this page</div>
          {tocItems.map(t => (
            <button key={t.key} style={s.tocLink}
              onClick={() => document.getElementById(`sec-${t.key}`)?.scrollIntoView({behavior:"smooth", block:"start"})}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div style={s.detailMain}>
        <div style={s.detailHeader}>
          <h1 style={s.detailBrand}>{med.brandName}</h1>
          <div style={s.detailGeneric}>{med.genericName}</div>
          {med.otherForms && <div style={s.detailOther}>Also available as: {med.otherForms}</div>}
          <div style={s.tags}>
            {med.classes.map(c => <Tag key={c} cls={c} />)}
          </div>
        </div>

        {(med.halfLife || med.onset || med.shelfLife || med.steadyState) && (
          <div style={s.quickStats}>
            {med.halfLife && <div style={s.stat}><div style={s.statLabel}>Half-life</div><div style={s.statVal}>{med.halfLife}</div></div>}
            {med.steadyState && <div style={s.stat}><div style={s.statLabel}>Steady state</div><div style={s.statVal}>{med.steadyState}</div></div>}
            {med.shelfLife && <div style={s.stat}><div style={s.statLabel}>Shelf life</div><div style={s.statVal}>{med.shelfLife}</div></div>}
          </div>
        )}

        <Disclaimer />

        <div id="sec-approved">
          <Section title="FDA Approved Uses">
            <ul style={s.ul}>{med.approvedUses.map((u,i) => <li key={i} style={s.li}>{u}</li>)}</ul>
          </Section>
        </div>

        {med.overseasUses && (
          <div id="sec-overseas">
            <Section title="Approved Overseas But Not in the US">
              <p style={{ margin:0, color:C.text, lineHeight:1.75 }}>{med.overseasUses}</p>
            </Section>
          </div>
        )}

        <div id="sec-offlabel">
          <Section title="Off-Label Uses">
            <ul style={s.ul}>{med.offLabelUses.map((u,i) => <li key={i} style={s.li}>{u}</li>)}</ul>
          </Section>
        </div>

        <div id="sec-onset">
          <Section title="Onset of Action & Likelihood of Working">
            <p style={{ margin:0, color:C.text, lineHeight:1.75 }}>{med.onset}</p>
          </Section>
        </div>

        {(med.pros || med.cons) && (
          <div id="sec-proscons">
            <div style={s.blockTitle}>Pros & Cons</div>
            <div style={s.prosCons}>
              {med.pros && <div style={s.prosBox}><div style={s.prosTitle}>Pros</div><p style={{ margin:0, color:C.text, fontSize:"0.9rem", lineHeight:1.7 }}>{med.pros}</p></div>}
              {med.cons && <div style={s.consBox}><div style={s.consTitle}>Cons</div><p style={{ margin:0, color:C.text, fontSize:"0.9rem", lineHeight:1.7 }}>{med.cons}</p></div>}
            </div>
          </div>
        )}

        {med.sideEffectsTypical && (
          <div id="sec-se">
            <div style={s.blockTitle}>Side Effects</div>
            <div style={s.seBox}><div style={s.seTitle}>Typical</div><p style={{ margin:0, color:C.text, fontSize:"0.875rem", lineHeight:1.75 }}>{med.sideEffectsTypical}</p></div>
            {med.sideEffectsUncommon && <div style={s.seBox}><div style={s.seTitle}>Not so common</div><p style={{ margin:0, color:C.text, fontSize:"0.875rem", lineHeight:1.75 }}>{med.sideEffectsUncommon}</p></div>}
            {med.sideEffectsRare && <div style={s.seBox}><div style={{ ...s.seTitle, color:C.red }}>Freaky rare</div><p style={{ margin:0, color:C.text, fontSize:"0.875rem", lineHeight:1.75 }}>{med.sideEffectsRare}</p></div>}
          </div>
        )}

        {med.interestingStuff && (
          <div id="sec-interesting">
            <Section title="Interesting Stuff Your Doctor Probably Won't Tell You">
              <p style={{ margin:0, color:C.text, lineHeight:1.75 }}>{med.interestingStuff}</p>
            </Section>
          </div>
        )}

        <div id="sec-dosage">
          <Section title="Dosage & How to Take">
            <p style={{ margin:0, color:C.text, lineHeight:1.75 }}>{med.dosage}</p>
          </Section>
        </div>

        <div id="sec-stop">
          <Section title="How to Stop Taking">
            <p style={{ margin:0, color:C.text, lineHeight:1.75, background:C.surfaceHi, borderRadius:8, padding:"1rem", borderLeft:`3px solid ${C.red}` }}>{med.howToStop}</p>
          </Section>
        </div>

        {med.halfLife && (
          <div id="sec-halflife">
            <Section title="Half-Life & Clearance">
              <p style={{ margin:0, color:C.text, lineHeight:1.75 }}>{med.halfLife}</p>
            </Section>
          </div>
        )}

        {med.comments && (
          <div id="sec-comments">
            <Section title="Comments">
              <p style={{ margin:0, color:C.text, lineHeight:1.75, fontStyle:"italic" }}>{med.comments}</p>
            </Section>
          </div>
        )}
      </div>
    </div>
  );
}

function BenzoTablePage() {
  const classColor = { "Short-acting":{ color:C.red, bg:"#1e0a0a" }, "Intermediate":{ color:"#d4b832", bg:"#1c1a08" }, "Long-acting":{ color:C.green, bg:"#0a1e12" } };

  return (
    <div style={s.benzoWrap}>
      <h1 style={{ ...s.sectionTitle, fontSize:"2rem", marginBottom:"0.5rem" }}>Benzodiazepines</h1>
      <p style={{ ...s.sectionSub, marginBottom:"2rem" }}>
        Classifications, half-life, and approved uses. Potency and efficacy are two completely different things.
      </p>
      <Disclaimer />
      <div style={{ overflowX:"auto" }}>
        <table style={s.benzoTable}>
          <thead>
            <tr>
              {["Brand","Generic","Classification","Half-life (hrs)","AED","Anxiety","Sleep","DTs","Potency"].map(h => (
                <th key={h} style={s.benzoTh}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {BENZOS.map(b => (
              <tr key={b.brand} style={{ transition:"background 0.1s" }}>
                <td style={{ ...s.benzoTd, fontWeight:500, color:"#e8e4dc" }}>{b.brand}</td>
                <td style={{ ...s.benzoTd, fontFamily:"'DM Mono', monospace", fontSize:"0.8rem", color:C.muted }}>{b.generic}</td>
                <td style={s.benzoTd}>
                  <span style={{ ...classColor[b.cls], padding:"0.2rem 0.6rem", borderRadius:20, fontSize:"0.75rem", fontWeight:500 }}>
                    {b.cls}
                  </span>
                </td>
                <td style={{ ...s.benzoTd, color:C.muted, fontFamily:"'DM Mono', monospace", fontSize:"0.85rem" }}>{b.hl}</td>
                {[b.aed, b.anxiety, b.sleep, b.dts].map((v,i) => (
                  <td key={i} style={s.benzoTd}><span style={s.dot(v)} /></td>
                ))}
                <td style={s.benzoTd}><span style={s.potencyPill(b.potency)}>{b.potency}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop:"1.5rem", color:C.muted, fontSize:"0.8rem", lineHeight:1.8 }}>
        <p><strong style={{ color:C.text }}>AED</strong> = Antiepileptic drug. The benzo is approved to treat epilepsy.</p>
        <p><strong style={{ color:C.text }}>DTs</strong> = Delirium tremens. The benzo is approved to treat severe symptoms of sudden alcohol withdrawal. DTs don't just suck — they are similar to epileptic seizures and are potentially fatal.</p>
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState({ view:"home" });

  useEffect(() => {
    const el = document.getElementById("cm-fonts");
    if (!el) {
      const link = document.createElement("link");
      link.id = "cm-fonts";
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&family=DM+Mono&display=swap";
      document.head.appendChild(link);
    }
    const style = document.getElementById("cm-global");
    if (!style) {
      const el = document.createElement("style");
      el.id = "cm-global";
      el.textContent = `
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: ${C.bg}; }
        input:focus { border-color: ${C.amber} !important; box-shadow: 0 0 0 3px ${C.amberBg}; }
        input::placeholder { color: ${C.dim}; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: ${C.surface}; }
        ::-webkit-scrollbar-thumb { background: ${C.border}; border-radius: 3px; }
        tr:hover td { background: ${C.surfaceHi}; }
        button:hover { opacity: 0.85; }
        a { color: ${C.amber}; }
      `;
      document.head.appendChild(el);
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <div style={s.page}>
      <Nav page={page} setPage={setPage} />
      {page.view === "home" && <HomePage setPage={setPage} />}
      {page.view === "meds" && <MedIndexPage setPage={setPage} />}
      {page.view === "med" && <MedDetailPage id={page.id} setPage={setPage} />}
      {page.view === "benzos" && <BenzoTablePage />}
      <Footer />
    </div>
  );
}
