import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { ContactMessage } from '@portfolio/generated-portfolio-api-types';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  isSubmitting = false;
  submitMessage = '';

  constructor(private fb: FormBuilder, private contactService: ContactService) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required, Validators.minLength(5)]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {
    // Set up real-time validation listeners
    this.setupRealTimeValidation();
  }

  private setupRealTimeValidation(): void {
    // Subscribe to value changes for real-time validation
    Object.keys(this.contactForm.controls).forEach(key => {
      const control = this.contactForm.get(key);
      if (control) {
        control.valueChanges.subscribe(() => {
          // Mark as touched to trigger validation display after user starts typing
          if (control.value && control.value.length > 0) {
            control.markAsTouched();
          }
        });

        // Also mark as touched when user leaves the field (blur event)
        control.statusChanges.subscribe(() => {
          if (control.dirty) {
            control.markAsTouched();
          }
        });
      }
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      
      const contactMessage: ContactMessage = {
        name: this.contactForm.value.name,
        email: this.contactForm.value.email,
        subject: this.contactForm.value.subject,
        message: this.contactForm.value.message
      };

      this.contactService.submitContactMessage(contactMessage).subscribe({
        next: (response) => {
          console.log('Form submitted successfully:', response);
          this.submitMessage = response.message || 'Thank you for your message! I will get back to you soon.';
          this.contactForm.reset();
          this.isSubmitting = false;
        },
        error: (error) => {
          console.error('Error submitting form:', error);
          this.submitMessage = 'An error occurred while submitting the form. Please try again later.';
          this.isSubmitting = false;
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched() {
    Object.keys(this.contactForm.controls).forEach(key => {
      const control = this.contactForm.get(key);
      control?.markAsTouched();
    });
  }

  getFieldError(fieldName: string): string {
    const field = this.contactForm.get(fieldName);
    
    // Show errors in real-time: if field has been touched AND has errors
    // OR if field is dirty (user has started typing) AND has errors
    if (field?.errors && (field?.touched || field?.dirty)) {
      if (field.errors['required']) {
        return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required.`;
      }
      if (field.errors['email']) {
        return 'Please enter a valid email address.';
      }
      if (field.errors['minlength']) {
        const requiredLength = field.errors['minlength'].requiredLength;
        return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be at least ${requiredLength} characters long.`;
      }
    }
    return '';
  }

  // Helper methods for enhanced UX
  isFieldValid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return field?.valid && (field?.touched || field?.dirty) || false;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return field?.invalid && (field?.touched || field?.dirty) || false;
  }

  getFieldValidationClass(fieldName: string): string {
    if (this.isFieldValid(fieldName)) {
      return 'form-input--valid';
    } else if (this.isFieldInvalid(fieldName)) {
      return 'form-input--error';
    }
    return '';
  }
}