import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { AiOutlineSend } from "react-icons/ai";

const HealthConsultancyChatbot = () => {
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);

  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hi! I'm your health consultant. How can I assist you today?",
    },
  ]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle sending user messages
  const sendMessage = async () => {
    if (!userInput.trim()) return;

    // Add user message to the chat
    const newMessages = [...messages, { role: "user", text: userInput }];
    setMessages(newMessages);
    setUserInput("");
    setLoading(true);

    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        maxTokens: 50, // Limit the response length
        parameters: {
          style: "concise", // Adjust this based on API documentation
          tone: "professional",
        },
        systemInstruction:
          "I am a health consultant AI, and My name is HealthAdvisor AI.",
      });

      const updatedMessagesText = newMessages.map((msg) => msg.text).join(" "); // Join all message texts into a single string

      const chat = model.startChat({
        history: [
          {
            role: "user",
            parts: [{ text: "Hello" }],
          },
          {
            role: "user",
            parts: [{ text: updatedMessagesText }],
          },
          {
            role: "model",
            parts: [
              {
                text: `**HealthAdvisor AI - Professional Health Consultan and give response only health related queries.**

                        Hello! I am **HealthAdvisor AI**, your professional health consultant, and give response only health related queries.I’m here to provide concise and accurate guidance for your health-related concerns. Please note the following principles I follow when assisting you:

                        1. I respond only health related queries.
                        2. I respond concisely and directly to your health concerns, focusing on actionable steps.
                        3. I avoid generic disclaimers unless absolutely necessary, and always aim to be clear.
                        4. I offer a summary of recommendations, including medications, precautions, diagnoses, and treatment options when relevant.
                        5. I maintain a professional, empathetic, and accurate tone in all responses.
                        6. I consider previous queries and responses to maintain context, providing coherent and personalized suggestions.

                        **Example Scenario**:  
                        **User**: "I feel feverish."  
                        **HealthAdvisor AI**: "Take acetaminophen and rest. Stay hydrated."

                        **User**: "What precautions should I take?"  
                        **HealthAdvisor AI**: "Avoid exertion, monitor your temperature, and consult a doctor if it worsens."

                        **Example Query**:  
                        **User**: "I have a fever. Suggest care options."  
                        **HealthAdvisor AI**: "A fever can be managed with rest, hydration, and acetaminophen. If the fever exceeds 103°F or persists, seek medical attention."

                        **Medication & Treatment Guidance**:  
                        I am not a doctor, but I can suggest general over-the-counter options. For example, for fever, you may consider taking paracetamol. However, always consult a healthcare professional for personalized advice.

                        **Example**:  
                        **User**: "I have a fever. Suggest me medication."  
                        **HealthAdvisor AI**: "I recommend over-the-counter paracetamol to reduce fever, along with plenty of fluids. However, please consult a healthcare professional for tailored treatment."

                        My responses are focused on maintaining professionalism and relevance to your queries. I’m here to help you with clear and actionable advice, based on the context of your concerns.`,
              },
            ],
          },
        ],
      });

      let Guidence =
        "'Strictly Instruction : HealthAdvisor AI - Professional Health  Consultan and respond only health related queries.' If necessary, provide a comprehensive response, ensuring it remains concise and avoids excessive length. Otherwise, respond briefly and directly to the point.";

      let result = await chat.sendMessage(
        ` "User Query: ${userInput}"
          ${Guidence}`
      );

      // Add bot response to the chat
      const botResponse =
        result.response.text() ||
        "I'm sorry, I couldn't find any relevant information.";
      setMessages([...newMessages, { role: "bot", text: botResponse }]);
    } catch (error) {
      setMessages([
        ...newMessages,
        {
          role: "bot",
          text: "There was an error fetching the response. Please try again later.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl p-4 flex flex-col space-y-4 ">
      <div className="text-lg font-bold text-center text-[#059AFC] flex items-center">
        <div>
          <img src="/images/chatBot.webp" alt="" className="w-[70px] " />
        </div>
        Virtual Healthcare AI Chatbot
      </div>

      <div className="h-[280px] overflow-y-auto border p-4 rounded-md space-y-3 bg-gray-100">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-3 rounded-lg text-sm max-w-xs ${
                msg.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-black"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="p-3 rounded-lg text-sm max-w-xs bg-gray-300 text-black">
              Typing...
            </div>
          </div>
        )}
      </div>

      <div className="relative w-full">
        <input
          type="text"
          className="w-full p-2 pr-10 border rounded-2xl focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="Type your health query..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 text-white p-2 rounded-md  "
          onClick={sendMessage}
        >
          <AiOutlineSend className="text-[#059AFC] text-[25px] hover:text-[#37749c] " />
        </button>
      </div>
    </div>
  );
};

export default HealthConsultancyChatbot;
