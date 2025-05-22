cl_config = {}

cl_config.server = {
    server_name = "ARTIX",
    server_name2 = "DEVELOPING",
}

cl_config.weaponwheel = true
cl_config.weaponwheelclr = {
    R = 111,
    G = 3,
    B = 252,
    A = 255,
}

cl_config.general = {
    language = "de", -- de en
    currency = "USD", -- USD EUR
    status = {
        enable = false, -- food
    },
    speedometer = {
        enabled = true, -- speedometer
    },
    voice = {
        type = "PMA", -- PMA SaltyChat
    },
}

cl_config.notify = {
    sound = {
        type = "custom", -- custom fivem
        ["custom"] = {
            sound = "./assets/sounds/notify.mp3"
        },
        ["fivem"] = {
            sound = { -- names: https://wiki.rage.mp/index.php?title=Sounds
                soundName = "ATM_WINDOW",
                soundSetName = "HUD_FRONTEND_DEFAULT_SOUNDSET"
            }
        }
    },
    icons = { -- https://fontawesome.com/icons
        ["success"] = "fa-solid fa-circle-check",
        ["warning"] = "fa-solid fa-circle-exclamation",
        ["error"] = "fa-solid fa-circle-xmark",
        ["info"] = "fa-solid fa-circle-info"
    },
}

cl_config.announce = {
    sound = {
        type = "custom", -- "custom" or "fivem"
        ["custom"] = {
            sound = "./assets/sounds/announce_2.mp3"
        },
        ["fivem"] = {
            sound = { -- names: https://wiki.rage.mp/index.php?title=Sounds
                soundName = "OTHER_TEXT",
                soundSetName = "HUD_AWARDS"
            }
        }
    }
}

cl_config.scoreboard = {
    enable = true, -- false to disable the scoreboard ink. ui
    command = "scoreboard", -- command name to open the scoreboard
    keymapping = {
        enable = true, -- to disable the scoreboard key to open the scoreboard | if false you can only open the ui with cl_config.scoreboard.command name
        title = "Open Scoreboard", -- "esc" -> "settings" -> "keyboard" -> name
        key = "F9", -- key to open the scoreboard ui
    },
    jobs = {
        {
            name = "POLICE", -- job display name
            job_name = "police", -- job name from db
            color = "rgba(49, 179, 255, 0.48)", -- background color from the ui container with the job
            icon = "fa-solid fa-clock" -- icon: https://icon-sets.iconify.design
        },
        {
            name = "AMBULANCE",
            job_name = "ambulance",
            color = "rgba(237, 37, 47, 0.38)",
            icon = "fa-solid fa-clock"
        },
        {
            name = "MECHANIKER",
            job_name = "mechaniker",
            color = "rgba(255, 230, 0, 0.48)",
            icon = "fa-solid fa-clock"
        }
    }
}

cl_config.voicerange = {
    enable = true,
    range = { -- PMA
        [1] = 3.0,
        [2] = 8.0,
        [3] = 16.0,
        [4] = 32.0 -- ignore if you have only 3 ranges
    },
    marker = {
        type = 1,
        colour = {
            r = 111,
            g = 3,
            b = 252,
            a = 255
        }
    }
}

cl_config.commands = {
    notify_title = "System", -- notify title from /id /ids
    hud = {
        enabled = true, -- falso to disable the HUD command
        command = "hud" -- command name
    },
    ids = {
        enable = true, -- false to disable the command
        command = "ids" -- command name
    },
    id = {
        enable = true, -- false to disable the command
        command = "id" -- command name
    },
    engine = {
        enable = true,
        command = "engine",
        keymapping = {
            enable = true, -- to disable the engine toggle key | if false you can only toggle the engine with the command
            title = "Toggle Engine", -- "esc" -> "settings" -> "keyboard" -> name
            key = "G", -- key to toggle the engine
        },
    },
    cruise_control = {
        enable = true, --
        command = "cruisecontrol",
        keymapping = {
            title = "Cruise Control", -- "esc" -> "settings" -> "keyboard" -> name
            key = "F1", -- key to toggle the cruise control
        }
    }
}

cl_config.language = {
    ["de"] = {
        ["scoreboard"] = {
            ["title"] = "SCOREBOARD",
            ["description"] = "Aktuelle Anzahl von Spielern für einen bestimmten Beruf",
            ["online"] = "Spieler"
        },
        ["notification"] = {
            ["voice"] = {
                ["title"] = "Voice Range",
                ["range"]= "Du hast deine Sprachreichweite auf %s Meter gestellt.",
            },
            ["commands"] = {
                ["vehicle"] = {
                    ["cruise_control_true"] = "Du hast den Tempomat eingeschalten! [%s km/h]",
                    ["cruise_control_false"] = "Du hast den Tempomat ausgeschalten!",
                    ["engine_true"] = "Du hast deinen Motor erfolgreich angeschaltet",
                    ["engine_false"] = "Du hast deinen Motor erfolgreich ausgeschaltet"
                },
                ["player"] = {
                    ["playerid"] = "Deine Spieler ID ist: %s",
                    ["playerids"] = "Die ID des nächstgelegenen Spielers lautet: %s",
                    ["no_players"] = "Es sind keine Spieler in deiner Nähe!",
                }
            }
        }
    },
    ["en"] = {
        ["scoreboard"] = {
            ["title"] = "SCOREBOARD",
            ["description"] = "Current number of players for a specific profession",
            ["online"] = "Players"
        },
        ["notification"] = {
            ["voice"] = {
                ["title"] = "Voice Range",
                ["range"] = "You have set your voice range to %s meters.",
            },
            ["commands"] = {
                ["vehicle"] = {
                    ["cruise_control_true"] = "You have activated the cruise control! [%s km/h]",
                    ["cruise_control_false"] = "You have deactivated the cruise control!",
                    ["engine_true"] = "You have successfully started your engine",
                    ["engine_false"] = "You have successfully turned off your engine"
                },
                ["player"] = {
                    ["playerid"] = "Your player ID is: %s",
                    ["playerids"] = "The ID of the nearest player is: %s",
                    ["no_players"] = "There are no players near you!",
                }
            }
        }
    },
}

