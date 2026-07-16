const API_URL = import.meta.env.VITE_API_URL;

export async function executeCode(language, code) {
  try {
    const response = await fetch(`${API_URL}/code/execute`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language,
        code,
      }),
    });

    return await response.json();
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}