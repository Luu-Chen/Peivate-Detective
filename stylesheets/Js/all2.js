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
var MessageContent = document.getElementById("showAll");
var Rest = document.querySelector('.cet');
var updateID = String;
var $content = $('#content'),
    $btn = $('#btn'),
    $show = $('#show'),
    ms = new Date().getTime();
var update = document.querySelector('.modal-footer')
var page = document.getElementById("ID_page");
var allData =[];

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
        <td class='text-center' data-item="${parameter[i].name}">${parameter[i].name}</td>
        <td class='text-center' data-item="${parameter[i].name}">${parameter[i].No}</td>
        </tr>`;
	}
	list.innerHTML = str;
}
function clickPage(e) {
	e.preventDefault();
	if (e.target.nodeName !== 'A') { return };
	const page = e.target.dataset.pages;
    pagination(allData, page);
}
page.addEventListener('click', clickPage);
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
  for(var i=0; i<newData.length;i++){
    if(e.target.dataset.item==newData[i].data.name){
      // for(var k=0; k<25;k++){
      //   color.push(newData[i].data.Charts[k].color);
      //   pie.push({label:newData[i].data.Charts[k].label,value:newData[i].data.Charts[k].data});
      //   dataSc.push([newData[i].data.Charts[k].label,newData[i].data.Charts[k].data])
      // }
      // Highcharts.chart('container', {
      //   chart: {
      //       styledMode: true
      //   },
      //   title: {
      //       text: ''
      //   },
      //   tooltip: {
      //     pointFormat: '<b>{point.percentage:.1f}%</b>'
      //   },
      //   series: [{
      //       type: 'pie',
      //       allowPointSelect: true,
      //       keys: ['name', 'y', 'selected', 'sliced'],
      //       data: dataSc,
      //       showInLegend: true
      //   }]
      // });
      document.getElementById('ID_page').style.display="none";
      document.querySelector('.admin').style.display="block";
      document.querySelector('.content').style.display="block";
      document.querySelector('.oneDate').style.display="block";
      document.querySelector('.content-search').style.display="none";
      document.querySelector('.mobile').style.display="none";
      document.querySelector('.mobile2').style.display="none";
      document.getElementById("name").innerHTML = newData[i].data.name+'徵信士';
      document.getElementById("lawyerNo").innerHTML = newData[i].data.lawyerNo;
      document.getElementById("gender").innerHTML = newData[i].data.gender;
      document.getElementById("year").innerHTML ='民國'+ newData[i].data.year+'年';
      document.getElementById("YearsPractice").innerHTML =newData[i].data.YearsPractice;
      document.querySelector(".score").innerHTML = newData[i].data.score;
      document.getElementById("case").innerHTML =newData[i].data.case;
      document.getElementById("news").innerHTML =newData[i].data.news;
      document.getElementById("work").innerHTML =newData[i].data.work;
      document.getElementById("address").innerHTML =newData[i].data.address;
      updateID=newData[i].id;
    }
  }
  var database = firebase.database().ref(updateID);
  var Cont = [];
  var str ='';
  var strAll ='';
  var num = String;
  database.once('value', function(snapshot) {
      $show.html('');
      for(var i in snapshot.val()){
        document.querySelector('.show2').style.display="none";
        Cont.push(snapshot.val()[i]);
      }
      for(var k=0;k<Cont.length;k++){
        Cont = Cont.sort(function (a,b){
            return a.time > b.time ? 1 : -1;
        })
        num=Cont.length;
        document.getElementById('num').innerHTML=num;
        if(snapshot.val()==null){
        }else if(snapshot.val()!=null && Cont.length >5){
          strAll +='<li>'+'<div class="">'+'<i class="fas fa-user-circle i-size" title="匿名"></i>：'+'<span class="list-p">'+Cont[k].content+'<span>'+'<br>'+'<small>'+Cont[k].time+'<small>'+'</div>'+'</li>';
          MessageContent.innerHTML = strAll;
        } else if(Cont.length <= 5){
          document.querySelector('.hide-content').style.display="none";
          $show.append('<li>'+'<div class="">'+'<i class="fas fa-user-circle i-size" title="匿名"></i>：'+'<span class="list-p">'+Cont[k].content+'<span>'+'<br>'+'<small>'+Cont[k].time+'<small>'+'</div>'+'</li>');
        }
      }
      if(snapshot.val()==null){
        document.querySelector('.hide-content').style.display="none";
      }else if(snapshot.val()!=null && Cont.length >5){
        str +='<li>'+'<div class="">'+'<i class="fas fa-user-circle i-size" title="匿名"></i>：'+'<span class="list-p">'+Cont[Cont.length-5].content+'<span>'+'<br>'+'<small>'+Cont[Cont.length-5].time+'<small>'+'</div>'+'</li>'+
        '<li>'+'<div class="">'+'<i class="fas fa-user-circle i-size" title="匿名"></i>：'+'<span class="list-p">'+Cont[Cont.length-4].content+'<span>'+'<br>'+'<small>'+Cont[Cont.length-4].time+'<small>'+'</div>'+'</li>'+
        '<li>'+'<div class="">'+'<i class="fas fa-user-circle i-size" title="匿名"></i>：'+'<span class="list-p">'+Cont[Cont.length-3].content+'<span>'+'<br>'+'<small>'+Cont[Cont.length-3].time+'<small>'+'</div>'+'</li>'+
        '<li>'+'<div class="">'+'<i class="fas fa-user-circle i-size" title="匿名"></i>：'+'<span class="list-p">'+Cont[Cont.length-2].content+'<span>'+'<br>'+'<small>'+Cont[Cont.length-2].time+'<small>'+'</div>'+'</li>'+
        '<li>'+'<div class="">'+'<i class="fas fa-user-circle i-size" title="匿名"></i>：'+'<span class="list-p">'+Cont[Cont.length-1].content+'<span>'+'<br>'+'<small>'+Cont[Cont.length-1].time+'<small>'+'</div>'+'</li>'
        $show.append(str);
      }
  });
  $(document).ready(function(){
    $(".hide-content").click(function(event){
      $("#showAll").toggle();
      $('#show').toggle();
      $("#open-p").toggle();
      $("#close-p").toggle();
      event.preventDefault();
    });
  });
})
$(update).delegate(`.check`,`click`,function(){
var db = firebase.firestore();
var ref = db.collection("個人資料").doc(updateID);
var database = firebase.database().ref(updateID);
var newNumber = document.querySelector(".score2").innerHTML;
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
      id:'id'+ms
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
      var database = firebase.database().ref(updateID);
      var Cont = [];
      var str ='';
      var strAll ='';
      var num = String;
      database.on('value', function(snapshot) {
          $show.html('');
          for(var i in snapshot.val()){
            document.querySelector('.show2').style.display="none";
            Cont.push(snapshot.val()[i]);
          }
          for(var k=0;k<Cont.length;k++){
            Cont = Cont.sort(function (a,b){
                return a.time > b.time ? 1 : -1;
            })
            num=Cont.length;
            document.getElementById('num').innerHTML=num;
            if(snapshot.val()==null){
            }else if(snapshot.val()!=null && Cont.length >5){
              strAll +='<li>'+'<div class="">'+'<i class="fas fa-user-circle i-size" title="匿名"></i>：'+'<span class="list-p">'+Cont[k].content+'<span>'+'<br>'+'<small>'+Cont[k].time+'<small>'+'</div>'+'</li>';
              MessageContent.innerHTML = strAll;
            } else if(Cont.length <= 5){
              document.querySelector('.hide-content').style.display="none";
              $show.append('<li>'+'<div class="">'+'<i class="fas fa-user-circle i-size" title="匿名"></i>：'+'<span class="list-p">'+Cont[k].content+'<span>'+'<br>'+'<small>'+Cont[k].time+'<small>'+'</div>'+'</li>');
            }
          }
          if(snapshot.val()==null){
            document.querySelector('.hide-content').style.display="none";
          }else if(snapshot.val()!=null && Cont.length >5){
            str +='<li>'+'<div class="">'+'<i class="fas fa-user-circle i-size" title="匿名"></i>：'+'<span class="list-p">'+Cont[Cont.length-5].content+'<span>'+'<br>'+'<small>'+Cont[Cont.length-5].time+'<small>'+'</div>'+'</li>'+
            '<li>'+'<div class="">'+'<i class="fas fa-user-circle i-size" title="匿名"></i>：'+'<span class="list-p">'+Cont[Cont.length-4].content+'<span>'+'<br>'+'<small>'+Cont[Cont.length-4].time+'<small>'+'</div>'+'</li>'+
            '<li>'+'<div class="">'+'<i class="fas fa-user-circle i-size" title="匿名"></i>：'+'<span class="list-p">'+Cont[Cont.length-3].content+'<span>'+'<br>'+'<small>'+Cont[Cont.length-3].time+'<small>'+'</div>'+'</li>'+
            '<li>'+'<div class="">'+'<i class="fas fa-user-circle i-size" title="匿名"></i>：'+'<span class="list-p">'+Cont[Cont.length-2].content+'<span>'+'<br>'+'<small>'+Cont[Cont.length-2].time+'<small>'+'</div>'+'</li>'+
            '<li>'+'<div class="">'+'<i class="fas fa-user-circle i-size" title="匿名"></i>：'+'<span class="list-p">'+Cont[Cont.length-1].content+'<span>'+'<br>'+'<small>'+Cont[Cont.length-1].time+'<small>'+'</div>'+'</li>'
            $show.append(str);
          }
      });
    });
})
// function UpData(){
//   var db = firebase.firestore();
//   var ref = db.collection('個人資料').doc('賀照莒');
//   ref.set({
//     name:'賀照莒',
//     No:'(110)中華徵書徵信士第031號',
//     address:"",
//     gender:"女",
//     year:'',
//     work:'',
//     YearsPractice:'',
//     score:'1'
//   },{merge: true}).then(() => {
//     alert('資料成功更新');
//   });
// }


var personnelData =[
  {
    name:'劉邵智',
    No:'(110)中華徵書徵信士第001號',
    address:"",
    gender:"男",
    year:'',
    work:'',
    YearsPractice:'',
    score:'1'
  },
  {
    name:'陳原平',
    No:'(110)中華徵書徵信士第002號',
    address:"",
    gender:"男",
    year:'',
    work:'',
    YearsPractice:'',
    score:'1'
  },
  {
    name:'廖朝基',
    No:'(110)中華徵書徵信士第003號',
    address:"",
    gender:"男",
    year:'',
    work:'',
    YearsPractice:'',
    score:'1'
  },
  {
    name:'許瑞杰',
    No:'(110)中華徵書徵信士第004號',
    address:"",
    gender:"男",
    year:'',
    work:'',
    YearsPractice:'',
    score:'1'
  },
  {
    name:'林采莉',
    No:'(110)中華徵書徵信士第005號',
    address:"",
    gender:"女",
    year:'',
    work:'',
    YearsPractice:'',
    score:'1'
  },
  {
    name:'黃詮稑',
    No:'(110)中華徵書徵信士第006號',
    address:"",
    gender:"男",
    year:'',
    work:'',
    YearsPractice:'',
    score:'1'
  },
  {
    name:'趙柏凱',
    No:'(110)中華徵書徵信士第007號',
    address:"",
    gender:"男",
    year:'',
    work:'',
    YearsPractice:'',
    score:'1'
  },
  {
    name:'邱晶華',
    No:'(110)中華徵書徵信士第008號',
    address:"",
    gender:"女",
    year:'',
    work:'',
    YearsPractice:'',
    score:'1'
  },
  {
    name:'黃鈺期',
    No:'(110)中華徵書徵信士第009號',
    address:"",
    gender:"男",
    year:'',
    work:'',
    YearsPractice:'',
    score:'1'
  },
  {
    name:'王智群',
    No:'(110)中華徵書徵信士第010號',
    address:"",
    gender:"男",
    year:'',
    work:'',
    YearsPractice:'',
    score:'1'
  },
  {
    name:'李宜庭',
    No:'(110)中華徵書徵信士第011號',
    address:"",
    gender:"女",
    year:'',
    work:'',
    YearsPractice:'',
    score:'1'
  },
  {
    name:'邱靖惠',
    No:'(110)中華徵書徵信士第012號',
    address:"",
    gender:"女",
    year:'',
    work:'',
    YearsPractice:'',
    score:'1'
  },
  {
    name:'鄭秉豐',
    No:'(110)中華徵書徵信士第013號',
    address:"",
    gender:"男",
    year:'',
    work:'',
    YearsPractice:'',
    score:'1'
  },
  {
    name:'白羢升',
    No:'(110)中華徵書徵信士第014號',
    address:"",
    gender:"男",
    year:'',
    work:'',
    YearsPractice:'',
    score:'1'
  },
  {
    name:'陳巧旬',
    No:'(110)中華徵書徵信士第015號',
    address:"",
    gender:"男",
    year:'',
    work:'',
    YearsPractice:'',
    score:'1'
  },
  {
    name:'鍾弘泰',
    No:'(110)中華徵書徵信士第016號',
    address:"",
    gender:"男",
    year:'',
    work:'',
    YearsPractice:'',
    score:'1'
  },
  {
    name:'呂嘉豪',
    No:'(110)中華徵書徵信士第017號',
    address:"",
    gender:"男",
    year:'',
    work:'',
    YearsPractice:'',
    score:'1'
  },
  {
    name:'李佳玲',
    No:'(110)中華徵書徵信士第018號',
    address:"",
    gender:"女",
    year:'',
    work:'',
    YearsPractice:'',
    score:'1'
  },
  {
    name:'張佳怡',
    No:'(110)中華徵書徵信士第019號',
    address:"",
    gender:"女",
    year:'',
    work:'',
    YearsPractice:'',
    score:'1'
  },
  {
    name:'劉亭佑',
    No:'(110)中華徵書徵信士第020號',
    address:"",
    gender:"男",
    year:'',
    work:'',
    YearsPractice:'',
    score:'1'
  },
  {
    name:'史文孝',
    No:'(110)中華徵書徵信士第021號',
    address:"",
    gender:"男",
    year:'',
    work:'',
    YearsPractice:'',
    score:'1'
  },
  {
    name:'邱志偉',
    No:'(110)中華徵書徵信士第022號',
    address:"",
    gender:"男",
    year:'',
    work:'',
    YearsPractice:'',
    score:'1'
  },
  {
    name:'許恭碩',
    No:'(110)中華徵書徵信士第023號',
    address:"",
    gender:"男",
    year:'',
    work:'',
    YearsPractice:'',
    score:'1'
  },
  {
    name:'施君達',
    No:'(110)中華徵書徵信士第024號',
    address:"",
    gender:"男",
    year:'',
    work:'',
    YearsPractice:'',
    score:'1'
  },
  {
    name:'歐俊男',
    No:'(110)中華徵書徵信士第025號',
    address:"",
    gender:"",
    year:'',
    work:'',
    YearsPractice:'',
    score:'1'
  },
  {
    name:'巫錦勳',
    No:'(110)中華徵書徵信士第026號',
    address:"",
    gender:"男",
    year:'',
    work:'',
    YearsPractice:'',
    score:'1'
  },
  {
    name:'曾維均',
    No:'(110)中華徵書徵信士第027號',
    address:"",
    gender:"男",
    year:'',
    work:'',
    YearsPractice:'',
    score:'1'
  },
  {
    name:'于輝雄',
    No:'(110)中華徵書徵信士第028號',
    address:"",
    gender:"男",
    year:'',
    work:'',
    YearsPractice:'',
    score:'1'
  },
  {
    name:'許姿伶',
    No:'(110)中華徵書徵信士第029號',
    address:"",
    gender:"女",
    year:'',
    work:'',
    YearsPractice:'',
    score:'1'
  },
  {
    name:'張忠海',
    No:'(110)中華徵書徵信士第030號',
    address:"",
    gender:"男",
    year:'',
    work:'',
    YearsPractice:'',
    score:'1'
  },
  {
    name:'賀照莒',
    No:'(110)中華徵書徵信士第031號',
    address:"",
    gender:"女",
    year:'',
    work:'',
    YearsPractice:'',
    score:'1'
  }
]