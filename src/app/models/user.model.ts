export enum UserRole {
  Admin = 'Admin',
  Staff = 'Staff',
}

export enum UserPermission {
  CanCreateUser = 'CanCreateUser',
  CanReadUser = 'CanReadUser',
  CanUpdateUser = 'CanUpdateUser',
  CanDeleteUser = 'CanDeleteUser',
  CanViewProtectedRoute1 = 'CanViewProtectedRoute1',
  CanViewProtectedRoute2 = 'CanViewProtectedRoute2',
}



export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    }
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
  role: UserRole; 
  permissions?: UserPermission[]; 
  
}
