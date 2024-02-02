import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private renderer: Renderer2, private elRef: ElementRef) { }

  ngOnInit(): void {
    this.renderer.listen(this.elRef.nativeElement, 'click', () => {
      window.location.href = 'http://localhost:4200/start-consultas';
    });
  }

}
