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
        document.querySelector('.rank').style.display="none"
        document.querySelector('.rank-one').style.display="none"
        document.querySelector('.userName-one').innerHTML ="歡迎："+'&nbsp;'+'<svg class="bi" width="30" height="30"><use xlink:href="#people-circle"/></svg>'+localStorage.getItem('userName');
        document.querySelector('.userName').innerHTML ="歡迎："+'<svg class="bi me-1" width="30" height="30"><use xlink:href="#people-circle"/></svg>'+localStorage.getItem('userName');
    }
    var ID =localStorage.getItem('userName');
    if(localStorage.getItem('userName')=="sgas@gmail.com"){
        document.querySelector('.rank').style.display="block"
        document.querySelector('.rank-one').style.display="block"
    }
    if(localStorage.getItem('img')==null){
        document.getElementById('preview_progressbarTW_img').src = 'https://firebasestorage.googleapis.com/v0/b/concent-4b5ff.appspot.com/o/user.svg?alt=media&token=d1b32bc6-b569-4c60-8831-ccd7b571f682';
        document.getElementById('preview_progressbarTW_img-one').src = 'https://firebasestorage.googleapis.com/v0/b/concent-4b5ff.appspot.com/o/user.svg?alt=media&token=d1b32bc6-b569-4c60-8831-ccd7b571f682';
    }else{
        Img = localStorage.getItem('img');
        document.getElementById('preview_progressbarTW_img').src = Img;
        document.getElementById('preview_progressbarTW_img-one').src = Img;
    }

    var UserData =[];
    var db = firebase.firestore();
    var ref = db.collection('用戶資料');
    ref.onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {
            if(ID==doc.id ){
                console.log(doc.id);
                UserData.push({id:doc.id,data:doc.data()});
                document.getElementById("validationCustomUsername").value=UserData[0].data.userName;
                // document.getElementById("validationCustomUsermail").value=UserData[0].data.userEMail;
                document.getElementById("validationCustomUserphone").value=UserData[0].data.telephone;
                document.getElementById("validationCustomUseraddress").value=UserData[0].data.Address;
                document.getElementById('preview_progressbarTW_img').src = '';
                document.getElementById('preview_progressbarTW_img').src = UserData[0].data.imgUrl;
                document.getElementById("validationCustomUsername-one").value=UserData[0].data.userName;
                // document.getElementById("validationCustomUsermail-one").value=UserData[0].data.userEMail;
                document.getElementById("validationCustomUserphone-one").value=UserData[0].data.telephone;
                document.getElementById("validationCustomUseraddress-one").value=UserData[0].data.Address;
                document.getElementById('preview_progressbarTW_img-one').src = '';
                document.getElementById('preview_progressbarTW_img-one').src = UserData[0].data.imgUrl;
                document.querySelector('.sup').style.display='none';
                // document.querySelector('.sup1').style.display='none';
                document.querySelector('.sup2').style.display='none';
                document.querySelector('.sup3').style.display='none';
                document.querySelector('.sup-one').style.display='none';
                // document.querySelector('.sup1-one').style.display='none';
                document.querySelector('.sup2-one').style.display='none';
                document.querySelector('.sup3-one').style.display='none';
            }
        });
    });
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
    var upBtn = document.getElementById('progressbarTWInput');
    upBtn.addEventListener('change',event =>{
        const file = event.target.files[0];
        const path = ID+'/'+file.name;
        const storageReference = firebase.storage().ref(path)
        const task = storageReference.put(file);
        task.on("state_changed",function progress(snapshot) {
            let uploadValue = snapshot.bytesTransferred / snapshot.totalBytes * 100;
            uploader.value = uploadValue;
            },
            function error(err) {
                
                alert("圖片上傳失敗");
            },
            function complete() {
                msg.style.display='inline-block'
                
            }
        );
    });
    var upBtn2 = document.getElementById('progressbarTWInput-one');
    upBtn2.addEventListener('change',event =>{
        const file = event.target.files[0];
        const path = ID+'/'+file.name;
        const storageReference = firebase.storage().ref(path)
        const task = storageReference.put(file);
        task.on("state_changed",function progress(snapshot) {
            let uploadValue = snapshot.bytesTransferred / snapshot.totalBytes * 100;
            uploader_one.value = uploadValue;
            },
            function error(err) {
                alert("圖片上傳失敗");
            },
            function complete() {
                msg_one.style.display='inline-block'
                
            }
        );
    });
    $("#progressbarTWInput").change(function(){
        readURL(this);
        setTimeout(SearchImg, 3000);
    });
    $("#progressbarTWInput-one").change(function(){
        readURL2(this);
        setTimeout(SearchImg2, 3000);
    });
    function readURL(input){
        if(input.files && input.files[0]){
        var reader = new FileReader();
            reader.onload = function (e) {
                $("#preview_progressbarTW_img").attr('src', e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
        }
    } 
    function readURL2(input){
        if(input.files && input.files[0]){
        var reader = new FileReader();
            reader.onload = function (e) {
                $("#preview_progressbarTW_img-one").attr('src', e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }         
    function SearchImg(){
        var selectedFile = document.getElementById('progressbarTWInput').files[0];
        const storage = firebase.storage();
        const path = ID+'/'+selectedFile.name;
        storage.ref(path).getDownloadURL()
        .then((url) => {
            localStorage.setItem('img', url);
            console.log(localStorage.getItem('img'));
            // urlImag.push(url);
        })
    }
    function SearchImg2(){
        var selectedFile = document.getElementById('progressbarTWInput-one').files[0];
        const storage = firebase.storage();
        const path = ID+'/'+selectedFile.name;
        storage.ref(path).getDownloadURL()
        .then((url) => {
            localStorage.setItem('img', url);
            console.log(localStorage.getItem('img'));
            // urlImag.push(url);
        })
    }
    $('#contact_form').bootstrapValidator({
        feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
        },
        live: 'enabled',
        submitButtons: 'button[type="submit"]',
        fields:{
            name: {
            validators: {
                stringLength: {
                    min: 2,
                    message:'格式最少需兩個字'
                },
                notEmpty: {
                    message: '內容不能為空'
                }
            }
        },
            email: {
                validators: {
                    notEmpty: {
                        message: '內容不能為空'
                    },
                    emailAddress:{
                        message: '請輸入正確格式'
                    }
                }
            },
            telephone: {
            validators: {
                notEmpty: {
                    message: '內容不能為空'
                },
                // stringLength: {
                //     min: 10,
                //     max: 10,
                //     message: '請輸入正確的手機號碼'
                // },
                regexp: {
                    regexp: /^0[0-9]{1}[0-9]{8}$/,
                    message: '請輸入正確的手機號碼'
                }
            }
        },
            address: {
            validators: {
                stringLength: {
                    min: 8,
                    message: '請輸入完整地址'
                },
                notEmpty: {
                    message: '內容不能為空'
                }
            }
            }
        } 
    })
    .on('success.form.bv', function(e) {
        // $( "#success_message" ).slideDown( 300 ).delay( 3000 ).slideUp( 500 );
        // $('#contact_form').data('bootstrapValidator').resetForm();
        UserData.length=0;
        e.preventDefault();
        var $form = $(e.target);
        var bv = $form.data('bootstrapValidator');
        const nameElement = document.getElementById("validationCustomUsername");
        const name = nameElement.value;
        // const emailElement = document.getElementById("validationCustomUsermail");
        // const email = emailElement.value;
        const phoneElement = document.getElementById("validationCustomUserphone");
        const phone = phoneElement.value;
        const addressElement = document.getElementById("validationCustomUseraddress");
        const address = addressElement.value;
        const ID =localStorage.getItem('userName');
        var db = firebase.firestore();
        var ref =db.collection("用戶資料").doc(ID);
        if(localStorage.getItem('img')==null){
            Img = 'https://firebasestorage.googleapis.com/v0/b/concent-4b5ff.appspot.com/o/user.svg?alt=media&token=d1b32bc6-b569-4c60-8831-ccd7b571f682'
        }else{
            Img = localStorage.getItem('img');
        }
        ref.set({
            userName:name,
            // userEMail:email,
            telephone:phone,
            Address:address,
            imgUrl:Img,
        }).then(() => {
            alert('資料無誤，已上傳')
            // $('#contact_form').data('bootstrapValidator').resetForm(true);
            window.location.reload();
            var ID =localStorage.getItem('userName');
            var UserData =[];
            var db = firebase.firestore();
            var ref = db.collection('用戶資料');
            ref.onSnapshot(querySnapshot => {
                querySnapshot.forEach(doc => {
                    if(ID==doc.id){
                        UserData.push({id:doc.id,data:doc.data()});
                        document.getElementById("validationCustomUsername").value=UserData[0].data.userName;
                        // document.getElementById("validationCustomUsermail").value=UserData[0].data.userEMail;
                        document.getElementById("validationCustomUserphone").value=UserData[0].data.telephone;
                        document.getElementById("validationCustomUseraddress").value=UserData[0].data.Address;
                        document.getElementById('preview_progressbarTW_img').src = UserData[0].data.imgUrl;
                    }
                });
            });
        });
    });
    $('#contact_form-one').bootstrapValidator({
        feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
        },
        live: 'enabled',
        submitButtons: 'button[type="submit"]',
        fields:{
            name: {
            validators: {
                stringLength: {
                    min: 2,
                    message:'格式最少需兩個字'
                },
                notEmpty: {
                    message: '內容不能為空'
                }
            }
        },
            email: {
                validators: {
                    notEmpty: {
                        message: '內容不能為空'
                    },
                    emailAddress:{
                        message: '請輸入正確格式'
                    }
                }
            },
            telephone: {
            validators: {
                notEmpty: {
                    message: '內容不能為空'
                },
                // stringLength: {
                //     min: 10,
                //     max: 10,
                //     message: '請輸入正確的手機號碼'
                // },
                regexp: {
                    regexp: /^0[0-9]{1}[0-9]{8}$/,
                    message: '請輸入正確的手機號碼'
                }
            }
        },
            address: {
            validators: {
                stringLength: {
                    min: 8,
                    message: '請輸入完整地址'
                },
                notEmpty: {
                    message: '內容不能為空'
                }
            }
            }
        } 
    })
    .on('success.form.bv', function(e) {
        // $( "#success_message" ).slideDown( 300 ).delay( 3000 ).slideUp( 500 );
        // $('#contact_form').data('bootstrapValidator').resetForm();
        UserData.length=0;
        e.preventDefault();
        var $form = $(e.target);
        var bv = $form.data('bootstrapValidator');
        const nameElement = document.getElementById("validationCustomUsername-one");
        const name = nameElement.value;
        // const emailElement = document.getElementById("validationCustomUsermail");
        // const email = emailElement.value;
        const phoneElement = document.getElementById("validationCustomUserphone-one");
        const phone = phoneElement.value;
        const addressElement = document.getElementById("validationCustomUseraddress-one");
        const address = addressElement.value;
        const ID =localStorage.getItem('userName');
        var db = firebase.firestore();
        var ref =db.collection("用戶資料").doc(ID);
        if(localStorage.getItem('img')==null){
            Img = 'https://firebasestorage.googleapis.com/v0/b/concent-4b5ff.appspot.com/o/user.svg?alt=media&token=d1b32bc6-b569-4c60-8831-ccd7b571f682'
        }else{
            Img = localStorage.getItem('img');
        }
        ref.set({
            userName:name,
            // userEMail:email,
            telephone:phone,
            Address:address,
            imgUrl:Img,
        }).then(() => {
            alert('資料無誤，已上傳')
            // $('#contact_form').data('bootstrapValidator').resetForm(true);
            window.location.reload();
            var ID =localStorage.getItem('userName');
            var UserData =[];
            var db = firebase.firestore();
            var ref = db.collection('用戶資料');
            ref.onSnapshot(querySnapshot => {
                querySnapshot.forEach(doc => {
                    if(ID==doc.id){
                        UserData.push({id:doc.id,data:doc.data()});
                        document.getElementById("validationCustomUsername-one").value=UserData[0].data.userName;
                        // document.getElementById("validationCustomUsermail-one").value=UserData[0].data.userEMail;
                        document.getElementById("validationCustomUserphone-one").value=UserData[0].data.telephone;
                        document.getElementById("validationCustomUseraddress-one").value=UserData[0].data.Address;
                        document.getElementById('preview_progressbarTW_img-one').src = UserData[0].data.imgUrl;
                    }
                });
            });
        });
    });
    
});
var pee = -270
var drec = 30;
var speed = 30;
var l = pee;
//This is the function that closes the menu
function Proj7GlideBack() {
    l += drec;
    document.getElementById('menuBar').style.left = l + 'px';
    if (l < 0){
        setTimeout('Proj7GlideBack()', speed);
    } else {
        document.getElementById('glidetextLink').onclick = moveIn;
    }
}
//This is the function that opens the menu
function Proj7GlideOut() {
    l -= drec;
        document.getElementById('menuBar').style.left = l + 'px';
    if (l > pee){
        setTimeout('Proj7GlideOut()', speed);
    } else {
        document.getElementById('glidetextLink').onclick = moveOut;
    }
}
function moveIn() {
    Proj7GlideOut();
    return false;
}
function moveOut() {
    Proj7GlideBack();
    return false;
}
if (document.layers) {
    origWidth = innerWidth;
    origHeight = innerHeight;
}
function reDo() {
    if (innerWidth != origWidth || innerHeight != origHeight)
        location.reload();
}
if (document.layers)
    onresize = reDo;
var firebaseConfig = {
apiKey: "AIzaSyB5VkCXdvmei1yH8Wd94DuewfebvMF8nrE",
authDomain: "concent-4b5ff.firebaseapp.com",
databaseURL: "https://concent-4b5ff-default-rtdb.firebaseio.com",
projectId: "concent-4b5ff",
storageBucket: "concent-4b5ff.appspot.com",
messagingSenderId: "130866503341",
appId: "1:130866503341:web:e91223f3495b94e45c3024",
measurementId: "G-EXKJ2EPGKP"
};
firebase.initializeApp(firebaseConfig);
var newData = [];
var list = document.querySelector(".all");
var listOne = document.querySelector(".all-one");
var updateID = String;
var $content = $('#content'),
$btn = $('#btn'),
$show = $('#show'),
ms = new Date().getTime();
var update = document.querySelector('.modal-footer')
const pageid = document.getElementById('pageid');
const pageidOne = document.getElementById('pageid-one');
$(document).ready(function(){
var db = firebase.firestore();
var ref =db.collection("個人資料");
var data2 =[];
var KH=[];
ref.onSnapshot(querySnapshot => {
querySnapshot.forEach(doc => {
    data2.push(doc.data());
    data2 = data2.sort(function (a, b) {
    return b.score - a.score;
    });
    newData.push({id:doc.id,data:doc.data()});
});
for(var i=0;i<data2.length;i++){
    KH.push(data2[i]);
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
list.innerHTML=str;
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
pageid.innerHTML = str;
pageidOne.innerHTML = str;
}
function switchPage(e){
e.preventDefault();
$('html, body').animate({scrollTop: 0}, 0);
if(e.target.nodeName !== 'A') return;
const page = e.target.dataset.page;
pagination(KH, page);
}
pageid.addEventListener('click', switchPage);
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
});
var email= document.getElementById("email");
var password =document.getElementById("password");
var loginBtn =document.getElementById("loginBtn");
var btnLogOut = document.getElementById('LogOut');
var btnLogOutOne = document.getElementById('LogOut-one');
btnLogOut.addEventListener('click',function(e){
e.preventDefault();
var name = localStorage.getItem('userName');
console.log(name);
if (name != null){
    firebase.auth().signOut().then(function() {
        alert('帳號已登出');
        localStorage.removeItem('userName');
        localStorage.removeItem('img');
        document.location.href="./index.html";
    })
}else{
}
})
btnLogOutOne.addEventListener('click',function(e){
e.preventDefault();
var name = localStorage.getItem('userName');
console.log(name);
if (name != null){
    firebase.auth().signOut().then(function() {
        alert('帳號已登出');
        localStorage.removeItem('userName');
        localStorage.removeItem('img');
        document.location.href="./index.html";
    })
}else{
}
})
// 信箱驗證
firebase.auth().onAuthStateChanged(user => {
if(user) {
    const emailVerify = user.emailVerified;
    document.getElementById('user-email-verify').innerHTML = `您的信箱是否驗證：${emailVerify}`;
    console.log({emailVerify});
    var user = firebase.auth().currentUser;
    const btnVerifyEmail = document.getElementById('verify-email');
    btnVerifyEmail.addEventListener('click', () => {
        // firebase.auth().languageCode = 'zh-TW'; // 發信模版改中文
        user.sendEmailVerification().then(function() {
        // 驗證信發送完成
        window.alert('驗證信已發送到您的信箱，請查收。')
        }).catch(error => {
        // 驗證信發送失敗
        changeErrMessage(error.message);
        });
    });
}
})

$(window).on('load',function(){
$("#loading_txt").fadeOut(1750);
$("#preloader").delay(1750).fadeOut("slow");
});