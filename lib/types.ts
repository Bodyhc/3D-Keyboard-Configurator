export interface KeyboardConfig {
  layout: keyof typeof LAYOUTS;
  switches: keyof typeof SWITCH_COLORS;
  keycaps: keyof typeof KEYCAP_MATERIALS;
  backgroundImage: string;
  language: 'en' | 'ar';
  color: keyof typeof KEYBOARD_COLORS;
}
