export interface UserResponse {
  ok:boolean;
  user?:         AuthResponse;
  access_token?: string;
}

export interface AuthResponse {
  id?:         string;
  name?:       string;
  email?:      string;
}

export interface Usuario{
  id:string;
  name:string;
}

export interface Vehiculos {
  cars: Car[];
}

export interface Car {
  id:         string;
  placa:      string;
  tipo:       string;
  marca:      string;
  linea:      string;
  modelo:     string;
  updated_at: Date;
  created_at: Date;
}

export interface insert {
  message: string;
  cars:    string;
}
