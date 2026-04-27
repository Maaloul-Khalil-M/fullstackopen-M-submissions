// grafana cloud FREE http logger

const config = require("./config");
const fetch = require("node-fetch");

const INSTANCE_ID = config.LOG_INSTANCE_ID;
const API_KEY = config.LOG_API_KEY;
const encoded = Buffer.from(`${INSTANCE_ID}:${API_KEY}`).toString("base64");

const headers = {
  "Content-Type": "application/json",
  Authorization: `Basic ${encoded}`,
};

function sendToGrafana(level, message) {
  const body = {
    resourceLogs: [
      {
        resource: {
          attributes: [
            { key: "service.name", value: { stringValue: "nodejs-app" } },
          ],
        },
        scopeLogs: [
          {
            logRecords: [
              {
                timeUnixNano: String(Date.now() * 1e6),
                severityText: level,
                body: { stringValue: message },
              },
            ],
          },
        ],
      },
    ],
  };

  fetch("https://otlp-gateway-prod-eu-central-0.grafana.net/otlp/v1/logs", {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  }).catch((err) => console.error("[grafana] failed:", err.message));
}

const info = (...params) => {
  console.log(...params);
  sendToGrafana("INFO", params.join(" "));
};

const error = (...params) => {
  console.error(...params);
  sendToGrafana("ERROR", params.join(" "));
};

module.exports = { info, error };
