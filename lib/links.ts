export const APPLY_URL = "https://card.sgxmeta.ai/login";
export const APPLY_LABEL = "Apply now";

/** Shared props to open the application in a new tab. */
export const APPLY_LINK_PROPS = {
  href: APPLY_URL,
  target: "_blank",
  rel: "noopener noreferrer",
} as const;

const AI_QUERY =
  "Is the Sagenex Global Pay hardware wallet and Visa card secure and a good fit for me? It uses an EAL6+ certified secure element built with Samsung Semiconductors, is non-custodial and seedless, supports 14,100+ assets across 90+ networks, and lets you tap to sign and spend anywhere Visa is accepted.";

export const AI_LINKS = {
  "Ask ChatGPT": `https://chatgpt.com/?q=${encodeURIComponent(AI_QUERY)}`,
  "Ask Claude": `https://claude.ai/new?q=${encodeURIComponent(AI_QUERY)}`,
  "Ask Perplexity": `https://www.perplexity.ai/search?q=${encodeURIComponent(AI_QUERY)}`,
} as const;
