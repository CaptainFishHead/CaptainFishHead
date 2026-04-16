## 基于 Vue 技术栈的《隐形守护者》式互动叙事 Demo

这是一个使用 **Vue 3 + Pinia + Vite** 构建的互动叙事项目骨架，目标是快速实现类似《隐形守护者》的多分支剧情体验。

### 功能特性
- 多节点分支剧情（可通过 JSON 扩展）
- 条件选项（根据剧情数值解锁/禁用）
- 打字机文本演出 + 手动跳过
- 剧情选择与分支跳转
- 回退一步 / 重新开始
- 三槽位存档与读档（`localStorage`）
- 数值状态面板 + 结局收集

### 快速开始
```bash
npm install
npm run dev
```

### 项目结构
```text
src/
  data/story.js             # 剧情节点配置（可含 requirements/effects）
  stores/storyStore.js      # 剧情状态机（跳转、回退、存档、多槽位）
  components/StoryPanel.vue # 文本演出、选项渲染、跳过动画
  App.vue                   # 顶层布局、数值面板、存档槽操作
```

### 剧情节点字段示例
```js
{
  id: 'chase',
  title: '第二章：追踪',
  speaker: '旧友',
  text: '...',
  choices: [
    {
      text: '相信对方，交换情报',
      next: 'ending-truth',
      requirements: { evidence: 1 },
      effects: { trustOrg: 1 }
    }
  ]
}
```

### 如何扩展为完整项目
1. **接入资源管理**：将背景图、角色立绘、音效统一纳入资源目录并添加预加载。
2. **增加演出系统**：支持角色立绘切换、镜头缩放、对白气泡、BGM 状态控制。
3. **引入脚本编辑工具链**：使用表格/可视化编辑器导出剧情 JSON。
4. **存档升级**：支持章节缩略图、自动存档、跨设备云同步。
5. **工程化提升**：加入单元测试、E2E 测试、CI 自动构建与部署。
