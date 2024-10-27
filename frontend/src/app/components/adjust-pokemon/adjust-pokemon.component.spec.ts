import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdjustPokemonComponent } from './adjust-pokemon.component';

describe('AdjustPokemonComponent', () => {
  let component: AdjustPokemonComponent;
  let fixture: ComponentFixture<AdjustPokemonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdjustPokemonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdjustPokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
