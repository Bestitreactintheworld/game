
function gameover(lastint) {
    // $.ajax({
    //     url: '/game/game_over',
    //     type: "POST",
    //     data: {
    //         _token: hash_id,
    //         "last_time": lastint
    //     },
    //     dataType: "text",
    //     success: function (result) {
    //         $("#wallet_balance").text(currency_symbol + result);
    //         $("#header_wallet_balance").text(currency_symbol + result); // Show Header Wallet Balance
    //         for (let i = 0; i < bet_array.length; i++) {
    //             if (bet_array[i] && bet_array[i].is_bet) {
    //                 bet_array.splice(i, 1);
    //             }
    //         }
    //         // bet_array = [];
    //     }
    // });

   
    // cash_out_now('', 0, $('#main_incrementor').val());
    enableDisable('main_bet_section');
        main_cash_out = 0;
        bet_array.splice(0, 1);
        $("#main_bet_section").find("#bet_button").show();
        $("#main_bet_section").find("#cancle_button").hide();
        $("#main_bet_section").find("#cancle_button #waiting").hide();
        $("#main_bet_section").find("#cashout_button").hide();
        $("#main_bet_section .controls").removeClass('bet-border-red');
        $("#main_bet_section .controls").removeClass('bet-border-yellow');

}

function currentid() {
    $.ajax({
        url: '/game/currentid',
        type: "post",
        data: {
            _token: hash_id
        },
        dataType: "json",
        success: function (result) {
        }
    });
}


let ws; // Declare a variable to hold the WebSocket.

