import { Component, OnInit } from '@angular/core';
import { Breed } from 'src/app/model/Pet/breed';
import { BreedService } from 'src/app/service/Pet/breed.service';




@Component({
  selector: 'app-breed',
  templateUrl: './breed.component.html',
  styleUrls: ['./breed.component.css']
})
export class BreedComponent implements OnInit {
  
  showDeletePopup = false;
  deleteBreedId: number;

  newBreed: Breed = {breedId : 0 , breedName: ''};
  show = false;
  breedId: number = 0;
  breedList: Breed[];
  breed: Breed;

  totalBreed: number = 0;
  breedsPerPage: number = 10;
  currentPage: number = 1;
  displayedBreeds : Breed[];

  searchTerm : string ='';

  constructor(private breedService: BreedService) {}

  ngOnInit(): void {
    this.loadBreeds();
  }

  loadBreeds(): void {
    this.breedService.getAllBreed().subscribe((breeds) => {
      this.breedList = breeds;
      //Sắp xếp category theo id giảm dần
      this.breedList.sort((a, b) => b.breedId - a.breedId);
      this.totalBreed = this.breedList.length;
      this.displayedBreeds = this.getBreedSlice();
    });
  }

  toggleForm(){
    this.show = true;
  }

  closepopup(){
    this.show = false;
  }

  addBreed() {
    this.breedService.addBreed(this.newBreed).subscribe(
      (breed) => {
        this.loadBreeds();
        this.show = false
        console.log('Category added successfully:', breed);
        // Thêm logic xử lý thành công ở đây nếu cần
      },
      (error) => {
        console.error('Error adding category:', error);
        // Thêm logic xử lý lỗi ở đây nếu cần
      }
    );
  }

  confirmDelete(id: number): void {
    this.showDeletePopup = true;
    this.deleteBreedId = id;
}

closeDeletePopup(): void {
  this.showDeletePopup = false;
  this.deleteBreedId = null;
}

  deleteBreedAtId(): void {
    this.breedService.deleteAtBreedId(this.deleteBreedId)
      .subscribe(() => {
        // Handle successful deletion
        console.log('Breed deleted successfully');
        this.loadBreeds();
        this.closeDeletePopup();
      }, error => {
        // Handle errors
        console.error('Error deleting Breed:', error);
      });
  }

  getBreedSlice(): Breed[] {
    const startIndex = (this.currentPage - 1 ) * this.breedsPerPage;
    const endIndex = startIndex + this.breedsPerPage;
    return this.breedList.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    console.log('Changing to page:', page);
    this.currentPage = page;
    this.displayedBreeds = this.getBreedSlice();
  }

  getPageArray(): number[] {
    const pageCount = Math.ceil(this.totalBreed / this.breedsPerPage);
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  search(): void {
    this.breedService.getAllBreed().subscribe((data) => {
      this.breedList = data
      this.breedList.sort((a, b) => b.breedId - a.breedId);
    })
    // Filter products based on the searchTerm
    // You can customize the filter logic based on your requirements
    // For example, you might want to make the search case-insensitive
    this.breedList = this.breedList.filter(category => 
      category.breedName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.totalBreed = this.breedList.length;
    this.displayedBreeds = this.getBreedSlice();
  }

  onEnter(){
    this.search();
  }

}
