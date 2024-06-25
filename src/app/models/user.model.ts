
  // src/app/models/user.model.ts

export interface User {
    id: number;
    username: string;
    email: string;
    name: string;
    role: string;
    permissions: string[]; // Adjust permissions type as per your application
  }
  
  