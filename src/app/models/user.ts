export interface Roles {
  inmobiliaria: boolean;
  clinte: boolean;
}

export interface User {
  id?: string;
  email?: string;
  password?: string;
  roles?: Roles;
}
