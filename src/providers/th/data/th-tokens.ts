import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const createTokens = async () => {
  const username = process.env.USERNAME;
  const password = process.env.PASSWORD;

  try {
    const response = await axios.post("https://turquoise.health/api/tokens", {
      username,
      password,
    });

    console.log("Tokens created successfully:", response.data);
  } catch (error) {
    console.error("Error creating tokens:", error);
  }
};

createTokens();