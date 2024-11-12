import React, { useState, useEffect, useRef } from 'react';
import { ChatInput } from '../components/ChatInput';
import { ChatMessage } from '../components/ChatMessage';
import { useChat } from '../hooks/useChat';

const swotFactors = {
  strengths: {
    title: '优势分析',
    prompt: '请分析该行业/企业的优势，包括核心竞争力、独特资源、市场地位等方面，行业将在末尾给出。',
    color: 'bg-green-500'
  },
  weaknesses: {
    title: '劣势分析',
    prompt: '请分析该行业/企业的劣势，包括资源短缺、能力不足、市场劣势等方面，行业将在末尾给出。',
    color: 'bg-red-500'
  },
  opportunities: {
    title: '机会分析',
    prompt: '请分析该行业/企业面临的机会，包括市场机遇、行业趋势、政策支持等方面，行业将在末尾给出。',
    color: 'bg-blue-500'
  },
  threats: {
    title: '威胁分析',
    prompt: '请分析该行业/企业面临的威胁，包括竞争压力、市场变化、政策风险等方面，行业将在末尾给出。',
    color: 'bg-yellow-500'
  }
};

export default function SWOTAnalysis() {
  const { messages, isLoading, sendMessage } = useChat();
  const [input, setInput] = useState('');
  const [selectedFactor, setSelectedFactor] = useState<keyof typeof swotFactors>('strengths');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const handleSendMessage = () => {
    if (input.trim()) {
      sendMessage(swotFactors[selectedFactor].prompt, input.trim());
      setInput('');
    }
  };

  useEffect(() => {
    // 每次消息列表更新时，滚动到底部
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-1 space-y-4">
        {Object.entries(swotFactors).map(([key, factor]) => (
          <button
            key={key}
            onClick={() => setSelectedFactor(key as keyof typeof swotFactors)}
            className={`w-full p-4 rounded-lg transition-all ${
              selectedFactor === key ? `${factor.color} text-white` : 'bg-white hover:bg-gray-50'
            } shadow-sm`}
          >
            <h3 className="font-semibold">{factor.title}</h3>
          </button>
        ))}
      </div>

      <div className="lg:col-span-3">
        <div className="bg-white rounded-lg shadow-sm h-[600px] flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>

          <ChatInput
            input={input}
            isLoading={isLoading}
            placeholder={`请输入要分析的行业/企业...`}
            onInputChange={setInput}
            onSend={handleSendMessage}
          />
        </div>
      </div>
    </div>
  );
}