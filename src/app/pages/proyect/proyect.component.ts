import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Inject,
} from '@angular/core';
import Split from 'split-grid';
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';

@Component({
  selector: 'app-proyect',
  templateUrl: './proyect.component.html',
  styleUrls: ['./proyect.component.css'],
})
export class ProyectComponent implements AfterViewInit {
  @ViewChild('html') htmlElement!: ElementRef;
  @ViewChild('js') jsElement!: ElementRef;
  @ViewChild('css') cssElement!: ElementRef;
  @ViewChild('iframe') iframeElement!: ElementRef;

  highlightedHtml = '';
  highlightedCss = '';
  highlightedJs = '';

  constructor(@Inject(HIGHLIGHT_OPTIONS) private highlightOptions: any) {
    console.log(this.highlightOptions);
  }

  ngAfterViewInit(): void {
    const js = this.jsElement.nativeElement as HTMLInputElement;
    const css = this.cssElement.nativeElement as HTMLInputElement;
    const html = this.htmlElement.nativeElement as HTMLInputElement;

    js.addEventListener('input', this.update);
    css.addEventListener('input', this.update);
    html.addEventListener('input', this.update);

    const verticalGutter = document.querySelector('.vertical-gutter');
    const horizontalGutter = document.querySelector('.horizontal-gutter');

    if (
      verticalGutter instanceof HTMLElement &&
      horizontalGutter instanceof HTMLElement
    ) {
      Split({
        columnGutters: [
          {
            track: 1,
            element: verticalGutter,
          },
        ],
        rowGutters: [
          {
            track: 1,
            element: horizontalGutter,
          },
        ],
      });
    } else {
      console.error('One or both gutters not found');
    }
  }

  update = () => {
    const html = this.createHtml();
    this.iframeElement.nativeElement.setAttribute('srcdoc', html);
  };

  createHtml = () => {
    const html = this.htmlElement.nativeElement.value;
    const css = this.cssElement.nativeElement.value;
    const js = this.jsElement.nativeElement.value;

    const cssElement = this.cssElement.nativeElement;
    const hljs = this.highlightOptions.hljs;
    if (hljs && cssElement) {
      const cssHighlighted = hljs.highlight('css', css);
      cssElement.innerHTML = cssHighlighted.value;
    }

    return ` 
      <!doctype html>
      <html lang="es">
        <head>
          <style>
          .hljs {
      color: #0077c2;
    }
            ${css}
          </style>
        </head>
        <body>
          <script>
            ${js}
          </script>
          ${html}
        </body>
      </html>
    `;
  };
}
/* const $ = (selector) => document.querySelector(selector);

const $js = $('#js');
const $css = $('#css');
const $html = $('#html');

$js.addEventListener('input', update);
$css.addEventListener('input', update);
$html.addEventListener('input', update);

function update() {
  const html = createHtml();
  $('iframe').setAttribute('srcdoc', html);
}

const createHtml = () => {
  const html = $html.value;
  const css = $css.value;
  const js = $js.value;

  return ` 
    <!doctype html>
    <html lang="es">
     <head>
      <style>
       ${css}
      </style>
     </head>
     <body>
       <script>
        ${js}
       </script>
        ${html}
     </body>
    </html>
  `;
};
 */

/* import split from 'split-grid';
Split({
  columnGutters: [
    {
      track: 1,
      element: document.querySelector('.vertical-gutter'),
    },
  ],
  rowGutters: [
    {
      track: 1,
      element: document.querySelector('horizontal-gutter'),
    },
  ],
}); */

/* import * as monaco from 'monaco-editor';
import Htmlworker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import { HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';

windows.monacoEnviroments = {
  getWorker(, label) {
    if (label == 'html') {
      return new Htmlworker()
    }

  }
} 

const htmlEditor = monaco.editor.create($html, {
  value: '',
  language: 'html',
  theme: 'vs-dark'
})
 */
