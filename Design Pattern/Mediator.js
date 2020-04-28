/* 中介者模式 */
// 以泡泡堂游戏为例

function Player(name, teamColor) {
  this.name = name // 角色名字
  this.teamColor = teamColor // 队伍颜色
  this.state = 'alive' // 玩家生存状态
}

Player.prototype.win = function () {
  console.log(`${this.name} won`)
}

Player.prototype.lose = function () {
  console.log(`${this.name} lost`)
}

Player.prototype.die = function () {
  this.state = 'dead'
  playerDirector.receiveMessage('playerDead', this) // 给中介者发送消息，玩家死亡
}

Player.prototype.remove = function () {
  playerDirector.receiveMessage('removePlayer', this) // 给中介者发送消息，移除一个玩家
}

Player.prototype.changeTeam = function (color) {
  playerDirector.receiveMessage('changeTeam', this, color) // 给中介者发送消息，玩家换队
}

let playerFactory = function (name, teamColor) {
  let newPlayer = new Player(name, teamColor) // 创建一个新的玩家对象
  playerDirector.receiveMessage('addPlayer', newPlayer) // 给中介者发送消息，新增玩家
  return newPlayer
}

// 中介者
let playerDirector = (function () {
  let players = {}, // 保存所有玩家
    operations = {} // 中介者执行的操作

  // 新增一个玩家
  operations.addPlayer = function (player) {
    let teamColor = player.teamColor
    players[teamColor] = players[teamColor] || []
    players[teamColor].push(player)
  }

  // 移除一个玩家
  operations.removePlayer = function (player) {
    let teamColor = player.teamColor,
      teamPlayers = players[teamColor] || []

    for (let i = 0; i < teamPlayers.length; i++) {
      if (teamPlayers[i] == player) {
        teamPlayers.splice(i, 1)
      }
    }
  }

  // 玩家换队
  operations.changeTeam = function (player, newTeamColor) {
    operations.removePlayer(player)
    player.teamColor = newTeamColor
    operations.addPlayer(player)
  }

  // 玩家死亡
  operations.playerDead = function (player) {
    let teamColor = player.teamColor,
      teamPlayers = players[teamColor]

    let all_dead = true

    for (let i = 0; i < teamPlayers.length; i++) {
      if (teamPlayers[i].state !== 'dead') {
        all_dead = false
        break
      }
    }

    if (all_dead == true) {
      for (let i = 0; i < teamPlayers.length; i++) {
        teamPlayers[i].lose()
      }

      for (let color in players) {
        if (color !== teamColor) {
          let teamPlayers = players[color]
          for (let i = 0; i < teamPlayers.length; i++) {
            teamPlayers[i].win()
          }
        }
      }
    }
  }

  let receiveMessage = function () {
    let message = Array.prototype.shift.call(arguments) // arguments的第一个参数为消息名称
    operations[message].apply(this, arguments)
  }

  return {
    receiveMessage,
  }
})()

// 红队
let player1 = playerFactory('皮蛋', 'red'),
  player2 = playerFactory('小乖', 'red'),
  player3 = playerFactory('宝宝', 'red'),
  player4 = playerFactory('小强', 'red')

// 红队
let player5 = playerFactory('黑妞', 'blue'),
  player6 = playerFactory('葱头', 'blue'),
  player7 = playerFactory('胖墩', 'blue'),
  player8 = playerFactory('海盗', 'blue')

player1.die()
player2.die()
player3.die()
player4.die()
