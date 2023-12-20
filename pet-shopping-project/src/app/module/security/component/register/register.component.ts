import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from "@angular/forms";
import { Router } from "@angular/router";
import { SignUpForm } from "src/app/model/Request/sign-up-form";
import { Role } from "src/app/model/User/role";
import { AccountService } from "src/app/service/Account/account.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  role: Role[] = [];

  constructor(
    private accountService: AccountService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.maxLength(45)]],
      email: [
        "",
        [Validators.required, Validators.email, Validators.maxLength(128)],
      ],
      password: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(32),
        ],
      ],
      phone: ["", [Validators.required, Validators.maxLength(13)]],
      role: ['USER', [Validators.required]],
    });
    
  }
  
  onSubmit() {
    if (this.registerForm.valid) {
      const user: SignUpForm = this.registerForm.value;
      // Thêm vai trò mặc định cho người dùng (nếu cần)
      user.role = ['USER'];

      this.accountService.register(user).subscribe(
        (data) => {
          console.log("Đăng ký thành công", data);
          this.router.navigate(['/login']); // Chuyển hướng tới trang đăng nhập sau khi đăng ký
        },
        (error) => {
          console.error("Lỗi khi đăng ký", error);
        }
      );
    }
  }
}
