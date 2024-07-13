import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { AuthHttpInterceptor } from '@auth0/auth0-angular';

import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { FirstTaskComponent } from './components/first-task/first-task.component';
import { SecondTaskComponent } from './components/second-task/second-task.component';
import { AuthModule } from '@auth0/auth0-angular';
import { environment } from '../environments/environment';
import { ThirdTaskComponent } from './components/third-task/third-task.component';
import { BlogPostsComponent } from './components/third-task/blog-posts/blog-posts.component';
import { blogPostsReducer } from './state/blog-posts/blog-posts.reducer';
import { BlogPostsEffects } from './state/blog-posts/blog-posts.effects';
import { MaterialModule } from './modules/material.module';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    FirstTaskComponent,
    SecondTaskComponent,
    ThirdTaskComponent,
    BlogPostsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    MaterialModule,
    AuthModule.forRoot({
      ...environment.auth,
      authorizationParams: {
        redirect_uri: window.location.origin,
      },
      httpInterceptor: {
        allowedList: [`${environment.dev.apiUrl}/*`],
      },
    }),
    StoreModule.forRoot({ blogPosts: blogPostsReducer }),
    EffectsModule.forRoot([BlogPostsEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [
    provideHttpClient(),
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
