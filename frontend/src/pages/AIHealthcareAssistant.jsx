import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { chatWithAI } from "../services/aiService";
import ReactMarkdown from "react-markdown";
import "./AIHealthcareAssistant.css";

function AIHealthcareAssistant() {

    const [message, setMessage] = useState("");

    const [loading, setLoading] = useState(false);

    const [chat, setChat] = useState([
        {
            sender: "ai",
            text:
                "👋 Hello! I'm your AI Healthcare Assistant.\n\nAsk me any health-related question and I'll do my best to help."
        }
    ]);

    const bottomRef = useRef(null);
    const navigate = useNavigate();
    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth"
        });
    }, [chat]);

    async function handleSend() {

        if (!message.trim() || loading) return;

        const userMessage = {
            sender: "user",
            text: message
        };

        setChat((previous) => [
            ...previous,
            userMessage
        ]);

        const question = message;

        setMessage("");

        setLoading(true);

        try {

            const response = await chatWithAI(question);

            setChat((previous) => [
                ...previous,
                {
                    sender: "ai",
                    text: response.reply,
                    showBookingButton: response.showBookingButton,
                    specialization: response.specialization
                }
            ]);

        } catch {

            setChat((previous) => [
                ...previous,
                {
                    sender: "ai",
                    text:
                        "❌ Sorry, I couldn't contact the AI service. Please try again."
                }
            ]);

        } finally {

            setLoading(false);

        }

    }

    return (

        <div className="ai-page">

            <div className="ai-container">

                <div className="ai-header">

                    <h1>🤖 AI Healthcare Assistant</h1>

                    <p>
                        Ask health-related questions and receive AI-powered guidance.
                    </p>

                </div>

                <div className="chat-box">

                    {chat.map((msg, index) => (

                        <div
                            key={index}
                            className={`message ${msg.sender}`}
                        >
                            <div className="message-bubble">

                                <ReactMarkdown>
                                    {msg.text}
                                </ReactMarkdown>

                                {msg.showBookingButton && (

                                    <button
                                        className="ai-book-btn"
                                        onClick={() =>
                                            navigate("/patient/book", {
                                                state: {
                                                    specialization: msg.specialization
                                                }
                                            })
                                        }
                                    >
                                        📅 Book {msg.specialization}
                                    </button>

                                )}

                            </div>

                        </div>

                    ))}

                    {loading && (

                        <div className="message ai">

                            <div className="message-bubble">

                                Thinking...

                            </div>

                        </div>

                    )}

                    <div ref={bottomRef}></div>

                </div>

                <div className="chat-input">

                    <input
                        type="text"
                        placeholder="Type your health question..."
                        value={message}
                        disabled={loading}
                        onChange={(e) =>
                            setMessage(e.target.value)
                        }
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSend();
                            }
                        }}
                    />

                    <button
                        disabled={loading}
                        onClick={handleSend}
                    >
                        {loading ? "..." : "Send"}
                    </button>

                </div>

                <div
                    style={{
                        padding: "18px",
                        textAlign: "center",
                        fontSize: "13px",
                        color: "#64748b",
                        borderTop: "1px solid #e5e7eb"
                    }}
                >
                    AI responses are for educational purposes only and
                    should not replace professional medical advice.
                </div>

            </div>

        </div>

    );

}

export default AIHealthcareAssistant;