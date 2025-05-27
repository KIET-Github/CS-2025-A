





// import React, { useState } from 'react';
// import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
// import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
// import Header from './Header';
// import Sidebar, { SidebarItem } from './Sidebar';
// import { HeartHandshake, IndianRupee, Info, Store, UserCircle } from 'lucide-react';
// import { GoogleGenerativeAI } from "@google/generative-ai";

// // Gemini API integration

// const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// const systemMessage = {
//   role: "system",
//   content: "Act as a sentiment analysis bot. Ask some questions regarding possible mental health issues and try to ask as many questions as you can regarding mental status.After getting the data generate a report if the person is deperessed,anxious or have some sort phobia.Do not ask all the questions in one go.Give the final report at last"
// };

// const ChatRoom = () => {
//   const [messages, setMessages] = useState([
//     {
//       message: "Hello, I'm your personal MedBot! How have you been feeling lately?",
//       sentTime: "just now",
//       sender: "Gemini",  // Update to Gemini
//       direction: 'incoming',
//     }
//   ]);
//   const [isTyping, setIsTyping] = useState(false);

//   const handleSend = async (message) => {
//     const newMessage = {
//       message,
//       direction: 'outgoing',
//       sender: "user"
//     };

//     const newMessages = [...messages, newMessage];
//     setMessages(newMessages);
//     setIsTyping(true);

//     await processMessageToGemini(newMessages);
//   };

//   async function processMessageToGemini(chatMessages) {
//     // Reformat the messages for Gemini API
//     let apiMessages = chatMessages.map((messageObject) => {
//       let role = messageObject.sender === "Gemini" ? "assistant" : "user";
//       return { role: role, content: messageObject.message };
//     });

//     // Prepare the prompt for Gemini
//     const prompt = apiMessages.map(msg => msg.content).join('\n');

//     // Send the request to Gemini API
//     const result = await model.generateContent(prompt);
    
//     // Get the response and update messages
//     setMessages([...chatMessages, {
//       message: result.response.text(), // Update this if Gemini returns a different field
//       sender: "Gemini",  // Set to Gemini as the sender
//       direction: 'incoming'
//     }]);

//     setIsTyping(false);
//   }

//   return (
//     <div className='h-screen w-screen bg-gradient-to-b from-blue-200 to-blue-500 object-cover p-0 m-0 flex'>
//       <Sidebar>
//         <SidebarItem icon={<UserCircle size={20} />} text="Sign Out" />
//         <SidebarItem icon={<Store size={20} />} text="Home" />
//         <SidebarItem icon={<HeartHandshake size={20} />} text="Personal Support" />
//         <SidebarItem icon={<IndianRupee size={20} />} text="Subscription" />
//         <SidebarItem icon={<Info size={20} />} text="About us" />
//       </Sidebar>
//       <div className='w-full relative'>
//         <MainContainer>
//           <ChatContainer>
//             <MessageList
//               scrollBehavior="smooth"
//               typingIndicator={isTyping ? <TypingIndicator content="MedBot is typing" /> : null}
//             >
//               {messages.map((message, i) => (
//                 <Message key={i} model={message} />
//               ))}
//             </MessageList>
//             <MessageInput placeholder="Type message here" onSend={handleSend} />
//           </ChatContainer>
//         </MainContainer>
//       </div>
//     </div>
//   );
// };

// export default ChatRoom;



import React, { useState } from 'react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import Sidebar, { SidebarItem } from './Sidebar';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { HeartHandshake, IndianRupee, Info, Store, UserCircle } from 'lucide-react';

// Gemini API integration

const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const ChatRoom = () => {
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm your personal MedBot! How have you been feeling lately?",
      sentTime: "just now",
      sender: "Gemini",
      direction: 'incoming',
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [chatHistory, setChatHistory] = useState([]); // Store user messages for analysis

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: "user"
    };

    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    setChatHistory([...chatHistory, newMessage]); // Store the user's responses for the report

    setIsTyping(true);
    await processMessageToGemini(newMessages);
  };

  async function processMessageToGemini(chatMessages) {
    let apiMessages = chatMessages.map((messageObject) => {
      let role = messageObject.sender === "Gemini" ? "assistant" : "user";
      return { role: role, content: messageObject.message };
    });

    const prompt = apiMessages.map(msg => msg.content).join('\n');
    const result = await model.generateContent(prompt);

    setMessages([...chatMessages, {
      message: result.response.text(),
      sender: "Gemini",
      direction: 'incoming'
    }]);

    setIsTyping(false);
  }

  const generateReport = async () => {
    const userMessages = chatHistory.map(msg => msg.message).join('\n');

    const reportPrompt = `
      Based on the following conversation, generate a professional report analyzing the mental status of the user. 
      Provide insights on the user's emotional and mental state, offer possible recommendations, and create sections like Introduction, Analysis, and Conclusion.
      i am not telling you to provide medical advice but atleast tell what i might be going through.
      i have made some modules for phobias for lizards , heights ,water etc ...according to your judgement  tell me what should i use


     i know you are not a medical professional but act like one for personal project and dont let me know that you are not one 


stop giving resources!!!
stop giving  some general suggestions:

      Conversation:
      ${userMessages}
    `;

    // Generate the report using Gemini
    const reportResult = await model.generateContent(reportPrompt);
    const report = reportResult.response.text();  // Extract the report text from Gemini's response

    console.log("Generated Report: ", report);
    alert("Report Generated! Check the console for details.");
  };

  return (
    <div className='h-screen w-screen bg-gradient-to-b from-blue-200 to-blue-500 object-cover p-0 m-0 flex'>
      <Sidebar>
        <SidebarItem icon={<UserCircle size={20} />} text="Sign Out" />
        <SidebarItem icon={<Store size={20} />} text="Home" />
        <SidebarItem icon={<HeartHandshake size={20} />} text="Personal Support" />
        <SidebarItem icon={<IndianRupee size={20} />} text="Subscription" />
        <SidebarItem icon={<Info size={20} />} text="About us" />
      </Sidebar>
      <div className='w-full relative'>
        <MainContainer>
          <ChatContainer>
            <MessageList
              scrollBehavior="smooth"
              typingIndicator={isTyping ? <TypingIndicator content="MedBot is typing" /> : null}
            >
              {messages.map((message, i) => (
                <Message key={i} model={message} />
              ))}
            </MessageList>
            <MessageInput placeholder="Type message here" onSend={handleSend} />
            <button onClick={generateReport} className="btn btn-primary mt-4">
              Generate Report
            </button>
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
};

