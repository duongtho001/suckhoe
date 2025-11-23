import { GoogleGenAI, Modality, GenerateContentResponse, Type } from "@google/genai";
import type { VideoConfig, Scene, ScenePrompt, CharacterVariation } from '../types';
import { Language, translations } from "../translations";

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function withRetry<T>(
  fn: () => Promise<T>,
  retries = 3,
  initialDelay = 1000,
  context: string
): Promise<T> {
  let lastError: unknown;

  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      const errorMessage = (error instanceof Error ? error.message : String(error));
      
      let delay = 0;
      
      const isQuotaError = errorMessage.includes('429') || errorMessage.includes('RESOURCE_EXHAUSTED');
      const isServerError = errorMessage.includes('503') || errorMessage.includes('overloaded') || errorMessage.includes('unavailable');

      if (isQuotaError) {
          // Do not retry quota errors here; let the App component handle key rotation.
          throw error;
      } else if (isServerError) {
          delay = initialDelay * (2 ** i);
          console.warn(`Attempt ${i + 1}/${retries} failed in ${context} with a server error. Retrying in ${delay}ms...`);
      } else {
          // Not a retryable error, throw immediately
          throw error;
      }

      // If this is the last attempt, don't wait, just break the loop to throw the final error.
      if (i === retries - 1) {
          break;
      }

      await sleep(delay + Math.random() * 500); // Add jitter
    }
  }

  console.error(`All server retries failed in ${context}.`);
  throw lastError;
}


function getErrorMessage(error: unknown, context: string, language: Language): string {
    const t = translations[language];
    console.error(`Error in ${context}:`, error);
    if (error instanceof Error) {
        const message = error.message.toLowerCase();
        if (message.includes('quota') || message.includes('resource_exhausted')) {
            return t.errorQuotaExceeded;
        }
        if (message.includes('api key not valid') || message.includes('invalid token')) {
            return t.errorInvalidApiKey(context);
        }
        if (message.includes('overloaded') || message.includes('503') || message.includes('unavailable')) {
            return t.errorServerOverloaded(context);
        }
        if (message.includes('failed to fetch') || message.includes('tls handshake')) {
            return t.errorNetworkOrProxy;
        }
        return t.errorGeneric(context, error.message);
    }
    return t.errorUnknown(context);
}

const getModelName = (selectedModel: string, language: Language): string => {
    const [provider, modelName] = selectedModel.split(':');
    if (provider !== 'gemini') {
        throw new Error(translations[language].errorGeneric('getModelName', `Unsupported API provider: ${provider}. This app is configured for Gemini models.`));
    }
    return modelName;
};

export const generateCharacterPromptFromImage = async (
    imageBase64: string,
    language: Language,
    selectedModel: string,
    apiKey: string,
): Promise<string> => {
    const modelName = getModelName(selectedModel, language);
    const systemInstruction = translations[language].systemInstruction_generateCharacterPrompt;
    const userPromptText = "Please describe the character in this image in detail for an animation project.";
    
    const match = imageBase64.match(/^data:(image\/.+);base64,(.+)$/);
    if (!match) {
        throw new Error("Invalid base64 image format provided.");
    }
    const mimeType = match[1];
    const data = match[2];

    const imagePart = {
        inlineData: { mimeType, data },
    };
    const textPart = { text: userPromptText };

    const apiCall = async () => {
        const ai = new GoogleGenAI({ apiKey });
        const response = await ai.models.generateContent({
            model: modelName,
            contents: { parts: [imagePart, textPart] },
            config: {
                systemInstruction: systemInstruction,
            },
        });
        return response.text.trim();
    };

    try {
        return await withRetry(apiCall, 3, 1000, 'generateCharacterPromptFromImage');
    } catch (error) {
        throw new Error(getErrorMessage(error, 'generateCharacterPromptFromImage', language));
    }
};

