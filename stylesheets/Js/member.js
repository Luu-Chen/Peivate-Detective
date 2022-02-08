//登入面板
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('box');
signUpButton.addEventListener('click', ()=> {
    container.classList.add('right-panel-active')
    var validator_login = $( "#login" ).validate();
    validator_login.resetForm();
});
signInButton.addEventListener('click', ()=> {
    container.classList.remove('right-panel-active')
    var validator_Sign = $( "#Create" ).validate();
    validator_Sign.resetForm();
});

$(function() {
	$(".btn").click(function() {
		$(".form-signin").toggleClass("form-signin-left");
		$(".form-signup").toggleClass("form-signup-left");
		$(".frame").toggleClass("frame-long");
		$(".signup-inactive").toggleClass("signup-active");
		$(".signin-active").toggleClass("signin-inactive");
		$(".forgot").toggleClass("forgot-left");   
		$(this).removeClass("idle").addClass("active");
	});
});
//手機面板
const loginBtn = document.getElementById('mobil-login');
const signupBtn = document.getElementById('mobil-signup');
loginBtn.addEventListener('click', (e) => {
	let parent = e.target.parentNode.parentNode;
	Array.from(e.target.parentNode.parentNode.classList).find((element) => {
		if(element !== "slide-up") {
			parent.classList.add('slide-up')
			document.querySelector('.form-concent2').style.display='none'
            var validatorMobil_login = $( "#login-mobil" ).validate();
            validatorMobil_login.resetForm();
		}else{
			signupBtn.parentNode.classList.add('slide-up')
			parent.classList.remove('slide-up')
			document.querySelector('.form-concent2').style.display='block'
			document.querySelector('.form-concent1').style.display='none'
            var validatorMobil_Sign = $( "#Create-mobil" ).validate();
            validatorMobil_Sign.resetForm();
		}
	});
});
signupBtn.addEventListener('click', (e) => {
	let parent = e.target.parentNode;
	Array.from(e.target.parentNode.classList).find((element) => {
		if(element !== "slide-up") {
			parent.classList.add('slide-up')
			document.querySelector('.form-concent1').style.display='none'
			document.querySelector('.form-concent2').style.display='none'
            var validatorMobil_Sign = $( "#Create-mobil" ).validate();
            validatorMobil_Sign.resetForm();
		}else{
			loginBtn.parentNode.parentNode.classList.add('slide-up')
			parent.classList.remove('slide-up')
			document.querySelector('.form-concent1').style.display='block'
            var validatorMobil_login = $( "#login-mobil" ).validate();
            validatorMobil_login.resetForm();			
		}
	});
});
//登入and 註冊 and 登出 and 信箱驗證
$(function () {
    //判斷會員頁面
    if(localStorage.getItem('userName')==null){
        document.querySelector('.user-member').style.display="none"
    }else{
        document.querySelector('.user-member').style.display="block"
        document.querySelector('.member').style.display="none"
        document.querySelector('.rank-one').style.display="none"
        document.querySelector('.AddPeople-one').style.display="none"
        document.querySelector('.Revision-one').style.display='none'
        document.querySelector('.userName-one').innerHTML ="歡迎："+'&nbsp;'+'<svg class="bi" width="35" height="35"><use xlink:href="#people-circle"/></svg>'+localStorage.getItem('userName');
    }
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
    var email= document.getElementById("login-email");
    var password =document.getElementById("login-password");
    var Mobil_email= document.getElementById("mobil-login-email");
    var Mobil_password =document.getElementById("mobil-login-password");
    var loginBtn =document.getElementById("loginBtn");
    var Mobil_loginBtn = document.getElementById("login-btn");
    var btnGooglePopup = document.getElementById('googleSingUpPopup');
    var btnFacebookPopup = document.getElementById('facebookSingUpPopup');
    var btnGooglePopup2 = document.getElementById('googleSingUpPopup_2');
    var btnFacebookPopup2 = document.getElementById('facebookSingUpPopup_2');
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
            // document.querySelector('.setup').style.display="block"
            // document.querySelector('.login').style.display="none"
            // document.querySelector('.reg').style.display="none"
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
            // document.querySelector('.setup').style.display="block"
            // document.querySelector('.login').style.display="none"
            // document.querySelector('.reg').style.display="none"
        }).catch(function(error) {
            // Handle Errors here.
            console.log(error.code);
            console.log(error.message);
        });
    })
    btnGooglePopup2.addEventListener('click',function(e){
        e.preventDefault();
        var googleProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(googleProvider).then(function(result){
            var googleToken = result.credential.accessToken;
            var googleUser = result.user;
            console.log(googleUser.email);
            localStorage.setItem('userName',googleUser.email)
            document.location.href="./index.html";
            alert('登入成功');
            // document.querySelector('.setup').style.display="block"
            // document.querySelector('.login').style.display="none"
            // document.querySelector('.reg').style.display="none"
        }).catch(function(error) {
            console.log(error.code);
            console.log(error.message);
        });
    })
    btnFacebookPopup2.addEventListener('click',function(e){
        e.preventDefault();
        var facebookProvider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(facebookProvider).then(function(result){
            var Token = result.credential.accessToken;
            var User = result.user;
            console.log(User.email);
            localStorage.setItem('userName',User.email)
            document.location.href="./index.html";
            alert('登入成功');
            // document.querySelector('.setup').style.display="block"
            // document.querySelector('.login').style.display="none"
            // document.querySelector('.reg').style.display="none"
        }).catch(function(error) {
            // Handle Errors here.
            console.log(error.code);
            console.log(error.message);
        });
    })
    loginBtn.addEventListener('click',function(e){
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
            firebase.auth().signInWithEmailAndPassword(email.value, password.value)
            .then(() => {
                var user = firebase.auth().currentUser;
                if(user){
                    alert('帳號登入成功');
                    console.log(user)
                    console.log(user.email)
                    localStorage.setItem('userName',user.email)
                    email.value=''
                    password.value=''
                    // document.location.href="./index.html";
                    window.location.reload();
                }
            })
            .catch((error) => {
                console.log('錯誤')
                alert('請確認帳號、密碼是否有誤')
            });
        }        
    })
    Mobil_loginBtn.addEventListener('click',function(e){
        if(Mobil_email.value=='' || Mobil_password.value==''){
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
            firebase.auth().signInWithEmailAndPassword(Mobil_email.value, Mobil_password.value)
            .then(() => {
                var user = firebase.auth().currentUser;
                if(user){
                    alert('帳號登入成功');
                    console.log(user)
                    console.log(user.email)
                    localStorage.setItem('userName',user.email)
                    Mobil_email.value=''
                    Mobil_password.value=''
                    // document.location.href="./index.html";
                    window.location.reload();
                }
            })
            .catch((error) => {
                console.log('錯誤')
                alert('請確認帳號、密碼是否有誤')
            });
        }
        
    })
    $("input[type='password'][data-eye]").each(function(i) {
        var $this = $(this)
            id = 'eye-password-' + i,
            el = $('#' + id),
        $this.css({
            paddingRight: 30,
            // marginBottom: 10,
        });
        $this.after($("<span/>", {
            // html: '<i class="fa fa-fw fa-eye">',
            // class: 'btn eye',
            class:'fas fa-eye-slash field_icon toggle-password',
        }).css({
            position: 'absolute',
            right: 12.5+'%',
            // top: ($this.outerHeight()+'%' ),
			top: ($this.outerHeight() / 2) +1 ,
            fontSize: 15,
            cursor: 'pointer',
        }));
    });
    $("input[type='password'][data-eye2]").each(function(i) {
        var $this = $(this)
            id = 'eye-password-' + i,
            el = $('#' + id),
        $this.css({
            paddingRight: 30,
            // marginBottom: 10,
        });
        $this.after($("<span/>", {
            // html: '<i class="fa fa-fw fa-eye">',
            // class: 'btn eye',
            class:'fas fa-eye-slash field_icon toggle-password',
        }).css({
            position: 'absolute',
            right: 12.5+'%',
            // top: ($this.outerHeight()+'%' ),
			top: ($this.outerHeight() / 2) -6 ,
            fontSize: 15,
            cursor: 'pointer',
        }));
    });
    //註冊
    var sign_email = document.getElementById('sign-email');
    var Mobil_sign_email = document.getElementById('mobil-sign-email');
    var sign_password = document.getElementById('sign-password');
    var Mobil_sign_password = document.getElementById('mobil-sign-password');
    var Btn = document.getElementById('submitBtn');
    var Mobil_Btn = document.getElementById('sign-btn');
    Btn.addEventListener('click',function(e){
        if(sign_email.value=='' || sign_password.value==''){
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
            firebase.auth().createUserWithEmailAndPassword(sign_email.value, sign_password.value)
            .then(() => {
                alert("註冊成功")
                sign_email.value=''
                sign_password.value=''
                window.location.reload();
                })
            .catch((error) => {
                console.log('錯誤')
                alert('格式不正確')
            });
        }
    })
    Mobil_Btn.addEventListener('click',function(e){
        if(Mobil_sign_email.value=='' || Mobil_sign_password.value==''){
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
            firebase.auth().createUserWithEmailAndPassword(Mobil_sign_email.value, Mobil_sign_password.value)
            .then(() => {
                alert("註冊成功")
                Mobil_sign_email.value=''
                Mobil_sign_password.value=''
                window.location.reload();
                })
            .catch((error) => {
                console.log('錯誤')
                alert('格式不正確')
            });
        }
    })
    // 登出
    var btnLogOutOne = document.getElementById('LogOut-one');
    btnLogOutOne.addEventListener('click',function(e){
    e.preventDefault();
    var name = localStorage.getItem('userName');
    console.log(name);
    if (name != null){
        firebase.auth().signOut().then(function() {
            alert('帳號已登出');
            localStorage.removeItem('userName');
            localStorage.removeItem('img');
            localStorage.clear();
            document.location.href="./index.html";
        })
    }
    })
    // 信箱驗證
    firebase.auth().onAuthStateChanged(user => {
    if(user) {
        const emailVerify = user.emailVerified;
        var str =String;
        if(emailVerify==true){
            var str = '已驗證'
            document.getElementById('user-email-verify').innerHTML = `您的信箱是否驗證：${str}`;
        }else{
            var str ='未驗證'
            document.getElementById('user-email-verify').innerHTML = `您的信箱是否驗證：${str}`;
        }
        var user = firebase.auth().currentUser;
        const btnVerifyEmail = document.getElementById('verify-email');
        btnVerifyEmail.addEventListener('click', () => {
            // firebase.auth().languageCode = 'zh-TW'; // 發信模版改中文
            user.sendEmailVerification().then(function() {
            // 驗證信發送完成
            document.getElementById("verify-email").classList.remove("active");
            window.alert('驗證信已發送到您的信箱，請查收')
            }).catch(error => {
            // 驗證信發送失敗
            document.getElementById("verify-email").classList.remove("active");
            window.alert('驗證信件已發送，需間隔30秒以上才能再發送')
            changeErrMessage(error.message);
            });
        });
    }
    })
    //排名顯示 
    var newData = [];
    var listOne = document.querySelector(".all-one");
    const pageidOne = document.getElementById('pageid-one');
    $(document).ready(function(){
        var UserData =[];
        var db = firebase.firestore();
        var ref =db.collection("個人資料");
        var refImg = db.collection('用戶資料');
        var data =[];
        var KH=[];
        function PageData(){
            ref.onSnapshot(querySnapshot => {
                querySnapshot.forEach(doc => {
                    data.push(doc.data());
                    data = data.sort(function (a, b) {
                    return b.score - a.score;
                    });
                    newData.push({id:doc.id,data:doc.data()});
                });
                for(var i=0;i<data.length;i++){
                    KH.push(data[i]);
                }
                pagination(KH,1);
            });
            function pagination(KH,nowPage){
            const dataTotal =KH.length;
            const perpage = 12;
            const pageTotal = Math.ceil(dataTotal / perpage);
            let currentPage = nowPage;
            if (currentPage > pageTotal) {
                currentPage = pageTotal;
            }
            const minData = (currentPage * perpage) - perpage + 1 ;
            const maxData = (currentPage * perpage) ;
            const data = [];
            KH.forEach((item,index)=>{
                const num = index + 1;
                if ( num >= minData && num <= maxData) {
                data.push(item);
                }
            })
            const page = {
                pageTotal,
                currentPage,
                hasPage: currentPage > 1,
                hasNext: currentPage < pageTotal,
            }
            displayData(data);
            pageBtn(page);
            }
            function displayData(data) {
            let str = '';
            data.forEach((item) => {
                str +=
                `<tr class='slow' data-item="${item.name}">
                <td class='text-center' data-item="${item.name}">${item.name}</td>
                <td class='text-center' data-item="${item.name}">${item.score}</td>
                </tr>`;
            });
            listOne.innerHTML=str;
            }
            function pageBtn (page){
            let str = '';
            const total = page.pageTotal;
            if(page.hasPage) {
            str += `<li class="page-item"><a class="page-link" href="#" data-page="${Number(page.currentPage) - 1}"><</a></li>`;
            } else {
            str += `<li class="page-item disabled"><span class="page-link"><</span></li>`;
            }
            for(let i = 1; i <= total; i++){
            if(Number(page.currentPage) === i) {
                str +=`<li class="page-item active"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
            } else {
                str +=`<li class="page-item"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
            }
            };
            if(page.hasNext) {
            str += `<li class="page-item"><a class="page-link" href="#" data-page="${Number(page.currentPage) + 1}">></a></li>`;
            } else {
            str += `<li class="page-item disabled"><span class="page-link">></span></li>`;
            }
            pageidOne.innerHTML = str;
            }
            function switchPage(e){
            e.preventDefault();
            $('html, body').animate({scrollTop: 0}, 0);
            if(e.target.nodeName !== 'A') return;
            const page = e.target.dataset.page;
            pagination(KH, page);
            }
            pageidOne.addEventListener('click', switchPage);
            $('#stars li').on('mouseover', function(){
                    var onStar = parseInt($(this).data('value'), 10);
                    $(this).parent().children('li.star').each(function(e){
                    if (e < onStar) {
                        $(this).addClass('hover');
                    }
                    else {
                        $(this).removeClass('hover');
                    }
                });
                }).on('mouseout', function(){
                    $(this).parent().children('li.star').each(function(e){
                        $(this).removeClass('hover');
                    });
                });
        }
        PageData();
        //圖片上傳
        var ID =localStorage.getItem('userName');
        // console.log(ID)
        switch (ID){
            case 'sgas@gmail.com':
                document.querySelector('.rank-one').style.display="block"
                document.querySelector('.AddPeople-one').style.display="block"
                document.querySelector('.Revision-one').style.display="block"
                break;
            // case '':
            //     document.querySelector('.rank-one').style.display="block"
            //     document.querySelector('.AddPeople-one').style.display="block"
            //     document.querySelector('.Revision-one').style.display="block"
            //     break;
            default:
                console.log('你不是管理員，權限被限制')
        }
        // console.log(localStorage.getItem('img'))
        if(localStorage.getItem('img')==null){
            document.getElementById('preview_progressbarTW_img-one').src = 'https://firebasestorage.googleapis.com/v0/b/concent-4b5ff.appspot.com/o/Peivate%20Detective%2Fuser.svg?alt=media&token=936d0114-4584-4aaa-a1d2-1df7071f7691';
        }else{
            Img = localStorage.getItem('img');
            document.getElementById('preview_progressbarTW_img-one').src = Img;
        }
        if(localStorage.getItem('img2')==null){
            document.getElementById('adduserImg').src = 'https://firebasestorage.googleapis.com/v0/b/concent-4b5ff.appspot.com/o/Peivate%20Detective%2Fuser.svg?alt=media&token=936d0114-4584-4aaa-a1d2-1df7071f7691';
        }else{
            Img = localStorage.getItem('img2');
            document.getElementById('adduserImg').src = Img;
        }
        var upBtn2 = document.getElementById('progressbarTWInput-one');
        upBtn2.addEventListener('change',event =>{
            document.getElementById('preview_progressbarTW_img-one').src = '';
            document.getElementById('progressbarTWInput-one').classList.remove('my-valid')
            const file = event.target.files[0];
            const fileA = event.target.files;
            const path = 'User ID'+'/'+ID+'/'+ file.name;
            const storageReference = firebase.storage().ref(path)
            const task = storageReference.put(file);
            const storageRef = firebase.storage().ref();
            var time=new Date().getSeconds();
            var ImgName =[];
            var keyName = [];
            localStorage.setItem(time,fileA[0].name)
            task.on("state_changed",function progress(snapshot) {
                let uploadValue = snapshot.bytesTransferred / snapshot.totalBytes * 100;
                uploader_one.value = uploadValue;
                },
                function error(err) {
                    alert("圖片上傳失敗");
                },
                function complete() {
                    document.getElementById('msg_one').style.display='inline-block'
                    alert("圖片上傳，需按下'保存資料'才是上傳完成")
                }
            );
            for(var i=0;i<localStorage.length;i++){
                var key=localStorage.key(i);
                var value=localStorage.getItem(key);
                ImgName.push(value);
                keyName.push(key);
            }
            var d2 = ID;
            ImgName = ImgName.filter(function(item) {
                return item !== d2
            });
            for(var k=0;k<ImgName.length;k++){
                if(ImgName[k] != fileA[0].name || ImgName[k] == fileA[0].name){
                    var desertRef = storageRef.child('User ID'+'/'+ID+'/'+ImgName[k]);
                    desertRef.delete().then(() => {
                        console.log('刪除圖片成功')
                    }).catch((error) => {
                        console.log(error)
                    });
                    break
                }
            }
        });
        var upBtn = document.getElementById('adduserImgput');
        upBtn.addEventListener('change',event =>{
            var img = $('#adduserImg');
            if(window.FileReader) {
                var file = $('#adduserImgput')[0].files[0];
                var reader = new FileReader;
                if (file && file.type.match('image.*')) {
                    reader.readAsDataURL(file);
                } else {
                    img.attr('src', 'https://firebasestorage.googleapis.com/v0/b/concent-4b5ff.appspot.com/o/Peivate%20Detective%2Fuser.svg?alt=media&token=936d0114-4584-4aaa-a1d2-1df7071f7691');                            
                    localStorage.removeItem('img2');
                }
                reader.onloadend = function (e) {
                    img.attr('src', reader.result);
                    img.css('display', 'block');
                    localStorage.setItem('img2', file.name);
                }
            }
        });
        function readURL2(input){
            if(input.files && input.files[0]){
            var reader = new FileReader();
                reader.onload = function (e) {
                    $("#preview_progressbarTW_img-one").attr('src', e.target.result);
                }
                reader.readAsDataURL(input.files[0]);
            }
        }
        function readURL(input){
            if(input.files && input.files[0]){
            var reader = new FileReader();
                reader.onload = function (e) {
                    $("#adduserImg").attr('src', e.target.result);
                }
                reader.readAsDataURL(input.files[0]);
            }
        }
        $("#progressbarTWInput-one").change(function(){
            readURL2(this);
        });
        $("#adduserImgput").change(function(){
            readURL(this);
        });
        refImg.onSnapshot(querySnapshot => {
            querySnapshot.forEach(doc => {
                if(ID==doc.id ){
                    // console.log(doc.id);
                    UserData.push({id:doc.id,data:doc.data()});
                    document.getElementById("validationCustomUsername-one").value=UserData[0].data.userName;
                    document.getElementById("validationCustomUserphone-one").value=UserData[0].data.telephone;
                    document.getElementById("validationCustomUseraddress-one").value=UserData[0].data.Address;
                    document.getElementById('preview_progressbarTW_img-one').src = '';
                    document.getElementById('preview_progressbarTW_img-one').src = UserData[0].data.imgUrl;
                    document.querySelector('.sup-one').style.display='none';
                    document.querySelector('.sup2-one').style.display='none';
                    document.querySelector('.sup3-one').style.display='none';
                    document.getElementById('confirm-button-one').style.display='none'
                    document.getElementById('confirm-button-second').style.display='block'
                }
            });
        });
        // 第一次會員資料上傳，並重新讀取資料
        const Upload = document.getElementById('confirm-button-one');
        const nameElement = document.getElementById("validationCustomUsername-one");
        const phoneElement = document.getElementById("validationCustomUserphone-one");
        const addressElement = document.getElementById("validationCustomUseraddress-one");
        Upload.addEventListener('click',function(e){
            e.preventDefault();
            const finish =  $("#contact_form-one").valid();
            if(finish == false){
                alert('表單填寫，不完全');
                document.getElementById("confirm-button-one").classList.remove("active");
            } else{
                var ID =localStorage.getItem('userName');
                var Url = document.getElementById('preview_progressbarTW_img-one').src;
                if( Url == 'https://firebasestorage.googleapis.com/v0/b/concent-4b5ff.appspot.com/o/Peivate%20Detective%2Fuser.svg?alt=media&token=936d0114-4584-4aaa-a1d2-1df7071f7691'){
                    Img = 'https://firebasestorage.googleapis.com/v0/b/concent-4b5ff.appspot.com/o/Peivate%20Detective%2Fuser.svg?alt=media&token=936d0114-4584-4aaa-a1d2-1df7071f7691'
                    var db_once = firebase.firestore();
                    var ref_once =db_once.collection("用戶資料").doc(ID);
                    ref_once.set({
                        userName:nameElement.value,
                        telephone:phoneElement.value,
                        Address:addressElement.value,
                        imgUrl:Img,
                        ImgUrlName:""
                    }).then(() => {
                        alert('資料已更新')
                        document.getElementById("confirm-button-one").classList.remove("active");                        
                        window.location.reload();                        
                    });
                }else{
                    var db_have = firebase.firestore();
                    var ref_have = db_have.collection("用戶資料").doc(ID);
                    var selectedFile = document.getElementById('progressbarTWInput-one').files[0];
                    const storage = firebase.storage();
                    const path = 'User ID'+'/'+ID+'/'+selectedFile.name;
                    storage.ref(path).getDownloadURL()
                    .then((url) => {
                        localStorage.setItem('img', url);
                        Img = localStorage.getItem('img');
                        ref_have.set({
                            userName:nameElement.value,
                            telephone:phoneElement.value,
                            Address:addressElement.value,
                            imgUrl:Img,
                            ImgUrlName:selectedFile.name
                        }).then(() => {
                            alert('資料已更新')
                            document.getElementById("confirm-button-one").classList.remove("active");                            
                            window.location.reload();                           
                        });
                    });
                }
            }
        })

        //已有會員資料，做修改
        var UploadSecond = document.getElementById('confirm-button-second');
        UploadSecond.addEventListener('click',function(e){
            e.preventDefault();
            const finish =  $("#contact_form-one").valid();
            if(finish == false){
                alert('表單填寫，不完全');
                document.getElementById("confirm-button-second").classList.remove("active");
            }else{
                var Url = document.getElementById('preview_progressbarTW_img-one').src;
                var Img = UserData[0].data.imgUrl;
                var ImgName = UserData[0].data.ImgUrlName
                var db_have = firebase.firestore();
                var ref_have = db_have.collection("用戶資料").doc(ID);
                var db_once = firebase.firestore();
                var ref_once =db_once.collection("用戶資料").doc(ID);
                if(Url == Img){
                    ref_once.set({
                        userName:nameElement.value,
                        telephone:phoneElement.value,
                        Address:addressElement.value,
                        imgUrl:Img,
                        ImgUrlName:ImgName
                    }).then(() => {
                        alert('資料已更新')
                        document.getElementById("confirm-button-second").classList.remove("active");                        
                        window.location.reload();                        
                    });
                }else {
                    var selectedFile = document.getElementById('progressbarTWInput-one').files[0];
                    const storage = firebase.storage();
                    const path = 'User ID'+'/'+ID+'/'+selectedFile.name;
                    const storageRef = firebase.storage().ref();
                    const desertRef = storageRef.child('User ID'+'/'+ID+'/'+ ImgName);
                    desertRef.delete().then(() => {
                        console.log('刪除圖片成功') 
                    }).catch((error) => {
                        console.log(error)
                    });
                    storage.ref(path).getDownloadURL()
                    .then((url) => {
                        localStorage.setItem('img', url);
                        Img = localStorage.getItem('img');
                        ref_have.set({
                            userName:nameElement.value,
                            telephone:phoneElement.value,
                            Address:addressElement.value,
                            imgUrl:Img,
                            ImgUrlName:selectedFile.name
                        }).then(() => {
                            alert('資料已更新')
                            document.getElementById("confirm-button-second").classList.remove("active");                            
                            window.location.reload();                           
                        });
                    });
                }
            }
        })
        // add新增人員資料上傳
        var btn = document.querySelector('.add-item')
        var max_fields      = 41; //新增欄位數量
        var wrapper   		= $(".add-wrap");
        var x = 3;
        $(btn).click(function(e){
            e.preventDefault();
            if(x < max_fields){
                x++;
                $(wrapper).append(
                    `<div class="m-b4">
                        <a href="#" class="remove_field float-right `+'el'+x+`"><i class="fas fa-minus"></i></a> 
                        <div class="input-group">                    
                            <span class="input-group-text"><i class="far fa-address-card"></i></span>
                            <select name="`+'exp'+x+`" class="form-select ex" id="`+'exp'+x+`" required>
                            <option selected disabled hidden value="">請選擇項目</option>
                                <option>外遇蒐證</option>
                                <option>抓姦專案</option>
                                <option>行蹤調查</option>
                                <option>尋人調查</option>
                                <option>查前科案件</option>
                                <option>查學歷案件</option>
                                <option>查電話案件</option>
                                <option>查地址案件</option>
                                <option>查出入境案件</option>
                                <option>其他個人資料調查</option>
                                <option>債務催收</option>
                                <option>呆帳處理</option>
                                <option>債務協商</option>
                                <option>傷害教訓</option>
                                <option>遺產糾紛</option>
                                <option>土地糾紛</option>
                                <option>醫療糾紛</option>
                                <option>車禍糾紛</option>
                                <option>撫養費協商</option>
                                <option>分手費協商</option>
                                <option>監護權協商</option>
                                <option>探視權協商</option>
                                <option>跨海調查</option>
                                <option>公司調查</option>
                                <option>商業調查</option>
                                <option>市場調查</option>
                                <option>越區傾銷調查</option>
                                <option>商業間諜調查</option>
                                <option>競業條款調查</option>
                                <option>盡職調查</option>
                                <option>非訴訟協調</option>
                                <option>器材架設</option>
                                <option>感情挽回</option>
                                <option>感情破壞</option>
                                <option>設計離婚</option>
                                <option>婚前調查</option>
                                <option>文書鑑定</option>
                                <option>子女調查</option>
                                <option>脫離不幸婚姻</option>
                                <option>仿冒、侵權案件</option>
                                <option>婚姻諮商</option>
                                <option>心理輔導</option>
                            </select>
                            <input type="text" name="`+'case'+x+`" class="form-control ml-2 number" id="`+'case'+x+`" placeholder="請填案件數" value="" required>
                        </div> 
                    </div>`
                );
            }
            var item = document.querySelector('.add-wrap').getElementsByTagName('select');
            const lend = item[item.length-1].name;
            switch (lend){
                case'exp4':
                    document.querySelector('.el4').style.display='block'
                    break;
                case'exp5':
                    document.querySelector('.el4').style.display='none'
                    document.querySelector('.el5').style.display='block'
                    break;
                case'exp6':
                    document.querySelector('.el5').style.display='none'
                    document.querySelector('.el6').style.display='block'
                    break;
                case'exp7':
                    document.querySelector('.el6').style.display='none'
                    document.querySelector('.el7').style.display='block'
                    break;
                case'exp8':
                    document.querySelector('.el7').style.display='none'
                    document.querySelector('.el8').style.display='block'
                    break;
                case'exp9':
                    document.querySelector('.el8').style.display='none'
                    document.querySelector('.el9').style.display='block'
                    break;
                case'exp10':
                    document.querySelector('.el9').style.display='none'
                    document.querySelector('.el10').style.display='block'
                    break;
                case'exp11':
                    document.querySelector('.el10').style.display='none'
                    document.querySelector('.el11').style.display='block'
                    break;
                case'exp12':
                    document.querySelector('.el11').style.display='none'
                    document.querySelector('.el12').style.display='block'
                    break;
                case'exp13':
                    document.querySelector('.el12').style.display='none'
                    document.querySelector('.el13').style.display='block'
                    break;
                case'exp14':
                    document.querySelector('.el13').style.display='none'
                    document.querySelector('.el14').style.display='block'
                    break;
                case'exp15':
                    document.querySelector('.el14').style.display='none'
                    document.querySelector('.el15').style.display='block'
                    break;
                case'exp16':
                    document.querySelector('.el15').style.display='none'
                    document.querySelector('.el16').style.display='block'
                    break;
                case'exp17':
                    document.querySelector('.el16').style.display='none'
                    document.querySelector('.el17').style.display='block'
                    break;
                case'exp18':
                    document.querySelector('.el17').style.display='none'
                    document.querySelector('.el18').style.display='block'
                    break;
                case'exp19':
                    document.querySelector('.el18').style.display='none'
                    document.querySelector('.el19').style.display='block'
                    break;
                case'exp20':
                    document.querySelector('.el19').style.display='none'
                    document.querySelector('.el20').style.display='block'
                    break;
                case'exp21':
                    document.querySelector('.el20').style.display='none'
                    document.querySelector('.el21').style.display='block'
                    break;
                case'exp22':
                    document.querySelector('.el21').style.display='none'
                    document.querySelector('.el22').style.display='block'
                    break;
                case'exp23':
                    document.querySelector('.el22').style.display='none'
                    document.querySelector('.el23').style.display='block'
                    break;
                case'exp24':
                    document.querySelector('.el23').style.display='none'
                    document.querySelector('.el24').style.display='block'
                    break;
                case'exp25':
                    document.querySelector('.el24').style.display='none'
                    document.querySelector('.el25').style.display='block'
                    break;
                case'exp26':
                    document.querySelector('.el25').style.display='none'
                    document.querySelector('.el26').style.display='block'
                    break;
                case'exp27':
                    document.querySelector('.el26').style.display='none'
                    document.querySelector('.el27').style.display='block'
                    break;
                case'exp28':
                    document.querySelector('.el27').style.display='none'
                    document.querySelector('.el28').style.display='block'
                    break;
                case'exp29':
                    document.querySelector('.el28').style.display='none'
                    document.querySelector('.el29').style.display='block'
                    break;
                case'exp30':
                    document.querySelector('.el29').style.display='none'
                    document.querySelector('.el30').style.display='block'
                    break;
                case'exp31':
                    document.querySelector('.el30').style.display='none'
                    document.querySelector('.el31').style.display='block'
                    break;
                case'exp32':
                    document.querySelector('.el31').style.display='none'
                    document.querySelector('.el32').style.display='block'
                    break;
                case'exp33':
                    document.querySelector('.el32').style.display='none'
                    document.querySelector('.el33').style.display='block'
                    break;
                case'exp34':
                    document.querySelector('.el33').style.display='none'
                    document.querySelector('.el34').style.display='block'
                    break;
                case'exp35':
                    document.querySelector('.el34').style.display='none'
                    document.querySelector('.el35').style.display='block'
                    break;
                case'exp36':
                    document.querySelector('.el35').style.display='none'
                    document.querySelector('.el36').style.display='block'
                    break;
                case'exp37':
                    document.querySelector('.el36').style.display='none'
                    document.querySelector('.el37').style.display='block'
                    break;
                case'exp38':
                    document.querySelector('.el37').style.display='none'
                    document.querySelector('.el38').style.display='block'
                    break;
                case'exp39':
                    document.querySelector('.el38').style.display='none'
                    document.querySelector('.el39').style.display='block'
                    break;
                case'exp40':
                    document.querySelector('.el39').style.display='none'
                    document.querySelector('.el40').style.display='block'
                    break;
                case'exp41':
                    document.querySelector('.el40').style.display='none'
                    document.querySelector('.el41').style.display='block'
                    break;
                case'exp42':
                    document.querySelector('.el41').style.display='none'
                    document.querySelector('.el42').style.display='block'
                    break;
                case'exp43':
                    document.querySelector('.el42').style.display='none'
                    document.querySelector('.el43').style.display='block'
                    break;
            }
        })
        $(wrapper).on("click",".remove_field", function(e){
            e.preventDefault(); 
            $(this).parent('div').remove(); 
            x--;
            var item = document.querySelector('.add-wrap').getElementsByTagName('select');
            const lend = item[item.length-1].name;
            switch (lend){
                case'exp4':               
                    document.querySelector('.el4').style.display='block'
                    break;
                case'exp5':               
                    document.querySelector('.el5').style.display='block'
                    break;
                case'exp6':               
                    document.querySelector('.el6').style.display='block'
                    break;
                case'exp7':               
                    document.querySelector('.el7').style.display='block'
                    break;
                case'exp8':               
                    document.querySelector('.el8').style.display='block'
                    break;
                case'exp9':               
                    document.querySelector('.el9').style.display='block'
                    break;
                case'exp10':               
                    document.querySelector('.el10').style.display='block'
                    break;
                case'exp11':                
                    document.querySelector('.el11').style.display='block'
                    break;
                case'exp12':                
                    document.querySelector('.el12').style.display='block'
                    break;
                case'exp13':                
                    document.querySelector('.el13').style.display='block'
                    break;
                case'exp14':                
                    document.querySelector('.el14').style.display='block'
                    break;
                case'exp15':                
                    document.querySelector('.el15').style.display='block'
                    break;
                case'exp16':                
                    document.querySelector('.el16').style.display='block'
                    break;
                case'exp17':                
                    document.querySelector('.el17').style.display='block'
                    break;
                case'exp18':                
                    document.querySelector('.el18').style.display='block'
                    break;
                case'exp19':                
                    document.querySelector('.el19').style.display='block'
                    break;
                case'exp20':                
                    document.querySelector('.el20').style.display='block'
                    break;
                case'exp21':                
                    document.querySelector('.el21').style.display='block'
                    break;
                case'exp22':                
                    document.querySelector('.el22').style.display='block'
                    break;
                case'exp23':                
                    document.querySelector('.el23').style.display='block'
                    break;
                case'exp24':                
                    document.querySelector('.el24').style.display='block'
                    break;
                case'exp25':                
                    document.querySelector('.el25').style.display='block'
                    break;
                case'exp26':                
                    document.querySelector('.el26').style.display='block'
                    break;
                case'exp27':                
                    document.querySelector('.el27').style.display='block'
                    break;
                case'exp28':                
                    document.querySelector('.el28').style.display='block'
                    break;
                case'exp29':                
                    document.querySelector('.el29').style.display='block'
                    break;
                case'exp30':                
                    document.querySelector('.el30').style.display='block'
                    break;
                case'exp31':                
                    document.querySelector('.el31').style.display='block'
                    break;
                case'exp32':                
                    document.querySelector('.el32').style.display='block'
                    break;
                case'exp33':                
                    document.querySelector('.el33').style.display='block'
                    break;
                case'exp34':                
                    document.querySelector('.el34').style.display='block'
                    break;
                case'exp35':                
                    document.querySelector('.el35').style.display='block'
                    break;
                case'exp36':                
                    document.querySelector('.el36').style.display='block'
                    break;
                case'exp37':                
                    document.querySelector('.el37').style.display='block'
                    break;
                case'exp38':                
                    document.querySelector('.el38').style.display='block'
                    break;
                case'exp39':                
                    document.querySelector('.el39').style.display='block'
                    break;
                case'exp40':                
                    document.querySelector('.el40').style.display='block'
                    break;
                case'exp41':                
                    document.querySelector('.el41').style.display='block'
                    break;
                case'exp42':                
                    document.querySelector('.el42').style.display='block'
                    break;
                case'exp43':                
                    document.querySelector('.el43').style.display='block'
                    break;
            }
        })
        const addUpload = document.getElementById('addOther');
        const name = document.getElementById('adduserName');
        const gender = document.getElementById('addusergender');
        const year = document.getElementById('addyear');
        const phone = document.getElementById('addphone');
        const address = document.getElementById('addaddress');
        const work = document.getElementById('work');
        const No = document.getElementById('addNo');
        addUpload.addEventListener('click',function(e){
            e.preventDefault();
            if($("#add").valid()==true){
                if(localStorage.getItem('img2')==null){
                    document.getElementById('adduserImg').src = 'https://firebasestorage.googleapis.com/v0/b/concent-4b5ff.appspot.com/o/Peivate%20Detective%2Fuser.svg?alt=media&token=936d0114-4584-4aaa-a1d2-1df7071f7691';
                }
                var group_serve = [];
                $('.ex').each(function(index){
                    if($(this).val()!='') {
                        group_serve.push($(this).val());
                    }
                });
                var serveName =[];
                for(i=0;i<group_serve.length;i++){
                    serveName.push({nested:{label:group_serve[i]}})
                }
                var group_number = [];
                $('.number').each(function(index){
                    if($(this).val()!='') {
                        group_number.push($(this).val());
                    }
                });
                var caseNumber =[];
                for(i=0;i<group_number.length;i++){
                    var Numbers = parseInt(group_number[i])
                    caseNumber.push({nested:{data:Numbers}})
                }
                var Charts = serveName.map( (obj,index) => {
                    return Object.assign({}, obj.nested, caseNumber[index] && caseNumber[index].nested||{});             
                });
                var db = firebase.firestore();
                var ref =db.collection("個人資料").doc(name.value);
                var selectedFile2 = document.getElementById('adduserImgput').files[0];
                var path2 = 'Peivate Detective'+'/'+name.value+'/'+selectedFile2.name;
                var storageRef2 = firebase.storage().ref(path2);
                var storage2 = firebase.storage();
                function UpDataImg(){
                    storageRef2.put(selectedFile2);
                }
                UpDataImg()
                function UpData(){
                    storage2.ref(path2).getDownloadURL().then((url) => {
                        localStorage.setItem('NewImg', url);
                        console.log(localStorage.getItem('NewImg'));
                        NewImg = localStorage.getItem('NewImg');       
                        ref.set({
                            name:name.value,
                            No:No.value,
                            address:address.value,
                            map:"",
                            phone:phone.value,
                            gender:gender.value,
                            year:year.value,
                            work:work.value,
                            photo:NewImg,
                            YearsPractice:'',
                            score:'1',
                            ImgUrlName:selectedFile2.name,                
                            Charts
                        },{merge: true}).then(() => {
                            alert('資料無誤，已上傳')
                            document.getElementById("addOther").classList.remove("active");
                            localStorage.removeItem('img2');
                            localStorage.removeItem('NewImg');
                            window.location.reload();                            
                        });
                })
                }
                window.setTimeout(( () => UpData() ), 2000);
            }else{
                alert('表單填寫，不完全')
                document.getElementById("addOther").classList.remove("active");
            }
        })
        var addCase = document.getElementById('add-case')
        addCase.addEventListener('click',function(e){
            e.preventDefault();
            document.getElementById("add-case").classList.remove("active");
        })
        //表單內容移除，並取消驗證
        var Cancel = document.querySelectorAll('.list-group-item');
        for(i=0;i<Cancel.length;i++){
            Cancel[i].addEventListener('click',function(e){
                e.preventDefault();
                document.getElementById('add').reset();
                document.getElementById('contact_form-one').reset();
                var validator1 = $( "#add" ).validate();
                var validator2 = $( "#contact_form-one" ).validate();
                validator1.resetForm();               
                validator2.resetForm();
                document.getElementById("validationCustomUsername-one").value=UserData[0].data.userName;
                document.getElementById("validationCustomUserphone-one").value=UserData[0].data.telephone;
                document.getElementById("validationCustomUseraddress-one").value=UserData[0].data.Address;
                pagination(KH,1);
                function pagination(KH,nowPage){
                    const dataTotal =KH.length;
                    const perpage = 12;
                    const pageTotal = Math.ceil(dataTotal / perpage);
                    let currentPage = nowPage;
                    nowPage=1;
                    if (currentPage > pageTotal) {
                        currentPage = pageTotal;
                    }
                    const minData = (currentPage * perpage) - perpage + 1 ;
                    const maxData = (currentPage * perpage) ;
                    const data = [];
                    KH.forEach((item,index)=>{
                        const num = index + 1;
                        if ( num >= minData && num <= maxData) {
                        data.push(item);
                        }
                    })
                    const page = {
                        pageTotal,
                        currentPage,
                        hasPage: currentPage > 1,
                        hasNext: currentPage < pageTotal,
                    }
                    displayData(data);
                    pageBtn(page);
                }
                function displayData(data) {
                    let str = '';
                    data.forEach((item) => {
                        str +=
                        `<tr class='slow' data-item="${item.name}">
                        <td class='text-center' data-item="${item.name}">${item.name}</td>
                        <td class='text-center' data-item="${item.name}">${item.score}</td>
                        </tr>`;
                    });
                    listOne.innerHTML=str;
                }
                function pageBtn (page){
                    let str = '';
                    const total = page.pageTotal;
                    if(page.hasPage) {
                    str += `<li class="page-item"><a class="page-link" href="#" data-page="${Number(page.currentPage) - 1}"><</a></li>`;
                    } else {
                    str += `<li class="page-item disabled"><span class="page-link"><</span></li>`;
                    }
                    for(let i = 1; i <= total; i++){
                    if(Number(page.currentPage) === i) {
                        str +=`<li class="page-item active"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
                    } else {
                        str +=`<li class="page-item"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
                    }
                    };
                    if(page.hasNext) {
                    str += `<li class="page-item"><a class="page-link" href="#" data-page="${Number(page.currentPage) + 1}">></a></li>`;
                    } else {
                    str += `<li class="page-item disabled"><span class="page-link">></span></li>`;
                    }
                    pageidOne.innerHTML = str;
                }
            })
        }
    });
    // 資料修改與刪除
    var AllData = [];
    var list = document.getElementById("All-Data");
    var ALL = document.querySelector('.all')
    var listBtn = document.getElementById("Button-All");
    const pageidTwo = document.getElementById("pageid-two");
    var DataUpload=[];
    //讀取徵信士資料
    function Data2(){
        var db = firebase.firestore();
        var ref2 =db.collection("個人資料");
        var Data = [];            
        var pageIn =[];
        ref2.onSnapshot(querySnapshot => {
            querySnapshot.forEach(doc => {
                Data.push(doc.data());
                DataUpload.push(doc.data());
                Data = Data.sort(function (a, b) {
                return b.score - a.score;
                });
                AllData.push({id:doc.id,data:doc.data()});
            });
            for(var i=0;i<Data.length;i++){
                pageIn.push(Data[i]);
            }
            pagination(pageIn,1);
        });
        function pagination(pageIn,nowPage){
            const dataTotal =pageIn.length;
            const perpage = 12;
            const pageTotal = Math.ceil(dataTotal / perpage);
            let currentPage = nowPage;
            if (currentPage > pageTotal) {
                currentPage = pageTotal;
            }
            const minData = (currentPage * perpage) - perpage + 1 ;
            const maxData = (currentPage * perpage) ;
            const data = [];
            pageIn.forEach((item,index)=>{
                const num = index + 1;
                if ( num >= minData && num <= maxData) {
                data.push(item);
                }
            })
            const page = {
                pageTotal,
                currentPage,
                hasPage: currentPage > 1,
                hasNext: currentPage < pageTotal,
            }
            displayData(data);
            pageBtn(page);
        }
        function displayData(data) {
        let str = '';
        data.forEach((item) => {
            str +=
            `<tr class='' data-item="${item.name}">
            <td class='text-center' data-item="${item.name}">
                <span style="padding: 0.8rem; display: block;">${item.name}</span>
            </td>
            <td class='text-center' data-item="${item.name}">
                <div class="" style="padding: 0.5rem;">
                    <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" data-item="${item.name}">                
                        修改
                        <i class="far fa-edit"></i>
                    </button>
                    /
                    <button type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#staticBackdrop2" data-item="${item.name}">
                        刪除
                        <i class="far fa-trash-alt"></i>
                    </button>
                </div>
            </td>
            </tr>`;            
        });
        list.innerHTML=str;
        }
        function pageBtn (page){
        let str = '';
        const total = page.pageTotal;
        if(page.hasPage) {
        str += `<li class="page-item"><a class="page-link" href="#" data-page="${Number(page.currentPage) - 1}"><</a></li>`;
        } else {
        str += `<li class="page-item disabled"><span class="page-link"><</span></li>`;
        }
        for(let i = 1; i <= total; i++){
        if(Number(page.currentPage) === i) {
            str +=`<li class="page-item active"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
        } else {
            str +=`<li class="page-item"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
        }
        };
        if(page.hasNext) {
        str += `<li class="page-item"><a class="page-link" href="#" data-page="${Number(page.currentPage) + 1}">></a></li>`;
        } else {
        str += `<li class="page-item disabled"><span class="page-link">></span></li>`;
        }
        pageidTwo.innerHTML = str;
        }
        function switchPage(e){
        e.preventDefault();
        $('html, body').animate({scrollTop: 0}, 0);
        if(e.target.nodeName !== 'A') return;
        const page = e.target.dataset.page;
        pagination(pageIn, page);
        }
        pageidTwo.addEventListener('click', switchPage);
        $('#stars li').on('mouseover', function(){
                var onStar = parseInt($(this).data('value'), 10);
                $(this).parent().children('li.star').each(function(e){
                if (e < onStar) {
                    $(this).addClass('hover');
                }
                else {
                    $(this).removeClass('hover');
                }
            });
            }).on('mouseout', function(){
                $(this).parent().children('li.star').each(function(e){
                    $(this).removeClass('hover');
                });
            });
    }
    Data2();
    var AllWrap = document.querySelector('.Revise-wrap');
    var ImgName = ''
    $(ALL).delegate(`button`, `click`, function (e){
        // $(AllWrap).empty();
        for(var i=0; i<AllData.length;i++){
            if(e.target.dataset.item==AllData[i].data.name){
                if(AllData[i].data.phone=='' || AllData[i].data.address==''){
                    var str = ''
                    str = '資料未提供'
                    document.getElementById('Revisephone').value = str;
                }else{
                    document.getElementById('Revisephone').value = AllData[i].data.phone;
                    document.getElementById('Reviseaddress').value = AllData[i].data.address;
                }
                document.getElementById('Revise-title').innerHTML = "<span style='color:red;'>"+AllData[i].data.name+"</span>"+'徵信士';
                document.getElementById('ReviseImg').src = AllData[i].data.photo;
                localStorage.setItem('original',AllData[i].data.photo)
                document.getElementById('ReviseName').value = AllData[i].data.name;
                document.getElementById('Revisegender').value = AllData[i].data.gender;
                document.getElementById('Reviseyear').value = AllData[i].data.year;
                document.getElementById('Revisework').value = AllData[i].data.work;
                document.getElementById('ReviseNo').value = AllData[i].data.No;
                document.getElementById('ReviseScore').value = AllData[i].data.score;
                document.getElementById('ReviseImgText').innerText=AllData[i].data.ImgUrlName;
                localStorage.setItem('originalName',AllData[i].data.ImgUrlName)
                ImgName = AllData[i].data.ImgUrlName;   
                function Charts(){
                    $(AllWrap).empty();
                    for(var k=0; k<AllData[i].data.Charts.length;k++){
                        $(AllWrap).append(
                            `<div class="m-b4">
                                <a href="#" class="remove_btn float-right `+'el'+k+`"><i class="fas fa-minus"></i></a> 
                                <div class="input-group">                    
                                    <span class="input-group-text"><i class="far fa-address-card"></i></span>
                                    <select name="`+'cel'+k+`" class="form-select ex2" id="`+'cel'+k+`" required>
                                    <option selected disabled hidden value="">請選擇項目</option>
                                        <option>外遇蒐證</option>
                                        <option>抓姦專案</option>
                                        <option>行蹤調查</option>
                                        <option>尋人調查</option>
                                        <option>查前科案件</option>
                                        <option>查學歷案件</option>
                                        <option>查電話案件</option>
                                        <option>查地址案件</option>
                                        <option>查出入境案件</option>
                                        <option>其他個人資料調查</option>
                                        <option>債務催收</option>
                                        <option>呆帳處理</option>
                                        <option>債務協商</option>
                                        <option>傷害教訓</option>
                                        <option>遺產糾紛</option>
                                        <option>土地糾紛</option>
                                        <option>醫療糾紛</option>
                                        <option>車禍糾紛</option>
                                        <option>撫養費協商</option>
                                        <option>分手費協商</option>
                                        <option>監護權協商</option>
                                        <option>探視權協商</option>
                                        <option>跨海調查</option>
                                        <option>公司調查</option>
                                        <option>商業調查</option>
                                        <option>市場調查</option>
                                        <option>越區傾銷調查</option>
                                        <option>商業間諜調查</option>
                                        <option>競業條款調查</option>
                                        <option>盡職調查</option>
                                        <option>非訴訟協調</option>
                                        <option>器材架設</option>
                                        <option>感情挽回</option>
                                        <option>感情破壞</option>
                                        <option>設計離婚</option>
                                        <option>婚前調查</option>
                                        <option>文書鑑定</option>
                                        <option>子女調查</option>
                                        <option>脫離不幸婚姻</option>
                                        <option>仿冒、侵權案件</option>
                                        <option>婚姻諮商</option>
                                        <option>心理輔導</option>
                                    </select>
                                    <input type="text" name="`+'kd'+k+`" class="form-control ml-2 number2" id="`+'kd'+k+`" placeholder="請填案件數" value="" required>
                                </div> 
                            </div>`                            
                        );
                        document.getElementById("cel"+[k]).value = AllData[i].data.Charts[k].label;
                        document.getElementById("kd"+[k]).value = AllData[i].data.Charts[k].data;
                        RestNum();
                    }
                }
                Charts();
                function RestNum(){
                    var item = document.querySelector('.Revise-Wrap-Add').getElementsByTagName('select');
                    const lend = item[item.length-1].name;                    
                    switch (lend){
                        case'cel4':
                            document.querySelector('.el4').style.display='block'
                            break;
                        case'cel5':
                            document.querySelector('.el4').style.display='none'
                            document.querySelector('.el5').style.display='block'
                            break;
                        case'cel6':
                            document.querySelector('.el5').style.display='none'
                            document.querySelector('.el6').style.display='block'
                            break;
                        case'cel7':
                            document.querySelector('.el6').style.display='none'
                            document.querySelector('.el7').style.display='block'
                            break;
                        case'cel8':
                            document.querySelector('.el7').style.display='none'
                            document.querySelector('.el8').style.display='block'
                            break;
                        case'cel9':
                            document.querySelector('.el8').style.display='none'
                            document.querySelector('.el9').style.display='block'
                            break;
                        case'cel10':
                            document.querySelector('.el9').style.display='none'
                            document.querySelector('.el10').style.display='block'
                            break;
                        case'cel11':
                            document.querySelector('.el10').style.display='none'
                            document.querySelector('.el11').style.display='block'
                            break;
                        case'cel12':
                            document.querySelector('.el11').style.display='none'
                            document.querySelector('.el12').style.display='block'
                            break;
                        case'cel13':
                            document.querySelector('.el12').style.display='none'
                            document.querySelector('.el13').style.display='block'
                            break;
                        case'cel14':
                            document.querySelector('.el13').style.display='none'
                            document.querySelector('.el14').style.display='block'
                            break;
                        case'cel15':
                            document.querySelector('.el14').style.display='none'
                            document.querySelector('.el15').style.display='block'
                            break;
                        case'cel16':
                            document.querySelector('.el15').style.display='none'
                            document.querySelector('.el16').style.display='block'
                            break;
                        case'cel17':
                            document.querySelector('.el16').style.display='none'
                            document.querySelector('.el17').style.display='block'
                            break;
                        case'cel18':
                            document.querySelector('.el17').style.display='none'
                            document.querySelector('.el18').style.display='block'
                            break;
                        case'cel19':
                            document.querySelector('.el18').style.display='none'
                            document.querySelector('.el19').style.display='block'
                            break;
                        case'cel20':
                            document.querySelector('.el19').style.display='none'
                            document.querySelector('.el20').style.display='block'
                            break;
                        case'cel21':
                            document.querySelector('.el20').style.display='none'
                            document.querySelector('.el21').style.display='block'
                            break;
                        case'cel22':
                            document.querySelector('.el21').style.display='none'
                            document.querySelector('.el22').style.display='block'
                            break;
                        case'cel23':
                            document.querySelector('.el22').style.display='none'
                            document.querySelector('.el23').style.display='block'
                            break;
                        case'cel24':
                            document.querySelector('.el23').style.display='none'
                            document.querySelector('.el24').style.display='block'
                            break;
                        case'cel25':
                            document.querySelector('.el24').style.display='none'
                            document.querySelector('.el25').style.display='block'
                            break;
                        case'cel26':
                            document.querySelector('.el25').style.display='none'
                            document.querySelector('.el26').style.display='block'
                            break;
                        case'cel27':
                            document.querySelector('.el26').style.display='none'
                            document.querySelector('.el27').style.display='block'
                            break;
                        case'cel28':
                            document.querySelector('.el27').style.display='none'
                            document.querySelector('.el28').style.display='block'
                            break;
                        case'cel29':
                            document.querySelector('.el28').style.display='none'
                            document.querySelector('.el29').style.display='block'
                            break;
                        case'cel30':
                            document.querySelector('.el29').style.display='none'
                            document.querySelector('.el30').style.display='block'
                            break;
                        case'cel31':
                            document.querySelector('.el30').style.display='none'
                            document.querySelector('.el31').style.display='block'
                            break;
                        case'cel32':
                            document.querySelector('.el31').style.display='none'
                            document.querySelector('.el32').style.display='block'
                            break;
                        case'cel33':
                            document.querySelector('.el32').style.display='none'
                            document.querySelector('.el33').style.display='block'
                            break;
                        case'cel34':
                            document.querySelector('.el33').style.display='none'
                            document.querySelector('.el34').style.display='block'
                            break;
                        case'cel35':
                            document.querySelector('.el34').style.display='none'
                            document.querySelector('.el35').style.display='block'
                            break;
                        case'cel36':
                            document.querySelector('.el35').style.display='none'
                            document.querySelector('.el36').style.display='block'
                            break;
                        case'cel37':
                            document.querySelector('.el36').style.display='none'
                            document.querySelector('.el37').style.display='block'
                            break;
                        case'cel38':
                            document.querySelector('.el37').style.display='none'
                            document.querySelector('.el38').style.display='block'
                            break;
                        case'cel39':
                            document.querySelector('.el38').style.display='none'
                            document.querySelector('.el39').style.display='block'
                            break;
                        case'cel40':
                            document.querySelector('.el39').style.display='none'
                            document.querySelector('.el40').style.display='block'
                            break;
                        case'cel41':
                            document.querySelector('.el40').style.display='none'
                            document.querySelector('.el41').style.display='block'
                            break;
                    }
                }
                document.querySelector('.Re-name').innerHTML = AllData[i].data.name;
                for(var d=0; d<DataUpload.length;d++){
                    if(e.target.dataset.item == DataUpload[d].name){
                        let str2 = '';
                        str2 +=
                        `<button type="button" class="btn btn-outline-dark mr-2" id="close1" data-item="${DataUpload[d].name}" data-bs-dismiss="modal">取消</button>
                        <a class="activate" data-item="${DataUpload[d].name}" id="save">
                            <span>
                                <svg>
                                    <use xlink:href="#circle">
                                </svg>
                                <svg>
                                    <use xlink:href="#arrow">
                                </svg>
                                <svg>
                                    <use xlink:href="#check">
                                </svg>
                            </span>
                            <ul>
                                <li>修改保存</li>
                                <li>Waiting</li>
                                <li>上傳完成</li>
                            </ul>
                        </a>
                        <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
                            <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" id="circle">
                                <circle cx="8" cy="8" r="7.5"></circle>
                            </symbol>
                            <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" id="arrow">
                                <path d="M2.7008908,5.37931459 L2.7008908,5.37931459 C2.9224607,5.60207651 3.2826628,5.60304283 3.50542472,5.38147293 C3.52232305,5.36466502 3.53814843,5.34681177 3.55280728,5.32801875 L5.34805194,3.02646954 L5.34805194,10.3480519 C5.34805194,10.7081129 5.63993903,11 6,11 L6,11 C6.36006097,11 6.65194806,10.7081129 6.65194806,10.3480519 L6.65194806,3.02646954 L8.44719272,5.32801875 C8.6404327,5.57575732 8.99791646,5.61993715 9.24565503,5.42669716 C9.26444805,5.41203831 9.28230129,5.39621293 9.2991092,5.37931459 L9.2991092,5.37931459 C9.55605877,5.12098268 9.57132199,4.70855346 9.33416991,4.43193577 L6.75918715,1.42843795 C6.39972025,1.00915046 5.76841509,0.960656296 5.34912761,1.32012319 C5.31030645,1.35340566 5.27409532,1.38961679 5.24081285,1.42843795 L2.66583009,4.43193577 C2.42867801,4.70855346 2.44394123,5.12098268 2.7008908,5.37931459 Z"></path>
                            </symbol>
                            <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" id="check">
                                    <path id="test" d="M4.76499011,6.7673683 L8.2641848,3.26100386 C8.61147835,2.91299871 9.15190114,2.91299871 9.49919469,3.26100386 C9.51164115,3.27347582 9.52370806,3.28637357 9.53537662,3.29967699 C9.83511755,3.64141434 9.81891834,4.17816549 9.49919469,4.49854425 L5.18121271,8.82537365 C4.94885368,9.05820878 4.58112654,9.05820878 4.34876751,8.82537365 L2.50080531,6.97362503 C2.48835885,6.96115307 2.47629194,6.94825532 2.46462338,6.93495189 C2.16488245,6.59321455 2.18108166,6.0564634 2.50080531,5.73608464 C2.84809886,5.3880795 3.38852165,5.3880795 3.7358152,5.73608464 L4.76499011,6.7673683 Z"></path>
                            </symbol>
                        </svg>`;   
                        listBtn.innerHTML=str2;
                    }
                }
                // <button type="button" class="btn btn-outline-info" data-item="${DataUpload[d].name}" id="save">修改保存</button>
                // 判斷 新增項目 
                if(AllData[i].data.Charts.length == 42){
                    document.getElementById('ReviseAdd-case').style.display='none'
                }else if(AllData[i].data.Charts.length <= 4 || AllData[i].data.Charts.length < 42) {
                    document.getElementById('ReviseAdd-case').style.display='block'
                }
                // 圖片上傳
                $("#ReviseInput").change(function () {
                    const fileUrl = $("#ReviseInput").val();
                    const urlArr = fileUrl.split("\\");
                    const getName =urlArr[urlArr.length - 1]; 
                    $("#ReviseImgText").html(getName);
                    var img = $('#ReviseImg');
                    if(window.FileReader) {
                        var file  = $('#ReviseInput')[0].files[0];
                        var reader = new FileReader();
                        if (file && file.type.match('image.*')) {
                            reader.readAsDataURL(file);
                        } else {
                            img.attr('src', localStorage.getItem('original'));                            
                            document.getElementById('ReviseImgText').innerText=localStorage.getItem('originalName');
                            localStorage.removeItem('img3');
                        }
                        reader.onloadend = function (e) {
                            img.attr('src', reader.result);
                            img.css('display', 'block');
                            localStorage.setItem('img3', file.name);
                        }
                    }
                })
                //修改確認按鍵
                var ReviseBtn = document.getElementById('save');
                ReviseBtn.addEventListener('click',function(e){
                    e.preventDefault();
                    var ID = document.getElementById('save');
                    var IDName = ID.dataset.item
                    var finish = $("#Revise").valid();
                    if (finish == true){
                        const R_name  = document.getElementById('ReviseName');
                        const R_gender = document.getElementById('Revisegender');
                        const R_phone = document.getElementById('Revisephone');
                        const R_address = document.getElementById('Reviseaddress');
                        const R_year = document.getElementById('Reviseyear');
                        const R_work = document.getElementById('Revisework');
                        const R_No = document.getElementById('ReviseNo');
                        const R_score = document.getElementById('ReviseScore');
                        const db = firebase.firestore();
                        const ref =db.collection("個人資料").doc(IDName);
                        const selectedFile3 = document.getElementById('ReviseInput').files[0];
                        const storage3 = firebase.storage();
                        const group_serve2 = [];
                        $('.ex2').each(function(index){
                            if($(this).val()!='') {
                                group_serve2.push($(this).val());
                            }
                        });
                        var serveName2 =[];
                        for(i=0;i<group_serve2.length;i++){
                            serveName2.push({nested:{label:group_serve2[i]}})
                        }
                        var group_number2 = [];
                        $('.number2').each(function(index){
                            if($(this).val()!='') {
                                group_number2.push($(this).val());
                            }
                        });
                        var caseNumber2 =[];
                        for(i=0;i<group_number2.length;i++){
                            var Numbers = parseInt(group_number2[i])
                            caseNumber2.push({nested:{data:Numbers}})
                        }
                        var Charts = serveName2.map( (obj,index) => {
                            return Object.assign({}, obj.nested, caseNumber2[index] && caseNumber2[index].nested||{});             
                        });
                        if(localStorage.getItem('img3')==null){
                            document.getElementById("save").classList.add("active");
                            var self = $(this);
                            if(!self.hasClass('loading')) {
                                self.addClass('loading');
                                setTimeout(function() {
                                    self.addClass('done');
                                    ref.set({
                                        name:R_name.value,
                                        No:R_No.value,
                                        address:R_address.value,
                                        map:"",
                                        phone:R_phone.value,
                                        gender:R_gender.value,
                                        year:R_year.value,
                                        work:R_work.value,
                                        photo:localStorage.getItem('original'),
                                        YearsPractice:'',
                                        score:R_score.value,
                                        ImgUrlName:ImgName,               
                                        Charts
                                    },{merge: true}).then(() => {
                                        alert('資料無誤，已更新')
                                        localStorage.removeItem('original');
                                        window.location.reload();                            
                                    });
                                    // setTimeout(function() {
                                    //     self.removeClass('loading done');
                                    // }, 1000);
                                }, 1000);
                            }
                        }else{
                            if(ImgName != localStorage.getItem('img3')){
                                const path3 = 'Peivate Detective'+'/'+IDName+'/'+selectedFile3.name;
                                const storageRef3 = firebase.storage().ref(path3);
                                document.getElementById("save").classList.add("active");
                                storageRef3.put(selectedFile3);
                                const storageRef = firebase.storage().ref();
                                const desertRef = storageRef.child('Peivate Detective'+'/'+IDName+'/'+ ImgName);
                                desertRef.delete().then(() => {
                                    console.log('刪除圖片成功')
                                    function UpData2(){
                                        const NewPath = 'Peivate Detective'+'/'+IDName+'/'+selectedFile3.name;
                                        storage3.ref(NewPath).getDownloadURL().then((url) => {
                                            localStorage.setItem('NewImg2', url);
                                            console.log(localStorage.getItem('NewImg2'));
                                            NewImg2 = localStorage.getItem('NewImg2');
                                            ref.set({
                                                name:R_name.value,
                                                No:R_No.value,
                                                address:R_address.value,
                                                map:"",
                                                phone:R_phone.value,
                                                gender:R_gender.value,
                                                year:R_year.value,
                                                work:R_work.value,
                                                photo:NewImg2,
                                                YearsPractice:'',
                                                score:R_score.value,
                                                ImgUrlName:selectedFile3.name,                
                                                Charts
                                            },{merge: true}).then(() => {
                                                alert('資料無誤，已更新')
                                                localStorage.removeItem('img3');
                                                localStorage.removeItem('NewImg2');
                                                localStorage.removeItem('original');
                                                localStorage.removeItem('originalName');
                                                window.location.reload();                            
                                            });
                                        })
                                    }
                                    window.setTimeout(( () => UpData2() ), 4500);
                                    var self = $(this);
                                    if(!self.hasClass('loading')) {
                                        self.addClass('loading');
                                        setTimeout(function() {
                                            self.addClass('done');
                                            // setTimeout(function() {
                                            //     self.removeClass('loading done');
                                            // }, 5500);
                                        }, 5500);
                                    }
                                }).catch((error) => {
                                    console.log(error)
                                });                            
                            }else{
                                const path3 = 'Peivate Detective'+'/'+IDName+'/'+selectedFile3.name;
                                const storageRef3 = firebase.storage().ref(path3);
                                document.getElementById("save").classList.add("active");
                                storageRef3.put(selectedFile3);
                                function UpData3(){
                                    const NewPath = 'Peivate Detective'+'/'+IDName+'/'+selectedFile3.name;
                                    storage3.ref(NewPath).getDownloadURL().then((url) => {
                                        localStorage.setItem('NewImg2', url);
                                        console.log(localStorage.getItem('NewImg2'));
                                        NewImg2 = localStorage.getItem('NewImg2');
                                        ref.set({
                                            name:R_name.value,
                                            No:R_No.value,
                                            address:R_address.value,
                                            map:"",
                                            phone:R_phone.value,
                                            gender:R_gender.value,
                                            year:R_year.value,
                                            work:R_work.value,
                                            photo:NewImg2,
                                            YearsPractice:'',
                                            score:R_score.value,
                                            ImgUrlName:selectedFile3.name,                
                                            Charts
                                        },{merge: true}).then(() => {
                                            alert('資料無誤，已更新')
                                            localStorage.removeItem('img3');
                                            localStorage.removeItem('NewImg2');
                                            localStorage.removeItem('original');
                                            localStorage.removeItem('originalName');
                                            window.location.reload();                            
                                        });
                                    })
                                }
                                window.setTimeout(( () => UpData3() ), 4500);
                                var self = $(this);
                                if(!self.hasClass('loading')) {
                                    self.addClass('loading');
                                    setTimeout(function() {
                                        self.addClass('done');
                                        // setTimeout(function() {
                                        //     self.removeClass('loading done');
                                        // }, 5500);
                                    }, 5500);
                                }
                            }               
                        }                        
                    }else{
                        alert('表單填寫，不完全');                        
                    }                    
                })
                //刪除
                var ID = AllData[i].data.name;
                var db = firebase.firestore();
                var DeleteBtn = document.getElementById('delete');
                DeleteBtn.addEventListener('click',function(e){
                    e.preventDefault();
                    const storageRef = firebase.storage().ref();
                    const desertRef = storageRef.child('Peivate Detective'+'/'+ID+'/'+ ImgName);
                    desertRef.delete().then(() => {
                        console.log('刪除圖片成功') 
                    }).catch((error) => {
                        console.log(error)
                    });
                    db.collection("個人資料").doc(ID).delete().then(() => {
                        alert('文件刪除成功')
                        window.location.reload();
                    }).catch((error) => {
                        console.error("Error removing document: ", error);
                    });
                })
            }
        }
        //取消按鍵，按下會重置驗證表單
        var validator = $( "#Revise" ).validate();
        $('#close1').on('click', function (e) { 
            e.preventDefault();
            validator.resetForm();
            document.getElementById('ReviseImg').src = '';
            localStorage.removeItem('img3');
            localStorage.removeItem('original');
            localStorage.removeItem('originalName');            
        }); 
    })
    // 服務項目新增
    var AddBtn = document.getElementById('ReviseAdd-case');
    AddBtn.addEventListener('click',function(e){
        e.preventDefault();
        document.getElementById("ReviseAdd-case").classList.remove("active");
        var item = document.querySelector('.Revise-Wrap-Add').getElementsByTagName('select');
        const lend = item[item.length-1].name; 
        var AllWrap = document.querySelector('.Revise-wrap');
        var NowNum = Number;
        NowNum =  lend.replace('cel', '');
        if(NowNum <41){
            NowNum ++ ;
            $(AllWrap).append(
                `<div class="m-b4">
                    <a href="#" class="remove_btn float-right `+'el'+NowNum+`"><i class="fas fa-minus"></i></a> 
                    <div class="input-group">                    
                        <span class="input-group-text"><i class="far fa-address-card"></i></span>
                        <select name="`+'cel'+NowNum+`" class="form-select ex2" id="`+'cel'+NowNum+`" required>
                        <option selected disabled hidden value="">請選擇項目</option>
                            <option>外遇蒐證</option>
                            <option>抓姦專案</option>
                            <option>行蹤調查</option>
                            <option>尋人調查</option>
                            <option>查前科案件</option>
                            <option>查學歷案件</option>
                            <option>查電話案件</option>
                            <option>查地址案件</option>
                            <option>查出入境案件</option>
                            <option>其他個人資料調查</option>
                            <option>債務催收</option>
                            <option>呆帳處理</option>
                            <option>債務協商</option>
                            <option>傷害教訓</option>
                            <option>遺產糾紛</option>
                            <option>土地糾紛</option>
                            <option>醫療糾紛</option>
                            <option>車禍糾紛</option>
                            <option>撫養費協商</option>
                            <option>分手費協商</option>
                            <option>監護權協商</option>
                            <option>探視權協商</option>
                            <option>跨海調查</option>
                            <option>公司調查</option>
                            <option>商業調查</option>
                            <option>市場調查</option>
                            <option>越區傾銷調查</option>
                            <option>商業間諜調查</option>
                            <option>競業條款調查</option>
                            <option>盡職調查</option>
                            <option>非訴訟協調</option>
                            <option>器材架設</option>
                            <option>感情挽回</option>
                            <option>感情破壞</option>
                            <option>設計離婚</option>
                            <option>婚前調查</option>
                            <option>文書鑑定</option>
                            <option>子女調查</option>
                            <option>脫離不幸婚姻</option>
                            <option>仿冒、侵權案件</option>
                            <option>婚姻諮商</option>
                            <option>心理輔導</option>
                        </select>
                        <input type="text" name="`+'kd'+NowNum+`" class="form-control ml-2 number2" id="`+'kd'+NowNum+`" placeholder="請填案件數" value="" required>
                    </div> 
                </div>` 
            )
            function RestNum(){
                var item = document.querySelector('.Revise-Wrap-Add').getElementsByTagName('select');
                const lend = item[item.length-1].name;                    
                switch (lend){
                    case'cel4':
                        document.querySelector('.el4').style.display='block'
                        break;
                    case'cel5':
                        document.querySelector('.el4').style.display='none'
                        document.querySelector('.el5').style.display='block'
                        break;
                    case'cel6':
                        document.querySelector('.el5').style.display='none'
                        document.querySelector('.el6').style.display='block'
                        break;
                    case'cel7':
                        document.querySelector('.el6').style.display='none'
                        document.querySelector('.el7').style.display='block'
                        break;
                    case'cel8':
                        document.querySelector('.el7').style.display='none'
                        document.querySelector('.el8').style.display='block'
                        break;
                    case'cel9':
                        document.querySelector('.el8').style.display='none'
                        document.querySelector('.el9').style.display='block'
                        break;
                    case'cel10':
                        document.querySelector('.el9').style.display='none'
                        document.querySelector('.el10').style.display='block'
                        break;
                    case'cel11':
                        document.querySelector('.el10').style.display='none'
                        document.querySelector('.el11').style.display='block'
                        break;
                    case'cel12':
                        document.querySelector('.el11').style.display='none'
                        document.querySelector('.el12').style.display='block'
                        break;
                    case'cel13':
                        document.querySelector('.el12').style.display='none'
                        document.querySelector('.el13').style.display='block'
                        break;
                    case'cel14':
                        document.querySelector('.el13').style.display='none'
                        document.querySelector('.el14').style.display='block'
                        break;
                    case'cel15':
                        document.querySelector('.el14').style.display='none'
                        document.querySelector('.el15').style.display='block'
                        break;
                    case'cel16':
                        document.querySelector('.el15').style.display='none'
                        document.querySelector('.el16').style.display='block'
                        break;
                    case'cel17':
                        document.querySelector('.el16').style.display='none'
                        document.querySelector('.el17').style.display='block'
                        break;
                    case'cel18':
                        document.querySelector('.el17').style.display='none'
                        document.querySelector('.el18').style.display='block'
                        break;
                    case'cel19':
                        document.querySelector('.el18').style.display='none'
                        document.querySelector('.el19').style.display='block'
                        break;
                    case'cel20':
                        document.querySelector('.el19').style.display='none'
                        document.querySelector('.el20').style.display='block'
                        break;
                    case'cel21':
                        document.querySelector('.el20').style.display='none'
                        document.querySelector('.el21').style.display='block'
                        break;
                    case'cel22':
                        document.querySelector('.el21').style.display='none'
                        document.querySelector('.el22').style.display='block'
                        break;
                    case'cel23':
                        document.querySelector('.el22').style.display='none'
                        document.querySelector('.el23').style.display='block'
                        break;
                    case'cel24':
                        document.querySelector('.el23').style.display='none'
                        document.querySelector('.el24').style.display='block'
                        break;
                    case'cel25':
                        document.querySelector('.el24').style.display='none'
                        document.querySelector('.el25').style.display='block'
                        break;
                    case'cel26':
                        document.querySelector('.el25').style.display='none'
                        document.querySelector('.el26').style.display='block'
                        break;
                    case'cel27':
                        document.querySelector('.el26').style.display='none'
                        document.querySelector('.el27').style.display='block'
                        break;
                    case'cel28':
                        document.querySelector('.el27').style.display='none'
                        document.querySelector('.el28').style.display='block'
                        break;
                    case'cel29':
                        document.querySelector('.el28').style.display='none'
                        document.querySelector('.el29').style.display='block'
                        break;
                    case'cel30':
                        document.querySelector('.el29').style.display='none'
                        document.querySelector('.el30').style.display='block'
                        break;
                    case'cel31':
                        document.querySelector('.el30').style.display='none'
                        document.querySelector('.el31').style.display='block'
                        break;
                    case'cel32':
                        document.querySelector('.el31').style.display='none'
                        document.querySelector('.el32').style.display='block'
                        break;
                    case'cel33':
                        document.querySelector('.el32').style.display='none'
                        document.querySelector('.el33').style.display='block'
                        break;
                    case'cel34':
                        document.querySelector('.el33').style.display='none'
                        document.querySelector('.el34').style.display='block'
                        break;
                    case'cel35':
                        document.querySelector('.el34').style.display='none'
                        document.querySelector('.el35').style.display='block'
                        break;
                    case'cel36':
                        document.querySelector('.el35').style.display='none'
                        document.querySelector('.el36').style.display='block'
                        break;
                    case'cel37':
                        document.querySelector('.el36').style.display='none'
                        document.querySelector('.el37').style.display='block'
                        break;
                    case'cel38':
                        document.querySelector('.el37').style.display='none'
                        document.querySelector('.el38').style.display='block'
                        break;
                    case'cel39':
                        document.querySelector('.el38').style.display='none'
                        document.querySelector('.el39').style.display='block'
                        break;
                    case'cel40':
                        document.querySelector('.el39').style.display='none'
                        document.querySelector('.el40').style.display='block'
                        break;
                    case'cel41':
                        document.querySelector('.el40').style.display='none'
                        document.querySelector('.el41').style.display='block'
                        break;
                }
            }
            RestNum();
        }else{
            alert('選項已達上限，無法再新增')
        }
    })
    // 服務項目刪除
    var wrapper2 = document.querySelector('.Revise-Wrap-Add');
    $(wrapper2).on("click",".remove_btn", function(e){
        e.preventDefault(); 
        $(this).parent('div').remove();
        function RestNum(){
            var item = document.querySelector('.Revise-Wrap-Add').getElementsByTagName('select');
            const lend = item[item.length-1].name;                    
            switch (lend){
                case'cel4':
                    document.querySelector('.el4').style.display='block'
                    break;
                case'cel5':
                    document.querySelector('.el4').style.display='none'
                    document.querySelector('.el5').style.display='block'
                    break;
                case'cel6':
                    document.querySelector('.el5').style.display='none'
                    document.querySelector('.el6').style.display='block'
                    break;
                case'cel7':
                    document.querySelector('.el6').style.display='none'
                    document.querySelector('.el7').style.display='block'
                    break;
                case'cel8':
                    document.querySelector('.el7').style.display='none'
                    document.querySelector('.el8').style.display='block'
                    break;
                case'cel9':
                    document.querySelector('.el8').style.display='none'
                    document.querySelector('.el9').style.display='block'
                    break;
                case'cel10':
                    document.querySelector('.el9').style.display='none'
                    document.querySelector('.el10').style.display='block'
                    break;
                case'cel11':
                    document.querySelector('.el10').style.display='none'
                    document.querySelector('.el11').style.display='block'
                    break;
                case'cel12':
                    document.querySelector('.el11').style.display='none'
                    document.querySelector('.el12').style.display='block'
                    break;
                case'cel13':
                    document.querySelector('.el12').style.display='none'
                    document.querySelector('.el13').style.display='block'
                    break;
                case'cel14':
                    document.querySelector('.el13').style.display='none'
                    document.querySelector('.el14').style.display='block'
                    break;
                case'cel15':
                    document.querySelector('.el14').style.display='none'
                    document.querySelector('.el15').style.display='block'
                    break;
                case'cel16':
                    document.querySelector('.el15').style.display='none'
                    document.querySelector('.el16').style.display='block'
                    break;
                case'cel17':
                    document.querySelector('.el16').style.display='none'
                    document.querySelector('.el17').style.display='block'
                    break;
                case'cel18':
                    document.querySelector('.el17').style.display='none'
                    document.querySelector('.el18').style.display='block'
                    break;
                case'cel19':
                    document.querySelector('.el18').style.display='none'
                    document.querySelector('.el19').style.display='block'
                    break;
                case'cel20':
                    document.querySelector('.el19').style.display='none'
                    document.querySelector('.el20').style.display='block'
                    break;
                case'cel21':
                    document.querySelector('.el20').style.display='none'
                    document.querySelector('.el21').style.display='block'
                    break;
                case'cel22':
                    document.querySelector('.el21').style.display='none'
                    document.querySelector('.el22').style.display='block'
                    break;
                case'cel23':
                    document.querySelector('.el22').style.display='none'
                    document.querySelector('.el23').style.display='block'
                    break;
                case'cel24':
                    document.querySelector('.el23').style.display='none'
                    document.querySelector('.el24').style.display='block'
                    break;
                case'cel25':
                    document.querySelector('.el24').style.display='none'
                    document.querySelector('.el25').style.display='block'
                    break;
                case'cel26':
                    document.querySelector('.el25').style.display='none'
                    document.querySelector('.el26').style.display='block'
                    break;
                case'cel27':
                    document.querySelector('.el26').style.display='none'
                    document.querySelector('.el27').style.display='block'
                    break;
                case'cel28':
                    document.querySelector('.el27').style.display='none'
                    document.querySelector('.el28').style.display='block'
                    break;
                case'cel29':
                    document.querySelector('.el28').style.display='none'
                    document.querySelector('.el29').style.display='block'
                    break;
                case'cel30':
                    document.querySelector('.el29').style.display='none'
                    document.querySelector('.el30').style.display='block'
                    break;
                case'cel31':
                    document.querySelector('.el30').style.display='none'
                    document.querySelector('.el31').style.display='block'
                    break;
                case'cel32':
                    document.querySelector('.el31').style.display='none'
                    document.querySelector('.el32').style.display='block'
                    break;
                case'cel33':
                    document.querySelector('.el32').style.display='none'
                    document.querySelector('.el33').style.display='block'
                    break;
                case'cel34':
                    document.querySelector('.el33').style.display='none'
                    document.querySelector('.el34').style.display='block'
                    break;
                case'cel35':
                    document.querySelector('.el34').style.display='none'
                    document.querySelector('.el35').style.display='block'
                    break;
                case'cel36':
                    document.querySelector('.el35').style.display='none'
                    document.querySelector('.el36').style.display='block'
                    break;
                case'cel37':
                    document.querySelector('.el36').style.display='none'
                    document.querySelector('.el37').style.display='block'
                    break;
                case'cel38':
                    document.querySelector('.el37').style.display='none'
                    document.querySelector('.el38').style.display='block'
                    break;
                case'cel39':
                    document.querySelector('.el38').style.display='none'
                    document.querySelector('.el39').style.display='block'
                    break;
                case'cel40':
                    document.querySelector('.el39').style.display='none'
                    document.querySelector('.el40').style.display='block'
                    break;
                case'cel41':
                    document.querySelector('.el40').style.display='none'
                    document.querySelector('.el41').style.display='block'
                    break;
            }
        }
        RestNum();
        document.getElementById('ReviseAdd-case').style.display='block' 
    })
    //取消按鍵，按下會重置驗證表單
    var validator = $( "#Revise" ).validate();
    $('#close_All').on('click', function (e) { 
        e.preventDefault(); 
        validator.resetForm();
        document.getElementById('ReviseImg').src = '';
        localStorage.removeItem('original');
        localStorage.removeItem('img3');
        localStorage.removeItem('originalName');
    }); 
    var close2 = document.getElementById('close2')
    close2.addEventListener('click',function(e){
        e.preventDefault();
        document.getElementById("close2").classList.remove("active");
    })
    var close3 = document.getElementById('close3')
    close3.addEventListener('click',function(e){
        e.preventDefault();
        document.getElementById("close3").classList.remove("active");
    })
    //表單內容移除，並取消驗證
    var Cancel = document.querySelectorAll('.list-group-item');
    for(i=0;i<Cancel.length;i++){
        Cancel[i].addEventListener('click',function(e){
            e.preventDefault();
            Data2();
        })
    }
});





//眼睛開/關
$(document).on('click', '.toggle-password', function() {
    $(this).toggleClass("fa fa-fw fa-eye");
    $(this).toggleClass("fas fa-eye-slash");
    var input = $("#login-password");
    input.attr('type') === 'password' ? input.attr('type','text') : input.attr('type','password')
    var input2 = $("#sign-password");
    input2.attr('type') === 'password' ? input2.attr('type','text') : input2.attr('type','password')
    var input3 = $("#sign-confirm_password");
    input3.attr('type') === 'password' ? input3.attr('type','text') : input3.attr('type','password')
    var input4 = $("#mobil-login-password");
    input4.attr('type') === 'password' ? input4.attr('type','text') : input4.attr('type','password')
    var input5 = $("#mobil-sign-password");
    input5.attr('type') === 'password' ? input5.attr('type','text') : input5.attr('type','password')
    var input6 = $("#mobil-sign-confirm_password");
    input6.attr('type') === 'password' ? input6.attr('type','text') : input6.attr('type','password')
});
//loading
$(window).on('load',function(){
    $("#loading_txt").fadeOut(1750);
    $("#preloader").delay(1750).fadeOut("slow");
});
