import {Component, OnInit} from '@angular/core';
import {SharedCommonModule} from "../../shared/common/shared-common.module";


@Component({
  selector: 'app-scheduler',
  imports: [SharedCommonModule],
  templateUrl: './scheduler.component.html',
  styleUrl: './scheduler.component.scss'
})
export class SchedulerComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {

  }

}
