import { Component } from '@angular/core';

@Component({
  selector: 'app-first-task',
  templateUrl: './first-task.component.html',
  styleUrl: './first-task.component.scss',
})
export class FirstTaskComponent {
  password = '';

  validatePassword(password: string): void {
    let result = '';
    let isValid = true;

    const rules = [
      {
        test: (password: string) =>
          password.length >= 6 && password.length <= 24,
        message: 'Password must be between 6 and 24 characters long',
      },
      {
        test: (password: string) => /[A-Z]/.test(password),
        message: 'Password must contain at least one uppercase letter (A-Z)',
      },
      {
        test: (password: string) => /[a-z]/.test(password),
        message: 'Password must contain at least one lowercase letter (a-z)',
      },
      {
        test: (password: string) => /[0-9]/.test(password),
        message: 'Password must contain at least one digit (0-9).',
      },
      {
        test: (password: string) => !/(.)\1{2,}/.test(password),
        message:
          'Password must not contain more than 2 repeated characters in a row',
      },
      {
        test: (password: string) =>
          (password.match(/[!\"#$%&'()*=?+@{}[\]:;]/g) || []).length >= 2,
        message:
          'Password must contain at least two special characters: (! " # $ % & ‘ ( ) = * ? + @ { } [ ] : ;)',
      },
    ];

    rules.forEach((rule) => {
      if (!rule.test(password)) {
        result += `${rule.message}\n`;
        isValid = false;
      }
    });

    if (isValid) {
      console.log('Password is valid');
      return;
    }

    console.log(result);
  }
}
