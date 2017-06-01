/**
 * Created by YoYo on 5/31/17.
 */
/**
 * Created by YoYo on 3/9/17.
 */
(function () {
//    'use strict';

    angular
        .module('app')

        .controller('Campaigns.IndexController',['$scope','$http','$rootScope', '$location','myService2','UserService','myService','myService3','myService4',function ($scope,$http,$rootScope,$location,myService2,UserService,myService,myService3,myService4) {
            //
            var vm = this;
            //   console.log(vm.user);
            vm.user = null;
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
                //    console.log(user);
                myService.set(vm.user.username);
                myService3.set(vm.user.firstName);
                //  console.log(vm.user);
            });

            $http.get('/getcampaign')
                .success(function (res) {
                    $scope.str_login = res;
                    // var username=myService.get();
                    // //  console.log(username);
                    // for(var i=0;i<$scope.str_login.length;i++){
                    //     //   console.log($scope.str_login.length);
                    //     if($scope.str_login[i].username!==username){
                    //         $scope.str_login.splice(i,1);
                    //         i=i-1;
                    //     }
                    // }
                        console.log($scope.str_login);
                });
            //   console.log("messagectrl ok");
            // $scope.str_login=
            //
            $scope.view=function (index) {
                console.log("new");
                $location.path('/newview');
                myService2.set(index);
                //    console.log(index);
            };
            $scope.delete=function(id) {

                $scope.str_login.splice(id,1);
                //  console.log(id);
                $http.delete('/getcampaign/'+id);
                //  console.log($scope.str_login);

            }
            $scope.sendMsg=function(){
                $location.path('/addcampaign');
                //  alert("successfully send!");
            }
            //
            $scope.rating = 5;
            $scope.rateFunction = function(rating,objid) {
                //   alert('Rating selected - ' + objid);
                myService4.set(objid);

            };


        }])
        .factory('myService', function() {
            var savedData = {}
            function set(data) {
                savedData = data;
            }
            function get() {
                return savedData;
            }

            return {
                set: set,
                get: get
            }

        })
        .factory('myService2', function() {
            var savedData = {}
            function set(data) {
                savedData = data;
            }
            function get() {
                return savedData;
            }

            return {
                set: set,
                get: get
            }

        })
        .factory('myService3', function() {
            var savedData = {}
            function set(data) {
                savedData = data;
            }
            function get() {
                return savedData;
            }

            return {
                set: set,
                get: get
            }

        })
        .factory('myService4', function() {
            var savedData = {}
            function set(data) {
                savedData = data;
            }
            function get() {
                return savedData;
            }

            return {
                set: set,
                get: get
            }

        })
        .controller('DetailsCtrl',['$scope','$http','$rootScope', '$location','myService2','UserService','myService',function ($scope,$http,$rootScope,$location,myService2,UserService,myService) {
            //   console.log('message detail ctrl');
            var index=myService2.get();

            console.log(index);
            $http.get('/getcampaign')
                .success(function (res) {
                    $scope.str_login = res;
                    //  console.log($scope.str_login[0].title);
                    // var username=myService.get();
                    // //  console.log(username);
                    // for(var i=0;i<$scope.str_login.length;i++){
                    //     //   console.log($scope.str_login.length);
                    //     if($scope.str_login[i].username!==username){
                    //         $scope.str_login.splice(i,1);
                    //         i=i-1;
                    //     }
                    // }
                    $scope.title=$scope.str_login[index].title;
                    $scope.pname=$scope.str_login[index].name;
                    $scope.ad_content=$scope.str_login[index].ad_content;


                });



        }])
        .controller('SendCtrl',['$scope','$http','$rootScope', '$location','myService2','UserService','myService','myService3',function ($scope,$http,$rootScope,$location,myService2,UserService,myService,myService3) {
            //   console.log('message send ctrl');
            UserService.GetCurrent().then(function (user) {
                // vm.user = user;
                //    console.log(user);
                $scope.partner_id=user._id;
            });
            // c

            $http.get('/getcampaign')
                .success(function (res) {
                    $scope.str_login = res;
                    //  console.log($scope.str_login[0].title);
                    var username = myService.get();
                    //  console.log(username);
                    for (var i = 0; i < $scope.str_login.length; i++) {
                        //   console.log($scope.str_login.length);
                        if ($scope.str_login[i].username !== username) {
                            $scope.str_login.splice(i, 1);
                            i = i - 1;
                        }
                    }
                });
            $scope.SuccessSend=function () {
                // alert($scope.mail);
                //  console.log($scope.str_login);
                var username=myService.get();
                var firstname=myService3.get();
           //onsole.log($scope.sdate+$scope.ssec);
                var sendmsg={name:$scope.pname,partner_id:$scope.partner_id, title:$scope.ttl,starttime:$scope.sdate,duration:$scope.sec,star:'false',ad_content:$scope.ad_content};
                // console.log(sendmsg);
                $scope.str_login.push(sendmsg);
                  console.log($scope.str_login);
                // var receivemsg={name:firstname,sender:username, title:$scope.ttl,username:username,star:'false',descryption:$scope.mail};
                // $scope.str_login.push(receivemsg);
                console.log($scope.str_login);
                var flag=0;
                $http.post('/addcampaign', sendmsg)
                    .success(function (resp) {
                        if(resp === "successful"){
                            flag=1;
                            console.log(flag);
                            $location.path('/campaigns');
                        }else {
                            console.log("Time Error");
                            $scope.isTimeError=function(){
                                return true;

                            }
                        }

                    });
                // $http.post('/addcampaign', receivemsg)
                //     .success(function (resp) {
                //         if(resp === "successful" && flag==1 ){
                //            // console.log("redirect to messages");
                //             $location.path('/campaigns');
                //         }
                //     });


            }


        }])
        .directive('makeStar',['$compile','$http','myService','myService4',
                function($compile,$http,myService,myService4) {

                    return {
                        restrict : 'A',
                        template : '<ul id={{index}} class="rating">'
                        + '	<li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">'
                        + '\u2605'
                        + '</li>'
                        + '</ul>',
                        scope : {
                            ratingValue : '=',
                            max : '=',
                            index: '=',
                            star: '=makeStar',
                            onRatingSelected : '&'

                        },
                        link : function( scope,elem, attrs,$index) {
                            var flag;
                            scope.stars = [];
                            scope.stars.push({
                                filled : false
                            });
                            var str_login;
                            var star_group=document.getElementsByClassName('rating');
                            scope.toggle = function(index) {

                                scope.onRatingSelected({

                                    //   rating : index + 1

                                });
                            }
                            jQuery(document).ready(function(){
                                // console.log(star_group);
                                //  var   str_star=JSON.parse(localStorage.getItem("Messages"));
                                // var token=localStorage.getItem("token");
                                $http.get('/getcampaign')
                                    .success(function (res) {
                                            str_login = res;
                                            //    console.log(str_login);
                                            var username = myService.get();
                                            //  console.log(username);
                                            for (var i = 0; i < str_login.length; i++) {
                                                //   console.log($scope.str_login.length);
                                                if (str_login[i].username !== username) {
                                                    str_login.splice(i, 1);
                                                    i = i - 1;
                                                }
                                            }
                                            for(var j=0;j<str_login.length;j++){
                                                if(str_login[j].star=='true'){
                                                    //    star_group[j].style.color="#21568b";
                                                    //        console.log(str_login[j].star);
                                                    jQuery(star_group[j]).css("color","#3BB9FF");
                                                    //   alert(star_group[j].style.color);
                                                    //      rgb(59, 185, 255)
                                                }
                                            }
                                        }
                                    );




                            })
                            elem.html(scope.star);
                            elem.bind('click', function($index) {
                                // alert (attrs.style);
                                //  attrs.style="color: #21568b";
//console.log(scope._id);
                                var id=scope.index;
                                //    var star_group=document.getElementsByClassName('rating');
                                jQuery(document).ready(function(){
                                        // if(=="#21568b"){
                                        $http.get('/getcampaign')
                                            .success(function (res) {
                                                str_login = res;
                                                //    console.log(str_login);
                                                var username = myService.get();
                                                //  console.log(username);
                                                for (var i = 0; i < str_login.length; i++) {
                                                    //   console.log($scope.str_login.length);
                                                    if (str_login[i].username !== username) {
                                                        str_login.splice(i, 1);
                                                        i = i - 1;
                                                    }
                                                }
                                                var objid=myService4.get();
                                                //   console.log(objid);
                                                if($(star_group[id]).css("color")=="rgb(59, 185, 255)"){
                                                    //  alert("get");
                                                    $(star_group[id]).css("color","lightgrey");
                                                    str_login[scope.index].star='false';
                                                    $http.post('/startofalse/'+objid);


                                                    //   console.log( $(star_group[id]).css("color"));
                                                }
                                                else{
                                                    $(star_group[id]).css("color","#3BB9FF");
                                                    str_login[scope.index].star='true';
                                                    $http.post('/startotrue/'+objid);

                                                }

                                            })
                                    }
                                );
                            });

                        }
                    };
                }]
        );

})();
