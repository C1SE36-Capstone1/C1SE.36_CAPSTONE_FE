import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/Cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: any[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {

    this.loadCartItems();
  }

  loadCartItems(): void {
    this.cartService.getCartItems().subscribe(
      (items) => {
        this.cartItems = items;
      },
      (error) => {
        console.error('Error loading cart items:', error);
      }
    );
  }

  removeFromCart(cartItem: any): void {
    this.cartService.removeFromCart(cartItem.id).subscribe(
      () => {
        // Refresh cart items after removal
        this.loadCartItems();
      },
      (error) => {
        console.error('Error removing item from cart:', error);
      }
    );
  }

  // You can modify this method based on how you want to add items to the cart
  addToCart(item: any): void {
    this.cartService.addToCart(item).subscribe(
      () => {
        // Refresh cart items after addition
        this.loadCartItems();
      },
      (error) => {
        console.error('Error adding item to cart:', error);
      }
    );
  }

  checkout(): void {
    this.cartService.checkout().subscribe(
      () => {
        console.log('Checkout successful.');
        // Refresh cart items after successful checkout
        this.loadCartItems();
      },
      (error) => {
        console.error('Error during checkout:', error);
      }
    );
   }
}