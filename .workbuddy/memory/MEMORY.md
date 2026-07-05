# AI PM Sprint 项目长期记忆

## 项目概况
- 项目名称：AI PM Sprint（AI产品经理训练系统）
- 仓库地址：https://github.com/sco11-Angus/AI-PM-Sprint
- 技术栈：Next.js 16 + React 19 + Tailwind CSS 4 / FastAPI + SQLite + MiniMax AI
- 状态：MVP 主要功能已完成（feat-001~011），已推送至 GitHub

## CI/CD 配置（2026-07-05）
- 三个 GitHub Actions 工作流：
  - `ci.yml`：push/PR 触发，后端 smoke test + 前端 lint/build + 集成验证（ubuntu-latest）
  - `pr-check.yml`：PR 触发，快速质量门禁（Python 语法检查、导入验证、ESLint）
  - `deploy.yml`：CI 通过后自动触发，前端→Vercel，后端→Render（通过 deploy hook）
- 部署配置文件：`backend/Dockerfile`、`render.yaml`、`frontend/vercel.json`
- 需配置 GitHub Secrets：`VERCEL_TOKEN`、`VERCEL_ORG_ID`、`VERCEL_PROJECT_ID`、`RENDER_DEPLOY_HOOK`
- 未配置 secrets 时部署步骤自动跳过（不报错）

## Git 推送注意事项
- 远程 URL 已清理为标准 HTTPS（不含 token）
- Windows 凭据管理器自动处理认证
- git push 的进度信息走 stderr，PowerShell 可能误报为错误，但推送实际成功
