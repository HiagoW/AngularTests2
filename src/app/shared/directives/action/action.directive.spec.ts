import { ActionDirectiveModule } from './action.module';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ActionDirective } from './action.directive';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
describe(ActionDirective.name, () => {

  let fixture: ComponentFixture<ActionDirectiveTestComponent>;
  let component: ActionDirectiveTestComponent;

  beforeEach(async () => {

    // Nao precisa chamar .compileComponents() pois diretiva nao tem template
    // Portanto nao precisa do async e await
    // Mas podemos deixar mesmo assim
    await TestBed.configureTestingModule({
      declarations: [ActionDirectiveTestComponent],
      imports: [ActionDirectiveModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ActionDirectiveTestComponent);
    component = fixture.componentInstance;
  });

  it(`(D) (@Output appAction) should emit event with payload when ENTER key is pressed`, () => {
    // const divEl: HTMLElement = fixture.nativeElement.querySelector('.dummy-component');
    const divEl = fixture.debugElement.query(By.directive(ActionDirective)).nativeElement;
    const event = new KeyboardEvent('keyup', {key: 'Enter'});
    divEl.dispatchEvent(event);
    expect(component.hasEvent()).toBeTrue();
  });

  it(`(D) (@Output appAction) should emit event with payload when clicked`, () => {
    const divEl: HTMLElement = fixture.nativeElement.querySelector('.dummy-component');
    const event = new Event('click');
    divEl.dispatchEvent(event);
    expect(component.hasEvent()).toBeTrue();
  });

  // it(`(D) (@Output appAction should emit event when clicked or ENTER key pressed)`, () => {
  //   const divEl: HTMLElement = fixture.nativeElement.querySelector('.dummy-component');
  //   const clickEvent = new Event('click');
  //   const keyboardEvent = new KeyboardEvent('keyup', {key: 'Enter'});
  //   divEl.dispatchEvent(clickEvent);
  //   expect(component.hasEvent()).withContext('Click event').toBeTrue();
  //   component.resetForNewExpectation();
  //   divEl.dispatchEvent(keyboardEvent);
  //   expect(component.hasEvent()).withContext('Keyboard event "keyup"').toBeTrue();
  // })

});

// Component pra teste
@Component({
  template: `<div class="dummy-component" (appAction)="actionHandler($event)"></div>`
})
class ActionDirectiveTestComponent {
  private event: Event = null;
  public actionHandler(event: Event): void {
    this.event=event;
  }
  public hasEvent(): boolean {
    return !!this.event;
  }
  public resetForNewExpectation(): void {
    this.event = null;
  }

}
