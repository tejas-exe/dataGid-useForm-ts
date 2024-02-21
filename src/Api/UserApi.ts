import axios from 'axios';
import { UserData } from '../Types/users-types';

const BASE_URL = 'https://api.slingacademy.com/v1/sample-data';

export class UserApi {
  static async fetchUser(page: number, pageSize: number): Promise<UserData> {
    const { data } = await axios.get<UserData>(
      `${BASE_URL}/users?offset=${page * pageSize}&limit=${pageSize}`,
    );
    return data;
  }
}
