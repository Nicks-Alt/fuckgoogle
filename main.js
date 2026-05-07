export default {
  async fetch(request) {
    if (request.method !== "POST") {
      return new Response("Method Not Allowed", {
        status: 405
      });
    }

    try {
      const body = await request.json();

      const webhookUrl = body.webhook;
      const payload = body.payload;

      if (!webhookUrl || !payload) {
        return new Response("Missing webhook or payload", {
          status: 400
        });
      }

      const discordResponse = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "Mozilla/5.0"
        },
        body: JSON.stringify(payload)
      });

      const text = await discordResponse.text();

      return new Response(text, {
        status: discordResponse.status
      });

    } catch (err) {
      return new Response(err.toString(), {
        status: 500
      });
    }
  }
}

// Made by Nick