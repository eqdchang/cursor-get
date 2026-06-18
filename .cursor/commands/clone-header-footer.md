# Clone Header + Footer

You are about to extract the **header** and **footer** from the URL the user provides and package them as self-contained drop-in artifacts that can be shipped into any host site.

Scope is only two components per site. No page body, no section loop, no full-page clone. If the user asks you to clone anything else, stop and redirect them to that narrower scope first.

## Output modes (`-bundle` default, `-raw`) and the `-fresh` modifier

The command accepts an optional output-mode flag after the URL, plus an optional `-fresh` modifier (documented below):

- **`-bundle`** (default — used when no flag is given): the classic single-`<script>` IIFE artifact described throughout this document. React renders into a Shadow DOM at runtime; the client drops in one `<script>` tag + a mount `<div>`.
- **`-raw`**: in addition to the bundle, emit an **editable HTML** artifact set so the client can update copy/links by hand without a rebuild. See "Raw mode" below. The raw build never touches the bundle — both artifacts ship side by side, and the bundle remains the backup.

Parse the flag from the user's message (e.g. `/clone-header-footer https://example.com -raw`). If absent, behave exactly as `-bundle`. Everything in Steps 1–8 (extraction, spec files, parity rubric) is identical for both modes — raw mode only changes the final packaging.

### Scan-freshness modifier (`-fresh`)

`-fresh` is a **modifier, not an output mode** — it combines with `-bundle` or `-raw` (e.g. `/clone-header-footer https://example.com -raw -fresh`). It forces a **clean-slate re-scan**: the agent must completely ignore previous findings and treat the live site as if it had never been cloned.

When `-fresh` is present:
- **Disregard the existing spec, prior screenshots, memory, and any value already in the component files.** Do not trust `research/*.spec.md`. Re-measure every element from the live DOM.
- **Suspend the diff-mode shortcut.** Even if `bundles/sites/<slug>/` already exists, do NOT take the data-only/structural classification path that leaves component logic untouched. Instead, re-derive the full spec from scratch and reconcile the components against it — rewrite styles/structure wherever they disagree with the freshly measured live site.
- **Output packaging is unchanged** — `-bundle`/`-raw` still decide what ships. `-fresh` only changes how thoroughly the live site is re-examined.
- **Use it** when a clone has drifted, the stored spec looks stale/wrong, or the user reports the clone "still doesn't match." It is the explicit "stop trusting the cache, look again in full detail" switch.

Parse `-fresh` independently of the output-mode flag; both can appear in any order.

## Scope defaults

- **Fidelity level:** Pixel-perfect visuals AND functional parity with the live site. Hover-reveal dropdowns, click-to-toggle, keyboard navigation, mobile drawer, body scroll lock, focus restore, ARIA — all must match. **Dropdown panel shape and nested interactions must match too** — see the anatomy rules below.
- **Links:** Every `href` points to the real live URL. External links (different hostname than the target) get `target="_blank" rel="noopener noreferrer"`.
- **Style isolation:** The bundle must not leak CSS onto the host site, and the host's CSS must not bleed into the bundle. The mount script uses **Shadow DOM** as the primary isolation mechanism (the bundled CSS is imported as a string via `?inline` and injected into the shadow root). Preflight is disabled, every selector is prefixed with `.bw-scope` by PostCSS, and everything is rendered inside `<div className="bw-scope">` as defense-in-depth.
- **Out of scope:** Page body, hero, sections, CMS content. Backend. Authentication.
- **Forms are visual stubs only.** Any form in the header or footer — newsletter signup, email subscribe, search bar, contact form, "find a dealer by zip" input, quote request, etc. — is cloned for layout and styling only. The `<input>` and `<button>` render so the header/footer looks complete, but no submission handler is wired up. Mark the form as *stubbed* in the relevant spec file under "Known omissions". The same goes for search icons that open a search panel: render the icon hit-target, do not build the panel.
- **No invented UI.** Every visible element in the cloned output must exist in the extracted source. Do not add "View all X", "Featured", CTA blocks, promo banners, tag lines, or any other embellishment that isn't on the real site. If it isn't in `research/header.spec.md` or `research/footer.spec.md`, it does not ship.

## General approach (always)

This is the standing process for every site. Walk it end-to-end on the first pass so the user does not have to ask twice for the same kind of detail. The order is non-negotiable.

**Match every detail — for every site.** This applies universally, not to any one site. The live site is the only source of truth and the goal is to match it as closely as humanly possible — pixel for pixel, weight for weight, gap for gap. Before writing or changing any JSX:

- **Inspect every single thing that is visible.** Every nav item, every dropdown, every row inside every dropdown, every footer column, every icon, every button, every divider, every badge, every separator. If you can see it on the live site, you measure it and reproduce it. "Close enough" is not the bar.
- **Measure, never eyeball.** For every distinct element pull `getComputedStyle` and record `font-family`, `font-size`, `font-weight`, `line-height`, `letter-spacing`, `text-transform`, `color`, plus box metrics (`width`, `height`, `padding`, `margin`, `gap`, `border`, `border-radius`) and `background-color`. Approximations (15px vs 16px, weight 400 vs 900, a 35px gray circle vs a bare icon) are precisely the differences the user catches.
- **Every icon carries its chrome.** Capture each icon's rendered size, color, and stroke AND any container styling around it: circular/rounded background, fill color, border, count badge, hover state. Never assume an icon is bare — many sit inside styled buttons.
- **Fonts must render at the real weight.** If the clone looks lighter/thinner than live, the brand webfont almost certainly isn't loading or is loading at the wrong weight. Verify the exact `@font-face` files + weights the live site loads and confirm the embedded files match (register at document level — see Style isolation).
- **Responsive stays responsive.** If the live site sizes text/spacing with `vw`/`clamp`, the clone must too, and all comparisons happen at the SAME viewport width.
- **Prove the match in the same turn.** After editing, rebuild, RE-MEASURE the same elements, and take a fresh side-by-side screenshot at the same viewport and state. Do not claim a match without a same-turn measurement + screenshot. (Full rubric: `.cursor/rules/live-site-fidelity.mdc`.)

The numbered passes below are how you achieve that depth. The order is non-negotiable:

1. **Walk every dropdown in the header and every collapsible/widget in the footer.** Open each at the desktop viewport, screenshot it to `images/`, then close it before moving to the next. Do the same for every nested level — subgroup expansion, side flyout, accordion, language menu, account menu, etc. If a row inside a dropdown has a chevron, an arrow, or a "+", treat that as a separate state and screenshot it expanded too. **For tabbed dropdowns, walk every tab and re-capture every ancillary widget** (side banner, bottom-bar, callout) — these often vary per-tab even though they look like fixed chrome. The bar is: **every state the user can see on the live site has a screenshot in `images/` before any JSX is written.**
2. **Probe interactivity on several representative triggers and links.** For each top-level nav trigger, hover it AND click it (record which mechanism opens the dropdown). For at least one row inside the open dropdown, hover it (does it highlight? does an icon change color?) and click any chevron/sub-toggle (inline expand vs side flyout vs no-op link). For trailing widgets (search, account, cart, language switcher, login) confirm hit-target behavior. **Active states matter as much as default states** — when a dropdown is open, capture how the trigger itself changes (color shift, underline, 3px bar at the bottom, chevron rotation, parent class like `--active`).
3. **Once desktop is fully captured, repeat the entire pass at mobile (~390px).** Open the hamburger, screenshot the drawer's root state, then expand each top-level group inside the drawer and screenshot each expansion. The mobile interaction model often differs from desktop (inline accordion vs side flyout, different item ordering, additional or removed items, search input that only exists on mobile, top-nav items that exist at one breakpoint but not the other) — measure mobile independently rather than assuming it mirrors desktop. **Look for paired desktop/mobile asset elements** (e.g. `--desktop` / `--mobile` class-suffixed sibling DOM nodes with different image URLs) — the mobile variant is a re-cropped image, not a resize. Extract BOTH URLs.
4. **The footer mobile layout is structurally independent from desktop.** Sites commonly render the desktop footer as a column grid and the mobile footer as an accordion stack with a different vertical order (identity column moves below the accordions, address moves to a single line, dropdowns become accordions). Run Step 3d (footer mobile pass) end-to-end — don't reuse desktop footer JSX for mobile.
5. **Match every visible ornament, not just the obvious ones.** Borders, fonts, icons, spacing, colors, hover and click effects, active-state indicators, separator lines between items, thin dividers before utility links (often `::before` pseudo-elements with `position: absolute; width: 1px; height: ~20px`), `::before` / `::after` decorations on the active nav item, animated chevron rotations, focus rings, image assets. If you can see it on the live site, the clone has it. Measure each link/button type independently — header link styles do not bleed into footer link styles, neither bleeds into utility-bar link styles. Variant/brand gradient colors should be re-measured every re-clone (they drift).
6. **All screenshots and reference images go to `images/` at the repo root.** Pre-flight creates the folder (`mkdir -p images`) and it is gitignored. **Every screenshot filename you pass to a browser-MCP tool must start with `images/`.** Never store screenshots at the repo root; never ask the user where to save them. When the live site exposes raster image assets that are part of the header/footer (logo PNGs, dropdown illustration thumbnails, side-banner artwork), download them to `images/` too — only embed them in the bundle if the user has confirmed they want raster assets bundled rather than referenced via the original CDN URL.

## Known failure modes to avoid

These are real mistakes made on prior sites. Do not repeat them:

