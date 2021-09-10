
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
  var CheckBtn = document.getElementById('check');
  CheckBtn.addEventListener('click',function(e){
      if (localStorage.getItem('userName')==null){
        e.preventDefault();
        document.querySelector('.modal-backdrop').style.display="none"
        document.querySelector('.modal-content').style.display="none"
        alert('請先登入')
        document.location.href="./Login.html";
        return false
      }
  })
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
var Message = document.getElementById("show");
var MessageContent = document.getElementById("showAll");
var Rest = document.querySelector('.cet');
var updateID = String;
var $content = $('#content'),
    $btn = $('#btn'),
    $showAll =$('#showAll'),
    $show = $('#show'),
    ms = new Date().getTime();
var update = document.querySelector('.modal-footer')
var page = document.getElementById("ID_page");
var allData =[];
const NameData = []; 
// var selectName = document.querySelector('#selectNameContainer');
var SearchName = document.getElementById('search');
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
      allData.push(data2[i]);
      document.querySelector('.top1').innerHTML='<span class="badge bg-danger mr-2">TOP 1</span>'+data2[0].name;
      document.querySelector('.top2').innerHTML='<span class="badge bg-danger mr-2">TOP 2</span>'+data2[1].name;
      document.querySelector('.top3').innerHTML='<span class="badge bg-danger mr-2">TOP 3</span>'+data2[2].name;
      document.querySelector('.top4').innerHTML='<span class="badge bg-danger mr-2">TOP 4</span>'+data2[3].name;
      document.querySelector('.top5').innerHTML='<span class="badge bg-danger mr-2">TOP 5</span>'+data2[4].name;
    }
    // upMenu(allData);
    pagination(allData, 1);
  });
  function pagination(importData, displayPage) {
	const alldataTotal = importData.length;
	const eachdataTotal = 15;
	const pageTotal = Math.ceil(alldataTotal / eachdataTotal);
	let currentPage = displayPage;
	if (currentPage > pageTotal) {
		currentPage = pageTotal;
	}
	const minNumber = currentPage * eachdataTotal - eachdataTotal + 1;
	const maxNumber = currentPage * eachdataTotal;
	const pageData = [];
	importData.forEach((element, index) => {
		const number = index + 1;
		if (number >= minNumber && number <= maxNumber) {
			pageData.push(element);
		}
	});
	const pageManager = {
		pageTotal,
		currentPage, 
		pre: currentPage > 1,
		next: currentPage < pageTotal 
	};
	pageBtn(pageManager); 
	dataHtml(pageData);
  }
  function pageBtn(parameter) {
    const pageTotal = parameter.pageTotal;
    let str = '';
    if (parameter.pre) {
      str += `
      <li class="page-item">
        <a class="page-link" href="#" data-pages="${Number(parameter.currentPage) - 1}">
          <i class="fas fa-caret-left"></i>
        </a>
      </li>
      `;
    } else {
      str += `
      <li class="page-item disabled">
        <a class="page-link" href="#">
          <i class="fas fa-caret-left"></i>
        </a>
      </li>
      `;
    }
    for (let i = 1; pageTotal >= i; i++) {
      if (Number(parameter.currentPage) === i) {
        str += `
        <li class="page-item active">
          <a class="page-link" href="#" data-pages="${i}">${i}</a>
        </li>
        `;
      } else {
        str += `
        <li class="page-item">
          <a class="page-link" href="#" data-pages="${i}">${i}</a>
        </li>
        `;
      }
    }
    if (parameter.next) {
      str += `
      <li class="page-item"> 
        <a class="page-link" href="#" data-pages="${Number(parameter.currentPage) + 1}">
          <i class="fas fa-caret-right"></i>
        </a>
      </li>
      `;
    } else {
      str += `
      <li class="page-item disabled">
        <a class="page-link" href="#">
          <i class="fas fa-caret-right"></i>
        </a>
      </li>
      `;
    }
    page.innerHTML = str;
  }
  function dataHtml(parameter) {
    let str = "";
    for (let i = 0; i < parameter.length; i++) {
      str +=
          `<tr class='slow' data-item="${parameter[i].name}">
          <td class='text-center' data-item="${parameter[i].name}">
          <div id="img-photo" class="d-flex align-items-center justify-content-center" data-item="${parameter[i].name}">
            <div data-item="${parameter[i].name}" style="display: inline-block;border-radius: 6px 6px 0px 0px;width: 70px;height: 90px;background-position: center;background-size: cover;background-image:url('${parameter[i].photo}');" class="mr-3"></div>
            ${parameter[i].name}
          </div>
          </td>
          <td class='text-center' data-item="${parameter[i].name}">
          ${parameter[i].Charts[0].label}(${parameter[i].Charts[0].data}%)
          <br>${parameter[i].Charts[1].label}(${parameter[i].Charts[1].data}%)
          <br>${parameter[i].Charts[2].label}(${parameter[i].Charts[2].data}%)
          <br>${parameter[i].Charts[3].label}(${parameter[i].Charts[3].data}%)
          </td>
          </tr>`;
    }
    list.innerHTML = str;
  }
  // function upMenu(parameter) {
  //   // 先準備空陣列，它是地區資料庫
  //   const allName = [];
  //   // 調用陣列每個元素
  //   parameter.forEach(function(element) {
  //     // indexOf() 指定搜尋 element.Zone
  //     // 當沒有找到回傳 -1，會 push 沒有的地區不重覆
  //     if (allName.indexOf(element.name) == -1) {
  //       allName.push(element.name);
  //     }
  //   });
  //   // view
  //   for (let i = 0; i < allName.length; i++) {
  //     const addOption = document.createElement('Option');
  //     // addOption.value = allName[i];
  //     addOption.textContent = allName[i];
  //     addOption.setAttribute('value', allName[i]);
  //     selectName.appendChild(addOption);
  //   }
  //   // 這是地區判斷值，留給分頁按鈕函式
  //   // 判斷現在頁面地區，是顯示哪一個地區，預設 HTML 是隱藏的
  //   zoneTitle.textContent = '全部地區';
  // };
  // function changeZone(e) {
  //   // 特定地區資料庫 NameData
  //   // 執行前先清空上一個函式可能 push 的資料
  //   NameData.length = 0;
  //   // 這是地區判斷值，留給分頁按鈕函式
  //   // 判斷現在頁面地區，是顯示哪一個地區，預設 HTML 是隱藏的
  //   zoneTitle.textContent = e.target.value;
  //   // 設計上，有全部地區，故這邊有 switch 
  //   // 比對 表達式 裡頭的值是否符合 case 條件
  //   switch (true) {
  //     // 當點擊數值，不是全部地區
  //     case e.target.value !== '全部地區':
  //       // 組合特定地區資料庫 NameData
  //       for (let i = 0; allData.length > i; i++) {
  //         // 如果點擊地區與陣列地區相同時，則 push 該陣列索引值
  //         if (e.target.value === allData[i].name) {
  //           NameData.push(allData[i]);
  //         }
  //       }
  //       // 以 "特定地區資料庫" 為 "資料庫參數"
  //       pagination(NameData, 1);
  //       break
  //     // 預設 
  //     default:
  //       // 以 "全地區資料庫" 為 "資料庫參數"
  //       pagination(allData, 1);
  //       break
  //   }
  // }
  var SearchItem =document.getElementById('search').value;
  if(SearchItem == ''){
    document.querySelector('.person').style.display='none';
  }
  function search(e){
    NameData.length =0;
    // zoneTitle.textContent = e.target.value;
    switch (true) {
      case e.target.value !== '':
        for (let i = 0; allData.length > i; i++) {
          if (e.target.value === allData[i].name[0] || e.target.value === allData[i].name[1] || e.target.value === allData[i].name[2]) {
            NameData.push(allData[i]);
          }
        }
        pagination(NameData, 1);
        if (NameData.length == 0){
          document.querySelector('.person').style.display='contents';
          console.log(NameData);
        }else if(NameData[0] != []){
          document.querySelector('.person').style.display='none';
        }
        break
      default:
        pagination(allData, 1);
        document.querySelector('.person').style.display='none';
        break
    }
  }
  function clickPage(e) {
    e.preventDefault();
    if (e.target.nodeName !== 'A') { return };
    const page = e.target.dataset.pages;
    pagination(allData, page);
    $('html, body').animate({scrollTop: 0}, 0);
  }
  page.addEventListener('click', clickPage);
  // selectName.addEventListener('change', changeZone);
  SearchName.addEventListener('keyup',search);
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
  $('#stars li').on('click', function(){
    var onStar = parseInt($(this).data('value'), 10);
    var stars = $(this).parent().children('li.star');
    for (i = 0; i < stars.length; i++) {
      $(stars[i]).removeClass('selected');
    }
    for (i = 0; i < onStar; i++) {
      $(stars[i]).addClass('selected');
    }
    var ratingValue = parseInt($('#stars li.selected').last().data('value'), 10);
    var msg = "";
    if (ratingValue >= 1) {
        msg = ratingValue;
    }
    else {
        alert('請選擇評分')
    }
    responseMessage(msg);
  });
});


function responseMessage(msg) {
  var x = document.querySelector(".score").innerHTML;
  var num = [];
  num.push(x);
  if(msg=='0'|| x==''){
    return false
  }else if(msg==5){
    num  = parseInt(num) +msg 
  }else if(msg==4){
    num  = parseInt(num) +msg 
  }else if(msg==3){
    num  = parseInt(num) +msg 
  }else if(msg==2){
    num  = parseInt(num) +msg 
  }else if(msg==1){
    num  = parseInt(num) +msg 
  }
  document.querySelector(".score2").innerHTML= num;
  document.querySelector(".score").style.display="none";
}


