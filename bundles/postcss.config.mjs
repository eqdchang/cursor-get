import prefixer from "postcss-prefix-selector";

const SCOPE = ".bw-scope";

export default {
  plugins: [
    prefixer({
      prefix: SCOPE,
      transform(prefix, selector) {
        const trimmed = selector.trim();

        if (trimmed === prefix) return trimmed;
        if (
          trimmed.startsWith(`${prefix} `) ||
          trimmed.startsWith(`${prefix}.`) ||
          trimmed.startsWith(`${prefix}:`) ||
          trimmed.startsWith(`${prefix}[`) ||
          trimmed.startsWith(`${prefix}>`) ||
          trimmed.startsWith(`${prefix}+`) ||
          trimmed.startsWith(`${prefix}~`)
        ) {
          return trimmed;
        }

        if (
          trimmed === ":root" ||
          trimmed === ":host" ||
          trimmed === "html" ||
          trimmed === "body"
        ) {
          return prefix;
        }

        if (trimmed.startsWith("@")) return trimmed;

        if (trimmed === "*") return `${prefix} *`;
        if (trimmed.startsWith("*::") || trimmed.startsWith("*:")) {
          return `${prefix} ${trimmed}`;
        }
        if (trimmed.startsWith("::") || trimmed.startsWith(":")) {
          return `${prefix} ${trimmed}`;
        }

        return `${prefix} ${trimmed}`;
      },
    }),
  ],
};
