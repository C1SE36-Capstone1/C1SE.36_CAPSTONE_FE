import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ThongBaoService {
  constructor(private snackBar: MatSnackBar) {}

  hienThongBao(message: string): void {
    this.snackBar.open(message, 'Đóng', {
      duration: 3000, // Thời gian hiển thị (ms)
    });
  }
}