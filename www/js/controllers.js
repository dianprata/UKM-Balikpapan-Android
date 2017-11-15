var BASE_URL = 'http://ukmbpn.comli.com';

angular.module('starter.controllers', [])   

.controller('AppCtrl', function($scope,$rootScope,$ionicModal,
    $timeout,$http,$ionicActionSheet,$ionicHistory,$ionicPopup,$state,$ionicPlatform,$ionicSideMenuDelegate,$state) {
 
    // $scope.username = $localStorage.username;
    $scope.loginData = {};
    $scope.reset_state = function(){
      $localStorage.page_state = '';
      $ionicHistory.goBack();
    };
  
  
   // Perform the login action when the user submits the login form
   $scope.doLogin = function() {
     console.log('Doing login', $scope.loginData);
         var request = $http({
                 method: "post",
                 url: BASE_URL+"/login.php",
                 data: {
                     username: $scope.loginData.username,
                     password: $scope.loginData.password
                 },
                 headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
             });
             request.success(function (data) {
                 $scope.message = "Console : "+data;
                 if(data=="false"){
                     $scope.showAlertFail();	
                 }else{
                     $scope.showAlertSuccess();
                 }
          });
   };

   $scope.showAlertFail = function() {
        var alertPopup = $ionicPopup.alert({
          title: 'Login Fail!',
          template: 'Invalid Username and Password '
        });
   };
   
   $scope.showAlertSuccess = function() {
        var alertPopup = $ionicPopup.alert({
          title: 'Login Success!',
          template: 'Welcome "'+ $scope.loginData.username +'"'
        });
        $state.go('app.home');
   };

    $scope.doLogout = function(){
        var myPopup = $ionicPopup.show({
        title: 'UKMBPN',
        subTitle: 'Sign Out is Successfully!',
        buttons: [{
            type: 'button button-outline button-positive',
            text: 'OK'
        }]
        });

        $timeout(function() {
        myPopup.close(); //close the popup after 3 seconds for some reason
        $state.go('login')
        // window.location.href = "#/login";
        $rootScope.isLogin = false;
        }, 2000);
    }
})

// // // Login Controller
// .controller('LoginCtrl',function($scope,$rootScope,$http,$ionicPopup,$timeout,$ionicPlatform,$ionicHistory,$location,$state){
//     $scope.loginData = {};
//     $scope.doLogin = function() {
//       console.log('Doing login', $scope.loginData);
//         var request = $http.post(BASE_URL+'/login.php',{ username: $scope.loginData.username , password: $scope.loginData.password}, {headers: { 'Content-Type': 'application/x-www-form-urlencoded' }}
//         ).then(function(response){
    
//             // // records is the 'server response array' variable name.
//             // $scope.user_details = response.records;  // copy response values to user-details object.
            
//             // //stores the data in the session. if the user is logged in, then there is no need to show login again.
//             // sessionStorage.setItem('loggedin_id', $scope.user_details.id_user);
//             // sessionStorage.setItem('loggedin_nama', $scope.user_details.nama );
//             // sessionStorage.setItem('loggedin_username', $scope.user_details.username);
//             // sessionStorage.setItem('loggedin_email', $scope.user_details.email);
            
//             // remove the instance of login page, when user moves to profile page.
//             // if you dont use it, you can get to login page, even if you are already logged in .
//             // $ionicHistory.nextViewOptions({
//             //     disableAnimate: true,
//             //     disableBack: true
//             // });

//             if(response.data == "true"){
//                 var loginSuccces = $ionicPopup.show({
//                   title: 'UKMBPN',
//                   subTitle: 'Sign In is Successfully!',
//                   buttons: [{
//                     type: 'button-outline button-positive',
//                     text: 'OK'
//                   }]
//                 });

//             console.log(response.data);
//             // localStorage.token = response.data.token;
//             // $localStorage.username = response.data.user.name;
//             // $localStorage.user_id = response.data.user.id;
//             // localStorage.username = response.data.username;
//             window.location.href="#/app/home";
//             $rootScope.isLogin = true;
        

//             $timeout(function() {
//                 loginSuccces.close(); //close the popup after 3 seconds for some reason
//              }, 2000);

//           } else {
//             var myPopup = $ionicPopup.show({
//               title: 'UKMBPN',
//               subTitle: 'Please check your username or password.',
//               buttons: [{
//                     type: 'button-outline button-positive',
//                     text: 'OK'
//                   }]
//             });
    
//             $timeout(function() {
//                myPopup.close(); //close the popup after 3 seconds for some reason
//             }, 2000);
//           }
//         },function(err){
//           var myPopup = $ionicPopup.show({
//             title: 'UKMBPN',
//             subTitle: 'Please check your username and password.',
//             buttons: [{
//               type: 'button-outline button-positive',
//               text: 'OK'
//             }]
//          });
    
//           $timeout(function() {
//              myPopup.close(); //close the popup after 3 seconds for some reason
//           }, 2000);
//         });
//       }
    
// })

// Search
.controller('MainCtrl', function($scope, $ionicSideMenuDelegate) {
  console.log('MainCtrl');

  $scope.toggleLeft = function() {
      $ionicSideMenuDelegate.toggleLeft();
  };

  $scope.data=["JavaScript","Java","Ruby","Python"];
})

.directive('searchBar', [function () {
return {
  scope: {
      ngModel: '='
  },
  require: ['^ionNavBar', '?ngModel'],
  restrict: 'E',
  replace: true,
  template: '<ion-nav-buttons side="right">'+
                  '<div class="searchBar">'+
                      '<div class="searchTxt" ng-show="ngModel.show">'+
                          '<div class="bgdiv"></div>'+
                          '<div class="bgtxt">'+
                              '<input type="text" placeholder="Search" ng-model="ngModel.txt">'+
                          '</div>'+
                      '</div>'+
                      '<i class="icon placeholder-icon" ng-click="ngModel.txt=\'\';ngModel.show=!ngModel.show"></i>'+
                  '</div>'+
              '</ion-nav-buttons>',
  
  compile: function (element, attrs) {
      var icon=attrs.icon
              || (ionic.Platform.isAndroid() && 'ion-android-search')
              || (ionic.Platform.isIOS()     && 'ion-ios-search-strong')
              || 'ion-search';
      angular.element(element[0].querySelector('.icon')).addClass(icon);
      
      return function($scope, $element, $attrs, ctrls) {
          var navBarCtrl = ctrls[0];
          $scope.navElement = $attrs.side === 'right' ? navBarCtrl.rightButtonsElement : navBarCtrl.leftButtonsElement;
          
      };
  },
  controller: ['$scope','$ionicNavBarDelegate', function($scope,$ionicNavBarDelegate){
      var title, definedClass;
      $scope.$watch('ngModel.show', function(showing, oldVal, scope) {
          if(showing!==oldVal) {
              if(showing) {
                  if(!definedClass) {
                      var numicons=$scope.navElement.children().length;
                      angular.element($scope.navElement[0].querySelector('.searchBar')).addClass('numicons'+numicons);
                  }
                  
                  title = $ionicNavBarDelegate.getTitle();
                  $ionicNavBarDelegate.setTitle('');
              } else {
                  $ionicNavBarDelegate.setTitle(title);
              }
          } else if (!title) {
              title = $ionicNavBarDelegate.getTitle();
          }
      });
  }]
};
}])