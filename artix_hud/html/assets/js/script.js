let range = 2;
let selectedMic = 2;
let progressBar;
let showHelpNotify = false;
let notifySound = true;
let globalSettings = [];
let setHTMLload = false;


window.addEventListener("keyup", (event) => {
    if (event.key == "Escape") {
        $('.hud-settings').fadeOut();
        $.post(`https://${GetParentResourceName()}/close`)
    }
})

window.addEventListener('message', function (event) {
    let data = event.data;

    switch (data.type) {
        case "loadhud": {
            if (!setHTMLload) {
                setHTMLload = true;
                loadhtml(data.data.language)
                $('.scoreboard').hide();
                $('.progress-bar').hide();
                $('.help-notify').hide();
                $('.hud_speedo').hide();
                // $('.weapon_box').hide(); waffen
                $('.foodbars').hide();
                $('.hud-settings').hide();
                $.post(`https://${GetParentResourceName()}/hudLoaded`)
                break;
            }
        }
        case "player-job": {
            $('#job').text(data.data.job);
            $('#grade').text(data.data.grade);
            break;
        }
        case "player-count": {
            $('.hud_onlineplayer span').text(data.data.players);
            $('#onlineplayer').text(data.data.players);
            break;
        }
        case "player-money": {
            if (data.data.cash != null) {
                if (data.data.cash > 0) {
                    $('#cash-money').text(formatMoney(data.data.cash, data.data.currency)).fadeIn();
                } else {
                    $('#cash-money').fadeOut();
                }
            }
            if (data.data.bank != null) {
                if (data.data.bank > 0) {
                    // Geld ist über 0, einblenden
                    $('#bank-money').text(formatMoney(data.data.bank, data.data.currency)).fadeIn();
                    $('.hud_bank_money').fadeIn();
                } else {
                    $('#bank-money').fadeOut();
                    $('.hud_bank_money').fadeOut();
                }
            }
            break;
        }
        
        case "player-id": {
            $('.hud_id span').text(data.data.playerId);
            $('#playerid').text(data.data.playerId);
            break;
        }
        case "speedometer": {
            $('.hud_speedo').fadeIn();
            let speed_percent = Math.min(100, Math.max(0, data.data.speed_percent));
            let dash_max = 440;
            let dash_min = 0;
            let adjusted_dash = dash_min + (speed_percent / 100) * (dash_max - dash_min);
            $( '.speedo-circle').css('stroke-dasharray', `${adjusted_dash}, 600`);


            if (data.data.speed)
             {
                $('.speed-number').css("left", "4.43vw")
                $('#speedo-text-two').text(data.data.speed)
            }
            if (data.data.speed == 0) {
                $('.speed-number').css("left", "4.43vw")
                $('#speedo-text-two').text("0")
            }

            // engine
            const engine_maxDashValue = 105;
            const engine_minDashValue = 0;
            const engine_totalDashLength = 600;
    

            const engine_Percentage = (data.data.vehicle_health / 10);
            const engine_adjustedDashArray = engine_minDashValue + (engine_Percentage / 100) * (engine_maxDashValue - engine_minDashValue);
            
            $('.engine-circle').css("stroke-dasharray", `${engine_adjustedDashArray}, ${engine_totalDashLength}`);

            // fuel
            const fuel_maxDashValue = 120;
            const fuel_minDashValue = 226;
            const fuel_totalDashLength = 640;
        
            const fuel_fuelPercentage = data.data.fuel;
            const fuel_adjustedDashArray = fuel_minDashValue + (fuel_fuelPercentage / 100) * (fuel_maxDashValue - fuel_minDashValue);
        
            $('.hud_fule_bar_2').css('width', `${fuel_fuelPercentage}%`);
            const fuel_fuelPercentageString = fuel_fuelPercentage.toFixed(1);
            $('#currentFuel').text(`${fuel_fuelPercentageString} LITER`);

            // Lock Status
            if (data.data.lockStatus == 2) {
                $('#hud_lock').css("color", "var(--lock_st2)")
            } else if (data.data.lockStatus == 1) {
                $('#hud_lock').css("color", "var(--lock_st1)")
            }

            // Engine Status
            if (data.data.engineStatus == "running") {
                $('#hud_engien').css("color", "var(--engien_st2)")
            } else if (data.data.engineStatus == "stopped") {
                $('#hud_engien').css("color", "var(--engien_st1)")
            }
            break;
        }
        case "hideSpeedometer": {
            $('.hud_speedo').fadeOut(300);
            break;
        }
        case "server-names": {
            $('.server-name').text(data.data.server_name)
            $('.server-name2').text(data.data.server_name2)
            break;
        }
         case "weapon-ammo": {
             $('.weapon_box').fadeIn(400);
             $('#weapon-name').text(data.data.name)
             $('#weapon-ammo').text(data.data.ammo)
             $('#weapon-ammo-max').text("/" + data.data.ammo_max)
             break;
         }
         case "weapon-hide": {
             $('.weapon_box').fadeOut(400);
             break;
         }
        case "show-status": {
            $('.foodbars').fadeIn()
            break;
        }
        case "voice-mode": {
            if (data.data.type == "PMA" || data.data.type == "mumble-voice") {
                $('#mic-4').hide()
            }
            break;
        }
        case "voice-status": {
            if (data.data.type === "voice") {
                const color = data.data.bool ? "var(--mic_st2)" : "var(--mic_st1)";
        
                for (let i = 1; i <= selectedMic; i++) {
                    const micSelector = `#mic`;
                    $(micSelector).css({
                        color: color,
                    });
                }
            }
            break;
        }
         case "funk": {
             const backgroundColor = data.data.bool ? "var(--funk-active)" : "var(--funk-status)";
             const backgroundColor2 = data.data.bool ? "var(--funk-active)" : "var(--funk-status-background)";

             for (let i = 1; i <= 4; i++) {
                 $(`#funk-${i}`).css({
                     background: backgroundColor,
                     boxShadow: `0vw 0vw 0.52vw 0vw ${backgroundColor2}`
                 });
             }
             break;
         }
        case "voice-range": {
            selectedMic = data.data.range;
            for (let i = 1; i <= 4; i++) {
                const micSelector = `#mic-${i}`;
                const backgroundColor = i <= selectedMic ? "var(--dot_st2)" : "var(--dot_st1)";
                const backgroundShadow = i <= selectedMic ? "0vw 0vw 0.52vw 0vw var(--mic-status-background);" : "none"
                $(micSelector).css("background", backgroundColor);
                $(micSelector).css("box-shadow", backgroundShadow);
            }
            break;
        }
        case "helpNotify": {
            if (!data.data.show) {
                $('.help-notify').fadeOut(400);
            } else {
                $('.help-notify').fadeIn();
                $('.help_text').text(data.data.text)
                $('.key').text(data.data.key)
            }
            break;
        }
        case "progressbar": {
            startProgressbar(data.data.text, data.data.time);
            break;
        }
        case "progressbar:cancel": {
            cancelProgressbar()
            break;
        }
        case "notify": {
            notify(data.data.type, data.data.title, data.data.msg, data.data.time, data.data.icon);
            break;
        }
        case "announce": {
            announce(data.data.title, data.data.msg, data.data.time)
            break;
        }
        case "street": {
            $('#street-zone').text(data.data.street)
            $('#street-name').text(data.data.zone)
            break;
        }
        case "scoreboard": {
            if (data.data.openui) {
                $('.scoreboard').fadeIn(400);
                $('.scoreboard-logo').attr('src', data.data.logo)

                $('.scoreboard-name').text(data.data.language["title"])
                $('.scoreboard-desc').text(data.data.language["description"])
                setData(data.data.data, data.data.language["online"]);
            } else {
                $('.scoreboard').fadeOut(400);
            }
            break;
        }
        case "hide-hud": {
            if (data.data.status) {
                $('.scoreboard').fadeOut(400);
                $('body').hide();
            } else {
                $('body').show();
            }
            break;
        }
        case "send-sound": {
            let audio = new Audio(`${data.data.sound}`);
            audio.volume = "0.3"
            audio.play();
            break;
        }
        case "hud-settings": {
            if (!data.data.status) $('.hud-settings').fadeOut(400);
            if (data.data.status) $('.hud-settings').fadeIn(400);
            break;
        }
        case "get-hud:settings": {
            let settings = data.data.settings
            let globalSettings = JSON.stringify(data.data.settings)
            if (!globalSettings) return;
            for (let i = 0; i < settings.length; i++) {
                let elementName = Object.keys(settings[i])[0];
                let elementData = JSON.parse(settings[i][elementName]);
                if (!elementData.status) {
                    let elementId = document.getElementById(`${elementName}-id`);
                    elementId.classList.remove('checked');
                    elementId.classList.add('unchecked');
                    $(`${elementData.element}`).fadeOut(400);
                }
            }

            $('.settings-logo').attr("src", data.data.logo)

            break;
        }
    }
})

