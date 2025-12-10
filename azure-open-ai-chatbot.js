import { useState } from "react";
import OpenAI from "openai";

const endpoint =
  "https://ai-hub57557612348975757251.openai.azure.com/openai/v1";
const deployment_name = "gpt-4o";
const api_key =
  "";

const client = new OpenAI({
  baseURL: endpoint,
  apiKey: api_key,
  dangerouslyAllowBrowser: true,
});

export default function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  async function main(query) {
    setLoading(true);
    const completion = await client.chat.completions.create({
      messages: [
        { role: "developer", content: "You are helpful assistant." },
        {
          role: "user",
          content: query,
        },
      ],
      model: deployment_name,
    });
    setLoading(false);
    setMessages((prev) => [
      ...prev,
      ...[
        { role: "user", content: query },
        {
          role: "assistant",
          content:
            completion.choices[0].message?.content ||
            "Network Issues. Please try again later",
        },
      ],
    ]);
    console.log(completion.choices[0].message?.content);
  }

  //   useEffect(() => {
  //     main("Hi");
  //   }, []);

  return (
    <>
      <div style={{border:'2px solid black'}}>
        <div >
        <h3>RDS CHAT BOT</h3>
        </div>
        <div style={{marginLeft:'5px',marginRight:'5px',border:'1px solid black',padding:'5px',height:'50dvh'}}>
          {messages.map((message) => (
            <div>
              {message.role}-{message.content}
            </div>
          ))}
          {loading && <div>Fetching data from LLM...</div>}
        </div>
        <div style={{padding:'5px'}}>
          <textarea
            onChange={(event) => setQuery(event.target.value)}
            value={query}
          ></textarea>
          <button
            onClick={async () => {
              await main(query);
              setQuery("");
            }}
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
}
