import fs from "fs"
import ollama from "ollama"
async function runChat() {
  try {
    const inputFilePath = "q.txt"
    const inputContent = fs.readFileSync(inputFilePath, "utf-8")
    const response = await ollama.chat({
      model: "llama3.2:1b",
      messages: [{ role: "user", content: inputContent }]
    })
    const chatbotResponse = response.message.content
    const outputFilePath = "a.txt"
    fs.writeFileSync(outputFilePath, chatbotResponse, "utf-8")
    console.log("your response has been saved to output file(a.txt).")
  } catch (error) {
    console.error("Error occurred:", error.message)
  }
}
runChat()












// import ollama from "ollama";

// async function runChat() {
//   try {
//     const response = await ollama.chat({
//       model: "llama3.2:1b",
//       messages: [{ role: 'user', content: "  Generate marketing emails" }]
//     });

//     console.log("Chatbot Response:", response.message.content);
//   } catch (error) {
//     console.error("Error occurred:", error.message);
//   }
// }

// runChat();
