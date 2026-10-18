import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
// eslint-disable-next-line import/no-unresolved -- SponsorKit uses an exports map.
import { defaultInlineCSS, defineConfig, tierPresets } from "sponsorkit";

export default defineConfig({
  providers: [
    {
      name: "opencollective",
      async fetchSponsors() {
        // Reuse the website's public data and average monthly contributions.
        const supporters = JSON.parse(
          await readFile(
            new URL(
              "./src/components/Support/_supporters.json",
              import.meta.url,
            ),
            "utf8",
          ),
        );

        return supporters
          .filter((supporter) => supporter.monthlyDonations >= 100)
          .map((supporter) => ({
            sponsor: {
              type: "Organization",
              login: supporter.slug,
              name: supporter.name,
              avatarUrl: supporter.avatar,
              linkUrl: `https://opencollective.com/${supporter.slug}`,
            },
            monthlyDollars: supporter.monthlyDonations / 100,
            createdAt: supporter.firstDonation,
          }));
      },
    },
  ],
  outputDir: "./src/assets",
  cacheFile: resolve(".cache/sponsorkit.json"),
  name: "sponsors",
  formats: ["svg"],
  imageFormat: "png",
  width: 800,
  fallbackAvatar: readFile(
    new URL("./src/assets/icon-square-small-slack.png", import.meta.url),
  ),
  svgInlineCSS: `${defaultInlineCSS}
    text { fill: #475569; }
    @media (prefers-color-scheme: dark) {
      text { fill: #cbd5e1; }
    }
  `,
  // Match the monthly ranks in src/components/Support/Support.jsx.
  tiers: [
    {
      title: "Backers",
      preset: tierPresets.base,
    },
    {
      title: "Bronze Sponsors",
      monthlyDollars: 10,
      preset: tierPresets.medium,
    },
    {
      title: "Silver Sponsors",
      monthlyDollars: 100,
      preset: {
        ...tierPresets.large,
        name: { maxLength: 12 },
      },
    },
    {
      title: "Gold Sponsors",
      monthlyDollars: 500,
      preset: tierPresets.xl,
    },
    {
      title: "Platinum Sponsors",
      monthlyDollars: 2500,
      preset: {
        ...tierPresets.xl,
        avatar: { size: 120 },
        boxWidth: 180,
        boxHeight: 160,
      },
    },
  ],
});
