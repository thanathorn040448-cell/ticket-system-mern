#!/bin/sh
TEMPLATE="/etc/alertmanager/alertmanager.yml"
OUT="/tmp/alertmanager.runtime.yml"

# ตัด CR จาก Windows .env และช่องว่าง — ถ้าไม่ตัดมักได้ 404 no_service จาก Slack
SLACK_WEBHOOK_URL=$(printf '%s' "$SLACK_WEBHOOK_URL" | tr -d '\015' | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')

if [ -z "$SLACK_WEBHOOK_URL" ]; then
  echo "alertmanager: SLACK_WEBHOOK_URL is empty" >&2
fi

GRAFANA_ROOT_URL=$(printf '%s' "${GRAFANA_ROOT_URL:-http://localhost:3001}" | tr -d '\015' | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')
PROMETHEUS_EXTERNAL_URL=$(printf '%s' "${PROMETHEUS_EXTERNAL_URL:-http://localhost:9090}" | tr -d '\015' | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')

sed -e "s#__SLACK_WEBHOOK_URL__#${SLACK_WEBHOOK_URL}#g" \
    -e "s#__GRAFANA_ROOT_URL__#${GRAFANA_ROOT_URL}#g" \
    -e "s#__PROMETHEUS_URL__#${PROMETHEUS_EXTERNAL_URL}#g" \
    "$TEMPLATE" > "$OUT"
exec alertmanager --config.file="$OUT"
