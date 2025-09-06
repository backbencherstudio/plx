"use client";
import { useState, useRef, useEffect } from "react";
import { AdminData } from "../../../../lib/admindata";
import { usePathname } from "next/navigation";
import Dot3Icon from "@/public/nominations/icons/Dot3Icon";
import Image from "next/image";
import youImg from "@/public/sender_img.png";
import { formatDistanceToNow } from "date-fns"; // Import date-fns function
import SendIcon from "@/public/commonIcons/SendIcon";

// Type definitions for conversation structure
interface Message {
  message_id: number;
  sender: string;
  timestamp: string;
  message: string;
}

interface Conversation {
  user_id: number;
  customer_name: string;
  customer_image: string;
  isActive: boolean;
  last_seen: string;
  conversation: Message[];
}

const generateRandomMessage = (): string => {
  const randomMessages = [
    "Can you confirm the delivery date?",
    "I have some questions about the payment.",
    "Is there an update on my order?",
    "Do you have any feedback for us?",
    "Let me know if you need any help!",
  ];
  return randomMessages[Math.floor(Math.random() * randomMessages.length)];
};

export default function ChatPage() {
  // Get the list of conversations
  const { conversations } = AdminData;
  const pathname = usePathname();

  // Extract the dynamic user_id from the pathname
  const userId = pathname.split("/").pop(); // Assuming the user_id is at the end of the pathname
  console.log("Extracted userId from pathname:", userId);

  // Ensure the userId is a valid number
  const userIdNumber = userId ? parseInt(userId) : NaN;
  console.log("Parsed userIdNumber:", userIdNumber);

  // Filter the conversation based on the user_id
  const filteredConversation = conversations.filter(
    (conversation: Conversation) => conversation.user_id === userIdNumber
  );

  // Log the filtered conversation to inspect it
  console.log("Filtered Conversation: ", filteredConversation);

  // If there is no matching conversation, set an empty array to avoid errors
  const initialMessages =
    filteredConversation.length > 0 ? filteredConversation[0].conversation : [];
  console.log("Initial messages:", initialMessages);

  // Function to insert random sender message at random positions
  const insertRandomSenderMessages = (messages: Message[]): Message[] => {
    const updatedMessages = [...messages];
    const numberOfRandomMessages = Math.floor(Math.random() * 3) + 1; // Random number between 1 and 3

    for (let i = 0; i < numberOfRandomMessages; i++) {
      const randomMessage = {
        message_id: updatedMessages.length + 1,
        sender: "sender",
        timestamp: new Date().toISOString(),
        message: generateRandomMessage(),
      };

      // Insert the random message at a random position in the array
      const randomIndex = Math.floor(Math.random() * updatedMessages.length);
      updatedMessages.splice(randomIndex, 0, randomMessage);
    }

    return updatedMessages;
  };

  // Set the initial messages state dynamically and insert random messages
  const [messages, setMessages] = useState<Message[]>(
    insertRandomSenderMessages(initialMessages)
  );

  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (newMessage.trim() === "") return;

    setMessages([
      ...messages,
      {
        message_id: messages.length + 1,
        sender: "sender",
        timestamp: new Date().toISOString(),
        message: newMessage,
      },
    ]);
    setNewMessage("");
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div
      className="flex flex-col  bg-white rounded-[12px] scrollbar-hide"
      style={{ height: "calc(100vh - 150px)" }}
    >
      {/* Header - Always visible, never scrolls */}
      <div className=" flex justify-between px-6 pt-5 pb-7 border-b border-[#E9E9EA]">
        <div className=" flex items-center gap-3">
          <img
            src={
              filteredConversation[0]?.customer_image ||
              "https://randomuser.me/api/portraits/women/30.jpg"
            }
            alt="Receiver"
            className="w-[46px] h-[46px] rounded-full mr-3"
          />
          <div>
            <h2 className="text-lg text-[#4A4C56] font-medium">
              {filteredConversation[0]?.customer_name || "Jane Smith"}
            </h2>
            <p className=" text-xs text-[#A5A5AB]">
              Lorem ipsum dolor sit amet
            </p>
          </div>
        </div>
        <button className=" rounded-xl border border-[#E9E9EA]  flex items-center justify-center px-3 cursor-pointer">
          <Dot3Icon />
        </button>
      </div>

      {/* Chat Messages - Only this part scrolls */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4    scrollbar-hide">
        {messages.length > 0 ? (
          messages.map((msg) => (
            <div
              key={msg.message_id}
              className={`flex ${
                msg.sender === "sender" ? "justify-end" : "justify-start"
              }`}
            >
              <div className={`flex gap-3`}>
                <div className={`${msg.sender === "sender" && "order-2"}`}>
                  {msg.sender == "sender" ? (
                    <div className=" rounded-full   bg-[#E7ECF4]  w-10 h-10 flex justify-center items-center">
                      <Image src={youImg} className="" alt="customer img" />
                    </div>
                  ) : (
                    <Image
                      src={filteredConversation[0]?.customer_image}
                      width={40}
                      height={40}
                      className=" rounded-full"
                      alt="customer img"
                    />
                  )}
                </div>

                <div>
                  <div
                    className={` flex items-center gap-4 mb-2${
                      msg.sender === "sender"
                        ? " justify-end"
                        : " justify-start"
                    }`}
                  >
                    <div
                      className={`${msg.sender === "sender" ? "order-2" : ""}`}
                    >
                      {msg.sender == "sender" ? (
                        <p className="  text-sm font-semibold text-[#4A4C56]  ">
                          you
                        </p>
                      ) : (
                        <p className="   text-sm font-semibold text-[#4A4C56]">
                          {filteredConversation[0]?.customer_name ||
                            "Jane Smith"}
                        </p>
                      )}
                    </div>
                    <p className="text-xs  text-[#A5A5AB]">
                      {formatDistanceToNow(new Date(msg.timestamp), {
                        addSuffix: true,
                      })
                        .replace(/^about /, "")
                        .replace(/^less than /, "")}
                    </p>
                  </div>
                  <p
                    className={`max-w-[680px]   p-3  overflow-wrap  break-words   ${
                      msg.sender === "sender"
                        ? "bg-primary text-white rounded-b-[12px] rounded-tl-[12px]"
                        : "bg-[#E7ECF4] text-black  rounded-b-[12px] rounded-tr-[12px]"
                    }`}
                  >
                    {msg.message}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>No messages found.</div>
        )}
        {/* This div acts as a scroll anchor */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Box - Always visible, never scrolls */}
      <div className=" py-5 px-6 flex flex-shrink-0 border-t border-[#E9E9EA]">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
          className="flex-1  py-2 px-3 border border-[#E9E9EA] rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          onClick={handleSend}
          className="ml-2 bg-primary text-white   p-[10px] rounded-[8px] cursor-pointer  hover:bg-blue-700 transition-colors"
        >
         <SendIcon/>
        </button>
      </div>
    </div>
  );
}
