import {} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import {MessageService} from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { HttpModule } from './config/http/http.module';
import {ThemeService} from "./shared/services/theme/theme.service";
import {PrimeNG} from "primeng/config";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ToastModule,
    ReactiveFormsModule,
    HttpModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
    MessageService
  ]
})
export class AppComponent implements OnInit{

  constructor(
    private primeng: PrimeNG
  ) {}

  ngOnInit(): void {
    this.primeng.ripple.set(true);
  }
}
