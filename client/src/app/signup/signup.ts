import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.html',
    styleUrls: ['./signup.css'],
    standalone: true,
    imports: [FormsModule, CommonModule]
})
export class Signup {
    email = '';
    password = '';
    confirmPassword = '';
    username = '';
    errorMessage = '';
    successMessage = '';


    constructor(private authService: AuthService, private router: Router) { }

    signup() {
        this.errorMessage = '';
        if (this.password !== this.confirmPassword) {
            this.errorMessage = 'Passwords do not match.';
            return;
        }
        this.authService.signup({ email: this.email, password: this.password, username: this.username }).subscribe({
            next: (res: any) => {
                console.log(res)
                this.successMessage = "✅ Account Created Successfully";
                setTimeout(() => {
                    this.router.navigate(['/login']);
                }, 1000);
            },
            error: (err) => {
                this.errorMessage = err.error.message;
            },
        });
    }
}
