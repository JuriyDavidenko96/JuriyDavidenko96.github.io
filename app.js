var BlockType;
(function (BlockType) {
    BlockType[BlockType["Dirt"] = 0] = "Dirt";
    BlockType[BlockType["Wood"] = 1] = "Wood";
    BlockType[BlockType["Stone"] = 2] = "Stone";
})(BlockType || (BlockType = {}));
var PickaxeType;
(function (PickaxeType) {
    PickaxeType[PickaxeType["Wood"] = 0] = "Wood";
})(PickaxeType || (PickaxeType = {}));
var PickaxeData = /** @class */ (function () {
    function PickaxeData(type) {
        this.Type = type;
        switch (type) {
            case PickaxeType.Wood:
                this.Attack = 3;
                break;
            default:
                break;
        }
    }
    return PickaxeData;
}());
var BlockData = /** @class */ (function () {
    function BlockData(type) {
        this.Type = type;
        switch (type) {
            case BlockType.Dirt:
                this.HP = 10;
                this.MaxHP = this.HP;
                this.Bounty = 1;
                this.ClassName = "dirt";
                break;
            case BlockType.Wood:
                this.HP = 25;
                this.MaxHP = this.HP;
                this.Bounty = 3;
                this.ClassName = "wood";
                break;
            case BlockType.Stone:
                this.HP = 50;
                this.MaxHP = this.HP;
                this.Bounty = 5;
                this.ClassName = "stone";
                break;
            default:
                break;
        }
    }
    return BlockData;
}());
function ClearDamageIndicator(i) {
    i.classList.remove("one");
    i.classList.remove("two");
    i.classList.remove("three");
    i.classList.remove("four");
}
window.onload = function () {
    var gameArea = document.getElementById('game');
    var pickaxe = document.getElementById('pickaxe');
    var block = document.getElementById('block');
    var damageIndicator = document.getElementById('damage');
    var scoreIndicator = document.getElementById("scoreIndicator");
    var score = 0;
    var currentBlock;
    // wood pickaxe in game start
    var currentPickaxe = new PickaxeData(PickaxeType.Wood);
    function GetPosition(e) {
        var posx = 0;
        var posy = 0;
        if (e.pageX || e.pageY) {
            posx = e.pageX;
            posy = e.pageY;
        }
        else if (e.clientX || e.clientY) {
            posx = e.clientX + document.body.scrollLeft
                + document.documentElement.scrollLeft;
            posy = e.clientY + document.body.scrollTop
                + document.documentElement.scrollTop;
        }
        return {
            x: posx,
            y: posy
        };
    }
    function UpdateUI() {
        scoreIndicator.textContent = score.toString();
    }
    window.onmousemove = function (e) {
        var pos = GetPosition(e);
        var x = pos.x;
        var y = pos.y;
        pickaxe.style.cssText += "left:" + x.toString() + "px;top:" + y.toString() + "px;";
    };
    function BlockDamage() {
        currentBlock.HP -= currentPickaxe.Attack;
        if (currentBlock.HP <= 0) {
            score += currentBlock.Bounty;
            UpdateUI();
            NextBlock();
        }
        else {
            score++;
            UpdateUI();
            var onePercent = currentBlock.MaxHP * 0.01;
            var hpPercent = currentBlock.HP / onePercent;
            if (hpPercent <= 20) {
                ClearDamageIndicator(damageIndicator);
                damageIndicator.classList.add("four");
            }
            else if (hpPercent <= 40) {
                ClearDamageIndicator(damageIndicator);
                damageIndicator.classList.add("three");
            }
            else if (hpPercent <= 60) {
                ClearDamageIndicator(damageIndicator);
                damageIndicator.classList.add("two");
            }
            else if (hpPercent <= 80) {
                ClearDamageIndicator(damageIndicator);
                damageIndicator.classList.add("one");
            }
        }
    }
    function BlockClickBehavior(e) {
        if (!pickaxe.classList.contains("wait") && e.button == 0) {
            BlockDamage();
            var coolDown = 800;
            pickaxe.classList.add("wait");
            pickaxe.style.cssText += "transform: rotate(50deg);";
            setTimeout(function (x) {
                pickaxe.style.cssText += "transform: rotate(0deg);";
            }, coolDown / 2);
            setTimeout(function (x) {
                pickaxe.classList.remove("wait");
            }, coolDown);
        }
    }
    block.onmousedown = function (e) { return BlockClickBehavior(e); };
    pickaxe.onmousedown = function (e) {
        var x = e.pageX;
        var y = e.pageY;
        var rect = block.getBoundingClientRect();
        if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
            BlockClickBehavior(e);
        }
    };
    function NextBlock() {
        ClearDamageIndicator(damageIndicator);
        // first block in game
        if (score == 0) {
            currentBlock = new BlockData(BlockType.Dirt);
            block.classList.add(currentBlock.ClassName);
        }
        else {
            var rnd = Math.random() % 100 + 1;
            // todo need fix
            currentBlock = new BlockData(BlockType.Dirt);
            block.classList.add(currentBlock.ClassName);
        }
    }
    NextBlock();
};
//# sourceMappingURL=app.js.map