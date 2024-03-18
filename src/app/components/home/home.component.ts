import { CommonModule } from '@angular/common';
import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { map } from 'rxjs/operators';

interface Characters{
  id: number;
  name: string;
  image: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,InfiniteScrollModule,FormsModule,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  @ViewChild('characterContainer') characterContainer!: ElementRef;
  characters: Characters[] = [];
  originalCharacters: Characters[] = [];
  selectedCharacter: any;
  currentPage = 1; 
  pageSize = 20;
  showScrollToTopButton = false;
  searchTerm: string = '';
  searchHistory: string[] = [];


  constructor(private apollo: Apollo) { }
  ngOnInit(): void {
    this.loadCharacters();
  }


  
  loadCharacters(): void {
    const query = gql`  
      query {
        characters(page: ${this.currentPage}) {
          results {
            id
            name
            image
          }
        }
      }
    `;
    this.apollo.watchQuery<any>({ query }).valueChanges.pipe(
      map(result => {
        return result.data.characters.results;
      })
    ).subscribe((newCharacters: Characters[]) => { 
      this.originalCharacters = [...newCharacters]; // Almacena una copia de los personajes originales
      this.characters = [...this.originalCharacters]; // Inicializa characters con originalCharacters
    });
  }
  
  filterCharacters(searchTerm: string): void {
    // Convierte el término de búsqueda a minúsculas para una comparación de caso insensible
    const lowercaseSearchTerm = searchTerm.toLowerCase();
    // Filtra los personajes originales basados en el término de búsqueda si searchTerm no está vacío; de lo contrario, muestra todos los personajes originales.
    if (searchTerm.trim() !== '') {
      this.characters = this.originalCharacters.filter(character =>
        character.name.toLowerCase().includes(lowercaseSearchTerm)
      );
    } else {
      // Si searchTerm está vacío, muestra todos los personajes originales.
      this.characters = [...this.originalCharacters];
    }
  }


  onScroll(): void {
    const element = this.characterContainer.nativeElement;
    const atBottom = element.scrollHeight - element.scrollTop === element.clientHeight;
    if (atBottom) {
      this.currentPage++;
      this.loadCharacters();
    }
  }
  

  showCharacterDetails(characterId: number) {
    const query = gql`
      query GetCharacterDetails($id: ID!) {
        character(id: $id) {
          id
          name
          status
          species
          gender
          image
          origin {
            name
          }
          location {
            name
          }
          episode {
            id
            name
            air_date
            episode
          }
        }
      }
    `;
    this.apollo.watchQuery<any>({
      query,
      variables: {
        id: characterId
      }
    }).valueChanges.subscribe(result => {
      this.selectedCharacter = result.data.character;
    });
  }
  

  closeModal() {
    this.selectedCharacter = null;
  }
}
