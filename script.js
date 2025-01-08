import ollama from "ollama";
import fs from "fs";
import path from "path";


const questionsDir = "./questions1";
const answersDir = "./answers2";

if (!fs.existsSync(answersDir)) {
  fs.mkdirSync(answersDir);
}

const category = process.argv[2]; 
if (!category) {
  console.error("Please specify a category (e.g., Academic, Professional, Creative).");
  process.exit(1);
}


const categoryPath = path.join(questionsDir, category);
if (!fs.existsSync(categoryPath)) {
  console.error(`Category "${category}" does not exist.`);
  process.exit(1);
}

const files = fs.readdirSync(categoryPath).filter(file => path.extname(file) === ".txt");
if (files.length === 0) {
  console.error(`No questions found in category "${category}".`);
  process.exit(1);
}


const randomFile = files[Math.floor(Math.random() * files.length)];
const questionPath = path.join(categoryPath, randomFile);

(async function processQuestion() {
  try {

    const question = fs.readFileSync(questionPath, "utf-8");

    console.log(`Selected question: ${randomFile}`);
    console.log(`Question content: ${question}`);


    const response = await ollama.chat({
      model: "llama3.2:1b",
      messages: [{ role: "user", content: question }]
    });

  
    const answer = response?.message?.content || "No answer received";

  
    const outputFileName = `a${path.basename(randomFile, ".txt")}.txt`;
    const outputPath = path.join(answersDir, outputFileName);
    fs.writeFileSync(outputPath, answer);

    console.log(`Answer saved to: ${outputPath}`);
  } catch (error) {
    console.error("Error processing the question:", error.message);
  }
})();
