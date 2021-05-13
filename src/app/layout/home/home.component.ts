import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/services/register.service';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  usuario: User;

  constructor(
    private registerService: RegisterService,
    public router: Router) { }

  ngOnInit(): void {
    this.home();
  }

  home(){
    this.registerService.logged().subscribe(
      res => {
        console.log(res);
        this.usuario = res;
      },
      err => {
        console.log(err);
        alert('Para acessar essa página é necessário fazer login.')
        this.router.navigateByUrl('/login');
      }
    )
  }

  logout(){
    alert('Logout realizado.')
    this.registerService.setToken(null);
    this.router.navigateByUrl('/login');
    
    
  }

}
