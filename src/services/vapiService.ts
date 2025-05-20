// Vapi API integration service

/**
 * Service for interacting with Vapi voice API
 * In a production environment, this would make actual API calls to Vapi
 * For the prototype, we'll simulate the API responses
 */

import characters from '../config/characters';

export interface VapiCallParams {
  characterId: string;
  message?: string;
}

export interface VapiResponse {
  success: boolean;
  message?: string;
  error?: string;
}

// Simulated audio effects
export const audioEffects = {
  detect: () => console.log("Playing detection sound"),
  connect: () => console.log("Playing connection sound"),
  disconnect: () => console.log("Playing disconnection sound"),
  magic: () => console.log("Playing magic sound")
};

/**
 * Simulate initiating a call to the Vapi service
 */
export const initiateVapiCall = async (params: VapiCallParams): Promise<VapiResponse> => {
  // Simulate API call with a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      const character = characters[params.characterId];
      
      if (!character) {
        resolve({
          success: false,
          error: `Character with ID ${params.characterId} not found`
        });
        return;
      }
      
      resolve({
        success: true,
        message: character.greeting
      });
    }, 1500); // Simulate network delay
  });
};

/**
 * Simulate sending a message to Vapi
 */
export const sendMessageToVapi = async (params: VapiCallParams): Promise<VapiResponse> => {
  // Simulate API call with a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      const character = characters[params.characterId];
      
      if (!character) {
        resolve({
          success: false,
          error: `Character with ID ${params.characterId} not found`
        });
        return;
      }
      
      if (!params.message) {
        resolve({
          success: false,
          error: 'No message provided'
        });
        return;
      }
      
      // Generate a simulated response based on the message
      const responses = [
        "I've had so many adventures! Once, I traveled across the Fluffy Mountains to find the legendary Rainbow Crystal!",
        "I love playing hide and seek with my friends in the Magical Forest. What games do you like?",
        "Of course! Once upon a time, there was a brave little toy who made friends with all the creatures in the garden...",
        "Oh yes! I have many friends in Toy Kingdom. There's Princess Sparkle, Robot Rex, and Fluffy Dragon!"
      ];
      
      resolve({
        success: true,
        message: responses[Math.floor(Math.random() * responses.length)]
      });
    }, 2000); // Simulate processing delay
  });
};

/**
 * In a real implementation, this would connect to the Vapi API
 * For now, we'll export the simulated functions
 */
export default {
  initiateVapiCall,
  sendMessageToVapi,
  audioEffects
};
