'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Send, Bot, User, ShieldCheck } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useUser } from '@/hooks/use-user'

interface Message {
    id: string
    role: 'user' | 'assistant'
    text: string
    timestamp: Date
}

export default function HealthPage() {
    const { user } = useUser()
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'assistant',
            text: `Hello ${user?.name || 'Chioma'}. I am Dr. AI. How are you feeling today?`,
            timestamp: new Date()
        }
    ])
    const [input, setInput] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [messages, isTyping])

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!input.trim()) return

        const userMsg: Message = {
            id: Date.now().toString(),
            role: 'user',
            text: input,
            timestamp: new Date()
        }

        setMessages(prev => [...prev, userMsg])
        setInput('')
        setIsTyping(true)

        // Mock AI Response Logic
        setTimeout(() => {
            const lowerInput = userMsg.text.toLowerCase()
            let replyText = "I understand. Could you describe your symptoms in more detail?"

            if (lowerInput.includes('fever')) {
                replyText = "I see you have a fever. Temperature above 38°C? Please stay hydrated. I recommend visiting a clinic if it persists for 24 hours. Would you like to locate the nearest hospital?"
            } else if (lowerInput.includes('malaria')) {
                replyText = "Malaria symptoms often include fever and chills. Your insurance covers testing and treatment. Visit a verified hospital instantly."
            } else if (lowerInput.includes('headache')) {
                replyText = "Severe headaches can be a sign of stress or other conditions. Have you taken any medication recently?"
            }

            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                text: replyText,
                timestamp: new Date()
            }
            setMessages(prev => [...prev, aiMsg])
            setIsTyping(false)
        }, 2000)
    }

    return (
        <div className="space-y-6 h-[calc(100vh-140px)] flex flex-col">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">AI Triage & Care</h1>
                    <p className="text-muted-foreground">Chat with Dr. AI for instant preliminary diagnosis.</p>
                </div>

                {/* ID Card / ZKP Link Mock */}
                <Card className="bg-primary/5 border-primary/20 cursor-pointer hover:bg-primary/10 transition-colors">
                    <CardContent className="p-3 flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                            <ShieldCheck className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-primary">My Health ID</p>
                            <p className="text-[10px] text-muted-foreground">Privacy Protected</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="flex-1 flex flex-col overflow-hidden">
                <CardHeader className="py-3 border-b bg-muted/20">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center border border-blue-200">
                            <Bot className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <CardTitle className="text-sm">Dr. AI Assistant</CardTitle>
                            <CardDescription className="text-xs flex items-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Online
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`flex items-start gap-2 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                                >
                                    <div
                                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted border'
                                            }`}
                                    >
                                        {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                                    </div>
                                    <div
                                        className={`p-3 rounded-2xl text-sm ${msg.role === 'user'
                                                ? 'bg-primary text-primary-foreground rounded-tr-sm'
                                                : 'bg-muted rounded-tl-sm'
                                            }`}
                                    >
                                        {msg.text}
                                        <div className={`text-[10px] mt-1 opacity-70 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                                            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-muted p-3 rounded-2xl rounded-tl-sm text-sm flex gap-1">
                                    <span className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                    <span className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                    <span className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce"></span>
                                </div>
                            </div>
                        )}
                        <div ref={scrollRef} />
                    </div>
                </ScrollArea>
                <div className="p-4 border-t bg-background">
                    <form onSubmit={handleSend} className="flex gap-2">
                        <Input
                            placeholder="Type 'Fever', 'Malaria'..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            disabled={isTyping}
                            className="flex-1"
                        />
                        <Button type="submit" size="icon" disabled={!input.trim() || isTyping}>
                            <Send className="w-4 h-4" />
                        </Button>
                    </form>
                </div>
            </Card>
        </div>
    )
}
