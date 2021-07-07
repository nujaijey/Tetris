(function () {
    window.GameMap = function () {
        // 地图矩阵
        this.mapCode = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 6, 0, 3, 0, 0, 0],
            [1, 2, 3, 4, 5, 6, 7, 4, 2, 0, 0, 0],
            [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9]
        ]
    }

    // 渲染地图
    GameMap.prototype.render = function (mapGame) {
        for (var i = 0; i < mapGame.row; i++) {
            for (var j = 0; j < mapGame.col; j++) {
                if (this.mapCode[i][j] != 0) {
                    game.setColor(i, j, this.mapCode[i][j]);
                }
            }
        }
    }

    // 判断当前的mapCode是否该消行
    // 消行规则：当前的mapCode数组的每一项都不为0进行消行
    GameMap.prototype.checkRemove = function () {
        // 遍历地图数组进行判断
        for (var i = 0; i < 20; i++) {
            // indexOf(0)==-1：元素在数组中不存在
            if (this.mapCode[i].indexOf(0) == -1) {
                // splice()方法可删除从index处开始的零个或多个元素
                // 删除这一行
                this.mapCode.splice(i, 1);
                // 删除一行补一行（在头部增加一行）
                this.mapCode.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
                // 根据不同的速度决定分数增加
                if (game.during > 20 && game.during <= 30) {
                    game.score += 10;
                } else if (game.during > 10 && game.during <= 20) {
                    game.score += 20;
                } else {
                    game.score += 30;
                }
                $("#score").html("分数：" + game.score);
                if (game.score % 100 == 0) {
                    game.during -= 5;
                    if (game.during <= 0) game.during = 1;
                }
            }
        }
    }
})();