$(list).delegate(`tr`, `click`, function (e){
  var pie=[];
  var color=[];
  var dataSc=[];
  $('html, body').animate({scrollTop: 0}, 0);
  for(var i=0; i<newData.length;i++){
    if(e.target.dataset.item==newData[i].data.name){
      for(var k=0; k<25;k++){
        color.push(newData[i].data.Charts[k].color);
        pie.push({label:newData[i].data.Charts[k].label,value:newData[i].data.Charts[k].data});
        dataSc.push([newData[i].data.Charts[k].label,newData[i].data.Charts[k].data])
      }
      Highcharts.chart('container', {
        chart: {
            styledMode: true
        },
        title: {
            text: ''
        },
        tooltip: {
          pointFormat: '<b>{point.percentage:.1f}%</b>'
        },
        series: [{
            type: 'pie',
            allowPointSelect: true,
            keys: ['name', 'y', 'selected', 'sliced'],
            data: dataSc,
            showInLegend: true
        }]
      });
      document.getElementById('ID_page').style.display="none";
      document.querySelector('.admin').style.display="block";
      document.querySelector('.content').style.display="block";
      document.querySelector('.oneDate').style.display="block";
      document.querySelector('.content-search').style.display="none";
      document.querySelector('.mobile').style.display="none";
      document.querySelector('.mobile2').style.display="none";
      document.querySelector('.mobile-search').style.display="none";
      document.getElementById('photo').src = newData[i].data.photo;
      document.getElementById("name").innerHTML = newData[i].data.name+'徵信士';
      document.getElementById("PeivateDetectiveNo").innerHTML = newData[i].data.No;
      document.getElementById("gender").innerHTML = newData[i].data.gender;
      document.getElementById("year").innerHTML ='民國'+ newData[i].data.year+'年';
      document.getElementById("YearsPractice").innerHTML =newData[i].data.YearsPractice;
      document.querySelector(".score").innerHTML = newData[i].data.score;
      // document.getElementById("case").innerHTML =newData[i].data.case;
      // document.getElementById("news").innerHTML =newData[i].data.news;
      document.getElementById("work").innerHTML =newData[i].data.work;
      document.getElementById("phone").href ='tel:'+newData[i].data.phone;
      document.getElementById("phone").innerHTML =newData[i].data.phone;
      if(newData[i].data.address==''){
        document.getElementById("address").innerHTML='';
        document.getElementById("map").innerHTML='';
      }else
      document.getElementById("address").innerHTML ="<i class='fas fa-map-marked-alt mr-1'></i>地址："+newData[i].data.address;
      document.getElementById("map").href =newData[i].data.map;
      updateID=newData[i].id;
    }
  }
  var database = firebase.database().ref(updateID);
  var str ='';
  var strAll ='';
  var num = String;
  var Data =[];
  database.on('value', function(snapshot) {
    $show.html('');
    $showAll.html('');
    MessageContent.innerHTML = '';
    snapshot.forEach(function(childSnapshot) {
      var key = childSnapshot.key;
      var childData = childSnapshot.val();
      Data.push({keys:key,content:childData});
    })
    const set = new Set();
    const result = Data.filter(item => !set.has(item.keys) ? set.add(item.keys) : false);
    num=result.length;
    document.getElementById('num').innerHTML=num;
    if(snapshot.val()==null){
      document.querySelector('.hide-content').style.display="none";
    }else if(snapshot.val()!=null || result.length <= '5'){
      document.querySelector('.show2').style.display="none";
      for(var k=0;k<result.length;k++){
        $show.append('<li>'+"<div class='messageID' data-id="+result[k].content.id+">"+
        "<button class='btn btn-outline-danger float-end delete' data-id="+result[k].content.id+" data-key="+result[k].keys+">刪除</button>"+
        '<i class="fas fa-user-circle i-size" title="匿名"></i>：'+'<span class="list-p">'+result[k].content.content+'<span>'+'<br>'+'<small>'+result[k].content.time+'<small>'+'</div>'+'</li>');
      }
      document.querySelector('.hide-content').style.display="none";
    }
    if (result.length >='6'){
      $show.html('');
      document.querySelector('.hide-content').style.display='inline-block';
      for(var k=0;k<result.length;k++){
        $showAll.append('<li>'+"<div class='messageID' data-id="+result[k].content.id+">"+
        "<button class='btn btn-outline-danger float-end delete' data-id="+result[k].content.id+" data-key="+result[k].keys+">刪除</button>"+
        '<i class="fas fa-user-circle i-size" title="匿名"></i>：'+'<span class="list-p">'+result[k].content.content+'<span>'+'<br>'+'<small>'+result[k].content.time+'<small>'+'</div>'+'</li>');
      }
      $show.append('<li>'+"<div class='messageID' data-id="+result[result.length-5].content.id+">"+
      "<button class='btn btn-outline-danger float-end delete' data-id="+result[result.length-5].content.id+" data-key="+result[result.length-5].keys+">刪除</button>"+
      '<i class="fas fa-user-circle i-size" title="匿名"></i>：'+'<span class="list-p">'+result[result.length-5].content.content+'<span>'+'<br>'+'<small>'+result[result.length-5].content.time+'<small>'+'</div>'+'</li>'+
      '<li>'+"<div class='messageID' data-id="+result[result.length-4].content.id+">"+
      "<button class='btn btn-outline-danger float-end delete' data-id="+result[result.length-4].content.id+" data-key="+result[result.length-4].keys+">刪除</button>"+
      '<i class="fas fa-user-circle i-size" title="匿名"></i>：'+'<span class="list-p">'+result[result.length-4].content.content+'<span>'+'<br>'+'<small>'+result[result.length-4].content.time+'<small>'+'</div>'+'</li>'+
      '<li>'+"<div class='messageID' data-id="+result[result.length-3].content.id+">"+
      "<button class='btn btn-outline-danger float-end delete' data-id="+result[result.length-3].content.id+" data-key="+result[result.length-3].keys+">刪除</button>"+
      '<i class="fas fa-user-circle i-size" title="匿名"></i>：'+'<span class="list-p">'+result[result.length-3].content.content+'<span>'+'<br>'+'<small>'+result[result.length-3].content.time+'<small>'+'</div>'+'</li>'+
      '<li>'+"<div class='messageID' data-id="+result[result.length-2].content.id+">"+
      "<button class='btn btn-outline-danger float-end delete' data-id="+result[result.length-2].content.id+" data-key="+result[result.length-2].keys+">刪除</button>"+
      '<i class="fas fa-user-circle i-size" title="匿名"></i>：'+'<span class="list-p">'+result[result.length-2].content.content+'<span>'+'<br>'+'<small>'+result[result.length-2].content.time+'<small>'+'</div>'+'</li>'+
      '<li>'+"<div class='messageID' data-id="+result[result.length-1].content.id+">"+
      "<button class='btn btn-outline-danger float-end delete' data-id="+result[result.length-1].content.id+" data-key="+result[result.length-1].keys+">刪除</button>"+
      '<i class="fas fa-user-circle i-size" title="匿名"></i>：'+'<span class="list-p">'+result[result.length-1].content.content+'<span>'+'<br>'+'<small>'+result[result.length-1].content.time+'<small>'+'</div>'+'</li>');
    }
    var btn= document.getElementById('show').getElementsByTagName('button');
    for (var k = 0; k < btn.length; k++){
      if(btn[k].dataset.id !=localStorage.getItem('userName')){
        btn[k].style.display = "none"
      }
    }
    var btn= document.getElementById('showAll').getElementsByTagName('button');
    for (var k = 0; k < btn.length; k++){
      if(btn[k].dataset.id !=localStorage.getItem('userName')){
        btn[k].style.display = "none"
      }
    }
  }); 
})
$(window).on('load',function(){
  $("#loading_txt").fadeOut(1400);
  $("#preloader").delay(1400).fadeOut("slow");
});



$(MessageContent).delegate(`.delete`,`click`,function(e){
  var database = firebase.database().ref(updateID);
  console.log(e.target.dataset.key);
  database.child(e.target.dataset.key).remove()
  alert('刪除成功')
  var str ='';
  var strAll ='';
  var num = String;
  var Data =[];
  database.on('value', function(snapshot) {
    $show.html('');
    $showAll.html('');
    MessageContent.innerHTML = '';
    snapshot.forEach(function(childSnapshot) {
      var key = childSnapshot.key;
      var childData = childSnapshot.val();
      Data.push({keys:key,content:childData});
    })
    const set = new Set();
    const result = Data.filter(item => !set.has(item.keys) ? set.add(item.keys) : false);
    num=result.length;
    document.getElementById('num').innerHTML=num;
    if(snapshot.val()==null){
      document.querySelector('.hide-content').style.display="none";
    }else if(snapshot.val()!=null || result.length <= '5'){
      document.querySelector('.show2').style.display="none";
      for(var k=0;k<result.length;k++){
        $show.append('<li>'+"<div class='messageID' data-id="+result[k].content.id+">"+
        "<button class='btn btn-outline-danger float-end delete' data-id="+result[k].content.id+" data-key="+result[k].keys+">刪除</button>"+
        '<i class="fas fa-user-circle i-size" title="匿名"></i>：'+'<span class="list-p">'+result[k].content.content+'<span>'+'<br>'+'<small>'+result[k].content.time+'<small>'+'</div>'+'</li>');
      }
      document.querySelector('.hide-content').style.display="none";
    }
    console.log(result.length);
    if (result.length >='6'){
      $show.html('');
      document.querySelector('.hide-content').style.display='inline-block';
      for(var k=0;k<result.length;k++){
        $showAll.append('<li>'+"<div class='messageID' data-id="+result[k].content.id+">"+
        "<button class='btn btn-outline-danger float-end delete' data-id="+result[k].content.id+" data-key="+result[k].keys+">刪除</button>"+
        '<i class="fas fa-user-circle i-size" title="匿名"></i>：'+'<span class="list-p">'+result[k].content.content+'<span>'+'<br>'+'<small>'+result[k].content.time+'<small>'+'</div>'+'</li>');
      }
      $show.append('<li>'+"<div class='messageID' data-id="+result[result.length-5].content.id+">"+
      "<button class='btn btn-outline-danger float-end delete' data-id="+result[result.length-5].content.id+" data-key="+result[result.length-5].keys+">刪除</button>"+
      '<i class="fas fa-user-circle i-size" title="匿名"></i>：'+'<span class="list-p">'+result[result.length-5].content.content+'<span>'+'<br>'+'<small>'+result[result.length-5].content.time+'<small>'+'</div>'+'</li>'+
      '<li>'+"<div class='messageID' data-id="+result[result.length-4].content.id+">"+
      "<button class='btn btn-outline-danger float-end delete' data-id="+result[result.length-4].content.id+" data-key="+result[result.length-4].keys+">刪除</button>"+
      '<i class="fas fa-user-circle i-size" title="匿名"></i>：'+'<span class="list-p">'+result[result.length-4].content.content+'<span>'+'<br>'+'<small>'+result[result.length-4].content.time+'<small>'+'</div>'+'</li>'+
      '<li>'+"<div class='messageID' data-id="+result[result.length-3].content.id+">"+
      "<button class='btn btn-outline-danger float-end delete' data-id="+result[result.length-3].content.id+" data-key="+result[result.length-3].keys+">刪除</button>"+
      '<i class="fas fa-user-circle i-size" title="匿名"></i>：'+'<span class="list-p">'+result[result.length-3].content.content+'<span>'+'<br>'+'<small>'+result[result.length-3].content.time+'<small>'+'</div>'+'</li>'+
      '<li>'+"<div class='messageID' data-id="+result[result.length-2].content.id+">"+
      "<button class='btn btn-outline-danger float-end delete' data-id="+result[result.length-2].content.id+" data-key="+result[result.length-2].keys+">刪除</button>"+
      '<i class="fas fa-user-circle i-size" title="匿名"></i>：'+'<span class="list-p">'+result[result.length-2].content.content+'<span>'+'<br>'+'<small>'+result[result.length-2].content.time+'<small>'+'</div>'+'</li>'+
      '<li>'+"<div class='messageID' data-id="+result[result.length-1].content.id+">"+
      "<button class='btn btn-outline-danger float-end delete' data-id="+result[result.length-1].content.id+" data-key="+result[result.length-1].keys+">刪除</button>"+
      '<i class="fas fa-user-circle i-size" title="匿名"></i>：'+'<span class="list-p">'+result[result.length-1].content.content+'<span>'+'<br>'+'<small>'+result[result.length-1].content.time+'<small>'+'</div>'+'</li>');
    }
    var btn= document.getElementById('show').getElementsByTagName('button');
    for (var k = 0; k < btn.length; k++){
      if(btn[k].dataset.id !=localStorage.getItem('userName')){
        btn[k].style.display = "none"
      }
    }
    var btn= document.getElementById('showAll').getElementsByTagName('button');
    for (var k = 0; k < btn.length; k++){
      if(btn[k].dataset.id !=localStorage.getItem('userName')){
        btn[k].style.display = "none"
      }
    }
  });
  
})
$(Message).delegate(`.delete`,`click`,function(e){
  var database = firebase.database().ref(updateID);
  database.child(e.target.dataset.key).remove()
  alert('刪除成功')
  var str ='';
  var num = String;
  var Data =[];
  database.on('value', function(snapshot) {
    $show.html('');
    $showAll.html('');
    MessageContent.innerHTML = '';
    snapshot.forEach(function(childSnapshot) {
      var key = childSnapshot.key;
      var childData = childSnapshot.val();
      Data.push({keys:key,content:childData});
    })
    const set = new Set();
    const result = Data.filter(item => !set.has(item.keys) ? set.add(item.keys) : false);
    num=result.length;
    document.getElementById('num').innerHTML=num;
    if(snapshot.val()==null){
      document.querySelector('.hide-content').style.display="none";
    }else if(snapshot.val()!=null || result.length <= '5'){
      document.querySelector('.show2').style.display="none";
      for(var k=0;k<result.length;k++){
        $show.append('<li>'+"<div class='messageID' data-id="+result[k].content.id+">"+
        "<button class='btn btn-outline-danger float-end delete' data-id="+result[k].content.id+" data-key="+result[k].keys+">刪除</button>"+
        '<i class="fas fa-user-circle i-size" title="匿名"></i>：'+'<span class="list-p">'+result[k].content.content+'<span>'+'<br>'+'<small>'+result[k].content.time+'<small>'+'</div>'+'</li>');
      }
      document.querySelector('.hide-content').style.display="none";
    }
    console.log(result.length);
    if (result.length >='6'){
      $show.html('');
      document.querySelector('.hide-content').style.display='inline-block';
      for(var k=0;k<result.length;k++){
        $showAll.append('<li>'+"<div class='messageID' data-id="+result[k].content.id+">"+
        "<button class='btn btn-outline-danger float-end delete' data-id="+result[k].content.id+" data-key="+result[k].keys+">刪除</button>"+
        '<i class="fas fa-user-circle i-size" title="匿名"></i>：'+'<span class="list-p">'+result[k].content.content+'<span>'+'<br>'+'<small>'+result[k].content.time+'<small>'+'</div>'+'</li>');
      }
      $show.append('<li>'+"<div class='messageID' data-id="+result[result.length-5].content.id+">"+
      "<button class='btn btn-outline-danger float-end delete' data-id="+result[result.length-5].content.id+" data-key="+result[result.length-5].keys+">刪除</button>"+
      '<i class="fas fa-user-circle i-size" title="匿名"></i>：'+'<span class="list-p">'+result[result.length-5].content.content+'<span>'+'<br>'+'<small>'+result[result.length-5].content.time+'<small>'+'</div>'+'</li>'+
      '<li>'+"<div class='messageID' data-id="+result[result.length-4].content.id+">"+
      "<button class='btn btn-outline-danger float-end delete' data-id="+result[result.length-4].content.id+" data-key="+result[result.length-4].keys+">刪除</button>"+
      '<i class="fas fa-user-circle i-size" title="匿名"></i>：'+'<span class="list-p">'+result[result.length-4].content.content+'<span>'+'<br>'+'<small>'+result[result.length-4].content.time+'<small>'+'</div>'+'</li>'+
      '<li>'+"<div class='messageID' data-id="+result[result.length-3].content.id+">"+
      "<button class='btn btn-outline-danger float-end delete' data-id="+result[result.length-3].content.id+" data-key="+result[result.length-3].keys+">刪除</button>"+
      '<i class="fas fa-user-circle i-size" title="匿名"></i>：'+'<span class="list-p">'+result[result.length-3].content.content+'<span>'+'<br>'+'<small>'+result[result.length-3].content.time+'<small>'+'</div>'+'</li>'+
      '<li>'+"<div class='messageID' data-id="+result[result.length-2].content.id+">"+
      "<button class='btn btn-outline-danger float-end delete' data-id="+result[result.length-2].content.id+" data-key="+result[result.length-2].keys+">刪除</button>"+
      '<i class="fas fa-user-circle i-size" title="匿名"></i>：'+'<span class="list-p">'+result[result.length-2].content.content+'<span>'+'<br>'+'<small>'+result[result.length-2].content.time+'<small>'+'</div>'+'</li>'+
      '<li>'+"<div class='messageID' data-id="+result[result.length-1].content.id+">"+
      "<button class='btn btn-outline-danger float-end delete' data-id="+result[result.length-1].content.id+" data-key="+result[result.length-1].keys+">刪除</button>"+
      '<i class="fas fa-user-circle i-size" title="匿名"></i>：'+'<span class="list-p">'+result[result.length-1].content.content+'<span>'+'<br>'+'<small>'+result[result.length-1].content.time+'<small>'+'</div>'+'</li>');
    }
    var btn= document.getElementById('show').getElementsByTagName('button');
    for (var k = 0; k < btn.length; k++){
      if(btn[k].dataset.id !=localStorage.getItem('userName')){
        btn[k].style.display = "none"
      }
    }
    var btn= document.getElementById('showAll').getElementsByTagName('button');
    for (var k = 0; k < btn.length; k++){
      if(btn[k].dataset.id !=localStorage.getItem('userName')){
        btn[k].style.display = "none"
      }
    }
  });
})

