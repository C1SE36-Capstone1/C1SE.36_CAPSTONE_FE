import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/model/Product/product';
import { PetService } from 'src/app/service/Pet/pet.service';
import { ProductService } from 'src/app/service/Product/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  type: string | null = null;
  id: number | null = null;
  details: any = {};
  productId: number;
  product: Product;

  constructor(private route: ActivatedRoute, 
              private petService : PetService,
              private productService: ProductService) { }

  ngOnInit(): void {
    this.productId = +this.route.snapshot.paramMap.get('productId');
    this.getProductDetail();
  }

  getProductDetail(): void {
    // this.productService.getProductById(this.productId).subscribe(
    //   (product: Product) => {
    //     this.product = product;
    //   },
    //   (error) => {
    //     console.error('Error fetching product details:', error);
    //   }
    // );
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
