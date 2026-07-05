# VibeCoding Agent 工作流

本仓库面向长时运行的 coding agent 工作流。**目标不是尽可能快地产出代码，而是让每一轮会话结束后，下一个会话仍然能无猜测地继续工作。**

---

## 🚀 开工流程

**写代码前必须按顺序做这些事：**

1. **确认目录**
   ```bash
   pwd
   ```
   确保在 `e:\VibeCoding` 或项目根目录

2. **了解项目内容**
    - 打开 `PRD.md`
    - 了解项目要做的东西，保持大方向正确

3. **读取会话进度**
   - 打开 `progress.md`
   - 了解最新已验证状态和下一步行动

4. **选择优先级功能**
   - 打开 `feature_list.json`
   - 找到 `"status": "not_started"` 且优先级最高的功能

5. **查看最近工作**
   ```bash
   git log --oneline -5
   ```
   了解最近的提交和变更

6. **运行统一启动脚本**
   ```bash
   ./init.sh
   ```
   执行基础验证和环境检查

7. **验证基础状态**
   - 如果基础验证失败，先修复，不要在坏的起点上继续
   - 运行必需的 smoke test 或端到端验证

---

## ⚙️ 工作规则

- **一次只做一个功能**  
  不要同时处理多个功能或穿插不同功能的代码

- **严格的完成定义**  
  不要因为"代码已经写了"就标记功能为完成
  - 必须实现目标行为
  - 必须跑过要求的验证
  - 必须记录证据

- **避免无关改动**  
  除非是为了消除当前 blocker 的窄范围修复，否则不要扩大到其他功能

- **不要削弱验证规则**  
  实现过程中不要悄悄改弱验证逻辑或跳过验证步骤

- **信息来源优先级**  
  优先依赖仓库里的持久化文件（`*.md`、`*.json`、`*.sh`）  
  而不是聊天记录中的信息

---

## 📋 必需文件

### `feature_list.json`
- **目的**：功能状态的唯一事实来源
- **位置**：项目根目录
- **更新时机**：每个功能完成或状态改变时
- **结构示例**：
  ```json
  [
    {
      "id": "feat-001",
      "name": "功能名称",
      "priority": 1,
      "status": "not_started|in_progress|completed|blocked",
      "description": "功能说明",
      "verification_steps": ["步骤1", "步骤2"],
      "last_verified": "2026-01-01T00:00:00Z"
    }
  ]
  ```

### `progress.md`
- **目的**：会话进度和当前已验证状态
- **位置**：项目根目录
- **更新时机**：每个会话结束前
- **包含内容**：
  - 本轮会话完成的功能
  - 已验证的系统状态
  - 下一轮会话的起点
  - 未解决的风险或 blocker
  - 关键的会话上下文

### `init.sh`
- **目的**：统一的启动与验证入口
- **位置**：项目根目录
- **职责**：
  - 检查必需依赖
  - 运行基础环保检查
  - 执行必需的 smoke test
  - 输出清晰的通过/失败状态

### `session-handoff.md`（可选）
- **目的**：较长会话的交接摘要
- **位置**：项目根目录
- **使用场景**：会话过长且有复杂的上下文需要传递时

---

## ✅ 完成定义

一个功能只有在以下条件**都**满足时才算**完成**：

- ✓ 目标行为已经实现
- ✓ 要求的验证真的跑过（不是跳过）
- ✓ 证据记录在 `feature_list.json` 或 `claude-progress.md`
- ✓ 仓库仍然能按标准启动路径重新开始工作
- ✓ 代码已提交，commit message 清晰

---

## 🏁 收尾流程

**每个会话结束前必须做：**

1. **更新进度文件**
   ```
   编辑 claude-progress.md，记录：
   - 本轮完成的功能
   - 当前验证过的系统状态
   - 下一轮会话的起点
   - 已知 blocker 或风险
   ```

2. **更新功能列表**
   ```
   编辑 feature_list.json：
   - 标记完成的功能
   - 更新 status 和 last_verified
   - 调整优先级（如需要）
   ```

3. **记录风险**
   ```
   如果有未解决的问题，明确写在 claude-progress.md 中：
   - 问题描述
   - 为什么还未解决
   - 下一轮会话需要的起点
   ```

4. **提交代码**
   ```bash
   git add .
   git commit -m "Clear message: [status] feature name

   - What was done
   - Verification: [what was tested]
   - Next: [what's next or any blockers]"
   ```
   示例：
   ```
   git commit -m "feat: implement user authentication [verified]

   - Added login endpoint
   - Added JWT token generation
   - Verification: ran test suite, tested with curl
   - Next: add rate limiting for login attempts"
   ```

5. **确保可重启**
   ```bash
   # 最后验证下一轮可以直接运行
   ./init.sh
   # 应该成功通过所有检查
   ```

---

## 📖 快速参考

### 查看当前状态
```bash
# 查看会话记录
cat claude-progress.md

# 查看功能列表
cat feature_list.json

# 查看最近提交
git log --oneline -10
```

### 标记功能状态
在 `feature_list.json` 中修改 `status` 字段：
- `not_started`：未开始
- `in_progress`：进行中（仅用于记录历史，不要在开始时标记）
- `completed`：已完成且已验证
- `blocked`：被阻挡，记录原因在 `claude-progress.md`

### 验证开工环境
```bash
./init.sh
# 应该输出绿色的 PASS 或失败原因
```

---

## 🎯 典型会话流程示例

```
会话开始
├─ pwd → 确认目录
├─ cat claude-progress.md → 理解前序状态
├─ cat feature_list.json → 选择优先功能
├─ git log --oneline -5 → 查看最近工作
├─ ./init.sh → 验证基础环境
└─ 开始实现功能
   ├─ 实现代码
   ├─ 运行验证
   └─ 修复问题直到通过
   
会话结束
├─ 更新 claude-progress.md
├─ 更新 feature_list.json  
├─ git add . && git commit
├─ ./init.sh → 最后验证
└─ 会话提交记录，下一轮可无猜测继续
```

---

## 📌 核心原则

| 原则 | 含义 |
|------|------|
| **无猜测** | 下一轮会话应该能从 `claude-progress.md` 直接了解全部必需信息 |
| **可重复** | 任何时刻运行 `./init.sh` 应该都能得到一致的结果 |
| **持久化优先** | 不依赖聊天记录，信息必须在文件里 |
| **严格完成** | 不是"代码写了就算完"，而是"验证通过了才算完" |
| **单线推进** | 一次一个功能，不交织 |

