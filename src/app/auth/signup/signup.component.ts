import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Store } from "@ngrx/store";

import * as fromApp from "../../store/app.reducers";
import * as AuthActions from "../store/auth.actions";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {}

  onSignup(form: NgForm) {
    const username = form.value.username;
    const password = form.value.password;
    const name = form.value.name;
    const surname = form.value.surname;
    const email = form.value.email;
    this.store.dispatch(
      new AuthActions.TrySignup({
        username: username,
        password: password,
        name: name,
        surname: surname,
        email: email
      })
    );
  }
}
