import { useState, useEffect } from "react";

const C = {
  bg:"#0d0b14", surface:"#131120", surfaceHi:"#1c1830",
  border:"#252238", text:"#d6d2e0", muted:"#6e6882", dim:"#3a3650",
  accent:"#b48ef5", accentBg:"#1e1630",
  green:"#52bf82", greenBg:"#0e2218", red:"#e05555", redBg:"#220e0e",
};

const CT = {
  "SSRI":           {bg:"#0f1830",color:"#7eb8f7",border:"#1a2848"},
  "SNRI":           {bg:"#0e1e30",color:"#4bbfe8",border:"#1a3040"},
  "Antidepressant": {bg:"#0e1e14",color:"#52bf82",border:"#183222"},
  "Anxiolytic":     {bg:"#1c1038",color:"#c27ee0",border:"#2c1a4c"},
  "SARI":           {bg:"#221630",color:"#b48ef5",border:"#302048"},
  "TCA":            {bg:"#1a1030",color:"#d4a8ff",border:"#281840"},
  "AED":            {bg:"#1e1610",color:"#e8c06a",border:"#302010"},
  "Antipsychotic":  {bg:"#1e0e20",color:"#e879f9",border:"#2e1230"},
  "Mood Stabilizer":{bg:"#0e1e28",color:"#5bcfd4",border:"#163040"},
  "Stimulant":      {bg:"#221206",color:"#ff9066",border:"#381800"},
  "NSRI":           {bg:"#101e30",color:"#60aaff",border:"#182e46"},
  "Pain":           {bg:"#1e0e0e",color:"#e05555",border:"#301414"},
  "Benzo":          {bg:"#1c1a0a",color:"#d4b832",border:"#2e2c10"},
  "Valproate":      {bg:"#1e1a08",color:"#d4cc50",border:"#302c10"},
};

