/**
 * Build-time entry: renders the raw-mode header + footer to static HTML.
 * Bundled and executed by `scripts/build-raw.mjs`, which captures the JSON it
 * prints to stdout and writes the `header.html` / `footer.html` fragments.
 */
import { renderToStaticMarkup } from "react-dom/server";
import { StaticHeader } from "./header.static";
import { SiteFooter } from "../footer/SiteFooter";

const header = renderToStaticMarkup(<StaticHeader />);
const footer = renderToStaticMarkup(<SiteFooter />);

process.stdout.write(JSON.stringify({ header, footer }));
