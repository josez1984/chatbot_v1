var messageQueue = [];
var messageCount = {};
var noMessageCount = 0;

var intervalId = setInterval(function(){ chatBotCheckMessages() }, 1000);

function sendWelcomeMessage() {
    var timeoutDelay = 1000;

    newMessageDelayed('Hi. I\'m a chatbot. I\'m pre programmed to generate pre determined responses based on simple JavaScript regular expressions.',timeoutDelay);
    timeoutDelay += 3000;

    newMessageDelayed('I think my architechture is pretty cool. If you stay quiet long enough, I might start telling you about how I work internally.',timeoutDelay);
    timeoutDelay += 3000;

    newMessageDelayed('By the way, type \'css trick\' or \'clear messages\' to see some cool Javascript, CSS, HTML interaction.',timeoutDelay);
    timeoutDelay += 3000;
};

window.onload = function() {
    sendWelcomeMessage();
};

document.getElementById('user-input').onblur = function (event) { 
    var blurEl = this; 
    setTimeout(function() {
        blurEl.focus()
    }, 10);
};

function generateResponse(message) {
    response = simpleResponse(message);
    if(response.length == 0) {
        response = "I dont think I know how to respond to that yet.";
    }
    return response;
};

function simpleResponse(message) {
    var response = '';
    var answers = [];
    var key = '';

    if( /(^what\S)(.+you)(.+name*)/ig.test(message) ) {
        key = 'name';
        answers = [
            "My name is ChatBot 1.0. What is your name?",
            "My name is ChatBot 1.0.",
            "ChatBot 1.0",
            "ChatBot"
        ];  
    } else if ( /(^my)(.+name)/ig.test(message) ) {
        key = 'theirName';
        answers = [
            "Oh ok. Nice to meet you.",
            "Oh, I'm sure we've chatted before."
        ];
    } else if (/(^how|.+doing)/ig.test(message) ) {
        key = 'HowYouDoing';
        answers = [
            "I'm doing ok, thank you."
        ];
    } else if (/(hi|hello|afternoon)/ig.test(message) ) {
        key = 'hello';
        answers = [
            "Hi",
            "Hello",
            "Hi there",
            "Hi, how you doing"
        ];
    } else if (/(^mess)(.+up)(page|site)/ig.test(message) ) {
        key = 'messUpSite';
        answers = [
            "You want me to mess up the page? Ok, let me see what I can do."
        ];
        response = answers[Math.floor(Math.random()*answers.length)];  
        newMessage(response,0,'left');
        sitePranks();
    } else if (/(like)(.+movies)/ig.test(message) ) {
        key = 'likeMovies';
        answers = [
            "I'm not smart enought to be a movie critic yet.",
            "Yes. I love horror movies and comedies",
            "Only if it has Harry Potter in it"
        ];
    } else if (/(test)/ig.test(message) ) {
        key = 'test';
        answers = [
            "testing"
        ];
    } else if (/(^clear)(.+message)/ig.test(message) ) {
        key = 'clearMessage';
        answers = [
            "Ok, clearing the messages, one second..."
        ];
        setTimeout(function() { $(".alert").alert('close'); }, 2000);
    } else if (/(test)/ig.test(message) ) {
        key = 'test';
        answers = [
            "testing"
        ];
    } else if (/(^css)(.+trick)/ig.test(message) ) {
        key = 'cssTrick';
        answers = [
            "You want to see a CSS trick. Ok, cool."
        ];
        cssTrick1();
    } else if (/(^im|^i'm)(.+ok|.+good|.+fine)/ig.test(message) ) {
        key = 'theirStatus1';
        answers = [
            "Good to hear",
            "Thats good",
            "Good."
        ];
    } else {
        answers = [
            "I dont think I know how to answer that yet.",
            "I dont get it, sorry.",
            "My programmer has not added too much information yet I suppose.",
            "?"
        ];   
    };

    if(key.length > 0) {
        if(key in messageCount) {
            messageCount[key]++;
        } else {
            messageCount[key] = 0;
        };
    
        var checkRepeat = checkRepeatMessages(key);
        if(checkRepeat.repeatMessage == 1) {
            response = checkRepeat.response;
        } else {
            response = answers[Math.floor(Math.random()*answers.length)];
        }
    } else {
        response = answers[Math.floor(Math.random()*answers.length)];
    }
    
    return response;
};

function checkRepeatMessages(key) {
    var response = '';
    var repeatMessage = 0;

    if(Math.floor(Math.random()*11) > 5 && messageCount[key] > 1) {
        repeatMessage = 1;
        if(messageCount[key] == 2) {
            response = 'I think you asked that already, lol.';
        } else if(messageCount[key] == 3) {
            response = 'I\'m sure you\'ve asked me that already.';
        } else if(messageCount[key] == 4) {
            response = 'Right.....';
        } else if(messageCount[key] > 5) {
            response = '.........................';
            messageCount[key] = 0;
        };
    };

    return {
        response: response,
        repeatMessage: repeatMessage
    };
};

function sitePranks() {
    var sitePranks = [
        "documentWritePrank"
    ];

    prank = sitePranks[Math.floor(Math.random()*sitePranks.length)]; 
    if(prank == 'documentWritePrank') {
        newMessage('Ok, I\'m about to mess up the site....',0,'left');
        newMessage('Ready ???',0,'left');
        newMessage('Ok, messing up the site now...',0,'left');
        document.write("Ooops. I think Jose is going to be mad at us.");
    };
};

function chatBotCheckMessages() {
    if(messageQueue.length > 0) {
        for( var i = 0; i < messageQueue.length; i++) {
            var message = messageQueue[i];
            var response = generateResponse(message);
            console.log(response);
            newMessage(response,0,'left');
            rmElement(messageQueue, message);
        }
    } else {
        noMessageCount++;
        if(noMessageCount > 4) {
            chatboxRandomMessage();
            noMessageCount = 0;
        };
    };
};

function simpleChatboxRandomMessage() {
    var messages = [
        "You dont say much huh.",
        "The quiet type I see.",
        "Not the most interesting talker are you, lol.",
        "This message is auto generated from not detecting input from you.",
        "Ok, I'm out.",
        "FYI. My layout is responsive. My programmer used the bootstrap grid system, plus some custom CSS media queries to get full responsiveness.",
        "So, how do I answer your messages ? Well, My programmer created an array, and every time you send me a message, he packs the message into the array, creating a message queue. This message queue is then accessed on a set interval and responded to. Thats the short of it, lol.",
        "Type 'css trick' and see what happens, lol.",
        "You can ask me things like, 'Whats my name', 'Do I like movies', 'How am I doing', etc..."
    ];
    var message = messages[Math.floor(Math.random()*messages.length)];
    newMessage(message,0,'left');
};

function demoRandomMessage() {
    var actions = [1];
    var action = Math.floor(Math.random()*actions.length);
    
    if(action == 1) { // CSS background image modification...
        cssTrick1();
    };
};

function cssTrick1() {
    var colorChangeTime = 1000;

    newMessageDelayed('Lets erase all these messages first.',colorChangeTime);
    colorChangeTime += 1000;

    setTimeout(function(){
        $(".alert").alert('close');
    }, colorChangeTime);
    colorChangeTime += 1000;
    
    newMessageDelayed('Want to see a cool trick ? Watch this..',colorChangeTime);
    colorChangeTime += 2000;

    newMessageDelayed('Ok, I\'m going to mess around with the background color, simple stuff.',colorChangeTime);
    colorChangeTime += 3000;

    var colors = [
        "blue",
        "red",
        "pink",
        "green",
        "yellow",
        "brown",
        "grey",
        "purple",
        "black"
    ];

    for(var x = 0; x < colors.length; x++) {
        setTimeout(function(color){ 
            document.getElementsByTagName("BODY")[0].style.backgroundColor = color;
        }, colorChangeTime, colors[x]);
        colorChangeTime += 500;            
    }
    colorChangeTime += 1000;

    newMessageDelayed('Cool huh? We can control CSS directly from Javascript. In this trick, we used the setTimeout function to control the flow of the action.',colorChangeTime);
    colorChangeTime += 3000;

    newMessageDelayed('Ok, let\'s put the old background back, lol',colorChangeTime);
    colorChangeTime += 1000;

    newMessageDelayed('One second.....',colorChangeTime);
    colorChangeTime += 1000;

    newMessageDelayed('Ok, there we go...',colorChangeTime);
    colorChangeTime += 1000;

    setTimeout(function(){
        document.getElementsByTagName("BODY")[0].style.backgroundColor = "lightgrey";
    }, colorChangeTime);
    colorChangeTime += 1000;

    newMessageDelayed('Done.',colorChangeTime);
    colorChangeTime += 1000;
};

function newMessageDelayed(message, delayTime) {
    setTimeout(function(messageString){
        newMessage(messageString,0,'left'); 
    }, delayTime, message);
};

function chatboxRandomMessage() {
    var action = Math.floor(Math.random()*16);
    if (action > 0 && action < 3) {
        simpleChatboxRandomMessage();
    } else if (action > 8 && action < 11) {
        demoRandomMessage();
    } else if (action > 14) {

    }
};

function rmElement(array, element) {
    var index = array.indexOf(element);
    array.splice(index, 1);
}

document.onkeypress = function(event) {
    if(event.keyCode === 13) {
        var message = document.getElementById("user-input").value;
        if(message.length > 0) {
            messageQueue.push(message);
            newMessage(message,0,'right');
        };
        document.getElementById("user-input").value = "";
        noMessageCount = 0;
    };
};

function newMessage(message, autoClose, side) {
    if(side === 'left') {
        $('#message-box').append('<div class="row"><div class="col-sm-7 alert-left"><div id="alertdiv" class="alert alert-custom alert-dismissible fade show bg-success"><span>' + message + '</span></div></div><div class="col-sm-7 ml-auto"></div></div>');
    } else if (side === 'right') {
        $('#message-box').append('<div class="row"><div class="col-sm-7"></div><div class="col-sm-7 ml-auto alert-right"><div id="alertdiv" class="alert alert-custom alert-dismissible fade show bg-primary"><span>' + message + '</span></div></div></div>');
    };

    if(autoClose == 1) {
        setTimeout(function() { 
            $(".alert").alert('close');
        }, 2500);
    };

    window.scrollTo(0,document.body.scrollHeight);
};


