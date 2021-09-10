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
});


var firebaseConfig =({
    apiKey: "AIzaSyB5VkCXdvmei1yH8Wd94DuewfebvMF8nrE",
    authDomain: "concent-4b5ff.firebaseapp.com",
    databaseURL: "https://concent-4b5ff-default-rtdb.firebaseio.com",
    projectId: "concent-4b5ff",
    storageBucket: "concent-4b5ff.appspot.com",
    messagingSenderId: "130866503341",
    appId: "1:130866503341:web:e91223f3495b94e45c3024",
    measurementId: "G-EXKJ2EPGKP"
});
var a = firebase.initializeApp(firebaseConfig);
console.log(a);
var btnGooglePopup = document.getElementById('googleSingUpPopup');
var btnFacebookPopup = document.getElementById('facebookSingUpPopup');
btnGooglePopup.addEventListener('click',function(e){
    e.preventDefault();
    var googleProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(googleProvider).then(function(result){
        var Token = result.credential.accessToken;
        var User = result.user;
        console.log(User);
        alert('登入成功')
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
    });
})
btnFacebookPopup.addEventListener('click',function(e){
    e.preventDefault();
    var facebookProvider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(facebookProvider).then(function(result){
        var Token = result.credential.accessToken;
        var User = result.user;
        console.log(User)
        alert('登入成功')
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
    });
})