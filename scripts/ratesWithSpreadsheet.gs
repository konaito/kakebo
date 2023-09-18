function fetchUSDJPYRate() {
  const apiKey = PropertiesService.getScriptProperties().getProperty(
    "EXCHANGERATES_APIKEY",
  );
  const endpoint = `http://api.exchangeratesapi.io/v1/latest?access_key=${apiKey}&symbols=USD,JPY`;

  try {
    const response = UrlFetchApp.fetch(endpoint);
    const data = JSON.parse(response.getContentText());

    // USDに対するJPYのレートを取得
    const JpyPerUsd = data.rates.JPY / data.rates.USD;
    return JpyPerUsd;
  } catch (error) {
    Logger.log("エラーが発生しました: " + error.toString());
    return null;
  }
}

function registerExchangeRate() {
  const spreadsheetId = scriptProperties.getProperty("SPREADSHEET_ID");
  const sheetName = "rates";
  const sheet =
    SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);

  const now = new Date();
  const eightHoursAgo = new Date(now.getTime() - 8 * 3600 * 1000); // 8時間前の時刻を取得

  // 最後の日付とレートをUNIX時間で取得
  const lastRow = sheet.getLastRow();
  const lastDatetimeUnix = sheet.getRange(lastRow, 1).getValue();
  const lastRate = sheet.getRange(lastRow, 2).getValue();

  // 現在の時間をUNIX時間で取得
  const nowUnix = Math.floor(now.getTime() / 1000);

  if (lastDatetimeUnix && nowUnix - lastDatetimeUnix < 8 * 3600) {
    // 8時間以内にデータが登録されている場合
    Logger.log("8時間以内にデータが登録されています。");
    return { datetime: lastDatetimeUnix, jpyusd: lastRate };
  }

  const usdToJpyRate = fetchUSDJPYRate();
  if (usdToJpyRate) {
    // 新しいデータをシートに追加
    sheet.appendRow([nowUnix, usdToJpyRate]);
    Logger.log("新しいデータを登録しました: " + nowUnix + " - " + usdToJpyRate);
    return { datetime: nowUnix, jpyusd: usdToJpyRate };
  } else {
    return null;
  }
}

function doGet(e) {
  const result = registerExchangeRate();

  let output;
  let status;

  if (result) {
    status = 200;
    output = {
      status: status,
      data: result,
    };
  } else {
    status = 400;
    output = {
      status: status,
      message: "Failed to fetch or register the exchange rate",
    };
  }

  return ContentService.createTextOutput(JSON.stringify(output)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
