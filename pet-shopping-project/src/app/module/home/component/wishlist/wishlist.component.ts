import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/Product/product.service';
import { Product } from 'src/app/model/Product/product';
@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  favorites: Product[] = [];
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.favorites$.subscribe((favorites) => {
      this.favorites = favorites;
    });

    // Cập nhật danh sách yêu thích
    this.productService.updateFavorites();
  }
  }


