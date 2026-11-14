# Corre un ciclo de producción con Claude Code sin intervención. Lo llama el Programador de tareas de Windows.
Set-Location (Split-Path $PSScriptRoot)
$rutina = Get-Content automatizacion\rutina.md -Raw -Encoding utf8
claude -p $rutina --permission-mode acceptEdits --allowedTools Bash Read Write Edit Glob Grep WebSearch WebFetch *> automatizacion\ultimo_ciclo.log
