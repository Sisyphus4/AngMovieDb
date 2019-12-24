import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { CommentComponent } from './comment.component';
import { AppState } from '../../../core/interfaces/state.interface';


fdescribe('CommentComponent', () => {
  let component: CommentComponent;
  let fixture: ComponentFixture<CommentComponent>;
  let store: MockStore<AppState>;
  const initialState = {  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentComponent ],
      providers: [
        provideMockStore({ initialState }),
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    //store = TestBed.get<AppState>(store);
  });

  it('#clicked() should toggle #isOn', () => {
    // const comp = new CommentComponent(store);
    // expect(comp.isOn).toBe(false, 'off at first');
    // comp.clicked();
    // expect(comp.isOn).toBe(true, 'on after click');
    // comp.clicked();
    // expect(comp.isOn).toBe(false, 'off after second click');
  });
});