const MEDS = [
  {id:"prozac",brandName:"Prozac",genericName:"fluoxetine",
   otherForms:"Prozac Weekly, Sarafem (for PMDD), oral solution — tastes like mint-flavored mouthwash. Really.",
   classes:["Antidepressant","SSRI"],
   approvedUses:["Major Depression (adults)","Obsessive-Compulsive Disorder","Panic Disorder","Bulimia Nervosa","Premenstrual Dysphoric Disorder (as Sarafem)"],
   offLabelUses:["Fibromyalgia","Arthritis","Chronic Fatigue","Multiple Sclerosis","Bipolar Depression","Lupus","Headaches","IBS","Premature Ejaculation"],
   pros:"Prozac's long half-life makes med compliance less of a big deal — hence the approval for depressed teenagers — and SSRI discontinuation syndrome is rarely a problem, if it happens at all.",
   cons:"The sexual side effects and weight gain, if it happens, can be pretty bad.",
   sideEffectsTypical:"The usual SSRI lineup: headache, nausea, dry mouth, sweating, sleepiness or insomnia, diarrhea or constipation, weight gain, loss of libido. Most will go away after a week or two, but weight gain and loss of libido might stick around. Or become permanent. Weight gain is a coin toss.",
   sideEffectsUncommon:"Rash, flu-like symptoms, anger/rage.",
   sideEffectsRare:"Bleeding gums, amnesia, anti-social reaction (oh come on, like we're not anti-social already), excessive hair growth, engorged breasts (a.k.a. porno boobs), involuntary tongue protrusion — according to the PI sheet, one 77-year-old woman stopped sticking her tongue out at everyone after they stopped giving her Prozac.",
   interestingStuff:"Prozac is not such a hot idea for anyone with diabetes — not because of potential weight gain, but because it messes with glycemic control. At 9.3 days, the active metabolite norfluoxetine has the longest half-life of any non-injected medication covered here. By Julien's formula it takes 45 days to fully clear your system. This data is based on a sample of two people, so it's probably about as accurate as most of the PK data published across teh intergoogles.",
   onset:"Anywhere from a couple days to over a month. Because of the long time to reach steady state, give Prozac a full two months.",
   dosage:"Depression: 20mg in the morning, increasing by 20mg after at least a week, max 80mg/day. OCD and Bulimia: same start, max 60mg/day. Panic: start at 10mg, work up to 20mg. Going above 20mg rarely helps. Crazymeds recommends starting at half the suggested dose.",
   howToStop:"Reduce by 10-20mg every 3-4 days, or more slowly. SSRI discontinuation syndrome is so rare with Prozac that it is used to wean people off SNRIs and other SSRIs. Comes in liquid form — switch to that and wean yourself off ml by ml.",
   halfLife:"9.3 days (active metabolite norfluoxetine). Fluoxetine itself: 1-4 days. About 45 days to fully clear.",
   steadyState:"Three to five weeks.",
   shelfLife:"Tablets: 3 years. Oral solution: 2 years."},

  {id:"celexa",brandName:"Celexa",genericName:"citalopram",
   classes:["Antidepressant","SSRI"],
   approvedUses:["Major depressive disorder (MDD)"],
   overseasUses:"In India, Ireland, Russia, Tunisia, Ukraine, the UK, and most of Europe: approved for depression, relapse prevention, and Panic Disorder with or without agoraphobia. In Argentina, Brazil, Estonia, Israel, and South Africa: add OCD to that list. In the Dominican Republic, Zalopram is also approved for alcoholism. In Taiwan: depression and anxiety.",
   offLabelUses:["Panic disorders with phobias","Combat PTSD","Social anxiety disorder","OCD","Bipolar depression","Psychotic depression (augmenting antipsychotics)","Severe hot flashes","PMDD","Chronic fatigue","Eating disorders: anorexia, binge eating, bulimia","IBS (mixed to poor)","Premature ejaculation"],
   offLabelDetail:"Like most SSRIs it fails at doing a damn thing for hoarding. Not only that, it can sometimes exacerbate the symmetry and hoarding forms of OCD. But Celexa is just fabulous for compulsive shopping. For IBS: one study looks promising, but another group calls bullshit on it — and one study title says it all: Citalopram is not Effective Therapy for Non-Depressed Patients with Irritable Bowel Syndrome. When it comes to off-label meds for IBS, it's either Paxil or a TCA. I especially like the specificity of this study: Salvage Use of Citalopram for Treatment of Fluoxetine-Resistant Premature Ejaculation in Recently Married Men. As well as: Panic attacks with spontaneous ejaculation successfully treated with citalopram and clonazepam.",
   onset:"Like all SSRIs, anywhere from a couple days to over a month. Literal 50% coin-toss for a positive response within four weeks. Two-in-three chance your depression stays away. Overall 60-70% chance it works.",
   dosage:"Start at 20mg/day, give it at least a week. Go up to 40mg if needed. 60mg probably will not work better due to QT prolongation risk. Crazymeds suggests starting at 10mg and going up by 10mg increments. If you feel like whaleshit on the bottom of the ocean, start at 20mg!",
   howToStop:"Reduce by 10-20mg every 6-8 days. The 35-hour half-life makes severe discontinuation syndrome less likely than most other SSRIs — Prozac is the only SSRI/SNRI with a longer one.",
   halfLife:"35 hours."},

  {id:"lexapro",brandName:"Lexapro",genericName:"escitalopram",
   classes:["Antidepressant","SSRI","Anxiolytic"],
   approvedUses:["Major depressive disorder (MDD) in adults and adolescents","Generalized anxiety disorder (GAD) in adults"],
   overseasUses:"Everywhere else in the world where you find Lexapro / Cipralex / escitalopram, it is approved to treat Social Anxiety Disorder and Panic Disorder with or without Agoraphobia, along with MDD and GAD. Cipralex is also approved to treat OCD in Argentina, Australia, Canada, Chile, Denmark, Sweden, Spain, New Zealand, and the UK.",
   offLabelUses:["The entire panic-anxiety spectrum, including Social Anxiety Disorder (SAnD), OCD, and PTSD","Bipolar depression"],
   onset:"Lexapro can start working within one week. You should still give it at least three weeks. Unless the side effects hit hard and fast.",
   likelihood:"If you have never taken an antidepressant before, and for all you and your doctor know serotonin is a big part of your problem, the odds are pretty damn good that Lexapro will help for MDD. Although the odds may not be statistically much better than Celexa, they both have better chances of working for MDD than all the other SSRIs, and most other antidepressants. Around a 60-75% chance of response and 50-70% chance of remission. The odds are similar for GAD.",
   dosage:"Lundbeck and Forest recommend 10mg once a day for adults and adolescents with MDD, adults with GAD, and just about anything else. That is it. Crazymeds: start at 5mg a day. Increase by 2.5 to 5mg a day after at least a week, and only if needed.",
   howToStop:"Decrease by 5mg every week. On 10mg? Take 5mg for a week, then stop. Try 2.5mg a day if you really need to. If you experience severe SSRI discontinuation syndrome that is not going away, talk to your doctor about a prescription for fluoxetine or the oral solution for a slow taper.",
   halfLife:"27-32 hours."},

  {id:"zoloft",brandName:"Zoloft",genericName:"sertraline",
   classes:["Antidepressant","SSRI","Anxiolytic"],
   approvedUses:["Major Depressive Disorder (MDD) — approved December 30, 1991","OCD in adults and children","Panic Disorder (July 1997)","PTSD — approved December 7, 1999 (fitting date)","PMDD","Social Anxiety Disorder"],
   offLabelUses:["GAD — although the numbers are not all that great in the studies. Which probably explains why Zoloft was never approved for GAD.","Major Depression with various chronic heart problems including acute myocardial infarction, unstable angina, Acute Coronary Syndrome, and depression/panic after a heart transplant. In spite of the clever acronym (SADHART: Sertraline AntiDepressant Heart Attack Randomized Trial) and having one of the lowest rates of cardiovascular side effects of all antidepressants, Zoloft did not really help all that much.","Eating disorders: binge eating, bulimia, anorexia nervosa (although the success seems due to Zoloft's effect on depression and OCD, and the anorexia was an expression of those conditions), sleep eating (while not as effective as Topamax, the side effects suck a lot less)","Menopause symptoms, especially hot flashes. Sometimes it works. Sometimes it does not, or makes it worse. Basically it is an equal chance that Zoloft will make it better, worse, or do nothing. And if it does do anything, it is just as likely to be a big change or a small change."],
   onset:"Like all SSRIs anywhere from a couple days to over a month, although you should feel more awake and energetic in two to four days. If you do not feel any positive benefit after four to six weeks, talk to your doctor about either another SSRI or trying a med that hits another neurotransmitter.",
   likelihood:"Zoloft is better for conditions in the anxiety spectrum than those in the depression spectrum. Which is funny given how agitated and nervous it makes a lot of people feel. Zoloft does work well for depression defined by sleeping too much, eating too much, and withdrawing from the world.",
   dosage:"Pfizer recommends 50mg once a day for MDD and OCD. 25mg to start for PTSD, panic, and social anxiety, increasing to 50mg after a week. Crazymeds: start at 12.5-25mg and wait at least two weeks before increasing. And increase only if you need to.",
   howToStop:"Reduce by 12.5-25mg each week. If discontinuation syndrome is harsh: get the oral solution, or bridge to 20mg fluoxetine for two weeks, then 10mg for two more.",
   halfLife:"26 hours."},

  {id:"paxil",brandName:"Paxil",genericName:"paroxetine",
   classes:["Antidepressant","SSRI","Anxiolytic"],
   approvedUses:["MDD — IR and CR","Panic Disorder — IR and CR","Social Anxiety Disorder — IR and CR","OCD — IR only","GAD — IR only","PTSD — IR only","PMDD — CR only"],
   offLabelUses:["Paxil CR for OCD, GAD, and PTSD","Hoarding","Social anxiety with alcohol abuse","Headaches","IBS","Tourette Syndrome","Premature ejaculation (I wonder why)","Hot flashes in men on androgen ablation therapy for prostate cancer","Taijin kyofusho","Lewy Body Dementia","Hypochondriasis"],
   onset:"Two to four weeks, sometimes six. Not a great antidepressant, but a pretty decent med for the anxiety alphabet soup. Especially good for GAD, Social Anxiety Disorder (though not as good as Zoloft), PMDD, and panic disorders without agoraphobia.",
   dosage:"IR: start 10mg (Panic) or 20mg (everything else). Increase 10mg/week to target: 40mg for OCD/Panic, 30mg average for MDD, 50mg max. CR: start 25mg for MDD, 12.5mg for everything else. Crazymeds: start at 5-10mg IR or 12.5mg CR. Try taking it at night first.",
   howToStop:"Very, very slowly and very, very carefully. 5-10mg/week for IR, 12.5mg/week for CR. Ask your doctor for 5 and 10mg IR tablets even if you take CR, and a week worth of Prozac as a safety net.",
   halfLife:"21 hours."},

  {id:"cymbalta",brandName:"Cymbalta",genericName:"duloxetine",
   classes:["Antidepressant","SNRI","Anxiolytic","Pain"],
   approvedUses:["Major Depressive Disorder (MDD)","Generalized Anxiety Disorder (GAD)","Fibromyalgia","Diabetic Peripheral Neuropathic Pain (DPNP)","Chronic Musculoskeletal Pain (CMSP)"],
   overseasUses:"Stress urinary incontinence in women in the EU (trade name Yentreve).",
   offLabelUses:["Stress urinary incontinence in women, and possibly men as well","ADD/ADHD","Smoking cessation","Migraines and other headaches"],
   onset:"Psychiatric: between three days and a month, average about two weeks. For DPNP and CMSP: like TCAs and any other med with a positive effect on norepinephrine, you could start feeling some relief anywhere from a couple of days to two to three weeks. For fibromyalgia — how long does it take for anything to start working on fibro?",
   likelihood:"As with most SNRIs, your chances are pretty damn good that Cymbalta will work for depression and anxiety spectrum disorders. They are far less likely to poop-out than SSRIs. For DPNP and CMSP: the odds are decent — about as good as a TCA with fewer side effects, which basically makes it a first-choice coin-toss. For fibromyalgia: who the fuck knows. Even opioids may as well be placebos for a lot of people, and those folks are the Crazymeds demographic. Meds tend to poop-out (tachyphylaxis) a lot.",
   dosage:"For MDD: start at 40-60mg a day, taken in one or two doses. Target is 60mg a day, max 120mg. For GAD: start at 60mg once a day, max 120mg. Crazymeds suggests starting at 20mg a day and increasing by 20mg as required. Also suggests taking Cymbalta twice a day due to its short half-life — discuss that with your doctor and pharmacist. The only real side effect to taking two 30mg capsules instead of one 60mg is how much it costs. Your doctor will probably be OK with it. Your insurance company might have a different idea.",
   howToStop:"The manufacturer says: A gradual reduction in the dose rather than abrupt cessation is recommended whenever possible. And that is literally it. What recommendations? Crazymeds says: very slowly. Reduce by 10-20mg a day each week. If 20mg per week is too fast, try to get samples from your doctor so you can step down by 10mg until you hit 20mg. Cymbalta comes in 20, 30, and 60mg capsules. Now do the math. Once at 20mg, stop after one or two weeks at that dosage. If discontinuation symptoms do not go away, ask your doctor for a Prozac prescription.",
   halfLife:"12 hours."},

  {id:"trazodone",brandName:"Desyrel",genericName:"trazodone",
   otherForms:"Orange-flavored solution",
   classes:["Antidepressant","SARI"],
   approvedUses:["Major depressive disorder, with or without anxiety."],
   offLabelUses:["Insomnia / you are getting sleepy","Panic/Anxiety","Bipolar Depression","Chronic Fatigue","Fibromyalgia / your eyes are getting heavy","SSRI-induced sexual dysfunction (mixed results — generally takes over 200mg a night before it does anything for your plumbing)","Arthritis","Lupus","IBS","Eating Disorders"],
   pros:"The antidepressant you need if you have insomnia combined with mild depression and/or anxiety.",
   cons:"You might just sleep a little too well.",
   sideEffectsTypical:"Sleepiness. Headache. Sleepiness. Dizziness. Sleepiness. Nausea. Sleepiness. Dry mouth. Sleepiness. Blurry vision. Sleepiness. Did I mention you will be tired? Most everything but the sleepiness will go away within a week or two. Being an antihistamine approaching Zyprexa-level of potency is why trazodone knocks you out until next Tuesday.",
   sideEffectsUncommon:"Low blood pressure, weight gain. General cardiac weirdness — do not use without cardiologist clearance if you have heart history. Vivid or unusual dreams. Sometimes a nasty hangover the first few days.",
   sideEffectsRare:"Priapism so bad that surgical intervention was required to get rid of the unending hard-on. Bob Dole should have tried trazodone to go macho a macho with the president instead of relying on Viagra. Women too: clitoral priapism. Also persistent genital arousal disorder and spontaneous orgasms in an elderly postmenopausal woman. There is a paper describing the corrective surgery. It has pictures. Graphic pictures.",
   interestingStuff:"Best taken with food. The major metabolite of trazodone is mCPP, one of the drugs sold as ecstasy in the 90s. It is a hallucinogen that gives you a migraine. Why anyone thought that was a party drug is beyond comprehension.",
   onset:"Two weeks for depression. One to two nights for sleep.",
   dosage:"Start at just 50mg if you want to wake up the next morning. If no response after a week, go to 100mg. Work up to 150mg after two weeks, then wait a month before further increases. Max 400mg/day.",
   howToStop:"Reduce by 50-100mg every 3-5 days.",
   halfLife:"5-9 hours.",
   shelfLife:"5 years.",
   comments:"Trazodone is the official antidepressant of Sleepy-bye Land. Rarely prescribed as monotherapy for depression anymore. If you take an SSRI and still have residual anxiety and insomnia, trazodone might be a good cocktail addition. Do not combine with Seroquel if you want to see daylight anytime this week."},

  {id:"viibryd",brandName:"Viibryd",genericName:"vilazodone",
   classes:["Antidepressant","SSRI"],
   approvedUses:["Major Depressive Disorder (MDD) — approved January 21, 2011"],
   offLabelUses:["Anxiety"],
   onset:"At least a month, which surprises me. Given how Viibryd works, I expected more people to respond sooner.",
   likelihood:"My now-retired doctor said he had surprisingly good results from Viibryd. People are reasonably happy with it. It has moved up from coin toss to more likely to work than not. Strong stomach required — GI problems are a real issue. If your doctor thinks an SSRI is the way to go based on something more than the algorithm of give them Celexa first, Viibryd is a pretty good choice.",
   dosage:"Start at 10mg once daily for 7 days, then 20mg for 7 days, then 40mg (target dose). Take with food — at least some. If side effects are harsh at 40mg and 20mg was starting to do something, talk to your doctor about staying at 20mg.",
   howToStop:"Withdraw the same way you titrated: 40mg to 20mg for 7 days, then 10mg for 7 days. Some people need 40 to 30 to 20 to 10."},

  {id:"wellbutrin",brandName:"Wellbutrin",genericName:"bupropion",
   classes:["Antidepressant"],
   approvedUses:["Major depressive disorder","Seasonal Affective Disorder (XL only)","Smoking cessation (as Zyban)"],
   offLabelUses:["Weight loss","Bipolar depression","ADD/ADHD","Crohn's disease","Restless leg syndrome","Pathological gambling","Treating SSRI/SNRI-induced sexual dysfunction"],
   onset:"Usually two to three weeks. Meds that work on dopamine tend to act quickly so positive results could come within a few days. Pretty freaking good odds of working. Sometimes a little too well.",
   dosage:"GSK says start at 150mg/day, increase to 300mg/day (150mg twice daily) by day 4. Crazymeds: wait at least 5-7 days before going up. Max: 400mg/day. The only quibble is raising the dosage after only three days — assuming you have the luxury of not feeling like killing yourself every hellish hour you are awake.",
   howToStop:"Reduce by 100-150mg/day every 5-7 days. Reports of unusual problems from stopping abruptly, including mania and dystonia.",
   comments:"Wellbutrin has the well-deserved reputation as the skinny, sexy, happy drug. It is an NDRI — norepinephrine and dopamine reuptake inhibitor. Not associated with weight gain or sexual dysfunction. The US and Canada are the only countries where bupropion is approved as an antidepressant; everywhere else it is just Zyban for smoking cessation."},

  {id:"effexor",brandName:"Effexor",genericName:"venlafaxine",
   classes:["Antidepressant","SNRI"],
   approvedUses:["Major Depressive Disorder (MDD)","Generalized Anxiety Disorder (GAD)","Social Anxiety Disorder","Panic Disorder"],
   overseasUses:"Maintenance therapy for MDD in France. PTSD in the Netherlands.",
   offLabelUses:["Bipolar depression (dodgy to decent for bipolar 2, generally not a good idea for bipolar 1)","Depression in Parkinson's","Hot flashes from breast/prostate cancer therapy and menopause","Migraine prevention","Tension-type headaches","Fibromyalgia (did not do shit for pain in one randomized trial, but still effective for other fibro symptoms)","Chronic nerve pain: shingles, diabetic neuropathy, phantom limb","Osteoarthritis (freaking hilarious given the data on SNRIs and bone fractures)","Chronic Fatigue","Adult ADD/ADHD","IBS","Eating disorders"],
   onset:"Three weeks to a month. Effexor reviews form a U-curve — most people love it or hate it. Wyeth finally owned up to the fact that discontinuation syndrome exists and can be really fucking awful. Score one for Internet-based support groups making a lot of noise about it.",
   dosage:"XR (the default): start at 37.5-75mg/day with food. Do not go above 75mg/day unless it is doing something positive after a month. Then increase in 37.5-75mg increments, at least a week between increases. Max: 375mg/day, or 450mg if you and your doctor have the balls for it.",
   howToStop:"Reduce by 37.5mg/day every week. If maxed at 375mg, that is potentially 10 weeks. For the final 37.5mg: if brain zaps persist, try every other day, switch to IR venlafaxine, or use 10mg fluoxetine for two weeks. Last resort: liquid Prozac — somewhere between really good mint-flavored mouthwash and so-so peppermint schnapps.",
   halfLife:"5 hours (IR), about 11 hours (XR)."},

  {id:"remeron",brandName:"Remeron",genericName:"mirtazapine",
   classes:["Antidepressant","TCA"],
   approvedUses:["Major depressive disorder"],
   offLabelUses:["Sleep disorders/insomnia","Bipolar depression","Panic/anxiety","Chronic fatigue","Fibromyalgia","Auditory hallucinations as acoustic aura in migraine","Musical hallucinations after cochlear implantation"],
   onset:"For depression: one to two weeks — tetracyclics are fast. For sleep: usually the first night. If Remeron does not make you tired at 15mg, do not bother.",
   dosage:"Initial: 15mg once a night. If no improvement in two weeks, increase to 30mg. Still not feeling better a month later, go to 45mg. Some enlightened doctors start at 7.5mg and titrate in 7.5mg increments — Crazymeds is fully on board with that.",
   howToStop:"Reduce by 7.5-15mg/day every week.",
   halfLife:"20-40 hours.",
   comments:"Adding Remeron to an SSRI to deal with sexual side effects can work. The downside: as long as whoever loves you sees you for your true self and does not care that you weigh twice as much as you used to."},

  {id:"luvox",brandName:"Luvox",genericName:"fluvoxamine",
   otherForms:"Luvox CR (controlled extended-release capsules)",
   classes:["Antidepressant","SSRI","Anxiolytic"],
   approvedUses:["Obsessive-Compulsive Disorder (the only SSRI approved only for OCD in the US — it is an antidepressant literally everywhere else in the world)"],
   offLabelUses:["Depression","Panic","Generalized social anxiety","PMDD","Combat PTSD","Musical hallucinations in acquired deafness"],
   pros:"Proven as the best med for OCD. Generally less agitating than other SSRIs. Tends to work faster than other SSRIs, except Lexapro.",
   cons:"Short half-life makes discontinuation difficult. The drug-drug interactions it has are catastrophic — Luvox + Cymbalta effectively triples your Cymbalta dosage.",
   sideEffectsTypical:"The usual for SSRIs: headache, nausea, dry mouth, sweating, sleepiness or insomnia, GI problems, weight gain, loss of libido.",
   sideEffectsRare:"Agoraphobia, fecal incontinence, priapism. Time to stay inside and make the freakiest scat video ever!",
   interestingStuff:"Mixing caffeine and Luvox can be intensely unpleasant. Your one cup of coffee suddenly becomes five cups lasting six times as long. Most regular coffee drinkers can probably manage one cup a day. Probably. If you smoke, you metabolize Luvox 25-60% faster. Ironically, nicotine is an effective treatment for OCD — so you'd be boosting one treatment while clearing the other faster.",
   onset:"Anywhere from a couple days to over a month.",
   dosage:"IR: 50mg at bedtime, increasing by 50mg every 4-7 days, max 300mg/day. Crazymeds: start at 25mg. CR: stuck starting at 100mg since it only comes in 100mg and 150mg capsules.",
   howToStop:"Reduce by 25-50mg every 4 days. If harsh, switch to IR fluvoxamine and taper 12.5-25mg/day.",
   halfLife:"15.6 hours. Out of your body in about 80 hours.",
   shelfLife:"3 years.",
   comments:"Luvox CR originally had approval for social anxiety disorder too, then the FDA pressured Jazz Pharmaceuticals to voluntarily withdraw the indication after some clinical trial data became public. So it goes."},

  {id:"tofranil",brandName:"Tofranil",genericName:"imipramine",
   otherForms:"Tofranil-PM (imipramine pamoate — once daily), IM injection, oral solution",
   classes:["Antidepressant","TCA"],
   approvedUses:["Depression","Childhood enuresis (you know, never being able to hold it in)"],
   offLabelUses:["Neuropathic and chronic pain","Somatoform pain disorder","Migraines","Combat PTSD","Panic/Anxiety when benzodiazepines are no longer indicated","Narcolepsy-cataplexy with loss of sphincter control — Best. Off-label. Use. Ever!","Schizophrenia (what imipramine was originally developed to treat before it failed the psychosis part but did great for everything else)","Parkinsonism","Chronic alcoholism"],
   pros:"Tofranil has been around since forever, so it is cheap as dirt and doctors should be familiar with it.",
   cons:"Tofranil has been around since forever, so older doctors are too willing to reach for it first, and younger doctors have never heard of it.",
   sideEffectsTypical:"Anticholinergic fun: headache, nausea, sweating, dry mouth, sleepiness or insomnia, constipation, urinary hesitancy, blurry vision. Sedation, constipation, dry mouth, and urinary hesitancy are most likely to stick around. Weight gain is common.",
   sideEffectsRare:"Toxic megacolon (Ogilvie's syndrome). Hyperpigmentation. Proneness to falling. Transient blindness.",
   onset:"TCAs generally take 14-28 days to be fully effective.",
   dosage:"Initial dose for outpatients: 75mg/day at bedtime. Can go up to 150mg/day. Crazymeds suggests starting at 25-50mg, or even 10mg since they make 10mg tablets. Hospitalized patients can go to 300mg/day, but be really careful above 200mg.",
   howToStop:"Reduce by 25-50mg every five days. TCAs do not have discontinuation syndrome like SSRIs.",
   halfLife:"4-20 hours (non-linear). Five days minimum for everything to clear.",
   steadyState:"19 days.",
   shelfLife:"Tablets: 3 years.",
   comments:"Developed in 1956. Originally designed as an antipsychotic. It failed the psychosis part but did great for depression. Things worked out."},

  {id:"asendin",brandName:"Asendin",genericName:"amoxapine",
   classes:["Antidepressant","Antipsychotic","TCA"],
   approvedUses:["Neurotic or reactive depressive disorders"],
   overseasUses:"Endogenous and psychotic depressions.",
   offLabelUses:["Schizophrenia (increasingly reclassified as an atypical antipsychotic by Stahl and other pharmacologists based on efficacy and mechanism of action)"],
   onset:"One to two weeks. You will feel something within a couple of days.",
   dosage:"Initial dose: 50mg two to three times daily. After 2-3 weeks may be increased to 100mg two to three times daily. Maintenance: 200-300mg at bedtime. Anything above 300mg needs to be split into two or three doses. Inpatients up to 600mg/day. Given the antipsychotic-related side effects, seriously discuss any increase above 200mg.",
   howToStop:"Reduce by 50-100mg/week. Relatively painless.",
   halfLife:"8 hours (amoxapine). Active metabolite 8-hydroxyamoxapine: 30 hours.",
   comments:"While officially a tetracyclic antidepressant, Asendin is increasingly classified as a second-generation atypical antipsychotic by Stahl and other pharmacologists. It is essentially two drugs in one. A feature or a bug depending entirely on your situation."},

  {id:"buspar",brandName:"BuSpar",genericName:"buspirone",
   classes:["Anxiolytic"],
   approvedUses:["Generalized Anxiety Disorder (GAD)"],
   offLabelUses:["PTSD","Other anxiety disorders","Smoking cessation","Depression (adjunctive with SSRIs/SNRIs)","Treatment-resistant depression","SSRI-induced sexual dysfunction","Bruxism (teeth grinding / jaw clenching)","SSRI poop-out (tachyphylaxis)"],
   onset:"Somewhere between two to three days (Bristol-Myers estimate) and two to three weeks (more realistic). BuSpar seems immensely variable in how it hits people. Low side effects and non-addictive — worth a stop on the med-go-round.",
   dosage:"Starting dose: 5mg three times per day. Give BuSpar at least a week between dose step-ups. Standard dosages are 20-30mg/day. Maximum: 60mg/day.",
   howToStop:"Step down by 5mg every other day. If it did absolutely nothing useful, 10mg at a time.",
   halfLife:"2-3 hours."},

  {id:"neurontin",brandName:"Neurontin",genericName:"gabapentin",
   classes:["AED","Pain"],
   approvedUses:["Add-on for partial epileptic seizures in adults and children (IR only)","Postherpetic neuralgia (shingles — AKA the reason parents should not take their children to chicken pox parties)","Restless Leg Syndrome (ER Horizant only)"],
   offLabelUses:["Neuropathic pain: HIV/AIDS neuropathy, phantom limb pain","Anxiety spectrum disorders","Hiccups","Bipolar Disorder (placebo with side effects)","Migraines (also basically placebo)","Depression","PTSD","Sleep Disorders","MS","Chronic Fatigue","Menopausal Symptoms","Cocaine Abuse"],
   offLabelDetail:"There was one big-ass settlement against Parke-Davis (acquired by Warner Lambert, acquired by Pfizer) for pushing Neurontin on doctors for inappropriate uses. Remember to check who paid for the studies, as it tends to make results 3.6 times more favorable for the company paying (Yale study). Does anybody still take Neurontin for epilepsy? I have not been able to find many reports from this century.",
   onset:"Should start doing something a couple days after reaching 900mg/day. For neuropathic pain: 2 out of 3 to 3 out of 4 chance of some positive effect.",
   dosage:"Shingles: start 300mg on day 1, 600mg on day 2, 900mg on day 3, up to 1800mg/day as needed. Epilepsy: 900mg/day in three divided doses. Stop increasing when symptoms stop.",
   howToStop:"Reduce by 300mg every 3-4 days. Only worry about rapid discontinuation if you have seizure risk factors.",
   comments:"For actual nerve pain — shingles, HIV neuropathy, phantom limb — genuinely good. For bipolar disorder: basically a placebo with a side effect profile. Ditto migraines."},

  {id:"lamictal",brandName:"Lamictal",genericName:"lamotrigine",
   classes:["AED","Mood Stabilizer","Antidepressant"],
   approvedUses:["Bipolar 1 — maintenance treatment only (not initial therapy)","Epilepsy — maintenance, by itself or with other meds"],
   offLabelUses:["Initial therapy for bipolar disorder","Bipolar 2 (generally considered the best drug on the market for bipolar 2)","Treatment-resistant depression / misdiagnosed bipolar 2","SUNCT syndrome headaches"],
   onset:"For depression: sometimes within 2-4 days at 25mg, average 100mg (2-4 weeks to reach). For epilepsy: usually at 200-400mg/day. For mood stabilization: about a month.",
   dosage:"Lamictal has the most complicated dosing instructions of any crazy med. They take up 9 pages of the PI sheet. GSK has three different starter packs because Lamictal is such a freaking diva about drug-drug interactions. Find a med that works, get stable, then transition to Lamictal using the appropriate starter pack. Target for bipolar: 200mg/day (100mg twice daily).",
   howToStop:"GSK recommends at least 50% reduction per week over 2 weeks. Crazymeds: decrease at the same rate you increased. For Stevens-Johnson Syndrome (the Rash): stop immediately, take Benadryl, get more of any other AEDs you are already taking.",
   halfLife:"24-35 hours alone. Up to 70 hours with valproate. 12-15 hours with enzyme-inducing AEDs.",
   comments:"Probably the best drug on the market for bipolar 2. The downside: must be added slowly to avoid Stevens-Johnson Syndrome. Start too fast and you risk a life-threatening rash. Unlike most crazy meds, Lamictal is approved only as maintenance therapy, not initial treatment. The skinny, sexy, happy drug for mood disorders — rarely causes weight gain or sexual dysfunction."},

  {id:"depakote",brandName:"Depakote",genericName:"divalproex sodium",
   otherForms:"Depakote ER (extended-release), sprinkles",
   classes:["AED","Mood Stabilizer","Valproate"],
   approvedUses:["Epilepsy — adults and children aged 10+","Acute Bipolar mania","Migraines"],
   offLabelUses:["Other epilepsy types","Borderline Personality Disorder","PTSD (surprisingly effective for the depression component)","OCD","Alcoholism relapse and delirium tremors","Cocaine dependence","Anxiety","Cyclothymia","Sleep consolidation in PLMD","Schizophrenia and Schizoaffective Disorder","Alzheimer's-related disorders"],
   pros:"Proven effective for wide spectra of epilepsies and bipolar disorders. Been around so long that long-term effects are well known.",
   cons:"The side effects suck donkey dong. The valproates are among the harshest meds to take. Everyone — read: the bipolar — hates them so much they have given the entire class of AEDs a bad name.",
   sideEffectsTypical:"Instant old age. You will get fat, bald, tired, confused, dry and itchy skin, uninterested in sex, unable to hold your liquor, lose your teeth, and whatever you do not puke will give you heartburn and/or the runs. Most GI problems are temporary. You cannot take Pepto-Bismol — its active ingredient is related to aspirin, and aspirin and valproates is a big no-no. Sometimes a really big no-no. Same goes for Alka-Seltzer.",
   sideEffectsRare:"Irreversible deafness and bone pain. I told you you would get instantly old.",
   interestingStuff:"Known as Depabloat. Regular blood work is mandatory. Take with food. Avoid aspirin — use Aleve or Tylenol instead. Depakote depletes vitamin D, folic acid, and maybe calcium. Generic Depakote was not available until 2008; if you were given generic valproic acid before that and told it was generic Depakote, you got the wrong drug.",
   onset:"Get to the therapeutic blood level range (50-100 for epilepsy, 50-125 for bipolar), then hope your brain responds. There is no definite dosage where you can write here is where you should notice effect.",
   dosage:"For severe mania, dosing up to 60mg/kg/day is recommended. What do they think we are, crazy or something? If you are so high on your own brain that Charlie Sheen thinks you have gone too far and need to calm down, shut the fuck up and take your meds. For everyone else: start at 500mg/day and work up more slowly.",
   howToStop:"Slowly. Reduce by 250-500mg every 5-7 days. Abbott's discontinuation instructions are essentially: be freaking careful.",
   halfLife:"9-16 hours. Out of your system in 2-3 days.",
   shelfLife:"3 years.",
   comments:"Effective for classic Bipolar 1, mixed states, rapid cycling. Usually sucks for bipolar depression — that is Lamictal's territory. The harsh reputation mostly comes from people given generic valproic acid instead of actual Depakote."},

  {id:"stavzor",brandName:"Stavzor",genericName:"valproic acid (delayed release)",
   otherForms:"Depakene (immediate-release valproic acid) — same drug, rougher ride",
   classes:["AED","Mood Stabilizer","Valproate"],
   approvedUses:["Acute bipolar mania","Complex partial seizures and absence seizures","Adjunctive therapy for multiple seizure types","Migraine prophylaxis"],
   offLabelUses:["All Depakote off-label uses apply","Fibromyalgia and neuropathic pain","Schizophrenia and Schizoaffective Disorder","Social anxiety disorder","Panic disorder","Various cancers (valproic acid being evaluated as a histone deacetylase inhibitor in chemotherapy)"],
   pros:"Proven effective for wide spectrum of epileptic disorders, migraines, and bipolar mania.",
   cons:"The side effects suck donkey dong. The valproates are among the harshest commonly-prescribed meds.",
   sideEffectsTypical:"Same as Depakote: instant old age, GI disasters, weight gain, hair loss. You cannot take Pepto-Bismol. Stavzor's capsules look exactly like vitamin E and fish oil supplements. Easy to mix up.",
   sideEffectsRare:"Onychomadesis (your fingernails and toenails fall off and do not grow back). Fanconi syndrome (constant peeing). These mostly happen to children or with overdoses.",
   onset:"Bipolar mania: a few days to two weeks. Bipolar depression: anywhere from a month to never. Epilepsy: about two weeks.",
   dosage:"Stavzor's main selling point: the pill will not choke a horse like Depakote. Start at 250-500mg/day and increase by 125-250mg every 3-4 days. Minimum effective blood level for bipolar lowered to 50 mcg/mL — you may need less than Depakote.",
   howToStop:"Reduce by 250-500mg every 5-7 days.",
   halfLife:"9-16 hours.",
   shelfLife:"3 years."},

  {id:"topamax",brandName:"Topamax",genericName:"topiramate",
   classes:["AED","Pain"],
   approvedUses:["Epilepsy — by itself or with other meds","Migraines","Qsymia (topiramate + phentermine) for obesity"],
   offLabelUses:["Bipolar disorder (works best for rapid cycling, or with comorbid substance abuse, bulimia, or PTSD)","Eating disorders — especially sleep eating (more effective than Zoloft, side effects suck more)","Alcoholism","PTSD","Weight loss (especially med-induced weight gain)","Pathological gambling","Exploding Head Syndrome (the sleep disorder, not a metaphor)"],
   onset:"Migraines: one day to a month. At least half the people who take Topamax for migraines have the number of migraine days cut in half. Around 40% take 50mg/day or less — at that dosage Topamax does not suck at all. If you experience paresthesia (pins and needles in extremities), that is a good sign.",
   dosage:"Migraines: start 25mg at night, increase by 25mg/week. Stop at whatever dosage works — Crazymeds and OrthoMcNeil finally agree that the correct target dosage is the one where your symptoms stopped. Epilepsy: 50mg/day increasing to target of 400mg/day.",
   howToStop:"Reduce by 25-50mg/day every week.",
   comments:"One good thing about Topamax: if you try something else because the side effects are too much, it usually works just as well the second time around. The stupids — cognitive side effects — are the worst. There are buttons that say I Forgot Why I Take Topamax. That is not a joke."},

  {id:"lithium",brandName:"Lithium",genericName:"lithium carbonate",
   otherForms:"Eskalith-CR, Lithobid, lithium citrate syrup (remarkably good-tasting — better than most liquid crazy meds)",
   classes:["Mood Stabilizer","Antipsychotic"],
   approvedUses:["Acute and chronic bipolar mania"],
   offLabelUses:["Cluster Headaches (appears not to be that effective over the years)","Augmenting antidepressants for refractory depression","Graves Disease (hyperthyroidism)"],
   pros:"The gold standard for classic bipolar 1. Inexpensive. Consistent. Available around the world. Although it has fallen out of fashion, lithium is still the best drug available for classic bipolar 1.",
   cons:"The side effects suck donkey dong. Regular blood tests required. Changes in other meds, diet, or even the seasons can require dosage adjustments.",
   sideEffectsTypical:"Weight gain, tremor (sometimes bad enough to require a beta blocker), and acne. It will be just like two weeks before the Junior Prom and you still do not have a date.",
   sideEffectsUncommon:"Hair problems. Food may not taste the same — often food without salt tasting salty, or everything having a metallic taste as if kept in old tin cans for a week. Edema. Cognitive dulling.",
   sideEffectsRare:"Anorexia, loss of sensation in limbs, inability to fully move limbs. Those wacky adolescent fantasies about becoming a Barbie doll — lithium can make them happen!",
   interestingStuff:"Lithium is not really metabolized — it hits your brain as-is and is flushed out via your kidneys. You really need to drink 2.5-3 quarts of fluids a day. NSAIDs including ibuprofen, naproxen, and Celebrex can significantly raise lithium levels. Combining Prozac and lithium can cause unpredictable serum levels.",
   onset:"First reach the therapeutic range of 0.6-1.2, then find where in that range you have the best results (which can vary throughout the year), then give it a couple weeks. It can literally take a couple years to figure out if lithium is going to be the drug for you.",
   dosage:"It is all about blood serum levels. Good doctors take into account your age, weight, medication history, and just how freakin manic you are. Start at 450mg/day for controlled-release versions, 300mg for immediate release. Get a blood level test after a week.",
   howToStop:"Reduce by 300mg every 5-6 days.",
   halfLife:"About 24 hours. Clears your system in around five days.",
   steadyState:"Usually a week.",
   shelfLife:"Lithium carbonate tablets: 5 years. Lithium citrate syrup: 2 years, 6 months after opening."},

  {id:"abilify",brandName:"Abilify",genericName:"aripiprazole",
   classes:["Antipsychotic","Mood Stabilizer","Antidepressant"],
   approvedUses:["Schizophrenia in adults and adolescents","Bipolar disorder in adults and children over 10","Add-on to antidepressants for depression in adults","Irritability associated with Autistic Spectrum Disorder in pediatric patients","Psychomotor agitation associated with Schizophrenia or Bipolar Mania"],
   offLabelUses:["Schizoaffective disorder","Bipolar depression","Monotherapy for depression-spectrum disorder","Delusional disorders without psychoses","OCD","Parkinson's"],
   onset:"Faster than Seroquel, slower than most other atypical antipsychotics: 3-7 days. Given its activating nature, Abilify is probably more likely to work as an add-on than as monotherapy. One study shows 5mg/day takes 3-5 weeks to start working for schizophrenia, and only enough better than placebo to squeak through FDA approval. That is Seroquel territory of taking forever.",
   dosage:"Otsuka and BMS recommend starting at the target dosage: 10-15mg once daily for schizophrenia, 15mg for bipolar monotherapy. Max: 30mg/day. Wait at least two weeks before increasing. For add-on to an antidepressant: start at 2-5mg/day, work up to 5-10mg/day, max 15mg/day. Crazymeds: if not crazy enough to be hospitalized, follow the add-on instructions even if using it by itself.",
   howToStop:"With its long half-lives, Abilify is a lot easier to discontinue than most meds. Reduce by 5mg every 5-7 days.",
   halfLife:"75-146 hours (aripiprazole). Active metabolite dehydro-aripiprazole: 94-107 hours. Effectively the longest half-life of any atypical antipsychotic."},

  {id:"risperdal",brandName:"Risperdal",genericName:"risperidone",
   classes:["Antipsychotic","Mood Stabilizer"],
   approvedUses:["Schizophrenia in adults and adolescents","Bipolar 1 in adults, children and adolescents"],
   offLabelUses:["Augmenting SSRIs for OCD and/or major depression","Panic/Anxiety"],
   pros:"Stops the rage induced by a dysphoric mania or mixed state like nothing else, in anywhere from an hour to the next day, without necessarily knocking you out.",
   cons:"Highest rate of EPS and TD of any atypical antipsychotic. At dosages required for schizophrenia and bipolar it frequently does a number on your hormones.",
   sideEffectsTypical:"Headache, nausea, dry mouth, constipation, sleepiness and lethargy or insomnia and way too much energy. Most go away within a couple of weeks.",
   sideEffectsUncommon:"Loss of libido, swollen breasts, unexpected lactation — especially unexpected when it happens to guys. Currently the worst AAP when it comes to movement disorders.",
   sideEffectsRare:"Rabbit Syndrome. Duck Syndrome! Rabbit Syndrome! Duck Syndrome! Sorry. Also discolored feces and increased pigmentation.",
   interestingStuff:"Risperdal is sort of like Haldol on steroids. The potent D2 along with 5HT2A and norepinephrine blockades explain why Risperdal will give you porno boobs and make you shake like an epileptic marionette. Best known for: leaky tits. Young or old, male or female, anyone taking Risperdal — especially more than 4mg/day — has a good chance of lactating. Risperdal is metabolized to create the drug that actually does something, available as Invega (predigested Risperdal).",
   onset:"You will feel something the next day. Within 5-6 days you should have a decent idea if it is going to work.",
   dosage:"Schizophrenia: start 2mg/day, increase 1-2mg/day until reaching 4mg/day. Can go to 8mg/day. Bipolar: start 2-3mg/day, increase 1mg/day to target of 1-6mg/day. Crazymeds: if not very crazy, try 0.25-0.5mg and increase by 0.25mg every 2-4 days.",
   howToStop:"Reduce by 0.25-0.5mg every 4-5 days.",
   halfLife:"21 hours. Clearance: 4-6 days.",
   comments:"I love Risperdal, and I miss taking it. I still keep some around for emergencies. If worse came to worst, I would take it again, TD be damned. I would rather permanently look like an owl blinking Morse code, and whose tongue is sending out its own lewd messages, than deal with the crazy I went through in 2002."},

  {id:"seroquel",brandName:"Seroquel",genericName:"quetiapine",
   classes:["Antipsychotic","Mood Stabilizer","Antidepressant","Anxiolytic"],
   approvedUses:["Schizophrenia in adults and adolescents","Acute depressive episodes in bipolar disorder","Acute manic episodes in bipolar I","Maintenance treatment of bipolar I","Adjunctive therapy with antidepressants in MDD (XR only)"],
   offLabelUses:["Insomnia (best at 25-100mg at night; Seroquel works best for sleep if you are crazy)","GAD (FDA found it effective but side effects suck too much compared to existing options)","Parkinson's","Treatment-resistant depression","Anxiety"],
   offLabelDetail:"Seroquel vs. Paxil for GAD: Seroquel works better and faster. You can take Seroquel and be fat, horny, lazy, and maybe shaky, or take Paxil and wait for it to work while never wanting or being able to have sex. You can tell AstraZeneca was concerned about weight gain given the phrase in their materials: with tolerability results consistent with the known profile of quetiapine.",
   onset:"Unlike other antipsychotics, Seroquel can take up to a week to work. Unless you are taking it for sleep — that first 25mg knocks out most people.",
   dosage:"Bipolar (Crazymeds): start 50mg at night if already on a mood stabilizer, 100mg if not. Increase 50mg every 3-4 days. If seriously flipping out, follow the PI sheet. If you are crazy enough to be getting coded messages in your cereal, especially if you are NOT eating Alpha-Bits, get to 300-400mg by day four. Max: 800mg/day.",
   howToStop:"Reduce by 25-50mg every other day.",
   halfLife:"6-7 hours.",
   comments:"Seroquel is popular in prisons: inmates can get higher off their toilet wine when combining it with booze, artificially inflating the percentage of mentally interesting in the prison population."},

  {id:"thorazine",brandName:"Thorazine",genericName:"chlorpromazine",
   otherForms:"Sustained-release Spansule capsules, syrup, oral solution, IM injection, and the ever-so-popular suppositories",
   classes:["Antipsychotic"],
   approvedUses:["Schizophrenia and bipolar disorder (predating lithium)","Intractable hiccoughs","Severe nausea and vomiting","Pre-surgical anxiety","Tetanus","Porphyria","Several conduct disorders in children"],
   offLabelUses:["Migraines — mainly in emergency rooms, where it is really effective","Insomnia","Managing pain in blind eyes","Steroid-induced psychosis (roid rage)","Augmenting AIDS treatments","Malaria (yes, really)"],
   pros:"Cheaper than dirt, effective, and treats so many seemingly unrelated things it might help you reduce your other meds.",
   cons:"Higher risk of movement disorders than most AAPs at comparable potency. Weight gain not that much less than Zyprexa and Seroquel.",
   sideEffectsTypical:"Weird dreams, drowsiness, feeling disconnected from reality, emotional numbing, not really giving a damn. Put it all together: zombification. Fortunately most tends to go away within weeks.",
   sideEffectsUncommon:"Movement disorders, surprise lactation for both men and women, changes in menstruation, assorted sexual dysfunctions including priapism. Before Viagra, one guy decided to take matters into his own hands — crushing Thorazine tablets and inserting them into his urethra to treat erectile dysfunction. Only because I am batshit crazy can I understand how that could ever seem like a good idea. Which it is not.",
   sideEffectsRare:"Floppy iris syndrome. Turning your skin blue — which would look totally awesome at a Star Trek convention if you went as an Andorian.",
   interestingStuff:"Thorazine can result in a false positive for amphetamines in a urine test. List all your meds whenever required to pee in a cup. You may have had Thorazine without knowing it — some standard antipsychotics are given in emergency rooms every day as anti-nausea medications.",
   onset:"Thorazine is kind of slow for an antipsychotic. Something within a day, noticeable effect in up to a week, and as the PI sheet honestly states, it can take months before you know if it will fully control your symptoms. The effect on vomiting is nearly instant. Really. It is TV-fast.",
   dosage:"Outpatients: 10mg three to four times daily or 25mg two to three times daily. More severe: 25mg three times daily, increasing by 20-50mg at semi-weekly intervals until calm and cooperative. Maintenance: usually 200mg/day, up to 800mg/day. The PI sheet is remarkably honest about not knowing correct dosages for long-term injection or suppository use.",
   howToStop:"Stahl recommends a 6-8 week schedule. Reduce 30-50mg every 3-7 days. Stopping suddenly can cause rebound non-stop vomiting.",
   halfLife:"8-33 hours (averages about 4 days to clear).",
   shelfLife:"Tablets: 4 years. Syrup: 2 years, 6 months after opening. Oral solution: 4 years. IM injection: 5 years."},

  {id:"latuda",brandName:"Latuda",genericName:"lurasidone",
   classes:["Antipsychotic","Mood Stabilizer","Antidepressant"],
   approvedUses:["Schizophrenia","Bipolar Depression (depressive episodes associated with Bipolar I) — alone or with lithium or a valproate"],
   overseasUses:"In Australia, Britain, the EU, and Switzerland: approved for schizophrenia only. In Japan: approved for bipolar depression but still undergoing trials for schizophrenia — not yet approved for schizophrenia in Japan is even more hilarious than not being approved in Ireland, as lurasidone was developed by Dainippon Sumitomo Pharma in freaking Osaka! And is manufactured in Ireland for distribution in Britain and the rest of the EU.",
   offLabelUses:["Bipolar 2 (seriously, that is an off-label prescription)","Full-on bipolar mood stabilization","Add-on to an antidepressant for depression"],
   onset:"Like most antipsychotics: something positive within one to two days. Latuda seems more effective for schizophrenia than bipolar, but that may be because people with schizophrenia are just more willing to put up with side effects. I know from 14 years of reading support groups that the bipolar are often whiny babies when it comes to side effects.",
   dosage:"Sunovion recommends starting at 40mg once daily — no initial titration required. Effective range: 40-160mg/day. Max: 160mg/day. Crazymeds: given how freaking potent Latuda is, starting at 20mg is worth discussing with your doctor. You MUST take Latuda with food — at least 350 calories. Without food it is like taking less than half your dosage. Start by taking it in the morning.",
   howToStop:"Reduce by 20-40mg every 5 days to a week.",
   halfLife:"18 hours."},

  {id:"adderall",brandName:"Adderall",genericName:"dextroamphetamine and amphetamine",
   otherForms:"Extended-release Adderall XR (now the default). Immediate-release still available as both brand and generic.",
   classes:["Stimulant"],
   approvedUses:["ADHD in adults and children age 6+ (XR)","ADHD in children age 6+ but not adults (immediate-release)","Narcolepsy (immediate-release only)"],
   offLabelUses:["Depression","Obesity","Countering cognitive side effects of AEDs and antipsychotics","Non-fluent aphasia","OCD — which surprises me, you would think Adderall would make OCD a billion times worse"],
   pros:"A tried and true way to treat ADD/ADHD and narcolepsy. The go-to med for severe ADHD. Low side effect profile for an amphetamine.",
   cons:"Those triplicate prescriptions are a pain in the ass. History of drug abuse likely means you will never get a prescription regardless of how much you have cleaned up. It might be a little too much fun for some people.",
   sideEffectsTypical:"Headache, nausea, dry mouth, sweating, insomnia, constipation, weight loss, heart palpitations, raised blood pressure, dizziness, and horniness. Generally everything clears up after a couple weeks except constipation, weight loss, blood pressure, and increased libido.",
   sideEffectsUncommon:"Triggering a manic reaction — most often when someone is misdiagnosed as having only ADD/ADHD when they are also bipolar. Shire now recommends screening for bipolar disorder. About time. Also: tics, twitches, Tourette's exacerbation, depression.",
   sideEffectsRare:"The combination of increased libido and impotence, which you can also get from Wellbutrin.",
   interestingStuff:"Lithium prevents Adderall from working. Giving lithium carbonate to lab rats jacked up on amphetamines and watching them mellow out is how scientists in the 1970s confirmed lithium probably works for bipolar. Do not mix booze and Adderall — you just do not feel quite so drunk. So you have another. And another. Until you are a lot thinker than you are drunk, and still insist on driving home. What do you mean it is not your car? Do not wash down Adderall with orange juice or fruit juice: they severely lower amphetamine absorption. Same goes for vitamin C supplements.",
   onset:"You should feel something within hours of your first dose.",
   dosage:"Start at the lowest possible dosage. Why not start at 10mg or even 5mg instead of the 20mg the PI sheet suggests? Easier to deal with needing more than with side effects from starting too high. Max: 60mg/day for adults, 30mg for kids.",
   howToStop:"Reduce by 10-20mg every three days. Amphetamine withdrawal is unpleasant but rarely severe unless you were taking 50-60mg/day for years.",
   halfLife:"Dextroamphetamine: 11 hours. Amphetamine: 13 hours. About three days total clearance.",
   steadyState:"Two to three days."},

  {id:"strattera",brandName:"Strattera",genericName:"atomoxetine",
   classes:["NSRI","Antidepressant"],
   approvedUses:["ADD/ADHD for adults and children"],
   offLabelUses:["Depression","Panic/anxiety","Bipolar depression"],
   onset:"3-4 days. Give it at least one week before raising the dosage and two weeks before giving up.",
   dosage:"This med can work wonders for more people if they and their doctors would just have some goddamn patience!!! The initial dosage is 18-25mg once daily. Not 40mg. Not 60mg. 18-25mg. Some bean counter at Eli Lilly determined it was more profitable to restrict the 18mg and 25mg sample packs. So most samples are now 40mg capsules. It is more profitable for Lilly if Strattera does not work for everyone it could work for. Progress after 25mg: 36-40mg, 50mg, 60mg, 80mg, 100mg/day.",
   howToStop:"Reduce by 20-40mg every 3-4 days. No real discontinuation syndrome. Sudden stopping can result in a nasty rebound of symptoms.",
   halfLife:"13 hours."},
];