$(document).ready(function(){
  $(".hide-content").click(function(event){
    $("#showAll").toggle();
    $('#show').toggle();
    $("#open-p").toggle();
    $("#close-p").toggle();
    event.preventDefault();
  });
}); 

$(update).delegate(`.check`,`click`,function(){
var db = firebase.firestore();
var ref = db.collection("個人資料").doc(updateID);
var database = firebase.database().ref(updateID);
var newNumber = document.querySelector(".score2").innerHTML;
var user = localStorage.getItem('userName');
var date = new Date();
    var y = date.getFullYear();
    var M = date.getMonth()+1;
    var d = date.getDate();
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    if(h<10){
      h = '0'+h;
    }
    if(m<10){
      m = '0' + m;
    }
    if(s<10){
      s = '0' + s;
    }
    var now =y+'/'+M+'/'+d+' '+h+':'+m+':'+s;
    var postData = {
      content:$('#content').val(),
      time:now,
      id:user
    };
    if($('#content').val()=="" || newNumber==''){
      alert("請給予評語、評分")
      return false
    }else if(newNumber==''){
      alert("未給予評分")
      return false
    }else if($('#content').val()==""){
      alert("請給予評語")
      return false
    }else
    database.push(postData);
    // $content.val('');
    ref.update({
      score:newNumber
    }).then(() => {
      alert('成功送出');
      $('#staticBackdrop').modal('hide')
    });
})





// function UpData(){
//   var db = firebase.firestore();
//   var ref = db.collection('個人資料').doc('賀照莒');
//   ref.set({
//     name:'賀照莒',
//     No:'(110)中華徵書徵信士第031號',
//     address:"台北市松山區南京東路三段259號8樓",
//     map:"https://goo.gl/maps/nY435vzCUeSPpLGu8",
//     phone:"0800-828-333",
//     gender:"男",
//     year:'52',
//     work:'國華徵信社',
//     YearsPractice:'',
//     photo:"https://firebasestorage.googleapis.com/v0/b/concent-4b5ff.appspot.com/o/31%E8%B3%80%E7%85%A7%E8%8E%92.jpg?alt=media&token=66830bb6-f040-4b42-8b76-e4ba7ecfcef9",
//     score:'1',
//     Charts:[
//       {label:"外遇蒐證",data:4},
//       {label:"抓姦專案",data:4},
//       {label:"行蹤調查",data:4},
//       {label:"尋人調查",data:4},
//       {label:"查前科案件",data:4},
//       {label:"查學歷案件",data:4},
//       {label:"查電話案件",data:4},
//       {label:"查地址案件",data:4},
//       {label:"查學歷案件",data:4},
//       {label:"查出入境案件",data:4},
//       {label:"其他個人資料調查",data:4},
//       {label:"債務催收",data:4},
//       {label:"呆帳處理",data:4},
//       {label:"債務協商",data:4},
//       {label:"傷害教訓",data:4},
//       {label:"遺產糾紛",data:4},
//       {label:"土地糾紛",data:4},
//       {label:"醫療糾紛",data:4},
//       {label:"車禍糾紛",data:4},
//       {label:"撫養費協商",data:4},
//       {label:"分手費協商",data:4},
//       {label:"監護權協商",data:4},
//       {label:"探視權協商",data:4},
//       {label:"跨海調查",data:4},
//       {label:"公司調查",data:4},
//       {label:"商業調查",data:4},
//       {label:"市場調查",data:4},
//       {label:"越區傾銷調查",data:4},
//       {label:"商業間諜調查",data:4},
//       {label:"競業條款調查",data:4},
//       {label:"盡職調查",data:4},
//       {label:"非訴訟協調",data:4},
//       {label:"器材架設",data:4},
//       {label:"感情挽回",data:4},
//       {label:"感情破壞",data:4},
//       {label:"設計離婚",data:4},
//       {label:"婚前調查",data:4},
//       {label:"文書鑑定",data:4},
//       {label:"子女調查",data:4},
//       {label:"脫離不幸婚姻",data:4},
//       {label:"仿冒、侵權案件",data:4},
//       {label:"婚姻諮商",data:4},
//       {label:"心理輔導",data:4},
//     ]
//   },{merge: true}).then(() => {
//     alert('資料成功更新');
//   });
// }


