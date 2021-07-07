(function () {
    window.Game = function () {
        // 设置行和列
        this.row = 20;
        this.col = 12;
        // 初始化
        this.init();
        // 实例方块
        this.block = new Block();
        // 实例下一个方块
        this.nextBlock = new Block();
        // 实例地图
        this.gameMap = new GameMap(this);
        // 启动定时器
        this.start();
        // 事件监听
        this.bindEvent();
        // 分数
        this.score = 0;
        // 速度
        this.during = 30;
    }

    Game.prototype.init = function () {
        // 渲染大表格
        var $table = $("<table></table>")
        $table.addClass("tb1");
        for (var i = 0; i < this.row; i++) {
            var $tr = $("<tr></tr>");
            for (var j = 0; j < this.col; j++) {
                var $td = $("<td></td>")
                $td.appendTo($tr);
            }
            $tr.appendTo($table);
        }
        // 渲染预览窗口
        var $table2 = $("<table></table>")
        $table2.addClass("tb2");
        for (var i = 0; i < 4; i++) {
            var $tr2 = $("<tr></tr>");
            for (var j = 0; j < 4; j++) {
                var $td2 = $("<td></td>")
                $td2.appendTo($tr2);
            }
            $tr2.appendTo($table2);
        }
        $table.appendTo("body");
        $table2.appendTo("body");
    }

    // 设置颜色的方法
    Game.prototype.setColor = function (row, col, num) {
        // 给对应有颜色的方块添加类名
        $(".tb1").find("tr").eq(row).children("td").eq(col).addClass("c" + num);
    }

    // 渲染预览方块
    Game.prototype.renderNextBlock = function () {
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                // 不为0的位置渲染颜色
                if (this.nextBlock.ranBlock[i][j] != 0) {
                    // 给对应有颜色的方块添加类名
                    $(".tb2").find("tr").eq(i).children("td").eq(j).addClass("c" + this.nextBlock.ranBlock[i][j]);
                }
            }
        }

    }

    // 擦除画布
    Game.prototype.clear = function () {
        // 擦除大表格
        for (var i = 0; i < this.row; i++) {
            for (var j = 0; j < this.col; j++) {
                $(".tb1").find("tr").eq(i).children("td").eq(j).removeClass();
            }
        }
        // 擦除预览框
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                $(".tb2").find("tr").eq(i).children("td").eq(j).removeClass();
            }
        }
    }

    // 设置键盘的事件监听
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
        // 帧编号
        this.f = 0;
        this.timer = setInterval(function () {
            self.f++;
            $("#f").html("帧编号：" + self.f);
            // 清屏
            self.clear();
            // 渲染方块
            self.block.render();
            // 渲染预览方块
            self.renderNextBlock();
            // 渲染地图
            self.gameMap.render(self);
            // 方块下落
            self.f % self.during == 0 && self.block.checkDown();
        }, 20);
    }
})();