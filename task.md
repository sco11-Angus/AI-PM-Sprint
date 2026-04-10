# AI PM Sprint — MVP任务序列（重写版）

---

## 🔰 阶段0：基础初始化（不变）

### Task 0.1：创建项目目录结构

**目标：** 保证结构符合 ARCHITECTURE.md

**任务：**

创建目录：
```
ai-pm-sprint/
  frontend/
  backend/
```

**完成标准：**
- 本地能看到目录结构
- 无报错

---

### Task 0.2：初始化 Next.js 前端

**目标：** 前端能启动

**任务：**
```bash
cd frontend
npx create-next-app@latest .
```

**完成标准：**
- 访问 http://localhost:3000 显示默认页面

---

### Task 0.3：初始化 FastAPI 后端

**目标：** 后端能启动

**任务：**
创建 `backend/main.py`：

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello AI PM Sprint"}
```

运行：
```bash
uvicorn main:app --reload
```

**完成标准：**
- 访问 http://localhost:8000 返回JSON

---

## 🔗 阶段1：前后端打通

- ✅ Task 1.1：首页静态页面
- ✅ Task 1.2：调用后端API
- ✅ Task 1.3：渲染API数据

👉 **✅ 到这里：系统跑通**

---

## 🧠 阶段2：AI输入系统（核心MVP！！！）

### 🧱 Step 2.1：定义数据模型（后端）

#### ✅ Task 2.1：创建 DailyContent 数据模型

**任务：** 定义每日内容结构

**文件：** `backend/models/daily_content.py`

**字段：**
- id
- day
- tech_concept
- tech_one_line
- tech_principle
- tech_example
- news_title
- news_summary
- news_product_idea

**限制：**
- 使用最简单方式（如SQLAlchemy或简单类）

**测试：**
- 能 import

---

### 🧠 Step 2.2：创建获取接口

#### ✅ Task 2.2：创建 GET /daily/{day}

**任务：** 创建接口

**路径：** `GET /daily/{day}`

**返回：** DailyContent（先返回 mock）

**测试：**
- 浏览器访问返回 JSON

---

### 🤖 Step 2.3：AI生成逻辑（核心）

#### ✅ Task 2.3：创建 AI生成函数（仅技术卡）

**任务：** 实现生成技术卡函数

**文件：** `backend/services/ai_service.py`

**函数：** `generate_tech_card(day)`

**返回：**
```json
{
  "concept": "",
  "oneLine": "",
  "principle": "",
  "example": ""
}
```

**限制：**
- 可先 mock（不接OpenAI）

**测试：**
- 调用函数返回数据

---

#### ✅ Task 2.4：扩展生成前沿速递

**任务：** 增加 `generate_news()`

**返回：**
```json
{
  "title": "",
  "summary": "",
  "productIdea": ""
}
```

**测试：**
- 返回结构正确

---

### 💾 Step 2.4：生成并存储

#### ✅ Task 2.5：实现"无数据 → 自动生成"

**任务：** 在 `/daily/{day}` 中：

**逻辑：**
1. 查询数据库是否存在
2. 如果不存在：
   - 调用 AI生成
   - 存入数据库
3. 返回数据

**测试：**
- 第一次访问生成
- 第二次访问直接返回

---

#### ✅ Task 2.6：初始化 SQLite + 表

**任务：** 创建数据库和表

**表：** `daily_content`

**测试：**
- 表存在

---

## 🎨 阶段3：前端展示 AI内容（关键体验）

#### ✅ Task 3.1：创建 Day页面

**路径：** `/day/1`

---

#### ✅ Task 3.2：调用 /daily/{day}

**任务：** 前端 fetch 数据

**测试：**
- console打印

---

#### ✅ Task 3.3：展示技术卡

**任务：**
显示：
- concept
- oneLine
- principle
- example

**测试：**
- 页面正确展示

---

#### ✅ Task 3.4：展示前沿速递

**任务：**
显示：
- title
- summary
- productIdea

**测试：**
- 页面展示完整

---

## 🧩 阶段4：用户输出（形成闭环）

- ✅ Task 4.1：添加用户输入框
- ✅ Task 4.2：提交输入（console）
- ✅ Task 4.3：后端保存用户输出

**接口：** `POST /submit`

**字段：**
- day
- content

- ✅ Task 4.4：写入数据库

---

## 🤖 阶段5：AI点评（产品核心价值）

#### ✅ Task 5.1：创建 AI点评接口

**接口：** `POST /review`

**输入：** 用户内容

**输出：** 点评文本

---

#### ✅ Task 5.2：前端展示点评

---

## 🎯 阶段6：基础任务系统（简化版）

- ✅ Task 6.1：写死 Day任务

**文件：** `frontend/data/days.ts`

- ✅ Task 6.2：展示任务目标

👉 **注意：**
这里任务系统变成"辅助"，不是核心

---

## 🧪 阶段7：MVP收尾

- ✅ Task 7.1：首页入口
- ✅ Task 7.2：简单进度显示

---

## 🧠 最终MVP结构（非常重要）

你现在的产品变成：

```
Day页面
├── 今日任务（固定）
├── 技术卡（AI生成+存储）
├── 前沿速递（AI生成+存储）
├── 用户输入
└── AI点评
```
