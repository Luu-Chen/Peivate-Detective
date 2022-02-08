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
function updata(){
  var str = String;
  var element = document.getElementById('adduserName');
  var str = element.value;
  console.log(str);
  // var db = firebase.firestore();
  // var ref = db.collection('個人資料').doc(str);
}

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



