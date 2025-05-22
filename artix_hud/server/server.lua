local jobs, sperrzone, language, ESX = {}, {}, sv_config.language[cl_config.general.language], nil

-- // get ESX \\ 
if exports["es_extended"]:getSharedObject() then
    ESX = exports["es_extended"]:getSharedObject()
else
    TriggerEvent("esx:getSharedObject", function(obj) ESX = obj end)
end

Citizen.CreateThread(function()
    for _, v in pairs(cl_config.scoreboard.jobs) do
        table.insert(jobs, {name = v.name, job_name = v.job_name, count = 0, icon = v.icon, color = v.color})
    end
    if sv_config.policezone.enabled then
        for k, v in pairs(sv_config.policezone.jobs) do
            sperrzone[k] = {coords = 0, radius = 0, streetName = "", enabled = false}
        end
    end
    Wait(2000)
    TriggerClientEvent("cs_hud:sendServerData", -1, GetNumPlayerIndices(), GetConvar("sv_maxclients", 32))
end)

Citizen.CreateThread(function()
    while true do
        Wait(sv_config.general.intervall)
        TriggerClientEvent("cs_hud:sendServerData", -1, GetNumPlayerIndices(), GetConvar("sv_maxclients", 32))
    end
end)

RegisterNetEvent("esx:playerLoaded")
AddEventHandler("esx:playerLoaded", function(playerData)
    playerData = playerData
    Wait(3500)
    updateJobCounts()
    TriggerClientEvent("cs_hud:updateData", -1, jobs)
    TriggerClientEvent("cs_hud:sendServerData", playerData, GetNumPlayerIndices(), GetConvar("sv_maxclients", 32))
    TriggerEvent("cs_hud:checkforsperrzone", playerData)
end)

RegisterCommand(sv_config.announce.command, function(source,args)
    local src = source
    local msg = table.concat(args, " ")
    if src ~= 0 then
        if msg ~= nil and msg ~= "" then
            local xPlayer = ESX.GetPlayerFromId(src)
            if sv_config.announce.groups[xPlayer.getGroup()] then
                TriggerClientEvent("cs_announce", -1, "Announce", msg, 7500)
            else
                TriggerClientEvent("cs_notify", src, "error", "cc Hud", language["announce"]["command"]["no_perms"], 5000)
            end
        else
            TriggerClientEvent("cs_notify", src, "error", "cc Hud", language["announce"]["command"]["no_value"], 5000)
        end
    else
        TriggerClientEvent("cs_announce", -1, "txAdmin", msg, 7500)
        print("^2You have successfully send a ^4txAdmin^2 announce!^0")
    end
end)

AddEventHandler("txAdmin:events:scheduledRestart", function(eventData)
    if eventData.secondsRemaining ~= 60 then 
        TriggerClientEvent("cs_announce", -1, "txAdmin", string.format(language["announce"]["txAdmin"]["scheduled_restart"], math.ceil(eventData.secondsRemaining / 60)), 7500)
    else
        TriggerClientEvent("cs_announce", -1, "txAdmin", string.format(language["announce"]["txAdmin"]["scheduled_restart_disconnect"], eventData.secondsRemaining), 7500)
    end
end)

AddEventHandler("txAdmin:events:announcement", function(data)
    TriggerClientEvent("cs_announce", -1, "txAdmin",data.author.. ": "..data.message, 7500)
end)

RegisterNetEvent("cs_hud:updatescoreboard")
AddEventHandler("cs_hud:updatescoreboard", function()
    updateJobCounts()
    TriggerClientEvent("cs_hud:updateData", -1, jobs)
end)

AddEventHandler("esx:setJob", function(job)
    updateJobCounts()
    TriggerClientEvent("cs_hud:updateData", -1, jobs)
end)

function updateJobCounts()
    for _, v in pairs(jobs) do
        v.count = 0
    end
    
    local xPlayers = ESX.GetPlayers()
    for _, playerId in pairs(xPlayers) do
        local xPlayer = ESX.GetPlayerFromId(playerId)
        if xPlayer then
            for _, job in pairs(jobs) do
                if xPlayer.job.name == job.job_name then
                    job.count = job.count + 1
                end
            end
        else
            print("Error: Player with ID " .. playerId .. " not found.")
        end
    end
