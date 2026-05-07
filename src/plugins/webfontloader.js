export async function loadFonts () {
  const webFontLoader = await import(/* webpackChunkName: "webfontloader" */'webfontloader')

  webFontLoader.load({
    google: {
      families: [
        'Inter:300,400,500,600,700&display=swap',
        'Roboto:300,400,500,700&display=swap',
      ],
    },
  })
}
