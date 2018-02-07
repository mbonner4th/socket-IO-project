$(function(){
    console.log("hello world");

    var charCountContainer = $("#char-count");
    var tweetTa = $("#tweet-ta");
    var tweetBtn = $("#tweet-btn");
    var tweetFrom = $("#tweet-form");
    var tweetTableBody = $("#tweet-table-body");
    var dropDownContainer = $("#drop-down-container");
    var dropDownSelector = $("#drop-down-selector");

    function updateCount(number){
        charCountContainer.html(number);
    }

    function createTweet(tweetBody){

        var content = `<tr><td>
        
        <div class="tweet-box">
        <p class="author">Truman Capote <span>@personTwitter</span></p>
        <p>${tweetBody}</p>
        </div>
        
        </td></tr>`;

        tweetTableBody.prepend(content);
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
        createTweet(tweetTa.val());
        tweetFrom[0].reset();
        updateCount(0);
    });


    
});