import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PetService } from 'src/app/service/Pet/pet.service';
import { ProductService } from 'src/app/service/Product/product.service';
import { User } from '../../../../model/User/user';
import { Product } from '../../../../model/Product/product';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css']
})
export class DetailPageComponent implements OnInit {

  zoomScale = 1.5;
  type: string | null = null;
  id: number | null = null;
  details: any = {};
  productId: number;

  ratingForm: FormGroup;
  stars: number[] = [];
  currentRating: number = 0;

  selectedTab: string = 'tab1';

  constructor(private route: ActivatedRoute, 
              private petService : PetService,
              private productService: ProductService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.ratingForm = this.formBuilder.group({
      id : [0],
      rating: [0, [Validators.required]],
      comment: [''],
      ratedDate: ['', [Validators.required]],
      user: this.formBuilder.group({
        userId: [0, [Validators.required]]
      }),
      product: this.formBuilder.group({
        productId: [0, [Validators.required]]
      }),
      OrderDetail: this.formBuilder.group({
        orderDetailId: [0, [Validators.required]]
      })
    });

    // Số lượng ngôi sao tối đa
    const maxRating = 5;
    this.stars = Array(maxRating).fill(0).map((_, i) => i + 1);
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

  getFormattedPetAge(petAge : Date): string {
    const birthdate = new Date(petAge);
    const currentDate = new Date();

    const diffInMonths = (currentDate.getFullYear() - birthdate.getFullYear()) * 12 + currentDate.getMonth() - birthdate.getMonth();
    const years = Math.floor(diffInMonths / 12);
    const remainingMonths = diffInMonths % 12;

    if (years === 0) {
      return `${remainingMonths} tháng tuổi`;
    } else if (remainingMonths === 0) {
      return `${years} năm tuổi`;
    } else {
      return `${years} năm ${remainingMonths} tháng tuổi`;
    }
  }

  changeTab(tab: string) {
    this.selectedTab = tab;
  }

  rate(star: number): void {
    const currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
    this.ratingForm.patchValue({ rating: star });
    this.currentRating = star;
    this.ratingForm.patchValue({
      ratedDate: currentDate
    });
    console.log(this.ratingForm.value)
  }

}
