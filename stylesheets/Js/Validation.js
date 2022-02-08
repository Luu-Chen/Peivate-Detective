$(function() { 
    $.validator.addMethod(
        "regex",
        function(value, element, regexp) {
            var check = false;
            return this.optional(element) || regexp.test(value);
        }
    );
    //會員資料表單
    $("#contact_form-one").validate({ 
        errorClass: "my-error",
        validClass: "my-valid",
        rules: { 
            username: { //使用者名稱必填 至少2位 不能輸入數字
                required: true,
                regex : /^[\u4E00-\u9FA5]+$/,                
                minlength: 2 ,            
            },
            address: { //出生地必填 
                required: true 
            },
            telephone: { //手機必填 驗證格式 
                required: true, 
                minlength: 10,
                maxlength: 10,
                regex :/^(09)[0-9]{8}$/
            }           
        }, 
        messages: { 
            username: { 
                required: "名稱不能為空!", 
                minlength: "名稱至少2位!",
                regex:"輸入格式不能含有數字、符號或不是中文"
            }, 
            address: { 
                required: "此欄不能為空!"
            },
            telephone: { 
                required: "手機不能為空!", 
                minlength: "手機格式不正確", 
                maxlength:"號碼不正確",
                regex :"號碼不正確"
            }
        },
    });
    //新增會員表單
    $("#add").validate({ 
        errorClass: "my-error",
        validClass: "my-valid",
        rules: { 
            username: { //使用者名稱必填 至少2位 不能輸入數字
                required: true,
                regex : /^[\u4E00-\u9FA5]+$/,
                minlength: 2 ,            
            },
            gender: { //性別
                required:true
            },
            year:{
                required:true,
                number: true
            },
            address: { //出生地必填 
                required: true 
            },
            work:{ //工作經驗
                required: true,
            },
            telephone: { //手機必填 驗證格式 
                required: true, 
                minlength: 10,
                maxlength: 10,
                regex :/^(09)[0-9]{8}$/
            }, 
            picture:{
                required:true
            },
            exp:{ //承辦經驗
                required:true
            },
            exp1:{ //承辦經驗
                required:true
            },
            exp2:{ //承辦經驗
                required:true
            },
            exp3:{ //承辦經驗
                required:true
            },
            exp4:{ //承辦經驗
                required:true
            },
            exp5:{ //承辦經驗
                required:true
            },
            exp6:{ //承辦經驗
                required:true
            },
            exp7:{ //承辦經驗
                required:true
            },
            exp8:{ //承辦經驗
                required:true
            },
            exp9:{ //承辦經驗
                required:true
            },
            exp10:{ //承辦經驗
                required:true
            },
            exp11:{ //承辦經驗
                required:true
            },
            exp12:{ //承辦經驗
                required:true
            },
            exp13:{ //承辦經驗
                required:true
            },
            exp14:{ //承辦經驗
                required:true
            },
            exp15:{ //承辦經驗
                required:true
            },
            exp16:{ //承辦經驗
                required:true
            },
            exp17:{ //承辦經驗
                required:true
            },
            exp18:{ //承辦經驗
                required:true
            },
            exp19:{ //承辦經驗
                required:true
            },
            exp20:{ //承辦經驗
                required:true
            },
            exp21:{ //承辦經驗
                required:true
            },
            exp22:{ //承辦經驗
                required:true
            },
            exp23:{ //承辦經驗
                required:true
            },
            exp24:{ //承辦經驗
                required:true
            },
            exp25:{ //承辦經驗
                required:true
            },
            exp26:{ //承辦經驗
                required:true
            },
            exp27:{ //承辦經驗
                required:true
            },
            exp28:{ //承辦經驗
                required:true
            },
            exp29:{ //承辦經驗
                required:true
            },
            exp30:{ //承辦經驗
                required:true
            },
            exp31:{ //承辦經驗
                required:true
            },
            exp32:{ //承辦經驗
                required:true
            },
            exp33:{ //承辦經驗
                required:true
            },
            exp34:{ //承辦經驗
                required:true
            },
            exp35:{ //承辦經驗
                required:true
            },
            exp36:{ //承辦經驗
                required:true
            },
            exp37:{ //承辦經驗
                required:true
            },
            exp38:{ //承辦經驗
                required:true
            },
            exp39:{ //承辦經驗
                required:true
            },
            exp40:{ //承辦經驗
                required:true
            },
            exp41:{ //承辦經驗
                required:true
            },
            exp42:{ //承辦經驗
                required:true
            },
            exp43:{ //承辦經驗
                required:true
            },
            case:{
                required: true,
                number:true
            },
            case1:{
                required: true,
                number:true
            },
            case2:{
                required:true,
                number:true
            },
            case3:{
                required:true,
                number:true
            },
            case4:{
                required:true,
                number:true
            },
            case5:{
                required:true,
                number:true
            },
            case6:{
                required:true,
                number:true
            },
            case7:{
                required:true,
                number:true
            },
            case8:{
                required:true,
                number:true
            },
            case9:{
                required:true,
                number:true
            },
            case10:{
                required:true,
                number:true
            },
            case11:{
                required:true,
                number:true
            },
            case12:{
                required:true,
                number:true
            },
            case13:{
                required:true,
                number:true
            },
            case14:{
                required:true,
                number:true
            },
            case15:{
                required:true,
                number:true
            },
            case16:{
                required:true,
                number:true
            },
            case17:{
                required:true,
                number:true
            },
            case18:{
                required:true,
                number:true
            },
            case19:{
                required:true,
                number:true
            },
            case20:{
                required:true,
                number:true
            },
            case21:{
                required:true,
                number:true
            },
            case22:{
                required:true,
                number:true
            },
            case23:{
                required:true,
                number:true
            },
            case24:{
                required:true,
                number:true
            },
            case25:{
                required:true,
                number:true
            },
            case26:{
                required:true,
                number:true
            },
            case27:{
                required:true,
                number:true
            },
            case28:{
                required:true,
                number:true
            },
            case29:{
                required:true,
                number:true
            },
            case30:{
                required:true,
                number:true
            },
            case31:{
                required:true,
                number:true
            },
            case32:{
                required:true,
                number:true
            },
            case33:{
                required:true,
                number:true
            },
            case34:{
                required:true,
                number:true
            },
            case35:{
                required:true,
                number:true
            },
            case36:{
                required:true,
                number:true
            },
            case37:{
                required:true,
                number:true
            },
            case38:{
                required:true,
                number:true
            },
            case39:{
                required:true,
                number:true
            },
            case40:{
                required:true,
                number:true
            },
            case41:{
                required:true,
                number:true
            },
            case42:{
                required:true,
                number:true
            },
            case43:{
                required:true,
                number:true
            },
            email: { //email必填 驗證格式 
                required: true, 
                email: true 
            }, 
        }, 
        messages: { 
            username: { 
                required: "名稱不能為空!", 
                minlength: "名稱至少2位!",
                regex:"輸入格式不能含有數字、符號或不是中文"
            }, 
            gender:{
                required:"請選擇性別!"
            },
            year:{
                required:"此欄不能為空!",
                number:"輸入格式不正確"
            },
            address: { 
                required: "此欄不能為空!"
            },
            work: { 
                required: "此欄不能為空!", 
            }, 
            telephone: { 
                required: "手機不能為空!", 
                minlength: "手機格式不正確", 
                maxlength:"號碼不正確",
                regex :"號碼不正確"
            },
            picture:{
                required:"請提供照片"
            },
            exp:{
                required:"請選擇項目!"
            },
            exp1:{
                required:"請選擇項目!"
            },
            exp2:{
                required:"請選擇項目!"
            },
            exp3:{
                required:"請選擇項目!"
            },
            exp4:{
                required:"請選擇項目!"
            },
            exp5:{
                required:"請選擇項目!"
            },
            exp6:{
                required:"請選擇項目!"
            },
            exp7:{
                required:"請選擇項目!"
            },
            exp8:{
                required:"請選擇項目!"
            },
            exp9:{
                required:"請選擇項目!"
            },
            exp10:{
                required:"請選擇項目!"
            },
            exp11:{
                required:"請選擇項目!"
            },
            exp12:{
                required:"請選擇項目!"
            },
            exp13:{
                required:"請選擇項目!"
            },
            exp14:{
                required:"請選擇項目!"
            },
            exp15:{
                required:"請選擇項目!"
            },
            exp16:{
                required:"請選擇項目!"
            },
            exp17:{
                required:"請選擇項目!"
            },
            exp18:{
                required:"請選擇項目!"
            },
            exp19:{
                required:"請選擇項目!"
            },
            exp20:{
                required:"請選擇項目!"
            },
            exp21:{
                required:"請選擇項目!"
            },
            exp22:{
                required:"請選擇項目!"
            },
            exp23:{
                required:"請選擇項目!"
            },
            exp24:{
                required:"請選擇項目!"
            },
            exp25:{
                required:"請選擇項目!"
            },
            exp26:{
                required:"請選擇項目!"
            },
            exp27:{
                required:"請選擇項目!"
            },
            exp28:{
                required:"請選擇項目!"
            },
            exp29:{
                required:"請選擇項目!"
            },
            exp30:{
                required:"請選擇項目!"
            },
            exp31:{
                required:"請選擇項目!"
            },
            exp32:{
                required:"請選擇項目!"
            },
            exp33:{
                required:"請選擇項目!"
            },
            exp34:{
                required:"請選擇項目!"
            },
            exp35:{
                required:"請選擇項目!"
            },
            exp36:{
                required:"請選擇項目!"
            },
            exp37:{
                required:"請選擇項目!"
            },
            exp38:{
                required:"請選擇項目!"
            },
            exp39:{
                required:"請選擇項目!"
            },
            exp40:{
                required:"請選擇項目!"
            },
            exp41:{
                required:"請選擇項目!"
            },
            exp42:{
                required:"請選擇項目!"
            },
            exp43:{
                required:"請選擇項目!"
            },
            case:{
                required:"此欄不能為空!",
                number:"只能輸入數字"
            },
            case1:{
                required:"此欄不能為空!",
                number:"只能輸入數字"
            },
            case2:{
                required:"此欄不能為空!",
                number:"只能輸入數字"
            },
            case3:{
                required:"此欄不能為空!",
                number:"只能輸入數字"
            },
            case4:{
                required:"此欄不能為空!",
                number:"只能輸入數字"
            },
            case5:{
                required:"此欄不能為空!",
                number:"只能輸入數字"
            },
            case6:{
                required:"此欄不能為空!",
                number:"只能輸入數字"
            },
            case7:{
                required:"此欄不能為空!",
                number:"只能輸入數字"
            },
            case8:{
                required:"此欄不能為空!",
                number:"只能輸入數字"
            },
            case9:{
                required:"此欄不能為空!",
                number:"只能輸入數字"
            },
            case10:{
                required:"此欄不能為空!",
                number:"只能輸入數字"
            },
            case11:{
                required:"此欄不能為空!",
                number:"只能輸入數字"
            },
            case12:{
                required:"此欄不能為空!",
                number:"只能輸入數字"
            },
            case13:{
                required:"此欄不能為空!",
                number:"只能輸入數字"
            },
            case14:{
                required:"此欄不能為空!",
                number:"只能輸入數字"
            },
            case15:{
                required:"此欄不能為空!",
                number:"只能輸入數字"
            },
            case16:{
                required:"此欄不能為空!",
                number:"只能輸入數字"
            },
            case17:{
                required:"此欄不能為空!",
                number:"只能輸入數字"
            },
            case18:{
                required:"此欄不能為空!",
                number:"只能輸入數字"
            },
            case19:{
                required:"此欄不能為空!",
                number:"只能輸入數字"
            },
            case20:{
                required:"此欄不能為空!",
                number:"只能輸入數字"
            },
            case21:{
                required:"此欄不能為空!",
                number:"只能輸入數字"
            },
            case22:{
                required:"此欄不能為空!",
                number:"只能輸入數字"
            },
            case23:{
                required:"此欄不能為空!",
                number:"只能輸入數字"
            },
            case24:{
                required:"此欄不能為空!",
                number:"只能輸入數字"
            },
            case25:{
                required:"此欄不能為空!",
                number:"只能輸入數字"
            },
            case26:{
                required:"此欄不能為空!",
                number:"只能輸入數字"
            },
            case27:{
                required:"此欄不能為空!",
                number:"只能輸入數字"
            },
            case28:{
                required:"此欄不能為空!",
                number:"只能輸入數字"
            },
            case29:{
                required:"此欄不能為空!",
                number:"只能輸入數字"
            },
            case30:{
                required:"此欄不能為空!",
                number:"只能輸入數字"
            },
            case31:{
                required:"此欄不能為空!",
                number:"只能輸入數字"
            },
            case32:{
                required:"此欄不能為空!",
                number:"只能輸入數字"
            },
            case33:{
                required:"此欄不能為空!",
                number:"只能輸入數字"
            },
            case34:{
                required:"此欄不能為空!",
                number:"只能輸入數字"
            },
            case35:{
                required:"此欄不能為空!",
                number:"只能輸入數字"
            },
            case36:{
                required:"此欄不能為空!",
                number:"只能輸入數字"
            },
            case37:{
                required:"此欄不能為空!",
                number:"只能輸入數字"
            },
            case38:{
                required:"此欄不能為空!",
                number:"只能輸入數字"
            },
            case39:{
                required:"此欄不能為空!",
                number:"只能輸入數字"
            },
            case40:{
                required:"此欄不能為空!",
                number:"只能輸入數字"
            },
            case41:{
                required:"此欄不能為空!",
                number:"只能輸入數字"
            },
            case42:{
                required:"此欄不能為空!",
                number:"只能輸入數字"
            },
            case43:{
                required:"此欄不能為空!",
                number:"只能輸入數字"
            },
            email: { 
                required: "郵箱不能為空!", 
                email: "郵箱格式不正確", 
            }, 
        },
    });
    //電腦版登入表單
    $("#login").validate({ 
        errorClass: "my-error",
        validClass: "my-valid",
        rules: { 
            password: { //密碼必填 至少6位 
                required: true, 
                minlength: 6 
            }, 
            email: { //email必填 驗證格式 
                required: true,
                email: true,
                regex: /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
            }, 
        }, 
        messages: { 
            password: { 
                required: "密碼不能為空!", 
                minlength: "密碼至少六位!" 
            }, 
            email: { 
                required: "不能為空!", 
                email: "格式不正確" ,
                regex :"格式不正確"
            }, 
        },
    });
    //電腦版註冊表單
    $("#Create").validate({ 
        errorClass: "my-error",
        validClass: "my-valid",
        rules: { 
            username: { //使用者名稱必填 至少2位 不能輸入數字
                required: true,
                regex : /^[a-zA-Z\s]+$/,
                minlength: 2 ,            
            },
            password: { //密碼必填 至少6位 
                required: true, 
                minlength: 6 
            }, 
            confirm_password: { //密碼確認 
                required: true, 
                equalTo: "#sign-password" 
            },
            email: { //email必填 驗證格式 
                required: true, 
                email: true ,
                regex: /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
            }, 
        }, 
        messages: { 
            username: { 
                required: "名稱不能為空!", 
                minlength: "名稱至少2位!",
                regex:"輸入格式不能含有數字、符號"
            }, 
            password: { 
                required: "密碼不能為空!", 
                minlength: "密碼至少六位!" 
            }, 
            confirm_password: { 
                required: "密碼確認不能為空!", 
                equalTo: "兩次輸入密碼不一致 !" 
            }, 
            email: { 
                required: "不能為空!", 
                email: "格式不正確", 
                regex :"格式不正確"
            }, 
        },
    });
    //手機板登入表單
    $("#login-mobil").validate({ 
        errorClass: "my-error",
        validClass: "my-valid",
        rules: { 
            password: { //密碼必填 至少6位 
                required: true, 
                minlength: 6 
            }, 
            email: { //email必填 驗證格式 
                required: true,
                email: true,
                regex: /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
            }, 
        }, 
        messages: { 
            password: { 
                required: "密碼不能為空!", 
                minlength: "密碼至少六位!" 
            }, 
            email: { 
                required: "不能為空!", 
                email: "格式不正確" ,
                regex :"格式不正確"
            }, 
        },
    });
    //手機板註冊表單
    $("#Create-mobil").validate({ 
        errorClass: "my-error",
        validClass: "my-valid",
        rules: { 
            username: { //使用者名稱必填 至少2位 不能輸入數字
                required: true,
                regex : /^[a-zA-Z\s]+$/,
                minlength: 2 ,            
            },
            password: { //密碼必填 至少6位 
                required: true, 
                minlength: 6 
            }, 
            confirm_password: { //密碼確認 
                required: true, 
                equalTo: "#mobil-sign-password" 
            },
            email: { //email必填 驗證格式 
                required: true, 
                email: true ,
                regex: /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
            }, 
        }, 
        messages: { 
            username: { 
                required: "名稱不能為空!", 
                minlength: "名稱至少2位!",
                regex:"輸入格式不能含有數字、符號"
            }, 
            password: { 
                required: "密碼不能為空!", 
                minlength: "密碼至少六位!" 
            }, 
            confirm_password: { 
                required: "密碼確認不能為空!", 
                equalTo: "兩次輸入密碼不一致 !" 
            }, 
            email: { 
                required: "不能為空!", 
                email: "格式不正確", 
                regex :"格式不正確"
            }, 
        },
    });
    //手機板登入驗證鈕
    $('#login-btn').click(function() {
        $("#login-mobil").valid();        
    });
    //手機板註冊驗證鈕
    $('#sign-btn').click(function() {
        $("#Create-mobil").valid();        
    });

    //忘記密碼
    $("#forgot-password").validate({ 
        errorClass: "my-error",
        validClass: "my-valid",
        rules: { 
            email: { //email必填 驗證格式 
                required: true,
                email: true,
                regex: /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
            }, 
        }, 
        messages: { 
            email: { 
                required: "不能為空!", 
                email: "格式不正確" ,
                regex :"格式不正確"
            }, 
        },
    });

    //修改
    $("#Revise").validate({ 
        errorClass: "my-error",
        validClass: "my-valid",
        rules: { 
            username: { //使用者名稱必填 至少2位 不能輸入數字
                required: true,
                regex : /^[\u4E00-\u9FA5]+$/,
                minlength: 2 ,            
            },
            gender: { //性別
                required:true
            },
            year:{
                required:true,
                number: true
            },
            address: { //出生地必填 
                required: true 
            },
            work:{ //工作經驗
                required: true,
            },
            telephone: { //手機必填 驗證格式 
                required: true, 
                minlength: 10,
                maxlength: 10,
                regex :/^(09)[0-9]{8}$/
            },
            score:{
                number: true,
                required:true,
                min:1
            },
            exp:{ //承辦經驗
                required:true
            },
            exp1:{ //承辦經驗
                required:true
            },
            exp2:{ //承辦經驗
                required:true
            },
            exp3:{ //承辦經驗
                required:true
            },
            exp4:{ //承辦經驗
                required:true
            },
            exp5:{ //承辦經驗
                required:true
            },
            exp6:{ //承辦經驗
                required:true
            },
            exp7:{ //承辦經驗
                required:true
            },
            exp8:{ //承辦經驗
                required:true
            },
            exp9:{ //承辦經驗
                required:true
            },
            exp10:{ //承辦經驗
                required:true
            },
            exp11:{ //承辦經驗
                required:true
            },
            exp12:{ //承辦經驗
                required:true
            },
            exp13:{ //承辦經驗
                required:true
            },
            exp14:{ //承辦經驗
                required:true
            },
            exp15:{ //承辦經驗
                required:true
            },
            exp16:{ //承辦經驗
                required:true
            },
            exp17:{ //承辦經驗
                required:true
            },
            exp18:{ //承辦經驗
                required:true
            },
            exp19:{ //承辦經驗
                required:true
            },
            exp20:{ //承辦經驗
                required:true
            },
            exp21:{ //承辦經驗
                required:true
            },
            exp22:{ //承辦經驗
                required:true
            },
            exp23:{ //承辦經驗
                required:true
            },
            exp24:{ //承辦經驗
                required:true
            },
            exp25:{ //承辦經驗
                required:true
            },
            exp26:{ //承辦經驗
                required:true
            },
            exp27:{ //承辦經驗
                required:true
            },
            exp28:{ //承辦經驗
                required:true
            },
            exp29:{ //承辦經驗
                required:true
            },
            exp30:{ //承辦經驗
                required:true
            },
            exp31:{ //承辦經驗
                required:true
            },
            exp32:{ //承辦經驗
                required:true
            },
            exp33:{ //承辦經驗
                required:true
            },
            exp34:{ //承辦經驗
                required:true
            },
            exp35:{ //承辦經驗
                required:true
            },
            exp36:{ //承辦經驗
                required:true
            },
            exp37:{ //承辦經驗
                required:true
            },
            exp38:{ //承辦經驗
                required:true
            },
            exp39:{ //承辦經驗
                required:true
            },
            exp40:{ //承辦經驗
                required:true
            },
            exp41:{ //承辦經驗
                required:true
            },
            exp42:{ //承辦經驗
                required:true
            },
            exp43:{ //承辦經驗
                required:true
            },
            case:{
                required: true,
                number:true
            },
            case1:{
                required: true,
                number:true
            },
            case2:{
                required:true,
                number:true
            },
            case3:{
                required:true,
                number:true
            },
            case4:{
                required:true,
                number:true
            },
            case5:{
                required:true,
                number:true
            },
            case6:{
                required:true,
                number:true
            },
            case7:{
                required:true,
                number:true
            },
            case8:{
                required:true,
                number:true
            },
            case9:{
                required:true,
                number:true
            },
            case10:{
                required:true,
                number:true
            },
            case11:{
                required:true,
                number:true
            },
            case12:{
                required:true,
                number:true
            },
            case13:{
                required:true,
                number:true
            },
            case14:{
                required:true,
                number:true
            },
            case15:{
                required:true,
                number:true
            },
            case16:{
                required:true,
                number:true
            },
            case17:{
                required:true,
                number:true
            },
            case18:{
                required:true,
                number:true
            },
            case19:{
                required:true,
                number:true
            },
            case20:{
                required:true,
                number:true
            },
            case21:{
                required:true,
                number:true
            },
            case22:{
                required:true,
                number:true
            },
            case23:{
                required:true,
                number:true
            },
            case24:{
                required:true,
                number:true
            },
            case25:{
                required:true,
                number:true
            },
            case26:{
                required:true,
                number:true
            },
            case27:{
                required:true,
                number:true
            },
            case28:{
                required:true,
                number:true
            },
            case29:{
                required:true,
                number:true
            },
            case30:{
                required:true,
                number:true
            },
            case31:{
                required:true,
                number:true
            },
            case32:{
                required:true,
                number:true
            },
            case33:{
                required:true,
                number:true
            },
            case34:{
                required:true,
                number:true
            },
            case35:{
                required:true,
                number:true
            },
            case36:{
                required:true,
                number:true
            },
            case37:{
                required:true,
                number:true
            },
            case38:{
                required:true,
                number:true
            },
            case39:{
                required:true,
                number:true
            },
            case40:{
                required:true,
                number:true
            },
            case41:{
                required:true,
                number:true
            },
            case42:{
                required:true,
                number:true
            },
            case43:{
                required:true,
                number:true
            }
        }, 
        messages: { 
            username: { 
                required: "名稱不能為空!", 
                minlength: "名稱至少2位!",
                regex:"輸入格式不能含有數字、符號或不是中文"
            }, 
            gender:{
                required:"請選擇性別!"
            },
            year:{
                required:"此欄不能為空!",
                number:"輸入格式不正確"
            },
            address: { 
                required: "此欄不能為空!"
            },
            work: { 
                required: "此欄不能為空!", 
            }, 
            telephone: { 
                required: "手機不能為空!", 
                minlength: "手機格式不正確", 
                maxlength:"號碼不正確",
                regex :"號碼不正確"
            },
            score:{
                number: "只能輸入數字",
                required:"此欄不能為空!",
                min:"最小值需為 1",
            },
            cel0:{
                required:"請選擇項目!"
            },
            cel1:{
                required:"請選擇項目!"
            },
            cel2:{
                required:"請選擇項目!"
            },
            cel3:{
                required:"請選擇項目!"
            },
            cel4:{
                required:"請選擇項目!"
            },
            cel5:{
                required:"請選擇項目!"
            },
            cel6:{
                required:"請選擇項目!"
            },
            cel7:{
                required:"請選擇項目!"
            },
            cel8:{
                required:"請選擇項目!"
            },
            cel9:{
                required:"請選擇項目!"
            },
            cel10:{
                required:"請選擇項目!"
            },
            cel11:{
                required:"請選擇項目!"
            },
            cel12:{
                required:"請選擇項目!"
            },
            cel13:{
                required:"請選擇項目!"
            },
            cel14:{
                required:"請選擇項目!"
            },
            cel15:{
                required:"請選擇項目!"
            },
            cel16:{
                required:"請選擇項目!"
            },
            cel17:{
                required:"請選擇項目!"
            },
            cel18:{
                required:"請選擇項目!"
            },
            cel19:{
                required:"請選擇項目!"
            },
            cel20:{
                required:"請選擇項目!"
            },
            cel21:{
                required:"請選擇項目!"
            },
            cel22:{
                required:"請選擇項目!"
            },
            cel23:{
                required:"請選擇項目!"
            },
            cel24:{
                required:"請選擇項目!"
            },
            cel25:{
                required:"請選擇項目!"
            },
            cel26:{
                required:"請選擇項目!"
            },
            cel27:{
                required:"請選擇項目!"
            },
            cel28:{
                required:"請選擇項目!"
            },
            cel29:{
                required:"請選擇項目!"
            },
            cel30:{
                required:"請選擇項目!"
            },
            cel31:{
                required:"請選擇項目!"
            },
            cel32:{
                required:"請選擇項目!"
            },
            cel33:{
                required:"請選擇項目!"
            },
            cel34:{
                required:"請選擇項目!"
            },
            cel35:{
                required:"請選擇項目!"
            },
            cel36:{
                required:"請選擇項目!"
            },
            cel37:{
                required:"請選擇項目!"
            },
            cel38:{
                required:"請選擇項目!"
            },
            cel39:{
                required:"請選擇項目!"
            },
            cel40:{
                required:"請選擇項目!"
            },
            cel41:{
                required:"請選擇項目!"
            },
            cel42:{
                required:"請選擇項目!"
            },
            cel43:{
                required:"請選擇項目!"
            },
            kd0:{
                required:"此欄不能為空!",
                number:"只能輸入數字"
            },
            kd1:{
                required:"此欄不能為空!",
                number:"只能輸入數字"
            },
            kd2:{
                required:"此欄不能為空!",
                number:"只能輸入數字"
            },
            kd3:{
                required:"此欄不能為空!",
                number:"只能輸入數字"
            },
            kd4:{
                required:"此欄不能為空!",
                number:"只能輸入數字"
            },
            kd5:{
                required:"此欄不能為空!",
                number:"只能輸入數字"
            },
            kd6:{
                required:"此欄不能為空!",
                number:"只能輸入數字"
            },
            kd7:{
                required:"此欄不能為空!",
                number:"只能輸入數字"
            },
            kd8:{
                required:"此欄不能為空!",
                number:"只能輸入數字"
            },
            kd9:{
                required:"此欄不能為空!",
                number:"只能輸入數字"
            },
            kd10:{
                required:"此欄不能為空!",
                number:"只能輸入數字"
            },
            kd11:{
                required:"此欄不能為空!",
                number:"只能輸入數字"
            },
            kd12:{
                required:"此欄不能為空!",
                number:"只能輸入數字"
            },
            kd13:{
                required:"此欄不能為空!",
                number:"只能輸入數字"
            },
            kd14:{
                required:"此欄不能為空!",
                number:"只能輸入數字"
            },
            kd15:{
                required:"此欄不能為空!",
                number:"只能輸入數字"
            },
            kd16:{
                required:"此欄不能為空!",
                number:"只能輸入數字"
            },
            kd17:{
                required:"此欄不能為空!",
                number:"只能輸入數字"
            },
            kd18:{
                required:"此欄不能為空!",
                number:"只能輸入數字"
            },
            kd19:{
                required:"此欄不能為空!",
                number:"只能輸入數字"
            },
            kd20:{
                required:"此欄不能為空!",
                number:"只能輸入數字"
            },
            kd21:{
                required:"此欄不能為空!",
                number:"只能輸入數字"
            },
            kd22:{
                required:"此欄不能為空!",
                number:"只能輸入數字"
            },
            kd23:{
                required:"此欄不能為空!",
                number:"只能輸入數字"
            },
            kd24:{
                required:"此欄不能為空!",
                number:"只能輸入數字"
            },
            kd25:{
                required:"此欄不能為空!",
                number:"只能輸入數字"
            },
            kd26:{
                required:"此欄不能為空!",
                number:"只能輸入數字"
            },
            kd27:{
                required:"此欄不能為空!",
                number:"只能輸入數字"
            },
            kd28:{
                required:"此欄不能為空!",
                number:"只能輸入數字"
            },
            kd29:{
                required:"此欄不能為空!",
                number:"只能輸入數字"
            },
            kd30:{
                required:"此欄不能為空!",
                number:"只能輸入數字"
            },
            kd31:{
                required:"此欄不能為空!",
                number:"只能輸入數字"
            },
            kd32:{
                required:"此欄不能為空!",
                number:"只能輸入數字"
            },
            kd33:{
                required:"此欄不能為空!",
                number:"只能輸入數字"
            },
            kd34:{
                required:"此欄不能為空!",
                number:"只能輸入數字"
            },
            kd35:{
                required:"此欄不能為空!",
                number:"只能輸入數字"
            },
            kd36:{
                required:"此欄不能為空!",
                number:"只能輸入數字"
            },
            kd37:{
                required:"此欄不能為空!",
                number:"只能輸入數字"
            },
            kd38:{
                required:"此欄不能為空!",
                number:"只能輸入數字"
            },
            kd39:{
                required:"此欄不能為空!",
                number:"只能輸入數字"
            },
            kd40:{
                required:"此欄不能為空!",
                number:"只能輸入數字"
            },
            kd41:{
                required:"此欄不能為空!",
                number:"只能輸入數字"
            },
            kd42:{
                required:"此欄不能為空!",
                number:"只能輸入數字"
            },
            kd43:{
                required:"此欄不能為空!",
                number:"只能輸入數字"
            }
        },
    });

}) 


