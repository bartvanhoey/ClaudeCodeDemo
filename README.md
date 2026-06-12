# Claude Code Demo

Claude Code is an **agentic coding** tool that runs in your terminal. It lets you delegate coding tasks directly to Claude from the command line.

Key things it does:

- Edits files across your codebase — reads, writes, and refactors code with full context of your project
- Runs commands — executes shell commands, tests, linters, build tools, etc.
- Works autonomously — you give it a goal ("fix the failing tests", "add auth to this API") and it figures out the steps
- Understands your codebase — it can explore your repo structure before acting, so it makes changes that fit your patterns
- Supports MCP — you can extend it with MCP servers to connect it to external tools and APIs
- Supports skills/commands — reusable /slash commands for consistent workflows
- Can run different tasks in parallel

It's designed for developers who want to stay in the terminal and have Claude act as a capable pair programmer that can actually do the work, not just suggest it.

## Core Concepts (in plain words)

**Agentic** means Claude doesn't just answer once — it works in a loop. It reads files, runs a command, looks at the result, and decides the next step on its own until the goal is done.

**Context** is everything Claude can "see" at one time: your prompt, the files it has opened, and command output. It's like Claude's short-term memory for the current task. The bigger the task, the more context it uses.

**Tokens** are small chunks of text (roughly ¾ of a word each). Everything Claude reads and writes is measured in tokens — they're the unit you're billed on.

**Plan mode** lets Claude think through and propose a plan *before* changing any files. You approve the plan, then it executes. Good for bigger or riskier changes.

**Permissions** keep you in control. Claude asks before doing sensitive things (like running certain commands), so nothing happens behind your back.

## Tokens in Claude Code

When you prompt Claude Code, it costs tokens to interact with the context of your codebase and the task you want it to perform.

A rough rule of thumb: reading more files and longer tasks use more tokens. Commands like `/compact` and `/clear` help by trimming context you no longer need.

## Claude Code Plans

Claude Code is available in different plans. The more you pay, the more tokens (usage) you get for your coding tasks.

## Claude Models

Claude Code can be configured to use different Claude models, each with its own capabilities and cost.

The stronger the model, the more capable it is — but it also costs more tokens per interaction. From fastest/cheapest to most capable:

1. **Haiku** — fastest and cheapest, great for quick, simple answers
2. **Sonnet** — balanced, efficient for everyday routine coding tasks
3. **Opus** — Best for everyday, complex tasks
4. **Fable** — most capable, best for hard, complex, long-running work

> Tip: switch models any time with `/model`. Use a lighter model for simple edits and save Opus for the tricky problems.

## MCP (Model Context Protocol)

MCP is how Claude Code connects to the outside world. Think of MCP servers as plug-ins: each one gives Claude a new set of tools — for example, querying a database, reading from a ticketing system, or calling an internal API. Once connected, Claude can use those tools as part of its work, just like it edits files or runs commands.

## Skills and Commands

**Commands** are the actions Claude Code can take — editing files, running tests, executing shell commands, and so on.

**Skills / slash commands** are reusable shortcuts you trigger with a `/`. They bundle a set of instructions so a multi-step workflow runs the same way every time.

**Agents (subagents)** are helpers Claude can spin up to handle a focused job — like searching the codebase or reviewing code — without cluttering your main session's context.

**CLAUDE.md** is a project memory file. Notes you put there (coding style, key commands, conventions) are loaded automatically, so Claude follows your project's rules without being reminded.

### Useful Built-in Commands

- /init: Initialize a new CLAUDE.md file with codebase documentation
- /compact: Compact the current session's context
- /usage: Show token usage for the current session
- /exit: Exit the current Claude Code session
- /plan: Show the current plan and token limits
- /agents: List and manage agents
- /clear: Clear the current session's context
- /login: Log in to your Claude Code account
- /model: Switch between different Claude models
- /skills: List all available skills
- !: Run a shell command in the context of the current session

### Custom Skills and Commands

You can create custom skills and commands to automate specific tasks in your workflow. For example, you could create a skill to write a commit message, or one to generate a component from a description.

- /commit-message: a custom skill to generate a commit message based on the changes made
- /component: a custom skill to generate a new component based on a description
  
## Demo Time

### Demo Agentic Workflow




### Demo Claude Code in action

In this example, we ask Claude to fix a failing test. It reads the test file, identifies the issue, and makes the necessary code changes to get the test passing — all while we watch it work in real time.