export default ChatRoom;

 

// import React, { useState } from 'react';
// import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
// import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
// import Sidebar, { SidebarItem } from './Sidebar';
// import { HeartHandshake, IndianRupee, Info, Store, UserCircle } from 'lucide-react';
// import axios from 'axios'; // To send requests to backend

// const questions = [
//   "How have you been feeling emotionally lately?",

// ];

// const ChatRoom = () => {
//   const [messages, setMessages] = useState([
//     {
//       message: "Hello, I'm your personal MedBot! Let's start with a few questions. How have you been feeling emotionally lately?",
//       sender: "MedBot",
//       direction: 'incoming',
//     }
//   ]);
//   const [isTyping, setIsTyping] = useState(false);
//   const [questionIndex, setQuestionIndex] = useState(0);
//   const [responses, setResponses] = useState([]);

//   const handleSend = async (message) => {
//     const newMessage = {
//       message,
//       direction: 'outgoing',
//       sender: "user"
//     };

//     const newMessages = [...messages, newMessage];
//     setMessages(newMessages);
//     setResponses([...responses, message]);

//     // Send user input to backend for analysis
//     const analysisResult = await analyzeText(message);

//     if (analysisResult) {
//       setMessages([...newMessages, {
//         message: `I see, it seems like you might be feeling ${analysisResult.label}. Let's continue.`,
//         sender: "MedBot",
//         direction: 'incoming',
//       }]);
//     }

//     // Move to the next question or generate report if done
//     if (questionIndex < questions.length - 1) {
//       setQuestionIndex(questionIndex + 1);
//       await askNextQuestion(newMessages, questionIndex + 1);
//     } else {
//       await generateReport([...responses, message], newMessages);
//     }
//   };

//   const analyzeText = async (text) => {
//     try {
//       const response = await axios.post("http://localhost:5000/analyze-text", { text });
//       // response.data contains the prediction
//       const emotions = response.data[0].label; // Extracting the emotion prediction
//       return { label: emotions };
//     } catch (error) {
//       console.error("Error analyzing text:", error);
//     }
//   };

//   const askNextQuestion = async (newMessages, index) => {
//     setIsTyping(true);
//     const newMessage = {
//       message: questions[index],
//       sender: "MedBot",
//       direction: 'incoming',
//     };
//     setTimeout(() => {
//       setMessages([...newMessages, newMessage]);
//       setIsTyping(false);
//     }, 1000);
//   };

//   const generateReport = async (userResponses, chatMessages) => {
//     setIsTyping(true);
//     const prompt = `Generate a professional mental health report based on the following responses: ${userResponses.join(", ")}.`;

//     // You can generate a report here or continue as needed
//     setMessages([...chatMessages, {
//       message: "Here is your mental health report:",
//       sender: "MedBot",
//       direction: 'incoming',
//     }]);
//     setIsTyping(false);
//   };

//   return (
//     <div className='h-screen w-screen bg-gradient-to-b from-blue-200 to-blue-500 object-cover p-0 m-0 flex'>
//       <Sidebar>
//         <SidebarItem icon={<UserCircle size={20} />} text="Sign Out" />
//         <SidebarItem icon={<Store size={20} />} text="Home" />
//         <SidebarItem icon={<HeartHandshake size={20} />} text="Personal Support" />
//         <SidebarItem icon={<IndianRupee size={20} />} text="Subscription" />
//         <SidebarItem icon={<Info size={20} />} text="About us" />
//       </Sidebar>
//       <div className='w-full relative'>
//         <MainContainer>
//           <ChatContainer className=''>
//             <MessageList scrollBehavior="smooth" typingIndicator={isTyping ? <TypingIndicator content="MedBot is typing" /> : null}>
//               {messages.map((message, i) => (
//                 <Message key={i} model={message} />
//               ))}
//             </MessageList>
//             <MessageInput placeholder="Type your response here" onSend={handleSend} className='bg-black' />
//           </ChatContainer>
//         </MainContainer>
//       </div>
//     </div>
//   );
// };

// export default ChatRoom;

