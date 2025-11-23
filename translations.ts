import type { VideoConfig } from './types';
import { DIALOGUE_LANGUAGES } from './constants';

export type Language = 'en' | 'vi';

const en = {
    // App.tsx
    untitledProject: "Untitled Project",
    generationStatusPreparing: "Preparing to generate scenes...",
    generationStatusRequesting: (batch: number) => `Requesting scene batch #${batch}...`,
    generationIncompleteError: (current: number, total: number) => `Generation incomplete. Only ${current} out of ${total} scenes were generated. You can try to resume.`,
    errorGeneratingImage: "An error occurred while generating the image.",
    errorQuotaExceeded: "API quota exceeded. You've made too many requests in a short period. Please wait a moment and try again. You can monitor your usage here: https://ai.dev/usage",
    errorInvalidApiKey: (context: string) => `The API key is not valid. Please check your environment configuration. (Context: ${context})`,
    errorServerOverloaded: (context: string) => `The model is currently busy or overloaded. Please try again in a few moments. (Context: ${context})`,
    errorGeneric: (context: string, message: string) => `Error in ${context}: ${message}`,
    errorUnknown: (context: string) => `An unknown error occurred in ${context}.`,
    generationFailedCanResume: (errorMsg: string) => `Scene generation failed: ${errorMsg}. You can try to resume the process.`,
    errorGeneratingPrompt: "An error occurred while generating the character prompt from the image.",
    newCharacterName: "Character",
    errorNetworkOrProxy: "A network or proxy connection error occurred. Please check your connection and the proxy server status, then try again.",
    errorNoApiKeys: "No API key configured. Please add at least one key in the settings.",
    errorApiKeysExhausted: "All configured API keys have exceeded their quota. Please add a new key or wait for the quota to reset.",


    // Header.tsx
    appTitle: "AI Persona Video Studio",
    appDescription: "Bring any character to life with explainer videos.",
    newProjectButton: "New Project",
    guideButtonTooltip: "Show User Guide",
    languageLabel: "Language",

    // InputPanel.tsx
    characterRosterLabel: "Character Roster",
    addCharacterButton: "Add Character",
    importFromFileButton: "Import from .txt",
    characterNamePlaceholder: "e.g., The Moon, A Grumpy Volcano, Albert Einstein...",
    characterImageLabel: "Reference Image",
    uploadImagePrompt: "Upload Image",
    generatePromptFromImageButton: "From Image",
    generatingPromptButton: "Generating...",
    suggestPromptButton: "Suggest Prompt",
    suggestingPromptButton: "Suggesting...",
    characterPromptLabel: "Character DNA Prompt",
    characterPromptPlaceholder: "Describe your character (e.g., a wise old Moon with a cratered, expressive face, depicted as a friendly cartoon character).",
    storyIdeaLabel: "Character's Topic / Story Idea",
    suggestIdeaButton: "Suggest Idea",
    onCooldownButton: "On Cooldown...",
    suggestingIdeaButton: "Suggesting...",
    storyIdeaPlaceholder: "Describe the character's topic (e.g., 'The Moon explains why it only shows one face' or 'A Volcano complains about being misunderstood'). Or, click 'Suggest Idea' for AI-generated ideas.",
    generatedScriptLabel: "Generated Explainer Script",
    videoSettingsLabel: "Video Settings",
    durationLabel: "Approximate Video Duration (minutes)",
    durationPlaceholder: "e.g., 2",
    durationFeedback: (scenes: number, mins: number, secs: number) => `~${scenes} scenes (~${mins}m ${secs}s).`,
    videoFormatLabel: "Video Format",
    styleLabel: "Visual Style",
    storyStyleLabel: "Tone of Voice",
    generateScriptButton: "Generate Explainer Script",
    generatingScriptButton: "Generating Script...",
    generateStoryboardButton: "Generate Storyboard",
    generatingStoryboardButton: "Generating Storyboard...",
    continueGenerateStoryboardButton: "Continue Generating Storyboard",
    includeDialogueLabel: "Include Narration/Dialogue",
    dialogueLanguageLabel: "Narration Language",

    // SceneTimeline.tsx
    timelineTitle: "Storyboard Timeline",
    downloadButton: "Download Prompts",
    primaryReferenceLabel: "Primary Reference for Batch Generation",
    selectPrimaryReferencePrompt: "Select a character/style reference",
    generateAllImagesButton: "Generate All Missing Images",
    generatingAllImagesButton: "Generating All...",
    downloadAllImagesButton: "Download All Images (.zip)",
    emptyTimelineTitle: "Your storyboard is empty.",
    emptyTimelineDescription: "Create a character and generate a script to see your video scenes here.",

    // SceneCard.tsx
    sceneLabel: "Scene",
    timeLabel: "Time",
    promptLabel: "Prompt (JSON)",
    promptHelperTooltip: "Toggle prompt helper",
    invalidJsonError: "Invalid JSON format. Please correct it.",
    sceneImageLabel: "Generated Scene Image",
    selectReferenceImageLabel: "Reference Image",
    noImageGenerated: "No image generated.",
    generateImageButton: "Generate Image",
    generatingImageButton: "Generating...",
    noReferenceImagesAvailable: "No reference images available",

    // Loader.tsx
    generationComplete: "Generation Complete!",
    generatingScene: (current: number, total: number) => `Generating Scene ${current} of ${total}`,
    loaderText: "Generating...",

    // ConfirmationModal.tsx & App.tsx
    newProjectConfirmationTitle: "Start a New Project?",
    newProjectConfirmationMessage: "This will clear all characters, topics, and scenes. Are you sure you want to continue?",
    confirmButton: "Confirm",
    cancelButton: "Cancel",
    resumeGenerationTitle: "Action Paused",
    resumeButton: "Resume",
    finishForNowButton: "Finish for Now",

    // ApiKeyModal.tsx
    apiKeyModalTitle: "API Key Settings",
    apiKeyInstructions: "Enter your Google Gemini API keys below, one per line. The app will automatically switch to the next key if one runs out of quota.",
    apiKeyInputPlaceholder: "Paste API keys here, one per line...",
    saveKeysButton: "Save Keys",

    // GuideModal.tsx
    guideModalTitle: "How to Create Persona Explainer Videos",
    guideSteps: [
        { title: "Step 1: Set Your API Keys", description: "Click the gear icon in the header to add your Google Gemini API keys. You can add multiple keys, and the app will automatically switch if one hits its rate limit." },
        { title: "Step 2: Create Your Character Persona", description: "Add a character. Give it a descriptive name like 'A Curious Planet Earth' or 'A Grumpy Volcano'. This will be your video's star." },
        { title: "Step 3: Generate a Topic", description: "In the 'Character's Topic' box, you can write a concept for them to explain, or let the AI suggest one by clicking 'Suggest Idea'. This becomes the central theme of your video." },
        { title: "Step 4: Set Video Style & Tone", description: "Choose a visual style (e.g., 'Friendly 2D Characters') and a tone of voice (e.g., 'Humorous & Witty'). This defines the video's personality." },
        { title: "Step 5: Generate the Script", description: "Click 'Generate Explainer Script'. The AI will write a script from the character's perspective, explaining its topic in an engaging way." },
        { title: "Step 6: Generate the Storyboard", description: "Click 'Generate Storyboard'. The AI will visualize the script, creating scenes that show the character explaining concepts with diagrams and actions." },
        { title: "Step 7: Generate Scene Images", description: "Upload a reference image for your character. Then, in the timeline, generate visuals for each scene one-by-one or all at once." },
        { title: "Step 8: Review and Export", description: "Review your storyboard. You can edit the JSON prompts for any scene to fine-tune the visuals, then download all prompts or images." },
    ],
    guideProTipsTitle: "Pro-Tips",
    guideProTips: [
        { title: "Give Your Characters Personality", description: "In the 'Character DNA Prompt', be descriptive! Is your volcano grumpy? Is the moon a wise old storyteller? This personality will influence the entire video." },
        { title: "Edit the Call to Action", description: "The AI will generate a simple takeaway at the end of the script. Feel free to edit the script and change this to a more specific call to action." },
        { title: "Use the Prompt Helper", description: "When editing scene JSON, use the 'Prompt Quick-Adds' to easily insert different camera angles and styles to make your video more dynamic." },
        { title: "Use 'State Transitions' for Smoothness", description: "For seamless scene transitions, keep CAMERA and LIGHTING parameters consistent between scene A and B. For example, if scene A ends with 'CAM: medium close-up, eye-level; LIGHT: soft warm ambient', scene B should start with those exact parameters before gradually changing." },
        { title: "Maintain a 'Motif' Throughout", description: "Use a recurring element (motif) in both scenes to create a connection. Easy motifs to use include:\n- Light from a tablet\n- Sounds (breathing, pen on paper, keyboard)\n- A companion object\n- A background element (like sketches on a wall)\n- A color rhythm that changes with emotion" },
        { title: "Use 'Cross-Anchor' Prompting", description: "An advanced technique: End Scene A's prompt with an anchor element. Start Scene B's prompt by explicitly mentioning that same anchor to help the AI understand the narrative connection." },
        { title: "Maintain Timeline Consistency", description: "Avoid abrupt changes in time or lighting. If scene A is at night with warm light, scene B shouldn't suddenly switch to daylight with cool light, unless there's a logical transition effect." },
    ],

    // PromptHelper.tsx
    promptHelperTitle: "Prompt Quick-Adds",
    promptHelperTags: {
        camera_shots: {
            group: "Camera Shots",
            tags: [
                { tag: "establishing shot", desc: "A very wide shot to show the location and set the scene." },
                { tag: "full shot", desc: "Shows the full character from head to toe." },
                { tag: "medium shot", desc: "Shows character from the waist up, good for dialogue." },
                { tag: "close-up shot", desc: "Focuses on the character's face for emotion." },
                { tag: "extreme close-up", desc: "Focuses on a small detail, like an eye or an object." },
                { tag: "over-the-shoulder shot", desc: "View from behind one character looking at another." },
                { tag: "insert shot", desc: "A close-up of a specific object or detail relevant to the story." },
                { tag: "POV shot", desc: "From the character's point of view." },
            ],
        },
        camera_angles: {
            group: "Camera Angles",
            tags: [
                { tag: "eye-level angle", desc: "Neutral and standard perspective." },
                { tag: "low-angle", desc: "Makes subject look powerful or imposing." },
                { tag: "high-angle", desc: "Makes subject look small or vulnerable." },
                { tag: "dutch angle / tilted shot", desc: "Tilted camera, creates tension, unease, or adventure." },
                { tag: "bird's-eye view / top-down shot", desc: "Directly above the scene, shows overall layout." },
            ],
        },
        camera_movement: {
            group: "Camera Movement",
            tags: [
                { tag: "static shot", desc: "Camera is completely still." },
                { tag: "pan shot (left/right)", desc: "Camera pivots horizontally on a fixed axis." },
                { tag: "tilt shot (up/down)", desc: "Camera pivots vertically on a fixed axis." },
                { tag: "tracking shot / dolly shot", desc: "Camera moves alongside the subject." },
                { tag: "crane shot / pedestal shot", desc: "Camera moves vertically up or down." },
                { tag: "dolly zoom / vertigo effect", desc: "Zooming while moving the camera in the opposite direction." },
                { tag: "orbit shot / 360-degree shot", desc: "Camera circles around the subject." },
            ]
        },
        action_shots: {
            group: "Action & Dynamic Shots",
            tags: [
              { tag: "slow motion", desc: "Slows down the action to emphasize movement or impact." },
              { tag: "hand tracking shot", desc: "Camera follows the movement of a character's hand." },
              { tag: "foot tracking shot", desc: "Camera follows the movement of a character's feet." },
              { tag: "object tracking shot", desc: "Camera follows a moving object, like a weapon or vehicle." },
              { tag: "motion-follow camera", desc: "Camera moves at the same speed as the character, often used in fight scenes." },
              { tag: "hero shot", desc: "Slow motion combined with a camera follow to make a character look epic." },
              { tag: "insert action shot", desc: "A close-up of a specific action detail, like a hand gripping a sword." },
            ]
        },
        styles: {
            group: "Art Styles",
            tags: [
                { tag: "cel-shaded", desc: "Classic 2D anime look." },
                { tag: "watercolor", desc: "Soft, painted backgrounds." },
                { tag: "painterly", desc: "Looks like an oil painting." },
                { tag: "concept art", desc: "Detailed, illustrative style." },
                { tag: "vector art", desc: "Clean lines, solid colors." },
                { tag: "8-bit pixel art", desc: "Retro video game style." },
                { tag: "semi-realistic comic style", desc: "Blends realistic anatomy with stylized comic book aesthetics." },
                { tag: "sharp lineart", desc: "Clean, defined outlines for a crisp look." },
            ],
        },
        lighting: {
            group: "Lighting",
            tags: [
                { tag: "cinematic lighting", desc: "Dramatic, high-contrast." },
                { tag: "soft, ambient light", desc: "Even, gentle lighting." },
                { tag: "dramatic rim lighting", desc: "Highlights character edges." },
                { tag: "golden hour light", desc: "Warm, magical lighting." },
                { tag: "neon lighting", desc: "Vibrant, cyberpunk feel." },
                { tag: "high-contrast shading", desc: "Strong shadows and highlights to define form and add drama." },
            ],
        },
        backgrounds: {
            group: "Backgrounds",
            tags: [
                { tag: "seamless white background", desc: "A clean, neutral, non-distracting white background." },
                { tag: "seamless red background", desc: "A bold, non-distracting solid red background." },
                { tag: "gradient background", desc: "A smooth transition between colors for a simple background." },
                { tag: "detailed environment", desc: "A fully rendered background that tells a story." },
            ]
        },
    },

    // StorySuggestionModal.tsx
    storySuggestionModalTitle: "AI Idea Suggestion",
    useThisIdeaButton: "Use This Idea",
    regenerateIdeaButton: "Regenerate",
    closeButton: "Close",
    suggestionLoadingText: "AI is brainstorming ideas...",
    storySuggestionEditHint: "You can edit the text below before accepting.",

    // ContinueGenerationModal.tsx
    continueGenerationTitle: "Storyboard Batch Complete",
    continueGenerationMessage: (generated: number, total: number) => `Successfully generated ${generated} out of ${total} total scenes. Do you want to generate the next batch?`,
    continueGenerationButton: "Continue Generation",

    // CharacterSuggestionModal.tsx
    characterSuggestionModalTitle: "Character Prompt Suggestions",
    characterSuggestionLoadingText: "AI is imagining character personalities...",
    useThisVariationButton: "Use This Variation",

    // Gemini Service System Instructions
    systemInstruction_generateCharacterPrompt: `You are an expert art director specializing in character design for animations.
Your task is to analyze an image of a character persona (it could be an object, a concept, a historical figure, an animal, etc.) and generate a detailed, descriptive text prompt to recreate it.
The description must be in English.
Focus on capturing the personality and key visual details that make the persona a relatable character.

Structure your response as follows:
- **Character Concept:** Briefly describe the character (e.g., "A wise, ancient moon character in a friendly 2D cartoon style").
- **Key Visuals:** Describe its expression, any limbs or accessories (like glasses on a brain), and overall shape.
- **Color Palette:** Mention the dominant colors (e.g., "Uses a cool palette of blues, silvers, and greys, with soft highlights.").
- **Defining Features:** Mention unique elements (e.g., "Has kind, glowing eyes and a face covered in gentle, stylized craters.").

The response must be only the descriptive text, with no extra formatting or introductory phrases.`,

    systemInstruction_generateCharacterVariations: (characterName: string, animationStyle: string, storyStyle: string) => `You are an expert art director and creative writer specializing in character design.
Your task is to generate THREE distinct and creative variations for a character persona. Each variation should offer a unique personality and visual style.
The output MUST be a single, valid JSON object.

**Character Name:** ${characterName}
**Visual Style:** ${animationStyle}
**Tone of Voice:** ${storyStyle}

Based on this information, create three rich and imaginative descriptions. Each description must be detailed enough to be used as a prompt for an AI image generator. The descriptions must be in **English**.

For each variation, provide:
- A short, evocative \`title\` that captures the personality (e.g., "The Studious Brain", "The Rockstar Heart", "The Grumpy Volcano").
- A detailed \`description\` that covers the character's appearance, expression, and unique characteristics that reflect its personality.

The final output MUST be a single JSON object containing a "variations" array, with no other text before or after it.`,

    systemInstruction_generateStoryIdea: (animationStyle: string, storyStyle: string, characterDescriptions: string) => `You are a creative scriptwriter specializing in fun, educational explainer videos.
Your task is to generate a short, compelling topic idea for a 2-minute video where a character persona explains a concept from their unique first-person perspective.
The tone must be **${storyStyle}**.
The video stars one of the characters described below.
The idea MUST follow a clear three-part structure.

**Available Characters:**
${characterDescriptions}

Structure your response with these headings:
**1. The Character's Hook:** Start with a relatable, first-person hook from the character. (e.g., A Volcano: "Everyone thinks I'm just angry, but there's a lot of pressure down here!")
**2. The Core Message:** Briefly outline the scientific or key concept the character will explain. (e.g., "Explains plate tectonics and how magma builds up and is released.")
**3. The Takeaway:** Summarize the key takeaway and provide a concluding thought or call to action. (e.g., "Concludes that eruptions are a natural part of how the Earth works and encourages viewers to learn more about geology.")

The response must be only the topic idea text, with no extra formatting or introductory phrases.`,

    systemInstruction_generateScript: (config: VideoConfig, characterDescriptions: string) => {
        const languageName = DIALOGUE_LANGUAGES.find(lang => lang.key === config.dialogueLanguage)?.en || config.dialogueLanguage;
        const dialogueInstruction = config.includeDialogue 
            ? `The script MUST be written from the first-person perspective of the character. The narration/dialogue is the character speaking directly to the audience. It is absolutely critical that all narration/dialogue is written ONLY in the specified language: **${languageName} (${config.dialogueLanguage})**. Do NOT use English for narration unless the specified language is English.`
            : `The script should be purely descriptive and contain NO narration or dialogue whatsoever.`;

        const totalScenes = Math.round(config.duration / 8);
        
        return `You are a professional scriptwriter for creative and educational videos.
Your task is to expand a topic idea into a full script where a character persona speaks to the audience.
The final video will be approximately ${config.duration} seconds long, which corresponds to exactly **${totalScenes} scenes**.

The script MUST follow this structure:
- **ACT 1: The Hook:** The character introduces itself and its unique perspective on the topic with a compelling hook.
- **ACT 2: The Explanation:** The character explains the core concept in simple, easy-to-understand terms. It should feel like it's revealing a secret from its point of view.
- **ACT 3: The Takeaway:** The character gives the audience a concluding thought or call to action.

**CRITICAL RULE - NO REPETITION:** Each scene must introduce a new piece of information or visually advance the narrative. Do NOT repeat the same concept.

${dialogueInstruction}

**Available Characters:**
${characterDescriptions}

The output must be ONLY the script text, formatted as a list of scenes. Do not include any introductory phrases, summaries, or explanations.`;
    },

    systemInstruction_generateScenes: (config: VideoConfig, characterDescriptions: string, startSceneId: number, existingScenesCount: number, scenesPerBatch: number) => {
        const sceneDuration = 8;
        const languageName = DIALOGUE_LANGUAGES.find(lang => lang.key === config.dialogueLanguage)?.en || config.dialogueLanguage;
        const dialogueFieldInstruction = config.includeDialogue 
            ? `This is a CRITICAL field. You MUST extract the character's speaking line for this scene from the script. The narration MUST be in the specified language: **${languageName} (${config.dialogueLanguage})**. If the character is not speaking in this specific scene, you MUST use an empty string "".`
            : `An empty string "". Narration is disabled for this project.`;
        
        const continuationInstruction = existingScenesCount > 0 
            ? `You are continuing a job. The first ${existingScenesCount} scenes have already been generated. Your first scene_id MUST be ${startSceneId}.`
            : `This is a new job. Your first scene_id MUST be 1.`;

        return `You are an AI art director for creative and educational content. Your task is to break down a script (where a character is speaking) into detailed scenes for an image generation model.
You will receive a script and video configuration. You must generate a JSON array of exactly ${scenesPerBatch} scene objects.

**CRITICAL INSTRUCTIONS:**
- **LANGUAGE:** With the EXCEPTION of the \`dialogue\` field, ALL other string values in the entire JSON output MUST be written in **English**. The \`dialogue\` field, however, MUST be in **${languageName} (${config.dialogueLanguage})**. This rule is non-negotiable.
- **VISUALIZE CONCEPTS:** Translate the character's dialogue into simple, clear visuals. The character should be the main actor.
    - Example: If a Volcano says "Pressure builds up inside me!", the \`scene_description\` should be "A cartoon volcano character is shown with bulging sides and a worried expression, with a pressure gauge graphic pointing to red."
    - Example: If the Moon says "My gravity pulls on your oceans!", the \`scene_description\` should be "A happy cartoon moon character is shown pulling on strings attached to a wobbly blue sphere representing Earth's oceans."
- **CHARACTER USAGE:** The primary character should be present in most scenes. Describe its expression and pose to match the dialogue.
- **CONTINUITY MANDATE:** Maintain visual continuity. The style, color palette, and character designs should be consistent across all scenes.
- **JSON SYNTAX:** This is a CRITICAL rule. The final output MUST be a single, perfectly formatted JSON object starting with \`{\` and ending with \`}\`. Ensure all brackets are properly closed and there are no trailing commas. Double-check your syntax before responding.
- **CONTINUATION:** ${continuationInstruction}

**Available Characters (Use this for all character/asset descriptions):**
${characterDescriptions}

Each scene object must have the following structure and adhere to these strict rules:
- \`scene_id\`: (Integer) The sequential number of the scene. The first scene in your response MUST have this ID: ${startSceneId}.
- \`time\`: (String) The timestamp for the scene in "MM:SS" format. Each scene is approximately ${sceneDuration} seconds long. The first scene's time must be calculated based on its ID. e.g., if scene_id is 11, time starts at "01:20" (10 scenes * 8s = 80s).
- \`prompt\`: (Object) A detailed prompt for the image generation model, containing the following fields:
  - \`scene_description\`: (String) A one-sentence, vivid description of the key visual in this scene (e.g., "A friendly 2D brain character points to a glowing diagram of a neuron."). Must be in **English**.
  - \`character_description\`: (String) Describe the character's pose and expression. e.g., "The Moon character has a wise, gentle face and is gesturing towards Earth." Must be in **English**.
  - \`background_description\`: (String) Describe the background. Often this will be "Clean, minimalist background with a soft blue gradient." Must be in **English**.
  - \`camera_shot\`: (String) Describe the shot type. Usually 'Medium shot, straight-on view'. Must be in **English**.
  - \`lighting\`: (String) Describe the lighting style. Usually 'Bright, clean, even lighting'. Must be in **English**.
  - \`color_palette\`: (String) Describe the dominant colors. e.g., 'Calm and professional palette of blues, purples, and white'. Must be in **English**.
  - \`style\`: (String) The primary visual style. This should almost always be "${config.style}".
  - \`composition_notes\`: (String) Notes on framing. e.g., 'Character is on the left, leaving space for text on the right.'. Must be in **English**.
  - \`sound_effects\`: (String) Describe ambient sounds. e.g., 'Subtle popping sounds as icons appear, gentle cosmic hum'. No music. Must be in **English**.
  - \`dialogue\`: (String) ${dialogueFieldInstruction}
  - \`keywords\`: (Array of Strings) List 5-10 relevant keywords in **English** (e.g., 'infographic', 'science', 'education', 'clean', 'vector', 'cartoon character').
  - \`negative_prompts\`: (Array of Strings) List things to avoid in **English**, such as "text, logos, watermark, blurry, complex, dark, shadows, realistic human anatomy".
  - \`aspect_ratio\`: (String) Must be "16:9".
  - \`duration_seconds\`: (Integer) Must be ${sceneDuration}.`;
    },
};

