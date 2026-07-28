import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { FetchInstrumentation } from '@opentelemetry/instrumentation-fetch';
import { ZoneContextManager } from '@opentelemetry/context-zone';
import { resourceFromAttributes, defaultResource } from '@opentelemetry/resources';
import * as semanticConventions from '@opentelemetry/semantic-conventions';

const exporter = new OTLPTraceExporter({
  url: 'http://localhost:4318/v1/traces',
});

const provider = new WebTracerProvider({
  resource: defaultResource().merge(
    resourceFromAttributes({
      [semanticConventions.ATTR_SERVICE_NAME]: 'cv-frontend',
    })
  ),
  spanProcessors: [
    new SimpleSpanProcessor(exporter)
  ]
});

provider.register({
  contextManager: new ZoneContextManager(),
});

registerInstrumentations({
  instrumentations: [
    new FetchInstrumentation({
      ignoreUrls: [/localhost:3000/],
      clearTimingResources: true,
    }),
  ],
});