"use client";

import { Input, Button, ScrollShadow, Avatar } from "@heroui/react";
import { useState, useEffect } from "react";
import io from "socket.io-client";

interface Chat {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
}

interface Message {
  _id?: string;
  sender: "me" | "other";
  text: string;
  username?: string;
  createdAt?: string;
}

const socket = io("http://localhost:4000"); // your backend URL

const chatoverall = "bg-[#040711]";
const chatselected = "#0E1127";
const chatborder = "#151726";

// 🧩 Sidebar Item
function ChatListItem({
  name,
  lastMessage,
  time,
  selected,
  onClick,
}: Chat & { selected?: boolean; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className={`flex justify-between items-center p-3 cursor-pointer transition-colors ${
        selected ? "":""
      }`}
    >
      <div className="flex flex-col">
        <span className="font-semibold">{name}</span>
        <span className="text-sm text-default-500 truncate w-40">
          {lastMessage}
        </span>
      </div>
      <span className="text-xs text-default-400">{time}</span>
    </div>
  );
}

// 🧩 Single message bubble
function ChatMessage({ sender, text }: Message) {
  const isMine = sender === "me";
  return (
    <div className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
      <div
        className={`px-3 py-2 rounded-2xl max-w-[70%] shadow-sm ${
          isMine
            ? "bg-primary text-primary-foreground rounded-br-none"
            : "bg-default-200 text-foreground rounded-bl-none"
        }`}
      >
        {text}
      </div>
    </div>
  );
}

// 🧩 Chat window
function ChatWindow({
  groupName,
  messages,
  onSend,
}: {
  groupName: string;
  messages: Message[];
  onSend: (text: string) => void;
}) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      onSend(input.trim());
      setInput("");
    }
  };

  return (
    <section className={`flex-1 flex flex-col  ${chatoverall}`}>
      <header className={`border-b-2 ${chatborder} py-4 font-semibold flex items-center gap-2`}>
        <Avatar name={groupName} size="sm" />
        {groupName}
      </header>

      <ScrollShadow className="flex-1 px-4 py-3 space-y-3" size={100}>
        {messages.map((m, i) => (
          <ChatMessage key={m._id || i} {...m} />
        ))}
      </ScrollShadow>

      <div className={`p-3 m-4 border rounded-3xl ${chatborder} flex items-center gap-2`}>
        <Input
          fullWidth
          placeholder="Type a message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <Button isIconOnly color="primary" radius="full" onClick={handleSend}>
          ➤
        </Button>
      </div>
    </section>
  );
}

// 🧩 Sidebar
function ChatSidebar({
  groups,
  selectedId,
  setSelectedId,
}: {
  groups: Chat[];
  selectedId: number;
  setSelectedId: (id: number) => void;
}) {
  return (
    <aside className={`-1/4 rounded-b-xs flex flex-col ${chatoverall} border-r-2 border-[ch]`}>
       
      <div className="p-3 border-b-2 border-[ch]">
        <Input
                  variant="bordered"
                  radius="full"
                    className={`${chatoverall}`}
                  placeholder="Search or start new chat"
        />
        </div>

      <ScrollShadow className={`flex-1 ${chatoverall}`}>
        <div className="divide-y">
          {groups.map((g) => (
            <ChatListItem
              key={g.id}
              {...g}
              selected={g.id === selectedId}
              onClick={() => setSelectedId(g.id)}
            />
          ))}
        </div>
      </ScrollShadow>
    </aside>
  );
}

// 🧩 Main Chat App
export default function ChatApp() {
  const groups: Chat[] = [
    { id: 1, name: "General", lastMessage: "Chat started", time: "Now" },
  ];

  const [selectedId, setSelectedId] = useState(1);
  const [messages, setMessages] = useState<Message[]>([]);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");

  // Load saved username from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("username");
    if (stored) setName(stored);
  }, []);

  // Fetch past messages from backend
  useEffect(() => {
    if (!name) return;

    fetch("http://localhost:4000/messages")
      .then((res) => res.json())
      .then((data) => {
        setMessages(
          data.map((msg: any) => ({
            ...msg,
            sender: msg.username === name ? "me" : "other",
          }))
        );
      })
      .catch(console.error);
  }, [name]);

  // Listen for real-time messages
  useEffect(() => {
    if (!name) return;

    const handleMessage = (msg: any) => {
      setMessages((prev) => [
        ...prev,
        { ...msg, sender: msg.username === name ? "me" : "other" },
      ]);
    };

    socket.on("chat message", handleMessage);
    return () => socket.off("chat message", handleMessage);
  }, [name]);

  // Handle sending a message
  const handleSend = (text: string) => {
    if (!name) return;
    socket.emit("chat message", { username: name, text });
  };

  // Handle entering username
  const handleEnter = () => {
    if (username.trim()) {
      setName(username.trim());
      localStorage.setItem("username", username.trim());
    }
  };

  return (
    <main className="h-screen flex bg-background ">
      <ChatSidebar
        groups={groups}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />

      {!name ? (
        <div className="flex flex-col items-center justify-center m-auto gap-2">
          <Input
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="max-w-xs"
          />
          <Button onClick={handleEnter}>Enter Chat</Button>
        </div>
      ) : (
        <ChatWindow
          groupName={groups.find((g) => g.id === selectedId)?.name || ""}
          messages={messages}
          onSend={handleSend}
        />
      )}
    </main>
  );
}
