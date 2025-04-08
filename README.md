# Wizybot Chat API

This is a fullstack technical assessment developed using **NestJS (TypeScript)** for the backend. It provides a chatbot API powered by **OpenAI's Chat Completion API** with support for two custom tools:

- `searchProducts(query: string)`: Returns two relevant products based on a user query, using data from a CSV file.
- `convertCurrencies(amount: number, from: string, to: string)`: Converts an amount between currencies using the **Open Exchange Rates API**.

## Tech Stack

- NestJS + TypeScript
- OpenAI Chat Completion API (Function Calling)
- Swagger for API documentation
- CSV parsing with `csv-parser`
- Open Exchange Rates API
- Dotenv for environment configuration

---

## 🚀 How to Run the Project

### 1. Clone the repository

```bash
git clone https://github.com/NelsonOrtiz94/wizybot-chat-api.git
cd wizybot-chat-api
```

### 2. Clone the repository

```bash
npm install
```

### 3. Create a .env file in the root directory

```bash
OPENAI_API_KEY=your-openai-api-key
EXCHANGE_RATES_API_KEY=your-open-exchange-rates-api-key
```
You can get your OpenAI API key from: https://platform.openai.com/account/api-keys
You can register for a free Open Exchange Rates account here: https://openexchangerates.org/signup

### 4. Place the products CSV

Ensure the file `products_list.csv` is located in the root directory of the project (same level as package.json).

### 5. Start the development server

```bash
npm run start:dev
```

The API will be available at:
http://localhost:3000

Swagger documentation:
http://localhost:3000/api

### 6. TEST

✅ POST /chat
Description: Sends a user message to the chatbot.
Request body:

```bash
{
  "message": "I am looking for a phone"
}
```

Response:

```bash
{
  "response": "Here are two phones that might interest you..."
}
```

✅ GET /chat/test-env
Returns confirmation that the OpenAI API key was loaded properly.


## Project Structure

```bash
src/
├── chatbot/
│   ├── chatbot.controller.ts   # Handles routes
│   ├── chatbot.service.ts      # Chat logic with OpenAI
│   └── dto/
│       └── chat.dto.ts         # DTO with validation and Swagger doc
│
├── tools/
│   ├── product-search.service.ts     # Handles product searching from CSV
│   └── currency-converter.service.ts # Handles currency conversion
│
├── utils/
│   └── csv-loader.ts           # CSV reading utility
```
