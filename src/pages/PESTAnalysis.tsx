import React, { useState, useEffect, useRef } from 'react';
import { ChatInput } from '../components/ChatInput';
import { ChatMessage } from '../components/ChatMessage';
import { FactorButton } from '../components/FactorButton';
import { useChat } from '../hooks/useChat';
import { factors } from '../constants/factors';

export default function PESTAnalysis() {
  const { messages, isLoading, sendMessage } = useChat();
  const [input, setInput] = useState('');
  const [selectedFactor, setSelectedFactor] = useState<keyof typeof factors>('political');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const handleSendMessage = () => {
    if (input.trim()) {
      sendMessage(factors[selectedFactor].prompt, input.trim());
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
        {Object.entries(factors).map(([key, factor]) => (
          <FactorButton
            key={key}
            factorKey={key}
            factor={factor}
            isSelected={selectedFactor === key}
            onClick={() => setSelectedFactor(key as keyof typeof factors)}
          />
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
            placeholder="请输入要分析的行业..."
            onInputChange={setInput}
            onSend={handleSendMessage}
          />
        </div>
      </div>
    </div>
  );
}