# 03_DESIGN_SYSTEM.md

# FX Options Risk Lab

## Design System

---

## 1. Purpose of This Document

This document defines the visual design system for **FX Options Risk Lab**.

The goal is to create a serious, institutional, finance-native interface that supports quantitative storytelling without becoming a generic dashboard, a student project, a trading game, or a fake Bloomberg terminal.

This design system should guide:

* Layout
* Typography
* Color
* Spacing
* Components
* Charts
* Tables
* Motion
* Responsive behavior
* Visual tone
* Anti-patterns to avoid

The design must make the project feel like a polished quantitative risk analytics system.

---

## 2. Design Objective

The project should visually communicate:

```txt
This is an FX derivatives risk analytics system.
```

The interface should feel:

* Institutional
* Analytical
* Technical
* Dense but readable
* Clean
* Serious
* Market-aware
* Recruiter-friendly
* Interview-defensible

The interface should not feel:

* Playful
* Gamified
* Generic
* Startup SaaS
* Overdesigned
* Academic-blog-like
* Student-template-like
* Fake-terminal-like
* Decorative without substance

The design must support the central project thesis:

> How does a USD/MXN FX options book behave under spot moves, volatility shocks, time decay, and hedging decisions?

Every visual decision should help users understand that question.

---

## 3. Visual Identity

The visual identity should combine:

```txt
Institutional risk dashboard
Dark quant lab
Clean technical case study
Trading desk analytics interface
Minimal professional portfolio page
```

This project should look like something that belongs near a market risk team, derivatives desk, or quant analytics group.

It should not look like:

```txt
A crypto dashboard
A trading simulator
A finance influencer landing page
A college course project
A generic Tailwind template
A neon hacker terminal
A blog post with charts pasted inside it
```

---

## 4. Design Principles

---

### 4.1 Substance Before Decoration

Every card, chart, table, and visual element must carry information.

Do not add visual elements only because the page looks empty.

Empty space is better than fake sophistication.

---

### 4.2 Dense but Controlled

The interface should contain real financial information, but it must remain readable.

Use compact metric cards, tables, chart panels, and annotations.

Avoid massive paragraph blocks.

---

### 4.3 Technical Without Being Hostile

The project should feel technically credible, but not unreadable.

A recruiter should understand the structure quickly.

An interviewer should see enough detail to ask technical questions.

A portfolio visitor should not feel like they opened a central bank annex by accident.

---

### 4.4 Charts Must Explain Risk

Charts are not decoration.

Every chart should answer a financial question:

* What happens when spot moves?
* What happens when volatility moves?
* Where is the book vulnerable?
* What risk remains after hedging?
* How large are tail losses?
* What explains P&L?

If a chart does not answer a question, remove it.

---

### 4.5 No Fake Institutional Theater

Do not use random terminal text, fake order books, fake trade tapes, or blinking market screens.

The project should earn credibility through models, structure, and explanation, not costume design.

---

## 5. Design Keywords

Use these as visual direction:

```txt
Dark
Structured
Precise
Calm
Institutional
Quantitative
Risk-focused
Compact
Sharp
Readable
Professional
```

Avoid these:

```txt
Flashy
Playful
Cartoonish
Neon
Gamified
Influencer-like
Overanimated
Template-like
Blog-like
Decorative
```

---

## 6. Page Layout

---

## 6.1 Overall Layout

Use a single-page vertical narrative layout.

Recommended structure:

```txt
Hero
Market Setup
Options Book
Pricing and Greeks
Stress Testing
Hedging Lab
VaR / Expected Shortfall
P&L Attribution
Assumptions and Limitations
Footer
```

Each section should feel connected to the next.

The page should read like:

```txt
Define the market
Define the book
Price the book
Measure sensitivities
Stress the book
Hedge the book
Measure downside risk
Explain P&L
State limitations
```

This is the story. Do not interrupt it with random UI flourishes, because apparently even projects can suffer from attention issues now.

---

## 6.2 Page Width

Recommended maximum width:

```txt
max-w-7xl
```

For dense dashboard sections, allow wider layouts if needed:

```txt
max-w-[1440px]
```

Do not make text content stretch too wide.

Recommended text width:

```txt
max-w-3xl
```

Recommended chart/table width:

```txt
full available section width
```

