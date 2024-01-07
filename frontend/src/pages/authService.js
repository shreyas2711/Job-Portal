// authService.js

const authService = {
    authenticate: async (credentials) => {
      // Mock authentication logic
      const { email, password } = credentials;
      if (email === 'user@example.com' && password === 'password') {
        return 'mockAuthToken';
      } else {
        throw new Error('Invalid credentials');
      }
    },
  };
  
  export default authService;
  