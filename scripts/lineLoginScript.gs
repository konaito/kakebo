function addUserDataToSheet(userData) {
  const spreadsheetId = scriptProperties.getProperty("SPREADSHEET_ID");
  const sheetName = "accounts";
  const ss = SpreadsheetApp.openById(spreadsheetId);
  const sheet = ss.getSheetByName(sheetName);

  // 既存のuserIdを取得
  const userIds = sheet.getRange(2, 2, sheet.getLastRow()).getValues().flat();

  // userIdが既に登録されているかを確認
  if (userIds.includes(userData.userId)) {
    Logger.log("ユーザーIDは既に登録されています。");
    return { isNewUser: false };
  }

  // 新しいデータ行を追加
  const now = new Date();
  const datetime = Math.floor(now.getTime() / 1000); // 現在のUNIXタイムスタンプ
  const newRow = [
    datetime,
    userData.userId,
    userData.displayName,
    userData.statusMessage,
    userData.pictureUrl,
  ];
  sheet.appendRow(newRow);
  Logger.log("新しいユーザーを追加しました。");

  return { isNewUser: true };
}

function saveUserProfileToSheet(profile) {
  const userData = {
    userId: profile.userId,
    displayName: profile.displayName,
    statusMessage: profile.statusMessage || "",
    pictureUrl: profile.pictureUrl || "",
  };

  return addUserDataToSheet(userData);
}

function getAccessToken(code) {
  const tokenUrl = "https://api.line.me/oauth2/v2.1/token";

  Logger.log("Getting access token...");

  // スクリプトプロパティから値を取得
  const scriptProperties = PropertiesService.getScriptProperties();
  const redirectUri = scriptProperties.getProperty("REDIRECT_URI");
  const channelId = scriptProperties.getProperty("CHANNEL_ID");
  const channelSecret = scriptProperties.getProperty("CHANNEL_SECRET");

  const payload = {
    grant_type: "authorization_code",
    code: code,
    redirect_uri: redirectUri,
    client_id: channelId,
    client_secret: channelSecret,
  };

  const options = {
    method: "post",
    payload: payload,
    muteHttpExceptions: true,
  };

  const response = UrlFetchApp.fetch(tokenUrl, options);
  const parsedResponse = JSON.parse(response.getContentText());

  Logger.log("Access token response: %s", JSON.stringify(parsedResponse));

  return parsedResponse;
}

function getUserProfile(accessToken) {
  const profileUrl = "https://api.line.me/v2/profile";

  Logger.log("Getting user profile...");

  const options = {
    method: "get",
    headers: {
      Authorization: "Bearer " + accessToken,
    },
    muteHttpExceptions: true,
  };

  const response = UrlFetchApp.fetch(profileUrl, options);
  const parsedResponse = JSON.parse(response.getContentText());

  Logger.log("User profile response: %s", JSON.stringify(parsedResponse));

  return parsedResponse;
}

function doGet(e) {
  Logger.log("doGet started...");

  let responseObj = {};

  if (e.parameters.code) {
    const code = e.parameters.code[0];
    const accessTokenResponse = getAccessToken(code);
    if (accessTokenResponse.access_token) {
      const profile = getUserProfile(accessTokenResponse.access_token);

      // スプレッドシートにユーザープロファイルを保存
      const result = saveUserProfileToSheet(profile);

      responseObj = {
        ...profile,
        isNewUser: result.isNewUser,
      };
    } else {
      responseObj = {
        state: -1,
        message: "アクセストークンの取得に失敗しました。",
      };
    }
  } else {
    responseObj = {
      state: -2,
      message: "コードが提供されていません。",
    };
  }

  Logger.log("doGet response: %s", JSON.stringify(responseObj));

  return ContentService.createTextOutput(
    JSON.stringify(responseObj),
  ).setMimeType(ContentService.MimeType.JSON);
}
