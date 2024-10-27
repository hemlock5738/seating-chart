export function doGet() {
  return HtmlService.createHtmlOutputFromFile("client/index.html").addMetaTag(
    "viewport",
    "width=device-width, initial-scale=1",
  );
}
