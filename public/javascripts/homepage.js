$(function(){
    var charCountContainer = $("#char-count");
    var tweetTa = $("#tweet-ta");
    var tweetBtn = $("#tweet-btn");
    var tweetFrom = $("#tweet-form");
    var tweetTableBody = $("#tweet-table-body");
    var dropDownContainer = $("#drop-down-container");
    var dropDownSelector = $("#drop-down-selector");
    var dropDownFrom = $("#drop-down-form");
    var tweetContainer = $("#tweet-container");

    var registerBtn = $("#register-btn");
    var signInBtn = $("#sign-in-btn");

    var regModal = $("#reg-modal");
    var regForm = $("#reg-form");

    var signInModal = $("#signin-modal");
    var signInForm = $("#signin-form");


    function updateCount(number){
        charCountContainer.html(number);
    }

    function createTweet(tweetBody){

        var content = `
        <div class="tweet-box">
        <p class="author">Truman Capote <span>@personTwitter</span></p>
        <p>${tweetBody}</p>
        </div>
        `;
        tweetContainer.prepend(content);
        
    }
    

    tweetTa.on("change keydown keyup paste", function(event){
        var tweetLength = $(this).val().length;
        updateCount(tweetLength);
        tweetBtn.prop('disabled', (tweetLength > 140));       
        if($(this).val().substr(-1) === '@'){
            dropDownContainer.css({"display":"block"});
            dropDownSelector.focus();
        } else{
            dropDownContainer.css({"display":"none"});
        }
    });

    tweetFrom.on("submit", function(event){
        event.preventDefault();
        createTweet(tweetTa.val());
        tweetFrom[0].reset();
        updateCount(0);
    });

    dropDownFrom.on("submit", function(event){
        // event.preventDefault();
        console.log('submitted');
        // console.log($(this).val());
    });


    registerBtn.on("click", function(event){
    });

    //todo - ask Thi about this section of code
    function formDataToJson(serlalizedArray){
        var returnData = {}
        $.map(serlalizedArray, function (value, index){
            returnData[value["name"]] = value["value"];
        });
        return returnData;
    }

    regForm.on("submit", function(event){
        event.preventDefault();
        console.log("submitted");
        
        var formData = formDataToJson($(this).serializeArray());
        console.log(formData["password"] == formData["re-password"]);
        console.log(formData);
        $.ajax({
            method: "POST",
            url:"/users",
            data: formData,
        }).done( function(res){
            console.log(res);
            regForm[0].reset();
            regModal.modal("hide");
        });
        
    });

    

    signInBtn.on("click", function(event){
        console.log("clicked here too");
    });

    signInForm.on("submit", function(event){
        event.preventDefault();
        console.log("logged-on");
        console.log(formDataToJson($(this).serializeArray()));
        $(this)[0].reset();
        signInModal.modal("hide");
    })

    
});