// functions
let notifyCount = 1;
let currentlyAnnouncing = false
const announcementQueue = [];

function announce(title, msg, time) {
    if (currentlyAnnouncing) {
        enqueueAnnouncement(title, msg, time)
        return;
    }
    currentlyAnnouncing = true
    const currentlyNotify = notifyCount;
    $('.announces').append(`
    <div class="main__announce-item" id="announce-Id-${currentlyNotify}" style="background: linear-gradient(to right, rgb(0, 179, 255), rgba(0, 0, 0, 0));">
    <div class="main__announce-grid">
        <div class="main__announce-icon-container">
            <i class="fas fa-check-circle"></i>
        </div>
        <div class="main__announce-text-container">
            <p class="main__announce-text-header">${title}</p>
            <p class="main__announce-text-description">${msg}</p>
        </div>
        <div class="main__announce-progress">
            <div class="main__announce-progress-bar" id="announce-id-${currentlyNotify}"></div>
        </div>
    </div>
</div>
    `);
    $.post(`https://${GetParentResourceName()}/sound`, JSON.stringify({ type: "announce" }))
    $('#announce-id-' + currentlyNotify).animate({
        width: "0%"
    }, time);

    setTimeout(() => {
        $(`#announce-Id-${currentlyNotify}`).css({
            animation: "fadeOutAnnounce 0.5s"
        })
        setTimeout(() => {
            $(`#announce-Id-${currentlyNotify}`).remove();
        }, 0);
        currentlyAnnouncing = false;
        processAnnouncementQueue();
    }, time);

    notifyCount++;
}

window.addEventListener('message', function(event) {
    const item = event.data
    
    switch (item.action) {
        case "setLocation":
            $("#postalCode").text(item.streetName)
        break;
    };
})


