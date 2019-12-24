import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MoviePreviewComponent } from './movie-preview.component';

describe('MoviePreviewComponent', () => {
  let component: MoviePreviewComponent;
  let fixture: ComponentFixture<MoviePreviewComponent>;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MoviePreviewComponent],
      imports: [MatCardModule],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviePreviewComponent);
    component = fixture.componentInstance;
  });


  it('should display releaseDate', () => {
    const expectedMovie = {
      id: 13,
      release_date: 'sad',
      title: 'aswd',
      poster_path: 'xzc',
    };

    component.movie = expectedMovie;
    fixture.detectChanges();
    let movieCard = fixture.debugElement.query(By.css('.app-movie-preview'));
    let movieEl = movieCard.nativeElement;
    const expectedRealeaseDate = expectedMovie.release_date;
    expect(movieEl.textContent).toContain(expectedRealeaseDate);
  });

  it('should tell ROUTER to navigate when hero clicked', () => {
    const expectedMovie = {
      id: 13,
      release_date: 'sad',
      title: 'aswd',
      poster_path: 'xzc',
    };

    component.movie = expectedMovie;
    component.onClick(); // trigger click on first inner <div class="hero">

    // args passed to router.navigateByUrl() spy
    const spy = component.router.navigate as jasmine.Spy;
    const navArgs = spy.calls.first().args[0];

    // expecting to navigate to id of the component's first hero
    const id = component.movie.id;
    expect(navArgs).toEqual(['/movie', id]);
  });
});
