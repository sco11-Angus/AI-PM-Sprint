# AI PM Sprint 🚀

一个面向零基础用户的「30天AI产品经理训练系统」，通过每日任务 + AI辅助 + 项目驱动，帮助用户从"会用AI"到"能设计AI产品"。

---

## ✨ 项目简介

本项目是一个轻量级Web应用，核心目标是：

- 提供结构化的30天学习路径
- 帮助用户建立AI认知 + 产品能力
- 引导用户完成一个AI项目
- 提供AI辅助学习（解释 / 点评 / 训练）

项目采用"内容驱动 + AI增强"的设计理念。

---

## 🛠 技术栈

### 前端
- Next.js（React框架）
- Tailwind CSS（UI样式）

### 后端
- FastAPI（Python）
- SQLite（本地数据库，后续可迁移Supabase）

### AI能力
- OpenAI API（或其他大模型）

### 工具
- GitHub（版本管理）
- Vercel（前端部署，后期）

---

## 📦 项目结构

```
ai-pm-sprint/
├── frontend/          # 前端（Next.js）
├── backend/           # 后端（FastAPI）
├── docs/              # 文档
```

---

## 🚀 如何运行（本地开发）

### 1️⃣ 克隆项目

```bash
git clone <your-repo>
cd ai-pm-sprint
```

### 2️⃣ 启动前端

```bash
cd frontend
npm install
npm run dev
```

访问：
👉 http://localhost:3000

### 3️⃣ 启动后端

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

访问：
👉 http://localhost:8000

### 4️⃣ 配置环境变量（可选）

```
OPENAI_API_KEY=your_key
```

---

## 📌 当前开发阶段（MVP）

当前版本包含：

- 首页
- Day任务页面
- AI输入框（基础）
- 本地数据存储

---

## 🔮 未来计划

- 用户系统（登录/进度）
- AI自动点评
- Supabase数据库
- 移动端适配（App/小程序）

---

## 🧠 项目核心理念

**用产品化方式训练产品经理，而不是单纯提供学习内容。**
