import {Injectable, Renderer2, RendererFactory2} from '@angular/core';
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(rendererFactory: RendererFactory2) {

  }

  onConfigurationTheme(theme: string): void {
    if(theme === 'DARK'){

    } else {

    }
  }
}
