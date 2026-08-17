import type { PlatformLink } from "@/lib/types";

// Verified official store destinations. Keep these separate from general product URLs.
export const platformLinkOverrides: Partial<Record<string, PlatformLink[]>> = {
  capcut: [
    { platform: "ios", url: "https://apps.apple.com/us/app/capcut-photo-video-editor/id1500855883", name: "App Store", nameEn: "App Store" },
    { platform: "android", url: "https://play.google.com/store/apps/details?id=com.lemon.lvoverseas", name: "Google Play", nameEn: "Google Play" },
  ],
  shazam: [
    { platform: "ios", url: "https://apps.apple.com/us/app/shazam-find-music-concerts/id284993459", name: "App Store", nameEn: "App Store" },
    { platform: "android", url: "https://play.google.com/store/apps/details?id=com.shazam.android", name: "Google Play", nameEn: "Google Play" },
  ],
  "character-ai": [
    { platform: "ios", url: "https://apps.apple.com/us/app/character-ai-chat-talk-text/id1671705818", name: "App Store", nameEn: "App Store" },
    { platform: "android", url: "https://play.google.com/store/apps/details?id=ai.character.app", name: "Google Play", nameEn: "Google Play" },
  ],
  grammarly: [
    { platform: "ios", url: "https://apps.apple.com/us/app/grammarly-ai-writing-keyboard/id1158877342", name: "App Store", nameEn: "App Store" },
    { platform: "android", url: "https://play.google.com/store/apps/details?id=com.grammarly.android.keyboard", name: "Google Play", nameEn: "Google Play" },
  ],
  deepl: [
    { platform: "ios", url: "https://apps.apple.com/us/app/deepl-translate/id1552407475", name: "App Store", nameEn: "App Store" },
    { platform: "android", url: "https://play.google.com/store/apps/details?id=com.deepl.mobiletranslator", name: "Google Play", nameEn: "Google Play" },
  ],
  quizlet: [
    { platform: "ios", url: "https://apps.apple.com/us/app/quizlet-more-than-flashcards/id546473125", name: "App Store", nameEn: "App Store" },
    { platform: "android", url: "https://play.google.com/store/apps/details?id=com.quizlet.quizletandroid", name: "Google Play", nameEn: "Google Play" },
  ],
  "elsa-speak": [
    { platform: "ios", url: "https://apps.apple.com/us/app/elsa-speak-english-learning/id1083804886", name: "App Store", nameEn: "App Store" },
    { platform: "android", url: "https://play.google.com/store/apps/details?id=us.nobarriers.elsa", name: "Google Play", nameEn: "Google Play" },
  ],
  faceapp: [
    { platform: "ios", url: "https://apps.apple.com/us/app/faceapp-perfect-face-editor/id1180884341", name: "App Store", nameEn: "App Store" },
    { platform: "android", url: "https://play.google.com/store/apps/details?id=io.faceapp", name: "Google Play", nameEn: "Google Play" },
  ],
  quillbot: [
    { platform: "extension", url: "https://chromewebstore.google.com/detail/quillbot-ai-writing-assis/iidnbdjijdkbmajdffnidomddglmieko", name: "Chrome 网上应用店", nameEn: "Chrome Web Store" },
  ],
  monica: [
    { platform: "extension", url: "https://chromewebstore.google.com/detail/monica-all-in-one-ai-assi/ofpnmcalabcbjgholdjcjblkibolbppb", name: "Chrome 网上应用店", nameEn: "Chrome Web Store" },
  ],
  immersive: [
    { platform: "extension", url: "https://chromewebstore.google.com/detail/immersive-translate-ai-we/bpoadfkcbjbfhfodiogcnhhhpibjhbnh", name: "Chrome 网上应用店", nameEn: "Chrome Web Store" },
  ],
  sider: [
    { platform: "extension", url: "https://chromewebstore.google.com/detail/sider-chat-with-all-ai-gp/difoiogjjojoaoomphldepapgpbgkhkb", name: "Chrome 网上应用店", nameEn: "Chrome Web Store" },
  ],
  aiprm: [
    { platform: "extension", url: "https://chromewebstore.google.com/detail/aiprm-for-chatgpt/ojnbohmppadfgpejeebfnmnknjdlckgj", name: "Chrome 网上应用店", nameEn: "Chrome Web Store" },
  ],
  languagetool: [
    { platform: "extension", url: "https://chromewebstore.google.com/detail/ai-grammar-checker-paraph/oldceeleldhonbafppcapldpdifcinji", name: "Chrome 网上应用店", nameEn: "Chrome Web Store" },
  ],
};
