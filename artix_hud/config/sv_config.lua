sv_config = {}

sv_config.general = {
    intervall = 20000, -- interval to update the player counting
}

sv_config.announce = {
    enable = true, -- false to disable announcement command
    command = "announce", -- announcement command name
    time = 6000, -- time how long show the announcement
    groups = {
        ["owner"],
        ["admin"],
    }
}

sv_config.policezone = {
    enabled = true, -- false to disable policezones
    commands = { -- change the command names if you want
        create = "spzo", -- to create a policezone
        remove = "spzorm" -- to delete a policezone
    },
    radius = {
        default = 100, -- default value if you forgot to set a radius number
        max = 350, -- max radius of a policezone
        min = 50 -- min radios of a policezone
    },
    jobs = {
        -- you can add unlimeted jobs
        ["police"] = {
            label = "LSPD", -- job name in the announce
            color = 38, -- blip color: https://docs.fivem.net/docs/game-references/blips/
            blip = 60, -- blip display: https://docs.fivem.net/docs/game-references/blips/
            grade = 0 -- min grade to create a policezone
        },
        ["ambulance"] = {
            label = "LSMD",
            color = 1, -- blip color: https://docs.fivem.net/docs/game-references/blips/
            blip = 61, -- blip display: https://docs.fivem.net/docs/game-references/blips/
            grade = 0
        }
    }
}

sv_config.language = {
    ["de"] = {
        ["notification"] = {
            ["policezone"] = {
                ["title"] = "Sperrzone",
                ["rank_invalid"] = "Du musst mindestens Rang %s sein, um diese Aktion durchführen zu können!",
                ["job_invalid"] = "Du bist nicht berechtigt diese aktion durchzuführen!",
                ["radius"] = "Der Radius darf nicht größer als %s m sein!",
                ["zone_isdeactive"] = "Es ist derzeit keine Sperrzone vorhanden",
                ["zone_isactive"] = "Eine Speerzone ist bereits ausgestellt worden!",
            }
        },
        ["announce"] = {
            ["policezone"] = {
                ["title"] = "Sperrzone",
                ["zone_active"] = "Das %s hat eine Sperrzone an der %s Street ausgerufen! Wer sich der Sperrzone %s m nähert, kann mit einer Festnahme rechnen!",
                ["zone_deactive"] = "Das %s hat die Aktuelle Sperrzone an der %s Street zurückgerufen!"
            },
            ["command"] = {
                ["no_perms"] = "Dazu hast du keine Rechte!",
                ["no_value"] = "Du musst mindestens 1 zeichen angeben!"
            },
            ["txAdmin"] = {
                ["scheduled_restart"] = "Der Server wird in %s Minuten neugestartet!",
                ["scheduled_restart_disconnect"] = "Der Server wird in %s Sekunden neugestartet. Trenne die Verbindung jetzt!"
            }
        }
    },
    ["en"] = {
        ["notification"] = {
            ["policezone"] = {
                ["title"] = "Restricted Zone",
                ["rank_invalid"] = "You must be at least rank %s to perform this action!",
                ["job_invalid"] = "You are not authorized to perform this action!",
                ["radius"] = "The radius cannot be larger than %s m!",
                ["zone_isdeactive"] = "There is currently no restricted zone.",
                ["zone_isactive"] = "A restricted zone has already been issued!",
            }
        },
        ["announce"] = {
            ["policezone"] = {
                ["title"] = "Restricted Zone",
                ["zone_active"] = "%s has declared a restricted zone on %s Street! Anyone approaching the restricted zone within %s m may face arrest!",
                ["zone_deactive"] = "%s has recalled the current restricted zone on %s Street!"
            },
            ["command"] = {
                ["no_perms"] = "You do not have the permissions to do that!",
                ['no_value'] = 'You must enter at least 1 character!'
            },
            ["txAdmin"] = {
                ["scheduled_restart"] = "The server will restart in %s minutes!",
                ["scheduled_restart_disconnect"] = "The server will restart in %s seconds. Disconnect now!"
            }
        }
    },
}