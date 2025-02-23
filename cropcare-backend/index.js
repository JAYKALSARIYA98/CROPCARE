import express from 'express';
import cors from 'cors';
import { ChatGroq } from '@langchain/groq';
import { AIMessage, HumanMessage } from '@langchain/core/messages';

const app = express();
app.use(cors());
app.use(express.json());

const model = new ChatGroq({
  apiKey: '', // Replace this with your actual Groq API key
  model: 'llama-3.2-3b-preview',
});

app.post('/chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    
    const messages = history.map(msg => 
      msg.type === 'human' ? new HumanMessage(msg.content) : new AIMessage(msg.content)
    );
    messages.push(new HumanMessage(message));

    const response = await model.invoke(messages);
    
    res.json({ reply: response.content });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));