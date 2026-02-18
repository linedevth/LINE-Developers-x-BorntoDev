const LINE_API = "https://api.line.me";

class LINE {
  async verifyLiffAccessToken(liffAccessToken) {
    const url = `${LINE_API}/oauth2/v2.1/verify?access_token=${liffAccessToken}`;
    const response = await fetch(url, { method: "GET" });
    const data = await response.json();
    return data.client_id;
  }

  async issueChannelAccessToken(channelId, channelSecret) {
    const params = new URLSearchParams({
      grant_type: "client_credentials",
      client_id: channelId,
      client_secret: channelSecret
    });
    const url = `${LINE_API}/oauth2/v3/token?${params.toString()}`;
    const response = await fetch(url, {
      method: "POST",
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    const data = await response.json();
    return data.access_token;
  }

  async issueServiceNotiToken(headers, liffAccessToken) {
    const url = `${LINE_API}/message/v3/notifier/token`;
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({ liffAccessToken })
    });
    const data = await response.json();
    return data.notificationToken;
  }

  async sendServiceMessage(headers, notificationToken) {
    const payload = {
      templateName: "couponnoti_s_c_th",
      params: { btn1_url: "https://linedevth.line.me" },
      notificationToken
    };
    const url = `${LINE_API}/message/v3/notifier/send?target=service`;
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(payload)
    });
    return await response.json();
  }
}

module.exports = new LINE();