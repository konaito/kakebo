function doPost(e) {
  const spreadsheetId = scriptProperties.getProperty("SPREADSHEET_ID");
  var sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName("receipts");

  // 既存のIDを取得して最大値を見つける
  var existingIds = sheet
    .getRange(2, 1, sheet.getLastRow() - 1)
    .getValues()
    .flat();
  var maxId = Math.max(...existingIds);

  // 新しいIDを生成
  var newId = maxId + 1;

  var datetime = new Date().getTime();
  var userId = e.parameter.userId;
  var price = e.parameter.price;
  var rate = e.parameter.rate;
  var summary = e.parameter.summary;
  var date = e.parameter.date;

  // 新しいエントリをシートに追加
  sheet.appendRow([newId, datetime, userId, price, rate, summary, date]);

  return ContentService.createTextOutput(
    JSON.stringify({ status: "success" }),
  ).setMimeType(ContentService.MimeType.JSON);
}

function test() {
  var testData = {
    parameter: {
      userId: "testUser123",
      price: "1000",
      rate: "110",
      summary: "Test Summary",
      date: "2023-09-12",
    },
  };

  var result = doPost(testData);
  Logger.log(result.getContent());
}
