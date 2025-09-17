import React, { useState, useEffect, useCallback } from 'react';
import useTheme from './hooks/useTheme';
import { Sidebar } from './components/Sidebar';
import { ChatView } from './components/ChatView';
import AssignmentView from './components/assignment/AssignmentView';
import type { ChatSession } from './types';

const App: React.FC = () => {
  const [theme, toggleTheme] = useTheme();
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<'chat' | 'assignment'>('chat');

  useEffect(() => {
    try {
      const storedSessions = localStorage.getItem('chatSessions');
      const storedActiveId = localStorage.getItem('activeChatId');
      const storedView = localStorage.getItem('activeView');

      if (storedSessions) {
        const parsedSessions = JSON.parse(storedSessions);
        if (Array.isArray(parsedSessions)) {
            setChatSessions(parsedSessions);
        }
      }
      if (storedActiveId) {
        const sessionExists = JSON.parse(storedSessions || '[]').some((s: ChatSession) => s.id === storedActiveId);
        if (sessionExists) {
            setActiveChatId(storedActiveId);
        }
      }
      if ((storedView === 'chat' || storedView === 'assignment')) {
        // Default to chat if no chat is active
         if (storedView === 'assignment' && !storedActiveId) {
            setActiveView('chat');
         } else {
            setActiveView(storedView);
         }
      }
    } catch (e) {
      console.error("Failed to load state from localStorage", e);
      setChatSessions([]);
      setActiveView('chat');
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('chatSessions', JSON.stringify(chatSessions));
      if (activeChatId) {
        localStorage.setItem('activeChatId', activeChatId);
      } else {
        localStorage.removeItem('activeChatId');
      }
      localStorage.setItem('activeView', activeView);
    } catch(e) {
      console.error("Failed to save state to localStorage", e);
    }
  }, [chatSessions, activeChatId, activeView]);

  const addNewChat = () => {
    const newSession: ChatSession = {
      id: crypto.randomUUID(),
      title: 'New Chat',
      messages: [],
    };
    setChatSessions(prev => [newSession, ...prev]);
    setActiveChatId(newSession.id);
    setActiveView('chat'); // Switch to chat view when a new chat is added
  };

  const deleteChat = (id: string) => {
    const remainingSessions = chatSessions.filter(s => s.id !== id);
    setChatSessions(remainingSessions);
    if (activeChatId === id) {
      const newActiveId = remainingSessions[0]?.id || null;
      setActiveChatId(newActiveId);
      if (!newActiveId) {
        setActiveView('chat'); // Default to chat view if no chats are left
      }
    }
  };

  const updateChatSession = useCallback((id: string, updatedSession: Partial<ChatSession>) => {
    setChatSessions(prev =>
      prev.map(session =>
        session.id === id ? { ...session, ...updatedSession } : session
      )
    );
  }, []);

  const activeChat = chatSessions.find(s => s.id === activeChatId);

  return (
    <div className="flex h-screen w-screen bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark font-sans overflow-hidden">
      <Sidebar
        chatSessions={chatSessions}
        activeChatId={activeChatId}
        setActiveChatId={setActiveChatId}
        addNewChat={addNewChat}
        deleteChat={deleteChat}
        theme={theme}
        toggleTheme={toggleTheme}
        activeView={activeView}
        setActiveView={setActiveView}
      />
      <main className="flex-1 flex flex-col relative">
        {activeView === 'assignment' && activeChat ? (
          <AssignmentView messages={activeChat.messages} setActiveView={setActiveView} />
        ) : activeChat ? (
          <ChatView
            key={activeChat.id} // Add key to force re-mount on chat change
            chatSession={activeChat}
            updateChatSession={updateChatSession}
            setActiveView={setActiveView}
          />
        ) : (
           <div className="flex flex-col items-center justify-center h-full text-center p-4">
            <h2 className="text-2xl font-semibold mt-4 text-text-light dark:text-text-dark">EduMentor</h2>
            <p className="text-gray-500 dark:text-gray-400">Select a chat or start a new one.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;