function initializeWebSocket() {
    ws = new WebSocket('ws://localhost:8181');

    ws.onerror = function (error) {
        console.error('WebSocket connection failed:', error);
    };

    ws.onopen = function () {
        console.log('WebSocket connection established.');
    };

    ws.onmessage = function (event) {
        const now = new Date();
        const timeString = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds() + ":" + now.getMilliseconds();

        // Log the time when the message is received
       // console.log('Message received time:', timeString);
        //   console.log('Message received from server:', event.data);
        var parts = event.data.split(' ');
        var currentPoint = parts[2];
        var crashPoint = parts[4];
        //    console.log(currentPoint); // current
        //    console.log(crashPoint); // crashpoint

        if (currentPoint <= crashPoint) {
            incrementor(currentPoint);
        }

        if (currentPoint == crashPoint) {
            crash_plane(crashPoint);
            gameover(crashPoint);
            // Optionally close the WebSocket if needed
            // ws.close();
            gamegenerate(true);
        }
    };

    ws.onclose = function () {
        console.log('WebSocket connection closed.');
    };
}
initializeWebSocket()
// Call this function to send a message.
function sendMessage(message) {

    if (ws && ws.readyState === WebSocket.OPEN) {
        console.log('Sending message:', message);
        ws.send(message);
    } else {
        console.log('WebSocket is not open. Message not sent:', message);
    }
}
function gamegenerate() {



    setTimeout(() => {
        $("#auto_increment_number_div").hide();
        $('.loading-game').addClass('show');
        setTimeout(() => {
            // $("#auto_increment_number_div").show();
            hide_loading_game();
            const initialData = {
                currentGameBetCount: '1150',
                currentGameBet:
                    [
                        {
                            userid: 1,
                            cashout_multiplier: '-',
                            amount: '150',
                            class_name: ''

                        },
                        {
                            userid: 4,
                            cashout_multiplier: '-',
                            amount: '80',
                            class_name: ''
                        },
                        {
                            userid: 2,
                            cashout_multiplier: '-',
                            amount: '165',
                            class_name: ''

                        },
                        {
                            userid: 6,
                            cashout_multiplier: '-',
                            amount: '60',
                            class_name: ''
                        },
                        {
                            userid: 5,
                            cashout_multiplier: '-',
                            amount: '250',
                            class_name: ''

                        },
                        {
                            userid: 3,
                            cashout_multiplier: '-',
                            amount: '280',
                            class_name: ''
                        },
                        {
                            userid: 7,
                            cashout_multiplier: '-',
                            amount: '20',
                            class_name: ''

                        },
                        {
                            userid: 9,
                            cashout_multiplier: '-',
                            amount: '15',
                            class_name: 'class'
                        },
                        {
                            userid: 8,
                            cashout_multiplier: '-',
                            amount: '130',
                            class_name: ''
                        },
                    ]
            }
            // console.log(initialData)
            info_data(initialData)
            sendMessage('start game');
            // $(".bottom-left-plane").show();

            // $.ajax({
            //     url: '/game/new_game_generated',
            //     type: "POST",
            //     data: {
            //         _token: hash_id
            //     },
            //     beforeSend: function () {
            //     },
            //     dataType: "json",
            //     success: function (result) {
            //         stage_time_out = 1;
            //         if (bet_array.length > 0) {
            //             place_bet_now();
            //         }
            //         $.ajax({
            //             url: '/game/currentlybet',
            //             type: "POST",
            //             data: {
            //                 _token: hash_id
            //             },
            //             dataType: "json",
            //             success: function (intialData) {
            //                 // info_data(intialData);
            //             }
            //         });
            //         current_game_data = result;
            //         hide_loading_game();
            //         new_game_generated();
            //         lets_fly_one();
            //         lets_fly();
            //         let currentbet = 0;
            //         let a = 1.0;
            //         $.ajax({
            //             url: '/game/increamentor',
            //             type: "POST",
            //             data: {
            //                 _token: hash_id
            //             },
            //             dataType: "json",
            //             success: function (data) {
            //                 currentbet = data.result;

            //                 $.ajax({
            //                     url: '/game/currentlybet',
            //                     type: "POST",
            //                     data: {
            //                         _token: hash_id
            //                     },
            //                     dataType: "json",
            //                     success: function (intialData) {
            //                         info_data(intialData);
            //                     }
            //                 });
            //                 let increamtsappgame = setInterval(() => {
            //                     if (a >= currentbet) {
            //                         let res = parseFloat(a).toFixed(2);
            //                         let result = res;
            //                         crash_plane(result);
            //                         incrementor(res);
            //                         gameover(result);
            //                         $("#all_bets .mCSB_container").empty();
            //                         $.ajax({
            //                             url: '/game/my_bets_history',
            //                             type: "POST",
            //                             data: {
            //                                 _token: hash_id
            //                             },
            //                             dataType: "json",
            //                             success: function (data) {
            //                                 $("#my_bet_list").empty();
            //                                 for (let $i = 0; $i < data.length; $i++) {
            //                                     let date = new Date(data[$i].created_at);
            //                                     $("#my_bet_list").append(`
            //                         <div class="list-items">
            //                         <div class="column-1 users fw-normal">
            //                             `+ date.getHours() + `:` + date.getMinutes() + `
            //                         </div>
            //                         <div class="column-2">
            //                             <button
            //                                 class="btn btn-transparent previous-history d-flex align-items-center mx-auto fw-normal">
            //                                 `+ data[$i].amount + `â‚¹
            //                             </button>
            //                         </div>
            //                         <div class="column-3">

            //                             <div class="bg3 custom-badge mx-auto">
            //                                 `+ data[$i].cashout_multiplier + `x</div>
            //                         </div>
            //                         <div class="column-4 fw-normal">
            //                             `+ Math.round(data[$i].cashout_multiplier * data[$i].amount) + `â‚¹
            //                         </div>
            //                     </div>
            //                     `);
            //                                 }
            //                             }
            //                         });
            //                         clearInterval(increamtsappgame);
            //                         gamegenerate();
            //                     } else {
            //                         a = parseFloat(a) + 0.01;
            //                         incrementor(parseFloat(a).toFixed(2));
            //                     }
            //                 }, 100);
            //             }
            //         });


            //     }
            // });
            stage_time_out = 1;
            if (bet_array.length > 0) {
                place_bet_now();
            }
            /*
            $.ajax({
                url: '/game/currentlybet',
                type: "POST",
                data: {
                    _token: hash_id
                },
                dataType: "json",
                success: function (intialData) {
                    // info_data(intialData);
                }
            });
            let result = {
                id: 2
            }
           
           
            current_game_data = result; */
            hide_loading_game();
            new_game_generated();
            lets_fly_one();
            lets_fly();
            let currentbet = 0;
            let a = 1.0;
            /* increment added by     , start*/
            // let incrementer =     setInterval(() => {
            //         a = parseFloat(a) + 0.01;
            //         incrementor(parseFloat(a).toFixed(2));
            //         if( a >= randomThreshold){
            //             crash_plane(a);
            //             gameover(a);
            //             clearInterval(incrementer);
            //             gamegenerate();
            //         }





            //     },100)
            /* increment added by KaliKK , end*/

            /*
           $.ajax({
               url: '/game/increamentor',
               type: "POST",
               data: {
                   _token: hash_id
               },
               dataType: "json",
               success: function (data) {
                   currentbet = data.result;

                   let increamtsappgame = setInterval(() => {
                       if (a >= currentbet) {
                           let res = parseFloat(a).toFixed(2);
                           let result = res;
                           crash_plane(result);
                          
                           incrementor(res);
                           gameover(result);
                           $("#all_bets .mCSB_container").empty();
                           $.ajax({
                               url: '/game/my_bets_history',
                               type: "POST",
                               data: {
                                   _token: hash_id
                               },
                               dataType: "json",
                               success: function (data) {
                                   $("#my_bet_list").empty();
                                   for (let $i = 0; $i < data.length; $i++) {
                                       let date = new Date(data[$i].created_at);
                                       $("#my_bet_list").append(`
                                   <div class="list-items">
                                   <div class="column-1 users fw-normal">
                                       `+ date.getHours() + `:` + date.getMinutes() + `
                                   </div>
                                   <div class="column-2">
                                       <button
                                           class="btn btn-transparent previous-history d-flex align-items-center mx-auto fw-normal">
                                           `+ data[$i].amount + `â‚¹
                                       </button>
                                   </div>
                                   <div class="column-3">

                                       <div class="bg3 custom-badge mx-auto">
                                           `+ data[$i].cashout_multiplier + `x</div>
                                   </div>
                                   <div class="column-4 fw-normal">
                                       `+ Math.round(data[$i].cashout_multiplier * data[$i].amount) + `â‚¹
                                   </div>
                               </div>
                               `);
                               
                                   }
                               }
                           });
                           clearInterval(increamtsappgame);
                           gamegenerate();
                       } else {
                           a = parseFloat(a) + 0.01;
                           incrementor(parseFloat(a).toFixed(2));
                       }
                   }, 100);
               }
           });*/
        }, 5000);
    }, 1500);
}

function check_game_running(event) {

}

$(document).ready(function () {
    check_game_running("check");
    // gamegenerate();
});