const BENZOS = [
  {brand:"Ativan",generic:"lorazepam",cls:"Intermediate",hl:"8-24",aed:true,anxiety:true,sleep:false,dts:false,potency:"High"},
  {brand:"Dalmane",generic:"flurazepam",cls:"Long-acting",hl:"50-160",aed:false,anxiety:false,sleep:true,dts:false,potency:"Medium"},
  {brand:"Doral",generic:"quazepam",cls:"Long-acting",hl:"40-120",aed:false,anxiety:false,sleep:true,dts:false,potency:"Medium"},
  {brand:"Halcion",generic:"triazolam",cls:"Short-acting",hl:"1.5-5",aed:false,anxiety:false,sleep:true,dts:false,potency:"High"},
  {brand:"Klonopin",generic:"clonazepam",cls:"Long-acting",hl:"19-60",aed:true,anxiety:true,sleep:false,dts:false,potency:"High"},
  {brand:"Librium",generic:"chlordiazepoxide",cls:"Long-acting",hl:"30-100",aed:false,anxiety:true,sleep:false,dts:true,potency:"Low"},
  {brand:"Onfi",generic:"clobazam",cls:"Long-acting",hl:"10-30",aed:true,anxiety:false,sleep:false,dts:false,potency:"High"},
  {brand:"Prosom",generic:"estazolam",cls:"Intermediate",hl:"10-24",aed:false,anxiety:false,sleep:true,dts:false,potency:"?"},
  {brand:"Restoril",generic:"temazepam",cls:"Intermediate",hl:"8-20",aed:false,anxiety:false,sleep:true,dts:false,potency:"Low"},
  {brand:"Serax",generic:"oxazepam",cls:"Intermediate",hl:"3-25",aed:false,anxiety:false,sleep:true,dts:false,potency:"Low"},
  {brand:"Tranxene",generic:"clorazepate",cls:"Long-acting",hl:"40-50",aed:true,anxiety:true,sleep:false,dts:true,potency:"Medium"},
  {brand:"Valium",generic:"diazepam",cls:"Long-acting",hl:"30-100",aed:true,anxiety:true,sleep:false,dts:true,potency:"Medium"},
  {brand:"Versed",generic:"midazolam",cls:"Short-acting",hl:"1.5-7",aed:true,anxiety:false,sleep:false,dts:false,potency:"High"},
  {brand:"Xanax",generic:"alprazolam",cls:"Intermediate",hl:"6-27",aed:false,anxiety:true,sleep:false,dts:false,potency:"High"},
];

