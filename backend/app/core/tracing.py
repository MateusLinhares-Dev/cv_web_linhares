import os
from opentelemetry import trace
from opentelemetry.sdk.resources import Resource
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.exporter.otlp.proto.grpc.trace_exporter import OTLPSpanExporter
from opentelemetry.instrumentation.fastapi import FastAPIInstrumentor

def setup_tracing(app):
    resource = Resource.create({"service.name": "cv-backend"})
    provider = TracerProvider(resource=resource)
    
    otlp_endpoint = os.getenv("OTLP_ENDPOINT", "http://jaeger:4317")
    processor = BatchSpanProcessor(OTLPSpanExporter(endpoint=otlp_endpoint, insecure=True))
    provider.add_span_processor(processor)
    
    trace.set_tracer_provider(provider)
    FastAPIInstrumentor.instrument_app(app)