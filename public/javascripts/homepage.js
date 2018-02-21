$(function(){
    var charCountContainer = $("#char-count");

    var followBtn = $("#follow-btn");
    var unfollowBtn = $("#unfollow-btn");

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

    var currentUser = $("#current-user");
    //console.log(currentUser.val());
    
    var logoutBtn = $('#logout-btn');
    
    var socket = io();


    socket.on('newTweet', function(tweet){
        console.log("new tweet recived");
        createTweet(tweet);
    });

    socket.on('connect', function(){
        console.log("connected")
    })

    function getUser(){
        $.ajax({
            method:'GET',
            url: '/user',
        }).done(function(user){
            console.log("user");
        });
    }
    


    var userTweets= [];
    var followingTweets = [];
    var allTweets = [];

    function getAllTweets(){
        $.ajax({
            method:'GET',
            url: '/tweets',
        }).done(function(res){
            $.map(res, function(val, i){
                userTweets.push(val);
                allTweets.push(val);
            });
            getFollowingTweets();
        });
    }
   

    function getFollowingTweets(){
        $.ajax({
            method: "GET",
            url: '/tweets/following',
        }).done(function(res){
            
            $.map(res, function(val, i){
                followingTweets.push(val);
                allTweets.push(val);
            });
            allTweets.sort(function(tweet1, tweet2){
                return new Date(tweet1.date) > new Date(tweet2.date);
            })

            $.map(allTweets, function(val, i){
                createTweet(val);
            })
            loadingSpinner.css('display', 'none');
        });
    }
    
     getAllTweets();

    /* updates the character count on the tweet-box */
    function updateCount(number){
        charCountContainer.html(number);
    }

    var months = {
        0: "Jan",
        1: "feb",
        2: "mar",
        3: "apr",
        4: "may",
        5: "june",
        6: "july",
        7: "aug",
        8: "sep",
        9: "oct",
        10: "nov",
        11: "dec",
    }

    function createTweet(tweet){
        var tweetDate = new Date(tweet.date);
        var month = months[tweetDate.getMonth()];
        var date = tweetDate.getDate();
        var hour = tweetDate.getHours();
        var minute = tweetDate.getMinutes();
        var linkedTweetBody = linkTweet(tweet.body);
        var content = `
        <div class="tweet-box">
        <p class="author">${tweet.User.handle} <span>@${tweet.User.handle}</span></p>
        <p class="date"><small>${month} ${date} ${hour}:${minute}</small></p>
        <p>${linkedTweetBody}</p>
        </div>
        `;
        tweetContainer.prepend(content);
    }

    function linkTweet(tweetBody){
        var reg = new RegExp('@\w+');
        
        var linkedBody = tweetBody.replace(/@\w+/, function(match, capture){
            console.log(match);
            return "<h2>test</h2>";
        });
        // not touching until I can get this fixed
        return tweetBody;
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
            createTweet(res);
            tweetFrom[0].reset();
            updateCount(0);
        });
        
    });

    dropDownFrom.on("submit", function(event){
        // event.preventDefault();
        console.log('submitted');
        // console.log($(this).val());
    });

    //todo - ask Thi about this section of code
    function formDataToJson(serlalizedArray){
        var returnData = {}
        $.map(serlalizedArray, function (value, index){
            returnData[value["name"]] = value["value"];
        });
        return returnData;
    }
    
    followBtn.on('click', function(event){
        console.log(followBtn.val());
        $.ajax({
            method: "PUT",
            url: `/user/follow/${followBtn.val()}`,
            data: followBtn.val(),

        }).done(function(){
            followBtn.css({"display":"none"});
            unfollowBtn.css({"display": "block"})
        }
        );
    })

    unfollowBtn.on('click', function(event){
        $.ajax({
            method: "PUT",
            url: `/user/unfollow/${followBtn.val()}`,
            data: unfollowBtn.val(),
        }).done(function(){
            followBtn.css({"display":"block"});
            unfollowBtn.css({"display": "none"})
        });
    });
    
});