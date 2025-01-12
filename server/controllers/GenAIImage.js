import createError from "../createError.js";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const generateImage = async (req, res, next) => {
  try {
    const { prompt } = req.body;

    const response = await openai.createImage({
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });
    const genImage = response.data.data[0].b64_json;
    return res.status(200).json({ photo: genImage });
  } catch (error) {
    next(
      createError(
        error.status,
        error?.response?.data?.error?.message || error?.messsage
      )
    );
  }
};
