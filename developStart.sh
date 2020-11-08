#!/bin/bash

tmux new -s bm -d
tmux send-keys -t bm "tmux split-window -h" Enter
tmux send-keys -t bm "tmux split-window -h" Enter
tmux send-keys -t bm "tmux send-keys -t right \"cd ../react-messenger-front; yarn start\" Enter" Enter
tmux send-keys -t bm "yarn start:dev" Enter
tmux attach -t bm -d
