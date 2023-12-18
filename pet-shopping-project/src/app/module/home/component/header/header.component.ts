import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/service/Token/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  showOptions: boolean = false;
  
  constructor(private router: Router,
              private tokenStorageService: TokenStorageService){}            

  ngOnInit(): void {
  }

}