const ARTICLES = [
  {id:"why",title:"Why CrazyMeds Exists",subtitle:"The mission statement",
   sections:[
    {h:null,b:"Since it began in November 2003, Crazymeds has been about learning what the drugs and other treatment options can and cannot do, and what they are likely to do for us and to us, so we can work with our doctors to make the best, or least bad, choice in treatment as quickly as possible. The information here is meant to complement what your doctors tell you — not replace it."},
    {h:null,b:"The information on Crazymeds is primarily for and about adults. If you are under 24, how you react to medications may be very different from typical. If you are under 16 and reading this site, I do not even want to think about what is going on in your life as I have enough problems of my own."},
    {h:null,b:"* In 2026 someone decided to resurrect this extremely valuable and revered resource..."},
  ]},
  {id:"about",title:"About Jerod Poore",subtitle:"Chief Citizen Medical Expert, AA, CME, QBE",
   sections:[
    {h:null,b:"Unlike practically all consumer/peer-run mental health sites, I am out in the open about being batshit crazy. I am treatment-resistant, so it is highly unlikely I will ever be able to hold a job."},
    {h:"Qualified by Experience",b:"Nobody here is a doctor. The only official letters after my name are A.A. from Heald College, during the Big Iron Age. I am bipolar, epileptic, and in the moderate Asperger's part of the autism spectrum. I am frequently agoraphobic. I have spent five days in the locked ward of a psychiatric hospital — ironically due to complex partial seizures making me act especially weird along with rebound autism symptoms from sudden discontinuation of Risperdal, and not bipolar disorder."},
    {h:"The Research",b:"I have been treated for various brain cooties on and off since 1985, in Australia and the US, but continuously since 2001. I have accumulated over 15 linear feet of books and journals. Bipolar disorder is a popular trait with the male members of my family. Both of my ex-wife's siblings are schizophrenic — well, just her sister now, as pharmacophobia killed her brother. There are few medications discussed on this site that I do not have up close and personal experience with."},
  ]},
  {id:"should-you",title:"Should You Be Taking Psychiatric Meds?",subtitle:"The Am I That Messed-Up? checklist",
   sections:[
    {h:null,b:"There is a huge paradox regarding psychiatric medications. Many people who need them will not take them because the stigma is too great. Yet there are also people needlessly taking meds thanks to Big Pharma's disease mongering — where they make up an illness where one did not previously exist, such as Cephalon's invention of Shift Work Sleep Disorder as a way to market Provigil as an expensive prescription substitute for coffee."},
    {h:"When You Definitely Need Meds",b:"Have you been diagnosed with epilepsy? You need medication. Have you had seizures? See a doctor. Diagnosed with schizophrenia, bipolar disorder, or schizoaffective disorder? You need medication — and if your symptoms are gone it is because the meds are working."},
    {h:"The Functionality Test",b:"Can you get out of bed, get dressed, go to work and accomplish something, feed yourself, do laundry, make dinner (a bowl of cereal should not be considered dinner), interact with other people who exist in the real world, go shopping, leave your room without taking two hours making sure the door is locked, and fall asleep without lying awake reliving things that went wrong in vivid detail over and over? If your life is a struggle and you cannot make it through the day without somebody else handling the essentials: you need medication and/or serious talk therapy. What you really need to do is get off the fucking Internet and make an appointment."},
  ]},
  {id:"alcohol",title:"Can You Drink Alcohol While Taking Crazy Meds?",subtitle:"The surprisingly complicated answer",
   sections:[
    {h:null,b:"The simplest thing to do is not drink at all, but simple, being mentally interesting, and reality rarely go together. Some meds, like Effexor, actually make it more difficult to abstain from drinking."},
    {h:"Mood Stabilizers",b:"The effects of mixing booze with AEDs are completely unpredictable. You may get way more drunk on surprisingly less alcohol. You may not feel drunk no matter how much you drink. Your meds may suddenly stop working. The hangover will be worse and last longer. Lamictal is notorious for causing multiday hangovers after minimal alcohol — possibly because you had a seizure in your sleep."},
    {h:"Antipsychotics",b:"Alcohol + AP = unpredictable in different ways, but still really stupid if you are bipolar. You can get higher off the combination. Alcohol is a serotonergic drug, so it acts as a crappy antidepressant — which is why people self-medicate with it for depression. Which means you would be taking an AP and an AD at the same time, either souping up the antidepressant effect or negating your AP's actions."},
    {h:"Benzodiazepines",b:"Alcohol + benzodiazepines = dying like a rock star. Do not."},
    {h:"Antidepressants",b:"SSRIs are one of the few drug classes where it is relatively safe to drink a moderate amount. Moderate meaning a beer or two, or a glass of wine, two or three nights a week. Do not drink when taking SNRIs like Effexor and Cymbalta. TCAs + alcohol is potentially fatal. With MAOIs it depends what you are drinking. Wellbutrin + booze is mostly benign, except some people feel less inebriated than they actually are, and it lowers your seizure threshold — so you really need a way home that does not involve you driving."},
  ]},
  {id:"side-effects",title:"Dealing with Common Side Effects",subtitle:"What you can actually do about the ones that stick around",
   sections:[
    {h:"Weight Gain",b:"Weight gain is the number one complaint for meds that actually work. Metformin is probably your best bet. All the usual stuff still applies but you will probably need more than that. Unless you have epilepsy or migraines, Topamax usually causes more problems than it solves for weight gain."},
    {h:"Sexual Side Effects",b:"For SSRI/SNRI-induced sexual dysfunction: try adding BuSpar (also helps with anxiety), Wellbutrin (can augment your AD but is not always a good idea), or a dopamine agonist like Mirapex or Requip — this often works better than Wellbutrin, sometimes a little too much better. Adding Remeron. Even women use Viagra, Cialis, or other erectile dysfunction meds for SSRI-induced dysfunction. Paxil and Lexapro are the worst offenders; Zoloft has the fewest problems. The drug holiday is not recommended — you risk discontinuation syndrome and the med may not work as well when you restart."},
    {h:"Lethargy and Sleepiness",b:"Try taking the meds before going to bed instead of in the morning. Provigil and Nuvigil are really effective for medication-induced lethargy. They have drug-drug interactions up the wazoo. Be very careful with caffeine if you take Luvox."},
    {h:"Treatment Resistance",b:"If you keep switching medications because you did not want to deal with minor or temporary side effects, _you may wind up treatment-resistant_. A med that used to work may not work as well when you go back to it. The APA recommends waiting 6-8 weeks at full therapeutic dose before switching, and selecting something with a different mechanism of action. Patients are idiots for not sticking with meds if they are not dangerous, and doctors are idiots for continuing to prescribe one SSRI after another after two already failed."},
  ]},
  {id:"talk-to-doctor",title:"How to Talk to Your Doctor",subtitle:"Making the most of 15-minute medication check-up appointments",
   sections:[
    {h:"Write a Script",b:"Think of it as writing a script where the scene is in the doctor's office. Say the most important stuff at the very beginning — generally what sucks most. Be open and honest: when you hide things from your doctor, you get misdiagnosed; when you get misdiagnosed, you get inappropriate treatments; when you get inappropriate treatments, that sucks donkey dong. When you become treatment-resistant, that sucks syphilitic donkey dong."},
    {h:"Keep Records",b:"Keep a record of the meds you take, if they work, and what the side effects are. At minimum: date, drug name and dosage, and what happened. Track how your condition affects your life. Input from other people is extremely helpful — you cannot judge how you act from inside of you on a lot of things."},
    {h:"The Doctor Works for You",b:"You do not have to be pushed around. Remember, the doctors work for you. But good employees sometimes require documentation before going off and doing something. The illness is not your fault, but it is your responsibility."},
  ]},
  {id:"maois",title:"Monoamine Oxidase Inhibitors (MAOIs)",subtitle:"The original modern antidepressants — kept from wider use by being old and a pain in the ass",
   sections:[
    {h:null,b:"The original modern antidepressants, and the most effective. Being old and a pain in the ass keeps them from being prescribed more often. MAOIs include: Emsam (selegiline transdermal), Nardil (phenelzine), Parnate (tranylcypromine), Marplan (isocarboxazid), Eldepryl (selegiline), and Aurorix/Manerix (moclobemide — not available in the US)."},
    {h:"How They Work",b:"MAOIs slow down monoamine oxidase — the enzyme that breaks down serotonin, norepinephrine, and dopamine. This causes a build-up in all three neurotransmitters. In an oversimplified way they act like high-potency SNRIs that also work on dopamine."},
    {h:"David Foster Wallace",b:"In 2007, David Foster Wallace tapered off Nardil, a MAOI he had taken since 1989, partly due to bothersome side effects and a desire to see if he could function without it. When he tried to return to the medication, it was no longer effective, leading to a severe depression and ultimately his suicide in 2008. He told a friend: It's a bit like I imagine a course of chemo would be. He later described the trial-and-error prescriptive practice as throwing darts at a dartboard. This case raises a very significant question for the mental health care system about the risks of discontinuation during high-risk periods."},
  ]},
  {id:"mood-stabilizers",title:"Mood Stabilizers",subtitle:"What they are, what they are not, and why the nomenclature is a mess",
   sections:[
    {h:"What Is a Mood Stabilizer?",b:"That all depends on whom you ask. The FDA technically states there is no such thing as a mood stabilizer. Lamictal is approved to delay the time to occurrence of mood episodes — about as close to mood stabilizer as you can get. Seroquel is approved to treat bipolar mania, mixed states, and bipolar depression, which covers the entire tripolar disorder spectrum."},
    {h:"The Bottom Line",b:"Most everyone with bipolar disorder is prescribed either an AED or an antipsychotic as their primary medication. The majority need one or two daily meds, and their doctors get it right the first or second time. As long as you keep the perspective that the side effects suck so much less than the insanely stupid things you can do when manic, you probably will not have to ride the med-go-round too often or for too long."},
  ]},
  {id:"ap-classifications",title:"Classifications of Antipsychotic Drugs",subtitle:"FGAs, SGAs, TGAs, and why the naming conventions make no sense",
   sections:[
    {h:"First-Generation (FGAs)",b:"Also known as standard or typical antipsychotics. All thought to work the same way: D2 dopamine, M1 muscarine, H1 histamine, and alpha-1 antagonism. Turns out they do not all work the same. FGAs include: Thorazine, Prolixin, Haldol, Loxitane, Orap, Navane, and others."},
    {h:"Second-Generation (SGAs / AAPs)",b:"SGAs do a hell of a lot more than most FGAs — broad-spectrum antagonists of dopamine, alpha-noradrenergic, and serotonin receptors. No two work exactly the same way, hence atypical. Since they are now prescribed far more often than FGAs, calling them atypical is counterintuitive. Includes: Zyprexa, Seroquel, Geodon, Risperdal, Invega (predigested Risperdal in pill form), Latuda, Clozaril, Saphris."},
    {h:"Third-Generation (TGAs)",b:"Both dopamine antagonists and partial agonists. Abilify (aripiprazole) is currently the only TGA on the US market."},
    {h:"Which Is Better?",b:"Whichever one works for you. In a perfect world you would not need one. If you are so batshit crazy that someone else is reading this page — any way you want to interpret that will work — then Zyprexa, Saphris, or Clozaril might be needed. In general AAPs tend to suck less, but at such an actuarial level that there is no way to determine which class will suck less for you without a medical history."},
  ]},
  {id:"antipsychotics-mood",title:"Antipsychotic Drugs as Mood Stabilizers",subtitle:"When your antipsychotic is also your mood stabilizer",
   sections:[
    {h:"Advantages",b:"Most antipsychotics are a lot easier to prescribe and take than AEDs. When all your insurance covers is four 15-minute medication-checking appointments a year, that makes a big difference. APs have simple titration schedules, require fewer dosage adjustments, have consistent side effects — they may suck, but at least you know what you are in for. APs work quickly. AAPs are more likely to be true mood stabilizers, treating both mania and depression."},
    {h:"Disadvantages",b:"The long-term side effects of AAPs are a lot more problematic than those of most AEDs. Movement disorders (EPS, tardive dyskinesia) can be severe enough that if you get them from one AP you may have to stop all APs. Metabolic syndrome: that is the one where they give you diabetes and raise your cholesterol even if they do not make you fat. Mixing chronic heavy drinking with AAPs over the long term is a which sucks less? proposition: early death or early dementia. Decisions, decisions."},
  ]},
  {id:"anxiolytics",title:"Anxiolytics: Treatment Options for Anxiety",subtitle:"Using anti-anxiety drugs to treat GAD, SAnD, PTSD, OCD, PD, and other initialisms",
   sections:[
    {h:"Define Your Terms",b:"Anxiolytic is the technical term for an anti-anxiety medication. Tranquilizer and sedative are interchangeable terms for a type of anxiolytic that also puts you to sleep, such as a benzodiazepine. Major tranquilizer is a holdover that usually refers to an antipsychotic being used for anxiety and insomnia."},
    {h:"When Do You Need Meds?",b:"Most of the time anxiety conditions can be treated without medication. If you can leave your house, hold down a job (even one that involves as little contact with people as possible), and otherwise function — you can probably overcome the condition with therapy. If the only time you can leave your house is when you know there will be as few people around as possible, and you have adjusted your life so you do your shopping at 3:00 a.m. and only for stuff you cannot get online — then you need meds. Assuming you want to leave your house in the first place. Solitude has done wonders for my mental health."},
  ]},
  {id:"insomnia",title:"Treatment Options for Insomnia",subtitle:"Pick your poison",
   sections:[
    {h:null,b:"Most people complaining of insomnia actually have hyposomnia — getting too little sleep. Leaving the radio or TV on so the news is on all night is the only non-drug treatment that has ever helped me sleep. Exercising in the morning vs. later vs. not at all: no difference."},
    {h:"Benzodiazepines vs Hypnotics",b:"I do not think it is a great idea for the bipolar to take prescription hypnotics (Ambien, Lunesta, Sonata) very often. I have collected far too many stories of bipolar patients going way overboard with Ambien-induced sleep-what-the-fuckery. Who else remembers Representative Patrick Kennedy's Ambien Adventure? That was nothing compared with stories of first-time full-on psychoses, items going missing only to be found in the freezer — putting important stuff in the freezer is a common trait of the part-time somnambulist. When things like underwear, junk mail, and unwashed dishes show up there, you have to wonder if Lunesta makes you a sleep hoarder."},
    {h:"Other Options",b:"Several antidepressants and antipsychotics are used off-label for insomnia: trazodone, Remeron (mirtazapine), and Seroquel at low dosages (25-100mg). Seroquel works best for sleep if you are crazy."},
  ]},
  {id:"add-treatment",title:"Treatment Options for Adult Attention Deficit",subtitle:"ADD/ADHD does not go away when you turn 18",
   sections:[
    {h:"Look! A Puppy!",b:"ADD and ADHD are usually considered childhood disorders. They do not go away by 18 — they are just diagnosed more often in children because parents and doctors are actively looking for them. It is far too easy to confuse ADHD with bipolar disorder. 10-35% of adults with bipolar disorder have a form of ADD/ADHD. I think those numbers are a bit low."},
    {h:"Non-Drug Treatments",b:"A comprehensive treatment program includes: large wall calendars (harder to cover with other stuff), lists, specific places for important items, breaking down large tasks into smaller ones. Do not fall into the trap of making extensive lists as a way to avoid work. Psychotherapy, especially CBT, is essential. More protein and fewer carbs is the ADD/ADHD dietary rule of thumb. Walking in a park is better than the gym."},
    {h:"FDA-Approved Medications",b:"Non-stimulants: Intuniv (guanfacine) and Strattera (atomoxetine). Stimulants: Adderall XR (adults), Dexedrine, Ritalin and its variants (Concerta, Focalin-XR), Vyvanse, Desoxyn (methamphetamine — yes, really). Off-label: clonidine, Provigil/Nuvigil, Wellbutrin. Most people prefer non-stimulants because stimulants sound scarier. Unless you have cardiovascular problems or chronic insomnia, stimulants are not necessarily more problematic."},
  ]},
  {id:"meds-fewer-side-effects",title:"Meds with Fewer Side Effects than Most",subtitle:"The ones that will not make you fat, bald, or asexual",
   sections:[
    {h:null,b:"I want a drug that works with no side effects! And I want a woman as horny as I am, who cooks as well as I used to, with a nice ass, an equally nice trust fund, and whose main mission in life is making me happy. You will probably get a wedding invitation from me before you get a perfect drug."},
    {h:"Five Meds That Rarely Cause Weight Gain and Sexual Dysfunction",b:"Geodon (ziprasidone): of all antipsychotics, least likely to cause metabolic problems. Wellbutrin (bupropion): the skinny, sexy, happy drug. Lamictal (lamotrigine): hair thinning is uncommon rather than rare, and it might make you hornier. Keppra (levetiracetam): super-low side effect profile. Neurontin (gabapentin): really low side effects, but mostly useful for neuropathic pain."},
    {h:"What About Natural Things?",b:"Haven't you learned yet that nature is always trying to kill us? Anything that works will have potential side effects. Omega-3 fish oil has a PI sheet full of side effects including fecal incontinence and, my favorite freaky rare side effect: sudden death. St. John's Wort works as well as Zoloft in properly controlled studies, and has just as many side effects."},
    {h:"Recommendations by Condition",b:"Depression: Wellbutrin. Bipolar: Geodon and/or Lamictal, especially for bipolar 2. Panic/Anxiety: BuSpar (low efficacy but near-zero side effects) or a benzodiazepine. Epilepsy: Lamictal or Keppra. Neuropathic Pain: Neurontin. Schizophrenia: Geodon, or seriously, good old-fashioned Thorazine or Haldol at low-to-medium dosages. Their bad reputation comes from high doses."},
  ]},
  {id:"nsri",title:"Norepinephrine-Selective Reuptake Inhibitors (NSRIs)",subtitle:"The less-discussed antidepressant class",
   sections:[
    {h:null,b:"NSRIs include Edronax (reboxetine), Strattera (atomoxetine), and Catatrol (viloxazine). In the US you have only Strattera. Strattera does not have FDA approval to treat depression, but it looks and acts so much like reboxetine that it may as well be an antidepressant. Officially it is a miscellaneous psychotherapeutic agent, because non-stimulant treatment for ADD/ADHD still blows the FDA's mind."},
    {h:"NSRIs in Common",b:"Low side effect profile — though you are actually more likely to have the common side effects and for them to stick around. No discontinuation syndrome. More likely to poop-out than SSRIs. Less likely to trigger mania in the bipolar. But if bipolar and not stable, NSRIs tend to destabilize you further. People who need only norepinephrine adjustments make up about 10-15% of the mood disorder population."},
  ]},
  {id:"tricyclics",title:"Tricyclic and Tetracyclic Antidepressants (TCAs)",subtitle:"Three ring circus",
   sections:[
    {h:null,b:"Defined by their three-ring chemical structure, almost all tricyclic antidepressants work in pretty much the same way: norepinephrine reuptake inhibition, alpha-1, H1, and M1 antagonism, and sodium voltage channel blocking. Most also do enough serotonin reuptake inhibition to make a difference."},
    {h:"TCAs Covered Here",b:"Amitriptyline (Elavil), clomipramine (Anafranil), desipramine (Norpramin), doxepin, imipramine (Tofranil), nortriptyline (Pamelor), protriptyline (Vivactil), and trimipramine (Surmontil)."},
    {h:"Tetracyclics",b:"Tetracyclic antidepressants like Remeron (mirtazapine) and Asendin (amoxapine) are usually lumped in with TCAs even though they do not really work enough like TCAs to warrant that. Asendin is unofficially classified as an atypical antipsychotic by Stahl and other pharmacologists based on its efficacy in treating schizophrenia and mechanism of action. All it takes is one more to be approved in the US and they are getting their own Crazymeds class."},
  ]},
  {id:"what-you-need",title:"What You Need to Know",subtitle:"Before and after starting any psychiatric or neurological medication",
   sections:[
    {h:null,b:"When — preferably before — starting any medication to treat a neurological or psychiatric condition, here is everything you need to know. It does not matter if you are obsessed or depressed, schizophrenic or epileptic, bipolar or a migraineur, all of the above or none of the above."},
    {h:"The Basics",b:"Should you be taking meds in the first place? Tips on how to take them — there is more than do not operate heavy machinery. Tips on how to stop taking them — you do not want to wind up crazier than you were. Mixing your med cocktail with actual cocktails. Common side effects — no matter which ones you take, they will mess with your dreams. Meds with fewer side effects. Dealing with side effects. Brand name vs generic — brand is not necessarily better, just different."},
    {h:"Dealing with Life When You Are Crazy",b:"Talking to your doctor: planning ahead for that 15-minute med check. What you should know before buying meds online — in 2009, 90% of ads for online pharmacies were fraudulent. How to apply for SSDI/SSI benefits — because if you are crazy enough to be reading this site, the odds are you are too crazy to hold down a job. Sorry migraineurs, your debilitating pain still does not mean shit to the SSA."},
  ]},
];