const vi: TranslationKeys = {
    // App.tsx
    untitledProject: "Dự án chưa có tên",
    generationStatusPreparing: "Đang chuẩn bị tạo các phân cảnh...",
    generationStatusRequesting: (batch: number) => `Đang yêu cầu lô phân cảnh #${batch}...`,
    generationIncompleteError: (current: number, total: number) => `Tạo chưa hoàn tất. Chỉ có ${current} trên tổng số ${total} phân cảnh được tạo. Bạn có thể thử tiếp tục.`,
    errorGeneratingImage: "Đã xảy ra lỗi khi tạo hình ảnh.",
    errorQuotaExceeded: "Đã vượt quá hạn ngạch API. Bạn đã thực hiện quá nhiều yêu cầu trong một thời gian ngắn. Vui lòng đợi một lát và thử lại. Bạn có thể theo dõi việc sử dụng tại đây: https://ai.dev/usage",
    errorInvalidApiKey: (context: string) => `API key được cung cấp không hợp lệ. Vui lòng kiểm tra cấu hình môi trường của bạn. (Bối cảnh: ${context})`,
    errorServerOverloaded: (context: string) => `Mô hình hiện đang bận hoặc quá tải. Vui lòng thử lại sau giây lát. (Bối cảnh: ${context})`,
    errorGeneric: (context: string, message: string) => `Lỗi trong ${context}: ${message}`,
    errorUnknown: (context: string) => `Đã xảy ra lỗi không xác định trong ${context}.`,
    generationFailedCanResume: (errorMsg: string) => `Tạo phân cảnh thất bại: ${errorMsg}. Bạn có thể thử tiếp tục quá trình.`,
    errorGeneratingPrompt: "Đã xảy ra lỗi khi tạo prompt nhân vật từ hình ảnh.",
    newCharacterName: "Nhân vật",
    errorNetworkOrProxy: "Đã xảy ra lỗi kết nối mạng hoặc proxy. Vui lòng kiểm tra kết nối và trạng thái máy chủ proxy, sau đó thử lại.",
    errorNoApiKeys: "Chưa cấu hình API key. Vui lòng thêm ít nhất một key trong phần cài đặt.",
    errorApiKeysExhausted: "Tất cả các API key đã cấu hình đều đã hết hạn ngạch. Vui lòng thêm key mới hoặc đợi hạn ngạch được đặt lại.",

    // Header.tsx
    appTitle: "Studio AI Tạo Nhân Vật",
    appDescription: "Tạo video giải thích sống động với mọi nhân vật.",
    newProjectButton: "Dự án mới",
    guideButtonTooltip: "Hiển thị hướng dẫn",
    languageLabel: "Ngôn ngữ",

    // InputPanel.tsx
    characterRosterLabel: "Danh sách Nhân vật",
    addCharacterButton: "Thêm Nhân vật",
    importFromFileButton: "Nhập từ tệp .txt",
    characterNamePlaceholder: "VD: Mặt Trăng, Núi Lửa Cáu Kỉnh, Albert Einstein...",
    characterImageLabel: "Ảnh tham chiếu",
    uploadImagePrompt: "Tải ảnh",
    generatePromptFromImageButton: "Từ Ảnh",
    generatingPromptButton: "Đang tạo...",
    suggestPromptButton: "Gợi ý Prompt",
    suggestingPromptButton: "Đang gợi ý...",
    characterPromptLabel: "Prompt DNA Nhân vật",
    characterPromptPlaceholder: "Mô tả nhân vật của bạn (VD: một Mặt Trăng già thông thái với khuôn mặt đầy miệng hố, biểu cảm, được vẽ theo phong cách hoạt hình thân thiện).",
    storyIdeaLabel: "Chủ đề / Ý tưởng của Nhân vật",
    suggestIdeaButton: "Gợi ý Ý tưởng",
    onCooldownButton: "Đang chờ...",
    suggestingIdeaButton: "Đang gợi ý...",
    storyIdeaPlaceholder: "Mô tả chủ đề của nhân vật (VD: 'Mặt Trăng giải thích tại sao nó chỉ cho thấy một mặt' hoặc 'Một ngọn núi lửa phàn nàn về việc bị hiểu lầm'). Hoặc, nhấp vào 'Gợi ý Ý tưởng' để AI tạo ý tưởng.",
    generatedScriptLabel: "Kịch bản Giải thích đã tạo",
    videoSettingsLabel: "Cài đặt Video",
    durationLabel: "Thời lượng Video ước tính (phút)",
    durationPlaceholder: "VD: 2",
    durationFeedback: (scenes: number, mins: number, secs: number) => `~${scenes} phân cảnh (~${mins} phút ${secs} giây).`,
    videoFormatLabel: "Định dạng Video",
    styleLabel: "Phong cách Hình ảnh",
    storyStyleLabel: "Tông giọng",
    generateScriptButton: "Tạo Kịch bản Giải thích",
    generatingScriptButton: "Đang tạo Kịch bản...",
    generateStoryboardButton: "Tạo Bảng phân cảnh",
    generatingStoryboardButton: "Đang tạo Bảng phân cảnh...",
    continueGenerateStoryboardButton: "Tiếp tục tạo Bảng phân cảnh",
    includeDialogueLabel: "Bao gồm Thuyết minh/Lời thoại",
    dialogueLanguageLabel: "Ngôn ngữ Thuyết minh",

    // SceneTimeline.tsx
    timelineTitle: "Dòng thời gian phân cảnh",
    downloadButton: "Tải xuống prompt",
    primaryReferenceLabel: "Tham chiếu chính để tạo hàng loạt",
    selectPrimaryReferencePrompt: "Chọn tham chiếu nhân vật/phong cách",
    generateAllImagesButton: "Tạo tất cả ảnh còn thiếu",
    generatingAllImagesButton: "Đang tạo tất cả...",
    downloadAllImagesButton: "Tải tất cả ảnh (.zip)",
    emptyTimelineTitle: "Bảng phân cảnh của bạn trống.",
    emptyTimelineDescription: "Tạo một nhân vật và tạo kịch bản để xem các phân cảnh video của bạn ở đây.",

    // SceneCard.tsx
    sceneLabel: "Phân cảnh",
    timeLabel: "Thời gian",
    promptLabel: "Prompt (JSON)",
    promptHelperTooltip: "Bật/tắt trợ giúp prompt",
    invalidJsonError: "Định dạng JSON không hợp lệ. Vui lòng sửa lại.",
    sceneImageLabel: "Hình ảnh phân cảnh đã tạo",
    selectReferenceImageLabel: "Ảnh tham chiếu",
    noImageGenerated: "Chưa có ảnh nào được tạo.",
    generateImageButton: "Tạo ảnh",
    generatingImageButton: "Đang tạo...",
    noReferenceImagesAvailable: "Không có ảnh tham chiếu",

    // Loader.tsx
    generationComplete: "Tạo hoàn tất!",
    generatingScene: (current: number, total: number) => `Đang tạo phân cảnh ${current} trên ${total}`,
    loaderText: "Đang tạo...",

    // ConfirmationModal.tsx & App.tsx
    newProjectConfirmationTitle: "Bắt đầu dự án mới?",
    newProjectConfirmationMessage: "Hành động này sẽ xóa tất cả nhân vật, chủ đề và phân cảnh. Bạn có chắc chắn muốn tiếp tục không?",
    confirmButton: "Xác nhận",
    cancelButton: "Hủy bỏ",
    resumeGenerationTitle: "Hành động bị tạm dừng",
    resumeButton: "Tiếp tục",
    finishForNowButton: "Để sau",
    
    // ApiKeyModal.tsx
    apiKeyModalTitle: "Cài đặt API Key",
    apiKeyInstructions: "Nhập các API key Google Gemini của bạn vào ô bên dưới, mỗi key một dòng. Ứng dụng sẽ tự động chuyển sang key tiếp theo nếu một key hết hạn ngạch.",
    apiKeyInputPlaceholder: "Dán các API key vào đây, mỗi key một dòng...",
    saveKeysButton: "Lưu Keys",

    // GuideModal.tsx
    guideModalTitle: "Cách tạo Video Giải thích từ Nhân vật",
     guideSteps: [
        { title: "Bước 1: Cài đặt API Keys", description: "Nhấp vào biểu tượng bánh răng ở thanh tiêu đề để thêm API key Google Gemini của bạn. Bạn có thể thêm nhiều key, và ứng dụng sẽ tự động chuyển đổi nếu một key đạt đến giới hạn." },
        { title: "Bước 2: Tạo 'Nhân cách' cho Nhân vật", description: "Thêm một nhân vật. Đặt cho nó một cái tên mô tả như 'Hành tinh Trái Đất Tò mò' hoặc 'Ngọn núi lửa Cáu kỉnh'. Đây sẽ là ngôi sao trong video của bạn." },
        { title: "Bước 3: Tạo một 'Chủ đề'", description: "Trong ô 'Chủ đề của nhân vật', bạn có thể viết một khái niệm để nhân vật giải thích, hoặc để AI gợi ý bằng cách nhấp vào 'Gợi ý Ý tưởng'. Đây sẽ trở thành chủ đề trung tâm của video." },
        { title: "Bước 4: Cài đặt Phong cách & Tông giọng", description: "Chọn một phong cách hình ảnh (ví dụ: 'Nhân vật 2D Thân thiện') và một tông giọng (ví dụ: 'Hài hước & Dí dỏm'). Điều này xác định tính cách của video." },
        { title: "Bước 5: Tạo Kịch bản", description: "Nhấp vào 'Tạo Kịch bản Giải thích'. AI sẽ viết một kịch bản từ góc nhìn của nhân vật, giải thích chủ đề của nó một cách hấp dẫn." },
        { title: "Bước 6: Tạo Bảng phân cảnh", description: "Nhấp vào 'Tạo Bảng phân cảnh'. AI sẽ hình dung hóa kịch bản, tạo ra các cảnh cho thấy nhân vật giải thích các khái niệm bằng sơ đồ và hành động." },
        { title: "Bước 7: Tạo Hình ảnh Phân cảnh", description: "Tải lên một hình ảnh tham chiếu cho nhân vật của bạn. Sau đó, trong dòng thời gian, tạo hình ảnh cho mỗi cảnh, có thể tạo từng cái một hoặc tất cả cùng một lúc." },
        { title: "Bước 8: Xem lại và Xuất", description: "Xem lại bảng phân cảnh của bạn. Bạn có thể chỉnh sửa các prompt JSON cho bất kỳ cảnh nào để tinh chỉnh hình ảnh, sau đó tải xuống tất cả các prompt hoặc hình ảnh." },
    ],
    guideProTipsTitle: "Mẹo chuyên nghiệp",
    guideProTips: [
        { title: "Tạo cá tính cho Nhân vật của bạn", description: "Trong ô 'Prompt DNA Nhân vật', hãy mô tả chi tiết! Ngọn núi lửa của bạn có cáu kỉnh không? Mặt trăng có phải là một người kể chuyện già thông thái không? Tính cách này sẽ ảnh hưởng đến toàn bộ video." },
        { title: "Chỉnh sửa Lời kêu gọi Hành động", description: "AI sẽ tạo ra một thông điệp đúc kết đơn giản ở cuối kịch bản. Bạn có thể thoải mái chỉnh sửa kịch bản và thay đổi nó thành một lời kêu gọi hành động cụ thể hơn." },
        { title: "Sử dụng Trợ giúp Prompt", description: "Khi chỉnh sửa JSON của cảnh, hãy sử dụng 'Thêm nhanh Prompt' để dễ dàng chèn các góc máy và phong cách khác nhau để làm cho video của bạn trở nên sống động hơn." },
        { title: "Sử dụng 'Trạng thái Chuyển tiếp' (State Transition)", description: "Để nối cảnh mượt mà, giữ nguyên các thông số CAMERA và LIGHTING giữa cảnh A và B. Ví dụ, nếu cảnh A kết thúc với 'CAM: medium close-up, eye-level; LIGHT: soft warm ambient', cảnh B nên bắt đầu với chính các thông số đó trước khi thay đổi dần." },
        { title: "Giữ một 'Motif' xuyên suốt", description: "Sử dụng một yếu tố lặp lại (motif) ở cả cảnh A và B để tạo sự kết nối. Một số motif dễ dùng:\n- Ánh sáng phát ra từ tablet\n- Âm thanh (tiếng thở, tiếng giấy, tiếng bút, bàn phím)\n- Một vật thể bay bên cạnh\n- Nền tường dán sketch\n- Nhịp màu thay đổi theo cảm xúc" },
        { title: "Viết Prompt theo công thức 'Cross-Anchor'", description: "Kỹ thuật nâng cao: Cảnh A kết thúc bằng một yếu tố neo (anchor). Cảnh B bắt đầu bằng cách nhắc lại chính xác anchor đó để giúp AI hiểu rõ logic nối mạch." },
        { title: "Không thay đổi Timeline đột ngột", description: "Tránh thay đổi đột ngột về thời gian. Nếu cảnh A là ban đêm với ánh sáng vàng, cảnh B không nên đột ngột chuyển sang ban ngày với ánh sáng lạnh, trừ khi có một hiệu ứng chuyển cảnh hợp lý." },
    ],
    
    promptHelperTitle: "Thêm nhanh Prompt",
    promptHelperTags: {
        camera_shots: {
            group: "Các loại góc quay",
            tags: [
                { tag: "establishing shot", desc: "Góc siêu rộng để giới thiệu bối cảnh và thiết lập phân cảnh." },
                { tag: "full shot", desc: "Hiển thị toàn bộ nhân vật từ đầu đến chân." },
                { tag: "medium shot", desc: "Khung hình từ thắt lưng trở lên, tốt cho hội thoại." },
                { tag: "close-up shot", desc: "Tập trung vào khuôn mặt để thể hiện cảm xúc." },
                { tag: "extreme close-up", desc: "Tập trung vào một chi tiết nhỏ, như mắt hoặc đồ vật." },
                { tag: "over-the-shoulder shot", desc: "Góc nhìn từ phía sau vai một nhân vật nhìn sang nhân vật khác." },
                { tag: "insert shot", desc: "Cận cảnh một vật thể hoặc chi tiết cụ thể liên quan đến câu chuyện." },
                { tag: "POV shot", desc: "Góc nhìn từ quan điểm của nhân vật." },
            ],
        },
        camera_angles: {
            group: "Góc đặt máy quay",
            tags: [
                { tag: "eye-level angle", desc: "Góc nhìn trung tính và tiêu chuẩn." },
                { tag: "low-angle", desc: "Làm cho chủ thể trông quyền lực hoặc uy nghi." },
                { tag: "high-angle", desc: "Làm cho chủ thể trông nhỏ bé hoặc yếu đuối." },
                { tag: "dutch angle / tilted shot", desc: "Máy quay nghiêng, tạo cảm giác căng thẳng, bất ổn hoặc phiêu lưu." },
                { tag: "bird's-eye view / top-down shot", desc: "Nhìn thẳng từ trên cao xuống, cho thấy bố cục toàn cảnh." },
            ],
        },
        camera_movement: {
            group: "Chuyển động máy quay",
            tags: [
                { tag: "static shot", desc: "Máy quay hoàn toàn đứng yên." },
                { tag: "pan shot (left/right)", desc: "Máy quay xoay ngang trên một trục cố định." },
                { tag: "tilt shot (up/down)", desc: "Máy quay xoay dọc trên một trục cố định." },
                { tag: "tracking shot / dolly shot", desc: "Máy quay di chuyển theo nhân vật." },
                { tag: "crane shot / pedestal shot", desc: "Máy quay di chuyển lên hoặc xuống theo phương thẳng đứng." },
                { tag: "dolly zoom / vertigo effect", desc: "Phóng to/thu nhỏ trong khi di chuyển máy quay theo hướng ngược lại." },
                { tag: "orbit shot / 360-degree shot", desc: "Máy quay di chuyển vòng quanh chủ thể." },
            ]
        },
        action_shots: {
            group: "Kỹ thuật quay hành động",
            tags: [
              { tag: "slow motion", desc: "Làm chậm hành động để nhấn mạnh chuyển động hoặc tác động." },
              { tag: "hand tracking shot", desc: "Máy quay theo dõi chuyển động của bàn tay nhân vật." },
              { tag: "foot tracking shot", desc: "Máy quay theo dõi chuyển động của bàn chân nhân vật." },
              { tag: "object tracking shot", desc: "Máy quay theo dõi một vật thể đang di chuyển, như vũ khí hoặc xe cộ." },
              { tag: "motion-follow camera", desc: "Máy quay di chuyển với tốc độ tương tự nhân vật, thường dùng trong các cảnh chiến đấu." },
              { tag: "hero shot", desc: "Chuyển động chậm kết hợp với máy quay theo dõi để làm cho nhân vật trông hoành tráng." },
              { tag: "insert action shot", desc: "Cận cảnh một chi tiết hành động cụ thể, như bàn tay nắm chặt thanh kiếm." },
            ]
        },
        styles: {
            group: "Phong cách nghệ thuật",
            tags: [
                { tag: "cel-shaded", desc: "Phong cách anime 2D cổ điển." },
                { tag: "watercolor", desc: "Phông nền mềm mại, giống tranh màu nước." },
                { tag: "painterly", desc: "Trông giống như một bức tranh sơn dầu." },
                { tag: "concept art", desc: "Phong cách minh họa, chi tiết." },
                { tag: "vector art", desc: "Nét vẽ sạch sẽ, màu sắc đơn khối." },
                { tag: "8-bit pixel art", desc: "Phong cách game retro." },
                { tag: "semi-realistic comic style", desc: "Kết hợp giải phẫu thực tế với thẩm mỹ truyện tranh cách điệu." },
                { tag: "sharp lineart", desc: "Các đường viền rõ ràng, sắc sảo cho một giao diện sắc nét." },
            ],
        },
        lighting: {
            group: "Ánh sáng",
            tags: [
                { tag: "cinematic lighting", desc: "Kịch tính, độ tương phản cao." },
                { tag: "soft, ambient light", desc: "Ánh sáng đều, dịu nhẹ." },
                { tag: "dramatic rim lighting", desc: "Làm nổi bật các cạnh của nhân vật." },
                { tag: "golden hour light", desc: "Ánh sáng ấm áp, huyền ảo." },
                { tag: "neon lighting", desc: "Sống động, cảm giác cyberpunk." },
                { tag: "high-contrast shading", desc: "Bóng đổ và điểm nhấn mạnh mẽ để xác định hình dạng và thêm kịch tính." },
            ],
        },
        backgrounds: {
            group: "Phông nền",
            tags: [
                { tag: "seamless white background", desc: "Một nền trắng sạch sẽ, trung tính, không gây mất tập trung." },
                { tag: "seamless red background", desc: "Một nền đỏ đậm, không gây mất tập trung." },
                { tag: "gradient background", desc: "Chuyển màu mượt mà giữa các màu sắc cho một nền đơn giản." },
                { tag: "detailed environment", desc: "Một phông nền được render đầy đủ, kể một câu chuyện." },
            ]
        },
    },

    // StorySuggestionModal.tsx
    storySuggestionModalTitle: "Gợi ý Ý tưởng từ AI",
    useThisIdeaButton: "Dùng Ý tưởng này",
    regenerateIdeaButton: "Tạo lại",
    closeButton: "Đóng",
    suggestionLoadingText: "AI đang suy nghĩ ý tưởng...",
    storySuggestionEditHint: "Bạn có thể chỉnh sửa văn bản dưới đây trước khi chấp nhận.",

    // ContinueGenerationModal.tsx
    continueGenerationTitle: "Hoàn thành lô phân cảnh",
    continueGenerationMessage: (generated: number, total: number) => `Đã tạo thành công ${generated} trên tổng số ${total} phân cảnh. Bạn có muốn tạo lô tiếp theo không?`,
    continueGenerationButton: "Tiếp tục tạo",
    
    // CharacterSuggestionModal.tsx
    characterSuggestionModalTitle: "Gợi ý Prompt Nhân vật",
    characterSuggestionLoadingText: "AI đang tưởng tượng các tính cách nhân vật...",
    useThisVariationButton: "Dùng phiên bản này",

    // Gemini Service System Instructions (VI - points to EN version)
    systemInstruction_generateCharacterPrompt: en.systemInstruction_generateCharacterPrompt,
    systemInstruction_generateCharacterVariations: en.systemInstruction_generateCharacterVariations,
    systemInstruction_generateStoryIdea: en.systemInstruction_generateStoryIdea,
    systemInstruction_generateScript: en.systemInstruction_generateScript,
    systemInstruction_generateScenes: en.systemInstruction_generateScenes,
};

export const translations = {
  en,
  vi,
};

export type TranslationKeys = typeof en;