export const generateCharacterPromptVariations = async (
    characterName: string,
    animationStyle: string,
    storyStyle: string,
    language: Language,
    selectedModel: string,
    apiKey: string,
): Promise<CharacterVariation[]> => {
    const modelName = getModelName(selectedModel, language);
    const systemInstruction = translations[language].systemInstruction_generateCharacterVariations(characterName, animationStyle, storyStyle);
    const userPrompt = "Please generate 3 character variations based on the system instruction.";
    
    const responseSchema = {
      type: Type.OBJECT,
      properties: {
        variations: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING }
            },
            required: ['title', 'description']
          }
        }
      },
      required: ['variations']
    };

    const apiCall = async () => {
        const ai = new GoogleGenAI({ apiKey });
        const response = await ai.models.generateContent({
            model: modelName,
            contents: userPrompt,
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                responseSchema: responseSchema,
                temperature: 0.9,
            },
        });

        const jsonStr = response.text.trim();
        const parsedJson = JSON.parse(jsonStr);

        if (parsedJson.variations && Array.isArray(parsedJson.variations)) {
            return parsedJson.variations;
        }
        
        throw new Error("Invalid JSON structure for character variations received from API.");
    };

    try {
        return await withRetry(apiCall, 3, 1000, 'generateCharacterPromptVariations');
    } catch (error) {
        throw new Error(getErrorMessage(error, 'generateCharacterPromptVariations', language));
    }
};


export const generateStoryIdea = async (
  animationStyle: string,
  storyStyle: string,
  language: Language,
  characterDescriptions: string,
  selectedModel: string,
  apiKey: string,
): Promise<string> => {
    const modelName = getModelName(selectedModel, language);
    const systemInstruction = translations[language].systemInstruction_generateStoryIdea(animationStyle, storyStyle, characterDescriptions);
    const userPrompt = "Please generate an animation story concept for the character(s) provided in the system instruction.";

    const apiCall = async () => {
        const ai = new GoogleGenAI({ apiKey });
        const response = await ai.models.generateContent({
            model: modelName,
            contents: userPrompt,
            config: {
                systemInstruction: systemInstruction,
                temperature: 0.9,
            }
        });
        return response.text.trim();
    };

  try {
     return await withRetry(apiCall, 3, 1000, 'generateStoryIdea');
  } catch (error) {
    throw new Error(getErrorMessage(error, 'generateStoryIdea', language));
  }
};


export const generateScript = async (
  storyIdea: string,
  config: VideoConfig,
  language: Language,
  characterDescriptions: string,
  selectedModel: string,
  apiKey: string,
): Promise<string> => {
    const modelName = getModelName(selectedModel, language);
    const systemInstruction = translations[language].systemInstruction_generateScript(config, characterDescriptions);

    const userPrompt = `
        **Animation Story Idea:**
        ${storyIdea}

        **Animation Style:** ${config.style}
    `;

    const apiCall = async () => {
        const ai = new GoogleGenAI({ apiKey });
        const response = await ai.models.generateContent({
            model: modelName,
            contents: userPrompt,
            config: {
                systemInstruction: systemInstruction,
                temperature: 0.9,
            }
        });
        return response.text.trim();
    };

  try {
    return await withRetry(apiCall, 3, 1000, 'generateScript');
  } catch (error) {
    throw new Error(getErrorMessage(error, 'generateScript', language));
  }
};

const SCENE_PROMPT_REQUIRED_FIELDS = [
    'scene_description', 'character_description', 'background_description', 
    'camera_shot', 'lighting', 'color_palette', 'style', 'composition_notes', 
    'sound_effects', 'dialogue', 'keywords', 'negative_prompts', 'aspect_ratio', 
    'duration_seconds'
];

