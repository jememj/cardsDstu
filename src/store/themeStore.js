export default function themeStore(store) {
  store.on('@init', () => ({ theme: 'light' }));

  store.on('theme/switch', ({}, { theme }) => ({
    theme,
  }));
}
