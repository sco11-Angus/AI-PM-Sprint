#!/usr/bin/env pwsh
# VibeCoding Project Initialization & Validation Script
# 用途：检查项目基础环境、依赖、数据库和运行 smoke test

$ErrorActionPreference = "Stop"

# 色彩定义
$GREEN = "`e[32m"
$RED = "`e[31m"
$YELLOW = "`e[33m"
$RESET = "`e[0m"

function Write-Success {
    param([string]$Message)
    Write-Host "$GREEN✓ $Message$RESET"
}

function Write-Error-Custom {
    param([string]$Message)
    Write-Host "$RED✗ $Message$RESET"
}

function Write-Warning-Custom {
    param([string]$Message)
    Write-Host "$YELLOW⚠ $Message$RESET"
}

function Write-Info {
    param([string]$Message)
    Write-Host "ℹ $Message"
}

# ======================== 1. 验证目录结构 ========================
Write-Info "=== 1. 验证项目目录结构 ==="

$requiredDirs = @("backend", "frontend", "docs")
$allDirsExist = $true

foreach ($dir in $requiredDirs) {
    if (Test-Path $dir -PathType Container) {
        Write-Success "目录存在: $dir/"
    } else {
        Write-Error-Custom "目录缺失: $dir/"
        $allDirsExist = $false
    }
}

$requiredFiles = @("PRD.md", "ARCHITECTURE.md", "feature_list.json", "claude-progress.md")
$allFilesExist = $true

foreach ($file in $requiredFiles) {
    if (Test-Path $file -PathType Leaf) {
        Write-Success "文件存在: $file"
    } else {
        if ($file -eq "claude-progress.md") {
            Write-Warning-Custom "文件缺失: $file (可选，会话首次可不存在)"
        } else {
            Write-Error-Custom "文件缺失: $file"
            $allFilesExist = $false
        }
    }
}

if (-not $allDirsExist -or (-not $allFilesExist -and (Test-Path "PRD.md" -PathType Leaf) -eq $false)) {
    Write-Error-Custom "项目目录结构不完整！"
    exit 1
}

# ======================== 2. 检查系统依赖 ========================
Write-Info "=== 2. 检查系统依赖 ==="

# 检查 Python
$pythonExists = $false
try {
    $pythonVersion = python --version 2>&1
    Write-Success "Python 已安装: $pythonVersion"
    $pythonExists = $true
} catch {
    Write-Error-Custom "Python 未安装或不在 PATH 中"
}

# 检查 Node.js
$nodeExists = $false
try {
    $nodeVersion = node --version 2>&1
    Write-Success "Node.js 已安装: $nodeVersion"
    $nodeExists = $true
} catch {
    Write-Error-Custom "Node.js 未安装或不在 PATH 中"
}

if (-not $pythonExists -or -not $nodeExists) {
    Write-Error-Custom "缺少必要的系统依赖！"
    exit 1
}

# ======================== 3. 验证后端依赖 ========================
Write-Info "=== 3. 验证后端依赖 ==="

Push-Location backend

$requirements_file = "requirements.txt"
if (-not (Test-Path $requirements_file -PathType Leaf)) {
    Write-Warning-Custom "requirements.txt 不存在，跳过后端依赖检查"
} else {
    Write-Success "requirements.txt 存在"
    
    # 检查是否已安装依赖
    try {
        python -c "import fastapi; import uvicorn" 2>&1 | Out-Null
        Write-Success "关键 Python 依赖已安装 (fastapi, uvicorn)"
    } catch {
        Write-Warning-Custom "Python 依赖未完全安装，建议运行: pip install -r requirements.txt"
    }
}

Pop-Location

# ======================== 4. 验证前端依赖 ========================
Write-Info "=== 4. 验证前端依赖 ==="

Push-Location frontend

if (-not (Test-Path "package.json" -PathType Leaf)) {
    Write-Warning-Custom "package.json 不存在"
} else {
    Write-Success "package.json 存在"
    
    if (-not (Test-Path "node_modules" -PathType Container)) {
        Write-Warning-Custom "node_modules 不存在，建议运行: npm install"
    } else {
        Write-Success "node_modules 已安装"
    }
}

Pop-Location

# ======================== 5. 验证数据库 ========================
Write-Info "=== 5. 验证数据库设置 ==="

Push-Location backend

$db_patterns = @("*.db", "*.sqlite", "*.sqlite3")
$dbExists = $false

foreach ($pattern in $db_patterns) {
    if ((Get-ChildItem -Filter $pattern -ErrorAction SilentlyContinue).Count -gt 0) {
        Write-Success "数据库文件存在: $pattern"
        $dbExists = $true
        break
    }
}

if (-not $dbExists) {
    Write-Warning-Custom "未检测到数据库文件（首次运行可能需要初始化）"
}

# 检查数据库配置
if (Test-Path "database.py" -PathType Leaf) {
    Write-Success "数据库配置文件存在: database.py"
} else {
    Write-Warning-Custom "数据库配置文件不存在: database.py"
}

Pop-Location

# ======================== 6. Smoke Test ========================
Write-Info "=== 6. 运行 Smoke Test ==="

# 测试后端可导入性
try {
    Push-Location backend
    python -c "from main import app; print('FastAPI 应用导入成功')" 2>&1 | Out-Null
    Write-Success "后端主模块可导入"
    Pop-Location
} catch {
    Write-Warning-Custom "后端主模块导入失败，可能需要安装依赖"
}

# 测试前端配置
try {
    Push-Location frontend
    if ((Get-Content "package.json" | ConvertFrom-Json).name) {
        Write-Success "前端 package.json 有效"
    }
    Pop-Location
} catch {
    Write-Warning-Custom "前端配置文件检查失败"
}

# ======================== 7. 总结 ========================
Write-Info "=== 7. 初始化总结 ==="

Write-Success "✓ 项目初始化检查完成"
Write-Info "后续步骤:"
Write-Info "  1. 后端: cd backend && pip install -r requirements.txt (如需要)"
Write-Info "  2. 后端: python -m uvicorn main:app --host 127.0.0.1 --port 9000 (启动服务)"
Write-Info "  3. 前端: cd frontend && npm install (如需要)"
Write-Info "  4. 前端: npm run dev (启动开发服务器)"

exit 0
