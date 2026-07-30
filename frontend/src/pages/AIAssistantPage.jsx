import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { chatWithAI } from "../services/aiService";

import "./Dashboard.css";

function AIAssistantPage() {

    const navigate = useNavigate();

    // ============================
    // States
    // ============================

    const [question, setQuestion] = useState("");

    const [messages, setMessages] = useState(() => {

        const savedMessages =
            localStorage.getItem("aiChatHistory");

        if (savedMessages) {

            return JSON.parse(savedMessages);

        }

        return [

            {

                sender: "ai",

                text:
                    "👋 Hello! I am MediCare AI. Ask me any health-related question.",

                showBookingButton: false,

                specialization: ""

            }

        ];

    });

    const [loading, setLoading] = useState(false);

    // ============================
    // Refs
    // ============================

    const messagesEndRef = useRef(null);

    const inputRef = useRef(null);

    // ============================
    // Auto Scroll
    // ============================

    useEffect(() => {

        messagesEndRef.current?.scrollIntoView({

            behavior: "smooth"

        });

        inputRef.current?.focus();

    }, [messages, loading]);

    // ============================
    // Save Chat History
    // ============================

    useEffect(() => {

        localStorage.setItem(

            "aiChatHistory",

            JSON.stringify(messages)

        );

    }, [messages]);

    // ============================
    // Send Message
    // ============================

    async function handleSend(e) {

        e.preventDefault();

        if (!question.trim()) return;

        const userMessage = {

            sender: "user",

            text: question,

            showBookingButton: false,

            specialization: ""

        };

        setMessages(prev => [

            ...prev,

            userMessage

        ]);

        setLoading(true);
                try {

            const aiResponse = await chatWithAI(question);

            setMessages(prev => [

                ...prev,

                {

                    sender: "ai",

                    text: aiResponse.reply,

                    showBookingButton:
                        aiResponse.showBookingButton,

                    specialization:
                        aiResponse.specialization

                }

            ]);

        }
        catch (error) {

            setMessages(prev => [

                ...prev,

                {

                    sender: "ai",

                    text:
                        "Sorry, I couldn't connect to MediCare AI. Please try again.",

                    showBookingButton: false,

                    specialization: ""

                }

            ]);

        }
        finally {

            setLoading(false);

        }

        setQuestion("");

    }

    // ============================
    // Clear Chat
    // ============================

    function handleClearChat() {

        const confirmClear = window.confirm(

            "Are you sure you want to clear the chat history?"

        );

        if (!confirmClear) return;

        const defaultMessage = [

            {

                sender: "ai",

                text:
                    "👋 Hello! I am MediCare AI. Ask me any health-related question.",

                showBookingButton: false,

                specialization: ""

            }

        ];

        setMessages(defaultMessage);

        localStorage.removeItem("aiChatHistory");

    }

    // ============================
    // Book Appointment
    // ============================

    function handleBookAppointment(specialization) {

        navigate("/patient/book", {

            state: {

                specialization

            }

        });

    }

    return (

        <div className="dash-page">

            <div className="dash-body">

                <div className="dash-welcome">

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "15px"
                        }}
                    >
                                                <div>

                            <h1>🤖 MediCare AI Assistant</h1>

                            <p>
                                Ask health-related questions and receive AI guidance.
                            </p>

                        </div>

                        <button
                            className="btn-outline"
                            onClick={handleClearChat}
                        >
                            🗑️ Clear Chat
                        </button>

                    </div>

                </div>

                <div
                    className="upcoming-card"
                    style={{
                        height: "500px",
                        overflowY: "auto",
                        marginBottom: "20px",
                        background: "#f8fafc",
                        border: "1px solid #e5e7eb",
                        borderRadius: "20px",
                        padding: "25px",
                        boxShadow: "0 8px 25px rgba(0,0,0,0.08)"
                    }}
                >

                    {messages.map((message, index) => (

                        <div
                            key={index}
                            style={{
                                display: "flex",
                                justifyContent:
                                    message.sender === "user"
                                        ? "flex-end"
                                        : "flex-start",
                                alignItems: "flex-end",
                                gap: "12px",
                                marginBottom: "20px"
                            }}
                        >

                            {message.sender === "ai" && (

                                <div
                                    style={{
                                        width: "42px",
                                        height: "42px",
                                        borderRadius: "50%",
                                        background: "#14b8a6",
                                        color: "#fff",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        fontWeight: "bold",
                                        flexShrink: 0
                                    }}
                                >
                                    🤖
                                </div>

                            )}

                            <div
                                style={{
                                    background:
                                        message.sender === "user"
                                            ? "#14b8a6"
                                            : "#ffffff",

                                    color:
                                        message.sender === "user"
                                            ? "#ffffff"
                                            : "#111827",

                                    padding: "16px",

                                    borderRadius: "18px",

                                    maxWidth: "72%",

                                    lineHeight: "1.7",

                                    whiteSpace: "pre-wrap",

                                    boxShadow:
                                        "0 3px 10px rgba(0,0,0,0.08)",

                                    border:
                                        message.sender === "ai"
                                            ? "1px solid #e5e7eb"
                                            : "none"
                                }}
                            >

                                {message.text}

                                {message.sender === "ai" && (

                                    <div
                                        style={{
                                            marginTop: "14px",
                                            paddingTop: "10px",
                                            borderTop: "1px solid #e5e7eb",
                                            fontSize: "12px",
                                            color: "#6b7280",
                                            fontStyle: "italic"
                                        }}
                                    >
                                        ⚠️ AI-generated response. Please consult a qualified healthcare professional for medical advice.
                                    </div>

                                )}

                                {message.showBookingButton && (

                                    <button
                                        className="dash-primary-btn"
                                        style={{
                                            marginTop: "15px"
                                        }}
                                        onClick={() =>
                                            handleBookAppointment(
                                                message.specialization
                                            )
                                        }
                                    >
                                        🚀 Book Appointment
                                    </button>

                                )}

                            </div>

                            {message.sender === "user" && (

                                <div
                                    style={{
                                        width: "42px",
                                        height: "42px",
                                        borderRadius: "50%",
                                        background: "#2563eb",
                                        color: "#fff",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        fontWeight: "bold",
                                        flexShrink: 0
                                    }}
                                >
                                    👤
                                </div>

                            )}

                        </div>

                    ))}
                                        {loading && (

                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                marginBottom: "20px"
                            }}
                        >

                            <div
                                style={{
                                    width: "42px",
                                    height: "42px",
                                    borderRadius: "50%",
                                    background: "#14b8a6",
                                    color: "#ffffff",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    fontWeight: "bold"
                                }}
                            >
                                🤖
                            </div>

                            <div
                                style={{
                                    background: "#f3f4f6",
                                    padding: "12px 20px",
                                    borderRadius: "15px",
                                    fontSize: "18px",
                                    letterSpacing: "5px"
                                }}
                            >
                                ● ● ●
                            </div>

                        </div>

                    )}

                    <div ref={messagesEndRef}></div>

                </div>

                <form onSubmit={handleSend}>

                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Ask MediCare AI anything..."
                        value={question}
                        onChange={(e) =>
                            setQuestion(e.target.value)
                        }
                        onKeyDown={(e) => {

                            if (e.key === "Enter") {

                                e.preventDefault();

                                handleSend(e);

                            }

                        }}
                        style={{
                            width: "100%",
                            padding: "16px",
                            marginBottom: "18px",
                            borderRadius: "14px",
                            border: "1px solid #cbd5e1",
                            fontSize: "16px",
                            outline: "none"
                        }}
                    />

                    <button
                        className="dash-primary-btn"
                        type="submit"
                        disabled={loading}
                        style={{
                            minWidth: "170px",
                            borderRadius: "12px"
                        }}
                    >
                        {loading
                            ? "🤖 Thinking..."
                            : "🚀 Send"}
                    </button>

                    <button
                        type="button"
                        className="btn-outline"
                        style={{ marginLeft: "15px" }}
                        onClick={() =>
                            navigate("/patient/dashboard")
                        }
                    >
                        Back
                    </button>

                </form>

            </div>

        </div>

    );

}

export default AIAssistantPage;