1. **Mega-menu hallucination.** Seeing a nav item has a dropdown and assuming it's a wide multi-column mega-menu grid. Many sites use a narrow single-column panel with inline accordion subgroups. Always measure the panel width and enumerate row types before writing JSX.
2. **Skipping second-level probes.** Capturing top-level hover/click but never hovering or clicking *inside* an open dropdown. That's where accordion chevrons, side-flyouts, and tooltip descriptions live.
3. **Hover omission / click-only omission.** Building click-only dropdowns on a site where the real behavior is hover-reveal, or building hover-reveal on a click-only site. Always test BOTH `mouseenter` AND `click` on the first trigger and record which mechanism(s) actually open the dropdown. Do not assume any mechanism without testing.
4. **Placeholder hrefs.** Shipping `href="#"` because you didn't extract the real link. The spec file must list a real URL for every clickable item.
5. **Invented headers / links.** Adding "View all X →" sections, promo banners, or CTAs that are not in the live site. If you can't screenshot it on the real site, it doesn't exist.
6. **Wrong font-weight on links.** Applying the header's font-weight to footer links or vice versa. Header and footer link weights are independent — measure each with `getComputedStyle` separately.
7. **Wrong text-decoration on links.** Each link type may have different text-decoration behavior. Extract `text-decoration-line` for every distinct link type (utility, dropdown, footer column, legal bar) and match it exactly. Do not assume any default.
8. **Footer column merging missed.** Two footer sections that share the same x-coordinate are stacked in one grid column, not separate columns. Always measure heading x-positions before deciding the grid template. Splitting stacked sections into separate columns pushes the layout wider and mispositions icons.
9. **Icon color/size assumed.** Icon colors and sizes vary across sites. Measure `color`, `border-color`, and rendered `width`/`height` on the actual icon link elements — do not copy colors from adjacent text or headings.
10. **Dropdown interior styles not measured.** Section headers, subgroup headings, item links, descriptions, and callout buttons inside dropdown panels each have their own font-size, font-weight, and color. Measure each distinct element type inside an open dropdown before writing JSX.
11. **Dropdown positioning not measured.** The dropdown panel's `position`, its positioned ancestor, and its scroll behavior must be measured on the live site and replicated exactly. If the live site's dropdown scrolls with the header, the clone must too. If it stays pinned, the clone must too.
12. **Dropdown background color measured only on the outermost element.** The outermost panel element's background may be overridden by an inner container with a different color. Walk inward from the panel root checking `backgroundColor` on every container. Record every non-transparent layer. The callout/bottom row may also have its own distinct background.
13. **Dropdown column layout not measured.** The column container's layout mode, column count, gap, and child widths must be measured. Without this, columns end up bunched on one side instead of distributed to match the live site. Measure and replicate the exact layout.
14. **Button border-width assumed.** CTA buttons may use different border widths. Always measure `border-width` explicitly for every styled button.
15. **Active-trigger ornament missed.** When a dropdown is open, the trigger button's parent often gains an indicator that is not on the button itself: a 3px colored bar pinned to the bottom of the menu item, a color shift on the text, a rotated chevron. This is usually rendered as a `::after` pseudo-element on the parent `<li>` / `__item--active` element. If you only inspect the `<button>`, you will miss it. Always inspect the parent of an active trigger and check `::before` / `::after`.
16. **Pseudo-element decorations missed.** Thin vertical dividers between user-menu items (e.g. before "Login"), separator lines under the active nav item, hover underlines, decorative dots on inactive triggers — these almost always live in `::before` / `::after`. For every visible "small ornament" on the live site, check the relevant element's pseudo-elements via `getComputedStyle(el, '::before')` and `getComputedStyle(el, '::after')` before concluding it is not in the DOM.
17. **Sidebar tab icon assumed for every entry.** When a vertical sidebar tab list mixes "free / generic" entries with "branded product" entries, the branded ones often have a colored brand icon while the free/generic ones have nothing. Inspect the tab markup; if the branded entries have `class~="solution-icon"` or similar and the generic ones do not, do not render an icon on the generic entries.
18. **Nav menu cluster left-aligned instead of centered.** Many sites center the main nav between the logo and the user menu using `flex-grow: 1` on the nav container plus `justify-content: center` on the inner list. If you render the nav with `flex-1` but leave the `<ul>` with default left-alignment, the items hug the logo. Always check the `justify-content` of the menu's inner list.
19. **Generic icon set missing one or two recent additions.** When extracting a site's icon set programmatically (e.g. ChatGPT/Perplexity/Claude/Grok/Gemini/Deepseek), the extractor can miss the last item or one with an unusual name. Verify by looking up every list item label in your generated icon map; any label that falls back to a generic dot is a missing icon you need to add.
20. **Inner link/button component drops `style` prop.** A common refactor is wrapping `<a>` in a project-local `A` component that takes `href`, `external`, `className`, and `onClick`. If the component does not also accept and forward `style`, every inline-style hint (gradient backgrounds, color tints, custom backgrounds) is silently dropped at render time. When debugging "the inline style is not applied", check the wrapper component first.
21. **Bottom-bar / utility-row pinned only inside the panel content.** When a dropdown has a horizontal bar at the bottom ("Explore API", "Contact sales / Start free trial", legal text), that bar usually spans the FULL popup width with its own background color, not just the inner content column. If you place it inside the right-content panel, it will be too narrow and miss the background fill. Render it as a sibling of the panel, not a child.
22. **Per-tab ancillary widgets assumed static.** In a tabbed dropdown (a sidebar of tabs on the left, content on the right, plus a side banner / bottom-bar / callout column), the side banner and bottom-bar often **change per active tab** — the default tab might show a generic "Top Holiday Report" banner while one specific tab (e.g. "Data as a Service") swaps it for a contextual banner ("Data Licensing"). If you only inspect the default tab, you miss every variant. **For every tab, re-check every ancillary widget** (side banner, bottom bar, callout column) and record which tabs deviate from the default. Build a `WIDGET_BY_TAB_ID` map keyed by tab id; fall back to a default for unmapped tabs.
23. **Responsive image variants missed.** When a mega-menu banner has an illustration, the live DOM frequently contains TWO `<img>` tags wrapped in display-toggled containers (e.g. `--illustration-container--desktop` and `--illustration-container--mobile`) with **different image URLs** — the mobile asset is a re-cropped/re-composed variant, not a resized copy. The default class-name suffix you see at desktop width hides the mobile one via `display: none`. If you only grab one URL, the mobile drawer detail view ships the wrong illustration. Inspect the banner DOM for paired `--desktop` / `--mobile` (or `-d` / `-m`) sibling nodes, and extract BOTH URLs into the data (`img` + `imgMobile`). The renderer picks based on viewport. Also check titles and CTA copy — they sometimes vary by breakpoint too.
24. **Mobile footer assumed to mirror desktop.** Many sites render the desktop footer as a 4–5-column grid of always-expanded sections, then collapse to a stack of **accordion** sections on mobile — with a different vertical order than desktop. Common reorder: identity column (logo, social, address, extension button) sits ON TOP on desktop but drops BELOW the accordion list on mobile, with the address moved to a single-line layout below social icons. A desktop-only "See all our offices" dropdown often becomes its own mobile accordion. Always run the full mobile pass (Step 3d) on the footer; never reuse desktop JSX for the mobile view.
25. **Colored card styling gated to desktop only.** When the live site applies a tinted background to mega-menu cards (e.g. `background: rgba(255, 50, 111, 0.05)` on a "Marketing" card with a pink accent), the tint is applied at BOTH breakpoints. Cloning the tint via a desktop-only conditional yields a flat-white mobile drawer that the user will call out. Measure card backgrounds at both desktop and mobile; if non-transparent on mobile, the mobile renderer must apply the same `cardTintBg(variantRgb)` style.
26. **CDN URLs with rotating build hashes hardcoded as-if stable.** Asset URLs of the form `https://cdn.example.com/build/<date>.<branch>.<hash>/dist/.../<asset>.png` rotate the `<date>.<branch>.<hash>` segment on every site deploy. The trailing asset filename hash is the stable part. On re-clone, the data-only diff "the URL changed but the asset filename is the same" is invisible churn; the truly structural change is "the asset filename hash changed" (= the artwork was replaced). When comparing CDN URLs in diff mode, strip the build-id segment before deciding whether the diff is data-only or structural.
27. **Items moved between slots recorded as deleted.** When an item disappears from a card grid or column, do NOT immediately classify it as "removed". Search the rest of the dropdown for the same label — it may have moved to a side banner, bottom bar, or per-tab contextual widget. On Similarweb, "Data Licensing" was removed from the DaaS cards grid AND simultaneously promoted to the per-tab side banner on the DaaS tab. Recording it as "deleted" without finding its new home produces a clone that's missing UI the live site still has.
28. **Top-nav parity assumed across breakpoints.** A top-level nav item is often **removed from desktop but kept in mobile**, or vice versa. ("Explore API" disappeared from Similarweb's desktop top nav but is still in the mobile drawer AND still in the Products dropdown's bottom-bar.) Audit the top-nav at BOTH 1440 and 390; record any per-breakpoint difference as a real spec entry, not a bug.
29. **Diff-mode treats user-reported issues as authoritative.** When the user opens a re-clone with "these are wrong: A, B, C", they almost always mean "I found A, B, C and stopped looking — but I expect you to find what I missed too." Run the full Step 2 + Step 3 extraction in diff mode regardless of how specific the user's report is. The user's list is a strong hint that the spec is stale broadly; treating it as the complete delta is what leads to the second round-trip where they ask for the same kind of thorough check.
30. **Variant gradient colors drifted on re-clone.** Brand/variant colors (the hot-pink, orange, green, etc. used in radial-gradient banner backgrounds) drift between marketing refreshes. Re-measure the banner gradient on every Intelligence/category tab during a re-clone via `getComputedStyle(banner).backgroundImage` and compare the first color stop against the value in the data file. A 1-byte change like `#FFA800` → `#FF7A1A` is invisible to a visual diff but loud once the user notices the banner is the wrong orange.
31. **Banner radial-gradient origin differs by breakpoint.** A single banner can use `at 120% 0%` (origin = top-right, bright = top-right) on desktop and `at 100% 100%` (origin = bottom-right, bright = bottom-right) on mobile, with the same color stops in both. Visually this looks "inverted" — the brightest blue moves from the top-right corner to the bottom-right corner. If the clone reuses the desktop string at mobile, the user will report "the gradient is inverted". Re-query `getComputedStyle(banner).backgroundImage` at BOTH 1440 and 390 viewports for every banner variant, and pass the breakpoint into the gradient helper (`bannerGradient(variant, "desktop" | "mobile")`). Border-radius and padding may differ between breakpoints for the same banner — measure both.
32. **Banner image padded instead of flush with the bottom edge.** When a tabbed-dropdown banner shows an illustration BELOW the text on mobile, the live site usually has `padding: 0` on the banner `<a>`, `padding: 16px 16px 0` on the text container, and the `<img>` sits flush against the banner's rounded bottom edge with `bottom-gap: 0`. The naive clone uses one box with `p-5` everywhere, which leaves a dark band of background visible beneath the image. To match, structure the banner as a vertical flex with two children: a padded text block + a flush image — wrap them in an `overflow: hidden` rounded container so the image's corners get clipped by the radius.
33. **Mobile bottom-link strip stacked instead of wrap-row.** Site footer bottom links (Categories / Countries / Privacy / Security / Terms / Equal Pay / Manage Cookies / Accessibility Menu) almost always render on mobile as a horizontal `flex-wrap` row, NOT a vertical stack. They look stacked at first glance because at 390px they wrap to 3+ rows, but the layout direction is row, not column. If you implement them as `flex-col` they will be one-per-row regardless of viewport width and will look wrong against the live site (which packs as many as fit per row). Measure `flex-direction` and `flex-wrap` on the container before deciding the layout.
34. **Accordion expanded link list looks centered when it shouldn't.** Even when the `<ul>` and `<li>` have no `text-align: center` set, certain shadow-DOM-injected styles or parent `text-align` settings can cause expanded accordion content to render visually centered. Add `text-left` defensively to the expanded `<ul>` and its `<li>`/`<a>` children, and verify rendered alignment against the heading button's left edge (they should share an `x` coordinate).
35. **Tailwind v4 `--tw-*` defaults are missing inside the shadow DOM.** Tailwind v4 utilities like `.border`, `.-translate-y-1/2`, `.scale-95`, `.rotate-180`, etc. expand to declarations such as `border-style: var(--tw-border-style)` and `translate: var(--tw-translate-x) var(--tw-translate-y)`. Tailwind ships `@property` declarations to provide initial values for those vars (`--tw-border-style: solid`, `--tw-translate-x: 0`, etc.), AND it relies on **preflight** to set them on `*`. We disable preflight for style isolation, AND `@property` registration is document-scoped — so `@property` rules emitted *inside* a shadow root are ignored by the browser and provide no initial values to elements within the shadow. Net effect: `border-style` falls back to `none` (no border renders), `translate` falls back to `none` (so `before:top-1/2 before:-translate-y-1/2` only sets `top: 50%` without the upward shift, putting the element in the bottom half of its parent), `scale` and `rotate` utilities can compose incorrectly, and so on. The bug is invisible in the demo HTML and only shows up on a real host page. **Fix:** the scope reset in `styles.css` MUST hard-code defaults for every `--tw-*` var the bundle uses. At minimum: `--tw-border-style: solid; --tw-translate-x: 0; --tw-translate-y: 0; --tw-translate-z: 0; --tw-rotate-x: ; --tw-rotate-y: ; --tw-rotate-z: ; --tw-skew-x: ; --tw-skew-y: ; --tw-scale-x: 1; --tw-scale-y: 1; --tw-scale-z: 1;`. Add more if a new Tailwind utility is used that depends on additional `--tw-*` registrations. Verify after every utility-class addition by checking `getComputedStyle(el, '::before').translate` / `.transform` / `.borderStyle` and confirming they are not `none`/`""`.

