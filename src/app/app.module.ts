import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { GalleryComponent } from './gallery/gallery.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { RegisterComponent } from './register/register.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { CartComponent } from './cart/cart.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ProductsComponent } from './products/products.component';
import { LoadingComponent } from './loading/loading.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AllordersComponent } from './allorders/allorders.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { HeadersInterceptor } from './headers.interceptor';
import { WishlistComponent } from './wishlist/wishlist.component';
import { ToastrModule } from 'ngx-toastr';
import { CategoriesComponent } from './categories/categories.component';
import { SearchPipe } from './search.pipe';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    GalleryComponent,
    FooterComponent,
    AboutComponent,
    ContactComponent,
    RegisterComponent,
    LoginComponent,
    LogoutComponent,
    CartComponent,
    NotfoundComponent,
    ProductsComponent,
    LoadingComponent,
    ProductDetailsComponent,
    AllordersComponent,
    CheckoutComponent,
    WishlistComponent,
    CategoriesComponent,
    SearchPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CarouselModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    FormsModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:HeadersInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
