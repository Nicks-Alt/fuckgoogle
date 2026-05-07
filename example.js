function SendDiscordViaRelay(DISCORD_WEBHOOK_URL, payload){
  const url = "gentle-mouse-012a.nicksuperiorservers.workers.dev";
  payload = {
    webhook: DISCORD_WEBHOOK_URL,
    payload: payload
  };

  const options = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload)
  };

  const res = UrlFetchApp.fetch(url, options);
  console.log(res.getContentText());
}