(function () {
    window.Game = function () {
        // 设置行和列
        this.row = 20;
        this.col = 12;
        // 初始化
        this.init();
        // 实例方块
        this.block = new Block();
        // 实例地图
        this.gameMap = new GameMap(this);
        // 启动定时器
        this.start();
        // 事件监听
        this.bindEvent();
    }

    Game.prototype.init = function () {
        // 渲染表格
        var $table = $("<table></table>")
        for (var i = 0; i < this.row; i++) {
            var $tr = $("<tr></tr>");
            for (var j = 0; j < this.col; j++) {
                var $td = $("<td></td>")
                $td.appendTo($tr);
            }
            $tr.appendTo($table);
        }
        $table.appendTo("body");
    }

    Game.prototype.setColor = function (row, col, num) {
        // 给对应有颜色的方块添加类名
        $("tr").eq(row).children("td").eq(col).addClass("c" + num);
    }

    // 擦除画布
    Game.prototype.clear = function () {
        for (var i = 0; i < this.row; i++) {
            for (var j = 0; j < this.col; j++) {
                $("tr").eq(i).children("td").eq(j).removeClass();
            }
        }
    }

    Game.prototype.bindEvent = function () {
        // 声明self来备份this的原因：document对象的this指向window
        var self = this;
        // 键盘事件
        $(document).keydown(function (event) {
            if (event.keyCode == 37) {
                // 判断是否有向左移动的能力
                self.block.checkLeft();
            } else if (event.keyCode == 39) {
                // 判断是否有向右移动的能力
                self.block.checkRight();
            } else if (event.keyCode == 32) {
                // 空格：一键到底
                self.block.checkEnd();
            } else if (event.keyCode == 38) {
                // 方块旋转
                self.block.checkRot();
            }

        })
    }

    Game.prototype.start = function () {
        var self = this;
        this.timer = setInterval(function () {
            // 清屏
            self.clear();
            // 渲染方块
            self.block.render();
            // 渲染地图
            self.gameMap.render(self);
            // 方块下落
            self.block.checkDown();
        }, 500);
    }
})();