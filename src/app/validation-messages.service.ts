import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationMessagesService {

  constructor() { }

  public getValidationMsg(validationId:string):any{
    // @ts-ignore
    return this.errorMessages[validationId]
  }

  private errorMessages = {
    'firstname-required-msg': 'Firstname is a required field',

    'lastname-required-msg': 'Lastname is a required field',

    'email-required-msg': 'Email is a required field',
    'email-email-msg': 'Email is not in valid format',
    'email-pattern-msg': 'Email is not in valid format',

    'password-required-msg': 'Password is a required field',
    'password-minlength-msg': 'Password must have 6 characters',

  }
}
