#!/usr/bin/env bash
# Corre un ciclo de producción con Claude Code sin intervención. Lo llama cron.
cd "$(dirname "$0")/.."
claude -p "$(cat automatizacion/rutina.md)" --permission-mode acceptEdits --allowedTools Bash Read Write Edit Glob Grep WebSearch WebFetch > automatizacion/ultimo_ciclo.log 2>&1
