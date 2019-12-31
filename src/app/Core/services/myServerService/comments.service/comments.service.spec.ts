import { TestBed } from '@angular/core/testing';
import { CommentsService } from './comments.service';
import { from, of } from 'rxjs';
import { Comment } from '../../../interfaces/comment.interface';
import { HttpClientModule } from '@angular/common/http';


describe('CommentsService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  // let commentsService: CommentsService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    // commentsService = new CommentsService(<any>httpClientSpy);
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
  });

  it('should be created', () => {
    const service: CommentsService = TestBed.get(CommentsService);
    expect(service).toBeTruthy();
  });

  it('should return expected comments (HttpClient called once)', () => {
    const expectedComments: Comment[] =
      [{
        text: 'asd',
        author: 'string',
        movieId: 213,
        userId: 'asd',
        id: '123',
        createdAt: '123',
        updatedAt: '213',
      },
      {
        text: 'asd',
        author: 'zxc',
        movieId: 34,
        userId: 'asd',
        id: '123',
        createdAt: '123',
        updatedAt: '213',
      }];

    httpClientSpy.get.and.returnValue(of(expectedComments));

    // commentsService.getComments(123).subscribe(
    //   comments => expect(comments).toEqual(expectedComments, 'expected comments'),
    //   fail
    // );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });
});
