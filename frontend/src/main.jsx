import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { Toaster } from "react-hot-toast";

import "./index.css";
import "./styles/theme.css";

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(

    <StrictMode>

        <BrowserRouter>

            <App />

            <Toaster

                position="top-right"

                reverseOrder={false}

                gutter={12}

                toastOptions={{

                    duration: 3000,

                    style: {

                        background: "#ffffff",

                        color: "#1F2937",

                        borderRadius: "14px",

                        padding: "16px",

                        boxShadow:
                            "0 12px 30px rgba(0,0,0,.12)",

                        fontWeight: 500

                    },

                    success: {

                        iconTheme: {

                            primary: "#14B8A6",

                            secondary: "#ffffff"

                        }

                    },

                    error: {

                        iconTheme: {

                            primary: "#EF4444",

                            secondary: "#ffffff"

                        }

                    }

                }}

            />

        </BrowserRouter>

    </StrictMode>

);