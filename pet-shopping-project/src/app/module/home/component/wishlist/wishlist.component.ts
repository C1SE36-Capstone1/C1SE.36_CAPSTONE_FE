import { Component, OnInit } from '@angular/core';
import { WishlistService } from 'src/app/service/wishlist/wishlist.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  favorites: any[] = [];
  errorMessage: string = '';

  constructor(private wishlistService: WishlistService) { }

  ngOnInit(): void {
    this.loadWishlist();
  }

  loadWishlist() {
    this.wishlistService.getFavorites().subscribe(
      favorites => this.favorites = favorites,
      error => console.error('Lỗi khi tải danh sách ưa thích', error)
    );
  }

  addProductToFavorite(productId: number) {
    this.wishlistService.addProductToFavorite(productId).subscribe(
      next => {
        Swal.fire({
          icon: 'success',
          title: 'Thành công',
          text: 'Sản phẩm đã được thêm vào danh sách yêu thích',
        });
      },
      error => {
        if (error.status === 409) {
          Swal.fire({
            icon: 'warning',
            title: 'Thông báo',
            text: 'Sản phẩm đã tồn tại trong danh sách yêu thích',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Lỗi',
            text: 'Đã có lỗi xảy ra',
          });
        }
      }
    );
  }

  deleteFavorite(favoriteId: number): void {
    console.log('Favorite ID trước khi xóa:', favoriteId); // Thêm log này để kiểm tra giá trị của favoriteId
    if (favoriteId === undefined || favoriteId === null) {
      console.error('Favorite ID không được xác định');
      // Xử lý lỗi, hiển thị thông báo lỗi, v.v.
      return;
    }

    this.wishlistService.deleteFavorite(favoriteId).subscribe(
      () => {
        Swal.fire('Thành công', 'Sản phẩm đã được xóa khỏi danh sách yêu thích', 'success');
        this.fetchFavorites();
      },
      (error) => {
        console.error('Lỗi khi xóa sản phẩm ưa thích:', error);
        // Xử lý lỗi, hiển thị thông báo lỗi, v.v.
      }
    );
  }


  fetchFavorites(): void {
    this.wishlistService.getFavorites().subscribe(
      favorites => this.favorites = favorites,
      error => console.error('Lỗi khi tải danh sách ưa thích', error)
    );
  }
}
