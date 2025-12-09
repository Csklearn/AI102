import "./styles.css";

import OpenAI from "openai";

import { useEffect } from "react";

const endpoint =
  "https://ai-hub57517195654113577198.openai.azure.com/openai/v1";
const deployment_name = "gpt-4o";
const api_key =
  "open_ai_api_key";

const client = new OpenAI({
  baseURL: endpoint,
  apiKey: api_key,
  dangerouslyAllowBrowser: true,
});

export default function App() {
  useEffect(() => {
    async function main() {
      const completion = await client.chat.completions.create({
        messages: [
          { role: "assistant", content: "Helpful AI assistant" },
          {
            role: "user",
            content:
              "Can you help me with recent AI development in software field",
          },
        ],
        model: deployment_name,
      });

      console.log(completion.choices[0].message?.content);
    }

    main();
  });
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
