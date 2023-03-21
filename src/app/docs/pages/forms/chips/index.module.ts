import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {IndexComponent} from "./index.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DevModule} from "../../../../core/dev.module";
import {DocModule} from "../../../components/doc.module";

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild([{path: '', component: IndexComponent}]),

        DevModule,
        DocModule,
    ],
  declarations: [
    IndexComponent
  ]
})
export class Module {

}
