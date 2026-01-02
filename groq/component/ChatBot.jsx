import { useState } from "react";
import { marked } from "marked";
import { getLLMResponse } from "./utils/getLLMResponse";


export default function ChatBot() {
    const [messages, setMessages] = useState([]);
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    async function main(query) {
        setLoading(true);
        const completion = await getLLMResponse(query);
        setLoading(false);
        setMessages((prev) => [
            ...prev,
            ...[
                { role: "user", content: query },
                {
                    role: "assistant",
                    content:
                        completion ||
                        "Network Issues. Please try again later",
                },
            ],
        ]);
        console.log(completion);
    }


    return (
        <>
            <div className="w-[800px] border-2 flex flex-col">
                <div>
                    <h3>RDS CHAT BOT</h3>
                </div>

                <div className="mx-1 border border-black p-1 h-[50dvh] overflow-auto flex flex-col gap-4">
                    {messages.map((message, idx) => (
                        <div
                            key={idx}
                            dangerouslySetInnerHTML={{
                                __html: marked.parse(message.content, { async: false }),
                            }}
                            className={
                                message.role === "user"
                                    ? "bg-blue-200 px-3 py-1 min-w-[100px] rounded-sm self-end text-left"
                                    : "bg-gray-200 px-3 py-1 min-w-[100px] rounded-sm self-start text-left"
                            }
                        ></div>
                    ))}
                    {loading && (
                        <div className="flex items-center gap-2 self-start" aria-live="polite" aria-label="Loading">
                            <span className="w-2 h-2 bg-slate-600 rounded-full animate-pulse" style={{ animationDelay: '0s' }}></span>
                            <span className="w-2 h-2 bg-slate-600 rounded-full animate-pulse" style={{ animationDelay: '0.15s' }}></span>
                            <span className="w-2 h-2 bg-slate-600 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></span>
                        </div>
                    )}
                </div>

                <div className="p-1 flex flex-col gap-2">
                    <textarea
                        className="w-full h-24 border rounded p-2"
                        onChange={(event) => setQuery(event.target.value)}
                        value={query}
                    ></textarea>
                    <button
                        onClick={async () => {
                            await main(query);
                            setQuery("");
                        }}
                        className="ml-auto text-lg px-3 py-1 bg-slate-100 rounded"
                    >
                        Send
                    </button>
                </div>
            </div>
        </>
    );
}
