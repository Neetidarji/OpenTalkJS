import ollama from "ollama";
import fs from "fs";
import path from "path";

const inputFolder = "./questions";
const outputFolder = "./answers";

if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder);
}

const files = fs.readdirSync(inputFolder).filter(file => path.extname(file) === ".txt");

Questions();

async function Questions() {
  for (const file of files) {
    try {
      const question = fs.readFileSync(path.join(inputFolder, file), "utf-8");

      const response = await ollama.chat({
        model: "llama3.2:1b",
        messages: [{ role: "user", content: question }]
      });

      const answer = response?.message?.content || "No answer received";

      const outputFile = path.join(outputFolder, file);
      fs.writeFileSync(outputFile, answer);

      console.log(`Answer saved to ${outputFile}`);
    } catch (error) {
      console.error(`Error processing ${file}:`, error.message);
    }
  }
}
