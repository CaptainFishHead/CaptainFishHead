export const storyNodes = {
  start: {
    id: 'start',
    title: '序章：迷雾中的任务',
    speaker: '旁白',
    background: '/bg-city.svg',
    text: '1939 年的夜色中，你收到一封匿名密信。组织要求你潜入敌方机关，寻找代号“灰鸽”的内鬼。',
    choices: [
      {
        text: '立即行动，今晚潜入档案室',
        next: 'archive',
        effects: { trustOrg: -1 }
      },
      {
        text: '先联系线人，确认真假',
        next: 'informant',
        effects: { trustOrg: 1 }
      }
    ]
  },
  archive: {
    id: 'archive',
    title: '第一章：档案室',
    speaker: '你',
    background: '/bg-archive.svg',
    text: '你翻开绝密档案，发现一张熟悉的照片：你的旧友竟出现在名单中。巡逻脚步逐渐逼近。',
    choices: [
      {
        text: '带走名单，冒险撤离',
        next: 'chase',
        effects: { evidence: 1 }
      },
      {
        text: '放回档案，继续潜伏',
        next: 'deep-cover',
        effects: { stealth: 1 }
      }
    ]
  },
  informant: {
    id: 'informant',
    title: '第一章：旧码头',
    speaker: '线人',
    background: '/bg-dock.svg',
    text: '线人只留下一句：“灰鸽就在你身边。”话音未落，远处闪起枪火。',
    choices: [
      {
        text: '追击枪手',
        next: 'chase',
        effects: { combat: 1 }
      },
      {
        text: '掩护线人撤离',
        next: 'betrayal',
        effects: { empathy: 1 }
      }
    ]
  },
  chase: {
    id: 'chase',
    title: '第二章：追踪',
    speaker: '旧友',
    background: '/bg-street.svg',
    text: '你在巷道中追上嫌疑人，却发现其胸前佩戴着组织徽记。你必须在信任与怀疑之间做出抉择。',
    choices: [
      {
        text: '相信对方，交换情报',
        next: 'ending-truth',
        requirements: { evidence: 1 }
      },
      {
        text: '先制服再审问',
        next: 'ending-shadow'
      }
    ]
  },
  'deep-cover': {
    id: 'deep-cover',
    title: '第二章：更深潜伏',
    speaker: '旁白',
    background: '/bg-office.svg',
    text: '你选择隐忍，逐步接近核心。数月后，你终于掌握了“灰鸽”真正身份。',
    choices: [
      {
        text: '公开证据，赌一把',
        next: 'ending-truth',
        requirements: { trustOrg: 0 }
      },
      {
        text: '暗中清除，不留痕迹',
        next: 'ending-shadow'
      }
    ]
  },
  betrayal: {
    id: 'betrayal',
    title: '第二章：背叛',
    speaker: '线人',
    background: '/bg-room.svg',
    text: '线人临死前告诉你：组织内部早已分裂，你只是棋盘上的“弃子”。',
    choices: [
      {
        text: '重建联络，反向布局',
        next: 'ending-truth',
        effects: { evidence: 1 }
      },
      {
        text: '销毁线索，独自离开',
        next: 'ending-shadow'
      }
    ]
  },
  'ending-truth': {
    id: 'ending-truth',
    title: '结局：破晓',
    speaker: '旁白',
    background: '/bg-dawn.svg',
    text: '你揭开真相并存活下来，但代价是你再也无法回到普通人的生活。',
    ending: 'TRUE_END'
  },
  'ending-shadow': {
    id: 'ending-shadow',
    title: '结局：暗影',
    speaker: '旁白',
    background: '/bg-night.svg',
    text: '你成功抹去了所有痕迹，也抹去了自己。没有人记得你的名字。',
    ending: 'SHADOW_END'
  }
}

export const initialNodeId = 'start'
