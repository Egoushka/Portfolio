import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NotificationService, NotificationMessage } from '../../services/notification';

@Component({
  selector: 'app-notification',
  imports: [CommonModule],
  template: `
    <div class="notifications-container">
      <div 
        *ngFor="let notification of notifications" 
        class="notification"
        [ngClass]="'notification--' + notification.type"
        [@slideIn]
      >
        <div class="notification__content">
          <div class="notification__icon">
            <span [ngSwitch]="notification.type">
              <span *ngSwitchCase="'success'">✓</span>
              <span *ngSwitchCase="'error'">✕</span>
              <span *ngSwitchCase="'warning'">!</span>
              <span *ngSwitchDefault>i</span>
            </span>
          </div>
          <div class="notification__message">{{ notification.message }}</div>
          <button 
            class="notification__close" 
            (click)="removeNotification(notification.id)"
            aria-label="Close notification"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .notifications-container {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 1000;
      display: flex;
      flex-direction: column;
      gap: 12px;
      max-width: 400px;
    }

    .notification {
      background: white;
      border-radius: 8px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
      border-left: 4px solid var(--primary-color);
      overflow: hidden;
      transform: translateX(100%);
      transition: all 0.3s ease-in-out;
      animation: slideIn 0.3s ease-out forwards;
    }

    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    .notification--success {
      border-left-color: #10b981;
    }

    .notification--error {
      border-left-color: #ef4444;
    }

    .notification--warning {
      border-left-color: #f59e0b;
    }

    .notification--info {
      border-left-color: #3b82f6;
    }

    .notification__content {
      display: flex;
      align-items: center;
      padding: 16px;
      gap: 12px;
    }

    .notification__icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      color: white;
      font-weight: bold;
      font-size: 14px;
    }

    .notification--success .notification__icon {
      background-color: #10b981;
    }

    .notification--error .notification__icon {
      background-color: #ef4444;
    }

    .notification--warning .notification__icon {
      background-color: #f59e0b;
    }

    .notification--info .notification__icon {
      background-color: #3b82f6;
    }

    .notification__message {
      flex: 1;
      color: var(--text-color);
      font-size: 14px;
      line-height: 1.4;
    }

    .notification__close {
      background: none;
      border: none;
      color: var(--gray-medium);
      cursor: pointer;
      padding: 4px;
      line-height: 1;
      font-size: 16px;
      transition: color 0.2s ease;
    }

    .notification__close:hover {
      color: var(--text-color);
    }

    @media (max-width: 768px) {
      .notifications-container {
        top: 10px;
        right: 10px;
        left: 10px;
        max-width: none;
      }
    }
  `],
  animations: []
})
export class NotificationComponent implements OnInit, OnDestroy {
  notifications: NotificationMessage[] = [];
  private destroy$ = new Subject<void>();

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.notifications$
      .pipe(takeUntil(this.destroy$))
      .subscribe(notifications => {
        this.notifications = notifications;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  removeNotification(id: string): void {
    this.notificationService.remove(id);
  }
}