---

## 6.3 Section Spacing

Sections should have generous vertical spacing but not feel empty.

Recommended section padding:

```txt
py-20 desktop
py-14 tablet
py-10 mobile
```

Between major content blocks:

```txt
gap-8 to gap-12
```

Between cards:

```txt
gap-4 to gap-6
```

Avoid excessive blank space that makes the site feel like a SaaS landing page pretending to be profound.

---

## 6.4 Section Layout Patterns

Use these layout patterns:

---

### Pattern A: Section Header + Full-Width Analytics Panel

Best for:

* Stress testing
* VaR/ES
* Hedging

Structure:

```txt
Section header
Short explanation
Full-width chart panel
Metric cards below or beside chart
```

---

### Pattern B: Two-Column Explanation + Table/Chart

Best for:

* Market setup
* Options book
* Pricing and Greeks

Structure:

```txt
Left: concise explanation and summary metrics
Right: table or chart panel
```

---

### Pattern C: Dashboard Grid

Best for:

* Hero summary
* Book summary
* Risk limits

Structure:

```txt
Grid of compact cards
2 columns on tablet
4 columns on desktop
1 column on mobile
```

---

### Pattern D: Technical Case Study Block

Best for:

* Assumptions
* Limitations
* Methodology notes

Structure:

```txt
Compact heading
Short explanation
Bullet/grid list of assumptions
```

---

## 7. Color System

---

## 7.1 Color Philosophy

The color system should be dark, restrained, and analytical.

Use color to communicate:

* Risk
* Direction
* Status
* Hierarchy
* Emphasis

Do not use color as decoration.

Do not use bright gradients everywhere.

Do not use random colors per chart just because a chart library offered them like candy to a toddler.

---

## 7.2 Base Colors

Recommended base palette:

```txt
Background Primary:   #05070A
Background Secondary: #080D12
Panel Background:     #0B1118
Panel Elevated:       #101821
Panel Border:         #1D2A36
Panel Border Soft:    #14202B
```

Use deep navy/charcoal tones rather than pure black.

Pure black can look cheap and harsh.

---

## 7.3 Text Colors

Recommended text palette:

```txt
Text Primary:   #E6EDF3
Text Secondary: #AAB7C4
Text Muted:     #6F7D8A
Text Faint:     #46515C
```

Rules:

* Headings use primary text.
* Body text uses secondary text.
* Labels use muted text.
* Footnotes use muted or faint text.

Avoid low contrast text. Recruiters should not need night vision goggles.

---

## 7.4 Accent Colors

Use a restrained institutional accent palette.

Recommended accents:

```txt
Cyan Accent:     #38BDF8
Blue Accent:     #60A5FA
Teal Accent:     #2DD4BF
Amber Accent:    #F59E0B
Red Risk:        #EF4444
Green Gain:      #22C55E
Purple Optional: #A78BFA
```

Use accents sparingly.

Recommended usage:

```txt
Cyan/Blue: primary technical highlight
Teal: positive analytics highlight
Amber: warning / near limit
Red: loss / breach / downside
Green: gain / within limit
Purple: optional secondary series only
```

Do not make every card glow cyan. That is not sophistication. That is a keyboard trying to become a nightclub.

---

## 7.5 Status Colors

Risk status must use both color and label.

```txt
Within Limit:
  Color: #22C55E
  Label: Within limit

Near Limit:
  Color: #F59E0B
  Label: Near limit

Breach:
  Color: #EF4444
  Label: Breach
```

Do not communicate status using color alone.

---

## 7.6 Chart Colors

Use consistent chart colors.

Recommended:

```txt
Primary Series:   #38BDF8
Secondary Series: #2DD4BF
Tertiary Series:  #A78BFA

Positive P&L:     #22C55E
Negative P&L:     #EF4444
Warning:          #F59E0B
Neutral:          #94A3B8
Grid Lines:       #1E293B
Axis Text:        #94A3B8
```

For heatmaps:

```txt
Losses: red scale
Near zero: dark neutral
Gains: green or teal scale
```

Use muted intensity. The heatmap should not look like someone spilled radioactive salsa on the page.

---

## 8. Typography

---

## 8.1 Font Direction

Use a professional sans-serif font.

Recommended options:

