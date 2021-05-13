import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HomeComponent } from 'src/app/layout/home/home.component';
import { RegisterService } from 'src/app/services/register.service';
import { User } from 'src/app/_models/user';
import { AccountService } from '../shared/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private accountService: AccountService,
    public router: Router,
    private registerService: RegisterService
  ) { }

  ngOnInit(): void {
  }

  login(form: NgForm) {

    let user: User = form.value;
    console.log(user);
    this.registerService.login(user).subscribe(
      res => {
        console.log(res);
        this.router.navigateByUrl('/home');
      },
      err => {
        console.log(err);
        alert('Email ou senha incorreta!');
      }
    )
  }

}
