const LANGUAGE_CONFIG = {
  javascript: {
    language: "javascript",
    extension: "js",
  },
  python: {
    language: "python",
    extension: "py",
  },
  java: {
    language: "java",
    extension: "java",
  },
};

export const codeExecute = async (req, res) => {
  try {
    const { language, code } = req.body;

    // Validate request
    if (!language || !code) {
      return res.status(400).json({
        success: false,
        error: "Language and code are required.",
      });
    }

    const config = LANGUAGE_CONFIG[language];

    if (!config) {
      return res.status(400).json({
        success: false,
        error: `Unsupported language: ${language}`,
      });
    }

    // Check API key
    if (!process.env.ONECOMPILER_API_KEY) {
      return res.status(500).json({
        success: false,
        error: "OneCompiler API key is missing.",
      });
    }

    // Call OneCompiler
    const response = await fetch("https://api.onecompiler.com/v1/run", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": process.env.ONECOMPILER_API_KEY,
      },
      body: JSON.stringify({
        language: config.language,
        stdin: "",
        files: [
          {
            name: `main.${config.extension}`,
            content: code,
          },
        ],
      }),
    });

    const data = await response.json();

    // Uncomment this for the first test
    console.log("OneCompiler Response:", data);

    if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        error: data.message || data.error || "Code execution failed.",
      });
    }

    // Compilation / Runtime error
    if (data.stderr && data.stderr.trim() !== "") {
      return res.status(200).json({
        success: false,
        output: data.stdout || "",
        error: data.stderr,
      });
    }

    return res.status(200).json({
      success: true,
      output: data.stdout || data.output || "No output",
    });
  } catch (error) {
    console.error("Error in codeExecute controller:", error);

    return res.status(500).json({
      success: false,
      error: error.message || "Internal Server Error",
    });
  }
};