## Pre-flight

1. Browser MCP is required (Playwright MCP, Chrome MCP, etc.). If none is available, ask the user which they have.
1a. **Images directory — hard rule.** Ensure the `images/` folder exists at the repo root (`mkdir -p images`). **Every screenshot tool call's filename MUST start with `images/`.** No exceptions. The repo root is for source, not artifacts; saving `01-thing.png` at the repo root is a workspace rule violation that the user will catch. If you find yourself typing a screenshot filename without `images/` in the path, stop and fix it. Reference images downloaded from the live site (logo PNGs, illustration thumbnails) also go to `images/`. The folder is gitignored.
2. Parse the user's message as a single URL plus any flags. Validate the URL resolves via the browser MCP. Record whether `-raw` and/or `-fresh` were passed (they can appear in any order).
3. Derive the site slug from the hostname: drop `www.`, replace `.` with `-`, lowercase. E.g. `https://boardwalktech.com/` → `boardwalktech-com` (or just `boardwalktech` if the user prefers a shorter name — confirm if ambiguous).
4. **Mode detection.** First check for the `-fresh` modifier, then whether `bundles/sites/<slug>/` already exists.
   - If `-fresh` was passed → **fresh mode**. Ignore the existing spec/components as authoritative. If the folder does not exist, scaffold it (Step 1) first; if it does, keep the scaffolding but re-run Step 2 + Step 3 from scratch and reconcile the components against the fresh measurements (see "Fresh mode" under Execution modes). Do NOT take the data-only/structural diff shortcut.
   - Else if the folder does NOT exist → **cold-start mode**. Proceed through Steps 1–8 in order.
   - Else (folder exists, no `-fresh`) → **diff mode**. Skip Step 1 (scaffolding) and follow the "Diff mode procedure" section below instead of Steps 3–4. Step 2 (extraction) still runs fresh.
5. Verify the bundles package installs and the Vite pipeline works: `cd bundles && npm install && npm run build:all` (or build any existing site, e.g. `npm run build:boardwalktech`). This is a pipeline sanity check only; do NOT treat any existing site as a template for a new one.

## Execution modes

### Cold-start mode
The slug folder does not exist. Every file is created from scratch for this specific site. **Do not copy `SiteHeader.tsx` or `SiteFooter.tsx` from any existing site** — those components carry that site's dropdown shape, row-type assumptions, icon choices, and state machine tuning, and copying them is what caused prior clones to inherit the wrong mega-menu pattern. The only site-agnostic plumbing that gets reused is listed in Step 1 (styles skeleton, type definitions, mount script, demo HTML) and it is inlined in that step so nothing has to be sourced from another site's folder.

### Diff mode
The slug folder already exists. Assume the component files and manual tuning there are correct. Re-extract the live site into a fresh spec, diff it against the existing spec, classify each diff, apply only safe data-level changes, and report the rest to the user for review. See "Diff mode procedure" below.

### Fresh mode (`-fresh`)
Triggered by the `-fresh` modifier regardless of whether the slug folder exists. Do NOT assume the existing spec or component files are correct — treat them as untrusted. Re-run the full Step 2 + Step 3 extraction from scratch (ignore the old spec, prior screenshots, and memory) and write a brand-new spec. Then reconcile the components against that freshly measured truth: unlike plain diff mode, you DO rewrite styles and structure in `SiteHeader.tsx` / `SiteFooter.tsx` (and the raw `header.static.tsx` / `behavior-*.ts`) wherever they disagree with the live site — not just data arrays. Finish with the Step 6.5 side-by-side visual diff and same-turn re-measurement. Output packaging (`-bundle` / `-raw`) is unchanged.

## Functional parity contract (done-criteria)

Do NOT consider the site done until every item below is verified on the built bundle served from `bundles/sites/<slug>/demo/`:

### Header — desktop (viewport >= 1024px)
- [ ] Dropdown trigger behavior matches the live site (hover+click, click-only, or hover-only — as recorded in Step 2b). If hover+click: hovering opens, clicking also toggles. If click-only: only click toggles, no hover handlers.
- [ ] Dropdown panel positioning matches the live site (measured `position`, positioned ancestor, and scroll behavior).
- [ ] Dropdown column layout matches the live site (measured column count, gap, and child widths).
- [ ] Only one dropdown is open at a time; opening one closes the previous.
- [ ] Tab reaches each nav item; Enter/Space toggles its dropdown.
- [ ] Escape closes the open dropdown.
- [ ] Clicking outside the nav closes any open dropdown.
- [ ] Every link in every dropdown has a non-empty, non-`#` `href` that matches the value in the spec file.
- [ ] External links have `target="_blank" rel="noopener noreferrer"`.
- [ ] `aria-haspopup="menu"`, `aria-expanded`, `role="menu"`, `role="menuitem"` are set.

### Dropdown panel anatomy (for every dropdown)
Must be recorded in `header.spec.md` AND visually confirmed against the real site:

- [ ] **Panel width** measured (px) and within ±20px of the real site.
- [ ] **Layout type** classified: single-column list | multi-column grid | grid with subgroup columns | flyout (side-opening) | accordion (expands inline).
- [ ] **Row-type inventory**: every kind of row in the panel is enumerated (link, heading, subgroup-toggle with chevron, divider, CTA button, image card, description row). If a row type exists in the real site, it must exist in the clone. If a row type exists in the clone but not the real site, delete it.
- [ ] **Nested interactions probed**: if any row has a chevron, arrow, or "+" icon, trigger hover AND click on that row and record the resulting behavior (inline accordion, side flyout, no-op link). Build a matching interaction.
- [ ] **Subgroup heading dual-behavior**: on many sites the subgroup heading is itself a link to a collection page AND has a separate chevron toggle. Verify which clicks navigate vs. which clicks expand, and mirror that exactly.
- [ ] **Background color layered check**: the panel's visible background is measured by walking inward from the root, not just reading the root element's `background-color`. Inner containers may override the root's color.
- [ ] **Column layout measured**: column container's display mode, column count, gap, and child widths are extracted and matched with `grid grid-cols-N`, not flex with min-width.
- [ ] **Side-by-side screenshot**: a screenshot of the real site's dropdown in its closed AND most-expanded state placed next to a screenshot of the built bundle's dropdown. Structural match, not just "both have links".

### Header — mobile (viewport ~390px)
- [ ] Hamburger toggles the drawer open/closed.
- [ ] While drawer is open: `document.body.style.overflow === "hidden"` (no background scroll).
- [ ] Tapping a link inside the drawer closes the drawer.
- [ ] Escape closes the drawer.
- [ ] When drawer closes, focus returns to the hamburger button.
- [ ] Drawer scrolls internally when taller than the viewport.

### Footer
- [ ] Every link `href` matches the spec file.
- [ ] External links flagged and opened in a new tab.
- [ ] Any widget (newsletter, social icons, language switcher) is either implemented or explicitly listed under "Known omissions" in `footer.spec.md`.
- [ ] Grid column count matches the live site. Sections that share a column on the live site share a column in the bundle.
- [ ] Column heading `font-size` and `font-weight` match the spec's measured values.
- [ ] Column link `font-weight` matches the measured spec.
- [ ] Column link `text-decoration` matches the spec (underlined by default? on hover only? never?).
- [ ] Social icon `color` and `border-color` match the spec (green? white? branded?).
- [ ] Social icon rendered size (width × height) matches the spec (±2px).

