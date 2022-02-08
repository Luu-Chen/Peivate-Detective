$(function () {
  var CheckBtn = document.getElementById('check');
  CheckBtn.addEventListener('click',function(e){
      if (localStorage.getItem('userName')==null){
        e.preventDefault();
        document.querySelector('.modal-backdrop').style.display="none"
        document.querySelector('.modal-content').style.display="none"
        alert('請先登入')
        document.location.href="./member.html";
        return false
      }
  })
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
  SearchName.addEventListener('keyup',search);
  // $('#stars li').on('mouseover', function(){
  //   var onStar = parseInt($(this).data('value'), 10);
  //   $(this).parent().children('li.star').each(function(e){
  //     if (e < onStar) {
  //       $(this).addClass('hover');
  //     }
  //     else {
  //       $(this).removeClass('hover');
  //     }
  //   });
  // }).on('mouseout', function(){
  //   $(this).parent().children('li.star').each(function(e){
  //     $(this).removeClass('hover');
  //   });
  // });
  // $('#stars li').on('click', function(){
  //   var onStar = parseInt($(this).data('value'), 10);
  //   var stars = $(this).parent().children('li.star');
  //   for (i = 0; i < stars.length; i++) {
  //     $(stars[i]).removeClass('selected');
  //   }
  //   for (i = 0; i < onStar; i++) {
  //     $(stars[i]).addClass('selected');
  //   }
  //   var ratingValue = parseInt($('#stars li.selected').last().data('value'), 10);
  //   var msg = "";
  //   if (ratingValue >= 1) {
  //       msg = ratingValue;
  //   }
  //   else {
  //       alert('請選擇評分')
  //   }
  //   responseMessage(msg);
  // });
});
// function responseMessage(msg) {
//   var x = document.querySelector(".score").innerHTML;
//   var num = [];
//   num.push(x);
//   if(msg=='0'|| x==''){
//     return false
//   }else if(msg==5){
//     num  = parseInt(num) +msg 
//   }else if(msg==4){
//     num  = parseInt(num) +msg 
//   }else if(msg==3){
//     num  = parseInt(num) +msg 
//   }else if(msg==2){
//     num  = parseInt(num) +msg 
//   }else if(msg==1){
//     num  = parseInt(num) +msg 
//   }
//   document.querySelector(".score2").innerHTML= num;
//   document.querySelector(".score").style.display="none";
// }
$(list).delegate(`tr`, `click`, function (e){
  var pie=[];
  var color=[];
  var dataSc=[];
  $('html, body').animate({scrollTop: 0}, 0);
  for(var i=0; i<newData.length;i++){
    if(e.target.dataset.item==newData[i].data.name){
      for(var k=0; k<newData[i].data.Charts.length;k++){
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
      // document.getElementById("Onecase").innerHTML =newData[i].data.case;
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
  //顯示留言與刪除按鈕
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
      let ID = localStorage.getItem('userName');
      switch(ID){
        case 'sgas@gmail.com':
          btn[k].style.display = "block"
        break;
        default:
          if(btn[k].dataset.id !=localStorage.getItem('userName')){
            btn[k].style.display = "none"
          }
      }  
    }
    var btn= document.getElementById('showAll').getElementsByTagName('button');
    for (var k = 0; k < btn.length; k++){
      let ID = localStorage.getItem('userName');
      switch(ID){
        case 'sgas@gmail.com':
          btn[k].style.display = "block"
        break;
        default:
          if(btn[k].dataset.id !=localStorage.getItem('userName')){
            btn[k].style.display = "none"
          }
      }  
    }
  }); 
})
$(window).on('load',function(){
  $("#loading_txt").fadeOut(1400);
  $("#preloader").delay(1400).fadeOut("slow");
});
// 留言摺疊區刪除
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
  });
  
})
// 留言區刪除，直接顯示的地方
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
    // console.log(result.length);
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
//取評分的分數
var KPI_Data = [];
function reset(){
  var db = firebase.firestore();
  var refID = db.collection("個人資料")
  refID.onSnapshot(querySnapshot => {
    querySnapshot.forEach(doc => {
      KPI_Data.push(doc.data());
    });
  });
}
reset();

//上傳留言與積分
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
    var answer =$('input:radio[name="rating"]:checked').val();
    for(i=0;i<KPI_Data.length;i++){
      if(KPI_Data[i].name == updateID){
        var x = '';
        x = KPI_Data[i].score;
        newNumber =x ;
        var num =[];
        num.push(x)
        switch (answer){
          case '1':
            num  = parseInt(num) +1;
            break;
          case '2':        
            num  = parseInt(num) +2;                   
            break;
          case '3':        
            num  = parseInt(num) +3;              
            break;
          case '4':        
            num  = parseInt(num) +4;              
            break;
          case '5':        
            num  = parseInt(num) +5;              
            break;
        }
      }
    }
    if($('#content').val()=="" || answer== undefined){
      alert("請給予評語、評分")
      return false
    }else if(answer== undefined){
      alert("未給予評分")
      return false
    }else if($('#content').val()==""){
      alert("請給予評語")
      return false
    }else{
      database.push(postData);
      // $content.val('');
      ref.update({
        score:num
      }).then(() => {
        alert('成功送出');
        document.getElementById('score_form').reset();
        reset();
        $('#staticBackdrop').modal('hide')
      });
    }
})
//關閉留言
var CloseBtn = document.getElementById('close');
CloseBtn.addEventListener('click',function(e){
  e.preventDefault;
  document.getElementById('score_form').reset();
})
var CloseX = document.getElementById('Close_x');
CloseX.addEventListener('click',function(e){
  e.preventDefault;
  document.getElementById('score_form').reset();
})
