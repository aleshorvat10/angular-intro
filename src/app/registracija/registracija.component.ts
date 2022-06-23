import { Component, OnInit } from '@angular/core';
import { DataService, Prijava } from '../data.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.css']
})
export class RegistracijaComponent implements OnInit {

  prijava:Prijava = new Prijava
  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
  }
  addPrijava() {
    this.dataService.savePrijava(this.prijava).subscribe(_ => {
      //Go back to the home page
      this.router.navigate(['/'])
    })
  }
}
