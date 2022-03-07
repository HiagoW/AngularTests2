import { buildPhotoList } from 'src/app/shared/components/photo-board/test/build-photo-list';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Photo } from '../interfaces/photo';
import { PhotoBoardService } from './photo-board.service';

@Injectable()
export class PhotoBoardMockService extends PhotoBoardService {
  public getPhotos(): Observable<Photo[]> {
      return of(buildPhotoList());
  }
}
