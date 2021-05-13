import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/services/register.service';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  constructor(private registerService: RegisterService, private router: Router) { }

  ngOnInit(): void {
  }

  register(form: NgForm) {
    let user: User = form.value;

    this.registerService.register(user).subscribe(
      res => {
        console.log(res);
        alert('Cadastro realizado com sucesso!'); 
        this.router.navigateByUrl('/login');
      },
      err => {
        console.log(err);
        alert('Dados Inválidos!');        
      }
    );
  }

}