function notify(type, title, msg, time, icon) {
    const currentlyNotify = notifyCount;
    $('.notifys-container').append(`
    <div class="main__notify-item" id="notify-Id-${currentlyNotify}">
    <div class="main__notify-grid">
        <div class="main__notify-icon-container">
        <!-- <iconify-icon icon="ep:success-filled" class="notify-icon-ify-${type}" width="4.25vw" height="4.22vh"></iconify-icon> -->
        <i class="notify-icon-ify-${type} ${icon}" width="4.25vw" height="4.22vh"></i>
        </div>
        <div class="main__notify-text-container">
            <p class="main__notify-text-header">${title}</p>
            <p class="main__notify-text-description">${msg}</p>
        </div>
        <div class="main__notify-progress">
            <div class="main__notify-progress-bar" id="progress-id-${currentlyNotify}"></div>
        </div>
    </div>
</div>
    `);
    $.post(`https://${GetParentResourceName()}/sound`, JSON.stringify({ type: "notify" }))
    $('#progress-id-' + currentlyNotify).animate({
        width: "0%"
    }, time);
    setTimeout(() => {
        $(`#notify-Id-${currentlyNotify}`).css({
            animation: "fadeOut 1s"
        })
        setTimeout(() => {
            $(`#notify-Id-${currentlyNotify}`).remove();
        }, 500);
    }, time);

    notifyCount++;
}

function setData(data, online) {
    $('.jobs').empty();
    for (let i = 0; i < 6 && i < data.length; i++) {
        const item = data[i];
        const color = isValidColor(item.color) ? item.color : 'rgba(237, 37, 78, 0.32)';

        $('.jobs').append(`
        <div class="job" style="background: ${item.color}; box-shadow: 0vw 0vw 1.88vw 0vw rgba(0, 0, 0, 0.32) inset, 0vw 0vw 3.33vw 0vw ${item.color};">
        <p class="job-name">${item.name}</p>
        <i class="${item.icon} job-icon" style="color: white;"></i>
        <div class="job_count_bg">
            <p class="job-count">${item.count}</p>
        </div>
    </div>
        `);
    }
}

