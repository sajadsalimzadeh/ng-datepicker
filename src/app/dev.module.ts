import {ErrorHandler, ModuleWithProviders, NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DataTableModule} from "./components/data-table/index.module";
import {SelectModule} from "./components/form/select/index.module";
import {DatePickerModule} from "./components/form/date-picker/date-picker.module";
import {DevTemplateModule} from "./directives/template/dev-template.directive";
import {HttpClientModule} from "@angular/common/http";
import {OverlayModule} from "./components/overlay/overlay.module";
import {GlobalErrorHandler} from "./services/error-handler.service";
import {TimelineModule} from "./components/timeline/timeline.module";
import {ButtonModule} from "./components/button/button.module";
import {CheckboxModule} from "./components/form/checkbox/checkbox.module";
import {InputModule} from "./components/form/input/input.module";
import {ControlGroupModule} from "./components/form/control-group/control-group.module";

@NgModule({
  imports: [
  ],
  declarations: [
  ],
  exports: [
    FormsModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    DataTableModule,
    SelectModule,
    DatePickerModule,
    DevTemplateModule,
    OverlayModule,
    TimelineModule,
    ButtonModule,
    CheckboxModule,
    InputModule,
    ControlGroupModule,
  ],
})
export class DevModule {

  static forRoot(): ModuleWithProviders<DevModule> {
    return {
      ngModule: DevModule,
      providers: [
        { provide: ErrorHandler, useClass: GlobalErrorHandler },
      ]
    }
  }
}

