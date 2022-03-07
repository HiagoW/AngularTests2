import { PhotoBoardService } from './../../shared/components/photo-board/services/photo-board.service';
import { HttpClientModule } from '@angular/common/http';
import { PhotoListModule } from './photo-list.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PhotoListComponent } from './photo-list.component';
import { buildPhotoList } from 'src/app/shared/components/photo-board/test/build-photo-list';
import { of } from 'rxjs';

// Deixar componentes de página por último. Testar primeiro os menores.
describe(PhotoListComponent.name, () => {

  let fixture: ComponentFixture<PhotoListComponent>;
  let component: PhotoListComponent;
  let service: PhotoBoardService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PhotoListModule,
        HttpClientModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoListComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(PhotoBoardService);
  });

  it('Should create component', () => {
    expect(component).toBeTruthy();
  });

  it(`(D) Should display board when data arrives`, () => {
    const photos = buildPhotoList();
    // Outra abordagem em photo-list.component-mock-provider.spec.ts
    spyOn(service, 'getPhotos')
      .and.returnValue(of(photos));
    fixture.detectChanges();
    const board = fixture.nativeElement
      .querySelector('app-photo-board');
    const loader = fixture.nativeElement
      .querySelector('.loader');
    expect(board).withContext('Should display board')
      .not.toBeNull();
    expect(loader).withContext('Should not display loader')
      .toBeNull();
  });

  it(`(D) Should display loeader while waiting for data`, () => {
    const photos = buildPhotoList();
    spyOn(service, 'getPhotos')
      .and.returnValue(null);
    fixture.detectChanges();
    const board = fixture.nativeElement
      .querySelector('app-photo-board');
    const loader = fixture.nativeElement
      .querySelector('.loader');
    expect(board).withContext('Should not display board')
      .toBeNull();
    expect(loader).withContext('Should display loader')
      .not.toBeNull();
  });
});