const scenePromptSchema = {
    type: Type.OBJECT,
    properties: {
        scene_description: { type: Type.STRING },
        character_description: { type: Type.STRING },
        background_description: { type: Type.STRING },
        camera_shot: { type: Type.STRING },
        lighting: { type: Type.STRING },
        color_palette: { type: Type.STRING },
        style: { type: Type.STRING },
        composition_notes: { type: Type.STRING },
        sound_effects: { type: Type.STRING },
        dialogue: { type: Type.STRING },
        keywords: { type: Type.ARRAY, items: { type: Type.STRING } },
        negative_prompts: { type: Type.ARRAY, items: { type: Type.STRING } },
        aspect_ratio: { type: Type.STRING },
        duration_seconds: { type: Type.INTEGER },
    },
    required: SCENE_PROMPT_REQUIRED_FIELDS,
};

const scenesResponseSchema = {
    type: Type.OBJECT,
    properties: {
        scenes: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    scene_id: { type: Type.INTEGER },
                    time: { type: Type.STRING },
                    prompt: scenePromptSchema,
                },
                required: ['scene_id', 'time', 'prompt']
            }
        }
    },
    required: ['scenes']
};

export const generateScenePrompts = async (
  generatedScript: string,
  config: VideoConfig,
  language: Language,
  characterDescriptions: string,
  existingScenesCount: number,
  scenesPerBatch: number,
  selectedModel: string,
  apiKey: string,
): Promise<Scene[]> => {
    const modelName = getModelName(selectedModel, language);
    const startSceneId = existingScenesCount + 1;
    const systemInstruction = translations[language].systemInstruction_generateScenes(config, characterDescriptions, startSceneId, existingScenesCount, scenesPerBatch);
    
    const userPrompt = `
        **Full Animation Script to be Visualized:**
        ${generatedScript}

        **Animation Configuration:**
        - Total Duration: ${config.duration} seconds
        - Format: ${config.format}
        - Scenes to generate in this batch: ${scenesPerBatch}
    `;

    const apiCall = async () => {
        const ai = new GoogleGenAI({ apiKey });
        const response = await ai.models.generateContent({
            model: modelName,
            contents: userPrompt,
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                responseSchema: scenesResponseSchema,
                temperature: 0.9,
            }
        });
        
        const jsonStr = response.text.trim();
        const parsedJson = JSON.parse(jsonStr);

        if (parsedJson.scenes && Array.isArray(parsedJson.scenes)) {
            return parsedJson.scenes as Scene[];
        } else {
            console.warn("Received unexpected JSON structure. 'scenes' array not found.", parsedJson);
            return [];
        }
    };

    try {
        return await withRetry(apiCall, 3, 1500, 'generateScenePrompts');
    } catch (error) {
        throw new Error(getErrorMessage(error, 'generateScenePrompts', language));
    }
};
  
  export const generateSceneImage = async (scenePrompt: ScenePrompt, referenceImageBase64: string, language: Language, apiKey: string): Promise<string> => {
      const model = 'gemini-2.5-flash-image';
      
      const match = referenceImageBase64.match(/^data:(image\/.+);base64,(.+)$/);
      if (!match) {
          throw new Error("Invalid base64 image format provided for reference.");
      }
      const mimeType = match[1];
      const data = match[2];
  
      const imagePart = {
          inlineData: {
              mimeType,
              data,
          },
      };
      const textPart = {
          text: `Using the provided reference image for character and style consistency, create a single animation frame based on the following detailed JSON prompt: ${JSON.stringify(scenePrompt, null, 2)}`
      };
  
      const apiCall = async () => {
          const ai = new GoogleGenAI({ apiKey });
          const response: GenerateContentResponse = await ai.models.generateContent({
              model,
              contents: { parts: [imagePart, textPart] },
              config: {
                  responseModalities: [Modality.IMAGE],
              },
          });
  
          for (const part of response.candidates[0].content.parts) {
              if (part.inlineData) {
                  const base64ImageBytes: string = part.inlineData.data;
                  return `data:image/png;base64,${base64ImageBytes}`;
              }
          }
          throw new Error("No image data found in the response from the model.");
      };
      
      try {
        return await withRetry(apiCall, 3, 1500, 'generateSceneImage');
      } catch (error) {
        throw new Error(getErrorMessage(error, 'generateSceneImage', language));
      }
  };