// Renders text, supporting _italic_ markers
function renderText(text){
  if(!text) return null;
  const parts=text.split(/(_[^_]+_)/g);
  return parts.map((p,i)=>
    p.startsWith("_")&&p.endsWith("_")
      ?<em key={i}>{p.slice(1,-1)}</em>
      :p
  );
}

// ─── Styles ────────────────────────────────────────────────────────────────
const s = {
  page:{fontFamily:"'DM Sans',system-ui,sans-serif",background:C.bg,color:C.text,minHeight:"100vh"},
  nav:{background:C.surface,borderBottom:`1px solid ${C.border}`,padding:"0 2rem",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:100,gap:"1rem",flexWrap:"wrap"},
  logo:{fontFamily:"'Cormorant Garamond',Georgia,serif",fontWeight:700,fontSize:"1.5rem",color:C.accent,cursor:"pointer",letterSpacing:"-0.02em",padding:"1rem 0"},
  navLinks:{display:"flex",gap:"0.25rem",flexWrap:"wrap"},
  hero:{padding:"5rem 2rem 4rem",maxWidth:900,margin:"0 auto",textAlign:"center"},
  eyebrow:{color:C.accent,fontSize:"0.75rem",fontWeight:600,letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:"1rem"},
  heroTitle:{fontFamily:"'Cormorant Garamond',Georgia,serif",fontWeight:700,fontSize:"clamp(2.5rem,6vw,4rem)",lineHeight:1.1,color:"#e8e4f0",marginBottom:"1.25rem"},
  heroSub:{fontSize:"1.1rem",color:C.muted,maxWidth:580,margin:"0 auto 2.5rem",lineHeight:1.7},
  searchWrap:{position:"relative",maxWidth:520,margin:"0 auto"},
  searchInput:{width:"100%",padding:"0.875rem 1.25rem 0.875rem 3rem",background:C.surface,border:`1px solid ${C.border}`,borderRadius:10,color:C.text,fontSize:"1rem",outline:"none",boxSizing:"border-box"},
  searchIcon:{position:"absolute",left:"1rem",top:"50%",transform:"translateY(-50%)",color:C.muted,pointerEvents:"none",fontSize:"1.1rem"},
  section:{maxWidth:1100,margin:"0 auto",padding:"3rem 2rem"},
  sTitle:{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:"1.5rem",fontWeight:600,color:"#e8e4f0",marginBottom:"0.5rem"},
  sSub:{color:C.muted,fontSize:"0.9rem",marginBottom:"2rem"},
  grid:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:"1rem"},
  card:{background:C.surface,border:`1px solid ${C.border}`,borderRadius:10,padding:"1.25rem 1.5rem",cursor:"pointer",transition:"border-color 0.15s,background 0.15s"},
  cardTitle:{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:"1.4rem",fontWeight:600,color:"#e8e4f0",marginBottom:"0.2rem"},
  cardSub:{color:C.muted,fontSize:"0.8rem",fontFamily:"'DM Mono',monospace",marginBottom:"0.75rem"},
  tags:{display:"flex",flexWrap:"wrap",gap:"0.4rem"},
  tag:(cls)=>{const t=CT[cls]||CT["Antidepressant"];return{background:t.bg,color:t.color,border:`1px solid ${t.border}`,borderRadius:20,padding:"0.25rem 0.75rem",fontSize:"0.7rem",fontWeight:500}},
  filterBar:{display:"flex",gap:"0.5rem",flexWrap:"wrap",marginBottom:"2rem"},
  filterBtn:(a)=>({padding:"0.4rem 1rem",borderRadius:20,fontSize:"0.8rem",cursor:"pointer",border:`1px solid ${a?C.accent:C.border}`,background:a?C.accentBg:"transparent",color:a?C.accent:C.muted,transition:"all 0.15s"}),
  detailWrap:{display:"grid",gridTemplateColumns:"220px 1fr",gap:"2rem",maxWidth:1100,margin:"0 auto",padding:"2.5rem 2rem",alignItems:"start"},
  toc:{position:"sticky",top:72,background:C.surface,border:`1px solid ${C.border}`,borderRadius:10,padding:"1.25rem"},
  tocTitle:{color:C.muted,fontSize:"0.7rem",fontWeight:600,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:"0.875rem"},
  tocBtn:{display:"block",color:C.muted,fontSize:"0.825rem",padding:"0.3rem 0.5rem",borderRadius:4,cursor:"pointer",border:"none",background:"transparent",textAlign:"left",width:"100%"},
  detailMain:{minWidth:0},
  detailHdr:{marginBottom:"2rem",paddingBottom:"2rem",borderBottom:`1px solid ${C.border}`},
  detailBrand:{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:"clamp(2rem,4vw,3rem)",fontWeight:700,color:"#e8e4f0",lineHeight:1.1,marginBottom:"0.3rem"},
  detailGeneric:{color:C.muted,fontFamily:"'DM Mono',monospace",fontSize:"0.9rem",marginBottom:"0.25rem"},
  detailOther:{color:C.dim,fontSize:"0.8rem",fontStyle:"italic",marginBottom:"1rem"},
  block:{marginBottom:"2rem"},
  blockTitle:{fontSize:"0.7rem",fontWeight:600,color:C.accent,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:"0.75rem"},
  blockText:{color:C.text,fontSize:"0.95rem",lineHeight:1.75,margin:0},
  ul:{paddingLeft:"1.25rem",margin:0},
  li:{marginBottom:"0.4rem",fontSize:"0.9rem",color:C.text,lineHeight:1.6},
  quickStats:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:"0.75rem",marginBottom:"2rem"},
  stat:{background:C.surfaceHi,border:`1px solid ${C.border}`,borderRadius:8,padding:"0.875rem 1rem"},
  statLabel:{color:C.muted,fontSize:"0.7rem",fontWeight:500,letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:"0.3rem"},
  statVal:{color:"#e8e4f0",fontSize:"0.95rem",fontWeight:500},
  prosCons:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem",marginBottom:"2rem"},
  prosBox:{background:C.greenBg,border:`1px solid ${C.border}`,borderRadius:8,padding:"1rem 1.25rem"},
  consBox:{background:C.redBg,border:`1px solid ${C.border}`,borderRadius:8,padding:"1rem 1.25rem"},
  prosTitle:{color:C.green,fontSize:"0.7rem",fontWeight:600,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:"0.5rem"},
  consTitle:{color:C.red,fontSize:"0.7rem",fontWeight:600,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:"0.5rem"},
  seBox:{background:C.surfaceHi,border:`1px solid ${C.border}`,borderRadius:8,padding:"1rem 1.25rem",marginBottom:"0.75rem"},
  seTitle:{fontSize:"0.75rem",fontWeight:500,color:C.muted,marginBottom:"0.5rem"},
  disclaimer:{maxWidth:900,margin:"0 auto 2rem",padding:"1.25rem 1.75rem",background:C.surfaceHi,borderRadius:10,border:`1px solid ${C.border}`,borderLeft:`3px solid ${C.accent}`},
  disclaimerText:{color:C.muted,fontSize:"0.8rem",lineHeight:1.7},
  backBtn:{background:"transparent",border:`1px solid ${C.border}`,color:C.muted,padding:"0.5rem 1rem",borderRadius:6,cursor:"pointer",fontSize:"0.85rem",marginBottom:"1.5rem"},
  benzoTable:{width:"100%",borderCollapse:"collapse",fontSize:"0.875rem"},
  benzoTh:{textAlign:"left",padding:"0.6rem 0.875rem",borderBottom:`2px solid ${C.border}`,color:C.muted,fontSize:"0.7rem",fontWeight:600,letterSpacing:"0.08em",textTransform:"uppercase"},
  benzoTd:{padding:"0.75rem 0.875rem",borderBottom:`1px solid ${C.border}`,verticalAlign:"middle"},
  dot:(y)=>({display:"inline-block",width:8,height:8,borderRadius:"50%",background:y?C.green:C.dim}),
  potPill:(p)=>({display:"inline-block",padding:"0.2rem 0.6rem",borderRadius:20,fontSize:"0.7rem",fontWeight:500,background:p==="High"?"#1e0a0a":p==="Medium"?"#1a1a0a":"#0a1a14",color:p==="High"?C.red:p==="Medium"?"#d4b832":C.green}),
  footer:{background:C.surface,borderTop:`1px solid ${C.border}`,padding:"2rem",textAlign:"center",color:C.muted,fontSize:"0.825rem",lineHeight:1.8},
};

