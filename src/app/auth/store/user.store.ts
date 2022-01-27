import { Store, StoreConfig } from '@datorama/akita';
import {Injectable} from "@angular/core";

export interface UserState {
  firstname: string,
  id: number,
  lastname: string,
  email: string,
  password: string,
  api_token: string,
}

export function createInitialState(): UserState {
  return {
    firstname: 'User',
    id: 1,
    lastname: '',
    email: '',
    password: '',
    api_token: '',
  };
}

@Injectable({providedIn: 'root'})
@StoreConfig({ name: 'session' })
export class UserStore extends Store<UserState> {
  constructor() {
    super(createInitialState());
  }
}
