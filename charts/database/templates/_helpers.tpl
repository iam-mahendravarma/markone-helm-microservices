{{- define "database.fullname" -}}
{{- printf "%s-%s" .Release.Name .Chart.Name | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "database.name" -}}
{{ .Chart.Name }}
{{- end -}}

{{- define "database.chart" -}}
{{ .Chart.Name }}-{{ .Chart.Version }}
{{- end -}}