// ─── Components ────────────────────────────────────────────────────────────
function Tag({cls}){return <span style={s.tag(cls)}>{cls}</span>}

function NavBtn({label,active,onClick}){
  return <button onClick={onClick} style={{...s.navLinks,color:active?"#e8e4f0":C.muted,background:active?C.accentBg:"transparent",border:"none",padding:"0.5rem 0.875rem",cursor:"pointer",borderRadius:6,fontSize:"0.875rem",transition:"all 0.15s"}}>{label}</button>;
}

function Nav({page,setPage}){
  const a=(v)=>page.view===v||page.view===v.slice(0,-1);
  return(
    <nav style={s.nav}>
      <span style={s.logo} onClick={()=>setPage({view:"home"})}>CrazyMeds</span>
      <div style={{display:"flex",gap:"0.25rem",flexWrap:"wrap"}}>
        <NavBtn label="Home" active={page.view==="home"} onClick={()=>setPage({view:"home"})}/>
        <NavBtn label="Medications" active={page.view==="meds"||page.view==="med"} onClick={()=>setPage({view:"meds"})}/>
        <NavBtn label="Benzodiazepines" active={page.view==="benzos"} onClick={()=>setPage({view:"benzos"})}/>
        <NavBtn label="Articles" active={page.view==="articles"||page.view==="article"} onClick={()=>setPage({view:"articles"})}/>
      </div>
    </nav>
  );
}

