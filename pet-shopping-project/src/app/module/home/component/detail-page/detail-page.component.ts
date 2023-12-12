import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/model/Product/product';
import { PetService } from 'src/app/service/Pet/pet.service';
import { ProductService } from 'src/app/service/Product/product.service';
import { CartService } from 'src/app/service/Cart/cart.service';
import { Router } from '@angular/router';
import { Cart } from 'src/app/model/Cart/cart';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css']
})
export class DetailPageComponent implements OnInit {

  type: string | null = null;
  id: number | null = null;
  details: any = {};
  productId: number;


  constructor(private route: ActivatedRoute,
              private petService : PetService,
              private productService: ProductService,
              private CartService: CartService,
              private router: Router,) { }

  ngOnInit(): void {

    this.getProductDetail();
  }

  getProductDetail(): void {
    this.route.queryParams.subscribe(params => {
      this.type = params['type'];
      this.id = +params['id'];

      if (this.type === 'product') {
        this.productService.getProductById(this.id).subscribe((data) =>{
          this.details = data
        });
      } else if (this.type === 'pet') {
          this.petService.getDetailById(this.id).subscribe((data) => {
            this.details = data
          });
      }
    });
  }
}
