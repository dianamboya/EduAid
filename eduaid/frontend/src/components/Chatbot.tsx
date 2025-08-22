import { useMemo, useRef, useState, useEffect } from "react";
import { Actor, HttpAgent } from "@dfinity/agent";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const CANISTER_ID = import.meta.env.VITE_CHAT_CANISTER_ID as string;
const host = import.meta.env.VITE_DFX_NETWORK === "ic" ? "https://ic0.app" : "http://127.0.0.1:4943";

// IMPORTANT: pass the factory FUNCTION to Actor.createActor (do NOT invoke it here)
const idlFactory = ({ IDL }: any) => {
  const Message = IDL.Record({ sender: IDL.Variant({ user: IDL.Null, bot: IDL.Null }), text: IDL.Text, at: IDL.Nat64 });
  const Reply = IDL.Record({ reply: IDL.Text, suggestions: IDL.Vec(IDL.Text) });
  return IDL.Service({
    ping: IDL.Func([], [IDL.Text], ["query"]),
    sendWebMessage: IDL.Func([IDL.Text], [Reply], []),
    history: IDL.Func([IDL.Nat], [IDL.Vec(Message)], ["query"]),
  });
};

function createActor() {
  if (!CANISTER_ID) throw new Error("VITE_CHAT_CANISTER_ID is missing");
  const agent = new HttpAgent({ host });
  if (import.meta.env.DEV) agent.fetchRootKey();
  // FIX: pass idlFactory itself, not idlFactory({ IDL })
  return Actor.createActor(idlFactory as any, { agent, canisterId: CANISTER_ID });
}

export default function Chatbot() {
  const actor: any = useMemo(() => createActor(), []);
  const [messages, setMessages] = useState<{ who: "me" | "bot"; text: string }[]>([]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  async function send() {
    const text = input.trim(); if (!text) return;
    setMessages((m) => [...m, { who: "me", text }]);
    setInput("");
    const r = await actor.sendWebMessage(text);
    setMessages((m) => [...m, { who: "bot", text: r.reply }]);
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-blue-50 to-white text-gray-900">
      <section className="py-10 px-6 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">EduAid Chatbot</h1>
        <Card className="p-4 shadow-lg">
          <div className="h-96 overflow-y-auto space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`max-w-[80%] ${m.who === "me" ? "ml-auto text-right" : ""}`}>
                <div className={`inline-block px-3 py-2 rounded-2xl ${m.who === "me" ? "bg-blue-600 text-white" : "bg-blue-100"}`}>{m.text}</div>
              </div>
            ))}
            <div ref={endRef} />
          </div>
          <div className="mt-4 flex gap-2">
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about register, verify, needs, donate..." className="flex-1 border rounded-xl px-3 py-2" />
            <Button onClick={send} className="rounded-2xl bg-blue-600 hover:bg-blue-700">Send</Button>
          </div>
        </Card>
      </section>
    </div>
  );
}
