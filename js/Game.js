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

    Game.prototype.start = function () {
        var self = this;
        this.timer = setInterval(function () {
            // 渲染方块
            self.block.render();
            // 渲染地图
            self.gameMap.render(self);
        }, 500);
    }
})();