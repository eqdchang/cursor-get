# SiteFooter Specification

## Overview
- **Site:** `https://boardwalktech.com/`
- **Target files:** `bundles/sites/boardwalktech/src/footer/{SiteFooter.tsx,mount.tsx}`
- **Source of truth:** live DOM extracted via Playwright on 2026-04-21
- **Interaction model:** static — all anchors point to real boardwalktech.com subpaths. Investors opens in a new tab with `rel="noopener noreferrer"`.

## Structure
```
<footer class="bg-white border-t border-gray-100">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <div class="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
      [5 columns: Platform / Solutions / Industries / Resources / About Us]
    </div>

    <div class="mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
      <img h-8 src="/images/brand/boardwalk-tech-logo.png" alt="Boardwalk Tech" />
      <p class="text-sm text-gray-500">Copyright 2006-2025 Boardwalktech, Inc</p>
      <a href="https://boardwalktech.com/privacy-policy" class="text-sm text-gray-500 hover:text-blue-600 transition-colors">Privacy Policy</a>
    </div>
  </div>
</footer>
```

## Link map

| Column | Label | href | external |
|---|---|---|---|
| Platform | Velocity | `/velocity` | no |
| | Unity Central | `/unity-central` | no |
| | Verity | `/verity` | no |
| Solutions | AI-Powered Order Management | `/solutions-ai-powered-order-management` | no |
| | Deal Pricing | `/solutions-deal-pricing` | no |
| | Supply Chain Excel Automation | `/solutions-supply-chain-excel-automation` | no |
| | Financial Services Excel & EUC Transformation | `/solutions-financial-services-excel-euc-transformation` | no |
| | Supply Chain Information Intelligence | `/solutions-supply-chain-information-intelligence` | no |
| | BPO Digital Transformation & Agent AI | `/solutions-bpo-digital-transformation-agent-ai` | no |
| | Automate & Streamline Excel Processes Around Your ERP | `/solutions-automating-excel-workflow-around-erp-systems` | no |
| | Automated Control Testing | `/solutions-automated-control-testing` | no |
| Industries | CPG | `/industries-cpg` | no |
| | Apparel | `/industries-apparel` | no |
| | Technology | `/industries-technology` | no |
| | Manufacturing | `/industries-manufacturing` | no |
| | Financial Services | `/industries-financial-services` | no |
| | Insurance | `/industries-insurance` | no |
| | Tax | `/industries-tax` | no |
| | Government | `/industries-government` | no |
| Resources | Insights Library | `/resources-insights-library` | no |
| | Blog | `/resources-blog` | no |
| | Client Resources | `/resources-client-resources` | no |
| About Us | Newsroom | `/about-us-newsroom` | no |
| | Partners | `/about-us-partners` | no |
| | Leadership | `/about-us-leadership` | no |
| | **Investors** | `https://ir.boardwalktech.com/` | **yes (_blank)** |
| | Careers | `/about-us-careers` | no |
| | Contact Us | `/contact-us` | no |
| (bottom) | Privacy Policy | `/privacy-policy` | no |

All relative paths are resolved against `https://boardwalktech.com` so users land on the real pages.

## Styling
- Column heading: `<h4 class="text-sm font-semibold text-gray-900 mb-4">`
- List: `<ul class="space-y-3">`
- Link: `<a class="text-sm text-gray-600 hover:text-blue-600 transition-colors">`
- Bottom logo: `h-8`
- Bottom row layout: column on mobile, row on `md:` with `items-center justify-between gap-4`

## Responsive behavior
- ≥768px (`md:`): 5 columns, bottom row horizontal
- <768px: 2 columns, bottom row stacks