```txt
Inter
Geist Sans
IBM Plex Sans
```

For numeric-heavy elements, use a tabular numeric font or font feature:

```css
font-variant-numeric: tabular-nums;
```

Optional monospaced font for labels/code-like values:

```txt
Geist Mono
IBM Plex Mono
JetBrains Mono
```

Use mono sparingly for:

* FX pair labels
* Metric units
* Code-like model terms
* Table IDs
* Small technical labels

Do not make the whole site monospaced. This is not a ransom note from a quant terminal.

---

## 8.2 Type Scale

Recommended type scale:

```txt
Hero Title:
  text-5xl to text-7xl desktop
  text-4xl mobile
  font-semibold or font-bold
  tracking-tight

Section Title:
  text-3xl to text-4xl desktop
  text-2xl mobile
  font-semibold
  tracking-tight

Subsection Title:
  text-xl to text-2xl
  font-semibold

Card Metric:
  text-2xl to text-4xl
  font-semibold
  tabular numbers

Card Label:
  text-xs to text-sm
  uppercase optional
  tracking-wide
  text-muted

Body:
  text-sm to text-base
  leading-7
  text-secondary

Caption:
  text-xs
  text-muted
```

---

## 8.3 Writing Density

Keep copy compact.

Preferred section intro length:

```txt
1 to 2 sentences
```

Preferred card interpretation length:

```txt
1 short sentence
```

Preferred chart explanation length:

```txt
1 to 3 sentences
```

Avoid long blocks of text. This is a risk lab, not a diary entry with Greeks.

---

## 9. Grid System

---

## 9.1 Main Grid

Use CSS grid heavily.

Recommended patterns:

```txt
grid-cols-1
md:grid-cols-2
lg:grid-cols-3
xl:grid-cols-4
```

For dashboard summaries:

```txt
grid-cols-1 md:grid-cols-2 lg:grid-cols-4
```

For section content:

```txt
grid-cols-1 lg:grid-cols-[0.9fr_1.4fr]
```

For charts:

```txt
grid-cols-1 xl:grid-cols-2
```

---

## 9.2 Card Grid Rules

Cards should align cleanly.

Use equal heights where appropriate.

Metric cards should have:

```txt
Consistent padding
Consistent label placement
Consistent value formatting
Consistent border treatment
```

Do not create wildly different card sizes unless the data demands it.

---

## 10. Component Design

---

# 10.1 PageShell

The page shell defines the global frame.

Requirements:

```txt
Dark background
Subtle background texture or radial gradient
Centered content
Consistent section spacing
Footer
```

Optional background treatment:

```txt
Subtle radial gradient near top hero
Very faint grid texture
Very faint noise texture
```

Avoid heavy animated backgrounds.

---

# 10.2 Section

Each section should use consistent structure:

```txt
<section id="...">
  SectionHeader
  Main content grid
</section>
```

Requirements:

```txt
Clear section ID
Top spacing
Bottom spacing
Optional soft divider
```

---

# 10.3 SectionHeader

Each section header should include:

```txt
Eyebrow
Title
One-sentence thesis
Optional technical note
```

Example:

```txt
Eyebrow: Stress Testing
Title: Spot and volatility shocks
Thesis: The book is repriced across USD/MXN and implied volatility scenarios to expose nonlinear risk.
```

Style:

```txt
Eyebrow:
  text-xs
  uppercase
  tracking-[0.2em]
  text-cyan or muted

Title:
  text-3xl / text-4xl
  text-primary

Thesis:
  text-base
  text-secondary
  max-w-3xl
```

---

# 10.4 MetricCard

Metric cards show key values.

Required fields:

```txt
Label
Value
Unit or suffix
Optional status
Optional interpretation
```

Style:

```txt
Background: Panel Background
Border: Panel Border
Border radius: rounded-2xl
Padding: p-5 or p-6
```

Example:

```txt
Label: 95% VaR
Value: MXN 284K
Status: Within limit
Interpretation: Loss threshold under modeled 1-day scenarios.
```

Metric values should use tabular numbers.

---

# 10.5 AnalyticsPanel

Use for charts and major tables.

Required fields:

```txt
Panel title
Panel subtitle
Chart/table content
Optional footer note
```

Style:

