#!/bin/bash

NPM_PATH=$(which npm | xargs dirname)
NODE_PATH=$(which node | xargs dirname)
REPO_PATH=$(pwd)

sudo cat > /etc/systemd/system/vantgui.service << EOF
[Unit]
Description=Vant GUI Service

[Service]
Type=simple
ExecStart=$REPO_PATH/vant_gui.sh
Restart=on-failure
RestartSec=1
KillMode=control-group
PIDFile=/run/vant_gui.pid
Environment=PATH=/usr/bin:/usr/local/bin:$NPM_PATH:$NODE_PATH
Environment=NODE_ENV=production
WorkingDirectory=$REPO_PATH

[Install]
WantedBy=multi-user.target
EOF
