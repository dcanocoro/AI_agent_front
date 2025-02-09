export const sendChatMessage = async (userMessage: string): Promise<string[]> => {
    const response = await fetch("http://localhost:8000/orchestrator/interview", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: userMessage, // or "prompt", depending on your backend
      }),
    });
  
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
  
    // Based on your Orchestrator, you might get { collected_messages: [...]} or just an array
    // So let's assume it's returning an array of strings
    const data = await response.json();
    // If your backend returns something like { "messages": [...strings...] }, adapt accordingly
    // For example: return data.messages || [];
    return data; // If the endpoint returns an array
  };
  