```txt
Background: Panel Background
Border: Panel Border
Border radius: rounded-2xl
Padding: p-5 / p-6
```

Panels should look serious and information-heavy without becoming cluttered.

---

# 10.6 NarrativeBlock

Use beside or above charts.

Purpose:

```txt
Explain what the user is seeing.
Explain why it matters.
State the takeaway.
```

Do not write more than 3 sentences.

Example:

```txt
Stress scenarios reprice the full book instead of relying only on linear Greek approximations. The heatmap shows where combined spot and volatility shocks create the largest losses.
```

---

# 10.7 DataTable

Use tables for:

```txt
Market assumptions
Options book
Pricing results
Greeks
Risk limits
Attribution
```

Style:

```txt
Header row: muted uppercase labels
Body rows: compact
Borders: soft horizontal lines
Hover state: subtle panel elevation
Numbers: right-aligned
Text labels: left-aligned
```

Tables should feel like real analytics output.

Do not over-style them into colorful marketing cards.

---

# 10.8 Badge

Use badges for:

```txt
Synthetic data
USD/MXN
Garman-Kohlhagen
95% VaR
Within limit
Breach
```

Style:

```txt
Small
Rounded-full
Soft border
Muted background
Text-xs
```

Badges should not dominate the UI.

---

# 10.9 Toggle Controls

Use toggles for:

```txt
Hedged vs unhedged view
Attribution scenario selector
VaR confidence level, optional
```

Style:

```txt
Segmented control
Compact
Clear active state
Keyboard accessible
```

Avoid giant buttons.

This is not an arcade machine.

---

## 11. Hero Design

---

## 11.1 Hero Layout

Recommended desktop hero layout:

```txt
Left:
  Eyebrow
  Title
  Subtitle
  Thesis sentence
  Small methodology badges

Right:
  Compact dashboard preview or summary metric stack
```

Alternative:

```txt
Centered title
Below: 4 summary cards
Below: compact market/risk snapshot
```

Preferred:

```txt
Left-aligned or slightly asymmetrical layout
```

Avoid overly centered landing-page design.

The hero should not look like a startup selling “AI-powered finance insights” to people who think EBITDA is a smoothie.

---

## 11.2 Hero Required Elements

Hero must include:

```txt
Project title
Subtitle
Short thesis
Four capability cards
Optional GitHub/demo links
```

Capability cards:

```txt
Pricing: Garman-Kohlhagen FX options
Risk: VaR, ES, and stress scenarios
Hedging: Delta and vega exposure control
Attribution: Explains where P&L comes from
```

---

## 11.3 Hero Visual Treatment

Use:

```txt
Subtle radial gradient
Dark layered panels
Compact metric previews
No fake screenshots
No generic stock chart background
```

Optional right-side preview:

```txt
Mini risk snapshot card
Small stress heatmap preview
Net Greeks strip
```

This preview must use real generated data if included.

Do not use placeholder numbers in final version.

---

## 12. Section Design Requirements

---

# 12.1 Market Setup Section

Visual goal:

```txt
Establish base market assumptions clearly.
```

Recommended layout:

```txt
Left: explanation
Right: market assumptions table/cards
```

Must include:

```txt
Spot USD/MXN
Domestic currency MXN
Foreign currency USD
MXN rate
USD rate
ATM volatility
Synthetic data badge
```

Style:

```txt
Compact cards or clean table
No oversized chart needed
```

---

# 12.2 Options Book Section

Visual goal:

```txt
Show the synthetic book as a real portfolio object.
```

Recommended layout:

```txt
Top: summary metric cards
Bottom: full-width options book table
```

Must include:

```txt
Gross notional
Number of instruments
Net market value
Net delta
Net vega
Net theta
```

Table should be dense, clean, and sortable only if useful.

---

# 12.3 Pricing and Greeks Section

Visual goal:

```txt
Show instrument-level and book-level risk.
```

Recommended layout:

```txt
Left: book-level Greeks cards
Right: Greeks table
Below: pricing table or instrument breakdown
```

Important:

* Greek values must show units.
* Signed values must be clearly labeled.
* Long/short exposure must not be visually ambiguous.

---

# 12.4 Stress Testing Section

Visual goal:

```txt
This should be the visual centerpiece.
```

Recommended layout:

