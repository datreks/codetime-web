export default function ({ isHMR, app, store, route, params, _, redirect }) {
  const defaultLocale = app.i18n.fallbackLocale;
  // If middleware is called from hot module replacement, ignore it
  if (isHMR) {
    return;
  }
  // Get locale from params
  const locale = params.lang;
  if (route.fullPath === "/") {
    store.commit("lang/SET_LANG", defaultLocale);
    app.i18n.locale = locale;
    return redirect(`/${defaultLocale}${route.fullPath}`);
  } else {
    // Set locale
    store.commit("lang/SET_LANG", locale);
    app.i18n.locale = locale;
  }
}
