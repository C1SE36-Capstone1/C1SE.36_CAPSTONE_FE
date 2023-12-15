import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/model/Product/product';
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

  selectedTab: string = 'tab1';

  constructor(private route: ActivatedRoute, 
              private petService : PetService,
              private productService: ProductService) { }

  ngOnInit(): void {
    
    this.getProductDetail();
  }

  zoomImage(event: MouseEvent): void {
    const imageContainer = event.currentTarget as HTMLElement;
    const image = imageContainer.querySelector('img') as HTMLImageElement;

    const rect = imageContainer.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;

    const transformValue = `scale(${this.zoomScale}) translate(-${offsetX * (this.zoomScale - 1)}px, -${offsetY * (this.zoomScale - 1)}px)`;

    if (image) {
      image.style.transform = transformValue;
    }
  }

  resetZoom(): void {
    const images = document.querySelectorAll('.product .image img');
    images.forEach(image => {
      (image as HTMLImageElement).style.transform = 'none';
    });
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
}
