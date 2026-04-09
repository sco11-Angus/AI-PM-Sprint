# Architecture Design

---

## 一、技术栈选择

---

### 前端：Next.js + React

**选择原因：**

- 支持快速开发
- 路由简单（适合Day页面）
- 可扩展为App（React生态）

---

### 后端：FastAPI

**选择原因：**

- Python生态（适合AI）
- 简单易上手
- 性能较好

---

### 数据库：SQLite（MVP阶段）

**选择原因：**

- 零配置
- 本地运行简单
- 适合小项目

---

### 未来扩展：Supabase（PostgreSQL）

**迁移方式：**

- 替换数据库连接
- 保持Service层不变

---

## 二、系统架构

```
Frontend (Next.js)
↓ HTTP
Backend (FastAPI)
↓
Database (SQLite)
↓
AI Service (OpenAI API)
```

---

## 三、项目目录结构

```
ai-pm-sprint/
├── frontend/
│   ├── app/
│   ├── components/
│   ├── features/
│   ├── data/
│   └── lib/
│
├── backend/
│   ├── main.py
│   ├── api/
│   ├── services/
│   ├── models/
│   └── database.py
│
├── docs/
└── README.md
```

---

## 四、核心模块划分

---

### 1️⃣ 前端模块

- 页面层（app/）
- 组件层（components/）
- 业务层（features/）

---

### 2️⃣ 后端模块

- API层（路由）
- Service层（业务逻辑）
- 数据层（数据库）

---

## 五、数据流

```
用户操作
→ 前端页面
→ API请求
→ FastAPI处理
→ 数据库 / AI调用
→ 返回结果
→ 页面更新
```

---

## 六、扩展性设计

---

### 1️⃣ 数据层升级

SQLite → Supabase（Postgres）

---

### 2️⃣ 前端扩展

- Web → App（React Native）
- Web → 小程序（跨端框架）

---

### 3️⃣ AI能力扩展

- Prompt优化
- RAG系统
- Agent系统

---

## 七、设计原则

- 先跑通MVP
- 分层清晰（UI / Logic / Data）
- 模块解耦（便于替换）
- 内容驱动优先
