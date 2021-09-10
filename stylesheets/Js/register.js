//至頂功能
$(function () {
    if(localStorage.getItem('userName')==null){
        document.querySelector('.setup').style.display="none"
        document.querySelector('.setup2').style.display="none"
    }else{
        document.querySelector('.setup').style.display="block"
        document.querySelector('.login').style.display="none"
        document.querySelector('.reg').style.display="none"
        document.querySelector('.login-one').style.display="none"
        document.querySelector('.reg-one').style.display="none"
    }
    var $win = $(window);
    var $backToTop = $('.js-back-to-top');
    var $headerTop =$('.site-header');
    var $headerRun =$('.site-header2');
    // 當用戶滾動到離頂部100像素時，展示回到頂部按鈕
    $win.scroll(function () {
        if ($win.scrollTop() > 50) {
            $backToTop.show();
            $headerTop.hide();
            $headerRun.show();
        } else {
            $backToTop.hide();
            $headerTop.show();
            $headerRun.hide();
        } 
    });
    // 當用戶點擊按鈕時，通過動畫效果返回頭部
    $backToTop.click(function () {
        $('html, body').animate({scrollTop: 0}, 200);
    });
    

    const config =({
        apiKey: "AIzaSyB5VkCXdvmei1yH8Wd94DuewfebvMF8nrE",
        authDomain: "concent-4b5ff.firebaseapp.com",
        databaseURL: "https://concent-4b5ff-default-rtdb.firebaseio.com",
        projectId: "concent-4b5ff",
        storageBucket: "concent-4b5ff.appspot.com",
        messagingSenderId: "130866503341",
        appId: "1:130866503341:web:e91223f3495b94e45c3024",
        measurementId: "G-EXKJ2EPGKP"
    });
    firebase.initializeApp(config);
    console.log(config);
    var email= document.getElementById("email");
    var password =document.getElementById("password");
    var submitBtn =document.getElementById("submitBtn");
    var password =document.getElementById("password");
    var loginBtn =document.getElementById("loginBtn");
    var btnGooglePopup = document.getElementById('googleSingUpPopup');
    var btnFacebookPopup = document.getElementById('facebookSingUpPopup');
    btnGooglePopup.addEventListener('click',function(e){
        e.preventDefault();
        var googleProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(googleProvider).then(function(result){
            var googleToken = result.credential.accessToken;
            var googleUser = result.user;
            console.log(googleUser.email);
            localStorage.setItem('userName',googleUser.email)
            document.location.href="./index.html";
            alert('登入成功');
            document.querySelector('.setup').style.display="block"
            document.querySelector('.login').style.display="none"
            document.querySelector('.reg').style.display="none"
        }).catch(function(error) {
            console.log(error.code);
            console.log(error.message);
        });
    })
    btnFacebookPopup.addEventListener('click',function(e){
        e.preventDefault();
        var facebookProvider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(facebookProvider).then(function(result){
            var Token = result.credential.accessToken;
            var User = result.user;
            console.log(User.email);
            localStorage.setItem('userName',User.email)
            document.location.href="./index.html";
            alert('登入成功');
            document.querySelector('.setup').style.display="block"
            document.querySelector('.login').style.display="none"
            document.querySelector('.reg').style.display="none"
        }).catch(function(error) {
            // Handle Errors here.
            console.log(error.code);
            console.log(error.message);
        });
    })


    // loginBtn.addEventListener('click',function(e){
    //     if(email.value=='' || password.value==''){
    //         $(".my-login-validation").submit(function() {
    //             var form = $(this);
    //             if (form[0].checkValidity() === false) {
    //                 event.preventDefault();
    //                 event.stopPropagation();
    //                 form.addClass('was-validated');
    //             }
    //         });
    //     }else{
    //         e.preventDefault();
    //         firebase.auth().signInWithEmailAndPassword(email.value, password.value)
    //         .then(() => {
    //             var user = firebase.auth().currentUser;
    //             if(user){
    //                 alert('帳號登入成功');
    //                 console.log(user)
    //                 console.log(user.email)
    //                 localStorage.setItem('userName',user.email)
    //                 email.value=''
    //                 password.value=''
    //                 document.location.href="./index.html";
    //                 document.querySelector('.setup').style.display="block"
    //                 document.querySelector('.login').style.display="none"
    //                 document.querySelector('.reg').style.display="none"
    //             }
    //         })
    //         .catch((error) => {
    //             console.log('錯誤')
    //             alert('請確認帳號、密碼是否有誤')
    //         });
    //     }
        
    // })

    submitBtn.addEventListener('click',function(e){
        if(email.value=='' || password.value==''){
            $(".my-login-validation").submit(function() {
                var form = $(this);
                if (form[0].checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                    form.addClass('was-validated');
                }
            });
        }else{
            e.preventDefault();
            firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
            .then(() => {
                alert("註冊成功")
                email.value=''
                password.value=''
                window.location.reload();
                })
            .catch((error) => {
                console.log('錯誤')
                alert('格式不正確')
            });
        }
    })
    $("input[type='password'][data-eye]").each(function(i) {
        var $this = $(this)
            id = 'eye-password-' + i,
            el = $('#' + id);
    
            // $this.wrap($("<div/>", {
            //     // style: 'position:relative',
            //     id: id
            // }));
        $this.css({
            paddingRight: 30,
            marginBottom: 10
        });
        $this.after($("<div/>", {
            html: '<i class="far fa-eye"></i>',
            class: 'btn eye',
            id: 'passeye-toggle-'+i,
        }).css({
            position: 'absolute',
            right: 10,
            top: ($this.outerHeight() / 2) - 12,
            fontSize: 12,
            cursor: 'pointer',
        }));
    
        $this.after($("<input/>", {
            type: 'hidden',
            id: 'passeye-' + i
        }));
    
        var invalid_feedback = $this.parent().parent().find('.invalid-feedback');
    
        if(invalid_feedback.length) {
            $this.after(invalid_feedback.clone());
        }
    
        $this.on("keyup paste", function() {
            $("#passeye-"+i).val($(this).val());
        });
        $("#passeye-toggle-"+i).on("click", function() {
            if($this.hasClass("show")) {
                $this.attr('type', 'password');
                $this.removeClass("show");
                $(this).removeClass("far fa-eye");
            }else{
                $this.attr('type', 'text');
                $this.val($("#passeye-"+i).val());				
                $this.addClass("show");
            }
        });
    });    
 
});


