import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/User/user';
import { UserService } from 'src/app/service/User/user.service';
import { AccountService } from '../../../../service/Account/account.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  categoryId: number = 0;
  accountList: User[];
  account: User;
  userName : string

  constructor(private accountService : AccountService) { }

  ngOnInit(): void {
    this.loadAllAccount();
  }

  loadAllAccount(): void {
    // this.accountService.getAllAccount().subscribe((data) => {
    //   this.accountList = data;
    // });
  }

}
