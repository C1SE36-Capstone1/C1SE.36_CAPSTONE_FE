import { Component, OnInit } from '@angular/core';
import { BreedService } from 'src/app/service/Pet/breed.service';
import { Breed } from '../../../../model/Pet/breed';
import { Pet } from 'src/app/model/Pet/pet';
import { PetService } from 'src/app/service/Pet/pet.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-breed',
  templateUrl: './breed.component.html',
  styleUrls: ['./breed.component.css']
})
export class BreedComponent implements OnInit {

  currentImageIndex: number = 0;
  images: string[] = [
    'assets/image/breed1.jpg',
    'assets/image/breed2.jpg',
  ];

  selectedBreedId: number;
 
  displayedPet: Pet[];
  showAll = false;
  show = true;
  totalPet: number = 0;
  petsPerPage: number = 16;
  currentPage: number = 1;
  sortType: string ='';
  sortOrder: string = '';
  breedList : Breed[];
  petList : Pet[];

  constructor(private router: Router,
              private breedService : BreedService,
              private petService : PetService) { }

  ngOnInit(): void {
    this.breedService.getAllBreed().subscribe((result) =>{
      this.breedList = result;
    });

    this.petService.getAllPet().subscribe((data)=> {
      this.petList = data
      this.totalPet = this.petList.length;
      this.displayedPet = this.getPetSlice();
    })

    this.startSlideshow();
  }

  startSlideshow() {
    setInterval(() => {
      this.showNextImage();
    }, 6000); // Chuyển ảnh mỗi 3 giây
  }

  showNextImage() {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
  }

  selectImage(index: number) {
    this.currentImageIndex = index;
  }

  showAllBreeds(): void {
    this.showAll =! this.showAll;
    this.show =! this.show;
  }

  onCategoryClick(breedName: string): void {
    const breed = this.breedList.find(c => c.breedName === breedName);
    if (breed) {
      this.selectedBreedId = breed.breedId;
  
      // Gọi phương thức getByCategory và cập nhật danh sách sản phẩm
      if (this.selectedBreedId) {
        this.petService.getByBreedId(this.selectedBreedId).subscribe(
          (data) => {
            this.petList = data;
            this.totalPet = this.petList.length;
            this.displayedPet = this.getPetSlice();
          },
          (error) => {
            console.error('Error fetching products by category:', error);
          }
        );
      } 
      // Thay đổi URL
      this.router.navigate(['/breed', breedName]);
      this.currentPage = 1;
    } else{
      this.petService.getAllPet().subscribe((data) => {
        this.petList = data
        this.totalPet = this.petList.length;
        this.displayedPet = this.getPetSlice();
      });
      this.router.navigate(['/breed', 'All']);
      this.currentPage = 1;
    }
  }

  getPetSlice(): Pet[] {
    const startIndex = (this.currentPage - 1 ) * this.petsPerPage;
    const endIndex = startIndex + this.petsPerPage;
    return this.petList.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    console.log('Changing to page:', page);
    this.currentPage = page;
    this.displayedPet = this.getPetSlice();
  }

  getPageArray(): number[] {
    const pageCount = Math.ceil(this.totalPet / this.petsPerPage);
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  redirectToDetailPage( itemId: number) {
    this.router.navigate(['shop/', itemId]);
  }
}
