export interface BlogArticle {
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: number
  tag: string
  author: string
  content: string
  headings: string[]
}

export const blogArticles: Record<string, BlogArticle> = {
  'hrv-high-performers': {
    slug: 'hrv-high-performers',
    title: 'What Is HRV and Why High Performers Track It Daily',
    excerpt: 'Your heart doesn\'t beat like a metronome. The variation between beats tells you more about your readiness than any fitness test ever could.',
    date: 'March 2026',
    readTime: 6,
    tag: 'HRV Science',
    author: 'Korosh Rasaian',
    content: `Most people check the weather before deciding what to wear. Almost nobody checks their nervous system before deciding how hard to train, how much to eat, or whether today is a day to push or a day to pull back. That needs to change.

## The number your doctor never mentions

Heart rate variability — HRV — measures the tiny time differences between each heartbeat. Not how fast your heart beats. How irregular the spacing is between beats. And counterintuitively, more irregularity is better.

A high HRV means your autonomic nervous system is flexible. Your vagus nerve — the long nerve connecting brain to gut — has strong tone. You can switch between "go" and "recover" without getting stuck in either mode. A low HRV means you're locked into stress mode, whether you feel stressed or not.

The metric to watch is RMSSD. It specifically tracks parasympathetic activity. Higher RMSSD = better cardiovascular health, faster recovery, and improved emotional control. This isn't fringe science. Cardiologists have used HRV in clinical settings for decades. It just hasn't trickled down to the people who need it most: high-performing professionals running on stress and caffeine.

## Why this changes everything about training

I used to train on a fixed schedule. Monday legs, Wednesday push, Friday pull. It didn't matter if I slept four hours or eight. The plan was the plan. Stupid.

HRV reframes the entire conversation. When your HRV is elevated above your personal baseline, your nervous system has recovered. You're primed for intensity — heavy lifts, sprints, deep focused work. When it drops, even by 10-15%, you're in a state where pushing hard creates more damage than adaptation. You get injured. You overtrain. Your hormones crash.

For founders and executives, this is especially relevant. The chronic low-grade stress of leadership — back-to-back meetings, investor calls, broken sleep — suppresses HRV silently. You feel "fine" because you're used to it. But your biology is screaming for recovery. HRV makes the invisible visible.

## Six modes, not one plan

This is where we built Biolune's decision engine. Your HRV, combined with sleep data and resting heart rate, determines which of six protocol modes activates each day:

**TRAIN HARD** — your nervous system is fully recovered. Attack it. High-intensity training, deep work sessions, ambitious output. **TRAIN LIGHT** — you're functional but not recovered. Stay in Zone 2. Do skill work. Don't force it. **DE-LOAD** — three or more days of declining HRV. Your body is begging for structured recovery. Listen to it. **PROTECT SLEEP** — sleep debt is accumulating. Everything else is secondary. **TRAVEL MODE** — circadian disruption detected. Different rules apply. **BASELINE** — not enough data yet. Keep logging.

No fixed plan survives contact with your actual biology. The protocol has to move with you.

## Start here

Any modern wearable tracks HRV — Oura, Apple Watch, Whoop, Garmin. The key: measure at the same time each morning, before you get out of bed. Give it three weeks of consistent data before you read anything into the trends. Your personal baseline matters infinitely more than population averages.

Then let the data drive the decisions. Not your ego. Not your calendar. Your biology.`,
    headings: [
      'The number your doctor never mentions',
      'Why this changes everything about training',
      'Six modes, not one plan',
      'Start here',
    ],
  },
  'insulin-metabolism': {
    slug: 'insulin-metabolism',
    title: 'How Insulin Shapes Your Energy, Body Composition, and Longevity',
    excerpt: 'You don\'t have an energy problem. You have an insulin problem. And the fix isn\'t eating less — it\'s eating smarter.',
    date: 'February 2026',
    readTime: 7,
    tag: 'Metabolism',
    author: 'Korosh Rasaian',
    content: `If I had to pick one hormone that determines whether you feel sharp or sluggish, lean or puffy, aging fast or aging slow — it's insulin. Not testosterone. Not cortisol. Insulin.

Most people only hear about insulin when diabetes enters the conversation. That framing misses the point entirely. Insulin is the master switch for your metabolism, and the majority of professionals I work with have it set wrong without knowing it.

## The hormone running your metabolism

Simple version: you eat, your pancreas releases insulin, glucose enters your cells. Done. Except it's not done — not if you're eating six times a day, snacking between meals, and drinking that oat milk latte at 3 PM to survive the afternoon.

Chronic eating keeps insulin chronically elevated. Your cells stop responding to it — like ignoring a fire alarm that goes off every hour. That's insulin resistance. Your pancreas compensates by producing more insulin. And now you're in a loop: more insulin, more resistance, more fat storage, more inflammation, less energy, worse sleep.

Peter Attia calls insulin resistance the foundational driver of age-related disease. Not one of many — the foundational one. It accelerates aging at the cellular level. It drives fat accumulation around your organs. It amplifies every inflammatory process in your body.

## What insulin resistance actually feels like

Nobody wakes up and says "I think I have insulin resistance." It doesn't feel like disease. It feels like modern life:

You crash after lunch. You're hungry two hours after eating. You can't lose that last 5kg no matter what you do. Afternoon brain fog is just "normal" now. Your joints ache. You recover slowly from workouts. You're inflamed but you don't know what inflammation feels like because it's been there so long.

At the hormonal level, elevated insulin suppresses fat oxidation. Your body becomes a sugar-burning machine that can't access its own fat stores. It ramps up VLDL — the most dangerous form of cholesterol. It triggers mTOR pathways that accelerate aging. It amplifies inflammatory cytokines that set the stage for autoimmune dysfunction and cancer.

Jason Fung's work drove this home: obesity, type 2 diabetes, PCOS, metabolic syndrome — they're not caused by eating too much. They're caused by a hormonal environment that's been broken by constant insulin signaling. "Eat less, move more" fails because it ignores the actual driver.

## What actually works

Good news: insulin sensitivity is trainable. And the levers are simpler than you think.

**Order matters.** Eating protein and fiber before carbs slows glucose absorption and cuts the insulin spike by up to 30%. Same meal, different order, different hormonal response.

**Timing matters.** Your insulin sensitivity is highest in the morning and drops throughout the day. Eating the same carbs at 8 AM produces a significantly smaller insulin response than eating them at 9 PM.

**Frequency matters.** Three proper meals produce lower average insulin than six small ones, even at identical calories. Every time you eat, insulin spikes. Fewer spikes means more time in fat-burning mode. This is the core mechanism behind intermittent fasting.

## How we use this

On a TRAIN HARD day with high HRV, your protocol shifts toward more carbs timed around training — your muscles are primed to absorb glucose. On a DE-LOAD day or low-HRV day, carbs drop, the fasting window extends, and your body gets time to restore insulin sensitivity.

Supplements shift too. Chromium and berberine come in during insulin-sensitivity phases. Carnitine increases during fat-oxidation windows.

The principle isn't restriction. It's alignment. You eat what your biology is ready for, when it's ready for it. Not based on a fixed plan that ignores the fact that your body is different on Tuesday than it was on Monday.`,
    headings: [
      'The hormone running your metabolism',
      'What insulin resistance actually feels like',
      'What actually works',
      'How we use this',
    ],
  },
  'intermittent-fasting': {
    slug: 'intermittent-fasting',
    title: 'Intermittent Fasting: The Science Behind Time-Restricted Eating',
    excerpt: 'Fasting isn\'t about eating less. It\'s about giving your body the metabolic silence it needs to actually repair itself.',
    date: 'January 2026',
    readTime: 8,
    tag: 'Fasting',
    author: 'Korosh Rasaian',
    content: `I've been fasting for three years. Not because some influencer told me to — because I tracked what it did to my HRV, my body composition, and my cognitive output, and the data was undeniable. But fasting is also one of the most misunderstood tools in health optimization. So let me cut through the noise.

## The protocols — and which ones actually matter

**16:8** — skip breakfast, eat from noon to 8 PM. The most popular protocol because it's the easiest to sustain. Most of the metabolic benefits kick in here. This is where I'd start anyone who's never fasted.

**18:6** — tighter window, stronger effects. You get deeper into fat oxidation and autophagy starts meaningfully ramping up. But it requires more discipline around nutrient density — you have fewer hours to get your protein and micronutrients in.

**OMAD (One Meal a Day)** — powerful hormonal shifts. I've done stretches of this during de-load weeks. It works, but you need to be meticulous about nutrient completeness. One bad OMAD meal and you're in caloric deficit with micronutrient gaps. Not sustainable for most people long-term.

**Extended fasts (24-72h)** — these are tools, not habits. Once every month or quarter, they trigger deep autophagy and cellular cleanup. But daily? No. Your training and recovery suffer.

The right protocol depends on your training phase, your stress load, and your metabolic state. An athlete in heavy training might do 14:10. An entrepreneur in a cognitive-heavy week with low training volume might thrive on 18:6. One size has never fit anyone.

## What actually happens when you stop eating

Satchin Panda's circadian biology research made this click for me. We evolved to eat within a narrow daily window. The 24/7 eating pattern of modern life — breakfast at 7, snacks at 10, lunch at 12:30, afternoon coffee and cookie at 3, dinner at 7, late-night snack at 10 — is an evolutionary aberration. Your digestive system, liver, and pancreas never get a break.

When you stop eating, insulin drops within hours. Glycogen depletes by the 4-6 hour mark. Your body switches from burning glucose to burning fat. That metabolic state is where the real benefits emerge: improved insulin sensitivity, increased growth hormone during sleep, BDNF expression (your brain's growth factor), and genuine digestive recovery.

Past 16-18 hours, autophagy ramps up — your cells start recycling damaged proteins and clearing out cellular debris. David Sinclair's work positions this as one of the most powerful longevity interventions available, and it costs literally nothing.

## The supplement problem nobody talks about

This is where most fasting advice falls apart. Your supplement stack and your fasting window need to be coordinated, and almost nobody does this properly.

Fat-soluble vitamins — D3, K2, Omega-3, CoQ10, Ashwagandha — need dietary fat to absorb. Taking them during your fasting window is throwing money away. They go in with your first meal. Period.

Water-soluble supplements — magnesium, electrolytes, creatine, B vitamins — are fine during the fast. Creatine in your morning water with electrolytes? Perfect. Vitamin D at 7 AM on an empty stomach? Useless.

This supplement-fasting coordination is one of the things we built directly into the protocol engine. Your stack shifts automatically based on your eating window — fat-soluble compounds anchor to your first meal, water-soluble compounds spread through the day.

## The mistakes that wreck people

**Undereating.** The most common one. People fast 18 hours and then eat like a bird during their 6-hour window. You're not fasting for longevity anymore — you're just malnourishing yourself. Your metabolism slows. Your hormones crash. You lose muscle.

**Stacking stressors.** IF plus keto plus heavy training plus poor sleep. That's not biohacking. That's cortisol abuse. Pick one metabolic stressor at a time.

**Ignoring sex differences.** Women's reproductive hormones are more sensitive to fasting stress. 14:10 often works better than 16:8 for most women. Going straight to 18:6 can disrupt menstrual cycles and tank energy.

## Who should probably not fast

Pregnant or breastfeeding women. Anyone with a history of eating disorders. People on medications that require food for absorption. Athletes doing multiple daily training sessions in heavy competition phases.

For everyone else — if you're not fasting in some form, you're missing one of the most powerful free tools available for metabolic health, cognitive performance, and longevity.`,
    headings: [
      'The protocols — and which ones actually matter',
      'What actually happens when you stop eating',
      'The supplement problem nobody talks about',
      'The mistakes that wreck people',
      'Who should probably not fast',
    ],
  },
  'autophagy': {
    slug: 'autophagy',
    title: 'Autophagy: Your Body\'s Built-In Repair System',
    excerpt: 'Your cells have a built-in recycling plant. Most people never turn it on. That\'s a problem if you care about aging well.',
    date: 'December 2025',
    readTime: 7,
    tag: 'Longevity',
    author: 'Korosh Rasaian',
    content: `Every cell in your body accumulates damage. Misfolded proteins. Broken mitochondria. Cellular debris. If you never clean house, the junk piles up. The cells get sluggish, then dysfunctional, then dangerous. That accumulation is directly linked to Alzheimer's, Parkinson's, cancer, and every other disease we associate with "getting old."

Your body has a system for this. It's called autophagy — literally "self-eating" — and it's one of the most elegant repair mechanisms in biology. The problem: most modern lifestyles keep it permanently switched off.

## What's actually happening inside your cells

Autophagy is cellular quality control. Your cells identify damaged components — broken mitochondria, misfolded proteins, intracellular bacteria — isolate them into vesicles, break them down, and recycle the raw materials. The amino acids from junked proteins get rebuilt into new ones. Busted mitochondria get replaced with functional ones.

Yoshinori Ohsumi won the 2016 Nobel Prize for mapping these mechanisms. His work showed that without functioning autophagy, cells deteriorate rapidly. With it, they self-renew continuously.

Think of it like this: you can either renovate your house periodically, replacing what's worn out and clearing what's broken — or you can let it decay until structural damage becomes irreversible. Autophagy is the renovation.

## Why longevity researchers are obsessed with this

David Sinclair's lab at Harvard has put autophagy at the center of the aging conversation. Activating autophagy through fasting, exercise, and caloric restriction consistently extends lifespan in animal models and improves aging biomarkers in humans. The mechanism is direct: clear the damaged cellular material, reduce cancer risk (precancerous cells get recycled), improve immune function (intracellular pathogens get eliminated), protect brain health (protein aggregates get flushed).

In Sinclair's framework of aging hallmarks, autophagy dysfunction is one of the primary drivers. When autophagy declines — as it does with age — the hallmarks accelerate. When you activate it, they slow down or reverse.

This isn't theoretical. People with naturally higher autophagy activity live longer, get fewer cancers, and maintain cognitive function deeper into old age. The question is whether you can deliberately activate it. You can.

## How to turn it on

**Fasting** is the most powerful trigger. After roughly 16 hours without food, when glycogen is depleted and cellular energy runs low, autophagy ramps up significantly. The longer the fast (up to about 72 hours), the stronger the effect. This is the real mechanism behind intermittent fasting's health benefits — not just weight loss, but cellular renovation.

**High-intensity exercise** triggers autophagy through energy depletion and metabolic stress. Your muscles burn through ATP, your cells sense the energy deficit, and the cleanup crew activates. Moderate exercise helps. Intense exercise helps more.

**Deep sleep** amplifies autophagy through circadian mechanisms. The brain's glymphatic system — its waste clearance network — operates primarily during deep sleep, flushing out the exact proteins that autophagy targets. Poor sleep doesn't just make you tired. It lets cellular waste accumulate.

**Cold exposure** adds another stimulus. The metabolic stress of cold activates brown fat tissue and triggers additional cellular cleaning pathways.

**Specific compounds** can modulate the process: polyphenols from berries and tea, spermidine from fermented foods and mushrooms, resveratrol. These aren't substitutes for fasting and exercise, but they add to the effect.

## The timing trap

Here's where people go wrong. They hear "autophagy is good" and try to maximize it constantly — fasting aggressively, training hard, restricting calories, cold plunging daily. All at once.

That's not optimization. That's destruction. Autophagy cleans the mess, but you need recovery to actually rebuild. Training hard without adequate sleep and nutrition creates damage faster than autophagy can clear it. Extended fasting without refeeding loses muscle and suppresses hormones.

The protocol needs to cycle. During DE-LOAD weeks, we extend fasting windows, reduce training intensity, prioritize sleep, and let autophagy do its deep cleaning. During TRAIN HARD phases, we shorten fasts, increase protein, and prioritize muscle building and performance. The cleaning and the building take turns.

This cycling — alternating autophagy-promoting phases with growth-promoting phases — produces superior outcomes in body composition, performance, and longevity compared to any steady-state approach. Your cells need both the renovation and the rebuilding. Neither alone is enough.`,
    headings: [
      'What\'s actually happening inside your cells',
      'Why longevity researchers are obsessed with this',
      'How to turn it on',
      'The timing trap',
    ],
  },
  'sleep-architecture': {
    slug: 'sleep-architecture',
    title: 'The Science of Sleep Architecture: Why 8 Hours Isn\'t Enough',
    excerpt: 'You\'re not sleeping wrong because you\'re going to bed too late. You\'re sleeping wrong because nobody taught you what sleep is actually for.',
    date: 'November 2025',
    readTime: 8,
    tag: 'Sleep Science',
    author: 'Korosh Rasaian',
    content: `I can optimize your training, your nutrition, your supplement timing — and if your sleep is broken, I've wasted both our time. Sleep isn't "rest." It's the most metabolically active recovery process your body performs. And the difference between seven hours of fragmented garbage sleep and seven hours of consolidated deep + REM sleep is the difference between someone who's aging well and someone who's falling apart.

## What happens when you're unconscious

Your brain doesn't shut off when you sleep. It cycles through distinct stages, each with a specific job. Skip or fragment any of them and the whole system suffers.

**Light sleep (Stages 1 & 2)** — about 50% of your night. Transition stages. Heart rate and temperature regulation. Procedural memory consolidation. That new movement pattern you learned in the gym? It's getting wired during light sleep.

**Deep sleep (Stage 3)** — roughly 20% of the night, concentrated in the first half. This is where the magic happens. Growth hormone releases almost exclusively during deep sleep. Not in the gym. Not during meals. During deep sleep. GH drives muscle protein synthesis, bone density, fat metabolism, and immune function. Miss your deep sleep window and you miss your GH window.

Deep sleep is also when your brain's glymphatic system activates — flushing out amyloid-beta and tau proteins. The same proteins that accumulate in Alzheimer's. Matthew Walker's research at Berkeley made this connection undeniable: chronic deep sleep deprivation correlates directly with neurodegenerative disease risk.

**REM sleep** — about 30%, concentrated in the second half of the night. Dreaming. Emotional processing. Complex learning consolidation. Creative problem-solving. Acetylcholine — your attention neurotransmitter — surges during REM. Cut your sleep short in the morning and you're amputating REM.

Walker's key insight that changed how I think about sleep: architecture matters more than duration. Seven consolidated hours with full deep and REM cycles beats nine fragmented hours every time. Stop counting hours and start measuring quality.

## Deep sleep is where you earn your recovery

An athlete sleeping six fragmented hours might capture 20 minutes of deep sleep. The same person sleeping seven consolidated hours captures 90 minutes. That's not a marginal difference — it's the difference between recovering from yesterday's training and carrying accumulated fatigue into tomorrow.

For people under chronic stress — founders, executives, surgeons, anyone making consequential decisions under pressure — deep sleep is where cortisol gets reset. Without it, cortisol stays elevated through the next day. You're wired but tired. Anxious but exhausted. Making worse decisions and not realizing it because your subjective sense of "fine" has recalibrated to a broken baseline.

## REM is your brain's therapy session

While deep sleep handles the body, REM handles the mind. It's where emotional experiences from the day get integrated and their emotional charge gets reduced. Without adequate REM, you wake up reactive. Emotionally volatile. Creatively flat.

There's a reason "sleep on it" is universal advice. Your brain literally processes complex problems during REM sleep and presents solutions upon waking. Leaders making high-stakes decisions should treat REM sleep as a strategic asset, not a luxury.

## What actually improves sleep quality

**Consistency over duration.** Same bed time, same wake time, weekdays and weekends. Your circadian rhythm is a clock, and every time you shift it by two hours on Sunday morning, you give yourself social jetlag that takes days to recover from.

**Temperature.** Your core body temperature needs to drop 1-2 degrees to initiate sleep. Bedroom at 16-19°C. Hot shower 90 minutes before bed — the rapid cooling afterward triggers the drop. This single intervention has the strongest evidence base in all of sleep science.

**Light.** Morning sunlight within 30 minutes of waking sets your circadian clock. Evening blue light suppresses melatonin. These aren't suggestions — they're non-negotiable if you care about sleep architecture. Get outside in the morning. Kill the screens at night.

**Training timing.** Intense exercise 6+ hours before bed improves sleep. Within 3 hours of bed, it disrupts it. Schedule hard sessions early. If you can only train in the evening, keep it to Zone 2.

**The sleep stack.** Magnesium Glycinate (400mg) supports deep sleep entry. Glycine (3g) lowers core body temperature and improves sleep quality. L-Theanine (200mg) calms without sedating. Magnesium L-Threonate (2g) crosses the blood-brain barrier for neurological calm. Apigenin (50mg) is a mild GABAergic. No synthetic melatonin — it down-regulates your natural production.

## How this works in the protocol

When PROTECT SLEEP mode activates — triggered by low HRV or consecutive poor sleep nights — your entire day gets reorganized around sleep recovery. Morning light exposure gets prioritized. Training shifts to low intensity. The supplement stack front-loads calming compounds. Evening routines tighten. Dinner moves earlier.

The protocol also adapts to your specific gaps. If last night's REM was low, it might recommend earlier bedtime and reduced evening stimulation. If deep sleep was fragmented, cold exposure gets added and training timing adjusts.

Sleep isn't one-size-fits-all. Your architecture has patterns, and the protocol learns them.`,
    headings: [
      'What happens when you\'re unconscious',
      'Deep sleep is where you earn your recovery',
      'REM is your brain\'s therapy session',
      'What actually improves sleep quality',
      'How this works in the protocol',
    ],
  },
  'creatine-beyond-gym': {
    slug: 'creatine-beyond-gym',
    title: 'Creatine Beyond the Gym: Cognitive Performance, Longevity, and Cellular Energy',
    excerpt: 'You probably think creatine is for bodybuilders. The research says it might be the most important supplement you\'re not taking for your brain.',
    date: 'October 2025',
    readTime: 7,
    tag: 'Supplements',
    author: 'Korosh Rasaian',
    content: `Creatine monohydrate has over 1,000 peer-reviewed studies behind it spanning three decades. That makes it the single most researched supplement in existence. And somehow, most intelligent people still dismiss it as "that bodybuilder stuff" while spending money on supplements with a fraction of the evidence base. Let me fix that.

## Your cells run on ATP. Creatine keeps it flowing.

Every action your cells perform — contracting a muscle, firing a neuron, synthesizing a protein, mounting an immune response — burns ATP. Adenosine triphosphate. The universal energy currency.

ATP gets used fast and needs constant regeneration. Creatine phosphate is the rapid-response system: it donates a phosphate group to regenerate ATP almost instantly when energy demand exceeds normal production capacity.

Here's the part nobody talks about: your brain is 2% of your body weight and consumes 20% of your ATP. It's the most energy-hungry organ you have. And it relies on creatine for high-demand cognitive tasks — exactly the kind of thinking required by people making complex decisions under pressure.

## The brain benefits are real

Andrew Huberman has covered this extensively on his podcast and in his Stanford work. Creatine supplementation increases prefrontal cortex ATP availability. That translates to better executive function, improved working memory, faster processing speed, and sharper reasoning — especially under stress and sleep deprivation.

That last part matters. We all perform well when rested and relaxed. The question is how you perform when you've slept five hours, you're jet-lagged, and you need to make a consequential decision by noon. Creatine reduces the cognitive decline in exactly those conditions.

Rhonda Patrick's work adds the longevity angle: creatine provides neuroprotection by supporting mitochondrial function, reducing oxidative stress, and protecting against the protein aggregates implicated in Alzheimer's and Parkinson's. It's one of the few supplements with a credible evidence base for cognitive aging prevention.

## Why 5g is wrong for most people

The standard advice — 3-5g daily — comes from studies optimized for muscle saturation in average-sized adults. That dose is probably fine for a 60kg sedentary person. For an 85kg athlete doing intense training four times a week? It's underdosing.

Body composition determines saturation levels. Training intensity determines usage rate. Dietary intake matters — if you eat significant red meat, you're already getting creatine from food. Vegetarians and vegans have lower baseline stores and respond more dramatically to supplementation.

We dose at 10g minimum in the protocol, split into two doses — morning and lunch. During DE-LOAD or PROTECT SLEEP phases when cognitive support matters most and the body is under recovery stress, it goes up to 15g. During travel — when jet lag hammers cognition — we push to 20g split across four doses.

These aren't arbitrary numbers. They're calibrated to the metabolic demands of each protocol mode. The decision engine adjusts creatine alongside everything else.

## The myths that won't die

**"Creatine damages your kidneys."** No. Decades of research in healthy individuals show zero kidney damage from chronic supplementation. The one caveat: if you have pre-existing kidney disease, supplement under medical supervision. Otherwise, this myth comes from a misunderstanding of creatinine (a creatine metabolite) elevating on blood tests, which doctors sometimes confuse with kidney dysfunction.

**"Creatine causes dehydration."** Opposite. Creatine increases intracellular water. Studies consistently show improved hydration status with supplementation.

**"Creatine causes hair loss."** One poorly designed study from 2009 showed a temporary increase in DHT. It's never been replicated. Multiple large meta-analyses show no association between creatine and hair loss or hormonal disruption.

**"Creatine is only for young athletes."** The opposite is true. Aging populations benefit most — creatine preserves lean mass during sarcopenia, supports cognitive function during neurological decline, and maintains metabolic rate. If you're over 40, the case for creatine gets stronger, not weaker.

## How timing and context matter

Creatine isn't magic in isolation. It absorbs best with carbohydrate and protein — the insulin spike from a meal drives creatine into muscle and brain tissue more effectively. Taking it on an empty stomach during a fast? It works, but suboptimally.

In the protocol, creatine timing anchors to your first meal and your post-training window. During IF, the morning dose goes with water and electrolytes (it's water-soluble, so this is fine for fasting), and the second dose goes with your first meal. During non-fasting phases, both doses go with meals.

Every variable interacts with every other variable. Supplement timing, fasting windows, training phase, sleep quality, stress load — they all connect. That's the whole point of running a precision protocol instead of following generic advice from a bottle label.`,
    headings: [
      'Your cells run on ATP. Creatine keeps it flowing.',
      'The brain benefits are real',
      'Why 5g is wrong for most people',
      'The myths that won\'t die',
      'How timing and context matter',
    ],
  },
}

export function getBlogArticle(slug: string): BlogArticle | undefined {
  return blogArticles[slug]
}

export function getAllBlogSlugs(): string[] {
  return Object.keys(blogArticles)
}

export function getAllBlogArticles(): BlogArticle[] {
  return Object.values(blogArticles)
}
