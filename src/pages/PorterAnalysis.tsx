import React, { useState, useEffect, useRef } from 'react';
import { ChatInput } from '../components/ChatInput';
import { ChatMessage } from '../components/ChatMessage';
import { useChat } from '../hooks/useChat';

const porterFactors = {
  rivalry: {
    title: '现有竞争者的竞争程度',
    prompt: '请分析该行业/企业现有竞争者之间的竞争程度，包括市场集中度、产品差异化、退出壁垒等因素，行业将在末尾给出。',
    color: 'bg-red-500'
  },
  newEntrants: {
    title: '潜在进入者的威胁',
    prompt: '请分析该行业/企业潜在进入者的威胁，包括进入壁垒、规模经济、品牌认知度等因素，行业将在末尾给出。',
    color: 'bg-blue-500'
  },
  substitutes: {
    title: '替代品的威胁',
    prompt: '请分析该行业/企业替代品的威胁，包括替代品的性价比、转换成本等因素，行业将在末尾给出。',
    color: 'bg-green-500'
  },
  buyerPower: {
    title: '买方议价能力',
    prompt: '请分析该行业/企业买方的议价能力，包括买方集中度、转换成本、信息获取等因素，行业将在末尾给出。',
    color: 'bg-yellow-500'
  },
  supplierPower: {
    title: '供应商议价能力',
    prompt: '请分析该行业/企业供应商的议价能力，包括供应商集中度、转换成本、原材料重要性等因素，行业将在末尾给出。',
    color: 'bg-purple-500'
  }
};

export default function PorterAnalysis() {
  const { messages, isLoading, sendMessage } = useChat();
  const [input, setInput] = useState('');
  const [selectedFactor, setSelectedFactor] = useState<keyof typeof porterFactors>('rivalry');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const handleSendMessage = () => {
    if (input.trim()) {
      sendMessage(porterFactors[selectedFactor].prompt, input.trim());
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
        {Object.entries(porterFactors).map(([key, factor]) => (
          <button
            key={key}
            onClick={() => setSelectedFactor(key as keyof typeof porterFactors)}
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
            placeholder={`请输入要分析的行业...`}
            onInputChange={setInput}
            onSend={handleSendMessage}
          />
        </div>
      </div>
    </div>
  );
}