import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { FaComments, FaUser, FaPaperPlane, FaSmile, FaPaperclip, FaEllipsisV, FaCircle, FaSearch, FaPhone, FaVideo, FaInfoCircle } from 'react-icons/fa';

const LiveChat = () => {
  const [activeChat, setActiveChat] = useState(0);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample chat data
  const chats = [
    {
      id: 1,
      customer: {
        name: 'Emily Davis',
        email: 'emily.davis@example.com',
        avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
        status: 'online'
      },
      messages: [
        { id: 1, sender: 'customer', text: 'Hi, I need help with my booking.', time: '10:30 AM' },
        { id: 2, sender: 'agent', text: 'Hello Emily, I\'d be happy to help you with your booking. Could you please provide me with your booking reference number?', time: '10:32 AM' },
        { id: 3, sender: 'customer', text: 'Sure, it\'s BK-78945.', time: '10:33 AM' },
        { id: 4, sender: 'agent', text: 'Thank you. I can see your booking for pet grooming on June 15th at 2:00 PM. What seems to be the issue?', time: '10:35 AM' },
        { id: 5, sender: 'customer', text: 'I need to reschedule it to next week. Is that possible?', time: '10:36 AM' },
      ],
      unread: 0,
      issue: 'Booking Rescheduling',
      lastActive: '2 min ago'
    },
    {
      id: 2,
      customer: {
        name: 'Michael Thompson',
        email: 'michael.thompson@example.com',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        status: 'online'
      },
      messages: [
        { id: 1, sender: 'customer', text: 'The provider didn\'t show up for our appointment today.', time: '9:45 AM' },
        { id: 2, sender: 'agent', text: 'I\'m very sorry to hear that, Michael. This is unacceptable. Let me look into this right away.', time: '9:47 AM' },
      ],
      unread: 2,
      issue: 'Provider No-Show',
      lastActive: '15 min ago'
    },
    {
      id: 3,
      customer: {
        name: 'Sarah Wilson',
        email: 'sarah.wilson@example.com',
        avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
        status: 'offline'
      },
      messages: [
        { id: 1, sender: 'customer', text: 'I\'m having trouble updating my pet\'s profile information.', time: 'Yesterday' },
        { id: 2, sender: 'agent', text: 'Hello Sarah, I\'d be happy to help. What specific information are you trying to update?', time: 'Yesterday' },
        { id: 3, sender: 'customer', text: 'I\'m trying to update my dog\'s vaccination records, but I keep getting an error.', time: 'Yesterday' },
      ],
      unread: 0,
      issue: 'Profile Update Issue',
      lastActive: '1 day ago'
    },
    {
      id: 4,
      customer: {
        name: 'Robert Johnson',
        email: 'robert.johnson@example.com',
        avatar: 'https://randomuser.me/api/portraits/men/42.jpg',
        status: 'offline'
      },
      messages: [
        { id: 1, sender: 'customer', text: 'I need a refund for a service I paid for but didn\'t receive.', time: '2 days ago' },
      ],
      unread: 1,
      issue: 'Refund Request',
      lastActive: '2 days ago'
    },
    {
      id: 5,
      customer: {
        name: 'Jennifer Brown',
        email: 'jennifer.brown@example.com',
        avatar: 'https://randomuser.me/api/portraits/women/56.jpg',
        status: 'online'
      },
      messages: [
        { id: 1, sender: 'customer', text: 'How do I change my payment method?', time: '3 days ago' },
        { id: 2, sender: 'agent', text: 'Hello Jennifer, you can update your payment method in your account settings under "Payment Methods". Would you like me to guide you through the process?', time: '3 days ago' },
      ],
      unread: 0,
      issue: 'Payment Method Update',
      lastActive: '3 days ago'
    },
  ];

  // Filter chats based on search term
  const filteredChats = chats.filter(chat => 
    chat.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chat.issue.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle sending a new message
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() === '') return;
    
    // In a real app, you would send this message to your backend
    console.log('Sending message:', message);
    
    // Clear the input field
    setMessage('');
  };

  // Get status color
  const getStatusColor = (status) => {
    return status === 'online' ? 'text-green-500' : 'text-gray-400';
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-100 p-2 rounded-lg">
            <FaComments className="text-indigo-600 text-2xl" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Live Chat Support</h1>
            <p className="text-gray-500">Manage real-time customer conversations</p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-indigo-100 overflow-hidden">
          <div className="flex h-[calc(100vh-220px)]">
            {/* Chat List */}
            <div className="w-1/3 border-r border-gray-200 flex flex-col">
              <div className="p-4 border-b border-gray-200">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaSearch className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="overflow-y-auto flex-1">
                {filteredChats.length > 0 ? (
                  filteredChats.map((chat, index) => (
                    <div 
                      key={chat.id}
                      className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${activeChat === index ? 'bg-indigo-50' : ''}`}
                      onClick={() => setActiveChat(index)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative">
                          <img 
                            src={chat.customer.avatar} 
                            alt={chat.customer.name} 
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <span className={`absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white ${getStatusColor(chat.customer.status)}`}></span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <h3 className="text-sm font-medium text-gray-900 truncate">{chat.customer.name}</h3>
                            <span className="text-xs text-gray-500">{chat.lastActive}</span>
                          </div>
                          <p className="text-xs text-gray-500 truncate">{chat.issue}</p>
                          <p className="text-sm text-gray-600 truncate mt-1">
                            {chat.messages[chat.messages.length - 1].text}
                          </p>
                        </div>
                        {chat.unread > 0 && (
                          <div className="bg-indigo-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                            {chat.unread}
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    No conversations found.
                  </div>
                )}
              </div>
            </div>
            
            {/* Chat Window */}
            <div className="w-2/3 flex flex-col">
              {filteredChats.length > 0 ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img 
                          src={filteredChats[activeChat].customer.avatar} 
                          alt={filteredChats[activeChat].customer.name} 
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <span className={`absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white ${getStatusColor(filteredChats[activeChat].customer.status)}`}></span>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">{filteredChats[activeChat].customer.name}</h3>
                        <p className="text-xs text-gray-500">{filteredChats[activeChat].issue}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button className="text-gray-500 hover:text-indigo-600">
                        <FaPhone />
                      </button>
                      <button className="text-gray-500 hover:text-indigo-600">
                        <FaVideo />
                      </button>
                      <button className="text-gray-500 hover:text-indigo-600">
                        <FaInfoCircle />
                      </button>
                      <button className="text-gray-500 hover:text-indigo-600">
                        <FaEllipsisV />
                      </button>
                    </div>
                  </div>
                  
                  {/* Chat Messages */}
                  <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                    <div className="space-y-4">
                      {filteredChats[activeChat].messages.map((msg) => (
                        <div 
                          key={msg.id} 
                          className={`flex ${msg.sender === 'agent' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div 
                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                              msg.sender === 'agent' 
                                ? 'bg-indigo-600 text-white rounded-br-none' 
                                : 'bg-white text-gray-800 rounded-bl-none shadow-sm'
                            }`}
                          >
                            <p>{msg.text}</p>
                            <span 
                              className={`text-xs block mt-1 ${
                                msg.sender === 'agent' ? 'text-indigo-200' : 'text-gray-500'
                              }`}
                            >
                              {msg.time}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Chat Input */}
                  <div className="p-4 border-t border-gray-200">
                    <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                      <button 
                        type="button" 
                        className="text-gray-500 hover:text-indigo-600"
                        title="Attach file"
                      >
                        <FaPaperclip />
                      </button>
                      <input
                        type="text"
                        placeholder="Type your message..."
                        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                      <button 
                        type="button" 
                        className="text-gray-500 hover:text-indigo-600"
                        title="Insert emoji"
                      >
                        <FaSmile />
                      </button>
                      <button
                        type="submit"
                        className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition-colors"
                        title="Send message"
                      >
                        <FaPaperPlane />
                      </button>
                    </form>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <FaComments className="text-indigo-300 text-5xl mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">No conversation selected</h3>
                    <p className="text-gray-500 mt-1">Select a conversation from the list to start chatting</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default LiveChat;