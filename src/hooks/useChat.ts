import { useState } from 'react';
import { Message } from '../types';
import { ApiService } from '../services/api';

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (prompt: string, userInput: string) => {
    if (!userInput.trim() || isLoading) return;

    setIsLoading(true);
    const fullPrompt = `${prompt}\n${userInput}`;
    
    setMessages(prev => [...prev, { role: 'user', content: userInput }]);

    try {
      await ApiService.getInstance().streamChat(
        fullPrompt,
        (content) => {
          setMessages(prev => {
            const newMessages = [...prev];
            const lastMessage = newMessages[newMessages.length - 1];
            if (lastMessage?.role === 'assistant') {
              lastMessage.content = content;
              return [...newMessages];
            } else {
              return [...newMessages, { role: 'assistant', content }];
            }
          });
        },
        (error) => {
          setMessages(prev => [...prev, { role: 'assistant', content: `错误：${error}` }]);
        }
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    isLoading,
    sendMessage,
  };
}