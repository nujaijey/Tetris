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
})()