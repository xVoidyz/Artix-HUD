# Artix-HUD
remaked narco city hud

https://prnt.sc/mij6BNa5nyqu

📢 HUD Voice Anzeige für Ingame Voice & SaltyChat
🔧 Beschreibung
Dieses Script fügt deinem FiveM-Server ein modernes, minimalistisches HUD hinzu, das die aktuelle Voice-Ebene (Flüstern, Normal, Schreien) sowie den Sprachstatus (Sprechen / Stumm) des Spielers visuell anzeigt. Es ist vollständig kompatibel mit dem nativen Ingame Voice System und SaltyChat, dem beliebten Voice-Plugin für TeamSpeak.

🧩 Features
🔊 Dynamische Anzeige der Sprachreichweite (Whisper / Normal / Shout)

🎙️ Anzeige, ob der Spieler gerade spricht (animiertes Mikrofonsymbol)

🔁 Automatische Erkennung von Voice-Modus-Wechseln

🧼 Minimalistisches Design, einfach anpassbar (HTML/CSS/JS oder Lua/NUI)

💬 Kompatibel mit SaltyChat über natives Event-Handling

🛠️ Kann mit jedem Framework (z. B. ESX, QBCore, Standalone) verwendet werden

⚙️ Voraussetzungen
Ein laufender FiveM-Server

SaltyChat (inkl. Plugin und TeamSpeak-Setup) oder natives Voice-System

(Optional) NUI-Unterstützung für benutzerdefiniertes UI

🔌 Installation
Lade das Script herunter und platziere es im resources-Ordner deines Servers.

Füge start voicehud (oder den entsprechenden Ordnernamen) in deine server.cfg ein.

Stelle sicher, dass SaltyChat ordnungsgemäß installiert und konfiguriert ist (bei Nutzung).

Passe bei Bedarf die HUD-Position und -Stile in der config.lua oder der html/style.css an.

🧠 Hinweise
Das HUD verwendet entweder NetworkIsPlayerTalking (bei nativer Voice) oder die Events von SaltyChat (SaltyChat_TalkStateChanged, SaltyChat_VoiceRangeChanged).

Mehrsprachigkeit kann einfach durch Anpassung der Labels in der HTML oder Lua umgesetzt werden.

Das HUD kann auch in bestehende UIs integriert werden (z. B. RP-HUDs, Statusanzeigen).

