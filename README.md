# Angular-Module-User

This module helps user to manage their profile.

**Required Packages**
*--no required packages--*

**Required Modules**
1. fmblog-frontend-navigation
2. fmblog-frontend-shared
3. Angular-Module-Core

**Functionalities**
1. Update user profile image
2. Reset user password.

**Installation**
1. Add the module to Angular Project as a submodule. 
`git submodule add https://github.com/bwqr/Angular-Module-User src/app/user`
2. Import `UserModule` from inside `AppModule`.
3. This module requires the fmblog-frontend-navigation module's routes. So there is no need to add routes.