export default {
  async fetch(request) {
    const url = new URL(request.url);
    // Forward path to Resend (e.g. /emails/batch)
    const target = 'https://api.resend.com' + url.pathname + url.search;

    // Handle Preflight (Browser checks permissions first)
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      });
    }

    // Forward the actual request
    const res = await fetch(target, {
      method: request.method,
      headers: request.headers,
      body: request.body
    });

    // Return response with CORS headers allowed
    const newHeaders = new Headers(res.headers);
    newHeaders.set("Access-Control-Allow-Origin", "*");
    return new Response(res.body, {
      status: res.status,
      headers: newHeaders
    });
  }
}
