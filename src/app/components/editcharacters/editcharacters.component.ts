import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';
interface Echaracters{
  name: string,
 gender: string,
  status: string,
  species:string
}



@Component({
  selector: 'app-editcharacters',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './editcharacters.component.html',
  styleUrl: './editcharacters.component.css'
})
export class EditcharactersComponent implements OnInit {
  characterId!: number;
  characters: Echaracters[] = [];
  selectedCharacter: Echaracters = {
    name: '',
    gender: '',
    status: '',
    species: ''
  };
  
  constructor(private route: ActivatedRoute, private apollo: Apollo) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.characterId = +params['id']|| 0; 
      this.loadCharacter();
    });
  }

  loadCharacter() {
    this.apollo.watchQuery<any>({
      query: gql`
        query GetCharacterById($id: ID!) {
          character(id: $id) {
            name
            gender
            status
            species
          }
        }
      `,
      variables: {
        id: this.characterId
      }
    }).valueChanges.pipe(
      map(result => result.data.character)
    ).subscribe({
      next: (characterData: Echaracters) => {
        this.characters = [characterData];
        this.selectedCharacter=characterData;
      },
      error: (error: Error) => {
        console.error('Error al cargar los datos del personaje:', error);
      }
    });
  }  

}
