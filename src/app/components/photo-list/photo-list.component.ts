import { PhotoBoardService } from './../../shared/components/photo-board/services/photo-board.service';
import { Photo } from './../../shared/components/photo-board/interfaces/photo';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.scss']
})
export class PhotoListComponent implements OnInit {
  public photos$: Observable<Photo[]>;
  public fa = { faCircleNotch };

  constructor(private service: PhotoBoardService) {}

  // Bom colocar no onInit ao invés do construtor pois aqui é gerenciado pelo Angular
  public ngOnInit(): void {
    this.photos$ = this.service.getPhotos();
  }
}