### Style isolation
- [ ] Bundle uses Shadow DOM mount: `mount.tsx` calls `target.attachShadow({ mode: "open" })`, injects bundled CSS via `<style>` inside the shadow root, and renders React into a container inside the shadow.
- [ ] `mount.tsx` imports CSS as a string via `import styles from "../styles.css?inline"` (NOT `import "../styles.css"`).
- [ ] `styles.css` imports `tailwindcss/theme.css` and `tailwindcss/utilities.css` only — NOT `tailwindcss/preflight.css` and NOT the umbrella `@import "tailwindcss";`.
- [ ] Top-level render is still wrapped in `<div className="bw-scope">…</div>` (defense-in-depth scope class).
- [ ] Click-outside detection in `SiteHeader.tsx` uses `event.composedPath()` to detect clicks inside the shadow DOM; falls back to `nav.contains(target)` only if `composedPath` is missing.
- [ ] Host-page smoke test: drop the bundle into the actual host page (or a blank HTML page with pre-existing `<h1>`, `<ul>`, `<p>` styles AND aggressive resets like `* { margin: 0 } a { color: red }`) and confirm the bundle renders correctly AND the host's content renders unchanged.

## Step 1 — Scaffold the per-site folder (cold-start only)

Create the directory tree under `bundles/sites/<slug>/`:

```
bundles/sites/<slug>/
  src/
    styles.css
    types.ts
    header/
      SiteHeader.tsx    (empty for now — written in Step 4)
      mount.tsx
    footer/
      SiteFooter.tsx    (empty for now — written in Step 4)
      mount.tsx
  demo/
    header.html
    footer.html
  research/
    header.spec.md      (empty — filled in Step 2)
    footer.spec.md      (empty — filled in Step 3)
```

**Do NOT copy component files from any other site.** The only files this step creates are the site-agnostic skeleton below. Write them with the exact content shown, substituting `<slug>` and `<PascalSlug>` (e.g. `byrna` / `Byrna`).

### `src/styles.css`
Tailwind v4 without preflight, with a scope class. Use `bw-scope` — it's the project-wide scope convention that every existing site uses. Only use a site-specific class (e.g. `<slug>-scope`) if the client plans to load multiple different bundles on the same host page.

```css
@layer theme, base, components, utilities;

@import "tailwindcss/theme.css" layer(theme);
@import "tailwindcss/utilities.css" layer(utilities);

@source "./**/*.{ts,tsx}";

@layer base {
  .bw-scope,
  .bw-scope *,
  .bw-scope *::before,
  .bw-scope *::after {
    box-sizing: border-box;
    border: 0 solid;
    /* Tailwind v4 utilities reference these vars and rely on @property
       declarations to provide initial values — but @property is
       document-scoped, so inside a shadow root those defaults are NOT
       applied. We must define them explicitly here, otherwise utilities
       like `border`, `-translate-y-1/2`, `scale-95`, etc. silently
       resolve to invalid values and revert to their CSS initial. */
    --tw-border-style: solid;
    --tw-translate-x: 0;
    --tw-translate-y: 0;
    --tw-translate-z: 0;
    --tw-rotate-x: ;
    --tw-rotate-y: ;
    --tw-rotate-z: ;
    --tw-skew-x: ;
    --tw-skew-y: ;
    --tw-scale-x: 1;
    --tw-scale-y: 1;
    --tw-scale-z: 1;
  }

  .bw-scope {
    /* font-family and color are filled in Step 2 from the site's computed styles */
    line-height: 1.5;
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: transparent;
  }

  .bw-scope a {
    color: inherit;
    text-decoration: inherit;
  }

  .bw-scope button {
    font: inherit;
    color: inherit;
    background-color: transparent;
    border-radius: 0;
    cursor: pointer;
    appearance: button;
  }

  .bw-scope img,
  .bw-scope svg {
    display: block;
    vertical-align: middle;
    max-width: 100%;
    height: auto;
  }

  .bw-scope ul,
  .bw-scope ol {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .bw-scope h1,
  .bw-scope h2,
  .bw-scope h3,
  .bw-scope h4,
  .bw-scope h5,
  .bw-scope h6,
  .bw-scope p {
    margin: 0;
    font-size: inherit;
    font-weight: inherit;
  }
}
```

### `src/types.ts`
Pure structural definitions. The shape of nav groups and footer columns is universal across sites, so these types are the one thing safe to reuse verbatim. Copy them as-is:

```ts
export type NavDropdownItem = {
  label: string;
  href: string;
  external?: boolean;
  description?: string;
};

export type NavSubgroup = {
  heading: string;
  href?: string;
  items: NavDropdownItem[];
};

export type NavGroup = {
  label: string;
  href: string;
  external?: boolean;
  items?: NavDropdownItem[];
  subgroups?: NavSubgroup[];
};

export type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type FooterColumn = {
  heading: string;
  links: FooterLink[];
};
```

If the site's extracted spec reveals row types this schema cannot express (image cards, description rows, CTA rows), extend the types — don't force the data into the wrong shape.

### `src/header/mount.tsx`

The mount uses **Shadow DOM** for full style isolation. The bundled CSS is imported as a string via `?inline` and injected inside the shadow root. Host CSS cannot reach inside; bundle CSS cannot leak out.

```tsx
import { StrictMode } from "react";
import { createRoot, type Root } from "react-dom/client";
import { SiteHeader } from "./SiteHeader";
import styles from "../styles.css?inline";

const DEFAULT_MOUNT_ID = "<slug>-header-root";
const STYLE_MARKER = "data-bw-styles";
const CONTAINER_MARKER = "data-bw-container";

type MountTarget = Element | string;

let activeRoot: Root | null = null;

function resolveTarget(target?: MountTarget): Element | null {
  if (target instanceof Element) return target;
  if (typeof target === "string") {
    const el = document.querySelector(target);
    if (el) return el;
  }
  return document.getElementById(DEFAULT_MOUNT_ID);
}

function getOrCreateShadowContainer(target: Element): Element {
  if (!("attachShadow" in target)) return target;

  let shadow: ShadowRoot | null =
    (target as HTMLElement).shadowRoot ?? null;
  if (!shadow) {
    try {
      shadow = (target as HTMLElement).attachShadow({ mode: "open" });
    } catch {
      return target;
    }
  }

  if (!shadow.querySelector(`style[${STYLE_MARKER}]`)) {
    const styleEl = document.createElement("style");
    styleEl.setAttribute(STYLE_MARKER, "");
    styleEl.textContent = styles;
    shadow.appendChild(styleEl);
  }

  let container = shadow.querySelector(
    `[${CONTAINER_MARKER}]`,
  ) as HTMLElement | null;
  if (!container) {
    container = document.createElement("div");
    container.setAttribute(CONTAINER_MARKER, "");
    shadow.appendChild(container);
  }
  return container;
}

function mount(target?: MountTarget): void {
  const el = resolveTarget(target);
  if (!el) {
    console.warn(
      `[<PascalSlug>Header] mount target not found. Pass a selector or Element, or add <div id="${DEFAULT_MOUNT_ID}">.`,
    );
    return;
  }
  if (activeRoot) {
    activeRoot.unmount();
    activeRoot = null;
  }
  activeRoot = createRoot(getOrCreateShadowContainer(el));
  activeRoot.render(
    <StrictMode>
      <SiteHeader />
    </StrictMode>,
  );
}

function unmount(): void {
  activeRoot?.unmount();
  activeRoot = null;
}

const api = { mount, unmount, DEFAULT_MOUNT_ID };

if (typeof window !== "undefined") {
  (window as unknown as { <PascalSlug>Header: typeof api }).<PascalSlug>Header = api;
  const autoTarget = document.getElementById(DEFAULT_MOUNT_ID);
  if (autoTarget) mount(autoTarget);
}

export default api;
export { mount, unmount };
```

### `src/footer/mount.tsx`
Same shape as the header mount, swap `Header` for `Footer` and use mount id `<slug>-footer-root` and global `window.<PascalSlug>Footer`.

### Click-outside detection inside shadow DOM
`SiteHeader.tsx` must use `event.composedPath()` (not `e.target` + `nav.contains(...)`) for outside-click detection. When the shadow root re-targets the event for `document`-level listeners, `e.target` becomes the shadow host element, which makes every click look "outside" the nav. `composedPath()` returns the actual click path including elements inside the shadow.

```tsx
const onDown = (e: MouseEvent) => {
  const nav = navRef.current;
  if (!nav) return;
  const path =
    typeof e.composedPath === "function" ? e.composedPath() : [];
  const insideNav = path.length
    ? path.includes(nav)
    : nav.contains(e.target as Node);
  if (!insideNav) closeAll();
};
```

### `demo/header.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title><Slug> header demo</title>
  </head>
  <body>
    <div id="<slug>-header-root"></div>
    <main style="padding: 2rem; font-family: system-ui">
      <h1>Host page heading</h1>
      <p>This text should render with the host's default styles (no leak from the bundle).</p>
      <ul>
        <li>Host list item 1</li>
        <li>Host list item 2</li>
      </ul>
    </main>
    <script src="../../../dist/<slug>/header.bundle.js"></script>
  </body>
