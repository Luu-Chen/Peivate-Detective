$(function () {

    //----------Vue.js----------//
    // Vue.component("navbar", {
    //     template:
    //     `<div>
    //         <nav class="navbar navbar-expand-lg navbar-light bg-light site-header">
    //             <div class="container-fluid">
    //                 <a class="navbar-brand header-logo ml-2" href="./index.html">
    //                     <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class=" mx-auto" role="img" viewBox="0 0 24 24"><title>Peivate Detective</title><circle cx="12" cy="12" r="10"/><path d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83m13.79-4l-5.74 9.94"/></svg>Peivate Detective</span>
    //                 </a>
    //             <button class="navbar-toggler mr-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    //                 <span class="navbar-toggler-icon"></span>
    //             </button>
    //             <div class="collapse navbar-collapse" id="navbarNavDropdown">
    //                 <ul class="navbar-nav ml-auto">
    //                     <li class="nav-item">
    //                         <a class="nav-link active" href="./index.html">首頁</a>
    //                     </li>
    //                     <li class="nav-item">
    //                         <a class="nav-link" href="./Personnel.html">找徵信士</a>
    //                     </li>
    //                     <li class="nav-item reg">
    //                         <a class="btn btn-outline-warning mr-2" href="./Register.html">註冊</a>
    //                     </li>
    //                     <li class="nav-item login">
    //                         <a class="btn btn-outline-warning" href="./Login.html">登入</a>
    //                     </li>
    //                     <li class="nav-item">
    //                         <a class="nav-link setup" href="./SetUp.html"><i class="fas fa-cog"></i></a>
    //                     </li>
    //                 </ul>
    //             </div>
    //             </div>
    //         </nav>
    //     </div>`
    // })
    Vue.component("navbar", {
        template:
        `<div>
            <nav class="navbar navbar-expand-lg navbar-light bg-light site-header">
                <div class="container-fluid">
                    <a class="navbar-brand" href="./index.html">
                        <div class="snip1537">
                            <h1>Peivate Detective</h1>
                            <h6>Version</h6><br/>
                            <h5>Nst. 2021</h5><br/><i class="ion-star"></i>
                        </div>
                    </a>
                    <button class="navbar-toggler mr-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul class="ml-auto snip1488 navbar-nav">
                            <li><a href="./index.html"><i class="fas fa-home"></i>首頁</a></li>
                            <li><a href="./Personnel.html"><i class="far fa-address-card"></i>找徵信士</a></li>
                            <li><a href="./member.html"><i class="fas fa-user-circle"></i></i>會員中心</a></li>
                            <!-- <li class="reg"><a href="./Register.html"><i class="fas fa-user-edit"></i>註冊</a></li>
                            <li class="login"><a href="./Login.html"><i class="fas fa-user"></i>登入</a></li>
                            <li><a href="./SetUp.html" class="setup"><i class="fas fa-cog"></i></a></li> -->
                        </ul>
                    </div>
                </div>
            </nav>
        </div>`
    })
    new Vue({
        el: "#Nav"
    })
    //Navbar 導覽頁至頂
    $(window).scroll(function(){
        if ($(this).scrollTop() > 0){ 
            $('nav').removeClass("site-header");
            $('nav').addClass("site-header2");
            $('.navbar-nav').css({backgroundColor: 'rgba(250, 250, 245, 1)'})
        }
        else {
            $('nav').addClass("site-header");
            $('nav').removeClass("site-header2");
            $('.navbar-nav').css({backgroundColor: '#f8f9fa'})
        }
    });

    // if(localStorage.getItem('userName')==null){
    //     document.querySelector('.setup').style.display="none"        
    // }else{
    //     document.querySelector('.setup').style.display="block"
    //     document.querySelector('.login').style.display="none"
    //     document.querySelector('.reg').style.display="none"
    // }
    var $win = $(window);
    var $backToTop = $('.js-back-to-top');
    // 當用戶滾動到離頂部100像素時，展示回到頂部按鈕
    $win.scroll(function () {
        if ($win.scrollTop() > 50) {
            $backToTop.show();
        } else {
            $backToTop.hide();
        } 
    });
    // 當用戶點擊按鈕時，通過動畫效果返回頭部
    $backToTop.click(function () {
        $('html, body').animate({scrollTop: 0}, 200);
    });
    // var footer = new Vue({
    //     el: '#footer',
    //     data: {
    //         copyright: 'Copyright ©2020 謙聖國際法律事務所 All rights reserved.',
    //         design: 'Design by 錢進整合媒體'
    //     }
    // })
});