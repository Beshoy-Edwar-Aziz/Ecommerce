import { NgModule } from '@angular/core';
import { ResolveFn, RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { GalleryComponent } from './gallery/gallery.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { CartComponent } from './cart/cart.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { authGuard } from './auth.guard';
import { ProductsComponent } from './products/products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AllordersComponent } from './allorders/allorders.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CategoriesComponent } from './categories/categories.component';

const routes: Routes = [
  {path:'',redirectTo:'home',title:'Home',pathMatch:'full'},
  {path:'about',component:AboutComponent},
  {path:'Brands',title:'Brands',canActivate:[authGuard], component:ContactComponent},
  {path:'categories',title:'Categories',canActivate:[authGuard], component:CategoriesComponent},
  {path:'register',title:'Register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'home',title:'Home',canActivate:[authGuard],component:GalleryComponent},
  {path:'logout',component:LogoutComponent},
  {path: 'cart',title:'Cart',canActivate:[authGuard],component:CartComponent},
  {path:'product',title:'Product',canActivate:[authGuard],component:ProductsComponent},
  {path:'details/:slug/:id',title:'ProductDetails',canActivate:[authGuard],component:ProductDetailsComponent},
  {path:'checkout/:id',title:'CheckOut',canActivate:[authGuard],component:CheckoutComponent},
  {path:'allorders',title:'Your Orders',canActivate:[authGuard],component:AllordersComponent},
  {path:'wishList',title:'wishList',canActivate:[authGuard],component:WishlistComponent},
  {path:'profile',title:'Profile',canActivate:[authGuard],loadChildren: ()=>import('./profile/profile.module').then((m)=>m.ProfileModule)},
  {path:'forgotPassword',title:'ForgetPass',loadChildren:()=>import('./forget-password/forget-password.module').then((m)=>m.ForgetPasswordModule)},
  {path:'newPassword',title:'NewPassword',loadChildren:()=>import('./new-password/new-password.module').then((m)=>m.NewPasswordModule)},
  {path:'**',component:NotfoundComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
