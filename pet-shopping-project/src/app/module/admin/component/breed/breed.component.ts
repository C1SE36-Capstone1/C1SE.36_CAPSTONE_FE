import { Component, OnInit } from '@angular/core';
import { Breed } from 'src/app/model/Pet/breed';
import { BreedService } from 'src/app/service/Pet/breed.service';
import { PetService } from 'src/app/service/Pet/pet.service';



@Component({
  selector: 'app-breed',
  templateUrl: './breed.component.html',
  styleUrls: ['./breed.component.css']
})
export class BreedComponent implements OnInit {
  

  constructor( private breedService : BreedService,
               private petService : PetService) { }

  ngOnInit(): void {
    
  }

}
