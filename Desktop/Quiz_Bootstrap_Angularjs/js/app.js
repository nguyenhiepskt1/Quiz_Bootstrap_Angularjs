var app = angular.module('myApp', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
    .when('/home', {
        templateUrl: 'trangchuchualogin.html',
        controller:'subjectCtrl',
    })
    .when('/trangchu', {
        templateUrl: 'trangchu.html',
        controller:'subjectCtrl',
    })
    .when('/sinhvien', {
        templateUrl: 'sinhvien.html',
        controller:'subjectCtrl',
        controller: 'ttSV'
    })
    .when('/quanlymonhoc', {
        templateUrl: 'quanlymonhoc.html',
        controller:'subjectCtrl',
        controller: 'ttMH'
    })
    .when('/trangchuadmin', {
        templateUrl: 'trangchuadmin.html',
        controller:'subjectCtrl',
    })
    .when('/monhoc', {
        templateUrl: 'monhoc.html',
        controller:'subjectCtrl'
    })
    .when('/subjects', {
        templateUrl: 'monhocchualogin.html',
        controller:'subjectCtrl'
    })
    .when('/quiz/:id/:name', {
        templateUrl: 'quiz-app.html',
        controller:'quizsCtrl'
    })
    .when('/gioithieu', {
        templateUrl: 'gioithieu.html'
    })
    .when('/lienhe', {
        templateUrl: 'lienhe.html'
    })
    .when('/gopy', {
        templateUrl: 'gopy.html'
    })
    .when('/hoidap', {
        templateUrl: 'hoidap.html'
    })
    .when('/quenmatkhau', {
        templateUrl: 'quenmatkhau.html',
        controller: 'forgotPass'
    })
    .when('/dangnhap', {
        templateUrl: 'dangnhap.html',
        controller: 'userLogin',
    })
    .when('/dangky', {
        templateUrl: 'dangky.html',
        controller: 'userRegister'
    })
    .when('/capnhattaikhoan', {
        templateUrl: 'capnhattaikhoan.html',      
    })
    .otherwise({
        templateUrl: 'trangchuchualogin.html'
    })
});

app.controller("ttSV", function ($scope, $http) {
    $scope.students = [];
    $scope.index=-1;
    const api = 'https://620c979cb57363259391daa7.mockapi.io/students';
    $http.get(api).then(function (response) {
            $scope.students = response.data;
        })
        .catch(function (error) {
            console.error(error);
        });
    $scope.edit=function(index){
        $scope.index=index;     
        $scope.student=angular.copy($scope.students[index])
    }
    $scope.onFormSubmit = function (event) {
        event.preventDefault();               
        if($scope.index==-1){
            $http.post(api, $scope.student)
            .then(function (response) {
                $scope.students.push(response.data);
                alert("Thêm thành công");
            });
        }else{
            var result = confirm("Bạn có chắc chắn muốn sửa");
            if(result)  {
                const id = $scope.students[$scope.index].id
                const updateApi = api + '/' + id;
                $http.put(updateApi,$scope.student)
                .then(function (response) {
                $scope.students[$scope.index]= response.data;
                alert("Sửa thành công");
                $scope.index=-1;                                                      
            }); 
            }                         
        }
    }
    $scope.onDelete = function (index) {
        var result = confirm("Bạn có chắc chắn muốn xóa");
        if(result)  {
            const id = $scope.students[index].id
            const deleteApi = api + '/' + id;
            $http.delete(deleteApi)
                .then(function (response) {  
                    $scope.students.splice(index,1);
                    alert("Xóa thành công");                                                                     
                });   
        }       
    }
});

app.controller("ttMH", function ($scope, $http) {
    $scope.monhocs = [];
    $scope.index=-1;
    const api = 'https://620c979cb57363259391daa7.mockapi.io/monhocs';
    $http.get(api).then(function (response) {
            $scope.monhocs = response.data;
        })
        .catch(function (error) {
            console.error(error);
        });
    $scope.edit=function(index){
        $scope.index=index;     
        $scope.monhoc=angular.copy($scope.monhocs[index])
    }
    $scope.onFormSubmit = function (event) {
        event.preventDefault();               
        if($scope.index==-1){
            $http.post(api, $scope.monhoc)
            .then(function (response) {
                $scope.monhocs.push(response.data);
                alert("Thêm thành công");
            });
        }else{
            var result = confirm("Bạn có chắc chắn muốn sửa");
            if(result)  {
                const id = $scope.monhocs[$scope.index].id
                const updateApi = api + '/' + id;
                $http.put(updateApi,$scope.monhoc)
                .then(function (response) {
                $scope.monhocs[$scope.index]= response.data;
                alert("Sửa thành công");
                $scope.index=-1;                                                      
            }); 
            }                         
        }
    }
    $scope.onDelete = function (index) {
        var result = confirm("Bạn có chắc chắn muốn xóa");
        if(result)  {
            const id = $scope.monhocs[index].id
            const deleteApi = api + '/' + id;
            $http.delete(deleteApi)
                .then(function (response) {  
                    $scope.monhocs.splice(index,1);
                    alert("Xóa thành công");                                                                     
                });   
        }       
    }
});

