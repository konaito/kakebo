function doGet(e) {
  const spreadsheetId = scriptProperties.getProperty("SPREADSHEET_ID");
  var ss = SpreadsheetApp.openById(spreadsheetId);
  var sheet = ss.getSheetByName("receipts");
  var data = sheet.getDataRange().getValues();

  var idToDelete = e.parameter.id;

  for (var i = 1; i < data.length; i++) {
    if (data[i][0] == idToDelete) {
      sheet.deleteRow(i + 1);
      return ContentService.createTextOutput(
        JSON.stringify({
          status: "success",
          message: "Row deleted successfully",
        }),
      ).setMimeType(ContentService.MimeType.JSON);
    }
  }

  return ContentService.createTextOutput(
    JSON.stringify({ status: "error", message: "ID not found" }),
  ).setMimeType(ContentService.MimeType.JSON);
}

function test() {
  // テスト用のIDを指定してください
  var testId = "6";
  Logger.log(doPost({ parameter: { id: testId } }));
}
