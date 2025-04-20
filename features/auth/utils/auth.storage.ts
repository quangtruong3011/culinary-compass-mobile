import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "auth_token";
const REFRESH_TOKEN_KEY = "refresh_token";

type AuthTokens = {
  accessToken: string | null;
  refreshToken: string | null;
};

export async function saveAuthTokens(
  accessToken: string,
  refreshToken: string
): Promise<void> {
  try {
    if (typeof accessToken !== 'string' || typeof refreshToken !== 'string') {
      throw new Error('Tokens must be strings');
    }

    await SecureStore.setItemAsync(TOKEN_KEY, accessToken);
    await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refreshToken);
  } catch (error) {
    console.error('Failed to save auth tokens:', error);
    throw error;
  }
}

export async function getAuthTokens(): Promise<AuthTokens> {
  try {
    const accessToken = await SecureStore.getItemAsync(TOKEN_KEY);
    const refreshToken = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
    
    return {
      accessToken,
      refreshToken
    };
  } catch (error) {
    console.error('Failed to get auth tokens:', error);
    throw error;
  }
}

export async function removeAuthTokens(): Promise<void> {
  try {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
  } catch (error) {
    console.error('Failed to remove auth tokens:', error);
    throw error;
  }
}