// although slot should be function in Vue 3,
// but it is not in @vue/compat, so we need to check before use
// see https://github.com/uiv-lib/uiv/issues/830
export function renderSlot(slot) {
  return typeof slot === 'function' ? slot() : slot;
}
