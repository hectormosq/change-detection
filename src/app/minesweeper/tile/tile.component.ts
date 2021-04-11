import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent implements OnChanges {
  @Input() tile: any;
  @Output() tileClick: EventEmitter<any> = new EventEmitter();

  constructor() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('Changing')
  }

  handleTileClick(tile){
    this.tileClick.emit(tile);
  }

}
