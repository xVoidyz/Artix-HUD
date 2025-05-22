fx_version 'cerulean'
game 'gta5'

author ''
description ''
version '1.3.0'

lua54 'yes'

ui_page 'html/index.html'

shared_scripts {
    'config/cl_config.lua'
}

client_scripts {
    'client/client.lua'
}

server_scripts {
    'config/sv_config.lua',
    'server/server.lua'
}

files {
    'html/**'
}

export {
    "progressbar",
    "helpnotify",
    "hidehud",
    "announce",
    "notify"
}

escrow_ignore {
	'config/cl_config.lua',
    'config/sv_config.lua'
}