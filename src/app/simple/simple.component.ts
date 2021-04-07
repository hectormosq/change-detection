import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  ElementRef,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { myTodo, TodoListInterface } from '../model/todo.constant';

@Component({
  selector: 'app-simple',
  templateUrl: './simple.component.html',
  styleUrls: ['./simple.component.scss'],
})
export class SimpleComponent
  implements
    OnInit,
    OnChanges,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy {
  myTodo = myTodo;
  value = '';
  selected;
  constructor(private el: ElementRef<any>, private zone: NgZone) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges');
  }

  get myTodoList() {
    console.log('getting');
    return myTodo.filter((item) => {
      return item.title.includes(this.value);
    });
  }

  ngOnInit(): void {
    this.myTodo = myTodo;
    // console.log('ngOnInit');
  }

  ngDoCheck(): void {
    // console.log('ngDoCheck');
  }

  ngAfterContentInit(): void {
    // console.log('ngAfterContentInit');
  }

  ngAfterContentChecked(): void {
    // console.log('ngAfterContentChecked');
  }

  ngAfterViewInit(): void {
    // console.log('ngAfterViewInit');
  }

  ngAfterViewChecked(): void {
    // console.log('ngAfterViewChecked');
  }

  ngOnDestroy(): void {
    // console.log('ngOnDestroy');
  }

  blink() {
    this.el.nativeElement.classList.add('highlight');
    this.zone.runOutsideAngular(() => {
      setTimeout(() => {
        this.el.nativeElement.classList.remove('highlight');
      }, 1500);
    });
  }

  selectItem(item) {
    this.selected = item;
    console.log({ item });
  }

  calculate(num) {
    console.log('Calculating');
    return fibonacci(num);
  }
}

const fibonacci = (n) => {
  if (n === 1 || n === 2) return 1;
  return fibonacci(n - 1) + fibonacci(n - 2);
};
