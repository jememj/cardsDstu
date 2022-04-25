export default function accountStore(store) {
  store.on('@init', () => ({ account: { slug: '' } }));

  store.on('account/setSlug', ({ account }, { slug }) => ({
    account: { ...account, slug },
  }));
}
