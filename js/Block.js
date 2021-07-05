(function () {
    window.Block = function () {
        // 得到随机的方块
        // 第一步：罗列所有的类型
        var allType = ["S", "Z", "J", "L", "O", "T", "I"];
        // 第二步：从所有类型中随机得到一种
        this.type = allType[parseInt(Math.random() * allType.length)];
        // 第三步：得到随机的类型方块，然后通过这个类型获取当前的类型所有形状总数量，因为不同的类型，形状数量不同，比如O只有1种，I有2种，L有4种
        this.allDir = allBlock[this.type].length;
        // 第四步：通过当前的allDir的length随机得到不同的数字
        this.dir = parseInt(Math.random() * this.allDir);
        // 第五步：得到随机方块
        this.ranBlock = allBlock[this.type][this.dir];
        // 初始的行和列（居中显示）
        this.row = 0;
        this.col = 4;
    }
    Block.prototype.render = function () {
        // 渲染四行四列的方块
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                // 不为0的位置渲染颜色
                if (this.ranBlock[i][j] != 0) {
                    game.setColor(i + this.row, j + this.col, this.ranBlock[i][j]);
                }
            }
        }
    }

    Block.prototype.check = function (row, col) {
        // check函数的row和col指的是要校验的地图的row和col的位置
        // 能力判断方法，判读的是对应位置的方块和地图是否有都不为0的情况，如果有返回true，否则返回false；false就代表没有重合
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if (this.ranBlock[i][j] != 0 && game.gameMap.mapCode[i + row][j + col] != 0) {
                    return false;
                }
            }
        }
        return true;
    }

    // 方块下落：需要判断当前方块是否能够下落
    Block.prototype.checkDown = function () {
        // 判断当前地图的位置和自己方块的位置是否有重合，this.row+1指的是预判断
        // 预判断就是在下一次方块将要到达的位置是否有对应的地图不为0
        if (this.check(this.row + 1, this.col)) {
            this.row++;
        } else {
            // 此时就是下落到底的状态，渲染新的方块
            game.block = new Block();
            // 方块到底要渲染到地图上
            this.renderMap();
        }
    }

    // 将已经到底的方块渲染到地图上
    Block.prototype.renderMap = function () {
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                // 将现在已有的方块渲染到GameMap类的mapCode上
                if (this.ranBlock[i][j] != 0) {
                    // 改变地图的mapCode数据
                    game.gameMap.mapCode[this.row + i][this.col + j] = this.ranBlock[i][j];
                }
            }
        }
    }
})()