```txt
Top: Section header and stress summary cards
Middle: spot-vol heatmap
Bottom: spot shock and vol shock line charts
```

Alternative:

```txt
Left: heatmap
Right: worst/best case cards and explanation
Below: line charts
```

The heatmap must be large enough to read.

Do not bury it under paragraph text.

---

# 12.5 Hedging Lab Section

Visual goal:

```txt
Show that hedging changes risk but does not remove all risk.
```

Recommended layout:

```txt
Top: hedge summary cards
Middle: unhedged vs hedged P&L chart
Bottom: short explanation of residual risk
```

Include toggle:

```txt
Unhedged
Hedged
Both
```

The “Both” view should be default.

---

# 12.6 VaR / Expected Shortfall Section

Visual goal:

```txt
Show downside risk distribution and risk limit status.
```

Recommended layout:

```txt
Left or top: VaR/ES cards
Main: P&L distribution histogram
Side or bottom: risk limit panel
```

The histogram should show VaR markers clearly.

Expected Shortfall can be shown as metric cards and/or marker.

Risk limit status must include text labels.

---

# 12.7 P&L Attribution Section

Visual goal:

```txt
Explain why a scenario made or lost money.
```

Recommended layout:

```txt
Top: scenario selector
Main: attribution waterfall/bar chart
Side/bottom: attribution table with interpretation
```

Default scenario:

```txt
USD/MXN +5%, volatility +3 vol points
```

Include:

```txt
Delta
Gamma
Vega
Theta
Residual
Full repricing P&L
```

This section should feel analytical, not decorative.

---

# 12.8 Assumptions and Limitations Section

Visual goal:

```txt
Make the model look mature and honest.
```

Recommended layout:

```txt
Two-column grid:
  Assumptions
  Limitations / Future extensions
```

Use compact cards or bullet clusters.

Do not make it feel like an apology.

Model limitations increase credibility when written properly.

---

# 12.9 Footer

Visual goal:

```txt
Provide links, disclaimer, and acknowledgment quietly.
```

Footer should include:

```txt
GitHub link
Live demo link, if applicable
Synthetic data disclaimer
Academic acknowledgment
```

The academic acknowledgment should be small and unobtrusive.

Do not put class references in the hero or main project sections.

---

## 13. Chart Design System

---

## 13.1 General Chart Style

Charts should use:

```txt
Dark panel background
Muted grid lines
Clear axis labels
Readable tooltip
Consistent color mapping
Minimal legends
No 3D effects
No unnecessary gradients
```

Do not use default chart library styling without customization.

Default chart styles are where credibility goes to get quietly buried.

---

## 13.2 Axis Labels

Every chart must have clear axis labels.

Examples:

```txt
Spot shock %
Book P&L MXN
Volatility shock, vol points
Scenario count
Simulated P&L MXN
```

Axis labels should be muted but readable.

---

## 13.3 Tooltips

Tooltips should be clean and informative.

Tooltip style:

```txt
Dark elevated background
Soft border
Small text
Formatted values
No raw decimals unless meaningful
```

Example tooltip for stress heatmap:

```txt
Spot shock: +5.0%
Vol shock: +3.0 vol pts
Scenario spot: 17.8500 USD/MXN
Book P&L: MXN -284,000
```

---

## 13.4 Legends

Use legends only when needed.

Place legends:

```txt
Top right
Below chart
Inside chart only if it does not interfere
```

Legend labels must be plain:

```txt
Unhedged P&L
Hedged P&L
95% VaR
99% VaR
```

Do not use cryptic labels like `series_1`.

---

## 13.5 Spot Shock Chart

Type:

```txt
Line chart
```

Style:

```txt
Primary cyan line
Zero P&L reference line
Muted grid
Tooltip with scenario spot and P&L
```

Zero reference line is required.

---

## 13.6 Vol Shock Chart

Type:

```txt
Line chart
```

Style:

```txt
Teal or blue line
Zero P&L reference line
Tooltip with scenario volatility and P&L
```

---

## 13.7 Stress Heatmap

Type:

```txt
Heatmap
```

Style:

```txt
Red for losses
Neutral dark for near zero
Green/teal for gains
Muted axis labels
Cell hover tooltip
```

Required:

```txt
Worst-case scenario visually identifiable
Best-case scenario visually identifiable
Zero or near-zero visually distinct
```

