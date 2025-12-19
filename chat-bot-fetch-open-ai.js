import { useState } from "react";
//import OpenAI from "openai";
//import { data } from "./data";
import { marked } from "marked";
//import Markdown from "react-markdown";
// const endpoint =
//   "https://ai-hub57557612348975757251.openai.azure.com/openai/v1";
// const deployment_name = "gpt-4o";
// const api_key = "";

// const client = new OpenAI({
//   baseURL: endpoint,
//   apiKey: api_key,
//   dangerouslyAllowBrowser: true,
// });

export default function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  async function main(query) {
    setLoading(true);
    const response = await fetch(
      "https://project57848941-resource.openai.azure.com/openai/v1/chat/completions",
      {
        method: "POST",
        body: JSON.stringify({
          messages: [
            { role: "assistant", content: "You are helpful assistant." },
            {
              role: "user",
              content: query,
            },
          ],
          model: "gpt-4o",
        }),
        headers: {
          Authorization:
            "Bearer api-key",
          "Content-Type": "application/json",
        },
      }
    );
    // const completion = await client.chat.completions.create({
    //   messages: [
    //     { role: "assistant", content: "You are helpful assistant." },
    //     {
    //       role: "user",
    //       content: query,
    //     },
    //   ],
    //   model: deployment_name,
    // });
    const completion = await response.json();
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
    //  console.log(completion.choices[0].message?.content);
  }

  //   useEffect(() => {
  //     main("Hi");
  //   }, []);

  return (
    <>
      <div
        style={{
          border: "2px solid black",
          display: "flex",
          flexDirection: "column",
          rowGap: "0.5rem",
        }}
      >
        <div>
          <h3>RDS CHAT BOT</h3>
        </div>
        <div
          style={{
            marginLeft: "5px",
            marginRight: "5px",
            border: "1px solid black",
            padding: "5px",
            height: "50dvh",
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          {messages.map((message) => (
            <div
              dangerouslySetInnerHTML={{
                __html: marked.parse(message.content, { async: false }),
              }}
              style={{
                backgroundColor:
                  message.role === "user" ? "lightblue" : "lightgray",
                textAlign: "left",
                justifyContent:
                  message.role === "user" ? "flex-end" : "flext-start",
                paddingLeft: "10px",
                paddingRight: "10px",
                minWidth: "100px",
                marginLeft: message.role === "user" && "auto",
                marginRight: message.role === "assistant" && "auto",
                borderRadius: "0.25rem",
              }}
            ></div>
            // <div>
            //   <Markdown>{message.content}</Markdown>
            // </div>
          ))}
          {loading && <div>Fetching data from LLM...</div>}
        </div>
        <div
          style={{
            padding: "5px",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          <textarea
            onChange={(event) => setQuery(event.target.value)}
            value={query}
          ></textarea>
          <button
            onClick={async () => {
              await main(query);
              setQuery("");
            }}
            style={{ marginLeft: "auto", fontSize: "18px", padding: "5px" }}
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
}
