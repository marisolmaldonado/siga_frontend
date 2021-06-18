import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Input() bodyIn: any;
  @Output() bodyOut = new EventEmitter<any>();

  searchControl = new FormControl();

  constructor() { }

  ngOnInit(): void { }

  getSearch(): void {
    if (this.searchControl.value == '') {
      this.bodyIn.search = null;
      this.bodyOut.emit(this.bodyIn);
    } else {
      this.bodyIn.search = this.searchControl.value;
      this.bodyOut.emit(this.bodyIn);
    }
  }

}
