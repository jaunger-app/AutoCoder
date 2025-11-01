# 🤖 AutoCoder – Automated Code Generation from GitHub Issues

**AutoCoder** is a GitHub Action that automatically generates code based on GitHub issue descriptions using **OpenAI’s ChatGPT**.  
It then creates a **pull request (PR)** with the generated code, allowing your team to review and merge AI-assisted code contributions.

---

## 🚀 Features

- Automatically triggers when an issue is **labeled** (configurable).
- Uses **OpenAI’s ChatGPT API** to generate code from issue content.
- Automatically commits generated code to a new branch.
- Creates a **Pull Request** for review and merging.
- Uploads generated code as an artifact for inspection.

---

## 🧩 How It Works

1. A GitHub issue receives a specific label (e.g., `autocoder`).
2. The workflow runs the **AutoCoder composite action**.
3. The action:
   - Checks out the repository.
   - Generates code using a shell script that calls ChatGPT.
   - Commits the generated files.
   - Creates a new pull request linked to the issue.

---

## ⚙️ Inputs

| Name | Description | Required | Default |
|------|--------------|-----------|----------|
| `GITHUB_TOKEN` | GitHub token used to authenticate and create pull requests. | ✅ Yes | — |
| `REPOSITORY` | The repository where the action runs (e.g., `username/repo`). | ✅ Yes | — |
| `ISSUE_NUMBER` | The issue number that triggered the action. | ✅ Yes | — |
| `OPENAI_API_KEY` | Your OpenAI API key to access ChatGPT. | ✅ Yes | — |
| `SCRIPT_PATH` | Path to the script that handles ChatGPT code generation. | ❌ No | `scripts/script.sh` |
| `LABEL` | Label used to trigger and tag PRs. | ❌ No | `autocoder-bot` |

---

## 📤 Outputs

| Name | Description |
|------|--------------|
| `pull_request_url` | The URL of the automatically created pull request containing the generated code. |

---

## 🧠 Example Workflow

```yaml
name: AutoCodeGen
on:
  issues:
    types: [labeled]

permissions:
  contents: write
  pull-requests: write

jobs:
  generate_code:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2

      - name: AutoCoder Composite Action
        uses: jaunger-app/AutoCoder@v5
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
          LABEL: 'autocoder'
          REPOSITORY: 'your-username/your-repo'
          ISSUE_NUMBER: ${{ github.event.issue.number }}
          SCRIPT_PATH: ./scripts/script.sh
