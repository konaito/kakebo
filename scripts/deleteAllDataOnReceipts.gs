function doGet(e) {
  const spreadsheetId = scriptProperties.getProperty("SPREADSHEET_ID");
  var ss = SpreadsheetApp.openById(spreadsheetId);
  var sheet = ss.getSheetByName("receipts");
  var data = sheet.getDataRange().getValues();

  var userIdToDelete = e.parameter.userId;
  var deleted = false;

  // ループを逆順にする
  for (var i = data.length - 1; i >= 1; i--) {
    if (data[i][2] == userIdToDelete) {
      sheet.deleteRow(i + 1);
      deleted = true;
    }
  }

  if (deleted) {
    return ContentService.createTextOutput(
      JSON.stringify({
        status: "success",
        message: "Rows with userId deleted successfully",
      }),
    ).setMimeType(ContentService.MimeType.JSON);
  } else {
    return ContentService.createTextOutput(
      JSON.stringify({ status: "error", message: "userId not found" }),
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function test() {
  // テスト用のuserIdを指定してください
  var testUserId = "testuserid";
  Logger.log(doGet({ parameter: { userId: testUserId } }));
}
