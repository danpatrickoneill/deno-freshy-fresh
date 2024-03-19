import { defineConfig, Preset } from "https://esm.sh/@twind/core@1.1.3";
import presetTailwind from "https://esm.sh/@twind/preset-tailwind@1.1.4";
import presetAutoprefix from "https://esm.sh/@twind/preset-autoprefix@1.0.7";
import { colors } from "./constants/styles.ts";
export default {
  ...defineConfig({
    presets: [presetTailwind() as Preset, presetAutoprefix()],
    theme: {
      extend: {
        colors: {
          "primary": colors.conflowerBlue,
          "secondary": colors.vanilla,
          "accent-dark": colors.englishViolet,
          "accent-light": colors.periwinkle,
          "conflowerBlue": "#788BFF",
          "englishViolet": "#49475B",
          "jordyBlue": "#9BB1FF",
          "periwinkle": "#BFD7FF",
          "vanilla": "#E9EB9E",
        },
      },
    },
  }),
  selfURL: import.meta.url,
};
