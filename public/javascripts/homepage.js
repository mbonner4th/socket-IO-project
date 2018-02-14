$(function(){
    var charCountContainer = $("#char-count");

    var followBtn = $("#follow-btn");

    var tweetTa = $("#tweet-ta");
    var tweetAuthor = $("#tweet-author");
    var tweetBtn = $("#tweet-btn");
    var tweetFrom = $("#tweet-form");

    var loadingSpinner = $("#loading-spinner");

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
    
    var logoutBtn = $('#logout-btn');
    
    var socket = io();


    socket.on('newTweet', function(data){
        console.log("new tweet recived");
        console.log(data);
        createTweet(data.body, data.User.handle)
    });

    socket.on('connect', function(){
        console.log("connected")
        getUser();
    })

    function getUser(){
        $.ajax({
            method:'GET',
            url: '/user',
        }).done(function(user){
            console.log("user");
        });
    }
    


    function getAllTweets(){
        $.ajax({
            method:'GET',
            url: '/tweets',
        }).done(function(res){
            $.map(res, function(val, i){
                createTweet(val.body, val.User.handle);
            });
            loadingSpinner.css('display', 'none');
        });
    }
    getAllTweets();

    /* updates the character count on the tweet-box */
    function updateCount(number){
        charCountContainer.html(number);
    }


    function createTweet(tweetBody, tweetAuthor){
        var content = `
        <div class="tweet-box">
        <p class="author">${tweetAuthor} <span>@${tweetAuthor}</span></p>
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
            // dropDownContainer.css({"display":"block"});
            // dropDownSelector.focus();
        } else{
            dropDownContainer.css({"display":"none"});
        }
    });

    tweetFrom.on("submit", function(event){
        event.preventDefault();
        $.ajax({
            method:'POST',
            url: '/tweets',
            data: {
                body: tweetTa.val()
            }

        }).done(function(res){
            createTweet(tweetTa.val(), tweetAuthor.val());
            tweetFrom[0].reset();
            console.log('new tweet here');
            updateCount(0);
        });
        
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

    logoutBtn.on('click', function(event){
        $.ajax({
            method: "GET",
            url: "/auth/logout",

        }).done(
            console.log("logged out")
        );
    });

    followBtn.on('click', function(event){
        console.log(followBtn.val());
        $.ajax({
            method: "PUT",
            url: `/user/follow/${followBtn.val()}`,
            data: followBtn.val(),

        }).done(
            console.log("now following")
        );
    })
    
});