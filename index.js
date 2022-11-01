const express = require('express');
const { collectDefaultMetrics, register, Counter } = require('prom-client');

collectDefaultMetrics();

const app = express();

const counter = new Counter({
  name: 'my_counter',
  help: 'metric_help',
});

register.registerMetric(counter);
register.setDefaultLabels({
  app: 'metric-api'
});

const client = require('prom-client');
// client.collectDefaultMetrics({register});

app.get('/metrics', async (_req, res) => {
  try {
    counter.inc();
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  } catch (err) {
    res.status(500).end(err);
  }
});

app.listen(4001, '0.0.0.0');
console.log("index js is running lmao");