function Footer(){
  return(
    <footer style={s.footer}>
      <p style={{margin:"0 0 0.5rem",color:"#e8e4f0",fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:"1.1rem",fontWeight:600}}>CrazyMeds</p>
      <p style={{margin:"0 0 0.5rem"}}>Written by the esteemed Jerod Poore</p>
      <p style={{margin:0}}>
        Content licensed under{" "}
        <a href="https://creativecommons.org/licenses/by-nc-sa/3.0/" style={{color:C.accent}}>CC BY-NC-SA 3.0</a>
        {" "}· Not a substitute for professional medical advice
      </p>
    </footer>
  );
}

function Disclaimer(){
  return(
    <div style={s.disclaimer}>
      <p style={s.disclaimerText}>
        <strong style={{color:C.accent}}>Medical disclaimer:</strong>{" "}
        This information is for educational purposes only. It is <strong>NOT</strong> medical advice. Always consult a qualified healthcare provider before starting, stopping, or changing any medication.
      </p>
      <p style={{...s.disclaimerText,marginTop:"0.5rem"}}>
        Some material may be somewhat outdated — this project was pulled from ancient internet archives. Some things have been polished but we have tried to retain Jerod's basic voice and wisdom.
      </p>
    </div>
  );
}

function MedCard({med,onClick}){
  const [h,sH]=useState(false);
  return(
    <div style={{...s.card,borderColor:h?C.accent:C.border,background:h?C.surfaceHi:C.surface}}
      onClick={onClick} onMouseEnter={()=>sH(true)} onMouseLeave={()=>sH(false)}>
      <div style={s.cardTitle}>{med.brandName}</div>
      <div style={s.cardSub}>{med.genericName}</div>
      <div style={s.tags}>{med.classes.map(c=><Tag key={c} cls={c}/>)}</div>
      {med.halfLife&&<div style={{marginTop:"0.875rem",color:C.muted,fontSize:"0.78rem"}}>Half-life: <span style={{color:C.text}}>{med.halfLife}</span></div>}
    </div>
  );
}

function ArticleCard({article,onClick}){
  const [h,sH]=useState(false);
  return(
    <div style={{...s.card,borderColor:h?C.accent:C.border,background:h?C.surfaceHi:C.surface}}
      onClick={onClick} onMouseEnter={()=>sH(true)} onMouseLeave={()=>sH(false)}>
      <div style={s.cardTitle}>{article.title}</div>
      {article.subtitle&&<div style={{color:C.muted,fontSize:"0.85rem",lineHeight:1.5,marginTop:"0.4rem"}}>{article.subtitle}</div>}
    </div>
  );
}

function Block({title,children}){
  return <div style={s.block}><div style={s.blockTitle}>{title}</div><div style={s.blockText}>{children}</div></div>;
}