var personnelData =[
  {
    name:'劉邵智',
    No:'(110)中華徵書徵信士第001號',
    address:"",
    map:"",
    phone:"0800-635-555",
    gender:"男",
    year:'60',
    work:'一統徵信高雄徵信社',
    photo:"https://firebasestorage.googleapis.com/v0/b/concent-4b5ff.appspot.com/o/01%E5%8A%89%E9%82%B5%E6%99%BA.jpg?alt=media&token=70702e76-5bc8-4391-a655-6bebfcf66238",
    YearsPractice:'',
    score:'1',
    Charts:[
      {label:"外遇蒐證",data:4},
      {label:"抓姦專案",data:4},
      {label:"行蹤調查",data:4},
      {label:"尋人調查",data:4},
      {label:"查前科案件",data:4},
      {label:"查學歷案件",data:4},
      {label:"查電話案件",data:4},
      {label:"查地址案件",data:4},
      {label:"查學歷案件",data:4},
      {label:"查出入境案件",data:4},
      {label:"其他個人資料調查",data:4},
      {label:"債務催收",data:4},
      {label:"呆帳處理",data:4},
      {label:"債務協商",data:4},
      {label:"傷害教訓",data:4},
      {label:"遺產糾紛",data:4},
      {label:"土地糾紛",data:4},
      {label:"醫療糾紛",data:4},
      {label:"車禍糾紛",data:4},
      {label:"撫養費協商",data:4},
      {label:"分手費協商",data:4},
      {label:"監護權協商",data:4},
      {label:"探視權協商",data:4},
      {label:"跨海調查",data:4},
      {label:"公司調查",data:4},
      {label:"商業調查",data:4},
      {label:"市場調查",data:4},
      {label:"越區傾銷調查",data:4},
      {label:"商業間諜調查",data:4},
      {label:"競業條款調查",data:4},
      {label:"盡職調查",data:4},
      {label:"非訴訟協調",data:4},
      {label:"器材架設",data:4},
      {label:"感情挽回",data:4},
      {label:"感情破壞",data:4},
      {label:"設計離婚",data:4},
      {label:"婚前調查",data:4},
      {label:"文書鑑定",data:4},
      {label:"子女調查",data:4},
      {label:"脫離不幸婚姻",data:4},
      {label:"仿冒、侵權案件",data:4},
      {label:"婚姻諮商",data:4},
      {label:"心理輔導",data:4},
    ]
  },
  {
    name:'陳原平',
    No:'(110)中華徵書徵信士第002號',
    address:"台中市西屯區文心路三段13號5樓",
    map:"https://goo.gl/maps/yN6hz3r4zLhLUu426",
    phone:"0800-880-770",
    gender:"男",
    year:'59',
    work:'國華徵信台中徵信社',
    YearsPractice:'',
    photo:"https://firebasestorage.googleapis.com/v0/b/concent-4b5ff.appspot.com/o/02%E9%99%B3%E5%8E%9F%E5%B9%B3.jpg?alt=media&token=432f0409-7148-4a00-8f5f-bad1a3f833a8",
    score:'1',
    Charts:[
      {label:"外遇蒐證",data:4},
      {label:"抓姦專案",data:4},
      {label:"行蹤調查",data:4},
      {label:"尋人調查",data:4},
      {label:"查前科案件",data:4},
      {label:"查學歷案件",data:4},
      {label:"查電話案件",data:4},
      {label:"查地址案件",data:4},
      {label:"查學歷案件",data:4},
      {label:"查出入境案件",data:4},
      {label:"其他個人資料調查",data:4},
      {label:"債務催收",data:4},
      {label:"呆帳處理",data:4},
      {label:"債務協商",data:4},
      {label:"傷害教訓",data:4},
      {label:"遺產糾紛",data:4},
      {label:"土地糾紛",data:4},
      {label:"醫療糾紛",data:4},
      {label:"車禍糾紛",data:4},
      {label:"撫養費協商",data:4},
      {label:"分手費協商",data:4},
      {label:"監護權協商",data:4},
      {label:"探視權協商",data:4},
      {label:"跨海調查",data:4},
      {label:"公司調查",data:4},
      {label:"商業調查",data:4},
      {label:"市場調查",data:4},
      {label:"越區傾銷調查",data:4},
      {label:"商業間諜調查",data:4},
      {label:"競業條款調查",data:4},
      {label:"盡職調查",data:4},
      {label:"非訴訟協調",data:4},
      {label:"器材架設",data:4},
      {label:"感情挽回",data:4},
      {label:"感情破壞",data:4},
      {label:"設計離婚",data:4},
      {label:"婚前調查",data:4},
      {label:"文書鑑定",data:4},
      {label:"子女調查",data:4},
      {label:"脫離不幸婚姻",data:4},
      {label:"仿冒、侵權案件",data:4},
      {label:"婚姻諮商",data:4},
      {label:"心理輔導",data:4},
    ]
  },
  {
    name:'廖朝基',
    No:'(110)中華徵書徵信士第003號',
    address:"台北市中山區南京東路二段124號5樓",
    map:"https://g.page/uicco?share",
    phone:"0800-883-311",
    gender:"男",
    year:'55',
    work:'一統徵信社',
    YearsPractice:'',
    photo:"https://firebasestorage.googleapis.com/v0/b/concent-4b5ff.appspot.com/o/03%E5%BB%96%E6%9C%9D%E5%9F%BA.jpg?alt=media&token=b87ca5e4-7e49-4412-bf83-7ff45ed47049",
    score:'1',
    Charts:[
      {label:"外遇蒐證",data:4},
      {label:"抓姦專案",data:4},
      {label:"行蹤調查",data:4},
      {label:"尋人調查",data:4},
      {label:"查前科案件",data:4},
      {label:"查學歷案件",data:4},
      {label:"查電話案件",data:4},
      {label:"查地址案件",data:4},
      {label:"查學歷案件",data:4},
      {label:"查出入境案件",data:4},
      {label:"其他個人資料調查",data:4},
      {label:"債務催收",data:4},
      {label:"呆帳處理",data:4},
      {label:"債務協商",data:4},
      {label:"傷害教訓",data:4},
      {label:"遺產糾紛",data:4},
      {label:"土地糾紛",data:4},
      {label:"醫療糾紛",data:4},
      {label:"車禍糾紛",data:4},
      {label:"撫養費協商",data:4},
      {label:"分手費協商",data:4},
      {label:"監護權協商",data:4},
      {label:"探視權協商",data:4},
      {label:"跨海調查",data:4},
      {label:"公司調查",data:4},
      {label:"商業調查",data:4},
      {label:"市場調查",data:4},
      {label:"越區傾銷調查",data:4},
      {label:"商業間諜調查",data:4},
      {label:"競業條款調查",data:4},
      {label:"盡職調查",data:4},
      {label:"非訴訟協調",data:4},
      {label:"器材架設",data:4},
      {label:"感情挽回",data:4},
      {label:"感情破壞",data:4},
      {label:"設計離婚",data:4},
      {label:"婚前調查",data:4},
      {label:"文書鑑定",data:4},
      {label:"子女調查",data:4},
      {label:"脫離不幸婚姻",data:4},
      {label:"仿冒、侵權案件",data:4},
      {label:"婚姻諮商",data:4},
      {label:"心理輔導",data:4},
    ]
  },
  {
    name:'許瑞杰',
    No:'(110)中華徵書徵信士第004號',
    address:"台北市中山區南京東路二段124號5樓",
    map:"https://g.page/uicco?share",
    phone:"0800-883-311",
    gender:"男",
    year:'63',
    work:'一統徵信社',
    YearsPractice:'',
    photo:"https://firebasestorage.googleapis.com/v0/b/concent-4b5ff.appspot.com/o/04%E8%A8%B1%E7%91%9E%E6%9D%B0.jpg?alt=media&token=6de3487f-cde5-439e-8b48-bd62436939e5",
    score:'1',
    Charts:[
      {label:"外遇蒐證",data:4},
      {label:"抓姦專案",data:4},
      {label:"行蹤調查",data:4},
      {label:"尋人調查",data:4},
      {label:"查前科案件",data:4},
      {label:"查學歷案件",data:4},
      {label:"查電話案件",data:4},
      {label:"查地址案件",data:4},
      {label:"查學歷案件",data:4},
      {label:"查出入境案件",data:4},
      {label:"其他個人資料調查",data:4},
      {label:"債務催收",data:4},
      {label:"呆帳處理",data:4},
      {label:"債務協商",data:4},
      {label:"傷害教訓",data:4},
      {label:"遺產糾紛",data:4},
      {label:"土地糾紛",data:4},
      {label:"醫療糾紛",data:4},
      {label:"車禍糾紛",data:4},
      {label:"撫養費協商",data:4},
      {label:"分手費協商",data:4},
      {label:"監護權協商",data:4},
      {label:"探視權協商",data:4},
      {label:"跨海調查",data:4},
      {label:"公司調查",data:4},
      {label:"商業調查",data:4},
      {label:"市場調查",data:4},
      {label:"越區傾銷調查",data:4},
      {label:"商業間諜調查",data:4},
      {label:"競業條款調查",data:4},
      {label:"盡職調查",data:4},
      {label:"非訴訟協調",data:4},
      {label:"器材架設",data:4},
      {label:"感情挽回",data:4},
      {label:"感情破壞",data:4},
      {label:"設計離婚",data:4},
      {label:"婚前調查",data:4},
      {label:"文書鑑定",data:4},
      {label:"子女調查",data:4},
      {label:"脫離不幸婚姻",data:4},
      {label:"仿冒、侵權案件",data:4},
      {label:"婚姻諮商",data:4},
      {label:"心理輔導",data:4},
    ]
  },
  {
    name:'林采莉',
    No:'(110)中華徵書徵信士第005號',
    address:"台北市中山區南京東路二段124號5樓",
    map:"https://g.page/uicco?share",
    phone:"0800-883-311",
    gender:"女",
    year:'55',
    work:'一統徵信社',
    YearsPractice:'',
    photo:"https://firebasestorage.googleapis.com/v0/b/concent-4b5ff.appspot.com/o/05%E6%9E%97%E9%87%87%E8%8E%89.jpg?alt=media&token=21e60a5d-f2b0-45a5-9948-3ad33329c528",
    score:'1',
    Charts:[
      {label:"外遇蒐證",data:4},
      {label:"抓姦專案",data:4},
      {label:"行蹤調查",data:4},
      {label:"尋人調查",data:4},
      {label:"查前科案件",data:4},
      {label:"查學歷案件",data:4},
      {label:"查電話案件",data:4},
      {label:"查地址案件",data:4},
      {label:"查學歷案件",data:4},
      {label:"查出入境案件",data:4},
      {label:"其他個人資料調查",data:4},
      {label:"債務催收",data:4},
      {label:"呆帳處理",data:4},
      {label:"債務協商",data:4},
      {label:"傷害教訓",data:4},
      {label:"遺產糾紛",data:4},
      {label:"土地糾紛",data:4},
      {label:"醫療糾紛",data:4},
      {label:"車禍糾紛",data:4},
      {label:"撫養費協商",data:4},
      {label:"分手費協商",data:4},
      {label:"監護權協商",data:4},
      {label:"探視權協商",data:4},
      {label:"跨海調查",data:4},
      {label:"公司調查",data:4},
      {label:"商業調查",data:4},
      {label:"市場調查",data:4},
      {label:"越區傾銷調查",data:4},
      {label:"商業間諜調查",data:4},
      {label:"競業條款調查",data:4},
      {label:"盡職調查",data:4},
      {label:"非訴訟協調",data:4},
      {label:"器材架設",data:4},
      {label:"感情挽回",data:4},
      {label:"感情破壞",data:4},
      {label:"設計離婚",data:4},
      {label:"婚前調查",data:4},
      {label:"文書鑑定",data:4},
      {label:"子女調查",data:4},
      {label:"脫離不幸婚姻",data:4},
      {label:"仿冒、侵權案件",data:4},
      {label:"婚姻諮商",data:4},
      {label:"心理輔導",data:4},
    ]
  },
  {
    name:'黃詮稑',
    No:'(110)中華徵書徵信士第006號',
    address:"",
    map:"",
    phone:"0800-459-999",
    gender:"男",
    year:'57',
    work:'一統徵信台南分公司',
    YearsPractice:'',
    photo:"https://firebasestorage.googleapis.com/v0/b/concent-4b5ff.appspot.com/o/06%E9%BB%83%E8%A9%AE%E7%A8%91.jpg?alt=media&token=a686db87-b55d-457b-9af8-25474ebe3514",
    score:'1',
    Charts:[
      {label:"外遇蒐證",data:4},
      {label:"抓姦專案",data:4},
      {label:"行蹤調查",data:4},
      {label:"尋人調查",data:4},
      {label:"查前科案件",data:4},
      {label:"查學歷案件",data:4},
      {label:"查電話案件",data:4},
      {label:"查地址案件",data:4},
      {label:"查學歷案件",data:4},
      {label:"查出入境案件",data:4},
      {label:"其他個人資料調查",data:4},
      {label:"債務催收",data:4},
      {label:"呆帳處理",data:4},
      {label:"債務協商",data:4},
      {label:"傷害教訓",data:4},
      {label:"遺產糾紛",data:4},
      {label:"土地糾紛",data:4},
      {label:"醫療糾紛",data:4},
      {label:"車禍糾紛",data:4},
      {label:"撫養費協商",data:4},
      {label:"分手費協商",data:4},
      {label:"監護權協商",data:4},
      {label:"探視權協商",data:4},
      {label:"跨海調查",data:4},
      {label:"公司調查",data:4},
      {label:"商業調查",data:4},
      {label:"市場調查",data:4},
      {label:"越區傾銷調查",data:4},
      {label:"商業間諜調查",data:4},
      {label:"競業條款調查",data:4},
      {label:"盡職調查",data:4},
      {label:"非訴訟協調",data:4},
      {label:"器材架設",data:4},
      {label:"感情挽回",data:4},
      {label:"感情破壞",data:4},
      {label:"設計離婚",data:4},
      {label:"婚前調查",data:4},
      {label:"文書鑑定",data:4},
      {label:"子女調查",data:4},
      {label:"脫離不幸婚姻",data:4},
      {label:"仿冒、侵權案件",data:4},
      {label:"婚姻諮商",data:4},
      {label:"心理輔導",data:4},
    ]
  },
  {
    name:'趙柏凱',
    No:'(110)中華徵書徵信士第007號',
    address:"台北市中山區南京東路二段124號5樓",
    map:"https://g.page/uicco?share",
    phone:"0800-883-311",
    gender:"男",
    year:'80',
    work:'一統徵信社',
    YearsPractice:'',
    photo:"https://firebasestorage.googleapis.com/v0/b/concent-4b5ff.appspot.com/o/07%E8%B6%99%E6%9F%8F%E5%87%B1.jpg?alt=media&token=f2f9cd9a-1325-4974-ba1b-aec4fbab3e26",
    score:'1',
    Charts:[
      {label:"外遇蒐證",data:4},
      {label:"抓姦專案",data:4},
      {label:"行蹤調查",data:4},
      {label:"尋人調查",data:4},
      {label:"查前科案件",data:4},
      {label:"查學歷案件",data:4},
      {label:"查電話案件",data:4},
      {label:"查地址案件",data:4},
      {label:"查學歷案件",data:4},
      {label:"查出入境案件",data:4},
      {label:"其他個人資料調查",data:4},
      {label:"債務催收",data:4},
      {label:"呆帳處理",data:4},
      {label:"債務協商",data:4},
      {label:"傷害教訓",data:4},
      {label:"遺產糾紛",data:4},
      {label:"土地糾紛",data:4},
      {label:"醫療糾紛",data:4},
      {label:"車禍糾紛",data:4},
      {label:"撫養費協商",data:4},
      {label:"分手費協商",data:4},
      {label:"監護權協商",data:4},
      {label:"探視權協商",data:4},
      {label:"跨海調查",data:4},
      {label:"公司調查",data:4},
      {label:"商業調查",data:4},
      {label:"市場調查",data:4},
      {label:"越區傾銷調查",data:4},
      {label:"商業間諜調查",data:4},
      {label:"競業條款調查",data:4},
      {label:"盡職調查",data:4},
      {label:"非訴訟協調",data:4},
      {label:"器材架設",data:4},
      {label:"感情挽回",data:4},
      {label:"感情破壞",data:4},
      {label:"設計離婚",data:4},
      {label:"婚前調查",data:4},
      {label:"文書鑑定",data:4},
      {label:"子女調查",data:4},
      {label:"脫離不幸婚姻",data:4},
      {label:"仿冒、侵權案件",data:4},
      {label:"婚姻諮商",data:4},
      {label:"心理輔導",data:4},
    ]
  },
  {
    name:'邱晶華',
    No:'(110)中華徵書徵信士第008號',
    address:"台北市中山區南京東路二段124號5樓",
    map:"https://g.page/uicco?share",
    phone:"0800-883-311",
    gender:"女",
    year:'60',
    work:'一統徵信社',
    YearsPractice:'',
    photo:"https://firebasestorage.googleapis.com/v0/b/concent-4b5ff.appspot.com/o/08%E9%82%B1%E6%99%B6%E8%8F%AF.jpg?alt=media&token=6d0faa86-90a2-4479-aaea-452dbd3d5b27",
    score:'1',
    Charts:[
      {label:"外遇蒐證",data:4},
      {label:"抓姦專案",data:4},
      {label:"行蹤調查",data:4},
      {label:"尋人調查",data:4},
      {label:"查前科案件",data:4},
      {label:"查學歷案件",data:4},
      {label:"查電話案件",data:4},
      {label:"查地址案件",data:4},
      {label:"查學歷案件",data:4},
      {label:"查出入境案件",data:4},
      {label:"其他個人資料調查",data:4},
      {label:"債務催收",data:4},
      {label:"呆帳處理",data:4},
      {label:"債務協商",data:4},
      {label:"傷害教訓",data:4},
      {label:"遺產糾紛",data:4},
      {label:"土地糾紛",data:4},
      {label:"醫療糾紛",data:4},
      {label:"車禍糾紛",data:4},
      {label:"撫養費協商",data:4},
      {label:"分手費協商",data:4},
      {label:"監護權協商",data:4},
      {label:"探視權協商",data:4},
      {label:"跨海調查",data:4},
      {label:"公司調查",data:4},
      {label:"商業調查",data:4},
      {label:"市場調查",data:4},
      {label:"越區傾銷調查",data:4},
      {label:"商業間諜調查",data:4},
      {label:"競業條款調查",data:4},
      {label:"盡職調查",data:4},
      {label:"非訴訟協調",data:4},
      {label:"器材架設",data:4},
      {label:"感情挽回",data:4},
      {label:"感情破壞",data:4},
      {label:"設計離婚",data:4},
      {label:"婚前調查",data:4},
      {label:"文書鑑定",data:4},
      {label:"子女調查",data:4},
      {label:"脫離不幸婚姻",data:4},
      {label:"仿冒、侵權案件",data:4},
      {label:"婚姻諮商",data:4},
      {label:"心理輔導",data:4},
    ]
  },
  {
    name:'黃鈺期',
    No:'(110)中華徵書徵信士第009號',
    address:"台中市西屯區文心路三段13號5樓",
    map:"https://goo.gl/maps/yN6hz3r4zLhLUu426",
    phone:"0800-880-770",
    gender:"女",
    year:'74',
    work:'國華徵信台中徵信社',
    YearsPractice:'',
    photo:"https://firebasestorage.googleapis.com/v0/b/concent-4b5ff.appspot.com/o/09%E9%BB%83%E9%88%BA%E6%9C%9F.jpg?alt=media&token=81834180-16fc-4ad5-a170-14d4f9f07fff",
    score:'1',
    Charts:[
      {label:"外遇蒐證",data:4},
      {label:"抓姦專案",data:4},
      {label:"行蹤調查",data:4},
      {label:"尋人調查",data:4},
      {label:"查前科案件",data:4},
      {label:"查學歷案件",data:4},
      {label:"查電話案件",data:4},
      {label:"查地址案件",data:4},
      {label:"查學歷案件",data:4},
      {label:"查出入境案件",data:4},
      {label:"其他個人資料調查",data:4},
      {label:"債務催收",data:4},
      {label:"呆帳處理",data:4},
      {label:"債務協商",data:4},
      {label:"傷害教訓",data:4},
      {label:"遺產糾紛",data:4},
      {label:"土地糾紛",data:4},
      {label:"醫療糾紛",data:4},
      {label:"車禍糾紛",data:4},
      {label:"撫養費協商",data:4},
      {label:"分手費協商",data:4},
      {label:"監護權協商",data:4},
      {label:"探視權協商",data:4},
      {label:"跨海調查",data:4},
      {label:"公司調查",data:4},
      {label:"商業調查",data:4},
      {label:"市場調查",data:4},
      {label:"越區傾銷調查",data:4},
      {label:"商業間諜調查",data:4},
      {label:"競業條款調查",data:4},
      {label:"盡職調查",data:4},
      {label:"非訴訟協調",data:4},
      {label:"器材架設",data:4},
      {label:"感情挽回",data:4},
      {label:"感情破壞",data:4},
      {label:"設計離婚",data:4},
      {label:"婚前調查",data:4},
      {label:"文書鑑定",data:4},
      {label:"子女調查",data:4},
      {label:"脫離不幸婚姻",data:4},
      {label:"仿冒、侵權案件",data:4},
      {label:"婚姻諮商",data:4},
      {label:"心理輔導",data:4},
    ]
  },
  {
    name:'王智群',
    No:'(110)中華徵書徵信士第010號',
    address:"台中市西屯區文心路三段13號5樓",
    map:"https://goo.gl/maps/yN6hz3r4zLhLUu426",
    phone:"0800-880-770",
    gender:"男",
    year:'70',
    work:'國華徵信台中徵信社',
    YearsPractice:'',
    photo:"https://firebasestorage.googleapis.com/v0/b/concent-4b5ff.appspot.com/o/10%E7%8E%8B%E6%99%BA%E7%BE%A4.jpg?alt=media&token=014ac567-091c-4808-b57f-84c0673bbb86",
    score:'1',
    Charts:[
      {label:"外遇蒐證",data:4},
      {label:"抓姦專案",data:4},
      {label:"行蹤調查",data:4},
      {label:"尋人調查",data:4},
      {label:"查前科案件",data:4},
      {label:"查學歷案件",data:4},
      {label:"查電話案件",data:4},
      {label:"查地址案件",data:4},
      {label:"查學歷案件",data:4},
      {label:"查出入境案件",data:4},
      {label:"其他個人資料調查",data:4},
      {label:"債務催收",data:4},
      {label:"呆帳處理",data:4},
      {label:"債務協商",data:4},
      {label:"傷害教訓",data:4},
      {label:"遺產糾紛",data:4},
      {label:"土地糾紛",data:4},
      {label:"醫療糾紛",data:4},
      {label:"車禍糾紛",data:4},
      {label:"撫養費協商",data:4},
      {label:"分手費協商",data:4},
      {label:"監護權協商",data:4},
      {label:"探視權協商",data:4},
      {label:"跨海調查",data:4},
      {label:"公司調查",data:4},
      {label:"商業調查",data:4},
      {label:"市場調查",data:4},
      {label:"越區傾銷調查",data:4},
      {label:"商業間諜調查",data:4},
      {label:"競業條款調查",data:4},
      {label:"盡職調查",data:4},
      {label:"非訴訟協調",data:4},
      {label:"器材架設",data:4},
      {label:"感情挽回",data:4},
      {label:"感情破壞",data:4},
      {label:"設計離婚",data:4},
      {label:"婚前調查",data:4},
      {label:"文書鑑定",data:4},
      {label:"子女調查",data:4},
      {label:"脫離不幸婚姻",data:4},
      {label:"仿冒、侵權案件",data:4},
      {label:"婚姻諮商",data:4},
      {label:"心理輔導",data:4},
    ]
  },
  {
    name:'李宜庭',
    No:'(110)中華徵書徵信士第011號',
    address:"台中市西屯區文心路三段13號5樓",
    map:"https://goo.gl/maps/yN6hz3r4zLhLUu426",
    phone:"0800-880-770",
    gender:"女",
    year:'74',
    work:'國華徵信台中徵信社',
    YearsPractice:'',
    photo:"https://firebasestorage.googleapis.com/v0/b/concent-4b5ff.appspot.com/o/11%E6%9D%8E%E5%AE%9C%E5%BA%AD.jpg?alt=media&token=6768d9b6-70ed-46ec-a9c5-113fd32ea551",
    score:'1',
    Charts:[
      {label:"外遇蒐證",data:4},
      {label:"抓姦專案",data:4},
      {label:"行蹤調查",data:4},
      {label:"尋人調查",data:4},
      {label:"查前科案件",data:4},
      {label:"查學歷案件",data:4},
      {label:"查電話案件",data:4},
      {label:"查地址案件",data:4},
      {label:"查學歷案件",data:4},
      {label:"查出入境案件",data:4},
      {label:"其他個人資料調查",data:4},
      {label:"債務催收",data:4},
      {label:"呆帳處理",data:4},
      {label:"債務協商",data:4},
      {label:"傷害教訓",data:4},
      {label:"遺產糾紛",data:4},
      {label:"土地糾紛",data:4},
      {label:"醫療糾紛",data:4},
      {label:"車禍糾紛",data:4},
      {label:"撫養費協商",data:4},
      {label:"分手費協商",data:4},
      {label:"監護權協商",data:4},
      {label:"探視權協商",data:4},
      {label:"跨海調查",data:4},
      {label:"公司調查",data:4},
      {label:"商業調查",data:4},
      {label:"市場調查",data:4},
      {label:"越區傾銷調查",data:4},
      {label:"商業間諜調查",data:4},
      {label:"競業條款調查",data:4},
      {label:"盡職調查",data:4},
      {label:"非訴訟協調",data:4},
      {label:"器材架設",data:4},
      {label:"感情挽回",data:4},
      {label:"感情破壞",data:4},
      {label:"設計離婚",data:4},
      {label:"婚前調查",data:4},
      {label:"文書鑑定",data:4},
      {label:"子女調查",data:4},
      {label:"脫離不幸婚姻",data:4},
      {label:"仿冒、侵權案件",data:4},
      {label:"婚姻諮商",data:4},
      {label:"心理輔導",data:4},
    ]
  },
  {
    name:'邱靖惠',
    No:'(110)中華徵書徵信士第012號',
    address:"",
    map:"",
    phone:"",
    gender:"女",
    year:'54',
    work:'處長友',
    YearsPractice:'',
    photo:"https://firebasestorage.googleapis.com/v0/b/concent-4b5ff.appspot.com/o/12%E9%82%B1%E9%9D%96%E6%83%A0.jpg?alt=media&token=7fc1b7cf-bf6e-4969-b090-627397c339bf",
    score:'1',
    Charts:[
      {label:"外遇蒐證",data:4},
      {label:"抓姦專案",data:4},
      {label:"行蹤調查",data:4},
      {label:"尋人調查",data:4},
      {label:"查前科案件",data:4},
      {label:"查學歷案件",data:4},
      {label:"查電話案件",data:4},
      {label:"查地址案件",data:4},
      {label:"查學歷案件",data:4},
      {label:"查出入境案件",data:4},
      {label:"其他個人資料調查",data:4},
      {label:"債務催收",data:4},
      {label:"呆帳處理",data:4},
      {label:"債務協商",data:4},
      {label:"傷害教訓",data:4},
      {label:"遺產糾紛",data:4},
      {label:"土地糾紛",data:4},
      {label:"醫療糾紛",data:4},
      {label:"車禍糾紛",data:4},
      {label:"撫養費協商",data:4},
      {label:"分手費協商",data:4},
      {label:"監護權協商",data:4},
      {label:"探視權協商",data:4},
      {label:"跨海調查",data:4},
      {label:"公司調查",data:4},
      {label:"商業調查",data:4},
      {label:"市場調查",data:4},
      {label:"越區傾銷調查",data:4},
      {label:"商業間諜調查",data:4},
      {label:"競業條款調查",data:4},
      {label:"盡職調查",data:4},
      {label:"非訴訟協調",data:4},
      {label:"器材架設",data:4},
      {label:"感情挽回",data:4},
      {label:"感情破壞",data:4},
      {label:"設計離婚",data:4},
      {label:"婚前調查",data:4},
      {label:"文書鑑定",data:4},
      {label:"子女調查",data:4},
      {label:"脫離不幸婚姻",data:4},
      {label:"仿冒、侵權案件",data:4},
      {label:"婚姻諮商",data:4},
      {label:"心理輔導",data:4},
    ]
  },
  {
    name:'鄭秉豐',
    No:'(110)中華徵書徵信士第013號',
    address:"",
    map:"",
    phone:"0800-635-555",
    gender:"男",
    year:'64',
    work:'一統徵信高雄徵信社',
    YearsPractice:'',
    photo:"https://firebasestorage.googleapis.com/v0/b/concent-4b5ff.appspot.com/o/13%E9%84%AD%E7%A7%89%E8%B1%90.jpg?alt=media&token=93f7d8ca-85f2-4310-9894-b36ff553f5f0",
    score:'1',
    Charts:[
      {label:"外遇蒐證",data:4},
      {label:"抓姦專案",data:4},
      {label:"行蹤調查",data:4},
      {label:"尋人調查",data:4},
      {label:"查前科案件",data:4},
      {label:"查學歷案件",data:4},
      {label:"查電話案件",data:4},
      {label:"查地址案件",data:4},
      {label:"查學歷案件",data:4},
      {label:"查出入境案件",data:4},
      {label:"其他個人資料調查",data:4},
      {label:"債務催收",data:4},
      {label:"呆帳處理",data:4},
      {label:"債務協商",data:4},
      {label:"傷害教訓",data:4},
      {label:"遺產糾紛",data:4},
      {label:"土地糾紛",data:4},
      {label:"醫療糾紛",data:4},
      {label:"車禍糾紛",data:4},
      {label:"撫養費協商",data:4},
      {label:"分手費協商",data:4},
      {label:"監護權協商",data:4},
      {label:"探視權協商",data:4},
      {label:"跨海調查",data:4},
      {label:"公司調查",data:4},
      {label:"商業調查",data:4},
      {label:"市場調查",data:4},
      {label:"越區傾銷調查",data:4},
      {label:"商業間諜調查",data:4},
      {label:"競業條款調查",data:4},
      {label:"盡職調查",data:4},
      {label:"非訴訟協調",data:4},
      {label:"器材架設",data:4},
      {label:"感情挽回",data:4},
      {label:"感情破壞",data:4},
      {label:"設計離婚",data:4},
      {label:"婚前調查",data:4},
      {label:"文書鑑定",data:4},
      {label:"子女調查",data:4},
      {label:"脫離不幸婚姻",data:4},
      {label:"仿冒、侵權案件",data:4},
      {label:"婚姻諮商",data:4},
      {label:"心理輔導",data:4},
    ]
  },
  {
    name:'白羢升',
    No:'(110)中華徵書徵信士第014號',
    address:"",
    map:"",
    phone:"0800-635-555",
    gender:"男",
    year:'79',
    work:'一統徵信高雄徵信社',
    YearsPractice:'',
    photo:"https://firebasestorage.googleapis.com/v0/b/concent-4b5ff.appspot.com/o/14%E7%99%BD%E7%BE%A2%E5%8D%87.jpg?alt=media&token=93a71d40-0c13-47d3-951f-3ca8034c3a34",
    score:'1',
    Charts:[
      {label:"外遇蒐證",data:4},
      {label:"抓姦專案",data:4},
      {label:"行蹤調查",data:4},
      {label:"尋人調查",data:4},
      {label:"查前科案件",data:4},
      {label:"查學歷案件",data:4},
      {label:"查電話案件",data:4},
      {label:"查地址案件",data:4},
      {label:"查學歷案件",data:4},
      {label:"查出入境案件",data:4},
      {label:"其他個人資料調查",data:4},
      {label:"債務催收",data:4},
      {label:"呆帳處理",data:4},
      {label:"債務協商",data:4},
      {label:"傷害教訓",data:4},
      {label:"遺產糾紛",data:4},
      {label:"土地糾紛",data:4},
      {label:"醫療糾紛",data:4},
      {label:"車禍糾紛",data:4},
      {label:"撫養費協商",data:4},
      {label:"分手費協商",data:4},
      {label:"監護權協商",data:4},
      {label:"探視權協商",data:4},
      {label:"跨海調查",data:4},
      {label:"公司調查",data:4},
      {label:"商業調查",data:4},
      {label:"市場調查",data:4},
      {label:"越區傾銷調查",data:4},
      {label:"商業間諜調查",data:4},
      {label:"競業條款調查",data:4},
      {label:"盡職調查",data:4},
      {label:"非訴訟協調",data:4},
      {label:"器材架設",data:4},
      {label:"感情挽回",data:4},
      {label:"感情破壞",data:4},
      {label:"設計離婚",data:4},
      {label:"婚前調查",data:4},
      {label:"文書鑑定",data:4},
      {label:"子女調查",data:4},
      {label:"脫離不幸婚姻",data:4},
      {label:"仿冒、侵權案件",data:4},
      {label:"婚姻諮商",data:4},
      {label:"心理輔導",data:4},
    ]
  },
  {
    name:'陳巧旬',
    No:'(110)中華徵書徵信士第015號',
    address:"台北市中山區南京東路二段124號5樓",
    map:"https://g.page/uicco?share",
    phone:"0800-883-311",
    gender:"女",
    year:'72',
    work:'一統徵信社',
    YearsPractice:'',
    photo:"https://firebasestorage.googleapis.com/v0/b/concent-4b5ff.appspot.com/o/15%E9%99%B3%E5%B7%A7%E6%97%AC.jpg?alt=media&token=d0f893a4-00e6-4295-ac7a-f1527e18c533",
    score:'1',
    Charts:[
      {label:"外遇蒐證",data:4},
      {label:"抓姦專案",data:4},
      {label:"行蹤調查",data:4},
      {label:"尋人調查",data:4},
      {label:"查前科案件",data:4},
      {label:"查學歷案件",data:4},
      {label:"查電話案件",data:4},
      {label:"查地址案件",data:4},
      {label:"查學歷案件",data:4},
      {label:"查出入境案件",data:4},
      {label:"其他個人資料調查",data:4},
      {label:"債務催收",data:4},
      {label:"呆帳處理",data:4},
      {label:"債務協商",data:4},
      {label:"傷害教訓",data:4},
      {label:"遺產糾紛",data:4},
      {label:"土地糾紛",data:4},
      {label:"醫療糾紛",data:4},
      {label:"車禍糾紛",data:4},
      {label:"撫養費協商",data:4},
      {label:"分手費協商",data:4},
      {label:"監護權協商",data:4},
      {label:"探視權協商",data:4},
      {label:"跨海調查",data:4},
      {label:"公司調查",data:4},
      {label:"商業調查",data:4},
      {label:"市場調查",data:4},
      {label:"越區傾銷調查",data:4},
      {label:"商業間諜調查",data:4},
      {label:"競業條款調查",data:4},
      {label:"盡職調查",data:4},
      {label:"非訴訟協調",data:4},
      {label:"器材架設",data:4},
      {label:"感情挽回",data:4},
      {label:"感情破壞",data:4},
      {label:"設計離婚",data:4},
      {label:"婚前調查",data:4},
      {label:"文書鑑定",data:4},
      {label:"子女調查",data:4},
      {label:"脫離不幸婚姻",data:4},
      {label:"仿冒、侵權案件",data:4},
      {label:"婚姻諮商",data:4},
      {label:"心理輔導",data:4},
    ]
  },
  {
    name:'鍾弘泰',
    No:'(110)中華徵書徵信士第016號',
    address:"台中市西屯區文心路三段13號5樓",
    map:"https://goo.gl/maps/yN6hz3r4zLhLUu426",
    phone:"0800-880-770",
    gender:"男",
    year:'76',
    work:'國華徵信台中徵信社',
    YearsPractice:'',
    photo:"https://firebasestorage.googleapis.com/v0/b/concent-4b5ff.appspot.com/o/16%E9%8D%BE%E5%BC%98%E6%B3%B0.jpg?alt=media&token=0cd61845-e498-4e97-9478-5684f40fdb68",
    score:'1',
    Charts:[
      {label:"外遇蒐證",data:4},
      {label:"抓姦專案",data:4},
      {label:"行蹤調查",data:4},
      {label:"尋人調查",data:4},
      {label:"查前科案件",data:4},
      {label:"查學歷案件",data:4},
      {label:"查電話案件",data:4},
      {label:"查地址案件",data:4},
      {label:"查學歷案件",data:4},
      {label:"查出入境案件",data:4},
      {label:"其他個人資料調查",data:4},
      {label:"債務催收",data:4},
      {label:"呆帳處理",data:4},
      {label:"債務協商",data:4},
      {label:"傷害教訓",data:4},
      {label:"遺產糾紛",data:4},
      {label:"土地糾紛",data:4},
      {label:"醫療糾紛",data:4},
      {label:"車禍糾紛",data:4},
      {label:"撫養費協商",data:4},
      {label:"分手費協商",data:4},
      {label:"監護權協商",data:4},
      {label:"探視權協商",data:4},
      {label:"跨海調查",data:4},
      {label:"公司調查",data:4},
      {label:"商業調查",data:4},
      {label:"市場調查",data:4},
      {label:"越區傾銷調查",data:4},
      {label:"商業間諜調查",data:4},
      {label:"競業條款調查",data:4},
      {label:"盡職調查",data:4},
      {label:"非訴訟協調",data:4},
      {label:"器材架設",data:4},
      {label:"感情挽回",data:4},
      {label:"感情破壞",data:4},
      {label:"設計離婚",data:4},
      {label:"婚前調查",data:4},
      {label:"文書鑑定",data:4},
      {label:"子女調查",data:4},
      {label:"脫離不幸婚姻",data:4},
      {label:"仿冒、侵權案件",data:4},
      {label:"婚姻諮商",data:4},
      {label:"心理輔導",data:4},
    ]
  },
  {
    name:'呂嘉豪',
    No:'(110)中華徵書徵信士第017號',
    address:"台北市中山區南京東路二段124號5樓",
    map:"https://g.page/uicco?share",
    phone:"0800-883-311",
    gender:"男",
    year:'68',
    work:'一統徵信社',
    YearsPractice:'',
    photo:"https://firebasestorage.googleapis.com/v0/b/concent-4b5ff.appspot.com/o/17%E5%91%82%E5%98%89%E8%B1%AA.jpg?alt=media&token=80f024d1-551f-481a-9d37-e52d1db45804",
    score:'1',
    Charts:[
      {label:"外遇蒐證",data:4},
      {label:"抓姦專案",data:4},
      {label:"行蹤調查",data:4},
      {label:"尋人調查",data:4},
      {label:"查前科案件",data:4},
      {label:"查學歷案件",data:4},
      {label:"查電話案件",data:4},
      {label:"查地址案件",data:4},
      {label:"查學歷案件",data:4},
      {label:"查出入境案件",data:4},
      {label:"其他個人資料調查",data:4},
      {label:"債務催收",data:4},
      {label:"呆帳處理",data:4},
      {label:"債務協商",data:4},
      {label:"傷害教訓",data:4},
      {label:"遺產糾紛",data:4},
      {label:"土地糾紛",data:4},
      {label:"醫療糾紛",data:4},
      {label:"車禍糾紛",data:4},
      {label:"撫養費協商",data:4},
      {label:"分手費協商",data:4},
      {label:"監護權協商",data:4},
      {label:"探視權協商",data:4},
      {label:"跨海調查",data:4},
      {label:"公司調查",data:4},
      {label:"商業調查",data:4},
      {label:"市場調查",data:4},
      {label:"越區傾銷調查",data:4},
      {label:"商業間諜調查",data:4},
      {label:"競業條款調查",data:4},
      {label:"盡職調查",data:4},
      {label:"非訴訟協調",data:4},
      {label:"器材架設",data:4},
      {label:"感情挽回",data:4},
      {label:"感情破壞",data:4},
      {label:"設計離婚",data:4},
      {label:"婚前調查",data:4},
      {label:"文書鑑定",data:4},
      {label:"子女調查",data:4},
      {label:"脫離不幸婚姻",data:4},
      {label:"仿冒、侵權案件",data:4},
      {label:"婚姻諮商",data:4},
      {label:"心理輔導",data:4},
    ]
  },
  {
    name:'李佳玲',
    No:'(110)中華徵書徵信士第018號',
    address:"台北市中山區南京東路二段124號5樓",
    map:"https://g.page/uicco?share",
    phone:"0800-883-311",
    gender:"女",
    year:'64',
    work:'一統徵信社',
    YearsPractice:'',
    photo:"https://firebasestorage.googleapis.com/v0/b/concent-4b5ff.appspot.com/o/18%E6%9D%8E%E4%BD%B3%E7%8E%B2.jpg?alt=media&token=ccb4c2ec-f787-4f60-a10b-338889fc8f7a",
    score:'1',
    Charts:[
      {label:"外遇蒐證",data:4},
      {label:"抓姦專案",data:4},
      {label:"行蹤調查",data:4},
      {label:"尋人調查",data:4},
      {label:"查前科案件",data:4},
      {label:"查學歷案件",data:4},
      {label:"查電話案件",data:4},
      {label:"查地址案件",data:4},
      {label:"查學歷案件",data:4},
      {label:"查出入境案件",data:4},
      {label:"其他個人資料調查",data:4},
      {label:"債務催收",data:4},
      {label:"呆帳處理",data:4},
      {label:"債務協商",data:4},
      {label:"傷害教訓",data:4},
      {label:"遺產糾紛",data:4},
      {label:"土地糾紛",data:4},
      {label:"醫療糾紛",data:4},
      {label:"車禍糾紛",data:4},
      {label:"撫養費協商",data:4},
      {label:"分手費協商",data:4},
      {label:"監護權協商",data:4},
      {label:"探視權協商",data:4},
      {label:"跨海調查",data:4},
      {label:"公司調查",data:4},
      {label:"商業調查",data:4},
      {label:"市場調查",data:4},
      {label:"越區傾銷調查",data:4},
      {label:"商業間諜調查",data:4},
      {label:"競業條款調查",data:4},
      {label:"盡職調查",data:4},
      {label:"非訴訟協調",data:4},
      {label:"器材架設",data:4},
      {label:"感情挽回",data:4},
      {label:"感情破壞",data:4},
      {label:"設計離婚",data:4},
      {label:"婚前調查",data:4},
      {label:"文書鑑定",data:4},
      {label:"子女調查",data:4},
      {label:"脫離不幸婚姻",data:4},
      {label:"仿冒、侵權案件",data:4},
      {label:"婚姻諮商",data:4},
      {label:"心理輔導",data:4},
    ]
  },
  {
    name:'張佳怡',
    No:'(110)中華徵書徵信士第019號',
    address:"",
    map:"",
    phone:"0800-635-555",
    gender:"女",
    year:'69',
    work:'一統徵信高雄徵信社',
    YearsPractice:'',
    photo:"https://firebasestorage.googleapis.com/v0/b/concent-4b5ff.appspot.com/o/19%E5%BC%B5%E4%BD%B3%E6%80%A1.jpg?alt=media&token=856ba74e-b3c0-4f2e-a912-45d4eb2ef249",
    score:'1',
    Charts:[
      {label:"外遇蒐證",data:4},
      {label:"抓姦專案",data:4},
      {label:"行蹤調查",data:4},
      {label:"尋人調查",data:4},
      {label:"查前科案件",data:4},
      {label:"查學歷案件",data:4},
      {label:"查電話案件",data:4},
      {label:"查地址案件",data:4},
      {label:"查學歷案件",data:4},
      {label:"查出入境案件",data:4},
      {label:"其他個人資料調查",data:4},
      {label:"債務催收",data:4},
      {label:"呆帳處理",data:4},
      {label:"債務協商",data:4},
      {label:"傷害教訓",data:4},
      {label:"遺產糾紛",data:4},
      {label:"土地糾紛",data:4},
      {label:"醫療糾紛",data:4},
      {label:"車禍糾紛",data:4},
      {label:"撫養費協商",data:4},
      {label:"分手費協商",data:4},
      {label:"監護權協商",data:4},
      {label:"探視權協商",data:4},
      {label:"跨海調查",data:4},
      {label:"公司調查",data:4},
      {label:"商業調查",data:4},
      {label:"市場調查",data:4},
      {label:"越區傾銷調查",data:4},
      {label:"商業間諜調查",data:4},
      {label:"競業條款調查",data:4},
      {label:"盡職調查",data:4},
      {label:"非訴訟協調",data:4},
      {label:"器材架設",data:4},
      {label:"感情挽回",data:4},
      {label:"感情破壞",data:4},
      {label:"設計離婚",data:4},
      {label:"婚前調查",data:4},
      {label:"文書鑑定",data:4},
      {label:"子女調查",data:4},
      {label:"脫離不幸婚姻",data:4},
      {label:"仿冒、侵權案件",data:4},
      {label:"婚姻諮商",data:4},
      {label:"心理輔導",data:4},
    ]
  },
  {
    name:'劉亭佑',
    No:'(110)中華徵書徵信士第020號',
    address:"",
    map:"",
    phone:"",
    gender:"男",
    year:'75',
    work:'處長友',
    YearsPractice:'',
    photo:"https://firebasestorage.googleapis.com/v0/b/concent-4b5ff.appspot.com/o/20%E5%8A%89%E4%BA%AD%E4%BD%91.jpg?alt=media&token=8926c581-cc91-4e1a-af7e-fdd21affcdef",
    score:'1',
    Charts:[
      {label:"外遇蒐證",data:4},
      {label:"抓姦專案",data:4},
      {label:"行蹤調查",data:4},
      {label:"尋人調查",data:4},
      {label:"查前科案件",data:4},
      {label:"查學歷案件",data:4},
      {label:"查電話案件",data:4},
      {label:"查地址案件",data:4},
      {label:"查學歷案件",data:4},
      {label:"查出入境案件",data:4},
      {label:"其他個人資料調查",data:4},
      {label:"債務催收",data:4},
      {label:"呆帳處理",data:4},
      {label:"債務協商",data:4},
      {label:"傷害教訓",data:4},
      {label:"遺產糾紛",data:4},
      {label:"土地糾紛",data:4},
      {label:"醫療糾紛",data:4},
      {label:"車禍糾紛",data:4},
      {label:"撫養費協商",data:4},
      {label:"分手費協商",data:4},
      {label:"監護權協商",data:4},
      {label:"探視權協商",data:4},
      {label:"跨海調查",data:4},
      {label:"公司調查",data:4},
      {label:"商業調查",data:4},
      {label:"市場調查",data:4},
      {label:"越區傾銷調查",data:4},
      {label:"商業間諜調查",data:4},
      {label:"競業條款調查",data:4},
      {label:"盡職調查",data:4},
      {label:"非訴訟協調",data:4},
      {label:"器材架設",data:4},
      {label:"感情挽回",data:4},
      {label:"感情破壞",data:4},
      {label:"設計離婚",data:4},
      {label:"婚前調查",data:4},
      {label:"文書鑑定",data:4},
      {label:"子女調查",data:4},
      {label:"脫離不幸婚姻",data:4},
      {label:"仿冒、侵權案件",data:4},
      {label:"婚姻諮商",data:4},
      {label:"心理輔導",data:4},
    ]
  },
  {
    name:'史文孝',
    No:'(110)中華徵書徵信士第021號',
    address:"",
    map:"",
    phone:"",
    gender:"男",
    year:'66',
    work:'處長友',
    YearsPractice:'',
    photo:"https://firebasestorage.googleapis.com/v0/b/concent-4b5ff.appspot.com/o/21%E5%8F%B2%E6%96%87%E5%AD%9D.jpg?alt=media&token=620c42a5-6571-4773-ac04-a265de05b25e",
    score:'1',
    Charts:[
      {label:"外遇蒐證",data:4},
      {label:"抓姦專案",data:4},
      {label:"行蹤調查",data:4},
      {label:"尋人調查",data:4},
      {label:"查前科案件",data:4},
      {label:"查學歷案件",data:4},
      {label:"查電話案件",data:4},
      {label:"查地址案件",data:4},
      {label:"查學歷案件",data:4},
      {label:"查出入境案件",data:4},
      {label:"其他個人資料調查",data:4},
      {label:"債務催收",data:4},
      {label:"呆帳處理",data:4},
      {label:"債務協商",data:4},
      {label:"傷害教訓",data:4},
      {label:"遺產糾紛",data:4},
      {label:"土地糾紛",data:4},
      {label:"醫療糾紛",data:4},
      {label:"車禍糾紛",data:4},
      {label:"撫養費協商",data:4},
      {label:"分手費協商",data:4},
      {label:"監護權協商",data:4},
      {label:"探視權協商",data:4},
      {label:"跨海調查",data:4},
      {label:"公司調查",data:4},
      {label:"商業調查",data:4},
      {label:"市場調查",data:4},
      {label:"越區傾銷調查",data:4},
      {label:"商業間諜調查",data:4},
      {label:"競業條款調查",data:4},
      {label:"盡職調查",data:4},
      {label:"非訴訟協調",data:4},
      {label:"器材架設",data:4},
      {label:"感情挽回",data:4},
      {label:"感情破壞",data:4},
      {label:"設計離婚",data:4},
      {label:"婚前調查",data:4},
      {label:"文書鑑定",data:4},
      {label:"子女調查",data:4},
      {label:"脫離不幸婚姻",data:4},
      {label:"仿冒、侵權案件",data:4},
      {label:"婚姻諮商",data:4},
      {label:"心理輔導",data:4},
    ]
  },
  {
    name:'邱志偉',
    No:'(110)中華徵書徵信士第022號',
    address:"台北市中山區南京東路二段124號5樓",
    map:"https://g.page/uicco?share",
    phone:"0800-883-311",
    gender:"男",
    year:'62',
    work:'一統徵信社',
    YearsPractice:'',
    photo:"https://firebasestorage.googleapis.com/v0/b/concent-4b5ff.appspot.com/o/22%E9%82%B1%E5%BF%97%E5%81%89.jpg?alt=media&token=76fea881-578f-49e5-8a3a-4c30dcdbc99e",
    score:'1',
    Charts:[
      {label:"外遇蒐證",data:4},
      {label:"抓姦專案",data:4},
      {label:"行蹤調查",data:4},
      {label:"尋人調查",data:4},
      {label:"查前科案件",data:4},
      {label:"查學歷案件",data:4},
      {label:"查電話案件",data:4},
      {label:"查地址案件",data:4},
      {label:"查學歷案件",data:4},
      {label:"查出入境案件",data:4},
      {label:"其他個人資料調查",data:4},
      {label:"債務催收",data:4},
      {label:"呆帳處理",data:4},
      {label:"債務協商",data:4},
      {label:"傷害教訓",data:4},
      {label:"遺產糾紛",data:4},
      {label:"土地糾紛",data:4},
      {label:"醫療糾紛",data:4},
      {label:"車禍糾紛",data:4},
      {label:"撫養費協商",data:4},
      {label:"分手費協商",data:4},
      {label:"監護權協商",data:4},
      {label:"探視權協商",data:4},
      {label:"跨海調查",data:4},
      {label:"公司調查",data:4},
      {label:"商業調查",data:4},
      {label:"市場調查",data:4},
      {label:"越區傾銷調查",data:4},
      {label:"商業間諜調查",data:4},
      {label:"競業條款調查",data:4},
      {label:"盡職調查",data:4},
      {label:"非訴訟協調",data:4},
      {label:"器材架設",data:4},
      {label:"感情挽回",data:4},
      {label:"感情破壞",data:4},
      {label:"設計離婚",data:4},
      {label:"婚前調查",data:4},
      {label:"文書鑑定",data:4},
      {label:"子女調查",data:4},
      {label:"脫離不幸婚姻",data:4},
      {label:"仿冒、侵權案件",data:4},
      {label:"婚姻諮商",data:4},
      {label:"心理輔導",data:4},
    ]
  },
  {
    name:'許恭碩',
    No:'(110)中華徵書徵信士第023號',
    address:"台北市中山區南京東路二段124號5樓",
    map:"https://g.page/uicco?share",
    phone:"0800-883-311",
    gender:"男",
    year:'74',
    work:'一統徵信社',
    YearsPractice:'',
    photo:"https://firebasestorage.googleapis.com/v0/b/concent-4b5ff.appspot.com/o/23%E8%A8%B1%E6%81%AD%E7%A2%A9.jpg?alt=media&token=9124e706-8209-4b3c-bfa1-11d9dea9a871",
    score:'1',
    Charts:[
      {label:"外遇蒐證",data:4},
      {label:"抓姦專案",data:4},
      {label:"行蹤調查",data:4},
      {label:"尋人調查",data:4},
      {label:"查前科案件",data:4},
      {label:"查學歷案件",data:4},
      {label:"查電話案件",data:4},
      {label:"查地址案件",data:4},
      {label:"查學歷案件",data:4},
      {label:"查出入境案件",data:4},
      {label:"其他個人資料調查",data:4},
      {label:"債務催收",data:4},
      {label:"呆帳處理",data:4},
      {label:"債務協商",data:4},
      {label:"傷害教訓",data:4},
      {label:"遺產糾紛",data:4},
      {label:"土地糾紛",data:4},
      {label:"醫療糾紛",data:4},
      {label:"車禍糾紛",data:4},
      {label:"撫養費協商",data:4},
      {label:"分手費協商",data:4},
      {label:"監護權協商",data:4},
      {label:"探視權協商",data:4},
      {label:"跨海調查",data:4},
      {label:"公司調查",data:4},
      {label:"商業調查",data:4},
      {label:"市場調查",data:4},
      {label:"越區傾銷調查",data:4},
      {label:"商業間諜調查",data:4},
      {label:"競業條款調查",data:4},
      {label:"盡職調查",data:4},
      {label:"非訴訟協調",data:4},
      {label:"器材架設",data:4},
      {label:"感情挽回",data:4},
      {label:"感情破壞",data:4},
      {label:"設計離婚",data:4},
      {label:"婚前調查",data:4},
      {label:"文書鑑定",data:4},
      {label:"子女調查",data:4},
      {label:"脫離不幸婚姻",data:4},
      {label:"仿冒、侵權案件",data:4},
      {label:"婚姻諮商",data:4},
      {label:"心理輔導",data:4},
    ]
  },
  {
    name:'施君達',
    No:'(110)中華徵書徵信士第024號',
    address:"台北市中山區南京東路二段124號5樓",
    map:"https://g.page/uicco?share",
    phone:"0800-883-311",
    gender:"男",
    year:'67',
    work:'一統徵信社',
    YearsPractice:'',
    photo:"https://firebasestorage.googleapis.com/v0/b/concent-4b5ff.appspot.com/o/24%E6%96%BD%E5%90%9B%E9%81%94.jpg?alt=media&token=f3b392b7-4273-48b6-8e4a-5cbd996cfa82",
    score:'1',
    Charts:[
      {label:"外遇蒐證",data:4},
      {label:"抓姦專案",data:4},
      {label:"行蹤調查",data:4},
      {label:"尋人調查",data:4},
      {label:"查前科案件",data:4},
      {label:"查學歷案件",data:4},
      {label:"查電話案件",data:4},
      {label:"查地址案件",data:4},
      {label:"查學歷案件",data:4},
      {label:"查出入境案件",data:4},
      {label:"其他個人資料調查",data:4},
      {label:"債務催收",data:4},
      {label:"呆帳處理",data:4},
      {label:"債務協商",data:4},
      {label:"傷害教訓",data:4},
      {label:"遺產糾紛",data:4},
      {label:"土地糾紛",data:4},
      {label:"醫療糾紛",data:4},
      {label:"車禍糾紛",data:4},
      {label:"撫養費協商",data:4},
      {label:"分手費協商",data:4},
      {label:"監護權協商",data:4},
      {label:"探視權協商",data:4},
      {label:"跨海調查",data:4},
      {label:"公司調查",data:4},
      {label:"商業調查",data:4},
      {label:"市場調查",data:4},
      {label:"越區傾銷調查",data:4},
      {label:"商業間諜調查",data:4},
      {label:"競業條款調查",data:4},
      {label:"盡職調查",data:4},
      {label:"非訴訟協調",data:4},
      {label:"器材架設",data:4},
      {label:"感情挽回",data:4},
      {label:"感情破壞",data:4},
      {label:"設計離婚",data:4},
      {label:"婚前調查",data:4},
      {label:"文書鑑定",data:4},
      {label:"子女調查",data:4},
      {label:"脫離不幸婚姻",data:4},
      {label:"仿冒、侵權案件",data:4},
      {label:"婚姻諮商",data:4},
      {label:"心理輔導",data:4},
    ]
  },
  {
    name:'歐俊男',
    No:'(110)中華徵書徵信士第025號',
    address:"台北市松山區南京東路三段259號8樓",
    map:"https://goo.gl/maps/nY435vzCUeSPpLGu8",
    phone:"0800-828-333",
    gender:"男",
    year:'56',
    work:'國華徵信社',
    YearsPractice:'',
    photo:"https://firebasestorage.googleapis.com/v0/b/concent-4b5ff.appspot.com/o/25%E6%AD%90%E4%BF%8A%E7%94%B7.jpg?alt=media&token=ab8bcc45-27eb-434c-bace-572173b604d0",
    score:'1',
    Charts:[
      {label:"外遇蒐證",data:4},
      {label:"抓姦專案",data:4},
      {label:"行蹤調查",data:4},
      {label:"尋人調查",data:4},
      {label:"查前科案件",data:4},
      {label:"查學歷案件",data:4},
      {label:"查電話案件",data:4},
      {label:"查地址案件",data:4},
      {label:"查學歷案件",data:4},
      {label:"查出入境案件",data:4},
      {label:"其他個人資料調查",data:4},
      {label:"債務催收",data:4},
      {label:"呆帳處理",data:4},
      {label:"債務協商",data:4},
      {label:"傷害教訓",data:4},
      {label:"遺產糾紛",data:4},
      {label:"土地糾紛",data:4},
      {label:"醫療糾紛",data:4},
      {label:"車禍糾紛",data:4},
      {label:"撫養費協商",data:4},
      {label:"分手費協商",data:4},
      {label:"監護權協商",data:4},
      {label:"探視權協商",data:4},
      {label:"跨海調查",data:4},
      {label:"公司調查",data:4},
      {label:"商業調查",data:4},
      {label:"市場調查",data:4},
      {label:"越區傾銷調查",data:4},
      {label:"商業間諜調查",data:4},
      {label:"競業條款調查",data:4},
      {label:"盡職調查",data:4},
      {label:"非訴訟協調",data:4},
      {label:"器材架設",data:4},
      {label:"感情挽回",data:4},
      {label:"感情破壞",data:4},
      {label:"設計離婚",data:4},
      {label:"婚前調查",data:4},
      {label:"文書鑑定",data:4},
      {label:"子女調查",data:4},
      {label:"脫離不幸婚姻",data:4},
      {label:"仿冒、侵權案件",data:4},
      {label:"婚姻諮商",data:4},
      {label:"心理輔導",data:4},
    ]
  },
  {
    name:'巫錦勳',
    No:'(110)中華徵書徵信士第026號',
    address:"台北市松山區南京東路三段259號8樓",
    map:"https://goo.gl/maps/nY435vzCUeSPpLGu8",
    phone:"0800-828-333",
    gender:"男",
    year:'56',
    work:'國華徵信社',
    YearsPractice:'',
    photo:"https://firebasestorage.googleapis.com/v0/b/concent-4b5ff.appspot.com/o/26%E5%B7%AB%E9%8C%A6%E5%8B%B3.jpg?alt=media&token=ed8d17f6-bbfd-49a8-9b9a-a6365c12e0dc",
    score:'1',
    Charts:[
      {label:"外遇蒐證",data:4},
      {label:"抓姦專案",data:4},
      {label:"行蹤調查",data:4},
      {label:"尋人調查",data:4},
      {label:"查前科案件",data:4},
      {label:"查學歷案件",data:4},
      {label:"查電話案件",data:4},
      {label:"查地址案件",data:4},
      {label:"查學歷案件",data:4},
      {label:"查出入境案件",data:4},
      {label:"其他個人資料調查",data:4},
      {label:"債務催收",data:4},
      {label:"呆帳處理",data:4},
      {label:"債務協商",data:4},
      {label:"傷害教訓",data:4},
      {label:"遺產糾紛",data:4},
      {label:"土地糾紛",data:4},
      {label:"醫療糾紛",data:4},
      {label:"車禍糾紛",data:4},
      {label:"撫養費協商",data:4},
      {label:"分手費協商",data:4},
      {label:"監護權協商",data:4},
      {label:"探視權協商",data:4},
      {label:"跨海調查",data:4},
      {label:"公司調查",data:4},
      {label:"商業調查",data:4},
      {label:"市場調查",data:4},
      {label:"越區傾銷調查",data:4},
      {label:"商業間諜調查",data:4},
      {label:"競業條款調查",data:4},
      {label:"盡職調查",data:4},
      {label:"非訴訟協調",data:4},
      {label:"器材架設",data:4},
      {label:"感情挽回",data:4},
      {label:"感情破壞",data:4},
      {label:"設計離婚",data:4},
      {label:"婚前調查",data:4},
      {label:"文書鑑定",data:4},
      {label:"子女調查",data:4},
      {label:"脫離不幸婚姻",data:4},
      {label:"仿冒、侵權案件",data:4},
      {label:"婚姻諮商",data:4},
      {label:"心理輔導",data:4},
    ]
  },
  {
    name:'曾維均',
    No:'(110)中華徵書徵信士第027號',
    address:"台北市松山區南京東路三段259號8樓",
    map:"https://goo.gl/maps/nY435vzCUeSPpLGu8",
    phone:"0800-828-333",
    gender:"男",
    year:'59',
    work:'國華徵信社',
    YearsPractice:'',
    photo:"https://firebasestorage.googleapis.com/v0/b/concent-4b5ff.appspot.com/o/27%E6%9B%BE%E7%B6%AD%E5%9D%87.jpg?alt=media&token=c2c66e1f-6604-4d16-986f-591479a92ff8",
    score:'1',
    Charts:[
      {label:"外遇蒐證",data:4},
      {label:"抓姦專案",data:4},
      {label:"行蹤調查",data:4},
      {label:"尋人調查",data:4},
      {label:"查前科案件",data:4},
      {label:"查學歷案件",data:4},
      {label:"查電話案件",data:4},
      {label:"查地址案件",data:4},
      {label:"查學歷案件",data:4},
      {label:"查出入境案件",data:4},
      {label:"其他個人資料調查",data:4},
      {label:"債務催收",data:4},
      {label:"呆帳處理",data:4},
      {label:"債務協商",data:4},
      {label:"傷害教訓",data:4},
      {label:"遺產糾紛",data:4},
      {label:"土地糾紛",data:4},
      {label:"醫療糾紛",data:4},
      {label:"車禍糾紛",data:4},
      {label:"撫養費協商",data:4},
      {label:"分手費協商",data:4},
      {label:"監護權協商",data:4},
      {label:"探視權協商",data:4},
      {label:"跨海調查",data:4},
      {label:"公司調查",data:4},
      {label:"商業調查",data:4},
      {label:"市場調查",data:4},
      {label:"越區傾銷調查",data:4},
      {label:"商業間諜調查",data:4},
      {label:"競業條款調查",data:4},
      {label:"盡職調查",data:4},
      {label:"非訴訟協調",data:4},
      {label:"器材架設",data:4},
      {label:"感情挽回",data:4},
      {label:"感情破壞",data:4},
      {label:"設計離婚",data:4},
      {label:"婚前調查",data:4},
      {label:"文書鑑定",data:4},
      {label:"子女調查",data:4},
      {label:"脫離不幸婚姻",data:4},
      {label:"仿冒、侵權案件",data:4},
      {label:"婚姻諮商",data:4},
      {label:"心理輔導",data:4},
    ]
  },
  {
    name:'于輝雄',
    No:'(110)中華徵書徵信士第028號',
    address:"台北市松山區南京東路三段259號8樓",
    map:"https://goo.gl/maps/nY435vzCUeSPpLGu8",
    phone:"0800-828-333",
    gender:"男",
    year:'54',
    work:'國華徵信社',
    YearsPractice:'',
    photo:"https://firebasestorage.googleapis.com/v0/b/concent-4b5ff.appspot.com/o/28%E4%BA%8E%E8%BC%9D%E9%9B%84.jpg?alt=media&token=7b28130d-198b-4307-91a2-2100535ab4b7",
    score:'1',
    Charts:[
      {label:"外遇蒐證",data:4},
      {label:"抓姦專案",data:4},
      {label:"行蹤調查",data:4},
      {label:"尋人調查",data:4},
      {label:"查前科案件",data:4},
      {label:"查學歷案件",data:4},
      {label:"查電話案件",data:4},
      {label:"查地址案件",data:4},
      {label:"查學歷案件",data:4},
      {label:"查出入境案件",data:4},
      {label:"其他個人資料調查",data:4},
      {label:"債務催收",data:4},
      {label:"呆帳處理",data:4},
      {label:"債務協商",data:4},
      {label:"傷害教訓",data:4},
      {label:"遺產糾紛",data:4},
      {label:"土地糾紛",data:4},
      {label:"醫療糾紛",data:4},
      {label:"車禍糾紛",data:4},
      {label:"撫養費協商",data:4},
      {label:"分手費協商",data:4},
      {label:"監護權協商",data:4},
      {label:"探視權協商",data:4},
      {label:"跨海調查",data:4},
      {label:"公司調查",data:4},
      {label:"商業調查",data:4},
      {label:"市場調查",data:4},
      {label:"越區傾銷調查",data:4},
      {label:"商業間諜調查",data:4},
      {label:"競業條款調查",data:4},
      {label:"盡職調查",data:4},
      {label:"非訴訟協調",data:4},
      {label:"器材架設",data:4},
      {label:"感情挽回",data:4},
      {label:"感情破壞",data:4},
      {label:"設計離婚",data:4},
      {label:"婚前調查",data:4},
      {label:"文書鑑定",data:4},
      {label:"子女調查",data:4},
      {label:"脫離不幸婚姻",data:4},
      {label:"仿冒、侵權案件",data:4},
      {label:"婚姻諮商",data:4},
      {label:"心理輔導",data:4},
    ]
  },
  {
    name:'許姿伶',
    No:'(110)中華徵書徵信士第029號',
    address:"台北市松山區南京東路三段259號8樓",
    map:"https://goo.gl/maps/nY435vzCUeSPpLGu8",
    phone:"0800-828-333",
    gender:"女",
    year:'59',
    work:'國華徵信社',
    YearsPractice:'',
    photo:"https://firebasestorage.googleapis.com/v0/b/concent-4b5ff.appspot.com/o/29%E8%A8%B1%E5%A7%BF%E4%BC%B6.jpg?alt=media&token=99843c69-b37f-49b4-8e3c-a6996b7ac0e4",
    score:'1',
    Charts:[
      {label:"外遇蒐證",data:4},
      {label:"抓姦專案",data:4},
      {label:"行蹤調查",data:4},
      {label:"尋人調查",data:4},
      {label:"查前科案件",data:4},
      {label:"查學歷案件",data:4},
      {label:"查電話案件",data:4},
      {label:"查地址案件",data:4},
      {label:"查學歷案件",data:4},
      {label:"查出入境案件",data:4},
      {label:"其他個人資料調查",data:4},
      {label:"債務催收",data:4},
      {label:"呆帳處理",data:4},
      {label:"債務協商",data:4},
      {label:"傷害教訓",data:4},
      {label:"遺產糾紛",data:4},
      {label:"土地糾紛",data:4},
      {label:"醫療糾紛",data:4},
      {label:"車禍糾紛",data:4},
      {label:"撫養費協商",data:4},
      {label:"分手費協商",data:4},
      {label:"監護權協商",data:4},
      {label:"探視權協商",data:4},
      {label:"跨海調查",data:4},
      {label:"公司調查",data:4},
      {label:"商業調查",data:4},
      {label:"市場調查",data:4},
      {label:"越區傾銷調查",data:4},
      {label:"商業間諜調查",data:4},
      {label:"競業條款調查",data:4},
      {label:"盡職調查",data:4},
      {label:"非訴訟協調",data:4},
      {label:"器材架設",data:4},
      {label:"感情挽回",data:4},
      {label:"感情破壞",data:4},
      {label:"設計離婚",data:4},
      {label:"婚前調查",data:4},
      {label:"文書鑑定",data:4},
      {label:"子女調查",data:4},
      {label:"脫離不幸婚姻",data:4},
      {label:"仿冒、侵權案件",data:4},
      {label:"婚姻諮商",data:4},
      {label:"心理輔導",data:4},
    ]
  },
  {
    name:'張忠海',
    No:'(110)中華徵書徵信士第030號',
    address:"台北市松山區南京東路三段259號8樓",
    map:"https://goo.gl/maps/nY435vzCUeSPpLGu8",
    phone:"0800-828-333",
    gender:"男",
    year:'58',
    work:'國華徵信社',
    YearsPractice:'',
    photo:"https://firebasestorage.googleapis.com/v0/b/concent-4b5ff.appspot.com/o/30%E5%BC%B5%E5%BF%A0%E6%B5%B7.jpg?alt=media&token=e7190452-0ea8-4294-ae45-e984d25eedb3",
    score:'1',
    Charts:[
      {label:"外遇蒐證",data:4},
      {label:"抓姦專案",data:4},
      {label:"行蹤調查",data:4},
      {label:"尋人調查",data:4},
      {label:"查前科案件",data:4},
      {label:"查學歷案件",data:4},
      {label:"查電話案件",data:4},
      {label:"查地址案件",data:4},
      {label:"查學歷案件",data:4},
      {label:"查出入境案件",data:4},
      {label:"其他個人資料調查",data:4},
      {label:"債務催收",data:4},
      {label:"呆帳處理",data:4},
      {label:"債務協商",data:4},
      {label:"傷害教訓",data:4},
      {label:"遺產糾紛",data:4},
      {label:"土地糾紛",data:4},
      {label:"醫療糾紛",data:4},
      {label:"車禍糾紛",data:4},
      {label:"撫養費協商",data:4},
      {label:"分手費協商",data:4},
      {label:"監護權協商",data:4},
      {label:"探視權協商",data:4},
      {label:"跨海調查",data:4},
      {label:"公司調查",data:4},
      {label:"商業調查",data:4},
      {label:"市場調查",data:4},
      {label:"越區傾銷調查",data:4},
      {label:"商業間諜調查",data:4},
      {label:"競業條款調查",data:4},
      {label:"盡職調查",data:4},
      {label:"非訴訟協調",data:4},
      {label:"器材架設",data:4},
      {label:"感情挽回",data:4},
      {label:"感情破壞",data:4},
      {label:"設計離婚",data:4},
      {label:"婚前調查",data:4},
      {label:"文書鑑定",data:4},
      {label:"子女調查",data:4},
      {label:"脫離不幸婚姻",data:4},
      {label:"仿冒、侵權案件",data:4},
      {label:"婚姻諮商",data:4},
      {label:"心理輔導",data:4},
    ]
  },
  {
    name:'賀照莒',
    No:'(110)中華徵書徵信士第031號',
    address:"台北市松山區南京東路三段259號8樓",
    map:"https://goo.gl/maps/nY435vzCUeSPpLGu8",
    phone:"0800-828-333",
    gender:"男",
    year:'52',
    work:'國華徵信社',
    YearsPractice:'',
    photo:"https://firebasestorage.googleapis.com/v0/b/concent-4b5ff.appspot.com/o/31%E8%B3%80%E7%85%A7%E8%8E%92.jpg?alt=media&token=66830bb6-f040-4b42-8b76-e4ba7ecfcef9",
    score:'1',
    Charts:[
      {label:"外遇蒐證",data:4},
      {label:"抓姦專案",data:4},
      {label:"行蹤調查",data:4},
      {label:"尋人調查",data:4},
      {label:"查前科案件",data:4},
      {label:"查學歷案件",data:4},
      {label:"查電話案件",data:4},
      {label:"查地址案件",data:4},
      {label:"查學歷案件",data:4},
      {label:"查出入境案件",data:4},
      {label:"其他個人資料調查",data:4},
      {label:"債務催收",data:4},
      {label:"呆帳處理",data:4},
      {label:"債務協商",data:4},
      {label:"傷害教訓",data:4},
      {label:"遺產糾紛",data:4},
      {label:"土地糾紛",data:4},
      {label:"醫療糾紛",data:4},
      {label:"車禍糾紛",data:4},
      {label:"撫養費協商",data:4},
      {label:"分手費協商",data:4},
      {label:"監護權協商",data:4},
      {label:"探視權協商",data:4},
      {label:"跨海調查",data:4},
      {label:"公司調查",data:4},
      {label:"商業調查",data:4},
      {label:"市場調查",data:4},
      {label:"越區傾銷調查",data:4},
      {label:"商業間諜調查",data:4},
      {label:"競業條款調查",data:4},
      {label:"盡職調查",data:4},
      {label:"非訴訟協調",data:4},
      {label:"器材架設",data:4},
      {label:"感情挽回",data:4},
      {label:"感情破壞",data:4},
      {label:"設計離婚",data:4},
      {label:"婚前調查",data:4},
      {label:"文書鑑定",data:4},
      {label:"子女調查",data:4},
      {label:"脫離不幸婚姻",data:4},
      {label:"仿冒、侵權案件",data:4},
      {label:"婚姻諮商",data:4},
      {label:"心理輔導",data:4},
    ]
  }
]
