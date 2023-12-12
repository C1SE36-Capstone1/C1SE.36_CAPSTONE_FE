import { Component, OnInit } from '@angular/core';
import { FavoriteService } from 'src/app/service/Favorite/favorite.service';
import { Product } from 'src/app/model/Product/product';
import { ThongBaoService } from 'src/app/service/Thongbao/thongbao.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],

})
export class WishlistComponent implements OnInit {
  favoriteProducts: Product[] = [];

  constructor( private favoriteService: FavoriteService,
               private thongBaoService: ThongBaoService
               ) { }

  ngOnInit(): void {
    this.favoriteProducts = this.favoriteService.getFavoriteProducts();
  }

  removeFromFavorites(productId: number): void {
    this.favoriteService.removeFromFavorites(productId);
  }

  updateFavoriteProduct(product: Product): void {
    const existingProduct = this.favoriteService.getFavoriteProductById(product.productId);
    if (existingProduct) {
      // Cập nhật thông tin sản phẩm yêu thích
      // (bạn có thể mở một modal để nhập thông tin mới cho sản phẩm hoặc sử dụng các phương thức khác)
      this.favoriteService.updateFavoriteProduct(product);
      this.showNotification('Đã cập nhật sản phẩm yêu thích');
    }
    }

    private showNotification(message: string): void {
      this.thongBaoService.hienThongBao(message);
    }

  }






