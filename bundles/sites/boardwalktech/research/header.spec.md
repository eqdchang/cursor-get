# SiteHeader Specification

## Overview
- **Site:** `https://boardwalktech.com/`
- **Target files:** `bundles/sites/boardwalktech/src/header/{SiteHeader.tsx,mount.tsx}`
- **Source of truth:** live DOM extracted via Playwright on 2026-04-21
- **Interaction model:** JS-driven state machine — hover opens dropdown, click toggles (for touch + keyboard), Escape + outside-click close. Mobile hamburger opens a drawer with body scroll lock and focus restore.

## DOM / visual structure

Fixed-top white bar, 80px tall, `border-b border-gray-100`, z-50.

```
<header fixed top-0 bg-white border-b z-50>
  <div max-w-7xl mx-auto h-20 flex justify-between>
    <a href="/Home"><img logo h-12></a>

    <nav hidden lg:flex gap-1>
      for each NAV_GROUP:
        <div class="relative group">
          <a href={group.href} class="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
            {label}<ChevronDownIcon w-4 h-4 />
          </a>
          <div class="absolute top-full left-0 w-96 mt-1 py-2 bg-white rounded-xl shadow-xl border border-gray-100
                      opacity-0 invisible translate-y-1
                      group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
                      transition-all duration-150">
            for each item:
              <a href={item.href} class="block px-4 py-3 text-sm hover:bg-blue-50 transition-colors">
                <div class="font-medium text-gray-900 hover:text-blue-600">{label}</div>
                {item.description && <div class="text-xs text-gray-500 mt-1">{description}</div>}
              </a>
          </div>
        </div>
      <button class="p-2 text-gray-500 hover:text-blue-600 ml-2"><SearchIcon w-5 h-5/></button>
    </nav>

    <button lg:hidden p-2 text-gray-700 aria-label="Menu" onClick={toggle}>
      {open ? <XIcon w-6 h-6/> : <MenuIcon w-6 h-6/>}
    </button>
  </div>

  {open && (
    <div class="lg:hidden bg-white border-t border-gray-100 overflow-hidden">
      <div class="max-h-[70vh] overflow-y-auto py-4 px-4">
        for each NAV_GROUP:
          <div class="py-2">
            <div class="text-sm font-semibold text-gray-900 mb-2">{group.label}</div>
            for each item:
              <a class="block py-2 pl-4 text-sm" href={item.href}>
                <div class="text-gray-900 font-medium">{item.label}</div>
                {item.description && <div class="text-xs text-gray-500 mt-0.5">{item.description}</div>}
              </a>
          </div>
      </div>
    </div>
  )}
</header>
```

## Dropdown (desktop) — computed styles

| Property | Value |
|---|---|
| position | `absolute` |
| top | `top-full` (36px from top of group) |
| left | 0 |
| width | `w-96` (384px) |
| padding | `py-2` |
| background | `rgb(255,255,255)` |
| border | `1px solid rgb(243,244,246)` |
| borderRadius | `12px` (`rounded-xl`) |
| boxShadow | `shadow-xl` (two-layer `rgba(0,0,0,0.1) 0 20px 25px -5px, 0 8px 10px -6px`) |
| marginTop | `mt-1` (4px) |
| hidden state | `opacity-0 invisible translate-y-1` |
| reveal | `group-hover:opacity-100 group-hover:visible group-hover:translate-y-0` |
| transition | `transition-all duration-150` |

Each dropdown row: `block px-4 py-3 text-sm hover:bg-blue-50 transition-colors`, label in `font-medium text-gray-900`, optional description in `text-xs text-gray-500 mt-1`.

## Links — real URLs

Top-level nav anchors point to `https://boardwalktech.com/<path>`. Logo points to `https://boardwalktech.com/Home`. All dropdown items point to real subpaths. The `Investors` link (in About dropdown) opens in a new tab.

### NAV_GROUPS data

| Group (href) | Items (href) | Description |
|---|---|---|
| Platform → `/Platform` | Velocity → `/velocity` | Business Process and AI Workflow Automation |
| | Unity Central → `/unity-central` | Regulated Data Foundation for AI Information Orchestration |
| | Verity → `/verity` | AI Driven Intelligent Controls/Compliance Automation/Execution |
| Solutions → `/Solutions` | AI Driven Controls Intelligence - Automation, Testing, Monitoring → `/solutions-automated-control-testing` | — |
| | Excel EUC Transformation/Automation/Controls for Financial Services → `/solutions-financial-services-excel-euc-transformation` | — |
| | Excel Based Deal Pricing and CPQ → `/solutions-deal-pricing` | — |
| | Excel Tracker AI Based Digital Transformation → `/solutions-bpo-digital-transformation-agent-ai` | — |
| | AI Powered Order Management and Visibility → `/solutions-ai-powered-order-management` | — |
| | AI Automate your Excel Processes in your Enterprise → `/solutions-automating-excel-workflow-around-erp-systems` | — |
| | AI Supply Chain Information Intelligence → `/solutions-supply-chain-information-intelligence` | — |
| | Supply Chain Excel Automation → `/solutions-supply-chain-excel-automation` | — |
| Industries → `/Industries` | CPG → `/industries-cpg` | — |
| | Apparel → `/industries-apparel` | — |
| | Technology → `/industries-technology` | — |
| | Manufacturing → `/industries-manufacturing` | — |
| | Financial Services → `/industries-financial-services` | — |
| | Insurance → `/industries-insurance` | — |
| | Tax → `/industries-tax` | — |
| | Government → `/industries-government` | — |
| Resources → `/Resources` | Insights Library → `/resources-insights-library` | — |
| | Blog → `/resources-blog` | — |
| | Client Resources → `/resources-client-resources` | — |
| About → `/AboutUs` | Newsroom → `/about-us-newsroom` | — |
| | Partners → `/about-us-partners` | — |
| | Leadership → `/about-us-leadership` | — |
| | **Investors → `https://ir.boardwalktech.com/` (target=_blank)** | — |
| | Careers → `/about-us-careers` | — |
| | Contact Us → `/contact-us` | — |

Search button in nav is a visual-only icon (no handler on the original — clicking triggers an empty toaster container). We render it as a plain `<button type="button">` with no action.

## Mobile drawer

- Toggled by hamburger button; icon switches `MenuIcon ↔ XIcon`
- Same NAV_GROUPS rendered as a stacked accordion (all open)
- Wrapper: `lg:hidden bg-white border-t border-gray-100 overflow-hidden`
- Inner: `max-h-[70vh] overflow-y-auto py-4 px-4`
- Group title: `text-sm font-semibold text-gray-900 mb-2`
- Item row: `block py-2 pl-4 text-sm` — label `text-gray-900 font-medium`, description `text-xs text-gray-500 mt-0.5`
- Closing behavior: closes on item click

## Responsive behavior
- ≥1024px (`lg:`): full nav visible, hamburger hidden
- <1024px: hamburger shown, nav hidden, drawer toggles inline below header

## Notes
- The live site is client-rendered; mounting shows a brief fade for the dropdown (`opacity 0→1`). We replicate with CSS `group-hover:` and a 150ms transition.
- The original doesn't use `Link` (SPA router) — we use plain `<a>` since destinations are on the real boardwalktech.com.