Optional:

```txt
Outline worst-case cell
```

---

## 13.8 Hedge Comparison Chart

Type:

```txt
Two-line chart
```

Style:

```txt
Unhedged: cyan
Hedged: teal
Zero P&L reference line
Tooltip showing both values
```

Default view:

```txt
Show both
```

---

## 13.9 P&L Distribution Histogram

Type:

```txt
Histogram
```

Style:

```txt
Muted bars
VaR markers in red/amber
Tail region visually emphasized if possible
```

Required:

```txt
95% VaR marker
99% VaR marker
```

Do not overcomplicate the histogram.

---

## 13.10 Attribution Chart

Preferred:

```txt
Waterfall chart
```

Acceptable:

```txt
Bar chart
```

Style:

```txt
Positive contributions: green/teal
Negative contributions: red
Residual: amber or muted
Full repricing P&L: primary accent
```

The chart must make it easy to see what drove P&L.

---

## 14. Table Design System

---

## 14.1 General Table Style

Tables should be compact and professional.

Use:

```txt
Dark panel background
Soft horizontal dividers
Muted uppercase headers
Right-aligned numeric columns
Left-aligned text columns
Tabular numbers
Subtle row hover
```

Avoid:

```txt
Thick borders
Bright alternating row colors
Huge row heights
Spreadsheet-like clutter
Decorative icons in every row
```

---

## 14.2 Options Book Table

Columns:

```txt
ID
Type
Position
Notional USD
Strike
Maturity
Implied Volatility
```

Position styling:

```txt
Long: subtle positive badge
Short: subtle negative or neutral badge
```

Do not overemphasize long/short with huge colors.

---

## 14.3 Greeks Table

Columns:

```txt
ID
Delta
Gamma
Vega / 1 vol point
Theta / day
Signed Delta
Signed Vega
Signed Theta
```

Rules:

* Signed values should visually show positive/negative.
* Units must be clear in headers or captions.
* Avoid too many decimals.

---

## 14.4 Risk Limits Table

Columns:

```txt
Metric
Value
Limit
Utilization
Status
```

Status must include text:

```txt
Within limit
Near limit
Breach
```

Use color as support, not as the only signal.

---

## 14.5 Attribution Table

Columns:

```txt
Component
Contribution MXN
Interpretation
```

Interpretation should be concise.

Example:

```txt
Delta: Spot movement impact from first-order exposure.
Gamma: Nonlinear spot curvature effect.
Vega: Implied volatility repricing effect.
Theta: Time decay over the scenario horizon.
Residual: Difference between full repricing and Greek approximation.
```

---

## 15. Motion Design

---

## 15.1 Motion Philosophy

Motion should be minimal and functional.

Use animation to:

* Smooth section entrance
* Emphasize chart loading
* Improve interaction feedback

Do not use animation to create drama.

This is risk analytics. It does not need to enter the room like a magician.

---

## 15.2 Allowed Motion

Allowed:

```txt
Subtle fade-in
Small translate-y entrance
Smooth hover transitions
Segmented toggle transitions
Tooltip appearance
```

Recommended timing:

```txt
150ms to 300ms
```

Recommended easing:

```txt
ease-out
```

---

## 15.3 Avoided Motion

Avoid:

```txt
Bouncing cards
Rotating numbers
Confetti
Parallax-heavy sections
Animated trading tickers
Excessive glowing pulse
Chart animations that delay reading
```

---

## 16. Interaction Design

---

## 16.1 Controls

Controls should be compact and clearly labeled.

Required interactions:

```txt
Hedged vs unhedged toggle
P&L attribution scenario selector
Stress heatmap hover tooltip
```

Optional interactions:

```txt
VaR confidence level toggle
Individual option selector
```

Controls must:

```txt
Have visible active states
Be keyboard accessible
Use clear labels
Not require explanation to operate
```

---

## 16.2 Hover States

Hover states should be subtle.

For cards:

```txt
Slight border brightening
Slight background elevation
No dramatic scaling
```

For table rows:

```txt
Subtle background change
```

For chart points/cells:

```txt
Tooltip and slight highlight
```

---

## 16.3 Focus States

Keyboard focus must be visible.

Use:

```txt
Outline or ring using cyan/blue accent
```

