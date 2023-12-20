import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PetService } from 'src/app/service/Pet/pet.service';
import { ProductService } from 'src/app/service/Product/product.service';

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
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.ratingForm = this.fb.group({
      rating: [0]
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
    this.ratingForm.patchValue({ rating: star });
    this.currentRating = star;
  }

}
