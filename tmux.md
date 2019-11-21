### 会话操作
* tmux new-session/new -s <会话名称> <初始命令>
* tmux attach-session/attach/a -t <会话名称> 进入会话  || tmux <会话名称>
* [Ctrl+b] [d] 分离会话
* tmux list-session/ls 列出所有会话
* tmux new -n <窗口名称>  创建会话的时候定制名称。本质还是创建会话
* tmux new -s <会话名称> -n <窗口名称> 同上

### 窗口操作
* [Ctrl+b] [c] 创建窗口
* [Ctrl+b] p/n 上一个/下一个 窗口
* [Ctrl+b] 0-9 跳转窗口
* [Ctrl+b] w 显示窗口列表，然后选择进入
* [Ctrl+b] , 更改窗口名称
* [Ctrl+b] & 关闭窗口

### 窗格操作
* [Ctrl+b] % 垂直切分窗口
* [Ctrl+b] " 水平切分窗口
* [Ctrl+b] o 窗格顺序切换
* [Ctrl+b] 方向键 窗格切换
