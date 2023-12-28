import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/Product/product.service';
import { Product } from 'src/app/model/Product/product';
import { favorite } from 'src/app/model/Product/favorite';
import { WishlistService } from 'src/app/service/Wishlist/wishlist.service';
@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  wishlist: favorite[] = [];


  constructor(private wishlistService: WishlistService) { }

  ngOnInit(): void {
    

  }

}