</html>
```

### `demo/footer.html`
Same, with `<slug>-footer-root` and `footer.bundle.js`.

### Wire up build scripts
Add to `bundles/package.json`:

```json
"build:<slug>": "SITE=<slug> npm run build:site",
"dev:<slug>": "SITE=<slug> BUNDLE=header vite"
```

Add a matching `src/app/<slug>/page.tsx` in the Next.js preview harness (copy the structure from `src/app/byrna/page.tsx`, swap slug).

**At this point Step 1 is done.** You have an empty but valid skeleton. `SiteHeader.tsx` and `SiteFooter.tsx` do not yet exist; they get written in Step 4 after extraction.

## Step 2 — Extract the header from the live site

Using the browser MCP at a 1440px viewport. Treat this as three distinct passes: structure, interactions, and measurements. Do NOT skip ahead to writing code before all three are in the spec file.

### 2a. Structure pass
1. Identify the `<header>` / `<nav>` root element. Capture its DOM structure and `getComputedStyle()` values (height, background, border-bottom, position, z-index, inner max-width, horizontal padding).
2. Extract the logo: absolute URL of the `<img src>`, width, height, alt text, and the URL it links to.
3. Enumerate top-level nav items in order. For each, record: label, `href`, whether it has a dropdown.
4. Capture trailing icons (search, account, cart, language switcher, CTA button). Only implement hit-targets; full search/cart UI is out of scope.
5. Note any forms in the header (search input, email signup, etc.). Record the visible markup — placeholder text, button label, layout — but mark the form as *stubbed* in the spec under "Known omissions". The clone renders the input and button for layout fidelity but does not wire up submission.

### 2b. Dropdown trigger behavior (test before building)
Before extracting dropdown contents, determine how they open. Test the FIRST dropdown trigger:
1. Hover the trigger — does the dropdown appear?
2. Click the trigger — does the dropdown toggle open/close?
3. Record the result in the spec as one of:
   - **hover + click** (hover opens, click also toggles)
   - **click-only** (hover does nothing; only click toggles)
   - **hover-only** (click navigates the href)
The component state machine differs for each. This determines whether `openMode`, `hoverTimeout`, and `onMouseEnter`/`onMouseLeave` are needed.

### 2c. Dropdown anatomy pass (the one you keep skipping)
For **every** top-level item that has a dropdown, do all of the following before moving on:

1. Open the dropdown (using the trigger mechanism identified in 2b). Take a screenshot of the open panel in its default state and save it to `images/<slug>-header-<group>-default.png` (the directory is created in pre-flight). Also screenshot the **trigger itself in its active state** so the trigger's open-state ornament (color, underline, 3px bar) is captured — a viewport screenshot taken while the dropdown is open serves both purposes.
2. `getBoundingClientRect()` on the panel root — record its width in px and whether it renders as single column, multi-column grid, or side flyout.
3. Enumerate every direct child row of the panel. For each, classify as one of:
   - **link** — a simple anchor that navigates
   - **subgroup-toggle** — a row with a chevron/arrow that expands more items (accordion or side flyout)
   - **heading** — a non-interactive label above a group of links
   - **divider** — visual separator only
   - **CTA** — styled button (position varies by site)
   - **image-card** — image + label tile
   - **description-row** — label + secondary descriptive text line
   - **bottom-bar** — full-popup-width horizontal row with its own background, usually 1–2 utility links right-aligned ("Contact sales", "Explore API")
4. For any `subgroup-toggle` row, hover AND click it. Record:
   - Does it expand inline (pushing siblings down) or open a side flyout?
   - Does the heading text itself navigate when clicked, with the chevron as a separate expand target? If so, build it the same way.
   - What appears when expanded? Enumerate those items too. **Screenshot the expanded state too** and save it next to the default screenshot.
5. For any row whose href differs from its visible text target (e.g. a heading that links to a collection while a chevron toggles the accordion), mirror that dual-behavior exactly.
6. **Inspect the active trigger's parent and pseudo-elements.** When the dropdown is open, query the parent of the trigger button (often `<li>` or `__item--active`) and read its `::before` and `::after` pseudo-elements. The bar/underline/dot that marks the active trigger almost always lives there. Record the pseudo-element's `content`, `position`, `width`, `height`, `background-color`, `top`/`bottom`/`left`/`right` so the clone can replicate it.
7. **For tabbed dropdowns: walk every tab and re-extract every ancillary widget.** A tabbed dropdown has stable parts (the sidebar tab list, the panel chrome) and per-tab parts (the panel content). The per-tab parts also include any **side banner, bottom-bar, or callout column** — these often differ per active tab even though they look like fixed chrome. For each tab, screenshot the open state AND capture: the side banner (image src, kicker, title, body, CTA, href), the bottom-bar links, and any callout block. Compare each per-tab capture against the default-tab capture; record every tab that deviates. The clone needs a `WIDGET_BY_TAB_ID` map for any widget that varies, with a default for unmapped tabs. (See failure mode #22.)
8. **Capture responsive image variants.** While the dropdown is open at desktop width, query the banner DOM for paired `--desktop` / `--mobile` (or `-d` / `-m`) sibling nodes. If both exist with different image URLs, extract BOTH and store them as `img` (desktop) + `imgMobile` (mobile) in the data model. The mobile-drawer renderer prefers `imgMobile`. (See failure mode #23.)
9. After probing, close the dropdown and repeat for the next top-level item. Do not assume siblings share the same anatomy — they may differ.

Useful probes (run via the browser MCP's evaluate):

```javascript
// Measure an open dropdown panel
const panel = document.querySelector("SELECTOR_FOR_OPEN_PANEL");
const r = panel.getBoundingClientRect();
({ width: Math.round(r.width), height: Math.round(r.height), columns: getComputedStyle(panel).gridTemplateColumns });
```

```javascript
// Enumerate row types inside an open panel
[...panel.children].map(el => ({
  tag: el.tagName,
  classes: el.className,
  hasChevron: !!el.querySelector('svg, .chevron, [class*="arrow"], [class*="caret"]'),
  linkHref: el.querySelector('a')?.href ?? null,
  textStart: (el.textContent || '').trim().slice(0, 60),
}));
```

### 2d. Link audit pass
- Resolve every relative `href` against the site origin.
- Mark `external: true` when the resolved hostname differs from the site's hostname.
- If a link you need is behind a hover-delay or modal, trigger the interaction before extracting. No `#` placeholders in the spec.

### 2e. Computed style measurement pass (mandatory before writing JSX)
Open a dropdown and extract `getComputedStyle` for EVERY distinct element type. Record all values in a "Measured computed styles" table in the spec. Do not skip any row:

| Element | Properties to extract |
|---|---|
| Header element | `position` (sticky/fixed/relative — determines dropdown positioning strategy) |
| Nav bar separator | `border-top` or `border-bottom` color between utility bar and nav bar |
| Nav cluster alignment | `justify-content` of the inner `<ul>` and `flex-grow` of the nav container — determines whether the menu is left-aligned to the logo or centered between logo and user menu |
| Nav trigger buttons | `color`, `font-weight`, `font-size` |
| Nav trigger active state | `color`, `border-bottom` (width, style, color), AND `::before` / `::after` on both the button and its parent `<li>` (active underline / 3px bar / dot decoration almost always lives in a pseudo-element on the parent) |
| Nav trigger hover state | `color`, `background-color`, `text-decoration-line`, and any pseudo-element that animates in on hover |
| Utility links (top bar) | `color`, `font-weight`, `font-size`, `text-decoration-line`, AND `::before` (small vertical divider before "Login" / language switcher items is almost always a `::before` pseudo-element) |
| Contact/CTA button | `color`, `font-weight`, `font-size`, `border` (including **width**), `border-radius`, `padding` |
| Dropdown panel bg | `background-color` — check **inner containers** too, not just the root (see failure mode #12) |
| Dropdown callout row bg | `background-color` (measure separately from the main panel) |
| Dropdown column layout | `display`, `column-gap`, child count, each child `width` (see failure mode #13) |
| Dropdown section header | `color`, `font-weight`, `font-size` |
| Dropdown heading-static (non-link headings) | `color`, `font-weight`, `font-size` |
| Dropdown subgroup headings | `color`, `font-weight`, `font-size` |
| Dropdown item links | `color`, `font-weight`, `font-size`, `text-decoration-line` |
| Dropdown description text | `color`, `font-weight`, `font-size` |
| Dropdown callout buttons | `color`, `font-weight`, `font-size` |
| Callout/bottom-bar icons | `color` (may differ from text) |
| Bottom-bar row (if present) | `width` (full popup vs inner content only), `background-color`, `padding`, alignment of inner links |
| Sidebar tab list (tabbed dropdowns) | per-tab: does the entry render a brand icon? (some entries omit the icon — check `.tab__icon` or equivalent presence per item, do not assume uniform) |
| Per-tab banner / hero (tabbed dropdowns) | `backgroundImage` (extract the full radial/linear-gradient string and parse the first color stop into the variant hex — this is the per-tab brand color); `imgDesk` URL; `imgMob` URL (if a separate `--mobile` illustration container exists); per-tab title text (desktop variant vs mobile variant — often different strings via `--title--desktop` / `--title--mobile` classes) |
| Side banner per tab (tabbed dropdowns) | walk every tab; for each, record: image src, kicker, title, body, CTA text, href. Note any tab whose banner deviates from the default — those go into `WIDGET_BY_TAB_ID`. |

Use this snippet to batch-extract everything from an open dropdown in one call:

```javascript
const pick = (el, ...props) => Object.fromEntries(props.map(p => [p, getComputedStyle(el).getPropertyValue(p)]));
// Run after opening the first dropdown
```

If any value in the table is missing, the spec is incomplete. Do not write JSX until this table is filled in.

### 2f. Mobile pass (resize to 390px)
Mobile gets the same depth as desktop. Apply the General Approach (especially items 1, 2, and 4) to the mobile drawer end-to-end.

1. Locate the hamburger button and its icon. Record the breakpoint where the desktop nav disappears (the viewport width at which the hamburger appears).
2. Open the drawer. Screenshot the drawer's root state to `images/<slug>-header-mobile-drawer.png`. **Audit top-nav parity vs desktop**: list every row in the drawer and compare against the desktop top-nav list. An item that appears on one breakpoint but not the other (e.g. "Explore API" mobile-only, "Get a demo" desktop-only) is a real spec entry, not a bug — record the per-breakpoint delta explicitly. (See failure mode #28.)
3. For every row in the drawer that has a chevron / "+" / arrow, tap it. Record whether it expands inline (pushing siblings down) or replaces the drawer view (slide-in second screen). **Screenshot every expanded state** and save with a descriptive name (`<slug>-header-mobile-<group>-expanded.png`). The mobile interaction model often differs from the desktop one — measure both independently.
4. For any inner panel that renders cards or tinted rows, **re-measure card background colors at mobile**. If a card had a tinted `rgba(R,G,B,0.05)` background on desktop, it almost always still has it on mobile. The mobile renderer needs to apply the same tint — do not gate the tint behind a desktop-only branch. (See failure mode #25.)
5. **Verify banner illustration variants render correctly.** If Step 2c.8 found paired desktop/mobile illustration URLs, navigate to the drawer's per-product detail view and confirm the mobile variant is the one actually rendering (use a screenshot side-by-side with the desktop banner — if the illustration silhouettes match, the mobile renderer is wrong). The mobile illustration is usually wider/shorter, with re-composed UI screens, not a resized desktop crop.
6. Capture mobile-only widgets: search input that appears in the drawer, login/account button placement, language switcher, social icons, "Get a quote" CTA at the bottom of the drawer. Each gets its own row in the spec.
7. Run the same computed-style measurements (font-size, font-weight, color, background-color, padding, border) on the drawer's link rows and CTA buttons. Mobile typography frequently differs from desktop — never reuse desktop values for mobile rows without measuring.
8. Close behaviors: tap hamburger again, tap X, tap outside, Escape. Record which are supported; the clone must implement tap-hamburger-again + Escape + link-tap-closes at minimum.

Write all of this into `bundles/sites/<slug>/research/header.spec.md` using the template at the bottom of this file.

## Step 3 — Extract the footer

### 3a. Grid layout pass
Before listing columns, measure the footer's actual layout structure:
1. Find all column headings inside the footer.
2. Extract each heading's `getBoundingClientRect()` x-coordinate.
3. Headings with the **same x-coordinate** are stacked in one grid column — do not split them into separate columns. Record how many true columns the grid has and which sections share a column.

```javascript
const footer = document.querySelector('footer');
const headings = [...footer.querySelectorAll('h3, h4, h5, [class*="heading"], [class*="title"]')];
headings.map(h => {
  const r = h.getBoundingClientRect();
  return { text: h.textContent.trim().slice(0, 30), x: Math.round(r.x), y: Math.round(r.y) };
});
```

### 3b. Content pass
1. Identify the `<footer>` root.
2. Enumerate column headings and links. Record label + `href` for each.
3. Bottom bar: logo, copyright line, privacy / terms links, any social icons.
4. For any forms (newsletter signup, email subscribe, contact form, zip-code lookup, etc.) record the visible markup — heading/label, input placeholder, button text, layout — and mark it as *stubbed* under "Known omissions". The clone renders the form for layout fidelity only; no submission handler.
5. Flag any other widgets that are out of scope (language switcher, live chat launcher, cookie banner) under "Known omissions" too.

### 3c. Computed style measurement pass (mandatory)
Extract `getComputedStyle` for EVERY distinct footer element type. Record in a "Measured computed styles" table in the spec:

| Element | Properties to extract |
|---|---|
| Column headings | `color`, `font-weight`, `font-size`, `text-transform` |
| Column links | `color`, `font-weight`, `font-size`, `text-decoration-line` |
| Social icon links | `color`, `border`, `border-color`, `width`, `height`, `padding`, `border-radius` |
| Legal / bottom-bar links | `color`, `font-weight`, `font-size`, `text-decoration-line` |
| Mission/tagline text | `color`, `font-weight`, `font-size` |
| CTA buttons | `color`, `border-color`, `background-color`, `font-size` |

**Critical:** Footer link `font-weight` and `text-decoration` are independent of header values. Many sites have bold header triggers with normal-weight footer links, or underlined footer links with non-underlined header links. Measure them separately — do not copy values from the header.

### 3d. Footer mobile pass (resize to 390px)
The mobile footer is almost never just a stacked version of the desktop grid. Treat it as a structurally independent layout and measure end-to-end. (See failure mode #24.)

1. Resize to ~390px and scroll to the footer. Screenshot the top of the footer.
2. **Detect the mobile layout pattern.** Three common shapes:
   - **Accordion stack**: every column heading becomes a collapsible button with a chevron; lists are hidden by default. Measure: which sections collapse (often ALL of them, including secondary ones like "Our Offices" that were a separate desktop widget), how many open at a time (single vs multi), and whether tapping toggles or only opens.
   - **Flat stack**: every section expanded, just laid out vertically.
   - **Mixed**: some sections accordion, others flat (e.g. legal links flat under a collapsed nav section).
3. **Record the mobile vertical order.** Walk the rendered DOM top to bottom and write the order. The identity column (logo, social, address, extension button) frequently moves from the LEFT on desktop to BELOW the accordion list on mobile. Don't assume the desktop grid linearizes top-to-bottom in column order — it usually doesn't. Common mobile order: logo → accordions → social row → address (single line) → CTA button → divider → language switcher → bottom links (stacked, one per line) → copyright.
4. **Re-measure typography and spacing.** Heading font-size, accordion chevron icon, link spacing, border colors between accordions — mobile values usually differ from desktop.
5. **Open every accordion**, screenshot each expanded state, and verify the items inside match the desktop column for that section. A section may have items in the desktop column that are filtered out on mobile (or vice versa).
6. **Mobile-only widget transformations.** Any desktop dropdown widget (e.g. "See all our offices") often becomes its own mobile accordion with the same content stacked. Record this as a separate spec entry, not as part of the original column it replaces.
7. Implementation note: render `MobileFooter` and `DesktopFooter` as two completely separate components inside `SiteFooter` and switch between them with `block lg:hidden` / `hidden lg:block`. Sharing JSX between breakpoints is the usual source of "mobile looks wrong" bugs because the desktop grid CSS leaks into mobile.

Write `bundles/sites/<slug>/research/footer.spec.md`.

## Step 4 — Write the components from scratch

Write `SiteHeader.tsx` and `SiteFooter.tsx` **from scratch**, shaped entirely by the spec files you produced in Steps 2 and 3. Do not copy these files from any other site. The spec is the authority on the JSX shape; the patterns below are the authority on the behavior.

### Required behaviors (implement these regardless of the site)

A correct `SiteHeader.tsx` exposes this state machine (adapted based on the trigger behavior recorded in Step 2b):

| State | Purpose |
|-------|---------|
| `openGroup: string \| null` | which top-level nav item's dropdown is currently open |
| `openMode: "hover" \| "click" \| null` | **(hover+click sites only)** why it's open, so a click doesn't immediately close a hover-opened menu |
| `expandedSubgroups: Set<string>` | which nested accordion subgroups are currently expanded within the open dropdown |
| `mobileOpen: boolean` | hamburger drawer open state |
| `mobileExpanded: Set<string>` | which top-level groups are expanded within the mobile drawer |

Effects depend on the trigger behavior recorded in Step 2b:

**If hover+click:**
- Mouseenter on a top-level trigger → `openMode: "hover"`. Mouseleave → close, unless `openMode === "click"`.
- Click on a top-level trigger → toggle with `openMode: "click"`.

**If click-only:**
- No `openMode` state, no `hoverTimeout` ref, no `onMouseEnter`/`onMouseLeave` handlers.
- Click on a top-level trigger → toggle `openGroup`.

**All sites, regardless of trigger behavior:**
- Outside click (`mousedown` outside `navRef`) → close.
- Escape key → close both dropdown and mobile drawer.
- Mobile drawer open → set `document.body.style.overflow = "hidden"`, focus first focusable element in drawer, and on close restore body overflow and focus the hamburger button.
- ARIA: `aria-haspopup="menu"`, `aria-expanded`, `aria-controls`, `role="menu"`, `role="menuitem"` on the right nodes.

### Shape from the spec, not from a template

For each top-level nav item, read its **Panel anatomy** block in `header.spec.md` and render only what that block describes:

- `Layout: single-column list` → narrow panel, no grid, no column headings inside.
- `Layout: multi-column grid (N cols)` → `grid-cols-N` panel, each column starts with its subgroup heading.
- `Layout: side flyout` → hovering a subgroup-toggle row opens a second panel absolutely positioned to the right.
- `Subgroup expansion: inline accordion` → chevron toggle expands items below the heading, pushing later rows down.
- `Heading-vs-chevron split: heading navigates, chevron toggles` → render the heading text as an `<a>` and the chevron as a sibling `<button>` with `onClick={(e) => { e.stopPropagation(); toggleSubgroup(key); }}`.

Render rows in the order they appear in the spec. A row type not in the spec is not rendered. A row type in the spec without an implementation stops the build — add the implementation, don't skip the row.

### Footer

Read `footer.spec.md`. Render the columns, bottom bar, social icons, and form stubs per the spec. Forms render markup (input + button with the recorded placeholder/label text) but do not wire up submission (see the "Forms are visual stubs only" rule).

### Logo, colors, and fonts

- `SITE_BASE` constant = the live site's origin (from the spec "Overview" line).
- `LOGO_SRC` constant = the absolute URL from the spec "Logo" block.
- Site-specific colors and fonts come from the spec's "Computed styles — container" block. Put the base font-family and text color into `styles.css` under the `.bw-scope { … }` rule you left blank in Step 1. Do NOT copy colors from another site's `styles.css`.
- Tailwind classes on the components use arbitrary-value utilities for brand colors (e.g. `text-[#020122]`, `bg-[#ff671d]`) extracted from the spec.

### Icons

Use `lucide-react` for generic icons (menu, x, chevron-down, chevron-right, search, user, shopping-cart). If the site uses brand icons (Facebook, Twitter/X, Instagram, YouTube, TikTok) that `lucide-react` no longer exports, inline the SVG paths directly in the component — don't add a new dependency.

### Scope wrapper

The top-level `<div>` returned by both `SiteHeader` and `SiteFooter` uses `className="bw-scope"` matching the class defined in `styles.css` (or the site-specific class if you opted into one).

### After writing the components

Run the typecheck:

```bash
cd bundles && npm run typecheck
```

Fix any errors before moving to Step 5. `NavGroup` / `FooterColumn` types may need extension if the site has row types the default schema can't express — update `types.ts` rather than forcing the data into the wrong shape.

## Diff mode procedure

Use this instead of Steps 1, 3, and 4 when `bundles/sites/<slug>/` already exists.

### Mindset (read this before D1)

**The user's report is a hint, not a list.** When a user opens a re-clone with "X, Y, Z are wrong", they did a quick scan of the live site and stopped writing as soon as they had a few. They expect you to find what they missed too. Treat their list as evidence the spec is broadly stale, not as the complete delta. Run the full Step 2 + Step 3 + Step 3d extraction end-to-end before reporting anything back. (See failure mode #29.)

A re-clone is considered complete only after you have:
- A fresh full spec from the live site (`*.spec.new.md`).
- A line-by-line diff vs the existing spec, classified per D2.
- Every data-only diff applied.
- Every structural diff reported with a concrete recommendation.
- The bundle rebuilt and visually diffed against the live site at BOTH 1440 and 390.

### D1. Re-extract the spec into a temp location

Run Step 2 in full (all six passes: structure, trigger behavior, dropdown anatomy + per-tab ancillary widgets, link audit, computed styles, mobile) AND Step 3 in full (all four passes including the mobile footer pass 3d). Write the new spec to a temp path, not over the existing one:

```
bundles/sites/<slug>/research/header.spec.new.md
bundles/sites/<slug>/research/footer.spec.new.md
```

Do the same for the footer.

### D2. Diff against the existing spec

Compare `header.spec.new.md` vs `header.spec.md` and `footer.spec.new.md` vs `footer.spec.md`. **Before classifying anything as "removed", search the rest of the new spec for the same label/href** — items often move between slots (card → side banner, column → bottom-bar, etc.) rather than truly disappearing. (See failure mode #27.)

Classify every difference as one of:

**Data-only (safe to auto-apply):**
- Logo URL, alt text, dimensions changed.
- A nav item's label or href changed.
- A nav item was added to an existing dropdown.
- A nav item was removed from an existing dropdown (after confirming via the search-for-label step above that it didn't migrate to another slot).
- A footer column gained or lost a link.
- Copyright text changed (e.g. year rolled over).
- `external` flag changed for an existing link.
- A social link URL changed.
- Top-nav item appears at one breakpoint but not the other (record the delta, do not "fix" the asymmetry — it's intentional). (Failure mode #28.)
- A variant/brand color hex changed (e.g. banner gradient first stop). Re-measure via `getComputedStyle(banner).backgroundImage`. (Failure mode #30.)
- A CDN URL changed but only in the build-id segment (e.g. `/build/20260422.master.3e4a8b1/` → `/build/20260514.master.b107e23/`) AND the trailing asset filename is byte-identical. Just update the URL.
- Per-tab side banner content changed (kicker, title, body, CTA, href, image) on a tab that already had a per-tab override.
- An item moved from one card grid / column to ANOTHER existing card grid / column (no new slot needs to be created).
- A new responsive image variant URL appeared (`imgMobile` added next to existing `img` field, or vice versa).
- A dead link was removed (the live DOM no longer contains it AND the URL it points to 404s).

**Structural (stop and report — do not auto-apply):**
- A top-level nav item gained a dropdown it didn't have before (or vice versa).
- A dropdown's panel layout changed (single-column ↔ grid ↔ flyout).
- A subgroup appeared or disappeared inside a dropdown.
- The heading-vs-chevron split changed.
- Panel width changed by more than 40 px.
- Mobile breakpoint moved.
- A new form / icon / widget appeared, or an existing one was removed.
- A new row type appeared that the component doesn't currently render.
- The scope class, base font, or base text color changed.
- A new per-tab ancillary widget variant appeared for a tab that previously used the default (e.g. a tab that used to share the holiday-report banner now has a contextual variant). The component needs a `WIDGET_BY_TAB_ID` map if it doesn't already, OR a new entry in the existing map. (Failure mode #22.)
- A new responsive image variant infrastructure is required (the data model has only `img` but the live site now serves `img` + `imgMobile`). (Failure mode #23.)
- The asset behind a CDN URL changed (filename hash differs, not just the build-id segment). Treat as a possible new artwork — flag for user review even if the surrounding URL pattern matches. (Failure mode #26.)
- The mobile footer layout pattern changed (flat stack → accordion, accordion → flat, mobile vertical order reshuffled). (Failure mode #24.)
- The desktop footer changed grid column count, or two previously-separate columns merged into one.
- An item appears removed from one slot AND appears in a new slot that doesn't exist yet in the component. (Failure mode #27.)

### D3. Apply data-only changes

For each data-only diff:

1. Overwrite the relevant entry in the component's `NAV_GROUPS` / `COLUMNS` / `SOCIALS` / `SITE_BASE` / `LOGO_SRC` constant.
2. Do NOT rewrite surrounding JSX, state machine, styles, or icon imports.
3. If the entry is gone on the live site, delete it from the data array.
4. If a new entry appears, insert it at the same position as in the new spec.

### D4. Report structural diffs to the user

Print a clear summary of every structural diff in chat, grouped by top-level nav item and by footer region. For each, include: the old shape, the new shape, and a one-sentence recommendation ("Products gained a fifth subgroup 'Training' — add a new subgroup entry to `NAV_GROUPS[0].subgroups` and confirm the chevron/accordion behavior on the live site"). Do NOT touch component logic for structural diffs; wait for the user to decide.

### D5. Replace the old spec

Once data-only diffs are applied and structural diffs are reported, replace the old spec with the new one:

```bash
mv bundles/sites/<slug>/research/header.spec.new.md bundles/sites/<slug>/research/header.spec.md
mv bundles/sites/<slug>/research/footer.spec.new.md bundles/sites/<slug>/research/footer.spec.md
```

The spec always reflects the live site's current state. Manual UI tuning stays in the component files.

### D6. Rebuild and smoke test

Run Step 5 (build) and Step 6 (functional parity) as normal. If no data-only changes were applied and no structural diffs were reported, the build output should be byte-identical to the previous build — confirmation that diff mode was truly a no-op for an unchanged site.

## Step 5 — Build

From the repo root:

```bash
cd bundles
npm run build:site -- --env SITE=<slug>     # or: SITE=<slug> npm run build:site
```

Verify `bundles/dist/<slug>/{header,footer}.bundle.js` exist. Each should be ~65 KB gzipped.

## Step 5b — Raw build (`-raw` mode only)

Run this IN ADDITION to Step 5 when the user passed `-raw`. It produces an editable HTML artifact set and **never modifies the bundle** — `header.bundle.js` / `footer.bundle.js` stay byte-identical, so the bundle is always the fallback.

### Why raw mode exists

The bundle renders the header/footer from JS at runtime, so there is no HTML for the client to edit — changing a link means editing the `.tsx` data and rebuilding. Raw mode emits the header/footer as **plain, hand-editable HTML** the client pastes into their own site header file. They update copy and `href`s directly in that markup; no rebuild required. The JS (interactivity) and CSS stay bundled into a small script.

### Isolation is preserved via runtime Shadow DOM adoption

The editable markup lives in the host's **light DOM** (so it's editable), but `header.js` relocates it into a **Shadow DOM** on load: it reads the host container's `innerHTML`, calls `attachShadow`, injects the compiled+inlined CSS as a `<style>`, and renders the markup inside the shadow root. Net effect: the client edits text in their source file, but what renders is sandboxed exactly like the bundle — host CSS can't bleed in, bundle CSS can't leak out. Outside-click detection uses `event.composedPath()` (shadow-aware), and the inlined CSS keeps the `--tw-*` reset (failure mode #35) because `@property` defaults don't apply inside a shadow root.

### File layout (cold-start adds a `src/raw/` folder)

```
bundles/sites/<slug>/src/raw/
  header.static.tsx      # static render of the header: EVERY state present in the
                         #   DOM up front (all submenus, panels, full mobile drawer),
                         #   each non-default state marked `hidden`, wired with
                         #   data-bw-* hooks. Imports the SAME data.ts / icons.ts as
                         #   the bundle so copy is never duplicated.
  footer.static.tsx      # OR reuse the bundle's SiteFooter if it's already a pure
                         #   presentational component with no hooks/handlers.
  behavior-header.ts     # vanilla controller: shadow-adopt + CSS inject + all
                         #   interactivity (chrome/scroll, dropdowns, search,
                         #   locations, mobile drawer). Reads `declare const
                         #   __BW_STYLES__` (replaced at build with compiled CSS).
  behavior-footer.ts     # minimal: shadow-adopt + CSS inject (footer is static).
  render.tsx             # build entry: renderToStaticMarkup(header) + (footer),
                         #   prints JSON to stdout.
```

Build output (alongside the frozen bundle):

```
bundles/dist/<slug>/
  header.html    # editable fragment, wrapped in <div data-bw-raw-header>
  footer.html    # editable fragment, wrapped in <div data-bw-raw-footer>
  styles.css     # compiled, .bw-scope-prefixed CSS (reference copy)
  header.js      # vanilla; adopts the fragment into Shadow DOM, inlines CSS
  footer.js      # vanilla; adopts the footer fragment into Shadow DOM
  raw-demo.html  # local smoke-test page (hero + header + content + footer)
```

### The `data-bw-*` contract (HTML ↔ JS bridge)

The static HTML and the vanilla JS are coupled only by `data-bw-*` attributes. The client may freely edit text and `href`s; they must NOT delete these attributes. Use a stable, self-describing set, e.g.: `data-bw-raw-header` / `data-bw-raw-footer` (shadow host), `data-bw-header-root`, `data-bw-header` + `data-bw-chrome`, `data-bw-trigger`, `data-bw-submenu`, `data-bw-subtab` / `data-bw-subpanel`, `data-bw-action="..."`, `data-bw-drawer`, `data-bw-mpanel` / `data-bw-mgroup` / `data-bw-mopt` / `data-bw-mcontent`. Mirror the exact state machine the bundle's `SiteHeader.tsx` implements (from Step 4 / Step 2b), just driven by class/attribute/`hidden` toggles instead of React state.

### Build & verify

```bash
cd bundles
SITE=<slug> npm run build:raw        # or add a build:raw:<slug> script
python3 -m http.server 8770 --directory dist
# browser MCP → http://localhost:8770/<slug>/raw-demo.html
```

Run the SAME functional-parity + visual-diff checks (Step 6 / 6.5) against `raw-demo.html` that you run against the bundle demo, PLUS a raw-specific check: the host page's own styles (use a serif font + colored links in the demo) must not bleed into the header/footer and vice versa — confirming the Shadow DOM adoption worked.

### Client integration (what you hand off)

```html
<link rel="stylesheet" href="styles.css" /> <!-- optional; CSS is also inlined in header.js -->

<!-- paste header.html here; edit text + hrefs freely, keep data-bw-* attributes -->
<script src="header.js" defer></script>
```

## Step 6 — Run the functional-parity smoke test

Serve the site's demo folder:

```bash
python3 -m http.server 8765 --directory bundles
```

Then via the browser MCP:

1. Navigate to `http://localhost:8765/sites/<slug>/demo/header.html`.
2. Walk the Header desktop checklist above. Test hover, click, Escape, outside-click, and Tab navigation.
3. Walk the **dropdown panel anatomy** checklist — for each dropdown in the built bundle, confirm width, layout type, row inventory, and nested behavior match what's in the spec.
4. Resize to 390px. Walk the Header mobile checklist.
5. Navigate to `http://localhost:8765/sites/<slug>/demo/footer.html`.
6. Walk the Footer checklist.
7. Navigate to a **blank** HTML page that only imports the header bundle — verify the host's default `<h1>` / `<ul>` / `<p>` styles are unchanged (style isolation smoke test).

If any checkbox fails, fix the component, rebuild, and re-run the test. Do not move on until every box is green.

### Step 6.5 — Side-by-side visual diff (mandatory)

Before calling the header done, open TWO browser tabs via the MCP:
- Tab A: the live site (e.g. `https://byrna.com/`).
- Tab B: the built demo (`http://localhost:8765/sites/<slug>/demo/header.html`).

For each top-level nav item, AND repeat the entire process at mobile (390px):

1. Open the dropdown in both tabs.
2. Take a viewport screenshot of each and save to `images/` with descriptive names (e.g. `<slug>-products-live.png` and `<slug>-products-clone.png`). The `images/` folder is gitignored.
3. **Structural comparison.** Is the panel the same width? Same number of columns? Same row types in the same order? Are there any rows in one that aren't in the other?
4. **For tabbed dropdowns: walk every tab.** Don't visually compare only the default tab. Click through every tab in BOTH the live site and the clone, side by side, and verify: the sidebar entry's active-state ornament matches, the panel content matches, AND the side banner / bottom-bar / callout column matches per-tab (these often vary). (See failure mode #22.)
5. **Ornament comparison.** Walk through these every time, on every dropdown:
   - Trigger active state — does the live site show a colored underline / 3px bar / color shift on the open trigger? Does the clone?
   - Sidebar tab icons — does each tab in the live site have an icon, or do some entries omit it? Does the clone match per-entry?
   - Card backgrounds — are tinted backgrounds (gradient or solid `rgba`) actually rendered in the clone, AT BOTH BREAKPOINTS? Mobile is the most common place to find a missing tint. (Failure mode #25.)
   - Bottom bar — does the live site show a full-popup-width utility bar at the bottom? Is the clone's bar the same width and the same background color?
   - Banner gradient color — for each tab with a variant-colored banner, eyeball the gradient starting color (hot pink? orange? cyan?). 1-byte hex drifts (`#FFA800` → `#FF7A1A`) are real failures the user will spot. (Failure mode #30.)
   - Banner illustration — is the rendered illustration actually the mobile variant on mobile? An easy sanity check: the desktop banner is usually a 3D laptop-and-phone tilt; the mobile variant is a flat row of phone screens. If both breakpoints render the same silhouette, the mobile renderer is using `img` instead of `imgMobile`. (Failure mode #23.)
   - Borders — are sidebar / column dividers present or absent? Border radius on cards (4 vs 8 vs 12)?
   - Icons — every dropdown item that should have a brand icon shows the correct brand icon, not a fallback dot.
   - Login / utility divider — vertical thin line before the Login link or between language switcher items.
6. If there are any invented rows in the clone (see "No invented UI" rule), delete them.
7. If the clone is missing a row type that exists in the real site (subgroup toggle, description line, CTA, bottom-bar utility row), add it.
8. Repeat for any nested/expanded state (expand an accordion subgroup, hover a card, open a sidebar tab) and compare again.
9. **Mobile pass (390px).** Repeat the entire process on the mobile drawer — every drawer state that exists in the spec gets a side-by-side comparison. Pay particular attention to: card background tints (#25), banner illustration variant (#23), and accordion behavior on the footer (#24).
10. **Top-nav parity audit.** At desktop, list every visible top-level nav item. At mobile, open the drawer and list every visible item. Compare against the spec — record any per-breakpoint delta. An item appearing on one and not the other is usually intentional, but the spec must capture it. (Failure mode #28.)
11. **Footer mobile diff.** Scroll to the footer at 390px in both tabs. Verify the accordion behavior matches (which sections collapse, single-vs-multi-open), the vertical order matches, and the address single-line layout matches. (Failure mode #24.)

Only when the structural AND ornament match is tight do you move on. Not "close enough" — if the user can tell at a glance that the shapes are different, that a card has the wrong background tint, or that the active trigger is missing its underline, the clone is not done.

## Step 7 — Preview in Next.js (optional but recommended)

The Next.js preview harness auto-discovers every folder under `bundles/sites/` and lists them on the index page. Each site has its own route.

**Cold-start:** create `src/app/<slug>/page.tsx` that imports `SiteHeader` and `SiteFooter` from `../../../bundles/sites/<slug>/src/...`. Copy the structure from `src/app/byrna/page.tsx` and swap the slug. Run `npm run dev` and visit `http://localhost:3000/<slug>`.

**Diff mode:** the route already exists. Just refresh `http://localhost:3000/<slug>` after rebuilding to see the updated components.

This renders the same source as the bundle inside a full Next.js page — useful for catching layout issues the demo HTML page might miss.

## Step 8 — Commit

Single commit per site:

```
feat(<slug>): extract header + footer as drop-in bundle
```

Include: `bundles/sites/<slug>/**`, any `bundles/vite.config.ts` or `package.json` edits needed for the new slug. Do not commit `bundles/dist/` (gitignored).

## Spec file templates

### `header.spec.md`

```markdown
# <Slug> Header Specification

## Overview
- Site: <URL>
- Extracted: <date> (re-extracted: <date>, <date>, …)
- Target files: bundles/sites/<slug>/src/header/{SiteHeader.tsx,mount.tsx}

## Logo
- src: <absolute URL>
- alt: <text>
- dimensions: <w>x<h>
- link: <where the logo links to>

## Top-nav parity (desktop vs mobile)
| Item | Desktop | Mobile drawer | Notes |
|------|---------|---------------|-------|
| …    | yes / no | yes / no      | e.g. "Explore API mobile-only" |

## Nav groups
(one section per top-level nav item)

### <Label> — href: <URL>

**Panel anatomy** (fill this in BEFORE writing JSX):
- Width: <px>
- Layout: <single-column list | multi-column grid (N cols) | tabbed (sidebar tabs + content panel) | side flyout | accordion>
- Row types (in order, top to bottom):
  1. <row-type> — <label / heading / CTA text>
  2. …
- Subgroup expansion: <none | inline accordion | side flyout>
- Heading-vs-chevron split: <heading navigates, chevron toggles | whole row navigates | whole row toggles>

**Items** (flat list, including nested ones under subgroups):
| Label | href | external | parent subgroup | description |
|-------|------|----------|-----------------|-------------|
| …     | …    | …        | …               | …           |

**Per-tab banner / hero** (tabbed dropdowns only — one row per tab):
| Tab id | Title (desktop) | Title (mobile) | Subtitle | href | Variant hex | Image (desktop URL) | Image (mobile URL) |
|--------|-----------------|----------------|----------|------|-------------|---------------------|--------------------|
| …      | …               | …              | …        | …    | #XXXXXX     | https://…           | https://…          |

**Per-tab ancillary widgets** (tabbed dropdowns only — only list tabs that DEVIATE from the default widget):
| Tab id | Widget | Override value |
|--------|--------|----------------|
| daas   | side banner | kicker / title / body / CTA / href / image — see DATA_LICENSING_SIDE_BANNER |

**Default ancillary widgets** (used by every tab not in the per-tab table):
- Side banner: kicker / title / body / CTA / href / image
- Bottom bar links: [list]

## Desktop behaviors
- Dropdown trigger: hover + click
- Close triggers: outside click, Escape
- Search icon: <present / absent> — <implemented / stubbed>

## Mobile behaviors
- Hamburger breakpoint: <px>
- Drawer row types: <same as desktop | flattened | other>
- Drawer close triggers: link tap, Escape, hamburger toggle
- Any differences from desktop data: <describe>
- Banner illustration variant used in detail view: <`imgMobile` / fallback to `img`>

## Computed styles — container
- height: …
- background: …
- border: …
- padding: …
- max-width (inner): …

## Known omissions
- <list anything not implemented>
- <list anything on the live site you deliberately did not clone and why>
```

### `footer.spec.md`

```markdown
# <Slug> Footer Specification

## Overview
- Site: <URL>
- Extracted: <date> (re-extracted: <date>, <date>, …)
- Target files: bundles/sites/<slug>/src/footer/{SiteFooter.tsx,mount.tsx}

## Desktop layout (>= <breakpoint>px)
- Grid: <N> columns, gap <px>
- Sections sharing a column: [list any (heading, heading) pairs that live in the same grid column]
- Column order, left to right: [identity, nav-col-1, nav-col-2, …]

## Columns
### <Heading>
| Label | href | external |
|-------|------|----------|
| …     | …    | …        |

## Bottom bar (desktop)
- Logo: <src>
- Copyright: <text>
- Legal links: [privacy, terms, …]
- Social icons: <list>
- Language switcher: <present / absent> — <implemented / stubbed>
- Offices dropdown: <present / absent> — <implemented / stubbed>

## Mobile layout (< <breakpoint>px)
- Pattern: <accordion stack | flat stack | mixed>
- Number of accordions: <N>
- Multi-open allowed: <yes / no>
- Vertical order, top to bottom:
  1. Logo
  2. Accordion: <heading 1>
  3. Accordion: <heading 2>
  4. …
  N. <Social row / address / CTA / language / legal stack / copyright>
- Address layout: <single line | multi-line>
- Any widget that becomes its own mobile accordion (e.g. "Our Offices"): [list]
- Items present on mobile but not desktop (or vice versa): [list]

## Computed styles — desktop
- background: …
- padding: …
- column heading: font-size / font-weight / color
- column link: font-size / font-weight / text-decoration / color
- social icon: width / height / color / border

## Computed styles — mobile
- accordion button: font-size / font-weight / color / chevron color / border-bottom color
- expanded link: font-size / font-weight / color
- divider color between accordion sections

## Known omissions
- Newsletter signup, language switcher, etc.
```

## What NOT to do

- Do not implement CSS-only `group-hover` dropdowns. They break on touch and keyboard. Use JS state.
- Do not leave `href="#"` or placeholder links anywhere. If you don't know the real link, extract it from the live site.
- Do not `@import "tailwindcss"` in the bundle's `styles.css`. That pulls preflight and breaks the host page.
- Do not build the page body, any hero section, or any content between the header and footer. Scope is two components.
- Do not skip the functional parity checklist. A beautiful header that doesn't open its dropdowns on touch is a broken header.
- Do not default to a mega-menu. If you haven't measured the open panel's width and classified its row types (Step 2b), you don't know what shape it should be.
- Do not invent UI. No "View all X →" headers, no "Featured" banners, no promo cards, no helper sentences — unless they exist on the live site and are in the spec file.
- Do not probe only top-level interactions. If a dropdown row has a chevron, you must hover and click it before you can say the site is extracted.
- Do not call it done without the Step 6.5 side-by-side visual diff. "Links work and nothing's broken" is not the bar; the bar is "the shapes match".
- Do not copy `SiteHeader.tsx` or `SiteFooter.tsx` from another site as a starting template. Those files carry that site's dropdown shape and will bias the new clone toward the wrong structure. Write them from scratch, shaped by this site's spec.
- Do not overwrite existing component files on a re-clone. Diff mode only updates the data arrays for *data-only* diffs; *structural* diffs are reported to the user, never applied silently.
