export const BENTO_STATS = [
  {
    id: "tokens",
    value: "14,100+",
    label: "Tokens supported across the Sagenex ecosystem",
  },
  {
    id: "chains",
    value: "90+",
    label: "Blockchain networks, one cold wallet",
  },
  {
    id: "security",
    value: "EAL6+",
    label: "Tamper-resistant secure element chip certified to the highest standards",
  },
  {
    id: "protected",
    value: "6M+",
    label: "Cards protected since launch with zero security breaches",
  },
] as const;

export const BENTO_BANNER = {
  id: "reviews",
  stars: 5,
  title: "SAGENEX",
  rating: "5.0",
  label: "Rated 5/5 stars by leading security experts",
  sublabel: "Trusted by crypto holders worldwide",
} as const;

/** @deprecated Use BENTO_BANNER — kept for bento-wide-tile compatibility */
export const BENTO_WIDE = BENTO_BANNER;

export const HIGHLIGHTS = [
  {
    id: "ownership",
    title: "True ownership",
    desc: "No bank or exchange stands between you and your funds.",
    detail:
      "The Sagenex Global Pay card is fully non-custodial. Your private keys are generated and sealed inside an EAL6+ certified secure element built with Samsung Semiconductors — no company, bank, or government can freeze or access your assets. Only you hold the keys.",
    size: "hero" as const,
  },
  {
    id: "easy",
    title: "Easy to use",
    desc: "Activate in two minutes and sign with a single tap.",
    detail:
      "Set up your wallet in minutes, then simply tap the card to your phone over NFC to sign any transaction. No cables, no accounts, no complexity — your keys never leave the chip.",
    size: "wide" as const,
  },
  {
    id: "crypto",
    title: "All your crypto",
    desc: "14,100+ assets across 90+ blockchain networks.",
    detail:
      "Store, manage, and secure Bitcoin, Ethereum, Solana and thousands more from a single card — 14,100+ tokens across 90+ networks, all protected offline.",
    size: "small" as const,
  },
  {
    id: "seedless",
    title: "Seedless by design",
    desc: "No 12-word recovery seed to lose.",
    detail:
      "Your key is generated and locked inside the card's secure chip, so there's no seed phrase to write down, photograph, or accidentally expose. Prefer a recovery phrase? Generating one stays optional.",
    size: "small" as const,
  },
  {
    id: "ready",
    title: "Always ready",
    desc: "No batteries, no cables, nothing to charge.",
    detail:
      "Powered by your phone's NFC field and machined from solid metal to last 25+ years, the card is ready whenever you are. Slip it in your pocket and go.",
    size: "wide" as const,
  },
  {
    id: "storage",
    title: "More than storage",
    desc: "Buy, send, swap, earn, and spend — from one app.",
    detail:
      "Do more than hold crypto: trade and earn yield right in the Sagenex app, then spend anywhere Visa is accepted with Global Pay.",
    size: "wide" as const,
  },
] as const;

export const CARD_TYPES_HEADER = {
  eyebrow: "Card options",
  title: "Virtual or physical — pick what fits",
  subtitle:
    "Both cards share the same security and spending power. Choose instant digital access or a card you can tap in stores.",
  minBalanceNote: "$100 minimum card balance required for both",
} as const;

export const CARD_TYPES = [
  {
    id: "virtual",
    name: "Virtual Card",
    tagline: "Instant access, zero wait",
    feeLabel: "$50",
    feeNote: "one-time issuance fee",
    minBalance: 100,
    image: "/card-virtual-product.png",
    imageAlt: "Sagenex virtual card in the mobile app",
    features: [
      "Ready in minutes after KYC approval",
      "Add to Apple Pay and Google Pay",
      "Spend online and in-app worldwide",
      "Same secure element protection as physical",
    ],
  },
  {
    id: "physical",
    name: "Physical Card",
    tagline: "Tap, sign, and spend in person",
    feeLabel: "$100",
    feeNote: "one-time issuance fee",
    minBalance: 100,
    image: "/card-physical-product.png",
    imageAlt: "Sagenex physical Global Pay card",
    features: [
      "Visa card with NFC tap-to-sign",
      "Spend anywhere Visa is accepted",
      "Hardware wallet keys sealed on-chip",
      "Ships to your door after verification",
    ],
    featured: true,
  },
] as const;

export const BACKUP_HEADER = {
  label: "Get started",
  title: "Your card in three steps.",
  desc: "Create an account, verify your identity, and we'll ship your Sagenex Global Pay Card — your cold wallet and Visa card in one.",
} as const;

export const BACKUP_STEPS = [
  {
    title: "Create your account",
    desc: "Sign up with your email, set a password, and download the Sagenex app.",
    scroll: "Scroll to explore",
  },
  {
    title: "Complete KYC",
    desc: "Verify your identity in minutes — upload a government ID and take a quick selfie.",
  },
  {
    title: "Receive your card",
    desc: "Your Sagenex Global Pay Card ships to your door. Tap it to your phone to activate.",
  },
] as const;

export const BACKUP_FOOTER =
  "Once activated, your private keys are generated and stored on the card's tamper-resistant secure element — they never leave the chip.";

export const CHIP_FEATURES = [
  {
    title: "Certified Secure Element",
    desc: "The same chip technology trusted by banks and governments, engineered with Samsung Semiconductors for tamper-resistant key storage.",
  },
  {
    title: "EAL6+ certified",
    desc: "Independently tested and certified to the highest commercial security standard for hardware wallets.",
  },
  {
    title: "Attack countermeasures",
    desc: "Built-in protections against side-channel attacks, fault injection, and physical tampering attempts.",
  },
  {
    title: "Open source firmware",
    desc: "Transparent, community-audited code — no hidden backdoors. Verify the firmware yourself on GitHub.",
  },
] as const;

export const EVERYTHING = [
  { title: "Stake and earn yield" },
  { title: "Connect to dApps" },
  { title: "Price alerts" },
  { title: "Market insights" },
  { title: "Multi-account support" },
  { title: "Transaction history" },
] as const;

export const ECOSYSTEM_TABS = [
  "Portfolio",
  "Swap",
  "Earn",
  "Buy",
  "Explore",
] as const;

export const FAQS = [
  {
    q: "What is a Sagenex hardware wallet?",
    a: "Sagenex is a cold wallet in the form of a card. It stores your private keys offline on a certified secure chip, so your crypto never touches the internet until you authorize a transaction with a tap.",
  },
  {
    q: "How is Sagenex different from a software wallet?",
    a: "Software wallets keep keys on your phone or computer, which are always connected to the internet. Sagenex keeps keys on a dedicated hardware chip that never exposes them — even if your phone is compromised.",
  },
  {
    q: "Do I need a seed phrase?",
    a: "No. Your private key is generated and stored on the card's secure chip, so there's no seed phrase to manage. You can still generate a traditional recovery phrase if you prefer, but it's optional.",
  },
  {
    q: "Which cryptocurrencies does Sagenex support?",
    a: "Sagenex supports 14,100+ tokens across 90+ blockchain networks including Bitcoin, Ethereum, Solana, and many more.",
  },
  {
    q: "What happens if I lose my card?",
    a: "As long as you created a recovery phrase during setup, you can restore your wallet on a new card. Your funds always live on the blockchain — the card is simply the secure key to access them.",
  },
] as const;
