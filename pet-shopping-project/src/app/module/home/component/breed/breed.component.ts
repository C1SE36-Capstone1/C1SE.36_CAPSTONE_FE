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

  selectedBreedId: number;
 
  displayedPet: Pet[];
  showAll = false;
  show = true;
  totalPet: number = 0;
  petsPerPage: number = 9;
  currentPage: number = 1;
  sortType: string ='';
  sortOrder: string = '';
  breedList : Breed[];
  petList : Pet[];

  constructor(private router: Router,
              private breedService : BreedService,
              private petService : PetService) { }

  ngOnInit(): void {
    this.breedService.getAllBreed().subscribe((data) => {
      this.breedList = data
    })

    this.petService.getAllPet().subscribe((data)=> {
      this.petList = data
      this.totalPet = this.petList.length;
      this.displayedPet = this.getPetSlice();
    })
  }

  showAllBreeds(): void {
    this.showAll =! this.showAll;
    this.show =! this.show;
  }

  onBreedClick(breedId : number): void {
    this.selectedBreedId = breedId;

    // Gọi phương thức getByCategory và cập nhật danh sách sản phẩm
    if(breedId){
      this.petService.getByBreedId(breedId).subscribe(
        (data) => {
          this.petList = data;
          this.totalPet = this.petList.length;
          this.displayedPet = this.getPetSlice();
        },
        (error) => {
          console.error('Error fetching products by category:', error);
        }
      );
    }else{
      this.petService.getAllPet().subscribe((data) =>{
        this.petList = data
        this.totalPet = this.petList.length;
        this.displayedPet = this.getPetSlice();
      })
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

  redirectToPetDetail(productId: number): void {
    this.router.navigate(['shop/', productId]);
  }
}