end
RegisterNetEvent("cs_hud:checkforsperrzone")
AddEventHandler("cs_hud:checkforsperrzone", function(source)
    for k, v in pairs(sv_config.policezone.jobs) do
        if sperrzone[k].enabled then
            TriggerClientEvent("cs_announce", source, language["announce"]["policezone"]["title"], string.format(language["announce"]["policezone"]["zone_active"], sv_config.policezone.jobs[k].label, sperrzone[k].streetName, sperrzone[k].radius), 12000)
            TriggerClientEvent("cs_hud:changesperrzone", -1, sperrzone[k], k, sv_config.policezone.jobs[k], true)
        end
    end
end)

RegisterNetEvent("cs_hud:speerzonecreate")
AddEventHandler("cs_hud:speerzonecreate", function(radius, street)
    local xPlayer = ESX.GetPlayerFromId(source)
    if xPlayer ~= nil then
        if radius == nil then
			radius = sv_config.policezone.radius.default
		end
        if Jobcheck(xPlayer) and Gradecheck(xPlayer) then 
            if sperrzone[xPlayer.job.name].enabled then 
                TriggerClientEvent("cs_notify", xPlayer.source, "error", language["notification"]["policezone"]["title"], language["notification"]["policezone"]["zone_isactive"], 5000)
            else
                if radius < sv_config.policezone.radius.max + 1 then
                    setTable(xPlayer, true, xPlayer.getCoords(true), radius, street)
                    TriggerClientEvent("cs_announce", -1, language["announce"]["policezone"]["title"], string.format(language["announce"]["policezone"]["zone_active"], sv_config.policezone.jobs[xPlayer.job.name].label, street, radius), 12000)
                    TriggerClientEvent("cs_hud:changesperrzone", -1, sperrzone[xPlayer.job.name], xPlayer.job.name, sv_config.policezone.jobs[xPlayer.job.name], true)
                else
                    TriggerClientEvent("cs_notify", xPlayer.source, "error", language["notification"]["policezone"]["title"], string.format(language["notification"]["policezone"]["radius"], sv_config.policezone.radius.max), 5000)
                end
            end
        end
    end
end)

if sv_config.policezone.enabled then
    RegisterCommand(sv_config.policezone.commands.create, function(src, args)
        if src == 0 then print("^1You dont can do this in the ^4txAdmin ^1console!^0") return end
        TriggerClientEvent("cs_hud:registersperrzone", src, args)
    end)
end

if sv_config.policezone.enabled then
    RegisterCommand(sv_config.policezone.commands.remove, function(src, args)
        if src == 0 then print("^1You dont can do this in the ^4txAdmin ^1console!^0") return end
        local xPlayer = ESX.GetPlayerFromId(src)
        if xPlayer ~= nil then
            if Jobcheck(xPlayer) and Gradecheck(xPlayer) then
                if sperrzone[xPlayer.job.name].enabled then
                    TriggerClientEvent("cs_hud:changesperrzone", -1, sperrzone[xPlayer.job.name], xPlayer.job.name, sv_config.policezone.jobs[xPlayer.job.name], false)
                    TriggerClientEvent("cs_announce", -1, language["announce"]["policezone"]["title"], string.format(language["announce"]["policezone"]["zone_deactive"], sv_config.policezone.jobs[xPlayer.job.name].label, sperrzone[xPlayer.job.name].streetName), 6000)
                    setTable(xPlayer, false, 0, 0, "")
                else
                    TriggerClientEvent("cs_notify", xPlayer.source, "error", language["notification"]["policezone"]["title"], language["notification"]["policezone"]["zone_isdeactive"], 5000)
                end
            end
        end
    end)
end

function setTable(xPlayer, enabled, coords, radius, street)
    sperrzone[xPlayer.job.name].enabled = enabled
    sperrzone[xPlayer.job.name].coords = coords
    sperrzone[xPlayer.job.name].radius = radius
    sperrzone[xPlayer.job.name].streetName = street
end

function Jobcheck(xPlayer)
    if sv_config.policezone.jobs[xPlayer.job.name] then
        return true
    else
        TriggerClientEvent("cs_notify", xPlayer.source, "error", language["notification"]["policezone"]["title"], language["notification"]["job_invalid"], 5000)
    end
    return false
end

function Gradecheck(xPlayer)
    if sv_config.policezone.jobs[xPlayer.job.name].grade <= xPlayer.job.grade then
        return true
    else
        TriggerClientEvent("cs_notify", xPlayer.source, "error", language["notification"]["policezone"]["title"], string.format(language["notification"]["policezone"]["rank_invalid"], sv_config.policezone.jobs[xPlayer.job.name].grade), 5000)
    end
    return false
end