function HomePage({setPage}){
  const [q,sQ]=useState("");
  const results=q.length>1?MEDS.filter(m=>
    m.brandName.toLowerCase().includes(q.toLowerCase())||
    m.genericName.toLowerCase().includes(q.toLowerCase())||
    m.classes.some(c=>c.toLowerCase().includes(q.toLowerCase()))
  ):[];
  return(
    <div>
      <div style={s.hero}>
        <p style={s.eyebrow}>The Educated Consumer's Guide</p>
        <h1 style={s.heroTitle}>What your doctor<br/>probably won't tell you</h1>
        <p style={s.heroSub}>Practical, plain-language information about psychiatric medications — side effects, dosing, discontinuation, and everything in between. Since 2003. Resurrected in 2026.</p>
        <div style={s.searchWrap}>
          <span style={s.searchIcon}>⌕</span>
          <input style={s.searchInput} placeholder="Search by brand name, generic, or drug class…" value={q} onChange={e=>sQ(e.target.value)}/>
        </div>
        {results.length>0&&(
          <div style={{marginTop:"1rem",background:C.surface,border:`1px solid ${C.border}`,borderRadius:8,overflow:"hidden",maxWidth:520,margin:"1rem auto 0"}}>
            {results.map(m=>(
              <div key={m.id} onClick={()=>setPage({view:"med",id:m.id})}
                style={{padding:"0.875rem 1.25rem",cursor:"pointer",borderBottom:`1px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <div>
                  <span style={{fontWeight:500,color:"#e8e4f0"}}>{m.brandName}</span>
                  <span style={{color:C.muted,fontSize:"0.8rem",marginLeft:"0.5rem",fontFamily:"'DM Mono',monospace"}}>{m.genericName}</span>
                </div>
                <div style={s.tags}>{m.classes.slice(0,2).map(c=><Tag key={c} cls={c}/>)}</div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div style={{...s.section,paddingTop:0}}>
        <Disclaimer/>
        <div style={{display:"flex",alignItems:"baseline",justifyContent:"space-between",marginBottom:"1.5rem"}}>
          <div><h2 style={s.sTitle}>Medications</h2><p style={s.sSub}>{MEDS.length} medications with full Jerod Poore commentary.</p></div>
          <button onClick={()=>setPage({view:"meds"})} style={{background:"transparent",border:`1px solid ${C.border}`,color:C.accent,padding:"0.5rem 1rem",borderRadius:6,cursor:"pointer",fontSize:"0.85rem"}}>Browse all →</button>
        </div>
        <div style={s.grid}>{MEDS.slice(0,6).map(m=><MedCard key={m.id} med={m} onClick={()=>setPage({view:"med",id:m.id})}/>)}</div>
        <div style={{marginTop:"3rem"}}>
          <h2 style={s.sTitle}>Articles & Reference</h2>
          <p style={s.sSub}>Guides, overviews, and Jerod's commentary on the broader world of psychiatric medications.</p>
          <div style={s.grid}>{ARTICLES.slice(0,6).map(a=><ArticleCard key={a.id} article={a} onClick={()=>setPage({view:"article",id:a.id})}/>)}</div>
        </div>
      </div>
    </div>
  );
}

function MedIndexPage({setPage}){
  const [filter,sF]=useState("all");
  const [q,sQ]=useState("");
  const allClasses=[...new Set(MEDS.flatMap(m=>m.classes))].sort();
  const shown=MEDS.filter(m=>{
    const mc=filter==="all"||m.classes.includes(filter);
    const mq=!q||m.brandName.toLowerCase().includes(q.toLowerCase())||m.genericName.toLowerCase().includes(q.toLowerCase());
    return mc&&mq;
  });
  return(
    <div style={s.section}>
      <h1 style={{...s.sTitle,fontSize:"2rem",marginBottom:"0.5rem"}}>Medications</h1>
      <p style={{...s.sSub,marginBottom:"1.5rem"}}>{MEDS.length} medications. More being added.</p>
      <div style={{marginBottom:"1.5rem"}}>
        <input value={q} onChange={e=>sQ(e.target.value)} placeholder="Search…" style={{...s.searchInput,maxWidth:280,padding:"0.6rem 1rem"}}/>
      </div>
      <div style={s.filterBar}>
        <button style={s.filterBtn(filter==="all")} onClick={()=>sF("all")}>All</button>
        {allClasses.map(c=><button key={c} style={s.filterBtn(filter===c)} onClick={()=>sF(c)}>{c}</button>)}
      </div>
      {shown.length===0&&<p style={{color:C.muted}}>No medications match that filter.</p>}
      <div style={s.grid}>{shown.map(m=><MedCard key={m.id} med={m} onClick={()=>setPage({view:"med",id:m.id})}/>)}</div>
    </div>
  );
}

function MedDetailPage({id,setPage}){
  const med=MEDS.find(m=>m.id===id);
  if(!med)return <div style={{padding:"2rem",color:C.muted}}>Medication not found.</div>;
  const toc=[
    {k:"approved",l:"Approved uses"},
    med.overseasUses&&{k:"overseas",l:"Approved overseas"},
    {k:"offlabel",l:"Off-label uses"},
    {k:"onset",l:"Onset & likelihood"},
    (med.pros||med.cons)&&{k:"proscons",l:"Pros & cons"},
    med.sideEffectsTypical&&{k:"se",l:"Side effects"},
    med.interestingStuff&&{k:"interesting",l:"Interesting stuff"},
    {k:"dosage",l:"Dosage"},
    {k:"stop",l:"How to stop"},
    med.halfLife&&{k:"halflife",l:"Half-life"},
    med.comments&&{k:"comments",l:"Comments"},
  ].filter(Boolean);
  return(
    <div style={s.detailWrap}>
      <div>
        <button style={s.backBtn} onClick={()=>setPage({view:"meds"})}>← All meds</button>
        <div style={s.toc}>
          <div style={s.tocTitle}>On this page</div>
          {toc.map(t=><button key={t.k} style={s.tocBtn} onClick={()=>document.getElementById(`sec-${t.k}`)?.scrollIntoView({behavior:"smooth",block:"start"})}>{t.l}</button>)}
        </div>
      </div>
      <div style={s.detailMain}>
        <div style={s.detailHdr}>
          <h1 style={s.detailBrand}>{med.brandName}</h1>
          <div style={s.detailGeneric}>{med.genericName}</div>
          {med.otherForms&&<div style={s.detailOther}>Also available as: {med.otherForms}</div>}
          <div style={s.tags}>{med.classes.map(c=><Tag key={c} cls={c}/>)}</div>
        </div>
        {(med.halfLife||med.steadyState||med.shelfLife)&&(
          <div style={s.quickStats}>
            {med.halfLife&&<div style={s.stat}><div style={s.statLabel}>Half-life</div><div style={s.statVal}>{med.halfLife}</div></div>}
            {med.steadyState&&<div style={s.stat}><div style={s.statLabel}>Steady state</div><div style={s.statVal}>{med.steadyState}</div></div>}
            {med.shelfLife&&<div style={s.stat}><div style={s.statLabel}>Shelf life</div><div style={s.statVal}>{med.shelfLife}</div></div>}
          </div>
        )}
        <Disclaimer/>
        <div id="sec-approved"><Block title="FDA Approved Uses"><ul style={s.ul}>{med.approvedUses.map((u,i)=><li key={i} style={s.li}>{u}</li>)}</ul></Block></div>
        {med.overseasUses&&<div id="sec-overseas"><Block title="Approved Overseas But Not in the US"><p style={s.blockText}>{med.overseasUses}</p></Block></div>}
        <div id="sec-offlabel">
          <div style={s.block}><div style={s.blockTitle}>Off-Label Uses</div>
            <ul style={s.ul}>{med.offLabelUses.map((u,i)=><li key={i} style={s.li}>{u}</li>)}</ul>
            {med.offLabelDetail&&<p style={{marginTop:"1rem",color:C.muted,fontSize:"0.875rem",lineHeight:1.8,fontStyle:"italic",borderLeft:`3px solid ${C.border}`,paddingLeft:"1rem"}}>{med.offLabelDetail}</p>}
          </div>
        </div>
        <div id="sec-onset">
          <Block title="Onset of Action & Likelihood of Working">
            <p style={s.blockText}>{med.onset}</p>
            {med.likelihood&&<p style={{...s.blockText,marginTop:"1rem"}}>{med.likelihood}</p>}
          </Block>
        </div>
        {(med.pros||med.cons)&&(
          <div id="sec-proscons">
            <div style={s.blockTitle}>Pros & Cons</div>
            <div style={s.prosCons}>
              {med.pros&&<div style={s.prosBox}><div style={s.prosTitle}>Pros</div><p style={{margin:0,color:C.text,fontSize:"0.9rem",lineHeight:1.7}}>{med.pros}</p></div>}
              {med.cons&&<div style={s.consBox}><div style={s.consTitle}>Cons</div><p style={{margin:0,color:C.text,fontSize:"0.9rem",lineHeight:1.7}}>{med.cons}</p></div>}
            </div>
          </div>
        )}
        {med.sideEffectsTypical&&(
          <div id="sec-se">
            <div style={s.blockTitle}>Side Effects</div>
            <div style={s.seBox}><div style={s.seTitle}>Typical</div><p style={{margin:0,color:C.text,fontSize:"0.875rem",lineHeight:1.75}}>{med.sideEffectsTypical}</p></div>
            {med.sideEffectsUncommon&&<div style={s.seBox}><div style={s.seTitle}>Not so common</div><p style={{margin:0,color:C.text,fontSize:"0.875rem",lineHeight:1.75}}>{med.sideEffectsUncommon}</p></div>}
            {med.sideEffectsRare&&<div style={s.seBox}><div style={{...s.seTitle,color:C.red}}>Freaky rare</div><p style={{margin:0,color:C.text,fontSize:"0.875rem",lineHeight:1.75}}>{med.sideEffectsRare}</p></div>}
          </div>
        )}
        {med.interestingStuff&&<div id="sec-interesting"><Block title="Interesting Stuff Your Doctor Probably Won't Tell You"><p style={s.blockText}>{med.interestingStuff}</p></Block></div>}
        <div id="sec-dosage"><Block title="Dosage & How to Take"><p style={s.blockText}>{med.dosage}</p></Block></div>
        <div id="sec-stop"><Block title="How to Stop Taking"><p style={{...s.blockText,background:C.surfaceHi,borderRadius:8,padding:"1rem",borderLeft:`3px solid ${C.red}`}}>{med.howToStop}</p></Block></div>
        {med.halfLife&&<div id="sec-halflife"><Block title="Half-Life & Clearance"><p style={s.blockText}>{med.halfLife}</p></Block></div>}
        {med.comments&&<div id="sec-comments"><Block title="Comments"><p style={{...s.blockText,fontStyle:"italic"}}>{med.comments}</p></Block></div>}
      </div>
    </div>
  );
}

function ArticleIndexPage({setPage}){
  return(
    <div style={s.section}>
      <h1 style={{...s.sTitle,fontSize:"2rem",marginBottom:"0.5rem"}}>Articles & Reference</h1>
      <p style={{...s.sSub,marginBottom:"2rem"}}>Guides, overviews, and Jerod's commentary on the broader world of psychiatric medications.</p>
      <div style={s.grid}>{ARTICLES.map(a=><ArticleCard key={a.id} article={a} onClick={()=>setPage({view:"article",id:a.id})}/>)}</div>
    </div>
  );
}

function ArticleDetailPage({id,setPage}){
  const article=ARTICLES.find(a=>a.id===id);
  if(!article)return <div style={{padding:"2rem",color:C.muted}}>Article not found.</div>;
  return(
    <div style={{maxWidth:800,margin:"0 auto",padding:"2.5rem 2rem"}}>
      <button style={s.backBtn} onClick={()=>setPage({view:"articles"})}>← All articles</button>
      <div style={{marginBottom:"2.5rem",paddingBottom:"2rem",borderBottom:`1px solid ${C.border}`}}>
        <h1 style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:"clamp(1.8rem,4vw,2.5rem)",fontWeight:700,color:"#e8e4f0",lineHeight:1.1,marginBottom:"0.5rem"}}>{article.title}</h1>
        {article.subtitle&&<p style={{color:C.muted,fontSize:"1rem"}}>{article.subtitle}</p>}
      </div>
      {article.sections.map((sec,i)=>(
        <div key={i} style={{marginBottom:"2rem"}}>
          {sec.h&&<h2 style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:"1.3rem",fontWeight:600,color:"#e8e4f0",marginBottom:"0.75rem"}}>{sec.h}</h2>}
          <p style={{color:C.text,fontSize:"0.95rem",lineHeight:1.85,margin:0}}>{renderText(sec.b)}</p>
        </div>
      ))}
    </div>
  );
}

function BenzoTablePage(){
  const cc={"Short-acting":{color:C.red,bg:"#1e0a0a"},"Intermediate":{color:"#d4b832",bg:"#1c1a08"},"Long-acting":{color:C.green,bg:"#0a1e12"}};
  return(
    <div style={s.section}>
      <h1 style={{...s.sTitle,fontSize:"2rem",marginBottom:"0.5rem"}}>Benzodiazepines</h1>
      <p style={{...s.sSub,marginBottom:"2rem"}}>Classifications, half-life, and approved uses. Potency and efficacy are two completely different things.</p>
      <Disclaimer/>
      <div style={{overflowX:"auto"}}>
        <table style={s.benzoTable}>
          <thead><tr>{["Brand","Generic","Classification","Half-life (hrs)","AED","Anxiety","Sleep","DTs","Potency"].map(h=><th key={h} style={s.benzoTh}>{h}</th>)}</tr></thead>
          <tbody>
            {BENZOS.map(b=>(
              <tr key={b.brand}>
                <td style={{...s.benzoTd,fontWeight:500,color:"#e8e4f0"}}>{b.brand}</td>
                <td style={{...s.benzoTd,fontFamily:"'DM Mono',monospace",fontSize:"0.8rem",color:C.muted}}>{b.generic}</td>
                <td style={s.benzoTd}><span style={{...cc[b.cls],padding:"0.2rem 0.6rem",borderRadius:20,fontSize:"0.75rem",fontWeight:500}}>{b.cls}</span></td>
                <td style={{...s.benzoTd,color:C.muted,fontFamily:"'DM Mono',monospace",fontSize:"0.85rem"}}>{b.hl}</td>
                {[b.aed,b.anxiety,b.sleep,b.dts].map((v,i)=><td key={i} style={s.benzoTd}><span style={s.dot(v)}/></td>)}
                <td style={s.benzoTd}><span style={s.potPill(b.potency)}>{b.potency}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{marginTop:"1.5rem",color:C.muted,fontSize:"0.8rem",lineHeight:1.8}}>
        <p><strong style={{color:C.text}}>AED</strong> = Antiepileptic drug. The benzo is approved to treat epilepsy.</p>
        <p><strong style={{color:C.text}}>DTs</strong> = Delirium tremens. The benzo is approved to treat severe symptoms of sudden alcohol withdrawal. DTs can be fatal.</p>
      </div>
    </div>
  );
}

export default function App(){
  const [page,setPage]=useState({view:"home"});
  useEffect(()=>{
    if(!document.getElementById("cm-fonts")){
      const l=document.createElement("link");
      l.id="cm-fonts";l.rel="stylesheet";
      l.href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&family=DM+Mono&display=swap";
      document.head.appendChild(l);
    }
    if(!document.getElementById("cm-style")){
      const el=document.createElement("style");
      el.id="cm-style";
      el.textContent=`*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}body{background:#0d0b14}input:focus{border-color:#b48ef5!important;box-shadow:0 0 0 3px #1e1630}input::placeholder{color:#3a3650}::-webkit-scrollbar{width:6px;height:6px}::-webkit-scrollbar-track{background:#131120}::-webkit-scrollbar-thumb{background:#252238;border-radius:3px}tr:hover td{background:#1c1830}a{color:#b48ef5}button:hover{opacity:0.85}`;
      document.head.appendChild(el);
    }
  },[]);
  useEffect(()=>{window.scrollTo(0,0)},[page]);
  return(
    <div style={s.page}>
      <Nav page={page} setPage={setPage}/>
      {page.view==="home"&&<HomePage setPage={setPage}/>}
      {page.view==="meds"&&<MedIndexPage setPage={setPage}/>}
      {page.view==="med"&&<MedDetailPage id={page.id} setPage={setPage}/>}
      {page.view==="benzos"&&<BenzoTablePage/>}
      {page.view==="articles"&&<ArticleIndexPage setPage={setPage}/>}
      {page.view==="article"&&<ArticleDetailPage id={page.id} setPage={setPage}/>}
      <Footer/>
    </div>
  );
}
