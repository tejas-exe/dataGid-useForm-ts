export interface UserData {
  success: boolean;
  message: string;
  total_users: number;
  offset: number;
  limit: number;
  openEditForm: boolean;
  openDeletePopup: boolean;
  isEditable: boolean;
  users: User[];
  cellValue: FormValues;
}

export interface User {
  id: number;
  gender: string;
  date_of_birth: string;
  job: string;
  city: string;
  zipcode: string;
  latitude: number;
  profile_picture: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  street: string;
  state: string;
  country: string;
  longitude: number;
}

export interface FormValues {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  gender: string;
  date_of_birth: string;
  job: string;
  city: string;
  zipcode: string;
  street: string;
  state: string;
  country: string;
  profile_picture: string;
  phone: string;
  latitude: number;
  longitude: number;
}

export interface OpenModalPayload {
  component: 'openEditForm' | 'openDeletePopup';
  action: boolean;
  isEditable: boolean;
}

export interface FetchUserDataArgs {
  page: number;
  pageSize: number;
}