app.controller("userLogin", function($scope, $http) {
    $http.get("https://620c979cb57363259391daa7.mockapi.io/students").then(function(response) {
        $scope.checklogin = false;
        $scope.students = response.data;
        $scope.login = function() {
            for(var i = 0; i < $scope.students.length; i++) {
                if($scope.username == "nguyenhiepadmin" && $scope.password == "nguyenhiepadmin")  {
                    alert("Đăng nhập thành công");
                    window.location.href="#!/trangchuadmin";
                    $scope.checklogin = true;
                    return;
                }                   
                if($scope.username == $scope.students[i].username && $scope.password == $scope.students[i].password)  {
                    alert("Đăng nhập thành công");
                    window.location.href="#!/trangchu";
                    $scope.checklogin = true;
                }      
            }
            if($scope.checklogin == false) {
                alert("Đăng nhập thất bại !!");
            }
            
        }
    })
});

app.controller("forgotPass", function($scope, $http) {
    $http.get("https://620c979cb57363259391daa7.mockapi.io/students").then(function(response) {
        $scope.checklogin = false;
        $scope.students = response.data;
        $scope.forgot = function() {
            for(var i = 0; i < $scope.students.length; i++) {
                if($scope.username == $scope.students[i].username && $scope.email == $scope.students[i].email)  {
                    alert("Lấy lại mật khẩu thành công: " + $scope.students[i].password);
                    window.location.href="#!/quenmatkhau";
                    $scope.checklogin = true;
                }          
            }
            if($scope.checklogin == false) {
                alert("Lấy lại mật khẩu thất bại");
            }
            
        }
    })
});

app.controller("userRegister", function($scope,$http) {
    $scope.postdata = function(){
        var data={
        username: $scope.username,
        fullname: $scope.fullname,
        email: $scope.email,
        password: $scope.password, 
        repassword: $scope.repassword
        }
        if($scope.repassword != $scope.password) {
            alert("Mật khẩu nhập lại không trùng khớp")
        }
        else {
            $http.post("https://620c979cb57363259391daa7.mockapi.io/students", data).then(function(response) {           
            alert("Đăng ký thành công!");
            window.location.href="#!/dangnhap";
        }, (function(response) {
            alert("Đăng ký thất bại!");
        }))
        }
    }
});

app.controller("quizsCtrl", function($scope, $http, $routeParams, quizFactory) {
    $http.get('../db/Quizs/' + $routeParams.id + '.js').then(function(res) {
        quizFactory.questions = res.data;
    });
});
app.controller("subjectCtrl", function($scope, $http) {
    $scope.list_subject = [];
    $http.get('../db/Subjects.js').then(function(res) {
        $scope.list_subject = res.data;
    });
    $scope.checklogin1 = function() {
        alert("Bạn cần phải đăng nhập trước !!");
    }
    $scope.checklogin2 = function() {
        alert("Bạn cần đăng xuất trước !!");
    }
});

app.directive("quizfpoly", function(quizFactory, $routeParams) {
    return {
        restrict: "AE",
        scope:{},
        templateUrl:'template-quiz.html',
        link: function(scope, element, atts){
            scope.start = function() {
                quizFactory.getQuestions().then(function() {
                    scope.subjectName = $routeParams.name;
                    scope.id = 1;
                    scope.quizOver = false;
                    scope.inProgress = true;
                    scope.getQuestion();
                })            
            };
            scope.reset = function() {
                scope.inProgress = false;
                scope.score = 0;
            };
            scope.getQuestion = function() {
                var quiz = quizFactory.getQuestion(scope.id);
                if(quiz) {
                    scope.question = quiz.Text;
                    scope.options = quiz.Answers;
                    scope.answer = quiz.AnswerId;
                    scope.answerMode = true;
                }
                else {
                    scope.quizOver = true;
                }             
            }
            scope.checkAnswer = function() {
                if(!$('input[name = answer]:checked').length) return;
                var ans = $('input[name = answer]:checked').val();
                if(ans == scope.answer) {
                    scope.score++;
                    scope.correctAnswer = true;
                } else {            
                    scope.correctAnswer = false;
                }
                scope.answerMode = false;
            };
            scope.nextQuestion = function() {
                scope.id++;
                scope.getQuestion();
            }
            scope.reset();
        }
    }
});
app.factory('quizFactory', function($http, $routeParams) {
    
    return {
        getQuestions:function() {
            return $http.get('../db/Quizs/' + $routeParams.id + '.js').then(function(res) {
                questions = res.data;
            });
        },
        getQuestion:function(id) {
            var randomItem = questions[Math.floor(Math.random() * questions.length)];
            var count = questions.length;
            if(count > 10) {
                count = 10;
            }      
            if(id < count) {
                return randomItem;
            }
            else {
                return false;
            }
        }
    }
});