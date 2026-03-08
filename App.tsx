
import React, { useState, useEffect, useMemo } from 'react';
import { Ticket, Channel, Status, Priority, Category, Activity } from './types';
import { INITIAL_TICKETS } from './constants';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import TicketForm from './components/TicketForm';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Analytics from './components/Analytics';
import TicketDetail from './components/TicketDetail';
import ActivityFeed from './components/ActivityFeed';
import { motion, AnimatePresence } from 'motion/react';

import CustomerList from './components/CustomerList';

type View = 'landing' | 'dashboard' | 'form' | 'analytics' | 'ticket-detail' | 'customers' | 'settings';

const App: React.FC = () => {
  const [view, setView] = useState<View>('landing');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('omnicx_dark_mode');
    return saved === 'true';
  });
  
  const [tickets, setTickets] = useState<Ticket[]>(() => {
    try {
      const saved = localStorage.getItem('omnicx_tickets');
      return saved ? JSON.parse(saved) : INITIAL_TICKETS;
    } catch (e) {
      console.error("Failed to parse tickets from localStorage", e);
      return INITIAL_TICKETS;
    }
  });
  
  const [activities, setActivities] = useState<Activity[]>(() => {
    try {
      const saved = localStorage.getItem('omnicx_activities');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Failed to parse activities from localStorage", e);
      return [];
    }
  });

  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('omnicx_tickets', JSON.stringify(tickets));
  }, [tickets]);

  useEffect(() => {
    localStorage.setItem('omnicx_activities', JSON.stringify(activities));
  }, [activities]);

  useEffect(() => {
    localStorage.setItem('omnicx_dark_mode', String(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const addActivity = (type: Activity['type'], message: string, ticketId?: string, user?: string) => {
    const newActivity: Activity = {
      id: Date.now().toString(),
      type,
      message,
      timestamp: new Date().toISOString(),
      ticketId,
      user
    };
    setActivities(prev => [newActivity, ...prev].slice(0, 50));
  };

  const addTicket = (newTicket: Ticket) => {
    setTickets(prev => [newTicket, ...prev]);
    addActivity('ticket_created', `New ticket created: ${newTicket.subject}`, newTicket.id, 'System');
    setView('dashboard');
  };

  const updateTicket = (id: string, updates: Partial<Ticket>) => {
    setTickets(prev => prev.map(t => {
      if (t.id === id) {
        const updated = { ...t, ...updates, updatedAt: new Date().toISOString() };
        if (updates.status && updates.status !== t.status) {
          addActivity('ticket_updated', `Status updated to ${updates.status}`, id, 'SIVAGAMI R');
        }
        return updated;
      }
      return t;
    }));
  };

  const deleteTicket = (id: string) => {
    setTickets(prev => prev.filter(t => t.id !== id));
    addActivity('ticket_updated', `Ticket deleted`, id, 'SIVAGAMI R');
  };

  const selectedTicket = useMemo(() => 
    tickets.find(t => t.id === selectedTicketId) || null
  , [tickets, selectedTicketId]);

  const handleTicketClick = (id: string) => {
    setSelectedTicketId(id);
    setView('ticket-detail');
  };

  const renderContent = () => {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="h-full"
        >
          {(() => {
            switch (view) {
              case 'landing':
                return <LandingPage onGetStarted={() => setView('dashboard')} />;
              case 'dashboard':
                return (
                  <Dashboard 
                    tickets={tickets} 
                    onTicketClick={handleTicketClick} 
                    onAddRequest={() => setView('form')}
                  />
                );
              case 'form':
                return (
                  <TicketForm 
                    onSubmit={addTicket} 
                    onCancel={() => setView('dashboard')} 
                    initialCustomerId={selectedCustomerId || undefined}
                  />
                );
              case 'analytics':
                return <Analytics tickets={tickets} />;
              case 'customers':
                return (
                  <CustomerList 
                    onCreateTicket={(id) => {
                      setSelectedCustomerId(id);
                      setView('form');
                    }} 
                  />
                );
              case 'settings':
                return (
                  <div className="p-12 bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-sm">
                    <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-8 tracking-tighter">System Settings</h2>
                    <p className="text-slate-500 dark:text-slate-400 font-medium mb-12">Configure your Enterprise OS parameters and AI thresholds.</p>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="p-8 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-800">
                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">AI Model</h3>
                        <select className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500">
                          <option>Gemini 1.5 Pro (Enterprise)</option>
                          <option>Gemini 1.5 Flash (Performance)</option>
                        </select>
                      </div>
                      <div className="p-8 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-800">
                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Auto-Translation</h3>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Enable Real-time Detection</span>
                          <div className="w-12 h-6 bg-indigo-600 rounded-full relative">
                            <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              case 'ticket-detail':
                return selectedTicket ? (
                  <TicketDetail 
                    ticket={selectedTicket} 
                    onUpdate={updateTicket} 
                    onDelete={deleteTicket}
                    onBack={() => setView('dashboard')} 
                  />
                ) : <Dashboard tickets={tickets} onTicketClick={handleTicketClick} onAddRequest={() => setView('form')} />;
              default:
                return <LandingPage onGetStarted={() => setView('dashboard')} />;
            }
          })()}
        </motion.div>
      </AnimatePresence>
    );
  };

  if (view === 'landing') {
    return <LandingPage onGetStarted={() => setView('dashboard')} />;
  }

  return (
    <div className={`flex h-screen overflow-hidden selection:bg-indigo-500 selection:text-white ${isDarkMode ? 'dark bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
      <Sidebar currentView={view} onViewChange={(v) => setView(v as View)} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <Header 
          onNewTicket={() => {
            setSelectedCustomerId(null);
            setView('form');
          }} 
          isDarkMode={isDarkMode} 
          toggleDarkMode={() => setIsDarkMode(!isDarkMode)} 
        />
        <main className="flex-1 overflow-hidden flex flex-col lg:flex-row">
          <div className="flex-1 overflow-y-auto scrollbar-hide p-6 md:p-10">
            <div className="max-w-[1600px] mx-auto">
              {renderContent()}
            </div>
          </div>
          {view !== 'landing' && view !== 'form' && view !== 'ticket-detail' && (
            <aside className="hidden 2xl:block w-96 border-l border-slate-200 dark:border-slate-800 p-8 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md overflow-y-auto scrollbar-hide">
              <ActivityFeed activities={activities} />
            </aside>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
