function doGet(e) {
  const spreadsheetId = scriptProperties.getProperty("SPREADSHEET_ID");
  var ss = SpreadsheetApp.openById(spreadsheetId);
  var sheet = ss.getSheetByName("receipts");
  var data = sheet.getDataRange().getValues();

  var userId = e.parameter.userId;
  var response = [];

  for (var i = 1; i < data.length; i++) {
    if (data[i][2] === userId) {
      response.push({
        id: data[i][0],
        datetime: data[i][1],
        userId: data[i][2],
        price: data[i][3],
        rate: data[i][4],
        summary: data[i][5],
        date: data[i][6],
      });
    }
  }

  return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(
    ContentService.MimeType.JSON,
  );
}

function test() {
  var e = {
    parameter: {
      userId: "testuserid",
    },
  };
  var result = doGet(e);
  Logger.log(result.getContent());
}
