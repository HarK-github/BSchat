"use client";

import { Input, Button, ScrollShadow, Avatar, Spinner } from "@heroui/react";
import { useState, useEffect, useRef } from "react";
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

const socket = io("http://localhost:4000"); // Backend

const chatBg = "bg-[#0b0214]";
const chatBorder = "border-[#3a0ca3]";
const chatAccent = "black";

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
      className={`p-3 cursor-pointer transition-all rounded-xl ${
        selected
          ? "bg-gradient-to-r from-purple-600/40 to-pink-500/40 text-white"
          : "hover:bg-purple-900/20"
      }`}
    >
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <span className="font-semibold">{name}</span>
          <span className="text-sm text-gray-400 truncate w-40">
            {lastMessage}
          </span>
        </div>
        <span className="text-xs text-gray-500">{time}</span>
      </div>
    </div>
  );
}

function ChatMessage({ sender, text, username }: Message) {
  const isMine = sender === "me";
  return (
    <div className={`flex flex-col ${isMine ? "items-end" : "items-start"}`}>
      {!isMine && (
        <span className="text-xs text-purple-400 font-medium mb-1">
          {username}
        </span>
      )}
      <div
        className={`px-4 py-2 rounded-2xl max-w-[75%] shadow-md ${
          isMine
            ? "bg-gradient-to-r from-purple-700 to-pink-600 text-white rounded-br-none"
            : "bg-purple-900/40 text-gray-100 rounded-bl-none"
        }`}
      >
        {text}
      </div>
    </div>
  );
}

function ChatWindow({
  groupName,
  messages,
  onSend,
  typingUser,
}: {
  groupName: string;
  messages: Message[];
  onSend: (text: string) => void;
  typingUser: string | null;
}) {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (input.trim()) {
      onSend(input.trim());
      setInput("");
      socket.emit("stop typing");
    }
  };

  const handleTyping = (value: string) => {
    setInput(value);
    socket.emit(value ? "typing" : "stop typing");
  };

  return (
    <section
      className={`flex-1 flex flex-col ${chatBg} rounded-r-3xl border-l-2 ${chatBorder}`}
    >
      <header className="border-b border-purple-800/50 py-4 px-6 flex items-center gap-2 bg-purple-950/20">
        <Avatar name={groupName} size="sm" />
        <span className="font-semibold text-white text-lg">{groupName}</span>
      </header>

      <ScrollShadow className="flex-1 px-6 py-4 space-y-4 overflow-y-auto">
        {messages.map((m, i) => (
          <ChatMessage key={m._id || i} {...m} />
        ))}

          <div className="text-sm text-purple-400 italic flex items-center gap-2">
            <Spinner size="sm" color="secondary" /> {typingUser} is typing...
          </div>
        
      </ScrollShadow>

      <div
        className={`p-3 m-4 border rounded-full flex items-center gap-3 ${chatBorder} bg-purple-900/30`}
      >
        <Input
          ref={inputRef}
          fullWidth
          placeholder="Type a message..."
          value={input}
          onChange={(e) => handleTyping(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          radius="full"
          className="text-white"
        />
        <Button
          isIconOnly
          color="secondary"
          radius="full"
          onClick={handleSend}
          className="bg-gradient-to-r from-purple-700 to-pink-600"
        >
          ➤
        </Button>
      </div>
    </section>
  );
}

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
    <aside
      className={`w-1/4 flex flex-col rounded-l-3xl border-r-2 ${chatBorder} ${chatBg}`}
    >
      <div className="p-4 border-b border-purple-800/40">
        <Input
          variant="bordered"
          radius="full"
          placeholder="Search or start new chat"
          className="text-white"
        />
      </div>

      <ScrollShadow className="flex-1 p-2">
        <div className="space-y-1">
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

export default function ChatApp() {
  const groups: Chat[] = [
    { id: 1, name: "General", lastMessage: "Welcome!", time: "Now" },
  ];

  const [selectedId, setSelectedId] = useState(1);
  const [messages, setMessages] = useState<Message[]>([]);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [typingUser, setTypingUser] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("username");
    if (stored) setName(stored);
  }, []);

  useEffect(() => {
    if (!name) return;
    fetch("http://localhost:4000/messages")
      .then((res) => res.json())
      .then((data) =>
        setMessages(
          data.map((msg: any) => ({
            ...msg,
            sender: msg.username === name ? "me" : "other",
          }))
        )
      )
      .catch(console.error);
  }, [name]);

  useEffect(() => {
    if (!name) return;

    const handleMessage = (msg: any) => {
      setMessages((prev) => [
        ...prev,
        { ...msg, sender: msg.username === name ? "me" : "other" },
      ]);
    };

    const handleTyping = (data: string) => setTypingUser(data);
    const handleStopTyping = () => setTypingUser(null);

    socket.on("chat message", handleMessage);
    socket.on("typing", handleTyping);
    socket.on("stop typing", handleStopTyping);

    return () => {
      socket.off("chat message", handleMessage);
      socket.off("typing", handleTyping);
      socket.off("stop typing", handleStopTyping);
    };
  }, [name]);

  const handleSend = (text: string) => {
    if (!name) return;
    socket.emit("chat message", { username: name, text });
  };

  const handleEnter = () => {
    if (username.trim()) {
      setName(username.trim());
      localStorage.setItem("username", username.trim());
      socket.emit("join", username.trim());
    }
  };

  return (
    <main
      className={`h-screen flex items-center justify-center bg-gradient-to-br ${chatAccent} p-4`}
    >
      <div
        className={`flex overflow-hidden w-full max-w-6xl h-[85vh] rounded-3xl shadow-2xl border-2 ${chatBorder}`}
      >
        <ChatSidebar
          groups={groups}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
        />

        {!name ? (
          <div className="flex flex-col items-center justify-center m-auto gap-3 bg-purple-950/30 rounded-2xl p-8 border border-purple-800/50">
            <h2 className="text-xl text-purple-200 font-semibold mb-2">
              Enter your name to join the chat
            </h2>
            <Input
              placeholder="Your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              radius="full"
              className="max-w-xs text-white"
            />
            <Button
              onClick={handleEnter}
              color="secondary"
              radius="full"
              className="bg-gradient-to-r from-purple-700 to-pink-600 text-white"
            >
              Join Chat
            </Button>
          </div>
        ) : (
          <ChatWindow
            groupName={groups.find((g) => g.id === selectedId)?.name || ""}
            messages={messages}
            onSend={handleSend}
            typingUser={typingUser}
          />
        )}
      </div>
    </main>
  );
}