Do not remove focus outlines without replacing them.

---

## 17. Responsive Design

---

## 17.1 Desktop First

Primary target:

```txt
Desktop
```

Reason:

Risk analytics tables, heatmaps, and dense charts are best viewed on larger screens.

Desktop layout should feel like a serious analytics workspace.

---

## 17.2 Tablet

Tablet should preserve readability.

Use:

```txt
Two-column layout where possible
Single-column fallback where necessary
Scrollable tables
Readable charts
```

---

## 17.3 Mobile

Mobile must work but should not pretend to be the ideal dashboard experience.

Use:

```txt
Single-column layout
Stacked cards
Horizontally scrollable tables
Simplified chart labels
Full-width controls
Reduced section spacing
```

For dense heatmaps:

```txt
Allow horizontal scroll
Use simplified labels
Keep tooltip accessible
```

Do not let the mobile view break. Broken mobile layouts make even good projects look abandoned.

---

## 18. Accessibility

The design must support basic accessibility.

Requirements:

```txt
Readable text contrast
Semantic headings
Keyboard-accessible controls
Visible focus states
Text labels for risk status
No information conveyed only by color
Readable font sizes
Descriptive chart titles
```

Status indicators must use both text and color:

```txt
Within limit
Near limit
Breach
```

Charts should have nearby text summaries explaining the key takeaway.

---

## 19. Formatting Standards

---

## 19.1 Currency

Use:

```txt
MXN 1,250,000
MXN 1.25M
USD 1,000,000
USD 1.00M
```

Use compact formatting in metric cards.

Use fuller formatting in tables and tooltips.

---

## 19.2 FX Rates

Use:

```txt
17.0000 USD/MXN
```

Four decimal places are preferred.

---

## 19.3 Percentages

Use:

```txt
12.50%
```

---

## 19.4 Volatility Points

Use:

```txt
+3.0 vol pts
-2.0 vol pts
```

---

## 19.5 Greeks

Label units explicitly:

```txt
Delta: MXN per 1.00 spot move
Gamma: MXN per 1.00 spot move squared
Vega: MXN per 1 vol point
Theta: MXN per day
```

Do not show Greeks without unit context.

---

## 19.6 Positive and Negative Values

Use signs consistently:

```txt
+MXN 250,000
-MXN 175,000
+5.0%
-3.0 vol pts
```

Positive P&L may use green/teal.

Negative P&L may use red.

Do not overuse color in tables.

---

## 20. Copy and Content Style

---

## 20.1 Writing Voice

The website copy should be:

```txt
Concise
Technical
Professional
Finance-native
Direct
Specific
```

Avoid:

```txt
Personal storytelling
Motivational language
Student journey language
Overly casual phrases
Generic LinkedIn language
Marketing buzzwords
```

---

## 20.2 Good Copy Example

```txt
The book is repriced across combined USD/MXN spot and implied volatility shocks. The heatmap identifies where nonlinear option exposure produces the largest stress losses.
```

---

## 20.3 Bad Copy Example

```txt
As someone passionate about finance and technology, I wanted to explore the fascinating world of derivatives through an interactive dashboard.
```

Do not write like that. The internet already has enough of this verbal fog.

---

## 21. Visual Anti-Patterns

The design must avoid the following.

---

## 21.1 Blog Post Layout

Avoid:

```txt
Long centered paragraphs
Huge text blocks
Charts separated by essay sections
No dashboard feel
No metric hierarchy
```

Fix:

```txt
Use compact narrative blocks, cards, tables, and charts.
```

---

## 21.2 Generic SaaS Landing Page

Avoid:

```txt
Gradient hero
Big rounded cards with vague claims
Oversized icons
Marketing-style CTAs
```

Fix:

```txt
Use real metrics, model labels, and analytical outputs.
```

---

## 21.3 Trading Game UI

Avoid:

```txt
Buy/sell buttons
Leaderboard
Scorecards
Game-like colors
Fake trade execution
```

Fix:

```txt
Frame the project as risk analysis, not gameplay.
```

---

## 21.4 Fake Bloomberg Terminal

Avoid:

```txt
Random terminal text
Excessive monospace
Fake tickers
Blinking cursors
Chaotic panels
```

Fix:

