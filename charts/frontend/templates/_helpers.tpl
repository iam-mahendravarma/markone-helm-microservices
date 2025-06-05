{{/*
Return the app name
*/}}
{{- define "frontend.name" -}}
frontend
{{- end }}

{{/*
Return the fully qualified name
*/}}
{{- define "frontend.fullname" -}}
{{ .Release.Name }}-{{ include "frontend.name" . }}
{{- end }}
