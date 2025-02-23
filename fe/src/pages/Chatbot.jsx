import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Container, Typography, TextField, Button, Paper, List, ListItem, CircularProgress, Box } from "@mui/material";
import ReactMarkdown from "react-markdown";
import SendIcon from "@mui/icons-material/Send";

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [typingContent, setTypingContent] = useState("");
  const messagesEndRef = useRef(null);
  const location = useLocation();
  const initialMessageSent = useRef(false);

  useEffect(() => {
    if (location.state && location.state.disease && !initialMessageSent.current) {
      handleSend(
        `Explain in detail about ${location.state.disease} in crops. Include its causes, symptoms, affected crops, environmental factors favoring its spread, methods of diagnosis, and effective control or management strategies. Also, discuss any notable case studies or research advancements related to this disease.`
      );
      initialMessageSent.current = true;
    }
  }, [location]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const typeMessage = (content) => {
    setTypingContent("");
    setMessages((prevMessages) => [...prevMessages, { type: "ai", content }]);
  };

  const handleSend = async (message = input) => {
    if (message.trim() && !isLoading) {
      const newMessage = { type: "human", content: message };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInput("");
      setIsLoading(true);

      try {
        const response = await fetch("https://backend-sjxi.onrender.com/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message, history: messages }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        typeMessage(data.reply);
      } catch (error) {
        console.error("Error:", error);
        setMessages((prevMessages) => [
          ...prevMessages,
          { type: "ai", content: "Sorry, I encountered an error. Please try again." },
        ]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        mt: 2,
        display: "flex",
        flexDirection: "column",
        height: "89vh",
        bgcolor: "#1a1a1a",
        color: "#e0e0e0",
        borderRadius: 2,
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        align="center"
        sx={{ fontWeight: "bold", color: "#e0e0e0" }}
      >
        Chat with CropCare AI
      </Typography>
      <Paper
        elevation={3}
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          p: 2,
          mb: 2,
          backgroundColor: "#2b2b2b",
          borderRadius: 2,
          height: "calc(100vh - 200px)",
        }}
      >
        <List
          sx={{
            maxHeight: "100%",
            overflowY: "auto",
            scrollbarWidth: "thin",
            "&::-webkit-scrollbar": { width: "6px" },
            "&::-webkit-scrollbar-thumb": { backgroundColor: "#555", borderRadius: "3px" },
          }}
        >
          {messages.map((message, index) => (
            <ListItem key={index} sx={{ justifyContent: message.type === "human" ? "flex-end" : "flex-start" }}>
              <Paper
                elevation={1}
                sx={{
                  p: 1.5,
                  maxWidth: "70%",
                  borderRadius: 2,
                  bgcolor: message.type === "human" ? "#4a4a4a" : "#3a3a3a",
                  color: "#e0e0e0",
                  wordBreak: "break-word",
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  {message.type === "human" ? "You" : "CropCare AI"}
                </Typography>
                {message.type === "ai" ? (
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                ) : (
                  <Typography variant="body2">{message.content}</Typography>
                )}
              </Paper>
            </ListItem>
          ))}
        </List>
        <div ref={messagesEndRef} />
      </Paper>
      <Box
        component="form"
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "center",
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about crop management..."
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              e.preventDefault(); // Prevent the form from submitting
              handleSend(); // Send the message
            }
          }}
          disabled={isLoading}
          sx={{
            backgroundColor: "#2b2b2b",
            color: "#e0e0e0",
            borderRadius: 1,
          }}
          InputProps={{
            style: { color: "#e0e0e0" },
          }}
        />
        <Button
          variant="contained"
          color="primary"
          endIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
          onClick={() => handleSend()}
          disabled={isLoading || !input.trim()}
          sx={{
            height: "100%",
            minWidth: 100,
            backgroundColor: "#444",
            "&:hover": {
              backgroundColor: "#555",
            },
          }}
        >
          Send
        </Button>
      </Box>
    </Container>
  );
}

export default Chatbot;
