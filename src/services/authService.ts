// Auth Service - Replace with real backend implementation later
// Currently uses a mock implementation for development

export interface AuthResponse {
  success: boolean;
  error?: string;
}

// TODO: Replace this mock implementation with real backend API call
// Example integration points:
// - Supabase Auth
// - Firebase Auth
// - Custom JWT backend
export const resetPassword = async (token: string, newPassword: string): Promise<AuthResponse> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Mock implementation - log details to console
  console.log('=== MOCK PASSWORD RESET ===');
  console.log('Token:', token);
  console.log('New Password Length:', newPassword.length);
  console.log('===========================');

  // Validate token (mock validation - just check length)
  if (token.length !== 64) {
    return {
      success: false,
      error: "Ungültiger oder abgelaufener Token",
    };
  }

  // TODO: Replace with actual API call to backend
  /*
  // Example real implementation:
  const response = await fetch('/api/auth/reset-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      token,
      newPassword,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    return { success: false, error: error.message };
  }

  return { success: true };
  */

  return { success: true };
};

// TODO: Replace with real backend API call
export const changePassword = async (
  email: string,
  currentPassword: string,
  newPassword: string
): Promise<AuthResponse> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Mock implementation - log details to console
  console.log("=== MOCK PASSWORD CHANGE ===");
  console.log("Email:", email);
  console.log("Current Password provided:", currentPassword.length > 0);
  console.log("New Password Length:", newPassword.length);
  console.log("============================");

  // Mock validation - check if current password matches stored password
  const MOCK_USERS_KEY = "lageplaner_mock_users";
  const usersData = localStorage.getItem(MOCK_USERS_KEY);
  const users: Record<string, { password: string; name: string; emailVerified: boolean }> = 
    usersData ? JSON.parse(usersData) : {};

  if (!users[email]) {
    return {
      success: false,
      error: "Benutzer nicht gefunden",
    };
  }

  if (users[email].password !== currentPassword) {
    return {
      success: false,
      error: "Aktuelles Passwort ist falsch",
    };
  }

  // Update password
  users[email].password = newPassword;
  localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users));

  return { success: true };
};
