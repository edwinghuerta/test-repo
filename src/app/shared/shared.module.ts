import { PartnerReceiptsComponent } from './pages/partner-receipts/partner-receipts.component';
import { InvitationComponent } from './pages/invitation/invitation.component';
import { HomeComponent } from './pages/home/home.component';
import { NgxPrintModule } from 'ngx-print';
import { ActionsDialog } from './dialogs/actions/actions.dialog';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxFormsModule } from '@mukuve/ngx-forms';
import { QRCodeModule } from 'angularx-qrcode';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialAuthServiceConfig,
} from 'angularx-social-login';

import { environment } from './../../environments/environment';
import { DialogModule } from './../libs/dialog/dialog.module';
import { ButtonComponent } from './components/button/button.component';
import { CardComponent } from './components/card/card.component';
import { FilterbarComponent } from './components/filterbar/filterbar.component';
import { ListComponent } from './components/list/list.component';
import { TabComponent } from './components/tabs/tab.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { TitlebarComponent } from './components/titlebar/titlebar.component';
import { AuthDialog } from './dialogs/auth/auth.dialog';
import { LongPressDirective } from './directives/long-press.directive';
import { MakeTriggerComponent } from './pages/make-trigger/make-trigger.component';
import { HeaderComponent } from './sections/header/header.component';
import { NavHeaderComponent } from './sections/nav-header/nav-header.component';
import { NavbarComponent } from './sections/navbar/navbar.component';
import { ScopeMenuComponent } from './sections/scope-menu/scope-menu.component';
import { FormDialog } from './dialogs/form/form.dialog';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { ResourceListComponent } from './components/resource-list/resource-list.component';
import { QrDialog } from './dialogs/qr/qr.dialog';
import { TriggerDialog } from './dialogs/trigger/trigger.dialog';

const imports = [
  CommonModule,
  DialogModule,
  NgxFormsModule,
  FormsModule,
  ReactiveFormsModule,
  NgxPrintModule,
  QRCodeModule
];
const declarations = [
  // Pages
  HomeComponent,
  InvitationComponent,
  PartnerReceiptsComponent,
  // ...
  LongPressDirective,
  AuthDialog,
  FormDialog,
  ActionsDialog,
  HeaderComponent,
  NavHeaderComponent,
  CardComponent,
  TitlebarComponent,
  FilterbarComponent,
  SearchbarComponent,
  ResourceListComponent,
  ListComponent,
  NavbarComponent,
  ScopeMenuComponent,
  ButtonComponent,
  TabsComponent,
  TabComponent,
  MakeTriggerComponent,
  QrDialog,
  TriggerDialog
];

@NgModule({
  declarations,
  imports: [...imports, RouterModule],
  exports: [...declarations, ...imports],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [AuthDialog, FormDialog, ActionsDialog],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(environment.socials.googleId),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(environment.socials.facebookId),
          },
        ],
      } as SocialAuthServiceConfig,
    },
  ]  
})
export class SharedModule {}