```txt
Use institutional density without pretending to be a terminal.
```

---

## 21.5 Finance-Themed Student Project

Avoid:

```txt
Generic dark theme
Random stock chart background
No real calculations visible
Vague project descriptions
Immature color choices
```

Fix:

```txt
Show pricing, Greeks, stress scenarios, hedging impact, VaR/ES, and attribution clearly.
```

---

## 22. Implementation Notes for Tailwind

---

## 22.1 Suggested Theme Tokens

Suggested Tailwind color extension:

```ts
colors: {
  background: {
    primary: "#05070A",
    secondary: "#080D12",
  },
  panel: {
    DEFAULT: "#0B1118",
    elevated: "#101821",
  },
  border: {
    DEFAULT: "#1D2A36",
    soft: "#14202B",
  },
  text: {
    primary: "#E6EDF3",
    secondary: "#AAB7C4",
    muted: "#6F7D8A",
    faint: "#46515C",
  },
  accent: {
    cyan: "#38BDF8",
    blue: "#60A5FA",
    teal: "#2DD4BF",
    amber: "#F59E0B",
    red: "#EF4444",
    green: "#22C55E",
    purple: "#A78BFA",
  },
}
```

---

## 22.2 Suggested Border Radius

Use:

```txt
rounded-xl for smaller controls
rounded-2xl for cards and panels
rounded-3xl for large hero containers, if needed
```

Avoid extremely pill-shaped everything.

---

## 22.3 Suggested Shadows

Use shadows sparingly.

Recommended:

```txt
shadow-[0_20px_80px_rgba(0,0,0,0.35)]
```

For panels:

```txt
No heavy shadow required if borders and background layering are strong.
```

---

## 22.4 Suggested Background Treatment

Use:

```txt
bg-background-primary
Subtle radial gradient in hero
Soft panel gradients only when restrained
```

Example:

```css
background:
  radial-gradient(circle at top left, rgba(56, 189, 248, 0.10), transparent 35%),
  #05070A;
```

Do not use aggressive gradients throughout the page.

---

## 23. Component Acceptance Criteria

---

## 23.1 Hero Passes If

```txt
The project purpose is clear in under 20 seconds.
The hero looks professional and technical.
The capability cards show real quant/risk functions.
No personal student story dominates the section.
```

---

## 23.2 Market Section Passes If

```txt
The quote convention is clear.
Market assumptions are visible.
Synthetic data status is clear.
```

---

## 23.3 Options Book Section Passes If

```txt
The instruments are readable.
Long/short positions are clear.
Book-level exposures are summarized.
```

---

## 23.4 Pricing/Greeks Section Passes If

```txt
Prices and Greeks are visible.
Units are clear.
Signed exposures are not ambiguous.
```

---

## 23.5 Stress Section Passes If

```txt
The heatmap is readable.
Worst-case and best-case scenarios are clear.
Spot and vol shock charts explain book behavior.
```

---

## 23.6 Hedging Section Passes If

```txt
Unhedged and hedged P&L are visually comparable.
Delta reduction is clear.
Residual risk is explained.
```

---

## 23.7 VaR/ES Section Passes If

```txt
The P&L distribution is readable.
VaR/ES values are clear.
Risk limit status is visible and labeled.
```

---

## 23.8 Attribution Section Passes If

```txt
P&L drivers are visually separated.
Full repricing P&L is connected to component contributions.
Residual is explained.
```

---

## 23.9 Limitations Section Passes If

```txt
The assumptions are honest.
The limitations make the project more credible.
The section does not sound apologetic.
```

---

## 24. Final Design Scope Lock

The design system is locked as:

```txt
A dark, institutional, finance-native single-page analytics interface combining risk dashboard density with clean technical case study structure.
```

The design must prioritize:

```txt
Clarity
Technical credibility
Readable analytics
Professional visual hierarchy
Controlled use of color
Strong chart/table presentation
Recruiter and interviewer usability
```

The design must avoid:

```txt
Generic finance templates
Blog-post layouts
Trading games
Fake terminal aesthetics
Immature color systems
Overanimated UI
Decorative charts
```

The final visual test:

```txt
Would this look credible if shown to a quant risk interviewer, derivatives analytics recruiter, or market risk manager?
```

If the answer is not clearly yes, the design is not finished.
