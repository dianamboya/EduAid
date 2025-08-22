export interface Env { TWILIO_ACCOUNT_SID: string; TWILIO_AUTH_TOKEN: string; TWILIO_FROM: string }
export default { async fetch(req: Request, env: Env) {
if (req.method !== "POST") return new Response("Method Not Allowed", { status: 405 });
const { to, body, from } = await req.json();
const url = `https://api.twilio.com/2010-04-01/Accounts/${env.TWILIO_ACCOUNT_SID}/Messages.json`;
const form = new URLSearchParams();
form.set("To", String(to).startsWith("whatsapp:") ? to : `whatsapp:${to}`);
form.set("From", String(from || env.TWILIO_FROM).startsWith("whatsapp:") ? (from || env.TWILIO_FROM) : `whatsapp:${from || env.TWILIO_FROM}`);
form.set("Body", body);
const basic = btoa(`${env.TWILIO_ACCOUNT_SID}:${env.TWILIO_AUTH_TOKEN}`);
const res = await fetch(url, { method: "POST", headers: { Authorization: `Basic ${basic}`, "Content-Type": "application/x-www-form-urlencoded" }, body: form.toString() });
return new Response(await res.text(), { status: res.status, headers: { "Content-Type": "application/json" } });
}};