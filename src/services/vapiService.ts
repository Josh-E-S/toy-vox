// Simple Vapi API integration service
import Vapi from "@vapi-ai/web";
import characters from '../config/characters';

// Event callback types
type VapiEventCallback = () => void;
type VapiVolumeCallback = (volume: number) => void;

// Initialize Vapi with API key and assistant ID from .env
// In Vite, we need to use import.meta.env instead of process.env
const VAPI_API_KEY = import.meta.env.VITE_VAPI_API_KEY;
const ASSISTANT_ID = import.meta.env.VITE_VAPI_ASSISTANT_ID;

// Keep track of the Vapi instance
let vapiInstance: any = null;

// Event callbacks
let onSpeechStartCallback: VapiEventCallback | null = null;
let onSpeechEndCallback: VapiEventCallback | null = null;
let onVolumeLevelCallback: VapiVolumeCallback | null = null;

export interface VapiCallParams {
  characterId: string;
  message?: string;
  onSpeechStart?: VapiEventCallback;
  onSpeechEnd?: VapiEventCallback;
  onVolumeLevel?: VapiVolumeCallback;
}

export interface VapiResponse {
  success: boolean;
  message?: string;
  error?: string;
}

// Audio effects for UI feedback
export const audioEffects = {
  detect: () => console.log("Playing detection sound"),
  connect: () => console.log("Playing connection sound"),
  disconnect: () => console.log("Playing disconnection sound"),
  magic: () => console.log("Playing magic sound")
};

/**
 * Initiate a call to the Vapi service
 */
export const initiateVapiCall = async (params: VapiCallParams): Promise<VapiResponse> => {
  try {
    const character = characters[params.characterId];
    
    if (!character) {
      return {
        success: false,
        error: `Character with ID ${params.characterId} not found`
      };
    }
    
    // Set up callbacks from params
    if (params.onSpeechStart) onSpeechStartCallback = params.onSpeechStart;
    if (params.onSpeechEnd) onSpeechEndCallback = params.onSpeechEnd;
    if (params.onVolumeLevel) onVolumeLevelCallback = params.onVolumeLevel;
    
    // Check if we have the required API key and assistant ID
    if (!VAPI_API_KEY) {
      return {
        success: false,
        error: "Vapi API key is missing in .env file"
      };
    }
    
    if (!ASSISTANT_ID) {
      return {
        success: false,
        error: "Vapi assistant ID is missing in .env file"
      };
    }
    
    // Initialize Vapi if not already done
    if (!vapiInstance) {
      vapiInstance = new Vapi(VAPI_API_KEY);
      
      // Set up event listeners for better UI integration
      vapiInstance.on("call-start", () => {
        console.log("Vapi call started");
      });
      
      vapiInstance.on("call-end", () => {
        console.log("Vapi call ended");
      });
      
      vapiInstance.on("error", (error: any) => {
        console.error("Vapi error:", error);
      });
      
      vapiInstance.on("transcript", (transcript: any) => {
        console.log("User said:", transcript);
      });
      
      vapiInstance.on("message", (message: any) => {
        // We can add other message handling here if needed in the future
        console.log("Vapi message:", message.type);
      });
      
      // Add speech event listeners for audio visualization
      vapiInstance.on("speech-start", () => {
        console.log("Assistant started speaking");
        if (onSpeechStartCallback) onSpeechStartCallback();
      });
      
      vapiInstance.on("speech-end", () => {
        console.log("Assistant stopped speaking");
        if (onSpeechEndCallback) onSpeechEndCallback();
      });
      
      vapiInstance.on("volume-level", (volume: number) => {
        // console.log(`Assistant volume level: ${volume}`);
        if (onVolumeLevelCallback) onVolumeLevelCallback(volume);
      });
    }
    
    // Start the call with your assistant ID
    vapiInstance.start(ASSISTANT_ID);
    
    return {
      success: true,
      message: character.greeting
    };
  } catch (error: any) {
    console.error("Error initiating Vapi call:", error);
    return {
      success: false,
      error: error.message || "Failed to initiate call"
    };
  }
};

/**
 * Send a message to Vapi
 * Note: This function is not needed with the Vapi Web SDK as it handles
 * the voice interaction automatically. Keeping it as a placeholder for
 * future programmatic message sending if needed.
 */
export const sendMessageToVapi = async (params: VapiCallParams): Promise<VapiResponse> => {
  try {
    const character = characters[params.characterId];
    
    if (!character) {
      return {
        success: false,
        error: `Character with ID ${params.characterId} not found`
      };
    }
    
    if (!params.message) {
      return {
        success: false,
        error: 'No message provided'
      };
    }
    
    // The Vapi SDK handles the voice interaction automatically
    // This function is just a placeholder for future programmatic message sending
    
    return {
      success: true,
      message: "Message received by assistant"
    };
  } catch (error: any) {
    console.error("Error sending message to Vapi:", error);
    return {
      success: false,
      error: error.message || "Failed to send message"
    };
  }
};

/**
 * End the current Vapi call
 */
export const endVapiCall = () => {
  if (vapiInstance) {
    vapiInstance.stop();
    console.log("Vapi call ended");
  }
};

/**
 * Register event handlers for Vapi speech events
 */
export const registerSpeechEventHandlers = ({
  onSpeechStart,
  onSpeechEnd,
  onVolumeLevel
}: {
  onSpeechStart?: VapiEventCallback;
  onSpeechEnd?: VapiEventCallback;
  onVolumeLevel?: VapiVolumeCallback;
}) => {
  onSpeechStartCallback = onSpeechStart || null;
  onSpeechEndCallback = onSpeechEnd || null;
  onVolumeLevelCallback = onVolumeLevel || null;
};

/**
 * Unregister all event handlers
 */
export const unregisterSpeechEventHandlers = () => {
  onSpeechStartCallback = null;
  onSpeechEndCallback = null;
  onVolumeLevelCallback = null;
};

export default {
  initiateVapiCall,
  sendMessageToVapi,
  endVapiCall,
  audioEffects,
  registerSpeechEventHandlers,
  unregisterSpeechEventHandlers
};