function isValidColor(color) {
    const colorRegex = /^(#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})|rgba?\([^)]+\)|[a-z]+)$/;
    return colorRegex.test(color);
}

function loadhtml(language) {
    let css = `
    body {
    color: red;
    font-family: var(--text);
    overflow: hidden;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    font-weight: 700;
    font-size: 1.5vh;
}

.hud_top_right {
    position: absolute;
    top: 0.8vh;
    right: 2.5vh;
}

.hud_schadow_right {
    position: absolute;
    top: -10vh;
    right: -10vh;
    width: 20vh;
    height: 20vh;
    border-radius: 100%;
    filter: blur(10vh);
    background-color: var(--top_right_blur);
}

.hud_servername {
    text-align: right;
    font-size: 3.5vh;
    text-transform: uppercase;
    font-weight: 700;
    letter-spacing: 0.3vh;
}

.server-name{
    color: var(--server_name_first);
    text-shadow: var(--text-shadow-first1) 0.3vh 0.3vh 0.3vh, var(--text-shadow-first2) 0.2vh 0.2vh 2vh;
}

.server-name2{
    color: var(--server_name_last);
    text-shadow: var(--text-shadow-last1) 0.3vh 0.3vh 0.4vh, var(--text-shadow-last2) 0vh 0.2vh 2vh !important;
}


.hud_info {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: right;
    left: -0.5vh;
    top: -6vh;
    gap: 1vh;
}


.hud_id {
    position: relative;
    font-weight: 700;
    font-size: 1.8vh;
}

.hud_id p {
    color: var(--id_first);
}

.hud_id span {
    color: var(--id_last);
}

.hud_onlineplayer {
    position: relative;
    font-weight: 700;
    font-size: 1.8vh;
}

.hud_onlineplayer i {
    color: var(--onlineplayer_first);
}

.hud_onlineplayer span {
    color: var(--onlineplayer_last);
}

.hud_mic {
    position: relative;
    display: flex;
    align-items: center;
    top: -0.1vh;
    right: 0vh;
    font-size: 1.8vh;
    gap: 0.3vh;
}

.hud_mic i {
    color: var(--mic_st1);
}

.dot {
    width: 1vh;
    height: 1vh;
    border-radius: 1vh;
    background: var(--dot_st1);
}

.dot_on {
    background-color: var(--dot_st2);
}

/* .hud_money {
    position: absolute;
    top: 13vh;
    right: 0vh;
    text-align: right;
    font-weight: 700;
} */

.hud_player_money {
    position: absolute;
    font-size: 2.5vh;
    top: 11vh;
    right: 0vh;
    text-align: right;
    font-weight: 700;
}

.hud_player_money p {
    color: var(--money_first_img);
}

.hud_player_money span {
    color: var(--money_first);
}

.hud_bank_money {
    position: absolute;
    font-size: 2vh;
    top: 17vh;
    right: 0vh;
    text-align: right;
    font-weight: 700;
    white-space: nowrap;
}
.hud_bank_money i {
    color: var(--money_last_img);
}

.hud_bank_money span {
    color: var(--money_last);
}

.hud_top_left {
    position: absolute;
    /* top: 7vh; */
    top: 5vh;
    left: 3vh;
    font-weight: 700;
    font-size: 2vh;
}

.hud_schadow_left {
    position: absolute;
    top: -15vh;
    right: -0vh;
    width: 20vh;
    height: 20vh;
    border-radius: 100%;
    filter: blur(10vh);
    background-color: var(--top_right_blur);
}

.hud_plz {
    position: relative;
}

.hud_plz i {
    color: var(--plz_first);
}

.hud_plz span {
    color: var(--plz_last);
}

.hud_job {
    position: relative;
}

.hud_job i {
    color: var(--job_first);
}

.hud_job span {
    color: var(--job_last);
}

.hud_clock {
    position: relative;
}

.hud_clock i {
    color: var(--clock_first);
}

.hud_clock span {
    color: var(--clock_last);
}

.hud_speedo {
    position: absolute;
    right: 3vh;
    bottom: 3vh;
}

.hud_speedo_kmh {
    position: relative;
    top: 13vh;
    left: 2.5vh;
    transform: skew(170deg);
}

.hud_speedo_kmh p:first-child {
    position: relative;
    text-align: left;
    left: 3vh;
    top: 5.5vh;
    font-size: 1.6vh;
    font-weight: 700;
    color: var(--speedo_KMH_first)
}

.hud_speedo_kmh p:last-child {
    position: relative;
    text-align: right;
    left: -12vh;
    font-size: 4.8vh;
    font-weight: 700;
    color: var(--speedo_KMH_last);
    text-shadow: 0vh 0vh 1vh var(--speedo_KMH_last_shadow);
}

.hud_speedo_icons {
    position: relative;
    left: 14.5vh;
    top: 2.5vh;
    font-size: 1.8vh;
}

.hud_speedo_icons i:first-child {
    color: var(--lock_st1);
}

.hud_speedo_icons i:last-child {
    color: var(--engien_st1);
}

.hud_fule {
    position: relative;
}

.hud_fule p {
    color: var(--fule_text);
    position: relative;
    text-align: right;
    top: 1vh;
    font-size: 1.8vh;
    font-weight: 700;
    text-shadow: 0vh 0vh 1vh var(--fule_text);
}

.hud_fule_bar {
    width: 19.4vh;
    height: 0.6vh;
    background: var(--fule_bg_bar);
    transform: skew(170deg);
}

.hud_fule_bar_2 {
    width: 0%;
    height: 0.6vh;
    background: var(--fule_bar);
    box-shadow: 0vh 0vh 1vh var(--fule_bar);
}
.food_water {
    position: absolute;
    left: 16.82292vw;
    bottom: 3.38542vw;
    display: flex;
    flex-direction: column;
    display: var(--food-off);
}

.food_container {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2.44792vw;
    height: 2.44792vw;
    position: relative;
    top: 4.2vh;
    left: 0vh;
}

.progress_ring {
    height: 2.44792vw;
    height: 2.44792vw;
}

.progress_novalue {
    stroke-width: 3;
    fill: none;
}

.food {
    stroke: var(--food_bg)
}

.water {
    stroke: var(--water_bg);
}

.progress_food {
    stroke-width: 3;
    stroke-linecap: round;
    fill: none;
    transform: rotate(270deg);
    transform-origin: center;
    stroke: var(--food_st1);
}

.food_water-img:first-child {
    position: absolute;
    left: 1.6vh;
    top: 1.4vh;
    width: 1.35417vw;
    height: 1.35417vw;
    font-size: 2vh;
    color: var(--food_img);
}

.food_water-img:last-child {
    position: absolute;
    font-size: 2vh;
    color: var(--food_img);
}

.water_container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2.44792vw;
    height: 2.44792vw;
    position: relative;
    margin-top: 0.5vw;
    position: absolute;
    top: -1.6vh;
    left: 0vh;
}

.progress_water {
    stroke-width: 3;
    stroke-linecap: round;
    fill: none;
    stroke: var(--water_st1);
    transform: rotate(270deg);
    transform-origin: center;
}

.progress-bar {
    position: absolute;
    bottom: 5.57vw;
    left: 50%;
    transform: translateX(-50%);
    height: 5.42vw;
    width: 35vh;
    text-align: center
}

.progress-bar-con {
    position: absolute;
    top: 2.55vw;
    left: 0;
    width: 100%;
    height: 3vh;
    border-radius: 0.5vh;
    background: var(--progress_bar_gb);
}

.progress-bar-fill {
    position: absolute;
    left: 0vw;
    width: 0;
    height: 3vh;
    border-radius: 0.5vh;
    background: var(--progress_bar_fill);
    box-shadow: 0px 0px 7px var(--progress_bar_fill_shadow);
}

.progress-i-text {
    position: relative;
    display: flex;
    top: 3.3vh;
    left: 0.5vh;
    color: var(--progress_bar_text);
    font-weight: 700;
    font-size: 1.7vh;
}

.progress-i-text p:last-child {
    position: relative;
    left: 0.5vh;
}

.help-notify {
    position: absolute;
    bottom: 1.09vw;
    left: 41.82vw;
    width: 16.35vw;
    height: 5.42vw;
    animation: helpNoitfy 1.0
}

.help-notifyOut {
    position: absolute;
    animation: helpNoitfyOut 1.0
}

@keyframes helpNoitfy {
    0% {
        bottom: -6.56vw
    }

    100% {
        bottom: 1.09vw
    }
}

@keyframes helpNoitfyOut {
    100% {
        bottom: -6.56vw
    }

    0% {
        bottom: 1.09vw
    }
}

.control-key {
    position: absolute;
    width: 2.5vw;
    height: 2.5vw;
    left: 50%;
    top: 20%;
    transform: translate(-50%, -50%);
    border-radius: 15.63vw;

    border: solid 0.5vh var(--help_notify);
    box-shadow: 0vh 0vh 2.5vh var(--help_notify);

}

.key {
    position: absolute;
    left: 50%;
    top: -18%;
    transform: translate(-50%, -50%);
    width: auto;
    color: var(--help_notify_text_in);
    text-shadow: 0vh 0vh 2.5vh var(--help_notify_text_in);
    font-size: 3.2vh;
    font-weight: 700;
}

.control-infos {
    position: absolute;
    width: 13.02vw;
    height: 2.5vw;
    top: 1.46vw;
    left: 50%;
    transform: translateX(-50%)
}

.help-shadow {
    position: absolute;
    width: 19.4vh;
    height: 10vh;
    left: 50%;
    top: 140%;
    transform: translate(-50%, -50%);
    background: var(--help_notify_bg);
    filter: blur(5.1vh);
}

.help_text {
    position: absolute;
    left: 50%;
    top: 80%;
    transform: translate(-50%, -50%);
    height: 1.04vw;
    white-space: nowrap;
    color: var(--help_notify_text);
    font-weight: 700;
    font-size: 1.9vh;
    line-height: 2.4vh;
    text-align: center;
}

.scoreboard {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 17.8333333333vw;
    height: 32.50625vw;
    padding-top: 2.0833333333vw;
    right: 4.2708333333vw;
    background: radial-gradient(74.43% 63.52% at 1.7% 96.65%, rgb(141 141 141 / 6%) 0%, rgb(92 92 92 / 6%) 100%), radial-gradient(29.16% 50.31% at 99.32% 92.93%, rgb(143 143 143 / 9%) 0%, rgb(100 100 100 / 0%) 100%), radial-gradient(50% 50% at 50% 50%, rgb(114 114 114 / 20%) 0%, rgb(40 40 40 / 20%) 100%), #000000;
    border-radius: 3.3333333333vw;
    left: 90%;
    top: 45%;
    transform: translate(-50%, -50%);
}

.scoreboard::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 3.3333333333vw;
    padding: 0.1851851852vh;
    background: linear-gradient(114.65deg, #00b3ff 0%, #008fcc 50.29%, #006b99 100%);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }

.scoreboard-header {
    position: absolute;
    top: -1vh;
    left: 3vh;
    width: 23.96vw;
    height: 10.63vw;
    font-weight: 700;
    text-transform: uppercase;
}

.server-names{
    font-size: 3.5vh;
}

.scoreboard-name{
    position: relative;
    top: -3vh;
    font-size: 2vh;
    color: #fff;
}

.scoreboard-logo {
    position: absolute;
    width: 5.42vw;
    height: 5.42vw;
    left: 50%;
    transform: translateX(-50%)
}

.scoreboard-desc {
    position: absolute;
    bottom: 0vw;
    width: 23.96vw;
    text-align: center;
    color: rgba(255, 255, 255, 0.32);
    text-shadow: 0vw 0vw .42vw rgba(0, 0, 0, 0.32);
    font-size: .83vw;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}

.jobs {
    position: relative;
    left: 2vh;
    top: -3vh;
}

.job {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    left: -4vh;
    width: 14.5vw;
    height: 2vw;
    margin: 1.2vw;
    background: rgba(34, 34, 34, 0.25);
    border-radius: 1vh;
}


.job-name {
    position: absolute;
    top: -1vh;
    left: 45%;
    transform: translateX(-50%);
    color: #FFF;
    width: 10vh;
    text-align: left;
    text-shadow: 0vw 0vw .42vw rgba(0, 0, 0, 0.32);
    font-size: 1.04vw;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
} 

.job_count_bg{
    position: absolute;
    left: 20vh;
    width: 5vh;
    transform: skew(160deg);
    background: linear-gradient(180deg, #FCD555 0%, #F98A31 100%);
    border-radius: 0.5vh;
    justify-content: center;
    align-items: center;
}
.job-count {
    position: relative;
    color: #fff;
    width: 100%;
    text-align: center;
}

.job-icon {
    position: absolute;
    height: auto;
    width: auto;
    left: 10%;
    font-size: 3.5vh;
    top: 50%;
    transform: translate(-50%, -50%)
}

.scoreboard-server-info{
    position: absolute;
    top: 50vh;
    left: 30%;
    transform: translateX(-50%);
    display: flex;
    gap: 10vh;
}

.scoreboard_bg{
    position: absolute;
    display: flex;
    top: 8vh;
    color: #ffffff;
    font-size: 12vh;
    left: -3vh;
    gap: 5vh;
}

.scoreboard-onlineplayer{
    position: relative;
    top: 9vh;
    right: 1vh;
    text-align: center;
    color: #494949;
}

.scoreboard-plyerid{
    position: relative;
    top: 9vh;
    left: 0.3vh;
    text-align: center;
    color: #494949;

}

.hud-settings {
    position: absolute;
    width: 28.67vw;
    height: 30.61vw;
    left: 50%;
    top: 50%;
    border-radius: 2vh;
    transform: translate(-50%, -50%);
    background: var(--settings_bg);
}

.header-settings {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 2.29vw;
    width: 11.88vw;
    height: 7.5vw
}

.settings-logo {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 5.42vw;
    height: 5.42vw
}

.hud-header-txt {
    position: absolute;
    bottom: 0vw;
    color: var(--settings_hader);
    font-style: normal;
    line-height: normal;
    font-weight: 700;
    font-size: 4vh;
    text-align: center;
    text-shadow: 0vh 0.5vh 1.4vh rgba(0, 0, 0, 0.5);
    white-space: nowrap;
}

.elements-settings {
    position: absolute;
    width: auto;
    height: 24.84vw;
    top: 13.49vw;
    left: 50%;
    transform: translateX(-50%);
    overflow-y: scroll;
    overflow-x: hidden
}

.element-txt {
    position: absolute;
    left: 2.92vw;
    height: 6.04vw;
    top: 50%;
    transform: translateY(-50%);
    font-style: normal;
    line-height: normal;
    font-weight: 700;
    font-size: 2.1vh;
    display: flex;
    color: var(--settings_text);
    text-shadow: 0vh 0.4vh 0.4vh rgba(0, 0, 0, 0.25);

}

.element-status {
    position: absolute;
    width: 1.25vw;
    height: 1.25vw;
    right: 2.92vw;
    top: 20%;
    transform: translateY(-50%);
    border-radius: .31vw
}

.unchecked {
    background: var(--checkbox-unchecked);
    /* box-shadow: 0vw 0vw 1.25vw 0vw var(--checkbox-unchecked-box-shadow) */
}

.checked {
    background: var(--checkbox-checked);
    /* box-shadow: 0vw 0vw 1.25vw 0vw var(--checkbox-checked-box-shadow) */
}

::-webkit-scrollbar {
    width: .16vw
}

::-webkit-scrollbar-thumb {
    border-radius: 15.63vw;
    background: var(--color-scrollbar);
}

.element {
    position: relative;
    width: 25vw;
    height: 4.17vw;
    border-radius: .1vw;
    margin-bottom: .83vw;
    margin-right: .52vw
}

.element:last-child {
    margin-bottom: 0
}

.close-scoreboard {
    position: absolute;
    width: .83vw;
    height: .83vw;
    right: 3.33vw;
    top: 2.08vw
}

.notifys-container {
    position: absolute;
    width: auto;
    height: 60vh;
    bottom: 10.6vw;
    left: 1.51vw;
    overflow: hidden;
}

.announces{
    position: absolute;
    top: 3vh;
    left: 50%;
    width: 50vh;
    height: 22.5vh;
    transform: translateX(-50%);
    overflow: hidden;
    }
    
    
    
    .main__announce-item{
        overflow: hidden;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.711);
        width: 95%;
        position: relative;
        background: linear-gradient(to right, var(--announce_bg), rgba(0, 0, 0, 0));
        padding-left: 1vh;
        padding-bottom: 1vh;
        padding-right: 1vh;
        padding-top: 1vh;
        border-radius: 2.5vh;
        margin-bottom: 1.5vh;
        animation: 1s moveinanimation2;
        margin-bottom: 0;
        display: flex;
        flex-wrap: wrap;
    }
    
    .main__announce-grid{
        width: 100%;
        display: grid;
        gap: 1vh;
        grid-template-columns: .1fr 1fr;
    }
    
    .main__announce-icon-container{
        color: var(--announce_img);
        font-size: 4vh;
        display: flex;
        justify-content: center;
        align-items: center;
        text-shadow: 0vh 0vh 1vh var(--announce_img_shadow);
    }
    
    .main__announce-text-container{
        position: relative;
        left: 0vh;
        top: 0vh;
        display: flex; /* Neue Zeile */
        flex-direction: column; /* Neue Zeile */
    }
    
    .main__announce-text-header{
        color: var(--announce_header);
        font-size: 1.5vh;
        font-weight: 700;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.711);
        font-size: 2vh;
        text-transform: uppercase;
        transform: skew(-10deg);
        margin-bottom: 1vh; /* Neue Zeile */
    }
    
    .main__announce-text-description{
        position: relative;
        color: var(--announce_text); /* Farbe nur einmal angeben */
        font-size: 1.5vh;
        color: rgba(255, 255, 255, .75);
        margin-top: -1vh; /* Negative Margin hinzugefügt */
        width: 95%;
    }
    
    
    .main__announce-progress{
        position: absolute;
        bottom: 0;
        left: 0;
        height: .3vh;
        background: var(--announce_progress_bg);
        width: 100%;
    }
    
    .main__announce-progress-bar{
        width: 100%;
        height: 100%;
        /* background: linear-gradient(to right, var(--clr-white), rgba(0, 0, 0, 0)); */
        background-color: var(--announce_progress);
        /* animation: 5s announce linear; */
    }

.main__notify-item {
    overflow: hidden;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.711);
    position: relative;
    width: 22vh;
    min-height: 7vh;
    background: linear-gradient(to right, var(--notify_bg), rgba(0, 0, 0, 0));
    padding-left: 1vh;
    padding-bottom: 1vh;
    padding-right: 1vh;
    padding-top: 1vh;
    border-radius: 2.5vh;
    margin-bottom: 1.5vh;
    animation: 1s moveinanimation;
    display: flex;
    flex-wrap: wrap;
}
.main__notify-grid {
    width: 100%;
    display: grid;
    grid-template-columns: .25fr 1fr;
    gap: 1vh;
}

.main__notify-icon-container {
    color: var(--notify_img);
    font-size: 4vh;
    text-shadow: 0vh 0vh 1vh var(--notify_img_shadow);
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 13%;
    transform: translate(-50%, -50%);
}

.main__notify-text-container{
        position: relative;
        left: 5vh;
        top: 2.3vh;
}
.main__notify-text-header {
    position: absolute;
    top: -4vh;
    color: var(--notify_header);
    font-size: 1.5vh;
    font-weight: 700;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.711);
    font-size: 2vh;
    text-transform: uppercase;
    transform: skew(-10deg);
}

.main__notify-text-description {
    position: relative;
    top: -1vh;
    width: 15vh;
    color: var(--notify_text);
    font-size: 1.5vh;
    font-weight: 700;
    color: rgba(255, 255, 255, .75);
    white-space: pre-wrap;
    word-wrap: break-word;
}



.main__notify-progress {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    height: .3vh;
    background: var(--notify_progress_bg);    
}

.main__notify-progress-bar {
    width: 100%;
    height: 100%;
    background-color: var(--notify_progress);
}

@keyframes moveinanimation {
    0% {
        right: -30vh;
        opacity: 0%;
    }

    100% {
        right: 0vh;
        opacity: 100%;
    }
}

@keyframes moveinanimation2 {
    0% {
        right: -30vh;
        opacity: 0%;
    }

    100% {
        right: 0vh;
        opacity: 100%;
    }
}

@keyframes moveinanimation3 {
    0% {
        left: -30vh;
        opacity: 0%;
    }

    100% {
        left: 0vh;
        opacity: 100%;
    }
}


@keyframes notify {
    0% {
        width: 100%;
    }

    100% {
        width: 0%;
    }
}

@keyframes announce {
    0% {
        width: 100%;
    }

    100% {
        width: 0%;
    }
}

@keyframes teamchat {
    0% {
        width: 100%;
    }

    100% {
        width: 0%;
    }
}

@keyframes fadeIn {
    0% {
        left: -20.83vw;
        opacity: 0
    }

    100% {
        left: 0;
        opacity: 100%
    }
}

@keyframes fadeOut {
    0% {
        left: 0;
        opacity: 100%
    }

    100% {
        left: -20.83vw;
        opacity: 0
    }
}
      `
    $('.hud').append(`
    <style>
    ${css}
    </style>
    <div class="hud-res">
    <div class="hud_schadow_right"></div>
    <div class="hud_top_right">
        <div class="hud_servername">
            <p class="server-names"><span class="server-name">name</span><span
                    class="server-name2">Loading</span></p>
        </div>
        <div class="hud_info">
            <div class="hud_id">
                <p>ID <span>0</span></p>
            </div>
            <div class="hud_onlineplayer">
                <i class="fa-solid fa-user"></i>
                <span>0</span>
            </div>
            <div class="hud_mic">
                <i class="fa-solid fa-microphone" id="mic"></i>
                <div class="dot" id="mic-1"></div>
                <div class="dot" id="mic-2"></div>
                <div class="dot" id="mic-3"></div>
                <div class="dot" id="mic-4"></div>
            </div>
        </div>
        <div class="hud_money">
            <div class="hud_player_money">
                <p><span id="cash-money">LOADING</span></p>
            </div>
            <div class="hud_bank_money">
                <i class="fa-solid fa-building-columns"></i>
                <span id="bank-money">LOADING</span>
            </div>
        </div>
    </div>

    <div class="hud_top_left">
        <div class="hud_schadow_left"></div>
        <div class="hud_plz">
            <i class="fa-solid fa-location-dot"></i>
            <span id="postalCode">0000</span>
        </div>
        <div class="hud_job">
            <i class="fa-solid fa-user"></i>
            <span id="job">LOADING</span>
        </div>
        <div class="hud_clock">
            <i class="fa-solid fa-clock"></i>
            <span id="uhrzeit">00:00</span>
        </div>
    </div>

    <div class="hud_speedo">
        <div class="hud_speedo_kmh">
            <p>KM/H</p>
            <p id="speedo-text-two">0</p>
        </div>
        <div class="hud_speedo_icons">
            <i class="fa-solid fa-lock" id="hud_lock"></i>
            <i class="fa-solid fa-bolt" id="hud_engien"></i>
        </div>
        <div class="hud_fule">
            <p id="currentFuel">LOADING</p>
            <div class="hud_fule_bar">
                <div class="hud_fule_bar_2"></div>
            </div>
        </div>
    </div>
    <div class="foodbars">
    <div class="food_water">
        <div class="food_container">
            <svg class="progress_ring" viewBox="0 0 60 60">
                <circle r="25" cx="30" cy="30" class="progress_novalue food"></circle>
                <circle r="25" cx="30" cy="30" class="progress_food"></circle>
            </svg>
            <i class="food_water-img fa-solid fa-utensils"></i>
        </div>
        <div class="water_container">
            <svg class="progress_ring" viewBox="0 0 60 60">
                <circle r="25" cx="30" cy="30" class="progress_novalue water"></circle>
                <circle r="25" cx="30" cy="30" class="progress_water"></circle>
            </svg>
            <i class="food_water-img fa-solid fa-droplet"></i>
        </div>
    </div>
    </div>
    <div class="progress-bar">

        <div class="progress-bar-con">
            <div class="progress-bar-fill"></div>
        </div>
        <div class="progress-i-text">
            <p class="progress-txt">LOADING</p>
            <p class="progress-percent">: 50%</p>
        </div>
    </div>
    <div class="help-notify">
        <div class="help-shadow"></div>
        <div class="control-infos">
            <div class="control-key">
                <p class="key">L</p>
            </div>
            <p class="help_text" style="white-space: nowrap;">LOADING</p>
        </div>
    </div>
    <div class="hud-settings">
        <div class="header-settings">
            <p class="hud-header-txt">HUD SETTINGS</p>
        </div>
        <div class="elements-settings">
            <div class="element">
                <p class="element-txt">User-Infos</p>
                <div class="element-status checked" id="user-infos-id"
                    onclick="checkElement(this, '.hud_top_left', 'user-infos')"></div>
            </div>
            <div class="element">
                <p class="element-txt">Food</p>
                <div class="element-status checked" id="time-id"
                    onclick="checkElement(this, '.food_water', 'time')"></div>
            </div>
            <div class="element">
                <p class="element-txt">Money</p>
                <div class="element-status checked" id="money_weapon-id"
                    onclick="checkElement(this, '.hud_money', 'money_weapon')"></div>
            </div>
        </div>
    </div>
    <div class="scoreboard">
    <div class="scoreboard-header">
        <p class="server-names"><span class="server-name">name</span><span
            class="server-name2">Loading</span></p>
        <p class="scoreboard-name">SCOREBOARD</p>
        <div class="jobs">

        </div>

        <div class="scoreboard-server-info">
            <div class="scoreboard_bg">
                <div class="scoreboard-server-info-bg">
                    <i class="fa-solid fa-bookmark"></i>
                    </div>
                    <div class="scoreboard-server-info-bg">
                        <i class="fa-solid fa-bookmark"></i>
                        </div>
            </div>
            <div class="scoreboard-onlineplayer">
                <p>Online</p>
                <span id="onlineplayer">1</span>
            </div>
            <div class="scoreboard-plyerid">
                <p>ID</p>
                <span id="playerid">1</span>
            </div>
        </div>
    </div>

</div>
    <div class="notifys-container">

    </div>
    <div class="announces">

    </div> 

</div>

    `)
}


function checkElement(element, element_id, name) {
    let toggle
    if (element.classList.contains('checked')) {
        toggle = false
        element.classList.remove('checked');
        element.classList.add('unchecked');
        $(`${element_id}`).fadeOut(400);
    } else {
        toggle = true
        element.classList.remove('unchecked');
        element.classList.add('checked');
        $(`${element_id}`).fadeIn(400);
    }
    $.post(`https://${GetParentResourceName()}/changeStatus`, JSON.stringify({ element_id: element_id, name: name, status: toggle }))
}

function cancelProgressbar() {
    $('.progress-bar').hide();
    clearInterval(progressBar);
}

function startProgressbar(text, time) {
    if (progressBar) clearInterval(progressBar)

    $('.progress-bar').show();
    $('.progress-txt').text(text);

    const start = new Date();
    const interval = 10;

    progressBar = setInterval(() => {
        const now = new Date();
        const timeDiff = now - start;
        const percent = Math.min(Math.round((timeDiff / time) * 100), 100);

        $('.progress-bar-fill').css("width", percent + "%");
        $('.progress-percent').text(percent + "%")

        if (percent >= 100) {
            cancelProgressbar()
        }
    }, interval);
}

function formatMoney(money, currency) {
    if (currency == "USD") {
        return "" + money.toLocaleString({ style: 'currency', currency: 'USD'}).replace(/,/g, ".")+ "$";
    } else if (currency == "EUR") {
        return money.toLocaleString({ style: 'currency', currency: 'EUR'}).replace(/,/g, ".") + "" + "€";
    }
}

function aktualisiereUhrzeit() {
    var uhrzeitElement = document.getElementById("uhrzeit");
    var aktuelleZeit = new Date();
    var stunden = aktuelleZeit.getHours();
    var minuten = aktuelleZeit.getMinutes();
    var uhrzeitText = ("0" + stunden).slice(-2) + ":" + ("0" + minuten).slice(-2);
    uhrzeitElement.innerHTML = uhrzeitText;
}setInterval(aktualisiereUhrzeit, 1000);

function enqueueAnnouncement(title, msg, time) {
    if (!currentlyAnnouncing) {
        currentlyAnnouncing = true;
        announce(title, msg, time);
    } else {
        announcementQueue.push({ title, msg, time });
    }
}

function processAnnouncementQueue() {
    if (announcementQueue.length > 0) {
        const { title, msg, time } = announcementQueue.shift();
        announce(title, msg, time);
    }
}


window.addEventListener('message', function(event) {
    const item = event.data
    switch (item.action) {
        case "setStatus":
            SetHungerStatus(item.hunger)
            SetThirstStatus(item.thirst)
        break;
    };
})

function SetHungerStatus(percent) {
    let progressCircle = document.querySelector(".progress_food");
    let radius = progressCircle.r.baseVal.value;
    let circumference = radius * 2 * Math.PI;
    progressCircle.style.strokeDasharray = circumference;
    progressCircle.style.strokeDashoffset = circumference - (percent / 100) * circumference;

    if (percent <= 100 && percent > 50) {
        progressCircle.style.stroke = "var(--food_st1)"; // Grüne Farbe für 100 bis über 50
    } else if (percent <= 50 && percent > 25) {
        progressCircle.style.stroke = "var(--food_st2)"; // Gelbe Farbe für 50 bis über 25
    } else if (percent <= 25) {
        progressCircle.style.stroke = "var(--food_st3)"; // Rote Farbe für 25 oder weniger
    }
}

function SetThirstStatus(percent) {
    let progressCircle = document.querySelector(".progress_water");
    let radius = progressCircle.r.baseVal.value;
    let circumference = radius * 2 * Math.PI;
    progressCircle.style.strokeDasharray = circumference;
    progressCircle.style.strokeDashoffset = circumference - (percent / 100) * circumference;

    if (percent <= 100 && percent > 50) {
        progressCircle.style.stroke = "var(--water_st1)"; // Ändere Blau zu #62D0FF
    } else if (percent <= 50 && percent > 25) {
        progressCircle.style.stroke = "var(--water_st2)"; // Gelb für 50 bis über 25
    } else if (percent <= 25) {
        progressCircle.style.stroke = "var(--water_st3)"; // Rot für 25 oder weniger
    }
}